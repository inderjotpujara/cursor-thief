# Icon source files

`source.html` is the canonical icon at full resolution (Rascal in a dark
circular badge with an amber border). To regenerate the four extension
PNGs:

1. Open `source.html` in any browser at a 512×512 viewport (or use the
   Chrome DevTools MCP / a headless browser).
2. Capture a 512×512 PNG of the page → save as `icon-512.png` in this
   folder.
3. Resize down to the four extension sizes:

   ```bash
   cd ../../public/icons
   for s in 16 32 48 128; do
     sips -Z $s ../../scripts/icon-source/icon-512.png --out icon-$s.png
   done
   ```

`icon-512.png` is committed alongside the source as a master so future
regenerations don't re-roll the gradient/seed in subtle ways.

To swap the character (e.g. icon shows Pip instead of Rascal): replace
the inline `<svg>` in `source.html` with the desired character's SVG
markup, then rerun the steps above.
