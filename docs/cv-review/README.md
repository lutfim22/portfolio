# Milestone 4 — CV review

Core content PR #5 is merged. This focused CV-production PR uses the professional
profile as the single factual source and delivers two layouts with identical
mapped professional facts. No awards, certification placeholders, unapproved
numbers, proprietary diagrams, or artificial photographs were added.

## Files

- [ATS CV](../../public/cv/luthfi-musthafa-ats.pdf): two A4 pages, English, single
  column, black-and-white, selectable text, no photo.
- [Premium draft](luthfi-musthafa-premium-draft.pdf): two A4 pages, English, main
  experience/projects column, supporting sidebar, violet accents, self-hosted
  Space Grotesk/Geist. Clearly marked as a draft requiring a headshot.
- [ATS page 1](ats-1.png), [page 2](ats-2.png).
- [Premium page 1](premium-1.png), [page 2](premium-2.png).

The ATS file is downloadable from `/en/cv` and `/id/cv`. The website does not
expose a Premium download or pretend a professional headshot exists. Its draft
lives in review documentation, not `public/cv`.

## Reproduction and validation

Run `pnpm cv:generate` using the pinned pnpm release and installed Playwright
Chromium. The generator reads `docs/PROFESSIONAL_PROFILE.md` and embeds local font
files; it makes no remote font or data requests. Each variant has the same
summary, employer/title/dates, experience bullets, skills, projects, education,
research, and spoken-language facts. Markdown formatting is removed without
changing those facts. Header/contact details are shared.

Run `pnpm cv:check` to parse both PDFs with PDF.js and confirm exactly two A4
pages, a searchable/selectable text layer on each page, inclusion of every
mapped source fact, active email/GitHub/LinkedIn annotations, correct ATS section
order, and no ATS images. The PDF generator checks DOM page overflow and footer
overlap before printing. Local Poppler inspection independently confirms page
size, page count, tags, absence of encryption/scripts, and visual page renders.
CI validates committed PDFs before generating replacements so stale factual
content cannot be hidden by regeneration. Timestamps may differ across runs;
byte-for-byte PDF identity is not claimed.

Browser checks exercise both localized CV routes, locale preservation,
accessibility scans, mobile layout, the real browser download filename, PDF MIME
and header, and the absence of an unfinished public Premium download. Existing
site checks continue to run. These checks do not certify every ATS vendor or
constitute a complete PDF accessibility audit.

## Remaining owner action

Provide a professional PNG or JPEG headshot that you own or have permission to
use and approve its inclusion in the public Premium CV. A head-and-shoulders
portrait with a neutral background is suitable. No portrait has been invented
or substituted. The ATS version can be reviewed independently.

After the headshot is supplied, the agent will generate the final Premium PDF,
validate the photo's placement and both PDFs' content parity, and update the
public download and checks in a focused follow-up PR. The generator supports
`--headshot=/path/to/approved-photo.png --final-premium`; it rejects final Premium
output without a photo. That command alone does not publish the website or
complete the follow-up integration/review.

Final CV content and visual approval, PR merge, and production deployment remain
separate owner decisions. No merge or deployment was performed for this task.

Local results: PDF checks passed for both variants; formatting, lint, typecheck,
51 unit tests, the production build, HTTP smoke checks, and 16 Chromium tests
passed. All four rendered PDF pages were visually inspected. GitHub CI results
are reported separately on the PR.
