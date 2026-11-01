import Link from "next/link";
import { siteContent } from "@/content/site";
import {
  languageNames,
  locales,
  localizedPath,
  type Locale,
  type Page,
} from "@/lib/i18n";
export function SiteHeader({ locale, page }: { locale: Locale; page: Page }) {
  const c = siteContent[locale];
  return (
    <>
      <a className="skip-link" href="#main">
        {c.skip}
      </a>
      <header className="site-header">
        <Link
          className="brand"
          href={localizedPath(locale, "home")}
          aria-label="Luthfi Musthafa"
        >
          LM<span aria-hidden="true">.</span>
        </Link>
        <nav aria-label={c.navigation}>
          <Link
            href={localizedPath(locale, "home")}
            aria-current={page === "home" ? "page" : undefined}
          >
            {c.home}
          </Link>
          <Link
            href={localizedPath(locale, "about")}
            aria-current={page === "about" ? "page" : undefined}
          >
            {c.about}
          </Link>
        </nav>
        <nav aria-label={c.language}>
          {locales.map((l) => (
            <Link
              key={l}
              href={localizedPath(l, page)}
              hrefLang={l}
              lang={l}
              aria-label={languageNames[l]}
              aria-current={l === locale ? "true" : undefined}
            >
              {l.toUpperCase()}
            </Link>
          ))}
        </nav>
      </header>
    </>
  );
}
