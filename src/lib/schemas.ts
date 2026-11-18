import { z } from "zod";

function parseUrl(value: string): URL | null {
  return URL.canParse(value) ? new URL(value) : null;
}

export function createUrlSchema(ownHost?: string) {
  return z
    .string()
    .trim()
    .max(2048, "Die URL ist zu lang")
    .pipe(z.url("Bitte eine gültige URL eingeben"))
    .refine((value) => {
      const url = parseUrl(value);
      return !url || ["http:", "https:"].includes(url.protocol);
    }, "Nur http und https sind erlaubt")
    .refine((value) => {
      const url = parseUrl(value);
      return !ownHost || !url || url.host !== ownHost;
    }, "Links auf diese Seite sind nicht erlaubt");
}
