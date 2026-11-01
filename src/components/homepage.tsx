import Link from "next/link";
import { Arrow } from "@/design/icons";
import { type Locale, localizedPath } from "@/lib/i18n";
import { reviewContent } from "@/design/content";
import { ReviewHeader } from "@/design/header";
import { OrbitArtwork, ProjectArtwork } from "@/design/artwork";
import { Journey } from "@/design/journey";

export function Homepage({ locale }: { locale: Locale }) {
  const c = reviewContent[locale];
  return (
    <>
      <ReviewHeader locale={locale} page="prototype" />
      <main id="review-main" tabIndex={-1}>
        <section
          className="review-hero ds-container"
          aria-labelledby="hero-title"
          id="top"
        >
          <div className="hero-copy">
            <p className="section-label">{c.eyebrow}</p>
            <h1 id="hero-title">
              <span>{c.headline[0]}</span>
              <span>{c.headline[1]}</span>
              <span className="accent-text">{c.headline[2]}</span>
            </h1>
            <p className="hero-intro">{c.intro}</p>
            <div className="hero-actions">
              <a href="#work" className="ds-button">
                {c.explore}
                <Arrow />
              </a>
              <a href="#contact" className="ds-text-link">
                {c.connect}
                <Arrow />
              </a>
            </div>
          </div>
          <div className="hero-visual">
            <OrbitArtwork />
            <p>{c.diagram}</p>
          </div>
          <div className="hero-foot">
            <span>
              JAKARTA, INDONESIA <Arrow />
            </span>
            <a href="#work">
              {c.scroll}
              <Arrow down />
            </a>
            <span>WEB / NATIVE / HUMAN</span>
          </div>
        </section>
        <section
          className="work-section ds-container"
          id="work"
          aria-labelledby="work-title"
        >
          <div className="section-top">
            <p className="section-label">{c.workLabel}</p>
            <span className="section-count">01 — 03</span>
          </div>
          <div className="section-heading">
            <h2 id="work-title">{c.workTitle}</h2>
            <p>{c.workIntro}</p>
          </div>
          <div className="project-grid">
            {c.projects.map((project, index) => (
              <article className="review-project" key={project.title}>
                <ProjectArtwork index={index} />
                <p className="project-category">{project.category}</p>
                <h3>
                  {project.title}
                  <Arrow />
                </h3>
                <p className="project-description">{project.description}</p>
                <p className="project-stack">{project.stack}</p>

                <details className="contribution">
                  <summary>{c.projectDetails}</summary>
                  <p>{project.detail}</p>
                </details>
              </article>
            ))}
          </div>
        </section>
        <section
          className="journey-section"
          id="journey"
          aria-labelledby="journey-title"
        >
          <div className="ds-container">
            <p className="section-label">{c.journeyLabel}</p>
            <div className="section-heading">
              <h2 id="journey-title">{c.journeyTitle}</h2>
              <p>{c.journeyIntro}</p>
            </div>
            <Journey locale={locale} />
          </div>
        </section>
        <section
          className="about-section ds-container"
          id="about"
          aria-labelledby="about-title"
        >
          <div className="about-monogram" aria-hidden="true">
            <span>LM</span>
            <span className="monogram-coordinates">JKT / ID</span>
          </div>
          <div>
            <p className="section-label">{c.aboutLabel}</p>
            <h2 id="about-title">{c.aboutTitle}</h2>
            <p>{c.aboutText}</p>
            <Link
              className="ds-text-link"
              href={localizedPath(locale, "about")}
            >
              {c.aboutLink}
              <Arrow />
            </Link>
          </div>
        </section>
        <section
          className="contact-section ds-container"
          id="contact"
          aria-labelledby="contact-title"
        >
          <p className="section-label">{c.contactLabel}</p>
          <h2 id="contact-title">{c.contactTitle}</h2>
          <p>{c.contactText}</p>
          <a className="contact-email" href="mailto:luthfi.musthafa@gmail.com">
            luthfi.musthafa@gmail.com
            <Arrow />
          </a>
          <div className="social-links">
            <a href="https://github.com/lutfim22">
              GitHub <Arrow />
            </a>
            <a href="https://www.linkedin.com/in/lutfi22">
              LinkedIn <Arrow />
            </a>
          </div>
        </section>
      </main>
      <footer className="review-footer ds-container">
        <span>{c.footer}</span>
        <a href="#top">
          {c.top} <Arrow />
        </a>
      </footer>
    </>
  );
}
