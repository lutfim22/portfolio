import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { SiteShell } from "@/components/site-shell";
import { Arrow } from "@/design/icons";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return {
    title: locale === "en" ? "Curriculum vitae" : "Daftar riwayat hidup",
    description:
      locale === "en"
        ? "Download Luthfi Musthafa’s English CV."
        : "Unduh CV Luthfi Musthafa dalam bahasa Inggris.",
  };
}
export default async function CvPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const en = locale === "en";
  return (
    <SiteShell locale={locale} page="cv">
      <header className="page-heading">
        <p className="section-label">
          {en ? "EXPERIENCE / IN DETAIL" : "PENGALAMAN / LEBIH LENGKAP"}
        </p>
        <h1>
          {en
            ? "The experience behind the work."
            : "Pengalaman di balik karya."}
        </h1>
        <p className="page-lead">
          {en
            ? "An English CV covering my engineering experience, selected projects, skills, and education."
            : "CV berbahasa Inggris yang mencakup pengalaman engineering, proyek pilihan, keahlian, dan pendidikan saya."}
        </p>
      </header>
      <section className="cv-download" aria-labelledby="ats-title">
        <h2 id="ats-title">{en ? "ATS-friendly CV" : "CV ramah ATS"}</h2>
        <p>
          {en
            ? "A simple, single-column PDF with selectable text. English · A4 · 2 pages."
            : "PDF sederhana dengan satu kolom dan teks yang dapat dipilih. Bahasa Inggris · A4 · 2 halaman."}
        </p>
        <a
          className="ds-button"
          href="/cv/luthfi-musthafa-ats.pdf"
          download="Luthfi-Musthafa-CV.pdf"
        >
          {en ? "Download CV (PDF)" : "Unduh CV (PDF)"}
          <Arrow />
        </a>
      </section>
      <section className="cv-download" aria-labelledby="premium-title">
        <h2 id="premium-title">{en ? "Premium CV" : "CV Premium"}</h2>
        <p>
          {en
            ? "The visual edition is being prepared. The complete professional details are available in the CV above."
            : "Edisi visual sedang disiapkan. Rincian profesional lengkap tersedia dalam CV di atas."}
        </p>
      </section>
    </SiteShell>
  );
}
