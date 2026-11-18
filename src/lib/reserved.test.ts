import { describe, it, expect } from "vitest";
import { isReservedCode } from "./reserved";

describe("isReservedCode", () => {
  it("erkennt reservierte Wörter", () => {
    expect(isReservedCode("stats")).toBe(true);
    expect(isReservedCode("api")).toBe(true);
  });

  it("ignoriert Groß- und Kleinschreibung", () => {
    expect(isReservedCode("Stats")).toBe(true);
  });

  it("lässt normale Codes durch", () => {
    expect(isReservedCode("abc2345")).toBe(false);
  });
});
