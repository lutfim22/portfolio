# Luthfi Musthafa — Engineering Portfolio

Bilingual personal engineering portfolio built with Next.js App Router, React,
TypeScript, Tailwind CSS v4, and repository-authored MDX.

## Development

Use Node.js 24 (see `.nvmrc`) and pnpm 12.16.1 (pinned in `packageManager`). No secrets, database, or environment variables
are required. `.env.example` documents the environment boundary; never expose
secrets through `NEXT_PUBLIC_` variables.

If pnpm is not available, enable it with `corepack enable pnpm` first. Verify
`pnpm --version` matches `packageManager`. In this cloud environment the bundled
fallback is older, so use `corepack pnpm <command>` with a writable
`COREPACK_HOME` (for example `/tmp/portfolio-corepack`) to run the pinned release.

```sh
cd /workspace/portfolio
pnpm install --frozen-lockfile
pnpm dev
```

Use the existing checkout in cloud tasks; each task already has an isolated
environment, so no extra Git worktree is needed. The development server uses port 3000. Live processes must be restarted in a fresh task.

`/` redirects to `/en`. Both `/en` and `/id` provide the approved homepage,
`/about`, `/contact`, `/journey`, and `/projects/{family-care,virtual-home,air-care}`.
The language switch preserves the current page. Unsupported locales and missing
pages return 404. Localized document language, metadata, navigation labels, and
content are defined together with typed dictionaries.

## Validation

```sh
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:smoke
```

The smoke test starts and stops its own production server on port 3100. It checks
the default redirect, fourteen localized core pages, MDX case-study sections,
language-switch targets, semantic landmarks, and invalid locale/project 404s. Port 3100 must be free. GitHub Actions runs
these same checks. To run the production app manually, use `pnpm build` and
`pnpm start`.

## Content and scope

- `src/content/site.ts`: localized site metadata.
- `src/design/content.ts`: shared bilingual homepage and timeline copy.
- `src/content/projects/`: typed project metadata and localized MDX case studies.
- `src/content/about/*.mdx`: local MDX content, compiled during the build.
- `src/lib/i18n.ts`: supported locales and route helpers.
- `docs/`: approved planning baseline, professional facts, and review requirements.

MDX is executable content: only compile reviewed repository files, never remote
or user-supplied MDX. The homepage uses the owner-approved Milestone 2 design. Core pages and six
localized MDX case studies are implemented. CV production and launch checks
remain later milestones. No external fonts or runtime API access are
needed for the foundation build.

Vercel preview integration and production deployment are not configured. They
remain separate deployment tasks; environment publication does not publish this
website. No merge or deployment is performed by local validation.

## Milestone 2 design review

`/en/prototype` and `/id/prototype` contain the homepage design proposal.
`/en/design` and `/id/design` show the proposed design system and components.
These retained review routes are marked noindex. The approved direction has
been promoted to the homepage as part of Milestone 3.
Both themes and languages are available, with local font files and abstract
project illustrations. The owner approved the design direction before Milestone 3 implementation.

See [the review guide](docs/design-review/README.md) for images and decisions.

After building, run the real-browser and automated accessibility checks:

```sh
pnpm exec playwright install chromium
pnpm test:browser
```

If Chromium is already installed in the cloud environment, use
`PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium pnpm test:browser`.
The runner starts and stops its own production server on port 3120. It captures
review images at desktop and mobile sizes in both themes. Chromium checks do not
establish cross-browser compatibility or a complete WCAG audit.

## Milestone 3 content and validation

Homepage case-study links lead to three public-safe projects, each available in
English and Indonesian. Case-study facts are drawn from
`docs/PROFESSIONAL_PROFILE.md`; the source mapping and review limits are in
[the content notes](docs/CORE_CONTENT.md). Unknown project slugs return 404 before
content lookup. Local MDX imports are explicitly allowlisted.

The Journey page and homepage timeline share year/category filters, an empty
state, keyboard-accessible native dialogs, and no-JavaScript disclosures.
The shared page shell retains the current page or case-study slug when changing
language and preserves the theme across navigation. Core browser tests verify
both languages, local links, mobile layout, and automated accessibility checks.

## Pull requests

Follow [the PR workflow](docs/PR_WORKFLOW.md). Milestones 1–3 are delivered as
stacked draft PRs, each with independent validation. Chat design approval is
separate from GitHub merge approval. Review the foundation before the design,
then the core-content PR; merge and deployment require owner authorization.

## CV production

`/en/cv` and `/id/cv` provide an English ATS CV download. Both CV layouts are
built from the same `docs/PROFESSIONAL_PROFILE.md` source. The Premium version
remains a clearly marked review draft until the owner supplies a headshot.

```sh
pnpm exec playwright install chromium
pnpm cv:generate
pnpm cv:check
```

Set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium` when using the cloud
Chromium installation. `cv:check` verifies two A4 pages, selectable text, every
mapped source fact, ATS reading order, and clickable email/social links.
Generation rejects overflow and footer overlap. CI checks committed PDFs first,
then regenerates and validates them using its installed Chromium.

See [CV review notes](docs/cv-review/README.md) for files, validation evidence,
and the remaining headshot requirement. PDF readability does not establish
compatibility with every proprietary applicant tracking system.
