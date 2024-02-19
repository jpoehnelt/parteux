# Parteux

> A Chrome extension to share the current tab to a webhook including the URL, the selected text, a screenshot, and more!

Use this extension to share to your favorite chat, issue tracker, or any other service that supports webhooks.

## Extension Usage

1. Install the extension from the Chrome Web Store.
1. Open a website in a tab.
1. Click the extension icon to open the extension for the current tab.
1. Enter the webhook URL and click "Send".

### Webhook Payload

The payload is a JSON object with properties defined in the following:

```ts
/**
 * Represents the data sent to the webhook.
 */
interface Data {
  /**
   * The base64 data URL of the screenshot image.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
   */
  screenshot: string;
  /**
   * The comment associated with the tab.
   */
  comment: string;
  /**
   * The plain text of the selected context.
   */
  contextText: string;
  /**
   * The HTML representation of the selected context.
   * Caution: When inserting HTML into websites, make sure to properly sanitize
   * and validate the input to prevent security vulnerabilities such as cross-site
   * scripting (XSS) attacks.
   */
  contextHtml: string;
  /**
   * An array of meta tags associated with the tab.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta
   */
  meta: {
    /**
     * The name attribute of the meta tag.
     */
    name?: string;
    /**
     * The content attribute of the meta tag.
     */
    content?: string;
    /**
     * The media attribute of the meta tag.
     */
    media?: string;
    /**
     * The http-equiv attribute of the meta tag.
     */
    httpEquiv?: string;
  }[];
  /**
   * The selected text.
   */
  selection: string;
  /**
   * The title of the page.
   */
  title: string;
  /**
   * The URL of the page.
   */
  url: string;
}
```

### Webhook URL

The webhook URL is stored in the extension's synced storage and is shared across all tabs and devices. The webhook should return a 200 status code to indicate success and accept cross-origin requests by setting the `Access-Control-Allow-Origin` header to `*`.

## Development

```bash
npm i
npm run dev
npm run build
```

1. Open the Extension Management page by navigating to `chrome://extensions`.
2. Enable Developer Mode by clicking the toggle switch next to `Developer mode`.
3. Click the `LOAD UNPACKED` button and select the `/dist` directory.
