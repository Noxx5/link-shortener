import { describe, expect, it } from "vitest";
import { CODE_ALPHABET, CODE_LENGTH, generateCode } from "./code";

describe("generateCode", () => {
  it("erzeugt einen Code mit der festen Länge", () => {
    expect(generateCode()).toHaveLength(CODE_LENGTH);
  });

  it("nutzt nur Zeichen aus dem Alphabet", () => {
    const code = generateCode();
    for (const char of code) {
      expect(CODE_ALPHABET).toContain(char);
    }
  });

  it("enthält keine verwechselbaren Zeichen", () => {
    for (const char of ["0", "1", "O", "I", "l"]) {
      expect(CODE_ALPHABET).not.toContain(char);
    }
  });

  it("liefert bei 1000 Aufrufen keine Duplikate", () => {
    const codes = new Set(Array.from({ length: 1000 }, generateCode));
    expect(codes.size).toBe(1000);
  });
});
