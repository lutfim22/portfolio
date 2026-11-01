import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { Homepage } from "@/components/homepage";

export const metadata: Metadata = {
  title: "Homepage design proposal",
  robots: { index: false, follow: false },
};
export default async function Prototype({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <Homepage locale={locale} />;
}
