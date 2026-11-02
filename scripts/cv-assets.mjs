import { readdir, readFile, mkdir, writeFile, rename } from "node:fs/promises";
import { resolve, dirname, join } from "node:path";
import { createHash } from "node:crypto";

export function option(name) {
  return process.argv
    .find((arg) => arg.startsWith(`--${name}=`))
    ?.slice(name.length + 3);
}
export function cvPaths(root = ".") {
  return {
    ats: resolve(root, "public/cv/luthfi-musthafa-ats.pdf"),
    premium: resolve(root, "public/cv/luthfi-musthafa-premium.pdf"),
    draft: resolve(root, "docs/cv-review/luthfi-musthafa-premium-draft.pdf"),
    status: resolve(root, "src/content/cv-status.json"),
    review: resolve(root, "docs/cv-review"),
  };
}
export async function loadHeadshot(directory = "assets/cv", override) {
  let path = override;
  if (!path) {
    let names;
    try {
      names = await readdir(directory);
    } catch (error) {
      if (error.code === "ENOENT") return null;
      throw error;
    }
    const matches = names.filter((name) =>
      /^headshot\.(png|jpe?g)$/i.test(name),
    );
    if (matches.length > 1)
      throw new Error(
        "Keep exactly one headshot.png, headshot.jpg, or headshot.jpeg in assets/cv.",
      );
    if (!matches.length) return null;
    path = join(directory, matches[0]);
  }
  const bytes = await readFile(path);
  const png = bytes
    .subarray(0, 8)
    .equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  const jpeg = bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255;
  if (!png && !jpeg) throw new Error("Headshot must be a valid PNG or JPEG.");
  return {
    dataUrl: `data:image/${png ? "png" : "jpeg"};base64,${bytes.toString("base64")}`,
    sha256: createHash("sha256").update(bytes).digest("hex"),
  };
}
export async function atomicWrite(path, data) {
  await mkdir(dirname(path), { recursive: true });
  const temporary = path + ".tmp";
  await writeFile(temporary, data);
  await rename(temporary, path);
}
