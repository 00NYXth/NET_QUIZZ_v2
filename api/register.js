import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

const client = new MongoClient(process.env.MONGO_URI);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters." });
  }

  try {
    await client.connect();
    const db = client.db("quiz");

    const existing = await db.collection("users").findOne({ email });
    if (existing) return res.status(400).json({ error: "An account with this email already exists." });

    const hashed = await bcrypt.hash(password, 10);

    await db.collection("users").insertOne({ email, password: hashed, createdAt: new Date() });

    res.status(200).json({ message: "Account created successfully!" });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Server error. Please try again." });
  }
}