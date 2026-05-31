import jwt from "jsonwebtoken";

// ── Cookie name ──────────────────────────────────────────────
const COOKIE_NAME = "nq_session";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days in seconds

// ── Admin check ──────────────────────────────────────────────
function isAdminEmail(email) {
  const admins = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map(e => e.trim().toLowerCase())
    .filter(Boolean);
  return admins.includes(email.toLowerCase());
}

// ── Cookie parser (no external dependency) ───────────────────
function parseCookies(req) {
  const raw = req.headers.cookie || "";
  const result = {};
  raw.split(";").forEach(pair => {
    const idx = pair.indexOf("=");
    if (idx < 0) return;
    const key = pair.slice(0, idx).trim();
    const val = pair.slice(idx + 1).trim();
    result[key] = decodeURIComponent(val);
  });
  return result;
}

// ── Set httpOnly session cookie ───────────────────────────────
export function setAuthCookie(res, token) {
  const isSecure = process.env.NODE_ENV !== "development";
  const cookieStr = [
    `${COOKIE_NAME}=${encodeURIComponent(token)}`,
    `Max-Age=${COOKIE_MAX_AGE}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Strict",
    ...(isSecure ? ["Secure"] : [])
  ].join("; ");
  res.setHeader("Set-Cookie", cookieStr);
}

// ── Clear session cookie ──────────────────────────────────────
export function clearAuthCookie(res) {
  res.setHeader(
    "Set-Cookie",
    `${COOKIE_NAME}=; Max-Age=0; Path=/; HttpOnly; SameSite=Strict`
  );
}

// ── Extract user from cookie (returns null if invalid) ────────
export function extractUser(req) {
  const cookies = parseCookies(req);
  const token = cookies[COOKIE_NAME];
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded; // { id, email, role, status }
  } catch {
    return null;
  }
}

// ── requireAuth — returns user payload or sends 401 ───────────
export async function requireAuth(req, res) {
  const user = extractUser(req);
  if (!user) {
    res.status(401).json({ error: "Unauthorized. Please log in." });
    return null;
  }
  return user;
}

// ── requireApproved — user must have status=approved ─────────
export async function requireApproved(req, res) {
  const user = await requireAuth(req, res);
  if (!user) return null;

  if (user.status !== "approved") {
    res.status(403).json({ error: "Contul tău nu a fost aprobat încă." });
    return null;
  }
  return user;
}

// ── requireAdmin — role must be admin ────────────────────────
export async function requireAdmin(req, res) {
  const user = await requireAuth(req, res);
  if (!user) return null;

  // Accept both DB role and ADMIN_EMAILS env var
  if (user.role !== "admin" && !isAdminEmail(user.email)) {
    res.status(403).json({ error: "Forbidden: Admin access only." });
    return null;
  }
  return user;
}

// ── Build JWT payload for a user document ────────────────────
export function buildToken(user) {
  const role =
    user.role === "admin" || isAdminEmail(user.email) ? "admin" : "user";
  return jwt.sign(
    {
      id: user._id.toString(),
      email: user.email,
      role,
      status: user.status || "approved"
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}
