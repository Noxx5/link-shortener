import { after } from "next/server";
import { db } from "@/lib/db";

const CODE_PATTERN = /^[A-Za-z0-9_-]{1,32}$/;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ code: string }> },
) {
  const { code } = await params;

  if (!CODE_PATTERN.test(code)) {
    return new Response("Nicht gefunden", { status: 404 });
  }

  const link = await db.link.findUnique({ where: { code } });

  if (!link) {
    return new Response("Nicht gefunden", { status: 404 });
  }

  if (link.expiresAt && link.expiresAt < new Date()) {
    return new Response("Dieser Link ist abgelaufen", { status: 410 });
  }

  // Klick erst nach der Antwort speichern, damit die Weiterleitung schnell bleibt
  after(async () => {
    try {
      await db.click.create({
        data: { linkId: link.id, referrer: request.headers.get("referer") },
      });
    } catch (error) {
      console.error("Klick konnte nicht gespeichert werden", error);
    }
  });

  return Response.redirect(link.url, 307);
}
