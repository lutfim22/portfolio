"use client";

import { Arrow } from "./icons";

import Link from "next/link";
import { useRef } from "react";
import { languageNames, locales, localizedPath, type Locale } from "@/lib/i18n";
import { reviewContent } from "./content";
import { ThemeToggle } from "./theme-toggle";

export function ReviewHeader({
  locale,
  page = "prototype",
}: {
  locale: Locale;
  page?: "prototype" | "design";
}) {
  const c = reviewContent[locale];
  const review = true;
  const home = "prototype";
  const navHref = (id: string) => `${localizedPath(locale, "prototype")}#${id}`;
  const menu = useRef<HTMLDetailsElement>(null);
  const links = [
    ["work", c.work],
    ["journey", c.journey],
    ["about", c.about],
    ["contact", c.contact],
  ];
  const close = () => {
    if (menu.current) menu.current.open = false;
  };
  return (
    <>
      <a className="ds-skip" href={review ? "#review-main" : "#main"}>
        {c.skip}
      </a>
      {review && (
        <div className="review-banner">
          <span>{c.proposal}</span>
          <Link
            href={localizedPath(
              locale,
              page === "prototype" ? "design" : "prototype",
            )}
          >
            {page === "prototype"
              ? c.system
              : locale === "en"
                ? "Homepage prototype"
                : "Prototipe beranda"}{" "}
            <Arrow />
          </Link>
        </div>
      )}
      <header className="review-header">
        <Link
          className="review-brand"
          href={localizedPath(locale, home)}
          aria-label="Luthfi Musthafa"
        >
          LM<span>.</span>
        </Link>
        <nav className="desktop-nav" aria-label={c.navigation}>
          {links.map(([id, label]) => (
            <a
              key={id}
              href={navHref(id)}
              aria-current={!review && page === id ? "page" : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="header-tools">
          <nav className="language-nav" aria-label={c.language}>
            {locales.map((l) => (
              <Link
                key={l}
                href={localizedPath(l, page)}
                lang={l}
                hrefLang={l}
                aria-label={languageNames[l]}
                aria-current={l === locale ? "true" : undefined}
              >
                {l.toUpperCase()}
              </Link>
            ))}
          </nav>
          <ThemeToggle locale={locale} />
          <details
            ref={menu}
            className="mobile-nav"
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                close();
                menu.current?.querySelector("summary")?.focus();
              }
            }}
          >
            <summary>{c.menu}</summary>
            <nav aria-label={c.navigation}>
              {links.map(([id, label]) => (
                <a
                  key={id}
                  onClick={close}
                  href={navHref(id)}
                  aria-current={!review && page === id ? "page" : undefined}
                >
                  {label}
                </a>
              ))}
            </nav>
          </details>
        </div>
      </header>
    </>
  );
}
