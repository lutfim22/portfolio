<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Repository delivery rules

Use the pnpm version pinned in package.json. Read docs/PR_WORKFLOW.md and the
implementation roadmap before starting work. Open or update a focused draft PR
when each milestone or independent task becomes reviewable; do not leave several
completed milestones bundled as local changes. Use dependent draft PRs for
stacked work. Design approval is separate from merge approval. Never merge or
deploy without the owner's explicit authorization.

## AI attribution and autonomous delivery

Before starting a task, read and analyze AGENTS.md, docs/PR_WORKFLOW.md, the
roadmap, and other applicable instructions. Apply their constraints throughout
the work; do not start implementation before this review.

Every commit created or changed with AI assistance must include this exact Git
trailer, including code, tests, documentation, CI, and commit-only corrections:

Co-authored-by: codex <codex@openai.com>

Check the final commit message before pushing. Preserve the trailer when
amending, rebasing, cherry-picking, and preparing squash commit messages. Never
leave an AI-assisted commit without attribution.

Proceed autonomously through authorized tasks and milestones: inspect, implement,
validate, commit, push, open/update focused PRs, inspect CI, and fix failures.
Continue independent work when another task is blocked; do not stop merely to
ask whether to continue. Ask the owner for action only when a missing asset,
credential, decision, or required approval prevents the dependent work. State
what is blocked, why it is needed, the exact steps the owner should take, and
what will resume afterward. Routine reversible choices do not need confirmation.
Existing explicit merge, public-content, visual, and deployment approval gates
still apply; general autonomy does not silently approve those actions.
