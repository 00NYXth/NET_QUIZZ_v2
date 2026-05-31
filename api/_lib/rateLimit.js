import { getDb } from "./db.js";

// Rate limit: max 5 attempts per 15 minutes per IP+email combo
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function getIp(req) {
  return (
    req.headers["x-forwarded-for"]?.split(",")[0].trim() ||
    req.socket?.remoteAddress ||
    "unknown"
  );
}

export async function checkRateLimit(req, email) {
  const db = await getDb();
  const col = db.collection("loginAttempts");

  // Ensure TTL index exists (fires once, ignored if already exists)
  col.createIndex(
    { windowStart: 1 },
    { expireAfterSeconds: WINDOW_MS / 1000, background: true }
  ).catch(() => {});

  const ip = getIp(req);
  const key = { ip, email: email.toLowerCase() };
  const now = new Date();
  const windowStart = new Date(now - WINDOW_MS);

  const record = await col.findOne(key);

  if (!record || record.windowStart < windowStart) {
    // No record or window expired — reset
    await col.updateOne(
      key,
      { $set: { attempts: 1, windowStart: now } },
      { upsert: true }
    );
    return { allowed: true };
  }

  if (record.attempts >= MAX_ATTEMPTS) {
    const retryAfter = Math.ceil(
      (record.windowStart.getTime() + WINDOW_MS - now.getTime()) / 1000
    );
    return { allowed: false, retryAfter };
  }

  await col.updateOne(key, { $inc: { attempts: 1 } });
  return { allowed: true };
}

export async function resetRateLimit(req, email) {
  const db = await getDb();
  const ip = getIp(req);
  await db.collection("loginAttempts").deleteOne({
    ip,
    email: email.toLowerCase()
  });
}
