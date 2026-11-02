import { test, expect, type Page } from "@playwright/test";

const origin = "https://portfolio.example";
const enabled =
  process.env.VERCEL_ENV === "production" &&
  process.env.SITE_INDEXABLE === "true" &&
  process.env.SITE_ANALYTICS === "true" &&
  process.env.SITE_SPEED_INSIGHTS === "true";

// Provider scripts and ingestion are local fixtures. No event is sent to Vercel.
async function canonicalSite(page: Page, baseURL: string) {
  const scripts: string[] = [];
  const events: Array<{
    url: string;
    body: { type: string; url: string; route?: string };
  }> = [];
  await page.route("**/*", async (route) => {
    const url = new URL(route.request().url());
    if (url.origin !== origin) return route.abort();
    if (url.pathname.startsWith("/_vercel/")) {
      if (url.pathname.endsWith("script.js")) {
        scripts.push(url.pathname);
        const analytics = url.pathname.includes("/insights/");
        const script = analytics
          ? `
          const queue = window.vaq || [];
          window.va = (type, data) => {
            if (type === 'beforeSend') window.testBeforeAnalytics = data;
            if (type === 'pageview') {
              const event = window.testBeforeAnalytics({type: 'pageview', url: location.href});
              if (event) fetch('/_vercel/insights/view', {method: 'POST', body: JSON.stringify(event)});
            }
          };
          for (const entry of queue) window.va(...entry);
        `
          : `
          const queue = window.siq || [];
          window.si = (type, data) => { if (type === 'beforeSend') window.testBeforeSpeed = data; };
          for (const entry of queue) window.si(...entry);
          const event = window.testBeforeSpeed({type: 'vital', url: location.href, route: '/private@example.test'});
          if (event) fetch('/_vercel/speed-insights/vitals', {method: 'POST', body: JSON.stringify(event)});
        `;
        return route.fulfill({
          contentType: "application/javascript",
          body: `(() => {${script}})();`,
        });
      }
      events.push({ url: url.pathname, body: route.request().postDataJSON() });
      return route.fulfill({ status: 204 });
    }
    const response = await route.fetch({
      url: `${baseURL}${url.pathname}${url.search}`,
    });
    await route.fulfill({ response });
  });
  return { scripts, events };
}

test("default and noncanonical hosts load no telemetry; privacy disclosure is localized", async ({
  page,
}) => {
  const requests: string[] = [];
  page.on("request", (request) => {
    if (
      request.url().includes("/_vercel/") ||
      request.url().includes("vercel-scripts.com")
    )
      requests.push(request.url());
  });
  await page.goto("/en");
  await page.getByRole("link", { name: "Privacy", exact: true }).click();
  await expect(page).toHaveURL(/\/en\/contact#privacy$/);
  await expect(page.locator("#privacy-title")).toHaveText("Privacy");
  await page
    .getByRole("link", { name: "Bahasa Indonesia", exact: true })
    .click();
  await expect(page.locator("#privacy-title")).toHaveText("Privasi");
  await page.waitForLoadState("networkidle");
  await expect(page.locator('script[src*="/_vercel/"]')).toHaveCount(0);
  expect(requests).toEqual([]);
});

test("approved production flags register real SDKs and sanitize provider callbacks", async ({
  page,
  baseURL,
}) => {
  test.skip(!enabled, "Runs against the explicitly enabled fixture build.");
  const fixture = await canonicalSite(page, baseURL!);
  await page.goto(`${origin}/en?email=private@example.test#private`);
  await expect.poll(() => fixture.scripts.length).toBe(2);
  await expect.poll(() => fixture.events.length).toBeGreaterThanOrEqual(2);
  for (const event of fixture.events) {
    expect(event.body.url).toBe(`${origin}/en`);
    expect(JSON.stringify(event.body)).not.toContain("private");
  }
  const decisions = await page.evaluate(() => {
    const callbacks = window as unknown as Window & {
      testBeforeAnalytics: (event: { type: string; url: string }) => unknown;
      testBeforeSpeed: (event: { type: string; url: string }) => unknown;
    };
    return [
      callbacks.testBeforeAnalytics({ type: "event", url: location.href }),
      callbacks.testBeforeAnalytics({
        type: "pageview",
        url: `${location.origin}/en/design?secret=hidden`,
      }),
      callbacks.testBeforeSpeed({
        type: "vital",
        url: `${location.origin}/cv/luthfi-musthafa-ats.pdf`,
      }),
    ];
  });
  expect(decisions).toEqual([null, null, null]);
  await page
    .getByRole("link", { name: "Bahasa Indonesia", exact: true })
    .click();
  await expect(page).toHaveURL(`${origin}/id`);
  await expect
    .poll(() =>
      fixture.events.some((event) => event.body.url === `${origin}/id`),
    )
    .toBe(true);
});

for (const signal of ["dnt", "gpc"] as const)
  test(`${signal} prevents SDK loading on the approved production host`, async ({
    page,
    baseURL,
  }) => {
    test.skip(!enabled, "Runs against the explicitly enabled fixture build.");
    await page.emulateMedia({ colorScheme: "dark" });
    await page.addInitScript((signal) => {
      Object.defineProperty(
        navigator,
        signal === "dnt" ? "doNotTrack" : "globalPrivacyControl",
        { get: () => (signal === "dnt" ? "1" : true) },
      );
    }, signal);
    const fixture = await canonicalSite(page, baseURL!);
    await page.goto(`${origin}/en`);
    await page.getByRole("button", { name: "Switch to light theme" }).click();
    await page.waitForLoadState("networkidle");
    expect(fixture.scripts).toEqual([]);
    expect(fixture.events).toEqual([]);
  });
