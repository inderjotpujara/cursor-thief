# Cursor Thief — Implementation Design

**Date:** 2026-05-06
**Spec source:** `cursor-thief.md`
**Visual source:** `designs/*.jsx` (Babel-standalone prototypes)

## Decisions (locked)

| Question | Decision |
|---|---|
| Target browsers | All — Chromium (Chrome/Edge/Brave/Arc/Opera) + Firefox |
| Build tooling | Vite + TypeScript |
| React usage | Popup only. Content script is plain DOM/SVG |
| Project location | `extension/` subfolder; `designs/` left untouched as reference |
| Animation engine | Web Animations API |
| Scope | Full — 6-character roster, picker, real stats counter |
| Storage | `browser.storage.sync` for settings, `browser.storage.local` for stats |

## Architecture

```
extension/src/
  background.ts       service worker — settings/stats broker
  content/
    index.ts          entry — selection listener
    selection.ts      detect non-editable, non-iframe selections
    heist.ts          orchestrate the 4-phase animation
    overlay.ts        Shadow DOM root + style isolation
    creatures/
      index.ts        registry
      rascal.ts       SVG modules — one per character
      pip.ts ...
  popup/
    index.html
    main.tsx
    App.tsx           toggles, status, stats
    Picker.tsx        character grid
    fonts.css
  shared/
    types.ts          CharacterId, Settings, Stats, MessageEnvelope
    storage.ts        typed wrapper over browser.storage
    messages.ts       typed cross-context message bus
    constants.ts      animation timings, palette
```

## Heist state machine

```
IDLE
  ↓ mouseup with non-collapsed, non-editable selection inside top frame
ARRIVE       — creature scampers from off-screen edge to selection,
              overshoots, skids into a stance BESIDE the prose
  ↓ ~700ms ARRIVE + ~160ms skid
STEAL        — comic burst (POACHED!/YOINK!/…), scrape marks slash the
              prose, ~6 word particles peel off the selection and arc
              into the speech bubble, paper-coloured cover sweeps over
              the text via animated clip-path so it appears erased
  ↓ ~300ms
LINGER       — creature stays planted in `idle` pose with the bubble
              visible so the user can actually read the loot
  ↓ Settings.lingerMs (0..5000+, default 1800)
EXIT         — creature + bubble flee back the way they came
  ↓ ~600ms
WAIT         — empty stage, faded ghost + scraped cover still in place
  ↓ ~1500ms
RETURN       — different creature instance scampers in from the OTHER
              side, drops the text
  ↓ ~600ms + brief idle beat
RESTORE      — scrape cover retracts (text re-emerges), ghost fades to 0,
              sparkles bloom, randomised "thx! ♥" sticky note, exit
  ↓ ~400ms
IDLE
```

Total minimum: ~3.6s. With the default 1.8s linger: ~5.4s. With max 5s linger: ~8.6s. The original spec budget (5–6 s end-to-end) covered only the no-linger case; the linger explicitly extends the visible-loot window in response to user feedback.

The selection's host-page DOM is **never mutated**. Visual changes (highlight fade, paper-coloured cover, scrape marks, particles) are rendered in a Shadow DOM overlay layered over the prose. Cmd/Ctrl+C continues to work against the original selection through every phase.

## Settings (sync)

```ts
type Settings = {
  enabled: boolean;              // default true
  selectedCharacter: CharacterId;// default 'rascal'
  perSiteOverrides: Record<string, boolean>; // hostname → on/off
  lingerMs: number;              // default 1800; post-steal pause
};
```

Per-site disable: hostname keyed on `location.hostname`. If absent, falls back to `enabled`.

`lingerMs` is exposed in the popup as a chip-row of presets (`LINGER_PRESETS` in `shared/types.ts`): no pause / 1s / 1.8s / 3s / 5s. Stored as raw milliseconds so users can manually pick anything if they edit storage directly.

## Stats (local)

```ts
type Stats = {
  stealCount: number;
  totalHeistMs: number;     // for computing avg
  lastHeistAt: number | null;
};
```

Bumped on each successful `RESTORE`. Popup reads on open and subscribes to `storage.onChanged` for live updates.

## Message envelope

```ts
type Message =
  | { type: 'GET_STATE' }
  | { type: 'STATE'; settings: Settings; stats: Stats; site: string }
  | { type: 'SET_ENABLED'; value: boolean }
  | { type: 'SET_SITE_ENABLED'; hostname: string; value: boolean }
  | { type: 'SET_CHARACTER'; value: CharacterId }
  | { type: 'SET_LINGER'; value: number }
  | { type: 'HEIST_COMPLETED'; durationMs: number }
  | { type: 'SETTINGS_CHANGED'; settings: Settings };
```

## Visual layers (in `content/overlay.ts`)

All rendering happens inside a single `<div id="cursor-thief-host">` attached to `document.documentElement` with `position: fixed; inset: 0; z-index: 2147483647; pointer-events: none`. An open Shadow DOM root inside it holds:

| Class | Purpose |
|---|---|
| `.actor` | Creature wrapper (one per heist: outbound + inbound returner). Wrapper holds JS-driven transform; inner `<svg>` gets CSS-driven scamper bob. Toggled classes: `scamper`/`grab`/`skid`/`idle`. |
| `.bubble` | Hand-drawn speech bubble with the truncated stolen text. |
| `.ghost` | Subtle blue rectangle covering each selection rect; lightly fades during STEAL. |
| `.cover` | Paper-coloured rectangle (uses `--ct-paper` sampled from `document.body`) that sweeps over the selection via animated `clip-path`, making the text appear scraped off. |
| `.scrape-mark` | 4 small diagonal slash strokes spawned during STEAL — visual punctuation. |
| `.burst` | Comic-book "POACHED!"/"YOINK!"/etc. plate, randomised per heist. |
| `.particle` | Word fragments sampled from the actual selection text, flying in arcs from the prose into the bubble. |
| `.puff` | Dust clouds at entry and exit feet. |
| `.sparkle` | Mustard sparkles at restore time. |
| `.note` | Caveat-font "thx! ♥"/"no harm done!"/etc. apology. |

### Per-character body-part classes

Each creature SVG tags its body parts so CSS can animate them when the actor enters scamper/grab/idle states:

- `ct-tail` — tail group (wags during run, sways gently when idle)
- `ct-leg-l` / `ct-leg-r` — leg groups (alternate cycle during run)
- `ct-arm` — arm holding the loot (yank-and-grab during STEAL)
- `ct-head` — head group (subtle bob during run, look-around tilt while idle)
- `ct-sack` — burlap sack / satchel / briefcase / etc. (currently no animation, future use)

CSS uses `transform-box: fill-box` so per-element transforms originate from each part's own bounding box rather than the SVG viewBox origin.

## Edge case handling (from spec)

- **Inputs / contenteditable** — `selection.ts` walks the range's ancestors; if any is `<input>`, `<textarea>`, or `[contenteditable]`, abort.
- **Iframes** — content script declared with `all_frames: false`. Top frame only.
- **Tiny selections** — no minimum length; bubble shows whatever fits.
- **Long selections** — truncate to 140 chars with `…`; bubble's `display: -webkit-box; line-clamp: 2` handles overflow visually.
- **Page scroll mid-heist** — creature's positions captured at `mouseup`; not re-anchored. Spec says "best effort, no need to be precise."
- **Concurrent heists** — `heist.ts` checks an `inFlight` flag; if true, `mouseup` events are ignored until `IDLE` returns.
- **Cmd/Ctrl+C during heist** — original DOM range is **not modified**. Visual fade is applied via overlay decoration, not by mutating text. The clipboard always sees the real text.

## Build

```bash
npm run build           # builds both targets to dist/{chromium,firefox}/
npm run build:chromium  # one target
npm run build:firefox   # one target
npm run dev             # watch mode, chromium target
```

Build script (`scripts/build.mjs`):
1. Run `vite build` with multiple entry points (background, content, popup).
2. Copy `manifest.chromium.json` or `manifest.firefox.json` to `dist/<target>/manifest.json`.
3. Copy `public/` static assets (icons, fonts).

## Out of scope for v1

- Sound effects (spec exclusion)
- Stealing images / non-text (spec exclusion)
- Persisting stolen text (spec exclusion)
- Telemetry / external analytics (spec exclusion)
- Options page beyond what fits in popup
