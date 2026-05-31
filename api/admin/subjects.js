import { ObjectId } from "mongodb";
import { requireAdmin } from "../_lib/auth.js";
import { getDb } from "../_lib/db.js";

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .slice(0, 50);
}

export default async function handler(req, res) {
  const admin = await requireAdmin(req, res);
  if (!admin) return;

  const db = await getDb();
  const subjects = db.collection("subjects");

  // ── GET: list all subjects (including inactive) ──────────
  if (req.method === "GET") {
    const list = await subjects.find({}).sort({ name: 1 }).toArray();
    return res.status(200).json({ subjects: list });
  }

  // ── POST: create new subject ──────────────────────────────
  if (req.method === "POST") {
    const { name, description, icon } = req.body || {};
    if (!name) return res.status(400).json({ error: "name is required" });

    const slug = slugify(name);
    const existing = await subjects.findOne({ slug });
    if (existing)
      return res
        .status(400)
        .json({ error: "Un subiect cu acest slug există deja." });

    const doc = {
      name: name.trim().slice(0, 80),
      slug,
      description: (description || "").trim().slice(0, 200),
      icon: (icon || "📚").slice(0, 4),
      isActive: true,
      questionsCount: 0,
      createdAt: new Date()
    };

    const result = await subjects.insertOne(doc);
    return res
      .status(201)
      .json({ message: "Subiect creat.", _id: result.insertedId });
  }

  // ── PATCH: update subject ─────────────────────────────────
  if (req.method === "PATCH") {
    const { subjectId, name, description, icon, isActive } = req.body || {};
    if (!subjectId)
      return res.status(400).json({ error: "subjectId required" });

    const updates = {};
    if (name !== undefined) {
      updates.name = name.trim().slice(0, 80);
      updates.slug = slugify(name);
    }
    if (description !== undefined)
      updates.description = description.trim().slice(0, 200);
    if (icon !== undefined) updates.icon = icon.slice(0, 4);
    if (isActive !== undefined) updates.isActive = Boolean(isActive);

    if (Object.keys(updates).length === 0)
      return res.status(400).json({ error: "Nimic de actualizat." });

    await subjects.updateOne(
      { _id: new ObjectId(subjectId) },
      { $set: updates }
    );

    return res.status(200).json({ message: "Subiect actualizat." });
  }

  // ── DELETE: soft delete (isActive = false) ────────────────
  if (req.method === "DELETE") {
    const { subjectId } = req.body || {};
    if (!subjectId)
      return res.status(400).json({ error: "subjectId required" });

    await subjects.updateOne(
      { _id: new ObjectId(subjectId) },
      { $set: { isActive: false } }
    );

    return res.status(200).json({ message: "Subiect dezactivat." });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
