import { requireApproved } from "./_lib/auth.js";
import { getDb } from "./_lib/db.js";

// Allowlist of fields — prevents req.body spread injection
const ALLOWED_FIELDS = ["score", "correct", "total", "mode", "subjectId", "subjectName"];

export default async function handler(req, res) {
  const user = await requireApproved(req, res);
  if (!user) return;

  const db = await getDb();

  // ── GET: fetch user's score history ──────────────────────────
  if (req.method === "GET") {
    try {
      const scores = await db
        .collection("scores")
        .find({ userId: user.id })
        .sort({ createdAt: -1 })
        .limit(50)
        .toArray();

      return res.status(200).json({ scores });
    } catch (err) {
      console.error("Scores GET error:", err);
      return res.status(500).json({ error: "Server error" });
    }
  }

  // ── POST: save a new score ────────────────────────────────────
  if (req.method === "POST") {
    try {
      const body = req.body || {};

      // Sanitize: only pick known fields
      const doc = { userId: user.id, createdAt: new Date() };
      for (const field of ALLOWED_FIELDS) {
        if (body[field] !== undefined) doc[field] = body[field];
      }

      if (typeof doc.correct !== "number" || typeof doc.total !== "number") {
        return res
          .status(400)
          .json({ error: "correct and total are required numbers" });
      }

      await db.collection("scores").insertOne(doc);
      return res.status(200).json({ message: "Saved" });
    } catch (err) {
      console.error("Scores POST error:", err);
      return res.status(500).json({ error: "Server error" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}