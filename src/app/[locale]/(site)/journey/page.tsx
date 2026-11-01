import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { SiteShell } from "@/components/site-shell";
import { Journey } from "@/design/journey";
import { reviewContent } from "@/design/content";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return {
    title: locale === "en" ? "Engineering Journey" : "Perjalanan Engineering",
    description: reviewContent[locale].journeyIntro,
  };
}
export default async function JourneyPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = reviewContent[locale];
  return (
    <SiteShell locale={locale} page="journey">
      <header className="page-heading">
        <p className="section-label">{c.journeyLabel}</p>
        <h1>{c.journeyTitle}</h1>
        <p className="page-lead">{c.journeyIntro}</p>
      </header>
      <Journey locale={locale} />
    </SiteShell>
  );
}
