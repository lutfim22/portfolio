# Telemetry and deployment preparation

Quality/SEO [PR #9](https://github.com/lutfim22/portfolio/pull/9) and telemetry/build
preparation [PR #10](https://github.com/lutfim22/portfolio/pull/10) are merged.
No Vercel project creation, domain reservation, provider activation, or website
deployment has been performed by this work.

## Runtime behavior

All three switches default to `false`. Browser integration uses the pinned
`@vercel/analytics` and `@vercel/speed-insights` Next.js SDKs. The packages are
lazy-loaded only when the configured production origin matches the browser
origin and the visitor has neither Do Not Track nor Global Privacy Control
enabled. Review routes never mount the integration.

| Switch | Purpose | Additional requirements |
| --- | --- | --- |
| `SITE_ANALYTICS=true` | Vercel Web Analytics page visits | `VERCEL_ENV=production`, verified `SITE_URL`, `SITE_INDEXABLE=true` |
| `SITE_SPEED_INSIGHTS=true` | Vercel Speed Insights performance measurements | Same production/launch requirements |
| `SERVER_ERROR_LOGGING=true` | Limited first-party server error records | Same production/launch requirements; Vercel Runtime Logs access |

Local, preview, development, unconfigured, and pre-launch builds keep optional
collection off. The switches are independent. Browser flags and the disclosure
are evaluated at build time; rebuild after changing them. Server error logging
checks the runtime configuration. No DSN, API key, or public secret is required.

Only pageview and vital callbacks for the 16 known public pages are accepted.
The `beforeSend` policy drops queries, fragments, unknown paths, cross-origin
URLs, custom events, and extra callback properties. Vital route data is replaced
with the same allowlisted public path. An ATS/Premium download is not tracked
as a custom event. DNT/GPC is checked again in each callback before acceptance.

These filters cover the SDK's documented callback fields. They do not make
requests anonymous or replace the provider's data-processing policy: hosting
and provider services may process network/device/referrer information. Review
the current [Analytics privacy policy](https://vercel.com/docs/analytics/privacy-policy),
[Speed Insights documentation](https://vercel.com/docs/speed-insights), and
[Vercel privacy policy](https://vercel.com/legal/privacy-policy) before activation.
The EN/ID Contact pages disclose the active features and browser preferences at
`/en/contact#privacy` and `/id/contact#privacy`; core footers link there.

## Server error monitoring

Next.js `onRequestError` emits a single JSON record when explicitly enabled:

```json
{"event":"portfolio.server_error","type":"render","digest":"12345678"}
```

The record contains only an allowlisted error category and a numeric framework
digest (or `unavailable`). It excludes the request path, headers, cookies, body,
error message, and stack. Unknown categories become `other`; reporting failures
do not interrupt the normal error response. Filter Vercel Runtime Logs for
`portfolio.server_error` to find these events. Retention and access controls are
provider/project settings that still need review with account access.

This hook handles server errors. Browser exception collection, external error
reporting, alert delivery, and real-user Core Web Vitals dashboards are not
established by a local build. Next.js/Vercel may also produce their own logs;
this hook does not sanitize or disable platform/framework logging.

## Vercel project settings

`vercel.json` pins the framework and uses Corepack to honor `packageManager`
instead of a build image's fallback pnpm. Git-triggered deployments are disabled
with `git.deploymentEnabled=false` until deployment automation is approved. This
does not block a manual import, CLI deployment, or dashboard deployment; those
still require the owner's explicit authorization.

### The first deployment is Production

Vercel's [environment documentation](https://vercel.com/docs/deployments/environments#first-deployment)
states that a new project's first deployment is always **Production**. This
includes dashboard imports, CLI calls without `--prod`, an explicit
`--target=preview`, and non-production branches. It uses **Production** environment
variables; Preview-only variables do not apply to that first build.

Inspect project deployment history before requesting approval. A retained failed,
errored, or canceled deployment counts as the first deployment, but deleting all
deployments makes the next one a first deployment again. Do not manufacture a
failed deployment to work around the approval gate. An owner request for
Preview alone does not authorize a new project's first Production deployment.

For a genuinely new project, obtain explicit approval for the initial Production
deployment with indexing and optional telemetry disabled. A successful initial
deployment may serve the website on a public Vercel URL. Noindex controls search
discovery; it does not restrict access. Inspect the account's available deployment
protection and its actual scope before promising private access.

### Setup and deployment sequence

When Vercel account access is available:

1. Inspect existing projects and their linked repository before creating or
   changing anything. Use `lutfim22/portfolio`, root directory `.`, Next.js,
   Node.js 24.x, and the approved main commit. Do not overwrite an existing site.
2. Create/link the project without deploying, using supported project-management
   tools or `corepack pnpm dlx vercel@latest link` after owner-side CLI login.
   A dashboard import's **Deploy** action can create the first Production
   deployment; leave it until the applicable deployment approval is granted.
3. Enable Corepack for the build with `ENABLE_EXPERIMENTAL_COREPACK=1` if required
   by Vercel's current build environment. Install command:
   `corepack pnpm install --frozen-lockfile`; build: `corepack pnpm build`.
   Confirm logs show the pinned pnpm 12.16.1 and Node 24.
4. Verify the planned `itsvee98.vercel.app` domain in the account or use the
   owner's confirmed alternative. A DNS/HTTP response alone does not establish
   ownership or availability. A read-only probe on 2026-11-02 returned HTTP 404 with
   `DEPLOYMENT_NOT_FOUND`; it does not prove the domain can be claimed. Set
   `SITE_URL` to the verified HTTPS origin. If it is not yet verified, leave
   `SITE_URL` unset for initial review; the app omits absolute discovery URLs.
5. Keep `SITE_INDEXABLE=false`, `SITE_ANALYTICS=false`,
   `SITE_SPEED_INSIGHTS=false`, and `SERVER_ERROR_LOGGING=false` in both
   **Production and Preview** for initial review. Set Corepack for both as well.
   Vercel supplies `VERCEL_ENV`; do not override it to change an environment's
   behavior. Review deployment protection and deployment history.
6. If the project has no deployments, obtain the owner's explicit initial
   Production approval before triggering its first deployment. Keep the review
   settings from step 5. If a retained deployment already exists, explicit
   Preview approval permits `corepack pnpm dlx vercel@latest deploy --target=preview`.
   Confirm the actual environment and assigned URLs in Vercel after deployment.
7. Check EN/ID routes,
   language/theme state, Contact privacy links, ATS download, social PNGs,
   configured canonical origin (or its deliberate absence), noindex metadata,
   disallowed robots, and empty sitemap.
   Finish physical-device and assistive-technology review there.
8. Before enabling indexing or optional telemetry for launch, review the public content/disclosure and
   selected telemetry. Enable Web Analytics and Speed Insights in that project
   if desired; configure production flags separately. Review runtime-log access
   and monitoring. Obtain explicit production deployment approval for the
   reviewed commit and verified domain before deploying with indexing enabled.
9. Check production links/metadata/discovery files, dashboard ingestion and
   DNT/GPC behavior, and the approved rollback deployment. Git automation stays
   off until separately approved and changed in a focused PR.

No Vercel tool, CLI credential, or linked project was available in the cloud
session when preparing this change. An already-installed plugin may still have
no callable tools exposed in the active turn; check tool availability rather
than assuming the plugin must be installed again. Account setup and actual domain checks
remain dependent on that access; no credential should be pasted into the repo
or chat. Connect Vercel to the session using the supported app/credential flow.

## Reproduce validation

Run the ordinary checks and browser suite against the default build first.
Then use a reserved example origin to exercise enabled integration:

```sh
SITE_URL=https://portfolio.example SITE_INDEXABLE=true VERCEL_ENV=production SITE_ANALYTICS=true SITE_SPEED_INSIGHTS=true pnpm build
SITE_URL=https://portfolio.example SITE_INDEXABLE=true VERCEL_ENV=production SITE_ANALYTICS=true SITE_SPEED_INSIGHTS=true pnpm test:browser seo.spec.ts telemetry.spec.ts --project=chromium
pnpm test:lighthouse
```

The browser test proxies the reserved origin to its own loopback production
server and supplies local provider-script/ingestion fixtures. It verifies the
real SDK registration, sanitized callback data, locale navigation, and zero
script requests for DNT/GPC; it sends nothing to Vercel. Other hosts, including
the loopback Lighthouse server, load no provider scripts. These fixtures do not
verify Vercel dashboard ingestion or the external provider script internals.

Unit tests cover independent activation, preview/off defaults, invalid flags,
URL/event filtering, browser preferences, and exclusion of sensitive error data.
CI repeats both default and enabled configurations. The owner can review all
repository changes before any deployment or telemetry activation.
