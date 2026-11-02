# Quality and launch preparation

Milestone 4 merged in [PR #7](https://github.com/lutfim22/portfolio/pull/7).
Photo delivery remains deferred: `pnpm cv:refresh` enables Premium when the
approved asset is added. Milestone 5 quality work does not publish the website.

## SEO configuration

No domain is assumed. The planned `itsvee98.vercel.app` address still needs
availability and ownership/configuration verification before use.

| Build configuration | Core pages | Discovery files |
| --- | --- | --- |
| No `SITE_URL`, default `SITE_INDEXABLE=false` | Noindex; no fabricated canonical or social URL | Crawling disallowed; empty sitemap |
| Verified `SITE_URL`, indexing disabled | Noindex; canonical, hreflang and social URLs use the production origin | Crawling disallowed; empty sitemap |
| Verified `SITE_URL`, `SITE_INDEXABLE=true`, production | Index/follow; reciprocal EN/ID/x-default links | 16 core URLs; review routes excluded |
| Vercel preview/development, even with indexing enabled | Noindex; canonical still points to the configured production origin | Crawling disallowed; empty sitemap |

`SITE_URL` accepts only an HTTPS origin, without credentials, path, query, or
fragment. Invalid configuration fails the build. These are build-time settings:
changing them requires a rebuild. Set the production value explicitly; do not
substitute the current preview hostname. Robots directives describe crawler
behavior; they do not provide access control.

Every core page has a localized title/description and matching Open Graph and
Twitter metadata. Locale cards at `/social/en` and `/social/id` are generated as
1200 × 630 PNGs with approved identity text and abstract branding, without a
photograph or third-party image service. The homepage includes escaped Person
JSON-LD with the approved name, role, location, and public social profiles.
Review routes keep their own noindex/nofollow metadata. The sitemap has no
invented modification dates and lists no review routes or draft PDFs.

## Reproduce the checks

Use the pinned pnpm release and Node 24. First validate the ordinary, unconfigured
build, including its noindex behavior:

```sh
pnpm install --frozen-lockfile
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm cv:check
pnpm build
pnpm test:smoke
pnpm exec playwright install --with-deps chromium firefox webkit
pnpm test:browser
```

Then audit a configured build using a reserved example origin. The example is
test data; all requests still go to local production servers on loopback:

```sh
SITE_URL=https://portfolio.example SITE_INDEXABLE=true pnpm build
SITE_URL=https://portfolio.example SITE_INDEXABLE=true pnpm test:browser seo.spec.ts --project=chromium
pnpm test:lighthouse
```

CI runs both configurations. The smoke server owns port 3100, Playwright owns
3120, and Lighthouse owns 3122; each stops its server afterward. Do not rebuild
while a production browser test or audit is running. Lighthouse stores JSON,
HTML, and a summary in ignored `quality-results/lighthouse/`, included in the
CI artifact alongside screenshots and failure traces. It requires every audited
category score to be at least 90 and fails explicitly on a noindex audit build.

In this managed cloud environment, use
`COREPACK_HOME=/tmp/portfolio-corepack corepack pnpm` and optionally
`PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium`. The CI Linux runner
installs all browser dependencies normally. Local Firefox/WebKit execution
needed writable XDG directories, extracted Debian libraries in `/tmp`, and a
local Firefox content-sandbox adjustment for the outer cloud sandbox. WebKit's
ldconfig-only preflight could not see those extracted libraries; they were
checked by actual loading and browser execution. These environment workarounds
are not committed browser settings and are not used in CI.

## Validation evidence

- 63 unit tests, including launch configuration, preview exclusion, reciprocal
  alternates, the exact sitemap route set, and safe JSON-LD serialization.
- 18 Chromium browser tests; 8 Firefox and 8 WebKit functional tests. Both
  languages, 16 core pages, internal links, mobile overflow, theme persistence,
  language context, dialog focus, filters, empty state, and CV downloads pass.
- Automated axe checks target WCAG 2/2.1/2.2 A/AA. Chromium also checks reduced
  motion, a narrow Indonesian layout, and no-JavaScript disclosures. Review
  captures cover mobile/desktop and both themes; they are review images, not an
  automated pixel-diff regression suite.
- Default noindex and configured launch metadata are checked in actual
  production HTML, including PNG signatures/dimensions and review exclusions.
- Gitleaks 8.30.1 scanned all 22 existing commits with redacted output: no leaks
  found. This automated check does not establish the absence of every possible
  sensitive fact; content remains subject to the approved source policy.

Lighthouse 13.6.0 measured the following on 2026-11-02 using a local production
build and system Chromium. Scores vary by hardware and run; CI retains its own
reports.

| Route | Performance | Accessibility | Best practices | SEO |
| --- | --- | --- | --- | --- |
| `/en` | 99 | 100 | 100 | 100 |
| `/id` | 96 | 100 | 100 | 100 |
| `/en/projects/family-care` | 99 | 100 | 100 | 100 |
| `/id/cv` | 99 | 100 | 100 | 100 |

Reports are
lab measurements with Lighthouse's default simulated mobile/Slow 4G settings
and CPU throttling; they do not establish real-user Core Web Vitals. INP and
field percentiles require a deployed site and sufficient user data. WebKit
automation is not a test of every Safari version or physical iOS device; manual
screen-reader and device checks remain part of release review.

## Dependency audit

`pnpm audit --prod` reports no known vulnerabilities. The full development tree
has an existing moderate minimatch advisory (GHSA-g3hv-75wg-m249) in lint tooling.
Its advertised fix changes major versions and the CommonJS API used by older
ESLint consumers; no blanket override is applied. These patterns come from
reviewed repository configuration, not public requests. Recheck upstream tooling
compatibility before launch. The new Lighthouse tooling's glob advisory
(GHSA-3g3m-2fjr-6pw4) is addressed with a scoped glob 14.0.2 override, retaining the
API its caller uses. Lighthouse is a development dependency and its error
reporting is explicitly disabled. No Sentry SDK is added to the application.

## Remaining launch actions

1. Review and merge the quality PR after CI and CodeQL pass.
2. Verify the production domain and authorize Vercel project/deployment setup.
   Configure `SITE_URL` for builds and retain preview noindex behavior. Enable
   `SITE_INDEXABLE=true` only for an approved production launch.
3. Choose and approve telemetry. The product plan prefers Vercel Analytics and
   Speed Insights; no runtime analytics scripts, error-reporting SDK, cookies, or
   telemetry endpoints are introduced by this PR. Configure the selected
   providers and disclosure in a focused follow-up before launch. Error
   monitoring must avoid sending CV/contact data or user input.
4. Review the deployed preview, physical-device/assistive-technology results,
   public content, CV readability, social cards, and actual domain discovery
   files. Request explicit production launch approval, then recheck production
   links/metadata, monitoring, and rollback readiness.

No service credentials or deployment authorization are needed to review this
quality PR. The deferred photo does not block its merge.
