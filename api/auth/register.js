import bcrypt from "bcryptjs";
import { getDb } from "../_lib/db.js";
import { sendTelegramNotification } from "../telegram.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, password, name } = req.body || {};

  // Validate
  if (!email || !password) {
    return res.status(400).json({ error: "Email și parola sunt obligatorii." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Adresă de email invalidă." });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ error: "Parola trebuie să aibă cel puțin 6 caractere." });
  }

  try {
    const db = await getDb();
    const users = db.collection("users");

    const existing = await users.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res
        .status(400)
        .json({ error: "Un cont cu acest email există deja." });
    }

    const hashed = await bcrypt.hash(password, 10);
    const now = new Date();

    const newUser = {
      email: email.toLowerCase(),
      password: hashed,
      name: (name || "").trim().slice(0, 40),
      status: "pending",
      role: "user",
      createdAt: now,
      approvedAt: null,
      approvedBy: null
    };

    const result = await users.insertOne(newUser);

    // Send Telegram notification (non-blocking — don't fail register if it fails)
    try {
      await sendTelegramNotification({
        _id: result.insertedId,
        email: newUser.email,
        name: newUser.name,
        createdAt: now
      });
    } catch (tgErr) {
      console.error("Telegram notification failed:", tgErr.message);
    }

    return res.status(200).json({
      message:
        "Cererea de acces a fost trimisă. Vei fi notificat când ești aprobat."
    });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ error: "Eroare server. Încearcă din nou." });
  }
}
