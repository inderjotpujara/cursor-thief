/* Content script entry point. Watches for non-collapsed selections in
   non-editable elements and runs a heist. Stays out of the way otherwise. */
import browser from "webextension-polyfill";
import { captureSelection } from "./selection";
import { runHeist, isInFlight } from "./heist";
import { getSettings, isSiteEnabled, onSettingsChanged } from "../shared/storage";
import type { Message, Settings } from "../shared/types";

let cachedSettings: Settings | null = null;

async function ensureSettings(): Promise<Settings> {
  if (!cachedSettings) cachedSettings = await getSettings();
  return cachedSettings;
}

onSettingsChanged(s => { cachedSettings = s; });

browser.runtime.onMessage.addListener((raw: unknown) => {
  const msg = raw as Message;
  if (msg.type === "SETTINGS_CHANGED") {
    cachedSettings = msg.settings;
  }
  return undefined;
});

document.addEventListener("mouseup", async () => {
  /* Defer one frame so the browser finalizes the selection (otherwise Safari
     and Firefox sometimes report stale rects). */
  await new Promise(r => requestAnimationFrame(() => r(undefined)));

  if (isInFlight()) return;

  const settings = await ensureSettings();
  if (!isSiteEnabled(settings, location.hostname)) return;

  const info = captureSelection();
  if (!info) return;

  void runHeist(info, settings.selectedCharacter, settings.lingerMs);
});
