import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site-shell";
import { loadAbout } from "@/content/about";
import { siteContent } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { isLocale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return pageMetadata(locale, "about", {
    title: siteContent[locale].about,
    description:
      locale === "en"
        ? "About Luthfi Musthafa: web application engineering, cross-platform integration, and technical leadership in Jakarta, Indonesia."
        : "Tentang Luthfi Musthafa: engineering aplikasi web, integrasi lintas platform, dan kepemimpinan teknis di Jakarta, Indonesia.",
  });
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
