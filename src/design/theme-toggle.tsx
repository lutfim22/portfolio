"use client";

import { useLayoutEffect, useSyncExternalStore } from "react";
import type { Locale } from "@/lib/i18n";
import { reviewContent } from "./content";
import type { Theme } from "./tokens";

let sessionTheme: Theme | undefined;
function snapshot(): Theme {
  try {
    const stored = localStorage.getItem("portfolio-theme");
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    if (sessionTheme) return sessionTheme;
  }
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

function subscribe(callback: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: light)");
  const update = () => {
    try {
      const saved = localStorage.getItem("portfolio-theme");
      document.documentElement.dataset.portfolioTheme =
        saved === "dark" || saved === "light"
          ? saved
          : media.matches
            ? "light"
            : "dark";
    } catch {
      /* Theme remains usable when storage is unavailable. */
    }
    callback();
  };
  window.addEventListener("portfolio-theme", callback);
  window.addEventListener("storage", update);
  media.addEventListener("change", update);
  return () => {
    window.removeEventListener("portfolio-theme", callback);
    window.removeEventListener("storage", update);
    media.removeEventListener("change", update);
  };
}

export function ThemeToggle({ locale }: { locale: Locale }) {
  const theme = useSyncExternalStore(
    subscribe,
    snapshot,
    () => "dark" as Theme,
  );
  useLayoutEffect(() => {
    document.documentElement.dataset.portfolioTheme = theme;
  }, [theme, locale]);
  const label =
    theme === "dark" ? reviewContent[locale].light : reviewContent[locale].dark;
  return (
    <button
      className="theme-toggle"
      aria-label={label}
      title={label}
      onClick={() => {
        const next = theme === "dark" ? "light" : "dark";
        sessionTheme = next;
        document.documentElement.dataset.portfolioTheme = next;
        try {
          localStorage.setItem("portfolio-theme", next);
        } catch {
          /* Storage is optional. */
        }
        window.dispatchEvent(new Event("portfolio-theme"));
      }}
    >
      <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
      </svg>
    </button>
  );
}
