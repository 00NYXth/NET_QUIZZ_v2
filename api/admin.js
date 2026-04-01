import { MongoClient, ObjectId } from "mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const client = new MongoClient(process.env.MONGODB_URI);

// Admins are defined by email in env var ADMIN_EMAILS (comma-separated)
function isAdmin(email) {
  const admins = (process.env.ADMIN_EMAILS || "").split(",").map(e => e.trim().toLowerCase());
  return admins.includes(email.toLowerCase());
}

export default async function handler(req, res) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }

  if (!isAdmin(decoded.email)) {
    return res.status(403).json({ error: "Forbidden: Admin access only." });
  }

  await client.connect();
  const db = client.db("quiz");

  // GET /api/admin?action=users  → list all users with score summary
  // GET /api/admin?action=scores&userId=xxx → scores for a user
  if (req.method === "GET") {
    const { action, userId } = req.query;

    if (action === "users") {
      const users = await db.collection("users")
        .find({}, { projection: { password: 0 } })
        .sort({ createdAt: -1 })
        .toArray();

      // Attach score count per user
      const userIds = users.map(u => u._id.toString());
      const scoreCounts = await db.collection("scores").aggregate([
        { $match: { userId: { $in: userIds } } },
        { $group: { _id: "$userId", count: { $sum: 1 }, lastScore: { $max: "$createdAt" } } }
      ]).toArray();

      const scoreMap = {};
      scoreCounts.forEach(s => { scoreMap[s._id] = { count: s.count, lastScore: s.lastScore }; });

      const enriched = users.map(u => ({
        ...u,
        scoreCount: scoreMap[u._id.toString()]?.count || 0,
        lastActivity: scoreMap[u._id.toString()]?.lastScore || u.createdAt
      }));

      return res.status(200).json({ users: enriched });
    }

    if (action === "scores" && userId) {
      const scores = await db.collection("scores")
        .find({ userId })
        .sort({ createdAt: -1 })
        .limit(100)
        .toArray();
      return res.status(200).json({ scores });
    }

    return res.status(400).json({ error: "Unknown action" });
  }

  // PATCH /api/admin  →  update a user's email, displayName, or reset password
  if (req.method === "PATCH") {
    const { userId, newEmail, newPassword, displayName, isAdmin: makeAdmin } = req.body;
    if (!userId) return res.status(400).json({ error: "userId required" });

    const updates = {};
    if (displayName !== undefined) updates.displayName = displayName.trim().slice(0, 40);
    if (makeAdmin !== undefined) updates.isAdmin = Boolean(makeAdmin);

    if (newEmail) {
      const exists = await db.collection("users").findOne({ email: newEmail, _id: { $ne: new ObjectId(userId) } });
      if (exists) return res.status(400).json({ error: "Email already in use." });
      updates.email = newEmail;
    }

    if (newPassword) {
      if (newPassword.length < 6) return res.status(400).json({ error: "Password must be at least 6 characters." });
      updates.password = await bcrypt.hash(newPassword, 10);
    }

    if (Object.keys(updates).length === 0) return res.status(400).json({ error: "Nothing to update." });

    await db.collection("users").updateOne(
      { _id: new ObjectId(userId) },
      { $set: updates }
    );

    return res.status(200).json({ message: "User updated." });
  }

  // DELETE /api/admin  → delete a user and their scores
  if (req.method === "DELETE") {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: "userId required" });

    // Prevent admin from deleting themselves
    if (userId === decoded.id) return res.status(400).json({ error: "Cannot delete your own account from admin panel." });

    await db.collection("users").deleteOne({ _id: new ObjectId(userId) });
    await db.collection("scores").deleteMany({ userId });

    return res.status(200).json({ message: "User and scores deleted." });
  }

  return res.status(405).json({ error: "Method not allowed" });
}