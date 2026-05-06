#!/usr/bin/env node
/* Build + package release zips for the Chrome Web Store, Firefox AMO,
   and Firefox's required source-zip submission.

   Outputs to extension/release/:
     cursor-thief-chromium-vX.Y.Z.zip   ← upload to Chrome Web Store
     cursor-thief-firefox-vX.Y.Z.zip    ← upload to Firefox AMO
     cursor-thief-source-vX.Y.Z.zip     ← upload to Firefox AMO as source
*/
import { execFileSync } from "node:child_process";
import { mkdir, rm, readFile, access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const RELEASE = resolve(ROOT, "release");

async function exists(p) {
  try { await access(p); return true; } catch { return false; }
}

async function main() {
  const pkg = JSON.parse(await readFile(resolve(ROOT, "package.json"), "utf8"));
  const version = pkg.version;
  console.log(`▶ packaging cursor-thief v${version}`);

  /* Make sure both dist trees exist. We do NOT rebuild here — assume the
     caller has run `npm run build` already, since CI may want to upload
     the same artefacts the build job produced. */
  const chromiumDist = resolve(ROOT, "dist/chromium");
  const firefoxDist = resolve(ROOT, "dist/firefox");
  if (!(await exists(chromiumDist)) || !(await exists(firefoxDist))) {
    console.error("✗ dist/{chromium,firefox} missing. Run `npm run build` first.");
    process.exit(1);
  }

  await rm(RELEASE, { recursive: true, force: true });
  await mkdir(RELEASE, { recursive: true });

  /* Both browser stores want a zip whose ROOT is the manifest (not a
     wrapping folder). We zip from inside the dist subdir to ensure that. */
  zip(chromiumDist, resolve(RELEASE, `cursor-thief-chromium-v${version}.zip`));
  zip(firefoxDist,  resolve(RELEASE, `cursor-thief-firefox-v${version}.zip`));

  /* Source zip for Firefox AMO. Includes everything needed to rebuild from
     a clean machine. Excludes node_modules, dist, release, test screenshots,
     and any local caches. */
  const sourceZip = resolve(RELEASE, `cursor-thief-source-v${version}.zip`);
  zipSource(sourceZip);

  console.log("✓ release artefacts ready:");
  for (const f of ["chromium", "firefox", "source"]) {
    console.log(`  release/cursor-thief-${f}-v${version}.zip`);
  }
}

/* zip the contents of `dir` into `outZip`, with the dir's children at the
   archive root (no wrapping folder). Uses macOS/Linux's `zip` CLI. */
function zip(dir, outZip) {
  execFileSync("zip", ["-rq", "-X", outZip, "."], { cwd: dir, stdio: "inherit" });
}

function zipSource(outZip) {
  const include = [
    "src/**",
    "scripts/build.mjs",
    "scripts/package.mjs",
    "scripts/icon-source/**",
    "manifest.chromium.json",
    "manifest.firefox.json",
    "package.json",
    "package-lock.json",
    "tsconfig.json",
    "vite.config.ts",
    "README.md",
    "test/index.html",
    "public/icons/icon-*.png",
  ];
  const exclude = [
    "**/node_modules/**",
    "**/dist/**",
    "**/release/**",
    "**/.vite/**",
    "**/.DS_Store",
    "test/_*.png",
    "test/hero_*.png",
  ];
  const args = ["-rq", "-X", outZip, ...include];
  for (const e of exclude) {
    args.push("-x", e);
  }
  execFileSync("zip", args, { cwd: ROOT, stdio: "inherit" });
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
