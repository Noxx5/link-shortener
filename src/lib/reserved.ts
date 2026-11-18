const RESERVED = new Set([
  "api",
  "stats",
  "admin",
  "login",
  "logout",
  "new",
  "links",
  "dashboard",
  "_next",
  "favicon.ico",
  "robots.txt",
  "sitemap.xml",
]);

export function isReservedCode(code: string): boolean {
  return RESERVED.has(code.toLowerCase());
}
