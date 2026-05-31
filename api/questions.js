import { ObjectId } from "mongodb";
import { requireApproved } from "./_lib/auth.js";
import { getDb } from "./_lib/db.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const user = await requireApproved(req, res);
  if (!user) return;

  const { subjectId } = req.query;
  if (!subjectId) {
    return res.status(400).json({ error: "subjectId is required" });
  }

  try {
    const db = await getDb();

    // Validate subject exists and is active
    let subjectOid;
    try {
      subjectOid = new ObjectId(subjectId);
    } catch {
      return res.status(400).json({ error: "Invalid subjectId" });
    }

    const subject = await db
      .collection("subjects")
      .findOne({ _id: subjectOid, isActive: true });

    if (!subject) {
      return res
        .status(404)
        .json({ error: "Subject not found or inactive" });
    }

    const questions = await db
      .collection("questions")
      .find({ subjectId: subjectOid })
      .project({ createdAt: 0 })
      .toArray();

    return res.status(200).json({ questions, subject: subject.name });
  } catch (err) {
    console.error("Questions error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
