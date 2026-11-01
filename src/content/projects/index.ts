import type { ComponentType } from "react";
import type { Locale, ProjectSlug } from "@/lib/i18n";

type Project = {
  title: string;
  context: string;
  role: string;
  technologies: string[];
  artwork: number;
};
export const projects = {
  "family-care": {
    en: {
      title: "SmartThings Family Care for iOS",
      context:
        "A family-care experience combining connected monitoring, location awareness, and activity insights in a web interface integrated with native iOS.",
      role: "Tech Lead · Hands-on web development",
      technologies: [
        "TypeScript",
        "LitElement",
        "Redux Toolkit",
        "WebView",
        "REST APIs",
      ],
      artwork: 0,
    },
    id: {
      title: "SmartThings Family Care untuk iOS",
      context:
        "Pengalaman perawatan keluarga yang memadukan pemantauan terhubung, informasi lokasi, dan wawasan aktivitas melalui antarmuka web yang terintegrasi dengan iOS native.",
      role: "Tech Lead · Pengembangan web langsung",
      technologies: [
        "TypeScript",
        "LitElement",
        "Redux Toolkit",
        "WebView",
        "REST APIs",
      ],
      artwork: 0,
    },
  },
  "virtual-home": {
    en: {
      title: "SmartThings Virtual Home",
      context:
        "A cross-platform experience for simulating connected smart-home devices and interactions across mobile, Family Hub, and TV.",
      role: "Web application engineer · Cross-platform development",
      technologies: [
        "JavaScript",
        "TypeScript",
        "React",
        "LitElement",
        "Web Components",
        "WebView",
      ],
      artwork: 1,
    },
    id: {
      title: "SmartThings Virtual Home",
      context:
        "Pengalaman lintas platform untuk simulasi perangkat rumah pintar yang terhubung dan interaksinya di perangkat seluler, Family Hub, dan TV.",
      role: "Engineer aplikasi web · Pengembangan lintas platform",
      technologies: [
        "JavaScript",
        "TypeScript",
        "React",
        "LitElement",
        "Web Components",
        "WebView",
      ],
      artwork: 1,
    },
  },
  "air-care": {
    en: {
      title: "SmartThings Air Care",
      context:
        "An IoT-enabled air-quality experience connecting environmental data, APIs, and devices for monitoring and control.",
      role: "Web application engineer · IoT integration",
      technologies: [
        "JavaScript",
        "TypeScript",
        "LitElement",
        "REST APIs",
        "IoT Integration",
        "Chart.js",
      ],
      artwork: 2,
    },
    id: {
      title: "SmartThings Air Care",
      context:
        "Pengalaman kualitas udara berbasis IoT yang menghubungkan data lingkungan, API, dan perangkat untuk pemantauan serta kontrol.",
      role: "Engineer aplikasi web · Integrasi IoT",
      technologies: [
        "JavaScript",
        "TypeScript",
        "LitElement",
        "REST APIs",
        "IoT Integration",
        "Chart.js",
      ],
      artwork: 2,
    },
  },
} satisfies Record<ProjectSlug, Record<Locale, Project>>;

const loaders = {
  "family-care": {
    en: () => import("./family-care/en.mdx"),
    id: () => import("./family-care/id.mdx"),
  },
  "virtual-home": {
    en: () => import("./virtual-home/en.mdx"),
    id: () => import("./virtual-home/id.mdx"),
  },
  "air-care": {
    en: () => import("./air-care/en.mdx"),
    id: () => import("./air-care/id.mdx"),
  },
} satisfies Record<
  ProjectSlug,
  Record<Locale, () => Promise<{ default: ComponentType }>>
>;

// Only explicit repository-authored content is compiled; never derive file paths from URL input.
export async function loadProject(slug: ProjectSlug, locale: Locale) {
  return (await loaders[slug][locale]()).default;
}
