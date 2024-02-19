# Parteux

> 🚀 Blast off with Parteux, a Chrome extension that allows you to share the current tab to a webhook! 🌟 Share the URL, the selected text, a screenshot, and more, all with just a click! Effortlessly connect with your favorite chat, issue tracker, or any other service that supports webhooks.

[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/nbjcakldlpgbdidkhepgmlmcmlmbampa?style=flat&labelColor=3f3f3f&label=Chrome%20Web%20Store&maxAge=3600)](https://chrome.google.com/webstore/detail/parteux/nbjcakldlpgbdidkhepgmlmcmlmbampa)
![Chrome Web Store Users](https://img.shields.io/chrome-web-store/users/nbjcakldlpgbdidkhepgmlmcmlmbampa)
![GitHub Repo stars](https://img.shields.io/github/stars/jpoehnelt/parteux?style=flat&labelColor=3f3f3f&label=GitHub&maxAge=3600)[![Test](https://github.com/jpoehnelt/parteux/actions/workflows/test.yml/badge.svg)](https://github.com/jpoehnelt/parteux/actions/workflows/test.yml)
[![Release](https://github.com/jpoehnelt/parteux/actions/workflows/release.yml/badge.svg)](https://github.com/jpoehnelt/parteux/actions/workflows/release.yml)
![GitHub License](https://img.shields.io/github/license/jpoehnelt/parteux)

## Use cases

Use this extension to share the current tab to your favorite chat, issue tracker, or any other service that supports webhooks. Some potential use cases include:

- Sharing interesting articles or websites with your team in a chat application.
- Creating bug reports or feature requests in an issue tracker directly from the current tab.
- Sending notifications or updates to a custom service or API.
- Integrating with project management tools to automatically create tasks or tickets based on the current tab.

The possibilities are endless! With this extension, you can easily share information from the web to any service that can receive webhooks.

## How it works

1. Install the extension from the Chrome Web Store.
1. Open a website in a tab.
1. Click the extension icon to open the extension for the current tab.
1. Enter the webhook URL and click "Send".

The webhook URL is stored in the extension's synced storage and is shared across all tabs and devices. The webhook should return a 200 status code to indicate success and accept cross-origin requests by setting the `Access-Control-Allow-Origin` header to `*`.

## For developers

It's possible to run the extension locally in development mode.

```bash
npm i
npm run fix # lint and format
npm run test # run tests
npm run build -- --watch # build and watch for changes
```

To load the extension in Chrome:

1. Open the Extension Management page by navigating to `chrome://extensions`.
2. Enable Developer Mode by clicking the toggle switch next to `Developer mode`.
3. Click the `LOAD UNPACKED` button and select the `/dist` directory.

## Support

If you have any questions, feedback, or issues, please open a [GitHub issue](https://github.com/jpoehnelt/parteux).
