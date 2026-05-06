import browser from "webextension-polyfill";
import {
  DEFAULT_SETTINGS,
  DEFAULT_STATS,
  type Settings,
  type Stats,
} from "./types";

const SETTINGS_KEY = "settings";
const STATS_KEY = "stats";

export async function getSettings(): Promise<Settings> {
  const got = await browser.storage.sync.get(SETTINGS_KEY);
  const stored = got[SETTINGS_KEY] as Partial<Settings> | undefined;
  return { ...DEFAULT_SETTINGS, ...(stored ?? {}) };
}

export async function setSettings(patch: Partial<Settings>): Promise<Settings> {
  const next = { ...(await getSettings()), ...patch };
  await browser.storage.sync.set({ [SETTINGS_KEY]: next });
  return next;
}

export async function getStats(): Promise<Stats> {
  const got = await browser.storage.local.get(STATS_KEY);
  const stored = got[STATS_KEY] as Partial<Stats> | undefined;
  return { ...DEFAULT_STATS, ...(stored ?? {}) };
}

export async function bumpStats(durationMs: number): Promise<Stats> {
  const cur = await getStats();
  const next: Stats = {
    stealCount: cur.stealCount + 1,
    totalHeistMs: cur.totalHeistMs + durationMs,
    lastHeistAt: Date.now(),
  };
  await browser.storage.local.set({ [STATS_KEY]: next });
  return next;
}

export function isSiteEnabled(settings: Settings, hostname: string): boolean {
  if (!settings.enabled) return false;
  const override = settings.perSiteOverrides[hostname];
  return override === undefined ? true : override;
}

export function onSettingsChanged(handler: (settings: Settings) => void): () => void {
  const listener = (changes: Record<string, browser.Storage.StorageChange>, area: string) => {
    if (area !== "sync") return;
    const change = changes[SETTINGS_KEY];
    if (!change) return;
    const next = { ...DEFAULT_SETTINGS, ...((change.newValue as Partial<Settings>) ?? {}) };
    handler(next);
  };
  browser.storage.onChanged.addListener(listener);
  return () => browser.storage.onChanged.removeListener(listener);
}

export function onStatsChanged(handler: (stats: Stats) => void): () => void {
  const listener = (changes: Record<string, browser.Storage.StorageChange>, area: string) => {
    if (area !== "local") return;
    const change = changes[STATS_KEY];
    if (!change) return;
    const next = { ...DEFAULT_STATS, ...((change.newValue as Partial<Stats>) ?? {}) };
    handler(next);
  };
  browser.storage.onChanged.addListener(listener);
  return () => browser.storage.onChanged.removeListener(listener);
}
