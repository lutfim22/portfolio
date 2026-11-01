export const palettes = {
  dark: {
    bg: "#101014",
    surface: "#19191f",
    elevated: "#23232c",
    text: "#f3f0eb",
    muted: "#aaa7b4",
    accent: "#c6a5ff",
    onAccent: "#24123b",
    border: "#77717f",
    magenta: "#e9a8d8",
  },
  light: {
    bg: "#f6f4ef",
    surface: "#eeece6",
    elevated: "#ffffff",
    text: "#22212a",
    muted: "#62606d",
    accent: "#6636a1",
    onAccent: "#ffffff",
    border: "#81778e",
    magenta: "#96366e",
  },
} as const;

export type Theme = keyof typeof palettes;
export const themeCss = Object.entries(palettes)
  .map(
    ([theme, palette]) =>
      `${theme === "dark" ? ".design-surface" : 'html[data-portfolio-theme="light"] .design-surface'} { color-scheme: ${theme}; ${Object.entries(
        palette,
      )
        .map(([name, value]) => `--ds-${name}: ${value};`)
        .join(" ")} }`,
  )
  .join("\n");
