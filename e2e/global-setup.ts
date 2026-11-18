import { Client } from "pg";

export default async function globalSetup() {
  if (process.env.ALLOW_DB_RESET !== "true") {
    throw new Error("Abbruch: E2E-Tests nur mit `npm run test:e2e` starten.");
  }

  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();

  try {
    await client.query('DELETE FROM "Click"');
    await client.query('DELETE FROM "Link"');
  } finally {
    await client.end();
  }
}
