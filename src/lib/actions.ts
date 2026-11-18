"use server";

import { revalidatePath } from "next/cache";
import { env } from "@/lib/env";
import { createLink } from "@/lib/links";
import { createUrlSchema } from "@/lib/schemas";

export type CreateLinkState =
  | { ok: true; shortUrl: string }
  | { ok: false; error: string }
  | null;

export async function createLinkAction(
  _prev: CreateLinkState,
  formData: FormData,
): Promise<CreateLinkState> {
  const ownHost = new URL(env.BASE_URL).host;
  const parsed = createUrlSchema(ownHost).safeParse(
    String(formData.get("url") ?? ""),
  );

  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0].message };
  }

  try {
    const link = await createLink(parsed.data);
    revalidatePath("/");
    return { ok: true, shortUrl: `${env.BASE_URL}/${link.code}` };
  } catch {
    return {
      ok: false,
      error: "Etwas ist schiefgelaufen. Bitte versuche es erneut.",
    };
  }
}
