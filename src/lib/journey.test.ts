import { describe, expect, it } from "vitest";
import { matchesYear } from "./journey";
import { isProjectSlug, localizedPath, projectSlugs } from "./i18n";

describe("journey year filtering", () => {
  it("includes both ends of education and overlapping internship", () => {
    for (const year of ["2015", "2018", "2019"])
      expect(matchesYear("2015 — 2019", year)).toBe(true);
    expect(matchesYear("2018", "2018")).toBe(true);
    expect(matchesYear("2018", "2019")).toBe(false);
    expect(matchesYear("2015 — 2019", "2020")).toBe(false);
  });
  it("recognizes ongoing experience in both languages", () => {
    for (const range of ["2019 — Present", "2019 — Sekarang"]) {
      expect(matchesYear(range, "2026")).toBe(true);
      expect(matchesYear(range, "2018")).toBe(false);
    }
  });
  it("handles all and rejects invalid filter input", () => {
    expect(matchesYear("2018", "all")).toBe(true);
    expect(matchesYear("2018", "2018junk")).toBe(false);
    expect(matchesYear("unknown", "2018")).toBe(false);
  });
});

describe("case-study routing", () => {
  it.each(projectSlugs)("preserves %s in both locales", (slug) => {
    expect(isProjectSlug(slug)).toBe(true);
    expect(localizedPath("en", `projects/${slug}`)).toBe(
      `/en/projects/${slug}`,
    );
    expect(localizedPath("id", `projects/${slug}`)).toBe(
      `/id/projects/${slug}`,
    );
  });
  it.each(["missing", "__proto__", "../family-care", "Family-Care"])(
    "rejects unknown slug %s",
    (slug) => expect(isProjectSlug(slug)).toBe(false),
  );
});
