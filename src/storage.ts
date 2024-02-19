import type { Data, Webhook } from "./types";

export const session = {
  get: (): Promise<Data> => chrome.storage.session.get() as Promise<Data>,
  set: (value: Data): Promise<void> => chrome.storage.session.set(value),
  clear: (): Promise<void> => chrome.storage.session.clear(),
};
