# Pull requests and milestone delivery

Every reviewable repository change needs a focused PR before merge. A milestone
may use more than one PR when its changes can be reviewed independently. Do not
accumulate several completed milestones as uncommitted work.

| Milestone | Required reviewable change | Gate beyond a PR |
| --- | --- | --- |
| 0 — Documentation | Planning/bootstrap PR (#1, merged) | Owner merge approval |
| 1 — Foundation | App scaffold, pnpm lockfile, bilingual routing, MDX, CI | Owner merge approval; Vercel previews require separate deployment authorization |
| 2 — Design | Tokens, fonts, responsive prototype, interaction/accessibility checks, review captures | Owner visual approval before final homepage implementation; merge approval is separate |
| 3 — Core content | Homepage promotion, About/Contact/Journey, bilingual case studies, functional tests | Owner review of public-safe content and PR merge |
| 4 — CVs | ATS and Premium CV generation/downloads, using one or multiple focused PRs | Approved factual source; owner-supplied headshot for the Premium variant |
| 5 — Quality/launch | Focused quality, SEO, accessibility, performance, telemetry/configuration PRs | Explicit owner approval before production deployment |

Environment publication through environment settings is separate from a website
deployment or a GitHub PR. A settings-only change need not manufacture a source
PR, but any associated repository configuration change belongs in a focused PR.
GitHub issues and milestones are useful optional tracking; they do not replace PRs.

## Dependent work

Use stacked draft PRs when later work depends on unmerged foundations: foundation
into main, design into foundation, then core content into design. Each description
must identify its dependency and validation. Review/merge from the bottom up;
after the base merges, retarget the next PR to main and resolve branch updates
without force-pushing or merging without owner authorization.

## Completion checklist

- Check repository instructions, existing branches/PRs, and scope before editing.
- Use the pinned pnpm release and run checks appropriate to the change.
- Review staged files for secrets, generated caches, and unsupported claims.
- Commit to the focused feature branch, push normally, and open/update its PR.
- Report the PR URL, check status, review gate, and any real access blocker.
- Keep local checks, GitHub CI results, visual approval, merge, and deployment distinct.

## Attribution and autonomous progression

Follow AGENTS.md before every task. Every AI-assisted commit must end with the
Git trailer `Co-authored-by: codex <codex@openai.com>`. Verify it before pushing
and preserve it through history edits and squash-message preparation.

Advance authorized milestones without waiting for another "next" instruction.
Complete implementation, appropriate validation, commits, focused PR delivery,
and CI follow-up autonomously. Continue work that does not depend on a missing
prerequisite. Request owner action only for a real blocker or an explicit review
gate, with the reason, exact steps, and the work that will resume. Merge and
deployment still require explicit authorization.

## Current milestone PRs

| Milestone | PR | Base | Status |
| --- | --- | --- | --- |
| 0 — Documentation | [#1](https://github.com/lutfim22/portfolio/pull/1) | main | Merged |
| 1 — Foundation | [#3](https://github.com/lutfim22/portfolio/pull/3) | main | Merged |
| 2 — Design | [#4](https://github.com/lutfim22/portfolio/pull/4) | main | Merged |
| 3 — Core content | [#5](https://github.com/lutfim22/portfolio/pull/5) | main | Merged |
| 4 — CVs | [#7](https://github.com/lutfim22/portfolio/pull/7) | main | Merged; photo deferred, asset-driven generator ready |
| 5 — Quality/launch | [#9](https://github.com/lutfim22/portfolio/pull/9) | main | Quality/SEO merged; telemetry/build preparation merged in #10; domain/deployment pending |
| 5 — Telemetry/build preparation | [#10](https://github.com/lutfim22/portfolio/pull/10) | main | Merged; optional collection and Git deployment automation remain off |

Foundation PR #3, design PR #4, core-content PR #5, and CV PR #7 are merged.
Milestone 5 quality/SEO PR #9 and telemetry/build PR #10 are merged. No website
deployment has been performed. A new Vercel project's first deployment is
Production, including an explicit preview target, and needs explicit initial
Production approval. Later Preview deployments require their own authorized
scope. See [the deployment sequence](TELEMETRY_AND_DEPLOYMENT.md#the-first-deployment-is-production).

## Security workflow follow-up

CodeQL advanced-setup PR [#8](https://github.com/lutfim22/portfolio/pull/8) is
merged. The merged CV work inherits the pinned runner and action references. Photo
delivery is deferred; the asset-driven generator is ready. This security
migration does not authorize website deployment.
