import { customAlphabet } from "nanoid";

export const CODE_ALPHABET =
  "23456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
export const CODE_LENGTH = 7;

const nano = customAlphabet(CODE_ALPHABET, CODE_LENGTH);

export function generateCode(): string {
  return nano();
}
