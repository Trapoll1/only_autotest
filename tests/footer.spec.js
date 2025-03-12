const { test, expect } = require("@playwright/test");

const pages = ["/", "/projects", "/services", "/about"];

test.describe("Footer Tests", () => {
  for (const pagePath of pages) {
    test(`should check footer elements on ${pagePath} page`, async ({ page }) => {
      await page.goto(pagePath);
      await page.waitForLoadState("networkidle");
      
      const footer = await page.locator("footer").first();
      await footer.scrollIntoViewIfNeeded();
      await expect(footer).toBeVisible();

      const footerElements = {
        "Телефон": await page.locator("footer a[href^=\\"tel:\\"]"),
        "Email": await page.locator("footer a[href^=\\"mailto:\\"]"),
        "Адрес": await page.locator("footer").getByText(/Москва/),
        "Социальные сети": await page.locator("footer [class*=\\"social\\"]"),
        "Проекты": await page.locator("footer a[href*=\\"projects\\"]"),
        "Услуги": await page.locator("footer a[href*=\\"services\\"]"),
        "Политика конфиденциальности": await page.locator("footer").getByText(/Политика конфиденциальности/i),
      };

      for (const [name, element] of Object.entries(footerElements)) {
        await expect(element, `${name} should be visible in footer`).toBeVisible();
      }

      const footerLinks = await page.locator("footer a");
      const linksCount = await footerLinks.count();
      expect(linksCount, "Footer should contain links").toBeGreaterThan(0);
    });
  }
});
