import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { SiteShell } from "@/components/site-shell";
import { reviewContent } from "@/design/content";
import { Arrow } from "@/design/icons";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return pageMetadata(locale, "contact", {
    title: reviewContent[locale].contact,
    description: reviewContent[locale].contactText,
  });
}
export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = reviewContent[locale];
  return (
    <SiteShell locale={locale} page="contact">
      <header className="page-heading">
        <p className="section-label">{c.contactLabel}</p>
        <h1>{c.contactTitle}</h1>
        <p className="page-lead">{c.contactText}</p>
      </header>
      <a className="contact-email" href="mailto:luthfi.musthafa@gmail.com">
        luthfi.musthafa@gmail.com
        <Arrow />
      </a>
      <div className="social-links">
        <a href="https://github.com/lutfim22">
          GitHub
          <Arrow />
        </a>
        <a href="https://www.linkedin.com/in/lutfi22">
          LinkedIn
          <Arrow />
        </a>
      </div>
    </SiteShell>
  );
}
