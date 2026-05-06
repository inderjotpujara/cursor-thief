# Cursor Thief — extension source

This is the actual shipped extension. The high-level user-facing README lives at the repo root; this one is for developers working on the code.

## Quick orientation

```
src/
  background.ts          MV3 service worker / event page — settings + stats broker
  content/
    index.ts             content-script entry — listens for mouseup
    selection.ts         filters out editable / iframe selections
    overlay.ts           Shadow DOM root + style isolation
    heist.ts             Web Animations API state machine
    creatures/
      h.ts               tiny createElementNS helper
      index.ts           registry + renderCreature(id, opts)
      rascal.ts          multi-pose Rascal (idle/run/carry/drop)
      pip.ts sly.ts gloop.ts snatch.ts fingers.ts
  popup/
    index.html           popup viewport, fonts
    main.tsx             React root
    App.tsx              toggles, status pill, stats, footer
    Picker.tsx           character grid
    CreatureSVG.tsx      React → renderCreature DOM adapter
    styles.css           popup-global CSS
  shared/
    types.ts             CharacterId, Settings, Stats, Message union
    storage.ts           typed wrapper over browser.storage
    messages.ts          typed cross-context send/onMessage
    constants.ts         animation timings, palette, z-top
manifest.chromium.json   Chromium MV3 manifest (service_worker)
manifest.firefox.json    Firefox MV3 manifest (background.scripts + gecko id)
scripts/build.mjs        cross-browser build orchestrator
test/index.html          browser-only test harness (file:// works)
```

## Scripts

```bash
npm install
npm run build              # both targets
npm run build:chromium
npm run build:firefox
npm run dev                # watch mode, chromium
npm run typecheck          # tsc --noEmit
npm run clean              # rm -rf dist
```

## How the build works

`scripts/build.mjs` runs **three** Vite invocations per target:

1. **Popup** — `root: src/popup/`, multi-page mode, ES modules with Vite's normal HTML entry. Output: `dist/<target>/popup/{index.html, index.js, assets/index.css}`.
2. **Background** — Vite library mode, IIFE format, single file. Output: `dist/<target>/background.js`.
3. **Content** — Vite library mode, IIFE format, single file. Output: `dist/<target>/content.js`.

Then it post-processes:

- Rewrites the popup HTML to use relative URLs (Vite emits absolute `/assets/…` which fails under `chrome-extension://`).
- Copies the right manifest variant (`manifest.<target>.json` → `dist/<target>/manifest.json`).
- Copies `public/` if present.
- Drops 1×1 placeholder PNGs into `dist/<target>/icons/` if no real icons are at `public/icons/`.

## Why three Vite invocations and not one

MV3 service workers must be a single self-contained file (no dynamic imports outside top-level), and content scripts run as classic scripts in Firefox. IIFE format gives both. The popup, by contrast, benefits from chunking, hashed asset names, and CSS extraction — a fundamentally different output mode. Trying to do both with one Vite config means giving up either chunking (popup gets bloated) or single-file output (the worker fails to register). Three small builds keep each output clean.

## Cross-browser specifics

| | Chromium | Firefox |
|---|---|---|
| Background entry | `service_worker: "background.js"` (MV3 worker) | `scripts: ["background.js"]` (MV3 event page) |
| Module type | `"type": "module"` allowed | classic script |
| `browser.*` API | provided by `webextension-polyfill` over `chrome.*` | native |
| Install ID | not required | `browser_specific_settings.gecko.id` required |

The two manifests differ only in those fields.

## Message protocol

```ts
type Message =
  | { type: "GET_STATE" }
  | { type: "STATE"; settings: Settings; stats: Stats; site: string }
  | { type: "SET_ENABLED"; value: boolean }
  | { type: "SET_SITE_ENABLED"; hostname: string; value: boolean }
  | { type: "SET_CHARACTER"; value: CharacterId }
  | { type: "SET_LINGER"; value: number }
  | { type: "HEIST_COMPLETED"; durationMs: number }
  | { type: "SETTINGS_CHANGED"; settings: Settings };
```

Background broadcasts `SETTINGS_CHANGED` to all tabs after every settings write so content scripts live-update without a page reload.

## Heist state machine (heist.ts)

```
IDLE
 ─mouseup→ ARRIVE 700ms (scamper + skid)
        → STEAL  300ms (POACHED! burst + word particles + cover sweep)
        → LINGER Settings.lingerMs (default 1800ms; configurable)
        → EXIT   600ms
        → WAIT   1500ms
        → RETURN 600ms
        → RESTORE 400ms (cover retracts, sparkles, "thx!" note)
        → IDLE
```

Concurrent mouseups during in-flight heists are dropped via the `inFlight` boolean in `heist.ts`.

### Visual layers in the Shadow DOM overlay

| Element | Class | Job |
|---|---|---|
| Creature wrapper | `.actor` (+ pose state class) | JS-driven translate; CSS-driven limb animation |
| Speech bubble | `.bubble` | Holds the stolen, truncated text |
| Selection highlight | `.ghost` | Soft blue, fades under the cover |
| Paper-coloured cover | `.cover` | **Visually scrapes the text off** via animated `clip-path` |
| Scrape slashes | `.scrape-mark` | 4 diagonal punctuation strokes |
| Comic burst | `.burst` | "POACHED!"/"YOINK!"/etc. — randomised |
| Word particles | `.particle` | Fragments of the actual selected words flying into the bubble |
| Dust puffs | `.puff` | Entry / exit footstep dust |
| Sparkles | `.sparkle` | At restore time |
| Apology note | `.note` | "thx! ♥"/"no harm done!"/etc. |

The host page's DOM is **never** mutated. The `.cover` reads the page background (sampled by `setPaperColor` walking up from `document.body`) so the scrape blends with the host paper rather than always being white.

### Per-character body-part classes

Each creature SVG tags its body parts so the heist orchestrator can animate them through CSS state classes:

- `ct-tail`, `ct-leg-l`, `ct-leg-r`, `ct-arm`, `ct-head`, `ct-sack`

When the actor wrapper carries `.scamper`, the SVG inside bobs and tilts and the legs/tail animate via keyframes in `overlay.ts`. `.grab` plays the arm yank. `.idle` does a gentle look-around. `.skid` plays a one-shot squash on landing.

## Local test harness

`test/index.html` ships a callback-style stub for `chrome.*` so the content-script bundle (which uses `webextension-polyfill`) loads cleanly outside an extension context. Open it in any browser after `npm run build:chromium` and the heist runs.

## Adding a character

1. Copy `src/content/creatures/rascal.ts` to a new file. Build your SVG via the `h()` helper.
2. Register the export in `src/content/creatures/index.ts`.
3. Add the new id to `CharacterId`, `CHARACTER_IDS`, and `CHARACTERS` in `src/shared/types.ts`.
4. The popup picker auto-discovers from `CHARACTER_IDS`.

## Tuning timings

`src/shared/constants.ts` → `TIMINGS` controls the deterministic phases (ARRIVE / STEAL / EXIT / WAIT / RETURN / RESTORE).

The post-steal **linger** is a *runtime* setting, not a constant — users pick a duration in the popup. Defaults and presets live in `src/shared/types.ts`:

```ts
DEFAULT_SETTINGS.lingerMs = 1800;
LINGER_PRESETS = [
  { label: "no pause",      value: 0 },
  { label: "quick (1s)",    value: 1000 },
  { label: "comfy (1.8s)",  value: 1800 },
  { label: "patient (3s)",  value: 3000 },
  { label: "leisurely (5s)",value: 5000 },
];
```

Add or remove presets in that array — the popup picker auto-rebuilds from it.
