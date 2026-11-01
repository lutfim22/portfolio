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
| 1 — Foundation | [#3](https://github.com/lutfim22/portfolio/pull/3) | main | Draft; owner merge review pending |
| 2 — Design | [#4](https://github.com/lutfim22/portfolio/pull/4) | feat/application-foundation | Draft; visual direction approved, merge review pending |
| 3 — Core content | [#5](https://github.com/lutfim22/portfolio/pull/5) | feat/design-prototype | Draft; content and merge review pending |
| 4 — CVs | Not started | Depends on reviewed core content | Create focused PR(s) when ready |
| 5 — Quality/launch | Not started | Depends on reviewed core content/CVs | Create quality/configuration PR(s); deployment needs separate approval |

Review the stack in order #3 → #4 → #5. The code and delivery rules are committed;
no PR has been merged and no website deployment has been performed in this task.
