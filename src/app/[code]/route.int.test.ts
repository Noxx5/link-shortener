import { describe, expect, it, vi } from "vitest";

vi.mock("next/server", () => ({
  after: (callback: () => unknown) => {
    void callback();
  },
}));

import { db } from "@/lib/db";
import { GET } from "@/app/[code]/route";

function call(code: string, headers?: HeadersInit) {
  return GET(new Request(`http://localhost:3100/${code}`, { headers }), {
    params: Promise.resolve({ code }),
  });
}

describe("GET /[code]", () => {
  it("antwortet mit 404 bei ungültigem Format", async () => {
    expect((await call("a!b")).status).toBe(404);
  });

  it("antwortet mit 404 bei unbekanntem Code", async () => {
    expect((await call("Unknown7")).status).toBe(404);
  });

  it("antwortet mit 410 bei abgelaufenem Link", async () => {
    await db.link.create({
      data: {
        code: "Expired7",
        url: "https://example.com",
        expiresAt: new Date(Date.now() - 60_000),
      },
    });

    expect((await call("Expired7")).status).toBe(410);
  });

  it("leitet mit 307 weiter und speichert den Klick", async () => {
    await db.link.create({
      data: { code: "Valid777", url: "https://example.com/ziel" },
    });

    const response = await call("Valid777", {
      referer: "https://ref.example/",
    });

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("https://example.com/ziel");

    await vi.waitFor(async () => {
      const clicks = await db.click.findMany();
      expect(clicks).toHaveLength(1);
      expect(clicks[0].referrer).toBe("https://ref.example/");
    });
  });
});
