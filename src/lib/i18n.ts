export const locales = ["en", "id"] as const;
export type Locale = (typeof locales)[number];
export type Page = "home" | "about" | "prototype" | "design";
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
