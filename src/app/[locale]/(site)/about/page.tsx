import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site-shell";
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
    <SiteShell locale={locale} page="about">
      <article className="content-prose">
        <Content />
      </article>
    </SiteShell>
  );
}
