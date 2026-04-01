import { MongoClient } from "mongodb";
import jwt from "jsonwebtoken";

const client = new MongoClient(process.env.MONGODB_URI);

export default async function handler(req, res) {
  const token = req.headers.authorization?.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    await client.connect();
    const db = client.db("quiz");

    await db.collection("scores").insertOne({
      userId: decoded.id,
      ...req.body,
      createdAt: new Date()
    });

    return res.status(200).json({ message: "Saved" });

  } catch (err) {
    console.error("SaveScore error:", err);
    return res.status(401).json({ error: "Unauthorized" });
  }
}
