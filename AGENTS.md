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
