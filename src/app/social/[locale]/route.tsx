import { ImageResponse } from "next/og";
import { isLocale, locales } from "@/lib/i18n";

export const dynamic = "force-static";
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale } = await params;
  if (!isLocale(locale)) return new Response(null, { status: 404 });
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: 72,
        background: "#111119",
        color: "#faf8ff",
        borderTop: "12px solid #bda3ff",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <div
          style={{
            display: "flex",
            border: "2px solid #bda3ff",
            padding: "18px 22px",
            color: "#bda3ff",
            fontSize: 40,
          }}
        >
          LM
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#d1c8df" }}>
          Luthfi Musthafa · Jakarta, Indonesia
        </div>
      </div>
      <div style={{ display: "flex", fontSize: 76, fontWeight: 700 }}>
        Software Engineer
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 38,
          maxWidth: 1000,
          color: "#d1c8df",
          lineHeight: 1.4,
        }}
      >
        {locale === "en"
          ? "Web applications & cross-platform integration"
          : "Aplikasi web & integrasi lintas platform"}
      </div>
      <div style={{ display: "flex", fontSize: 24, color: "#bda3ff" }}>
        {locale === "en"
          ? "Selected work · Engineering journey"
          : "Karya pilihan · Perjalanan engineering"}
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
