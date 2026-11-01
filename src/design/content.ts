import type { Locale } from "@/lib/i18n";

type Project = {
  title: string;
  category: string;
  description: string;
  stack: string;
  detail: string;
};
type Milestone = {
  year: string;
  title: string;
  place: string;
  description: string;
  category: "work" | "education";
};
type ReviewContent = {
  proposal: string;
  system: string;
  work: string;
  journey: string;
  about: string;
  contact: string;
  menu: string;
  navigation: string;
  language: string;
  light: string;
  dark: string;
  skip: string;
  eyebrow: string;
  headline: [string, string, string];
  intro: string;
  explore: string;
  connect: string;
  scroll: string;
  diagram: string;
  workLabel: string;
  workTitle: string;
  workIntro: string;
  projectDetails: string;
  projects: Project[];
  journeyLabel: string;
  journeyTitle: string;
  journeyIntro: string;
  all: string;
  workFilter: string;
  education: string;
  filter: string;
  close: string;
  milestones: Milestone[];
  aboutLabel: string;
  aboutTitle: string;
  aboutText: string;
  aboutLink: string;
  contactLabel: string;
  contactTitle: string;
  contactText: string;
  footer: string;
  top: string;
};

export const reviewContent = {
  en: {
    proposal: "Design proposal / 01",
    system: "Design system",
    work: "Work",
    journey: "Journey",
    about: "About",
    contact: "Contact",
    menu: "Menu",
    navigation: "Main navigation",
    language: "Language",
    light: "Switch to light theme",
    dark: "Switch to dark theme",
    skip: "Skip to content",
    eyebrow: "LUTHFI MUSTHAFA / SOFTWARE ENGINEER",
    headline: [
      "Software Engineer",
      "Building Web &",
      "Cross-Platform Experiences.",
    ],
    intro:
      "Thoughtful interfaces. Reliable foundations. I connect web applications with native platforms to make complex experiences feel simple.",
    explore: "Explore my work",
    connect: "Let’s connect",
    scroll: "A little further, a bigger picture",
    diagram: "Web meets the native world",
    workLabel: "01 / SELECTED WORK",
    workTitle: "Complex challenges.\nConsidered solutions.",
    workIntro:
      "A selection of connected experiences, shaped by the people and platforms behind them.",
    projectDetails: "My contribution",
    projects: [
      {
        title: "Family Care",
        category: "SMARTTHINGS / iOS",
        description: "Bringing peace of mind closer to home.",
        stack: "TypeScript · LitElement · Redux Toolkit",
        detail:
          "Served as Tech Lead for Family Care for iOS, combining hands-on development of onboarding and location features with technical coordination and code reviews.",
      },
      {
        title: "Virtual Home",
        category: "SMARTTHINGS / CROSS-PLATFORM",
        description: "One connected home. Many ways to experience it.",
        stack: "React · Web Components · WebView",
        detail:
          "Developed connected-device simulations and interactions across mobile, Family Hub, and TV, adapting to each platform’s capabilities and navigation.",
      },
      {
        title: "Air Care",
        category: "SMARTTHINGS / IoT",
        description: "Making the invisible easier to understand.",
        stack: "TypeScript · REST APIs · Chart.js",
        detail:
          "Developed interfaces integrating air-quality data, APIs, and connected IoT devices for environmental monitoring and device control.",
      },
    ],
    journeyLabel: "02 / ENGINEERING JOURNEY",
    journeyTitle: "Always building.\nAlways becoming.",
    journeyIntro:
      "The experiences that shape how I think, collaborate, and build. Select a chapter to explore.",
    all: "All chapters",
    workFilter: "Experience",
    education: "Education",
    filter: "Filter journey",
    close: "Close chapter",
    milestones: [
      {
        year: "2019 — Present",
        title: "Engineering connected experiences",
        place: "Samsung R&D Indonesia",
        description:
          "Engineer, Web Application. Building web experiences across Android, iOS, and Tizen, contributing reusable components, and taking on Tech Lead responsibilities on selected projects.",
        category: "work",
      },
      {
        year: "2018",
        title: "Exploring the quieter side of IoT",
        place: "NTUST · Research internship",
        description:
          "Researched power-saving mechanisms and deep-sleep behavior in Narrowband IoT systems at National Taiwan University of Science and Technology.",
        category: "work",
      },
      {
        year: "2015 — 2019",
        title: "Laying the foundations",
        place: "Universitas Indonesia",
        description:
          "Bachelor of Engineering in Computer Engineering. A foundation for understanding the systems behind the interfaces.",
        category: "education",
      },
    ],
    aboutLabel: "03 / THE PERSON BEHIND THE CODE",
    aboutTitle: "An engineer’s mind.\nA human perspective.",
    aboutText:
      "I’m Luthfi, a software engineer based in Jakarta. I care about the space between a complex requirement and an experience that feels natural. My work brings together hands-on engineering, cross-functional collaboration, and technical leadership.",
    aboutLink: "More about me",
    contactLabel: "04 / LET’S CONNECT",
    contactTitle: "Good things start\nwith a conversation.",
    contactText:
      "Have a project in mind, a question, or a shared curiosity? Say hello.",
    footer: "Luthfi Musthafa · Jakarta, Indonesia",
    top: "Back to top",
  },
  id: {
    proposal: "Usulan desain / 01",
    system: "Sistem desain",
    work: "Karya",
    journey: "Perjalanan",
    about: "Tentang",
    contact: "Kontak",
    menu: "Menu",
    navigation: "Navigasi utama",
    language: "Bahasa",
    light: "Gunakan tema terang",
    dark: "Gunakan tema gelap",
    skip: "Langsung ke konten",
    eyebrow: "LUTHFI MUSTHAFA / SOFTWARE ENGINEER",
    headline: [
      "Software Engineer",
      "Membangun Web &",
      "Pengalaman Lintas Platform.",
    ],
    intro:
      "Antarmuka yang terarah. Fondasi yang andal. Saya menghubungkan aplikasi web dengan platform native agar pengalaman yang kompleks terasa sederhana.",
    explore: "Jelajahi karya saya",
    connect: "Mari terhubung",
    scroll: "Lebih jauh, lebih mengenal",
    diagram: "Web bertemu dunia native",
    workLabel: "01 / KARYA PILIHAN",
    workTitle: "Tantangan kompleks.\nSolusi yang terarah.",
    workIntro:
      "Pilihan pengalaman terhubung, dibentuk oleh orang dan platform di baliknya.",
    projectDetails: "Kontribusi saya",
    projects: [
      {
        title: "Family Care",
        category: "SMARTTHINGS / iOS",
        description: "Mendekatkan rasa tenang kepada keluarga.",
        stack: "TypeScript · LitElement · Redux Toolkit",
        detail:
          "Sebagai Tech Lead Family Care untuk iOS, saya mengembangkan fitur onboarding dan lokasi, sekaligus melakukan koordinasi teknis dan peninjauan kode.",
      },
      {
        title: "Virtual Home",
        category: "SMARTTHINGS / LINTAS PLATFORM",
        description: "Satu rumah terhubung. Beragam cara menikmatinya.",
        stack: "React · Web Components · WebView",
        detail:
          "Mengembangkan simulasi dan interaksi perangkat terhubung di perangkat seluler, Family Hub, dan TV, dengan menyesuaikan kapabilitas dan navigasi setiap platform.",
      },
      {
        title: "Air Care",
        category: "SMARTTHINGS / IoT",
        description: "Membantu memahami hal yang tak terlihat.",
        stack: "TypeScript · REST APIs · Chart.js",
        detail:
          "Mengembangkan antarmuka yang mengintegrasikan data kualitas udara, API, dan perangkat IoT untuk pemantauan lingkungan dan kontrol perangkat.",
      },
    ],
    journeyLabel: "02 / PERJALANAN ENGINEERING",
    journeyTitle: "Terus membangun.\nTerus berkembang.",
    journeyIntro:
      "Pengalaman yang membentuk cara saya berpikir, berkolaborasi, dan berkarya. Pilih bab untuk menjelajahinya.",
    all: "Semua bab",
    workFilter: "Pengalaman",
    education: "Pendidikan",
    filter: "Saring perjalanan",
    close: "Tutup bab",
    milestones: [
      {
        year: "2019 — Sekarang",
        title: "Merancang pengalaman terhubung",
        place: "Samsung R&D Indonesia",
        description:
          "Engineer, Web Application. Membangun pengalaman web di Android, iOS, dan Tizen, mengembangkan komponen bersama, serta menjalankan tanggung jawab Tech Lead pada proyek tertentu.",
        category: "work",
      },
      {
        year: "2018",
        title: "Mengeksplorasi efisiensi IoT",
        place: "NTUST · Magang riset",
        description:
          "Meneliti mekanisme penghematan daya dan perilaku deep-sleep pada sistem Narrowband IoT di National Taiwan University of Science and Technology.",
        category: "work",
      },
      {
        year: "2015 — 2019",
        title: "Membangun fondasi",
        place: "Universitas Indonesia",
        description:
          "Sarjana Teknik bidang Teknik Komputer. Fondasi untuk memahami sistem di balik antarmuka.",
        category: "education",
      },
    ],
    aboutLabel: "03 / SOSOK DI BALIK KODE",
    aboutTitle: "Pikiran seorang engineer.\nPerspektif manusia.",
    aboutText:
      "Saya Luthfi, software engineer yang berbasis di Jakarta. Saya peduli pada proses mengubah kebutuhan kompleks menjadi pengalaman yang terasa alami. Pekerjaan saya memadukan pengembangan langsung, kolaborasi lintas fungsi, dan kepemimpinan teknis.",
    aboutLink: "Lebih jauh tentang saya",
    contactLabel: "04 / MARI TERHUBUNG",
    contactTitle: "Hal baik berawal\ndari percakapan.",
    contactText:
      "Punya ide proyek, pertanyaan, atau ketertarikan yang sama? Mari berbincang.",
    footer: "Luthfi Musthafa · Jakarta, Indonesia",
    top: "Kembali ke atas",
  },
} satisfies Record<Locale, ReviewContent>;
