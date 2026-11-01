import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { Homepage } from "@/components/homepage";
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <Homepage locale={locale} />;
}
