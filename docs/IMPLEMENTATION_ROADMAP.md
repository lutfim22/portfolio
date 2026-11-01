# Implementation Roadmap — Codex Execution Plan

Status: Planning only. Do not create, push, deploy, or merge without explicit owner authorization.

## Repository and Governance
- Planned repository: `github.com/lutfim22/portfolio` (not yet created).
- Visibility: public from day one, only after public-safety review.
- Initial commit: README, `.gitignore`, and minimal repository setup.
- PR #1: five Markdown planning documents; owner reviews before merge.
- Feature branches, focused PRs, clear acceptance criteria, CI, preview deployments, and explicit owner approval for merge.
- Never publish unverified content or secrets. Use English for repository docs, code, PR descriptions, and commits.

## Milestone 0 — Documentation and Repository Setup
**Dependencies:** owner approves all five Markdown files and authorizes GitHub actions.

Tasks:
1. Create public `lutfim22/portfolio` repository with README and `.gitignore`.
2. Add public-safe documentation on a feature branch.
3. Open documentation PR with checklist and summary; obtain approval.

Acceptance:
- Exactly approved files are committed; no confidential or unverified facts.
- Docs are navigable and internally consistent.
- No application code is needed in documentation PR.

## Milestone 1 — Application Foundation
**Dependencies:** documentation PR approved.

Tasks:
1. Bootstrap Next.js + React + TypeScript + Tailwind v4.
2. Establish lint, typecheck, unit tests, formatting, CI, and environment handling.
3. Set up `/en` and `/id` routing, typed content model, MDX content loading.
4. Configure GitHub PR previews on Vercel only after deployment authorization.

Acceptance:
- Clean CI, deterministic local build, no exposed secrets, accessible page skeleton.
- Both locale routes load and language switching preserves page context.

## Milestone 2 — Design System and Homepage Approval
**Dependencies:** foundation ready; owner approves design direction.

Tasks:
1. Define theme tokens, typography, layout primitives, and reusable UI components.
2. Produce high-fidelity homepage mockups for mobile/desktop, dark/light.
3. Build interactive prototype for navigation, theme, language, and timeline behavior.
4. Request owner review before implementing the complete homepage.

Acceptance:
- Accessible contrast and focus, reduced motion, responsive content, documented design decisions.
- Owner approves mockups and prototype.

## Milestone 3 — Core Content and Case Studies
**Dependencies:** design approval and public-safe project content approval.

Tasks:
1. Implement homepage sections in approved order.
2. Build About, Contact, Engineering Journey, and project templates.
3. Add Family Care iOS, Virtual Home, and Air Care case studies in EN/ID.
4. Create approved abstract visual assets; no proprietary screenshots.

Acceptance:
- No fabricated outcomes; accessible interactive timeline; consistent localized content.
- Core routes and navigation pass functional tests.

## Milestone 4 — CV Production
**Dependencies:** approved CV source and owner-supplied headshot for Premium CV.

Tasks:
1. Create ATS-friendly A4 PDF, single column, no photograph.
2. Create Premium A4 two-column PDF with subtle violet accents and small headshot.
3. Validate page count target (max two), text extraction, print layout, link function, and content parity.
4. Link downloadable CVs from portfolio.

Acceptance:
- Both versions use identical approved facts, are selectable/searchable, and are legible in print.
- No unverified Awards & Certifications section.

## Milestone 5 — Quality, SEO, and Launch
**Dependencies:** all core pages and CVs approved.

Tasks:
1. Run unit/component, Playwright end-to-end, accessibility, visual regression, and cross-browser checks.
2. Verify responsive layouts, reduced motion, broken links, locale metadata, sitemap, Open Graph, and structured data.
3. Measure Lighthouse mobile and Core Web Vitals; optimize where needed.
4. Configure privacy-conscious analytics and error monitoring.
5. Review content and Git history for sensitive information; request final launch approval.

Acceptance:
- WCAG 2.2 AA targeted; Lighthouse mobile ≥90 targeted, measured rather than assumed.
- No critical accessibility, security, localization, or content defects.
- Owner approves production deployment.

## Codex Operating Instructions
- Read all five documentation files before proposing code changes.
- State assumptions, dependencies, and acceptance criteria for each task.
- Work on focused feature branches; run available lint, typecheck, tests, and build.
- Do not invent project impact metrics or expose internal platform names.
- Do not commit secrets or unapproved professional claims.
- Request explicit approval for repository creation, publication, PR merge, and production deployment.
- Prefer a clear PR summary: scope, tests, screenshots when applicable, risks, and reviewer checklist.

## Suggested GitHub Milestones
Documentation & Setup → Foundation → Design Approval → Core Experience → CV Delivery → Quality & Launch.
