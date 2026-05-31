import { requireAuth } from "./_lib/auth.js";
import { getDb } from "./_lib/db.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const user = await requireAuth(req, res);
  if (!user) return;

  try {
    const db = await getDb();
    const subjects = await db
      .collection("subjects")
      .find({ isActive: true })
      .project({ name: 1, slug: 1, description: 1, icon: 1, questionsCount: 1 })
      .sort({ name: 1 })
      .toArray();

    return res.status(200).json({ subjects });
  } catch (err) {
    console.error("Subjects error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
