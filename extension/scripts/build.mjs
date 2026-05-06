#!/usr/bin/env node
/* Cursor Thief — extension build orchestrator.
   Builds popup (multi-page), background (IIFE), and content (IIFE) into
   dist/<target>/ for either chromium or firefox.

   Why three Vite invocations: popup needs HTML + chunked ES modules,
   while background and content scripts must each be a single self-contained
   IIFE so the browser can load them without an import resolver.
*/
import { build as viteBuild } from "vite";
import react from "@vitejs/plugin-react";
import { copyFile, cp, mkdir, rm, readFile, writeFile, access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const args = new Map(
  process.argv.slice(2).map(a => {
    const [k, v = "true"] = a.replace(/^--/, "").split("=");
    return [k, v];
  })
);
const target = args.get("target") || "chromium";
const watch = args.get("watch") === "true";

if (!["chromium", "firefox"].includes(target)) {
  console.error(`unknown target: ${target}`);
  process.exit(1);
}

const OUT = resolve(ROOT, "dist", target);

async function clean() {
  await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });
}

async function buildPopup() {
  /* Use src/popup/ as the Vite root so the emitted index.html lives at
     dist/<target>/popup/index.html, matching what the manifest references. */
  await viteBuild({
    root: resolve(ROOT, "src/popup"),
    plugins: [react()],
    configFile: false,
    build: {
      outDir: resolve(OUT, "popup"),
      emptyOutDir: false,
      sourcemap: false,
      minify: true,
      target: "es2022",
      rollupOptions: {
        input: resolve(ROOT, "src/popup/index.html"),
        output: {
          entryFileNames: "[name].js",
          chunkFileNames: "chunks/[name]-[hash].js",
          assetFileNames: "assets/[name][extname]",
        },
      },
      watch: watch ? {} : null,
    },
  });
}

async function buildScript({ name, entry }) {
  await viteBuild({
    root: ROOT,
    configFile: false,
    build: {
      outDir: OUT,
      emptyOutDir: false,
      sourcemap: false,
      minify: true,
      target: "es2022",
      lib: {
        entry: resolve(ROOT, entry),
        name: name === "background" ? "CursorThiefBg" : "CursorThiefCs",
        formats: ["iife"],
        fileName: () => `${name}.js`,
      },
      rollupOptions: {
        output: {
          extend: true,
          inlineDynamicImports: true,
        },
      },
      watch: watch ? {} : null,
    },
  });
}

async function copyManifest() {
  const src = resolve(ROOT, `manifest.${target}.json`);
  const dst = resolve(OUT, "manifest.json");
  await copyFile(src, dst);
}

async function copyPublic() {
  const pub = resolve(ROOT, "public");
  if (await exists(pub)) {
    await cp(pub, OUT, { recursive: true });
  }
}

async function exists(p) {
  try { await access(p); return true; } catch { return false; }
}

async function ensureIcons() {
  // If real icons are not yet placed, generate placeholder PNGs from a tiny
  // base64 1x1 so the manifest validates and the toolbar shows *something*.
  const iconDir = resolve(OUT, "icons");
  await mkdir(iconDir, { recursive: true });
  const sizes = [16, 32, 48, 128];
  for (const s of sizes) {
    const p = resolve(iconDir, `icon-${s}.png`);
    if (!(await exists(p))) {
      const oneByOne = Buffer.from(
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=",
        "base64"
      );
      await writeFile(p, oneByOne);
    }
  }
}

async function fixPopupHtml() {
  /* Vite emits absolute /assets/foo.css etc. Extension pages need relative
     paths so they resolve correctly under chrome-extension://<id>/popup/. */
  const html = resolve(OUT, "popup/index.html");
  if (!(await exists(html))) return;
  let txt = await readFile(html, "utf8");
  txt = txt.replace(/(href|src)="\.?\/assets\//g, '$1="assets/');
  txt = txt.replace(/(href|src)="\.?\/chunks\//g, '$1="chunks/');
  txt = txt.replace(/(href|src)="\/(?!\/)([^"]+)"/g, '$1="$2"');
  await writeFile(html, txt, "utf8");
}

async function main() {
  console.log(`▶ cursor-thief — building for ${target}${watch ? " (watch)" : ""}…`);
  await clean();
  await buildPopup();
  await buildScript({ name: "background", entry: "src/background.ts" });
  await buildScript({ name: "content", entry: "src/content/index.ts" });
  await fixPopupHtml();
  await copyPublic();
  await ensureIcons();
  await copyManifest();
  console.log(`✓ built → ${OUT}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
