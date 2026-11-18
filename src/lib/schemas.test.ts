import { describe, it, expect } from "vitest";
import { createUrlSchema } from "./schemas";

const schema = createUrlSchema("kurz.example");

describe("urlSchema", () => {
  it("akzeptiert http und https", () => {
    expect(schema.safeParse("https://example.com/a?b=1").success).toBe(true);
    expect(schema.safeParse("http://example.com").success).toBe(true);
  });

  it("entfernt Leerzeichen am Rand", () => {
    const result = schema.safeParse("  https://example.com  ");
    expect(result.success && result.data).toBe("https://example.com");
  });

  it("lehnt andere Protokolle ab", () => {
    expect(schema.safeParse("javascript:alert(1)").success).toBe(false);
    expect(schema.safeParse("ftp://example.com").success).toBe(false);
  });

  it("lehnt URLs ohne Protokoll ab", () => {
    const result = schema.safeParse("example.com");
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Bitte eine gültige URL eingeben",
      );
    }
  });

  it("lehnt zu lange URLs ab", () => {
    const long = "https://example.com/" + "a".repeat(2100);
    expect(schema.safeParse(long).success).toBe(false);
  });

  it("lehnt Links auf die eigene Domain ab", () => {
    expect(schema.safeParse("https://kurz.example/abc").success).toBe(false);
  });
});
