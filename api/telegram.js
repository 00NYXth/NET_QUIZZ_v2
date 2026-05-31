import { ObjectId } from "mongodb";
import { getDb } from "./_lib/db.js";

const TG_API = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;

// ── Helper: send request to Telegram API ─────────────────────
async function tgCall(method, body) {
  const res = await fetch(`${TG_API}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  return res.json();
}

// ── Exported: send registration notification ─────────────────
export async function sendTelegramNotification(user) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_ADMIN_CHAT_ID;
  if (!token || !chatId) return;

  const date = new Date(user.createdAt).toLocaleString("ro-RO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  const text =
    `🔔 <b>Cerere de acces nouă!</b>\n\n` +
    `👤 Nume: ${user.name || "—"}\n` +
    `📧 Email: <code>${user.email}</code>\n` +
    `🕐 Data: ${date}\n\n` +
    `Aprobă sau respinge accesul:`;

  await tgCall("sendMessage", {
    chat_id: chatId,
    text,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "✅ Aprobă",
            callback_data: `approve_${user._id}`
          },
          {
            text: "❌ Respinge",
            callback_data: `reject_${user._id}`
          }
        ]
      ]
    }
  });
}

// ── Main webhook handler ──────────────────────────────────────
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const update = req.body;

  // Handle callback_query (button press)
  if (update.callback_query) {
    const query = update.callback_query;
    const adminChatId = process.env.TELEGRAM_ADMIN_CHAT_ID;

    // Security: only process from admin chat
    if (String(query.from.id) !== String(adminChatId)) {
      await tgCall("answerCallbackQuery", {
        callback_query_id: query.id,
        text: "⛔ Acces interzis."
      });
      return res.status(200).json({ ok: true });
    }

    const data = query.data || "";
    let action, userId;

    if (data.startsWith("approve_")) {
      action = "approved";
      userId = data.replace("approve_", "");
    } else if (data.startsWith("reject_")) {
      action = "rejected";
      userId = data.replace("reject_", "");
    } else {
      return res.status(200).json({ ok: true });
    }

    try {
      const db = await getDb();
      const now = new Date();

      const updateResult = await db.collection("users").updateOne(
        { _id: new ObjectId(userId) },
        {
          $set: {
            status: action,
            approvedAt: now,
            approvedBy: String(query.from.id)
          }
        }
      );

      const timeStr = now.toLocaleTimeString("ro-RO", {
        hour: "2-digit",
        minute: "2-digit"
      });

      const confirmText =
        action === "approved"
          ? `✅ <b>Aprobat</b> de admin la ${timeStr}`
          : `❌ <b>Respins</b> de admin la ${timeStr}`;

      // Edit original message
      await tgCall("editMessageText", {
        chat_id: query.message.chat.id,
        message_id: query.message.message_id,
        text: query.message.text + "\n\n" + confirmText,
        parse_mode: "HTML",
        reply_markup: { inline_keyboard: [] }
      });

      // Answer callback query
      await tgCall("answerCallbackQuery", {
        callback_query_id: query.id,
        text:
          action === "approved"
            ? "✅ Utilizator aprobat!"
            : "❌ Utilizator respins."
      });
    } catch (err) {
      console.error("Telegram webhook error:", err);
      await tgCall("answerCallbackQuery", {
        callback_query_id: query.id,
        text: "⚠️ Eroare la procesare."
      });
    }
  }

  return res.status(200).json({ ok: true });
}
