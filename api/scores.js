import { requireApproved } from "./_lib/auth.js";
import { getDb } from "./_lib/db.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const user = await requireApproved(req, res);
  if (!user) return;

  try {
    const db = await getDb();
    const scores = await db
      .collection("scores")
      .find({ userId: user.id })
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();

    return res.status(200).json({ scores });
  } catch (err) {
    console.error("Scores error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}