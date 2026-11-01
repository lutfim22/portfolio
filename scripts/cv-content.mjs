import { readFile } from "node:fs/promises";

export const sourcePath = "docs/PROFESSIONAL_PROFILE.md";
export async function loadCvContent() {
  const source = await readFile(sourcePath, "utf8");
  const section = (name) => {
    const value = source.split(`## ${name}\n`)[1]?.split("\n## ")[0].trim();
    if (!value) throw new Error(`Missing CV source section: ${name}`);
    return value;
  };
  const clean = (value) =>
    value
      .replace(/\*\*/g, "")
      .replace(/\\(?=\n|$)/g, "")
      .trim();
  const bullets = (value) =>
    [...value.matchAll(/^- (.+)$/gm)].map((match) => clean(match[1]));
  const identity = Object.fromEntries(
    bullets(section("Identity")).map((line) => {
      const index = line.indexOf(": ");
      return [line.slice(0, index), line.slice(index + 2)];
    }),
  );
  const work = section("Work Experience").split("\n").filter(Boolean);
  const summary = section("Approved Professional Summary")
    .split(/\n\s*\n/)
    .map(clean);
  const projects = section("Selected Projects")
    .split(/^### /m)
    .slice(1)
    .map((entry) => {
      const [title, ...rest] = entry.trim().split("\n");
      return {
        title: clean(title),
        paragraphs: rest
          .join("\n")
          .trim()
          .split(/\n\s*\n/)
          .map(clean),
      };
    });
  const content = {
    identity,
    summary,
    work: {
      title: clean(work[0]),
      dates: clean(work[1]),
      bullets: bullets(section("Work Experience")),
    },
    skills: bullets(section("Technical Skills")),
    projects,
    education: section("Education")
      .split(/\n\s*\n/)
      .map(clean),
    research: section("Research Experience")
      .split(/\n\s*\n/)
      .map(clean),
    languages: bullets(section("Spoken Languages")),
  };
  if (
    content.projects.length !== 3 ||
    content.work.bullets.length !== 6 ||
    !identity.Name ||
    !identity.Email
  )
    throw new Error("Profile shape changed; review the CV mapping.");
  return content;
}

export function cvFacts(c) {
  return [
    c.identity.Name,
    c.identity["Professional headline"],
    c.identity.Location,
    c.identity.Email,
    c.identity.GitHub,
    c.identity.LinkedIn,
    ...c.summary,
    c.work.title,
    c.work.dates,
    ...c.work.bullets,
    ...c.skills,
    ...c.projects.flatMap((p) => [p.title, ...p.paragraphs]),
    ...c.education,
    ...c.research,
    ...c.languages,
  ];
}
