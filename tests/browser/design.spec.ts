import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir } from "node:fs/promises";

for (const viewport of [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "mobile", width: 390, height: 844 },
]) {
  for (const theme of ["dark", "light"]) {
    test(`${viewport.name} ${theme}: layout, accessible content and review image`, async ({
      page,
    }) => {
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.setViewportSize(viewport);
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.addInitScript(
        (t) => localStorage.setItem("portfolio-theme", t),
        theme,
      );
      await page.goto("/en/prototype");
      await page.evaluate(() => document.fonts.ready);
      await expect(page.getByRole("heading", { level: 1 })).toContainText(
        "Software Engineer",
      );
      await expect(page.locator("html")).toHaveAttribute(
        "data-portfolio-theme",
        theme,
      );
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
      expect(
        await page
          .locator("h1")
          .evaluate((el) => getComputedStyle(el).fontFamily),
      ).toContain("Space Grotesk");
      const accessibility = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      expect(accessibility.violations).toEqual([]);
      expect(errors).toEqual([]);
      await mkdir("docs/design-review", { recursive: true });
      await page.screenshot({
        path: `docs/design-review/home-${viewport.name}-${theme}.png`,
        fullPage: true,
        animations: "disabled",
      });
    });
  }
}

test("theme persists, language keeps review route, design system loads", async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/en/prototype");
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await expect(page.locator("html")).toHaveAttribute(
    "data-portfolio-theme",
    "light",
  );
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute(
    "data-portfolio-theme",
    "light",
  );
  await page
    .getByRole("link", { name: "Bahasa Indonesia", exact: true })
    .click();
  await expect(page).toHaveURL(/\/id\/prototype$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "id");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Pengalaman Lintas Platform",
  );
  await expect(
    page.getByRole("button", { name: "Gunakan tema gelap" }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Sistem desain" }).click();
  await expect(page).toHaveURL(/\/id\/design$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Sistem yang terarah",
  );
  await page.getByRole("link", { name: "English", exact: true }).click();
  await expect(page).toHaveURL(/\/en\/design$/);
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
});

test("mobile navigation and keyboard timeline dialog", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en/prototype");
  await page.locator(".mobile-nav summary").click();
  await expect(page.locator(".mobile-nav")).toHaveAttribute("open", "");
  await page.keyboard.press("Escape");
  await expect(page.locator(".mobile-nav")).not.toHaveAttribute("open");
  await page.locator(".mobile-nav summary").click();
  await page
    .locator(".mobile-nav")
    .getByRole("link", { name: "Journey", exact: true })
    .click();
  await expect(page.locator(".mobile-nav")).not.toHaveAttribute("open");
  const firstChapter = page.locator(".journey-list summary").first();
  await firstChapter.focus();
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText("Engineer, Web Application");
  const bounds = await dialog.boundingBox();
  expect(Math.abs(bounds!.y + bounds!.height - 844)).toBeLessThan(2);
  expect(
    (await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze())
      .violations,
  ).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(firstChapter).toBeFocused();
  await page.getByLabel("Filter journey").selectOption("education");
  await expect(page.locator(".journey-list details:visible")).toHaveCount(1);
  await expect(page.locator(".journey-list details:visible")).toContainText(
    "Universitas Indonesia",
  );
});

test("system theme, reduced motion and narrow Indonesian content", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.emulateMedia({ colorScheme: "light", reducedMotion: "reduce" });
  await page.goto("/id/prototype");
  await expect(page.locator("html")).toHaveAttribute(
    "data-portfolio-theme",
    "light",
  );
  expect(
    await page
      .locator(".orbit-glow")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await page.emulateMedia({ colorScheme: "dark", reducedMotion: "reduce" });
  await expect(page.locator("html")).toHaveAttribute(
    "data-portfolio-theme",
    "dark",
  );
});

test("essential content and native disclosures work without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3120/en/prototype");
  await page.locator(".journey-list summary").first().click();
  await expect(
    page.locator(".journey-list details").first().locator("p"),
  ).toBeVisible();
  await page.locator(".contribution summary").first().click();
  await expect(
    page.locator(".contribution").first().locator("p"),
  ).toBeVisible();
  await context.close();
});
