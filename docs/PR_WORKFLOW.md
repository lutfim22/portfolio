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
