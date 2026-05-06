const SVG_NS = "http://www.w3.org/2000/svg";

type Attrs = Record<string, string | number | boolean | undefined | null>;

export function h(
  tag: string,
  attrs: Attrs = {},
  children: (SVGElement | Node | string)[] = [],
): SVGElement {
  const el = document.createElementNS(SVG_NS, tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v === undefined || v === null || v === false) continue;
    el.setAttribute(k, v === true ? "" : String(v));
  }
  for (const c of children) {
    if (typeof c === "string") el.appendChild(document.createTextNode(c));
    else el.appendChild(c);
  }
  return el;
}
