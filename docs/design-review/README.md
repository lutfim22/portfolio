# Milestone 2 — Design proposal 01

Status: the owner approved the visual direction in chat. This focused design PR
retains the foundation homepage and delivers the review routes separately.
GitHub merge approval and deployment remain separate.

## Review images and interactive routes

| View | Dark | Light |
| --- | --- | --- |
| Desktop, 1440px | [Dark desktop](home-desktop-dark.png) | [Light desktop](home-desktop-light.png) |
| Mobile, 390px | [Dark mobile](home-mobile-dark.png) | [Light mobile](home-mobile-light.png) |

The images are full-page captures of the implemented prototype, not generated
concept art. Start the application with the README commands and visit
`/en/prototype` or `/id/prototype`. `/en/design` and `/id/design` provide color
specimens, typography, and component notes. Review routes have noindex metadata.
No user-facing web preview or production deployment was created.

## Proposed direction

Warm neutral surfaces, editorial typography, violet emphasis, and restrained
magenta details. A floating rounded navigation bar contrasts with fine linear
project illustrations. The homepage follows the approved order: hero, selected
work, engineering journey, About, and Contact. Generous spacing and visible
section numbers make the long-form narrative easy to scan.

Headings use Space Grotesk Variable, and body copy uses Geist Variable. Both are
self-hosted through Fontsource, under OFL-1.1; their license files remain in the
respective installed packages. No remote font service, photograph, product
screenshot, logo, or unverified metric is used. All project artwork is original
abstract SVG, not a representation of an internal system or real data.

The About section uses an LM monogram until an owner-approved photograph exists.
Proposed English and Indonesian copy is based on the professional profile;
editorial wording and translations remain subject to owner review.

## Tokens and layout

`src/design/tokens.ts` is the source of truth for both palettes. The responsive
review stylesheet is scoped to `.design-surface` so the foundation remains
separate. Proposed tokens include background, surface, elevated surface, primary
text, muted text, violet accent, accent-label color, border, and magenta accent.

- Layout: 1320px maximum content width, fluid desktop margins, 24px mobile margins.
- Spacing: 4px base increments, with fluid section and hero spacing.
- Type: fluid display headings; body and UI use Geist; compact uppercase section labels.
- Shape: pill navigation and actions, restrained card corners, native modal panels.
- Responsive: three project columns on desktop, stacked cards below 700px;
  intermediate adjustments at 1000px; content checked down to 320px.
- Motion: a slow opacity/scale change on the small hero glow and 180ms control
  transitions. Reduced-motion disables ambient animation and smooth scrolling.

## Contrast evidence

The following are the lowest computed ratios across the background, surface,
and elevated surface tokens. Text pairs target 4.5:1; control boundaries target
3:1. The 32 color-pair checks run in Vitest alongside the foundation tests.

| Theme | Pair | Minimum contrast |
| --- | --- | --- |
| dark | text on all surfaces | 13.70:1 |
| dark | muted on all surfaces | 6.60:1 |
| dark | accent on all surfaces | 7.59:1 |
| dark | magenta on all surfaces | 8.20:1 |
| dark | primary-button label | 8.35:1 |
| dark | control border on all surfaces | 3.30:1 |
| light | text on all surfaces | 13.48:1 |
| light | muted on all surfaces | 5.21:1 |
| light | accent on all surfaces | 6.82:1 |
| light | magenta on all surfaces | 5.83:1 |
| light | primary-button label | 8.05:1 |
| light | control border on all surfaces | 3.58:1 |

Computed ratios cover the named solid token pairs. Browser accessibility scans
also inspect rendered pages; neither is a full WCAG conformance audit.

## Interaction review

- Theme: toggle the sun control. The choice persists across reloads, languages,
  and review pages. With no explicit choice, follow the operating-system theme;
  dark is the static/no-JavaScript fallback.
- Navigation: anchor links reach real sections. Mobile navigation is a native
  disclosure that closes on selection or Escape. English/Indonesian links retain
  the prototype or design-system route.
- Timeline: category filtering works. Each chapter opens a native dialog, shown
  as a side panel on desktop and a bottom sheet on mobile. Escape closes it and
  restores focus. Essential chapter text remains in native disclosures when
  JavaScript is unavailable. Year filtering and complete core content remain in Milestone 3.
- Projects: native disclosures reveal approved contribution summaries. Full localized case-study pages remain in Milestone 3.
- Contact: approved email, GitHub, and LinkedIn destinations; no contact form.

## Review decisions

Please review the overall composition, text density, typography, dark/light
palettes, artwork, mobile layout, bilingual wording, and timeline interaction.
The owner approved the direction. Final homepage promotion remains a separate
core-content PR so it can be reviewed independently.

## Verification and limits

Local validation uses pnpm 12.16.1, the latest stable version returned by the
registry when upgraded. Formatting, lint, TypeScript, the unit checks, the production
build, foundation HTTP smoke checks, and Chromium browser checks are run locally.
Browser checks cover the four visual variants, automated axe checks, keyboard
navigation, theme persistence, locale switching, category filtering, narrow
Indonesian text, reduced motion, and content without JavaScript. Review images
are regenerated by `pnpm test:browser` after a production build.

CI is configured for the same checks, but execution on GitHub is unverified
until these changes are pushed. Firefox, Safari, screen-reader testing,
Lighthouse, and production measurements remain unrun. No performance score or
complete accessibility compliance is claimed.
