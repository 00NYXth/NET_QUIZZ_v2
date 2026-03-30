import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const client = new MongoClient(process.env.MONGO_URI);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    await client.connect();
    const db = client.db("quiz");

    const user = await db.collection("users").findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found." });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Wrong password." });

    const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({ token, email });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error. Please try again." });
  }
}