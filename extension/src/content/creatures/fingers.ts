import { h } from "./h";
import type { Pose } from "../../shared/types";

type RenderOptions = { pose?: Pose; flip?: boolean; width?: number };

const INK = "#2A2620";
const PAPER = "#F5EFE2";
const MUSTARD = "#E8B547";

export default function fingers(opts: RenderOptions = {}): SVGElement {
  const { flip = false, width = 88 } = opts;

  const shadow = h("ellipse", {
    cx: "100", cy: "168", rx: "54", ry: "5",
    fill: INK, opacity: "0.18",
  });

  // Head/mantle — bulbous
  const mantle = h("path", {
    d: "M58 90 Q54 50 100 46 Q146 50 142 90 Q142 110 130 116 Q100 122 70 116 Q58 110 58 90 Z",
    fill: "#C97AAE", stroke: INK, "stroke-width": "2.6", "stroke-linejoin": "round",
  });

  // Mantle highlight
  const mantleHighlight = h("path", {
    d: "M70 60 Q72 50 86 50",
    fill: "none", stroke: PAPER, "stroke-width": "2.2", "stroke-linecap": "round", opacity: "0.7",
  });

  // Spots on mantle
  const spot1 = h("circle", { cx: "80", cy: "76", r: "3", fill: "#A05A88" });
  const spot2 = h("circle", { cx: "118", cy: "72", r: "3", fill: "#A05A88" });
  const spot3 = h("circle", { cx: "100", cy: "62", r: "2.5", fill: "#A05A88" });

  // Eyes — big, expressive
  const eyeLeftOuter = h("circle", { cx: "84", cy: "86", r: "9", fill: PAPER, stroke: INK, "stroke-width": "2.2" });
  const eyeRightOuter = h("circle", { cx: "116", cy: "86", r: "9", fill: PAPER, stroke: INK, "stroke-width": "2.2" });
  const eyeLeftPupil = h("circle", { cx: "86", cy: "88", r: "4.5", fill: INK });
  const eyeRightPupil = h("circle", { cx: "118", cy: "88", r: "4.5", fill: INK });
  const eyeLeftShine = h("circle", { cx: "87.5", cy: "86.5", r: "1.6", fill: PAPER });
  const eyeRightShine = h("circle", { cx: "119.5", cy: "86.5", r: "1.6", fill: PAPER });

  // Sneaky grin
  const grin = h("path", {
    d: "M88 108 Q100 116 112 108",
    fill: "none", stroke: INK, "stroke-width": "2.2", "stroke-linecap": "round",
  });
  const tooth = h("path", {
    d: "M112 108 L116 112 L110 112 Z",
    fill: PAPER, stroke: INK, "stroke-width": "1.4",
  });

  // ARM 1 — leftmost, holding a ring
  const arm1Path1 = h("path", {
    d: "M62 110 Q40 120 28 138 Q24 156 14 154",
    fill: "none", stroke: "#C97AAE", "stroke-width": "9", "stroke-linecap": "round",
  });
  const arm1Path2 = h("path", {
    d: "M62 110 Q40 120 28 138 Q24 156 14 154",
    fill: "none", stroke: INK, "stroke-width": "2.2", "stroke-linecap": "round",
  });
  // Sucker dots along arm 1 (mapped from [34,38,42] with i=0,1,2 -> cx=32-i*4, cy=140+i*4)
  const arm1Sucker0 = h("circle", { cx: "32", cy: "140", r: "2", fill: PAPER, stroke: INK, "stroke-width": "1" });
  const arm1Sucker1 = h("circle", { cx: "28", cy: "144", r: "2", fill: PAPER, stroke: INK, "stroke-width": "1" });
  const arm1Sucker2 = h("circle", { cx: "24", cy: "148", r: "2", fill: PAPER, stroke: INK, "stroke-width": "1" });
  // Ring
  const arm1Ring = h("circle", { cx: "14", cy: "154", r: "6", fill: "none", stroke: MUSTARD, "stroke-width": "3" });
  const arm1Gem = h("circle", { cx: "13", cy: "151", r: "2", fill: MUSTARD, stroke: INK, "stroke-width": "1" });
  const arm1 = h("g", { class: "ct-arm ct-arm-1" }, [arm1Path1, arm1Path2, arm1Sucker0, arm1Sucker1, arm1Sucker2, arm1Ring, arm1Gem]);

  // ARM 2 — holding a key
  const arm2Path1 = h("path", {
    d: "M68 116 Q56 140 60 168",
    fill: "none", stroke: "#C97AAE", "stroke-width": "9", "stroke-linecap": "round",
  });
  const arm2Path2 = h("path", {
    d: "M68 116 Q56 140 60 168",
    fill: "none", stroke: INK, "stroke-width": "2.2", "stroke-linecap": "round",
  });
  const keyRing = h("circle", { cx: "0", cy: "0", r: "4", fill: "none", stroke: MUSTARD, "stroke-width": "2" });
  const keyShaft = h("line", { x1: "3", y1: "0", x2: "14", y2: "0", stroke: MUSTARD, "stroke-width": "2" });
  const keyTooth1 = h("line", { x1: "11", y1: "0", x2: "11", y2: "3", stroke: MUSTARD, "stroke-width": "2" });
  const keyTooth2 = h("line", { x1: "14", y1: "0", x2: "14", y2: "4", stroke: MUSTARD, "stroke-width": "2" });
  const key = h("g", { transform: "translate(60 168) rotate(-20)" }, [keyRing, keyShaft, keyTooth1, keyTooth2]);
  const arm2 = h("g", { class: "ct-arm ct-arm-2" }, [arm2Path1, arm2Path2, key]);

  // ARM 3 — holding a coin
  const arm3Path1 = h("path", {
    d: "M84 120 Q82 144 88 168",
    fill: "none", stroke: "#C97AAE", "stroke-width": "9", "stroke-linecap": "round",
  });
  const arm3Path2 = h("path", {
    d: "M84 120 Q82 144 88 168",
    fill: "none", stroke: INK, "stroke-width": "2.2", "stroke-linecap": "round",
  });
  const coin = h("circle", { cx: "88", cy: "170", r: "6", fill: MUSTARD, stroke: INK, "stroke-width": "1.8" });
  const coinText = h("text", {
    x: "88", y: "173",
    "text-anchor": "middle",
    "font-family": "Special Elite, monospace",
    "font-size": "7",
    fill: INK,
    "font-weight": "700",
  }, ["$"]);
  const arm3 = h("g", { class: "ct-arm ct-arm-3" }, [arm3Path1, arm3Path2, coin, coinText]);

  // ARM 4 — holding a watch
  const arm4Path1 = h("path", {
    d: "M100 122 Q102 140 110 158",
    fill: "none", stroke: "#C97AAE", "stroke-width": "9", "stroke-linecap": "round",
  });
  const arm4Path2 = h("path", {
    d: "M100 122 Q102 140 110 158",
    fill: "none", stroke: INK, "stroke-width": "2.2", "stroke-linecap": "round",
  });
  const watchFace = h("circle", { cx: "112", cy: "160", r: "6", fill: PAPER, stroke: INK, "stroke-width": "1.8" });
  const watchHand1 = h("line", { x1: "112", y1: "160", x2: "112", y2: "156", stroke: INK, "stroke-width": "1.4" });
  const watchHand2 = h("line", { x1: "112", y1: "160", x2: "115", y2: "160", stroke: INK, "stroke-width": "1.4" });
  const watchCrown = h("line", { x1: "112", y1: "153", x2: "112", y2: "155", stroke: INK, "stroke-width": "2.4", "stroke-linecap": "round" });
  const arm4 = h("g", { class: "ct-arm ct-arm-4" }, [arm4Path1, arm4Path2, watchFace, watchHand1, watchHand2, watchCrown]);

  // ARM 5 — holding a letter
  const arm5Path1 = h("path", {
    d: "M116 120 Q124 140 130 162",
    fill: "none", stroke: "#C97AAE", "stroke-width": "9", "stroke-linecap": "round",
  });
  const arm5Path2 = h("path", {
    d: "M116 120 Q124 140 130 162",
    fill: "none", stroke: INK, "stroke-width": "2.2", "stroke-linecap": "round",
  });
  const letterEnvelope = h("rect", {
    x: "-6", y: "-4", width: "12", height: "9",
    fill: PAPER, stroke: INK, "stroke-width": "1.6",
  });
  const letterFlap = h("path", {
    d: "M-6 -4 L0 1 L6 -4",
    fill: "none", stroke: INK, "stroke-width": "1.4",
  });
  const letter = h("g", { transform: "translate(130 162) rotate(15)" }, [letterEnvelope, letterFlap]);
  const arm5 = h("g", { class: "ct-arm ct-arm-5" }, [arm5Path1, arm5Path2, letter]);

  // ARM 6 — holding a gem
  const arm6Path1 = h("path", {
    d: "M132 116 Q150 138 156 158",
    fill: "none", stroke: "#C97AAE", "stroke-width": "9", "stroke-linecap": "round",
  });
  const arm6Path2 = h("path", {
    d: "M132 116 Q150 138 156 158",
    fill: "none", stroke: INK, "stroke-width": "2.2", "stroke-linecap": "round",
  });
  const gemShape = h("path", {
    d: "M-5 -2 L0 -7 L5 -2 L0 5 Z",
    fill: "#5C9BB8", stroke: INK, "stroke-width": "1.6", "stroke-linejoin": "round",
  });
  const gemLine = h("path", { d: "M-5 -2 L5 -2", stroke: INK, "stroke-width": "1" });
  const gem = h("g", { transform: "translate(156 158)" }, [gemShape, gemLine]);
  const arm6 = h("g", { class: "ct-arm ct-arm-6" }, [arm6Path1, arm6Path2, gem]);

  // ARM 7 — holding a question mark slip (text with lines)
  const arm7Path1 = h("path", {
    d: "M140 110 Q160 122 174 138",
    fill: "none", stroke: "#C97AAE", "stroke-width": "9", "stroke-linecap": "round",
  });
  const arm7Path2 = h("path", {
    d: "M140 110 Q160 122 174 138",
    fill: "none", stroke: INK, "stroke-width": "2.2", "stroke-linecap": "round",
  });
  const slipPaper = h("rect", {
    x: "-6", y: "-7", width: "12", height: "14",
    fill: PAPER, stroke: INK, "stroke-width": "1.6",
  });
  const slipLine1 = h("line", { x1: "-3", y1: "-3", x2: "3", y2: "-3", stroke: INK, "stroke-width": "1" });
  const slipLine2 = h("line", { x1: "-3", y1: "0", x2: "3", y2: "0", stroke: INK, "stroke-width": "1" });
  const slipLine3 = h("line", { x1: "-3", y1: "3", x2: "1", y2: "3", stroke: INK, "stroke-width": "1" });
  const slip = h("g", { transform: "translate(174 138) rotate(10)" }, [slipPaper, slipLine1, slipLine2, slipLine3]);
  const arm7 = h("g", { class: "ct-arm ct-arm-7" }, [arm7Path1, arm7Path2, slip]);

  // ARM 8 — empty curl, waving
  const arm8Path1 = h("path", {
    d: "M144 100 Q170 92 186 100 Q190 108 184 112",
    fill: "none", stroke: "#C97AAE", "stroke-width": "9", "stroke-linecap": "round",
  });
  const arm8Path2 = h("path", {
    d: "M144 100 Q170 92 186 100 Q190 108 184 112",
    fill: "none", stroke: INK, "stroke-width": "2.2", "stroke-linecap": "round",
  });
  // Sucker dots along arm 8 (mapped from [0,1,2] -> cx=172+i*6, cy=98-i)
  const arm8Sucker0 = h("circle", { cx: "172", cy: "98", r: "1.8", fill: PAPER, stroke: INK, "stroke-width": "0.8" });
  const arm8Sucker1 = h("circle", { cx: "178", cy: "97", r: "1.8", fill: PAPER, stroke: INK, "stroke-width": "0.8" });
  const arm8Sucker2 = h("circle", { cx: "184", cy: "96", r: "1.8", fill: PAPER, stroke: INK, "stroke-width": "0.8" });
  const arm8 = h("g", { class: "ct-arm ct-arm-8" }, [arm8Path1, arm8Path2, arm8Sucker0, arm8Sucker1, arm8Sucker2]);

  const arms = h("g", { class: "ct-arms" }, [arm1, arm2, arm3, arm4, arm5, arm6, arm7, arm8]);

  const head = h("g", { class: "ct-head" }, [
    mantle, mantleHighlight,
    spot1, spot2, spot3,
    eyeLeftOuter, eyeRightOuter,
    eyeLeftPupil, eyeRightPupil,
    eyeLeftShine, eyeRightShine,
    grin, tooth,
  ]);

  const inner = h(
    "g",
    flip ? { transform: "scale(-1,1) translate(-200,0)" } : {},
    [
      shadow,
      // Arms drawn behind mantle
      arms,
      // Mantle (head) on top
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
