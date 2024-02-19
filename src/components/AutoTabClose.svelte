<script lang="ts">
  import { createEventDispatcher, onMount, onDestroy } from "svelte";

  // Type annotations
  let timer: number;
  let interval: number | undefined;

  // Event dispatcher
  const dispatch = createEventDispatcher();

  // Initialize timer
  export let seconds: number = 30;
  $: timer = seconds;

  // Start the interval on mount
  onMount(() => {
    interval = setInterval(() => {
      // Decrement timer
      timer--;

      if (timer === 0) {
        // Clear interval and close the window
        clearInterval(interval);
        window.close();
      }
    }, 1000);
  });

  // Clean up the interval on unmount
  onDestroy(() => {
    clearInterval(interval);
  });

  // Dismiss function
  function dismiss() {
    clearInterval(interval);
    interval = undefined;
    dispatch("dismiss");
  }

  // Exit function
  function exit() {
    dispatch("exit");
  }
</script>

<div class="flex gap-4 justify-center items-center">
  {#if interval}<span>Exiting in {timer} seconds</span>{/if}
  <button class="btn btn-primary" type="button" on:click={dismiss}
    >Dismiss</button
  >
  <button class="btn btn-secondary" type="button" on:click={exit}>Exit</button>
</div>
