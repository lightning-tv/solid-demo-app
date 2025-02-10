import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import legacy from "@vitejs/plugin-legacy";
import hexColorTransform from "@lightningtv/vite-hex-transform";
import { configDefaults } from "vitest/config";

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
      targets: ["chrome>=47"],
      // polyfills: ["es.promise.finally", "es/map", "es/set"],
      // modernPolyfills: true,
      // additionalLegacyPolyfills: ["whatwg-fetch"],
      modernPolyfills: [
        // Safari 11 has modules, but throws > ReferenceError: Can't find variable: globalThis
        "es.global-this",
      ],
    }),
  ],
  build: {
    targets: ["chrome>=69"],
    minify: false,
    sourcemap: false,
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
  test: {
    exclude: [...configDefaults.exclude, "packages/template/*"],
    globals: true,
  },
});
