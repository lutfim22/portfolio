import { test, expect } from "@playwright/test";

// Public example origin is used only for an explicitly configured audit build.
const origin = process.env.SITE_URL?.replace(/\/$/, "");
const indexable =
  Boolean(origin) &&
  process.env.SITE_INDEXABLE === "true" &&
  (!process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production");
const paths = [
  "",
  "/about",
  "/journey",
  "/contact",
  "/cv",
  "/projects/family-care",
  "/projects/virtual-home",
  "/projects/air-care",
];

test("all core routes have localized metadata and page-preserving alternates", async ({
  page,
}) => {
  const titles = new Set<string>();
  const descriptions = new Set<string>();
  for (const locale of ["en", "id"])
    for (const path of paths) {
      await page.goto(`/${locale}${path}`);
      const title = await page.title();
      expect(title).toContain("Luthfi Musthafa");
      titles.add(title);
      const description = await page
        .locator('meta[name="description"]')
        .getAttribute("content");
      expect(description?.length).toBeGreaterThan(20);
      descriptions.add(description!);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
        "content",
        indexable ? "index, follow" : "noindex, follow",
      );
      await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
        "content",
        title,
      );
      await expect(
        page.locator('meta[property="og:description"]'),
      ).toHaveAttribute("content", description!);
      await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute(
        "content",
        locale === "en" ? "en_US" : "id_ID",
      );
      if (origin) {
        await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
          "href",
          `${origin}/${locale}${path}`,
        );
        for (const alternate of ["en", "id", "x-default"])
          await expect(
            page.locator(`link[rel="alternate"][hreflang="${alternate}"]`),
          ).toHaveAttribute(
            "href",
            `${origin}/${alternate === "x-default" ? "en" : alternate}${path}`,
          );
        await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
          "content",
          `${origin}/${locale}${path}`,
        );
        await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
          "content",
          `${origin}/social/${locale}`,
        );
      } else {
        await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
        await expect(page.locator('meta[property="og:url"]')).toHaveCount(0);
      }
    }
  // Project names and the professional title deliberately agree across locales.
  expect(titles.size).toBeGreaterThanOrEqual(12);
  expect(descriptions.size).toBe(16);
});

test("discovery files, real PNG cards, structured data, and review exclusions", async ({
  page,
}) => {
  const robots = await page.request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  const rules = await robots.text();
  const sitemap = await page.request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  const xml = await sitemap.text();
  expect((xml.match(/<loc>/g) ?? []).length).toBe(indexable ? 16 : 0);
  if (indexable) {
    expect(rules).toContain(`Sitemap: ${origin}/sitemap.xml`);
    for (const locale of ["en", "id"])
      for (const path of paths)
        expect(xml).toContain(`<loc>${origin}/${locale}${path}</loc>`);
  } else expect(rules).toContain("Disallow: /");
  expect(xml).not.toMatch(/prototype|design|\.pdf|localhost|127\.0\.0\.1/);
  for (const locale of ["en", "id"]) {
    const image = await page.request.get(`/social/${locale}`);
    expect(image.status()).toBe(200);
    expect(image.headers()["content-type"]).toContain("image/png");
    const png = await image.body();
    expect(png.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
    expect(png.readUInt32BE(16)).toBe(1200);
    expect(png.readUInt32BE(20)).toBe(630);
    await page.goto(`/${locale}`);
    const person = JSON.parse(
      await page.locator('script[type="application/ld+json"]').innerText(),
    );
    expect(person).toMatchObject({
      "@type": "Person",
      name: "Luthfi Musthafa",
      jobTitle: "Software Engineer",
    });
    if (origin) expect(person.url).toBe(`${origin}/${locale}`);
    else expect(person).not.toHaveProperty("url");
    for (const review of ["design", "prototype"]) {
      await page.goto(`/${locale}/${review}`);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
        "content",
        "noindex, nofollow",
      );
      await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
    }
  }
  expect((await page.request.get("/social/fr")).status()).toBe(404);
});
