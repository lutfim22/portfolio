import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { getDocument, OPS } from "pdfjs-dist/legacy/build/pdf.mjs";
import { loadCvContent, cvFacts } from "./cv-content.mjs";

const content = await loadCvContent();
const normalize = (value) =>
  value.normalize("NFKC").replace(/[\s\u00ad\u200b]+/g, "");
const paths = [
  "public/cv/luthfi-musthafa-ats.pdf",
  "docs/cv-review/luthfi-musthafa-premium-draft.pdf",
];
for (const path of paths) {
  const loading = getDocument({
    data: new Uint8Array(await readFile(path)),
    isEvalSupported: false,
  });
  const doc = await loading.promise;
  try {
    assert.equal(doc.numPages, 2, `${path}: exactly two pages`);
    let text = "";
    const links = new Set();
    let images = 0;
    for (let index = 1; index <= doc.numPages; index++) {
      const page = await doc.getPage(index);
      const width = page.view[2] - page.view[0],
        height = page.view[3] - page.view[1];
      assert.ok(
        Math.abs(width - 595.28) < 1 && Math.abs(height - 841.89) < 1,
        `${path}: A4`,
      );
      const extracted = await page.getTextContent();
      assert.ok(
        extracted.items.length > 20,
        `${path}: selectable text on page ${index}`,
      );
      text +=
        extracted.items
          .filter((item) => "str" in item)
          .map((item) => item.str)
          .join(" ") + " ";
      for (const item of await page.getAnnotations())
        if (item.url) links.add(item.url);
      const operators = await page.getOperatorList();
      images += operators.fnArray.filter(
        (op) =>
          op === OPS.paintImageXObject || op === OPS.paintInlineImageXObject,
      ).length;
    }
    const normalized = normalize(text);
    for (const fact of cvFacts(content))
      assert.ok(
        normalized.includes(normalize(fact)),
        `${path}: missing source fact: ${fact}`,
      );
    for (const url of [
      `mailto:${content.identity.Email}`,
      content.identity.GitHub,
      content.identity.LinkedIn,
    ])
      assert.ok(
        [...links].some(
          (link) => link.replace(/\/$/, "") === url.replace(/\/$/, ""),
        ),
        `${path}: missing clickable ${url}`,
      );
    assert.ok(
      !text.includes("Awards and Certifications"),
      `${path}: no unverified awards`,
    );
    if (path.includes("-ats")) {
      assert.equal(images, 0, "ATS has no photograph or decorative images");
      const headings = [
        "Professional Summary",
        "Work Experience",
        "Technical Skills",
        "Selected Projects",
        "Education",
        "Research Experience",
        "Spoken Languages",
      ];
      for (let i = 1; i < headings.length; i++)
        assert.ok(
          text.indexOf(headings[i]) > text.indexOf(headings[i - 1]),
          "ATS section reading order",
        );
    } else
      assert.ok(
        normalized.includes(normalize("HEADSHOT REQUIRED")),
        "Premium stays clearly marked as a draft",
      );
    console.log(
      `PASS ${path}: 2 A4 pages, selectable text, source parity, clickable contact links`,
    );
  } finally {
    await loading.destroy();
  }
}
