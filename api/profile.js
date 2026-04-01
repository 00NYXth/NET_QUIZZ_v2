import { MongoClient, ObjectId } from "mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const client = new MongoClient(process.env.MONGODB_URI);

export default async function handler(req, res) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }

  await client.connect();
  const db = client.db("quiz");

  // GET - fetch profile info
  if (req.method === "GET") {
    const user = await db.collection("users").findOne(
      { _id: new ObjectId(decoded.id) },
      { projection: { password: 0 } }
    );
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.status(200).json(user);
  }

  // PATCH - update email or password
  if (req.method === "PATCH") {
    const { newEmail, currentPassword, newPassword, displayName } = req.body;
    const user = await db.collection("users").findOne({ _id: new ObjectId(decoded.id) });
    if (!user) return res.status(404).json({ error: "User not found" });

    const updates = {};

    if (displayName !== undefined) {
      updates.displayName = displayName.trim().slice(0, 40);
    }

    if (newEmail && newEmail !== user.email) {
      const exists = await db.collection("users").findOne({ email: newEmail });
      if (exists) return res.status(400).json({ error: "Email already in use." });
      updates.email = newEmail;
    }

    if (newPassword) {
      if (!currentPassword) return res.status(400).json({ error: "Current password required." });
      const valid = await bcrypt.compare(currentPassword, user.password);
      if (!valid) return res.status(401).json({ error: "Current password is wrong." });
      if (newPassword.length < 6) return res.status(400).json({ error: "New password must be at least 6 characters." });
      updates.password = await bcrypt.hash(newPassword, 10);
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: "Nothing to update." });
    }

    await db.collection("users").updateOne(
      { _id: new ObjectId(decoded.id) },
      { $set: updates }
    );

    return res.status(200).json({ message: "Profile updated successfully.", email: updates.email || user.email });
  }

  return res.status(405).json({ error: "Method not allowed" });
}