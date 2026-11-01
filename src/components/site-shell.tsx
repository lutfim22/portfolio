import Link from "next/link";
import { ReviewHeader } from "@/design/header";
import { reviewContent } from "@/design/content";
import { localizedPath, type Locale, type Page } from "@/lib/i18n";

export function SiteShell({
  locale,
  page,
  children,
}: {
  locale: Locale;
  page: Page;
  children: React.ReactNode;
}) {
  const c = reviewContent[locale];
  return (
    <>
      <ReviewHeader locale={locale} page={page} />
      <main id="main" className="content-page ds-container" tabIndex={-1}>
        {children}
      </main>
      <footer className="review-footer ds-container">
        <span>{c.footer}</span>
        <Link href={localizedPath(locale, "contact")}>{c.connect}</Link>
      </footer>
    </>
  );
}
