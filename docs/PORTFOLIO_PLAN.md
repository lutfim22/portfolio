# Portfolio Product Plan

Status: The public `lutfim22/portfolio` repository exists, and all five planning documents are approved as the documentation baseline. PR #1 awaits review and merge approval. Application implementation and production deployment are not yet authorized.

## Product Goal
Create a premium bilingual personal engineering portfolio for Luthfi Musthafa (itsvee98) that demonstrates 7+ years of professional software engineering, cross-platform integration, technical ownership, and selected project work. Primary audiences: recruiters, hiring managers, and potential clients or founders. Target opportunities: Senior Software Engineer individual-contributor roles, Indonesia, international remote, and relocation.

## Positioning
**Software Engineer | Web Applications & Cross-Platform Integration**

Hero: **Software Engineer Building Web & Cross-Platform Experiences.**

Primary CTA: **Explore My Work**. Secondary CTA: **Let's Connect**.

## Launch Scope
- Curated homepage, About, three project case studies, Engineering Journey, Contact, and CV access.
- Featured projects in order: SmartThings Family Care for iOS, SmartThings Virtual Home, SmartThings Air Care.
- No blog, lab, or OpsReplay page at launch; reveal only after approved content is ready.
- English is default; Indonesian translation available for all published content.
- Planned domain: `itsvee98.vercel.app` (availability and configuration not yet verified).

## Homepage Narrative
1. Hero — cinematic but performant ambient aurora, concise positioning, clear CTAs, LM monogram.
2. Featured Projects — alternating editorial showcase with role, technologies, qualitative outcomes, and case-study links.
3. Engineering Journey — interactive, guided timeline.
4. About Preview — professional background, motivation, smart-casual portrait when supplied.
5. Contact — email, GitHub, LinkedIn; no contact form.

## Case Study Template
Each case study follows **Problem → Approach → Impact**. Describe the product context, individual contribution, cross-platform constraints, architecture at a public-safe level, and evidence-based outcomes. Use approved, non-confidential illustrations or abstract visualizations instead of Samsung internal screenshots. Never invent performance numbers, customer metrics, or proprietary details.

## Engineering Journey
- Present-to-past chronology with clickable nodes and expandable detail panels (side panel on desktop; bottom sheet on mobile).
- Include projects, responsibilities, achievements, education, and career milestones only where approved.
- Year and category filters; keyboard and screen-reader support.
- Progressive enhancement: timeline content remains navigable without animation.

## About and Contact
- About balances engineering experience with personal motivation and a restrained personal touch.
- Smart-casual photograph is optional until supplied and approved.
- Contact provides email, GitHub, and LinkedIn; evergreen language rather than unsupported availability claims.

## Technology and Content Architecture
- Next.js, React, TypeScript, Tailwind CSS v4, hybrid shadcn/custom components, Motion.
- MDX and typed structured content, localized EN/ID versions.
- Routes use `/en/...` and `/id/...`; language switch retains the equivalent page where available.
- Git-based content workflow; no CMS needed for initial launch.
- Vercel deployment, GitHub feature branches and PR previews after approval.

## Quality Targets
- WCAG 2.2 AA as the accessibility target, with keyboard navigation, semantic structure, focus visibility, and reduced-motion handling.
- Responsive across mobile, tablet, and desktop; mobile-first performance.
- Lighthouse mobile performance target ≥90, and Core Web Vitals in the Good range, as aspirations to measure—not guarantees.
- SEO: metadata, canonical URLs, hreflang, sitemap, Open Graph, JSON-LD where appropriate.
- Privacy-first telemetry: prefer Vercel Analytics and Speed Insights, with proportionate error monitoring and disclosure.

## Delivery Principles
Design-first: approve design system → homepage high-fidelity mockup → interactive prototype → implementation. Prioritize three polished case studies and a strong homepage over feature breadth. Public-safe review gates apply to every new case study and asset.
