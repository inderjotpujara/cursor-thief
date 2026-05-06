import browser from "webextension-polyfill";
import type { Message } from "./types";

export async function send<T extends Message>(msg: T): Promise<unknown> {
  return browser.runtime.sendMessage(msg);
}

export async function sendToTab<T extends Message>(tabId: number, msg: T): Promise<unknown> {
  return browser.tabs.sendMessage(tabId, msg);
}

export function onMessage(handler: (msg: Message, sender: browser.Runtime.MessageSender) => unknown | Promise<unknown>): () => void {
  const listener = (raw: unknown, sender: browser.Runtime.MessageSender) => {
    const msg = raw as Message;
    const result = handler(msg, sender);
    return Promise.resolve(result);
  };
  browser.runtime.onMessage.addListener(listener);
  return () => browser.runtime.onMessage.removeListener(listener);
}
