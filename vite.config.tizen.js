import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import hexColorTransform from "@lightningtv/vite-hex-transform";
import path from "path";

/**
 * Injects an inline queueMicrotask polyfill as the very first <script> in
 * <head>. Chrome 69 (Tizen 5/6) doesn't have queueMicrotask (landed in
 * Chrome 71), so this must execute before any app code.
 */
function queueMicrotaskPolyfillPlugin() {
  const polyfill = `if(typeof queueMicrotask!=='function'){self.queueMicrotask=function(fn){Promise.resolve().then(fn).catch(function(e){setTimeout(function(){throw e},0);});};}`;
  return {
    name: "queue-microtask-polyfill",
    transformIndexHtml(html) {
      return html.replace("<head>", `<head>\n  <script>${polyfill}</script>`);
    }
  };
}

export default defineConfig(({ mode }) => ({
  define: {
    __DEV__: mode !== "production",
    __RTT__: false,
    __renderTextBatching__: true,
    __enableCompressedTextures__: false,
    __calculateFps__: true,
    LIGHTNING_DOM_RENDERING: false
  },
  plugins: [
    queueMicrotaskPolyfillPlugin(),
    hexColorTransform({
      include: ["src/**/*.{ts,tsx,js,jsx}"]
    }),
    solidPlugin({
      solid: {
        moduleName: "@lightningtv/solid",
        generate: "universal",
        builtIns: []
      }
    })
  ],
  build: {
    // Tizen 5/6 runs Chromium 69 — target it explicitly so esbuild
    // downlevels optional chaining, nullish coalescing, etc.
    target: "chrome69",
    modulePreload: false,
    rollupOptions: {
      output: {
        format: "iife"
      }
    },
    minify: false,
    sourcemap: false
  },
  resolve: {
    alias: {
      theme: path.resolve(__dirname, "src/theme.ts")
    },
    conditions: ["@lightningtv/source"],
    dedupe: [
      "solid-js",
      "solid-js/universal",
      "@solidjs/router",
      "@lightningjs/renderer",
      "@lightningtv/solid",
      "@lightningtv/solid/primitives"
    ]
  },
  optimizeDeps: {
    exclude: ["@lightningtv/solid", "@lightningjs/renderer"]
  }
}));
