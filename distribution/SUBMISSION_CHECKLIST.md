# Submission checklist

Use this as a runbook the day you submit. Both stores ask for similar
things but in different orders.

## Common prerequisites

- [ ] Generate proper icons at 16/32/48/128 px (currently placeholders;
      see `extension/public/icons/`).
- [ ] Capture 5 listing screenshots at **1280×800** (see
      `STORE_LISTING.md` § Screenshots).
- [ ] Bump `version` in both manifests + `extension/package.json` if
      this isn't the first submission.
- [ ] Build clean — `cd extension && npm run clean && npm run build`.
- [ ] Smoke-test the unpacked build on the *exact* browser version
      you're submitting to.
- [ ] Make sure `PRIVACY.md` is up to date.

## Chrome Web Store

Account: https://chrome.google.com/webstore/devconsole
One-time fee: **$5** (still required as of 2026).

1. [ ] Sign in to the Developer Dashboard. Pay the $5 fee if first time.
2. [ ] **Create new item** → upload `dist/chromium.zip` (see
       `release/` after running `npm run package`).
3. [ ] Fill the **Store listing** tab using `STORE_LISTING.md`:
   - [ ] Title — *Cursor Thief*
   - [ ] Short description — § Short description
   - [ ] Detailed description — § Long description
   - [ ] Category — *Fun*
   - [ ] Language — *English*
   - [ ] Upload the 5 screenshots
   - [ ] Optional: small promo tile (440×280), marquee (1400×560)
   - [ ] Privacy policy URL — § Privacy policy URL
4. [ ] **Privacy practices** tab:
   - [ ] Single-purpose description — § Single-purpose declaration
   - [ ] Permission justifications — § Permissions justifications
   - [ ] Confirm: *no remote code*, *no data collection*, *no data
         sale*, *no data transfer*.
5. [ ] **Distribution** tab — *Public*, all regions.
6. [ ] **Pricing** — *Free*.
7. [ ] **Submit for review**. Initial review historically takes 1–3
       business days. Updates are usually faster.

## Firefox Add-ons (AMO)

Account: https://addons.mozilla.org/developers/
No fee.

1. [ ] Sign in.
2. [ ] **Submit a new add-on**:
   - Distribution: *Listed on this site*.
   - On your own: *No*.
3. [ ] Upload `dist/firefox.zip`.
4. [ ] AMO will run validation. Fix any issues it flags before
       continuing.
5. [ ] **Source code submission**: AMO requires source for any
       extension that uses minification. Upload a clean source zip
       (everything in `extension/` except `node_modules/`, `dist/`,
       `test/_*.png`). Include a `BUILD.md` (or your existing README)
       so the reviewer can rebuild — they will.
6. [ ] **Describe your add-on**:
   - [ ] Name — *Cursor Thief*
   - [ ] Summary — § Short description
   - [ ] Description — § Long description
   - [ ] Category — *Fun > Other*
   - [ ] Tags — § Tags / Labels
   - [ ] Privacy policy — paste the contents of `PRIVACY.md`
         (Firefox doesn't accept just a URL).
   - [ ] License — MIT (matches `LICENSE`).
7. [ ] Upload screenshots (1280×800).
8. [ ] **Submit for review**. AMO review historically takes anywhere
       from a few hours to a couple of days.

## After approval

- [ ] Update `README.md` install section with the live store URLs.
- [ ] Tag a release matching the submitted version
      (`git tag v0.X.Y && git push --tags`).
- [ ] Optional: announce on whichever channels you care about.

## Things that have caused submission rejections in the past for similar extensions

- **Missing privacy policy URL** (Chrome). Fix: link `PRIVACY.md` raw URL.
- **Permission justifications too vague** (Chrome). Fix: copy from
  `STORE_LISTING.md` verbatim.
- **Minified code with no source-zip** (Firefox). Fix: always upload
  source zip alongside.
- **Promo image text too small** (Chrome). Fix: keep title text ≥ 24pt.
