import cvStatus from "../../src/content/cv-status.json" with { type: "json" };
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const locale of ["en", "id"])
  test(`${locale}: accessible CV page and working ATS download`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`/${locale}/cv`);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
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
    ).toEqual([]);
    const downloadPromise = page.waitForEvent("download");
    await page
      .getByRole("link", {
        name: locale === "en" ? "Download CV (PDF)" : "Unduh CV (PDF)",
      })
      .click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe("Luthfi-Musthafa-CV.pdf");
    expect(await download.failure()).toBeNull();
    const response = await page.request.get("/cv/luthfi-musthafa-ats.pdf");
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("application/pdf");
    expect((await response.body()).subarray(0, 5).toString()).toBe("%PDF-");
    await page
      .getByRole("link", {
        name: locale === "en" ? "Bahasa Indonesia" : "English",
        exact: true,
      })
      .click();
    await expect(page).toHaveURL(
      new RegExp(`/${locale === "en" ? "id" : "en"}/cv$`),
    );
    await expect(page.locator('a[href*="premium"][download]')).toHaveCount(
      cvStatus.premiumAvailable ? 1 : 0,
    );
    expect(
      (await page.request.get("/cv/luthfi-musthafa-premium.pdf")).status(),
    ).toBe(cvStatus.premiumAvailable ? 200 : 404);
  });
