# Luthfi Musthafa — Engineering Portfolio

Milestone 1 foundation: Next.js App Router, React, TypeScript, Tailwind CSS v4,
localized English/Indonesian routes, and repository-authored MDX.

## Development

Use Node.js 24 and pnpm 12.16.1, pinned in `packageManager`.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

In a cloud task use the existing isolated checkout; no extra Git worktree is
needed. If the environment supplies an older pnpm fallback, use
`COREPACK_HOME=/tmp/portfolio-corepack corepack pnpm <command>` to invoke the pin.
No secrets, database, or environment variables are required. `.env.example`
documents the environment boundary. Dependencies use a local ignored pnpm store.

`/` redirects to `/en`. `/en`, `/id`, `/en/about`, and `/id/about` provide a minimal
accessible foundation. Language links retain the current page, and unknown
locales/pages return 404. Styling is a skeleton pending the design milestone.
MDX is executable content: compile reviewed repository files only.

## Validation

```sh
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:smoke
```

The smoke test starts and stops its own production server on port 3100 and
checks redirects, locale markup, page-preserving language links, local MDX,
landmarks, and 404s. The same commands are configured in GitHub Actions.

## Delivery

Follow [the PR workflow](docs/PR_WORKFLOW.md). Create focused milestone PRs as
work becomes reviewable; design approval does not authorize a PR merge.
Use separate approval for preview/production deployment. Vercel is not configured.
