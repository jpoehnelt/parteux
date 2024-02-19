import Share from "../components/Share.svelte";
import { session } from "../storage";

import "../style.css";

// Side panel
// https://developer.chrome.com/docs/extensions/reference/sidePanel/

async function render() {
  const target = document.getElementById("app");

  if (target) {
    const data = await session.get();

    await session.clear();

    new Share({
      target,
      props: { data: { ...data } },
    });
  }
}

document.addEventListener("DOMContentLoaded", render);
