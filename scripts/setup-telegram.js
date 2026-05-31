/**
 * setup-telegram.js
 * Run once to register the Telegram webhook:
 *   node scripts/setup-telegram.js
 *
 * Requires TELEGRAM_BOT_TOKEN in .env
 * Set WEBHOOK_URL to your Vercel deployment URL, or pass as argument:
 *   node scripts/setup-telegram.js https://net-quizz-v2.vercel.app
 */

import * as dotenv from "dotenv";
dotenv.config();

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
if (!TOKEN) {
  console.error("❌  TELEGRAM_BOT_TOKEN not set in .env");
  process.exit(1);
}

const baseUrl = process.argv[2] || "https://net-quizz-v2.vercel.app";
const webhookUrl = `${baseUrl.replace(/\/$/, "")}/api/telegram`;

async function main() {
  console.log(`🤖  Setting Telegram webhook to: ${webhookUrl}`);

  const res = await fetch(
    `https://api.telegram.org/bot${TOKEN}/setWebhook`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: webhookUrl,
        allowed_updates: ["callback_query", "message"]
      })
    }
  );

  const data = await res.json();

  if (data.ok) {
    console.log("✅  Webhook set successfully!");
    console.log(`   URL: ${webhookUrl}`);
  } else {
    console.error("❌  Failed to set webhook:", data.description);
    process.exit(1);
  }

  // Get webhook info to confirm
  const infoRes = await fetch(
    `https://api.telegram.org/bot${TOKEN}/getWebhookInfo`
  );
  const info = await infoRes.json();
  if (info.ok) {
    console.log("\n📋  Current webhook info:");
    console.log(`   URL: ${info.result.url}`);
    console.log(`   Pending updates: ${info.result.pending_update_count}`);
    if (info.result.last_error_message) {
      console.warn(`   ⚠️  Last error: ${info.result.last_error_message}`);
    }
  }
}

main().catch(err => {
  console.error("❌  Error:", err);
  process.exit(1);
});
