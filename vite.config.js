import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import legacy from "@vitejs/plugin-legacy";
import devtools from "solid-devtools/vite";
import hexColorTransform from "@lightningtv/vite-hex-transform";
import { configDefaults } from "vitest/config";
import path from "path";

export default defineConfig(({ mode }) => ({
  define: {
    __DEV__: mode !== "production"
  },
  plugins: [
    hexColorTransform({
      include: ["src/**/*.{ts,tsx,js,jsx}"]
    }),
    devtools({
      /* features options - all disabled by default */
      autoname: true,
      locator: {
        jsxLocation: true,
        componentLocation: true,
        targetIDE: "vscode"
      }
    }),
    solidPlugin({
      solid: {
        moduleName: "@lightningtv/solid",
        generate: "universal",
        builtIns: []
      }
    }),
    legacy({
      targets: ["chrome>=38", "not IE 11"],
      // polyfills: ["es.promise.finally", "es/map", "es/set"],
      // modernPolyfills: true,
      additionalLegacyPolyfills: ["whatwg-fetch"],
      modernPolyfills: [
        // Safari 11 has modules, but throws > ReferenceError: Can't find variable: globalThis
        "es.global-this"
      ]
    })
  ],
  build: {
    targets: ["chrome>=69"],
    minify: false,
    sourcemap: false
  },
  resolve: {
    alias: {
      theme: path.resolve(__dirname, "src/theme.ts")
    },
    dedupe: [
      "solid-js",
      "solid-js/universal",
      "@solidjs/router",
      "@lightningjs/renderer",
      "@lightningtv/core",
      "@lightningtv/solid",
      "@lightningtv/solid/primitives"
    ]
  },
  optimizeDeps: {
    exclude: [
      "@lightningtv/solid",
      "@lightningtv/core",
      "@lightningjs/renderer"
    ]
  },
  server: {
    port: 5174,
    hmr: true,
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp"
    }
  },
  test: {
    exclude: [...configDefaults.exclude, "packages/template/*"],
    globals: true
  }
}));
