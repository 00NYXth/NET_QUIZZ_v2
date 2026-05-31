import bcrypt from "bcryptjs";
import { getDb } from "../_lib/db.js";
import { buildToken, setAuthCookie } from "../_lib/auth.js";
import { checkRateLimit, resetRateLimit } from "../_lib/rateLimit.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ error: "Email și parola sunt obligatorii." });
  }

  // ── Rate limiting ──────────────────────────────────────────
  const rateCheck = await checkRateLimit(req, email);
  if (!rateCheck.allowed) {
    const minutes = Math.ceil(rateCheck.retryAfter / 60);
    return res.status(429).json({
      error: `Prea multe încercări. Încearcă din nou în ${minutes} minute.`
    });
  }

  try {
    const db = await getDb();
    const user = await db
      .collection("users")
      .findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(401).json({ error: "Email sau parolă incorectă." });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: "Email sau parolă incorectă." });
    }

    // ── Status check ───────────────────────────────────────
    if (user.status === "pending") {
      return res.status(403).json({
        error:
          "Contul tău nu a fost aprobat încă. Vei fi notificat când ești aprobat.",
        status: "pending"
      });
    }

    if (user.status === "rejected") {
      return res.status(403).json({
        error: "Cererea ta de acces a fost respinsă.",
        status: "rejected"
      });
    }

    // ── Success — reset rate limit, issue cookie ───────────
    await resetRateLimit(req, email);

    const token = buildToken(user);
    setAuthCookie(res, token);

    const role =
      user.role === "admin" ||
      (process.env.ADMIN_EMAILS || "")
        .split(",")
        .map(e => e.trim().toLowerCase())
        .includes(user.email)
        ? "admin"
        : "user";

    return res.status(200).json({
      email: user.email,
      role,
      status: user.status,
      name: user.name || user.displayName || ""
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Eroare server. Încearcă din nou." });
  }
}
