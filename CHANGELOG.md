# Changelog

All notable changes to this project are documented in this file.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/);
versioning follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] — 2026-05-06

The first cut. Everything from `cursor-thief.md` is met, plus the
choreography and configurability upgrades that came out of internal
review.

### Added

- **Cross-browser MV3 extension** that ships to Chrome, Edge, Brave, Arc,
  Opera, Vivaldi, and Firefox from a single TypeScript codebase. Vite
  build pipeline, separate manifest variants, no external build plugins.
- **Six pickable thieves** — Rascal (raccoon), Pip (mouse), Sly (fox),
  Gloop (frog), Snatch (magpie), Fingers (octopus). Each is a hand-drawn
  SVG with body parts tagged for animation (`ct-tail`, `ct-leg-l`,
  `ct-leg-r`, `ct-arm`, `ct-head`, `ct-sack`). Rascal supports four
  full poses (idle / run / carry / drop); the others render idle.
- **Heist state machine** — ARRIVE → STEAL → LINGER → EXIT → WAIT →
  RETURN → RESTORE. Web Animations API drives positioning + opacity;
  CSS keyframes drive limb animation via state classes.
- **The thief enters from whichever screen edge is closer**, scampers
  across with a bobbing motion, overshoots, skids into a stance
  *beside* the selection, then leans in with an arm-reach.
- **Comedic STEAL phase** — randomised comic burst (POACHED!, YOINK!,
  GOTCHA!, MINE NOW, SHHH!, BORROWED!), 4 diagonal scrape marks, and 6
  word particles peeled from the actual selection text arcing into the
  speech bubble.
- **Paper-coloured scrape cover** — a clip-path-animated overlay sweeps
  across the selection so the text appears physically scraped off the
  page. Page background is sampled at heist start for a seamless blend.
- **Configurable post-steal linger** — the thief stays planted with the
  bubble visible so the user can read the loot. Five presets in the
  popup (no pause / 1s / 1.8s / 3s / 5s); default 1.8s. Stored as raw
  ms in `Settings.lingerMs`.
- **Subtle restore choreography** — the cover retracts in the direction
  the *returning* thief comes from, the highlight fully un-fades,
  sparkles bloom, a randomised "thx! ♥" / "no harm done!" sticky note
  appears, then the thief scampers off-screen.
- **Popup** — toggles for global and per-site enable, character picker
  (with auto-discovered grid), reading-time presets, real stats panel.
  React 18 + TypeScript, talks to background via typed messages.
- **Stats** — heist count and avg duration, persisted to local storage,
  popup live-updates via `storage.onChanged`.
- **Settings sync** — `enabled`, `selectedCharacter`, `perSiteOverrides`,
  and `lingerMs` are stored in `browser.storage.sync`, so toggles follow
  the user across browsers signed into the same profile.
- **MV3 CSP fix for fonts** — extension pages explicitly allow
  `fonts.googleapis.com` + `fonts.gstatic.com` so the design's
  hand-drawn typefaces actually load in popup pages.
- **Local test harness** — `extension/test/index.html` stubs `chrome.*`
  enough for the content-script bundle to run outside a real extension
  context, useful for visual iteration without `chrome://extensions`
  reloads.
- **CI** — `.github/workflows/ci.yml` runs typecheck + cross-browser
  build on every push and PR, uploads downloadable chromium and firefox
  build artefacts (14-day retention).
- **Issue templates** — Bug / Feature templates in
  `.github/ISSUE_TEMPLATE/`, with structured fields for browser,
  character, console output, and idea scope.
- **MIT license**.

### Spec divergence

- The original spec budget of 5–6 s for full restoration is preserved
  with the default linger (~5.4 s end-to-end). Picking *patient (3s)*
  or *leisurely (5s)* explicitly extends the visible-loot window
  beyond the original budget — this is a deliberate, user-controlled
  choice introduced in this release.

[0.1.0]: https://github.com/inderjotpujara/cursor-thief/releases/tag/v0.1.0
