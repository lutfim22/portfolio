import type { ComponentType } from "react";
import type { Locale } from "@/lib/i18n";

// Only repository-authored MDX is compiled. Never evaluate remote/user input.
const loaders = {
  en: () => import("./en.mdx"),
  id: () => import("./id.mdx"),
} satisfies Record<Locale, () => Promise<{ default: ComponentType }>>;

export async function loadAbout(locale: Locale) {
  return (await loaders[locale]()).default;
}
