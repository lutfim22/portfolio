import { telemetryConfig } from "@/lib/telemetry-config";
import type { Locale } from "@/lib/i18n";

export function PrivacyNotice({ locale }: { locale: Locale }) {
  const config = telemetryConfig();
  const en = locale === "en";
  return (
    <section
      id="privacy"
      className="content-prose privacy-notice"
      aria-labelledby="privacy-title"
    >
      <h2 id="privacy-title">{en ? "Privacy" : "Privasi"}</h2>
      <p>
        {en
          ? "Your theme preference is saved in this browser so it stays consistent between visits."
          : "Preferensi tema disimpan di browser ini agar tetap sama saat Anda berkunjung kembali."}
      </p>
      {!config.analytics && !config.speedInsights && (
        <p>
          {en
            ? "Optional audience and performance measurements are currently disabled."
            : "Pengukuran kunjungan dan performa opsional saat ini dinonaktifkan."}
        </p>
      )}
      {config.analytics && (
        <p>
          {en
            ? "Vercel Web Analytics measures page visits."
            : "Vercel Web Analytics mengukur kunjungan halaman."}
        </p>
      )}
      {config.speedInsights && (
        <p>
          {en
            ? "Vercel Speed Insights measures page performance."
            : "Vercel Speed Insights mengukur performa halaman."}
        </p>
      )}
      {(config.analytics || config.speedInsights) && (
        <p>
          {en
            ? "These optional measurements respect Do Not Track and Global Privacy Control browser signals. Page URLs are limited to public portfolio pages, without query strings or fragments. No custom event tracking is used."
            : "Pengukuran opsional ini menghormati sinyal Do Not Track dan Global Privacy Control pada browser. URL dibatasi pada halaman publik portofolio, tanpa parameter kueri atau fragmen. Tidak ada pelacakan peristiwa khusus."}
        </p>
      )}
      <p>
        {en
          ? "The hosting provider may process technical request information to deliver and secure this website. "
          : "Penyedia hosting dapat memproses informasi teknis permintaan untuk menyediakan dan menjaga keamanan situs ini. "}
        <a href="https://vercel.com/legal/privacy-policy">
          {en ? "Vercel privacy policy" : "Kebijakan privasi Vercel"}
        </a>
        .
      </p>
      <p>
        {en
          ? "For privacy questions, contact "
          : "Untuk pertanyaan privasi, hubungi "}
        <a href="mailto:luthfi.musthafa@gmail.com">luthfi.musthafa@gmail.com</a>
        .
      </p>
    </section>
  );
}
