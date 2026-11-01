export const locales = ["en", "id"] as const;
export type Locale = (typeof locales)[number];
export const projectSlugs = [
  "family-care",
  "virtual-home",
  "air-care",
] as const;
export type ProjectSlug = (typeof projectSlugs)[number];
export type Page =
  | "home"
  | "about"
  | "journey"
  | "contact"
  | "prototype"
  | "design"
  | `projects/${ProjectSlug}`;

export function isProjectSlug(value: string): value is ProjectSlug {
  return projectSlugs.some((slug) => slug === value);
}

export function isLocale(value: string): value is Locale {
  return locales.some((locale) => locale === value);
}

export function localizedPath(locale: Locale, page: Page): string {
  return `/${locale}${page === "home" ? "" : `/${page}`}`;
}

export const languageNames: Record<Locale, string> = {
  en: "English",
  id: "Bahasa Indonesia",
};
