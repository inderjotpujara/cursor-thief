# Distribution assets

Materials for publishing Cursor Thief to the Chrome Web Store and the
Firefox Add-ons store. None of this is needed to use the extension —
it's all submission paperwork.

| File | Purpose |
|---|---|
| `STORE_LISTING.md` | Copy-paste text for both stores: title, descriptions, screenshots plan, permission justifications. |
| `SUBMISSION_CHECKLIST.md` | Step-by-step runbook for the day you submit. |

## Build artefacts to attach

After running `npm run package` in `extension/`, you'll have:

- `extension/release/cursor-thief-chromium-v0.X.Y.zip` → upload to
  Chrome Web Store
- `extension/release/cursor-thief-firefox-v0.X.Y.zip` → upload to
  Firefox AMO
- `extension/release/cursor-thief-source-v0.X.Y.zip` → upload to
  Firefox AMO as the source archive (Firefox requires source for any
  minified upload)

The `npm run package` script is added in this release; see
`extension/scripts/package.mjs`.
