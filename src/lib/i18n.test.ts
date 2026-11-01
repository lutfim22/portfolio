import { describe, expect, it } from "vitest";
import { isLocale, languageNames, locales, localizedPath } from "./i18n";
import { siteContent } from "../content/site";

describe("locale routing", () => {
  it.each(["en", "id"])("accepts supported locale %s", (value) =>
    expect(isLocale(value)).toBe(true),
  );
  it.each(["", "fr", "EN", "en/about", "../id"])(
    "rejects unsupported locale %s",
    (value) => expect(isLocale(value)).toBe(false),
  );
  it("keeps the same page when switching locale", () => {
    expect(localizedPath("en", "home")).toBe("/en");
    expect(localizedPath("id", "home")).toBe("/id");
    expect(localizedPath("en", "about")).toBe("/en/about");
    expect(localizedPath("id", "about")).toBe("/id/about");
  });
  it("provides nonempty, equivalent UI dictionary keys for both languages", () => {
    expect(Object.keys(siteContent.en).sort()).toEqual(
      Object.keys(siteContent.id).sort(),
    );
    for (const locale of locales) {
      expect(languageNames[locale]).toBeTruthy();
      for (const value of Object.values(siteContent[locale]))
        expect(value.trim()).not.toBe("");
    }
  });
});
