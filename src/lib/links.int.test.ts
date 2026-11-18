import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/code", () => ({ generateCode: vi.fn() }));

import { db } from "@/lib/db";
import { generateCode } from "@/lib/code";
import { createLink } from "@/lib/links";

beforeEach(() => {
  vi.mocked(generateCode).mockReset();
});

describe("createLink", () => {
  it("speichert den Link mit Code und URL", async () => {
    vi.mocked(generateCode).mockReturnValue("AAAAAAA");

    const link = await createLink("https://example.com");

    expect(link.code).toBe("AAAAAAA");
    expect(await db.link.count()).toBe(1);
  });

  it("versucht es bei einer Kollision mit einem neuen Code erneut", async () => {
    vi.mocked(generateCode)
      .mockReturnValueOnce("AAAAAAA")
      .mockReturnValueOnce("AAAAAAA")
      .mockReturnValueOnce("BBBBBBB");

    await createLink("https://a.example");
    const second = await createLink("https://b.example");

    expect(second.code).toBe("BBBBBBB");
    expect(await db.link.count()).toBe(2);
  });

  it("gibt nach drei Kollisionen auf", async () => {
    vi.mocked(generateCode).mockReturnValue("AAAAAAA");

    await createLink("https://a.example");

    await expect(createLink("https://b.example")).rejects.toThrow(
      "Konnte keinen eindeutigen Code erzeugen",
    );
  });
});
