/* The heist orchestrator. Web Animations API drives positioning + opacity;
   CSS-class state on the actor drives limb animation (scamper/grab/idle/skid).

   Visual fade of the original selection is done with absolute-positioned
   "ghost" rectangles in the overlay, layered over the real text via mix-blend.
   The host page's DOM is never mutated, so Cmd+C continues to work against
   the actual selection throughout the animation.
*/
import browser from "webextension-polyfill";
import { renderCreature } from "./creatures";
import { getStage } from "./overlay";
import { TIMINGS, MAX_BUBBLE_CHARS, CREATURE_BASE_WIDTH } from "../shared/constants";
import type { CharacterId } from "../shared/types";
import type { SelectionInfo } from "./selection";

let inFlight = false;

export function isInFlight(): boolean {
  return inFlight;
}

const SIDE_GAP = 14;     // px between creature and selection edge
const STAND_LIFT = 6;    // px the creature is raised above selection center

export async function runHeist(
  info: SelectionInfo,
  character: CharacterId,
  lingerMs = 1800,
): Promise<void> {
  if (inFlight) return;
  inFlight = true;
  const start = performance.now();

  try {
    const stage = getStage();
    /* Read the page background once per heist so the "scrape cover" matches
       the actual paper colour rather than always being white. */
    setPaperColor(stage);
    const ghosts = paintGhosts(stage, info.rects);
    const scrapes = paintScrapes(stage, info.rects);
    const text = truncate(info.text, MAX_BUBBLE_CHARS);

    /* Pick a side. Enter from whichever edge is closer to the selection; that
       way the thief never crosses the prose to get there. */
    const enterFromLeft = info.bounds.left > window.innerWidth / 2;

    const creatureSize = CREATURE_BASE_WIDTH;
    const offscreenStart = enterFromLeft ? -creatureSize - 60 : window.innerWidth + 60;

    /* Park the creature beside the selection (not on top of it). */
    const standY = info.bounds.top + info.bounds.height / 2 - creatureSize / 2 - STAND_LIFT;
    const standX = enterFromLeft
      ? info.bounds.left - creatureSize - SIDE_GAP
      : info.bounds.right + SIDE_GAP;

    /* Creature faces the selection — flip so the SVG's natural facing-right
       points toward the prose. */
    const faceFlip = !enterFromLeft;

    const actor = makeActor(character, faceFlip);
    actor.classList.add("scamper");
    stage.appendChild(actor);

    /* ARRIVE — scamper from off-screen with overshoot, then skid into stance. */
    const overshootX = enterFromLeft
      ? standX - 14
      : standX + 14;

    spawnPuff(stage, offscreenStart + creatureSize / 2, standY + creatureSize - 2);

    await animate(actor, [
      { transform: `translate(${offscreenStart}px, ${standY + 6}px) rotate(${enterFromLeft ? -3 : 3}deg)`, opacity: 0 },
      { transform: `translate(${(offscreenStart + standX) / 2}px, ${standY + 2}px) rotate(${enterFromLeft ? -3 : 3}deg)`, opacity: 1, offset: 0.3 },
      { transform: `translate(${overshootX}px, ${standY - 2}px) rotate(${enterFromLeft ? 4 : -4}deg)`, opacity: 1, offset: 0.85 },
      { transform: `translate(${standX}px, ${standY}px) rotate(0deg)`, opacity: 1 },
    ], { duration: TIMINGS.ARRIVE_MS, easing: "cubic-bezier(.2,.7,.4,1)" });

    /* Settle: stop scampering, play skid recoil, switch to grab pose. */
    actor.classList.remove("scamper");
    actor.classList.add("skid");
    spawnPuff(stage, standX + creatureSize / 2, standY + creatureSize - 4);
    await sleep(160);
    actor.classList.remove("skid");

    /* STEAL — comic burst, scrape marks, word particles fly into bubble. */
    actor.classList.add("grab");

    const bubble = makeBubble(text);
    stage.appendChild(bubble);

    /* Bubble appears above the creature's head, leaning toward the selection. */
    const bubbleX = standX + creatureSize / 2;
    const bubbleY = standY - 4;

    bubble.style.transform = `translate(${bubbleX}px, ${bubbleY}px) translate(-50%, -100%) scale(0.4) rotate(-4deg)`;
    bubble.style.opacity = "0";

    spawnBurst(stage, info.bounds);
    spawnScrapeMarks(stage, info.bounds);
    spawnWordParticles(stage, info.text, info.bounds, bubbleX, bubbleY - 30);

    await Promise.all([
      animate(bubble, [
        { transform: `translate(${bubbleX}px, ${bubbleY}px) translate(-50%, -100%) scale(0.4) rotate(-4deg)`, opacity: 0 },
        { transform: `translate(${bubbleX}px, ${bubbleY - 8}px) translate(-50%, -100%) scale(1.08) rotate(-2deg)`, opacity: 1, offset: 0.55 },
        { transform: `translate(${bubbleX}px, ${bubbleY - 4}px) translate(-50%, -100%) scale(1) rotate(-2deg)`, opacity: 1 },
      ], { duration: TIMINGS.STEAL_MS, easing: "cubic-bezier(.2,.7,.3,1.5)" }),
      sleep(TIMINGS.STEAL_MS),
    ]);

    /* Sweep the scrape cover across the selection — direction matches the
       thief's reach (entered from right → wipe right-to-left, vice versa). */
    sweepScrapes(scrapes, enterFromLeft ? "ltr" : "rtl");
    fadeGhosts(ghosts);

    /* LINGER — thief stays put with the bubble visible so the user can
       read the stolen text. Configurable; 0 = no pause. While idling, the
       creature gets the gentle 'idle' tail-sway / look-around animation. */
    if (lingerMs > 0) {
      actor.classList.remove("grab");
      actor.classList.add("idle");
      /* Tiny "ta-da" lift right after the scrape lands. */
      void actor.animate(
        [
          { transform: actor.style.transform || "none" },
          { transform: `${actor.style.transform || "translate(0,0)"} translateY(-3px)`, offset: 0.5 },
          { transform: actor.style.transform || "none" },
        ],
        { duration: 360, easing: "cubic-bezier(.3,.6,.4,1)" }
      );
      await sleep(lingerMs);
      actor.classList.remove("idle");
    } else {
      actor.classList.remove("grab");
    }

    actor.classList.add("scamper");

    /* EXIT — creature + bubble flee back the way they came. */
    await Promise.all([
      animate(actor, [
        { transform: `translate(${standX}px, ${standY}px) rotate(0deg)` },
        { transform: `translate(${(standX + offscreenStart) / 2}px, ${standY - 6}px) rotate(${enterFromLeft ? 6 : -6}deg)`, offset: 0.4 },
        { transform: `translate(${offscreenStart}px, ${standY - 10}px) rotate(${enterFromLeft ? 8 : -8}deg)` },
      ], { duration: TIMINGS.EXIT_MS, easing: "cubic-bezier(.5,0,.8,.4)" }),
      animate(bubble, [
        { transform: `translate(${bubbleX}px, ${bubbleY - 4}px) translate(-50%, -100%) scale(1) rotate(-2deg)`, opacity: 1 },
        { transform: `translate(${offscreenStart + creatureSize / 2}px, ${bubbleY - 18}px) translate(-50%, -100%) scale(0.95) rotate(${enterFromLeft ? 8 : -8}deg)`, opacity: 1 },
      ], { duration: TIMINGS.EXIT_MS, easing: "cubic-bezier(.5,0,.8,.4)" }),
    ]);

    bubble.remove();
    actor.remove();

    /* WAIT — empty stage, faded selection on the page. */
    await sleep(TIMINGS.WAIT_MS);

    /* RETURN — different creature instance comes back from the OTHER side. */
    const returnFromLeft = !enterFromLeft;
    const returnStartX = returnFromLeft ? -creatureSize - 60 : window.innerWidth + 60;
    const returnFaceFlip = !returnFromLeft;
    const returnStandX = returnFromLeft
      ? info.bounds.left - creatureSize - SIDE_GAP
      : info.bounds.right + SIDE_GAP;

    const returner = makeActor(character, returnFaceFlip);
    returner.classList.add("scamper");
    stage.appendChild(returner);

    spawnPuff(stage, returnStartX + creatureSize / 2, standY + creatureSize - 2);

    await animate(returner, [
      { transform: `translate(${returnStartX}px, ${standY + 6}px) rotate(${returnFromLeft ? -3 : 3}deg)`, opacity: 0 },
      { transform: `translate(${(returnStartX + returnStandX) / 2}px, ${standY + 2}px) rotate(${returnFromLeft ? -3 : 3}deg)`, opacity: 1, offset: 0.4 },
      { transform: `translate(${returnStandX}px, ${standY}px) rotate(0deg)`, opacity: 1 },
    ], { duration: TIMINGS.RETURN_MS, easing: "cubic-bezier(.2,.7,.4,1)" });

    /* RESTORE — retract the scrape cover (text re-emerges), un-fade, sparkles. */
    returner.classList.remove("scamper");
    returner.classList.add("idle");
    retractScrapes(scrapes, returnFromLeft ? "ltr" : "rtl");
    unfadeGhosts(ghosts);
    spawnSparkles(stage, info.bounds);
    spawnThanksNote(stage, returnStandX, standY, returnFromLeft);
    await sleep(220);
    returner.classList.remove("idle");
    returner.classList.add("scamper");

    const returnExitX = returnFromLeft ? window.innerWidth + 60 : -creatureSize - 60;

    await animate(returner, [
      { transform: `translate(${returnStandX}px, ${standY}px) rotate(0deg)`, opacity: 1 },
      { transform: `translate(${returnExitX}px, ${standY + 8}px) rotate(${returnFromLeft ? -6 : 6}deg)`, opacity: 1, offset: 0.85 },
      { transform: `translate(${returnExitX}px, ${standY + 12}px) rotate(${returnFromLeft ? -6 : 6}deg)`, opacity: 0 },
    ], { duration: TIMINGS.RESTORE_MS, easing: "cubic-bezier(.5,0,.8,.4)" });

    returner.remove();
    removeGhosts(ghosts);
    removeScrapes(scrapes);

    const durationMs = performance.now() - start;
    void browser.runtime.sendMessage({ type: "HEIST_COMPLETED", durationMs });
  } catch (e) {
    console.warn("[cursor-thief] heist aborted", e);
  } finally {
    inFlight = false;
  }
}

function makeActor(id: CharacterId, flip: boolean): HTMLDivElement {
  const wrap = document.createElement("div");
  wrap.className = "actor";
  wrap.style.width = `${CREATURE_BASE_WIDTH}px`;
  wrap.style.height = `${CREATURE_BASE_WIDTH * 0.9}px`;
  wrap.appendChild(renderCreature(id, { pose: "idle", flip, width: CREATURE_BASE_WIDTH }));
  return wrap;
}

function makeBubble(text: string): HTMLDivElement {
  const b = document.createElement("div");
  b.className = "bubble";
  b.textContent = `"${text}"`;
  return b;
}

function paintGhosts(stage: HTMLDivElement, rects: DOMRect[]): HTMLDivElement[] {
  return rects.map(r => {
    const g = document.createElement("div");
    g.className = "ghost";
    g.style.left = `${r.left}px`;
    g.style.top = `${r.top}px`;
    g.style.width = `${r.width}px`;
    g.style.height = `${r.height}px`;
    g.style.opacity = "0";
    stage.appendChild(g);
    void g.animate(
      [{ opacity: 0 }, { opacity: 1 }],
      { duration: 180, fill: "forwards" }
    );
    return g;
  });
}

function fadeGhosts(ghosts: HTMLDivElement[]): void {
  /* Fade the highlight to nothing under the scrape — the scrape itself is
     now the dominant visual signal that the text has been taken. */
  for (const g of ghosts) {
    void g.animate(
      [{ opacity: 1 }, { opacity: 0.25 }],
      { duration: 220, fill: "forwards" }
    );
  }
}
function unfadeGhosts(ghosts: HTMLDivElement[]): void {
  for (const g of ghosts) {
    void g.animate(
      [{ opacity: 0.25 }, { opacity: 0 }],
      { duration: 220, fill: "forwards" }
    );
  }
}

/* clip-path polygons describe the VISIBLE area of the cover.

   ltr sweep: cover grows from left edge rightward. Vertices clockwise from
   top-left → top-right → bottom-right → bottom-left. The right two
   vertices are the diagonal "scraper edge" that advances over time.

      none:    (0,0) (0,0)   (0,100) (0,100)         empty parallelogram
      half:    (0,0) (60,0)  (50,100) (0,100)        scraper at ~55%
      full:    (0,0) (110,0) (100,100) (0,100)       fully covered
*/
function paintScrapes(stage: HTMLDivElement, rects: DOMRect[]): HTMLDivElement[] {
  return rects.map(r => {
    const s = document.createElement("div");
    s.className = "cover";
    s.style.left = `${r.left}px`;
    s.style.top = `${r.top}px`;
    s.style.width = `${r.width}px`;
    s.style.height = `${r.height}px`;
    s.style.opacity = "0";
    /* Default: nothing covered (degenerate polygon at left edge). */
    s.style.clipPath = "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)";
    stage.appendChild(s);
    return s;
  });
}

function sweepScrapes(scrapes: HTMLDivElement[], dir: "ltr" | "rtl"): void {
  scrapes.forEach((s, i) => {
    const from = dir === "ltr"
      ? "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"
      : "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)";
    const to = dir === "ltr"
      ? "polygon(0% 0%, 110% 0%, 100% 100%, 0% 100%)"
      : "polygon(100% 0%, -10% 0%, 0% 100%, 100% 100%)";
    void s.animate(
      [
        { clipPath: from, opacity: 0.6 },
        { clipPath: to,   opacity: 1 },
      ],
      { duration: 320, delay: i * 40, easing: "cubic-bezier(.4,.1,.6,1)", fill: "forwards" }
    );
  });
}

function retractScrapes(scrapes: HTMLDivElement[], dir: "ltr" | "rtl"): void {
  scrapes.forEach((s, i) => {
    const from = dir === "ltr"
      ? "polygon(0% 0%, 110% 0%, 100% 100%, 0% 100%)"
      : "polygon(100% 0%, -10% 0%, 0% 100%, 100% 100%)";
    /* Retract from the OPPOSITE side — cover gets pulled away by the
       returning thief's reach. */
    const to = dir === "ltr"
      ? "polygon(110% 0%, 110% 0%, 100% 100%, 100% 100%)"
      : "polygon(-10% 0%, -10% 0%, 0% 100%, 0% 100%)";
    void s.animate(
      [
        { clipPath: from, opacity: 1 },
        { clipPath: to,   opacity: 0 },
      ],
      { duration: 360, delay: i * 40, easing: "cubic-bezier(.4,.1,.6,1)", fill: "forwards" }
    );
  });
}

function removeScrapes(scrapes: HTMLDivElement[]): void {
  for (const s of scrapes) s.remove();
}

function setPaperColor(stage: HTMLDivElement): void {
  /* Walk up from the body looking for the first non-transparent background
     colour. If everything is transparent, default to white — most pages
     render against a white canvas anyway. */
  let el: Element | null = document.body;
  let color = "";
  while (el) {
    const bg = getComputedStyle(el).backgroundColor;
    if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") {
      color = bg;
      break;
    }
    el = el.parentElement;
  }
  /* Find the host so we can set the custom property on the stage's parent. */
  if (!color) color = "#ffffff";
  stage.style.setProperty("--ct-paper", color);
}
function removeGhosts(ghosts: HTMLDivElement[]): void {
  for (const g of ghosts) {
    void g.animate(
      [{ opacity: 1 }, { opacity: 0 }],
      { duration: 220, fill: "forwards" }
    ).finished.then(() => g.remove(), () => g.remove());
  }
}

function spawnBurst(stage: HTMLDivElement, bounds: DOMRect): void {
  const burst = document.createElement("div");
  burst.className = "burst";
  /* Vary the punchline so repeat heists feel less deterministic. */
  const lines = ["YOINK!", "GOTCHA!", "MINE NOW", "SHHH!", "BORROWED!", "POACHED!"];
  burst.textContent = lines[Math.floor(Math.random() * lines.length)];
  const x = bounds.left + bounds.width / 2;
  const y = bounds.top - 12;
  burst.style.left = "0";
  burst.style.top = "0";
  burst.style.transform = `translate(${x}px, ${y}px) translate(-50%, -100%) scale(0) rotate(-12deg)`;
  burst.style.opacity = "0";
  stage.appendChild(burst);

  void burst.animate(
    [
      { transform: `translate(${x}px, ${y}px) translate(-50%, -100%) scale(0) rotate(-12deg)`, opacity: 0 },
      { transform: `translate(${x}px, ${y - 6}px) translate(-50%, -100%) scale(1.15) rotate(-8deg)`, opacity: 1, offset: 0.4 },
      { transform: `translate(${x}px, ${y - 4}px) translate(-50%, -100%) scale(1) rotate(-6deg)`, opacity: 1, offset: 0.6 },
      { transform: `translate(${x}px, ${y - 14}px) translate(-50%, -100%) scale(0.85) rotate(-12deg)`, opacity: 0 },
    ],
    { duration: 520, easing: "cubic-bezier(.2,.7,.3,1.5)", fill: "forwards" }
  ).finished.then(() => burst.remove(), () => burst.remove());
}

function spawnScrapeMarks(stage: HTMLDivElement, bounds: DOMRect): void {
  const count = 4;
  for (let i = 0; i < count; i++) {
    const s = document.createElement("div");
    s.className = "scrape-mark";
    const x = bounds.left + bounds.width * (0.15 + Math.random() * 0.7);
    const y = bounds.top + bounds.height * (0.2 + Math.random() * 0.6);
    s.style.left = `${x}px`;
    s.style.top = `${y}px`;
    s.style.transform = `rotate(${30 + Math.random() * 30}deg)`;
    s.style.opacity = "0";
    stage.appendChild(s);
    void s.animate(
      [
        { opacity: 0, transform: `rotate(${30 + Math.random() * 30}deg) scaleX(0)` },
        { opacity: 0.8, transform: `rotate(${30 + Math.random() * 30}deg) scaleX(1)`, offset: 0.4 },
        { opacity: 0.8, transform: `rotate(${30 + Math.random() * 30}deg) scaleX(1)`, offset: 0.7 },
        { opacity: 0, transform: `rotate(${30 + Math.random() * 30}deg) scaleX(1)` },
      ],
      { duration: 600 + Math.random() * 200, delay: i * 40, easing: "ease-out", fill: "forwards" }
    ).finished.then(() => s.remove(), () => s.remove());
  }
}

function spawnWordParticles(
  stage: HTMLDivElement,
  text: string,
  bounds: DOMRect,
  bubbleX: number,
  bubbleY: number,
): void {
  /* Pick a few short words from the selection and fly them on a curved path
     from somewhere in the selection rect into the bubble. */
  const words = text
    .replace(/\s+/g, " ")
    .split(" ")
    .filter(w => /[A-Za-z0-9]/.test(w));
  if (words.length === 0) return;

  const pickCount = Math.min(words.length, 6);
  /* Sample evenly across the words for visual coverage. */
  const picks: string[] = [];
  for (let i = 0; i < pickCount; i++) {
    const idx = Math.floor((i / pickCount) * words.length);
    picks.push(words[idx]);
  }

  picks.forEach((word, i) => {
    const p = document.createElement("div");
    p.className = "particle";
    p.textContent = word;

    const sx = bounds.left + bounds.width * (0.1 + Math.random() * 0.8);
    const sy = bounds.top + bounds.height * (0.1 + Math.random() * 0.8);

    /* Mid-arc control point — between source and bubble, lifted up. */
    const mx = (sx + bubbleX) / 2 + (Math.random() - 0.5) * 60;
    const my = Math.min(sy, bubbleY) - 50 - Math.random() * 30;

    p.style.left = "0";
    p.style.top = "0";
    p.style.transform = `translate(${sx}px, ${sy}px) rotate(0deg) scale(0.6)`;
    p.style.opacity = "0";
    stage.appendChild(p);

    const delay = i * 36;
    const dur = 420 + Math.random() * 80;

    void p.animate(
      [
        { transform: `translate(${sx}px, ${sy}px) rotate(0deg) scale(0.6)`, opacity: 0 },
        { transform: `translate(${sx}px, ${sy}px) rotate(${(Math.random() - 0.5) * 30}deg) scale(1)`, opacity: 1, offset: 0.15 },
        { transform: `translate(${mx}px, ${my}px) rotate(${(Math.random() - 0.5) * 60}deg) scale(0.95)`, opacity: 1, offset: 0.55 },
        { transform: `translate(${bubbleX}px, ${bubbleY}px) rotate(${(Math.random() - 0.5) * 40}deg) scale(0.55)`, opacity: 0 },
      ],
      { duration: dur, delay, easing: "cubic-bezier(.4,.1,.6,1)", fill: "forwards" }
    ).finished.then(() => p.remove(), () => p.remove());
  });
}

function spawnPuff(stage: HTMLDivElement, x: number, y: number): void {
  for (let i = 0; i < 3; i++) {
    const p = document.createElement("div");
    p.className = "puff";
    p.style.left = "0";
    p.style.top = "0";
    p.style.opacity = "0";
    stage.appendChild(p);
    const dx = (Math.random() - 0.5) * 24;
    void p.animate(
      [
        { transform: `translate(${x}px, ${y}px) translate(-50%, -50%) scale(0.4)`, opacity: 0 },
        { transform: `translate(${x + dx * 0.4}px, ${y - 4}px) translate(-50%, -50%) scale(1)`, opacity: 0.8, offset: 0.4 },
        { transform: `translate(${x + dx}px, ${y - 12}px) translate(-50%, -50%) scale(1.4)`, opacity: 0 },
      ],
      { duration: 480 + i * 40, delay: i * 30, easing: "ease-out", fill: "forwards" }
    ).finished.then(() => p.remove(), () => p.remove());
  }
}

function spawnSparkles(stage: HTMLDivElement, bounds: DOMRect): void {
  const count = 10;
  for (let i = 0; i < count; i++) {
    const s = document.createElement("div");
    s.className = "sparkle";
    const x = bounds.left + Math.random() * bounds.width;
    const y = bounds.top + Math.random() * bounds.height;
    s.style.left = "0";
    s.style.top = "0";
    s.style.width = "10px";
    s.style.height = "10px";
    s.style.background = "radial-gradient(circle, #E8B547 0%, #E8B547 30%, transparent 60%)";
    stage.appendChild(s);
    void s.animate(
      [
        { transform: `translate(${x}px, ${y}px) translate(-50%, -50%) scale(0)`, opacity: 0 },
        { transform: `translate(${x}px, ${y}px) translate(-50%, -50%) scale(1.3)`, opacity: 1, offset: 0.4 },
        { transform: `translate(${x}px, ${y}px) translate(-50%, -50%) scale(0.6)`, opacity: 0 },
      ],
      { duration: 600 + Math.random() * 200, easing: "ease-out", delay: i * 30, fill: "forwards" }
    ).finished.then(() => s.remove(), () => s.remove());
  }
}

function spawnThanksNote(
  stage: HTMLDivElement,
  standX: number,
  standY: number,
  fromLeft: boolean,
): void {
  const note = document.createElement("div");
  note.className = "note";
  const lines = ["thx! ♥", "no harm done!", "as promised!", "all yours!", "🤝"];
  note.textContent = lines[Math.floor(Math.random() * lines.length)];

  const x = fromLeft ? standX + CREATURE_BASE_WIDTH + 6 : standX - 8;
  const y = standY - 14;

  note.style.left = "0";
  note.style.top = "0";
  note.style.transform = `translate(${x}px, ${y}px) translate(${fromLeft ? "0" : "-100%"}, 0) rotate(-6deg) scale(0.4)`;
  note.style.opacity = "0";
  stage.appendChild(note);

  void note.animate(
    [
      { transform: `translate(${x}px, ${y}px) translate(${fromLeft ? "0" : "-100%"}, 0) rotate(-6deg) scale(0.4)`, opacity: 0 },
      { transform: `translate(${x}px, ${y - 4}px) translate(${fromLeft ? "0" : "-100%"}, 0) rotate(-6deg) scale(1.1)`, opacity: 1, offset: 0.5 },
      { transform: `translate(${x}px, ${y - 6}px) translate(${fromLeft ? "0" : "-100%"}, 0) rotate(-6deg) scale(1)`, opacity: 1, offset: 0.8 },
      { transform: `translate(${x}px, ${y - 14}px) translate(${fromLeft ? "0" : "-100%"}, 0) rotate(-6deg) scale(0.9)`, opacity: 0 },
    ],
    { duration: 1100, easing: "cubic-bezier(.2,.7,.3,1.5)", fill: "forwards" }
  ).finished.then(() => note.remove(), () => note.remove());
}

function animate(
  el: Element,
  keyframes: Keyframe[],
  options: KeyframeAnimationOptions,
): Promise<void> {
  const a = el.animate(keyframes, { fill: "forwards", ...options });
  return a.finished.then(
    () => { try { a.commitStyles(); } catch { /* element gone */ } a.cancel(); },
    () => { /* cancelled */ }
  );
}

function sleep(ms: number): Promise<void> {
  return new Promise(r => setTimeout(r, ms));
}

function truncate(text: string, max: number): string {
  const t = text.replace(/\s+/g, " ").trim();
  return t.length <= max ? t : t.slice(0, max - 1).trimEnd() + "…";
}
