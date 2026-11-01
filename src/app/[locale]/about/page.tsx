import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { loadAbout } from "@/content/about";
import { siteContent } from "@/content/site";
import { isLocale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return { title: siteContent[locale].about };
}

export default async function About({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const Content = await loadAbout(locale);
  return (
    <PageShell locale={locale} page="about">
      <article className="prose">
        <Content />
      </article>
    </PageShell>
  );
}
