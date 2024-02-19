<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { debounce } from "lodash";
  import Cropper from "cropperjs";
  import "cropperjs/dist/cropper.css";
  import RestartAlt from "./svg/RestartAlt.svelte";

  export let src: string;
  export let dataUrl: string;

  let img: HTMLImageElement;
  let cropper: Cropper;

  const crop = debounce(() => {
    dataUrl = cropper.getCroppedCanvas().toDataURL();
  }, 100);

  onMount(async () => {
    img.addEventListener("load", () => {
      cropper = new Cropper(img, {
        autoCrop: true,
        autoCropArea: 1,
        crop,
      });
    });
  });

  onDestroy(() => {
    cropper.destroy();
  });

  function reset() {
    dataUrl = "";
    cropper.reset();
  }
</script>

<div class="flex flex-col gap-1 grow-1">
  <img bind:this={img} {src} alt="Screenshot" class="w-full max-h-[75vh]" />
  <div class="flex justify-end">
    <button
      class="btn btn-primary btn-square fill-white"
      type="button"
      on:click={() => reset()}
    >
      <RestartAlt />
    </button>
  </div>
</div>
