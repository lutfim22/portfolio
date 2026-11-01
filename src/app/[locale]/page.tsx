import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { siteContent } from "@/content/site";
import { isLocale, localizedPath } from "@/lib/i18n";
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = siteContent[locale];
  return (
    <PageShell locale={locale} page="home">
      <section aria-labelledby="headline">
        <p className="eyebrow">Luthfi Musthafa</p>
        <h1 id="headline">{c.headline}</h1>
        <p className="intro">{c.introduction}</p>
        <div className="actions">
          <Link className="button" href={localizedPath(locale, "about")}>
            {c.about}
          </Link>
          <a
            className="button secondary"
            href="mailto:luthfi.musthafa@gmail.com"
          >
            {c.contact}
          </a>
        </div>
      </section>
    </PageShell>
  );
}
