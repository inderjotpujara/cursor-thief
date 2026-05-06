import { h } from "./h";
import type { Pose } from "../../shared/types";

type RenderOptions = { pose?: Pose; flip?: boolean; width?: number };

const INK = "#2A2620";
const PAPER = "#F5EFE2";
const MUSTARD = "#E8B547";

export default function pip(opts: RenderOptions = {}): SVGElement {
  const { flip = false, width = 88 } = opts;

  const shadow = h("ellipse", {
    cx: "100", cy: "168", rx: "38", ry: "4",
    fill: INK, opacity: "0.18",
  });

  // Tail — squiggly mouse tail, two layers
  const tailOuter = h("path", {
    d: "M138 150 Q160 152 168 140 Q172 128 158 130 Q168 122 178 130",
    fill: "none", stroke: "#D8B5A0", "stroke-width": "3.5", "stroke-linecap": "round",
  });
  const tailInner = h("path", {
    d: "M138 150 Q160 152 168 140 Q172 128 158 130 Q168 122 178 130",
    fill: "none", stroke: INK, "stroke-width": "1.2", "stroke-linecap": "round", opacity: "0.5",
  });

  // Trench coat body
  const coat = h("path", {
    d: "M70 132 Q66 96 78 84 Q100 78 122 84 Q134 96 130 132 Q132 158 122 162 Q100 165 78 162 Q68 158 70 132 Z",
    fill: "#9B8266", stroke: INK, "stroke-width": "2.6", "stroke-linejoin": "round",
  });

  // Lapels
  const lapelLeft = h("path", {
    d: "M86 90 L100 110 L86 122 Z",
    fill: "#7A6450", stroke: INK, "stroke-width": "2", "stroke-linejoin": "round",
  });
  const lapelRight = h("path", {
    d: "M114 90 L100 110 L114 122 Z",
    fill: "#7A6450", stroke: INK, "stroke-width": "2", "stroke-linejoin": "round",
  });

  // Belt
  const belt = h("rect", {
    x: "68", y: "138", width: "64", height: "6",
    fill: "#5C4A38", stroke: INK, "stroke-width": "1.8",
  });
  const beltBuckle = h("rect", {
    x: "96", y: "136", width: "8", height: "10",
    fill: MUSTARD, stroke: INK, "stroke-width": "1.5",
  });

  // Coat buttons
  const button1 = h("circle", { cx: "100", cy: "118", r: "2", fill: INK });
  const button2 = h("circle", { cx: "100", cy: "128", r: "2", fill: INK });

  // Feet
  const footLeft = h("ellipse", { cx: "84", cy: "166", rx: "9", ry: "4", fill: INK });
  const footRight = h("ellipse", { cx: "116", cy: "166", rx: "9", ry: "4", fill: INK });

  // Head — round grey
  const headCircle = h("circle", {
    cx: "100", cy: "68", r: "30",
    fill: "#B8A89A", stroke: INK, "stroke-width": "2.6",
  });

  // Big round ears
  const earLeft = h("circle", {
    cx: "78", cy: "48", r: "14",
    fill: "#B8A89A", stroke: INK, "stroke-width": "2.4",
  });
  const earLeftInner = h("circle", { cx: "78", cy: "48", r: "8", fill: "#E8B5A8" });
  const earRight = h("circle", {
    cx: "122", cy: "48", r: "14",
    fill: "#B8A89A", stroke: INK, "stroke-width": "2.4",
  });
  const earRightInner = h("circle", { cx: "122", cy: "48", r: "8", fill: "#E8B5A8" });

  // Beret — tilted
  const beretBrim = h("ellipse", {
    cx: "100", cy: "48", rx: "32", ry: "8",
    fill: "#1B1A24", stroke: INK, "stroke-width": "2.4",
  });
  const beretTop = h("ellipse", {
    cx: "100", cy: "44", rx: "26", ry: "10",
    fill: "#25232F", stroke: INK, "stroke-width": "2.4",
  });
  const beretPin = h("circle", {
    cx: "120", cy: "40", r: "3",
    fill: "#25232F", stroke: INK, "stroke-width": "1.8",
  });
  const beret = h("g", { transform: "rotate(-15 100 44)" }, [beretBrim, beretTop, beretPin]);

  // Eyes — beady, tiny
  const eyeLeft = h("circle", { cx: "90", cy: "68", r: "3", fill: INK });
  const eyeRight = h("circle", { cx: "110", cy: "68", r: "3", fill: INK });
  const eyeShineLeft = h("circle", { cx: "90.6", cy: "67.2", r: "0.8", fill: PAPER });
  const eyeShineRight = h("circle", { cx: "110.6", cy: "67.2", r: "0.8", fill: PAPER });

  // Snout + nose
  const snout = h("path", {
    d: "M92 80 Q100 88 108 80 Q108 92 100 92 Q92 92 92 80 Z",
    fill: PAPER, stroke: INK, "stroke-width": "1.8",
  });
  const nose = h("ellipse", {
    cx: "100", cy: "82", rx: "3", ry: "2",
    fill: "#E8743C", stroke: INK, "stroke-width": "1",
  });

  // Whiskers
  const w1 = h("line", { x1: "92", y1: "86", x2: "78", y2: "84", stroke: INK, "stroke-width": "1", "stroke-linecap": "round" });
  const w2 = h("line", { x1: "92", y1: "88", x2: "78", y2: "90", stroke: INK, "stroke-width": "1", "stroke-linecap": "round" });
  const w3 = h("line", { x1: "108", y1: "86", x2: "122", y2: "84", stroke: INK, "stroke-width": "1", "stroke-linecap": "round" });
  const w4 = h("line", { x1: "108", y1: "88", x2: "122", y2: "90", stroke: INK, "stroke-width": "1", "stroke-linecap": "round" });

  const tail = h("g", { class: "ct-tail" }, [tailOuter, tailInner]);

  const legL = h("g", { class: "ct-leg-l" }, [footLeft]);
  const legR = h("g", { class: "ct-leg-r" }, [footRight]);
  const legs = h("g", { class: "ct-legs" }, [legL, legR]);

  const head = h("g", { class: "ct-head" }, [
    earLeft, earLeftInner, earRight, earRightInner,
    beret,
    headCircle,
    eyeLeft, eyeRight, eyeShineLeft, eyeShineRight,
    snout, nose,
    w1, w2, w3, w4,
  ]);

  const inner = h(
    "g",
    flip ? { transform: "scale(-1,1) translate(-200,0)" } : {},
    [
      shadow,
      tail,
      coat, lapelLeft, lapelRight,
      belt, beltBuckle,
      button1, button2,
      legs,
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
