import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { setTimeout as delay } from "node:timers/promises";

// Start our own production server; never validate an unrelated process.
const port = 3100;
const origin = `http://127.0.0.1:${port}`;
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

try {
  let ready = false;
  for (let attempt = 0; attempt < 100; attempt++) {
    if (server.exitCode !== null) throw new Error(`Server exited: ${logs}`);
    if (logs.includes("Ready in")) {
      ready = true;
      break;
    }
    await delay(200);
  }
  assert.ok(ready, `Server did not become ready: ${logs}`);
  const root = await fetch(origin, { redirect: "manual" });
  assert.equal(root.status, 307);
  assert.equal(root.headers.get("location"), "/en");
  console.log("PASS / redirects to /en");

  for (const locale of ["en", "id"]) {
    for (const page of [
      "",
      "/about",
      "/journey",
      "/contact",
      "/cv",
      "/projects/family-care",
      "/projects/virtual-home",
      "/projects/air-care",
    ]) {
      const path = `/${locale}${page}`;
      const response = await fetch(`${origin}${path}`);
      assert.equal(response.status, 200, path);
      const html = await response.text();
      assert.ok(
        html.includes(`<html lang="${locale}"`),
        `${path}: document language`,
      );
      assert.ok(html.includes('id="main"'), `${path}: main landmark`);
      assert.ok(html.includes('href="#main"'), `${path}: skip link`);
      const alternate = locale === "en" ? "id" : "en";
      assert.ok(
        html.includes(`href="/${alternate}${page}"`),
        `${path}: language switch preserves page`,
      );
      assert.equal(
        (html.match(/<h1(?:\s|>)/g) ?? []).length,
        1,
        `${path}: one page heading`,
      );
      assert.ok(
        html.includes('class="design-surface"'),
        `${path}: approved design applied`,
      );
      assert.ok(
        !html.includes('class="review-banner"'),
        `${path}: review banner does not leak`,
      );
      if (page === "/about")
        assert.ok(
          html.includes(
            locale === "en"
              ? "Engineering experience"
              : "Pengalaman engineering",
          ),
          `${path}: MDX rendered`,
        );
      if (page.startsWith("/projects/")) {
        for (const heading of locale === "en"
          ? ["Problem", "Approach", "Impact"]
          : ["Tantangan", "Pendekatan", "Dampak"]) {
          assert.ok(
            html.includes(`<h2>${heading}</h2>`),
            `${path}: ${heading} MDX rendered`,
          );
        }
      }
      assert.ok(
        !html.includes("NEXT_PUBLIC_"),
        `${path}: no config instructions rendered`,
      );
      console.log(
        `PASS ${path}: localized HTML, content, navigation, landmarks`,
      );
    }
  }
  for (const path of [
    "/fr",
    "/fr/about",
    "/en/missing",
    "/id/missing",
    "/en/projects/missing",
    "/id/projects/__proto__",
  ]) {
    const response = await fetch(`${origin}${path}`);
    assert.equal(response.status, 404, path);
    console.log(`PASS ${path}: 404`);
  }
} catch (error) {
  console.error(logs);
  throw error;
} finally {
  if (server.exitCode === null) server.kill("SIGTERM");
  await closed;
}
