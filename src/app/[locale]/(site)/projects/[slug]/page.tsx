import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  isLocale,
  isProjectSlug,
  projectSlugs,
  localizedPath,
} from "@/lib/i18n";
import { projects, loadProject } from "@/content/projects";
import { SiteShell } from "@/components/site-shell";
import { ProjectArtwork } from "@/design/artwork";
import { Arrow } from "@/design/icons";

type Props = { params: Promise<{ locale: string; slug: string }> };
export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isProjectSlug(slug)) notFound();
  return {
    title: projects[slug][locale].title,
    description: projects[slug][locale].context,
  };
}
export default async function Project({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isProjectSlug(slug)) notFound();
  const project = projects[slug][locale];
  const Content = await loadProject(slug, locale);
  const next =
    projectSlugs[(projectSlugs.indexOf(slug) + 1) % projectSlugs.length];
  const en = locale === "en";
  return (
    <SiteShell locale={locale} page={`projects/${slug}`}>
      <Link
        className="ds-text-link back-link"
        href={`${localizedPath(locale, "home")}#work`}
      >
        {en ? "All selected work" : "Semua karya pilihan"}
        <Arrow />
      </Link>
      <header className="case-header">
        <p className="section-label">
          {en ? "SELECTED WORK / CASE STUDY" : "KARYA PILIHAN / STUDI KASUS"}
        </p>
        <h1>{project.title}</h1>
        <p className="page-lead">{project.context}</p>
      </header>
      <div className="case-intro">
        <dl>
          <div>
            <dt>{en ? "My role" : "Peran saya"}</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt>{en ? "Technologies" : "Teknologi"}</dt>
            <dd>{project.technologies.join(" · ")}</dd>
          </div>
        </dl>
        <ProjectArtwork index={project.artwork} />
      </div>
      <article className="content-prose case-body">
        <Content />
      </article>
      <nav
        className="case-next"
        aria-label={en ? "More selected work" : "Karya pilihan lainnya"}
      >
        <span className="section-label">
          {en ? "NEXT CASE STUDY" : "STUDI KASUS BERIKUTNYA"}
        </span>
        <Link href={localizedPath(locale, `projects/${next}`)}>
          {projects[next][locale].title}
          <Arrow />
        </Link>
      </nav>
    </SiteShell>
  );
}
