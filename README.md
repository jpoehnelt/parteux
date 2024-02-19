# Parteux

> A Chrome extension to share the current tab to a webhook including the URL, the selected text, a screenshot, and more!

[![Test](https://github.com/jpoehnelt/parteux/actions/workflows/test.yml/badge.svg)](https://github.com/jpoehnelt/parteux/actions/workflows/test.yml)
[![Release](https://github.com/jpoehnelt/parteux/actions/workflows/release.yml/badge.svg)](https://github.com/jpoehnelt/parteux/actions/workflows/release.yml)

Use this extension to share to your favorite chat, issue tracker, or any other service that supports webhooks.

## Extension Usage

1. Install the extension from the Chrome Web Store.
1. Open a website in a tab.
1. Click the extension icon to open the extension for the current tab.
1. Enter the webhook URL and click "Send".

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
