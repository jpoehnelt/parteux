import { crx } from "@crxjs/vite-plugin";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite";
import zipPack from "vite-plugin-zip-pack";
import manifest from "./src/manifest.config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    crx({ manifest }),
    {
      name: "remove-src-dir-from-html-path",
      enforce: "post",
      generateBundle(_, bundle) {
        const htmlFileInSrcFolderPattern = /^src\/.*\.html$/;
        for (const outputItem of Object.values(bundle)) {
          if (!htmlFileInSrcFolderPattern.test(outputItem.fileName)) {
            continue;
          }
          outputItem.fileName = outputItem.fileName.replace("src/", "");
        }
      },
    },
    zipPack({ outDir: "dist", outFileName: "extension.zip" }),
  ],
  // HACK: https://github.com/crxjs/chrome-extension-tools/issues/696
  // https://github.com/crxjs/chrome-extension-tools/issues/746
  server: {
    port: 5173,
    strictPort: true,
    hmr: {
      clientPort: 5173,
    },
  },
  build: {
    rollupOptions: {
      input: {
        share: "src/share/share.html",
        index: "src/index.html",
        privacy: "src/privacy.html",
      },
    },
  },
  assetsInclude: ["**/*.md", "src/assets/**/*"],
});
