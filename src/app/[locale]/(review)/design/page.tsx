import { Arrow } from "@/design/icons";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, localizedPath } from "@/lib/i18n";
import { ReviewHeader } from "@/design/header";
import { palettes } from "@/design/tokens";

export const metadata: Metadata = {
  title: "Design system proposal",
  robots: { index: false, follow: false },
};

export default async function DesignSystem({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const en = locale === "en";
  return (
    <>
      <ReviewHeader locale={locale} page="design" />
      <main id="review-main" className="system-page" tabIndex={-1}>
        <div className="ds-container">
          <p className="section-label">
            {en
              ? "MILESTONE 02 / DESIGN PROPOSAL"
              : "MILESTONE 02 / USULAN DESAIN"}
          </p>
          <h1>
            {en
              ? "A considered system. A connected story."
              : "Sistem yang terarah. Cerita yang terhubung."}
          </h1>
          <p>
            {en
              ? "Proposal 01 explores editorial clarity, warm neutrals, and restrained violet accents. Review the homepage in both themes and languages before approving the direction."
              : "Usulan 01 mengeksplorasi kejernihan editorial, warna netral yang hangat, dan aksen violet yang terukur. Tinjau beranda dalam kedua tema dan bahasa sebelum menyetujui arahnya."}
          </p>
          <section>
            <h2>{en ? "Color, with purpose" : "Warna dengan tujuan"}</h2>
            <p>
              {en
                ? "Foreground, secondary copy, focus rings, and button labels are checked against their paired surfaces for WCAG AA contrast. Toggle the sun icon to compare the complete themes."
                : "Teks utama, teks sekunder, indikator fokus, dan label tombol diperiksa kontrasnya terhadap permukaan pasangannya untuk WCAG AA. Gunakan ikon matahari untuk membandingkan tema."}
            </p>
            {Object.entries(palettes).map(([theme, palette]) => (
              <div key={theme}>
                <h3>
                  {theme === "dark"
                    ? en
                      ? "Dark"
                      : "Gelap"
                    : en
                      ? "Light"
                      : "Terang"}
                </h3>
                <div className="swatch-grid">
                  {Object.entries(palette).map(([name, color]) => (
                    <div className="swatch" key={name}>
                      <div
                        className="swatch-color"
                        style={{ background: color }}
                      />
                      <strong>{name}</strong>
                      <code>{color}</code>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>
          <section>
            <h2>
              {en
                ? "Typography that carries the story"
                : "Tipografi yang membawa cerita"}
            </h2>
            <div className="type-specimen">
              <strong>
                Space Grotesk
                <br />
                Web & Cross-Platform Experiences.
              </strong>
              <p>
                Geist ·{" "}
                {en
                  ? "Clear, calm, and readable at every screen size. Both variable fonts are self-hosted; no external font requests."
                  : "Jelas, tenang, dan mudah dibaca di setiap ukuran layar. Kedua font variabel dihosting secara lokal tanpa permintaan font eksternal."}
              </p>
            </div>
          </section>
          <section>
            <h2>{en ? "Space to think" : "Ruang untuk berpikir"}</h2>
            <p>
              {en
                ? "A 4px spacing scale, a 1320px content boundary, fluid headings, 24px mobile margins, and comfortable reading lengths. Rounded controls balance the precise lines of the project artwork."
                : "Skala spasi 4px, batas konten 1320px, judul yang fleksibel, margin seluler 24px, dan panjang teks yang nyaman. Kontrol membulat menyeimbangkan garis presisi pada ilustrasi proyek."}
            </p>
          </section>
          <section>
            <h2>
              {en
                ? "Interactions, without obstacles"
                : "Interaksi tanpa hambatan"}
            </h2>
            <p>
              {en
                ? "Visible keyboard focus. Native expandable project summaries. A keyboard-accessible timeline with a side panel on desktop and bottom sheet on mobile. Theme preference persists and follows the system until you choose. Reduced motion removes ambient animation and smooth scrolling."
                : "Fokus keyboard yang terlihat. Ringkasan proyek yang dapat dibuka secara native. Timeline yang dapat digunakan dengan keyboard, panel samping di desktop, dan panel bawah di seluler. Pilihan tema tersimpan dan mengikuti sistem sampai Anda memilih. Pengaturan pengurangan gerakan menonaktifkan animasi latar dan pengguliran halus."}
            </p>
            <Link
              className="ds-button system-link"
              href={localizedPath(locale, "prototype")}
            >
              {en ? "Explore the prototype" : "Jelajahi prototipe"}
              <Arrow />
            </Link>
          </section>
        </div>
      </main>
    </>
  );
}
