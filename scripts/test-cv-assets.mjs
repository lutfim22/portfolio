import assert from "node:assert/strict";
import {
  mkdtemp,
  mkdir,
  writeFile,
  readFile,
  rm,
  access,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { chromium } from "@playwright/test";
import { cvPaths } from "./cv-assets.mjs";

// Neutral test pixels stay in a temporary directory, never in product assets.
const root = await mkdtemp(join(tmpdir(), "portfolio-cv-assets-"));
const assets = join(root, "assets");
const output = join(root, "output");
const paths = cvPaths(output);
await mkdir(assets);
const args = [`--asset-dir=${assets}`, `--output-root=${output}`];
function run(script, extra = [], failure) {
  const result = spawnSync(
    process.execPath,
    [`scripts/${script}`, ...args, ...extra],
    { encoding: "utf8" },
  );
  if (failure) {
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, failure);
  } else assert.equal(result.status, 0, result.stdout + result.stderr);
}
const exists = async (path) => {
  try {
    await access(path);
    return true;
  } catch (error) {
    if (error.code === "ENOENT") return false;
    throw error;
  }
};
const status = async () => JSON.parse(await readFile(paths.status, "utf8"));
let browser;
try {
  run("generate-cv.mjs", ["--final-premium"], /approved headshot/);
  run("generate-cv.mjs");
  run("check-cv.mjs");
  assert.equal((await status()).premiumAvailable, false);
  assert.equal(await exists(paths.premium), false);
  browser = await chromium.launch({
    executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
  });
  const page = await browser.newPage();
  await page.setContent('<canvas width="200" height="240"></canvas>');
  const images = await page.evaluate(() => {
    const canvas = document.querySelector("canvas");
    const c = canvas.getContext("2d");
    c.fillStyle = "#dddddd";
    c.fillRect(0, 0, 200, 240);
    c.fillStyle = "#333333";
    c.font = "18px sans-serif";
    c.fillText("TEST ONLY", 40, 120);
    return {
      png: canvas.toDataURL("image/png").split(",")[1],
      jpeg: canvas.toDataURL("image/jpeg").split(",")[1],
    };
  });
  await browser.close();
  browser = undefined;
  await writeFile(
    join(assets, "headshot.png"),
    Buffer.from(images.png, "base64"),
  );
  run("generate-cv.mjs");
  run("check-cv.mjs");
  assert.equal((await status()).premiumAvailable, true);
  assert.equal(await exists(paths.draft), false);
  const pngHash = (await status()).headshotSha256;
  await rm(join(assets, "headshot.png"));
  await writeFile(
    join(assets, "headshot.jpg"),
    Buffer.from(images.jpeg, "base64"),
  );
  run("check-cv.mjs", [], /Headshot changed/);
  run("generate-cv.mjs");
  run("check-cv.mjs");
  assert.notEqual((await status()).headshotSha256, pngHash);
  const published = await readFile(paths.premium);
  await writeFile(
    join(assets, "headshot.png"),
    Buffer.from(images.png, "base64"),
  );
  run("generate-cv.mjs", [], /exactly one/);
  assert.deepEqual(await readFile(paths.premium), published);
  await rm(join(assets, "headshot.png"));
  await writeFile(join(assets, "headshot.jpg"), "not an image");
  run("generate-cv.mjs", [], /valid PNG or JPEG/);
  assert.deepEqual(await readFile(paths.premium), published);
  await writeFile(
    join(assets, "headshot.jpg"),
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10, 0, 0]),
  );
  run("generate-cv.mjs", [], /cannot be decoded|EncodingError/);
  assert.deepEqual(await readFile(paths.premium), published);
  await rm(join(assets, "headshot.jpg"));
  run("generate-cv.mjs");
  run("check-cv.mjs");
  assert.equal((await status()).premiumAvailable, false);
  assert.equal(await exists(paths.premium), false);
  assert.equal(await exists(paths.draft), true);
  console.log(
    "PASS CV asset lifecycle: no photo, PNG, JPEG, stale asset, duplicates, invalid image, decode failure, removal, and protected final output.",
  );
} finally {
  await browser?.close();
  await rm(root, { recursive: true, force: true });
}
