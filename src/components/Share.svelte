<script lang="ts">
  import AutoTabClose from "./AutoTabClose.svelte";
  import WebhookSelect from "./WebhookSelect.svelte";
  import CropImg from "./CropImg.svelte";
  import type { Data, Webhook } from "../types";
  import { getWebhooks, saveWebhooks } from "../storage";

  // Define component props
  export let data: Data;
  data.comment = "";

  // Define component variables
  let webhook: Webhook;
  let cropped = "";
  let isModalOpen = true;

  let includes: {
    [key: string]: boolean;
  } = {
    screenshot: true,
    meta: true,
    context: true,
  };

  let state: "new" | "sending" | "sent" | "error" = "new";
  let error: string | undefined;

  let response: Response | undefined;

  $: payload = Object.fromEntries(
    Object.entries({
      ...data,
      contextHtml: includes.context ? data.contextHtml : undefined,
      contextText: includes.context ? data.contextText : undefined,
      meta: includes.meta ? data.meta : undefined,
      screenshot: includes.screenshot ? cropped || data.screenshot : undefined,
    }).filter(([_, value]) => value !== "")
  );

  function keysForIncludesToggle() {
    const keys = ["screenshot", "meta"];

    if (data.contextText) {
      keys.push("context");
    }

    return keys;
  }

  // Function to send data to webhook
  async function send() {
    state = "sending";
    error = undefined;
    // Send data to webhook
    try {
      response = await new Promise((resolve, reject) => {
        fetch(webhook.url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload, null, 2),
        }).then(resolve, reject);

        setTimeout(() => {
          reject(new Error("Request timed out"));
        }, 30 * 1000);
      });
      state = "sent";

      // sort the list of webhooks so the last used is first
      const webhooks = await getWebhooks();
      const index = webhooks.findIndex(
        (w) => w.url === webhook.url && w.name === webhook.name
      );
      webhooks.unshift(webhooks.splice(index, 1)[0]);
      await saveWebhooks(webhooks);
    } catch (e: unknown) {
      if (e instanceof Error) {
        error = e.message;
      } else {
        error = "An error occurred while sending the request";
      }
      state = "error";
    }
  }

  // Function to dismiss modal
  function dismiss() {
    isModalOpen = false;
    state = "new";
  }

  // Function to exit the tab
  function exit() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.remove(tabs[0].id!);
    });
  }
</script>

<div class="flex gap-4">
  <div
    class="flex flex-col gap-4 shrink-0 grow-1 w-1/2 md:w-2/5 xl:1/3 overflow-scroll"
  >
    <WebhookSelect bind:webhook />
    <hr />
    <label for="comment" class="text-lg text-neutral">Comment</label>
    <textarea bind:value={data.comment} class="w-full text-lg min-h-[20vh]"
    ></textarea>
    <hr />
    <div>
      {#each keysForIncludesToggle() as key}
        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text"
              >Include <code class="text-primary">{key}</code> in payload</span
            >
            <input
              type="checkbox"
              class="toggle toggle-primary"
              bind:checked={includes[key]}
            />
          </label>
        </div>
      {/each}
    </div>
    <hr />
    <button
      class="btn btn-primary"
      type="button"
      on:click={() => send()}
      disabled={state !== "new" || webhook === undefined}>Send</button
    >
  </div>
  <div class="grow">
    <CropImg src={data.screenshot} bind:dataUrl={cropped} />
  </div>
</div>

<div
  class="modal"
  class:modal-open={state === "sending" || state == "sent" || state == "error"}
>
  <div class="modal-box flex flex-col gap-4 text-lg">
    {#if state === "sending"}
      <progress class="progress progress-primary h-4 w-full"></progress>
    {/if}

    {#if state === "error"}
      <p class="text-error">
        {error ?? "An error occurred while sending the request"}. Check the
        network tab for more details.
      </p>
      <p>
        Common issues include: invalid URL, missing CORS headers, and rate
        limiting.
      </p>
      <hr />
      <a
        class="btn btn-primary"
        href="https://github.com/jpoehnelt/parteux/issues/new?title={encodeURIComponent(
          '[Fetch Error] - FILL_ME_IN'
        )}&body={encodeURIComponent(`error: \`${error ?? ''}\``)}"
        >Report an issue</a
      >
      <hr />
    {/if}

    {#if state === "sent" && response}
      <p>
        Request finished with HTTP status: <code
          class:text-error={response.status >= 400}
          class:text-success={response.status < 400 && response.status >= 200}
          >{response.status}</code
        >
      </p>
      <div class="badges">
        <a href="https://liberapay.com/jpoehnelt/donate"
          ><img
            alt="Donate using Liberapay"
            src="https://liberapay.com/assets/widgets/donate.svg"
          /></a
        >
        <a href="https://patreon.com/jpoehnelt"
          ><img
            alt="Patreon"
            src="https://img.shields.io/badge/Patreon-F96854?style=for-the-badge&logo=patreon&logoColor=white"
          /></a
        >
      </div>
    {/if}
    {#if state === "sent" || state === "error"}
      <div class="modal-action">
        <AutoTabClose
          seconds={30}
          on:dismiss={() => dismiss()}
          on:exit={() => exit()}
        />
      </div>{/if}
  </div>
</div>
