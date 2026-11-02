import type { Metadata } from "next";
import { pageMetadata, personSchema, serializeJsonLd } from "@/lib/seo";
import { siteContent } from "@/content/site";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { Homepage } from "@/components/homepage";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return pageMetadata(locale, "home", siteContent[locale]);
}
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(personSchema(locale)),
        }}
      />
      <Homepage locale={locale} />
    </>
  );
}
