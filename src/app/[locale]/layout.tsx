import type { Metadata } from "next";
import { seoConfig } from "@/lib/seo";
import { notFound } from "next/navigation";
import { siteContent } from "@/content/site";
import { isLocale, locales } from "@/lib/i18n";
import "../globals.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return {
    title: {
      default: siteContent[locale].title,
      template: `%s | Luthfi Musthafa`,
    },
    description: siteContent[locale].description,
    robots: { index: seoConfig().indexable, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={locale} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
