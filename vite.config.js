import * as vite from "vite";
import solidPlugin from "vite-plugin-solid";
import legacy from "@vitejs/plugin-legacy";
import devtools from "solid-devtools/vite";
import hexColorTransform from "@lightningtv/vite-hex-transform";
import { configDefaults } from "vitest/config";

/**
* @param {string | undefined} v
* @returns {boolean}
*/
function envTruthy(v) {
  switch (String(v).trim().toLowerCase()) {
  case 'true':
  case '1':
  case 'yes':
  case 'y':
    return true;
  default:
    return false;
  }
}

export default vite.defineConfig(env => {

  const isDev = env.mode !== 'production';
  const isV3 = envTruthy(process.env.LIGHTNING_RENDERER_V3);
  const domRendering = envTruthy(process.env.LIGHTNING_DOM_RENDERING);
  const disableShaders = envTruthy(process.env.LIGHTNING_DISABLE_SHADERS);

  /** @type {Record<string, any>} */
  const definedVars = {
    __DEV__: isDev,
    __LIGHTNING_DOM_RENDERING__: domRendering,
    __LIGHTNING_DISABLE_SHADERS__: disableShaders,
    __LIGHTNING_RENDERER_V3__: isV3,
  };

  let definedVarsMaxLength = 0;
  for (const key in definedVars) {
    definedVarsMaxLength = Math.max(definedVarsMaxLength, key.length);
  }
  for (const key in definedVars) {
    console.log(`${key.padEnd(definedVarsMaxLength)} = ${definedVars[key]}`);
  }

  /** @type {vite.PluginOption[]} */
  const plugins = [
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
    }),
  ];

  if (domRendering) {
    // Hack to prevent cors errors when fetching images by dom renderer
    // "Failed to load resource: net::ERR_BLOCKED_BY_RESPONSE.NotSameOriginAfterDefaultedToSameOriginByCoep"
    plugins.push({
      name: 'tmdb proxy',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.url != null && req.url.startsWith('/image_tmdb')) {
            const target = 'https://image.tmdb.org/t/p/'
            const path = req.url.slice('/image_tmdb/'.length)
            const proxyUrl = target + path

            try {
              let response = await fetch(proxyUrl)
              let buffer = await response.arrayBuffer()
              res.setHeader('Content-Type', response.headers.get('Content-Type'))
              res.end(Buffer.from(buffer))
            } catch (err) {
              res.statusCode = 500
              res.end('Proxy error: ' + err.message)
            }
            return
          }
          next()
        })
      },
    });

    // Add font links to html for dom renderer
    plugins.push({
      name: 'add-font-tags',
      transformIndexHtml(html) {
        return html.replace(
          '</head>',
          `<link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
</head>`,
        );
      },
    })
  }

  return {
    define: definedVars,
    plugins: plugins,
    build: {
      targets: ["chrome>=69"],
      minify: false,
      sourcemap: false
    },
    resolve: {
      alias: {
        theme: "@lightningjs/l3-ui-theme-base"
      },
      dedupe: [
        "solid-js",
        "solid-js/universal",
        "@solidjs/router",
        "@lightningtv/core",
        "@lightningtv/solid",
        "@lightningtv/solid/primitives",
      ],
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
    },
  }
});
