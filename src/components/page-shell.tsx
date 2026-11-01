import { SiteHeader } from "@/components/site-header";
import { siteContent } from "@/content/site";
import type { Locale, Page } from "@/lib/i18n";
export function PageShell({
  locale,
  page,
  children,
}: {
  locale: Locale;
  page: Page;
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader locale={locale} page={page} />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <footer>{siteContent[locale].footer}</footer>
    </>
  );
}
