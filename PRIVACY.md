# Privacy Policy — Cursor Thief

**Last updated:** 2026-05-06
**Applies to:** Cursor Thief browser extension, all versions.

## Short version

Cursor Thief does not collect, transmit, or persist any data outside
your own browser. There is no analytics, no telemetry, no remote
server, no opt-in or opt-out tracking — there is simply no network
egress from this extension. The only thing it ever stores is your
preferences (toggles, picked character, reading-time, per-site
disables) and a local count of how many heists have run.

## What is stored, and where

| Data | Storage | Synced across your browsers? | Why |
|---|---|---|---|
| `enabled` (global on/off) | `browser.storage.sync` | Yes (via your browser profile) | Honour your global toggle on every device signed into the same profile |
| `selectedCharacter` | `browser.storage.sync` | Yes | Same |
| `perSiteOverrides` (a map of hostname → on/off) | `browser.storage.sync` | Yes | Per-site disable preferences travel with you |
| `lingerMs` (post-steal reading-time) | `browser.storage.sync` | Yes | Same |
| `stealCount`, `totalHeistMs`, `lastHeistAt` | `browser.storage.local` | No (this device only) | Local heist counter shown in the popup |

`browser.storage.sync` is your browser's normal preference-sync mechanism
(Chrome Sync / Firefox Sync / Edge Sync). It moves between your devices
via your browser vendor's infrastructure. **Cursor Thief never sees,
sends, or processes that data outside the browser-provided storage API.**

## What is **not** stored

- The contents of any text you select. The "stolen" text exists only as
  a temporary in-memory string for the duration of one heist
  (~3.6–8.6 seconds depending on linger). It is never written to disk,
  storage, or any network resource.
- The hostnames of pages you visit (only hostnames you have *explicitly
  toggled per-site* are stored, in `perSiteOverrides`).
- Any identifier that could fingerprint you. The extension generates no
  identifiers and reads none.

## Permissions

The extension's `manifest.json` requests:

- `storage` — to persist the settings and stats described above.
- `activeTab` — implicit access to the tab the user is interacting with,
  used only when the popup needs to read the active tab's hostname for
  the "Active on `<domain>`" label.
- `<all_urls>` content script match — required so the heist can run on
  any page the user is reading. The script runs inside the page context
  but does **not** read any DOM beyond the user's own text selection,
  and never modifies the page DOM.

No other permissions are requested.

## Network requests made by the extension

The extension itself does not make any network requests at any phase
(install, runtime, heist, or settings save). The only network activity
attributable to the extension is the popup loading three Google Fonts
stylesheets from `fonts.googleapis.com` and the corresponding font
files from `fonts.gstatic.com` — these are static assets served by
Google and used purely for visual styling. If you block Google Fonts,
the popup falls back to system typefaces and continues to function.

## Third parties

There are no third-party services involved beyond the Google Fonts
loads described above. Specifically: no analytics provider, no error
reporter, no crash reporter, no AB-testing service, no advertising
network, and no LLM or other API.

## Open source

The full source is published at
https://github.com/inderjotpujara/cursor-thief under the MIT license.
You can read every line of code that has access to your browser.

## Changes

Material changes to this policy will be reflected in this file, in the
extension's CHANGELOG, and in any web-store listings. Continued use of
the extension after a change constitutes acceptance.

## Contact

Open an issue: https://github.com/inderjotpujara/cursor-thief/issues
