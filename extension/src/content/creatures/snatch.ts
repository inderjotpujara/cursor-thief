import { h } from "./h";
import type { Pose } from "../../shared/types";

type RenderOptions = { pose?: Pose; flip?: boolean; width?: number };

const INK = "#2A2620";
const PAPER = "#F5EFE2";
const MUSTARD = "#E8B547";

export default function snatch(opts: RenderOptions = {}): SVGElement {
  const { flip = false, width = 88 } = opts;

  const shadow = h("ellipse", {
    cx: "100", cy: "168", rx: "36", ry: "4",
    fill: INK, opacity: "0.18",
  });

  // Tail feathers
  const tailFeather = h("path", {
    d: "M138 130 Q170 130 178 152 Q168 156 156 150 Q146 142 138 130 Z",
    fill: "#1B1A24", stroke: INK, "stroke-width": "2.4", "stroke-linejoin": "round",
  });
  const tailSheen = h("path", {
    d: "M150 138 Q165 142 170 150",
    fill: "none", stroke: "#3A3645", "stroke-width": "1.4",
  });
  const tailGroup = h("g", { class: "ct-tail" }, [tailFeather, tailSheen]);

  // Body — black with white belly
  const body = h("path", {
    d: "M62 110 Q58 80 80 68 Q100 60 120 68 Q142 80 138 116 Q140 150 116 158 Q100 162 84 158 Q60 150 62 110 Z",
    fill: "#1B1A24", stroke: INK, "stroke-width": "2.6", "stroke-linejoin": "round",
  });

  // White belly patch
  const belly = h("path", {
    d: "M80 102 Q76 132 88 152 Q100 156 112 152 Q124 132 120 102 Q100 96 80 102 Z",
    fill: PAPER, stroke: INK, "stroke-width": "2",
  });

  // Wing — tucked, with iridescent shine
  const wing = h("path", {
    d: "M124 90 Q142 100 138 130 Q132 138 122 134 Q116 110 124 90 Z",
    fill: "#25232F", stroke: INK, "stroke-width": "2.2", "stroke-linejoin": "round",
  });
  const wingSheen1 = h("path", {
    d: "M128 100 Q138 108 134 124",
    fill: "none", stroke: "#5C6E4A", "stroke-width": "1.8", opacity: "0.8",
  });
  const wingSheen2 = h("path", {
    d: "M130 96 Q136 104 132 116",
    fill: "none", stroke: "#3A6B6B", "stroke-width": "1.4", opacity: "0.7",
  });

  // Legs — stick thin, mustard colored
  const legLeftShaft = h("line", { x1: "88", y1: "158", x2: "86", y2: "172", stroke: MUSTARD, "stroke-width": "2.4", "stroke-linecap": "round" });
  const legLeftToeA = h("line", { x1: "86", y1: "172", x2: "80", y2: "173", stroke: MUSTARD, "stroke-width": "2", "stroke-linecap": "round" });
  const legLeftToeB = h("line", { x1: "86", y1: "172", x2: "92", y2: "173", stroke: MUSTARD, "stroke-width": "2", "stroke-linecap": "round" });
  const legRightShaft = h("line", { x1: "112", y1: "158", x2: "114", y2: "172", stroke: MUSTARD, "stroke-width": "2.4", "stroke-linecap": "round" });
  const legRightToeA = h("line", { x1: "114", y1: "172", x2: "108", y2: "173", stroke: MUSTARD, "stroke-width": "2", "stroke-linecap": "round" });
  const legRightToeB = h("line", { x1: "114", y1: "172", x2: "120", y2: "173", stroke: MUSTARD, "stroke-width": "2", "stroke-linecap": "round" });

  // Satchel slung across
  const satchelStrap = h("path", {
    d: "M70 86 Q100 96 130 88",
    fill: "none", stroke: "#8B6240", "stroke-width": "2.4", "stroke-linecap": "round",
  });
  const satchelBag = h("path", {
    d: "M0 0 Q-2 16 4 22 Q14 24 20 22 Q26 16 24 0 Q22 -4 12 -4 Q2 -4 0 0 Z",
    fill: "#8B6240", stroke: INK, "stroke-width": "2.2", "stroke-linejoin": "round",
  });
  const satchelFlap = h("path", {
    d: "M0 0 Q12 -8 24 0",
    fill: "none", stroke: INK, "stroke-width": "1.8",
  });
  const satchelClasp = h("circle", {
    cx: "12", cy: "10", r: "2.5",
    fill: MUSTARD, stroke: INK, "stroke-width": "1.2",
  });
  const satchelGroup = h("g", { transform: "translate(58 110) rotate(-8)", class: "ct-sack" }, [
    satchelBag, satchelFlap, satchelClasp,
  ]);

  // Head — round, black
  const head = h("circle", {
    cx: "100", cy: "62", r: "26",
    fill: "#1B1A24", stroke: INK, "stroke-width": "2.6",
  });

  // White face patch
  const facePatch = h("path", {
    d: "M84 64 Q88 78 100 80 Q112 78 116 64 Q108 58 100 60 Q92 58 84 64 Z",
    fill: PAPER, stroke: INK, "stroke-width": "1.8",
  });

  // Beak — orange, pointy (pointing left)
  const beak = h("path", {
    d: "M96 74 L80 82 L96 80 Z",
    fill: MUSTARD, stroke: INK, "stroke-width": "2", "stroke-linejoin": "round",
  });
  const beakLine = h("line", {
    x1: "80", y1: "82", x2: "96", y2: "78",
    stroke: INK, "stroke-width": "1.2",
  });

  // Eye + monocle (right eye)
  const eyeRightWhite = h("circle", { cx: "108", cy: "60", r: "3.2", fill: PAPER });
  const eyeRightPupil = h("circle", { cx: "108", cy: "60", r: "1.8", fill: INK });
  const monocle = h("circle", {
    cx: "108", cy: "60", r: "9",
    fill: "none", stroke: MUSTARD, "stroke-width": "2.4",
  });
  const monocleChain = h("line", {
    x1: "115", y1: "66", x2: "122", y2: "78",
    stroke: MUSTARD, "stroke-width": "1.8", "stroke-linecap": "round",
  });

  // Left eye — small dot
  const eyeLeftWhite = h("circle", { cx: "92", cy: "58", r: "2", fill: PAPER });
  const eyeLeftPupil = h("circle", { cx: "92", cy: "58", r: "1", fill: INK });

  // Head feathers
  const feather1 = h("path", {
    d: "M92 38 L88 30 L96 36",
    fill: "#1B1A24", stroke: INK, "stroke-width": "1.6", "stroke-linejoin": "round",
  });
  const feather2 = h("path", {
    d: "M104 36 L106 28 L110 38",
    fill: "#1B1A24", stroke: INK, "stroke-width": "1.6", "stroke-linejoin": "round",
  });

  const legL = h("g", { class: "ct-leg-l" }, [legLeftShaft, legLeftToeA, legLeftToeB]);
  const legR = h("g", { class: "ct-leg-r" }, [legRightShaft, legRightToeA, legRightToeB]);
  const legs = h("g", { class: "ct-legs" }, [legL, legR]);

  const arm = h("g", { class: "ct-arm" }, [satchelStrap]);

  const headGroup = h("g", { class: "ct-head" }, [
    feather1, feather2,
    head,
    facePatch,
    beak, beakLine,
    eyeRightWhite, eyeRightPupil,
    monocle, monocleChain,
    eyeLeftWhite, eyeLeftPupil,
  ]);

  const inner = h(
    "g",
    flip ? { transform: "scale(-1,1) translate(-200,0)" } : {},
    [
      shadow,
      tailGroup,
      body, belly,
      wing, wingSheen1, wingSheen2,
      legs,
      arm, satchelGroup,
      headGroup,
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
