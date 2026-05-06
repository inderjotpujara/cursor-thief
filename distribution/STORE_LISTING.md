# Store listing copy

Drop-in text for Chrome Web Store and Firefox Add-ons listings. Each
section is sized to the relevant store's character limits so you can
copy-paste without truncation.

## Title

> **Cursor Thief**

(15 characters — well under both stores' 45-char limit)

## Short description

For Chrome Web Store's "Short description" (132 char limit) and Firefox
Add-ons' "Short summary" (250 char limit):

> A tiny creature scuttles in, steals your selected text, and brings it back. Pure visual mischief — your text is never actually lost.

(132 characters exactly — fits everywhere)

## Long description

For Chrome Web Store's "Detailed description" and Firefox Add-ons'
"Description" (both have generous limits):

```
Highlight any text on any web page and watch a tiny creature sneak in,
steal it with a comic-book "POACHED!" burst, and run off-screen with
your words bouncing along in a speech bubble. A few seconds later it
scampers back to put the text exactly where it was. Pure visual delight,
zero side effects.

★ Six pickable thieves — Rascal the raccoon-goblin, Pip the noir mouse,
Sly the bespectacled fox, Gloop the sticky-fingered frog, Snatch the
monocled magpie, and Fingers the eight-armed octopus. Each is a tiny
hand-drawn animated character.

★ Configurable reading time — pick how long the thief lingers with your
text in their speech bubble (no pause, 1s, 1.8s, 3s, or 5s). Default is
1.8 seconds, which is plenty to read short selections naturally.

★ Per-site toggle — disable on specific sites (your work tools, etc.)
while keeping the thief active everywhere else. Settings sync across
your browsers via your browser profile.

★ Smart guards — selections inside text fields, contenteditable areas,
and cross-origin iframes are skipped so the joke never disrupts real
work. Cmd/Ctrl+C still works against the original selection during the
animation — the page DOM is never modified, only visually overlaid.

★ Privacy-first — no analytics, no telemetry, no remote server. The
"stolen" text never leaves your browser, never gets persisted, never
shows up in any log. Your settings are kept in your browser's normal
sync storage. Open source under the MIT license.

★ Cross-browser — works on Chrome, Edge, Brave, Arc, Opera, Vivaldi,
and Firefox.

This extension exists because the internet should be a tiny bit more
delightful and a tiny bit less serious.

Source code: https://github.com/inderjotpujara/cursor-thief
Privacy policy: https://github.com/inderjotpujara/cursor-thief/blob/main/PRIVACY.md
```

## Category

- **Chrome Web Store**: *Fun*
- **Firefox Add-ons**: *Fun > Other*

## Tags / Labels

`fun`, `delight`, `text`, `selection`, `animation`, `mascot`, `whimsy`

## Screenshots — required dimensions

Both stores want screenshots at **1280×800**. We have hero shots in
`extension/test/`. They're 1200×~600 — they need to be re-taken or
re-composed at 1280×800.

Suggested screenshot set (5):

1. **The heist mid-air** — composed shot of the POACHED! burst with
   word particles flying. Caption: *"Watch your words get pinched."*
2. **The linger moment** — thief parked beside selection with the
   bubble visible. Caption: *"Pause as long as you like."*
3. **The popup** — full popup with toggles, reading time chips, stats.
   Caption: *"Tweak it your way."*
4. **The character picker** — 6-character grid. Caption: *"Pick your
   accomplice."*
5. **Restoration** — sparkles + thx! note as the text re-appears.
   Caption: *"Always brings it back."*

## Promo / hero images (Chrome Web Store optional)

- Small promo: 440×280 — same composition as screenshot #1, cropped.
- Marquee promo: 1400×560 — wide composition with the title typeset in
  Special Elite + a row of all 6 thieves at the bottom edge.

## Privacy policy URL (REQUIRED for Chrome Web Store)

`https://github.com/inderjotpujara/cursor-thief/blob/main/PRIVACY.md`

## Permissions justifications (REQUIRED for Chrome Web Store)

The store will ask why you need each permission. Use these exact
explanations:

- **`storage`**: "Persists the user's settings (enabled toggle,
  per-site disables, picked character, reading-time preference) and a
  local count of completed heists. No remote storage."
- **`activeTab`**: "Used only by the toolbar popup to read the active
  tab's hostname for the 'Active on <domain>' label and toggle. The
  content script does not use this permission."
- **`host_permissions: <all_urls>` (via `<all_urls>` match in
  `content_scripts`)**: "Required so the heist animation can run on
  any page the user is reading. The content script reads only the
  user's own text selection (`window.getSelection()`) and never
  modifies the page DOM. No data is collected or transmitted."

## Single-purpose declaration (REQUIRED for Chrome Web Store)

> "Animate a small character that visually 'steals' the user's text
> selection on web pages and returns it. The extension exists solely
> for visual delight — it does not collect data, modify content, or
> serve any other purpose."
