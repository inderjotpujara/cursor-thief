/* Selection detection — figure out whether a selection should trigger a heist
   and gather the geometry we need to animate against.

   Spec rules:
   - Skip if any ancestor is <input>, <textarea>, or [contenteditable].
   - Skip if collapsed (no actual selected text).
   - Skip iframes — handled at the manifest level (all_frames: false).
*/

export type SelectionInfo = {
  text: string;
  rects: DOMRect[];
  bounds: DOMRect;
  range: Range;
};

const EDITABLE_TAGS = new Set(["INPUT", "TEXTAREA", "SELECT"]);

function isInsideEditable(node: Node | null): boolean {
  let n: Node | null = node;
  while (n && n !== document.documentElement) {
    if (n.nodeType === Node.ELEMENT_NODE) {
      const el = n as HTMLElement;
      if (EDITABLE_TAGS.has(el.tagName)) return true;
      if (el.isContentEditable) return true;
    }
    n = n.parentNode;
  }
  return false;
}

export function captureSelection(): SelectionInfo | null {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0 || sel.isCollapsed) return null;

  const text = sel.toString();
  if (!text.trim()) return null;

  const range = sel.getRangeAt(0);
  const start = range.startContainer;
  const end = range.endContainer;

  if (isInsideEditable(start) || isInsideEditable(end)) return null;

  const rectList = range.getClientRects();
  if (!rectList || rectList.length === 0) return null;

  const rects: DOMRect[] = [];
  for (let i = 0; i < rectList.length; i++) {
    const r = rectList[i];
    if (r.width > 0 && r.height > 0) rects.push(r);
  }
  if (rects.length === 0) return null;

  const bounds = range.getBoundingClientRect();
  return { text, rects, bounds, range: range.cloneRange() };
}
