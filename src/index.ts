import SvelteMarkdown from "svelte-markdown";
import README from "../README.md?raw";
import "./style.css";

async function render() {
  const target = document.getElementById("app");

  if (target) {
    new SvelteMarkdown({ target, props: { source: README } });
  }
}

document.addEventListener("DOMContentLoaded", render);
