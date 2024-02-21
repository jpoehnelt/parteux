<script lang="ts">
  import AutoTabClose from "./AutoTabClose.svelte";
  import WebhookSelect from "./WebhookSelect.svelte";
  import CropImg from "./CropImg.svelte";
  import type { Data, Webhook } from "../types";

  // Define component props
  export let data: Data;
  data.comment = "";

  // Define component variables
  let webhook: Webhook;
  let cropped = "";
  let isModalOpen = true;

  let includeScreenshot = true;
  let includeMeta = true;
  let includeContext = true;

  let includes: {
    [key: string]: boolean;
  } = {
    screenshot: true,
    meta: true,
    context: true,
  };

  let state: "new" | "sending" | "sent" = "new";

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

    response = await fetch(webhook.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload, null, 2),
    });
    state = "sent";
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

<div class="modal" class:modal-open={state === "sending" || state == "sent"}>
  <div class="modal-box flex flex-col gap-4 text-lg">
    {#if state === "sending"}
      <progress class="progress progress-primary h-4 w-full"></progress>
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
    {#if state === "sent"}
      <div class="modal-action">
        <AutoTabClose
          seconds={30}
          on:dismiss={() => dismiss()}
          on:exit={() => exit()}
        />
      </div>{/if}
  </div>
</div>
