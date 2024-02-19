# Parteux

> 🚀 Blast off with Parteux, a Chrome extension that allows you to share the current tab to a webhook! 🌟 Share the URL, title, selected text, a screenshot, meta tags, and more, all with just a click!

<div class="badges">
    <a href="https://chrome.google.com/webstore/detail/parteux/nbjcakldlpgbdidkhepgmlmcmlmbampa">
        <img src="https://img.shields.io/chrome-web-store/v/nbjcakldlpgbdidkhepgmlmcmlmbampa?style=flat&amp;labelColor=3f3f3f&amp;label=Chrome%20Web%20Store&amp;maxAge=3600" alt="Chrome Web Store">
    </a>
    <a href="https://github.com/jpoehnelt/parteux/actions/workflows/test.yml">
        <img src="https://github.com/jpoehnelt/parteux/actions/workflows/test.yml/badge.svg" alt="Test">
    </a>
    <a href="https://github.com/jpoehnelt/parteux/actions/workflows/release.yml">
        <img src="https://github.com/jpoehnelt/parteux/actions/workflows/release.yml/badge.svg" alt="Release">
    </a>
    <a href="https://github.com/jpoehnelt/parteux"><img src="https://img.shields.io/github/license/jpoehnelt/parteux" alt="GitHub License"></a>
    <a href="https://liberapay.com/jpoehnelt/donate"><img alt="Donate using Liberapay" src="https://liberapay.com/assets/widgets/donate.svg"></a>
    <a href="https://patreon.com/jpoehnelt"><img alt="Patreon" src="https://img.shields.io/badge/Patreon-F96854?style=for-the-badge&logo=patreon&logoColor=white"></a>
</div>

## Use cases

Use this extension to share the current tab to your favorite chat, issue tracker, or any other service that supports webhooks. Some potential use cases include:

- Sharing interesting articles or websites with your team in a chat application. 💬
- Creating bug reports 🐛 or feature requests in an issue tracker directly from the current tab.
- Sending notifications or updates to a custom service or API.
- Integrating with project management tools to automatically create tasks or tickets based on the current tab. 💼

The possibilities are endless! With this extension, you can easily share information from the web to any service that can receive webhooks.

## How it works

1. Install the extension from the Chrome Web Store.
1. Open a website in a tab.
1. Click the extension icon to open the extension for the current tab.
1. Enter the webhook URL and click "Send".

The webhook URL is stored in the extension's synced storage and is shared across all tabs and devices. The webhook should return a 200 status code to indicate success and accept cross-origin requests by setting the `Access-Control-Allow-Origin` header to `*`.

> **Note**: The extension does not store any data or send any information to any server. The webhook URL is stored in the extension's synced storage and is only used to send the current tab's information to the specified URL that **YOU** set!

## For developers

It's possible to run the extension locally in Chrome.

```bash
# get the code
git clone https://github.com/jpoehnelt/parteux.git
cd parteux

# install dependencies
npm i

# build and watch for changes
npm run build -- --watch 

# load the extension in Chrome
```

To load the extension in Chrome:

1. Open the Extension Management page by navigating to `chrome://extensions`.
2. Enable Developer Mode by clicking the toggle switch next to `Developer mode`.
3. Click the `LOAD UNPACKED` button and select the `/dist` directory.

## Support

If you have any questions, feedback, or issues, please open a [GitHub issue](https://github.com/jpoehnelt/parteux).
