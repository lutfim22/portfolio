import { readFile, mkdir, writeFile } from "node:fs/promises";
import { chromium } from "@playwright/test";
import { loadCvContent } from "./cv-content.mjs";

const c = await loadCvContent();
const escape = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
const p = (text) => `<p>${escape(text).replaceAll("\n", "<br>")}</p>`;
const section = (title, body) => `<section><h2>${title}</h2>${body}</section>`;
const list = (items) =>
  `<ul>${items.map((text) => `<li>${escape(text)}</li>`).join("")}</ul>`;
const summary = section("Professional Summary", c.summary.map(p).join(""));
const experience = section(
  "Work Experience",
  `<h3>${escape(c.work.title)}</h3>${p(c.work.dates)}${list(c.work.bullets)}`,
);
const skills = section("Technical Skills", c.skills.map(p).join(""));
const projects = section(
  "Selected Projects",
  c.projects
    .map(
      (project) =>
        `<article><h3>${escape(project.title)}</h3>${project.paragraphs.map(p).join("")}</article>`,
    )
    .join(""),
);
const education = section("Education", c.education.map(p).join(""));
const research = section("Research Experience", c.research.map(p).join(""));
const languages = section("Spoken Languages", c.languages.map(p).join(""));
const imageArg = process.argv
  .find((arg) => arg.startsWith("--headshot="))
  ?.slice(11);
const finalPremium = process.argv.includes("--final-premium");
if (finalPremium && !imageArg)
  throw new Error(
    "A supplied, approved headshot is required for the final Premium CV.",
  );
let headshot = "";
if (imageArg) {
  const bytes = await readFile(imageArg);
  const png = bytes
    .subarray(0, 8)
    .equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  const jpeg = bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255;
  if (!png && !jpeg)
    throw new Error("Headshot must be an approved PNG or JPEG.");
  headshot = `<img alt="" src="data:image/${png ? "png" : "jpeg"};base64,${bytes.toString("base64")}">`;
}
const font = async (path) =>
  `data:font/woff2;base64,${(await readFile(path)).toString("base64")}`;
const headingFont = await font(
  "node_modules/@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2",
);
const bodyFont = await font(
  "node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2",
);
const header = (premium) =>
  `<header>${premium && headshot ? headshot : ""}<h1>${escape(c.identity.Name)}</h1><p class="headline">${escape(c.identity["Professional headline"])}</p><p class="contact">${escape(c.identity.Location)} · <a href="mailto:${escape(c.identity.Email)}">${escape(c.identity.Email)}</a><br><a href="${escape(c.identity.GitHub)}">${escape(c.identity.GitHub)}</a> · <a href="${escape(c.identity.LinkedIn)}">${escape(c.identity.LinkedIn)}</a></p></header>`;
const css = `
@font-face{font-family:Space;src:url('${headingFont}');font-weight:300 700;font-display:block}
@font-face{font-family:Geist;src:url('${bodyFont}');font-weight:100 900;font-display:block}
@page{size:A4;margin:0}*{box-sizing:border-box}html,body{margin:0;padding:0;color:#171717;background:white}body{font:9.4pt/1.36 Arial,sans-serif}.sheet{width:210mm;height:297mm;padding:13mm 15mm 16mm;position:relative;break-after:page}.sheet:last-child{break-after:auto}header{border-bottom:1px solid #333;padding-bottom:3mm;margin-bottom:4mm}h1{font-size:23pt;line-height:1.1;margin:0 0 2mm}p{margin:0 0 2.2mm}.headline{font-size:10pt;font-weight:bold}.contact{font-size:8.5pt;line-height:1.5;margin:0}a{color:inherit;text-decoration:none}h2{font-size:11pt;line-height:1.2;margin:4mm 0 2mm;padding-bottom:1mm;border-bottom:1px solid #aaa}h3{font-size:9.8pt;margin:0 0 1.5mm;line-height:1.35}ul{padding-left:4.5mm;margin:2mm 0}li{margin-bottom:1.8mm}article{break-inside:avoid;margin-bottom:4mm}footer{position:absolute;bottom:8mm;left:15mm;right:15mm;font-size:8pt;color:#555;display:flex;justify-content:space-between}.premium{font-family:Geist,Arial,sans-serif;font-size:9pt;line-height:1.4}.premium h1,.premium h2{font-family:Space,Arial,sans-serif}.premium header{border-bottom:2px solid #6636a1}.premium h1{color:#45266b;font-weight:600}.premium h2{color:#6636a1;font-size:11.5pt;border-color:#d9cbe9}.premium a{color:#45266b}.columns{display:grid;grid-template-columns:2.15fr 1fr;gap:6mm}.columns aside{background:#f4f0f8;padding:3mm}.columns aside h2:first-child{margin-top:0}.premium header img{float:right;width:21mm;height:24mm;object-fit:contain;margin-left:5mm}.draft{font-size:7pt;letter-spacing:1px;color:#6636a1;text-align:right;margin-bottom:2mm}.premium .columns h3{font-size:9.2pt}.premium .columns p{margin-bottom:2.1mm}.premium .columns li{margin-bottom:1.5mm}
`;
await mkdir("public/cv", { recursive: true });
await mkdir("docs/cv-review", { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
});
try {
  for (const variant of ["ats", "premium"]) {
    const premium = variant === "premium";
    const pages = premium
      ? [
          `<div class="columns"><div>${summary}${experience}</div><aside>${skills}</aside></div>`,
          `<div class="columns"><div>${projects}${research}</div><aside>${education}${languages}</aside></div>`,
        ]
      : [
          `${summary}${experience}${skills}`,
          `${projects}${education}${research}${languages}`,
        ];
    const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${escape(c.identity.Name)} — CV</title><style>${css}</style></head><body class="${variant}">${pages.map((body, index) => `<div class="sheet">${premium && !finalPremium ? '<div class="draft">DESIGN DRAFT · HEADSHOT REQUIRED</div>' : ""}${header(premium)}<div class="page-content">${body}</div><footer><span>${escape(c.identity.Name)}</span><span>${index + 1} / 2</span></footer></div>`).join("")}</body></html>`;
    const page = await browser.newPage();
    await page.setContent(html);
    await page.evaluate(() => document.fonts.ready);
    await page.emulateMedia({ media: "print" });
    const overflow = await page.locator(".sheet").evaluateAll((sheets) =>
      sheets.map((sheet) => ({
        overflow: sheet.scrollHeight > sheet.clientHeight + 1,
        overlap:
          sheet.querySelector(".page-content").getBoundingClientRect().bottom >
          sheet.querySelector("footer").getBoundingClientRect().top - 8,
      })),
    );
    if (overflow.some((x) => x.overflow || x.overlap))
      throw new Error(
        `${variant}: page content overflows: ${JSON.stringify(overflow)}`,
      );
    const path = premium
      ? finalPremium
        ? "public/cv/luthfi-musthafa-premium.pdf"
        : "docs/cv-review/luthfi-musthafa-premium-draft.pdf"
      : "public/cv/luthfi-musthafa-ats.pdf";
    await page.pdf({
      path,
      preferCSSPageSize: true,
      printBackground: true,
      tagged: true,
    });
    await writeFile(`docs/cv-review/${variant}.html`, html);
    console.log(`Generated ${path}`);
    await page.close();
  }
} finally {
  await browser.close();
}
