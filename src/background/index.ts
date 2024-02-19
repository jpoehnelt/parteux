import { session } from "../storage";
import type { Data } from "../types";

// Background service workers
// https://developer.chrome.com/docs/extensions/mv3/service_workers/

chrome.action.onClicked.addListener(async (tab) => {
  const [{ result: data }] = await chrome.scripting.executeScript({
    target: { tabId: tab.id as number },
    func: (): Omit<Data, "screenshot" | "comment"> => {
      const selection = window.getSelection();
      let contextElement: HTMLElement | null = null;

      if (selection && !selection?.isCollapsed) {
        const commonAncestorContainer =
          selection?.getRangeAt(0).commonAncestorContainer;

        // check if commonAncestorContainer is a text node
        contextElement =
          commonAncestorContainer?.nodeType === 3
            ? commonAncestorContainer.parentElement
            : (commonAncestorContainer as HTMLElement);
      }

      return {
        contextText: contextElement?.innerText ?? "",
        contextHtml: contextElement?.innerHTML ?? "",
        meta: Array.from(document.querySelectorAll("meta"))
          .map((meta) =>
            Object.fromEntries(
              Object.entries({
                name: meta.name,
                content: meta.content,
                media: meta.media,
                httpEquiv: meta.httpEquiv,
                charset: meta.getAttribute("charset"),
                property: meta.getAttribute("property"),
                data: meta
                  .getAttributeNames()
                  .filter((name) => name.startsWith("data-"))
                  .reduce(
                    (obj, name) => {
                      const value = meta.getAttribute(name);
                      if (value) {
                        obj[name] = value;
                      }
                      return obj;
                    },
                    {} as Record<string, string>,
                  ),
              }).filter(
                ([, value]) =>
                  value !== undefined &&
                  value !== null &&
                  value !== "" &&
                  // filter out empty data={} attributes meant to catch all data-* attributes
                  (typeof value === "string" || Object.keys(value).length > 0),
              ),
            ),
          )
          .filter((obj) => Object.keys(obj).length > 0),
        selection: selection?.toString() ?? "",
        title: document.title,
        url: window.location.href,
      };
    },
  });

  await chrome.scripting.executeScript({
    target: { tabId: tab.id as number },
    func: () => {
      window.getSelection()?.removeAllRanges();
    },
  });

  const screenshot = await chrome.tabs.captureVisibleTab({
    format: "png",
  });

  if (!data) {
    throw new Error("No result");
  }

  await session.set({ ...data, screenshot, comment: "" });

  await chrome.tabs.create({
    url: chrome.runtime.getURL("share/share.html"),
  });
});
