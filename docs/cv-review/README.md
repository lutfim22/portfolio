# Milestone 4 — CV review

Core content PR #5 is merged. This focused CV-production PR uses the professional
profile as the single factual source and delivers two layouts with identical
mapped professional facts. No awards, certification placeholders, unapproved
numbers, proprietary diagrams, or artificial photographs were added.

## Files

[Current generated PDFs and page previews](FILES.md) are updated automatically
by the generator. Both variants contain two English A4 pages. ATS is single
column and photo-free; Premium is a two-column draft without a photo, or a final
PDF when an approved asset is present. Previews are refreshed in the same run.

The ATS file is downloadable from `/en/cv` and `/id/cv`. The website exposes a Premium download only when the generated readiness flag
is true. Without an asset, its draft lives in review documentation, not `public/cv`.

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

## Deferred photo: replace an asset and regenerate

The owner chose to provide the photo later. Photo delivery is not a blocker for
reviewing/merging the generator tooling or the ATS CV now.

1. Put one approved image at `assets/cv/headshot.png`, `headshot.jpg`, or
   `headshot.jpeg`. Keep only one matching file.
2. Run `pnpm cv:refresh` from the repository root.
3. Review the generated final Premium PDF, commit the photo and generated outputs,
   and open/update the focused PR for owner merge review. Use the required Codex
   attribution on AI-assisted commits.

The command generates both layouts, checks them, and rebuilds the portfolio. It
automatically enables the Premium download on both localized CV pages when a
valid image is present. No manual source-code or link edits are needed. Removing
the image and rerunning restores the draft and removes the stale public Premium
file/link. ATS never receives the photograph.

`src/content/cv-status.json` is generated last and records availability plus a
SHA-256 digest of the selected asset. The PDF check catches changed/missing
assets that have not been regenerated. Add the photo only when you own or have
permission to publish it; this is a public repository.

Without a photo, `pnpm cv:generate` remains successful and produces the draft.
`--final-premium` explicitly requires a photo. Existing `--headshot=/path/to/file`
usage remains available; the fixed asset path is recommended for reproducible CI.
For an explicit external path, use the same `--headshot` option with `cv:check`;
copy the final photo into the fixed repository asset location before committing
outputs so CI can reproduce them.

`pnpm cv:test` exercises PNG/JPEG final generation, content parity, changed-asset
detection, duplicate files, invalid signatures, undecodable images, protected
prior output, and removal/restoration. Neutral synthetic test pixels exist only
inside temporary directories; none are shipped as a portrait or product asset.
Generation verifies image decoding, page bounds, and footer separation before
publishing outputs. The remaining limitation is visual review of the real photo
once supplied; no real headshot has been fabricated or validated in this PR.

Final CV content and visual approval, PR merge, and production deployment remain
separate owner decisions. No merge or deployment was performed for this task.

Local results: PDF checks passed for both variants; formatting, lint, typecheck,
51 unit tests, the production build, HTTP smoke checks, and 16 Chromium tests
passed. All four rendered PDF pages were visually inspected. GitHub CI results
are reported separately on the PR.
