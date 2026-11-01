import type { Locale } from "@/lib/i18n";

type SiteContent = {
  title: string;
  description: string;
  headline: string;
  introduction: string;
  home: string;
  about: string;
  navigation: string;
  language: string;
  skip: string;
  contact: string;
  footer: string;
};

export const siteContent = {
  en: {
    title: "Luthfi Musthafa | Software Engineer",
    description:
      "Web applications and cross-platform integration by Luthfi Musthafa, a software engineer based in Jakarta, Indonesia.",
    headline: "Software Engineer Building Web & Cross-Platform Experiences.",
    introduction:
      "I’m Luthfi Musthafa, a software engineer based in Jakarta, Indonesia. I build web applications and integrate web experiences with native platforms.",
    home: "Home",
    about: "About",
    navigation: "Main navigation",
    language: "Language",
    skip: "Skip to content",
    contact: "Let’s connect",
    footer: "Luthfi Musthafa · Jakarta, Indonesia",
  },
  id: {
    title: "Luthfi Musthafa | Software Engineer",
    description:
      "Aplikasi web dan integrasi lintas platform oleh Luthfi Musthafa, software engineer yang berbasis di Jakarta, Indonesia.",
    headline:
      "Software Engineer yang Membangun Pengalaman Web & Lintas Platform.",
    introduction:
      "Saya Luthfi Musthafa, software engineer yang berbasis di Jakarta, Indonesia. Saya membangun aplikasi web dan mengintegrasikan pengalaman web dengan platform native.",
    home: "Beranda",
    about: "Tentang",
    navigation: "Navigasi utama",
    language: "Bahasa",
    skip: "Langsung ke konten",
    contact: "Mari terhubung",
    footer: "Luthfi Musthafa · Jakarta, Indonesia",
  },
} satisfies Record<Locale, SiteContent>;
