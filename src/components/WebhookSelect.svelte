<script lang="ts">
  import  type {Webhook } from "../types";
  import {saveWebhooks, getWebhooks} from "../storage";
  import { onMount } from "svelte";
  import Add from "./svg/Add.svelte";
  import Delete from "./svg/Delete.svelte";
  import { obfuscateUrl } from "../utils";
  export let webhooks: Webhook[] = [];

  let addingNewWebhook = false;

  let initWebhook = {
    url: "",
    name: "",
  };

  let newWebhook = { ...initWebhook };

  export let webhook: Webhook = webhooks[0];

  $: onChange(webhooks);

  async function onChange(webhooks: Webhook[]) {
    if (webhooks.length) {
      saveWebhooks(webhooks);
    }
  }

  onMount(async () => {
      webhooks = await getWebhooks();
      webhook = webhooks[0] ?? { ...initWebhook };
  });

  function save() {
    webhooks = [newWebhook, ...webhooks];
    webhook = webhooks[0];
    newWebhook = { ...initWebhook };
    addingNewWebhook = false;
  }

  function addWebhook() {
    addingNewWebhook = true;
  }

  function deleteWebhook() {
    webhooks = webhooks.filter(
      ({ url, name }) => url !== webhook.url && name !== webhook.name
    );
    webhook = webhooks[0];
    saveWebhooks(webhooks);
  }
</script>

<div class="flex flex-col gap-2">
  <label for="webhook-select" class="text-lg text-neutral">Webhook</label>
  <div class="flex gap-1 items-center">
    {#if webhooks.length > 0 && !addingNewWebhook}
      <select
        bind:value={webhook}
        class="select select-bordered w-full"
        id="webhook-select"
      >
        {#each webhooks as webhook}
          <option class="text-elipsis" value={webhook}
            >{webhook.name} | {obfuscateUrl(webhook.url)}</option
          >
        {/each}
      </select>
      <button
        class="btn btn-primary btn-square fill-white"
        aria-label="Delete webhook"
        on:click={deleteWebhook}><Delete /></button
      >
      <button
        class="btn btn-square btn-primary fill-white"
        aria-label="Add webhook"
        on:click={addWebhook}><Add /></button
      >
    {/if}
  </div>
  {#if addingNewWebhook || webhooks.length === 0}
    <form on:submit|preventDefault={save} class="flex flex-col gap-2">
      <input type="text" bind:value={newWebhook.name} placeholder="Name" />
      <input type="url" bind:value={newWebhook.url} placeholder="URL" />
      <div>
        <button class="btn btn-primary" type="submit">Save</button>
        <button
          class="btn btn-secondary"
          on:click={() => (addingNewWebhook = false)}>Cancel</button
        >
      </div>
    </form>
  {/if}
</div>
