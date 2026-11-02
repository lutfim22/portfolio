import type { Metadata, MetadataRoute } from "next";
import { siteContent } from "../content/site";
import { locales, localizedPath, projectSlugs, type Locale } from "./i18n";

export const publicPages = [
  "home",
  "about",
  "journey",
  "contact",
  "cv",
  ...projectSlugs.map((slug) => `projects/${slug}` as const),
] as const;
export type PublicPage = (typeof publicPages)[number];

type SeoEnvironment = Partial<
  Pick<NodeJS.ProcessEnv, "SITE_URL" | "SITE_INDEXABLE" | "VERCEL_ENV">
>;

// Build-time configuration: never infer a production origin from a preview host.
export function seoConfig(
  env: SeoEnvironment = {
    SITE_URL: process.env.SITE_URL,
    SITE_INDEXABLE: process.env.SITE_INDEXABLE,
    VERCEL_ENV: process.env.VERCEL_ENV,
  },
) {
  let origin: string | undefined;
  if (env.SITE_URL) {
    const url = new URL(env.SITE_URL);
    if (
      url.protocol !== "https:" ||
      url.username ||
      url.password ||
      url.pathname !== "/" ||
      url.search ||
      url.hash
    ) {
      throw new Error(
        "SITE_URL must be an HTTPS origin without credentials, a path, query, or fragment.",
      );
    }
    origin = url.origin;
  }
  if (env.SITE_INDEXABLE && !["true", "false"].includes(env.SITE_INDEXABLE)) {
    throw new Error("SITE_INDEXABLE must be true or false.");
  }
  if (env.SITE_INDEXABLE === "true" && !origin) {
    throw new Error("SITE_INDEXABLE=true requires a verified SITE_URL.");
  }
  return {
    origin,
    indexable:
      Boolean(origin) &&
      env.SITE_INDEXABLE === "true" &&
      (!env.VERCEL_ENV || env.VERCEL_ENV === "production"),
  };
}

export function languageUrls(origin: string, page: PublicPage) {
  return {
    en: `${origin}${localizedPath("en", page)}`,
    id: `${origin}${localizedPath("id", page)}`,
    "x-default": `${origin}${localizedPath("en", page)}`,
  };
}

export function pageMetadata(
  locale: Locale,
  page: PublicPage,
  content: { title: string; description: string },
  config = seoConfig(),
): Metadata {
  const title =
    page === "home" ? content.title : `${content.title} | Luthfi Musthafa`;
  const url = config.origin
    ? `${config.origin}${localizedPath(locale, page)}`
    : undefined;
  const images = config.origin
    ? [
        {
          url: `${config.origin}/social/${locale}`,
          width: 1200,
          height: 630,
          alt: siteContent[locale].headline,
        },
      ]
    : undefined;
  return {
    title: { absolute: title },
    description: content.description,
    robots: { index: config.indexable, follow: true },
    ...(config.origin
      ? {
          alternates: {
            canonical: url,
            languages: languageUrls(config.origin, page),
          },
        }
      : {}),
    openGraph: {
      type: "website",
      siteName: "Luthfi Musthafa",
      title,
      description: content.description,
      locale: locale === "en" ? "en_US" : "id_ID",
      alternateLocale: [locale === "en" ? "id_ID" : "en_US"],
      ...(url ? { url, images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: content.description,
      ...(images ? { images } : {}),
    },
  };
}

export function siteSitemap(config = seoConfig()): MetadataRoute.Sitemap {
  if (!config.indexable || !config.origin) return [];
  const origin = config.origin;
  return publicPages.flatMap((page) =>
    locales.map((locale) => ({
      url: `${origin}${localizedPath(locale, page)}`,
      alternates: { languages: languageUrls(origin, page) },
    })),
  );
}

export function siteRobots(config = seoConfig()): MetadataRoute.Robots {
  if (!config.indexable || !config.origin)
    return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: locales.flatMap((locale) =>
        (["design", "prototype"] as const).map((page) =>
          localizedPath(locale, page),
        ),
      ),
    },
    sitemap: `${config.origin}/sitemap.xml`,
  };
}

export function personSchema(locale: Locale, config = seoConfig()) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Luthfi Musthafa",
    jobTitle: "Software Engineer",
    description: siteContent[locale].description,
    homeLocation: { "@type": "Place", name: "Jakarta, Indonesia" },
    sameAs: [
      "https://github.com/lutfim22",
      "https://www.linkedin.com/in/lutfi22",
    ],
    ...(config.origin
      ? { url: `${config.origin}${localizedPath(locale, "home")}` }
      : {}),
  };
}

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
