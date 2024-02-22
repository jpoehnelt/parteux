import type { Data, Webhook } from "./types";
import { isWebhook } from "./types";
import { isValidUrl } from "./utils";

export const session = {
  get: (): Promise<Data> => chrome.storage.session.get() as Promise<Data>,
  set: (value: Data): Promise<void> => chrome.storage.session.set(value),
  clear: (): Promise<void> => chrome.storage.session.clear(),
};

export async function saveWebhooks(webhooks: Webhook[]): Promise<void> {
  await chrome.storage.sync.set({
    webhooks: webhooks.filter(({ url }) => isValidUrl(url)),
  });
}

export async function getWebhooks(): Promise<Webhook[]> {
  return new Promise((resolve) => {
    chrome.storage.sync.get("webhooks", (items) => {
      resolve(items.webhooks.filter(isWebhook));
    });
  });
}
