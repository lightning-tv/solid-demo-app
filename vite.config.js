import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import legacy from "@vitejs/plugin-legacy";
import hexColorTransform from "@lightningtv/vite-hex-transform";

export default defineConfig({
  plugins: [
    hexColorTransform(),
    solidPlugin({
      solid: {
        moduleName: "@lightningtv/solid",
        generate: "universal",
      },
    }),
    legacy({
      targets: ["chrome>=49"],
      modernPolyfills: true,
      // additionalLegacyPolyfills: ["whatwg-fetch", "es6-proxy-polyfill"],
    }),
  ],
  build: {
    targets: ["chrome>=49"],
    minify: false,
    sourcemap: true,
  },
  resolve: {
    alias: {
      theme: "@lightningjs/l3-ui-theme-base",
    },
    dedupe: [
      "solid-js",
      "@lightningjs/renderer",
      "@lightningtv/solid",
      "@lightningtv/solid/primitives",
      "@lightningtv/solid-ui",
    ],
  },
  optimizeDeps: {
    exclude: [
      "@lightningtv/solid",
      "@lightningtv/core",
      "@lightningjs/renderer",
      "@lightningtv/solid-ui",
    ],
  },
  server: {
    port: 5174,
    hmr: true,
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
  },
});
