import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";
import { requireAuth } from "./_lib/auth.js";
import { getDb } from "./_lib/db.js";

export default async function handler(req, res) {
  // Cookie-based auth (replaces Authorization: Bearer header)
  const user = await requireAuth(req, res);
  if (!user) return;

  const db = await getDb();

  // GET - fetch profile info
  if (req.method === "GET") {
    const profile = await db.collection("users").findOne(
      { _id: new ObjectId(user.id) },
      { projection: { password: 0 } }
    );
    if (!profile) return res.status(404).json({ error: "User not found" });
    return res.status(200).json(profile);
  }

  // PATCH - update email, password, displayName
  if (req.method === "PATCH") {
    const { newEmail, currentPassword, newPassword, displayName } =
      req.body || {};

    const dbUser = await db
      .collection("users")
      .findOne({ _id: new ObjectId(user.id) });
    if (!dbUser) return res.status(404).json({ error: "User not found" });

    const updates = {};

    if (displayName !== undefined) {
      updates.name = displayName.trim().slice(0, 40);
    }

    if (newEmail && newEmail !== dbUser.email) {
      const exists = await db
        .collection("users")
        .findOne({ email: newEmail.toLowerCase() });
      if (exists)
        return res.status(400).json({ error: "Email deja folosit." });
      updates.email = newEmail.toLowerCase();
    }

    if (newPassword) {
      if (!currentPassword)
        return res
          .status(400)
          .json({ error: "Parola curentă este necesară." });
      const valid = await bcrypt.compare(currentPassword, dbUser.password);
      if (!valid)
        return res.status(401).json({ error: "Parola curentă este greșită." });
      if (newPassword.length < 6)
        return res
          .status(400)
          .json({ error: "Parola nouă trebuie să aibă cel puțin 6 caractere." });
      updates.password = await bcrypt.hash(newPassword, 10);
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: "Nimic de actualizat." });
    }

    await db
      .collection("users")
      .updateOne({ _id: new ObjectId(user.id) }, { $set: updates });

    return res.status(200).json({
      message: "Profil actualizat cu succes.",
      email: updates.email || dbUser.email
    });
  }

  return res.status(405).json({ error: "Method not allowed" });
}