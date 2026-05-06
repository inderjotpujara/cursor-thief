import { h } from "./h";
import type { Pose } from "../../shared/types";

type RenderOptions = { pose?: Pose; flip?: boolean; width?: number };

const INK = "#2A2620";
const PAPER = "#F5EFE2";
const MUSTARD = "#E8B547";

export default function sly(opts: RenderOptions = {}): SVGElement {
  const { flip = false, width = 88 } = opts;

  const shadow = h("ellipse", {
    cx: "100", cy: "168", rx: "44", ry: "4.5",
    fill: INK, opacity: "0.18",
  });

  // Bushy tail
  const tailBody = h("path", {
    d: "M130 130 Q170 120 178 92 Q180 70 162 64 Q146 64 140 84 Q132 108 130 130 Z",
    fill: "#D9763A", stroke: INK, "stroke-width": "2.6", "stroke-linejoin": "round",
  });
  const tailTip = h("path", {
    d: "M156 70 Q172 70 175 88 Q170 86 165 82 Q160 76 156 70 Z",
    fill: PAPER, stroke: INK, "stroke-width": "2",
  });
  const tail = h("g", { transform: "rotate(15 145 130)", class: "ct-tail" }, [tailBody, tailTip]);

  // Body
  const body = h("path", {
    d: "M64 132 Q60 100 74 80 Q98 64 122 74 Q140 86 142 124 Q144 156 122 162 Q98 166 78 162 Q62 156 64 132 Z",
    fill: "#D9763A", stroke: INK, "stroke-width": "2.6", "stroke-linejoin": "round",
  });

  // White belly
  const belly = h("path", {
    d: "M82 116 Q80 140 92 156 Q104 160 116 156 Q126 140 122 116 Q100 108 82 116 Z",
    fill: PAPER, stroke: INK, "stroke-width": "1.8",
  });

  // Legs/paws
  const legLeft = h("path", {
    d: "M82 158 Q80 172 90 174 Q98 174 98 162 Z",
    fill: "#B85A28", stroke: INK, "stroke-width": "2.2",
  });
  const legRight = h("path", {
    d: "M104 162 Q104 174 114 174 Q122 174 120 158 Z",
    fill: "#B85A28", stroke: INK, "stroke-width": "2.2",
  });

  // Briefcase in arm
  const briefcaseBody = h("rect", {
    x: "0", y: "0", width: "32", height: "22", rx: "2",
    fill: "#5C3A20", stroke: INK, "stroke-width": "2.2",
  });
  const briefcaseStrap = h("rect", {
    x: "0", y: "6", width: "32", height: "2",
    fill: INK, opacity: "0.5",
  });
  const briefcaseHandle = h("rect", {
    x: "13", y: "-4", width: "6", height: "6",
    fill: "none", stroke: INK, "stroke-width": "2",
  });
  const briefcaseClasp = h("rect", {
    x: "14", y: "9", width: "4", height: "3",
    fill: MUSTARD, stroke: INK, "stroke-width": "1.2",
  });
  const briefcase = h("g", { transform: "translate(28 130) rotate(-8)", class: "ct-sack" }, [
    briefcaseBody, briefcaseStrap, briefcaseHandle, briefcaseClasp,
  ]);

  // Ears — pointed
  const earLeft = h("path", {
    d: "M70 60 L78 30 L94 50 Z",
    fill: "#D9763A", stroke: INK, "stroke-width": "2.4", "stroke-linejoin": "round",
  });
  const earLeftInner = h("path", { d: "M78 38 L82 50 L88 46 Z", fill: INK });
  const earRight = h("path", {
    d: "M130 60 L122 30 L106 50 Z",
    fill: "#D9763A", stroke: INK, "stroke-width": "2.4", "stroke-linejoin": "round",
  });
  const earRightInner = h("path", { d: "M122 38 L118 50 L112 46 Z", fill: INK });

  // Head — narrow, foxy
  const headShape = h("path", {
    d: "M68 80 Q66 56 86 50 Q100 46 114 50 Q134 56 132 80 Q130 100 116 108 L100 116 L84 108 Q70 100 68 80 Z",
    fill: "#D9763A", stroke: INK, "stroke-width": "2.6", "stroke-linejoin": "round",
  });

  // White muzzle/cheeks
  const muzzle = h("path", {
    d: "M82 90 Q80 104 92 112 L100 116 L108 112 Q120 104 118 90 Q100 96 82 90 Z",
    fill: PAPER, stroke: INK, "stroke-width": "1.8",
  });

  // Eyes behind glasses
  const eyeLeft = h("circle", { cx: "86", cy: "78", r: "2.5", fill: INK });
  const eyeRight = h("circle", { cx: "114", cy: "78", r: "2.5", fill: INK });

  // Round spectacles
  const glassLeft = h("circle", {
    cx: "86", cy: "78", r: "9",
    fill: "none", stroke: INK, "stroke-width": "2.2",
  });
  const glassRight = h("circle", {
    cx: "114", cy: "78", r: "9",
    fill: "none", stroke: INK, "stroke-width": "2.2",
  });
  const glassBridge = h("line", {
    x1: "95", y1: "78", x2: "105", y2: "78",
    stroke: INK, "stroke-width": "2.2",
  });
  const glassArmLeft = h("path", {
    d: "M77 76 L70 73",
    stroke: INK, "stroke-width": "2", "stroke-linecap": "round",
  });
  const glassArmRight = h("path", {
    d: "M123 76 L130 73",
    stroke: INK, "stroke-width": "2", "stroke-linecap": "round",
  });

  // Lens shine
  const shineLeft = h("path", {
    d: "M82 73 Q80 76 81 80",
    fill: "none", stroke: PAPER, "stroke-width": "1.5", opacity: "0.7",
  });
  const shineRight = h("path", {
    d: "M110 73 Q108 76 109 80",
    fill: "none", stroke: PAPER, "stroke-width": "1.5", opacity: "0.7",
  });

  // Nose
  const nose = h("ellipse", { cx: "100", cy: "98", rx: "4", ry: "3", fill: INK });

  // Smug grin
  const grin = h("path", {
    d: "M90 108 Q100 114 110 108",
    fill: "none", stroke: INK, "stroke-width": "1.8", "stroke-linecap": "round",
  });

  const legL = h("g", { class: "ct-leg-l" }, [legLeft]);
  const legR = h("g", { class: "ct-leg-r" }, [legRight]);
  const legs = h("g", { class: "ct-legs" }, [legL, legR]);

  const head = h("g", { class: "ct-head" }, [
    earLeft, earLeftInner, earRight, earRightInner,
    headShape, muzzle,
    eyeLeft, eyeRight,
    glassLeft, glassRight, glassBridge, glassArmLeft, glassArmRight,
    shineLeft, shineRight,
    nose, grin,
  ]);

  const inner = h(
    "g",
    flip ? { transform: "scale(-1,1) translate(-200,0)" } : {},
    [
      shadow,
      tail,
      body, belly,
      legs,
      briefcase,
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
