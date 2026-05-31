import { requireApproved } from "./_lib/auth.js";
import { getDb } from "./_lib/db.js";

// Allowlist of fields that can be saved — prevents req.body spread injection
const ALLOWED_FIELDS = ["score", "correct", "total", "mode", "subjectId", "subjectName"];

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const user = await requireApproved(req, res);
  if (!user) return;

  try {
    const db = await getDb();
    const body = req.body || {};

    // Sanitize: only pick known fields — no ...req.body spread
    const doc = {
      userId: user.id,
      createdAt: new Date()
    };

    for (const field of ALLOWED_FIELDS) {
      if (body[field] !== undefined) {
        doc[field] = body[field];
      }
    }

    // Basic validation
    if (typeof doc.correct !== "number" || typeof doc.total !== "number") {
      return res.status(400).json({ error: "correct and total are required numbers" });
    }

    await db.collection("scores").insertOne(doc);
    return res.status(200).json({ message: "Saved" });
  } catch (err) {
    console.error("SaveScore error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
