import { Z_TOP } from "../shared/constants";

let host: HTMLDivElement | null = null;
let root: ShadowRoot | null = null;
let stage: HTMLDivElement | null = null;

export function getStage(): HTMLDivElement {
  if (stage) return stage;

  host = document.createElement("div");
  host.id = "cursor-thief-host";
  host.style.cssText = [
    "position: fixed",
    "inset: 0",
    "pointer-events: none",
    `z-index: ${Z_TOP}`,
    "margin: 0",
    "padding: 0",
    "border: 0",
    "background: transparent",
    "overflow: visible",
    "contain: layout style",
  ].join(";");
  document.documentElement.appendChild(host);

  root = host.attachShadow({ mode: "open" });

  const style = document.createElement("style");
  style.textContent = CSS_TEMPLATE;
  root.appendChild(style);

  stage = document.createElement("div");
  stage.className = "stage";
  root.appendChild(stage);

  return stage;
}

export function clearStage(): void {
  if (stage) stage.replaceChildren();
}

export function destroyOverlay(): void {
  if (host && host.parentNode) host.parentNode.removeChild(host);
  host = null;
  root = null;
  stage = null;
}

const CSS_TEMPLATE = `
:host { all: initial; }
.stage {
  position: fixed;
  inset: 0;
  pointer-events: none;
  overflow: visible;
}

/* ─── Actor (creature wrapper) ───────────────────────── */
.actor {
  position: absolute;
  top: 0;
  left: 0;
  will-change: transform, opacity;
  transform-origin: 50% 100%;
}
.actor svg {
  display: block;
  overflow: visible;
}

/* Idle limb life — gentle tail sway */
.actor svg .ct-tail {
  transform-box: fill-box;
  transform-origin: 0% 50%;
}
@keyframes ct-tail-wag-idle {
  0%, 100% { transform: rotate(-3deg); }
  50%      { transform: rotate( 5deg); }
}
.actor.idle svg .ct-tail {
  animation: ct-tail-wag-idle 1400ms infinite ease-in-out;
}

/* Scampering — fast bob, alternating legs, floppy tail, head bob */
@keyframes ct-scamper-bob {
  0%, 100% { transform: translateY(0)   rotate(-1deg); }
  50%      { transform: translateY(-4px) rotate( 1deg); }
}
.actor.scamper svg {
  animation: ct-scamper-bob 220ms infinite ease-in-out;
}

.actor svg .ct-leg-l, .actor svg .ct-leg-r {
  transform-box: fill-box;
  transform-origin: 50% 10%;
}
@keyframes ct-leg-l-run {
  0%, 100% { transform: rotate(-14deg) translateY(-2px); }
  50%      { transform: rotate( 10deg) translateY( 0px); }
}
@keyframes ct-leg-r-run {
  0%, 100% { transform: rotate( 10deg) translateY( 0px); }
  50%      { transform: rotate(-14deg) translateY(-2px); }
}
.actor.scamper svg .ct-leg-l { animation: ct-leg-l-run 220ms infinite ease-in-out; }
.actor.scamper svg .ct-leg-r { animation: ct-leg-r-run 220ms infinite ease-in-out; }

.actor svg .ct-tail {
  transform-box: fill-box;
  transform-origin: 0% 50%;
}
@keyframes ct-tail-wag-run {
  0%, 100% { transform: rotate(-12deg); }
  50%      { transform: rotate( 14deg); }
}
.actor.scamper svg .ct-tail {
  animation: ct-tail-wag-run 220ms infinite ease-in-out;
}

.actor svg .ct-head {
  transform-box: fill-box;
  transform-origin: 50% 100%;
}
@keyframes ct-head-bob-run {
  0%, 100% { transform: translateY(0) rotate(-1deg); }
  50%      { transform: translateY(-1.5px) rotate(1deg); }
}
.actor.scamper svg .ct-head {
  animation: ct-head-bob-run 220ms infinite ease-in-out;
}

/* Skid-stop landing — squash + recoil */
@keyframes ct-skid {
  0%   { transform: scaleY(1) translateY(0); }
  40%  { transform: scaleY(0.86) translateY(2px); }
  75%  { transform: scaleY(1.06) translateY(-2px); }
  100% { transform: scaleY(1) translateY(0); }
}
.actor.skid svg {
  animation: ct-skid 320ms ease-out;
}

/* Grabbing — body leans forward, arm reaches & yanks back */
@keyframes ct-lean {
  0%   { transform: rotate(0deg) translateX(0); }
  30%  { transform: rotate(6deg) translateX(2px); }
  70%  { transform: rotate(-4deg) translateX(-3px); }
  100% { transform: rotate(0deg) translateX(0); }
}
.actor.grab svg {
  animation: ct-lean 360ms ease-in-out;
}

.actor svg .ct-arm {
  transform-box: fill-box;
  transform-origin: 0% 0%;
}
@keyframes ct-arm-grab {
  0%   { transform: rotate(0deg) translate(0,0); }
  25%  { transform: rotate(-22deg) translate(-2px, 4px); }
  60%  { transform: rotate( 28deg) translate( 4px,-2px) scale(1.05); }
  100% { transform: rotate(0deg) translate(0,0); }
}
.actor.grab svg .ct-arm {
  animation: ct-arm-grab 360ms ease-in-out;
}

/* Idle look-around: head tilts side to side every couple of seconds */
@keyframes ct-look {
  0%, 35%, 65%, 100% { transform: rotate(0deg); }
  45%                 { transform: rotate(-7deg); }
  55%                 { transform: rotate( 7deg); }
}
.actor.idle svg .ct-head {
  animation: ct-look 2400ms infinite ease-in-out;
}

/* ─── Speech bubble ──────────────────────────────────── */
.bubble {
  position: absolute;
  top: 0;
  left: 0;
  max-width: 240px;
  padding: 10px 14px 16px;
  background: #FFFEF8;
  color: #2A2620;
  border: 2.4px solid #2A2620;
  border-radius: 14px;
  font-family: 'Caveat', 'Marker Felt', cursive;
  font-size: 16px;
  line-height: 1.2;
  box-shadow: 3px 3px 0 #2A2620;
  will-change: transform, opacity;
  transform-origin: 50% 100%;
}
.bubble::after {
  content: "";
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 12px solid #FFFEF8;
  filter: drop-shadow(0 2px 0 #2A2620);
}

/* ─── Selection fade overlay (briefly highlights, then gets scraped) ─── */
.ghost {
  position: absolute;
  pointer-events: none;
  background: rgba(180, 200, 255, 0.22);
  mix-blend-mode: multiply;
  border-radius: 2px;
  will-change: opacity;
}

/* ─── Scrape cover — paper-colored block that sweeps over the text  ──
   so it visibly disappears during the heist. Sampled page bg falls
   back to white via the --ct-paper custom property set in JS. */
.cover {
  position: absolute;
  pointer-events: none;
  background: var(--ct-paper, #ffffff);
  /* Subtle scrape texture so the cover doesn't look like a flat block. */
  background-image:
    repeating-linear-gradient(
      135deg,
      transparent 0px,
      transparent 5px,
      rgba(0,0,0,0.045) 5px,
      rgba(0,0,0,0.045) 9px
    );
  background-blend-mode: multiply;
  /* Oversize slightly so the scrape edge eats any strikethrough underline. */
  margin: -2px -1px;
  padding: 2px 1px;
  will-change: clip-path, opacity;
}

/* ─── Word particle (a single character flying off the page) ─ */
.particle {
  position: absolute;
  pointer-events: none;
  font-family: Georgia, 'Playfair Display', serif;
  font-size: 14px;
  color: #2A2620;
  font-weight: 600;
  text-shadow: 1px 1px 0 rgba(255,255,255,0.7);
  will-change: transform, opacity;
  white-space: nowrap;
}

/* ─── Comic burst — "YOINK!" ─────────────────────────── */
.burst {
  position: absolute;
  pointer-events: none;
  font-family: 'Special Elite', 'Marker Felt', monospace;
  font-weight: 800;
  font-size: 28px;
  color: #1B1A24;
  background: #E8B547;
  padding: 6px 14px 8px;
  border: 2.4px solid #1B1A24;
  border-radius: 6px;
  box-shadow: 3px 3px 0 #1B1A24;
  letter-spacing: 1px;
  transform-origin: 30% 70%;
  will-change: transform, opacity;
}

/* ─── Scrape marks — diagonal slashes left on the prose ── */
.scrape-mark {
  position: absolute;
  pointer-events: none;
  width: 14px;
  height: 2px;
  background: #1B1A24;
  border-radius: 1px;
  opacity: 0.8;
  will-change: transform, opacity;
}

/* ─── Sparkles when text returns ─────────────────────── */
.sparkle {
  position: absolute;
  pointer-events: none;
  will-change: transform, opacity;
}

/* ─── Dust puff for entry / exit ─────────────────────── */
.puff {
  position: absolute;
  pointer-events: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(213,210,203,0.85) 0%, rgba(213,210,203,0) 70%);
  will-change: transform, opacity;
}

/* ─── Sticky note "thx!" left after restoration ────── */
.note {
  position: absolute;
  pointer-events: none;
  font-family: 'Caveat', 'Marker Felt', cursive;
  font-size: 22px;
  color: #E8743C;
  font-weight: 700;
  text-shadow: 1px 1px 0 rgba(255,255,255,0.6);
  will-change: transform, opacity;
}
`;
