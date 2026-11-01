# Milestone 3 — Core portfolio content

The owner approved Milestone 2's concrete design proposal and asked to proceed.
The approved homepage composition is implemented at `/en` and `/id`, alongside
About, Contact, Engineering Journey, and three bilingual case studies.
This work is delivered in a focused dependent PR after the foundation and design
PRs. GitHub publication for code review is separate from owner merge approval
and website deployment; no deployment has been performed.

## Content sources

All professional claims come from `PROFESSIONAL_PROFILE.md`. Editorial framing
and translations preserve those facts; no performance numbers, customer counts,
team sizes, proprietary architecture, or unverified awards were introduced.

| Content | Approved source | Implementation |
| --- | --- | --- |
| Identity, location, contact | Identity | Homepage, About, Contact |
| Cross-platform web experience | Approved summary and work experience | Homepage, About, Journey |
| Family Care for iOS | Work experience, Family Care selected-project entry | Tech Lead responsibilities, onboarding/location work, technical coordination, reviews, two major releases delivered on schedule |
| Virtual Home | Work experience, Virtual Home selected-project entry | Connected-device simulation and interactions across mobile, Family Hub, TV; adapting platform capabilities and navigation |
| Air Care | Work experience, Air Care selected-project entry | Integrating environmental data, APIs, and IoT devices for monitoring and control |
| Education and internship | Education and research entries | About, Journey; dates 2015–2019 and 2018 |
| Languages | Spoken languages | About |

Each project has typed title/context/role/technology metadata and two local MDX
bodies following Problem → Approach → Impact (Tantangan → Pendekatan → Dampak).
Imports use a finite allowlist, and locale/project slugs are validated before
lookup. Case-study roles are project responsibilities, not replacements for the
formal Samsung employer title. All visuals are the original abstract SVGs from
the approved design. They depict no actual device data or internal system.

## Routes

Each route exists under both `/en` and `/id`:

- Homepage, `/about`, `/contact`, `/journey`.
- `/projects/family-care`, `/projects/virtual-home`, `/projects/air-care`.

The root redirects to English. Navigation, next-case-study links, language links,
and selected-work links point to actual pages. Language switching retains the
current case-study slug. Contact uses the approved email, GitHub, and LinkedIn
links; there is no contact form or unverified availability claim.

The shared year filter matches intervals inclusively, including the ongoing
2019–present experience. The year choices are event boundary years from the
source. Category filters combine with year filtering; empty results are announced.
Native dialogs retain keyboard focus and Escape dismissal. Without JavaScript,
all chapter text remains available through native disclosures and inactive theme
and filter controls are hidden.

## Validation and remaining review

Run the README's pinned pnpm commands. Unit checks cover routes, locale behavior,
contrast, and year boundaries. HTTP smoke checks visit all fourteen localized
core pages, validate rendered MDX case-study sections, locale counterparts,
landmarks, review-metadata separation, and invalid project/locale 404 responses.
Chromium tests exercise the full homepage → project → language-switch → next
project journey, shared navigation and theme, filters, mobile overflow, local
links, and automated axe scans for all core pages in both languages. Retained
Milestone 2 review tests continue to run.

Final public editorial approval and launch review remain outstanding. Chrome
checks and automated scans do not establish complete WCAG conformance or Safari/
Firefox compatibility. CVs, production analytics, launch metadata, performance
measurement, GitHub CI execution, and deployment remain later milestones. No
professional photo is used or fabricated; the approved monogram fills that role.

## Captured case-study renders

- [English desktop — Family Care](core-review/family-care-desktop.png)
- [Indonesian mobile — Family Care](core-review/family-care-mobile-id.png)

Local results: formatting, lint, typecheck, 51 unit checks, production build,
HTTP checks for all fourteen core pages, and 14 Chromium browser tests passed.
