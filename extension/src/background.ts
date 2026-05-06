import browser from "webextension-polyfill";
import { onMessage } from "./shared/messages";
import {
  getSettings,
  setSettings,
  getStats,
  bumpStats,
} from "./shared/storage";
import type { Message, Settings, Stats } from "./shared/types";

// ---------------------------------------------------------------------------
// Install: ensure default settings are persisted so the popup has a value
// ---------------------------------------------------------------------------
browser.runtime.onInstalled.addListener(() => {
  // setSettings({}) reads current (or defaults) then writes them back,
  // which guarantees the storage key exists for future reads.
  void setSettings({});
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function activeHostname(
  sender: browser.Runtime.MessageSender
): Promise<string> {
  if (sender.tab?.url) {
    return new URL(sender.tab.url).hostname;
  }
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
  if (tab?.url) {
    return new URL(tab.url).hostname;
  }
  return "";
}

async function buildState(
  sender: browser.Runtime.MessageSender
): Promise<{ type: "STATE"; settings: Settings; stats: Stats; site: string }> {
  const [settings, stats, site] = await Promise.all([
    getSettings(),
    getStats(),
    activeHostname(sender),
  ]);
  return { type: "STATE", settings, stats, site };
}

async function broadcastSettings(settings: Settings): Promise<void> {
  const tabs = await browser.tabs.query({});
  await Promise.allSettled(
    tabs
      .filter((t): t is browser.Tabs.Tab & { id: number } =>
        typeof t.id === "number"
      )
      .map((t) =>
        browser.tabs
          .sendMessage(t.id, { type: "SETTINGS_CHANGED", settings })
          .catch(() => {
            // Tabs without our content script will reject — this is expected.
          })
      )
  );
}

// ---------------------------------------------------------------------------
// Message handler
// ---------------------------------------------------------------------------

onMessage(
  async (
    msg: Message,
    sender: browser.Runtime.MessageSender
  ): Promise<unknown> => {
    switch (msg.type) {
      case "GET_STATE": {
        return buildState(sender);
      }

      case "SET_ENABLED": {
        const settings = await setSettings({ enabled: msg.value });
        await broadcastSettings(settings);
        return buildState(sender);
      }

      case "SET_SITE_ENABLED": {
        const current = await getSettings();
        const perSiteOverrides: Record<string, boolean> = {
          ...current.perSiteOverrides,
          [msg.hostname]: msg.value,
        };
        const settings = await setSettings({ perSiteOverrides });
        await broadcastSettings(settings);
        return buildState(sender);
      }

      case "SET_CHARACTER": {
        const settings = await setSettings({ selectedCharacter: msg.value });
        await broadcastSettings(settings);
        return buildState(sender);
      }

      case "SET_LINGER": {
        const settings = await setSettings({ lingerMs: Math.max(0, msg.value) });
        await broadcastSettings(settings);
        return buildState(sender);
      }

      case "HEIST_COMPLETED": {
        // Fire-and-forget: bump stats only; popup subscribes to storage.onChanged.
        void bumpStats(msg.durationMs);
        return;
      }

      default: {
        // The shared Message union includes outbound types (STATE, SETTINGS_CHANGED)
        // that are never sent to the background worker, so a never-assertion would
        // be unsound. We silently ignore any unrecognised message type.
        return;
      }
    }
  }
);
