import { Prisma } from "@/generated/prisma/client";
import { db } from "@/lib/db";
import { generateCode } from "@/lib/code";

const MAX_ATTEMPTS = 3;

export async function createLink(url: string, expiresAt?: Date) {
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    try {
      return await db.link.create({
        data: { code: generateCode(), url, expiresAt },
      });
    } catch (error) {
      const isCollision =
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002";
      if (!isCollision) throw error;
    }
  }
  throw new Error("Konnte keinen eindeutigen Code erzeugen");
}
