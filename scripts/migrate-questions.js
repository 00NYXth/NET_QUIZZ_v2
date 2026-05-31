/**
 * migrate-questions.js
 * Run once: node scripts/migrate-questions.js
 *
 * What it does:
 * 1. Creates the "C#" subject in the `subjects` collection
 * 2. Migrates all questions from questions_data.js → `questions` collection
 * 3. Updates questionsCount on the subject
 * 4. Upgrades existing users: adds status="approved", role="user"
 * 5. Sets role="admin" for emails in ADMIN_EMAILS env var
 */

import { MongoClient } from "mongodb";
import { createRequire } from "module";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import * as dotenv from "dotenv";

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

// Load questions_data.js (CommonJS export)
const ALL_QUESTIONS = require(join(__dirname, "../questions_data.js"));

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("❌  MONGODB_URI not set in .env");
  process.exit(1);
}

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || "")
  .split(",")
  .map(e => e.trim().toLowerCase())
  .filter(Boolean);

async function main() {
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  console.log("✅  Connected to MongoDB");

  const db = client.db("quiz");

  // ── 1. Create or find the C# subject ──────────────────────
  console.log("\n📚  Setting up C# subject…");
  let subject = await db.collection("subjects").findOne({ slug: "csharp" });

  if (!subject) {
    const result = await db.collection("subjects").insertOne({
      name: "C#",
      slug: "csharp",
      description: "Întrebări despre limbajul de programare C# și platforma .NET",
      icon: "💻",
      isActive: true,
      questionsCount: 0,
      createdAt: new Date()
    });
    subject = { _id: result.insertedId, name: "C#" };
    console.log(`   ✅  Subject "C#" created (id: ${subject._id})`);
  } else {
    console.log(`   ℹ️   Subject "C#" already exists (id: ${subject._id}), skipping create`);
  }

  // ── 2. Migrate questions ───────────────────────────────────
  console.log("\n❓  Migrating questions…");
  const existingCount = await db.collection("questions").countDocuments({
    subjectId: subject._id
  });

  if (existingCount > 0) {
    console.log(`   ℹ️   ${existingCount} questions already exist for C#, skipping migration`);
  } else {
    const docs = ALL_QUESTIONS.map(q => ({
      subjectId: subject._id,
      question: q.question,
      options: q.options,
      correct: q.correct,
      multiple: q.multiple || false,
      createdAt: new Date()
    }));

    await db.collection("questions").insertMany(docs);
    console.log(`   ✅  Inserted ${docs.length} questions`);

    // Update questionsCount
    await db.collection("subjects").updateOne(
      { _id: subject._id },
      { $set: { questionsCount: docs.length } }
    );
    console.log(`   ✅  questionsCount updated to ${docs.length}`);
  }

  // ── 3. Upgrade existing users ──────────────────────────────
  console.log("\n👥  Upgrading existing users…");

  // Add status="approved" and role="user" where missing
  const userResult = await db.collection("users").updateMany(
    { status: { $exists: false } },
    {
      $set: {
        status: "approved",
        role: "user",
        approvedAt: new Date(),
        approvedBy: "migration"
      }
    }
  );
  console.log(`   ✅  ${userResult.modifiedCount} users upgraded to status=approved`);

  // Fill in missing role field on already-approved users
  const roleResult = await db.collection("users").updateMany(
    { role: { $exists: false } },
    { $set: { role: "user" } }
  );
  console.log(`   ✅  ${roleResult.modifiedCount} users got role=user`);

  // ── 4. Set admin role ──────────────────────────────────────
  if (ADMIN_EMAILS.length > 0) {
    console.log(`\n🛡️   Setting admin role for: ${ADMIN_EMAILS.join(", ")}`);
    const adminResult = await db.collection("users").updateMany(
      { email: { $in: ADMIN_EMAILS } },
      { $set: { role: "admin", status: "approved" } }
    );
    console.log(`   ✅  ${adminResult.modifiedCount} admin(s) updated`);
  } else {
    console.log("\n⚠️   ADMIN_EMAILS not set — no admins configured in DB");
  }

  await client.close();
  console.log("\n🎉  Migration complete!\n");
}

main().catch(err => {
  console.error("❌  Migration failed:", err);
  process.exit(1);
});
