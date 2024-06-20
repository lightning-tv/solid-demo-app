import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import { importChunkUrl } from "@lightningjs/vite-plugin-import-chunk-url";
import legacy from "@vitejs/plugin-legacy";

export default defineConfig({
  plugins: [
    importChunkUrl(),
    solidPlugin({
      solid: {
        moduleName: "@lightningtv/solid",
        generate: "universal",
      },
    }),
    legacy({
      targets: ["defaults", "Chrome >= 49"],
      // additionalLegacyPolyfills: ["whatwg-fetch", "es6-proxy-polyfill"],
    }),
  ],
  build: {
    sourcemap: true,
  },
  resolve: {
    alias: {
      theme: "@lightningjs/l3-ui-theme-base",
      "@lightningjs/solid": "@lightningtv/solid",
      "@lightningjs/solid-primitives": "@lightningtv/solid/primitives",
    },
    dedupe: [
      "solid-js",
      "@lightningjs/renderer",
      "@lightningtv/solid",
      "@lightningtv/solid/primitives",
      "@lightningjs/solid-ui",
    ],
  },
  // This is only needed if you pnpm link @lightningtv/solid
  // optimizeDeps: {
  //   include: [],
  //   exclude: [
  //     "@lightningtv/solid",
  //     "@lightningjs/solid-ui",
  //     "@lightningjs/renderer",
  //     "@lightningjs/renderer/core",
  //     "@lightningjs/renderer/workers/renderer",
  //   ],
  // },
  server: {
    port: 5174,
    hmr: true,
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
  },
});
