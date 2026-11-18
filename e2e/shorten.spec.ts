import { expect, test } from "@playwright/test";

test("kürzt einen Link, leitet weiter und zählt den Klick", async ({
  page,
  request,
}) => {
  await page.goto("/");

  await page.getByLabel("Lange URL").fill("https://example.com/");
  await page.getByRole("button", { name: "Kürzen" }).click();

  const shortLink = page.getByRole("link", { name: /localhost:3100\// });
  await expect(shortLink).toBeVisible();
  const shortUrl = (await shortLink.textContent()) ?? "";

  // Weiterleitung prüfen, ohne die externe Seite wirklich zu laden
  const response = await request.get(shortUrl, { maxRedirects: 0 });
  expect(response.status()).toBe(307);
  expect(response.headers()["location"]).toBe("https://example.com/");

  // Der Klick wird nach der Antwort gespeichert, deshalb kurz wiederholen
  await expect(async () => {
    await page.reload();
    await expect(page.getByText("1 Klicks")).toBeVisible();
  }).toPass();
});

const invalidInputs = [
  { input: "example.com", message: "Bitte eine gültige URL eingeben" },
  { input: "javascript:alert(1)", message: "Nur http und https sind erlaubt" },
  {
    input: "http://localhost:3100/abc",
    message: "Links auf diese Seite sind nicht erlaubt",
  },
];

for (const { input, message } of invalidInputs) {
  test(`zeigt einen Fehler für "${input}"`, async ({ page }) => {
    await page.goto("/");
    await page.getByLabel("Lange URL").fill(input);
    await page.getByRole("button", { name: "Kürzen" }).click();
    await expect(
      page.getByRole("alert").filter({ hasText: message }),
    ).toBeVisible();
  });
}

test("unbekannter Code liefert 404", async ({ request }) => {
  const response = await request.get("/Unknown7", { maxRedirects: 0 });
  expect(response.status()).toBe(404);
});
