import { MongoClient } from "mongodb";
import jwt from "jsonwebtoken";

const client = new MongoClient(process.env.MONGODB_URI);

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

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

  const scores = await db.collection("scores")
    .find({ userId: decoded.id })
    .sort({ createdAt: -1 })
    .limit(50)
    .toArray();

  return res.status(200).json({ scores });
}