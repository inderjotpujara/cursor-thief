export type CharacterId = "rascal" | "pip" | "sly" | "gloop" | "snatch" | "fingers";

export const CHARACTER_IDS: CharacterId[] = ["rascal", "pip", "sly", "gloop", "snatch", "fingers"];

export type CharacterMeta = {
  id: CharacterId;
  name: string;
  tag: string;
  emoji: string;
};

export const CHARACTERS: Record<CharacterId, CharacterMeta> = {
  rascal:  { id: "rascal",  name: "Rascal",  tag: "the original menace",          emoji: "🦝" },
  pip:     { id: "pip",     name: "Pip",     tag: "noir mouse, very hush-hush",   emoji: "🐭" },
  sly:     { id: "sly",     name: "Sly",     tag: "reads what he steals",         emoji: "🦊" },
  gloop:   { id: "gloop",   name: "Gloop",   tag: "sticky-fingered amphibian",    emoji: "🐸" },
  snatch:  { id: "snatch",  name: "Snatch",  tag: "shiny things only",            emoji: "🐦" },
  fingers: { id: "fingers", name: "Fingers", tag: "eight grabs, zero conscience", emoji: "🐙" },
};

export type Settings = {
  enabled: boolean;
  selectedCharacter: CharacterId;
  perSiteOverrides: Record<string, boolean>;
  /* How long the creature lingers post-steal so the user can read the
     stolen text in the speech bubble (ms). 0 means no pause. */
  lingerMs: number;
};

export const DEFAULT_SETTINGS: Settings = {
  enabled: true,
  selectedCharacter: "rascal",
  perSiteOverrides: {},
  lingerMs: 1800,
};

export const LINGER_PRESETS: { label: string; value: number }[] = [
  { label: "no pause", value: 0 },
  { label: "quick (1s)", value: 1000 },
  { label: "comfy (1.8s)", value: 1800 },
  { label: "patient (3s)", value: 3000 },
  { label: "leisurely (5s)", value: 5000 },
];

export type Stats = {
  stealCount: number;
  totalHeistMs: number;
  lastHeistAt: number | null;
};

export const DEFAULT_STATS: Stats = {
  stealCount: 0,
  totalHeistMs: 0,
  lastHeistAt: null,
};

export type Pose = "idle" | "run" | "carry" | "drop";

export type Message =
  | { type: "GET_STATE" }
  | { type: "STATE"; settings: Settings; stats: Stats; site: string }
  | { type: "SET_ENABLED"; value: boolean }
  | { type: "SET_SITE_ENABLED"; hostname: string; value: boolean }
  | { type: "SET_CHARACTER"; value: CharacterId }
  | { type: "SET_LINGER"; value: number }
  | { type: "HEIST_COMPLETED"; durationMs: number }
  | { type: "SETTINGS_CHANGED"; settings: Settings };
