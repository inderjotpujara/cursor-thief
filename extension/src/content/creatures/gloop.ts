import { h } from "./h";
import type { Pose } from "../../shared/types";

type RenderOptions = { pose?: Pose; flip?: boolean; width?: number };

const INK = "#2A2620";
const PAPER = "#F5EFE2";
const AMBER = "#E8743C";

export default function gloop(opts: RenderOptions = {}): SVGElement {
  const { flip = false, width = 88 } = opts;

  const shadow = h("ellipse", {
    cx: "100", cy: "168", rx: "52", ry: "5",
    fill: INK, opacity: "0.18",
  });

  // Round body
  const body = h("ellipse", {
    cx: "100", cy: "118", rx: "58", ry: "48",
    fill: "#7BA85A", stroke: INK, "stroke-width": "2.6",
  });

  // Belly
  const belly = h("ellipse", {
    cx: "100", cy: "130", rx: "38", ry: "28",
    fill: "#D8E4B0", stroke: INK, "stroke-width": "1.8",
  });

  // Spots
  const spot1 = h("circle", { cx: "58", cy: "106", r: "6", fill: "#5C8240", stroke: INK, "stroke-width": "1.4" });
  const spot2 = h("circle", { cx: "148", cy: "116", r: "5", fill: "#5C8240", stroke: INK, "stroke-width": "1.4" });
  const spot3 = h("circle", { cx: "72", cy: "138", r: "3.5", fill: "#5C8240" });

  // Legs splayed — left
  const legLeftBody = h("path", {
    d: "M48 142 Q30 154 30 168 Q42 172 56 162 Q56 154 52 146 Z",
    fill: "#7BA85A", stroke: INK, "stroke-width": "2.4", "stroke-linejoin": "round",
  });
  const legLeftToe1 = h("circle", { cx: "32", cy: "166", r: "3.5", fill: PAPER, stroke: INK, "stroke-width": "1.6" });
  const legLeftToe2 = h("circle", { cx: "40", cy: "170", r: "3.5", fill: PAPER, stroke: INK, "stroke-width": "1.6" });
  const legLeftToe3 = h("circle", { cx: "48", cy: "170", r: "3.5", fill: PAPER, stroke: INK, "stroke-width": "1.6" });
  const legLeft = h("g", { class: "ct-leg-l" }, [legLeftBody, legLeftToe1, legLeftToe2, legLeftToe3]);

  // Legs splayed — right
  const legRightBody = h("path", {
    d: "M152 142 Q170 154 170 168 Q158 172 144 162 Q144 154 148 146 Z",
    fill: "#7BA85A", stroke: INK, "stroke-width": "2.4", "stroke-linejoin": "round",
  });
  const legRightToe1 = h("circle", { cx: "168", cy: "166", r: "3.5", fill: PAPER, stroke: INK, "stroke-width": "1.6" });
  const legRightToe2 = h("circle", { cx: "160", cy: "170", r: "3.5", fill: PAPER, stroke: INK, "stroke-width": "1.6" });
  const legRightToe3 = h("circle", { cx: "152", cy: "170", r: "3.5", fill: PAPER, stroke: INK, "stroke-width": "1.6" });
  const legRight = h("g", { class: "ct-leg-r" }, [legRightBody, legRightToe1, legRightToe2, legRightToe3]);

  // Sticky front hand reaching
  const armLine = h("path", {
    d: "M70 130 Q56 142 50 152",
    fill: "none", stroke: INK, "stroke-width": "2.4", "stroke-linecap": "round",
  });
  const handPalm = h("circle", { cx: "50", cy: "152", r: "6", fill: "#7BA85A", stroke: INK, "stroke-width": "2" });
  const finger1 = h("circle", { cx: "46", cy: "156", r: "3", fill: PAPER, stroke: INK, "stroke-width": "1.4" });
  const finger2 = h("circle", { cx: "52", cy: "158", r: "3", fill: PAPER, stroke: INK, "stroke-width": "1.4" });
  const finger3 = h("circle", { cx: "56", cy: "153", r: "3", fill: PAPER, stroke: INK, "stroke-width": "1.4" });
  const arm = h("g", { class: "ct-arm" }, [armLine, handPalm, finger1, finger2, finger3]);

  // Eye bumps on top
  const eyeBumpLeft = h("circle", {
    cx: "78", cy: "68", r: "18",
    fill: "#7BA85A", stroke: INK, "stroke-width": "2.4",
  });
  const eyeBumpRight = h("circle", {
    cx: "122", cy: "68", r: "18",
    fill: "#7BA85A", stroke: INK, "stroke-width": "2.4",
  });
  const eyeWhiteLeft = h("circle", { cx: "78", cy: "68", r: "11", fill: PAPER });
  const eyeWhiteRight = h("circle", { cx: "122", cy: "68", r: "11", fill: PAPER });

  // Slit pupils
  const pupilLeft = h("ellipse", { cx: "80", cy: "70", rx: "3", ry: "8", fill: INK });
  const pupilRight = h("ellipse", { cx: "120", cy: "70", rx: "3", ry: "8", fill: INK });
  const eyeShineLeft = h("circle", { cx: "82", cy: "65", r: "2", fill: PAPER });
  const eyeShineRight = h("circle", { cx: "122", cy: "65", r: "2", fill: PAPER });

  // Smug wide grin — closed mouth
  const grin = h("path", {
    d: "M62 110 Q100 142 138 110",
    fill: "none", stroke: INK, "stroke-width": "2.6", "stroke-linecap": "round",
  });

  // Upturned mouth corners
  const mouthCornerLeft = h("path", {
    d: "M62 110 Q60 104 64 100",
    fill: "none", stroke: INK, "stroke-width": "2.2", "stroke-linecap": "round",
  });
  const mouthCornerRight = h("path", {
    d: "M138 110 Q140 104 136 100",
    fill: "none", stroke: INK, "stroke-width": "2.2", "stroke-linecap": "round",
  });

  // Tiny tongue tip
  const tongue = h("path", {
    d: "M96 124 Q100 130 104 124",
    fill: AMBER, stroke: INK, "stroke-width": "1.5",
  });

  // Nostrils
  const nostrilLeft = h("circle", { cx: "94", cy: "92", r: "1.6", fill: INK });
  const nostrilRight = h("circle", { cx: "106", cy: "92", r: "1.6", fill: INK });

  const legs = h("g", { class: "ct-legs" }, [legLeft, legRight]);

  const head = h("g", { class: "ct-head" }, [
    eyeBumpLeft, eyeBumpRight,
    eyeWhiteLeft, eyeWhiteRight,
    pupilLeft, pupilRight,
    eyeShineLeft, eyeShineRight,
    grin, mouthCornerLeft, mouthCornerRight,
    tongue,
    nostrilLeft, nostrilRight,
  ]);

  const inner = h(
    "g",
    flip ? { transform: "scale(-1,1) translate(-200,0)" } : {},
    [
      shadow,
      body, belly,
      spot1, spot2, spot3,
      legs,
      arm,
      head,
    ],
  );

  return h(
    "svg",
    {
      viewBox: "0 0 200 180",
      width: String(width),
      xmlns: "http://www.w3.org/2000/svg",
      style: "overflow: visible",
    },
    [inner],
  );
}
