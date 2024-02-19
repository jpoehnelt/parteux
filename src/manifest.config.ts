import { defineManifest } from "@crxjs/vite-plugin";
import packageJson from "../package.json";

const { version, name, description } = packageJson;

// Convert from Semver (example: 0.1.0-beta6)
const [major, minor, patch] = version
  // can only contain digits, dots, or dash
  .replace(/[^\d.-]+/g, "")
  // split into version parts
  .split(/[.-]/);

export default defineManifest(async (env) => ({
  manifest_version: 3,
  name: `${name[0].toUpperCase()}${name.slice(1)}`,
  description: description,
  version: `${major}.${minor}.${patch}`,
  version_name: version,
  icons: {
    "16": "public/icons/icon16.png",
    "32": "public/icons/icon32.png",
    "48": "public/icons/icon48.png",
    "128": "public/icons/icon128.png",
  },
  background: {
    service_worker: "src/background/index.ts",
  },
  action: {},
  permissions: [
    "storage",
    "scripting",
    "activeTab",
  ] as chrome.runtime.ManifestPermissions[],
}));
