import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";
import { requireAdmin } from "../_lib/auth.js";
import { getDb } from "../_lib/db.js";

export default async function handler(req, res) {
  const admin = await requireAdmin(req, res);
  if (!admin) return;

  const db = await getDb();
  const users = db.collection("users");

  // ── GET: list all users OR get scores for a user ─────────
  if (req.method === "GET") {
    const { userId, action } = req.query;

    if (action === "scores" && userId) {
      const scores = await db
        .collection("scores")
        .find({ userId })
        .sort({ createdAt: -1 })
        .limit(100)
        .toArray();
      return res.status(200).json({ scores });
    }

    // List all users with score summary
    const allUsers = await users
      .find({}, { projection: { password: 0 } })
      .sort({ createdAt: -1 })
      .toArray();

    const userIds = allUsers.map(u => u._id.toString());
    const scoreCounts = await db
      .collection("scores")
      .aggregate([
        { $match: { userId: { $in: userIds } } },
        {
          $group: {
            _id: "$userId",
            count: { $sum: 1 },
            lastScore: { $max: "$createdAt" }
          }
        }
      ])
      .toArray();

    const scoreMap = {};
    scoreCounts.forEach(s => {
      scoreMap[s._id] = { count: s.count, lastScore: s.lastScore };
    });

    const enriched = allUsers.map(u => ({
      ...u,
      _id: u._id.toString(),
      scoreCount: scoreMap[u._id.toString()]?.count || 0,
      lastActivity:
        scoreMap[u._id.toString()]?.lastScore || u.createdAt
    }));

    return res.status(200).json({ users: enriched });
  }

  // ── PATCH: update user ─────────────────────────────────────
  if (req.method === "PATCH") {
    const { userId, newEmail, newPassword, displayName, role, status } =
      req.body || {};

    if (!userId) return res.status(400).json({ error: "userId required" });

    const updates = {};

    if (displayName !== undefined)
      updates.name = displayName.trim().slice(0, 40);
    if (role !== undefined && ["user", "admin"].includes(role))
      updates.role = role;
    if (status !== undefined &&
      ["pending", "approved", "rejected"].includes(status)) {
      updates.status = status;
      if (status === "approved") {
        updates.approvedAt = new Date();
        updates.approvedBy = admin.email;
      }
    }

    if (newEmail) {
      const exists = await users.findOne({
        email: newEmail.toLowerCase(),
        _id: { $ne: new ObjectId(userId) }
      });
      if (exists)
        return res.status(400).json({ error: "Email deja folosit." });
      updates.email = newEmail.toLowerCase();
    }

    if (newPassword) {
      if (newPassword.length < 6)
        return res
          .status(400)
          .json({ error: "Parola trebuie să aibă cel puțin 6 caractere." });
      updates.password = await bcrypt.hash(newPassword, 10);
    }

    if (Object.keys(updates).length === 0)
      return res.status(400).json({ error: "Nimic de actualizat." });

    await users.updateOne(
      { _id: new ObjectId(userId) },
      { $set: updates }
    );

    return res.status(200).json({ message: "Utilizator actualizat." });
  }

  // ── DELETE: remove user + scores ──────────────────────────
  if (req.method === "DELETE") {
    const { userId } = req.body || {};
    if (!userId) return res.status(400).json({ error: "userId required" });

    if (userId === admin.id)
      return res
        .status(400)
        .json({ error: "Nu poți șterge propriul cont din admin panel." });

    await users.deleteOne({ _id: new ObjectId(userId) });
    await db.collection("scores").deleteMany({ userId });

    return res.status(200).json({ message: "Utilizator și scoruri șterse." });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
