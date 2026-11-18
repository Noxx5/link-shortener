import { afterAll, beforeAll, beforeEach } from "vitest";
import { db } from "@/lib/db";

beforeAll(() => {
  if (process.env.ALLOW_DB_RESET !== "true") {
    throw new Error(
      "Abbruch: ALLOW_DB_RESET ist nicht gesetzt. Integrationstests nur mit `npm run test:int` starten.",
    );
  }
});

beforeEach(async () => {
  await db.click.deleteMany();
  await db.link.deleteMany();
});

afterAll(async () => {
  await db.$disconnect();
});
