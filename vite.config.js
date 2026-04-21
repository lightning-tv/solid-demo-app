import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import legacy from "@vitejs/plugin-legacy";
import devtools from "solid-devtools/vite";
import hexColorTransform from "@lightningtv/vite-hex-transform";
import { configDefaults } from "vitest/config";
import path from "path";

export default defineConfig(({ mode }) => ({
  define: {
    __DEV__: mode !== "production",
    __RTT__: false,
    __renderTextBatching__: true,
    __enableCompressedTextures__: true,
    __calculateFps__: true,
    LIGHTNING_DOM_RENDERING: true
  },
  plugins: [
    hexColorTransform({
      include: ["src/**/*.{ts,tsx,js,jsx}"]
    }),
    devtools({
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
      additionalLegacyPolyfills: ["whatwg-fetch"],
      modernPolyfills: ["es.global-this"]
    })
  ],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html")
      },
      external: (id) => id.startsWith("assets/") && id.endsWith(".js")
    }
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
