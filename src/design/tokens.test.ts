import { describe, expect, it } from "vitest";
import { palettes } from "./tokens";

function luminance(hex: string) {
  const channels = hex
    .slice(1)
    .match(/.{2}/g)!
    .map((value) => {
      const channel = parseInt(value, 16) / 255;
      return channel <= 0.04045
        ? channel / 12.92
        : ((channel + 0.055) / 1.055) ** 2.4;
    });
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}
function contrast(a: string, b: string) {
  const x = luminance(a),
    y = luminance(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}

for (const [theme, p] of Object.entries(palettes))
  describe(`${theme} contrast`, () => {
    for (const surface of ["bg", "surface", "elevated"] as const) {
      for (const foreground of ["text", "muted", "accent", "magenta"] as const)
        it(`${foreground} on ${surface} meets AA for normal text`, () =>
          expect(contrast(p[foreground], p[surface])).toBeGreaterThanOrEqual(
            4.5,
          ));
      it(`control border on ${surface} meets non-text contrast`, () =>
        expect(contrast(p.border, p[surface])).toBeGreaterThanOrEqual(3));
    }
    it("primary button label meets normal-text AA", () =>
      expect(contrast(p.onAccent, p.accent)).toBeGreaterThanOrEqual(4.5));
  });
