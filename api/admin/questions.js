import { ObjectId } from "mongodb";
import { requireAdmin } from "../_lib/auth.js";
import { getDb } from "../_lib/db.js";

export default async function handler(req, res) {
  const admin = await requireAdmin(req, res);
  if (!admin) return;

  const db = await getDb();
  const questions = db.collection("questions");
  const subjects = db.collection("subjects");

  // ── GET: list questions for a subject ────────────────────
  if (req.method === "GET") {
    const { subjectId } = req.query;
    if (!subjectId)
      return res.status(400).json({ error: "subjectId required" });

    const list = await questions
      .find({ subjectId: new ObjectId(subjectId) })
      .sort({ createdAt: 1 })
      .toArray();

    return res.status(200).json({ questions: list });
  }

  // ── POST: add single question OR bulk import ──────────────
  if (req.method === "POST") {
    const body = req.body || {};

    // ── BULK IMPORT — detect { subjectId, bulk: [...] } ──────
    if (Array.isArray(body.bulk)) {
      const { subjectId, bulk, skipDuplicates = true } = body;

      if (!subjectId)
        return res.status(400).json({ error: "subjectId required" });

      let subjectOid;
      try { subjectOid = new ObjectId(subjectId); }
      catch { return res.status(400).json({ error: "Invalid subjectId" }); }

      const subject = await subjects.findOne({ _id: subjectOid });
      if (!subject)
        return res.status(404).json({ error: "Subiect negăsit." });

      const errors = [];
      const docs = [];

      for (let i = 0; i < bulk.length; i++) {
        const q = bulk[i];
        if (!q.question || typeof q.question !== "string") {
          errors.push(`#${i + 1}: câmpul 'question' lipsește`);
          continue;
        }
        if (!Array.isArray(q.options) || q.options.length < 2) {
          errors.push(`#${i + 1}: '${q.question.slice(0, 40)}…' — trebuie cel puțin 2 opțiuni`);
          continue;
        }
        if (!Array.isArray(q.correct) || q.correct.length === 0) {
          errors.push(`#${i + 1}: '${q.question.slice(0, 40)}…' — lipsesc răspunsurile corecte`);
          continue;
        }
        docs.push({
          subjectId: subjectOid,
          question: q.question.trim(),
          options: q.options.map(o => String(o).trim()),
          correct: q.correct.map(Number),
          multiple: Boolean(q.multiple ?? q.correct.length > 1),
          createdAt: new Date()
        });
      }

      if (docs.length === 0) {
        return res.status(400).json({
          error: "Nicio întrebare validă în fișier.",
          details: errors
        });
      }

      // Optional: skip duplicates (same question text for same subject)
      let inserted = docs;
      if (skipDuplicates) {
        const existing = await questions
          .find({ subjectId: subjectOid }, { projection: { question: 1 } })
          .toArray();
        const existingSet = new Set(existing.map(q => q.question.trim().toLowerCase()));
        const dupes = [];
        inserted = docs.filter(d => {
          if (existingSet.has(d.question.toLowerCase())) {
            dupes.push(d.question.slice(0, 50));
            return false;
          }
          return true;
        });
        if (dupes.length > 0) {
          errors.push(`Sărite (duplicate): ${dupes.length} întrebări`);
        }
      }

      if (inserted.length > 0) {
        await questions.insertMany(inserted);
        await subjects.updateOne(
          { _id: subjectOid },
          { $inc: { questionsCount: inserted.length } }
        );
      }

      return res.status(201).json({
        message: `Import finalizat: ${inserted.length} adăugate din ${bulk.length} totale.`,
        imported: inserted.length,
        skipped: bulk.length - docs.length,
        duplicates: docs.length - inserted.length,
        warnings: errors
      });
    }

    // ── SINGLE QUESTION ───────────────────────────────────────
    const { subjectId, question, options, correct, multiple } = body;

    if (!subjectId || !question || !options || !correct) {
      return res
        .status(400)
        .json({ error: "subjectId, question, options, correct sunt obligatorii." });
    }

    if (!Array.isArray(options) || options.length < 2) {
      return res.status(400).json({ error: "Trebuie cel puțin 2 opțiuni." });
    }

    if (!Array.isArray(correct) || correct.length === 0) {
      return res.status(400).json({ error: "Trebuie cel puțin un răspuns corect." });
    }

    let subjectOid;
    try { subjectOid = new ObjectId(subjectId); }
    catch { return res.status(400).json({ error: "Invalid subjectId" }); }

    const subject = await subjects.findOne({ _id: subjectOid });
    if (!subject) return res.status(404).json({ error: "Subiect negăsit." });

    const doc = {
      subjectId: subjectOid,
      question: question.trim(),
      options: options.map(o => String(o).trim()),
      correct: correct.map(Number),
      multiple: Boolean(multiple || correct.length > 1),
      createdAt: new Date()
    };

    await questions.insertOne(doc);
    await subjects.updateOne({ _id: subjectOid }, { $inc: { questionsCount: 1 } });

    return res.status(201).json({ message: "Întrebare adăugată." });
  }

  // ── PATCH: edit question ──────────────────────────────────
  if (req.method === "PATCH") {
    const { questionId, question, options, correct, multiple } = req.body || {};

    if (!questionId) return res.status(400).json({ error: "questionId required" });

    const updates = {};
    if (question !== undefined) updates.question = question.trim();
    if (options !== undefined) updates.options = options.map(o => String(o).trim());
    if (correct !== undefined) {
      updates.correct = correct.map(Number);
      updates.multiple = Boolean(multiple ?? correct.length > 1);
    }

    if (Object.keys(updates).length === 0)
      return res.status(400).json({ error: "Nimic de actualizat." });

    await questions.updateOne({ _id: new ObjectId(questionId) }, { $set: updates });
    return res.status(200).json({ message: "Întrebare actualizată." });
  }

  // ── DELETE: remove question ───────────────────────────────
  if (req.method === "DELETE") {
    const { questionId } = req.body || {};
    if (!questionId) return res.status(400).json({ error: "questionId required" });

    const q = await questions.findOne({ _id: new ObjectId(questionId) });
    if (!q) return res.status(404).json({ error: "Întrebare negăsită." });

    await questions.deleteOne({ _id: new ObjectId(questionId) });
    await subjects.updateOne({ _id: q.subjectId }, { $inc: { questionsCount: -1 } });

    return res.status(200).json({ message: "Întrebare ștearsă." });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
