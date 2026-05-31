import { ObjectId } from "mongodb";
import { requireAuth } from "../_lib/auth.js";
import { getDb } from "../_lib/db.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const tokenUser = await requireAuth(req, res);
  if (!tokenUser) return;

  try {
    const db = await getDb();
    const user = await db.collection("users").findOne(
      { _id: new ObjectId(tokenUser.id) },
      { projection: { password: 0 } }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const adminEmails = (process.env.ADMIN_EMAILS || "")
      .split(",")
      .map(e => e.trim().toLowerCase());
    const role =
      user.role === "admin" || adminEmails.includes(user.email)
        ? "admin"
        : "user";

    return res.status(200).json({
      id: user._id.toString(),
      email: user.email,
      name: user.name || user.displayName || "",
      role,
      status: user.status || "approved"
    });
  } catch (err) {
    console.error("Me error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
