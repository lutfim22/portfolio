# Implementation Roadmap — Codex Execution Plan

Status: Documentation, foundation (#3), design (#4), and core content (#5) are merged. Milestone 4 delivers an ATS CV, a Premium layout draft, and bilingual download pages. Premium finalization requires an owner-supplied headshot. Website deployment remains pending.

## Repository and Governance
- Repository: `github.com/lutfim22/portfolio` (created; public).
- Visibility: public from day one, following public-safety review.
- Initial commit completed: README, `.gitignore`, and minimal repository setup.
- PR #1: five approved Markdown planning documents, merged as the documentation baseline.
- Feature branches, focused PRs, clear acceptance criteria, CI, preview deployments, and explicit owner approval for merge.
- Never publish unverified content or secrets. Use English for repository docs, code, PR descriptions, and commits.

## Milestone 0 — Documentation and Repository Setup
**Dependencies met:** owner approved all five Markdown files as the documentation baseline and authorized repository bootstrap and the documentation PR.

Tasks:
1. Completed: create public `lutfim22/portfolio` repository with README and `.gitignore`.
2. Completed: add public-safe documentation on `docs/initial-documentation`.
3. Completed: documentation PR #1 merged as commit `6f2fb5c`.

Acceptance:
- Exactly approved files are committed; no confidential or unverified facts.
- Docs are navigable and internally consistent.
- No application code is needed in documentation PR.

## Milestone 1 — Application Foundation
**Dependencies:** documentation PR reviewed and approved for merge; explicit owner authorization to begin application implementation.

Tasks:
1. Implemented locally: Next.js + React + TypeScript + Tailwind v4 foundation.
2. Implemented locally: lint, typecheck, unit tests, formatting, GitHub Actions CI definition, and documented environment handling (no secrets required). GitHub CI passed before the foundation PR was merged.
3. Implemented locally: `/en` and `/id` routing, page-preserving language links, typed UI content, and repository-authored MDX About pages.
4. Pending: GitHub PR previews on Vercel after deployment authorization and available service access.

Acceptance:
- Clean CI, deterministic local build, no exposed secrets, accessible page skeleton.
- Both locale routes load and language switching preserves page context.

Local validation: lint, typecheck, foundation unit tests, formatting, production build, and
HTTP smoke checks for redirect, four localized pages, MDX rendering, language
links, landmarks, and four 404 paths. The full visual design and manual browser
accessibility validation remain later work.

Milestone 2 design direction was approved by the owner in chat. The approved
composition now powers `/en` and `/id`; noindex review routes remain available
at `/en/design`, `/id/design`, `/en/prototype`, and `/id/prototype`.

Package manager: pnpm 12.16.1 (latest stable at verification), pinned in
`packageManager`; CI and documentation use frozen pnpm installs.

## Milestone 2 — Design System and Homepage Approval
**Dependencies:** foundation ready; owner approves design direction.

Tasks:
1. Implemented for review: contrast-checked theme tokens, self-hosted Space Grotesk/Geist, layout primitives, navigation, theme controls, and abstract SVG artwork.
2. Implemented for review: responsive homepage prototype and captured mobile/desktop images in dark/light. See `docs/design-review/README.md`.
3. Implemented for review: navigation, persisted/system theme, page-preserving language links, category filtering, native timeline side-panel/bottom-sheet dialog, and no-JavaScript disclosures.
4. Completed: owner approved the concrete proposal in chat ("good, next") before Milestone 3 implementation.

Acceptance:
- Accessible contrast and focus, reduced motion, responsive content, documented design decisions.
- Owner approves mockups and prototype.

## Milestone 3 — Core Content and Case Studies
**Dependencies:** design approval and public-safe project content approval.

Tasks:
1. Implemented locally: homepage sections in the approved order, with real case-study and core-page links.
2. Implemented locally: themed About, Contact, Engineering Journey, and shared case-study template. Year/category filters include an empty state and keyboard-accessible dialogs.
3. Implemented locally: Family Care iOS, Virtual Home, and Air Care MDX case studies in EN/ID, based on approved profile facts.
4. Reused the abstract SVG artwork from the approved design; no proprietary screenshots.

Acceptance:
- No fabricated outcomes; accessible interactive timeline; consistent localized content.
- Core routes and navigation pass functional tests.

Validation and fact-source mapping: `docs/CORE_CONTENT.md`. Final editorial
publication review, CV production, cross-browser quality checks, and deployment
remain later work; no launch is implied by local completion.

## Milestone 4 — CV Production
**Dependencies:** approved CV source and owner-supplied headshot for Premium CV.

Tasks:
1. Implemented for review: two-page A4 ATS PDF, single column, no photograph; generated directly from the professional profile.
2. Implemented for review: two-page A4 Premium layout with violet accents. Finalization and public download remain blocked on an owner-supplied headshot.
3. Implemented: automated two-page/A4/text-extraction/link/source-parity checks and print-overflow checks; both layouts visually reviewed.
4. Implemented: localized CV pages, navigation, and a working ATS download. Premium draft stays outside public download files until finalized.

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

## Milestone PR status

Milestone 0 was merged in PR #1. Foundation [#3](https://github.com/lutfim22/portfolio/pull/3)
and design [#4](https://github.com/lutfim22/portfolio/pull/4) are merged.
Core-content [#5](https://github.com/lutfim22/portfolio/pull/5) is also merged.
CV production is delivered for review in [#7](https://github.com/lutfim22/portfolio/pull/7)
against main. Final Premium delivery remains blocked on the headshot. See [PR delivery rules](PR_WORKFLOW.md) for the complete milestone
mapping, review gates, dependency order, and future CV/quality work. Chat
approval of a visual direction does not authorize a GitHub merge or deployment.
