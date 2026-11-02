import { describe, expect, it } from "vitest";
import {
  languageUrls,
  pageMetadata,
  personSchema,
  publicPages,
  seoConfig,
  serializeJsonLd,
  siteRobots,
  siteSitemap,
} from "./seo";

const origin = "https://portfolio.example";
const live = seoConfig({
  SITE_URL: origin,
  SITE_INDEXABLE: "true",
  VERCEL_ENV: "production",
});

describe("publication configuration", () => {
  it("keeps an unconfigured build out of search indexes without guessing a host", () => {
    const config = seoConfig({});
    expect(config).toEqual({ origin: undefined, indexable: false });
    expect(siteSitemap(config)).toEqual([]);
    expect(siteRobots(config)).toEqual({
      rules: { userAgent: "*", disallow: "/" },
    });
    const metadata = pageMetadata(
      "en",
      "home",
      { title: "Home", description: "Description" },
      config,
    );
    expect(metadata.alternates).toBeUndefined();
    expect(metadata.openGraph).not.toHaveProperty("url");
  });
  it.each(["preview", "development"])(
    "keeps %s builds noindex even with production indexing enabled",
    (VERCEL_ENV) => {
      const config = seoConfig({
        SITE_URL: origin,
        SITE_INDEXABLE: "true",
        VERCEL_ENV,
      });
      expect(config.indexable).toBe(false);
      expect(siteSitemap(config)).toEqual([]);
    },
  );
  it("requires explicit launch configuration", () => {
    expect(seoConfig({ SITE_URL: origin }).indexable).toBe(false);
    expect(() => seoConfig({ SITE_INDEXABLE: "true" })).toThrow(
      "requires a verified SITE_URL",
    );
    expect(() =>
      seoConfig({ SITE_URL: origin, SITE_INDEXABLE: "yes" }),
    ).toThrow("true or false");
    expect(live.indexable).toBe(true);
  });
  it.each([
    "http://portfolio.example",
    "https://user:pass@portfolio.example",
    `${origin}/path`,
    `${origin}?q=1`,
    `${origin}#fragment`,
    "not a URL",
  ])("rejects invalid production origin %s", (SITE_URL) => {
    expect(() => seoConfig({ SITE_URL })).toThrow();
  });
});

describe("localized discovery", () => {
  it("lists exactly the 16 core pages with reciprocal language URLs", () => {
    const entries = siteSitemap(live);
    expect(entries).toHaveLength(16);
    expect(new Set(entries.map((entry) => entry.url)).size).toBe(16);
    for (const page of publicPages) {
      const languages = languageUrls(origin, page);
      for (const locale of ["en", "id"] as const) {
        expect(
          entries.find((entry) => entry.url === languages[locale])?.alternates
            ?.languages,
        ).toEqual(languages);
        const metadata = pageMetadata(
          locale,
          page,
          { title: "Title", description: "Description" },
          live,
        );
        expect(metadata.alternates).toEqual({
          canonical: languages[locale],
          languages,
        });
        expect(metadata.robots).toEqual({ index: true, follow: true });
        expect(metadata.openGraph).toMatchObject({
          url: languages[locale],
          images: [
            { url: `${origin}/social/${locale}`, width: 1200, height: 630 },
          ],
        });
      }
    }
    expect(
      entries.every((entry) => !/design|prototype|\.pdf/.test(entry.url)),
    ).toBe(true);
    expect(siteRobots(live)).toEqual({
      rules: {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/en/design",
          "/en/prototype",
          "/id/design",
          "/id/prototype",
        ],
      },
      sitemap: `${origin}/sitemap.xml`,
    });
  });
  it("uses only approved identity fields and escapes script termination", () => {
    expect(personSchema("id", live)).toMatchObject({
      name: "Luthfi Musthafa",
      jobTitle: "Software Engineer",
      url: `${origin}/id`,
      sameAs: [
        "https://github.com/lutfim22",
        "https://www.linkedin.com/in/lutfi22",
      ],
    });
    const malicious = { description: "</script><script>alert(1)</script>" };
    const json = serializeJsonLd(malicious);
    expect(json).not.toContain("<");
    expect(JSON.parse(json)).toEqual(malicious);
  });
});
