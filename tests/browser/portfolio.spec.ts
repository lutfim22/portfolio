import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const slugs = ["family-care", "virtual-home", "air-care"];

for (const locale of ["en", "id"]) {
  test(`${locale}: homepage to case study, language context and next project`, async ({
    page,
  }) => {
    await page.goto(`/${locale}`);
    await expect(page.locator(".review-banner")).toHaveCount(0);
    await expect(page.locator("h1")).toContainText("Software Engineer");
    const project = page.locator(".review-project").first();
    await project
      .getByRole("link", {
        name: locale === "en" ? "Read case study" : "Baca studi kasus",
      })
      .click();
    await expect(page).toHaveURL(
      new RegExp(`/${locale}/projects/family-care$`),
    );
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Family Care",
    );
    await expect(
      page.getByRole("heading", {
        name: locale === "en" ? "Impact" : "Dampak",
        exact: true,
      }),
    ).toBeVisible();
    const alternate = locale === "en" ? "id" : "en";
    await page
      .getByRole("link", {
        name: alternate === "en" ? "English" : "Bahasa Indonesia",
        exact: true,
      })
      .click();
    await expect(page).toHaveURL(
      new RegExp(`/${alternate}/projects/family-care$`),
    );
    await expect(page.locator("html")).toHaveAttribute("lang", alternate);
    await page.locator(".case-next a").click();
    await expect(page).toHaveURL(
      new RegExp(`/${alternate}/projects/virtual-home$`),
    );
    await expect(page.locator("h1")).toHaveText("SmartThings Virtual Home");
  });

  test(`${locale}: core pages, metadata, links, and accessible mobile content`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    for (const path of [
      "",
      "/about",
      "/journey",
      "/contact",
      ...slugs.map((s) => `/projects/${s}`),
    ]) {
      const response = await page.goto(`/${locale}${path}`);
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute(
        "content",
        /.+/,
      );
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      expect(
        (
          await new AxeBuilder({ page })
            .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
            .analyze()
        ).violations,
        `${locale}${path}`,
      ).toEqual([]);
      // Every internal page link resolves, including the locale counterpart and project cycle.
      const paths = await page
        .locator('a[href^="/"]')
        .evaluateAll((links) => [
          ...new Set(
            links.map(
              (link) => new URL((link as HTMLAnchorElement).href).pathname,
            ),
          ),
        ]);
      for (const link of paths)
        expect((await page.request.get(link)).status(), link).toBe(200);
    }
  });
}

test("navigation, year/category filtering, empty state and dialog focus", async ({
  page,
}) => {
  await page.goto("/en");
  await page
    .locator(".desktop-nav")
    .getByRole("link", { name: "Journey", exact: true })
    .click();
  await expect(page).toHaveURL(/\/en\/journey$/);
  await expect(page.locator('.desktop-nav a[aria-current="page"]')).toHaveText(
    "Journey",
  );
  await page.getByLabel("Year", { exact: true }).selectOption("2018");
  await expect(page.locator(".journey-list details:visible")).toHaveCount(2);
  await page.getByLabel("Filter journey").selectOption("work");
  await expect(page.locator(".journey-list details:visible")).toHaveCount(1);
  await page.getByLabel("Year", { exact: true }).selectOption("2015");
  await expect(page.getByRole("status")).toHaveText(
    "No chapters match these filters.",
  );
  await page.getByLabel("Filter journey").selectOption("education");
  await expect(page.getByRole("status")).toBeEmpty();
  const chapter = page.locator(".journey-list details:visible summary");
  await chapter.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("dialog")).toContainText("Universitas Indonesia");
  await page.getByRole("dialog").click({ position: { x: 20, y: 20 } });
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(chapter).toBeFocused();
  await page
    .locator(".desktop-nav")
    .getByRole("link", { name: "Contact", exact: true })
    .click();
  await expect(page).toHaveURL(/\/en\/contact$/);
  await expect(
    page.getByRole("link", { name: "luthfi.musthafa@gmail.com" }),
  ).toHaveAttribute("href", "mailto:luthfi.musthafa@gmail.com");
});

test("site theme survives project and locale navigation", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/en/projects/air-care");
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await page.locator(".case-next a").click();
  await expect(page.locator("html")).toHaveAttribute(
    "data-portfolio-theme",
    "light",
  );
  await page
    .getByRole("link", { name: "Bahasa Indonesia", exact: true })
    .click();
  await expect(page.locator("html")).toHaveAttribute(
    "data-portfolio-theme",
    "light",
  );
  await expect(
    page.getByRole("button", { name: "Gunakan tema gelap" }),
  ).toBeVisible();
});
