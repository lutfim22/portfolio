import { locales, localizedPath } from "./i18n";
import { publicPages } from "./seo";

const paths = new Set<string>(
  locales.flatMap((locale) =>
    publicPages.map((page) => localizedPath(locale, page)),
  ),
);

export function privacySignal({
  dnt,
  gpc,
}: {
  dnt?: string | null;
  gpc?: boolean;
}) {
  return dnt === "1" || dnt === "yes" || gpc === true;
}

// Allow only known public pages. Never report query strings, fragments or unknown paths.
export function telemetryUrl(raw: string, origin: string): string | null {
  try {
    const url = new URL(raw);
    if (url.origin !== origin || !paths.has(url.pathname)) return null;
    return `${origin}${url.pathname}`;
  } catch {
    return null;
  }
}

export function analyticsEvent(
  event: { type: string; url: string },
  origin: string,
  blocked: boolean,
) {
  const url = telemetryUrl(event.url, origin);
  return !blocked && event.type === "pageview" && url
    ? { type: "pageview" as const, url }
    : null;
}

export function speedEvent(
  event: { type: string; url: string },
  origin: string,
  blocked: boolean,
) {
  const url = telemetryUrl(event.url, origin);
  // Replace dynamic route data with the same allowlisted path as the URL.
  return !blocked && event.type === "vital" && url
    ? { type: "vital" as const, url, route: new URL(url).pathname }
    : null;
}

export function errorRecord(error: unknown, routeType: string) {
  const digest =
    typeof error === "object" &&
    error !== null &&
    "digest" in error &&
    typeof error.digest === "string" &&
    /^\d{1,20}$/.test(error.digest)
      ? error.digest
      : "unavailable";
  return {
    event: "portfolio.server_error",
    type: ["render", "route", "action", "proxy"].includes(routeType)
      ? routeType
      : "other",
    digest,
  };
}
