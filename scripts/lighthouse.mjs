import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { mkdir, writeFile } from "node:fs/promises";
import { setTimeout as delay } from "node:timers/promises";
import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";
import { chromium } from "@playwright/test";

// Audit our production build on loopback; never contact the configured SITE_URL.
const port = 3122;
const origin = `http://127.0.0.1:${port}`;
const directory = "quality-results/lighthouse";
let logs = "";
const server = spawn(
  process.execPath,
  [
    "node_modules/next/dist/bin/next",
    "start",
    "--hostname",
    "127.0.0.1",
    "--port",
    String(port),
  ],
  { stdio: ["ignore", "pipe", "pipe"] },
);
server.stdout.on("data", (data) => {
  logs += data;
});
server.stderr.on("data", (data) => {
  logs += data;
});
const closed = once(server, "close");
let chrome;

try {
  for (let attempt = 0; !logs.includes("Ready in"); attempt++) {
    assert.ok(
      server.exitCode === null && attempt < 100,
      `Production server failed: ${logs}`,
    );
    await delay(200);
  }
  const html = await (await fetch(`${origin}/en`)).text();
  assert.ok(
    html.includes('name="robots" content="index, follow"'),
    "Use an explicitly configured audit build (see docs/QUALITY_AND_LAUNCH.md). A noindex build cannot pass the launch SEO audit.",
  );
  await mkdir(directory, { recursive: true });
  chrome = await launch({
    chromePath:
      process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ||
      chromium.executablePath(),
    chromeFlags: ["--headless", "--no-sandbox", "--disable-dev-shm-usage"],
  });
  const results = [];
  for (const path of ["/en", "/id", "/en/projects/family-care", "/id/cv"]) {
    const result = await lighthouse(`${origin}${path}`, {
      port: chrome.port,
      output: ["json", "html"],
      onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
      logLevel: "error",
      enableErrorReporting: false,
      // Lighthouse defaults: mobile emulation, simulated Slow 4G, 4x CPU slowdown.
    });
    assert.ok(
      result && !result.lhr.runtimeError,
      `Lighthouse failed for ${path}`,
    );
    const name = path.slice(1).replaceAll("/", "-");
    await writeFile(`${directory}/${name}.json`, result.report[0]);
    await writeFile(`${directory}/${name}.html`, result.report[1]);
    const { lhr } = result;
    const scores = Object.fromEntries(
      Object.entries(lhr.categories).map(([key, category]) => [
        key,
        Math.round(category.score * 100),
      ]),
    );
    const entry = {
      path,
      scores,
      lighthouseVersion: lhr.lighthouseVersion,
      measuredAt: lhr.fetchTime,
      metrics: Object.fromEntries(
        [
          "largest-contentful-paint",
          "cumulative-layout-shift",
          "total-blocking-time",
        ].map((key) => [key, lhr.audits[key].numericValue]),
      ),
    };
    results.push(entry);
    console.log(JSON.stringify(entry));
  }
  await writeFile(
    `${directory}/summary.json`,
    `${JSON.stringify(results, null, 2)}\n`,
  );
  for (const entry of results)
    for (const [category, score] of Object.entries(entry.scores))
      assert.ok(
        score >= 90,
        `${entry.path}: ${category} ${score} is below 90. Inspect ${directory}.`,
      );
} catch (error) {
  console.error(logs);
  throw error;
} finally {
  await chrome?.kill();
  if (server.exitCode === null) server.kill("SIGTERM");
  await closed;
}
