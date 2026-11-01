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
    for (const suffix of ["", "/about"]) {
      const response = await fetch(`${origin}/${locale}${suffix}`);
      assert.equal(response.status, 200);
      const html = await response.text();
      const other = locale === "en" ? "id" : "en";
      for (const marker of [
        `<html lang="${locale}"`,
        'id="main"',
        'href="#main"',
        `href="/${other}${suffix}"`,
      ])
        assert.ok(html.includes(marker), marker);
      if (suffix)
        assert.ok(
          html.includes(
            locale === "en"
              ? "Engineering experience"
              : "Pengalaman engineering",
          ),
        );
      console.log(`PASS /${locale}${suffix}: localized page and navigation`);
    }
  }
  for (const path of ["/fr", "/fr/about", "/en/missing", "/id/missing"]) {
    assert.equal((await fetch(`${origin}${path}`)).status, 404);
    console.log(`PASS ${path}: 404`);
  }
} catch (error) {
  console.error(logs);
  throw error;
} finally {
  if (server.exitCode === null) server.kill("SIGTERM");
  await closed;
}
