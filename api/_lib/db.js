import { MongoClient } from "mongodb";

// Singleton MongoDB client — reused across warm serverless invocations
let client = null;
let db = null;

export async function getDb() {
  if (db) return db;

  if (!client) {
    client = new MongoClient(process.env.MONGODB_URI);
  }

  await client.connect();
  db = client.db("quiz");
  return db;
}
