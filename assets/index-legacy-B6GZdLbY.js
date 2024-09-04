;
(function () {
  var _excluded = ["defaultTone"],
    _excluded2 = ["defaultTone"],
    _excluded3 = ["defaultTone"],
    _excluded4 = ["surfaceDefaultTone"],
    _excluded5 = ["defaultTone"],
    _excluded6 = ["defaultTone"],
    _excluded7 = ["defaultTone"],
    _excluded8 = ["defaultTone"],
    _excluded9 = ["defaultTone"],
    _excluded10 = ["defaultTone"],
    _excluded11 = ["defaultTone"],
    _excluded12 = ["defaultTone"],
    _excluded13 = ["defaultTone"],
    _excluded14 = ["defaultTone"],
    _excluded15 = ["defaultTone"],
    _excluded16 = ["defaultTone"],
    _excluded17 = ["defaultTone"],
    _excluded18 = ["defaultTone"],
    _excluded19 = ["defaultSurfaceTone"],
    _excluded20 = ["defaultTone"];
  function _objectDestructuringEmpty(t) { if (null == t) throw new TypeError("Cannot destructure " + t); }
  function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var s = Object.getOwnPropertySymbols(e); for (r = 0; r < s.length; r++) o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
  function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } return t; }
  function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == typeof h && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(typeof e + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
  function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
  function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
  function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
  function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
  function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
  function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
  function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
  System.register([], function (exports, module) {
    'use strict';

    return {
      execute: function execute() {
        var _LinearGradientEffect, _RadialGradientEffect;
        var _marked = /*#__PURE__*/_regeneratorRuntime().mark(getUnicodeCodepoints);
        var __vite_style__ = document.createElement('style');
        __vite_style__.textContent = "html, body, * { padding: 0; margin: 0 }\nvideo { position: absolute; top: 0; left: 0; z-index: 2; outline: none; }\n.center-element {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n}";
        document.head.appendChild(__vite_style__);
        exports({
          A: TileRow,
          B: closeVideo,
          D: playVideo,
          F: For,
          I: Index,
          S: Show,
          a: createResource,
          b: createComputed,
          c: createSignal,
          d: batch,
          e: createSelector,
          f: createEffect,
          g: onMount,
          j: assertTruthy,
          k: hexColor,
          n: children,
          o: on,
          p: onCleanup,
          q: createMemo,
          w: convertItemsToTiles,
          x: getImageUrl
        });
        false && function polyfill() {
          var relList = document.createElement("link").relList;
          if (relList && relList.supports && relList.supports("modulepreload")) {
            return;
          }
          var _iterator = _createForOfIteratorHelper(document.querySelectorAll('link[rel="modulepreload"]')),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var link = _step.value;
              processPreload(link);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          new MutationObserver(mutations => {
            var _iterator2 = _createForOfIteratorHelper(mutations),
              _step2;
            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                var mutation = _step2.value;
                if (mutation.type !== "childList") {
                  continue;
                }
                var _iterator3 = _createForOfIteratorHelper(mutation.addedNodes),
                  _step3;
                try {
                  for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                    var node = _step3.value;
                    if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
                  }
                } catch (err) {
                  _iterator3.e(err);
                } finally {
                  _iterator3.f();
                }
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }
          }).observe(document, {
            childList: true,
            subtree: true
          });
          function getFetchOpts(link) {
            var fetchOpts = {};
            if (link.integrity) fetchOpts.integrity = link.integrity;
            if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
            if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";else fetchOpts.credentials = "same-origin";
            return fetchOpts;
          }
          function processPreload(link) {
            if (link.ep) return;
            link.ep = true;
            var fetchOpts = getFetchOpts(link);
            fetch(link.href, fetchOpts);
          }
        }();
        var scriptRel = 'modulepreload';
        var assetsURL = function assetsURL(dep) {
          return "/solid-demo-app/" + dep;
        };
        var seen = {};
        var __vitePreload = function preload(baseModule, deps, importerUrl) {
          var promise = Promise.resolve();
          if (false && deps && deps.length > 0) {
            document.getElementsByTagName("link");
            var cspNonceMeta = document.querySelector("meta[property=csp-nonce]");
            var cspNonce = (cspNonceMeta === null || cspNonceMeta === void 0 ? void 0 : cspNonceMeta.nonce) || (cspNonceMeta === null || cspNonceMeta === void 0 ? void 0 : cspNonceMeta.getAttribute("nonce"));
            promise = Promise.all(deps.map(dep => {
              dep = assetsURL(dep);
              if (dep in seen) return;
              seen[dep] = true;
              var isCss = dep.endsWith(".css");
              var cssSelector = isCss ? '[rel="stylesheet"]' : "";
              if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
                return;
              }
              var link = document.createElement("link");
              link.rel = isCss ? "stylesheet" : scriptRel;
              if (!isCss) {
                link.as = "script";
                link.crossOrigin = "";
              }
              link.href = dep;
              if (cspNonce) {
                link.setAttribute("nonce", cspNonce);
              }
              document.head.appendChild(link);
              if (isCss) {
                return new Promise((res, rej) => {
                  link.addEventListener("load", res);
                  link.addEventListener("error", () => rej(new Error(`Unable to preload CSS for ${dep}`)));
                });
              }
            }));
          }
          return promise.then(() => baseModule()).catch(err => {
            var e = new Event("vite:preloadError", {
              cancelable: true
            });
            e.payload = err;
            window.dispatchEvent(e);
            if (!e.defaultPrevented) {
              throw err;
            }
          });
        };
        var __vite_import_meta_env__$1 = {
          "BASE_URL": "/solid-demo-app/",
          "DEV": false,
          "LEGACY": true,
          "MODE": "production",
          "PROD": true,
          "SSR": false
        };
        function createWebGLContext(canvas, contextSpy) {
          var config = {
            alpha: true,
            antialias: false,
            depth: false,
            stencil: true,
            desynchronized: false,
            // Disabled because it prevents Visual Regression Tests from working
            // failIfMajorPerformanceCaveat: true,
            powerPreference: "high-performance",
            premultipliedAlpha: true,
            preserveDrawingBuffer: false
          };
          var gl =
          // TODO: Remove this assertion once this issue is fixed in TypeScript
          // https://github.com/microsoft/TypeScript/issues/53614
          canvas.getContext("webgl", config) || canvas.getContext("experimental-webgl", config);
          if (!gl) {
            throw new Error("Unable to create WebGL context");
          }
          if (contextSpy) {
            return new Proxy(gl, {
              get(target, prop) {
                var value = target[prop];
                if (typeof value === "function") {
                  contextSpy.increment(String(prop));
                  return value.bind(target);
                }
                return value;
              }
            });
          }
          return gl;
        }
        function assertTruthy(condition, message) {
          if (isProductionEnvironment()) return;
          if (!condition) {
            throw new Error(message || "Assertion failed");
          }
        }
        function mergeColorProgress(rgba1, rgba2, p) {
          var r1 = Math.trunc(rgba1 >>> 24);
          var g1 = Math.trunc(rgba1 >>> 16 & 255);
          var b1 = Math.trunc(rgba1 >>> 8 & 255);
          var a1 = Math.trunc(rgba1 & 255);
          var r2 = Math.trunc(rgba2 >>> 24);
          var g2 = Math.trunc(rgba2 >>> 16 & 255);
          var b2 = Math.trunc(rgba2 >>> 8 & 255);
          var a2 = Math.trunc(rgba2 & 255);
          var r = Math.round(r2 * p + r1 * (1 - p));
          var g = Math.round(g2 * p + g1 * (1 - p));
          var b = Math.round(b2 * p + b1 * (1 - p));
          var a = Math.round(a2 * p + a1 * (1 - p));
          return (r << 24 | g << 16 | b << 8 | a) >>> 0;
        }
        function mergeColorAlpha(rgba, alpha) {
          var r = rgba >>> 24;
          var g = rgba >>> 16 & 255;
          var b = rgba >>> 8 & 255;
          var a = Math.trunc((rgba & 255) * alpha);
          return (r << 24 | g << 16 | b << 8 | a) >>> 0;
        }
        var premultiplyRGB = true;
        function setPremultiplyMode(mode) {
          premultiplyRGB = mode === "webgl";
        }
        function mergeColorAlphaPremultiplied(rgba, alpha, flipEndianess = false) {
          var newAlpha = (rgba & 255) / 255 * alpha;
          var rgbAlpha = premultiplyRGB ? newAlpha : 1;
          var r = Math.trunc((rgba >>> 24) * rgbAlpha);
          var g = Math.trunc((rgba >>> 16 & 255) * rgbAlpha);
          var b = Math.trunc((rgba >>> 8 & 255) * rgbAlpha);
          var a = Math.trunc(newAlpha * 255);
          if (flipEndianess) {
            return (a << 24 | b << 16 | g << 8 | r) >>> 0;
          }
          return (r << 24 | g << 16 | b << 8 | a) >>> 0;
        }
        function hasOwn(obj, prop) {
          return Object.prototype.hasOwnProperty.call(obj, prop);
        }
        function isProductionEnvironment() {
          return __vite_import_meta_env__$1 && true;
        }
        var nextId = 1;
        function getNewId() {
          return nextId++;
        }

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        /**
         * EventEmitter base class
         */
        class EventEmitter {
          constructor() {
            _defineProperty(this, "eventListeners", {});
          }
          on(event, listener) {
            var listeners = this.eventListeners[event];
            if (!listeners) {
              listeners = [];
            }
            listeners.push(listener);
            this.eventListeners[event] = listeners;
          }
          off(event, listener) {
            var listeners = this.eventListeners[event];
            if (!listeners) {
              return;
            }
            if (!listener) {
              delete this.eventListeners[event];
              return;
            }
            var index = listeners.indexOf(listener);
            if (index >= 0) {
              listeners.splice(index, 1);
            }
          }
          once(event, listener) {
            var onceListener = (target, data) => {
              this.off(event, onceListener);
              listener(target, data);
            };
            this.on(event, onceListener);
          }
          emit(event, data) {
            var listeners = this.eventListeners[event];
            if (!listeners) {
              return;
            }
            [...listeners].forEach(listener => {
              listener(this, data);
            });
          }
          removeAllListeners() {
            this.eventListeners = {};
          }
        }

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        var PROTOCOL_REGEX = /^(data|ftps?|https?):/;
        var getNormalizedRgbaComponents = rgba => {
          var r = rgba >>> 24;
          var g = rgba >>> 16 & 0xff;
          var b = rgba >>> 8 & 0xff;
          var a = rgba & 0xff;
          return [r / 255, g / 255, b / 255, a / 255];
        };
        function createBound(x1, y1, x2, y2, out) {
          if (out) {
            out.x1 = x1;
            out.y1 = y1;
            out.x2 = x2;
            out.y2 = y2;
            return out;
          }
          return {
            x1,
            y1,
            x2,
            y2
          };
        }
        function boundsOverlap(a, b) {
          return a.x1 < b.x2 && a.x2 > b.x1 && a.y1 < b.y2 && a.y2 > b.y1;
        }
        function convertBoundToRect(bound, out) {
          if (out) {
            out.x = bound.x1;
            out.y = bound.y1;
            out.width = bound.x2 - bound.x1;
            out.height = bound.y2 - bound.y1;
            return out;
          }
          return {
            x: bound.x1,
            y: bound.y1,
            width: bound.x2 - bound.x1,
            height: bound.y2 - bound.y1
          };
        }
        function intersectRect(a, b, out) {
          var x = Math.max(a.x, b.x);
          var y = Math.max(a.y, b.y);
          var width = Math.min(a.x + a.width, b.x + b.width) - x;
          var height = Math.min(a.y + a.height, b.y + b.height) - y;
          if (width > 0 && height > 0) {
            if (out) {
              out.x = x;
              out.y = y;
              out.width = width;
              out.height = height;
              return out;
            }
            return {
              x,
              y,
              width,
              height
            };
          }
          if (out) {
            out.x = 0;
            out.y = 0;
            out.width = 0;
            out.height = 0;
            return out;
          }
          return {
            x: 0,
            y: 0,
            width: 0,
            height: 0
          };
        }
        function copyRect(a, out) {
          if (out) {
            out.x = a.x;
            out.y = a.y;
            out.width = a.width;
            out.height = a.height;
            return out;
          }
          return {
            x: a.x,
            y: a.y,
            width: a.width,
            height: a.height
          };
        }
        function compareRect(a, b) {
          if (a === b) {
            return true;
          }
          if (a === null || b === null) {
            return false;
          }
          return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
        }
        function boundInsideBound(bound1, bound2) {
          return bound1.x1 <= bound2.x2 && bound1.y1 <= bound2.y2 && bound1.x2 >= bound2.x1 && bound1.y2 >= bound2.y1;
        }
        function isBoundPositive(bound) {
          return bound.x1 < bound.x2 && bound.y1 < bound.y2;
        }
        function convertUrlToAbsolute(url) {
          // handle local file imports if the url isn't remote resource or data blob
          if (self.location.protocol === 'file:' && !PROTOCOL_REGEX.test(url)) {
            var path = self.location.pathname.split('/');
            path.pop();
            var _basePath = path.join('/');
            var baseUrl = self.location.protocol + '//' + _basePath;
            // check if url has a leading dot
            if (url.charAt(0) === '.') {
              url = url.slice(1);
            }
            // check if url has a leading slash
            if (url.charAt(0) === '/') {
              url = url.slice(1);
            }
            return baseUrl + '/' + url;
          }
          var absoluteUrl = new URL(url, self.location.href);
          return absoluteUrl.href;
        }

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        /**
         * A 3D matrix representing a 2D graphics transformation
         *
         * @remarks
         * For convenience, entries in the first two rows can be accessed by the following
         * properties:
         * | ta tb tx |
         * | tc td ty |
         * | 0  0  1  |
         *
         * This matrix is optimized for 2D transformations and hence the last row will
         * always be considered [0, 0 ,1].
         *
         * To access a column major array for WebGL, use the {@link getFloatArr} method.
         */
        class Matrix3d {
          /**
           * Creates a new 3x3 matrix.
           *
           * @param entries Row-major 3x3 matrix
           */
          constructor() {
            _defineProperty(this, "ta", void 0);
            _defineProperty(this, "tb", void 0);
            _defineProperty(this, "tx", void 0);
            _defineProperty(this, "tc", void 0);
            _defineProperty(this, "td", void 0);
            _defineProperty(this, "ty", void 0);
            _defineProperty(this, "_floatArr", null);
            /**
             * Potential Mutation Flag
             *
             * @remarks
             * This flag is set to true whenever the matrix is potentially modified.
             * We don't waste CPU trying to identify if each operation actually modifies
             * the matrix. Instead, we set this flag to true whenever we think the matrix
             * is modified. This signals that the `floatArr` should to be updated.
             */
            _defineProperty(this, "mutation", void 0);
            this.ta = 0;
            this.tb = 0;
            this.tx = 0;
            this.tc = 0;
            this.td = 0;
            this.ty = 0;
            this.mutation = true;
          }
          /**
           * Returns a temporary matrix that can be used for calculations.
           *
           * @remarks
           * This is useful for avoiding allocations in tight loops.
           *
           * The matrix is not guaranteed to be the same between calls.
           *
           * @returns
           */
          static get temp() {
            return tempMatrix;
          }
          static multiply(a, b, out) {
            var e0 = a.ta * b.ta + a.tb * b.tc;
            var e1 = a.ta * b.tb + a.tb * b.td;
            var e2 = a.ta * b.tx + a.tb * b.ty + a.tx;
            var e3 = a.tc * b.ta + a.td * b.tc;
            var e4 = a.tc * b.tb + a.td * b.td;
            var e5 = a.tc * b.tx + a.td * b.ty + a.ty;
            if (!out) {
              out = new Matrix3d();
            }
            out.ta = e0;
            out.tb = e1;
            out.tx = e2;
            out.tc = e3;
            out.td = e4;
            out.ty = e5;
            out.mutation = true;
            return out;
          }
          static identity(out) {
            if (!out) {
              out = new Matrix3d();
            }
            out.ta = 1;
            out.tb = 0;
            out.tx = 0;
            out.tc = 0;
            out.td = 1;
            out.ty = 0;
            out.mutation = true;
            return out;
          }
          static translate(x, y, out) {
            if (!out) {
              out = new Matrix3d();
            }
            out.ta = 1;
            out.tb = 0;
            out.tx = x;
            out.tc = 0;
            out.td = 1;
            out.ty = y;
            out.mutation = true;
            return out;
          }
          static scale(sx, sy, out) {
            if (!out) {
              out = new Matrix3d();
            }
            out.ta = sx;
            out.tb = 0;
            out.tx = 0;
            out.tc = 0;
            out.td = sy;
            out.ty = 0;
            out.mutation = true;
            return out;
          }
          static rotate(angle, out) {
            var cos = Math.cos(angle);
            var sin = Math.sin(angle);
            if (!out) {
              out = new Matrix3d();
            }
            out.ta = cos;
            out.tb = -sin;
            out.tx = 0;
            out.tc = sin;
            out.td = cos;
            out.ty = 0;
            out.mutation = true;
            return out;
          }
          static copy(src, dst) {
            if (!dst) {
              dst = new Matrix3d();
            }
            dst.ta = src.ta;
            dst.tc = src.tc;
            dst.tb = src.tb;
            dst.td = src.td;
            dst.tx = src.tx;
            dst.ty = src.ty;
            dst.mutation = true;
            return dst;
          }
          translate(x, y) {
            this.tx = this.ta * x + this.tb * y + this.tx;
            this.ty = this.tc * x + this.td * y + this.ty;
            this.mutation = true;
            return this;
          }
          scale(sx, sy) {
            this.ta = this.ta * sx;
            this.tb = this.tb * sy;
            this.tc = this.tc * sx;
            this.td = this.td * sy;
            this.mutation = true;
            return this;
          }
          rotate(angle) {
            if (angle === 0 || !(angle % Math.PI * 2)) {
              return this;
            }
            var cos = Math.cos(angle);
            var sin = Math.sin(angle);
            var e0 = this.ta * cos + this.tb * sin;
            var e1 = this.tb * cos - this.ta * sin;
            var e3 = this.tc * cos + this.td * sin;
            var e4 = this.td * cos - this.tc * sin;
            this.ta = e0;
            this.tb = e1;
            this.tc = e3;
            this.td = e4;
            this.mutation = true;
            return this;
          }
          multiply(other) {
            return Matrix3d.multiply(this, other, this);
          }
          /**
           * Returns the matrix as a Float32Array in column-major order.
           *
           * @remarks
           * This method is optimized to avoid unnecessary allocations. The same array
           * is returned every time this method is called, and is updated in place.
           *
           * WARNING: Use the array only for passing directly to a WebGL shader uniform
           * during a frame render. Do not modify or hold onto the array for longer than
           * a frame.
           */
          getFloatArr() {
            if (!this._floatArr) {
              this._floatArr = new Float32Array(9);
            }
            if (this.mutation) {
              this._floatArr[0] = this.ta;
              this._floatArr[1] = this.tc;
              this._floatArr[2] = 0;
              this._floatArr[3] = this.tb;
              this._floatArr[4] = this.td;
              this._floatArr[5] = 0;
              this._floatArr[6] = this.tx;
              this._floatArr[7] = this.ty;
              this._floatArr[8] = 1;
              this.mutation = false;
            }
            return this._floatArr;
          }
        }
        var tempMatrix = new Matrix3d();
        var rx1 = 0;
        var rx2 = 2;
        var rx3 = 4;
        var rx4 = 6;
        var ry1 = 1;
        var ry2 = 3;
        var ry3 = 5;
        var ry4 = 7;
        class RenderCoords {
          constructor(entries) {
            _defineProperty(this, "data", void 0);
            this.data = new Float32Array(8);
            if (entries) {
              this.data[rx1] = entries[rx1];
              this.data[rx2] = entries[rx2];
              this.data[rx3] = entries[rx3];
              this.data[rx4] = entries[rx4];
              this.data[ry1] = entries[ry1];
              this.data[ry2] = entries[ry2];
              this.data[ry3] = entries[ry3];
              this.data[ry4] = entries[ry4];
            }
          }
          static translate(x1, y1, x2, y2, x3, y3, x4, y4, out) {
            if (!out) {
              out = new RenderCoords();
            }
            out.data[rx1] = x1;
            out.data[rx2] = x2;
            out.data[rx3] = x3;
            out.data[rx4] = x4;
            out.data[ry1] = y1;
            out.data[ry2] = y2;
            out.data[ry3] = y3;
            out.data[ry4] = y4;
            return out;
          }
          get x1() {
            return this.data[rx1];
          }
          get x2() {
            return this.data[rx2];
          }
          get x3() {
            return this.data[rx3];
          }
          get x4() {
            return this.data[rx4];
          }
          get y1() {
            return this.data[ry1];
          }
          get y2() {
            return this.data[ry2];
          }
          get y3() {
            return this.data[ry3];
          }
          get y4() {
            return this.data[ry4];
          }
        }

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        /**
         * Core Utility Functions
         *
         * @module
         */
        var isPowerOfTwo = value => {
          return value && !(value & value - 1);
        };
        var getTimingBezier = (a, b, c, d) => {
          var xc = 3.0 * a;
          var xb = 3.0 * (c - a) - xc;
          var xa = 1.0 - xc - xb;
          var yc = 3.0 * b;
          var yb = 3.0 * (d - b) - yc;
          var ya = 1.0 - yc - yb;
          return function (time) {
            if (time >= 1.0) {
              return 1;
            }
            if (time <= 0) {
              return 0;
            }
            var t = 0.5,
              cbx,
              cbxd,
              dx;
            for (var it = 0; it < 20; it++) {
              cbx = t * (t * (t * xa + xb) + xc);
              dx = time - cbx;
              if (dx > -1e-8 && dx < 1e-8) {
                return t * (t * (t * ya + yb) + yc);
              }
              // Cubic bezier derivative.
              cbxd = t * (t * (3 * xa) + 2 * xb) + xc;
              if (cbxd > 1e-10 && cbxd < 1e-10) {
                // Problematic. Fall back to binary search method.
                break;
              }
              t += dx / cbxd;
            }
            // Fallback: binary search method. This is more reliable when there are near-0 slopes.
            var minT = 0;
            var maxT = 1;
            for (var _it = 0; _it < 20; _it++) {
              t = 0.5 * (minT + maxT);
              cbx = t * (t * (t * xa + xb) + xc);
              dx = time - cbx;
              if (dx > -1e-8 && dx < 1e-8) {
                // Solution found!
                return t * (t * (t * ya + yb) + yc);
              }
              if (dx < 0) {
                maxT = t;
              } else {
                minT = t;
              }
            }
          };
        };
        var timingMapping = {};
        var timingLookup = {
          ease: [0.25, 0.1, 0.25, 1.0],
          'ease-in': [0.42, 0, 1.0, 1.0],
          'ease-out': [0, 0, 0.58, 1.0],
          'ease-in-out': [0.42, 0, 0.58, 1.0],
          'ease-in-sine': [0.12, 0, 0.39, 0],
          'ease-out-sine': [0.12, 0, 0.39, 0],
          'ease-in-out-sine': [0.37, 0, 0.63, 1],
          'ease-in-cubic': [0.32, 0, 0.67, 0],
          'ease-out-cubic': [0.33, 1, 0.68, 1],
          'ease-in-out-cubic': [0.65, 0, 0.35, 1],
          'ease-in-circ': [0.55, 0, 1, 0.45],
          'ease-out-circ': [0, 0.55, 0.45, 1],
          'ease-in-out-circ': [0.85, 0, 0.15, 1],
          'ease-in-back': [0.36, 0, 0.66, -0.56],
          'ease-out-back': [0.34, 1.56, 0.64, 1],
          'ease-in-out-back': [0.68, -0.6, 0.32, 1.6]
        };
        var defaultTiming = t => t;
        var parseCubicBezier = str => {
          //cubic-bezier(0.84, 0.52, 0.56, 0.6)
          var regex = /-?\d*\.?\d+/g;
          var match = str.match(regex);
          if (match) {
            var _match = _slicedToArray(match, 4),
              num1 = _match[0],
              num2 = _match[1],
              num3 = _match[2],
              num4 = _match[3];
            var a = parseFloat(num1 || '0.42');
            var b = parseFloat(num2 || '0');
            var c = parseFloat(num3 || '1');
            var d = parseFloat(num4 || '1');
            var timing = getTimingBezier(a, b, c, d);
            timingMapping[str] = timing;
            return timing;
          }
          // parse failed, return linear
          console.warn('Unknown cubic-bezier timing: ' + str);
          return defaultTiming;
        };
        var getTimingFunction = str => {
          if (str === 'linear') {
            return defaultTiming;
          }
          if (timingMapping[str] !== undefined) {
            return timingMapping[str] || defaultTiming;
          }
          if (str === 'step-start') {
            return () => {
              return 1;
            };
          }
          if (str === 'step-end') {
            return time => {
              return time === 1 ? 1 : 0;
            };
          }
          var lookup = timingLookup[str];
          if (lookup !== undefined) {
            var _lookup = _slicedToArray(lookup, 4),
              a = _lookup[0],
              b = _lookup[1],
              c = _lookup[2],
              d = _lookup[3];
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore - TS doesn't understand that we've checked for undefined
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            var timing = getTimingBezier(a, b, c, d);
            timingMapping[str] = timing;
            return timing;
          }
          if (str.startsWith('cubic-bezier')) {
            return parseCubicBezier(str);
          }
          console.warn('Unknown timing function: ' + str);
          return defaultTiming;
        };
        /**
         * Convert bytes to string of megabytes with 2 decimal points
         *
         * @param bytes
         * @returns
         */
        function bytesToMb$1(bytes) {
          return (bytes / 1024 / 1024).toFixed(2);
        }

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        class CoreAnimation extends EventEmitter {
          constructor(node, props, settings) {
            var _settings$delay, _settings$duration, _settings$loop, _settings$repeat, _settings$repeatDelay, _settings$stopMethod;
            super();
            _defineProperty(this, "node", void 0);
            _defineProperty(this, "props", void 0);
            _defineProperty(this, "settings", void 0);
            _defineProperty(this, "progress", 0);
            _defineProperty(this, "delayFor", 0);
            _defineProperty(this, "timingFunction", void 0);
            _defineProperty(this, "propValuesMap", {});
            _defineProperty(this, "dynPropValuesMap", undefined);
            this.node = node;
            this.props = props;
            for (var _key2 in props) {
              if (_key2 !== 'shaderProps') {
                if (this.propValuesMap['props'] === undefined) {
                  this.propValuesMap['props'] = {};
                }
                this.propValuesMap['props'][_key2] = {
                  start: node[_key2] || 0,
                  target: props[_key2]
                };
              } else if (node.shader.type !== 'DynamicShader') {
                this.propValuesMap['shaderProps'] = {};
                for (var _key3 in props.shaderProps) {
                  this.propValuesMap['shaderProps'][_key3] = {
                    start: node.shader.props[_key3],
                    target: props.shaderProps[_key3]
                  };
                }
              } else {
                var shaderPropKeys = Object.keys(props.shaderProps);
                var spLength = shaderPropKeys.length;
                this.dynPropValuesMap = {};
                for (var j = 0; j < spLength; j++) {
                  var effectName = shaderPropKeys[j];
                  var _effect = props.shaderProps[effectName];
                  this.dynPropValuesMap[effectName] = {};
                  var effectProps = Object.entries(_effect);
                  var eLength = effectProps.length;
                  for (var k = 0; k < eLength; k++) {
                    var _effectProps$k = _slicedToArray(effectProps[k], 2),
                      _key4 = _effectProps$k[0],
                      value = _effectProps$k[1];
                    this.dynPropValuesMap[effectName][_key4] = {
                      start: node.shader.props[effectName][_key4],
                      target: value
                    };
                  }
                }
              }
            }
            var easing = settings.easing || 'linear';
            var delay = (_settings$delay = settings.delay) !== null && _settings$delay !== void 0 ? _settings$delay : 0;
            this.settings = {
              duration: (_settings$duration = settings.duration) !== null && _settings$duration !== void 0 ? _settings$duration : 0,
              delay,
              easing,
              loop: (_settings$loop = settings.loop) !== null && _settings$loop !== void 0 ? _settings$loop : false,
              repeat: (_settings$repeat = settings.repeat) !== null && _settings$repeat !== void 0 ? _settings$repeat : 0,
              repeatDelay: (_settings$repeatDelay = settings.repeatDelay) !== null && _settings$repeatDelay !== void 0 ? _settings$repeatDelay : 0,
              stopMethod: (_settings$stopMethod = settings.stopMethod) !== null && _settings$stopMethod !== void 0 ? _settings$stopMethod : false
            };
            this.timingFunction = getTimingFunction(easing);
            this.delayFor = delay;
          }
          reset() {
            this.progress = 0;
            this.delayFor = this.settings.delay || 0;
            this.update(0);
          }
          restoreValues(target, valueMap) {
            var entries = Object.entries(valueMap);
            var eLength = entries.length;
            for (var i = 0; i < eLength; i++) {
              var _entries$i = _slicedToArray(entries[i], 2),
                _key5 = _entries$i[0],
                value = _entries$i[1];
              target[_key5] = value.start;
            }
          }
          restore() {
            this.reset();
            if (this.propValuesMap['props'] !== undefined) {
              this.restoreValues(this.node, this.propValuesMap['props']);
            }
            if (this.propValuesMap['shaderProps'] !== undefined) {
              this.restoreValues(this.node.shader.props, this.propValuesMap['shaderProps']);
            }
            if (this.dynPropValuesMap !== undefined) {
              var dynEntries = Object.keys(this.dynPropValuesMap);
              var dynEntriesL = dynEntries.length;
              if (dynEntriesL > 0) {
                for (var i = 0; i < dynEntriesL; i++) {
                  var _key6 = dynEntries[i];
                  this.restoreValues(this.node.shader.props[_key6], this.dynPropValuesMap[_key6]);
                }
              }
            }
          }
          reverseValues(valueMap) {
            var entries = Object.entries(valueMap);
            var eLength = entries.length;
            for (var i = 0; i < eLength; i++) {
              var _entries$i2 = _slicedToArray(entries[i], 2),
                _key7 = _entries$i2[0],
                value = _entries$i2[1];
              valueMap[_key7] = {
                start: value.target,
                target: value.start
              };
            }
          }
          reverse() {
            this.progress = 0;
            if (this.propValuesMap['props'] !== undefined) {
              this.reverseValues(this.propValuesMap['props']);
            }
            if (this.propValuesMap['shaderProps'] !== undefined) {
              this.reverseValues(this.propValuesMap['shaderProps']);
            }
            if (this.dynPropValuesMap !== undefined) {
              var dynEntries = Object.keys(this.dynPropValuesMap);
              var dynEntriesL = dynEntries.length;
              if (dynEntriesL > 0) {
                for (var i = 0; i < dynEntriesL; i++) {
                  var _key8 = dynEntries[i];
                  this.reverseValues(this.dynPropValuesMap[_key8]);
                }
              }
            }
            // restore stop method if we are not looping
            if (!this.settings.loop) {
              this.settings.stopMethod = false;
            }
          }
          applyEasing(p, s, e) {
            return (this.timingFunction(p) || p) * (e - s) + s;
          }
          updateValue(propName, propValue, startValue, easing) {
            if (this.progress === 1) {
              return propValue;
            }
            if (this.progress === 0) {
              return startValue;
            }
            var endValue = propValue;
            if (propName.indexOf('color') !== -1) {
              if (startValue === endValue) {
                return startValue;
              }
              if (easing) {
                var easingProgressValue = this.timingFunction(this.progress) || this.progress;
                return mergeColorProgress(startValue, endValue, easingProgressValue);
              }
              return mergeColorProgress(startValue, endValue, this.progress);
            }
            if (easing) {
              return this.applyEasing(this.progress, startValue, endValue);
            }
            return startValue + (endValue - startValue) * this.progress;
          }
          updateValues(target, valueMap, easing) {
            var entries = Object.entries(valueMap);
            var eLength = entries.length;
            for (var i = 0; i < eLength; i++) {
              var _entries$i3 = _slicedToArray(entries[i], 2),
                _key9 = _entries$i3[0],
                value = _entries$i3[1];
              target[_key9] = this.updateValue(_key9, value.target, value.start, easing);
            }
          }
          update(dt) {
            var _this$settings = this.settings,
              duration = _this$settings.duration,
              loop = _this$settings.loop,
              easing = _this$settings.easing,
              stopMethod = _this$settings.stopMethod;
            var delayFor = this.delayFor;
            if (duration === 0 && delayFor === 0) {
              this.emit('finished', {});
              return;
            }
            if (this.delayFor > 0) {
              this.delayFor -= dt;
              if (this.delayFor >= 0) {
                // Either no or more delay left. Exit.
                return;
              } else {
                // We went beyond the delay time, add it back to dt so we can continue
                // with the animation.
                dt = -this.delayFor;
                this.delayFor = 0;
              }
            }
            if (duration === 0) {
              // No duration, we are done.
              this.emit('finished', {});
              return;
            }
            if (this.progress === 0) {
              // Progress is 0, we are starting the post-delay part of the animation.
              this.emit('animating', {});
            }
            this.progress += dt / duration;
            if (this.progress > 1) {
              this.progress = loop ? 0 : 1;
              if (stopMethod) {
                // If there's a stop method emit finished so the stop method can be applied.
                // TODO: We should probably reevaluate how stopMethod is implemented as currently
                // stop method 'reset' does not work when looping.
                this.emit('finished', {});
                return;
              }
            }
            if (this.propValuesMap['props'] !== undefined) {
              this.updateValues(this.node, this.propValuesMap['props'], easing);
            }
            if (this.propValuesMap['shaderProps'] !== undefined) {
              this.updateValues(this.node.shader.props, this.propValuesMap['shaderProps'], easing);
            }
            if (this.dynPropValuesMap !== undefined) {
              var dynEntries = Object.keys(this.dynPropValuesMap);
              var dynEntriesL = dynEntries.length;
              if (dynEntriesL > 0) {
                for (var i = 0; i < dynEntriesL; i++) {
                  var _key10 = dynEntries[i];
                  this.updateValues(this.node.shader.props[_key10], this.dynPropValuesMap[_key10], easing);
                }
              }
            }
            if (this.progress === 1) {
              this.emit('finished', {});
            }
          }
        }

        /* eslint-disable @typescript-eslint/unbound-method */
        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        class CoreAnimationController extends EventEmitter {
          constructor(manager, animation) {
            super();
            _defineProperty(this, "manager", void 0);
            _defineProperty(this, "animation", void 0);
            _defineProperty(this, "stoppedPromise", void 0);
            /**
             * If this is null, then the animation is in a finished / stopped state.
             */
            _defineProperty(this, "stoppedResolve", null);
            _defineProperty(this, "state", void 0);
            this.manager = manager;
            this.animation = animation;
            this.state = 'stopped';
            // Initial stopped promise is resolved (since the animation is stopped)
            this.stoppedPromise = Promise.resolve();
            // Bind event handlers
            this.onAnimating = this.onAnimating.bind(this);
            this.onFinished = this.onFinished.bind(this);
          }
          start() {
            if (this.state !== 'running') {
              this.makeStoppedPromise();
              this.registerAnimation();
              this.state = 'running';
            }
            return this;
          }
          stop() {
            this.unregisterAnimation();
            if (this.stoppedResolve !== null) {
              this.stoppedResolve();
              this.stoppedResolve = null;
              this.emit('stopped', this);
            }
            this.animation.reset();
            this.state = 'stopped';
            return this;
          }
          pause() {
            this.unregisterAnimation();
            this.state = 'paused';
            return this;
          }
          restore() {
            this.stoppedResolve = null;
            this.animation.restore();
            return this;
          }
          waitUntilStopped() {
            return this.stoppedPromise;
          }
          registerAnimation() {
            // Hook up event listeners
            this.animation.once('finished', this.onFinished);
            this.animation.on('animating', this.onAnimating);
            // Then register the animation
            this.manager.registerAnimation(this.animation);
          }
          unregisterAnimation() {
            // First unregister the animation
            this.manager.unregisterAnimation(this.animation);
            // Then unhook event listeners
            this.animation.off('finished', this.onFinished);
            this.animation.off('animating', this.onAnimating);
          }
          makeStoppedPromise() {
            if (this.stoppedResolve === null) {
              this.stoppedPromise = new Promise(resolve => {
                this.stoppedResolve = resolve;
              });
            }
          }
          onFinished() {
            assertTruthy(this.stoppedResolve);
            // If the animation is looping, then we need to restart it.
            var _this$animation$setti = this.animation.settings,
              loop = _this$animation$setti.loop,
              stopMethod = _this$animation$setti.stopMethod;
            if (stopMethod === 'reverse') {
              this.animation.once('finished', this.onFinished);
              this.animation.reverse();
              return;
            }
            if (loop) {
              return;
            }
            // unregister animation
            this.unregisterAnimation();
            // resolve promise
            this.stoppedResolve();
            this.stoppedResolve = null;
            this.emit('stopped', this);
            this.state = 'stopped';
          }
          onAnimating() {
            this.emit('animating', this);
          }
        }

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        var CoreNodeRenderState;
        (function (CoreNodeRenderState) {
          CoreNodeRenderState[CoreNodeRenderState["Init"] = 0] = "Init";
          CoreNodeRenderState[CoreNodeRenderState["OutOfBounds"] = 2] = "OutOfBounds";
          CoreNodeRenderState[CoreNodeRenderState["InBounds"] = 4] = "InBounds";
          CoreNodeRenderState[CoreNodeRenderState["InViewport"] = 8] = "InViewport";
        })(CoreNodeRenderState || (CoreNodeRenderState = {}));
        var CoreNodeRenderStateMap = new Map();
        CoreNodeRenderStateMap.set(CoreNodeRenderState.Init, 'init');
        CoreNodeRenderStateMap.set(CoreNodeRenderState.OutOfBounds, 'outOfBounds');
        CoreNodeRenderStateMap.set(CoreNodeRenderState.InBounds, 'inBounds');
        CoreNodeRenderStateMap.set(CoreNodeRenderState.InViewport, 'inViewport');
        var UpdateType;
        (function (UpdateType) {
          /**
           * Child updates
           */
          UpdateType[UpdateType["Children"] = 1] = "Children";
          /**
           * Scale/Rotate transform update
           *
           * @remarks
           * CoreNode Properties Updated:
           * - `scaleRotateTransform`
           */
          UpdateType[UpdateType["ScaleRotate"] = 2] = "ScaleRotate";
          /**
           * Translate transform update (x/y/width/height/pivot/mount)
           *
           * @remarks
           * CoreNode Properties Updated:
           * - `localTransform`
           */
          UpdateType[UpdateType["Local"] = 4] = "Local";
          /**
           * Global Transform update
           *
           * @remarks
           * CoreNode Properties Updated:
           * - `globalTransform`
           * - `renderCoords`
           * - `renderBound`
           */
          UpdateType[UpdateType["Global"] = 8] = "Global";
          /**
           * Clipping rect update
           *
           * @remarks
           * CoreNode Properties Updated:
           * - `clippingRect`
           */
          UpdateType[UpdateType["Clipping"] = 16] = "Clipping";
          /**
           * Calculated ZIndex update
           *
           * @remarks
           * CoreNode Properties Updated:
           * - `calcZIndex`
           */
          UpdateType[UpdateType["CalculatedZIndex"] = 32] = "CalculatedZIndex";
          /**
           * Z-Index Sorted Children update
           *
           * @remarks
           * CoreNode Properties Updated:
           * - `children` (sorts children by their `calcZIndex`)
           */
          UpdateType[UpdateType["ZIndexSortedChildren"] = 64] = "ZIndexSortedChildren";
          /**
           * Premultiplied Colors update
           *
           * @remarks
           * CoreNode Properties Updated:
           * - `premultipliedColorTl`
           * - `premultipliedColorTr`
           * - `premultipliedColorBl`
           * - `premultipliedColorBr`
           */
          UpdateType[UpdateType["PremultipliedColors"] = 128] = "PremultipliedColors";
          /**
           * World Alpha update
           *
           * @remarks
           * CoreNode Properties Updated:
           * - `worldAlpha` = `parent.worldAlpha` * `alpha`
           */
          UpdateType[UpdateType["WorldAlpha"] = 256] = "WorldAlpha";
          /**
           * Render State update
           *
           * @remarks
           * CoreNode Properties Updated:
           * - `renderState`
           */
          UpdateType[UpdateType["RenderState"] = 512] = "RenderState";
          /**
           * Is Renderable update
           *
           * @remarks
           * CoreNode Properties Updated:
           * - `isRenderable`
           */
          UpdateType[UpdateType["IsRenderable"] = 1024] = "IsRenderable";
          /**
           * Render Texture update
           */
          UpdateType[UpdateType["RenderTexture"] = 2048] = "RenderTexture";
          /**
           * Track if parent has render texture
           */
          UpdateType[UpdateType["ParentRenderTexture"] = 4096] = "ParentRenderTexture";
          /**
           * None
           */
          UpdateType[UpdateType["None"] = 0] = "None";
          /**
           * All
           */
          UpdateType[UpdateType["All"] = 8191] = "All";
        })(UpdateType || (UpdateType = {}));
        /**
         * A visual Node in the Renderer scene graph.
         *
         * @remarks
         * CoreNode is an internally used class that represents a Renderer Node in the
         * scene graph. See INode.ts for the public APIs exposed to Renderer users
         * that include generic types for Shaders.
         */
        class CoreNode extends EventEmitter {
          constructor(stage, props) {
            super();
            _defineProperty(this, "stage", void 0);
            _defineProperty(this, "children", []);
            _defineProperty(this, "_id", getNewId());
            _defineProperty(this, "props", void 0);
            _defineProperty(this, "updateType", UpdateType.All);
            _defineProperty(this, "globalTransform", void 0);
            _defineProperty(this, "scaleRotateTransform", void 0);
            _defineProperty(this, "localTransform", void 0);
            _defineProperty(this, "renderCoords", void 0);
            _defineProperty(this, "renderBound", void 0);
            _defineProperty(this, "strictBound", void 0);
            _defineProperty(this, "preloadBound", void 0);
            _defineProperty(this, "clippingRect", {
              x: 0,
              y: 0,
              width: 0,
              height: 0,
              valid: false
            });
            _defineProperty(this, "isRenderable", false);
            _defineProperty(this, "renderState", CoreNodeRenderState.Init);
            _defineProperty(this, "worldAlpha", 1);
            _defineProperty(this, "premultipliedColorTl", 0);
            _defineProperty(this, "premultipliedColorTr", 0);
            _defineProperty(this, "premultipliedColorBl", 0);
            _defineProperty(this, "premultipliedColorBr", 0);
            _defineProperty(this, "calcZIndex", 0);
            _defineProperty(this, "hasRTTupdates", false);
            _defineProperty(this, "parentHasRenderTexture", false);
            _defineProperty(this, "onTextureLoaded", (_, dimensions) => {
              var _this$props$textureOp;
              this.autosizeNode(dimensions);
              // Texture was loaded. In case the RAF loop has already stopped, we request
              // a render to ensure the texture is rendered.
              this.stage.requestRender();
              // If parent has a render texture, flag that we need to update
              // @todo: Reserve type for RTT updates
              if (this.parentHasRenderTexture) {
                this.setRTTUpdates(1);
              }
              this.emit('loaded', {
                type: 'texture',
                dimensions
              });
              // Trigger a local update if the texture is loaded and the resizeMode is 'contain'
              if (((_this$props$textureOp = this.props.textureOptions) === null || _this$props$textureOp === void 0 || (_this$props$textureOp = _this$props$textureOp.resizeMode) === null || _this$props$textureOp === void 0 ? void 0 : _this$props$textureOp.type) === 'contain') {
                this.setUpdateType(UpdateType.Local);
              }
            });
            _defineProperty(this, "onTextureFailed", (_, error) => {
              this.emit('failed', {
                type: 'texture',
                error
              });
            });
            _defineProperty(this, "onTextureFreed", () => {
              this.emit('freed', {
                type: 'texture'
              });
            });
            this.stage = stage;
            this.props = _objectSpread(_objectSpread({}, props), {}, {
              parent: null,
              texture: null,
              src: null,
              rtt: false
            });
            // Assign props to instance
            this.parent = props.parent;
            this.texture = props.texture;
            this.src = props.src;
            this.rtt = props.rtt;
            this.updateScaleRotateTransform();
          }
          //#region Textures
          loadTexture() {
            var texture = this.props.texture;
            assertTruthy(texture);
            // If texture is already loaded / failed, trigger loaded event manually
            // so that users get a consistent event experience.
            // We do this in a microtask to allow listeners to be attached in the same
            // synchronous task after calling loadTexture()
            queueMicrotask(() => {
              texture.preventCleanup = this.props.preventCleanup;
              // Preload texture if required
              if (this.textureOptions.preload) {
                texture.ctxTexture.load();
              }
              if (texture.state === 'loaded') {
                assertTruthy(texture.dimensions);
                this.onTextureLoaded(texture, texture.dimensions);
              } else if (texture.state === 'failed') {
                assertTruthy(texture.error);
                this.onTextureFailed(texture, texture.error);
              } else if (texture.state === 'freed') {
                this.onTextureFreed(texture);
              }
              texture.on('loaded', this.onTextureLoaded);
              texture.on('failed', this.onTextureFailed);
              texture.on('freed', this.onTextureFreed);
            });
          }
          unloadTexture() {
            if (this.texture) {
              this.texture.off('loaded', this.onTextureLoaded);
              this.texture.off('failed', this.onTextureFailed);
              this.texture.off('freed', this.onTextureFreed);
              this.texture.setRenderableOwner(this, false);
            }
          }
          autosizeNode(dimensions) {
            if (this.autosize) {
              this.width = dimensions.width;
              this.height = dimensions.height;
            }
          }
          //#endregion Textures
          /**
           * Change types types is used to determine the scope of the changes being applied
           *
           * @remarks
           * See {@link UpdateType} for more information on each type
           *
           * @param type
           */
          setUpdateType(type) {
            this.updateType |= type;
            // If we're updating this node at all, we need to inform the parent
            // (and all ancestors) that their children need updating as well
            var parent = this.props.parent;
            if (parent && !(parent.updateType & UpdateType.Children)) {
              parent.setUpdateType(UpdateType.Children);
            }
            // If node is part of RTT texture
            // Flag that we need to update
            if (this.parentHasRenderTexture) {
              this.setRTTUpdates(type);
            }
          }
          sortChildren() {
            this.children.sort((a, b) => a.calcZIndex - b.calcZIndex);
          }
          updateScaleRotateTransform() {
            var _this$props = this.props,
              rotation = _this$props.rotation,
              scaleX = _this$props.scaleX,
              scaleY = _this$props.scaleY;
            // optimize simple translation cases
            if (rotation === 0 && scaleX === 1 && scaleY === 1) {
              this.scaleRotateTransform = undefined;
              return;
            }
            this.scaleRotateTransform = Matrix3d.rotate(rotation, this.scaleRotateTransform).scale(scaleX, scaleY);
          }
          updateLocalTransform() {
            var _this$props$textureOp2;
            var _this$props2 = this.props,
              x = _this$props2.x,
              y = _this$props2.y,
              width = _this$props2.width,
              height = _this$props2.height;
            var mountTranslateX = this.props.mountX * width;
            var mountTranslateY = this.props.mountY * height;
            if (this.scaleRotateTransform) {
              var pivotTranslateX = this.props.pivotX * width;
              var pivotTranslateY = this.props.pivotY * height;
              this.localTransform = Matrix3d.translate(x - mountTranslateX + pivotTranslateX, y - mountTranslateY + pivotTranslateY, this.localTransform).multiply(this.scaleRotateTransform).translate(-pivotTranslateX, -pivotTranslateY);
            } else {
              this.localTransform = Matrix3d.translate(x - mountTranslateX, y - mountTranslateY, this.localTransform);
            }
            // Handle 'contain' resize mode
            var texture = this.props.texture;
            if (texture && texture.dimensions && ((_this$props$textureOp2 = this.props.textureOptions) === null || _this$props$textureOp2 === void 0 || (_this$props$textureOp2 = _this$props$textureOp2.resizeMode) === null || _this$props$textureOp2 === void 0 ? void 0 : _this$props$textureOp2.type) === 'contain') {
              var resizeModeScaleX = 1;
              var resizeModeScaleY = 1;
              var extraX = 0;
              var extraY = 0;
              var _texture$dimensions = texture.dimensions,
                tw = _texture$dimensions.width,
                th = _texture$dimensions.height;
              var txAspectRatio = tw / th;
              var nodeAspectRatio = width / height;
              if (txAspectRatio > nodeAspectRatio) {
                // Texture is wider than node
                // Center the node vertically (shift down by extraY)
                // Scale the node vertically to maintain original aspect ratio
                var scaleX = width / tw;
                var scaledTxHeight = th * scaleX;
                extraY = (height - scaledTxHeight) / 2;
                resizeModeScaleY = scaledTxHeight / height;
              } else {
                // Texture is taller than node (or equal)
                // Center the node horizontally (shift right by extraX)
                // Scale the node horizontally to maintain original aspect ratio
                var scaleY = height / th;
                var scaledTxWidth = tw * scaleY;
                extraX = (width - scaledTxWidth) / 2;
                resizeModeScaleX = scaledTxWidth / width;
              }
              // Apply the extra translation and scale to the local transform
              this.localTransform.translate(extraX, extraY).scale(resizeModeScaleX, resizeModeScaleY);
            }
            this.setUpdateType(UpdateType.Global);
          }
          /**
           * @todo: test for correct calculation flag
           * @param delta
           */
          update(delta, parentClippingRect) {
            if (this.updateType & UpdateType.ScaleRotate) {
              this.updateScaleRotateTransform();
              this.setUpdateType(UpdateType.Local);
            }
            if (this.updateType & UpdateType.Local) {
              this.updateLocalTransform();
              this.setUpdateType(UpdateType.Global);
            }
            var parent = this.props.parent;
            var childUpdateType = UpdateType.None;
            if (this.updateType & UpdateType.ParentRenderTexture) {
              var p = this.parent;
              while (p) {
                if (p.rtt) {
                  this.parentHasRenderTexture = true;
                }
                p = p.parent;
              }
            }
            // If we have render texture updates and not already running a full update
            if (this.updateType ^ UpdateType.All && this.updateType & UpdateType.RenderTexture) {
              this.children.forEach(child => {
                child.setUpdateType(UpdateType.All);
              });
            }
            if (this.updateType & UpdateType.Global) {
              var _this$props$parent;
              assertTruthy(this.localTransform);
              this.globalTransform = Matrix3d.copy((parent === null || parent === void 0 ? void 0 : parent.globalTransform) || this.localTransform, this.globalTransform);
              if (this.parentHasRenderTexture && (_this$props$parent = this.props.parent) !== null && _this$props$parent !== void 0 && _this$props$parent.rtt) {
                this.globalTransform = Matrix3d.identity();
              }
              if (parent) {
                this.globalTransform.multiply(this.localTransform);
              }
              this.calculateRenderCoords();
              this.updateBoundingRect();
              this.setUpdateType(UpdateType.Clipping | UpdateType.RenderState | UpdateType.Children);
              childUpdateType |= UpdateType.Global;
            }
            if (this.updateType & UpdateType.Clipping) {
              this.calculateClippingRect(parentClippingRect);
              this.setUpdateType(UpdateType.Children);
              childUpdateType |= UpdateType.Clipping;
            }
            if (this.updateType & UpdateType.WorldAlpha) {
              if (parent) {
                this.worldAlpha = parent.worldAlpha * this.props.alpha;
              } else {
                this.worldAlpha = this.props.alpha;
              }
              this.setUpdateType(UpdateType.Children | UpdateType.PremultipliedColors | UpdateType.IsRenderable);
              childUpdateType |= UpdateType.WorldAlpha;
            }
            if (this.updateType & UpdateType.PremultipliedColors) {
              this.premultipliedColorTl = mergeColorAlphaPremultiplied(this.props.colorTl, this.worldAlpha, true);
              // If all the colors are the same just sent them all to the same value
              if (this.props.colorTl === this.props.colorTr && this.props.colorBl === this.props.colorBr && this.props.colorTl === this.props.colorBl) {
                this.premultipliedColorTr = this.premultipliedColorBl = this.premultipliedColorBr = this.premultipliedColorTl;
              } else {
                this.premultipliedColorTr = mergeColorAlphaPremultiplied(this.props.colorTr, this.worldAlpha, true);
                this.premultipliedColorBl = mergeColorAlphaPremultiplied(this.props.colorBl, this.worldAlpha, true);
                this.premultipliedColorBr = mergeColorAlphaPremultiplied(this.props.colorBr, this.worldAlpha, true);
              }
            }
            if (this.updateType & UpdateType.RenderState) {
              this.updateRenderState(parentClippingRect);
              this.setUpdateType(UpdateType.IsRenderable);
            }
            if (this.updateType & UpdateType.IsRenderable) {
              this.updateIsRenderable();
            }
            // No need to update zIndex if there is no parent
            if (parent && this.updateType & UpdateType.CalculatedZIndex) {
              this.calculateZIndex();
              // Tell parent to re-sort children
              parent.setUpdateType(UpdateType.ZIndexSortedChildren);
            }
            if (this.updateType & UpdateType.Children && this.children.length && !this.rtt) {
              this.children.forEach(child => {
                // Trigger the depenedent update types on the child
                child.setUpdateType(childUpdateType);
                // If child has no updates, skip
                if (child.updateType === 0) {
                  return;
                }
                child.update(delta, this.clippingRect);
              });
            }
            // Sorting children MUST happen after children have been updated so
            // that they have the oppotunity to update their calculated zIndex.
            if (this.updateType & UpdateType.ZIndexSortedChildren) {
              // reorder z-index
              this.sortChildren();
            }
            // reset update type
            this.updateType = 0;
          }
          //check if CoreNode is renderable based on props
          checkRenderProps() {
            if (this.props.texture) {
              return true;
            }
            if (!this.props.width || !this.props.height) {
              return false;
            }
            if (this.props.shader !== this.stage.defShaderCtr) {
              return true;
            }
            if (this.props.clipping) {
              return true;
            }
            if (this.props.color !== 0) {
              return true;
            }
            // Consider removing these checks and just using the color property check above.
            // Maybe add a forceRender prop for nodes that should always render.
            if (this.props.colorTop !== 0) {
              return true;
            }
            if (this.props.colorBottom !== 0) {
              return true;
            }
            if (this.props.colorLeft !== 0) {
              return true;
            }
            if (this.props.colorRight !== 0) {
              return true;
            }
            if (this.props.colorTl !== 0) {
              return true;
            }
            if (this.props.colorTr !== 0) {
              return true;
            }
            if (this.props.colorBl !== 0) {
              return true;
            }
            if (this.props.colorBr !== 0) {
              return true;
            }
            return false;
          }
          checkRenderBounds(parentClippingRect) {
            assertTruthy(this.renderBound);
            var rectW = parentClippingRect.width || this.stage.root.width;
            var rectH = parentClippingRect.height || this.stage.root.height;
            this.strictBound = createBound(parentClippingRect.x, parentClippingRect.y, parentClippingRect.x + rectW, parentClippingRect.y + rectH, this.strictBound);
            if (boundInsideBound(this.renderBound, this.strictBound)) {
              return CoreNodeRenderState.InViewport;
            }
            var renderM = this.stage.boundsMargin;
            this.preloadBound = createBound(this.strictBound.x1 - renderM[3], this.strictBound.y1 - renderM[0], this.strictBound.x2 + renderM[1], this.strictBound.y2 + renderM[2], this.preloadBound);
            if (boundInsideBound(this.renderBound, this.preloadBound)) {
              return CoreNodeRenderState.InBounds;
            }
            return CoreNodeRenderState.OutOfBounds;
          }
          updateRenderState(parentClippingRect) {
            var renderState = this.checkRenderBounds(parentClippingRect);
            if (renderState === this.renderState) {
              return;
            }
            var previous = this.renderState;
            this.renderState = renderState;
            var event = CoreNodeRenderStateMap.get(renderState);
            assertTruthy(event);
            this.emit(event, {
              previous,
              current: renderState
            });
          }
          /**
           * This function updates the `isRenderable` property based on certain conditions.
           *
           * @returns
           */
          updateIsRenderable() {
            var newIsRenderable;
            if (this.worldAlpha === 0 || !this.checkRenderProps()) {
              newIsRenderable = false;
            } else {
              newIsRenderable = this.renderState > CoreNodeRenderState.OutOfBounds;
            }
            if (this.isRenderable !== newIsRenderable) {
              this.isRenderable = newIsRenderable;
              this.onChangeIsRenderable(newIsRenderable);
            }
          }
          onChangeIsRenderable(isRenderable) {
            var _this$texture;
            (_this$texture = this.texture) === null || _this$texture === void 0 || _this$texture.setRenderableOwner(this, isRenderable);
          }
          calculateRenderCoords() {
            var width = this.width,
              height = this.height,
              transform = this.globalTransform;
            assertTruthy(transform);
            var tx = transform.tx,
              ty = transform.ty,
              ta = transform.ta,
              tb = transform.tb,
              tc = transform.tc,
              td = transform.td;
            if (tb === 0 && tc === 0) {
              var minX = tx;
              var maxX = tx + width * ta;
              var minY = ty;
              var maxY = ty + height * td;
              this.renderCoords = RenderCoords.translate(
              //top-left
              minX, minY,
              //top-right
              maxX, minY,
              //bottom-right
              maxX, maxY,
              //bottom-left
              minX, maxY, this.renderCoords);
            } else {
              this.renderCoords = RenderCoords.translate(
              //top-left
              tx, ty,
              //top-right
              tx + width * ta, ty + width * tc,
              //bottom-right
              tx + width * ta + height * tb, ty + width * tc + height * td,
              //bottom-left
              tx + height * tb, ty + height * td, this.renderCoords);
            }
          }
          updateBoundingRect() {
            var renderCoords = this.renderCoords,
              transform = this.globalTransform;
            assertTruthy(transform);
            assertTruthy(renderCoords);
            var tb = transform.tb,
              tc = transform.tc;
            var x1 = renderCoords.x1,
              y1 = renderCoords.y1,
              x3 = renderCoords.x3,
              y3 = renderCoords.y3;
            if (tb === 0 || tc === 0) {
              this.renderBound = createBound(x1, y1, x3, y3, this.renderBound);
            } else {
              var x2 = renderCoords.x2,
                x4 = renderCoords.x4,
                y2 = renderCoords.y2,
                y4 = renderCoords.y4;
              this.renderBound = createBound(Math.min(x1, x2, x3, x4), Math.min(y1, y2, y3, y4), Math.max(x1, x2, x3, x4), Math.max(y1, y2, y3, y4), this.renderBound);
            }
          }
          /**
           * This function calculates the clipping rectangle for a node.
           *
           * The function then checks if the node is rotated. If the node requires clipping and is not rotated, a new clipping rectangle is created based on the node's global transform and dimensions.
           * If a parent clipping rectangle exists, it is intersected with the node's clipping rectangle (if it exists), or replaces the node's clipping rectangle.
           *
           * Finally, the node's parentClippingRect and clippingRect properties are updated.
           */
          calculateClippingRect(parentClippingRect) {
            assertTruthy(this.globalTransform);
            var clippingRect = this.clippingRect,
              props = this.props,
              gt = this.globalTransform;
            var clipping = props.clipping;
            var isRotated = gt.tb !== 0 || gt.tc !== 0;
            if (clipping && !isRotated) {
              clippingRect.x = gt.tx;
              clippingRect.y = gt.ty;
              clippingRect.width = this.width * gt.ta;
              clippingRect.height = this.height * gt.td;
              clippingRect.valid = true;
            } else {
              clippingRect.valid = false;
            }
            if (parentClippingRect.valid && clippingRect.valid) {
              // Intersect parent clipping rect with node clipping rect
              intersectRect(parentClippingRect, clippingRect, clippingRect);
            } else if (parentClippingRect.valid) {
              // Copy parent clipping rect
              copyRect(parentClippingRect, clippingRect);
              clippingRect.valid = true;
            }
          }
          calculateZIndex() {
            var _props$parent, _props$parent2;
            var props = this.props;
            var z = props.zIndex || 0;
            var p = ((_props$parent = props.parent) === null || _props$parent === void 0 ? void 0 : _props$parent.zIndex) || 0;
            var zIndex = z;
            if ((_props$parent2 = props.parent) !== null && _props$parent2 !== void 0 && _props$parent2.zIndexLocked) {
              zIndex = z < p ? z : p;
            }
            this.calcZIndex = zIndex;
          }
          /**
           * Destroy the node and cleanup all resources
           */
          destroy() {
            this.unloadTexture();
            this.clippingRect.valid = false;
            this.isRenderable = false;
            delete this.renderCoords;
            delete this.renderBound;
            delete this.strictBound;
            delete this.preloadBound;
            delete this.globalTransform;
            delete this.scaleRotateTransform;
            delete this.localTransform;
            this.props.texture = null;
            this.props.shader = this.stage.defShaderCtr;
            var children = [...this.children];
            for (var i = 0; i < children.length; i++) {
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              children[i].destroy();
            }
            // This very action will also remove the node from the parent's children array
            this.parent = null;
            if (this.rtt) {
              this.stage.renderer.removeRTTNode(this);
            }
            this.removeAllListeners();
          }
          renderQuads(renderer) {
            var _this$props3 = this.props,
              texture = _this$props3.texture,
              width = _this$props3.width,
              height = _this$props3.height,
              textureOptions = _this$props3.textureOptions,
              rtt = _this$props3.rtt,
              shader = _this$props3.shader;
            // Prevent quad rendering if parent has a render texture
            // and renderer is not currently rendering to a texture
            if (this.parentHasRenderTexture) {
              if (!renderer.renderToTextureActive) {
                return;
              }
              // Prevent quad rendering if parent render texture is not the active render texture
              if (this.parentRenderTexture !== renderer.activeRttNode) {
                return;
              }
            }
            var premultipliedColorTl = this.premultipliedColorTl,
              premultipliedColorTr = this.premultipliedColorTr,
              premultipliedColorBl = this.premultipliedColorBl,
              premultipliedColorBr = this.premultipliedColorBr;
            var zIndex = this.zIndex,
              worldAlpha = this.worldAlpha,
              gt = this.globalTransform,
              clippingRect = this.clippingRect,
              renderCoords = this.renderCoords;
            assertTruthy(gt);
            assertTruthy(renderCoords);
            // add to list of renderables to be sorted before rendering
            renderer.addQuad({
              width,
              height,
              colorTl: premultipliedColorTl,
              colorTr: premultipliedColorTr,
              colorBl: premultipliedColorBl,
              colorBr: premultipliedColorBr,
              texture,
              textureOptions,
              zIndex,
              shader: shader.shader,
              shaderProps: shader.getResolvedProps(),
              alpha: worldAlpha,
              clippingRect,
              tx: gt.tx,
              ty: gt.ty,
              ta: gt.ta,
              tb: gt.tb,
              tc: gt.tc,
              td: gt.td,
              renderCoords,
              rtt,
              parentHasRenderTexture: this.parentHasRenderTexture,
              framebufferDimensions: this.framebufferDimensions
            });
          }
          //#region Properties
          get id() {
            return this._id;
          }
          get data() {
            return this.props.data;
          }
          set data(d) {
            this.props.data = d;
          }
          get x() {
            return this.props.x;
          }
          set x(value) {
            if (this.props.x !== value) {
              this.props.x = value;
              this.setUpdateType(UpdateType.Local);
            }
          }
          get absX() {
            var _this$props$parent2, _this$props$parent3;
            return this.props.x + -this.props.width * this.props.mountX + (((_this$props$parent2 = this.props.parent) === null || _this$props$parent2 === void 0 ? void 0 : _this$props$parent2.absX) || ((_this$props$parent3 = this.props.parent) === null || _this$props$parent3 === void 0 || (_this$props$parent3 = _this$props$parent3.globalTransform) === null || _this$props$parent3 === void 0 ? void 0 : _this$props$parent3.tx) || 0);
          }
          get absY() {
            var _this$props$parent$ab, _this$props$parent4;
            return this.props.y + -this.props.height * this.props.mountY + ((_this$props$parent$ab = (_this$props$parent4 = this.props.parent) === null || _this$props$parent4 === void 0 ? void 0 : _this$props$parent4.absY) !== null && _this$props$parent$ab !== void 0 ? _this$props$parent$ab : 0);
          }
          get y() {
            return this.props.y;
          }
          set y(value) {
            if (this.props.y !== value) {
              this.props.y = value;
              this.setUpdateType(UpdateType.Local);
            }
          }
          get width() {
            return this.props.width;
          }
          set width(value) {
            if (this.props.width !== value) {
              this.props.width = value;
              this.setUpdateType(UpdateType.Local);
              if (this.props.rtt) {
                this.texture = this.stage.txManager.loadTexture('RenderTexture', {
                  width: this.width,
                  height: this.height
                });
                this.textureOptions.preload = true;
                this.setUpdateType(UpdateType.RenderTexture);
              }
            }
          }
          get height() {
            return this.props.height;
          }
          set height(value) {
            if (this.props.height !== value) {
              this.props.height = value;
              this.setUpdateType(UpdateType.Local);
              if (this.props.rtt) {
                this.texture = this.stage.txManager.loadTexture('RenderTexture', {
                  width: this.width,
                  height: this.height
                });
                this.textureOptions.preload = true;
                this.setUpdateType(UpdateType.RenderTexture);
              }
            }
          }
          get scale() {
            // The CoreNode `scale` property is only used by Animations.
            // Unlike INode, `null` should never be possibility for Animations.
            return this.scaleX;
          }
          set scale(value) {
            // The CoreNode `scale` property is only used by Animations.
            // Unlike INode, `null` should never be possibility for Animations.
            this.scaleX = value;
            this.scaleY = value;
          }
          get scaleX() {
            return this.props.scaleX;
          }
          set scaleX(value) {
            if (this.props.scaleX !== value) {
              this.props.scaleX = value;
              this.setUpdateType(UpdateType.ScaleRotate);
            }
          }
          get scaleY() {
            return this.props.scaleY;
          }
          set scaleY(value) {
            if (this.props.scaleY !== value) {
              this.props.scaleY = value;
              this.setUpdateType(UpdateType.ScaleRotate);
            }
          }
          get mount() {
            return this.props.mount;
          }
          set mount(value) {
            if (this.props.mountX !== value || this.props.mountY !== value) {
              this.props.mountX = value;
              this.props.mountY = value;
              this.props.mount = value;
              this.setUpdateType(UpdateType.Local);
            }
          }
          get mountX() {
            return this.props.mountX;
          }
          set mountX(value) {
            if (this.props.mountX !== value) {
              this.props.mountX = value;
              this.setUpdateType(UpdateType.Local);
            }
          }
          get mountY() {
            return this.props.mountY;
          }
          set mountY(value) {
            if (this.props.mountY !== value) {
              this.props.mountY = value;
              this.setUpdateType(UpdateType.Local);
            }
          }
          get pivot() {
            return this.props.pivot;
          }
          set pivot(value) {
            if (this.props.pivotX !== value || this.props.pivotY !== value) {
              this.props.pivotX = value;
              this.props.pivotY = value;
              this.props.pivot = value;
              this.setUpdateType(UpdateType.Local);
            }
          }
          get pivotX() {
            return this.props.pivotX;
          }
          set pivotX(value) {
            if (this.props.pivotX !== value) {
              this.props.pivotX = value;
              this.setUpdateType(UpdateType.Local);
            }
          }
          get pivotY() {
            return this.props.pivotY;
          }
          set pivotY(value) {
            if (this.props.pivotY !== value) {
              this.props.pivotY = value;
              this.setUpdateType(UpdateType.Local);
            }
          }
          get rotation() {
            return this.props.rotation;
          }
          set rotation(value) {
            if (this.props.rotation !== value) {
              this.props.rotation = value;
              this.setUpdateType(UpdateType.ScaleRotate);
            }
          }
          get alpha() {
            return this.props.alpha;
          }
          set alpha(value) {
            this.props.alpha = value;
            this.setUpdateType(UpdateType.PremultipliedColors | UpdateType.WorldAlpha);
          }
          get autosize() {
            return this.props.autosize;
          }
          set autosize(value) {
            this.props.autosize = value;
          }
          get clipping() {
            return this.props.clipping;
          }
          set clipping(value) {
            this.props.clipping = value;
            this.setUpdateType(UpdateType.Clipping);
          }
          get color() {
            return this.props.color;
          }
          set color(value) {
            this.colorTop = value;
            this.colorBottom = value;
            this.colorLeft = value;
            this.colorRight = value;
            this.props.color = value;
            this.setUpdateType(UpdateType.PremultipliedColors);
          }
          get colorTop() {
            return this.props.colorTop;
          }
          set colorTop(value) {
            if (this.props.colorTl !== value || this.props.colorTr !== value) {
              this.colorTl = value;
              this.colorTr = value;
            }
            this.props.colorTop = value;
            this.setUpdateType(UpdateType.PremultipliedColors);
          }
          get colorBottom() {
            return this.props.colorBottom;
          }
          set colorBottom(value) {
            if (this.props.colorBl !== value || this.props.colorBr !== value) {
              this.colorBl = value;
              this.colorBr = value;
            }
            this.props.colorBottom = value;
            this.setUpdateType(UpdateType.PremultipliedColors);
          }
          get colorLeft() {
            return this.props.colorLeft;
          }
          set colorLeft(value) {
            if (this.props.colorTl !== value || this.props.colorBl !== value) {
              this.colorTl = value;
              this.colorBl = value;
            }
            this.props.colorLeft = value;
            this.setUpdateType(UpdateType.PremultipliedColors);
          }
          get colorRight() {
            return this.props.colorRight;
          }
          set colorRight(value) {
            if (this.props.colorTr !== value || this.props.colorBr !== value) {
              this.colorTr = value;
              this.colorBr = value;
            }
            this.props.colorRight = value;
            this.setUpdateType(UpdateType.PremultipliedColors);
          }
          get colorTl() {
            return this.props.colorTl;
          }
          set colorTl(value) {
            this.props.colorTl = value;
            this.setUpdateType(UpdateType.PremultipliedColors);
          }
          get colorTr() {
            return this.props.colorTr;
          }
          set colorTr(value) {
            this.props.colorTr = value;
            this.setUpdateType(UpdateType.PremultipliedColors);
          }
          get colorBl() {
            return this.props.colorBl;
          }
          set colorBl(value) {
            this.props.colorBl = value;
            this.setUpdateType(UpdateType.PremultipliedColors);
          }
          get colorBr() {
            return this.props.colorBr;
          }
          set colorBr(value) {
            this.props.colorBr = value;
            this.setUpdateType(UpdateType.PremultipliedColors);
          }
          // we're only interested in parent zIndex to test
          // if we should use node zIndex is higher then parent zIndex
          get zIndexLocked() {
            return this.props.zIndexLocked || 0;
          }
          set zIndexLocked(value) {
            this.props.zIndexLocked = value;
            this.setUpdateType(UpdateType.CalculatedZIndex | UpdateType.Children);
            this.children.forEach(child => {
              child.setUpdateType(UpdateType.CalculatedZIndex);
            });
          }
          get zIndex() {
            return this.props.zIndex;
          }
          set zIndex(value) {
            this.props.zIndex = value;
            this.setUpdateType(UpdateType.CalculatedZIndex | UpdateType.Children);
            this.children.forEach(child => {
              child.setUpdateType(UpdateType.CalculatedZIndex);
            });
          }
          get parent() {
            return this.props.parent;
          }
          set parent(newParent) {
            var oldParent = this.props.parent;
            if (oldParent === newParent) {
              return;
            }
            this.props.parent = newParent;
            if (oldParent) {
              var index = oldParent.children.indexOf(this);
              assertTruthy(index !== -1, "CoreNode.parent: Node not found in old parent's children!");
              oldParent.children.splice(index, 1);
              oldParent.setUpdateType(UpdateType.Children | UpdateType.ZIndexSortedChildren);
            }
            if (newParent) {
              newParent.children.push(this);
              // Since this node has a new parent, to be safe, have it do a full update.
              this.setUpdateType(UpdateType.All);
              // Tell parent that it's children need to be updated and sorted.
              newParent.setUpdateType(UpdateType.Children | UpdateType.ZIndexSortedChildren);
              if (newParent.rtt || newParent.parentHasRenderTexture) {
                this.setRTTUpdates(UpdateType.All);
              }
            }
            this.updateScaleRotateTransform();
          }
          get preventCleanup() {
            return this.props.preventCleanup;
          }
          set preventCleanup(value) {
            this.props.preventCleanup = value;
          }
          get rtt() {
            return this.props.rtt;
          }
          set rtt(value) {
            var _this$stage$renderer2;
            if (this.props.rtt === true) {
              this.props.rtt = value;
              // unload texture if we used to have a render texture
              if (value === false && this.texture !== null) {
                var _this$stage$renderer;
                this.unloadTexture();
                this.setUpdateType(UpdateType.All);
                this.children.forEach(child => {
                  child.parentHasRenderTexture = false;
                });
                (_this$stage$renderer = this.stage.renderer) === null || _this$stage$renderer === void 0 || _this$stage$renderer.removeRTTNode(this);
                return;
              }
            }
            // if the new value is false and we didnt have rtt previously, we don't need to do anything
            if (value === false) {
              return;
            }
            // load texture
            this.texture = this.stage.txManager.loadTexture('RenderTexture', {
              width: this.width,
              height: this.height
            });
            this.textureOptions.preload = true;
            this.props.rtt = true;
            this.hasRTTupdates = true;
            this.setUpdateType(UpdateType.All);
            this.children.forEach(child => {
              child.setUpdateType(UpdateType.All);
            });
            // Store RTT nodes in a separate list
            (_this$stage$renderer2 = this.stage.renderer) === null || _this$stage$renderer2 === void 0 || _this$stage$renderer2.renderToTexture(this);
          }
          get shader() {
            return this.props.shader;
          }
          set shader(value) {
            if (this.props.shader === value) {
              return;
            }
            this.props.shader = value;
            this.setUpdateType(UpdateType.IsRenderable);
          }
          get src() {
            return this.props.src;
          }
          set src(imageUrl) {
            if (this.props.src === imageUrl) {
              return;
            }
            this.props.src = imageUrl;
            if (!imageUrl) {
              this.texture = null;
              return;
            }
            this.texture = this.stage.txManager.loadTexture('ImageTexture', {
              src: imageUrl,
              width: this.props.width,
              height: this.props.height,
              type: this.props.imageType,
              sx: this.props.srcX,
              sy: this.props.srcY,
              sw: this.props.srcWidth,
              sh: this.props.srcHeight
            });
          }
          set imageType(type) {
            if (this.props.imageType === type) {
              return;
            }
            this.props.imageType = type;
          }
          get imageType() {
            return this.props.imageType || null;
          }
          get srcHeight() {
            return this.props.srcHeight;
          }
          set srcHeight(value) {
            this.props.srcHeight = value;
          }
          get srcWidth() {
            return this.props.srcWidth;
          }
          set srcWidth(value) {
            this.props.srcWidth = value;
          }
          get srcX() {
            return this.props.srcX;
          }
          set srcX(value) {
            this.props.srcX = value;
          }
          get srcY() {
            return this.props.srcY;
          }
          set srcY(value) {
            this.props.srcY = value;
          }
          /**
           * Returns the framebuffer dimensions of the node.
           * If the node has a render texture, the dimensions are the same as the node's dimensions.
           * If the node does not have a render texture, the dimensions are inherited from the parent.
           * If the node parent has a render texture and the node is a render texture, the nodes dimensions are used.
           */
          get framebufferDimensions() {
            if (this.parentHasRenderTexture && !this.rtt && this.parent) {
              return this.parent.framebufferDimensions;
            }
            return {
              width: this.width,
              height: this.height
            };
          }
          /**
           * Returns the parent render texture node if it exists.
           */
          get parentRenderTexture() {
            var parent = this.parent;
            while (parent) {
              if (parent.rtt) {
                return parent;
              }
              parent = parent.parent;
            }
            return null;
          }
          get texture() {
            return this.props.texture;
          }
          set texture(value) {
            if (this.props.texture === value) {
              return;
            }
            var oldTexture = this.props.texture;
            if (oldTexture) {
              oldTexture.setRenderableOwner(this, false);
              this.unloadTexture();
            }
            this.props.texture = value;
            if (value) {
              value.setRenderableOwner(this, this.isRenderable);
              this.loadTexture();
            }
            this.setUpdateType(UpdateType.IsRenderable);
          }
          set textureOptions(value) {
            this.props.textureOptions = value;
          }
          get textureOptions() {
            return this.props.textureOptions;
          }
          setRTTUpdates(type) {
            var _this$parent;
            this.hasRTTupdates = true;
            (_this$parent = this.parent) === null || _this$parent === void 0 || _this$parent.setRTTUpdates(type);
          }
          animate(props, settings) {
            var animation = new CoreAnimation(this, props, settings);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
            var controller = new CoreAnimationController(this.stage.animationManager, animation);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return controller;
          }
          flush() {
            // no-op
          }
        }

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        /**
         * Platform render loop initiator
         */
        var startLoop = stage => {
          var isIdle = false;
          var runLoop = () => {
            stage.updateFrameTime();
            stage.updateAnimations();
            if (!stage.hasSceneUpdates()) {
              // We still need to calculate the fps else it looks like the app is frozen
              stage.calculateFps();
              setTimeout(runLoop, 16.666666666666668);
              if (!isIdle) {
                if (stage.txMemManager.checkCleanup()) {
                  stage.txMemManager.cleanup();
                }
                stage.eventBus.emit('idle');
                isIdle = true;
              }
              stage.flushFrameEvents();
              return;
            }
            isIdle = false;
            stage.drawFrame();
            stage.flushFrameEvents();
            requestAnimationFrame(runLoop);
          };
          requestAnimationFrame(runLoop);
        };
        /**
         * Return unix timestamp
         * @return {number}
         */
        var getTimeStamp = () => {
          return performance ? performance.now() : Date.now();
        };

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        class AnimationManager {
          constructor() {
            _defineProperty(this, "activeAnimations", new Set());
          }
          registerAnimation(animation) {
            this.activeAnimations.add(animation);
          }
          unregisterAnimation(animation) {
            this.activeAnimations.delete(animation);
          }
          update(dt) {
            this.activeAnimations.forEach(animation => {
              animation.update(dt);
            });
          }
        }

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        /**
         * Represents a source of texture data for a CoreContextTexture.
         *
         * @remarks
         * Texture sources are used to populate a CoreContextTexture when that texture
         * is loaded. Texture data retrieved by the CoreContextTexture by the
         * `getTextureData` method. It's the responsibility of the concerete `Texture`
         * subclass to implement this method appropriately.
         */
        class Texture extends EventEmitter {
          constructor(txManager) {
            super();
            _defineProperty(this, "txManager", void 0);
            /**
             * The dimensions of the texture
             *
             * @remarks
             * Until the texture data is loaded for the first time the value will be
             * `null`.
             */
            _defineProperty(this, "dimensions", null);
            _defineProperty(this, "error", null);
            _defineProperty(this, "state", 'freed');
            _defineProperty(this, "renderableOwners", new Set());
            _defineProperty(this, "renderable", false);
            _defineProperty(this, "lastRenderableChangeTime", 0);
            _defineProperty(this, "preventCleanup", false);
            this.txManager = txManager;
          }
          /**
           * Add/remove an owner to/from the Texture based on its renderability.
           *
           * @remarks
           * Any object can own a texture, be it a CoreNode or even the state object
           * from a Text Renderer.
           *
           * When the reference to the texture that an owner object holds is replaced
           * or cleared it must call this with `renderable=false` to release the owner
           * association.
           *
           * @param owner
           * @param renderable
           */
          setRenderableOwner(owner, renderable) {
            var oldSize = this.renderableOwners.size;
            if (renderable) {
              this.renderableOwners.add(owner);
              var newSize = this.renderableOwners.size;
              if (newSize > oldSize && newSize === 1) {
                var _this$onChangeIsRende;
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
                this.renderable = true;
                this.lastRenderableChangeTime = this.txManager.frameTime;
                (_this$onChangeIsRende = this.onChangeIsRenderable) === null || _this$onChangeIsRende === void 0 || _this$onChangeIsRende.call(this, true);
              }
            } else {
              this.renderableOwners.delete(owner);
              var _newSize = this.renderableOwners.size;
              if (_newSize < oldSize && _newSize === 0) {
                var _this$onChangeIsRende2;
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
                this.renderable = false;
                this.lastRenderableChangeTime = this.txManager.frameTime;
                (_this$onChangeIsRende2 = this.onChangeIsRenderable) === null || _this$onChangeIsRende2 === void 0 || _this$onChangeIsRende2.call(this, false);
              }
            }
          }
          /**
           * Get the CoreContextTexture for this Texture
           *
           * @remarks
           * Each Texture has a corresponding CoreContextTexture that is used to
           * manage the texture's native data depending on the renderer's mode
           * (WebGL, Canvas, etc).
           *
           * The Texture and CoreContextTexture are always linked together in a 1:1
           * relationship.
           */
          get ctxTexture() {
            // The first time this is called, create the ctxTexture
            var ctxTexture = this.txManager.renderer.createCtxTexture(this);
            // And replace this getter with the value for future calls
            Object.defineProperty(this, 'ctxTexture', {
              value: ctxTexture
            });
            return ctxTexture;
          }
          /**
           * Set the state of the texture
           *
           * @remark
           * Intended for internal-use only but declared public so that it can be set
           * by it's associated {@link CoreContextTexture}
           *
           * @param state
           * @param args
           */
          setState(state, ...args) {
            if (this.state !== state) {
              // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
              this.state = state;
              if (state === 'loaded') {
                var loadedArgs = args;
                this.dimensions = loadedArgs[0];
              } else if (state === 'failed') {
                var failedArgs = args;
                this.error = failedArgs[0];
              }
              this.emit(state, ...args);
            }
          }
          /**
           * Make a cache key for this texture.
           *
           * @remarks
           * Each concrete `Texture` subclass must implement this method to provide an
           * appropriate cache key for the texture type including the texture's
           * properties that uniquely identify a copy of the texture. If the texture
           * type does not support caching, then this method should return `false`.
           *
           * @param props
           * @returns
           * A cache key for this texture or `false` if the texture type does not
           * support caching.
           */
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          static makeCacheKey(props) {
            return false;
          }
          /**
           * Resolve the default values for the texture's properties.
           *
           * @remarks
           * Each concrete `Texture` subclass must implement this method to provide
           * default values for the texture's optional properties.
           *
           * @param props
           * @returns
           * The default values for the texture's properties.
           */
          static resolveDefaults(
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          props) {
            return {};
          }
        }

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        /**
         * Note that, within the createImageWorker function, we must only use ES5 code to keep it ES5-valid after babelifying, as
         *  the converted code of this section is converted to a blob and used as the js of the web worker thread.
         *
         * The createImageWorker function is a web worker that fetches an image from a URL and returns an ImageBitmap object.
         * The eslint @typescript rule is disabled for the entire function because the function is converted to a blob and used as the
         * js of the web worker thread, so the typescript syntax is not valid in this context.
         */
        /* eslint-disable */
        function createImageWorker() {
          function hasAlphaChannel(mimeType) {
            return mimeType.indexOf('image/png') !== -1;
          }
          function getImage(src, premultiplyAlpha, x, y, width, height) {
            return new Promise(function (resolve, reject) {
              var xhr = new XMLHttpRequest();
              xhr.open('GET', src, true);
              xhr.responseType = 'blob';
              xhr.onload = function () {
                if (xhr.status !== 200) {
                  return reject(new Error('Failed to load image: ' + xhr.statusText));
                }
                var blob = xhr.response;
                var withAlphaChannel = premultiplyAlpha !== undefined ? premultiplyAlpha : hasAlphaChannel(blob.type);
                if (width !== null && height !== null) {
                  createImageBitmap(blob, x || 0, y || 0, width, height, {
                    premultiplyAlpha: withAlphaChannel ? 'premultiply' : 'none',
                    colorSpaceConversion: 'none',
                    imageOrientation: 'none'
                  }).then(function (data) {
                    resolve({
                      data,
                      premultiplyAlpha: premultiplyAlpha
                    });
                  }).catch(function (error) {
                    reject(error);
                  });
                  return;
                }
                createImageBitmap(blob, {
                  premultiplyAlpha: withAlphaChannel ? 'premultiply' : 'none',
                  colorSpaceConversion: 'none',
                  imageOrientation: 'none'
                }).then(function (data) {
                  resolve({
                    data,
                    premultiplyAlpha: premultiplyAlpha
                  });
                }).catch(function (error) {
                  reject(error);
                });
              };
              xhr.onerror = function () {
                reject(new Error('Network error occurred while trying to fetch the image.'));
              };
              xhr.send();
            });
          }
          self.onmessage = event => {
            var src = event.data.src;
            var id = event.data.id;
            var premultiplyAlpha = event.data.premultiplyAlpha;
            var x = event.data.sx;
            var y = event.data.sy;
            var width = event.data.sw;
            var height = event.data.sh;
            getImage(src, premultiplyAlpha, x, y, width, height).then(function (data) {
              self.postMessage({
                id: id,
                src: src,
                data: data
              });
            }).catch(function (error) {
              self.postMessage({
                id: id,
                src: src,
                error: error.message
              });
            });
          };
        }
        /* eslint-enable */
        class ImageWorkerManager {
          constructor(numImageWorkers) {
            _defineProperty(this, "imageWorkersEnabled", true);
            _defineProperty(this, "messageManager", {});
            _defineProperty(this, "workers", []);
            _defineProperty(this, "workerIndex", 0);
            _defineProperty(this, "nextId", 0);
            this.workers = this.createWorkers(numImageWorkers);
            this.workers.forEach(worker => {
              worker.onmessage = this.handleMessage.bind(this);
            });
          }
          handleMessage(event) {
            var _event$data = event.data,
              id = _event$data.id,
              data = _event$data.data,
              error = _event$data.error;
            var msg = this.messageManager[id];
            if (msg) {
              var _msg = _slicedToArray(msg, 2),
                resolve = _msg[0],
                reject = _msg[1];
              delete this.messageManager[id];
              if (error) {
                reject(new Error(error));
              } else {
                resolve(data);
              }
            }
          }
          createWorkers(numWorkers = 1) {
            var workerCode = `(${createImageWorker.toString()})()`;
            var blob = new Blob([workerCode.replace('"use strict";', '')], {
              type: 'application/javascript'
            });
            var blobURL = (self.URL ? URL : webkitURL).createObjectURL(blob);
            var workers = [];
            for (var i = 0; i < numWorkers; i++) {
              workers.push(new Worker(blobURL));
            }
            return workers;
          }
          getNextWorker() {
            var worker = this.workers[this.workerIndex];
            this.workerIndex = (this.workerIndex + 1) % this.workers.length;
            return worker;
          }
          getImage(src, premultiplyAlpha, sx, sy, sw, sh) {
            return new Promise((resolve, reject) => {
              try {
                if (this.workers) {
                  var id = this.nextId++;
                  this.messageManager[id] = [resolve, reject];
                  var nextWorker = this.getNextWorker();
                  if (nextWorker) {
                    nextWorker.postMessage({
                      id,
                      src: src,
                      premultiplyAlpha,
                      sx,
                      sy,
                      sw,
                      sh
                    });
                  }
                }
              } catch (error) {
                reject(error);
              }
            });
          }
        }

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        /**
         * Texture consisting of only a 1x1 color pixel
         *
         * @remarks
         * The pixel color is set with the {@link ColorTextureProps.color} prop.
         *
         * This is the default texture used for a Node if it's
         * {@link INodeProps.texture} prop is set to `null` (the default)
         *
         * Generally the 1x1 color pixel is stretched to whatever the set dimensions of
         * a Node are.
         */
        class ColorTexture extends Texture {
          constructor(txManager, props) {
            super(txManager);
            _defineProperty(this, "props", void 0);
            this.props = ColorTexture.resolveDefaults(props || {});
          }
          get color() {
            return this.props.color;
          }
          set color(color) {
            this.props.color = color;
          }
          getTextureData() {
            var _this = this;
            return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
              var pixelData32, pixelData8;
              return _regeneratorRuntime().wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    pixelData32 = new Uint32Array([_this.color]);
                    pixelData8 = new Uint8ClampedArray(pixelData32.buffer);
                    return _context.abrupt("return", {
                      data: new ImageData(pixelData8, 1, 1),
                      premultiplyAlpha: true
                    });
                  case 3:
                  case "end":
                    return _context.stop();
                }
              }, _callee);
            }))();
          }
          static makeCacheKey(props) {
            var resolvedProps = ColorTexture.resolveDefaults(props);
            return `ColorTexture,${resolvedProps.color}`;
          }
          static resolveDefaults(props) {
            return {
              color: props.color || 0xffffffff
            };
          }
        }

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        /**
         * Tests if the given location is a compressed texture container
         * @param url
         * @remarks
         * This function is used to determine if the given image url is a compressed
         * and only supports the following extensions: .ktx and .pvr
         * @returns
         */
        _defineProperty(ColorTexture, "z$__type__Props", void 0);
        function isCompressedTextureContainer(url) {
          return /\.(ktx|pvr)$/.test(url);
        }
        /**
         * Loads a compressed texture container
         * @param url
         * @returns
         */
        var loadCompressedTexture = /*#__PURE__*/function () {
          var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(url) {
            var response, arrayBuffer;
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return fetch(url);
                case 2:
                  response = _context2.sent;
                  _context2.next = 5;
                  return response.arrayBuffer();
                case 5:
                  arrayBuffer = _context2.sent;
                  if (!(url.indexOf('.ktx') !== -1)) {
                    _context2.next = 8;
                    break;
                  }
                  return _context2.abrupt("return", loadKTXData(arrayBuffer));
                case 8:
                  return _context2.abrupt("return", loadPVRData(arrayBuffer));
                case 9:
                case "end":
                  return _context2.stop();
              }
            }, _callee2);
          }));
          return function loadCompressedTexture(_x) {
            return _ref.apply(this, arguments);
          };
        }();
        /**
         * Loads a KTX texture container and returns the texture data
         * @param buffer
         * @returns
         */
        var loadKTXData = /*#__PURE__*/function () {
          var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(buffer) {
            var view, littleEndian, mipmaps, data, offset, i, imageSize;
            return _regeneratorRuntime().wrap(function _callee3$(_context3) {
              while (1) switch (_context3.prev = _context3.next) {
                case 0:
                  view = new DataView(buffer);
                  littleEndian = view.getUint32(12) === 16909060 ? true : false;
                  mipmaps = [];
                  data = {
                    glInternalFormat: view.getUint32(28, littleEndian),
                    pixelWidth: view.getUint32(36, littleEndian),
                    pixelHeight: view.getUint32(40, littleEndian),
                    numberOfMipmapLevels: view.getUint32(56, littleEndian),
                    bytesOfKeyValueData: view.getUint32(60, littleEndian)
                  };
                  offset = 64; // Key Value Pairs of data start at byte offset 64
                  // But the only known kvp is the API version, so skipping parsing.
                  offset += data.bytesOfKeyValueData;
                  for (i = 0; i < data.numberOfMipmapLevels; i++) {
                    imageSize = view.getUint32(offset);
                    offset += 4;
                    mipmaps.push(view.buffer.slice(offset, imageSize));
                    offset += imageSize;
                  }
                  return _context3.abrupt("return", {
                    data: {
                      glInternalFormat: data.glInternalFormat,
                      mipmaps,
                      width: data.pixelWidth || 0,
                      height: data.pixelHeight || 0,
                      type: 'ktx'
                    },
                    premultiplyAlpha: false
                  });
                case 8:
                case "end":
                  return _context3.stop();
              }
            }, _callee3);
          }));
          return function loadKTXData(_x2) {
            return _ref2.apply(this, arguments);
          };
        }();
        /**
         * Loads a PVR texture container and returns the texture data
         * @param buffer
         * @returns
         */
        var loadPVRData = /*#__PURE__*/function () {
          var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(buffer) {
            var pvrHeaderLength, pvrFormatEtc1, pvrWidth, pvrHeight, pvrMipmapCount, pvrMetadata, arrayBuffer, header, dataOffset, pvrtcData, mipmaps, data, offset, width, height, i, level, view;
            return _regeneratorRuntime().wrap(function _callee4$(_context4) {
              while (1) switch (_context4.prev = _context4.next) {
                case 0:
                  // pvr header length in 32 bits
                  pvrHeaderLength = 13; // for now only we only support: COMPRESSED_RGB_ETC1_WEBGL
                  pvrFormatEtc1 = 0x8d64;
                  pvrWidth = 7;
                  pvrHeight = 6;
                  pvrMipmapCount = 11;
                  pvrMetadata = 12;
                  arrayBuffer = buffer;
                  header = new Int32Array(arrayBuffer, 0, pvrHeaderLength); // @ts-expect-error Object possibly undefined
                  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
                  dataOffset = header[pvrMetadata] + 52;
                  pvrtcData = new Uint8Array(arrayBuffer, dataOffset);
                  mipmaps = [];
                  data = {
                    pixelWidth: header[pvrWidth],
                    pixelHeight: header[pvrHeight],
                    numberOfMipmapLevels: header[pvrMipmapCount] || 0
                  };
                  offset = 0;
                  width = data.pixelWidth || 0;
                  height = data.pixelHeight || 0;
                  for (i = 0; i < data.numberOfMipmapLevels; i++) {
                    level = (width + 3 >> 2) * (height + 3 >> 2) * 8;
                    view = new Uint8Array(arrayBuffer, pvrtcData.byteOffset + offset, level);
                    mipmaps.push(view);
                    offset += level;
                    width = width >> 1;
                    height = height >> 1;
                  }
                  return _context4.abrupt("return", {
                    data: {
                      glInternalFormat: pvrFormatEtc1,
                      mipmaps: mipmaps,
                      width: data.pixelWidth || 0,
                      height: data.pixelHeight || 0,
                      type: 'pvr'
                    },
                    premultiplyAlpha: false
                  });
                case 17:
                case "end":
                  return _context4.stop();
              }
            }, _callee4);
          }));
          return function loadPVRData(_x3) {
            return _ref3.apply(this, arguments);
          };
        }();

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        /**
         * Tests if the given location is a SVG
         * @param url
         * @remarks
         * This function is used to determine if the given image url is a SVG
         * image
         * @returns
         */
        function isSvgImage(url) {
          return /\.(svg)$/.test(url);
        }
        /**
         * Loads a SVG image
         * @param url
         * @returns
         */
        var loadSvg = (url, width, height, sx, sy, sw, sh) => {
          return new Promise((resolve, reject) => {
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            assertTruthy(ctx);
            ctx.imageSmoothingEnabled = true;
            var img = new Image();
            img.onload = () => {
              var x = sx !== null && sx !== void 0 ? sx : 0;
              var y = sy !== null && sy !== void 0 ? sy : 0;
              var w = width || img.width;
              var h = height || img.height;
              canvas.width = w;
              canvas.height = h;
              ctx.drawImage(img, 0, 0, w, h);
              resolve({
                data: ctx.getImageData(x, y, sw !== null && sw !== void 0 ? sw : w, sh !== null && sh !== void 0 ? sh : h),
                premultiplyAlpha: false
              });
            };
            img.onerror = err => {
              reject(err);
            };
            img.src = url;
          });
        };

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        /**
         * Texture consisting of an image loaded from a URL
         *
         * @remarks
         * The ImageTexture's {@link ImageTextureProps.src} prop defines the image URL
         * to be downloaded.
         *
         * By default, the texture's alpha values will be premultiplied into its color
         * values which is generally the desired setting before they are sent to the
         * texture's associated {@link Shader}. However, in special cases you may want
         * the Shader to receive straight (non-premultiplied) values. In that case you
         * can disable the default behavior by setting the
         * {@link ImageTextureProps.premultiplyAlpha} prop to `false`.
         */
        class ImageTexture extends Texture {
          constructor(txManager, props) {
            super(txManager);
            _defineProperty(this, "props", void 0);
            this.props = ImageTexture.resolveDefaults(props);
          }
          hasAlphaChannel(mimeType) {
            return mimeType.indexOf('image/png') !== -1;
          }
          loadImage(src) {
            var _this2 = this;
            return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
              var _this2$props, premultiplyAlpha, sx, sy, sw, sh, width, height, response, blob, hasAlphaChannel, img;
              return _regeneratorRuntime().wrap(function _callee5$(_context5) {
                while (1) switch (_context5.prev = _context5.next) {
                  case 0:
                    _this2$props = _this2.props, premultiplyAlpha = _this2$props.premultiplyAlpha, sx = _this2$props.sx, sy = _this2$props.sy, sw = _this2$props.sw, sh = _this2$props.sh, width = _this2$props.width, height = _this2$props.height;
                    if (!(_this2.txManager.imageWorkerManager !== null)) {
                      _context5.next = 7;
                      break;
                    }
                    _context5.next = 4;
                    return _this2.txManager.imageWorkerManager.getImage(src, premultiplyAlpha, sx, sy, sw, sh);
                  case 4:
                    return _context5.abrupt("return", _context5.sent);
                  case 7:
                    if (!(_this2.txManager.hasCreateImageBitmap === true)) {
                      _context5.next = 28;
                      break;
                    }
                    _context5.next = 10;
                    return fetch(src);
                  case 10:
                    response = _context5.sent;
                    _context5.next = 13;
                    return response.blob();
                  case 13:
                    blob = _context5.sent;
                    hasAlphaChannel = premultiplyAlpha !== null && premultiplyAlpha !== void 0 ? premultiplyAlpha : _this2.hasAlphaChannel(blob.type);
                    if (!(sw !== null && sh !== null)) {
                      _context5.next = 21;
                      break;
                    }
                    _context5.next = 18;
                    return createImageBitmap(blob, sx !== null && sx !== void 0 ? sx : 0, sy !== null && sy !== void 0 ? sy : 0, sw, sh, {
                      premultiplyAlpha: hasAlphaChannel ? 'premultiply' : 'none',
                      colorSpaceConversion: 'none',
                      imageOrientation: 'none'
                    });
                  case 18:
                    _context5.t0 = _context5.sent;
                    _context5.t1 = hasAlphaChannel;
                    return _context5.abrupt("return", {
                      data: _context5.t0,
                      premultiplyAlpha: _context5.t1
                    });
                  case 21:
                    _context5.next = 23;
                    return createImageBitmap(blob, {
                      premultiplyAlpha: hasAlphaChannel ? 'premultiply' : 'none',
                      colorSpaceConversion: 'none',
                      imageOrientation: 'none'
                    });
                  case 23:
                    _context5.t2 = _context5.sent;
                    _context5.t3 = hasAlphaChannel;
                    return _context5.abrupt("return", {
                      data: _context5.t2,
                      premultiplyAlpha: _context5.t3
                    });
                  case 28:
                    img = new Image(width || undefined, height || undefined);
                    if (!(src.substr(0, 5) === 'data:')) {
                      img.crossOrigin = 'Anonymous';
                    }
                    img.src = src;
                    _context5.next = 33;
                    return new Promise((resolve, reject) => {
                      img.onload = () => resolve();
                      img.onerror = () => reject(new Error(`Failed to load image`));
                    }).catch(e => {
                      console.error(e);
                    });
                  case 33:
                    return _context5.abrupt("return", {
                      data: img,
                      premultiplyAlpha: premultiplyAlpha !== null && premultiplyAlpha !== void 0 ? premultiplyAlpha : true
                    });
                  case 34:
                  case "end":
                    return _context5.stop();
                }
              }, _callee5);
            }))();
          }
          getTextureData() {
            var _this3 = this;
            return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
              var _this3$props, src, premultiplyAlpha, type, absoluteSrc;
              return _regeneratorRuntime().wrap(function _callee6$(_context6) {
                while (1) switch (_context6.prev = _context6.next) {
                  case 0:
                    _this3$props = _this3.props, src = _this3$props.src, premultiplyAlpha = _this3$props.premultiplyAlpha, type = _this3$props.type;
                    if (!(src === null)) {
                      _context6.next = 3;
                      break;
                    }
                    return _context6.abrupt("return", {
                      data: null
                    });
                  case 3:
                    if (!(typeof src !== 'string')) {
                      _context6.next = 7;
                      break;
                    }
                    if (!(src instanceof ImageData)) {
                      _context6.next = 6;
                      break;
                    }
                    return _context6.abrupt("return", {
                      data: src,
                      premultiplyAlpha
                    });
                  case 6:
                    return _context6.abrupt("return", {
                      data: src(),
                      premultiplyAlpha
                    });
                  case 7:
                    absoluteSrc = convertUrlToAbsolute(src);
                    if (!(type === 'regular')) {
                      _context6.next = 10;
                      break;
                    }
                    return _context6.abrupt("return", _this3.loadImage(absoluteSrc));
                  case 10:
                    if (!(type === 'svg')) {
                      _context6.next = 12;
                      break;
                    }
                    return _context6.abrupt("return", loadSvg(absoluteSrc, _this3.props.width, _this3.props.height, _this3.props.sx, _this3.props.sy, _this3.props.sw, _this3.props.sh));
                  case 12:
                    if (!(isSvgImage(src) === true)) {
                      _context6.next = 14;
                      break;
                    }
                    return _context6.abrupt("return", loadSvg(absoluteSrc, _this3.props.width, _this3.props.height, _this3.props.sx, _this3.props.sy, _this3.props.sw, _this3.props.sh));
                  case 14:
                    if (!(type === 'compressed')) {
                      _context6.next = 16;
                      break;
                    }
                    return _context6.abrupt("return", loadCompressedTexture(absoluteSrc));
                  case 16:
                    if (!(isCompressedTextureContainer(src) === true)) {
                      _context6.next = 18;
                      break;
                    }
                    return _context6.abrupt("return", loadCompressedTexture(absoluteSrc));
                  case 18:
                    return _context6.abrupt("return", _this3.loadImage(absoluteSrc));
                  case 19:
                  case "end":
                    return _context6.stop();
                }
              }, _callee6);
            }))();
          }
          /**
           * Generates a cache key for the ImageTexture based on the provided props.
           * @param props - The props used to generate the cache key.
           * @returns The cache key as a string, or `false` if the key cannot be generated.
           */
          static makeCacheKey(props) {
            var _resolvedProps$premul;
            var resolvedProps = ImageTexture.resolveDefaults(props);
            // Only cache key-able textures; prioritise key
            var key = resolvedProps.key || resolvedProps.src;
            if (typeof key !== 'string') {
              return false;
            }
            // if we have source dimensions, cache the texture separately
            var dimensionProps = '';
            if (resolvedProps.sh !== null && resolvedProps.sw !== null) {
              var _resolvedProps$sx, _resolvedProps$sy;
              dimensionProps += ',';
              dimensionProps += (_resolvedProps$sx = resolvedProps.sx) !== null && _resolvedProps$sx !== void 0 ? _resolvedProps$sx : '';
              dimensionProps += (_resolvedProps$sy = resolvedProps.sy) !== null && _resolvedProps$sy !== void 0 ? _resolvedProps$sy : '';
              dimensionProps += resolvedProps.sw || '';
              dimensionProps += resolvedProps.sh || '';
            }
            return `ImageTexture,${key},${(_resolvedProps$premul = resolvedProps.premultiplyAlpha) !== null && _resolvedProps$premul !== void 0 ? _resolvedProps$premul : 'true'}${dimensionProps}`;
          }
          static resolveDefaults(props) {
            var _props$src, _props$premultiplyAlp, _props$key, _props$type, _props$width, _props$height, _props$sx, _props$sy, _props$sw, _props$sh;
            return {
              src: (_props$src = props.src) !== null && _props$src !== void 0 ? _props$src : '',
              premultiplyAlpha: (_props$premultiplyAlp = props.premultiplyAlpha) !== null && _props$premultiplyAlp !== void 0 ? _props$premultiplyAlp : true,
              key: (_props$key = props.key) !== null && _props$key !== void 0 ? _props$key : null,
              type: (_props$type = props.type) !== null && _props$type !== void 0 ? _props$type : null,
              width: (_props$width = props.width) !== null && _props$width !== void 0 ? _props$width : null,
              height: (_props$height = props.height) !== null && _props$height !== void 0 ? _props$height : null,
              sx: (_props$sx = props.sx) !== null && _props$sx !== void 0 ? _props$sx : null,
              sy: (_props$sy = props.sy) !== null && _props$sy !== void 0 ? _props$sy : null,
              sw: (_props$sw = props.sw) !== null && _props$sw !== void 0 ? _props$sw : null,
              sh: (_props$sh = props.sh) !== null && _props$sh !== void 0 ? _props$sh : null
            };
          }
        }

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        /**
         * Texture consisting of a random grid of greyscale pixels
         *
         * @remarks
         * The width and height of the NoiseTexture are defined by it's
         * {@link NoiseTextureProps.width} and {@link NoiseTextureProps.height}
         * properties. The {@link NoiseTextureProps.cacheId} prop can be varied in order
         * to bypass cache and get newly randomized texture data.
         */
        _defineProperty(ImageTexture, "z$__type__Props", void 0);
        class NoiseTexture extends Texture {
          constructor(txManager, props) {
            super(txManager);
            _defineProperty(this, "props", void 0);
            this.props = NoiseTexture.resolveDefaults(props);
          }
          getTextureData() {
            var _this4 = this;
            return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
              var _this4$props, width, height, size, pixelData8, i, v;
              return _regeneratorRuntime().wrap(function _callee7$(_context7) {
                while (1) switch (_context7.prev = _context7.next) {
                  case 0:
                    _this4$props = _this4.props, width = _this4$props.width, height = _this4$props.height;
                    size = width * height * 4;
                    pixelData8 = new Uint8ClampedArray(size);
                    for (i = 0; i < size; i += 4) {
                      v = Math.floor(Math.random() * 256);
                      pixelData8[i] = v;
                      pixelData8[i + 1] = v;
                      pixelData8[i + 2] = v;
                      pixelData8[i + 3] = 255;
                    }
                    return _context7.abrupt("return", {
                      data: new ImageData(pixelData8, width, height)
                    });
                  case 5:
                  case "end":
                    return _context7.stop();
                }
              }, _callee7);
            }))();
          }
          static makeCacheKey(props) {
            if (props.cacheId === undefined) {
              return false;
            }
            var resolvedProps = NoiseTexture.resolveDefaults(props);
            return `NoiseTexture,${resolvedProps.width},${resolvedProps.height},${resolvedProps.cacheId}`;
          }
          static resolveDefaults(props) {
            var _props$width2, _props$height2, _props$cacheId;
            return {
              width: (_props$width2 = props.width) !== null && _props$width2 !== void 0 ? _props$width2 : 128,
              height: (_props$height2 = props.height) !== null && _props$height2 !== void 0 ? _props$height2 : 128,
              cacheId: (_props$cacheId = props.cacheId) !== null && _props$cacheId !== void 0 ? _props$cacheId : 0
            };
          }
        }

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        /**
         * A Texture that is a sub-region of another Texture.
         *
         * @remarks
         * The parent texture can be a Sprite Sheet/Texture Atlas and set using the
         * {@link SubTextureProps.texture} prop. The sub-region relative to the parent
         * texture is defined with the {@link SubTextureProps.x},
         * {@link SubTextureProps.y}, {@link SubTextureProps.width}, and
         * {@link SubTextureProps.height} pixel values.
         */
        _defineProperty(NoiseTexture, "z$__type__Props", void 0);
        class SubTexture extends Texture {
          constructor(txManager, props) {
            super(txManager);
            _defineProperty(this, "props", void 0);
            _defineProperty(this, "parentTexture", void 0);
            _defineProperty(this, "onParentTxLoaded", () => {
              // We ignore the parent's passed dimensions, and simply use the SubTexture's
              // configured dimensions (because that's all that matters here)
              this.setState('loaded', {
                width: this.props.width,
                height: this.props.height
              });
            });
            _defineProperty(this, "onParentTxFailed", (target, error) => {
              this.setState('failed', error);
            });
            this.props = SubTexture.resolveDefaults(props || {});
            this.parentTexture = this.props.texture;
            // If parent texture is already loaded / failed, trigger loaded event manually
            // so that users get a consistent event experience.
            // We do this in a microtask to allow listeners to be attached in the same
            // synchronous task after calling loadTexture()
            queueMicrotask(() => {
              var parentTx = this.parentTexture;
              if (parentTx.state === 'loaded') {
                this.onParentTxLoaded(parentTx, parentTx.dimensions);
              } else if (parentTx.state === 'failed') {
                this.onParentTxFailed(parentTx, parentTx.error);
              }
              parentTx.on('loaded', this.onParentTxLoaded);
              parentTx.on('failed', this.onParentTxFailed);
            });
          }
          onChangeIsRenderable(isRenderable) {
            // Propagate the renderable owner change to the parent texture
            this.parentTexture.setRenderableOwner(this, isRenderable);
          }
          getTextureData() {
            var _this5 = this;
            return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
              return _regeneratorRuntime().wrap(function _callee8$(_context8) {
                while (1) switch (_context8.prev = _context8.next) {
                  case 0:
                    return _context8.abrupt("return", {
                      data: _this5.props
                    });
                  case 1:
                  case "end":
                    return _context8.stop();
                }
              }, _callee8);
            }))();
          }
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          static makeCacheKey(props) {
            return false;
          }
          static resolveDefaults(props) {
            return {
              texture: props.texture,
              x: props.x || 0,
              y: props.y || 0,
              width: props.width || 0,
              height: props.height || 0
            };
          }
        }

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        _defineProperty(SubTexture, "z$__type__Props", void 0);
        class RenderTexture extends Texture {
          constructor(txManager, props) {
            super(txManager);
            _defineProperty(this, "props", void 0);
            this.props = RenderTexture.resolveDefaults(props || {});
          }
          get width() {
            return this.props.width;
          }
          set width(value) {
            this.props.width = value;
          }
          get height() {
            return this.props.height;
          }
          set height(value) {
            this.props.height = value;
          }
          getTextureData() {
            return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
              return _regeneratorRuntime().wrap(function _callee9$(_context9) {
                while (1) switch (_context9.prev = _context9.next) {
                  case 0:
                    return _context9.abrupt("return", {
                      data: null,
                      premultiplyAlpha: null
                    });
                  case 1:
                  case "end":
                    return _context9.stop();
                }
              }, _callee9);
            }))();
          }
          static resolveDefaults(props) {
            return {
              width: props.width || 256,
              height: props.height || 256
            };
          }
        }

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        _defineProperty(RenderTexture, "z$__type__Props", void 0);
        class CoreTextureManager {
          constructor(numImageWorkers) {
            /**
             * Map of textures by cache key
             */
            _defineProperty(this, "keyCache", new Map());
            /**
             * Map of cache keys by texture
             */
            _defineProperty(this, "inverseKeyCache", new WeakMap());
            /**
             * Map of texture constructors by their type name
             */
            _defineProperty(this, "txConstructors", {});
            _defineProperty(this, "imageWorkerManager", null);
            _defineProperty(this, "hasCreateImageBitmap", !!self.createImageBitmap);
            _defineProperty(this, "hasWorker", !!self.Worker);
            /**
             * Renderer that this texture manager is associated with
             *
             * @remarks
             * This MUST be set before the texture manager is used. Otherwise errors
             * will occur when using the texture manager.
             */
            _defineProperty(this, "renderer", void 0);
            /**
             * The current frame time in milliseconds
             *
             * @remarks
             * This is used to populate the `lastRenderableChangeTime` property of
             * {@link Texture} instances when their renderable state changes.
             *
             * Set by stage via `updateFrameTime` method.
             */
            _defineProperty(this, "frameTime", 0);
            // Register default known texture types
            if (this.hasCreateImageBitmap && this.hasWorker && numImageWorkers > 0) {
              this.imageWorkerManager = new ImageWorkerManager(numImageWorkers);
            }
            if (!this.hasCreateImageBitmap) {
              console.warn('[Lightning] createImageBitmap is not supported on this browser. ImageTexture will be slower.');
            }
            this.registerTextureType('ImageTexture', ImageTexture);
            this.registerTextureType('ColorTexture', ColorTexture);
            this.registerTextureType('NoiseTexture', NoiseTexture);
            this.registerTextureType('SubTexture', SubTexture);
            this.registerTextureType('RenderTexture', RenderTexture);
          }
          registerTextureType(textureType, textureClass) {
            this.txConstructors[textureType] = textureClass;
          }
          loadTexture(textureType, props) {
            var texture;
            var TextureClass = this.txConstructors[textureType];
            if (!TextureClass) {
              throw new Error(`Texture type "${textureType}" is not registered`);
            }
            if (!texture) {
              var cacheKey = TextureClass.makeCacheKey(props);
              if (cacheKey && this.keyCache.has(cacheKey)) {
                // console.log('Getting texture by cache key', cacheKey);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                texture = this.keyCache.get(cacheKey);
              } else {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
                texture = new TextureClass(this, props);
                if (cacheKey) {
                  this.initTextureToCache(texture, cacheKey);
                }
              }
            }
            return texture;
          }
          initTextureToCache(texture, cacheKey) {
            var keyCache = this.keyCache,
              inverseKeyCache = this.inverseKeyCache;
            keyCache.set(cacheKey, texture);
            inverseKeyCache.set(texture, cacheKey);
          }
          /**
           * Remove a texture from the cache
           *
           * @remarks
           * Called by Texture Cleanup when a texture is freed.
           *
           * @param texture
           */
          removeTextureFromCache(texture) {
            var inverseKeyCache = this.inverseKeyCache,
              keyCache = this.keyCache;
            var cacheKey = inverseKeyCache.get(texture);
            if (cacheKey) {
              keyCache.delete(cacheKey);
            }
          }
        }

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        var fontCache = new Map();
        var weightConversions = {
          normal: 400,
          bold: 700,
          bolder: 900,
          lighter: 100
        };
        var fontWeightToNumber = weight => {
          if (typeof weight === 'number') {
            return weight;
          }
          return weightConversions[weight] || 400;
        };
        function resolveFontToUse(familyMapsByPriority, family, weightIn, style, stretch) {
          var weight = fontWeightToNumber(weightIn);
          var _iterator4 = _createForOfIteratorHelper(familyMapsByPriority),
            _step4;
          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              var fontFamiles = _step4.value;
              var fontFaces = fontFamiles[family];
              if (!fontFaces) {
                continue;
              }
              if (fontFaces.size === 1) {
                // No Exact match found, find nearest weight match
                console.warn(`TrFontManager: Only one font face found for family: '${family}' - will be used for all weights and styles`);
                return fontFaces.values().next().value;
              }
              var weightMap = new Map();
              var _iterator5 = _createForOfIteratorHelper(fontFaces),
                _step5;
              try {
                for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                  var fontFace = _step5.value;
                  var fontFamilyWeight = fontWeightToNumber(fontFace.descriptors.weight);
                  if (fontFamilyWeight === weight && fontFace.descriptors.style === style && fontFace.descriptors.stretch === stretch) {
                    return fontFace;
                  }
                  weightMap.set(fontFamilyWeight, fontFace);
                }
                // No Exact match found, find nearest weight match
              } catch (err) {
                _iterator5.e(err);
              } finally {
                _iterator5.f();
              }
              var msg = `TrFontManager: No exact match: '${family} Weight: ${weight} Style: ${style} Stretch: ${stretch}'`;
              console.error(msg);
              // Follow the CSS font-weight algorithm to find the nearest weight match
              // https://www.w3.org/TR/2018/REC-css-fonts-3-20180920/#font-matching-algorithm
              if (weight === 400 && weightMap.has(500)) {
                return weightMap.get(500);
              }
              if (weight === 500 && weightMap.has(400)) {
                return weightMap.get(400);
              }
              if (weight < 400) {
                while (weight > 0) {
                  if (weightMap.has(weight)) {
                    return weightMap.get(weight);
                  }
                  weight -= 100;
                }
                // reset back for the next loop
                weight = 600;
              }
              while (weight < 1000) {
                if (weightMap.has(weight)) {
                  return weightMap.get(weight);
                }
                weight += 100;
              }
              // finally check lower again
              weight = 500;
              while (weight > 0) {
                if (weightMap.has(weight)) {
                  return weightMap.get(weight);
                }
                weight -= 100;
              }
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }
          return;
        }
        class TrFontManager {
          constructor(textRenderers) {
            _defineProperty(this, "textRenderers", void 0);
            this.textRenderers = textRenderers;
            // Intentionally left blank
          }
          addFontFace(font) {
            // All the font face to all of the text renderers that support it
            for (var trId in this.textRenderers) {
              var tr = this.textRenderers[trId];
              if (tr && tr.isFontFaceSupported(font)) {
                tr.addFontFace(font);
              }
            }
          }
          /**
           * Utility method to resolve a single font face from a list of prioritized family maps based on
           * a set of font properties.
           *
           * @remarks
           * These are to be used by a text renderer to resolve a font face if needed.
           *
           * @param familyMapsByPriority
           * @param props
           * @returns
           */
          static resolveFontFace(familyMapsByPriority, props) {
            var fontFamily = props.fontFamily,
              fontWeight = props.fontWeight,
              fontStyle = props.fontStyle,
              fontStretch = props.fontStretch;
            var fontCacheString = `${fontFamily}${fontStyle}${fontWeight}${fontStretch}`;
            if (fontCache.has(fontCacheString) === true) {
              return fontCache.get(fontCacheString);
            }
            var resolvedFont = resolveFontToUse(familyMapsByPriority, fontFamily, fontWeight, fontStyle, fontStretch);
            if (resolvedFont !== undefined) {
              fontCache.set(fontCacheString, resolvedFont);
            }
            return resolvedFont;
          }
        }

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        class CoreShader {
          // abstract draw(): void;
          static makeCacheKey(props) {
            return false;
          }
          static resolveDefaults(props) {
            return {};
          }
        }

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        //#endregion Types
        function createShader$1(glw, type, source) {
          var shader = glw.createShader(type);
          if (!shader) {
            throw new Error();
          }
          glw.shaderSource(shader, source);
          glw.compileShader(shader);
          var success = glw.getShaderParameter(shader, glw.COMPILE_STATUS);
          if (success) {
            return shader;
          }
          console.log(glw.getShaderInfoLog(shader));
          glw.deleteShader(shader);
        }
        function createProgram(glw, vertexShader, fragmentShader) {
          var program = glw.createProgram();
          if (!program) {
            throw new Error();
          }
          glw.attachShader(program, vertexShader);
          glw.attachShader(program, fragmentShader);
          glw.linkProgram(program);
          var success = glw.getProgramParameter(program, glw.LINK_STATUS);
          if (success) {
            return program;
          }
          console.log(glw.getProgramInfoLog(program));
          glw.deleteProgram(program);
          return undefined;
        }

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        class WebGlCoreShader extends CoreShader {
          constructor(options) {
            super();
            _defineProperty(this, "boundBufferCollection", null);
            _defineProperty(this, "buffersBound", false);
            _defineProperty(this, "program", void 0);
            /**
             * Vertex Array Object
             *
             * @remarks
             * Used by WebGL2 Only
             */
            _defineProperty(this, "vao", void 0);
            _defineProperty(this, "renderer", void 0);
            _defineProperty(this, "glw", void 0);
            _defineProperty(this, "attributeBuffers", void 0);
            _defineProperty(this, "attributeLocations", void 0);
            _defineProperty(this, "attributeNames", void 0);
            _defineProperty(this, "uniformLocations", void 0);
            _defineProperty(this, "uniformTypes", void 0);
            _defineProperty(this, "supportsIndexedTextures", void 0);
            var renderer = this.renderer = options.renderer;
            var glw = this.glw = this.renderer.glw;
            this.supportsIndexedTextures = options.supportsIndexedTextures || false;
            // Check that extensions are supported
            var webGl2 = glw.isWebGl2();
            var requiredExtensions = webGl2 && options.webgl2Extensions || !webGl2 && options.webgl1Extensions || [];
            var glVersion = webGl2 ? '2.0' : '1.0';
            requiredExtensions.forEach(extensionName => {
              if (!glw.getExtension(extensionName)) {
                throw new Error(`Shader "${this.constructor.name}" requires extension "${extensionName}" for WebGL ${glVersion} but wasn't found`);
              }
            });
            // Gather shader sources
            // - If WebGL 2 and special WebGL 2 sources are provided, we copy those sources and delete
            // the extra copy of them to save memory.
            // TODO: This could be further made optimal by just caching the compiled shaders and completely deleting
            // the source code
            var shaderSources = options.shaderSources || this.constructor.shaderSources;
            if (!shaderSources) {
              throw new Error(`Shader "${this.constructor.name}" is missing shaderSources.`);
            } else if (webGl2 && shaderSources !== null && shaderSources !== void 0 && shaderSources.webGl2) {
              shaderSources.fragment = shaderSources.webGl2.fragment;
              shaderSources.vertex = shaderSources.webGl2.vertex;
              delete shaderSources.webGl2;
            }
            var textureUnits = renderer.system.parameters.MAX_VERTEX_TEXTURE_IMAGE_UNITS;
            var vertexSource = shaderSources.vertex instanceof Function ? shaderSources.vertex(textureUnits) : shaderSources.vertex;
            var fragmentSource = shaderSources.fragment instanceof Function ? shaderSources.fragment(textureUnits) : shaderSources.fragment;
            var vertexShader = createShader$1(glw, glw.VERTEX_SHADER, vertexSource);
            var fragmentShader = createShader$1(glw, glw.FRAGMENT_SHADER, fragmentSource);
            if (!vertexShader || !fragmentShader) {
              throw new Error();
            }
            var program = createProgram(glw, vertexShader, fragmentShader);
            if (!program) {
              throw new Error();
            }
            this.program = program;
            if (webGl2) {
              var vao = glw.createVertexArray();
              if (!vao) {
                throw new Error();
              }
              this.vao = vao;
              glw.bindVertexArray(this.vao);
            }
            this.attributeLocations = {};
            this.attributeBuffers = {};
            this.attributeNames = [];
            [...options.attributes].forEach(attributeName => {
              var location = glw.getAttribLocation(this.program, attributeName);
              if (location < 0) {
                throw new Error(`${this.constructor.name}: Vertex shader must have an attribute "${attributeName}"!`);
              }
              var buffer = glw.createBuffer();
              if (!buffer) {
                throw new Error(`${this.constructor.name}: Could not create buffer for attribute "${attributeName}"`);
              }
              this.attributeLocations[attributeName] = location;
              this.attributeBuffers[attributeName] = buffer;
              this.attributeNames.push(attributeName);
            });
            this.uniformLocations = {};
            this.uniformTypes = {};
            options.uniforms.forEach(uniform => {
              var location = glw.getUniformLocation(this.program, uniform.name);
              this.uniformTypes[uniform.name] = uniform.uniform;
              if (!location) {
                console.warn(`Shader "${this.constructor.name}" could not get uniform location for "${uniform.name}"`);
                return;
              }
              this.uniformLocations[uniform.name] = location;
            });
          }
          bindBufferAttribute(location, buffer, attribute) {
            var glw = this.glw;
            glw.enableVertexAttribArray(location);
            glw.vertexAttribPointer(buffer, location, attribute.size, attribute.type, attribute.normalized, attribute.stride, attribute.offset);
          }
          disableAttribute(location) {
            this.glw.disableVertexAttribArray(location);
          }
          disableAttributes() {
            for (var loc in this.attributeLocations) {
              this.disableAttribute(this.attributeLocations[loc]);
            }
            this.boundBufferCollection = null;
          }
          /**
           * Given two sets of Shader props destined for this Shader, determine if they can be batched together
           * to reduce the number of draw calls.
           *
           * @remarks
           * This is used by the {@link WebGlCoreRenderer} to determine if it can batch multiple consecutive draw
           * calls into a single draw call.
           *
           * By default, this returns false (meaning no batching is allowed), but can be
           * overridden by child classes to provide more efficient batching.
           *
           * @param propsA
           * @param propsB
           * @returns
           */
          canBatchShaderProps(propsA, propsB) {
            return false;
          }
          bindRenderOp(renderOp, props) {
            this.bindBufferCollection(renderOp.buffers);
            if (renderOp.textures.length > 0) {
              this.bindTextures(renderOp.textures);
            }
            var glw = renderOp.glw,
              parentHasRenderTexture = renderOp.parentHasRenderTexture,
              renderToTexture = renderOp.renderToTexture;
            // Skip if the parent and current operation both have render textures
            if (renderToTexture && parentHasRenderTexture) {
              return;
            }
            // Bind render texture framebuffer dimensions as resolution
            // if the parent has a render texture
            if (parentHasRenderTexture) {
              var _ref4 = renderOp.framebufferDimensions || {},
                width = _ref4.width,
                height = _ref4.height;
              // Force pixel ratio to 1.0 for render textures since they are always 1:1
              // the final render texture will be rendered to the screen with the correct pixel ratio
              this.setUniform('u_pixelRatio', 1.0);
              // Set resolution to the framebuffer dimensions
              this.setUniform('u_resolution', new Float32Array([width !== null && width !== void 0 ? width : 0, height !== null && height !== void 0 ? height : 0]));
            } else {
              this.setUniform('u_pixelRatio', renderOp.options.pixelRatio);
              this.setUniform('u_resolution', new Float32Array([glw.canvas.width, glw.canvas.height]));
            }
            if (props) {
              // Bind optional automatic uniforms
              // These are only bound if their keys are present in the props.
              if (hasOwn(props, '$dimensions')) {
                var dimensions = props.$dimensions;
                if (!dimensions) {
                  dimensions = renderOp.dimensions;
                }
                this.setUniform('u_dimensions', [dimensions.width, dimensions.height]);
              }
              if (hasOwn(props, '$alpha')) {
                var alpha = props.$alpha;
                if (!alpha) {
                  alpha = renderOp.alpha;
                }
                this.setUniform('u_alpha', alpha);
              }
              this.bindProps(props);
            }
          }
          setUniform(name, ...value) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unsafe-argument
            this.glw.setUniform(this.uniformTypes[name], this.uniformLocations[name], ...value);
          }
          bindBufferCollection(buffer) {
            if (this.boundBufferCollection === buffer) {
              return;
            }
            for (var attributeName in this.attributeLocations) {
              var resolvedBuffer = buffer.getBuffer(attributeName);
              var resolvedInfo = buffer.getAttributeInfo(attributeName);
              assertTruthy(resolvedBuffer, `Buffer for "${attributeName}" not found`);
              assertTruthy(resolvedInfo);
              this.bindBufferAttribute(this.attributeLocations[attributeName], resolvedBuffer, resolvedInfo);
            }
            this.boundBufferCollection = buffer;
          }
          bindProps(props) {
            // Implement in child class
          }
          bindTextures(textures) {
            // no defaults
          }
          attach() {
            this.glw.useProgram(this.program);
            this.glw.useProgram(this.program);
            if (this.glw.isWebGl2() && this.vao) {
              this.glw.bindVertexArray(this.vao);
            }
          }
          detach() {
            this.disableAttributes();
          }
        }

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        _defineProperty(WebGlCoreShader, "shaderSources", void 0);
        class DefaultShader extends WebGlCoreShader {
          constructor(renderer) {
            super({
              renderer,
              attributes: ['a_position', 'a_textureCoordinate', 'a_color'],
              uniforms: [{
                name: 'u_resolution',
                uniform: 'uniform2fv'
              }, {
                name: 'u_pixelRatio',
                uniform: 'uniform1f'
              }, {
                name: 'u_texture',
                uniform: 'uniform2fv'
              }]
            });
          }
          bindTextures(textures) {
            var glw = this.glw;
            glw.activeTexture(0);
            glw.bindTexture(textures[0].ctxTexture);
          }
        }

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        // import type { Texture } from '../textures/Texture';
        _defineProperty(DefaultShader, "shaderSources", {
          vertex: `
      # ifdef GL_FRAGMENT_PRECISION_HIGH
      precision highp float;
      # else
      precision mediump float;
      # endif

      attribute vec2 a_position;
      attribute vec2 a_textureCoordinate;
      attribute vec4 a_color;

      uniform vec2 u_resolution;
      uniform float u_pixelRatio;


      varying vec4 v_color;
      varying vec2 v_textureCoordinate;

      void main() {
        vec2 normalized = a_position * u_pixelRatio;
        vec2 screenSpace = vec2(2.0 / u_resolution.x, -2.0 / u_resolution.y);

        v_color = a_color;
        v_textureCoordinate = a_textureCoordinate;

        gl_Position = vec4(normalized.x * screenSpace.x - 1.0, normalized.y * -abs(screenSpace.y) + 1.0, 0.0, 1.0);
        gl_Position.y = -sign(screenSpace.y) * gl_Position.y;
      }
    `,
          fragment: `
      # ifdef GL_FRAGMENT_PRECISION_HIGH
      precision highp float;
      # else
      precision mediump float;
      # endif

      uniform vec2 u_resolution;
      uniform sampler2D u_texture;

      varying vec4 v_color;
      varying vec2 v_textureCoordinate;

      void main() {
          vec4 color = texture2D(u_texture, v_textureCoordinate);
          gl_FragColor = vec4(v_color) * texture2D(u_texture, v_textureCoordinate);
      }
    `
        });
        class DefaultShaderBatched extends WebGlCoreShader {
          constructor(renderer) {
            super({
              renderer,
              attributes: ['a_position', 'a_textureCoordinate', 'a_color', 'a_textureIndex'],
              uniforms: [{
                name: 'u_resolution',
                uniform: 'uniform2fv'
              }, {
                name: 'u_pixelRatio',
                uniform: 'uniform1f'
              }, {
                name: 'u_textures[0]',
                uniform: 'uniform1iv'
              }]
            });
            _defineProperty(this, "supportsIndexedTextures", true);
          }
          bindTextures(texture) {
            var renderer = this.renderer,
              glw = this.glw;
            if (texture.length > renderer.system.parameters.MAX_VERTEX_TEXTURE_IMAGE_UNITS) {
              throw new Error(`DefaultShaderBatched: Cannot bind more than ${renderer.system.parameters.MAX_VERTEX_TEXTURE_IMAGE_UNITS} textures`);
            }
            texture.forEach((t, i) => {
              glw.activeTexture(i);
              glw.bindTexture(t.ctxTexture);
            });
            var samplers = Array.from(Array(texture.length).keys());
            this.setUniform('u_textures[0]', samplers);
          }
        }
        _defineProperty(DefaultShaderBatched, "shaderSources", {
          vertex: `
      # ifdef GL_FRAGMENT_PRECISION_HIGH
      precision highp float;
      # else
      precision mediump float;
      # endif

      attribute vec2 a_textureCoordinate;
      attribute vec2 a_position;
      attribute vec4 a_color;
      attribute float a_textureIndex;
      attribute float a_depth;

      uniform vec2 u_resolution;
      uniform float u_pixelRatio;

      varying vec4 v_color;
      varying vec2 v_textureCoordinate;
      varying float v_textureIndex;

      void main(){
        vec2 normalized = a_position * u_pixelRatio / u_resolution;
        vec2 zero_two = normalized * 2.0;
        vec2 clip_space = zero_two - 1.0;

        // pass to fragment
        v_color = a_color;
        v_textureCoordinate = a_textureCoordinate;
        v_textureIndex = a_textureIndex;

        // flip y
        gl_Position = vec4(clip_space * vec2(1.0, -1.0), 0, 1);
      }
    `,
          fragment: textureUnits => `
      #define txUnits ${textureUnits}
      # ifdef GL_FRAGMENT_PRECISION_HIGH
      precision highp float;
      # else
      precision mediump float;
      # endif

      uniform vec2 u_resolution;
      uniform sampler2D u_image;
      uniform sampler2D u_textures[txUnits];

      varying vec4 v_color;
      varying vec2 v_textureCoordinate;
      varying float v_textureIndex;

      vec4 sampleFromTexture(sampler2D textures[${textureUnits}], int idx, vec2 uv) {
        ${Array.from(Array(textureUnits).keys()).map(idx => `
          ${idx !== 0 ? 'else ' : ''}if (idx == ${idx}) {
            return texture2D(textures[${idx}], uv);
          }
        `).join('')}
        return texture2D(textures[0], uv);
      }

      void main(){
        gl_FragColor = vec4(v_color) * sampleFromTexture(u_textures, int(v_textureIndex), v_textureCoordinate);
      }
    `
        });
        class ShaderEffect {
          static getEffectKey(props) {
            return '';
          }
          static getMethodParameters(uniforms, props) {
            var res = [];
            for (var u in uniforms) {
              var uni = uniforms[u];
              var define = '';
              if (uni.size) {
                define = `[${uni.size(props)}]`;
              }
              res.push(`${uni.type} ${u}${define}`);
            }
            return res.join(',');
          }
          constructor(options) {
            _defineProperty(this, "priority", 1);
            _defineProperty(this, "name", '');
            _defineProperty(this, "ref", void 0);
            _defineProperty(this, "target", void 0);
            _defineProperty(this, "passParameters", '');
            _defineProperty(this, "declaredUniforms", '');
            _defineProperty(this, "uniformInfo", {});
            var ref = options.ref,
              target = options.target,
              _options$props = options.props,
              props = _options$props === void 0 ? {} : _options$props;
            this.ref = ref;
            this.target = target;
            var uniformInfo = {};
            var passParameters = [];
            var declaredUniforms = '';
            var uniforms = this.constructor.uniforms || {};
            for (var u in uniforms) {
              var unif = uniforms[u];
              var uniType = unif.type;
              //make unique uniform name
              var uniformName = `${ref}_${u}`;
              var define = '';
              if (unif.size) {
                define = `[${unif.size(props)}]`;
              }
              passParameters.push(uniformName);
              declaredUniforms += `uniform ${uniType} ${uniformName}${define};`;
              uniformInfo[u] = {
                name: uniformName,
                uniform: uniforms[u].method
              };
            }
            this.passParameters = passParameters.join(',');
            this.declaredUniforms = declaredUniforms;
            this.uniformInfo = uniformInfo;
          }
          static resolveDefaults(props) {
            return {};
          }
          static makeEffectKey(props) {
            return false;
          }
        }
        _defineProperty(ShaderEffect, "uniforms", {});
        _defineProperty(ShaderEffect, "methods", void 0);
        _defineProperty(ShaderEffect, "onShaderMask", void 0);
        _defineProperty(ShaderEffect, "onColorize", void 0);
        _defineProperty(ShaderEffect, "onEffectMask", void 0);
        var effectCache = new Map();
        var getResolvedEffect = (effects, effectContructors) => {
          var _effects;
          var key = JSON.stringify(effects);
          if (effectCache.has(key)) {
            return effectCache.get(key);
          }
          effects = (_effects = effects) !== null && _effects !== void 0 ? _effects : [];
          var resolvedEffects = [];
          var effectsLength = effects.length;
          var i = 0;
          for (; i < effectsLength; i++) {
            var _effects$i = effects[i],
              name = _effects$i.name,
              type = _effects$i.type,
              props = _effects$i.props;
            var resolvedEffect = {
              name,
              type,
              props: {}
            };
            var effectConstructor = effectContructors[type];
            var defaultPropValues = effectConstructor.resolveDefaults(props);
            var uniforms = effectConstructor.uniforms;
            var uniformKeys = Object.keys(uniforms);
            var uniformsLength = uniformKeys.length;
            var j = 0;
            for (; j < uniformsLength; j++) {
              var _key11 = uniformKeys[j];
              var uniform = uniforms[_key11];
              var result = {
                value: defaultPropValues[_key11],
                programValue: undefined,
                updateOnBind: uniform.updateOnBind || false,
                hasValidator: uniform.validator !== undefined,
                hasProgramValueUpdater: uniform.updateProgramValue !== undefined
              };
              var validatedValue = result.hasValidator && uniform.validator(defaultPropValues[_key11], defaultPropValues) || defaultPropValues[_key11];
              if (defaultPropValues[_key11] !== validatedValue) {
                result.validatedValue = validatedValue;
              }
              if (result.hasProgramValueUpdater) {
                uniform.updateProgramValue(result);
              }
              if (result.programValue === undefined) {
                result.programValue = result.value;
              }
              resolvedEffect.props[_key11] = result;
            }
            resolvedEffects.push(resolvedEffect);
          }
          effectCache.set(key, resolvedEffects);
          return resolvedEffects;
        };
        class DynamicShader extends WebGlCoreShader {
          constructor(renderer, props, effectContructors) {
            var shader = DynamicShader.createShader(props, effectContructors);
            super({
              renderer,
              attributes: ['a_position', 'a_textureCoordinate', 'a_color'],
              uniforms: [{
                name: 'u_resolution',
                uniform: 'uniform2fv'
              }, {
                name: 'u_pixelRatio',
                uniform: 'uniform1f'
              }, {
                name: 'u_texture',
                uniform: 'uniform2fv'
              }, {
                name: 'u_dimensions',
                uniform: 'uniform2fv'
              }, {
                name: 'u_alpha',
                uniform: 'uniform1f'
              }, ...shader.uniforms],
              shaderSources: {
                vertex: shader.vertex,
                fragment: shader.fragment
              }
            });
            _defineProperty(this, "effects", []);
            this.effects = shader.effects;
          }
          bindTextures(textures) {
            var glw = this.glw;
            glw.activeTexture(0);
            glw.bindTexture(textures[0].ctxTexture);
          }
          bindProps(props) {
            var effects = props.effects;
            var effectsL = effects.length;
            var i = 0;
            for (; i < effectsL; i++) {
              var _effect2 = effects[i];
              var uniformInfo = this.effects[i].uniformInfo;
              var propKeys = Object.keys(_effect2.props);
              var propsLength = propKeys.length;
              var j = 0;
              for (; j < propsLength; j++) {
                var _key12 = propKeys[j];
                var prop = _effect2.props[_key12];
                if (prop.updateOnBind === true) {
                  var _this$renderer$shMana;
                  var uniform = (_this$renderer$shMana = this.renderer.shManager.getRegisteredEffects()[_effect2.type]) === null || _this$renderer$shMana === void 0 ? void 0 : _this$renderer$shMana.uniforms[_key12];
                  uniform === null || uniform === void 0 || uniform.updateProgramValue(_effect2.props[_key12], props);
                }
                this.setUniform(uniformInfo[_key12].name, _effect2.props[_key12].programValue);
              }
            }
          }
          canBatchShaderProps(propsA, propsB) {
            if (propsA.$dimensions.width !== propsB.$dimensions.width || propsA.$dimensions.height !== propsB.$dimensions.height || propsA.effects.length !== propsB.effects.length) {
              return false;
            }
            var propsEffectsLen = propsA.effects.length;
            var i = 0;
            for (; i < propsEffectsLen; i++) {
              var effectA = propsA.effects[i];
              var effectB = propsB.effects[i];
              if (effectA.type !== effectB.type) {
                return false;
              }
              for (var _key13 in effectA.props) {
                if (effectB.props && !effectB.props[_key13] || effectA.props[_key13].value !== effectB.props[_key13].value) {
                  return false;
                }
              }
            }
            return true;
          }
          static createShader(props, effectContructors) {
            //counts duplicate effects
            var effectNameCount = {};
            var methods = {};
            var declareUniforms = '';
            var uniforms = [];
            var uFx = [];
            var effects = props.effects.map(effect => {
              var baseClass = effectContructors[effect.type];
              var key = baseClass.getEffectKey(effect.props || {});
              effectNameCount[key] = effectNameCount[key] ? ++effectNameCount[key] : 1;
              var nr = effectNameCount[key];
              if (nr === 1) {
                uFx.push({
                  key,
                  type: effect.type,
                  props: effect.props
                });
              }
              //initialize new effect class;
              var fxClass = new baseClass({
                ref: `${key}${nr === 1 ? '' : nr}`,
                target: key,
                props: effect.props
              });
              declareUniforms += fxClass.declaredUniforms;
              uniforms.push(...Object.values(fxClass.uniformInfo));
              return fxClass;
            });
            //build source
            var effectMethods = '';
            uFx === null || uFx === void 0 || uFx.forEach(fx => {
              var _fx$props;
              var fxClass = effectContructors[fx.type];
              var fxProps = fxClass.resolveDefaults((_fx$props = fx.props) !== null && _fx$props !== void 0 ? _fx$props : {});
              var remap = [];
              for (var m in fxClass.methods) {
                var cm = m;
                var fxMethod = fxClass.methods[m];
                if (methods[m] && methods[m] !== fxMethod) {
                  cm = DynamicShader.resolveMethodDuplicate(m, fxMethod, methods);
                }
                methods[cm] = fxMethod.replace('function', cm);
                remap.push({
                  m,
                  cm
                });
              }
              var onShaderMask = fxClass.onShaderMask instanceof Function ? fxClass.onShaderMask(fxProps) : fxClass.onShaderMask;
              var onColorize = fxClass.onColorize instanceof Function ? fxClass.onColorize(fxProps) : fxClass.onColorize;
              var onEffectMask = fxClass.onEffectMask instanceof Function ? fxClass.onEffectMask(fxProps) : fxClass.onEffectMask;
              remap.forEach(r => {
                var m = r.m,
                  cm = r.cm;
                var reg = new RegExp(`\\$${m}`, 'g');
                if (onShaderMask) {
                  onShaderMask = onShaderMask.replace(reg, cm);
                }
                if (onColorize) {
                  onColorize = onColorize.replace(reg, cm);
                }
                if (onEffectMask) {
                  onEffectMask = onEffectMask.replace(reg, cm);
                }
              });
              var methodParameters = fxClass.getMethodParameters(fxClass.uniforms, fxProps);
              var pm = methodParameters.length > 0 ? `, ${methodParameters}` : '';
              if (onShaderMask) {
                effectMethods += `
        float fx_${fx.key}_onShaderMask(float shaderMask ${pm}) {
          ${onShaderMask}
        }
        `;
              }
              if (onColorize) {
                effectMethods += `
          vec4 fx_${fx.key}_onColorize(float shaderMask, vec4 maskColor, vec4 shaderColor${pm}) {
            ${onColorize}
          }
        `;
              }
              if (onEffectMask) {
                effectMethods += `
          vec4 fx_${fx.key}_onEffectMask(float shaderMask, vec4 maskColor, vec4 shaderColor${pm}) {
            ${onEffectMask}
          }
        `;
              }
            });
            var sharedMethods = '';
            for (var m in methods) {
              sharedMethods += methods[m];
            }
            //fill main functions
            var currentMask = `mix(shaderColor, maskColor, clamp(-(lng_DefaultMask), 0.0, 1.0))`;
            var drawEffects = `

    `;
            for (var i = 0; i < effects.length; i++) {
              var current = effects[i];
              var pm = current.passParameters.length > 0 ? `, ${current.passParameters}` : '';
              var currentClass = effectContructors[current.name];
              if (currentClass.onShaderMask) {
                drawEffects += `
        shaderMask = fx_${current.target}_onShaderMask(shaderMask ${pm});
        `;
              }
              if (currentClass.onColorize) {
                drawEffects += `
        maskColor = fx_${current.target}_onColorize(shaderMask, maskColor, shaderColor${pm});
        `;
              }
              if (currentClass.onEffectMask) {
                currentMask = `fx_${current.target}_onEffectMask(shaderMask, maskColor, shaderColor${pm})`;
              }
              var next = effects[i + 1];
              if (next === undefined || effectContructors[next.name].onEffectMask) {
                drawEffects += `
          shaderColor = ${currentMask};
        `;
              }
            }
            return {
              effects,
              uniforms,
              fragment: DynamicShader.fragment(declareUniforms, sharedMethods, effectMethods, drawEffects),
              vertex: DynamicShader.vertex()
            };
          }
          static resolveMethodDuplicate(key, effectMethod, methodCollection, increment = 0) {
            var m = key + (increment > 0 ? increment : '');
            if (methodCollection[m] && methodCollection[m] !== effectMethod) {
              return this.resolveMethodDuplicate(key, effectMethod, methodCollection, ++increment);
            }
            return m;
          }
          static resolveDefaults(props, effectContructors) {
            var _props$effects;
            assertTruthy(effectContructors);
            return {
              effects: getResolvedEffect((_props$effects = props.effects) !== null && _props$effects !== void 0 ? _props$effects : [], effectContructors),
              $dimensions: {
                width: 0,
                height: 0
              },
              $alpha: 0
            };
          }
          static makeCacheKey(props, effectContructors) {
            var _props$effects2;
            var fx = '';
            (_props$effects2 = props.effects) === null || _props$effects2 === void 0 || _props$effects2.forEach(effect => {
              var baseClass = effectContructors[effect.type];
              var key = baseClass.getEffectKey(effect.props || {});
              fx += `,${key}`;
            });
            return `DynamicShader${fx}`;
          }
        }

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        /**
         * Similar to the {@link DefaultShader} but cuts out 4 rounded rectangle corners
         * as defined by the specified corner {@link RoundedRectangleProps.radius}
         */
        _defineProperty(DynamicShader, "z$__type__Props", void 0);
        _defineProperty(DynamicShader, "vertex", () => `
    # ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
    # else
    precision mediump float;
    # endif

    attribute vec2 a_textureCoordinate;
    attribute vec2 a_position;
    attribute vec4 a_color;
    attribute float a_textureIndex;

    uniform vec2 u_resolution;
    uniform float u_pixelRatio;

    varying vec4 v_color;
    varying vec2 v_textureCoordinate;
    varying float v_textureIndex;

    void main(){
      vec2 normalized = a_position * u_pixelRatio / u_resolution;
      vec2 zero_two = normalized * 2.0;
      vec2 clip_space = zero_two - 1.0;

      // pass to fragment
      v_color = a_color;
      v_textureCoordinate = a_textureCoordinate;
      v_textureIndex = a_textureIndex;

      // flip y
      gl_Position = vec4(clip_space * vec2(1.0, -1.0), 0, 1);
    }
  `);
        _defineProperty(DynamicShader, "fragment", (uniforms, methods, effectMethods, drawEffects) => `
    # ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
    # else
    precision mediump float;
    # endif

    #define PI 3.14159265359

    uniform vec2 u_resolution;
    uniform vec2 u_dimensions;
    uniform float u_alpha;
    uniform float u_radius;
    uniform sampler2D u_texture;
    uniform float u_pixelRatio;

    ${uniforms}

    varying vec4 v_color;
    varying vec2 v_textureCoordinate;

    ${methods}

    ${effectMethods}

    void main() {
      vec2 p = v_textureCoordinate.xy * u_dimensions - u_dimensions * 0.5;
      vec2 d = abs(p) - (u_dimensions) * 0.5;
      float lng_DefaultMask = min(max(d.x, d.y), 0.0) + length(max(d, 0.0));

      vec4 shaderColor = vec4(0.0);
      float shaderMask = lng_DefaultMask;

      vec4 maskColor = texture2D(u_texture, v_textureCoordinate) * v_color;

      shaderColor = mix(shaderColor, maskColor, clamp(-(lng_DefaultMask + 0.5), 0.0, 1.0));

      ${drawEffects}

      gl_FragColor = shaderColor * u_alpha;
    }
  `);
        class RoundedRectangle extends WebGlCoreShader {
          constructor(renderer) {
            super({
              renderer,
              attributes: ['a_position', 'a_textureCoordinate', 'a_color'],
              uniforms: [{
                name: 'u_resolution',
                uniform: 'uniform2fv'
              }, {
                name: 'u_pixelRatio',
                uniform: 'uniform1f'
              }, {
                name: 'u_texture',
                uniform: 'uniform2f'
              }, {
                name: 'u_dimensions',
                uniform: 'uniform2fv'
              }, {
                name: 'u_radius',
                uniform: 'uniform1f'
              }]
            });
          }
          static resolveDefaults(props) {
            return {
              radius: props.radius || 10,
              $dimensions: {
                width: 0,
                height: 0
              }
            };
          }
          bindTextures(textures) {
            var glw = this.glw;
            glw.activeTexture(0);
            glw.bindTexture(textures[0].ctxTexture);
          }
          bindProps(props) {
            var radiusFactor = Math.min(props.$dimensions.width, props.$dimensions.height) / (2.0 * props.radius);
            this.setUniform('u_radius', props.radius * Math.min(radiusFactor, 1));
          }
          canBatchShaderProps(propsA, propsB) {
            return propsA.radius === propsB.radius && propsA.$dimensions.width === propsB.$dimensions.width && propsA.$dimensions.height === propsB.$dimensions.height;
          }
        }

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        _defineProperty(RoundedRectangle, "z$__type__Props", void 0);
        _defineProperty(RoundedRectangle, "shaderSources", {
          vertex: `
      # ifdef GL_FRAGMENT_PRECISION_HIGH
      precision highp float;
      # else
      precision mediump float;
      # endif

      attribute vec2 a_position;
      attribute vec2 a_textureCoordinate;
      attribute vec4 a_color;
      attribute float a_textureIndex;
      attribute float a_depth;

      uniform vec2 u_resolution;
      uniform float u_pixelRatio;

      varying vec4 v_color;
      varying vec2 v_textureCoordinate;

      void main() {
        vec2 normalized = a_position * u_pixelRatio / u_resolution;
        vec2 zero_two = normalized * 2.0;
        vec2 clip_space = zero_two - 1.0;

        // pass to fragment
        v_color = a_color;
        v_textureCoordinate = a_textureCoordinate;

        // flip y
        gl_Position = vec4(clip_space * vec2(1.0, -1.0), 0, 1);
      }
    `,
          fragment: `
      # ifdef GL_FRAGMENT_PRECISION_HIGH
      precision highp float;
      # else
      precision mediump float;
      # endif

      uniform vec2 u_resolution;
      uniform vec2 u_dimensions;
      uniform float u_radius;
      uniform sampler2D u_texture;

      varying vec4 v_color;
      varying vec2 v_textureCoordinate;

      float boxDist(vec2 p, vec2 size, float radius){
        size -= vec2(radius);
        vec2 d = abs(p) - size;
        return min(max(d.x, d.y), 0.0) + length(max(d, 0.0)) - radius;
      }

      float fillMask(float dist) {
        return clamp(-dist, 0.0, 1.0);
      }

      void main() {
        vec4 color = texture2D(u_texture, v_textureCoordinate) * v_color;
        vec2 halfDimensions = u_dimensions * 0.5;

        float d = boxDist(v_textureCoordinate.xy * u_dimensions - halfDimensions, halfDimensions + 0.5, u_radius);
        gl_FragColor = mix(vec4(0.0), color, fillMask(d));
      }
    `
        });
        var IDENTITY_MATRIX_3x3 = new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);
        /**
         * SdfShader supports multi-channel and single-channel signed distance field textures.
         *
         * @remarks
         * This Shader is used by the {@link SdfTextRenderer}. Do not use thie Shader
         * directly. Instead create a Text Node and assign a SDF font family to it.
         *
         * @internalRemarks
         * The only thing this shader does to support multi-channel SDFs is to
         * add a median function to the fragment shader. If this one function call
         * ends up being a performance bottleneck we can always look at ways to
         * remove it.
         */
        class SdfShader extends WebGlCoreShader {
          constructor(renderer) {
            super({
              renderer,
              attributes: ['a_position', 'a_textureCoordinate'],
              uniforms: [{
                name: 'u_resolution',
                uniform: 'uniform2fv'
              }, {
                name: 'u_transform',
                uniform: 'uniformMatrix3fv'
              }, {
                name: 'u_scrollY',
                uniform: 'uniform1f'
              }, {
                name: 'u_pixelRatio',
                uniform: 'uniform1f'
              }, {
                name: 'u_texture',
                uniform: 'uniform2f'
              }, {
                name: 'u_color',
                uniform: 'uniform4fv'
              }, {
                name: 'u_size',
                uniform: 'uniform1f'
              }, {
                name: 'u_distanceRange',
                uniform: 'uniform1f'
              }, {
                name: 'u_debug',
                uniform: 'uniform1i'
              }]
            });
          }
          bindTextures(textures) {
            var glw = this.glw;
            glw.activeTexture(0);
            glw.bindTexture(textures[0].ctxTexture);
          }
          bindProps(props) {
            var resolvedProps = SdfShader.resolveDefaults(props);
            for (var _key14 in resolvedProps) {
              if (_key14 === 'transform') {
                this.setUniform('u_transform', false, resolvedProps[_key14]);
              } else if (_key14 === 'scrollY') {
                this.setUniform('u_scrollY', resolvedProps[_key14]);
              } else if (_key14 === 'color') {
                var components = getNormalizedRgbaComponents(resolvedProps.color);
                this.setUniform('u_color', components);
              } else if (_key14 === 'size') {
                this.setUniform('u_size', resolvedProps[_key14]);
              } else if (_key14 === 'distanceRange') {
                this.setUniform('u_distanceRange', resolvedProps[_key14]);
              } else if (_key14 === 'debug') {
                this.setUniform('u_debug', resolvedProps[_key14] ? 1.0 : 0.0);
              }
            }
          }
          static resolveDefaults(props = {}) {
            var _props$transform, _props$scrollY, _props$color, _props$size, _props$distanceRange, _props$debug;
            return {
              transform: (_props$transform = props.transform) !== null && _props$transform !== void 0 ? _props$transform : IDENTITY_MATRIX_3x3,
              scrollY: (_props$scrollY = props.scrollY) !== null && _props$scrollY !== void 0 ? _props$scrollY : 0,
              color: (_props$color = props.color) !== null && _props$color !== void 0 ? _props$color : 0xffffffff,
              size: (_props$size = props.size) !== null && _props$size !== void 0 ? _props$size : 16,
              distanceRange: (_props$distanceRange = props.distanceRange) !== null && _props$distanceRange !== void 0 ? _props$distanceRange : 1.0,
              debug: (_props$debug = props.debug) !== null && _props$debug !== void 0 ? _props$debug : false
            };
          }
        }

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        _defineProperty(SdfShader, "shaderSources", {
          vertex: `
      # ifdef GL_FRAGMENT_PRECISION_HIGH
      precision highp float;
      # else
      precision mediump float;
      # endif
      // an attribute is an input (in) to a vertex shader.
      // It will receive data from a buffer
      attribute vec2 a_position;
      attribute vec2 a_textureCoordinate;

      uniform vec2 u_resolution;
      uniform mat3 u_transform;
      uniform float u_scrollY;
      uniform float u_pixelRatio;
      uniform float u_size;

      varying vec2 v_texcoord;

      void main() {
        vec2 scrolledPosition = a_position * u_size - vec2(0, u_scrollY);
        vec2 transformedPosition = (u_transform * vec3(scrolledPosition, 1)).xy;

        // Calculate screen space with pixel ratio
        vec2 screenSpace = (transformedPosition * u_pixelRatio / u_resolution * 2.0 - 1.0) * vec2(1, -1);

        gl_Position = vec4(screenSpace, 0.0, 1.0);
        v_texcoord = a_textureCoordinate;

      }
    `,
          fragment: `
      # ifdef GL_FRAGMENT_PRECISION_HIGH
      precision highp float;
      # else
      precision mediump float;
      # endif
      uniform vec4 u_color;
      uniform sampler2D u_texture;
      uniform float u_distanceRange;
      uniform float u_pixelRatio;
      uniform int u_debug;

      varying vec2 v_texcoord;

      float median(float r, float g, float b) {
          return max(min(r, g), min(max(r, g), b));
      }

      void main() {
          vec3 sample = texture2D(u_texture, v_texcoord).rgb;
          if (u_debug == 1) {
            gl_FragColor = vec4(sample.r, sample.g, sample.b, 1.0);
            return;
          }
          float scaledDistRange = u_distanceRange * u_pixelRatio;
          float sigDist = scaledDistRange * (median(sample.r, sample.g, sample.b) - 0.5);
          float opacity = clamp(sigDist + 0.5, 0.0, 1.0) * u_color.a;

          // Build the final color.
          // IMPORTANT: We must premultiply the color by the alpha value before returning it.
          gl_FragColor = vec4(u_color.r * opacity, u_color.g * opacity, u_color.b * opacity, opacity);
      }
    `
        });
        var updateShaderEffectColor = values => {
          if (values.programValue === undefined) {
            values.programValue = new Float32Array(4);
          }
          var rgba = values.value;
          var floatArray = values.programValue;
          floatArray[0] = (rgba >>> 24) / 255;
          floatArray[1] = (rgba >>> 16 & 0xff) / 255;
          floatArray[2] = (rgba >>> 8 & 0xff) / 255;
          floatArray[3] = (rgba & 0xff) / 255;
        };
        var updateFloat32ArrayLength2 = values => {
          var validatedValue = values.validatedValue || values.value;
          if (values.programValue instanceof Float32Array) {
            var floatArray = values.programValue;
            floatArray[0] = validatedValue[0];
            floatArray[1] = validatedValue[1];
          } else {
            values.programValue = new Float32Array(validatedValue);
          }
        };
        var updateFloat32ArrayLength4 = values => {
          var validatedValue = values.validatedValue || values.value;
          if (values.programValue instanceof Float32Array) {
            var floatArray = values.programValue;
            floatArray[0] = validatedValue[0];
            floatArray[1] = validatedValue[1];
            floatArray[2] = validatedValue[1];
            floatArray[3] = validatedValue[1];
          } else {
            values.programValue = new Float32Array(validatedValue);
          }
        };
        var updateFloat32ArrayLengthN = values => {
          var validatedValue = values.validatedValue || values.value;
          if (values.programValue instanceof Float32Array) {
            var len = validatedValue.length;
            var programValue = values.programValue;
            for (var i = 0; i < len; i++) {
              programValue[i] = validatedValue[i];
            }
          } else {
            values.programValue = new Float32Array(validatedValue);
          }
        };
        var validateArrayLength4 = value => {
          var isArray = Array.isArray(value);
          if (!isArray) {
            return [value, value, value, value];
          } else if (isArray && value.length === 4) {
            return value;
          } else if (isArray && value.length === 2) {
            return [value[0], value[1], value[0], value[1]];
          } else if (isArray && value.length === 3) {
            return [value[0], value[1], value[2], value[0]];
          }
          return [value[0], value[0], value[0], value[0]];
        };
        var updateWebSafeRadius = (values, shaderProps) => {
          if (values.programValue === undefined) {
            values.programValue = new Float32Array(4);
          }
          var programValue = values.programValue;
          var validatedValue = values.validatedValue || values.value;
          if (shaderProps === undefined && values.$dimensions === undefined) {
            programValue[0] = validatedValue[0];
            programValue[1] = validatedValue[1];
            programValue[2] = validatedValue[2];
            programValue[3] = validatedValue[3];
            return;
          }
          var storedDimensions = values.$dimensions;
          if (shaderProps !== undefined) {
            var $dimensions = shaderProps.$dimensions;
            if (storedDimensions !== undefined && (storedDimensions.width === $dimensions.width || storedDimensions.height === $dimensions.height)) {
              return;
            }
            if (storedDimensions === undefined) {
              storedDimensions = {
                width: $dimensions === null || $dimensions === void 0 ? void 0 : $dimensions.width,
                height: $dimensions === null || $dimensions === void 0 ? void 0 : $dimensions.height
              };
              values.$dimensions = storedDimensions;
            }
          }
          var _storedDimensions = storedDimensions,
            width = _storedDimensions.width,
            height = _storedDimensions.height;
          var _validatedValue = _slicedToArray(validatedValue, 4),
            r0 = _validatedValue[0],
            r1 = _validatedValue[1],
            r2 = _validatedValue[2],
            r3 = _validatedValue[3];
          var factor = Math.min(Math.min(Math.min(width / Math.max(width, r0 + r1), width / Math.max(width, r2 + r3)), Math.min(height / Math.max(height, r0 + r2), height / Math.max(height, r1 + r3))), 1);
          programValue[0] = r0 * factor;
          programValue[1] = r1 * factor;
          programValue[2] = r2 * factor;
          programValue[3] = r3 * factor;
        };

        /**
         * Masks the current maskcolor with rounded corners similar to {@link RoundedRectangle}
         */
        class RadiusEffect extends ShaderEffect {
          constructor(...args) {
            super(...args);
            _defineProperty(this, "name", 'radius');
          }
          static getEffectKey() {
            return `radius`;
          }
          static resolveDefaults(props) {
            var _props$radius;
            return {
              radius: (_props$radius = props.radius) !== null && _props$radius !== void 0 ? _props$radius : 10
            };
          }
        }

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        /**
         * The BorderEffect renders a border along all edges of an element
         */
        _defineProperty(RadiusEffect, "z$__type__Props", void 0);
        _defineProperty(RadiusEffect, "uniforms", {
          radius: {
            value: 0,
            method: 'uniform4fv',
            type: 'vec4',
            updateOnBind: true,
            validator: validateArrayLength4,
            updateProgramValue: updateWebSafeRadius
          }
        });
        _defineProperty(RadiusEffect, "methods", {
          fillMask: `
      float function(float dist) {
        return clamp(-dist, 0.0, 1.0);
      }
    `,
          boxDist: `
      float function(vec2 p, vec2 size, float radius) {
        size -= vec2(radius);
        vec2 d = abs(p) - size;
        return min(max(d.x, d.y), 0.0) + length(max(d, 0.0)) - radius;
      }
    `
        });
        _defineProperty(RadiusEffect, "onShaderMask", `
  vec2 halfDimensions = u_dimensions * 0.5;
  float r = radius[0] * step(v_textureCoordinate.x, 0.5) * step(v_textureCoordinate.y, 0.5);
  r = r + radius[1] * step(0.5, v_textureCoordinate.x) * step(v_textureCoordinate.y, 0.5);
  r = r + radius[2] * step(0.5, v_textureCoordinate.x) * step(0.5, v_textureCoordinate.y);
  r = r + radius[3] * step(v_textureCoordinate.x, 0.5) * step(0.5, v_textureCoordinate.y);
  return $boxDist(v_textureCoordinate.xy * u_dimensions - halfDimensions, halfDimensions, r);
  `);
        _defineProperty(RadiusEffect, "onEffectMask", `
  return mix(vec4(0.0), maskColor, $fillMask(shaderMask));
  `);
        class BorderEffect extends ShaderEffect {
          constructor(...args) {
            super(...args);
            _defineProperty(this, "name", 'border');
          }
          static getEffectKey() {
            return `border`;
          }
          static resolveDefaults(props) {
            var _props$width3, _props$color2;
            return {
              width: (_props$width3 = props.width) !== null && _props$width3 !== void 0 ? _props$width3 : 10,
              color: (_props$color2 = props.color) !== null && _props$color2 !== void 0 ? _props$color2 : 0xffffffff
            };
          }
        }

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        /**
         * Linear Gradient effect over a effect mask
         */
        _defineProperty(BorderEffect, "z$__type__Props", void 0);
        _defineProperty(BorderEffect, "uniforms", {
          width: {
            value: 0,
            method: 'uniform1f',
            type: 'float'
          },
          color: {
            value: 0xffffffff,
            updateProgramValue: updateShaderEffectColor,
            method: 'uniform4fv',
            type: 'vec4'
          }
        });
        _defineProperty(BorderEffect, "onEffectMask", `
  float intR = shaderMask + 1.0;
  float mask = clamp(intR + width, 0.0, 1.0) - clamp(intR, 0.0, 1.0);
  return mix(shaderColor, mix(shaderColor, maskColor, maskColor.a), mask);
  `);
        _defineProperty(BorderEffect, "onColorize", `
    return color;
  `);
        class LinearGradientEffect extends ShaderEffect {
          constructor(...args) {
            super(...args);
            _defineProperty(this, "name", 'linearGradient');
          }
          static getEffectKey(props) {
            return `linearGradient${props.colors.length}`;
          }
          static resolveDefaults(props) {
            var _props$colors, _props$angle;
            var colors = (_props$colors = props.colors) !== null && _props$colors !== void 0 ? _props$colors : [0xff000000, 0xffffffff];
            var stops = props.stops || [];
            if (stops.length === 0 || stops.length !== colors.length) {
              var colorsL = colors.length;
              var i = 0;
              var tmp = stops;
              for (; i < colorsL; i++) {
                if (stops[i]) {
                  tmp[i] = stops[i];
                  if (stops[i - 1] === undefined && tmp[i - 2] !== undefined) {
                    tmp[i - 1] = tmp[i - 2] + (stops[i] - tmp[i - 2]) / 2;
                  }
                } else {
                  tmp[i] = i * (1 / (colors.length - 1));
                }
              }
              stops = tmp;
            }
            return {
              colors,
              stops,
              angle: (_props$angle = props.angle) !== null && _props$angle !== void 0 ? _props$angle : 0
            };
          }
        }

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        /**
         * Grayscale effect grayscales the color values of the current mask color
         */
        _LinearGradientEffect = LinearGradientEffect;
        _defineProperty(LinearGradientEffect, "z$__type__Props", void 0);
        _defineProperty(LinearGradientEffect, "uniforms", {
          angle: {
            value: 0,
            method: 'uniform1f',
            type: 'float'
          },
          colors: {
            value: 0xffffffff,
            validator: rgbas => {
              return rgbas.reduce((acc, val) => acc.concat(getNormalizedRgbaComponents(val)), []);
            },
            updateProgramValue: updateFloat32ArrayLengthN,
            size: props => props.colors.length,
            method: 'uniform4fv',
            type: 'vec4'
          },
          stops: {
            value: [],
            size: props => props.colors.length,
            method: 'uniform1fv',
            type: 'float'
          }
        });
        _defineProperty(LinearGradientEffect, "methods", {
          fromLinear: `
      vec4 function(vec4 linearRGB) {
        vec4 higher = vec4(1.055)*pow(linearRGB, vec4(1.0/2.4)) - vec4(0.055);
        vec4 lower = linearRGB * vec4(12.92);
        return mix(higher, lower, 1.0);
      }
    `,
          toLinear: `
      vec4 function(vec4 sRGB) {
        vec4 higher = pow((sRGB + vec4(0.055))/vec4(1.055), vec4(2.4));
        vec4 lower = sRGB/vec4(12.92);
        return mix(higher, lower, 1.0);
      }
    `,
          calcPoint: `
      vec2 function(float d, float angle) {
        return d * vec2(cos(angle), sin(angle)) + (u_dimensions * 0.5);
      }
    `
        });
        _defineProperty(LinearGradientEffect, "ColorLoop", amount => {
          var loop = '';
          for (var i = 2; i < amount; i++) {
            loop += `colorOut = mix(colorOut, colors[${i}], clamp((dist - stops[${i - 1}]) / (stops[${i}] - stops[${i - 1}]), 0.0, 1.0));`;
          }
          return loop;
        });
        _defineProperty(LinearGradientEffect, "onColorize", props => {
          var colors = props.colors.length || 1;
          return `
      float a = angle - (PI / 180.0 * 90.0);
      float lineDist = abs(u_dimensions.x * cos(a)) + abs(u_dimensions.y * sin(a));
      vec2 f = $calcPoint(lineDist * 0.5, a);
      vec2 t = $calcPoint(lineDist * 0.5, a + PI);
      vec2 gradVec = t - f;
      float dist = dot(v_textureCoordinate.xy * u_dimensions - f, gradVec) / dot(gradVec, gradVec);

      float stopCalc = (dist - stops[0]) / (stops[1] - stops[0]);
      vec4 colorOut = $fromLinear(mix($toLinear(colors[0]), $toLinear(colors[1]), stopCalc));
      ${_LinearGradientEffect.ColorLoop(colors)}
      return mix(maskColor, colorOut, clamp(colorOut.a, 0.0, 1.0));
    `;
        });
        class GrayscaleEffect extends ShaderEffect {
          constructor(...args) {
            super(...args);
            _defineProperty(this, "name", 'grayscale');
          }
          static getEffectKey() {
            return `grayscale`;
          }
          static resolveDefaults(props) {
            var _props$amount;
            return {
              amount: (_props$amount = props.amount) !== null && _props$amount !== void 0 ? _props$amount : 1
            };
          }
        }

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        /**
         * The BorderBottomEffect renders a border on the right side of an element
         */
        _defineProperty(GrayscaleEffect, "uniforms", {
          amount: {
            value: 1,
            method: 'uniform1f',
            type: 'float'
          }
        });
        _defineProperty(GrayscaleEffect, "onColorize", `
    float grayness = 0.2 * maskColor.r + 0.6 * maskColor.g + 0.2 * maskColor.b;
    return vec4(amount * vec3(grayness) + (1.0 - amount) * maskColor.rgb, maskColor.a);
  `);
        class BorderRightEffect extends ShaderEffect {
          constructor(...args) {
            super(...args);
            _defineProperty(this, "name", 'borderRight');
          }
          static getEffectKey() {
            return `borderRight`;
          }
          static resolveDefaults(props) {
            var _props$width4, _props$color3;
            return {
              width: (_props$width4 = props.width) !== null && _props$width4 !== void 0 ? _props$width4 : 10,
              color: (_props$color3 = props.color) !== null && _props$color3 !== void 0 ? _props$color3 : 0xffffffff
            };
          }
        }

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        /**
         * The BorderBottomEffect renders a border on the top side of an element
         */
        _defineProperty(BorderRightEffect, "z$__type__Props", void 0);
        _defineProperty(BorderRightEffect, "uniforms", {
          width: {
            value: 0,
            method: 'uniform1f',
            type: 'float'
          },
          color: {
            value: 0xffffffff,
            updateProgramValue: updateShaderEffectColor,
            method: 'uniform4fv',
            type: 'vec4'
          }
        });
        _defineProperty(BorderRightEffect, "methods", {
          fillMask: `
      float function(float dist) {
        return clamp(-dist, 0.0, 1.0);
      }
    `,
          rectDist: `
      float function(vec2 p, vec2 size) {
        vec2 d = abs(p) - size;
        return min(max(d.x, d.y), 0.0) + length(max(d, 0.0));
      }
    `
        });
        _defineProperty(BorderRightEffect, "onEffectMask", `
  vec2 pos = vec2(u_dimensions.x - width * 0.5, 0.0);
  float mask = $rectDist(v_textureCoordinate.xy * u_dimensions - pos, vec2(width*0.5, u_dimensions.y));
  return mix(shaderColor, maskColor, $fillMask(mask));
  `);
        _defineProperty(BorderRightEffect, "onColorize", `
    return color;
  `);
        class BorderTopEffect extends ShaderEffect {
          constructor(...args) {
            super(...args);
            _defineProperty(this, "name", 'borderTop');
          }
          static getEffectKey() {
            return `borderTop`;
          }
          static resolveDefaults(props) {
            var _props$width5, _props$color4;
            return {
              width: (_props$width5 = props.width) !== null && _props$width5 !== void 0 ? _props$width5 : 10,
              color: (_props$color4 = props.color) !== null && _props$color4 !== void 0 ? _props$color4 : 0xffffffff
            };
          }
        }

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        /**
         * The BorderBottomEffect renders a border on the bottom side of an element
         */
        _defineProperty(BorderTopEffect, "z$__type__Props", void 0);
        _defineProperty(BorderTopEffect, "uniforms", {
          width: {
            value: 0,
            method: 'uniform1f',
            type: 'float'
          },
          color: {
            value: 0xffffffff,
            updateProgramValue: updateShaderEffectColor,
            method: 'uniform4fv',
            type: 'vec4'
          }
        });
        _defineProperty(BorderTopEffect, "methods", {
          fillMask: `
      float function(float dist) {
        return clamp(-dist, 0.0, 1.0);
      }
    `,
          rectDist: `
      float function(vec2 p, vec2 size) {
        vec2 d = abs(p) - size;
        return min(max(d.x, d.y), 0.0) + length(max(d, 0.0));
      }
    `
        });
        _defineProperty(BorderTopEffect, "onEffectMask", `
  vec2 pos = vec2(0.0, width * 0.5);
  float mask = $rectDist(v_textureCoordinate.xy * u_dimensions - pos, vec2(u_dimensions.x, width*0.5));
  return mix(shaderColor, maskColor, $fillMask(mask));
  `);
        _defineProperty(BorderTopEffect, "onColorize", `
    return color;
  `);
        class BorderBottomEffect extends ShaderEffect {
          constructor(...args) {
            super(...args);
            _defineProperty(this, "name", 'borderBottom');
          }
          static getEffectKey() {
            return `borderBottom`;
          }
          static resolveDefaults(props) {
            var _props$width6, _props$color5;
            return {
              width: (_props$width6 = props.width) !== null && _props$width6 !== void 0 ? _props$width6 : 10,
              color: (_props$color5 = props.color) !== null && _props$color5 !== void 0 ? _props$color5 : 0xffffffff
            };
          }
        }

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        /**
         * The BorderBottomEffect renders a border on the left of an element
         */
        _defineProperty(BorderBottomEffect, "z$__type__Props", void 0);
        _defineProperty(BorderBottomEffect, "uniforms", {
          width: {
            value: 0,
            method: 'uniform1f',
            type: 'float'
          },
          color: {
            value: 0xffffffff,
            updateProgramValue: updateShaderEffectColor,
            method: 'uniform4fv',
            type: 'vec4'
          }
        });
        _defineProperty(BorderBottomEffect, "methods", {
          fillMask: `
      float function(float dist) {
        return clamp(-dist, 0.0, 1.0);
      }
    `,
          rectDist: `
      float function(vec2 p, vec2 size) {
        vec2 d = abs(p) - size;
        return min(max(d.x, d.y), 0.0) + length(max(d, 0.0));
      }
    `
        });
        _defineProperty(BorderBottomEffect, "onEffectMask", `
  vec2 pos = vec2(0.0, u_dimensions.y - width * 0.5);
  float mask = $rectDist(v_textureCoordinate.xy * u_dimensions - pos, vec2(u_dimensions.x, width*0.5));
  return mix(shaderColor, maskColor, $fillMask(mask));
  `);
        _defineProperty(BorderBottomEffect, "onColorize", `
    return color;
  `);
        class BorderLeftEffect extends ShaderEffect {
          constructor(...args) {
            super(...args);
            _defineProperty(this, "name", 'borderLeft');
          }
          static getEffectKey() {
            return `borderLeft`;
          }
          static resolveDefaults(props) {
            var _props$width7, _props$color6;
            return {
              width: (_props$width7 = props.width) !== null && _props$width7 !== void 0 ? _props$width7 : 10,
              color: (_props$color6 = props.color) !== null && _props$color6 !== void 0 ? _props$color6 : 0xffffffff
            };
          }
        }

        /**
         * Renders a Glitch effect using the incoming texture
         */
        _defineProperty(BorderLeftEffect, "z$__type__Props", void 0);
        _defineProperty(BorderLeftEffect, "uniforms", {
          width: {
            value: 0,
            method: 'uniform1f',
            type: 'float'
          },
          color: {
            value: 0xffffffff,
            updateProgramValue: updateShaderEffectColor,
            method: 'uniform4fv',
            type: 'vec4'
          }
        });
        _defineProperty(BorderLeftEffect, "methods", {
          fillMask: `
      float function(float dist) {
        return clamp(-dist, 0.0, 1.0);
      }
    `,
          rectDist: `
      float function(vec2 p, vec2 size) {
        vec2 d = abs(p) - size;
        return min(max(d.x, d.y), 0.0) + length(max(d, 0.0));
      }
    `
        });
        _defineProperty(BorderLeftEffect, "onEffectMask", `
  vec2 pos = vec2(width * 0.5, 0.0);
  float mask = $rectDist(v_textureCoordinate.xy * u_dimensions - pos, vec2(width*0.5, u_dimensions.y));
  return mix(shaderColor, maskColor, $fillMask(mask));
  `);
        _defineProperty(BorderLeftEffect, "onColorize", `
    return color;
  `);
        class GlitchEffect extends ShaderEffect {
          constructor(...args) {
            super(...args);
            _defineProperty(this, "name", 'glitch');
          }
          static getEffectKey(props) {
            return `glitch`;
          }
          static resolveDefaults(props) {
            var _props$amplitude, _props$narrowness, _props$blockiness, _props$minimizer, _props$time;
            return {
              amplitude: (_props$amplitude = props.amplitude) !== null && _props$amplitude !== void 0 ? _props$amplitude : 0.2,
              narrowness: (_props$narrowness = props.narrowness) !== null && _props$narrowness !== void 0 ? _props$narrowness : 4.0,
              blockiness: (_props$blockiness = props.blockiness) !== null && _props$blockiness !== void 0 ? _props$blockiness : 2.0,
              minimizer: (_props$minimizer = props.minimizer) !== null && _props$minimizer !== void 0 ? _props$minimizer : 8.0,
              time: (_props$time = props.time) !== null && _props$time !== void 0 ? _props$time : Date.now()
            };
          }
        }

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        _defineProperty(GlitchEffect, "z$__type__Props", void 0);
        _defineProperty(GlitchEffect, "uniforms", {
          amplitude: {
            value: 0,
            method: 'uniform1f',
            type: 'float'
          },
          narrowness: {
            value: 0,
            method: 'uniform1f',
            type: 'float'
          },
          blockiness: {
            value: 0,
            method: 'uniform1f',
            type: 'float'
          },
          minimizer: {
            value: 0,
            method: 'uniform1f',
            type: 'float'
          },
          time: {
            value: 0,
            method: 'uniform1f',
            updateOnBind: true,
            updateProgramValue: values => {
              var value = values.value = (Date.now() - values.value) % 1000;
              values.programValue = value;
            },
            type: 'float'
          }
        });
        _defineProperty(GlitchEffect, "methods", {
          rand: `
      float function(vec2 p, float time) {
        float t = floor(time * 20.) / 10.;
        return fract(sin(dot(p, vec2(t * 12.9898, t * 78.233))) * 43758.5453);
      }
    `,
          noise: `
      float function(vec2 uv, float blockiness, float time) {
        vec2 lv = fract(uv);
        vec2 id = floor(uv);

        float n1 = rand(id, time);
        float n2 = rand(id+vec2(1,0), time);
        float n3 = rand(id+vec2(0,1), time);
        float n4 = rand(id+vec2(1,1), time);
        vec2 u = smoothstep(0.0, 1.0 + blockiness, lv);
        return mix(mix(n1, n2, u.x), mix(n3, n4, u.x), u.y);
      }
    `,
          fbm: `
      float function(vec2 uv, int count, float blockiness, float complexity, float time) {
        float val = 0.0;
        float amp = 0.5;
        const int MAX_ITERATIONS = 10;

        for(int i = 0; i < MAX_ITERATIONS; i++) {
          if(i >= count) {break;}
          val += amp * noise(uv, blockiness, time);
          amp *= 0.5;
          uv *= complexity;
        }
        return val;
      }
    `
        });
        _defineProperty(GlitchEffect, "onColorize", `
    vec2 uv = v_textureCoordinate.xy;
    float aspect = u_dimensions.x / u_dimensions.y;
    vec2 a = vec2(uv.x * aspect , uv.y);
    vec2 uv2 = vec2(a.x / u_dimensions.x, exp(a.y));

    float shift = amplitude * pow($fbm(uv2, 4, blockiness, narrowness, time), minimizer);
    float colR = texture2D(u_texture, vec2(uv.x + shift, uv.y)).r * (1. - shift);
    float colG = texture2D(u_texture, vec2(uv.x - shift, uv.y)).g * (1. - shift);
    float colB = texture2D(u_texture, vec2(uv.x - shift, uv.y)).b * (1. - shift);

    vec3 f = vec3(colR, colG, colB);
    return vec4(f, texture2D(u_texture, vec2(uv.x - shift, uv.y)).a);
  `);
        class FadeOutEffect extends ShaderEffect {
          constructor(...args) {
            super(...args);
            _defineProperty(this, "name", 'fadeOut');
          }
          static getEffectKey() {
            return `fadeOut`;
          }
          static resolveDefaults(props) {
            var _props$fade;
            return {
              fade: (_props$fade = props.fade) !== null && _props$fade !== void 0 ? _props$fade : 10
            };
          }
        }

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        _defineProperty(FadeOutEffect, "z$__type__Props", void 0);
        _defineProperty(FadeOutEffect, "uniforms", {
          fade: {
            value: 0,
            method: 'uniform4fv',
            type: 'vec4',
            validator: validateArrayLength4,
            updateProgramValue: updateFloat32ArrayLength4
          }
        });
        _defineProperty(FadeOutEffect, "onColorize", `
  vec2 point = v_textureCoordinate.xy * u_dimensions.xy;
  vec2 pos1;
  vec2 pos2;
  vec2 d;
  float c;
  vec4 result = maskColor;


  if(fade[0] > 0.0) {
    pos1 = vec2(point.x, point.y);
    pos2 = vec2(point.x, point.y + fade[0]);
    d = pos2 - pos1;
    c = dot(pos1, d) / dot(d, d);
    result = mix(vec4(0.0), result, smoothstep(0.0, 1.0, clamp(c, 0.0, 1.0)));
  }

  if(fade[1] > 0.0) {
    pos1 = vec2(point.x - u_dimensions.x - fade[1], v_textureCoordinate.y);
    pos2 = vec2(point.x - u_dimensions.x, v_textureCoordinate.y);
    d = pos1 - pos2;
    c = dot(pos2, d) / dot(d, d);
    result = mix(vec4(0.0), result, smoothstep(0.0, 1.0, clamp(c, 0.0, 1.0)));
  }

  if(fade[2] > 0.0) {
    pos1 = vec2(v_textureCoordinate.x, point.y - u_dimensions.y - fade[2]);
    pos2 = vec2(v_textureCoordinate.x, point.y - u_dimensions.y);
    d = pos1 - pos2;
    c = dot(pos2, d) / dot(d, d);
    result = mix(vec4(0.0), result, smoothstep(0.0, 1.0, clamp(c, 0.0, 1.0)));
  }

  if(fade[3] > 0.0) {
    pos1 = vec2(point.x, point.y);
    pos2 = vec2(point.x + fade[3], point.y);
    d = pos2 - pos1;
    c = dot(pos1, d) / dot(d, d);
    result = mix(vec4(0.0), result, smoothstep(0.0, 1.0, clamp(c, 0.0, 1.0)));
  }

  return result;
  `);
        class RadialGradientEffect extends ShaderEffect {
          constructor(...args) {
            super(...args);
            _defineProperty(this, "name", 'radialGradient');
          }
          static getEffectKey(props) {
            return `radialGradient${props.colors.length}`;
          }
          static resolveDefaults(props) {
            var _props$colors2, _props$width8, _ref5, _props$height3, _props$pivot;
            var colors = (_props$colors2 = props.colors) !== null && _props$colors2 !== void 0 ? _props$colors2 : [0xff000000, 0xffffffff];
            var stops = props.stops || [];
            if (stops.length === 0 || stops.length !== colors.length) {
              var colorsL = colors.length;
              var i = 0;
              var tmp = stops;
              for (; i < colorsL; i++) {
                if (stops[i]) {
                  tmp[i] = stops[i];
                  if (stops[i - 1] === undefined && tmp[i - 2] !== undefined) {
                    tmp[i - 1] = tmp[i - 2] + (stops[i] - tmp[i - 2]) / 2;
                  }
                } else {
                  tmp[i] = i * (1 / (colors.length - 1));
                }
              }
              stops = tmp;
            }
            return {
              colors,
              stops,
              width: (_props$width8 = props.width) !== null && _props$width8 !== void 0 ? _props$width8 : 0,
              height: (_ref5 = (_props$height3 = props.height) !== null && _props$height3 !== void 0 ? _props$height3 : props.width) !== null && _ref5 !== void 0 ? _ref5 : 0,
              pivot: (_props$pivot = props.pivot) !== null && _props$pivot !== void 0 ? _props$pivot : [0.5, 0.5]
            };
          }
        }

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        /**
         * The RadialProgressEffect renders a border along all edges of an element
         */
        _RadialGradientEffect = RadialGradientEffect;
        _defineProperty(RadialGradientEffect, "z$__type__Props", void 0);
        _defineProperty(RadialGradientEffect, "uniforms", {
          width: {
            value: 0,
            method: 'uniform1f',
            type: 'float'
          },
          height: {
            value: 0,
            method: 'uniform1f',
            type: 'float'
          },
          pivot: {
            value: [0.5, 0.5],
            updateProgramValue: updateFloat32ArrayLength2,
            method: 'uniform2fv',
            type: 'vec2'
          },
          colors: {
            value: 0xffffffff,
            validator: rgbas => {
              return rgbas.reduce((acc, val) => acc.concat(getNormalizedRgbaComponents(val)), []);
            },
            updateProgramValue: updateFloat32ArrayLengthN,
            size: props => props.colors.length,
            method: 'uniform4fv',
            type: 'vec4'
          },
          stops: {
            value: [],
            size: props => props.colors.length,
            method: 'uniform1fv',
            type: 'float'
          }
        });
        _defineProperty(RadialGradientEffect, "ColorLoop", amount => {
          var loop = '';
          for (var i = 2; i < amount; i++) {
            loop += `colorOut = mix(colorOut, colors[${i}], clamp((dist - stops[${i - 1}]) / (stops[${i}] - stops[${i - 1}]), 0.0, 1.0));`;
          }
          return loop;
        });
        _defineProperty(RadialGradientEffect, "onColorize", props => {
          var colors = props.colors.length || 1;
          return `
      vec2 point = v_textureCoordinate.xy * u_dimensions;
      vec2 projection = vec2(pivot.x * u_dimensions.x, pivot.y * u_dimensions.y);

      float dist = length((point - projection) / vec2(width, height));

      float stopCalc = (dist - stops[0]) / (stops[1] - stops[0]);
      vec4 colorOut = mix(colors[0], colors[1], stopCalc);
      ${_RadialGradientEffect.ColorLoop(colors)}
      return mix(maskColor, colorOut, clamp(colorOut.a, 0.0, 1.0));
    `;
        });
        class RadialProgressEffect extends ShaderEffect {
          constructor(...args) {
            super(...args);
            _defineProperty(this, "name", 'radialProgress');
          }
          static getEffectKey() {
            return `radialProgress`;
          }
          static resolveDefaults(props) {
            var _props$width9, _props$progress, _props$offset, _props$range, _props$rounded, _props$radius2, _props$color7;
            return {
              width: (_props$width9 = props.width) !== null && _props$width9 !== void 0 ? _props$width9 : 10,
              progress: (_props$progress = props.progress) !== null && _props$progress !== void 0 ? _props$progress : 0.5,
              offset: (_props$offset = props.offset) !== null && _props$offset !== void 0 ? _props$offset : 0,
              range: (_props$range = props.range) !== null && _props$range !== void 0 ? _props$range : Math.PI * 2,
              rounded: (_props$rounded = props.rounded) !== null && _props$rounded !== void 0 ? _props$rounded : false,
              radius: (_props$radius2 = props.radius) !== null && _props$radius2 !== void 0 ? _props$radius2 : 1,
              color: (_props$color7 = props.color) !== null && _props$color7 !== void 0 ? _props$color7 : 0xffffffff
            };
          }
        }

        /**
         * Masks the current maskcolor a holepunch effect with rounded corners similar to {@link RoundedRectangle}
         */
        _defineProperty(RadialProgressEffect, "z$__type__Props", void 0);
        _defineProperty(RadialProgressEffect, "uniforms", {
          width: {
            value: 0,
            method: 'uniform1f',
            type: 'float'
          },
          progress: {
            value: 0.5,
            method: 'uniform1f',
            type: 'float'
          },
          offset: {
            value: 0,
            method: 'uniform1f',
            type: 'float'
          },
          range: {
            value: 0,
            method: 'uniform1f',
            type: 'float'
          },
          rounded: {
            value: 0,
            method: 'uniform1f',
            type: 'float',
            validator: value => {
              return value ? 1 : 0;
            }
          },
          radius: {
            value: 1,
            method: 'uniform1f',
            type: 'float'
          },
          color: {
            value: 0xffffffff,
            updateProgramValue: updateShaderEffectColor,
            method: 'uniform4fv',
            type: 'vec4'
          }
        });
        _defineProperty(RadialProgressEffect, "methods", {
          rotateUV: `
    vec2 function(vec2 uv, float d) {
      float s = sin(d);
      float c = cos(d);
      mat2 rotMatrix = mat2(c, -s, s, c);
      return uv * rotMatrix;
    }
    `,
          drawDot: `
    float function(vec2 uv, vec2 p, float r) {
      uv += p;
      float circle = length(uv) - r;
      return clamp(-circle, 0.0, 1.0);
    }
    `
        });
        _defineProperty(RadialProgressEffect, "onEffectMask", `
    float outerRadius = radius * u_dimensions.y * 0.5;

    float endAngle = range * progress - 0.0005;

    vec2 uv = v_textureCoordinate.xy * u_dimensions.xy - u_dimensions * 0.5;

    uv = $rotateUV(uv, -(offset));
    float linewidth = width * u_pixelRatio;
    float circle = length(uv) - (outerRadius - linewidth) ;
    circle = abs(circle) - linewidth;
    circle = clamp(-circle, 0.0, 1.0);

    float angle = (atan(uv.x, -uv.y) / 3.14159265359 * 0.5);
    float p = endAngle / (PI * 2.);

    circle *= step(fract(angle), fract(p));

    circle = rounded < 1. ? circle : max(circle, $drawDot(uv, vec2(0, outerRadius - linewidth), linewidth));
    circle = rounded < 1. ? circle : max(circle, $drawDot($rotateUV(uv, -(endAngle)), vec2(0, outerRadius - linewidth), linewidth));

    return mix(shaderColor, maskColor, circle);
  `);
        _defineProperty(RadialProgressEffect, "onColorize", `
    return color;
  `);
        class HolePunchEffect extends ShaderEffect {
          constructor(...args) {
            super(...args);
            _defineProperty(this, "name", 'holePunch');
          }
          static getEffectKey() {
            return `holePunch`;
          }
          static resolveDefaults(props) {
            var _props$radius3;
            return {
              x: props.x || 0,
              y: props.y || 0,
              width: props.width || 50,
              height: props.height || 50,
              radius: (_props$radius3 = props.radius) !== null && _props$radius3 !== void 0 ? _props$radius3 : 0
            };
          }
        }

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        _defineProperty(HolePunchEffect, "z$__type__Props", void 0);
        _defineProperty(HolePunchEffect, "uniforms", {
          x: {
            value: 0,
            method: 'uniform1f',
            type: 'float'
          },
          y: {
            value: 0,
            method: 'uniform1f',
            type: 'float'
          },
          width: {
            value: 0,
            method: 'uniform1f',
            type: 'float'
          },
          height: {
            value: 0,
            method: 'uniform1f',
            type: 'float'
          },
          radius: {
            value: 0,
            method: 'uniform4fv',
            type: 'vec4',
            updateOnBind: true,
            validator: validateArrayLength4,
            updateProgramValue: updateWebSafeRadius
          }
        });
        _defineProperty(HolePunchEffect, "methods", {
          fillMask: `
      float function(float dist) {
        return clamp(-dist, 0.0, 1.0);
      }
    `,
          boxDist: `
      float function(vec2 p, vec2 size, float radius) {
        size -= vec2(radius);
        vec2 d = abs(p) - size;
        return min(max(d.x, d.y), 0.0) + length(max(d, 0.0)) - radius;
      }
    `
        });
        _defineProperty(HolePunchEffect, "onShaderMask", `
  vec2 halfDimensions = u_dimensions * 0.5;
  vec2 size = vec2(width, height) * 0.5;
  vec2 basePos = v_textureCoordinate.xy * u_dimensions.xy - vec2(x, y);
  vec2 pos = basePos - size;
  float r = radius[0] * step(pos.x, 0.5) * step(pos.y, 0.5);
  r = r + radius[1] * step(0.5, pos.x) * step(pos.y, 0.5);
  r = r + radius[2] * step(0.5, pos.x) * step(0.5, pos.y);
  r = r + radius[3] * step(pos.x, 0.5) * step(0.5, pos.y);
  return $boxDist(pos, size, r);
  `);
        _defineProperty(HolePunchEffect, "onEffectMask", `
  return mix(maskColor, vec4(0.0), $fillMask(shaderMask));
  `);
        var ROUNDED_RECTANGLE_SHADER_TYPE = 'RoundedRectangle';
        class UnsupportedShader extends CoreShader {
          constructor(shType) {
            super();
            _defineProperty(this, "shType", void 0);
            this.shType = shType;
            if (shType !== ROUNDED_RECTANGLE_SHADER_TYPE) {
              console.warn('Unsupported shader:', shType);
            }
          }
          bindRenderOp() {
            // noop
          }
          bindProps() {
            // noop
          }
          attach() {
            // noop
          }
          detach() {
            // noop
          }
        }

        /**
         * Shader Controller Class
         *
         * @remarks
         * This class is used to control shader props.
         */
        class ShaderController {
          constructor(type, shader, props, stage) {
            var _this6 = this;
            _defineProperty(this, "type", void 0);
            _defineProperty(this, "shader", void 0);
            _defineProperty(this, "resolvedProps", void 0);
            _defineProperty(this, "props", void 0);
            this.type = type;
            this.shader = shader;
            this.resolvedProps = props;
            var keys = Object.keys(props);
            var l = keys.length;
            var definedProps = {};
            var _loop = function _loop() {
              var name = keys[i];
              Object.defineProperty(definedProps, name, {
                get: () => {
                  return _this6.resolvedProps[name];
                },
                set: value => {
                  _this6.resolvedProps[name] = value;
                  stage.requestRender();
                }
              });
            };
            for (var i = 0; i < l; i++) {
              _loop();
            }
            this.props = definedProps;
          }
          getResolvedProps() {
            return this.resolvedProps;
          }
        }
        class DynamicShaderController {
          constructor(shader, props, shManager) {
            var _this7 = this;
            _defineProperty(this, "shader", void 0);
            _defineProperty(this, "resolvedProps", void 0);
            _defineProperty(this, "props", void 0);
            _defineProperty(this, "type", void 0);
            this.shader = shader;
            this.type = 'DynamicShader';
            this.resolvedProps = props;
            var effectConstructors = shManager.getRegisteredEffects();
            var definedProps = {};
            var effects = props.effects;
            var effectsLength = effects.length;
            var _loop2 = function _loop2(i) {
              var _effects$i2 = effects[i],
                effectName = _effects$i2.name,
                effectProps = _effects$i2.props,
                effectType = _effects$i2.type;
              if (effectName === undefined) {
                return 1; // continue
              }
              var definedEffectProps = {};
              var propEntries = Object.keys(effectProps);
              var propEntriesLength = propEntries.length;
              var _loop3 = function _loop3() {
                var propName = propEntries[j];
                Object.defineProperty(definedEffectProps, propName, {
                  get: () => {
                    return _this7.resolvedProps.effects[i].props[propName].value;
                  },
                  set: value => {
                    var target = _this7.resolvedProps.effects[i].props[propName];
                    target.value = value;
                    if (target.hasValidator) {
                      var _effectConstructors$e;
                      value = target.validatedValue = (_effectConstructors$e = effectConstructors[effectType].uniforms[propName]) === null || _effectConstructors$e === void 0 ? void 0 : _effectConstructors$e.validator(value, effectProps);
                    }
                    if (target.hasProgramValueUpdater) {
                      var _effectConstructors$e2;
                      (_effectConstructors$e2 = effectConstructors[effectType].uniforms[propName]) === null || _effectConstructors$e2 === void 0 || _effectConstructors$e2.updateProgramValue(target);
                    } else {
                      target.programValue = value;
                    }
                    shManager.renderer.stage.requestRender();
                  }
                });
              };
              for (var j = 0; j < propEntriesLength; j++) {
                _loop3();
              }
              Object.defineProperty(definedProps, effectName, {
                get: () => {
                  return definedEffectProps;
                }
              });
            };
            for (var i = 0; i < effectsLength; i++) {
              if (_loop2(i)) continue;
            }
            this.props = definedProps;
          }
          getResolvedProps() {
            return this.resolvedProps;
          }
        }
        class CoreShaderManager {
          constructor() {
            _defineProperty(this, "shCache", new Map());
            _defineProperty(this, "shConstructors", {});
            _defineProperty(this, "attachedShader", null);
            _defineProperty(this, "effectConstructors", {});
            _defineProperty(this, "renderer", void 0);
            this.registerShaderType('DefaultShader', DefaultShader);
            this.registerShaderType('DefaultShaderBatched', DefaultShaderBatched);
            this.registerShaderType('RoundedRectangle', RoundedRectangle);
            this.registerShaderType('DynamicShader', DynamicShader);
            this.registerShaderType('SdfShader', SdfShader);
            this.registerEffectType('border', BorderEffect);
            this.registerEffectType('borderBottom', BorderBottomEffect);
            this.registerEffectType('borderLeft', BorderLeftEffect);
            this.registerEffectType('borderRight', BorderRightEffect);
            this.registerEffectType('borderTop', BorderTopEffect);
            this.registerEffectType('fadeOut', FadeOutEffect);
            this.registerEffectType('linearGradient', LinearGradientEffect);
            this.registerEffectType('radialGradient', RadialGradientEffect);
            this.registerEffectType('grayscale', GrayscaleEffect);
            this.registerEffectType('glitch', GlitchEffect);
            this.registerEffectType('radius', RadiusEffect);
            this.registerEffectType('radialProgress', RadialProgressEffect);
            this.registerEffectType('holePunch', HolePunchEffect);
          }
          registerShaderType(shType, shClass) {
            this.shConstructors[shType] = shClass;
          }
          registerEffectType(effectType, effectClass) {
            this.effectConstructors[effectType] = effectClass;
          }
          getRegisteredEffects() {
            return this.effectConstructors;
          }
          getRegisteredShaders() {
            return this.shConstructors;
          }
          /**
           * Loads a shader (if not already loaded) and returns a controller for it.
           *
           * @param shType
           * @param props
           * @returns
           */
          loadShader(shType, props) {
            if (!this.renderer) {
              throw new Error(`Renderer is not been defined`);
            }
            var ShaderClass = this.shConstructors[shType];
            if (!ShaderClass) {
              throw new Error(`Shader type "${shType}" is not registered`);
            }
            if (this.renderer.mode === 'canvas' && ShaderClass.prototype instanceof WebGlCoreShader) {
              return this._createShaderCtr(shType, new UnsupportedShader(shType), props);
            }
            if (shType === 'DynamicShader') {
              return this.loadDynamicShader(props);
            }
            var resolvedProps = ShaderClass.resolveDefaults(props);
            var cacheKey = ShaderClass.makeCacheKey(resolvedProps) || ShaderClass.name;
            if (cacheKey && this.shCache.has(cacheKey)) {
              return this._createShaderCtr(shType, this.shCache.get(cacheKey), resolvedProps);
            }
            // @ts-expect-error ShaderClass WILL accept a Renderer
            var shader = new ShaderClass(this.renderer, props);
            if (cacheKey) {
              this.shCache.set(cacheKey, shader);
            }
            return this._createShaderCtr(shType, shader, resolvedProps);
          }
          loadDynamicShader(props) {
            if (!this.renderer) {
              throw new Error(`Renderer is not been defined`);
            }
            var resolvedProps = DynamicShader.resolveDefaults(props, this.effectConstructors);
            var cacheKey = DynamicShader.makeCacheKey(resolvedProps, this.effectConstructors);
            if (cacheKey && this.shCache.has(cacheKey)) {
              return this._createDynShaderCtr(this.shCache.get(cacheKey), resolvedProps);
            }
            var shader = new DynamicShader(this.renderer, props, this.effectConstructors);
            if (cacheKey) {
              this.shCache.set(cacheKey, shader);
            }
            return this._createDynShaderCtr(shader, resolvedProps);
          }
          _createShaderCtr(type, shader, props) {
            return new ShaderController(type, shader, props, this.renderer.stage);
          }
          _createDynShaderCtr(shader, props) {
            return new DynamicShaderController(shader, props, this);
          }
          useShader(shader) {
            if (this.attachedShader === shader) {
              return;
            }
            if (this.attachedShader) {
              this.attachedShader.detach();
            }
            shader.attach();
            this.attachedShader = shader;
          }
        }

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        var trPropSetterDefaults = {
          x: (state, value) => {
            state.props.x = value;
          },
          y: (state, value) => {
            state.props.y = value;
          },
          width: (state, value) => {
            state.props.width = value;
          },
          height: (state, value) => {
            state.props.height = value;
          },
          color: (state, value) => {
            state.props.color = value;
          },
          zIndex: (state, value) => {
            state.props.zIndex = value;
          },
          fontFamily: (state, value) => {
            state.props.fontFamily = value;
          },
          fontWeight: (state, value) => {
            state.props.fontWeight = value;
          },
          fontStyle: (state, value) => {
            state.props.fontStyle = value;
          },
          fontStretch: (state, value) => {
            state.props.fontStretch = value;
          },
          fontSize: (state, value) => {
            state.props.fontSize = value;
          },
          text: (state, value) => {
            state.props.text = value;
          },
          textAlign: (state, value) => {
            state.props.textAlign = value;
          },
          contain: (state, value) => {
            state.props.contain = value;
          },
          offsetY: (state, value) => {
            state.props.offsetY = value;
          },
          scrollable: (state, value) => {
            state.props.scrollable = value;
          },
          scrollY: (state, value) => {
            state.props.scrollY = value;
          },
          letterSpacing: (state, value) => {
            state.props.letterSpacing = value;
          },
          lineHeight: (state, value) => {
            state.props.lineHeight = value;
          },
          maxLines: (state, value) => {
            state.props.maxLines = value;
          },
          textBaseline: (state, value) => {
            state.props.textBaseline = value;
          },
          verticalAlign: (state, value) => {
            state.props.verticalAlign = value;
          },
          overflowSuffix: (state, value) => {
            state.props.overflowSuffix = value;
          },
          debug: (state, value) => {
            state.props.debug = value;
          }
        };
        class TextRenderer {
          constructor(stage) {
            _defineProperty(this, "stage", void 0);
            _defineProperty(this, "set", void 0);
            this.stage = stage;
            var propSetters = _objectSpread(_objectSpread({}, trPropSetterDefaults), this.getPropertySetters());
            // For each prop setter add a wrapper method that checks if the prop is
            // different before calling the setter
            this.set = Object.freeze(Object.fromEntries(Object.entries(propSetters).map(([key, setter]) => {
              return [key, (state, value) => {
                if (state.props[key] !== value) {
                  setter(state, value);
                  // Assume any prop change will require a render
                  // This is required because otherwise a paused RAF will result
                  // in renders when text props are changed.
                  this.stage.requestRender();
                }
              }];
            })));
          }
          setStatus(state, status, error) {
            // Don't emit the same status twice
            if (state.status === status) {
              return;
            }
            state.status = status;
            state.emitter.emit(status, error);
          }
          /**
           * Allows the CoreTextNode to communicate changes to the isRenderable state of
           * the itself.
           *
           * @param state
           * @param renderable
           */
          setIsRenderable(state, renderable) {
            state.isRenderable = renderable;
          }
          /**
           * Destroy/Clean up the state object
           *
           * @remarks
           * Opposite of createState(). Frees any event listeners / resources held by
           * the state that may not reliably get garbage collected.
           *
           * @param state
           */
          destroyState(state) {
            this.setStatus(state, 'destroyed');
            state.emitter.removeAllListeners();
          }
          /**
           * Schedule a state update via queueMicrotask
           *
           * @remarks
           * This method is used to schedule a state update via queueMicrotask. This
           * method should be called whenever a state update is needed, and it will
           * ensure that the state is only updated once per microtask.
           * @param state
           * @returns
           */
          scheduleUpdateState(state) {
            if (state.updateScheduled) {
              return;
            }
            state.updateScheduled = true;
            queueMicrotask(() => {
              // If the state has been destroyed, don't update it
              if (state.status === 'destroyed') {
                return;
              }
              state.updateScheduled = false;
              this.updateState(state);
            });
          }
        }

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        /**
         * Class that keeps track of the invocations of Context methods when
         * the `enableContextSpy` renderer option is enabled.
         */
        class ContextSpy {
          constructor() {
            _defineProperty(this, "data", {});
          }
          reset() {
            this.data = {};
          }
          increment(name) {
            if (!this.data[name]) {
              this.data[name] = 0;
            }
            this.data[name]++;
          }
          getData() {
            return _objectSpread({}, this.data);
          }
        }

        /**
         * LRU (Least Recently Used) style memory manager for textures
         *
         * @remarks
         * This class is responsible for managing the memory usage of textures
         * in the Renderer. It keeps track of the memory used by each texture
         * and triggers a cleanup when the memory usage exceeds a critical
         * threshold (`criticalThreshold`).
         *
         * The cleanup process will free up non-renderable textures until the
         * memory usage is below a target threshold (`targetThresholdLevel`).
         *
         * The memory manager's clean up process will also be triggered when the
         * scene is idle for a certain amount of time (`cleanupInterval`).
         */
        class TextureMemoryManager {
          constructor(stage, settings) {
            _defineProperty(this, "stage", void 0);
            _defineProperty(this, "memUsed", 0);
            _defineProperty(this, "loadedTextures", new Map());
            _defineProperty(this, "criticalThreshold", void 0);
            _defineProperty(this, "targetThreshold", void 0);
            _defineProperty(this, "cleanupInterval", void 0);
            _defineProperty(this, "debugLogging", void 0);
            _defineProperty(this, "lastCleanupTime", 0);
            _defineProperty(this, "criticalCleanupRequested", false);
            /**
             * The current frame time in milliseconds
             *
             * @remarks
             * This is used to determine when to perform Idle Texture Cleanups.
             *
             * Set by stage via `updateFrameTime` method.
             */
            _defineProperty(this, "frameTime", 0);
            this.stage = stage;
            var criticalThreshold = settings.criticalThreshold;
            this.criticalThreshold = Math.round(criticalThreshold);
            var targetFraction = Math.max(0, Math.min(1, settings.targetThresholdLevel));
            this.targetThreshold = Math.round(criticalThreshold * targetFraction);
            this.cleanupInterval = settings.cleanupInterval;
            this.debugLogging = settings.debugLogging;
            if (settings.debugLogging) {
              var lastMemUse = 0;
              setInterval(() => {
                if (lastMemUse !== this.memUsed) {
                  lastMemUse = this.memUsed;
                  console.log(`[TextureMemoryManager] Memory used: ${bytesToMb$1(this.memUsed)} mb / ${bytesToMb$1(this.criticalThreshold)} mb (${(this.memUsed / this.criticalThreshold * 100).toFixed(1)}%)`);
                }
              }, 1000);
            }
            // If the threshold is 0, we disable the memory manager by replacing the
            // setTextureMemUse method with a no-op function.
            if (criticalThreshold === 0) {
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              this.setTextureMemUse = () => {};
            }
          }
          setTextureMemUse(texture, byteSize) {
            if (this.loadedTextures.has(texture)) {
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              this.memUsed -= this.loadedTextures.get(texture);
            }
            if (byteSize === 0) {
              this.loadedTextures.delete(texture);
              return;
            } else {
              this.memUsed += byteSize;
              this.loadedTextures.set(texture, byteSize);
            }
            if (this.memUsed > this.criticalThreshold) {
              this.criticalCleanupRequested = true;
            }
          }
          checkCleanup() {
            return this.criticalCleanupRequested || this.memUsed > this.targetThreshold && this.frameTime - this.lastCleanupTime >= this.cleanupInterval;
          }
          cleanup() {
            var critical = this.criticalCleanupRequested;
            this.lastCleanupTime = this.frameTime;
            this.criticalCleanupRequested = false;
            if (critical) {
              this.stage.queueFrameEvent('criticalCleanup', {
                memUsed: this.memUsed,
                criticalThreshold: this.criticalThreshold
              });
            }
            if (this.debugLogging) {
              console.log(`[TextureMemoryManager] Cleaning up textures. Critical: ${critical}`);
            }
            /**
             * Sort the loaded textures by renderability, then by last touch time.
             *
             * This will ensure that the array is ordered by the following:
             * - Non-renderable textures, starting at the least recently rendered
             * - Renderable textures, starting at the least recently rendered
             */
            var textures = [...this.loadedTextures.keys()].sort((textureA, textureB) => {
              var txARenderable = textureA.renderable;
              var txBRenderable = textureB.renderable;
              if (txARenderable === txBRenderable) {
                return textureA.lastRenderableChangeTime - textureB.lastRenderableChangeTime;
              } else if (txARenderable) {
                return 1;
              } else if (txBRenderable) {
                return -1;
              }
              return 0;
            });
            // Free non-renderable textures until we reach the target threshold
            var memTarget = this.targetThreshold;
            var txManager = this.stage.txManager;
            var _iterator6 = _createForOfIteratorHelper(textures),
              _step6;
            try {
              for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
                var texture = _step6.value;
                if (texture.renderable) {
                  // Stop at the first renderable texture (The rest are renderable because of the sort above)
                  // We don't want to free renderable textures because they will just likely be reloaded in the next frame
                  break;
                }
                if (texture.preventCleanup === false) {
                  texture.ctxTexture.free();
                  txManager.removeTextureFromCache(texture);
                }
                if (this.memUsed <= memTarget) {
                  // Stop once we've freed enough textures to reach under the target threshold
                  break;
                }
              }
            } catch (err) {
              _iterator6.e(err);
            } finally {
              _iterator6.f();
            }
            if (this.memUsed >= this.criticalThreshold) {
              this.stage.queueFrameEvent('criticalCleanupFailed', {
                memUsed: this.memUsed,
                criticalThreshold: this.criticalThreshold
              });
              console.warn(`[TextureMemoryManager] Memory usage above critical threshold after cleanup: ${this.memUsed}`);
            }
          }
          /**
           * Get the current texture memory usage information
           *
           * @remarks
           * This method is for debugging purposes and returns information about the
           * current memory usage of the textures in the Renderer.
           */
          getMemoryInfo() {
            var renderableTexturesLoaded = 0;
            var renderableMemUsed = [...this.loadedTextures.keys()].reduce(
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            (acc, texture) => {
              renderableTexturesLoaded += texture.renderable ? 1 : 0;
              return acc + (texture.renderable ? this.loadedTextures.get(texture) : 0);
            }, 0);
            return {
              criticalThreshold: this.criticalThreshold,
              targetThreshold: this.targetThreshold,
              renderableMemUsed,
              memUsed: this.memUsed,
              renderableTexturesLoaded,
              loadedTextures: this.loadedTextures.size
            };
          }
        }

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        class CoreContextTexture {
          constructor(memManager, textureSource) {
            _defineProperty(this, "textureSource", void 0);
            _defineProperty(this, "memManager", void 0);
            this.memManager = memManager;
            this.textureSource = textureSource;
          }
          setTextureMemUse(byteSize) {
            this.memManager.setTextureMemUse(this.textureSource, byteSize);
          }
          get renderable() {
            return this.textureSource.renderable;
          }
        }

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        class CoreRenderer {
          constructor(options) {
            _defineProperty(this, "options", void 0);
            _defineProperty(this, "mode", void 0);
            _defineProperty(this, "stage", void 0);
            //// Core Managers
            _defineProperty(this, "txManager", void 0);
            _defineProperty(this, "txMemManager", void 0);
            _defineProperty(this, "shManager", void 0);
            _defineProperty(this, "rttNodes", []);
            this.options = options;
            this.stage = options.stage;
            this.txManager = options.txManager;
            this.txMemManager = options.txMemManager;
            this.shManager = options.shManager;
          }
        }

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        /**
         * An CoreNode in the Renderer scene graph that renders text.
         *
         * @remarks
         * A Text Node is the second graphical building block of the Renderer scene
         * graph. It renders text using a specific text renderer that is automatically
         * chosen based on the font requested and what type of fonts are installed
         * into an app.
         *
         * The text renderer can be overridden by setting the `textRendererOverride`
         *
         * The `texture` and `shader` properties are managed by loaded text renderer and
         * should not be set directly.
         *
         * For non-text rendering, see {@link CoreNode}.
         */
        class CoreTextNode extends CoreNode {
          constructor(stage, props, textRenderer) {
            super(stage, props);
            _defineProperty(this, "textRenderer", void 0);
            _defineProperty(this, "trState", void 0);
            _defineProperty(this, "_textRendererOverride", null);
            _defineProperty(this, "onTextLoaded", () => {
              var contain = this.contain;
              var setWidth = this.trState.props.width;
              var setHeight = this.trState.props.height;
              var calcWidth = this.trState.textW || 0;
              var calcHeight = this.trState.textH || 0;
              if (contain === 'both') {
                this.props.width = setWidth;
                this.props.height = setHeight;
              } else if (contain === 'width') {
                this.props.width = setWidth;
                this.props.height = calcHeight;
              } else if (contain === 'none') {
                this.props.width = calcWidth;
                this.props.height = calcHeight;
              }
              this.updateLocalTransform();
              // Incase the RAF loop has been stopped already before text was loaded,
              // we request a render so it can be drawn.
              this.stage.requestRender();
              this.emit('loaded', {
                type: 'text',
                dimensions: {
                  width: this.trState.textW || 0,
                  height: this.trState.textH || 0
                }
              });
            });
            _defineProperty(this, "onTextFailed", (target, error) => {
              this.emit('failed', {
                type: 'text',
                error
              });
            });
            this._textRendererOverride = props.textRendererOverride;
            this.textRenderer = textRenderer;
            var textRendererState = this.createState({
              x: this.absX,
              y: this.absY,
              width: props.width,
              height: props.height,
              textAlign: props.textAlign,
              color: props.color,
              zIndex: props.zIndex,
              contain: props.contain,
              scrollable: props.scrollable,
              scrollY: props.scrollY,
              offsetY: props.offsetY,
              letterSpacing: props.letterSpacing,
              debug: props.debug,
              fontFamily: props.fontFamily,
              fontSize: props.fontSize,
              fontStretch: props.fontStretch,
              fontStyle: props.fontStyle,
              fontWeight: props.fontWeight,
              text: props.text,
              lineHeight: props.lineHeight,
              maxLines: props.maxLines,
              textBaseline: props.textBaseline,
              verticalAlign: props.verticalAlign,
              overflowSuffix: props.overflowSuffix
            });
            this.trState = textRendererState;
          }
          get width() {
            return this.props.width;
          }
          set width(value) {
            this.props.width = value;
            this.textRenderer.set.width(this.trState, value);
            // If not containing, we must update the local transform to account for the
            // new width
            if (this.contain === 'none') {
              this.setUpdateType(UpdateType.Local);
            }
          }
          get height() {
            return this.props.height;
          }
          set height(value) {
            this.props.height = value;
            this.textRenderer.set.height(this.trState, value);
            // If not containing in the horizontal direction, we must update the local
            // transform to account for the new height
            if (this.contain !== 'both') {
              this.setUpdateType(UpdateType.Local);
            }
          }
          get color() {
            return this.trState.props.color;
          }
          set color(value) {
            this.textRenderer.set.color(this.trState, value);
          }
          get text() {
            return this.trState.props.text;
          }
          set text(value) {
            this.textRenderer.set.text(this.trState, value);
          }
          get textRendererOverride() {
            return this._textRendererOverride;
          }
          set textRendererOverride(value) {
            this._textRendererOverride = value;
            this.textRenderer.destroyState(this.trState);
            var textRenderer = this.stage.resolveTextRenderer(this.trState.props, this._textRendererOverride);
            if (!textRenderer) {
              console.warn('Text Renderer not found for font', this.trState.props.fontFamily);
              return;
            }
            this.textRenderer = textRenderer;
            this.trState = this.createState(this.trState.props);
          }
          get fontSize() {
            return this.trState.props.fontSize;
          }
          set fontSize(value) {
            this.textRenderer.set.fontSize(this.trState, value);
          }
          get fontFamily() {
            return this.trState.props.fontFamily;
          }
          set fontFamily(value) {
            this.textRenderer.set.fontFamily(this.trState, value);
          }
          get fontStretch() {
            return this.trState.props.fontStretch;
          }
          set fontStretch(value) {
            this.textRenderer.set.fontStretch(this.trState, value);
          }
          get fontStyle() {
            return this.trState.props.fontStyle;
          }
          set fontStyle(value) {
            this.textRenderer.set.fontStyle(this.trState, value);
          }
          get fontWeight() {
            return this.trState.props.fontWeight;
          }
          set fontWeight(value) {
            this.textRenderer.set.fontWeight(this.trState, value);
          }
          get textAlign() {
            return this.trState.props.textAlign;
          }
          set textAlign(value) {
            this.textRenderer.set.textAlign(this.trState, value);
          }
          get contain() {
            return this.trState.props.contain;
          }
          set contain(value) {
            this.textRenderer.set.contain(this.trState, value);
          }
          get scrollable() {
            return this.trState.props.scrollable;
          }
          set scrollable(value) {
            this.textRenderer.set.scrollable(this.trState, value);
          }
          get scrollY() {
            return this.trState.props.scrollY;
          }
          set scrollY(value) {
            this.textRenderer.set.scrollY(this.trState, value);
          }
          get offsetY() {
            return this.trState.props.offsetY;
          }
          set offsetY(value) {
            this.textRenderer.set.offsetY(this.trState, value);
          }
          get letterSpacing() {
            return this.trState.props.letterSpacing;
          }
          set letterSpacing(value) {
            this.textRenderer.set.letterSpacing(this.trState, value);
          }
          get lineHeight() {
            return this.trState.props.lineHeight;
          }
          set lineHeight(value) {
            this.textRenderer.set.lineHeight(this.trState, value);
          }
          get maxLines() {
            return this.trState.props.maxLines;
          }
          set maxLines(value) {
            this.textRenderer.set.maxLines(this.trState, value);
          }
          get textBaseline() {
            return this.trState.props.textBaseline;
          }
          set textBaseline(value) {
            this.textRenderer.set.textBaseline(this.trState, value);
          }
          get verticalAlign() {
            return this.trState.props.verticalAlign;
          }
          set verticalAlign(value) {
            this.textRenderer.set.verticalAlign(this.trState, value);
          }
          get overflowSuffix() {
            return this.trState.props.overflowSuffix;
          }
          set overflowSuffix(value) {
            this.textRenderer.set.overflowSuffix(this.trState, value);
          }
          get debug() {
            return this.trState.props.debug;
          }
          set debug(value) {
            this.textRenderer.set.debug(this.trState, value);
          }
          update(delta, parentClippingRect) {
            super.update(delta, parentClippingRect);
            assertTruthy(this.globalTransform);
            // globalTransform is updated in super.update(delta)
            this.textRenderer.set.x(this.trState, this.globalTransform.tx);
            this.textRenderer.set.y(this.trState, this.globalTransform.ty);
          }
          checkRenderProps() {
            if (this.trState && this.trState.props.text !== '') {
              return true;
            }
            return super.checkRenderProps();
          }
          onChangeIsRenderable(isRenderable) {
            super.onChangeIsRenderable(isRenderable);
            this.textRenderer.setIsRenderable(this.trState, isRenderable);
          }
          renderQuads(renderer) {
            var _this$props$parent5;
            assertTruthy(this.globalTransform);
            // If the text renderer does not support rendering quads, fallback to the
            // default renderQuads method
            if (!this.textRenderer.renderQuads) {
              super.renderQuads(renderer);
              return;
            }
            // If the text renderer does support rendering quads, use it...
            // Prevent quad rendering if parent has a render texture
            // and this node is not the render texture
            if (this.parentHasRenderTexture) {
              if (!renderer.renderToTextureActive) {
                return;
              }
              // Prevent quad rendering if parent render texture is not the active render texture
              if (this.parentRenderTexture !== renderer.activeRttNode) {
                return;
              }
            }
            if (this.parentHasRenderTexture && (_this$props$parent5 = this.props.parent) !== null && _this$props$parent5 !== void 0 && _this$props$parent5.rtt) {
              this.globalTransform = Matrix3d.identity();
              if (this.localTransform) {
                this.globalTransform.multiply(this.localTransform);
              }
            }
            assertTruthy(this.globalTransform);
            this.textRenderer.renderQuads(this.trState, this.globalTransform, this.clippingRect, this.worldAlpha, this.parentHasRenderTexture, this.framebufferDimensions);
          }
          /**
           * Destroy the node and cleanup all resources
           */
          destroy() {
            super.destroy();
            this.textRenderer.destroyState(this.trState);
          }
          /**
           * Resolve a text renderer and a new state based on the current text renderer props provided
           * @param props
           * @returns
           */
          createState(props) {
            var textRendererState = this.textRenderer.createState(props, this);
            textRendererState.emitter.on('loaded', this.onTextLoaded);
            textRendererState.emitter.on('failed', this.onTextFailed);
            this.textRenderer.scheduleUpdateState(textRendererState);
            return textRendererState;
          }
        }
        function santizeCustomDataMap(d) {
          var validTypes = {
            boolean: true,
            string: true,
            number: true,
            undefined: true
          };
          var keys = Object.keys(d);
          for (var i = 0; i < keys.length; i++) {
            var _key15 = keys[i];
            if (!_key15) {
              continue;
            }
            var value = d[_key15];
            var valueType = typeof value;
            // Typescript doesn't understand the above const valueType ¯\_(ツ)_/¯
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore-next-line
            if (valueType === 'string' && value.length > 2048) {
              console.warn(`Custom Data value for ${_key15} is too long, it will be truncated to 2048 characters`);
              // same here, see above comment, this can only be a string at this point
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore-next-line
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
              d[_key15] = value.substring(0, 2048);
            }
            if (!validTypes[valueType]) {
              console.warn(`Custom Data value for ${_key15} is not a boolean, string, or number, it will be ignored`);
              delete d[_key15];
            }
          }
          return d;
        }

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        var bufferMemory = 2e6;
        class Stage {
          /**
           * Stage constructor
           */
          constructor(options) {
            _defineProperty(this, "options", void 0);
            /// Module Instances
            _defineProperty(this, "animationManager", void 0);
            _defineProperty(this, "txManager", void 0);
            _defineProperty(this, "txMemManager", void 0);
            _defineProperty(this, "fontManager", void 0);
            _defineProperty(this, "textRenderers", void 0);
            _defineProperty(this, "shManager", void 0);
            _defineProperty(this, "renderer", void 0);
            _defineProperty(this, "root", void 0);
            _defineProperty(this, "boundsMargin", void 0);
            _defineProperty(this, "defShaderCtr", void 0);
            /**
             * Renderer Event Bus for the Stage to emit events onto
             *
             * @remarks
             * In reality this is just the RendererMain instance, which is an EventEmitter.
             * this allows us to directly emit events from the Stage to RendererMain
             * without having to set up forwarding handlers.
             */
            _defineProperty(this, "eventBus", void 0);
            /// State
            _defineProperty(this, "deltaTime", 0);
            _defineProperty(this, "lastFrameTime", 0);
            _defineProperty(this, "currentFrameTime", 0);
            _defineProperty(this, "fpsNumFrames", 0);
            _defineProperty(this, "fpsElapsedTime", 0);
            _defineProperty(this, "renderRequested", false);
            _defineProperty(this, "frameEventQueue", []);
            _defineProperty(this, "fontResolveMap", {});
            /// Debug data
            _defineProperty(this, "contextSpy", null);
            this.options = options;
            var canvas = options.canvas,
              clearColor = options.clearColor,
              appWidth = options.appWidth,
              appHeight = options.appHeight,
              boundsMargin = options.boundsMargin,
              enableContextSpy = options.enableContextSpy,
              numImageWorkers = options.numImageWorkers,
              textureMemory = options.textureMemory,
              renderEngine = options.renderEngine,
              fontEngines = options.fontEngines;
            this.eventBus = options.eventBus;
            this.txManager = new CoreTextureManager(numImageWorkers);
            this.txMemManager = new TextureMemoryManager(this, textureMemory);
            this.shManager = new CoreShaderManager();
            this.animationManager = new AnimationManager();
            this.contextSpy = enableContextSpy ? new ContextSpy() : null;
            var bm = [0, 0, 0, 0];
            if (boundsMargin) {
              bm = Array.isArray(boundsMargin) ? boundsMargin : [boundsMargin, boundsMargin, boundsMargin, boundsMargin];
            }
            this.boundsMargin = bm;
            var rendererOptions = {
              stage: this,
              canvas,
              pixelRatio: options.devicePhysicalPixelRatio * options.deviceLogicalPixelRatio,
              clearColor: clearColor !== null && clearColor !== void 0 ? clearColor : 0xff000000,
              bufferMemory,
              txManager: this.txManager,
              txMemManager: this.txMemManager,
              shManager: this.shManager,
              contextSpy: this.contextSpy
            };
            this.renderer = new renderEngine(rendererOptions);
            var renderMode = this.renderer.mode || 'webgl';
            this.defShaderCtr = this.renderer.getDefShaderCtr();
            setPremultiplyMode(renderMode);
            // Must do this after renderer is created
            this.txManager.renderer = this.renderer;
            // Create text renderers
            this.textRenderers = {};
            fontEngines.forEach(fontEngineConstructor => {
              var fontEngineInstance = new fontEngineConstructor(this);
              var className = fontEngineInstance.type;
              if (className === 'sdf' && renderMode === 'canvas') {
                console.warn('SdfTextRenderer is not compatible with Canvas renderer. Skipping...');
                return;
              }
              if (fontEngineInstance instanceof TextRenderer) {
                if (className === 'canvas') {
                  this.textRenderers['canvas'] = fontEngineInstance;
                } else if (className === 'sdf') {
                  this.textRenderers['sdf'] = fontEngineInstance;
                }
              }
            });
            if (Object.keys(this.textRenderers).length === 0) {
              console.warn('No text renderers available. Your text will not render.');
            }
            this.fontManager = new TrFontManager(this.textRenderers);
            // create root node
            var rootNode = new CoreNode(this, {
              x: 0,
              y: 0,
              width: appWidth,
              height: appHeight,
              alpha: 1,
              autosize: false,
              clipping: false,
              color: 0x00000000,
              colorTop: 0x00000000,
              colorBottom: 0x00000000,
              colorLeft: 0x00000000,
              colorRight: 0x00000000,
              colorTl: 0x00000000,
              colorTr: 0x00000000,
              colorBl: 0x00000000,
              colorBr: 0x00000000,
              zIndex: 0,
              zIndexLocked: 0,
              scaleX: 1,
              scaleY: 1,
              mountX: 0,
              mountY: 0,
              mount: 0,
              pivot: 0.5,
              pivotX: 0.5,
              pivotY: 0.5,
              rotation: 0,
              parent: null,
              texture: null,
              textureOptions: {},
              shader: this.defShaderCtr,
              rtt: false,
              src: null,
              scale: 1,
              preventCleanup: false
            });
            this.root = rootNode;
            // execute platform start loop
            {
              startLoop(this);
            }
          }
          updateFrameTime() {
            var newFrameTime = getTimeStamp();
            this.lastFrameTime = this.currentFrameTime;
            this.currentFrameTime = newFrameTime;
            this.deltaTime = !this.lastFrameTime ? 100 / 6 : newFrameTime - this.lastFrameTime;
            this.txManager.frameTime = newFrameTime;
            this.txMemManager.frameTime = newFrameTime;
            // This event is emitted at the beginning of the frame (before any updates
            // or rendering), so no need to to use `stage.queueFrameEvent` here.
            this.eventBus.emit('frameTick', {
              time: this.currentFrameTime,
              delta: this.deltaTime
            });
          }
          /**
           * Update animations
           */
          updateAnimations() {
            var animationManager = this.animationManager;
            if (!this.root) {
              return;
            }
            // step animation
            animationManager.update(this.deltaTime);
          }
          /**
           * Check if the scene has updates
           */
          hasSceneUpdates() {
            return !!this.root.updateType || this.renderRequested;
          }
          /**
           * Start a new frame draw
           */
          drawFrame() {
            var renderer = this.renderer,
              renderRequested = this.renderRequested;
            assertTruthy(renderer);
            // Update tree if needed
            if (this.root.updateType !== 0) {
              this.root.update(this.deltaTime, this.root.clippingRect);
            }
            // Reset render operations and clear the canvas
            renderer.reset();
            // Check if we need to cleanup textures
            if (this.txMemManager.criticalCleanupRequested) {
              this.txMemManager.cleanup();
            }
            // If we have RTT nodes draw them first
            // So we can use them as textures in the main scene
            if (renderer.rttNodes.length > 0) {
              renderer.renderRTTNodes();
            }
            // Fill quads buffer
            this.addQuads(this.root);
            // Perform render pass
            renderer === null || renderer === void 0 || renderer.render();
            this.calculateFps();
            // Reset renderRequested flag if it was set
            if (renderRequested) {
              this.renderRequested = false;
            }
          }
          /**
           * Queue an event to be emitted after the current/next frame is rendered
           *
           * @remarks
           * When we are operating in the context of the render loop, we may want to
           * emit events that are related to the current frame. However, we generally do
           * NOT want to emit events directly in the middle of the render loop, since
           * this could enable event handlers to modify the scene graph and cause
           * unexpected behavior. Instead, we queue up events to be emitted and then
           * flush the queue after the frame has been rendered.
           *
           * @param name
           * @param data
           */
          queueFrameEvent(name, data) {
            this.frameEventQueue.push([name, data]);
          }
          /**
           * Emit all queued frame events
           *
           * @remarks
           * This method should be called after the frame has been rendered to emit
           * all events that were queued during the frame.
           *
           * See {@link queueFrameEvent} for more information.
           */
          flushFrameEvents() {
            var _iterator7 = _createForOfIteratorHelper(this.frameEventQueue),
              _step7;
            try {
              for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
                var _step7$value = _slicedToArray(_step7.value, 2),
                  name = _step7$value[0],
                  data = _step7$value[1];
                this.eventBus.emit(name, data);
              }
            } catch (err) {
              _iterator7.e(err);
            } finally {
              _iterator7.f();
            }
            this.frameEventQueue = [];
          }
          calculateFps() {
            // If there's an FPS update interval, emit the FPS update event
            // when the specified interval has elapsed.
            var fpsUpdateInterval = this.options.fpsUpdateInterval;
            if (fpsUpdateInterval) {
              this.fpsNumFrames++;
              this.fpsElapsedTime += this.deltaTime;
              if (this.fpsElapsedTime >= fpsUpdateInterval) {
                var _this$contextSpy$getD, _this$contextSpy, _this$contextSpy2;
                var _fps = Math.round(this.fpsNumFrames * 1000 / this.fpsElapsedTime);
                this.fpsNumFrames = 0;
                this.fpsElapsedTime = 0;
                this.queueFrameEvent('fpsUpdate', {
                  fps: _fps,
                  contextSpyData: (_this$contextSpy$getD = (_this$contextSpy = this.contextSpy) === null || _this$contextSpy === void 0 ? void 0 : _this$contextSpy.getData()) !== null && _this$contextSpy$getD !== void 0 ? _this$contextSpy$getD : null
                });
                (_this$contextSpy2 = this.contextSpy) === null || _this$contextSpy2 === void 0 || _this$contextSpy2.reset();
              }
            }
          }
          addQuads(node) {
            assertTruthy(this.renderer && node.globalTransform);
            if (node.isRenderable) {
              node.renderQuads(this.renderer);
            }
            for (var i = 0; i < node.children.length; i++) {
              var child = node.children[i];
              if (!child) {
                continue;
              }
              if ((child === null || child === void 0 ? void 0 : child.worldAlpha) === 0) {
                continue;
              }
              this.addQuads(child);
            }
          }
          /**
           * Request a render pass without forcing an update
           */
          requestRender() {
            this.renderRequested = true;
          }
          /**
           * Given a font name, and possible renderer override, return the best compatible text renderer.
           *
           * @remarks
           * Will try to return a canvas renderer if no other suitable renderer can be resolved.
           *
           * @param fontFamily
           * @param textRendererOverride
           * @returns
           */
          resolveTextRenderer(trProps, textRendererOverride = null) {
            var fontCacheString = `${trProps.fontFamily}${trProps.fontStyle}${trProps.fontWeight}${trProps.fontStretch}${textRendererOverride ? textRendererOverride : ''}`;
            // check our resolve cache first
            if (this.fontResolveMap[fontCacheString] !== undefined) {
              return this.fontResolveMap[fontCacheString];
            }
            // Resolve the text renderer
            var rendererId = textRendererOverride;
            var overrideFallback = false;
            // Check if the override is valid (if one is provided)
            if (rendererId) {
              var possibleRenderer = this.textRenderers[rendererId];
              if (!possibleRenderer) {
                console.warn(`Text renderer override '${rendererId}' not found.`);
                rendererId = null;
                overrideFallback = true;
              } else if (!possibleRenderer.canRenderFont(trProps)) {
                console.warn(`Cannot use override text renderer '${rendererId}' for font`, trProps);
                rendererId = null;
                overrideFallback = true;
              }
            }
            if (!rendererId) {
              // Iterate through the text renderers and find the first one that can render the font
              for (var _i = 0, _Object$entries = Object.entries(this.textRenderers); _i < _Object$entries.length; _i++) {
                var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
                  trId = _Object$entries$_i[0],
                  tr = _Object$entries$_i[1];
                if (tr.canRenderFont(trProps)) {
                  rendererId = trId;
                  break;
                }
              }
              if (!rendererId && this.textRenderers.canvas !== undefined) {
                // If no renderer can be found, use the canvas renderer
                rendererId = 'canvas';
              }
            }
            if (overrideFallback) {
              console.warn(`Falling back to text renderer ${String(rendererId)}`);
            }
            if (!rendererId) {
              // silently fail if no renderer can be found, the error is already created
              // at the constructor level
              return null;
            }
            // By now we are guaranteed to have a valid rendererId (at least Canvas);
            var resolvedTextRenderer = this.textRenderers[rendererId];
            assertTruthy(resolvedTextRenderer, 'resolvedTextRenderer undefined');
            // cache the resolved renderer for future use with these trProps
            this.fontResolveMap[fontCacheString] = resolvedTextRenderer;
            // Need to explicitly cast to TextRenderer because TS doesn't like
            // the covariant state argument in the setter method map
            return resolvedTextRenderer;
          }
          /**
           * Create a shader controller instance
           *
           * @param type
           * @param props
           * @returns
           */
          createShaderCtr(type, props) {
            return this.shManager.loadShader(type, props);
          }
          createNode(props) {
            var resolvedProps = this.resolveNodeDefaults(props);
            return new CoreNode(this, resolvedProps);
          }
          createTextNode(props) {
            var _props$fontSize, _props$text, _props$textRendererOv, _props$fontFamily, _props$fontStyle, _props$fontWeight, _props$fontStretch, _props$textAlign, _props$contain, _props$scrollable, _props$scrollY2, _props$offsetY, _props$letterSpacing, _props$maxLines, _props$textBaseline, _props$verticalAlign, _props$overflowSuffix, _props$debug2;
            var fontSize = (_props$fontSize = props.fontSize) !== null && _props$fontSize !== void 0 ? _props$fontSize : 16;
            var resolvedProps = _objectSpread(_objectSpread({}, this.resolveNodeDefaults(props)), {}, {
              text: (_props$text = props.text) !== null && _props$text !== void 0 ? _props$text : '',
              textRendererOverride: (_props$textRendererOv = props.textRendererOverride) !== null && _props$textRendererOv !== void 0 ? _props$textRendererOv : null,
              fontSize,
              fontFamily: (_props$fontFamily = props.fontFamily) !== null && _props$fontFamily !== void 0 ? _props$fontFamily : 'sans-serif',
              fontStyle: (_props$fontStyle = props.fontStyle) !== null && _props$fontStyle !== void 0 ? _props$fontStyle : 'normal',
              fontWeight: (_props$fontWeight = props.fontWeight) !== null && _props$fontWeight !== void 0 ? _props$fontWeight : 'normal',
              fontStretch: (_props$fontStretch = props.fontStretch) !== null && _props$fontStretch !== void 0 ? _props$fontStretch : 'normal',
              textAlign: (_props$textAlign = props.textAlign) !== null && _props$textAlign !== void 0 ? _props$textAlign : 'left',
              contain: (_props$contain = props.contain) !== null && _props$contain !== void 0 ? _props$contain : 'none',
              scrollable: (_props$scrollable = props.scrollable) !== null && _props$scrollable !== void 0 ? _props$scrollable : false,
              scrollY: (_props$scrollY2 = props.scrollY) !== null && _props$scrollY2 !== void 0 ? _props$scrollY2 : 0,
              offsetY: (_props$offsetY = props.offsetY) !== null && _props$offsetY !== void 0 ? _props$offsetY : 0,
              letterSpacing: (_props$letterSpacing = props.letterSpacing) !== null && _props$letterSpacing !== void 0 ? _props$letterSpacing : 0,
              lineHeight: props.lineHeight,
              maxLines: (_props$maxLines = props.maxLines) !== null && _props$maxLines !== void 0 ? _props$maxLines : 0,
              textBaseline: (_props$textBaseline = props.textBaseline) !== null && _props$textBaseline !== void 0 ? _props$textBaseline : 'alphabetic',
              verticalAlign: (_props$verticalAlign = props.verticalAlign) !== null && _props$verticalAlign !== void 0 ? _props$verticalAlign : 'middle',
              overflowSuffix: (_props$overflowSuffix = props.overflowSuffix) !== null && _props$overflowSuffix !== void 0 ? _props$overflowSuffix : '...',
              debug: (_props$debug2 = props.debug) !== null && _props$debug2 !== void 0 ? _props$debug2 : {},
              shaderProps: null
            });
            var resolvedTextRenderer = this.resolveTextRenderer(resolvedProps, props.textRendererOverride);
            if (!resolvedTextRenderer) {
              throw new Error(`No compatible text renderer found for ${resolvedProps.fontFamily}`);
            }
            return new CoreTextNode(this, resolvedProps, resolvedTextRenderer);
          }
          /**
           * Resolves the default property values for a Node
           *
           * @remarks
           * This method is used internally by the RendererMain to resolve the default
           * property values for a Node. It is exposed publicly so that it can be used
           * by Core Driver implementations.
           *
           * @param props
           * @returns
           */
          resolveNodeDefaults(props) {
            var _props$color8, _ref6, _ref7, _props$colorTl, _ref8, _ref9, _props$colorTr, _ref10, _ref11, _props$colorBl, _ref12, _ref13, _props$colorBr, _props$data, _props$x, _props$y, _props$width10, _props$height4, _props$alpha, _props$autosize, _props$clipping, _props$colorTop, _props$colorBottom, _props$colorLeft, _props$colorRight, _props$zIndex, _props$zIndexLocked, _props$parent3, _props$texture, _props$textureOptions, _props$shader, _props$src2, _props$scale, _ref14, _props$scaleX, _ref15, _props$scaleY, _props$mount, _ref16, _props$mountX, _ref17, _props$mountY, _props$pivot2, _ref18, _props$pivotX, _ref19, _props$pivotY, _props$rotation, _props$rtt, _props$preventCleanup;
            var color = (_props$color8 = props.color) !== null && _props$color8 !== void 0 ? _props$color8 : 0xffffffff;
            var colorTl = (_ref6 = (_ref7 = (_props$colorTl = props.colorTl) !== null && _props$colorTl !== void 0 ? _props$colorTl : props.colorTop) !== null && _ref7 !== void 0 ? _ref7 : props.colorLeft) !== null && _ref6 !== void 0 ? _ref6 : color;
            var colorTr = (_ref8 = (_ref9 = (_props$colorTr = props.colorTr) !== null && _props$colorTr !== void 0 ? _props$colorTr : props.colorTop) !== null && _ref9 !== void 0 ? _ref9 : props.colorRight) !== null && _ref8 !== void 0 ? _ref8 : color;
            var colorBl = (_ref10 = (_ref11 = (_props$colorBl = props.colorBl) !== null && _props$colorBl !== void 0 ? _props$colorBl : props.colorBottom) !== null && _ref11 !== void 0 ? _ref11 : props.colorLeft) !== null && _ref10 !== void 0 ? _ref10 : color;
            var colorBr = (_ref12 = (_ref13 = (_props$colorBr = props.colorBr) !== null && _props$colorBr !== void 0 ? _props$colorBr : props.colorBottom) !== null && _ref13 !== void 0 ? _ref13 : props.colorRight) !== null && _ref12 !== void 0 ? _ref12 : color;
            var data = santizeCustomDataMap((_props$data = props.data) !== null && _props$data !== void 0 ? _props$data : {});
            return {
              x: (_props$x = props.x) !== null && _props$x !== void 0 ? _props$x : 0,
              y: (_props$y = props.y) !== null && _props$y !== void 0 ? _props$y : 0,
              width: (_props$width10 = props.width) !== null && _props$width10 !== void 0 ? _props$width10 : 0,
              height: (_props$height4 = props.height) !== null && _props$height4 !== void 0 ? _props$height4 : 0,
              alpha: (_props$alpha = props.alpha) !== null && _props$alpha !== void 0 ? _props$alpha : 1,
              autosize: (_props$autosize = props.autosize) !== null && _props$autosize !== void 0 ? _props$autosize : false,
              clipping: (_props$clipping = props.clipping) !== null && _props$clipping !== void 0 ? _props$clipping : false,
              color,
              colorTop: (_props$colorTop = props.colorTop) !== null && _props$colorTop !== void 0 ? _props$colorTop : color,
              colorBottom: (_props$colorBottom = props.colorBottom) !== null && _props$colorBottom !== void 0 ? _props$colorBottom : color,
              colorLeft: (_props$colorLeft = props.colorLeft) !== null && _props$colorLeft !== void 0 ? _props$colorLeft : color,
              colorRight: (_props$colorRight = props.colorRight) !== null && _props$colorRight !== void 0 ? _props$colorRight : color,
              colorBl,
              colorBr,
              colorTl,
              colorTr,
              zIndex: (_props$zIndex = props.zIndex) !== null && _props$zIndex !== void 0 ? _props$zIndex : 0,
              zIndexLocked: (_props$zIndexLocked = props.zIndexLocked) !== null && _props$zIndexLocked !== void 0 ? _props$zIndexLocked : 0,
              parent: (_props$parent3 = props.parent) !== null && _props$parent3 !== void 0 ? _props$parent3 : null,
              texture: (_props$texture = props.texture) !== null && _props$texture !== void 0 ? _props$texture : null,
              textureOptions: (_props$textureOptions = props.textureOptions) !== null && _props$textureOptions !== void 0 ? _props$textureOptions : {},
              shader: (_props$shader = props.shader) !== null && _props$shader !== void 0 ? _props$shader : this.defShaderCtr,
              // Since setting the `src` will trigger a texture load, we need to set it after
              // we set the texture. Otherwise, problems happen.
              src: (_props$src2 = props.src) !== null && _props$src2 !== void 0 ? _props$src2 : null,
              srcHeight: props.srcHeight,
              srcWidth: props.srcWidth,
              srcX: props.srcX,
              srcY: props.srcY,
              scale: (_props$scale = props.scale) !== null && _props$scale !== void 0 ? _props$scale : null,
              scaleX: (_ref14 = (_props$scaleX = props.scaleX) !== null && _props$scaleX !== void 0 ? _props$scaleX : props.scale) !== null && _ref14 !== void 0 ? _ref14 : 1,
              scaleY: (_ref15 = (_props$scaleY = props.scaleY) !== null && _props$scaleY !== void 0 ? _props$scaleY : props.scale) !== null && _ref15 !== void 0 ? _ref15 : 1,
              mount: (_props$mount = props.mount) !== null && _props$mount !== void 0 ? _props$mount : 0,
              mountX: (_ref16 = (_props$mountX = props.mountX) !== null && _props$mountX !== void 0 ? _props$mountX : props.mount) !== null && _ref16 !== void 0 ? _ref16 : 0,
              mountY: (_ref17 = (_props$mountY = props.mountY) !== null && _props$mountY !== void 0 ? _props$mountY : props.mount) !== null && _ref17 !== void 0 ? _ref17 : 0,
              pivot: (_props$pivot2 = props.pivot) !== null && _props$pivot2 !== void 0 ? _props$pivot2 : 0.5,
              pivotX: (_ref18 = (_props$pivotX = props.pivotX) !== null && _props$pivotX !== void 0 ? _props$pivotX : props.pivot) !== null && _ref18 !== void 0 ? _ref18 : 0.5,
              pivotY: (_ref19 = (_props$pivotY = props.pivotY) !== null && _props$pivotY !== void 0 ? _props$pivotY : props.pivot) !== null && _ref19 !== void 0 ? _ref19 : 0.5,
              rotation: (_props$rotation = props.rotation) !== null && _props$rotation !== void 0 ? _props$rotation : 0,
              rtt: (_props$rtt = props.rtt) !== null && _props$rtt !== void 0 ? _props$rtt : false,
              data: data,
              preventCleanup: (_props$preventCleanup = props.preventCleanup) !== null && _props$preventCleanup !== void 0 ? _props$preventCleanup : false,
              imageType: props.imageType
            };
          }
        }

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        /**
         * The Renderer Main API
         *
         * @remarks
         * This is the primary class used to configure and operate the Renderer.
         *
         * It is used to create and destroy Nodes, as well as Texture and Shader
         * references.
         *
         * Example:
         * ```ts
         * import { RendererMain, MainCoreDriver } from '@lightningjs/renderer';
         *
         * // Initialize the Renderer
         * const renderer = new RendererMain(
         *   {
         *     appWidth: 1920,
         *     appHeight: 1080
         *   },
         *   'app',
         *   new MainCoreDriver(),
         * );
         * ```
         *
         * ## Events
         * - `fpsUpdate`
         *   - Emitted every `fpsUpdateInterval` milliseconds with the current FPS
         * - `frameTick`
         *   - Emitted every frame tick
         * - `idle`
         *   - Emitted when the renderer is idle (no changes to the scene
         *     graph/animations running)
         * - `criticalCleanup`
         *  - Emitted when the Texture Memory Manager Cleanup process is triggered
         *  - Payload: { memUsed: number, criticalThreshold: number }
         *    - `memUsed` - The amount of memory (in bytes) used by textures before the
         *       cleanup process
         *    - `criticalThreshold` - The critical threshold (in bytes)
         * - `criticalCleanupFailed`
         *   - Emitted when the Texture Memory Manager Cleanup process is unable to free
         *     up enough texture memory to reach below the critical threshold.
         *     This can happen when there is not enough non-renderable textures to
         *     free up.
         *   - Payload (object with keys):
         *     - `memUsed` - The amount of memory (in bytes) used by textures after
         *       the cleanup process
         *     - `criticalThreshold` - The critical threshold (in bytes)
         */
        class RendererMain extends EventEmitter {
          /**
           * Constructs a new Renderer instance
           *
           * @param settings Renderer settings
           * @param target Element ID or HTMLElement to insert the canvas into
           * @param driver Core Driver to use
           */
          constructor(settings, target) {
            var _settings$textureMemo, _settings$textureMemo2, _settings$textureMemo3, _settings$textureMemo4, _settings$clearColor, _settings$enableConte, _settings$quadBufferS;
            super();
            _defineProperty(this, "root", void 0);
            _defineProperty(this, "canvas", void 0);
            _defineProperty(this, "settings", void 0);
            _defineProperty(this, "stage", void 0);
            _defineProperty(this, "inspector", null);
            var resolvedTxSettings = {
              criticalThreshold: ((_settings$textureMemo = settings.textureMemory) === null || _settings$textureMemo === void 0 ? void 0 : _settings$textureMemo.criticalThreshold) || 124e6,
              targetThresholdLevel: ((_settings$textureMemo2 = settings.textureMemory) === null || _settings$textureMemo2 === void 0 ? void 0 : _settings$textureMemo2.targetThresholdLevel) || 0.5,
              cleanupInterval: ((_settings$textureMemo3 = settings.textureMemory) === null || _settings$textureMemo3 === void 0 ? void 0 : _settings$textureMemo3.cleanupInterval) || 30000,
              debugLogging: ((_settings$textureMemo4 = settings.textureMemory) === null || _settings$textureMemo4 === void 0 ? void 0 : _settings$textureMemo4.debugLogging) || false
            };
            var resolvedSettings = {
              appWidth: settings.appWidth || 1920,
              appHeight: settings.appHeight || 1080,
              textureMemory: resolvedTxSettings,
              boundsMargin: settings.boundsMargin || 0,
              deviceLogicalPixelRatio: settings.deviceLogicalPixelRatio || 1,
              devicePhysicalPixelRatio: settings.devicePhysicalPixelRatio || window.devicePixelRatio,
              clearColor: (_settings$clearColor = settings.clearColor) !== null && _settings$clearColor !== void 0 ? _settings$clearColor : 0x00000000,
              fpsUpdateInterval: settings.fpsUpdateInterval || 0,
              numImageWorkers: settings.numImageWorkers !== undefined ? settings.numImageWorkers : 2,
              enableContextSpy: (_settings$enableConte = settings.enableContextSpy) !== null && _settings$enableConte !== void 0 ? _settings$enableConte : false,
              inspector: settings.inspector,
              renderEngine: settings.renderEngine,
              quadBufferSize: (_settings$quadBufferS = settings.quadBufferSize) !== null && _settings$quadBufferS !== void 0 ? _settings$quadBufferS : 4 * 1024 * 1024,
              fontEngines: settings.fontEngines
            };
            this.settings = resolvedSettings;
            var appWidth = resolvedSettings.appWidth,
              appHeight = resolvedSettings.appHeight,
              deviceLogicalPixelRatio = resolvedSettings.deviceLogicalPixelRatio,
              devicePhysicalPixelRatio = resolvedSettings.devicePhysicalPixelRatio,
              inspector = resolvedSettings.inspector;
            var deviceLogicalWidth = appWidth * deviceLogicalPixelRatio;
            var deviceLogicalHeight = appHeight * deviceLogicalPixelRatio;
            var canvas = document.createElement('canvas');
            this.canvas = canvas;
            canvas.width = deviceLogicalWidth * devicePhysicalPixelRatio;
            canvas.height = deviceLogicalHeight * devicePhysicalPixelRatio;
            canvas.style.width = `${deviceLogicalWidth}px`;
            canvas.style.height = `${deviceLogicalHeight}px`;
            // Initialize the stage
            this.stage = new Stage({
              appWidth: this.settings.appWidth,
              appHeight: this.settings.appHeight,
              boundsMargin: this.settings.boundsMargin,
              clearColor: this.settings.clearColor,
              canvas: this.canvas,
              deviceLogicalPixelRatio: this.settings.deviceLogicalPixelRatio,
              devicePhysicalPixelRatio: this.settings.devicePhysicalPixelRatio,
              enableContextSpy: this.settings.enableContextSpy,
              fpsUpdateInterval: this.settings.fpsUpdateInterval,
              numImageWorkers: this.settings.numImageWorkers,
              renderEngine: this.settings.renderEngine,
              textureMemory: resolvedTxSettings,
              eventBus: this,
              quadBufferSize: this.settings.quadBufferSize,
              fontEngines: this.settings.fontEngines
            });
            // Extract the root node
            this.root = this.stage.root;
            // Get the target element and attach the canvas to it
            var targetEl;
            if (typeof target === 'string') {
              targetEl = document.getElementById(target);
            } else {
              targetEl = target;
            }
            if (!targetEl) {
              throw new Error('Could not find target element');
            }
            targetEl.appendChild(canvas);
            // Initialize inspector (if enabled)
            if (inspector && !isProductionEnvironment()) {
              this.inspector = new inspector(canvas, resolvedSettings);
            }
          }
          /**
           * Create a new scene graph node
           *
           * @remarks
           * A node is the main graphical building block of the Renderer scene graph. It
           * can be a container for other nodes, or it can be a leaf node that renders a
           * solid color, gradient, image, or specific texture, using a specific shader.
           *
           * To create a text node, see {@link createTextNode}.
           *
           * See {@link CoreNode} for more details.
           *
           * @param props
           * @returns
           */
          createNode(props) {
            assertTruthy(this.stage, 'Stage is not initialized');
            var node = this.stage.createNode(props);
            if (this.inspector) {
              return this.inspector.createNode(node);
            }
            // FIXME onDestroy event? node.once('beforeDestroy'
            // FIXME onCreate event?
            return node;
          }
          /**
           * Create a new scene graph text node
           *
           * @remarks
           * A text node is the second graphical building block of the Renderer scene
           * graph. It renders text using a specific text renderer that is automatically
           * chosen based on the font requested and what type of fonts are installed
           * into an app.
           *
           * See {@link ITextNode} for more details.
           *
           * @param props
           * @returns
           */
          createTextNode(props) {
            var textNode = this.stage.createTextNode(props);
            if (this.inspector) {
              return this.inspector.createTextNode(textNode);
            }
            return textNode;
          }
          /**
           * Destroy a node
           *
           * @remarks
           * This method destroys a node
           *
           * @param node
           * @returns
           */
          destroyNode(node) {
            if (this.inspector) {
              this.inspector.destroyNode(node.id);
            }
            return node.destroy();
          }
          /**
           * Create a new texture reference
           *
           * @remarks
           * This method creates a new reference to a texture. The texture is not
           * loaded until it is used on a node.
           *
           * It can be assigned to a node's `texture` property, or it can be used
           * when creating a SubTexture.
           *
           * @param textureType
           * @param props
           * @param options
           * @returns
           */
          createTexture(textureType, props) {
            return this.stage.txManager.loadTexture(textureType, props);
          }
          /**
           * Create a new shader controller for a shader type
           *
           * @remarks
           * This method creates a new Shader Controller for a specific shader type.
           *
           * If the shader has not been loaded yet, it will be loaded. Otherwise, the
           * existing shader will be reused.
           *
           * It can be assigned to a Node's `shader` property.
           *
           * @param shaderType
           * @param props
           * @returns
           */
          createShader(shaderType, props) {
            return this.stage.shManager.loadShader(shaderType, props);
          }
          /**
           * Create a new Dynamic Shader controller
           *
           * @remarks
           * A Dynamic Shader is a shader that can be composed of an array of mulitple
           * effects. Each effect can be animated or changed after creation (provided
           * the effect is given a name).
           *
           * Example:
           * ```ts
           * renderer.createNode({
           *   shader: renderer.createDynamicShader([
           *     renderer.createEffect('radius', {
           *       radius: 0
           *     }, 'effect1'),
           *     renderer.createEffect('border', {
           *       color: 0xff00ffff,
           *       width: 10,
           *     }, 'effect2'),
           *   ]),
           * });
           * ```
           *
           * @param effects
           * @returns
           */
          createDynamicShader(effects) {
            return this.stage.shManager.loadDynamicShader({
              effects: effects
            });
          }
          /**
           * Create an effect to be used in a Dynamic Shader
           *
           * @remark
           * The {name} parameter is optional but required if you want to animate the effect
           * or change the effect's properties after creation.
           *
           * See {@link createDynamicShader} for an example.
           *
           * @param type
           * @param props
           * @param name
           * @returns
           */
          createEffect(type, props, name) {
            return {
              name,
              type,
              props
            };
          }
          /**
           * Get a Node by its ID
           *
           * @param id
           * @returns
           */
          getNodeById(id) {
            var _this$stage;
            var root = (_this$stage = this.stage) === null || _this$stage === void 0 ? void 0 : _this$stage.root;
            if (!root) {
              return null;
            }
            var findNode = node => {
              if (node.id === id) {
                return node;
              }
              var _iterator8 = _createForOfIteratorHelper(node.children),
                _step8;
              try {
                for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
                  var child = _step8.value;
                  var found = findNode(child);
                  if (found) {
                    return found;
                  }
                }
              } catch (err) {
                _iterator8.e(err);
              } finally {
                _iterator8.f();
              }
              return null;
            };
            return findNode(root);
          }
          toggleFreeze() {
            throw new Error('Not implemented');
          }
          advanceFrame() {
            throw new Error('Not implemented');
          }
          getBufferInfo() {
            return this.stage.renderer.getBufferInfo();
          }
          /**
           * Re-render the current frame without advancing any running animations.
           *
           * @remarks
           * Any state changes will be reflected in the re-rendered frame. Useful for
           * debugging.
           *
           * May not do anything if the render loop is running on a separate worker.
           */
          rerender() {
            throw new Error('Not implemented');
          }
        }

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        class TrFontFace extends EventEmitter {
          constructor(options) {
            super();
            _defineProperty(this, "fontFamily", void 0);
            _defineProperty(this, "descriptors", void 0);
            _defineProperty(this, "loaded", false);
            _defineProperty(this, "metrics", null);
            var fontFamily = options.fontFamily,
              descriptors = options.descriptors,
              metrics = options.metrics;
            if (metrics) {
              // Normalize metrics to be in the range of 0 to 1
              this.metrics = {
                ascender: metrics.ascender / metrics.unitsPerEm,
                descender: metrics.descender / metrics.unitsPerEm,
                lineGap: metrics.lineGap / metrics.unitsPerEm
              };
            }
            this.fontFamily = fontFamily;
            this.descriptors = _objectSpread({
              style: 'normal',
              weight: 'normal',
              stretch: 'normal'
            }, descriptors);
          }
          /**
           * Convert a TrFontFaceDescriptors to a FontFaceDescriptors which differ slightly
           *
           * @param descriptors
           * @returns
           */
          static convertToCssFontFaceDescriptors(descriptors) {
            return {
              style: descriptors.style,
              weight: typeof descriptors.weight === 'number' ? `${descriptors.weight}` : descriptors.weight,
              stretch: descriptors.stretch,
              unicodeRange: descriptors.unicodeRange,
              featureSettings: descriptors.featureSettings,
              display: descriptors.display
            };
          }
        }

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        class WebTrFontFace extends TrFontFace {
          constructor(options) {
            super(options);
            _defineProperty(this, "fontFace", void 0);
            _defineProperty(this, "fontUrl", void 0);
            var fontFamily = options.fontFamily,
              fontUrl = options.fontUrl;
            // Filter out parentheses from fontUrl
            var fontUrlWithoutParentheses = fontUrl.replace(/\(|\)/g, '');
            // Defaults for descriptors resolved in the super constructor
            var determinedDescriptors = this.descriptors;
            // Convert TrFontFaceDescriptors to CSS FontFaceDescriptors
            var cssDescriptors = {
              style: determinedDescriptors.style,
              weight: typeof determinedDescriptors.weight === 'number' ? `${determinedDescriptors.weight}` : determinedDescriptors.weight,
              stretch: determinedDescriptors.stretch,
              unicodeRange: determinedDescriptors.unicodeRange,
              featureSettings: determinedDescriptors.featureSettings,
              display: determinedDescriptors.display
            };
            var fontFace = new FontFace(fontFamily, `url(${fontUrlWithoutParentheses})`, cssDescriptors);
            if (fontUrlWithoutParentheses.length > 0) {
              fontFace.load().then(() => {
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
                this.loaded = true;
                this.emit('loaded');
              }).catch(console.error);
            } else {
              // Default font
              // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
              this.loaded = true;
              this.emit('loaded');
            }
            this.fontFace = fontFace;
            this.fontUrl = fontUrl;
          }
        }

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        class CoreRenderOp {}

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        /**
         * Can render multiple quads with multiple textures (up to vertex shader texture limit)
         *
         */
        class WebGlCoreRenderOp extends CoreRenderOp {
          constructor(glw, options, buffers, shader, shaderProps, alpha, clippingRect, dimensions, bufferIdx, zIndex, renderToTexture, parentHasRenderTexture, framebufferDimensions) {
            super();
            _defineProperty(this, "glw", void 0);
            _defineProperty(this, "options", void 0);
            _defineProperty(this, "buffers", void 0);
            _defineProperty(this, "shader", void 0);
            _defineProperty(this, "shaderProps", void 0);
            _defineProperty(this, "alpha", void 0);
            _defineProperty(this, "clippingRect", void 0);
            _defineProperty(this, "dimensions", void 0);
            _defineProperty(this, "bufferIdx", void 0);
            _defineProperty(this, "zIndex", void 0);
            _defineProperty(this, "renderToTexture", void 0);
            _defineProperty(this, "parentHasRenderTexture", void 0);
            _defineProperty(this, "framebufferDimensions", void 0);
            _defineProperty(this, "length", 0);
            _defineProperty(this, "numQuads", 0);
            _defineProperty(this, "textures", []);
            _defineProperty(this, "maxTextures", void 0);
            this.glw = glw;
            this.options = options;
            this.buffers = buffers;
            this.shader = shader;
            this.shaderProps = shaderProps;
            this.alpha = alpha;
            this.clippingRect = clippingRect;
            this.dimensions = dimensions;
            this.bufferIdx = bufferIdx;
            this.zIndex = zIndex;
            this.renderToTexture = renderToTexture;
            this.parentHasRenderTexture = parentHasRenderTexture;
            this.framebufferDimensions = framebufferDimensions;
            this.maxTextures = shader.supportsIndexedTextures ? glw.getParameter(glw.MAX_VERTEX_TEXTURE_IMAGE_UNITS) : 1;
          }
          addTexture(texture) {
            var textures = this.textures,
              maxTextures = this.maxTextures;
            var existingIdx = textures.findIndex(t => t === texture);
            if (existingIdx !== -1) {
              return existingIdx;
            }
            var newIdx = textures.length;
            if (newIdx >= maxTextures) {
              return 0xffffffff;
            }
            this.textures.push(texture);
            return newIdx;
          }
          draw() {
            var glw = this.glw,
              shader = this.shader,
              shaderProps = this.shaderProps,
              options = this.options;
            var shManager = options.shManager;
            shManager.useShader(shader);
            shader.bindRenderOp(this, shaderProps);
            // TODO: Reduce calculations required
            var quadIdx = this.bufferIdx / 24 * 6 * 2;
            // Clipping
            if (this.clippingRect.valid) {
              var _this$clippingRect = this.clippingRect,
                x = _this$clippingRect.x,
                y = _this$clippingRect.y,
                width = _this$clippingRect.width,
                height = _this$clippingRect.height;
              var pixelRatio = options.pixelRatio;
              var canvasHeight = options.canvas.height;
              var clipX = Math.round(x * pixelRatio);
              var clipWidth = Math.round(width * pixelRatio);
              var clipHeight = Math.round(height * pixelRatio);
              var clipY = Math.round(canvasHeight - clipHeight - y * pixelRatio);
              glw.setScissorTest(true);
              glw.scissor(clipX, clipY, clipWidth, clipHeight);
            } else {
              glw.setScissorTest(false);
            }
            glw.drawElements(glw.TRIANGLES, 6 * this.numQuads, glw.UNSIGNED_SHORT, quadIdx);
          }
        }

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        /**
         * Get device specific webgl parameters
         * @param glw
         */
        function getWebGlParameters(glw) {
          var params = {
            MAX_RENDERBUFFER_SIZE: 0,
            MAX_TEXTURE_SIZE: 0,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
            MAX_VIEWPORT_DIMS: 0,
            MAX_VERTEX_TEXTURE_IMAGE_UNITS: 0,
            MAX_TEXTURE_IMAGE_UNITS: 0,
            MAX_COMBINED_TEXTURE_IMAGE_UNITS: 0,
            MAX_VERTEX_ATTRIBS: 0,
            MAX_VARYING_VECTORS: 0,
            MAX_VERTEX_UNIFORM_VECTORS: 0,
            MAX_FRAGMENT_UNIFORM_VECTORS: 0
          };
          // Map over all parameters and get them
          var keys = Object.keys(params);
          keys.forEach(key => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            params[key] = glw.getParameter(glw[key]);
          });
          return params;
        }
        /**
         * Get device webgl extensions
         * @param glw
         */
        function getWebGlExtensions(glw) {
          var extensions = {
            ANGLE_instanced_arrays: null,
            WEBGL_compressed_texture_s3tc: null,
            WEBGL_compressed_texture_astc: null,
            WEBGL_compressed_texture_etc: null,
            WEBGL_compressed_texture_etc1: null,
            WEBGL_compressed_texture_pvrtc: null,
            WEBKIT_WEBGL_compressed_texture_pvrtc: null,
            WEBGL_compressed_texture_s3tc_srgb: null,
            OES_vertex_array_object: null
          };
          // Map over all extensions and get them
          var keys = Object.keys(extensions);
          keys.forEach(key => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            extensions[key] = glw.getExtension(key);
          });
          return extensions;
        }
        /**
         * Allocate big memory chunk that we
         * can re-use to draw quads
         *
         * @param glw
         * @param size
         */
        function createIndexBuffer(glw, size) {
          var maxQuads = ~~(size / 80);
          var indices = new Uint16Array(maxQuads * 6);
          for (var i = 0, j = 0; i < maxQuads; i += 6, j += 4) {
            indices[i] = j;
            indices[i + 1] = j + 1;
            indices[i + 2] = j + 2;
            indices[i + 3] = j + 2;
            indices[i + 4] = j + 1;
            indices[i + 5] = j + 3;
          }
          var buffer = glw.createBuffer();
          glw.elementArrayBufferData(buffer, indices, glw.STATIC_DRAW);
        }
        /**
         * Checks if an object is of type HTMLImageElement.
         * This is used because we cant check for HTMLImageElement directly when the
         * renderer is running in a seperate web worker context.
         *
         * @param obj
         * @returns
         */
        function isHTMLImageElement(obj) {
          return obj !== null && typeof obj === 'object' && obj.constructor && obj.constructor.name === 'HTMLImageElement';
        }

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        var TRANSPARENT_TEXTURE_DATA = new Uint8Array([0, 0, 0, 0]);
        /**
         * A wrapper around a WebGLTexture that handles loading the texture data
         * from a Texture source and uploading it to the GPU as well as freeing
         * the uploaded texture.
         *
         * @remarks
         * When accessing the ctxTexture property, the texture will be loaded if
         * it hasn't been already. ctxTexture will always return a valid WebGLTexture
         * and trigger the loading/uploading of the texture's data if it hasn't been
         * loaded yet.
         */
        class WebGlCoreCtxTexture extends CoreContextTexture {
          constructor(glw, memManager, textureSource) {
            super(memManager, textureSource);
            _defineProperty(this, "glw", void 0);
            _defineProperty(this, "_nativeCtxTexture", null);
            _defineProperty(this, "_state", 'freed');
            _defineProperty(this, "_w", 0);
            _defineProperty(this, "_h", 0);
            this.glw = glw;
          }
          get ctxTexture() {
            if (this._state === 'freed') {
              this.load();
            }
            assertTruthy(this._nativeCtxTexture);
            return this._nativeCtxTexture;
          }
          get w() {
            return this._w;
          }
          get h() {
            return this._h;
          }
          /**
           * Load the texture data from the Texture source and upload it to the GPU
           *
           * @remarks
           * This method is called automatically when accessing the ctxTexture property
           * if the texture hasn't been loaded yet. But it can also be called manually
           * to force the texture to be pre-loaded prior to accessing the ctxTexture
           * property.
           */
          load() {
            // If the texture is already loading or loaded, don't load it again.
            if (this._state === 'loading' || this._state === 'loaded') {
              return;
            }
            this._state = 'loading';
            this.textureSource.setState('loading');
            this._nativeCtxTexture = this.createNativeCtxTexture();
            this.onLoadRequest().then(({
              width,
              height
            }) => {
              // If the texture has been freed while loading, return early.
              if (this._state === 'freed') {
                return;
              }
              this._state = 'loaded';
              this._w = width;
              this._h = height;
              // Update the texture source's width and height so that it can be used
              // for rendering.
              this.textureSource.setState('loaded', {
                width,
                height
              });
            }).catch(err => {
              // If the texture has been freed while loading, return early.
              if (this._state === 'freed') {
                return;
              }
              this._state = 'failed';
              this.textureSource.setState('failed', err);
              console.error(err);
            });
          }
          /**
           * Called when the texture data needs to be loaded and uploaded to a texture
           */
          onLoadRequest() {
            var _this8 = this;
            return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
              var _this8$textureSource;
              var glw, textureData, width, height, data, _mipmaps$, _textureData$data, mipmaps, _textureData$data$wid, _width, _textureData$data$hei, _height, type, glInternalFormat, view;
              return _regeneratorRuntime().wrap(function _callee10$(_context10) {
                while (1) switch (_context10.prev = _context10.next) {
                  case 0:
                    glw = _this8.glw; // Set to a 1x1 transparent texture
                    glw.texImage2D(0, glw.RGBA, 1, 1, 0, glw.RGBA, glw.UNSIGNED_BYTE, null);
                    _this8.setTextureMemUse(TRANSPARENT_TEXTURE_DATA.byteLength);
                    _context10.next = 5;
                    return (_this8$textureSource = _this8.textureSource) === null || _this8$textureSource === void 0 ? void 0 : _this8$textureSource.getTextureData();
                  case 5:
                    textureData = _context10.sent;
                    if (_this8._nativeCtxTexture) {
                      _context10.next = 9;
                      break;
                    }
                    assertTruthy(_this8._state === 'freed');
                    return _context10.abrupt("return", {
                      width: 0,
                      height: 0
                    });
                  case 9:
                    width = 0;
                    height = 0;
                    assertTruthy(_this8._nativeCtxTexture);
                    glw.activeTexture(0);
                    // If textureData is null, the texture is empty (0, 0) and we don't need to
                    // upload any data to the GPU.
                    if (textureData.data instanceof ImageBitmap || textureData.data instanceof ImageData ||
                    // not using typeof HTMLImageElement due to web worker
                    isHTMLImageElement(textureData.data)) {
                      data = textureData.data;
                      width = data.width;
                      height = data.height;
                      glw.bindTexture(_this8._nativeCtxTexture);
                      glw.pixelStorei(glw.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !!textureData.premultiplyAlpha);
                      glw.texImage2D(0, glw.RGBA, glw.RGBA, glw.UNSIGNED_BYTE, data);
                      _this8.setTextureMemUse(width * height * 4);
                      // generate mipmaps for power-of-2 textures or in WebGL2RenderingContext
                      if (glw.isWebGl2() || isPowerOfTwo(width) && isPowerOfTwo(height)) {
                        glw.generateMipmap();
                      }
                    } else if (textureData.data === null) {
                      width = 0;
                      height = 0;
                      // Reset to a 1x1 transparent texture
                      glw.bindTexture(_this8._nativeCtxTexture);
                      glw.texImage2D(0, glw.RGBA, 1, 1, 0, glw.RGBA, glw.UNSIGNED_BYTE, TRANSPARENT_TEXTURE_DATA);
                      _this8.setTextureMemUse(TRANSPARENT_TEXTURE_DATA.byteLength);
                    } else if ('mipmaps' in textureData.data && textureData.data.mipmaps) {
                      _textureData$data = textureData.data, mipmaps = _textureData$data.mipmaps, _textureData$data$wid = _textureData$data.width, _width = _textureData$data$wid === void 0 ? 0 : _textureData$data$wid, _textureData$data$hei = _textureData$data.height, _height = _textureData$data$hei === void 0 ? 0 : _textureData$data$hei, type = _textureData$data.type, glInternalFormat = _textureData$data.glInternalFormat;
                      view = type === 'ktx' ? new DataView((_mipmaps$ = mipmaps[0]) !== null && _mipmaps$ !== void 0 ? _mipmaps$ : new ArrayBuffer(0)) : mipmaps[0];
                      glw.bindTexture(_this8._nativeCtxTexture);
                      glw.compressedTexImage2D(0, glInternalFormat, _width, _height, 0, view);
                      glw.texParameteri(glw.TEXTURE_WRAP_S, glw.CLAMP_TO_EDGE);
                      glw.texParameteri(glw.TEXTURE_WRAP_T, glw.CLAMP_TO_EDGE);
                      glw.texParameteri(glw.TEXTURE_MAG_FILTER, glw.LINEAR);
                      glw.texParameteri(glw.TEXTURE_MIN_FILTER, glw.LINEAR);
                      _this8.setTextureMemUse(view.byteLength);
                    } else {
                      console.error(`WebGlCoreCtxTexture.onLoadRequest: Unexpected textureData returned`, textureData);
                    }
                    return _context10.abrupt("return", {
                      width,
                      height
                    });
                  case 15:
                  case "end":
                    return _context10.stop();
                }
              }, _callee10);
            }))();
          }
          /**
           * Free the WebGLTexture from the GPU
           *
           * @returns
           */
          free() {
            if (this._state === 'freed') {
              return;
            }
            this._state = 'freed';
            this.textureSource.setState('freed');
            this._w = 0;
            this._h = 0;
            if (!this._nativeCtxTexture) {
              return;
            }
            var glw = this.glw;
            glw.deleteTexture(this._nativeCtxTexture);
            this.setTextureMemUse(0);
            this._nativeCtxTexture = null;
          }
          /**
           * Create native context texture
           *
           * @remarks
           * When this method returns the returned texture will be bound to the GL context state.
           *
           * @param width
           * @param height
           * @returns
           */
          createNativeCtxTexture() {
            var glw = this.glw;
            var nativeTexture = glw.createTexture();
            if (!nativeTexture) {
              throw new Error('Could not create WebGL Texture');
            }
            // On initial load request, create a 1x1 transparent texture to use until
            // the texture data is finally loaded.
            glw.activeTexture(0);
            glw.bindTexture(nativeTexture);
            // linear texture filtering
            glw.texParameteri(glw.TEXTURE_MAG_FILTER, glw.LINEAR);
            glw.texParameteri(glw.TEXTURE_MIN_FILTER, glw.LINEAR);
            // texture wrapping method
            glw.texParameteri(glw.TEXTURE_WRAP_S, glw.CLAMP_TO_EDGE);
            glw.texParameteri(glw.TEXTURE_WRAP_T, glw.CLAMP_TO_EDGE);
            return nativeTexture;
          }
        }

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        class WebGlCoreCtxSubTexture extends WebGlCoreCtxTexture {
          constructor(glw, memManager, textureSource) {
            super(glw, memManager, textureSource);
          }
          onLoadRequest() {
            var _this9 = this;
            return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
              var _props$data2, _props$data3;
              var props;
              return _regeneratorRuntime().wrap(function _callee11$(_context11) {
                while (1) switch (_context11.prev = _context11.next) {
                  case 0:
                    _context11.next = 2;
                    return _this9.textureSource.getTextureData();
                  case 2:
                    props = _context11.sent;
                    return _context11.abrupt("return", {
                      width: ((_props$data2 = props.data) === null || _props$data2 === void 0 ? void 0 : _props$data2.width) || 0,
                      height: ((_props$data3 = props.data) === null || _props$data3 === void 0 ? void 0 : _props$data3.height) || 0
                    });
                  case 4:
                  case "end":
                    return _context11.stop();
                }
              }, _callee11);
            }))();
          }
        }

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        /**
         * Represents a collection of WebGL Buffers along with their associated
         * vertex attribute formats.
         */
        class BufferCollection {
          constructor(config) {
            _defineProperty(this, "config", void 0);
            this.config = config;
          }
          /**
           * Get the WebGLBuffer associated with the given attribute name if it exists.
           *
           * @param attributeName
           * @returns
           */
          getBuffer(attributeName) {
            var _this$config$find;
            return (_this$config$find = this.config.find(item => item.attributes[attributeName])) === null || _this$config$find === void 0 ? void 0 : _this$config$find.buffer;
          }
          /**
           * Get the AttributeInfo associated with the given attribute name if it exists.
           *
           * @param attributeName
           * @returns
           */
          getAttributeInfo(attributeName) {
            var _this$config$find2;
            return (_this$config$find2 = this.config.find(item => item.attributes[attributeName])) === null || _this$config$find2 === void 0 ? void 0 : _this$config$find2.attributes[attributeName];
          }
        }

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        /**
         * Generic WebGL Utility Functions
         *
         * @remarks
         * Nothing here should be coupled to Renderer logic / types.
         *
         * @param gl
         * @returns
         */
        function isWebGl2(gl) {
          return self.WebGL2RenderingContext && gl instanceof self.WebGL2RenderingContext;
        }

        /* eslint-disable @typescript-eslint/no-unsafe-return */
        /* eslint-disable @typescript-eslint/no-explicit-any */
        /* eslint-disable @typescript-eslint/no-unsafe-argument */
        /**
         * Optimized WebGL Context Wrapper
         *
         * @remarks
         * This class contains the subset of the WebGLRenderingContext & WebGL2RenderingContext
         * API that is used by the renderer. Select high volume WebGL methods include
         * caching optimizations to avoid making WebGL calls if the state is already set
         * to the desired value.
         *
         * While most methods contained are direct passthroughs to the WebGL context,
         * some methods combine multiple WebGL calls into one for convenience, modify
         * arguments to be more convenient, or are replaced by more specific methods.
         *
         * Not all methods are optimized. Only methods that are called frequently
         * and/or have a high cost are optimized.
         *
         * A subset of GLenum constants are also exposed as properties on this class
         * for convenience.
         */
        class WebGlContextWrapper {
          //#endregion WebGL Enums
          constructor(gl) {
            _defineProperty(this, "gl", void 0);
            //#region Cached WebGL State
            _defineProperty(this, "activeTextureUnit", 0);
            _defineProperty(this, "texture2dUnits", void 0);
            _defineProperty(this, "texture2dParams", new WeakMap());
            _defineProperty(this, "scissorEnabled", void 0);
            _defineProperty(this, "scissorX", void 0);
            _defineProperty(this, "scissorY", void 0);
            _defineProperty(this, "scissorWidth", void 0);
            _defineProperty(this, "scissorHeight", void 0);
            _defineProperty(this, "blendEnabled", void 0);
            _defineProperty(this, "blendSrcRgb", void 0);
            _defineProperty(this, "blendDstRgb", void 0);
            _defineProperty(this, "blendSrcAlpha", void 0);
            _defineProperty(this, "blendDstAlpha", void 0);
            _defineProperty(this, "boundArrayBuffer", void 0);
            _defineProperty(this, "boundElementArrayBuffer", void 0);
            _defineProperty(this, "curProgram", void 0);
            _defineProperty(this, "programUniforms", new WeakMap());
            //#endregion Cached WebGL State
            //#region Canvas
            _defineProperty(this, "canvas", void 0);
            //#endregion Canvas
            //#region WebGL Enums
            _defineProperty(this, "MAX_RENDERBUFFER_SIZE", void 0);
            _defineProperty(this, "MAX_TEXTURE_SIZE", void 0);
            _defineProperty(this, "MAX_VIEWPORT_DIMS", void 0);
            _defineProperty(this, "MAX_VERTEX_TEXTURE_IMAGE_UNITS", void 0);
            _defineProperty(this, "MAX_TEXTURE_IMAGE_UNITS", void 0);
            _defineProperty(this, "MAX_COMBINED_TEXTURE_IMAGE_UNITS", void 0);
            _defineProperty(this, "MAX_VERTEX_ATTRIBS", void 0);
            _defineProperty(this, "MAX_VARYING_VECTORS", void 0);
            _defineProperty(this, "MAX_VERTEX_UNIFORM_VECTORS", void 0);
            _defineProperty(this, "MAX_FRAGMENT_UNIFORM_VECTORS", void 0);
            _defineProperty(this, "TEXTURE_MAG_FILTER", void 0);
            _defineProperty(this, "TEXTURE_MIN_FILTER", void 0);
            _defineProperty(this, "TEXTURE_WRAP_S", void 0);
            _defineProperty(this, "TEXTURE_WRAP_T", void 0);
            _defineProperty(this, "LINEAR", void 0);
            _defineProperty(this, "CLAMP_TO_EDGE", void 0);
            _defineProperty(this, "RGBA", void 0);
            _defineProperty(this, "UNSIGNED_BYTE", void 0);
            _defineProperty(this, "UNPACK_PREMULTIPLY_ALPHA_WEBGL", void 0);
            _defineProperty(this, "UNPACK_FLIP_Y_WEBGL", void 0);
            _defineProperty(this, "FLOAT", void 0);
            _defineProperty(this, "TRIANGLES", void 0);
            _defineProperty(this, "UNSIGNED_SHORT", void 0);
            _defineProperty(this, "ONE", void 0);
            _defineProperty(this, "ONE_MINUS_SRC_ALPHA", void 0);
            _defineProperty(this, "VERTEX_SHADER", void 0);
            _defineProperty(this, "FRAGMENT_SHADER", void 0);
            _defineProperty(this, "STATIC_DRAW", void 0);
            _defineProperty(this, "COMPILE_STATUS", void 0);
            _defineProperty(this, "LINK_STATUS", void 0);
            _defineProperty(this, "DYNAMIC_DRAW", void 0);
            _defineProperty(this, "COLOR_ATTACHMENT0", void 0);
            this.gl = gl;
            // The following code extracts the current state of the WebGL context
            // to our local JavaScript cached version of it. This is so we can
            // avoid making WebGL calls if we don't need to.
            // We could assume that the WebGL context is in a default state, but
            // in the future we may want to support restoring a broken WebGL context
            // and this will help with that.
            this.activeTextureUnit = gl.getParameter(gl.ACTIVE_TEXTURE) - gl.TEXTURE0;
            var maxTextureUnits = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
            // save current texture units
            this.texture2dUnits = new Array(maxTextureUnits).fill(undefined).map((_, i) => {
              this.activeTexture(i);
              return gl.getParameter(gl.TEXTURE_BINDING_2D);
            });
            // restore active texture unit
            this.activeTexture(this.activeTextureUnit);
            this.scissorEnabled = gl.isEnabled(gl.SCISSOR_TEST);
            var scissorBox = gl.getParameter(gl.SCISSOR_BOX);
            this.scissorX = scissorBox[0];
            this.scissorY = scissorBox[1];
            this.scissorWidth = scissorBox[2];
            this.scissorHeight = scissorBox[3];
            this.blendEnabled = gl.isEnabled(gl.BLEND);
            this.blendSrcRgb = gl.getParameter(gl.BLEND_SRC_RGB);
            this.blendDstRgb = gl.getParameter(gl.BLEND_DST_RGB);
            this.blendSrcAlpha = gl.getParameter(gl.BLEND_SRC_ALPHA);
            this.blendDstAlpha = gl.getParameter(gl.BLEND_DST_ALPHA);
            this.boundArrayBuffer = gl.getParameter(gl.ARRAY_BUFFER_BINDING);
            this.boundElementArrayBuffer = gl.getParameter(gl.ELEMENT_ARRAY_BUFFER_BINDING);
            this.curProgram = gl.getParameter(gl.CURRENT_PROGRAM);
            this.canvas = gl.canvas;
            // Extract GLenums
            this.MAX_RENDERBUFFER_SIZE = gl.MAX_RENDERBUFFER_SIZE;
            this.MAX_TEXTURE_SIZE = gl.MAX_TEXTURE_SIZE;
            this.MAX_VIEWPORT_DIMS = gl.MAX_VIEWPORT_DIMS;
            this.MAX_VERTEX_TEXTURE_IMAGE_UNITS = gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS;
            this.MAX_TEXTURE_IMAGE_UNITS = gl.MAX_TEXTURE_IMAGE_UNITS;
            this.MAX_COMBINED_TEXTURE_IMAGE_UNITS = gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS;
            this.MAX_VERTEX_ATTRIBS = gl.MAX_VERTEX_ATTRIBS;
            this.MAX_VARYING_VECTORS = gl.MAX_VARYING_VECTORS;
            this.MAX_VERTEX_UNIFORM_VECTORS = gl.MAX_VERTEX_UNIFORM_VECTORS;
            this.MAX_FRAGMENT_UNIFORM_VECTORS = gl.MAX_FRAGMENT_UNIFORM_VECTORS;
            this.TEXTURE_MAG_FILTER = gl.TEXTURE_MAG_FILTER;
            this.TEXTURE_MIN_FILTER = gl.TEXTURE_MIN_FILTER;
            this.TEXTURE_WRAP_S = gl.TEXTURE_WRAP_S;
            this.TEXTURE_WRAP_T = gl.TEXTURE_WRAP_T;
            this.LINEAR = gl.LINEAR;
            this.CLAMP_TO_EDGE = gl.CLAMP_TO_EDGE;
            this.RGBA = gl.RGBA;
            this.UNSIGNED_BYTE = gl.UNSIGNED_BYTE;
            this.UNPACK_PREMULTIPLY_ALPHA_WEBGL = gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL;
            this.UNPACK_FLIP_Y_WEBGL = gl.UNPACK_FLIP_Y_WEBGL;
            this.FLOAT = gl.FLOAT;
            this.TRIANGLES = gl.TRIANGLES;
            this.UNSIGNED_SHORT = gl.UNSIGNED_SHORT;
            this.ONE = gl.ONE;
            this.ONE_MINUS_SRC_ALPHA = gl.ONE_MINUS_SRC_ALPHA;
            this.MAX_VERTEX_TEXTURE_IMAGE_UNITS = gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS;
            this.TRIANGLES = gl.TRIANGLES;
            this.UNSIGNED_SHORT = gl.UNSIGNED_SHORT;
            this.VERTEX_SHADER = gl.VERTEX_SHADER;
            this.FRAGMENT_SHADER = gl.FRAGMENT_SHADER;
            this.STATIC_DRAW = gl.STATIC_DRAW;
            this.COMPILE_STATUS = gl.COMPILE_STATUS;
            this.LINK_STATUS = gl.LINK_STATUS;
            this.DYNAMIC_DRAW = gl.DYNAMIC_DRAW;
            this.COLOR_ATTACHMENT0 = gl.COLOR_ATTACHMENT0;
          }
          /**
           * Returns true if the WebGL context is WebGL2
           *
           * @returns
           */
          isWebGl2() {
            return isWebGl2(this.gl);
          }
          /**
           * ```
           * gl.activeTexture(textureUnit + gl.TEXTURE0);
           * ```
           *
           * @remarks
           * **WebGL Difference**: `textureUnit` is based from 0, not `gl.TEXTURE0`.
           *
           * @param textureUnit
           */
          activeTexture(textureUnit) {
            var gl = this.gl;
            if (this.activeTextureUnit !== textureUnit) {
              gl.activeTexture(textureUnit + gl.TEXTURE0);
              this.activeTextureUnit = textureUnit;
            }
          }
          /**
           * ```
           * gl.bindTexture(gl.TEXTURE_2D, texture);
           * ```
           * @remarks
           * **WebGL Difference**: Bind target is always `gl.TEXTURE_2D`
           *
           * @param texture
           */
          bindTexture(texture) {
            var gl = this.gl,
              activeTextureUnit = this.activeTextureUnit,
              texture2dUnits = this.texture2dUnits;
            if (texture2dUnits[activeTextureUnit] === texture) {
              return;
            }
            texture2dUnits[activeTextureUnit] = texture;
            gl.bindTexture(this.gl.TEXTURE_2D, texture);
          }
          _getActiveTexture() {
            var activeTextureUnit = this.activeTextureUnit,
              texture2dUnits = this.texture2dUnits;
            return texture2dUnits[activeTextureUnit];
          }
          /**
           * ```
           * gl.texParameteri(gl.TEXTURE_2D, pname, param);
           * ```
           * @remarks
           * **WebGL Difference**: Bind target is always `gl.TEXTURE_2D`
           *
           * @param pname
           * @param param
           * @returns
           */
          texParameteri(pname, param) {
            var gl = this.gl,
              texture2dParams = this.texture2dParams;
            var activeTexture = this._getActiveTexture();
            if (!activeTexture) {
              throw new Error('No active texture');
            }
            var textureParams = texture2dParams.get(activeTexture);
            if (!textureParams) {
              textureParams = {};
              texture2dParams.set(activeTexture, textureParams);
            }
            if (textureParams[pname] === param) {
              return;
            }
            textureParams[pname] = param;
            gl.texParameteri(gl.TEXTURE_2D, pname, param);
          }
          texImage2D(level, internalFormat, widthOrFormat, heightOrType, borderOrSource, format, type, pixels) {
            var gl = this.gl;
            if (format) {
              gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, widthOrFormat, heightOrType, borderOrSource, format, type, pixels);
            } else {
              gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, widthOrFormat, heightOrType, borderOrSource);
            }
          }
          /**
           * ```
           * gl.compressedTexImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, border, data);
           * ```
           *
           * @remarks
           * **WebGL Difference**: Bind target is always `gl.TEXTURE_2D`
           */
          compressedTexImage2D(level, internalformat, width, height, border, data) {
            var gl = this.gl;
            gl.compressedTexImage2D(gl.TEXTURE_2D, level, internalformat, width, height, border, data);
          }
          /**
           * ```
           * gl.pixelStorei(pname, param);
           * ```
           *
           * @param pname
           * @param param
           */
          pixelStorei(pname, param) {
            var gl = this.gl;
            gl.pixelStorei(pname, param);
          }
          /**
           * ```
           * gl.generateMipmap(gl.TEXTURE_2D);
           * ```
           *
           * @remarks
           * **WebGL Difference**: Bind target is always `gl.TEXTURE_2D`
           */
          generateMipmap() {
            var gl = this.gl;
            gl.generateMipmap(gl.TEXTURE_2D);
          }
          /**
           * ```
           * gl.createTexture();
           * ```
           *
           * @returns
           */
          createTexture() {
            var gl = this.gl;
            return gl.createTexture();
          }
          /**
           * ```
           * gl.deleteTexture(texture);
           * ```
           *
           * @param texture
           */
          deleteTexture(texture) {
            var gl = this.gl;
            if (texture) {
              this.texture2dParams.delete(texture);
            }
            gl.deleteTexture(texture);
          }
          /**
           * ```
           * gl.viewport(x, y, width, height);
           * ```
           */
          viewport(x, y, width, height) {
            var gl = this.gl;
            gl.viewport(x, y, width, height);
          }
          /**
           * ```
           * gl.clearColor(red, green, blue, alpha);
           * ```
           *
           * @param red
           * @param green
           * @param blue
           * @param alpha
           */
          clearColor(red, green, blue, alpha) {
            var gl = this.gl;
            gl.clearColor(red, green, blue, alpha);
          }
          /**
           * ```
           * gl["enable"|"disable"](gl.SCISSOR_TEST);
           * ```
           * @param enable
           */
          setScissorTest(enable) {
            var gl = this.gl,
              scissorEnabled = this.scissorEnabled;
            if (enable === scissorEnabled) {
              return;
            }
            if (enable) {
              gl.enable(gl.SCISSOR_TEST);
            } else {
              gl.disable(gl.SCISSOR_TEST);
            }
            this.scissorEnabled = enable;
          }
          /**
           * ```
           * gl.scissor(x, y, width, height);
           * ```
           *
           * @param x
           * @param y
           * @param width
           * @param height
           */
          scissor(x, y, width, height) {
            var gl = this.gl,
              scissorX = this.scissorX,
              scissorY = this.scissorY,
              scissorWidth = this.scissorWidth,
              scissorHeight = this.scissorHeight;
            if (x !== scissorX || y !== scissorY || width !== scissorWidth || height !== scissorHeight) {
              gl.scissor(x, y, width, height);
              this.scissorX = x;
              this.scissorY = y;
              this.scissorWidth = width;
              this.scissorHeight = height;
            }
          }
          /**
           * ```
           * gl["enable"|"disable"](gl.BLEND);
           * ```
           *
           * @param blend
           * @returns
           */
          setBlend(blend) {
            var gl = this.gl,
              blendEnabled = this.blendEnabled;
            if (blend === blendEnabled) {
              return;
            }
            if (blend) {
              gl.enable(gl.BLEND);
            } else {
              gl.disable(gl.BLEND);
            }
            this.blendEnabled = blend;
          }
          /**
           * ```
           * gl.blendFunc(src, dst);
           * ```
           *
           * @param src
           * @param dst
           */
          blendFunc(src, dst) {
            var gl = this.gl,
              blendSrcRgb = this.blendSrcRgb,
              blendDstRgb = this.blendDstRgb,
              blendSrcAlpha = this.blendSrcAlpha,
              blendDstAlpha = this.blendDstAlpha;
            if (src !== blendSrcRgb || dst !== blendDstRgb || src !== blendSrcAlpha || dst !== blendDstAlpha) {
              gl.blendFunc(src, dst);
              this.blendSrcRgb = src;
              this.blendDstRgb = dst;
              this.blendSrcAlpha = src;
              this.blendDstAlpha = dst;
            }
          }
          /**
           * ```
           * gl.createBuffer();
           * ```
           *
           * @returns
           */
          createBuffer() {
            var gl = this.gl;
            return gl.createBuffer();
          }
          /**
           * ```
           * gl.createFramebuffer();
           * ```
           * @returns
           */
          createFramebuffer() {
            var gl = this.gl;
            return gl.createFramebuffer();
          }
          /**
           * ```
           * gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
           * ```
           *
           * @param framebuffer
           */
          bindFramebuffer(framebuffer) {
            var gl = this.gl;
            gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
          }
          /**
           * ```
           * gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
           * ```
           * @remarks
           * **WebGL Difference**: Bind target is always `gl.FRAMEBUFFER` and textarget is always `gl.TEXTURE_2D`
           */
          framebufferTexture2D(attachment, texture, level) {
            var gl = this.gl;
            gl.framebufferTexture2D(gl.FRAMEBUFFER, attachment, gl.TEXTURE_2D, texture, level);
          }
          /**
           * ```
           * gl.clear(gl.COLOR_BUFFER_BIT);
           * ```
           *
           * @remarks
           * **WebGL Difference**: Clear mask is always `gl.COLOR_BUFFER_BIT`
           */
          clear() {
            var gl = this.gl;
            gl.clear(gl.COLOR_BUFFER_BIT);
          }
          /**
           * ```
           * gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
           * gl.bufferData(gl.ARRAY_BUFFER, data, usage);
           * ```
           *
           * @remarks
           * **WebGL Combo**: `gl.bindBuffer` and `gl.bufferData` are combined into one function.
           *
           * @param buffer
           * @param data
           * @param usage
           */
          arrayBufferData(buffer, data, usage) {
            var gl = this.gl,
              boundArrayBuffer = this.boundArrayBuffer;
            if (boundArrayBuffer !== buffer) {
              gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
              this.boundArrayBuffer = buffer;
            }
            gl.bufferData(gl.ARRAY_BUFFER, data, usage);
          }
          /**
           * ```
           * gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
           * gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, usage);
           * ```
           * @remarks
           * **WebGL Combo**: `gl.bindBuffer` and `gl.bufferData` are combined into one function.
           *
           * @param buffer
           * @param data
           * @param usage
           */
          elementArrayBufferData(buffer, data, usage) {
            var gl = this.gl,
              boundElementArrayBuffer = this.boundElementArrayBuffer;
            if (boundElementArrayBuffer !== buffer) {
              gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
              this.boundElementArrayBuffer = buffer;
            }
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, usage);
          }
          /**
           * ```
           * gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
           * gl.vertexAttribPointer(index, size, type, normalized, stride, offset);
           * ```
           *
           * @remarks
           * **WebGL Combo**: `gl.bindBuffer` and `gl.vertexAttribPointer` are combined into one function.
           *
           * @param buffer
           * @param index
           * @param size
           * @param type
           * @param normalized
           * @param stride
           * @param offset
           */
          vertexAttribPointer(buffer, index, size, type, normalized, stride, offset) {
            var gl = this.gl,
              boundArrayBuffer = this.boundArrayBuffer;
            if (boundArrayBuffer !== buffer) {
              gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
              this.boundArrayBuffer = buffer;
            }
            gl.vertexAttribPointer(index, size, type, normalized, stride, offset);
          }
          /**
           * ```
           * gl.useProgram(program);
           * ```
           *
           * @param program
           * @returns
           */
          useProgram(program) {
            var gl = this.gl,
              curProgram = this.curProgram;
            if (curProgram === program) {
              return;
            }
            gl.useProgram(program);
            this.curProgram = program;
          }
          setUniform(type, location, ...args) {
            var gl = this.gl,
              programUniforms = this.programUniforms;
            var uniforms = programUniforms.get(this.curProgram);
            if (!uniforms) {
              uniforms = new Map();
              programUniforms.set(this.curProgram, uniforms);
            }
            var uniformArgs = uniforms.get(location);
            if (!uniformArgs || !compareArrays(uniformArgs, args)) {
              uniforms.set(location, args);
              gl[type](location, ...args);
            }
          }
          /**
           * ```
           * gl.getParameter(pname);
           * ```
           *
           * @param pname
           * @returns
           */
          getParameter(pname) {
            var gl = this.gl;
            return gl.getParameter(pname);
          }
          /**
           * ```
           * gl.drawElements(mode, count, type, offset);
           * ```
           *
           * @param mode
           * @param count
           * @param type
           * @param offset
           */
          drawElements(mode, count, type, offset) {
            var gl = this.gl;
            gl.drawElements(mode, count, type, offset);
          }
          /**
           * ```
           * gl.drawArrays(mode, first, count);
           * ```
           *
           * @param name
           * @returns
           */
          getExtension(name) {
            var gl = this.gl;
            return gl.getExtension(name);
          }
          /**
           * ```
           * gl.createVertexArray();
           * ```
           *
           * @returns
           */
          createVertexArray() {
            var gl = this.gl;
            assertTruthy(gl instanceof WebGL2RenderingContext);
            return gl.createVertexArray();
          }
          /**
           * ```
           * gl.bindVertexArray(vertexArray);
           * ```
           *
           * @param vertexArray
           */
          bindVertexArray(vertexArray) {
            var gl = this.gl;
            assertTruthy(gl instanceof WebGL2RenderingContext);
            gl.bindVertexArray(vertexArray);
          }
          /**
           * ```
           * gl.getAttribLocation(program, name);
           * ```
           *
           * @param program
           * @param name
           * @returns
           */
          getAttribLocation(program, name) {
            var gl = this.gl;
            return gl.getAttribLocation(program, name);
          }
          /**
           * ```
           * gl.getUniformLocation(program, name);
           * ```
           *
           * @param program
           * @param name
           * @returns
           */
          getUniformLocation(program, name) {
            var gl = this.gl;
            return gl.getUniformLocation(program, name);
          }
          /**
           * ```
           * gl.enableVertexAttribArray(index);
           * ```
           *
           * @param index
           */
          enableVertexAttribArray(index) {
            var gl = this.gl;
            gl.enableVertexAttribArray(index);
          }
          /**
           * ```
           * gl.disableVertexAttribArray(index);
           * ```
           *
           * @param index
           */
          disableVertexAttribArray(index) {
            var gl = this.gl;
            gl.disableVertexAttribArray(index);
          }
          /**
           * ```
           * gl.createShader(type);
           * ```
           *
           * @param type
           * @returns
           */
          createShader(type) {
            var gl = this.gl;
            return gl.createShader(type);
          }
          /**
           * ```
           * gl.compileShader(shader);
           * ```
           *
           * @param shader
           * @returns
           */
          compileShader(shader) {
            var gl = this.gl;
            gl.compileShader(shader);
          }
          /**
           * ```
           * gl.attachShader(program, shader);
           * ```
           *
           * @param program
           * @param shader
           */
          attachShader(program, shader) {
            var gl = this.gl;
            gl.attachShader(program, shader);
          }
          /**
           * ```
           * gl.linkProgram(program);
           * ```
           *
           * @param program
           */
          linkProgram(program) {
            var gl = this.gl;
            gl.linkProgram(program);
          }
          /**
           * ```
           * gl.deleteProgram(shader);
           * ```
           *
           * @param shader
           */
          deleteProgram(shader) {
            var gl = this.gl;
            gl.deleteProgram(shader);
          }
          /**
           * ```
           * gl.getShaderParameter(shader, pname);
           * ```
           *
           * @param shader
           * @param pname
           */
          getShaderParameter(shader, pname) {
            var gl = this.gl;
            return gl.getShaderParameter(shader, pname);
          }
          /**
           * ```
           * gl.getShaderInfoLog(shader);
           * ```
           *
           * @param shader
           */
          getShaderInfoLog(shader) {
            var gl = this.gl;
            return gl.getShaderInfoLog(shader);
          }
          /**
           * ```
           * gl.createProgram();
           * ```
           *
           * @returns
           */
          createProgram() {
            var gl = this.gl;
            return gl.createProgram();
          }
          /**
           * ```
           * gl.getProgramParameter(program, pname);
           * ```
           *
           * @param program
           * @param pname
           * @returns
           */
          getProgramParameter(program, pname) {
            var gl = this.gl;
            return gl.getProgramParameter(program, pname);
          }
          /**
           * ```
           * gl.getProgramInfoLog(program);
           * ```
           *
           * @param program
           * @returns
           */
          getProgramInfoLog(program) {
            var gl = this.gl;
            return gl.getProgramInfoLog(program);
          }
          /**
           * ```
           * gl.shaderSource(shader, source);
           * ```
           *
           * @param shader
           * @param source
           */
          shaderSource(shader, source) {
            var gl = this.gl;
            gl.shaderSource(shader, source);
          }
          /**
           * ```
           * gl.deleteShader(shader);
           * ```
           *
           * @param shader
           */
          deleteShader(shader) {
            var gl = this.gl;
            gl.deleteShader(shader);
          }
        }
        /**
         * Compare two arrays for equality.
         *
         * @remarks
         * This function will not try to compare nested arrays or Float32Arrays and
         * instead will always return false when they are encountered.
         *
         * @param a
         * @param b
         * @returns
         */
        function compareArrays(a, b) {
          if (a.length !== b.length) {
            return false;
          }
          return a.every((v, i) => {
            // Don't bother to compare nested arrays or Float32Arrays
            if (Array.isArray(v) || v instanceof Float32Array) {
              return false;
            } else {
              return v === b[i];
            }
          });
        }

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2024 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        class WebGlCoreCtxRenderTexture extends WebGlCoreCtxTexture {
          constructor(glw, memManager, textureSource) {
            super(glw, memManager, textureSource);
            // Create Framebuffer object
            _defineProperty(this, "framebuffer", void 0);
            var framebuffer = glw.createFramebuffer();
            assertTruthy(framebuffer, 'Unable to create framebuffer');
            this.framebuffer = framebuffer;
          }
          onLoadRequest() {
            var _this10 = this;
            return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12() {
              var glw, nativeTexture, _this10$textureSource, width, height;
              return _regeneratorRuntime().wrap(function _callee12$(_context12) {
                while (1) switch (_context12.prev = _context12.next) {
                  case 0:
                    glw = _this10.glw;
                    nativeTexture = _this10._nativeCtxTexture = _this10.createNativeCtxTexture();
                    _this10$textureSource = _this10.textureSource, width = _this10$textureSource.width, height = _this10$textureSource.height; // Set the dimensions of the render texture
                    glw.texImage2D(0, glw.RGBA, width, height, 0, glw.RGBA, glw.UNSIGNED_BYTE, null);
                    // Update the texture memory manager
                    _this10.setTextureMemUse(width * height * 4);
                    // Bind the framebuffer
                    glw.bindFramebuffer(_this10.framebuffer);
                    // Attach the texture to the framebuffer
                    glw.framebufferTexture2D(glw.COLOR_ATTACHMENT0, nativeTexture, 0);
                    // Unbind the framebuffer
                    glw.bindFramebuffer(null);
                    return _context12.abrupt("return", {
                      width,
                      height
                    });
                  case 9:
                  case "end":
                    return _context12.stop();
                }
              }, _callee12);
            }))();
          }
        }

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        var WORDS_PER_QUAD = 24;
        class WebGlCoreRenderer extends CoreRenderer {
          constructor(options) {
            super(options);
            //// WebGL Native Context and Data
            _defineProperty(this, "glw", void 0);
            _defineProperty(this, "system", void 0);
            //// Persistent data
            _defineProperty(this, "quadBuffer", void 0);
            _defineProperty(this, "fQuadBuffer", void 0);
            _defineProperty(this, "uiQuadBuffer", void 0);
            _defineProperty(this, "renderOps", []);
            //// Render Op / Buffer Filling State
            _defineProperty(this, "curBufferIdx", 0);
            _defineProperty(this, "curRenderOp", null);
            _defineProperty(this, "rttNodes", []);
            _defineProperty(this, "activeRttNode", null);
            //// Default Shader
            _defineProperty(this, "defShaderCtrl", void 0);
            _defineProperty(this, "defaultShader", void 0);
            _defineProperty(this, "quadBufferCollection", void 0);
            /**
             * White pixel texture used by default when no texture is specified.
             */
            _defineProperty(this, "defaultTexture", void 0);
            _defineProperty(this, "quadBufferUsage", 0);
            /**
             * Whether the renderer is currently rendering to a texture.
             */
            _defineProperty(this, "renderToTextureActive", false);
            this.quadBuffer = new ArrayBuffer(this.stage.options.quadBufferSize);
            this.fQuadBuffer = new Float32Array(this.quadBuffer);
            this.uiQuadBuffer = new Uint32Array(this.quadBuffer);
            this.mode = 'webgl';
            var canvas = options.canvas,
              clearColor = options.clearColor,
              bufferMemory = options.bufferMemory;
            this.defaultTexture = new ColorTexture(this.txManager);
            // Mark the default texture as ALWAYS renderable
            // This prevents it from ever being cleaned up.
            // Fixes https://github.com/lightning-js/renderer/issues/262
            this.defaultTexture.setRenderableOwner(this, true);
            // When the default texture is loaded, request a render in case the
            // RAF is paused. Fixes: https://github.com/lightning-js/renderer/issues/123
            this.defaultTexture.once('loaded', () => {
              this.stage.requestRender();
            });
            var gl = createWebGLContext(canvas, options.contextSpy);
            var glw = this.glw = new WebGlContextWrapper(gl);
            var color = getNormalizedRgbaComponents(clearColor);
            glw.viewport(0, 0, canvas.width, canvas.height);
            glw.clearColor(color[0], color[1], color[2], color[3]);
            glw.setBlend(true);
            glw.blendFunc(glw.ONE, glw.ONE_MINUS_SRC_ALPHA);
            createIndexBuffer(glw, bufferMemory);
            this.system = {
              parameters: getWebGlParameters(this.glw),
              extensions: getWebGlExtensions(this.glw)
            };
            this.shManager.renderer = this;
            this.defShaderCtrl = this.shManager.loadShader('DefaultShader');
            this.defaultShader = this.defShaderCtrl.shader;
            var quadBuffer = glw.createBuffer();
            assertTruthy(quadBuffer);
            var stride = 6 * Float32Array.BYTES_PER_ELEMENT;
            this.quadBufferCollection = new BufferCollection([{
              buffer: quadBuffer,
              attributes: {
                a_position: {
                  name: 'a_position',
                  size: 2,
                  type: glw.FLOAT,
                  normalized: false,
                  stride,
                  offset: 0 // start at the beginning of the buffer
                },
                a_textureCoordinate: {
                  name: 'a_textureCoordinate',
                  size: 2,
                  type: glw.FLOAT,
                  normalized: false,
                  stride,
                  offset: 2 * Float32Array.BYTES_PER_ELEMENT
                },
                a_color: {
                  name: 'a_color',
                  size: 4,
                  type: glw.UNSIGNED_BYTE,
                  normalized: true,
                  stride,
                  offset: 4 * Float32Array.BYTES_PER_ELEMENT
                },
                a_textureIndex: {
                  name: 'a_textureIndex',
                  size: 1,
                  type: glw.FLOAT,
                  normalized: false,
                  stride,
                  offset: 5 * Float32Array.BYTES_PER_ELEMENT
                }
              }
            }]);
          }
          reset() {
            var glw = this.glw;
            this.curBufferIdx = 0;
            this.curRenderOp = null;
            this.renderOps.length = 0;
            glw.setScissorTest(false);
            glw.clear();
          }
          getShaderManager() {
            return this.shManager;
          }
          createCtxTexture(textureSource) {
            if (textureSource instanceof SubTexture) {
              return new WebGlCoreCtxSubTexture(this.glw, this.txMemManager, textureSource);
            } else if (textureSource instanceof RenderTexture) {
              return new WebGlCoreCtxRenderTexture(this.glw, this.txMemManager, textureSource);
            }
            return new WebGlCoreCtxTexture(this.glw, this.txMemManager, textureSource);
          }
          /**
           * This function adds a quad (a rectangle composed of two triangles) to the WebGL rendering pipeline.
           *
           * It takes a set of options that define the quad's properties, such as its dimensions, colors, texture, shader, and transformation matrix.
           * The function first updates the shader properties with the current dimensions if necessary, then sets the default texture if none is provided.
           * It then checks if a new render operation is needed, based on the current shader and clipping rectangle.
           * If a new render operation is needed, it creates one and updates the current render operation.
           * The function then adjusts the texture coordinates based on the texture options and adds the texture to the texture manager.
           *
           * Finally, it calculates the vertices for the quad, taking into account any transformations, and adds them to the quad buffer.
           * The function updates the length and number of quads in the current render operation, and updates the current buffer index.
           */
          addQuad(params) {
            var _texture, _textureOptions$flipX, _textureOptions$flipY, _textureOptions$resiz;
            var fQuadBuffer = this.fQuadBuffer,
              uiQuadBuffer = this.uiQuadBuffer;
            var width = params.width,
              height = params.height,
              colorTl = params.colorTl,
              colorTr = params.colorTr,
              colorBl = params.colorBl,
              colorBr = params.colorBr,
              textureOptions = params.textureOptions,
              shader = params.shader,
              shaderProps = params.shaderProps,
              alpha = params.alpha,
              clippingRect = params.clippingRect,
              tx = params.tx,
              ty = params.ty,
              ta = params.ta,
              tb = params.tb,
              tc = params.tc,
              td = params.td,
              renderCoords = params.renderCoords,
              renderToTexture = params.rtt,
              parentHasRenderTexture = params.parentHasRenderTexture,
              framebufferDimensions = params.framebufferDimensions;
            var texture = params.texture;
            /**
             * If the shader props contain any automatic properties, update it with the
             * current dimensions that will be used to render the quad.
             */
            if (shaderProps && hasOwn(shaderProps, '$dimensions')) {
              var dimensions = shaderProps.$dimensions;
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              dimensions.width = width;
              dimensions.height = height;
            }
            texture = (_texture = texture) !== null && _texture !== void 0 ? _texture : this.defaultTexture;
            assertTruthy(texture instanceof Texture, 'Invalid texture type');
            var bufferIdx = this.curBufferIdx,
              curRenderOp = this.curRenderOp;
            var targetDims = {
              width,
              height
            };
            var targetShader = shader || this.defaultShader;
            assertTruthy(targetShader instanceof WebGlCoreShader);
            if (!this.reuseRenderOp(params)) {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
              this.newRenderOp(targetShader, shaderProps, alpha, targetDims, clippingRect, bufferIdx, renderToTexture, parentHasRenderTexture, framebufferDimensions);
              curRenderOp = this.curRenderOp;
              assertTruthy(curRenderOp);
            }
            var flipX = (_textureOptions$flipX = textureOptions === null || textureOptions === void 0 ? void 0 : textureOptions.flipX) !== null && _textureOptions$flipX !== void 0 ? _textureOptions$flipX : false;
            var flipY = (_textureOptions$flipY = textureOptions === null || textureOptions === void 0 ? void 0 : textureOptions.flipY) !== null && _textureOptions$flipY !== void 0 ? _textureOptions$flipY : false;
            // always flip flipY for render textures
            if (texture instanceof RenderTexture) {
              flipY = !flipY;
            }
            var texCoordX1 = 0;
            var texCoordY1 = 0;
            var texCoordX2 = 1;
            var texCoordY2 = 1;
            if (texture instanceof SubTexture) {
              var _texture$props = texture.props,
                _tx = _texture$props.x,
                _ty = _texture$props.y,
                tw = _texture$props.width,
                th = _texture$props.height;
              var _ref20 = texture.parentTexture.dimensions || {
                  width: 0,
                  height: 0
                },
                _ref20$width = _ref20.width,
                parentW = _ref20$width === void 0 ? 0 : _ref20$width,
                _ref20$height = _ref20.height,
                parentH = _ref20$height === void 0 ? 0 : _ref20$height;
              texCoordX1 = _tx / parentW;
              texCoordX2 = texCoordX1 + tw / parentW;
              texCoordY1 = _ty / parentH;
              texCoordY2 = texCoordY1 + th / parentH;
              texture = texture.parentTexture;
            }
            var resizeMode = (_textureOptions$resiz = textureOptions === null || textureOptions === void 0 ? void 0 : textureOptions.resizeMode) !== null && _textureOptions$resiz !== void 0 ? _textureOptions$resiz : false;
            if (texture instanceof ImageTexture) {
              if (resizeMode && texture.dimensions) {
                var _texture$dimensions2 = texture.dimensions,
                  _tw = _texture$dimensions2.width,
                  _th = _texture$dimensions2.height;
                if (resizeMode.type === 'cover') {
                  var scaleX = width / _tw;
                  var scaleY = height / _th;
                  var scale = Math.max(scaleX, scaleY);
                  var precision = 1 / scale;
                  // Determine based on width
                  if (scale && scaleX && scaleX < scale) {
                    var _resizeMode$clipX;
                    var desiredSize = precision * width;
                    texCoordX1 = (1 - desiredSize / _tw) * ((_resizeMode$clipX = resizeMode.clipX) !== null && _resizeMode$clipX !== void 0 ? _resizeMode$clipX : 0.5);
                    texCoordX2 = texCoordX1 + desiredSize / _tw;
                  }
                  // Determine based on height
                  if (scale && scaleY && scaleY < scale) {
                    var _resizeMode$clipY;
                    var _desiredSize = precision * height;
                    texCoordY1 = (1 - _desiredSize / _th) * ((_resizeMode$clipY = resizeMode.clipY) !== null && _resizeMode$clipY !== void 0 ? _resizeMode$clipY : 0.5);
                    texCoordY2 = texCoordY1 + _desiredSize / _th;
                  }
                }
              }
            }
            // Flip texture coordinates if dictated by texture options
            if (flipX) {
              var _ref21 = [texCoordX2, texCoordX1];
              texCoordX1 = _ref21[0];
              texCoordX2 = _ref21[1];
            }
            if (flipY) {
              var _ref22 = [texCoordY2, texCoordY1];
              texCoordY1 = _ref22[0];
              texCoordY2 = _ref22[1];
            }
            var ctxTexture = texture.ctxTexture;
            assertTruthy(ctxTexture instanceof WebGlCoreCtxTexture);
            var textureIdx = this.addTexture(ctxTexture, bufferIdx);
            curRenderOp = this.curRenderOp;
            assertTruthy(curRenderOp);
            if (renderCoords) {
              var x1 = renderCoords.x1,
                y1 = renderCoords.y1,
                x2 = renderCoords.x2,
                y2 = renderCoords.y2,
                x3 = renderCoords.x3,
                y3 = renderCoords.y3,
                x4 = renderCoords.x4,
                y4 = renderCoords.y4;
              // Upper-Left
              fQuadBuffer[bufferIdx++] = x1; // vertexX
              fQuadBuffer[bufferIdx++] = y1; // vertexY
              fQuadBuffer[bufferIdx++] = texCoordX1; // texCoordX
              fQuadBuffer[bufferIdx++] = texCoordY1; // texCoordY
              uiQuadBuffer[bufferIdx++] = colorTl; // color
              fQuadBuffer[bufferIdx++] = textureIdx; // texIndex
              // Upper-Right
              fQuadBuffer[bufferIdx++] = x2;
              fQuadBuffer[bufferIdx++] = y2;
              fQuadBuffer[bufferIdx++] = texCoordX2;
              fQuadBuffer[bufferIdx++] = texCoordY1;
              uiQuadBuffer[bufferIdx++] = colorTr;
              fQuadBuffer[bufferIdx++] = textureIdx;
              // Lower-Left
              fQuadBuffer[bufferIdx++] = x4;
              fQuadBuffer[bufferIdx++] = y4;
              fQuadBuffer[bufferIdx++] = texCoordX1;
              fQuadBuffer[bufferIdx++] = texCoordY2;
              uiQuadBuffer[bufferIdx++] = colorBl;
              fQuadBuffer[bufferIdx++] = textureIdx;
              // Lower-Right
              fQuadBuffer[bufferIdx++] = x3;
              fQuadBuffer[bufferIdx++] = y3;
              fQuadBuffer[bufferIdx++] = texCoordX2;
              fQuadBuffer[bufferIdx++] = texCoordY2;
              uiQuadBuffer[bufferIdx++] = colorBr;
              fQuadBuffer[bufferIdx++] = textureIdx;
            } else if (tb !== 0 || tc !== 0) {
              // Upper-Left
              fQuadBuffer[bufferIdx++] = tx; // vertexX
              fQuadBuffer[bufferIdx++] = ty; // vertexY
              fQuadBuffer[bufferIdx++] = texCoordX1; // texCoordX
              fQuadBuffer[bufferIdx++] = texCoordY1; // texCoordY
              uiQuadBuffer[bufferIdx++] = colorTl; // color
              fQuadBuffer[bufferIdx++] = textureIdx; // texIndex
              // Upper-Right
              fQuadBuffer[bufferIdx++] = tx + width * ta;
              fQuadBuffer[bufferIdx++] = ty + width * tc;
              fQuadBuffer[bufferIdx++] = texCoordX2;
              fQuadBuffer[bufferIdx++] = texCoordY1;
              uiQuadBuffer[bufferIdx++] = colorTr;
              fQuadBuffer[bufferIdx++] = textureIdx;
              // Lower-Left
              fQuadBuffer[bufferIdx++] = tx + height * tb;
              fQuadBuffer[bufferIdx++] = ty + height * td;
              fQuadBuffer[bufferIdx++] = texCoordX1;
              fQuadBuffer[bufferIdx++] = texCoordY2;
              uiQuadBuffer[bufferIdx++] = colorBl;
              fQuadBuffer[bufferIdx++] = textureIdx;
              // Lower-Right
              fQuadBuffer[bufferIdx++] = tx + width * ta + height * tb;
              fQuadBuffer[bufferIdx++] = ty + width * tc + height * td;
              fQuadBuffer[bufferIdx++] = texCoordX2;
              fQuadBuffer[bufferIdx++] = texCoordY2;
              uiQuadBuffer[bufferIdx++] = colorBr;
              fQuadBuffer[bufferIdx++] = textureIdx;
            } else {
              // Calculate the right corner of the quad
              // multiplied by the scale
              var rightCornerX = tx + width * ta;
              var rightCornerY = ty + height * td;
              // Upper-Left
              fQuadBuffer[bufferIdx++] = tx; // vertexX
              fQuadBuffer[bufferIdx++] = ty; // vertexY
              fQuadBuffer[bufferIdx++] = texCoordX1; // texCoordX
              fQuadBuffer[bufferIdx++] = texCoordY1; // texCoordY
              uiQuadBuffer[bufferIdx++] = colorTl; // color
              fQuadBuffer[bufferIdx++] = textureIdx; // texIndex
              // Upper-Right
              fQuadBuffer[bufferIdx++] = rightCornerX;
              fQuadBuffer[bufferIdx++] = ty;
              fQuadBuffer[bufferIdx++] = texCoordX2;
              fQuadBuffer[bufferIdx++] = texCoordY1;
              uiQuadBuffer[bufferIdx++] = colorTr;
              fQuadBuffer[bufferIdx++] = textureIdx;
              // Lower-Left
              fQuadBuffer[bufferIdx++] = tx;
              fQuadBuffer[bufferIdx++] = rightCornerY;
              fQuadBuffer[bufferIdx++] = texCoordX1;
              fQuadBuffer[bufferIdx++] = texCoordY2;
              uiQuadBuffer[bufferIdx++] = colorBl;
              fQuadBuffer[bufferIdx++] = textureIdx;
              // Lower-Right
              fQuadBuffer[bufferIdx++] = rightCornerX;
              fQuadBuffer[bufferIdx++] = rightCornerY;
              fQuadBuffer[bufferIdx++] = texCoordX2;
              fQuadBuffer[bufferIdx++] = texCoordY2;
              uiQuadBuffer[bufferIdx++] = colorBr;
              fQuadBuffer[bufferIdx++] = textureIdx;
            }
            // Update the length of the current render op
            curRenderOp.length += WORDS_PER_QUAD;
            curRenderOp.numQuads++;
            this.curBufferIdx = bufferIdx;
          }
          /**
           * Replace the existing RenderOp with a new one that uses the specified Shader
           * and starts at the specified buffer index.
           *
           * @param shader
           * @param bufferIdx
           */
          newRenderOp(shader, shaderProps, alpha, dimensions, clippingRect, bufferIdx, renderToTexture, parentHasRenderTexture, framebufferDimensions) {
            var curRenderOp = new WebGlCoreRenderOp(this.glw, this.options, this.quadBufferCollection, shader, shaderProps, alpha, clippingRect, dimensions, bufferIdx, 0,
            // Z-Index is only used for explictly added Render Ops
            renderToTexture, parentHasRenderTexture, framebufferDimensions);
            this.curRenderOp = curRenderOp;
            this.renderOps.push(curRenderOp);
          }
          /**
           * Add a texture to the current RenderOp. If the texture cannot be added to the
           * current RenderOp, a new RenderOp will be created and the texture will be added
           * to that one.
           *
           * If the texture cannot be added to the new RenderOp, an error will be thrown.
           *
           * @param texture
           * @param bufferIdx
           * @param recursive
           * @returns Assigned Texture Index of the texture in the render op
           */
          addTexture(texture, bufferIdx, recursive) {
            var curRenderOp = this.curRenderOp;
            assertTruthy(curRenderOp);
            var textureIdx = curRenderOp.addTexture(texture);
            // TODO: Refactor to be more DRY
            if (textureIdx === 0xffffffff) {
              if (recursive) {
                throw new Error('Unable to add texture to render op');
              }
              var shader = curRenderOp.shader,
                shaderProps = curRenderOp.shaderProps,
                dimensions = curRenderOp.dimensions,
                clippingRect = curRenderOp.clippingRect,
                alpha = curRenderOp.alpha;
              this.newRenderOp(shader, shaderProps, alpha, dimensions, clippingRect, bufferIdx);
              return this.addTexture(texture, bufferIdx, true);
            }
            return textureIdx;
          }
          /**
           * Test if the current Render operation can be reused for the specified parameters.
           * @param params
           * @returns
           */
          reuseRenderOp(params) {
            var _this$curRenderOp;
            var shader = params.shader,
              shaderProps = params.shaderProps,
              parentHasRenderTexture = params.parentHasRenderTexture,
              rtt = params.rtt,
              clippingRect = params.clippingRect;
            var targetShader = shader || this.defaultShader;
            // Switching shader program will require a new render operation
            if (((_this$curRenderOp = this.curRenderOp) === null || _this$curRenderOp === void 0 ? void 0 : _this$curRenderOp.shader) !== targetShader) {
              return false;
            }
            // Switching clipping rect will require a new render operation
            if (!compareRect(this.curRenderOp.clippingRect, clippingRect)) {
              return false;
            }
            // Force new render operation if rendering to texture
            // @todo: This needs to be improved, render operations could also be reused
            // for rendering to texture
            if (parentHasRenderTexture || rtt) {
              return false;
            }
            // Check if the shader can batch the shader properties
            if (this.curRenderOp.shader !== this.defaultShader && (!shaderProps || !this.curRenderOp.shader.canBatchShaderProps(this.curRenderOp.shaderProps, shaderProps))) {
              return false;
            }
            // Render operation can be reused
            return true;
          }
          /**
           * add RenderOp to the render pipeline
           */
          addRenderOp(renderable) {
            this.renderOps.push(renderable);
            this.curRenderOp = null;
          }
          /**
           * Render the current set of RenderOps to render to the specified surface.
           *
           * TODO: 'screen' is the only supported surface at the moment.
           *
           * @param surface
           */
          render(surface = 'screen') {
            var _this$quadBufferColle;
            var glw = this.glw,
              quadBuffer = this.quadBuffer;
            var arr = new Float32Array(quadBuffer, 0, this.curBufferIdx);
            var buffer = (_this$quadBufferColle = this.quadBufferCollection.getBuffer('a_position')) !== null && _this$quadBufferColle !== void 0 ? _this$quadBufferColle : null;
            glw.arrayBufferData(buffer, arr, glw.STATIC_DRAW);
            this.renderOps.forEach((renderOp, i) => {
              renderOp.draw();
            });
            this.quadBufferUsage = this.curBufferIdx * arr.BYTES_PER_ELEMENT;
          }
          renderToTexture(node) {
            for (var i = 0; i < this.rttNodes.length; i++) {
              if (this.rttNodes[i] === node) {
                return;
              }
            }
            // @todo: Better bottom up rendering order
            this.rttNodes.unshift(node);
          }
          renderRTTNodes() {
            var glw = this.glw;
            this.stage;
            // Render all associated RTT nodes to their textures
            for (var i = 0; i < this.rttNodes.length; i++) {
              var node = this.rttNodes[i];
              // Skip nodes that don't have RTT updates
              if (!node || !node.hasRTTupdates) {
                continue;
              }
              // Set the active RTT node to the current node
              // So we can prevent rendering children of nested RTT nodes
              this.activeRttNode = node;
              assertTruthy(node.texture, 'RTT node missing texture');
              var ctxTexture = node.texture.ctxTexture;
              assertTruthy(ctxTexture instanceof WebGlCoreCtxRenderTexture);
              this.renderToTextureActive = true;
              // Bind the the texture's framebuffer
              glw.bindFramebuffer(ctxTexture.framebuffer);
              glw.viewport(0, 0, ctxTexture.w, ctxTexture.h);
              glw.clear();
              // Render all associated quads to the texture
              for (var _i2 = 0; _i2 < node.children.length; _i2++) {
                var child = node.children[_i2];
                if (!child) {
                  continue;
                }
                child.update(this.stage.deltaTime, {
                  x: 0,
                  y: 0,
                  width: 0,
                  height: 0,
                  valid: false
                });
                this.stage.addQuads(child);
                child.hasRTTupdates = false;
              }
              // Render all associated quads to the texture
              this.render();
              // Reset render operations
              this.renderOps.length = 0;
              node.hasRTTupdates = false;
            }
            // Bind the default framebuffer
            glw.bindFramebuffer(null);
            glw.viewport(0, 0, this.glw.canvas.width, this.glw.canvas.height);
            this.renderToTextureActive = false;
          }
          removeRTTNode(node) {
            var index = this.rttNodes.indexOf(node);
            if (index === -1) {
              return;
            }
            this.rttNodes.splice(index, 1);
          }
          getBufferInfo() {
            var bufferInfo = {
              totalAvailable: this.stage.options.quadBufferSize,
              totalUsed: this.quadBufferUsage
            };
            return bufferInfo;
          }
          getDefShaderCtr() {
            return this.defShaderCtrl;
          }
        }

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        var SpecialCodepoints = {
          LINE_FEED: 0x0a,
          CARRIAGE_RETURN: 0x0d,
          SPACE: 0x20,
          TAB: 0x09,
          ZERO_WIDTH_SPACE: 0x200b,
          ZERO_WIDTH_NON_JOINER: 0x200c,
          ZERO_WIDTH_JOINER: 0x200d,
          LEFT_TO_RIGHT_MARK: 0x200e,
          RIGHT_TO_LEFT_MARK: 0x200f,
          LEFT_TO_RIGHT_EMBEDDING: 0x202a,
          RIGHT_TO_LEFT_EMBEDDING: 0x202b,
          POP_DIRECTIONAL_FORMATTING: 0x202c,
          LEFT_TO_RIGHT_OVERRIDE: 0x202d,
          RIGHT_TO_LEFT_OVERRIDE: 0x202e,
          LINE_SEPARATOR: 0x2028,
          PARAGRAPH_SEPARATOR: 0x2029,
          OBJECT_REPLACEMENT_CHARACTER: 0xfffc,
          REPLACEMENT_CHARACTER: 0xfffd,
          ZERO_WIDTH_NO_BREAK_SPACE: 0xfeff,
          LEFT_TO_RIGHT_ISOLATE: 0x2066,
          RIGHT_TO_LEFT_ISOLATE: 0x2067,
          FIRST_STRONG_ISOLATE: 0x2068,
          POP_DIRECTIONAL_ISOLATE: 0x2069,
          INHIBIT_SYMMETRIC_SWAPPING: 0x206a,
          ACTIVATE_SYMMETRIC_SWAPPING: 0x206b,
          INHIBIT_ARABIC_FORM_SHAPING: 0x206c,
          ACTIVATE_ARABIC_FORM_SHAPING: 0x206d,
          NATIONAL_DIGIT_SHAPES: 0x206e,
          NOMINAL_DIGIT_SHAPES: 0x206f,
          LEFT_TO_RIGHT_BOUNDARY: 0x200e,
          RIGHT_TO_LEFT_BOUNDARY: 0x200f
        };

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        class FontShaper {}

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        class SdfFontShaper extends FontShaper {
          constructor(data, glyphMap) {
            super();
            _defineProperty(this, "data", void 0);
            _defineProperty(this, "glyphMap", void 0);
            _defineProperty(this, "kernings", void 0);
            this.data = data;
            this.glyphMap = glyphMap;
            var kernings = this.kernings = {};
            data.kernings.forEach(kerning => {
              var second = kerning.second;
              var firsts = kernings[second] = kernings[second] || {};
              firsts[kerning.first] = kerning.amount;
            });
            this.kernings = kernings;
          }
          shapeText(props, codepoints) {
            var _this11 = this;
            return /*#__PURE__*/_regeneratorRuntime().mark(function _callee13() {
              var codepointResult, lastGlyphId, codepoint, glyph, _this11$kernings$glyp, kerning;
              return _regeneratorRuntime().wrap(function _callee13$(_context13) {
                while (1) switch (_context13.prev = _context13.next) {
                  case 0:
                    lastGlyphId = undefined;
                  case 1:
                    if (!((codepointResult = codepoints.peek()) && !codepointResult.done)) {
                      _context13.next = 17;
                      break;
                    }
                    codepoint = codepointResult.value;
                    glyph = _this11.glyphMap.get(codepoint);
                    codepoints.next();
                    if (!(glyph !== undefined)) {
                      _context13.next = 12;
                      break;
                    }
                    // We found a glyph for this codepoint
                    // Yield the mapped glyph info
                    /**
                     * Kerning includes any possible additional letter spacing
                     */
                    kerning = lastGlyphId !== undefined ? (((_this11$kernings$glyp = _this11.kernings[glyph.id]) === null || _this11$kernings$glyp === void 0 ? void 0 : _this11$kernings$glyp[lastGlyphId]) || 0) + props.letterSpacing : 0;
                    lastGlyphId = glyph.id;
                    _context13.next = 10;
                    return {
                      mapped: true,
                      glyphId: glyph.id,
                      codepoint,
                      cluster: codepoints.lastIndex,
                      xAdvance: glyph.xadvance + kerning,
                      yAdvance: 0,
                      xOffset: glyph.xoffset + kerning,
                      yOffset: glyph.yoffset,
                      xBearing: 0,
                      yBearing: 0,
                      width: glyph.width,
                      height: glyph.height
                    };
                  case 10:
                    _context13.next = 15;
                    break;
                  case 12:
                    // We didn't find a glyph for this codepoint
                    // Yield the unmapped codepoint info
                    // If this codepoint is a linebreak, we should reset the last glyph id
                    // so that the next glyph will not be kerned with the last glyph of the
                    // previous line.
                    if (codepoint === SpecialCodepoints.LINE_FEED) {
                      lastGlyphId = undefined;
                    }
                    _context13.next = 15;
                    return {
                      mapped: false,
                      codepoint,
                      cluster: codepoints.lastIndex
                    };
                  case 15:
                    _context13.next = 1;
                    break;
                  case 17:
                  case "end":
                    return _context13.stop();
                }
              }, _callee13);
            })();
          }
        }

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        // import type { Renderer } from '../../../Renderer';
        class SdfTrFontFace extends TrFontFace {
          constructor(type, options) {
            var _this12;
            super(options);
            _this12 = this;
            _defineProperty(this, "type", void 0);
            _defineProperty(this, "texture", void 0);
            /**
             * Height of the tallest character in the font including the whitespace above it
             * in SDF/vertex units.
             */
            _defineProperty(this, "maxCharHeight", 0);
            _defineProperty(this, "data", void 0);
            _defineProperty(this, "shaper", void 0);
            _defineProperty(this, "glyphMap", new Map());
            var atlasUrl = options.atlasUrl,
              atlasDataUrl = options.atlasDataUrl,
              stage = options.stage;
            this.type = type;
            var renderer = stage.renderer;
            assertTruthy(renderer instanceof WebGlCoreRenderer, 'SDF Font Faces can only be used with the WebGL Renderer');
            // Load image
            this.texture = stage.txManager.loadTexture('ImageTexture', {
              src: atlasUrl,
              // IMPORTANT: The SDF shader requires the alpha channel to NOT be
              // premultiplied on the atlas texture. If it is premultiplied, the
              // rendering of SDF glyphs (especially single-channel SDF fonts) will
              // be very jagged.
              premultiplyAlpha: false
            });
            this.texture.on('loaded', () => {
              this.checkLoaded();
              // Make sure we mark the stage for a re-render (in case the font's texture was freed and reloaded)
              stage.requestRender();
            });
            // Pre-load it
            this.texture.ctxTexture.load();
            // Set this.data to the fetched data from dataUrl
            fetch(atlasDataUrl).then( /*#__PURE__*/function () {
              var _ref23 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(response) {
                var maxCharHeight, _this12$data, _this12$data$lightnin, ascender, descender, lineGap, unitsPerEm;
                return _regeneratorRuntime().wrap(function _callee14$(_context14) {
                  while (1) switch (_context14.prev = _context14.next) {
                    case 0:
                      _context14.next = 2;
                      return response.json();
                    case 2:
                      _this12.data = _context14.sent;
                      assertTruthy(_this12.data);
                      // Add all the glyphs to the glyph map
                      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                      maxCharHeight = 0;
                      _this12.data.chars.forEach(glyph => {
                        _this12.glyphMap.set(glyph.id, glyph);
                        var charHeight = glyph.yoffset + glyph.height;
                        if (charHeight > maxCharHeight) {
                          maxCharHeight = charHeight;
                        }
                      });
                      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
                      _this12.maxCharHeight = maxCharHeight;
                      // We know `data` is defined here, because we just set it
                      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                      _this12.shaper = new SdfFontShaper(_this12.data, _this12.glyphMap);
                      // If the metrics aren't provided explicitly in the font face options,
                      // Gather them from the metrics added by the msdf-generator tool ()
                      // If they are missing then we throw an error.
                      if (_this12.metrics) {
                        _context14.next = 15;
                        break;
                      }
                      if (!((_this12$data = _this12.data) !== null && _this12$data !== void 0 && _this12$data.lightningMetrics)) {
                        _context14.next = 14;
                        break;
                      }
                      _this12$data$lightnin = _this12.data.lightningMetrics, ascender = _this12$data$lightnin.ascender, descender = _this12$data$lightnin.descender, lineGap = _this12$data$lightnin.lineGap, unitsPerEm = _this12$data$lightnin.unitsPerEm;
                      _this12.metrics = {
                        ascender: ascender / unitsPerEm,
                        descender: descender / unitsPerEm,
                        lineGap: lineGap / unitsPerEm
                      };
                      _context14.next = 15;
                      break;
                    case 14:
                      throw new Error(`Font metrics not found in ${_this12.type} font ${_this12.fontFamily}. ` + 'Make sure you are using the latest version of the Lightning ' + '3 `msdf-generator` tool to generate your SDF fonts.');
                    case 15:
                      _this12.checkLoaded();
                    case 16:
                    case "end":
                      return _context14.stop();
                  }
                }, _callee14);
              }));
              return function (_x4) {
                return _ref23.apply(this, arguments);
              };
            }()).catch(console.error);
          }
          getAtlasEntry(glyphId) {
            var glyph = this.glyphMap.get(glyphId);
            if (glyph === undefined) {
              throw new Error(`Glyph ${glyphId} not found in font ${this.fontFamily}`);
            }
            return {
              x: glyph.x,
              y: glyph.y,
              width: glyph.width,
              height: glyph.height
            };
          }
          checkLoaded() {
            if (this.loaded) return;
            if (this.texture.state === 'loaded' && this.data) {
              this.loaded = true;
              this.emit('loaded');
            }
          }
        }
        var renderer$1;
        var createShader;
        function startLightningRenderer(options, rootId = 'app') {
          renderer$1 = new RendererMain(options, rootId);
          createShader = renderer$1.createShader.bind(renderer$1);
          return renderer$1;
        }
        function loadFonts(fonts) {
          var stage = renderer$1.stage;
          var _iterator9 = _createForOfIteratorHelper(fonts),
            _step9;
          try {
            for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
              var font = _step9.value;
              if ('type' in font) {
                stage.fontManager.addFontFace(new SdfTrFontFace(font.type, _objectSpread(_objectSpread({}, font), {}, {
                  stage
                })));
              } else {
                stage.fontManager.addFontFace(new WebTrFontFace(font));
              }
            }
          } catch (err) {
            _iterator9.e(err);
          } finally {
            _iterator9.f();
          }
        }
        var __vite_import_meta_env__ = {
          "BASE_URL": "/solid-demo-app/",
          "DEV": false,
          "LEGACY": true,
          "MODE": "production",
          "PROD": true,
          "SSR": false
        };
        function isDevEnv() {
          return !!(__vite_import_meta_env__ && false);
        }
        var isDev$1 = isDevEnv() || false;
        var Config = {
          debug: false,
          focusDebug: false,
          animationsEnabled: true,
          animationSettings: {
            duration: 250,
            easing: "ease-in-out"
          },
          fontSettings: {
            fontFamily: "Ubuntu",
            fontSize: 100
          },
          setActiveElement: () => {}
        };
        function hasDebug(node) {
          return isObject$1(node) && node.debug;
        }
        function log(msg, node, ...args) {
          if (isDev$1) {
            if (Config.debug || hasDebug(node) || hasDebug(args[0])) {
              console.log(msg, node, ...args);
            }
          }
        }
        var isFunc = obj => obj instanceof Function;
        function isObject$1(item) {
          return typeof item === 'object';
        }
        function isArray(item) {
          return Array.isArray(item);
        }
        function isString(item) {
          return typeof item === 'string';
        }
        function isNumber(item) {
          return typeof item === 'number';
        }
        function isInteger(item) {
          return Number.isInteger(item);
        }
        function isINode(node) {
          return 'destroy' in node && typeof node.destroy === 'function';
        }
        function isElementNode(node) {
          return node instanceof ElementNode;
        }
        function keyExists(obj, keys) {
          var _iterator10 = _createForOfIteratorHelper(keys),
            _step10;
          try {
            for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
              var _key16 = _step10.value;
              if (_key16 in obj) {
                return true;
              }
            }
          } catch (err) {
            _iterator10.e(err);
          } finally {
            _iterator10.f();
          }
          return false;
        }
        function flattenStyles(obj, result = {}) {
          if (isArray(obj)) {
            obj.forEach(item => {
              flattenStyles(item, result);
            });
          } else if (obj) {
            // handle the case where the object is not an array
            for (var _key17 in obj) {
              // be careful of 0 values
              if (result[_key17] === undefined) {
                result[_key17] = obj[_key17];
              }
            }
          }
          return result;
        }
        class States extends Array {
          constructor(callback, initialState = {}) {
            if (isArray(initialState)) {
              super(...initialState);
              _defineProperty(this, "onChange", void 0);
            } else if (isString(initialState)) {
              super(initialState);
              _defineProperty(this, "onChange", void 0);
            } else {
              super(...Object.entries(initialState).filter(([_key, value]) => value).map(([key]) => key));
              _defineProperty(this, "onChange", void 0);
            }
            this.onChange = callback;
            return this;
          }
          has(state) {
            return this.indexOf(state) >= 0;
          }
          is(state) {
            return this.indexOf(state) >= 0;
          }
          add(state) {
            if (this.has(state)) {
              return;
            }
            this.push(state);
            this.onChange();
          }
          toggle(state, force) {
            if (force === true) {
              this.add(state);
            } else if (force === false) {
              this.remove(state);
            } else {
              if (this.has(state)) {
                this.remove(state);
              } else {
                this.add(state);
              }
            }
          }
          merge(newStates) {
            if (isArray(newStates)) {
              this.length = 0; // Clear the current states
              this.push(...newStates);
            } else if (isString(newStates)) {
              this.length = 0; // Clear the current states
              this.push(newStates);
            } else {
              for (var state in newStates) {
                this.toggle(state, newStates[state]);
              }
            }
            return this;
          }
          remove(state) {
            var stateIndexToRemove = this.indexOf(state);
            if (stateIndexToRemove >= 0) {
              this.splice(stateIndexToRemove, 1);
              this.onChange();
            }
          }
        }
        var NodeType = {
          Element: 'element',
          TextNode: 'textNode',
          Text: 'text'
        };
        function calculateFlex(node) {
          var children = [];
          var hasOrder = false;
          var growSize = 0;
          for (var i = 0; i < node.children.length; i++) {
            var c = node.children[i];
            // Filter empty text nodes which are place holders for <Show> and elements missing dimensions
            if (c._type === NodeType.Text || c.flexItem === false) {
              continue;
            }
            if (c.flexOrder !== undefined) {
              hasOrder = true;
            }
            if (c.flexGrow !== undefined) {
              growSize += c.flexGrow;
            }
            children.push(c);
          }
          if (hasOrder) {
            children.sort((a, b) => (a.flexOrder || 0) - (b.flexOrder || 0));
          }
          var numChildren = children.length;
          var direction = node.flexDirection || 'row';
          var isRow = direction === 'row';
          var dimension = isRow ? 'width' : 'height';
          var crossDimension = isRow ? 'height' : 'width';
          var marginOne = isRow ? 'marginLeft' : 'marginTop';
          var marginTwo = isRow ? 'marginRight' : 'marginBottom';
          var prop = isRow ? 'x' : 'y';
          var crossProp = isRow ? 'y' : 'x';
          var containerSize = node[dimension] || 0;
          var containerCrossSize = node[crossDimension] || 0;
          var gap = node.gap || 0;
          var justify = node.justifyContent || 'flexStart';
          var align = node.alignItems;
          if (growSize) {
            var flexBasis = children.reduce((prev, c) => prev + (c.flexGrow ? 0 : c[dimension] || 0) + (c[marginOne] || 0) + (c[marginTwo] || 0), 0);
            var growFactor = (containerSize - flexBasis - gap * (numChildren - 1)) / growSize;
            for (var _i3 = 0; _i3 < children.length; _i3++) {
              var _c = children[_i3];
              if (_c.flexGrow !== undefined && _c.flexGrow > 0) {
                _c[dimension] = _c.flexGrow * growFactor;
              }
            }
          }
          var itemSize = 0;
          if (['center', 'spaceBetween', 'spaceEvenly'].includes(justify)) {
            itemSize = children.reduce((prev, c) => prev + (c[dimension] || 0) + (c[marginOne] || 0) + (c[marginTwo] || 0), 0);
          }
          // Only align children if container has a cross size
          var crossAlignChild = containerCrossSize && align ? c => {
            if (align === 'flexStart') {
              c[crossProp] = 0;
            } else if (align === 'center') {
              c[crossProp] = (containerCrossSize - (c[crossDimension] || 0)) / 2;
            } else if (align === 'flexEnd') {
              c[crossProp] = containerCrossSize - (c[crossDimension] || 0);
            }
          } : c => c;
          if (justify === 'flexStart') {
            var start = 0;
            for (var _i4 = 0; _i4 < children.length; _i4++) {
              var _c2 = children[_i4];
              _c2[prop] = start + (_c2[marginOne] || 0);
              start += (_c2[dimension] || 0) + gap + (_c2[marginOne] || 0) + (_c2[marginTwo] || 0);
              crossAlignChild(_c2);
            }
            // Update container size
            if (node.flexBoundary !== 'fixed') {
              var calculatedSize = start - gap;
              if (calculatedSize !== node[dimension]) {
                node[dimension] = calculatedSize;
                return true;
              }
            }
          } else if (justify === 'flexEnd') {
            var _start = containerSize;
            for (var _i5 = numChildren - 1; _i5 >= 0; _i5--) {
              var _c3 = children[_i5];
              _c3[prop] = _start - (_c3[dimension] || 0) - (_c3[marginTwo] || 0);
              _start -= (_c3[dimension] || 0) + gap + (_c3[marginOne] || 0) + (_c3[marginTwo] || 0);
              crossAlignChild(_c3);
            }
            // Update container size
            if (node.flexBoundary !== 'fixed') {
              var _calculatedSize = _start - gap;
              if (_calculatedSize !== node[dimension]) {
                node[dimension] = _calculatedSize;
                return true;
              }
            }
          } else if (justify === 'center') {
            var _start2 = (containerSize - (itemSize + gap * (numChildren - 1))) / 2;
            for (var _i6 = 0; _i6 < children.length; _i6++) {
              var _c4 = children[_i6];
              _c4[prop] = _start2 + (_c4[marginOne] || 0);
              _start2 += (_c4[dimension] || 0) + gap + (_c4[marginOne] || 0) + (_c4[marginTwo] || 0);
              crossAlignChild(_c4);
            }
          } else if (justify === 'spaceBetween') {
            var toPad = (containerSize - itemSize) / (numChildren - 1);
            var _start3 = 0;
            for (var _i7 = 0; _i7 < children.length; _i7++) {
              var _c5 = children[_i7];
              _c5[prop] = _start3 + (_c5[marginOne] || 0);
              _start3 += (_c5[dimension] || 0) + toPad + (_c5[marginOne] || 0) + (_c5[marginTwo] || 0);
              crossAlignChild(_c5);
            }
          } else if (justify === 'spaceEvenly') {
            var _toPad = (containerSize - itemSize) / (numChildren + 1);
            var _start4 = _toPad;
            for (var _i8 = 0; _i8 < children.length; _i8++) {
              var _c6 = children[_i8];
              _c6[prop] = _start4 + (_c6[marginOne] || 0);
              _start4 += (_c6[dimension] || 0) + _toPad + (_c6[marginOne] || 0) + (_c6[marginTwo] || 0);
              crossAlignChild(_c6);
            }
          }
          // Container was not updated
          return false;
        }
        var keyMapEntries = {
          ArrowLeft: 'Left',
          ArrowRight: 'Right',
          ArrowUp: 'Up',
          ArrowDown: 'Down',
          Enter: 'Enter',
          l: 'Last',
          ' ': 'Space',
          Backspace: 'Back',
          Escape: 'Escape'
        };
        var keyHoldMapEntries = {
          // Enter: 'EnterHold',
        };
        var flattenKeyMap = (keyMap, targetMap) => {
          var _loop4 = function _loop4() {
            var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i9], 2),
              key = _Object$entries2$_i[0],
              value = _Object$entries2$_i[1];
            if (Array.isArray(value)) {
              value.forEach(v => {
                targetMap[v] = key;
              });
            } else if (value === null) {
              delete targetMap[key];
            } else {
              targetMap[value] = key;
            }
          };
          for (var _i9 = 0, _Object$entries2 = Object.entries(keyMap); _i9 < _Object$entries2.length; _i9++) {
            _loop4();
          }
        };
        var needFocusDebugStyles = true;
        var addFocusDebug = (prevFocusPath, newFocusPath) => {
          if (needFocusDebugStyles) {
            var style = document.createElement('style');
            style.type = 'text/css';
            style.innerHTML = `
      [data-focus="3"] {
        border: 2px solid rgba(255, 33, 33, 0.2);
        border-radius: 5px;
        transition: border-color 0.3s ease;
      }

      [data-focus="2"] {
        border: 2px solid rgba(255, 33, 33, 0.4);
        border-radius: 5px;
        transition: border-color 0.3s ease;
      }

      [data-focus="1"] {
        border: 4px solid rgba(255, 33, 33, 0.9);
        border-radius: 5px;
        transition: border-color 0.5s ease;
      }
    `;
            document.head.appendChild(style);
            needFocusDebugStyles = false;
          }
          prevFocusPath.forEach(elm => {
            elm.data = _objectSpread(_objectSpread({}, elm.data), {}, {
              focus: undefined
            });
          });
          newFocusPath.forEach((elm, i) => {
            elm.data = _objectSpread(_objectSpread({}, elm.data), {}, {
              focus: i + 1
            });
          });
        };
        var activeElement$1;
        var setActiveElement$1 = elm => {
          updateFocusPath(elm, activeElement$1);
          activeElement$1 = elm;
          // Callback for libraries to use signals / refs
          Config.setActiveElement(elm);
        };
        var focusPath$1 = [];
        var updateFocusPath = (currentFocusedElm, prevFocusedElm) => {
          var current = currentFocusedElm;
          var fp = [];
          while (current) {
            if (!current.states.has('focus') || current === currentFocusedElm) {
              var _current$onFocus, _current$onFocusChang;
              current.states.add('focus');
              (_current$onFocus = current.onFocus) === null || _current$onFocus === void 0 || _current$onFocus.call(current, currentFocusedElm, prevFocusedElm);
              (_current$onFocusChang = current.onFocusChanged) === null || _current$onFocusChang === void 0 || _current$onFocusChang.call(current, true, currentFocusedElm, prevFocusedElm);
            }
            fp.push(current);
            current = current.parent;
          }
          focusPath$1.forEach(elm => {
            if (!fp.includes(elm)) {
              var _elm$onBlur, _elm$onFocusChanged;
              elm.states.remove('focus');
              (_elm$onBlur = elm.onBlur) === null || _elm$onBlur === void 0 || _elm$onBlur.call(elm, currentFocusedElm, prevFocusedElm);
              (_elm$onFocusChanged = elm.onFocusChanged) === null || _elm$onFocusChanged === void 0 || _elm$onFocusChanged.call(elm, false, currentFocusedElm, prevFocusedElm);
            }
          });
          if (Config.focusDebug) {
            addFocusDebug(focusPath$1, fp);
          }
          focusPath$1 = fp;
          return fp;
        };
        var propagateKeyDown = (e, mappedEvent, isHold) => {
          var finalFocusElm = undefined;
          for (var _i10 = 0, _focusPath$ = focusPath$1; _i10 < _focusPath$.length; _i10++) {
            var elm = _focusPath$[_i10];
            finalFocusElm = finalFocusElm || elm;
            if (mappedEvent) {
              var onKeyHandler = elm[`on${mappedEvent}`];
              if ((onKeyHandler === null || onKeyHandler === void 0 ? void 0 : onKeyHandler.call(elm, e, elm, finalFocusElm)) === true) {
                break;
              }
            } else {
              console.log(`Unhandled key event: ${e.key || e.keyCode}`);
            }
            var fallbackFunction = isHold ? elm.onKeyHold : elm.onKeyPress;
            if ((fallbackFunction === null || fallbackFunction === void 0 ? void 0 : fallbackFunction.call(elm, e, mappedEvent, elm, finalFocusElm)) === true) {
              break;
            }
          }
          return false;
        };
        var DEFAULT_KEY_HOLD_THRESHOLD = 200; // ms
        var keyHoldTimeouts = {};
        var keyHoldCallback = (e, mappedKeyHoldEvent) => {
          delete keyHoldTimeouts[e.key || e.keyCode];
          propagateKeyDown(e, mappedKeyHoldEvent, true);
        };
        var handleKeyEvents = (delay, keypress, keyup) => {
          if (keypress) {
            var _key18 = keypress.key || keypress.keyCode;
            var mappedKeyHoldEvent = keyHoldMapEntries[_key18];
            var mappedKeyEvent = keyMapEntries[_key18];
            if (!mappedKeyHoldEvent) {
              propagateKeyDown(keypress, mappedKeyEvent, false);
            } else {
              if (keyHoldTimeouts[_key18]) {
                clearTimeout(keyHoldTimeouts[_key18]);
              }
              keyHoldTimeouts[_key18] = window.setTimeout(() => keyHoldCallback(keypress, mappedKeyHoldEvent), delay);
            }
          }
          if (keyup) {
            var _key19 = keyup.key || keyup.keyCode;
            var _mappedKeyEvent = keyMapEntries[_key19];
            if (keyHoldTimeouts[_key19]) {
              clearTimeout(keyHoldTimeouts[_key19]);
              delete keyHoldTimeouts[_key19];
              propagateKeyDown(keyup, _mappedKeyEvent, false);
            }
          }
        };
        var useFocusManager$1 = ({
          userKeyMap,
          keyHoldOptions,
          ownerContext = cb => {
            cb();
          }
        } = {}) => {
          if (userKeyMap) {
            flattenKeyMap(userKeyMap, keyMapEntries);
          }
          if (keyHoldOptions !== null && keyHoldOptions !== void 0 && keyHoldOptions.userKeyHoldMap) {
            flattenKeyMap(keyHoldOptions.userKeyHoldMap, keyHoldMapEntries);
          }
          var delay = (keyHoldOptions === null || keyHoldOptions === void 0 ? void 0 : keyHoldOptions.holdThreshold) || DEFAULT_KEY_HOLD_THRESHOLD;
          var runKeyEvent = handleKeyEvents.bind(null, delay);
          // Owner context is for frameworks that need effects
          var keyPressHandler = event => ownerContext(() => {
            runKeyEvent(event, undefined);
          });
          var keyUpHandler = event => ownerContext(() => {
            runKeyEvent(undefined, event);
          });
          document.addEventListener('keyup', keyUpHandler);
          document.addEventListener('keydown', keyPressHandler);
          return {
            cleanup: () => {
              document.removeEventListener('keydown', keyPressHandler);
              document.removeEventListener('keyup', keyUpHandler);
              for (var _i11 = 0, _Object$entries3 = Object.entries(keyHoldTimeouts); _i11 < _Object$entries3.length; _i11++) {
                var _Object$entries3$_i = _slicedToArray(_Object$entries3[_i11], 2),
                  _ = _Object$entries3$_i[0],
                  timeout = _Object$entries3$_i[1];
                if (timeout) clearTimeout(timeout);
              }
            },
            focusPath: () => focusPath$1
          };
        };
        var layoutQueue = new Set();
        var dynamicSizedNodeCount = 0;
        var flushQueued = false;
        function flushLayout() {
          if (flushQueued) return;
          flushQueued = true;
          // Use setTimeout to allow renderers microtasks to finish
          setTimeout(() => {
            var queue = [...layoutQueue];
            layoutQueue.clear();
            for (var i = queue.length - 1; i >= 0; i--) {
              var node = queue[i];
              node.updateLayout();
            }
            flushQueued = false;
            dynamicSizedNodeCount = 0;
          }, 0);
        }
        function convertEffectsToShader(styleEffects) {
          var effects = [];
          var index = 0;
          for (var _i12 = 0, _Object$entries4 = Object.entries(styleEffects); _i12 < _Object$entries4.length; _i12++) {
            var _Object$entries4$_i = _slicedToArray(_Object$entries4[_i12], 2),
              type = _Object$entries4$_i[0],
              props = _Object$entries4$_i[1];
            effects.push({
              name: `effect${index}`,
              type,
              props
            });
            index++;
          }
          return createShader('DynamicShader', {
            effects
          });
        }
        function borderAccessor(direction = '') {
          return {
            set(value) {
              // Format: width || { width, color }
              if (isNumber(value)) {
                value = {
                  width: value,
                  color: 0x000000ff
                };
              }
              this.effects = this.effects ? _objectSpread(_objectSpread({}, this.effects || {}), {
                [`border${direction}`]: value
              }) : {
                [`border${direction}`]: value
              };
            },
            get() {
              var _this$effects;
              return (_this$effects = this.effects) === null || _this$effects === void 0 ? void 0 : _this$effects[`border${direction}`];
            }
          };
        }
        var LightningRendererNumberProps = ['alpha', 'color', 'colorTop', 'colorRight', 'colorLeft', 'colorBottom', 'colorTl', 'colorTr', 'colorBl', 'colorBr', 'height', 'fontSize', 'lineHeight', 'mount', 'mountX', 'mountY', 'pivot', 'pivotX', 'pivotY', 'rotation', 'scale', 'scaleX', 'scaleY', 'width', 'worldX', 'worldY', 'x', 'y', 'zIndex', 'zIndexLocked'];
        var LightningRendererNonAnimatingProps = ['absX', 'absY', 'autosize', 'clipping', 'contain', 'data', 'fontFamily', 'fontStretch', 'fontStyle', 'fontWeight', 'letterSpacing', 'maxLines', 'offsetY', 'overflowSuffix', 'rtt', 'scrollable', 'scrollY', 'src', 'text', 'textAlign', 'textBaseline', 'textOverflow', 'texture', 'textureOptions', 'verticalAlign', 'wordWrap'];
        class ElementNode extends Object {
          constructor(name) {
            super();
            this._type = name === 'text' ? NodeType.TextNode : NodeType.Element;
            this.rendered = false;
            this.lng = {};
            this.children = [];
          }
          get effects() {
            return this._effects;
          }
          set effects(v) {
            this._effects = v;
            if (this.rendered) {
              this.shader = convertEffectsToShader(v);
            }
          }
          set id(id) {
            var _Config$rendererOptio;
            this._id = id;
            if ((_Config$rendererOptio = Config.rendererOptions) !== null && _Config$rendererOptio !== void 0 && _Config$rendererOptio.inspector) {
              this.data = _objectSpread(_objectSpread({}, this.data), {}, {
                testId: id
              });
            }
          }
          get id() {
            return this._id;
          }
          get parent() {
            return this._parent;
          }
          set parent(p) {
            this._parent = p;
            if (this.rendered) {
              var _p$lng;
              this.lng.parent = (_p$lng = p === null || p === void 0 ? void 0 : p.lng) !== null && _p$lng !== void 0 ? _p$lng : null;
            }
          }
          insertChild(node, beforeNode) {
            node.parent = this;
            if (beforeNode) {
              // SolidJS can move nodes around in the children array.
              // We need to insert following DOM insertBefore which moves elements.
              this.removeChild(node);
              var index = this.children.indexOf(beforeNode);
              if (index >= 0) {
                this.children.splice(index, 0, node);
                return;
              }
            }
            this.children.push(node);
          }
          removeChild(node) {
            var nodeIndexToRemove = this.children.indexOf(node);
            if (nodeIndexToRemove >= 0) {
              this.children.splice(nodeIndexToRemove, 1);
            }
          }
          get selectedNode() {
            var selectedIndex = this.selected || 0;
            for (var i = selectedIndex; i < this.children.length; i++) {
              var element = this.children[i];
              if (isElementNode(element)) {
                this.selected = i;
                return element;
              }
            }
            return undefined;
          }
          set shader(shaderProps) {
            var shProps = shaderProps;
            if (isArray(shaderProps)) {
              shProps = createShader(...shaderProps);
            }
            this.lng.shader = shProps;
          }
          _sendToLightningAnimatable(name, value) {
            if (this.transition && this.rendered && Config.animationsEnabled && (this.transition === true || this.transition[name])) {
              var animationSettings = this.transition === true || this.transition[name] === true ? undefined : this.transition[name];
              var animationController = this.animate({
                [name]: value
              }, animationSettings);
              if (isFunc(this.onAnimationStarted)) {
                animationController.once('animating', controller => {
                  var _this$onAnimationStar;
                  (_this$onAnimationStar = this.onAnimationStarted) === null || _this$onAnimationStar === void 0 || _this$onAnimationStar.call(this, controller, name, value);
                });
              }
              if (isFunc(this.onAnimationFinished)) {
                animationController.once('stopped', controller => {
                  var _this$onAnimationFini;
                  (_this$onAnimationFini = this.onAnimationFinished) === null || _this$onAnimationFini === void 0 || _this$onAnimationFini.call(this, controller, name, value);
                });
              }
              return animationController.start();
            }
            this.lng[name] = value;
          }
          animate(props, animationSettings) {
            assertTruthy(this.rendered, 'Node must be rendered before animating');
            return this.lng.animate(props, animationSettings || this.animationSettings);
          }
          chain(props, animationSettings) {
            if (this._animationRunning) {
              this._animationQueue = [];
              this._animationRunning = false;
            }
            if (animationSettings) {
              this._animationQueueSettings = animationSettings;
            } else if (!this._animationQueueSettings) {
              this._animationQueueSettings = animationSettings || this.animationSettings;
            }
            animationSettings = animationSettings || this._animationQueueSettings;
            this._animationQueue = this._animationQueue || [];
            this._animationQueue.push({
              props,
              animationSettings
            });
            return this;
          }
          start() {
            var _this13 = this;
            return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15() {
              var animation;
              return _regeneratorRuntime().wrap(function _callee15$(_context15) {
                while (1) switch (_context15.prev = _context15.next) {
                  case 0:
                    animation = _this13._animationQueue.shift();
                  case 1:
                    if (!animation) {
                      _context15.next = 8;
                      break;
                    }
                    _this13._animationRunning = true;
                    _context15.next = 5;
                    return _this13.animate(animation.props, animation.animationSettings).start().waitUntilStopped();
                  case 5:
                    animation = _this13._animationQueue.shift();
                    _context15.next = 1;
                    break;
                  case 8:
                    _this13._animationRunning = false;
                    _this13._animationQueueSettings = undefined;
                  case 10:
                  case "end":
                    return _context15.stop();
                }
              }, _callee15);
            }))();
          }
          setFocus() {
            if (this.skipFocus) {
              return;
            }
            if (this.rendered) {
              // can be 0
              if (this.forwardFocus !== undefined) {
                if (isFunc(this.forwardFocus)) {
                  if (this.forwardFocus.call(this, this) !== false) {
                    return;
                  }
                } else {
                  var focusedIndex = typeof this.forwardFocus === 'number' ? this.forwardFocus : null;
                  var nodes = this.children;
                  if (focusedIndex !== null && focusedIndex < nodes.length) {
                    var child = nodes[focusedIndex];
                    isElementNode(child) && child.setFocus();
                    return;
                  }
                }
              }
              // Delay setting focus so children can render (useful for Row + Column)
              queueMicrotask(() => setActiveElement$1(this));
            } else {
              this._autofocus = true;
            }
          }
          isTextNode() {
            return this._type === NodeType.TextNode;
          }
          _layoutOnLoad() {
            dynamicSizedNodeCount++;
            this.lng.on('loaded', () => {
              // Re-add the node to the layout queue because somehow the queue fluses and there is a straggler
              layoutQueue.add(this.parent);
              flushLayout();
            });
          }
          getText() {
            var result = '';
            for (var i = 0; i < this.children.length; i++) {
              result += this.children[i].text;
            }
            return result;
          }
          destroy() {
            if (this._queueDelete && isINode(this.lng)) {
              var _this$parent2;
              this.lng.destroy();
              if ((_this$parent2 = this.parent) !== null && _this$parent2 !== void 0 && _this$parent2.requiresLayout()) {
                this.parent.updateLayout();
              }
            }
          }
          // Must be set before render
          set onEvents(events) {
            this._events = events;
          }
          get onEvents() {
            return this._events;
          }
          set style(values) {
            if (isArray(values)) {
              this._style = flattenStyles(values);
            } else {
              this._style = values;
            }
            // Keys set in JSX are more important
            for (var _key20 in this._style) {
              // be careful of 0 values
              if (this[_key20] === undefined) {
                this[_key20] = this._style[_key20];
              }
            }
          }
          get style() {
            return this._style;
          }
          get hasChildren() {
            return this.children.length > 0;
          }
          getChildById(id) {
            return this.children.find(c => c.id === id);
          }
          searchChildrenById(id) {
            // traverse all the childrens children
            for (var i = 0; i < this.children.length; i++) {
              var child = this.children[i];
              if (isElementNode(child)) {
                if (child.id === id) {
                  return child;
                }
                var found = child.searchChildrenById(id);
                if (found) {
                  return found;
                }
              }
            }
          }
          set states(states) {
            this._states = this._states ? this._states.merge(states) : new States(this._stateChanged.bind(this), states);
            if (this.rendered) {
              this._stateChanged();
            }
          }
          get states() {
            this._states = this._states || new States(this._stateChanged.bind(this));
            return this._states;
          }
          get animationSettings() {
            return this._animationSettings || Config.animationSettings;
          }
          set animationSettings(animationSettings) {
            this._animationSettings = animationSettings;
          }
          set hidden(val) {
            this.alpha = val ? 0 : 1;
          }
          get hidden() {
            return this.alpha === 0;
          }
          set autofocus(val) {
            this._autofocus = val ? true : false;
            this._autofocus && this.setFocus();
          }
          get autofocus() {
            return this._autofocus;
          }
          requiresLayout() {
            return this.display === 'flex' || this.onBeforeLayout || this.onLayout;
          }
          set updateLayoutOn(v) {
            this.updateLayout();
          }
          get updateLayoutOn() {
            return null;
          }
          updateLayout() {
            if (this.hasChildren) {
              log('Layout: ', this);
              var changedLayout = false;
              if (isFunc(this.onBeforeLayout)) {
                console.warn('onBeforeLayout is deprecated');
                changedLayout = this.onBeforeLayout.call(this, this) || false;
              }
              if (this.display === 'flex') {
                if (calculateFlex(this) || changedLayout) {
                  var _this$parent3;
                  (_this$parent3 = this.parent) === null || _this$parent3 === void 0 || _this$parent3.updateLayout();
                }
              } else if (changedLayout) {
                var _this$parent4;
                (_this$parent4 = this.parent) === null || _this$parent4 === void 0 || _this$parent4.updateLayout();
              }
              isFunc(this.onLayout) && this.onLayout.call(this, this);
            }
          }
          _stateChanged() {
            log('State Changed: ', this, this.states);
            if (this.forwardStates) {
              // apply states to children first
              var _states = this.states.slice();
              this.children.forEach(c => {
                c.states = _states;
              });
            }
            var states = this.states;
            if (this._undoStyles || this.style && keyExists(this.style, states)) {
              this._undoStyles = this._undoStyles || [];
              var stylesToUndo = {};
              this._undoStyles.forEach(styleKey => {
                stylesToUndo[styleKey] = this.style[styleKey];
              });
              var newStyles = states.reduce((acc, state) => {
                var styles = this.style[state];
                if (styles) {
                  acc = _objectSpread(_objectSpread({}, acc), styles);
                }
                return acc;
              }, {});
              this._undoStyles = Object.keys(newStyles);
              // Apply transition first
              if (newStyles.transition !== undefined) {
                this.transition = newStyles.transition;
              }
              // Apply the styles
              Object.assign(this, stylesToUndo, newStyles);
            }
          }
          render(topNode) {
            var _node$lng;
            // Elements are inserted from the inside out, then rendered from the outside in.
            // Render starts when an element is insertered with a parent that is already renderered.
            var node = this;
            var parent = this.parent;
            if (!parent) {
              console.warn('Parent not set - no node created for: ', this);
              return;
            }
            if (!parent.rendered) {
              console.warn('Parent not rendered yet: ', this);
              return;
            }
            if (parent.requiresLayout()) {
              layoutQueue.add(parent);
            }
            if (this.rendered) {
              // This happens if Array of items is reordered to reuse elements.
              // We return after layout is queued so the change can trigger layout updates.
              return;
            }
            if (this._states) {
              this._stateChanged();
            }
            var props = node.lng;
            if (this.right || this.right === 0) {
              props.x = (parent.width || 0) - this.right;
              props.mountX = 1;
            }
            if (this.bottom || this.bottom === 0) {
              props.y = (parent.height || 0) - this.bottom;
              props.mountY = 1;
            }
            props.x = props.x || 0;
            props.y = props.y || 0;
            props.parent = parent.lng;
            if (node._effects) {
              props.shader = convertEffectsToShader(node._effects);
            }
            if (node.isTextNode()) {
              var textProps = props;
              if (Config.fontSettings) {
                for (var _key21 in Config.fontSettings) {
                  if (textProps[_key21] === undefined) {
                    textProps[_key21] = Config.fontSettings[_key21];
                  }
                }
              }
              textProps.text = textProps.text || node.getText();
              if (textProps.textAlign && !textProps.contain) {
                console.warn('Text align requires contain: ', node.getText());
              }
              // contain is either width or both
              if (textProps.contain) {
                if (!textProps.width) {
                  textProps.width = (parent.width || 0) - textProps.x - (textProps.marginRight || 0);
                }
                if (textProps.contain === 'both' && !textProps.height && !textProps.maxLines) {
                  textProps.height = (parent.height || 0) - textProps.y - (textProps.marginBottom || 0);
                } else if (textProps.maxLines === 1) {
                  textProps.height = textProps.height || textProps.lineHeight || textProps.fontSize;
                }
              }
              log('Rendering: ', this, props);
              node.lng = renderer$1.createTextNode(props);
              if (parent.requiresLayout()) {
                if (!props.width || !props.height) {
                  node._layoutOnLoad();
                }
              }
            } else {
              // If its not an image or texture apply some defaults
              if (!props.texture) {
                // Set width and height to parent less offset
                if (isNaN(props.width)) {
                  props.width = (parent.width || 0) - props.x;
                }
                if (isNaN(props.height)) {
                  props.height = (parent.height || 0) - props.y;
                }
                if (props.rtt && !props.color) {
                  props.color = 0xffffffff;
                }
                if (!props.color && !props.src) {
                  // Default color to transparent - If you later set a src, you'll need
                  // to set color 0xFFFFFFFF
                  props.color = 0x00000000;
                }
              }
              log('Rendering: ', this, props);
              node.lng = renderer$1.createNode(props);
            }
            node.rendered = true;
            if (node.autosize && parent.requiresLayout()) {
              node._layoutOnLoad();
            }
            if (node.onFail) {
              node.lng.on('failed', node.onFail);
            }
            if (node.onLoad) {
              node.lng.on('loaded', node.onLoad);
            }
            isFunc(this.onCreate) && this.onCreate.call(this, node);
            node.onEvents && node.onEvents.forEach(([name, handler]) => {
              node.lng.on(name, (inode, data) => handler(node, data));
            });
            // L3 Inspector adds div to the lng object
            //@ts-expect-error - div is not in the typings
            if ((_node$lng = node.lng) !== null && _node$lng !== void 0 && _node$lng.div) {
              //@ts-expect-error - div is not in the typings
              node.lng.div.element = node;
            }
            if (node._type === NodeType.Element) {
              // only element nodes will have children that need rendering
              var numChildren = node.children.length;
              for (var i = 0; i < numChildren; i++) {
                var c = node.children[i];
                assertTruthy(c, 'Child is undefined');
                if (isElementNode(c)) {
                  c.render();
                } else if (c.text && c._type === NodeType.Text) {
                  // Solid Show uses an empty text node as a placeholder
                  // Vue uses comment nodes for v-if
                  console.warn('TextNode outside of <Text>: ', c);
                }
              }
            }
            if (topNode && !dynamicSizedNodeCount) {
              flushLayout();
            }
            node._autofocus && node.setFocus();
          }
        }
        var _loop5 = function _loop5() {
          var key = _LightningRendererNum[_i13];
          Object.defineProperty(ElementNode.prototype, key, {
            get() {
              return this.lng[key];
            },
            set(v) {
              this._sendToLightningAnimatable(key, v);
            }
          });
        };
        for (var _i13 = 0, _LightningRendererNum = LightningRendererNumberProps; _i13 < _LightningRendererNum.length; _i13++) {
          _loop5();
        }
        var _loop6 = function _loop6() {
          var key = _LightningRendererNon[_i14];
          Object.defineProperty(ElementNode.prototype, key, {
            get() {
              return this.lng[key];
            },
            set(v) {
              this.lng[key] = v;
            }
          });
        };
        for (var _i14 = 0, _LightningRendererNon = LightningRendererNonAnimatingProps; _i14 < _LightningRendererNon.length; _i14++) {
          _loop6();
        }
        // Add Border Helpers
        function createEffectAccessor(key) {
          return {
            set(value) {
              this.effects = this.effects ? _objectSpread(_objectSpread({}, this.effects), {}, {
                [key]: value
              }) : {
                [key]: value
              };
            },
            get() {
              var _this$effects2;
              return (_this$effects2 = this.effects) === null || _this$effects2 === void 0 ? void 0 : _this$effects2[key];
            }
          };
        }
        Object.defineProperties(ElementNode.prototype, {
          border: borderAccessor(),
          borderLeft: borderAccessor('Left'),
          borderRight: borderAccessor('Right'),
          borderTop: borderAccessor('Top'),
          borderBottom: borderAccessor('Bottom'),
          linearGradient: createEffectAccessor('linearGradient'),
          radialGradient: createEffectAccessor('radialGradient'),
          radialProgress: createEffectAccessor('radialProgressGradient'),
          borderRadius: {
            set(radius) {
              this.effects = this.effects ? _objectSpread(_objectSpread({}, this.effects), {}, {
                radius: {
                  radius
                }
              }) : {
                radius: {
                  radius
                }
              };
            },
            get() {
              var _this$effects3;
              return (_this$effects3 = this.effects) === null || _this$effects3 === void 0 || (_this$effects3 = _this$effects3.radius) === null || _this$effects3 === void 0 ? void 0 : _this$effects3.radius;
            }
          }
        });
        var sharedConfig = {
          context: undefined,
          registry: undefined,
          done: false,
          getContextId() {
            return getContextId(this.context.count);
          },
          getNextContextId() {
            return getContextId(this.context.count++);
          }
        };
        function getContextId(count) {
          var num = String(count),
            len = num.length - 1;
          return sharedConfig.context.id + (len ? String.fromCharCode(96 + len) : "") + num;
        }
        function setHydrateContext(context) {
          sharedConfig.context = context;
        }
        var equalFn = (a, b) => a === b;
        var $PROXY = Symbol("solid-proxy");
        var $TRACK = Symbol("solid-track");
        var signalOptions = {
          equals: equalFn
        };
        var runEffects = runQueue;
        var STALE = 1;
        var PENDING = 2;
        var UNOWNED = {
          owned: null,
          cleanups: null,
          context: null,
          owner: null
        };
        var NO_INIT = {};
        var Owner = null;
        var Transition = null;
        var ExternalSourceConfig = null;
        var Listener = null;
        var Updates = null;
        var Effects = null;
        var ExecCount = 0;
        function createRoot(fn, detachedOwner) {
          var listener = Listener,
            owner = Owner,
            unowned = fn.length === 0,
            current = detachedOwner === undefined ? owner : detachedOwner,
            root = unowned ? UNOWNED : {
              owned: null,
              cleanups: null,
              context: current ? current.context : null,
              owner: current
            },
            updateFn = unowned ? fn : () => fn(() => untrack(() => cleanNode(root)));
          Owner = root;
          Listener = null;
          try {
            return runUpdates(updateFn, true);
          } finally {
            Listener = listener;
            Owner = owner;
          }
        }
        function createSignal(value, options) {
          options = options ? Object.assign({}, signalOptions, options) : signalOptions;
          var s = {
            value,
            observers: null,
            observerSlots: null,
            comparator: options.equals || undefined
          };
          var setter = value => {
            if (typeof value === "function") {
              value = value(s.value);
            }
            return writeSignal(s, value);
          };
          return [readSignal.bind(s), setter];
        }
        function createComputed(fn, value, options) {
          var c = createComputation(fn, value, true, STALE);
          updateComputation(c);
        }
        function createRenderEffect(fn, value, options) {
          var c = createComputation(fn, value, false, STALE);
          updateComputation(c);
        }
        function createEffect(fn, value, options) {
          runEffects = runUserEffects;
          var c = createComputation(fn, value, false, STALE);
          c.user = true;
          Effects ? Effects.push(c) : updateComputation(c);
        }
        function createMemo(fn, value, options) {
          options = options ? Object.assign({}, signalOptions, options) : signalOptions;
          var c = createComputation(fn, value, true, 0);
          c.observers = null;
          c.observerSlots = null;
          c.comparator = options.equals || undefined;
          updateComputation(c);
          return readSignal.bind(c);
        }
        function isPromise(v) {
          return v && typeof v === "object" && "then" in v;
        }
        function createResource(pSource, pFetcher, pOptions) {
          var source;
          var fetcher;
          var options;
          if (arguments.length === 2 && typeof pFetcher === "object" || arguments.length === 1) {
            source = true;
            fetcher = pSource;
            options = pFetcher || {};
          } else {
            source = pSource;
            fetcher = pFetcher;
            options = {};
          }
          var pr = null,
            initP = NO_INIT,
            id = null,
            scheduled = false,
            resolved = "initialValue" in options,
            dynamic = typeof source === "function" && createMemo(source);
          var contexts = new Set(),
            _ref24 = (options.storage || createSignal)(options.initialValue),
            _ref25 = _slicedToArray(_ref24, 2),
            value = _ref25[0],
            setValue = _ref25[1],
            _createSignal = createSignal(undefined),
            _createSignal2 = _slicedToArray(_createSignal, 2),
            error = _createSignal2[0],
            setError = _createSignal2[1],
            _createSignal3 = createSignal(undefined, {
              equals: false
            }),
            _createSignal4 = _slicedToArray(_createSignal3, 2),
            track = _createSignal4[0],
            trigger = _createSignal4[1],
            _createSignal5 = createSignal(resolved ? "ready" : "unresolved"),
            _createSignal6 = _slicedToArray(_createSignal5, 2),
            state = _createSignal6[0],
            setState = _createSignal6[1];
          if (sharedConfig.context) {
            id = sharedConfig.getNextContextId();
            if (options.ssrLoadFrom === "initial") initP = options.initialValue;else if (sharedConfig.load && sharedConfig.has(id)) initP = sharedConfig.load(id);
          }
          function loadEnd(p, v, error, key) {
            if (pr === p) {
              pr = null;
              key !== undefined && (resolved = true);
              if ((p === initP || v === initP) && options.onHydrated) queueMicrotask(() => options.onHydrated(key, {
                value: v
              }));
              initP = NO_INIT;
              completeLoad(v, error);
            }
            return v;
          }
          function completeLoad(v, err) {
            runUpdates(() => {
              if (err === undefined) setValue(() => v);
              setState(err !== undefined ? "errored" : resolved ? "ready" : "unresolved");
              setError(err);
              var _iterator11 = _createForOfIteratorHelper(contexts.keys()),
                _step11;
              try {
                for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
                  var c = _step11.value;
                  c.decrement();
                }
              } catch (err) {
                _iterator11.e(err);
              } finally {
                _iterator11.f();
              }
              contexts.clear();
            }, false);
          }
          function read() {
            var c = SuspenseContext,
              v = value(),
              err = error();
            if (err !== undefined && !pr) throw err;
            if (Listener && !Listener.user && c) {
              createComputed(() => {
                track();
                if (pr) {
                  if (c.resolved) ;else if (!contexts.has(c)) {
                    c.increment();
                    contexts.add(c);
                  }
                }
              });
            }
            return v;
          }
          function load(refetching = true) {
            if (refetching !== false && scheduled) return;
            scheduled = false;
            var lookup = dynamic ? dynamic() : source;
            if (lookup == null || lookup === false) {
              loadEnd(pr, untrack(value));
              return;
            }
            var p = initP !== NO_INIT ? initP : untrack(() => fetcher(lookup, {
              value: value(),
              refetching
            }));
            if (!isPromise(p)) {
              loadEnd(pr, p, undefined, lookup);
              return p;
            }
            pr = p;
            if ("value" in p) {
              if (p.status === "success") loadEnd(pr, p.value, undefined, lookup);else loadEnd(pr, undefined, castError(p.value), lookup);
              return p;
            }
            scheduled = true;
            queueMicrotask(() => scheduled = false);
            runUpdates(() => {
              setState(resolved ? "refreshing" : "pending");
              trigger();
            }, false);
            return p.then(v => loadEnd(p, v, undefined, lookup), e => loadEnd(p, undefined, castError(e), lookup));
          }
          Object.defineProperties(read, {
            state: {
              get: () => state()
            },
            error: {
              get: () => error()
            },
            loading: {
              get() {
                var s = state();
                return s === "pending" || s === "refreshing";
              }
            },
            latest: {
              get() {
                if (!resolved) return read();
                var err = error();
                if (err && !pr) throw err;
                return value();
              }
            }
          });
          if (dynamic) createComputed(() => load(false));else load(false);
          return [read, {
            refetch: load,
            mutate: setValue
          }];
        }
        function createSelector(source, fn = equalFn, options) {
          var subs = new Map();
          var node = createComputation(p => {
            var v = source();
            var _iterator12 = _createForOfIteratorHelper(subs.entries()),
              _step12;
            try {
              for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
                var _step12$value = _slicedToArray(_step12.value, 2),
                  _key22 = _step12$value[0],
                  val = _step12$value[1];
                if (fn(_key22, v) !== fn(_key22, p)) {
                  var _iterator13 = _createForOfIteratorHelper(val.values()),
                    _step13;
                  try {
                    for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
                      var c = _step13.value;
                      c.state = STALE;
                      if (c.pure) Updates.push(c);else Effects.push(c);
                    }
                  } catch (err) {
                    _iterator13.e(err);
                  } finally {
                    _iterator13.f();
                  }
                }
              }
            } catch (err) {
              _iterator12.e(err);
            } finally {
              _iterator12.f();
            }
            return v;
          }, undefined, true, STALE);
          updateComputation(node);
          return key => {
            var listener = Listener;
            if (listener) {
              var l;
              if (l = subs.get(key)) l.add(listener);else subs.set(key, l = new Set([listener]));
              onCleanup(() => {
                l.delete(listener);
                !l.size && subs.delete(key);
              });
            }
            return fn(key, node.value);
          };
        }
        function batch(fn) {
          return runUpdates(fn, false);
        }
        function untrack(fn) {
          if (Listener === null) return fn();
          var listener = Listener;
          Listener = null;
          try {
            if (ExternalSourceConfig) ;
            return fn();
          } finally {
            Listener = listener;
          }
        }
        function on(deps, fn, options) {
          var isArray = Array.isArray(deps);
          var prevInput;
          var defer = options && options.defer;
          return prevValue => {
            var input;
            if (isArray) {
              input = Array(deps.length);
              for (var i = 0; i < deps.length; i++) input[i] = deps[i]();
            } else input = deps();
            if (defer) {
              defer = false;
              return prevValue;
            }
            var result = untrack(() => fn(input, prevInput, prevValue));
            prevInput = input;
            return result;
          };
        }
        function onMount(fn) {
          createEffect(() => untrack(fn));
        }
        function onCleanup(fn) {
          if (Owner === null) ;else if (Owner.cleanups === null) Owner.cleanups = [fn];else Owner.cleanups.push(fn);
          return fn;
        }
        function getListener() {
          return Listener;
        }
        function getOwner() {
          return Owner;
        }
        function runWithOwner(o, fn) {
          var prev = Owner;
          var prevListener = Listener;
          Owner = o;
          Listener = null;
          try {
            return runUpdates(fn, true);
          } catch (err) {
            handleError(err);
          } finally {
            Owner = prev;
            Listener = prevListener;
          }
        }
        function startTransition(fn) {
          var l = Listener;
          var o = Owner;
          return Promise.resolve().then(() => {
            Listener = l;
            Owner = o;
            var t;
            runUpdates(fn, false);
            Listener = Owner = null;
            return t ? t.done : undefined;
          });
        }
        function createContext(defaultValue, options) {
          var id = Symbol("context");
          return {
            id,
            Provider: createProvider(id),
            defaultValue
          };
        }
        function useContext(context) {
          var value;
          return Owner && Owner.context && (value = Owner.context[context.id]) !== undefined ? value : context.defaultValue;
        }
        function children(fn) {
          var children = createMemo(fn);
          var memo = createMemo(() => resolveChildren(children()));
          memo.toArray = () => {
            var c = memo();
            return Array.isArray(c) ? c : c != null ? [c] : [];
          };
          return memo;
        }
        var SuspenseContext;
        function readSignal() {
          if (this.sources && this.state) {
            if (this.state === STALE) updateComputation(this);else {
              var updates = Updates;
              Updates = null;
              runUpdates(() => lookUpstream(this), false);
              Updates = updates;
            }
          }
          if (Listener) {
            var sSlot = this.observers ? this.observers.length : 0;
            if (!Listener.sources) {
              Listener.sources = [this];
              Listener.sourceSlots = [sSlot];
            } else {
              Listener.sources.push(this);
              Listener.sourceSlots.push(sSlot);
            }
            if (!this.observers) {
              this.observers = [Listener];
              this.observerSlots = [Listener.sources.length - 1];
            } else {
              this.observers.push(Listener);
              this.observerSlots.push(Listener.sources.length - 1);
            }
          }
          return this.value;
        }
        function writeSignal(node, value, isComp) {
          var current = node.value;
          if (!node.comparator || !node.comparator(current, value)) {
            node.value = value;
            if (node.observers && node.observers.length) {
              runUpdates(() => {
                for (var i = 0; i < node.observers.length; i += 1) {
                  var o = node.observers[i];
                  var TransitionRunning = Transition && Transition.running;
                  if (TransitionRunning && Transition.disposed.has(o)) ;
                  if (TransitionRunning ? !o.tState : !o.state) {
                    if (o.pure) Updates.push(o);else Effects.push(o);
                    if (o.observers) markDownstream(o);
                  }
                  if (!TransitionRunning) o.state = STALE;
                }
                if (Updates.length > 10e5) {
                  Updates = [];
                  if (false) ;
                  throw new Error();
                }
              }, false);
            }
          }
          return value;
        }
        function updateComputation(node) {
          if (!node.fn) return;
          cleanNode(node);
          var time = ExecCount;
          runComputation(node, node.value, time);
        }
        function runComputation(node, value, time) {
          var nextValue;
          var owner = Owner,
            listener = Listener;
          Listener = Owner = node;
          try {
            nextValue = node.fn(value);
          } catch (err) {
            if (node.pure) {
              {
                node.state = STALE;
                node.owned && node.owned.forEach(cleanNode);
                node.owned = null;
              }
            }
            node.updatedAt = time + 1;
            return handleError(err);
          } finally {
            Listener = listener;
            Owner = owner;
          }
          if (!node.updatedAt || node.updatedAt <= time) {
            if (node.updatedAt != null && "observers" in node) {
              writeSignal(node, nextValue);
            } else node.value = nextValue;
            node.updatedAt = time;
          }
        }
        function createComputation(fn, init, pure, state = STALE, options) {
          var c = {
            fn,
            state: state,
            updatedAt: null,
            owned: null,
            sources: null,
            sourceSlots: null,
            cleanups: null,
            value: init,
            owner: Owner,
            context: Owner ? Owner.context : null,
            pure
          };
          if (Owner === null) ;else if (Owner !== UNOWNED) {
            {
              if (!Owner.owned) Owner.owned = [c];else Owner.owned.push(c);
            }
          }
          return c;
        }
        function runTop(node) {
          if (node.state === 0) return;
          if (node.state === PENDING) return lookUpstream(node);
          if (node.suspense && untrack(node.suspense.inFallback)) return node.suspense.effects.push(node);
          var ancestors = [node];
          while ((node = node.owner) && (!node.updatedAt || node.updatedAt < ExecCount)) {
            if (node.state) ancestors.push(node);
          }
          for (var i = ancestors.length - 1; i >= 0; i--) {
            node = ancestors[i];
            if (node.state === STALE) {
              updateComputation(node);
            } else if (node.state === PENDING) {
              var updates = Updates;
              Updates = null;
              runUpdates(() => lookUpstream(node, ancestors[0]), false);
              Updates = updates;
            }
          }
        }
        function runUpdates(fn, init) {
          if (Updates) return fn();
          var wait = false;
          if (!init) Updates = [];
          if (Effects) wait = true;else Effects = [];
          ExecCount++;
          try {
            var res = fn();
            completeUpdates(wait);
            return res;
          } catch (err) {
            if (!wait) Effects = null;
            Updates = null;
            handleError(err);
          }
        }
        function completeUpdates(wait) {
          if (Updates) {
            runQueue(Updates);
            Updates = null;
          }
          if (wait) return;
          var e = Effects;
          Effects = null;
          if (e.length) runUpdates(() => runEffects(e), false);
        }
        function runQueue(queue) {
          for (var i = 0; i < queue.length; i++) runTop(queue[i]);
        }
        function runUserEffects(queue) {
          var i,
            userLength = 0;
          for (i = 0; i < queue.length; i++) {
            var _e = queue[i];
            if (!_e.user) runTop(_e);else queue[userLength++] = _e;
          }
          if (sharedConfig.context) {
            if (sharedConfig.count) {
              sharedConfig.effects || (sharedConfig.effects = []);
              sharedConfig.effects.push(...queue.slice(0, userLength));
              return;
            } else if (sharedConfig.effects) {
              queue = [...sharedConfig.effects, ...queue];
              userLength += sharedConfig.effects.length;
              delete sharedConfig.effects;
            }
            setHydrateContext();
          }
          for (i = 0; i < userLength; i++) runTop(queue[i]);
        }
        function lookUpstream(node, ignore) {
          node.state = 0;
          for (var i = 0; i < node.sources.length; i += 1) {
            var source = node.sources[i];
            if (source.sources) {
              var state = source.state;
              if (state === STALE) {
                if (source !== ignore && (!source.updatedAt || source.updatedAt < ExecCount)) runTop(source);
              } else if (state === PENDING) lookUpstream(source, ignore);
            }
          }
        }
        function markDownstream(node) {
          for (var i = 0; i < node.observers.length; i += 1) {
            var o = node.observers[i];
            if (!o.state) {
              o.state = PENDING;
              if (o.pure) Updates.push(o);else Effects.push(o);
              o.observers && markDownstream(o);
            }
          }
        }
        function cleanNode(node) {
          var i;
          if (node.sources) {
            while (node.sources.length) {
              var source = node.sources.pop(),
                index = node.sourceSlots.pop(),
                obs = source.observers;
              if (obs && obs.length) {
                var n = obs.pop(),
                  s = source.observerSlots.pop();
                if (index < obs.length) {
                  n.sourceSlots[s] = index;
                  obs[index] = n;
                  source.observerSlots[index] = s;
                }
              }
            }
          }
          if (node.owned) {
            for (i = node.owned.length - 1; i >= 0; i--) cleanNode(node.owned[i]);
            node.owned = null;
          }
          if (node.cleanups) {
            for (i = node.cleanups.length - 1; i >= 0; i--) node.cleanups[i]();
            node.cleanups = null;
          }
          node.state = 0;
        }
        function castError(err) {
          if (err instanceof Error) return err;
          return new Error(typeof err === "string" ? err : "Unknown error", {
            cause: err
          });
        }
        function handleError(err, owner = Owner) {
          var error = castError(err);
          throw error;
        }
        function resolveChildren(children) {
          if (typeof children === "function" && !children.length) return resolveChildren(children());
          if (Array.isArray(children)) {
            var results = [];
            for (var i = 0; i < children.length; i++) {
              var result = resolveChildren(children[i]);
              Array.isArray(result) ? results.push.apply(results, result) : results.push(result);
            }
            return results;
          }
          return children;
        }
        function createProvider(id, options) {
          return function provider(props) {
            var res;
            createRenderEffect(() => res = untrack(() => {
              Owner.context = _objectSpread(_objectSpread({}, Owner.context), {}, {
                [id]: props.value
              });
              return children(() => props.children);
            }), undefined);
            return res;
          };
        }
        var FALLBACK = Symbol("fallback");
        function dispose(d) {
          for (var i = 0; i < d.length; i++) d[i]();
        }
        function mapArray(list, mapFn, options = {}) {
          var items = [],
            mapped = [],
            disposers = [],
            len = 0,
            indexes = mapFn.length > 1 ? [] : null;
          onCleanup(() => dispose(disposers));
          return () => {
            var newItems = list() || [],
              newLen = newItems.length,
              i,
              j;
            newItems[$TRACK];
            return untrack(() => {
              var newIndices, newIndicesNext, temp, tempdisposers, tempIndexes, start, end, newEnd, item;
              if (newLen === 0) {
                if (len !== 0) {
                  dispose(disposers);
                  disposers = [];
                  items = [];
                  mapped = [];
                  len = 0;
                  indexes && (indexes = []);
                }
                if (options.fallback) {
                  items = [FALLBACK];
                  mapped[0] = createRoot(disposer => {
                    disposers[0] = disposer;
                    return options.fallback();
                  });
                  len = 1;
                }
              } else if (len === 0) {
                mapped = new Array(newLen);
                for (j = 0; j < newLen; j++) {
                  items[j] = newItems[j];
                  mapped[j] = createRoot(mapper);
                }
                len = newLen;
              } else {
                temp = new Array(newLen);
                tempdisposers = new Array(newLen);
                indexes && (tempIndexes = new Array(newLen));
                for (start = 0, end = Math.min(len, newLen); start < end && items[start] === newItems[start]; start++);
                for (end = len - 1, newEnd = newLen - 1; end >= start && newEnd >= start && items[end] === newItems[newEnd]; end--, newEnd--) {
                  temp[newEnd] = mapped[end];
                  tempdisposers[newEnd] = disposers[end];
                  indexes && (tempIndexes[newEnd] = indexes[end]);
                }
                newIndices = new Map();
                newIndicesNext = new Array(newEnd + 1);
                for (j = newEnd; j >= start; j--) {
                  item = newItems[j];
                  i = newIndices.get(item);
                  newIndicesNext[j] = i === undefined ? -1 : i;
                  newIndices.set(item, j);
                }
                for (i = start; i <= end; i++) {
                  item = items[i];
                  j = newIndices.get(item);
                  if (j !== undefined && j !== -1) {
                    temp[j] = mapped[i];
                    tempdisposers[j] = disposers[i];
                    indexes && (tempIndexes[j] = indexes[i]);
                    j = newIndicesNext[j];
                    newIndices.set(item, j);
                  } else disposers[i]();
                }
                for (j = start; j < newLen; j++) {
                  if (j in temp) {
                    mapped[j] = temp[j];
                    disposers[j] = tempdisposers[j];
                    if (indexes) {
                      indexes[j] = tempIndexes[j];
                      indexes[j](j);
                    }
                  } else mapped[j] = createRoot(mapper);
                }
                mapped = mapped.slice(0, len = newLen);
                items = newItems.slice(0);
              }
              return mapped;
            });
            function mapper(disposer) {
              disposers[j] = disposer;
              if (indexes) {
                var _createSignal7 = createSignal(j),
                  _createSignal8 = _slicedToArray(_createSignal7, 2),
                  s = _createSignal8[0],
                  set = _createSignal8[1];
                indexes[j] = set;
                return mapFn(newItems[j], s);
              }
              return mapFn(newItems[j]);
            }
          };
        }
        function indexArray(list, mapFn, options = {}) {
          var items = [],
            mapped = [],
            disposers = [],
            signals = [],
            len = 0,
            i;
          onCleanup(() => dispose(disposers));
          return () => {
            var newItems = list() || [],
              newLen = newItems.length;
            newItems[$TRACK];
            return untrack(() => {
              if (newLen === 0) {
                if (len !== 0) {
                  dispose(disposers);
                  disposers = [];
                  items = [];
                  mapped = [];
                  len = 0;
                  signals = [];
                }
                if (options.fallback) {
                  items = [FALLBACK];
                  mapped[0] = createRoot(disposer => {
                    disposers[0] = disposer;
                    return options.fallback();
                  });
                  len = 1;
                }
                return mapped;
              }
              if (items[0] === FALLBACK) {
                disposers[0]();
                disposers = [];
                items = [];
                mapped = [];
                len = 0;
              }
              for (i = 0; i < newLen; i++) {
                if (i < items.length && items[i] !== newItems[i]) {
                  signals[i](() => newItems[i]);
                } else if (i >= items.length) {
                  mapped[i] = createRoot(mapper);
                }
              }
              for (; i < items.length; i++) {
                disposers[i]();
              }
              len = signals.length = disposers.length = newLen;
              items = newItems.slice(0);
              return mapped = mapped.slice(0, len);
            });
            function mapper(disposer) {
              disposers[i] = disposer;
              var _createSignal9 = createSignal(newItems[i]),
                _createSignal10 = _slicedToArray(_createSignal9, 2),
                s = _createSignal10[0],
                set = _createSignal10[1];
              signals[i] = set;
              return mapFn(s, i);
            }
          };
        }
        function createComponent$1(Comp, props) {
          return untrack(() => Comp(props || {}));
        }
        function trueFn() {
          return true;
        }
        var propTraps = {
          get(_, property, receiver) {
            if (property === $PROXY) return receiver;
            return _.get(property);
          },
          has(_, property) {
            if (property === $PROXY) return true;
            return _.has(property);
          },
          set: trueFn,
          deleteProperty: trueFn,
          getOwnPropertyDescriptor(_, property) {
            return {
              configurable: true,
              enumerable: true,
              get() {
                return _.get(property);
              },
              set: trueFn,
              deleteProperty: trueFn
            };
          },
          ownKeys(_) {
            return _.keys();
          }
        };
        function resolveSource(s) {
          return !(s = typeof s === "function" ? s() : s) ? {} : s;
        }
        function resolveSources() {
          for (var i = 0, length = this.length; i < length; ++i) {
            var v = this[i]();
            if (v !== undefined) return v;
          }
        }
        function mergeProps$1(...sources) {
          var proxy = false;
          for (var i = 0; i < sources.length; i++) {
            var s = sources[i];
            proxy = proxy || !!s && $PROXY in s;
            sources[i] = typeof s === "function" ? (proxy = true, createMemo(s)) : s;
          }
          if (proxy) {
            return new Proxy({
              get(property) {
                for (var _i15 = sources.length - 1; _i15 >= 0; _i15--) {
                  var v = resolveSource(sources[_i15])[property];
                  if (v !== undefined) return v;
                }
              },
              has(property) {
                for (var _i16 = sources.length - 1; _i16 >= 0; _i16--) {
                  if (property in resolveSource(sources[_i16])) return true;
                }
                return false;
              },
              keys() {
                var keys = [];
                for (var _i17 = 0; _i17 < sources.length; _i17++) keys.push(...Object.keys(resolveSource(sources[_i17])));
                return [...new Set(keys)];
              }
            }, propTraps);
          }
          var sourcesMap = {};
          var defined = Object.create(null);
          for (var _i18 = sources.length - 1; _i18 >= 0; _i18--) {
            var source = sources[_i18];
            if (!source) continue;
            var sourceKeys = Object.getOwnPropertyNames(source);
            var _loop7 = function _loop7() {
              var key = sourceKeys[_i19];
              if (key === "__proto__" || key === "constructor") return 1; // continue
              var desc = Object.getOwnPropertyDescriptor(source, key);
              if (!defined[key]) {
                defined[key] = desc.get ? {
                  enumerable: true,
                  configurable: true,
                  get: resolveSources.bind(sourcesMap[key] = [desc.get.bind(source)])
                } : desc.value !== undefined ? desc : undefined;
              } else {
                var _sources = sourcesMap[key];
                if (_sources) {
                  if (desc.get) _sources.push(desc.get.bind(source));else if (desc.value !== undefined) _sources.push(() => desc.value);
                }
              }
            };
            for (var _i19 = sourceKeys.length - 1; _i19 >= 0; _i19--) {
              if (_loop7()) continue;
            }
          }
          var target = {};
          var definedKeys = Object.keys(defined);
          for (var _i20 = definedKeys.length - 1; _i20 >= 0; _i20--) {
            var _key23 = definedKeys[_i20],
              desc = defined[_key23];
            if (desc && desc.get) Object.defineProperty(target, _key23, desc);else target[_key23] = desc ? desc.value : undefined;
          }
          return target;
        }
        function splitProps(props, ...keys) {
          if ($PROXY in props) {
            var blocked = new Set(keys.length > 1 ? keys.flat() : keys[0]);
            var res = keys.map(k => {
              return new Proxy({
                get(property) {
                  return k.includes(property) ? props[property] : undefined;
                },
                has(property) {
                  return k.includes(property) && property in props;
                },
                keys() {
                  return k.filter(property => property in props);
                }
              }, propTraps);
            });
            res.push(new Proxy({
              get(property) {
                return blocked.has(property) ? undefined : props[property];
              },
              has(property) {
                return blocked.has(property) ? false : property in props;
              },
              keys() {
                return Object.keys(props).filter(k => !blocked.has(k));
              }
            }, propTraps));
            return res;
          }
          var otherObject = {};
          var objects = keys.map(() => ({}));
          var _iterator14 = _createForOfIteratorHelper(Object.getOwnPropertyNames(props)),
            _step14;
          try {
            for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
              var propName = _step14.value;
              var desc = Object.getOwnPropertyDescriptor(props, propName);
              var isDefaultDesc = !desc.get && !desc.set && desc.enumerable && desc.writable && desc.configurable;
              var _blocked = false;
              var objectIndex = 0;
              var _iterator15 = _createForOfIteratorHelper(keys),
                _step15;
              try {
                for (_iterator15.s(); !(_step15 = _iterator15.n()).done;) {
                  var k = _step15.value;
                  if (k.includes(propName)) {
                    _blocked = true;
                    isDefaultDesc ? objects[objectIndex][propName] = desc.value : Object.defineProperty(objects[objectIndex], propName, desc);
                  }
                  ++objectIndex;
                }
              } catch (err) {
                _iterator15.e(err);
              } finally {
                _iterator15.f();
              }
              if (!_blocked) {
                isDefaultDesc ? otherObject[propName] = desc.value : Object.defineProperty(otherObject, propName, desc);
              }
            }
          } catch (err) {
            _iterator14.e(err);
          } finally {
            _iterator14.f();
          }
          return [...objects, otherObject];
        }
        function lazy(fn) {
          var comp;
          var p;
          var wrap = props => {
            var ctx = sharedConfig.context;
            if (ctx) {
              var _createSignal11 = createSignal(),
                _createSignal12 = _slicedToArray(_createSignal11, 2),
                s = _createSignal12[0],
                set = _createSignal12[1];
              sharedConfig.count || (sharedConfig.count = 0);
              sharedConfig.count++;
              (p || (p = fn())).then(mod => {
                !sharedConfig.done && setHydrateContext(ctx);
                sharedConfig.count--;
                set(() => mod.default);
                setHydrateContext();
              });
              comp = s;
            } else if (!comp) {
              var _createResource = createResource(() => (p || (p = fn())).then(mod => mod.default)),
                _createResource2 = _slicedToArray(_createResource, 1),
                _s = _createResource2[0];
              comp = _s;
            }
            var Comp;
            return createMemo(() => (Comp = comp()) ? untrack(() => {
              if (false) ;
              if (!ctx || sharedConfig.done) return Comp(props);
              var c = sharedConfig.context;
              setHydrateContext(ctx);
              var r = Comp(props);
              setHydrateContext(c);
              return r;
            }) : "");
          };
          wrap.preload = () => p || ((p = fn()).then(mod => comp = () => mod.default), p);
          return wrap;
        }
        var narrowedError = name => `Stale read from <${name}>.`;
        function For(props) {
          var fallback = "fallback" in props && {
            fallback: () => props.fallback
          };
          return createMemo(mapArray(() => props.each, props.children, fallback || undefined));
        }
        function Index(props) {
          var fallback = "fallback" in props && {
            fallback: () => props.fallback
          };
          return createMemo(indexArray(() => props.each, props.children, fallback || undefined));
        }
        function Show(props) {
          var keyed = props.keyed;
          var condition = createMemo(() => props.when, undefined, {
            equals: (a, b) => keyed ? a === b : !a === !b
          });
          return createMemo(() => {
            var c = condition();
            if (c) {
              var child = props.children;
              var fn = typeof child === "function" && child.length > 0;
              return fn ? untrack(() => child(keyed ? c : () => {
                if (!untrack(condition)) throw narrowedError("Show");
                return props.when;
              })) : child;
            }
            return props.fallback;
          }, undefined, undefined);
        }
        var DEV = undefined;
        var _createSignal13 = createSignal(void 0),
          _createSignal14 = _slicedToArray(_createSignal13, 2),
          activeElement = _createSignal14[0],
          setActiveElement = _createSignal14[1];
        exports("E", setActiveElement);
        function hexColor(color = "") {
          if (isInteger(color)) {
            return color;
          }
          if (typeof color === "string") {
            if (color.startsWith("#")) {
              return Number(color.replace("#", "0x") + (color.length === 7 ? "ff" : ""));
            }
            if (color.startsWith("0x")) {
              return Number(color);
            }
            return Number("0x" + (color.length === 6 ? color + "ff" : color));
          }
          return 0;
        }
        function createRenderer$1({
          createElement,
          createTextNode,
          isTextNode,
          replaceText,
          insertNode,
          removeNode,
          setProperty,
          getParentNode,
          getFirstChild,
          getNextSibling
        }) {
          function insert(parent, accessor, marker, initial) {
            if (marker !== undefined && !initial) initial = [];
            if (typeof accessor !== "function") return insertExpression(parent, accessor, initial, marker);
            createRenderEffect(current => insertExpression(parent, accessor(), current, marker), initial);
          }
          function insertExpression(parent, value, current, marker, unwrapArray) {
            while (typeof current === "function") current = current();
            if (value === current) return current;
            var t = typeof value,
              multi = marker !== undefined;
            if (t === "string" || t === "number") {
              if (t === "number") value = value.toString();
              if (multi) {
                var node = current[0];
                if (node && isTextNode(node)) {
                  replaceText(node, value);
                } else node = createTextNode(value);
                current = cleanChildren(parent, current, marker, node);
              } else {
                if (current !== "" && typeof current === "string") {
                  replaceText(getFirstChild(parent), current = value);
                } else {
                  cleanChildren(parent, current, marker, createTextNode(value));
                  current = value;
                }
              }
            } else if (value == null || t === "boolean") {
              current = cleanChildren(parent, current, marker);
            } else if (t === "function") {
              createRenderEffect(() => {
                var v = value();
                while (typeof v === "function") v = v();
                current = insertExpression(parent, v, current, marker);
              });
              return () => current;
            } else if (Array.isArray(value)) {
              var array = [];
              if (normalizeIncomingArray(array, value, unwrapArray)) {
                createRenderEffect(() => current = insertExpression(parent, array, current, marker, true));
                return () => current;
              }
              if (array.length === 0) {
                var replacement = cleanChildren(parent, current, marker);
                if (multi) return current = replacement;
              } else {
                if (Array.isArray(current)) {
                  if (current.length === 0) {
                    appendNodes(parent, array, marker);
                  } else reconcileArrays(parent, current, array);
                } else if (current == null || current === "") {
                  appendNodes(parent, array);
                } else {
                  reconcileArrays(parent, multi && current || [getFirstChild(parent)], array);
                }
              }
              current = array;
            } else {
              if (Array.isArray(current)) {
                if (multi) return current = cleanChildren(parent, current, marker, value);
                cleanChildren(parent, current, null, value);
              } else if (current == null || current === "" || !getFirstChild(parent)) {
                insertNode(parent, value);
              } else replaceNode(parent, value, getFirstChild(parent));
              current = value;
            }
            return current;
          }
          function normalizeIncomingArray(normalized, array, unwrap) {
            var dynamic = false;
            for (var i = 0, len = array.length; i < len; i++) {
              var item = array[i],
                t = void 0;
              if (item == null || item === true || item === false) ;else if (Array.isArray(item)) {
                dynamic = normalizeIncomingArray(normalized, item) || dynamic;
              } else if ((t = typeof item) === "string" || t === "number") {
                normalized.push(createTextNode(item));
              } else if (t === "function") {
                if (unwrap) {
                  while (typeof item === "function") item = item();
                  dynamic = normalizeIncomingArray(normalized, Array.isArray(item) ? item : [item]) || dynamic;
                } else {
                  normalized.push(item);
                  dynamic = true;
                }
              } else normalized.push(item);
            }
            return dynamic;
          }
          function reconcileArrays(parentNode, a, b) {
            var bLength = b.length,
              aEnd = a.length,
              bEnd = bLength,
              aStart = 0,
              bStart = 0,
              after = getNextSibling(a[aEnd - 1]),
              map = null;
            while (aStart < aEnd || bStart < bEnd) {
              if (a[aStart] === b[bStart]) {
                aStart++;
                bStart++;
                continue;
              }
              while (a[aEnd - 1] === b[bEnd - 1]) {
                aEnd--;
                bEnd--;
              }
              if (aEnd === aStart) {
                var node = bEnd < bLength ? bStart ? getNextSibling(b[bStart - 1]) : b[bEnd - bStart] : after;
                while (bStart < bEnd) insertNode(parentNode, b[bStart++], node);
              } else if (bEnd === bStart) {
                while (aStart < aEnd) {
                  if (!map || !map.has(a[aStart])) removeNode(parentNode, a[aStart]);
                  aStart++;
                }
              } else if (a[aStart] === b[bEnd - 1] && b[bStart] === a[aEnd - 1]) {
                var _node = getNextSibling(a[--aEnd]);
                insertNode(parentNode, b[bStart++], getNextSibling(a[aStart++]));
                insertNode(parentNode, b[--bEnd], _node);
                a[aEnd] = b[bEnd];
              } else {
                if (!map) {
                  map = new Map();
                  var i = bStart;
                  while (i < bEnd) map.set(b[i], i++);
                }
                var index = map.get(a[aStart]);
                if (index != null) {
                  if (bStart < index && index < bEnd) {
                    var _i21 = aStart,
                      sequence = 1,
                      t = void 0;
                    while (++_i21 < aEnd && _i21 < bEnd) {
                      if ((t = map.get(a[_i21])) == null || t !== index + sequence) break;
                      sequence++;
                    }
                    if (sequence > index - bStart) {
                      var _node2 = a[aStart];
                      while (bStart < index) insertNode(parentNode, b[bStart++], _node2);
                    } else replaceNode(parentNode, b[bStart++], a[aStart++]);
                  } else aStart++;
                } else removeNode(parentNode, a[aStart++]);
              }
            }
          }
          function cleanChildren(parent, current, marker, replacement) {
            if (marker === undefined) {
              var removed;
              while (removed = getFirstChild(parent)) removeNode(parent, removed);
              replacement && insertNode(parent, replacement);
              return "";
            }
            var node = replacement || createTextNode("");
            if (current.length) {
              var inserted = false;
              for (var i = current.length - 1; i >= 0; i--) {
                var el = current[i];
                if (node !== el) {
                  var isParent = getParentNode(el) === parent;
                  if (!inserted && !i) isParent ? replaceNode(parent, node, el) : insertNode(parent, node, marker);else isParent && removeNode(parent, el);
                } else inserted = true;
              }
            } else insertNode(parent, node, marker);
            return [node];
          }
          function appendNodes(parent, array, marker) {
            for (var i = 0, len = array.length; i < len; i++) insertNode(parent, array[i], marker);
          }
          function replaceNode(parent, newNode, oldNode) {
            insertNode(parent, newNode, oldNode);
            removeNode(parent, oldNode);
          }
          function spreadExpression(node, props, prevProps = {}, skipChildren) {
            props || (props = {});
            if (!skipChildren) {
              createRenderEffect(() => prevProps.children = insertExpression(node, props.children, prevProps.children));
            }
            createRenderEffect(() => props.ref && props.ref(node));
            createRenderEffect(() => {
              for (var prop in props) {
                if (prop === "children" || prop === "ref") continue;
                var value = props[prop];
                if (value === prevProps[prop]) continue;
                setProperty(node, prop, value, prevProps[prop]);
                prevProps[prop] = value;
              }
            });
            return prevProps;
          }
          return {
            render(code, element) {
              var disposer;
              createRoot(dispose => {
                disposer = dispose;
                insert(element, code());
              });
              return disposer;
            },
            insert,
            spread(node, accessor, skipChildren) {
              if (typeof accessor === "function") {
                createRenderEffect(current => spreadExpression(node, accessor(), current, skipChildren));
              } else spreadExpression(node, accessor, undefined, skipChildren);
            },
            createElement,
            createTextNode,
            insertNode,
            setProp(node, name, value, prev) {
              setProperty(node, name, value, prev);
              return value;
            },
            mergeProps: mergeProps$1,
            effect: createRenderEffect,
            memo: createMemo,
            createComponent: createComponent$1,
            use(fn, element, arg) {
              return untrack(() => fn(element, arg));
            }
          };
        }
        function createRenderer$2(options) {
          var renderer = createRenderer$1(options);
          renderer.mergeProps = mergeProps$1;
          return renderer;
        }
        var nodeOpts = {
          createElement(name) {
            return new ElementNode(name);
          },
          createTextNode(text) {
            return {
              _type: NodeType.Text,
              text,
              parent: void 0
            };
          },
          replaceText(node, value) {
            log("Replace Text: ", node, value);
            node.text = value;
            var parent = node.parent;
            assertTruthy(parent);
            parent.text = parent.getText();
          },
          setProperty(node, name, value = true) {
            node[name] = value;
          },
          insertNode(parent, node, anchor) {
            log("INSERT: ", parent, node, anchor);
            parent.insertChild(node, anchor);
            node._queueDelete = false;
            if (node instanceof ElementNode) {
              parent.rendered && node.render(true);
            } else if (parent.isTextNode()) {
              parent.text = parent.getText();
            }
          },
          isTextNode(node) {
            return node.isTextNode();
          },
          removeNode(parent, node) {
            log("REMOVE: ", parent, node);
            parent.removeChild(node);
            node._queueDelete = true;
            if (node instanceof ElementNode) {
              queueMicrotask(() => node.destroy());
            }
          },
          getParentNode(node) {
            return node.parent;
          },
          getFirstChild(node) {
            return node.children[0];
          },
          getNextSibling(node) {
            var children = node.parent.children || [];
            var index = children.indexOf(node) + 1;
            if (index < children.length) {
              return children[index];
            }
            return void 0;
          }
        };
        var solidRenderer = createRenderer$2(nodeOpts);
        var renderer;
        var rootNode = nodeOpts.createElement("App");
        var render$1 = function render$1(code) {
          return solidRenderer.render(code, rootNode);
        };
        function createRenderer(rendererOptions, node) {
          renderer = startLightningRenderer(Config.rendererOptions, "app");
          Config.setActiveElement = setActiveElement;
          rootNode.lng = renderer.root;
          rootNode.rendered = true;
          return {
            renderer,
            rootNode,
            render: render$1
          };
        }
        var effect = solidRenderer.effect,
          memo = solidRenderer.memo,
          createComponent = solidRenderer.createComponent,
          createElement = solidRenderer.createElement,
          createTextNode = solidRenderer.createTextNode,
          insertNode = solidRenderer.insertNode,
          insert = solidRenderer.insert,
          spread = solidRenderer.spread,
          setProp = solidRenderer.setProp,
          mergeProps = solidRenderer.mergeProps,
          use = solidRenderer.use;
        exports({
          l: memo,
          h: createComponent,
          m: mergeProps
        });
        var View = exports("V", props => {
          var el = createElement("node");
          spread(el, props, false);
          return el;
        });
        var Text$5 = exports("T", props => {
          var el = createElement("text");
          spread(el, props, false);
          return el;
        });

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        /**
         * Number of floating point numbers that represent a single glyph in the SDF vertex buffer.
         *
         * @remarks
         * The vertex buffer contains:
         *  - 6 vertex positions
         *  - 6 texture coordinates
         *  - = 12 positions/coordinates per glyph
         *
         * Each vertex position and texture coordinate consist of 2 floating point numbers (x/y).
         * So there are 12 * 2 = 24 floating point numbers that make up a single glyph.
         */
        var FLOATS_PER_GLYPH = 24;

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        /**
         * Gets the start conditions for the layout loop.
         *
         * @remarks
         * Returns `undefined` if the layout loop should not be run.
         *
         * @param fontSize
         * @param fontSizeRatio
         * @param sdfLineHeight
         * @param renderWindow
         * @param lineCache
         * @param textH
         * @returns
         */
        function getStartConditions(sdfFontSize, sdfLineHeight, fontFace, verticalAlign, offsetY, fontSizeRatio, renderWindow, lineCache, textH) {
          // State variables
          var startLineIndex = Math.min(Math.max(renderWindow.firstLineIdx, 0), lineCache.length);
          var sdfStartX = 0;
          var metrics = fontFace.metrics;
          assertTruthy(metrics, 'Font metrics not loaded');
          assertTruthy(fontFace.data, 'Font data not loaded');
          /**
           * Bare line height is the distance between the ascender and descender of the font.
           * without the line gap metric.
           */
          var sdfBareLineHeight = (metrics.ascender - metrics.descender) * sdfFontSize;
          var sdfVerticalAlignYOffset = 0;
          if (verticalAlign === 'middle') {
            sdfVerticalAlignYOffset = (sdfLineHeight - sdfBareLineHeight) / 2;
          } else if (verticalAlign === 'bottom') {
            sdfVerticalAlignYOffset = sdfLineHeight - sdfBareLineHeight;
          }
          var sdfOffsetY = offsetY / fontSizeRatio;
          /**
           * This is the position from the top of the text drawing line to where the
           * baseline of the text will be according to the encoded positioning data for
           * each glyph in the SDF data. This also happens to be the ascender value
           * that is encoded into the font data.
           */
          var sdfEncodedAscender = fontFace.data.common.base;
          /**
           * This is the ascender that is configured and overridable in the font face.
           */
          var sdfConfiguredAscender = metrics.ascender * sdfFontSize;
          /**
           * If the configured ascender is different from the SDF data's encoded
           * ascender, the offset of the text will be adjusted by the difference.
           */
          var sdfAscenderAdjOffset = sdfConfiguredAscender - sdfEncodedAscender;
          var sdfStartY = sdfOffsetY + sdfAscenderAdjOffset + startLineIndex * sdfLineHeight + sdfVerticalAlignYOffset; // TODO: Figure out what determines the initial y offset of text.
          // Don't attempt to render anything if we know we're starting past the established end of the text
          if (textH && sdfStartY >= textH / fontSizeRatio) {
            return;
          }
          return {
            sdfX: sdfStartX,
            sdfY: sdfStartY,
            lineIndex: startLineIndex
          };
        }

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        /**
         * A wrapper Generator class that makes a generator peekable.
         */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        class PeekableIterator {
          constructor(iterator, indexBase = 0) {
            _defineProperty(this, "iterator", void 0);
            _defineProperty(this, "peekBuffer", []);
            _defineProperty(this, "_lastIndex", void 0);
            this.iterator = iterator;
            this.iterator = iterator;
            this._lastIndex = indexBase - 1;
            this.peekBuffer = [];
          }
          next() {
            var nextResult = this.peekBuffer.length > 0 ?
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            this.peekBuffer.pop() : this.iterator.next();
            if (nextResult.done) {
              this._lastIndex = -1;
            } else {
              this._lastIndex++;
            }
            return nextResult;
          }
          peek() {
            if (this.peekBuffer.length > 0) {
              // We know that the buffer is not empty, so we can safely use the
              // non-null assertion operator
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              return this.peekBuffer[0];
            }
            var result = this.iterator.next();
            this.peekBuffer.push(result);
            return result;
          }
          get lastIndex() {
            return this._lastIndex;
          }
        }

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        // Reversible Generator Wrapper Class
        /**
         * Generator function that yields each Unicode code point in the given string.
         */
        function getUnicodeCodepoints(text, start = 0) {
          var i, codePoint;
          return _regeneratorRuntime().wrap(function getUnicodeCodepoints$(_context16) {
            while (1) switch (_context16.prev = _context16.next) {
              case 0:
                i = start;
              case 1:
                if (!(i < text.length)) {
                  _context16.next = 10;
                  break;
                }
                codePoint = text.codePointAt(i);
                if (!(codePoint === undefined)) {
                  _context16.next = 5;
                  break;
                }
                throw new Error('Invalid Unicode code point');
              case 5:
                _context16.next = 7;
                return codePoint;
              case 7:
                i += codePoint <= 0xffff ? 1 : 2;
                _context16.next = 1;
                break;
              case 10:
              case "end":
                return _context16.stop();
            }
          }, _marked);
        }

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        /**
         * Measures a single-line of text width ignoring any unmapped glyphs including line breaks
         *
         * @param text
         * @param shaperProps
         * @param shaper
         * @returns
         */
        function measureText(text, shaperProps, shaper) {
          var glyphs = shaper.shapeText(shaperProps, new PeekableIterator(getUnicodeCodepoints(text, 0), 0));
          var width = 0;
          var _iterator16 = _createForOfIteratorHelper(glyphs),
            _step16;
          try {
            for (_iterator16.s(); !(_step16 = _iterator16.n()).done;) {
              var glyph = _step16.value;
              if (glyph.mapped) {
                width += glyph.xAdvance;
              }
            }
          } catch (err) {
            _iterator16.e(err);
          } finally {
            _iterator16.f();
          }
          return width;
        }

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        function layoutText(curLineIndex, startX, startY, text, textAlign, width, height, fontSize, lineHeight, letterSpacing,
        /**
         * Mutated
         */
        vertexBuffer, contain,
        /**
         * Mutated
         */
        lineCache, rwSdf, trFontFace, forceFullLayoutCalc, scrollable, overflowSuffix, maxLines) {
          assertTruthy(trFontFace, 'Font face must be loaded');
          assertTruthy(trFontFace.loaded, 'Font face must be loaded');
          assertTruthy(trFontFace.data, 'Font face must be loaded');
          assertTruthy(trFontFace.shaper, 'Font face must be loaded');
          // Regardless of fontSize (or other scaling properties), we layout the vertices of each glyph
          // using the fixed coordinate space determined by font size used to produce the atlas.
          // Scaling for display is handled by shader uniforms inexpensively.
          // So we have:
          //  - vertex space: the space in which the vertices of each glyph are laid out
          //  - screen space: the screen pixel space
          // Input properties such as x, y, w, fontSize, letterSpacing, etc. are all expressed in screen space.
          // We convert these to the vertex space by dividing them the `fontSizeRatio` factor.
          /**
           * See above
           */
          var fontSizeRatio = fontSize / trFontFace.data.info.size;
          /**
           * `lineHeight` in vertex coordinates
           */
          var vertexLineHeight = lineHeight / fontSizeRatio;
          /**
           * `w` in vertex coordinates
           */
          var vertexW = width / fontSizeRatio;
          /**
           * `letterSpacing` in vertex coordinates
           */
          var vertexLSpacing = letterSpacing / fontSizeRatio;
          var startingLineCacheEntry = lineCache[curLineIndex];
          var startingCodepointIndex = (startingLineCacheEntry === null || startingLineCacheEntry === void 0 ? void 0 : startingLineCacheEntry.codepointIndex) || 0;
          var startingMaxX = (startingLineCacheEntry === null || startingLineCacheEntry === void 0 ? void 0 : startingLineCacheEntry.maxX) || 0;
          var startingMaxY = (startingLineCacheEntry === null || startingLineCacheEntry === void 0 ? void 0 : startingLineCacheEntry.maxY) || 0;
          var maxX = startingMaxX;
          var maxY = startingMaxY;
          var curX = startX;
          var curY = startY;
          var bufferOffset = 0;
          /**
           * Buffer offset to last word boundry. This is -1 when we aren't in a word boundry.
           */
          var lastWord = {
            codepointIndex: -1,
            bufferOffset: -1,
            xStart: -1
          };
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          var shaper = trFontFace.shaper;
          var shaperProps = {
            letterSpacing: vertexLSpacing
          };
          // Get glyphs
          var glyphs = shaper.shapeText(shaperProps, new PeekableIterator(getUnicodeCodepoints(text, startingCodepointIndex), startingCodepointIndex));
          var glyphResult;
          var curLineBufferStart = -1;
          var bufferLineInfos = [];
          var vertexTruncateHeight = height / fontSizeRatio;
          var overflowSuffVertexWidth = measureText(overflowSuffix, shaperProps, shaper);
          // Line-by-line layout
          var moreLines = true;
          while (moreLines) {
            var nextLineWillFit = (maxLines === 0 || curLineIndex + 1 < maxLines) && (contain !== 'both' || scrollable || curY + vertexLineHeight + trFontFace.maxCharHeight <= vertexTruncateHeight);
            var lineVertexW = nextLineWillFit ? vertexW : vertexW - overflowSuffVertexWidth;
            /**
             * Vertex X position to the beginning of the last word boundary. This becomes -1 when we start traversing a word.
             */
            var xStartLastWordBoundary = 0;
            var lineIsBelowWindowTop = curY + trFontFace.maxCharHeight >= rwSdf.y1;
            var lineIsAboveWindowBottom = curY <= rwSdf.y2;
            var lineIsWithinWindow = lineIsBelowWindowTop && lineIsAboveWindowBottom;
            // Layout glyphs in this line
            // Any break statements in this while loop will trigger a line break
            while ((glyphResult = glyphs.next()) && !glyphResult.done) {
              var glyph = glyphResult.value;
              if (curLineIndex === lineCache.length) {
                lineCache.push({
                  codepointIndex: glyph.cluster,
                  maxY,
                  maxX
                });
              } else if (curLineIndex > lineCache.length) {
                throw new Error('Unexpected lineCache length');
              }
              // If we encounter a word boundary (white space or newline) we invalidate
              // the lastWord and set the xStartLastWordBoundary if we haven't already.
              if (glyph.codepoint === 32 || glyph.codepoint === 10) {
                if (lastWord.codepointIndex !== -1) {
                  lastWord.codepointIndex = -1;
                  xStartLastWordBoundary = curX;
                }
              } else if (lastWord.codepointIndex === -1) {
                lastWord.codepointIndex = glyph.cluster;
                lastWord.bufferOffset = bufferOffset;
                lastWord.xStart = xStartLastWordBoundary;
              }
              if (glyph.mapped) {
                // Mapped glyph
                var charEndX = curX + glyph.xOffset + glyph.width;
                // Word wrap check
                if (
                // We are containing the text
                contain !== 'none' &&
                // The current glyph reaches outside the contained width
                charEndX >= lineVertexW &&
                // There is a last word that we can break to the next line
                lastWord.codepointIndex !== -1 &&
                // Prevents infinite loop when a single word is longer than the width
                lastWord.xStart > 0) {
                  // The current word is about to go off the edge of the container width
                  // Reinitialize the iterator starting at the last word
                  // and proceeding to the next line
                  if (nextLineWillFit) {
                    glyphs = shaper.shapeText(shaperProps, new PeekableIterator(getUnicodeCodepoints(text, lastWord.codepointIndex), lastWord.codepointIndex));
                    bufferOffset = lastWord.bufferOffset;
                    break;
                  } else {
                    glyphs = shaper.shapeText(shaperProps, new PeekableIterator(getUnicodeCodepoints(overflowSuffix, 0), 0));
                    curX = lastWord.xStart;
                    bufferOffset = lastWord.bufferOffset;
                    // HACK: For the rest of the line when inserting the overflow suffix,
                    // set contain = 'none' to prevent an infinite loop.
                    contain = 'none';
                  }
                } else {
                  // This glyph fits, so we can add it to the buffer
                  var quadX = curX + glyph.xOffset;
                  var quadY = curY + glyph.yOffset;
                  // Only add to buffer for rendering if the line is within the render window
                  if (lineIsWithinWindow) {
                    if (curLineBufferStart === -1) {
                      curLineBufferStart = bufferOffset;
                    }
                    var atlasEntry = trFontFace.getAtlasEntry(glyph.glyphId);
                    // Add texture coordinates
                    var u = atlasEntry.x / trFontFace.data.common.scaleW;
                    var v = atlasEntry.y / trFontFace.data.common.scaleH;
                    var uvWidth = atlasEntry.width / trFontFace.data.common.scaleW;
                    var uvHeight = atlasEntry.height / trFontFace.data.common.scaleH;
                    // TODO: (Performance) We can optimize this by using ELEMENT_ARRAY_BUFFER
                    // eliminating the need to duplicate vertices
                    // Top-left
                    vertexBuffer[bufferOffset++] = quadX;
                    vertexBuffer[bufferOffset++] = quadY;
                    vertexBuffer[bufferOffset++] = u;
                    vertexBuffer[bufferOffset++] = v;
                    // Top-right
                    vertexBuffer[bufferOffset++] = quadX + glyph.width;
                    vertexBuffer[bufferOffset++] = quadY;
                    vertexBuffer[bufferOffset++] = u + uvWidth;
                    vertexBuffer[bufferOffset++] = v;
                    // Bottom-left
                    vertexBuffer[bufferOffset++] = quadX;
                    vertexBuffer[bufferOffset++] = quadY + glyph.height;
                    vertexBuffer[bufferOffset++] = u;
                    vertexBuffer[bufferOffset++] = v + uvHeight;
                    // Bottom-right
                    vertexBuffer[bufferOffset++] = quadX + glyph.width;
                    vertexBuffer[bufferOffset++] = quadY + glyph.height;
                    vertexBuffer[bufferOffset++] = u + uvWidth;
                    vertexBuffer[bufferOffset++] = v + uvHeight;
                  }
                  maxY = Math.max(maxY, quadY + glyph.height);
                  maxX = Math.max(maxX, quadX + glyph.width);
                  curX += glyph.xAdvance;
                }
              } else {
                // Unmapped character
                // Handle newlines
                if (glyph.codepoint === 10) {
                  if (nextLineWillFit) {
                    // The whole line fit, so we can break to the next line
                    break;
                  } else {
                    // The whole line won't fit, so we need to add the overflow suffix
                    glyphs = shaper.shapeText(shaperProps, new PeekableIterator(getUnicodeCodepoints(overflowSuffix, 0), 0));
                    // HACK: For the rest of the line when inserting the overflow suffix,
                    // set contain = 'none' to prevent an infinite loop.
                    contain = 'none';
                  }
                }
              }
            }
            // Prepare for the next line...
            if (curLineBufferStart !== -1) {
              bufferLineInfos.push({
                bufferStart: curLineBufferStart,
                bufferEnd: bufferOffset
              });
              curLineBufferStart = -1;
            }
            curX = 0;
            curY += vertexLineHeight;
            curLineIndex++;
            lastWord.codepointIndex = -1;
            xStartLastWordBoundary = 0;
            // Figure out if there are any more lines to render...
            if (!forceFullLayoutCalc && contain === 'both' && curY > rwSdf.y2) {
              // Stop layout calculation early (for performance purposes) if:
              // - We're not forcing a full layout calculation (for width/height calculation)
              // - ...and we're containing the text vertically+horizontally (contain === 'both')
              // - ...and we have a render window
              // - ...and the next line is below the bottom of the render window
              moreLines = false;
            } else if (glyphResult && glyphResult.done) {
              // If we've reached the end of the text, we know we're done
              moreLines = false;
            } else if (!nextLineWillFit) {
              // If we're contained vertically+horizontally (contain === 'both')
              // but not scrollable and the next line won't fit, we're done.
              moreLines = false;
            }
          }
          // Use textAlign to determine if we need to adjust the x position of the text
          // in the buffer line by line
          if (textAlign === 'center') {
            var vertexTextW = contain === 'none' ? maxX : vertexW;
            for (var i = 0; i < bufferLineInfos.length; i++) {
              var line = bufferLineInfos[i];
              // - 4 = the x position of a rightmost vertex
              var lineWidth =
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              vertexBuffer[line.bufferEnd - 4] - vertexBuffer[line.bufferStart];
              var xOffset = (vertexTextW - lineWidth) / 2;
              for (var j = line.bufferStart; j < line.bufferEnd; j += 4) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                vertexBuffer[j] += xOffset;
              }
            }
          } else if (textAlign === 'right') {
            var _vertexTextW = contain === 'none' ? maxX : vertexW;
            for (var _i22 = 0; _i22 < bufferLineInfos.length; _i22++) {
              var _line = bufferLineInfos[_i22];
              var _lineWidth = _line.bufferEnd === _line.bufferStart ? 0 :
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              vertexBuffer[_line.bufferEnd - 4] - vertexBuffer[_line.bufferStart];
              var _xOffset = _vertexTextW - _lineWidth;
              for (var _j = _line.bufferStart; _j < _line.bufferEnd; _j += 4) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                vertexBuffer[_j] += _xOffset;
              }
            }
          }
          assertTruthy(glyphResult);
          return {
            bufferNumFloats: bufferOffset,
            bufferNumQuads: bufferOffset / 16,
            layoutNumCharacters: glyphResult.done ? text.length - startingCodepointIndex : glyphResult.value.cluster - startingCodepointIndex + 1,
            fullyProcessed: !!glyphResult.done,
            maxX,
            maxY,
            numLines: lineCache.length
          };
        }

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        /**
         * Round up to the nearest multiple of the given number.
         *
         * @param value
         * @param multiple
         * @returns
         */
        function roundUpToMultiple(value, multiple) {
          return Math.ceil(value / multiple) * multiple;
        }
        /**
         * Round down to the nearest multiple of the given number.
         *
         * @param value
         * @param multiple
         * @returns
         */
        function roundDownToMultiple(value, multiple) {
          return Math.floor(value / multiple) * multiple;
        }

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        /**
         * Create a render window from the given parameters.
         *
         * @remarks
         * The render window is a rectangle that defines the area of the text that
         * should be rendered. It is used to skip rendering parts of the text that
         * are outside of the render window. The render window is relative to the
         * text's top left corner of the overrall text.
         *
         * @param x The x coordinate of the text element's top left corner relative to the screen.
         * @param y The y coordinate of the text element's top left corner relative to the screen.
         * @param scrollY The amount of pixels to scroll the text vertically.
         * @param lineHeight The number of extra lines to render above and below the visible window.
         * @param visibleWindow The visible window of the text element relative to the screen
         * @returns
         */
        function setRenderWindow(outRenderWindow, x, y, scrollY, lineHeight, bufferMargin, visibleWindow, fontSizeRatio) {
          var screen = outRenderWindow.screen,
            sdf = outRenderWindow.sdf;
          if (!isBoundPositive(visibleWindow)) {
            screen.x1 = 0;
            screen.y1 = 0;
            screen.x2 = 0;
            screen.y2 = 0;
            sdf.x1 = 0;
            sdf.y1 = 0;
            sdf.x2 = 0;
            sdf.y2 = 0;
            outRenderWindow.numLines = 0;
            outRenderWindow.firstLineIdx = 0;
          } else {
            var x1 = visibleWindow.x1 - x;
            var x2 = x1 + (visibleWindow.x2 - visibleWindow.x1);
            var y1Base = visibleWindow.y1 - y + scrollY;
            var y1 = roundDownToMultiple(y1Base - bufferMargin, lineHeight || 1);
            var y2 = roundUpToMultiple(y1Base + (visibleWindow.y2 - visibleWindow.y1) + bufferMargin, lineHeight || 1);
            screen.x1 = x1;
            screen.y1 = y1;
            screen.x2 = x2;
            screen.y2 = y2;
            sdf.x1 = x1 / fontSizeRatio;
            sdf.y1 = y1 / fontSizeRatio;
            sdf.x2 = x2 / fontSizeRatio;
            sdf.y2 = y2 / fontSizeRatio;
            outRenderWindow.numLines = Math.ceil((y2 - y1) / lineHeight);
            outRenderWindow.firstLineIdx = lineHeight ? Math.floor(y1 / lineHeight) : 0;
          }
          outRenderWindow.valid = true;
        }

        /**
         * Calculate the default line height given normalized font metrics
         *
         * @remarks
         * This method may be used for both the WebTrFontFace and SdfTrFontFace font types.
         *
         * @param metrics
         * @param fontSize
         * @returns
         */
        function calcDefaultLineHeight(metrics, fontSize) {
          return fontSize * (metrics.ascender - metrics.descender + metrics.lineGap);
        }

        /*
         * If not stated otherwise in this file or this component's LICENSE file the
         * following copyright and licenses apply:
         *
         * Copyright 2023 Comcast Cable Communications Management, LLC.
         *
         * Licensed under the Apache License, Version 2.0 (the License);
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */
        /**
         * Ephemeral rect object used for calculations
         */
        var tmpRect = {
          x: 0,
          y: 0,
          width: 0,
          height: 0
        };
        /**
         * Singleton class for rendering text using signed distance fields.
         *
         * @remarks
         * SdfTextRenderer supports both single-channel and multi-channel signed distance fields.
         */
        class SdfTextRenderer extends TextRenderer {
          constructor(stage) {
            super(stage);
            /**
             * Map of font family names to a set of font faces.
             */
            _defineProperty(this, "ssdfFontFamilies", {});
            _defineProperty(this, "msdfFontFamilies", {});
            _defineProperty(this, "fontFamilyArray", [this.ssdfFontFamilies, this.msdfFontFamilies]);
            _defineProperty(this, "sdfShader", void 0);
            _defineProperty(this, "rendererBounds", void 0);
            _defineProperty(this, "type", 'sdf');
            this.sdfShader = this.stage.shManager.loadShader('SdfShader').shader;
            this.rendererBounds = {
              x1: 0,
              y1: 0,
              x2: this.stage.options.appWidth,
              y2: this.stage.options.appHeight
            };
          }
          //#region Overrides
          getPropertySetters() {
            return {
              fontFamily: (state, value) => {
                state.props.fontFamily = value;
                this.releaseFontFace(state);
                this.invalidateLayoutCache(state);
              },
              fontWeight: (state, value) => {
                state.props.fontWeight = value;
                this.releaseFontFace(state);
                this.invalidateLayoutCache(state);
              },
              fontStyle: (state, value) => {
                state.props.fontStyle = value;
                this.releaseFontFace(state);
                this.invalidateLayoutCache(state);
              },
              fontStretch: (state, value) => {
                state.props.fontStretch = value;
                this.releaseFontFace(state);
                this.invalidateLayoutCache(state);
              },
              fontSize: (state, value) => {
                state.props.fontSize = value;
                this.invalidateLayoutCache(state);
              },
              text: (state, value) => {
                state.props.text = value;
                this.invalidateLayoutCache(state);
              },
              textAlign: (state, value) => {
                state.props.textAlign = value;
                this.invalidateLayoutCache(state);
              },
              color: (state, value) => {
                state.props.color = value;
              },
              x: (state, value) => {
                state.props.x = value;
                if (state.elementBounds.valid) {
                  this.setElementBoundsX(state);
                  // Only schedule an update if the text is not already rendered
                  // (renderWindow is invalid) and the element possibly overlaps the screen
                  // This is to avoid unnecessary updates when we know text is off-screen
                  if (!state.renderWindow.valid && boundsOverlap(state.elementBounds, this.rendererBounds)) {
                    this.scheduleUpdateState(state);
                  }
                }
              },
              y: (state, value) => {
                state.props.y = value;
                if (state.elementBounds.valid) {
                  this.setElementBoundsY(state);
                  // See x() for explanation
                  if (!state.renderWindow.valid && boundsOverlap(state.elementBounds, this.rendererBounds)) {
                    this.scheduleUpdateState(state);
                  }
                }
              },
              contain: (state, value) => {
                state.props.contain = value;
                this.invalidateLayoutCache(state);
              },
              width: (state, value) => {
                state.props.width = value;
                // Only invalidate layout cache if we're containing in the horizontal direction
                if (state.props.contain !== 'none') {
                  this.invalidateLayoutCache(state);
                }
              },
              height: (state, value) => {
                state.props.height = value;
                // Only invalidate layout cache if we're containing in the vertical direction
                if (state.props.contain === 'both') {
                  this.invalidateLayoutCache(state);
                }
              },
              offsetY: (state, value) => {
                state.props.offsetY = value;
                this.invalidateLayoutCache(state);
              },
              scrollable: (state, value) => {
                state.props.scrollable = value;
                this.invalidateLayoutCache(state);
              },
              scrollY: (state, value) => {
                state.props.scrollY = value;
                // Scrolling doesn't need to invalidate any caches, but it does need to
                // schedule an update
                this.scheduleUpdateState(state);
              },
              letterSpacing: (state, value) => {
                state.props.letterSpacing = value;
                this.invalidateLayoutCache(state);
              },
              lineHeight: (state, value) => {
                state.props.lineHeight = value;
                state.resLineHeight = undefined;
                this.invalidateLayoutCache(state);
              },
              maxLines: (state, value) => {
                state.props.maxLines = value;
                this.invalidateLayoutCache(state);
              },
              textBaseline: (state, value) => {
                state.props.textBaseline = value;
                this.invalidateLayoutCache(state);
              },
              verticalAlign: (state, value) => {
                state.props.verticalAlign = value;
                this.invalidateLayoutCache(state);
              },
              overflowSuffix: (state, value) => {
                state.props.overflowSuffix = value;
                this.invalidateLayoutCache(state);
              },
              debug: (state, value) => {
                state.props.debug = value;
              }
            };
          }
          canRenderFont(props) {
            // TODO: Support matching on font stretch, weight and style (if/when needed)
            // For now we just match on the font family name
            // '$$SDF_FAILURE_TEST$$' is used to test the 'failure' event coming from text
            var fontFamily = props.fontFamily;
            return fontFamily in this.ssdfFontFamilies || fontFamily in this.msdfFontFamilies || fontFamily === '$$SDF_FAILURE_TEST$$';
          }
          isFontFaceSupported(fontFace) {
            return fontFace instanceof SdfTrFontFace;
          }
          addFontFace(fontFace) {
            // Make sure the font face is an SDF font face (it should have already passed
            // the `isFontFaceSupported` check)
            assertTruthy(fontFace instanceof SdfTrFontFace);
            var familyName = fontFace.fontFamily;
            var fontFamiles = fontFace.type === 'ssdf' ? this.ssdfFontFamilies : fontFace.type === 'msdf' ? this.msdfFontFamilies : undefined;
            if (!fontFamiles) {
              console.warn(`Invalid font face type: ${fontFace.type}`);
              return;
            }
            var faceSet = fontFamiles[familyName];
            if (!faceSet) {
              faceSet = new Set();
              fontFamiles[familyName] = faceSet;
            }
            faceSet.add(fontFace);
          }
          createState(props) {
            return {
              props,
              status: 'initialState',
              updateScheduled: false,
              emitter: new EventEmitter(),
              lineCache: [],
              forceFullLayoutCalc: false,
              renderWindow: {
                screen: {
                  x1: 0,
                  y1: 0,
                  x2: 0,
                  y2: 0
                },
                sdf: {
                  x1: 0,
                  y1: 0,
                  x2: 0,
                  y2: 0
                },
                firstLineIdx: 0,
                numLines: 0,
                valid: false
              },
              elementBounds: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 0,
                valid: false
              },
              clippingRect: {
                x: 0,
                y: 0,
                width: 0,
                height: 0,
                valid: false
              },
              bufferNumFloats: 0,
              bufferNumQuads: 0,
              vertexBuffer: undefined,
              webGlBuffers: null,
              bufferUploaded: false,
              textH: undefined,
              textW: undefined,
              distanceRange: 0,
              trFontFace: undefined,
              isRenderable: false,
              resLineHeight: undefined,
              debugData: {
                updateCount: 0,
                layoutCount: 0,
                lastLayoutNumCharacters: 0,
                layoutSum: 0,
                drawSum: 0,
                drawCount: 0,
                bufferSize: 0
              }
            };
          }
          updateState(state) {
            var trFontFace = state.trFontFace;
            var textH = state.textH,
              lineCache = state.lineCache,
              debugData = state.debugData,
              forceFullLayoutCalc = state.forceFullLayoutCalc;
            debugData.updateCount++;
            // On the first update call we need to set the status to loading
            if (state.status === 'initialState') {
              this.setStatus(state, 'loading');
            }
            // Resolve font face if we haven't yet
            if (!trFontFace) {
              trFontFace = this.resolveFontFace(state.props);
              state.trFontFace = trFontFace;
              if (!trFontFace) {
                var msg = `SdfTextRenderer: Could not resolve font face for family: '${state.props.fontFamily}'`;
                console.error(msg);
                this.setStatus(state, 'failed', new Error(msg));
                return;
              }
              trFontFace.texture.setRenderableOwner(state, true);
            }
            // If the font hasn't been loaded yet, stop here.
            // Listen for the 'loaded' event and forward fontLoaded event
            if (!trFontFace.loaded) {
              trFontFace.once('loaded', () => {
                this.scheduleUpdateState(state);
              });
              return;
            }
            // If the font is loaded then so should the data
            assertTruthy(trFontFace.data, 'Font face data should be loaded');
            assertTruthy(trFontFace.metrics, 'Font face metrics should be loaded');
            var _state$props = state.props,
              text = _state$props.text,
              fontSize = _state$props.fontSize,
              x = _state$props.x,
              y = _state$props.y,
              contain = _state$props.contain,
              width = _state$props.width,
              height = _state$props.height,
              verticalAlign = _state$props.verticalAlign,
              scrollable = _state$props.scrollable,
              overflowSuffix = _state$props.overflowSuffix,
              maxLines = _state$props.maxLines;
            // scrollY only has an effect when contain === 'both' and scrollable === true
            var scrollY = contain === 'both' && scrollable ? state.props.scrollY : 0;
            var renderWindow = state.renderWindow;
            /**
             * The font size of the SDF font face (the basis for SDF space units)
             */
            var sdfFontSize = trFontFace.data.info.size;
            /**
             * Divide screen space units by this to get the SDF space units
             * Mulitple SDF space units by this to get screen space units
             */
            var fontSizeRatio = fontSize / sdfFontSize;
            // If not already resolved, resolve the line height and store it in the state
            var resLineHeight = state.resLineHeight;
            if (resLineHeight === undefined) {
              var lineHeight = state.props.lineHeight;
              // If lineHeight is undefined, use the maxCharHeight from the font face
              if (lineHeight === undefined) {
                resLineHeight = calcDefaultLineHeight(trFontFace.metrics, fontSize);
              } else {
                resLineHeight = lineHeight;
              }
              state.resLineHeight = resLineHeight;
            }
            // Needed in renderWindow calculation
            var sdfLineHeight = resLineHeight / fontSizeRatio;
            state.distanceRange = fontSizeRatio * trFontFace.data.distanceField.distanceRange;
            // Allocate buffers if needed
            var neededLength = text.length * FLOATS_PER_GLYPH;
            var vertexBuffer = state.vertexBuffer;
            if (!vertexBuffer || vertexBuffer.length < neededLength) {
              vertexBuffer = new Float32Array(neededLength * 2);
            }
            var elementBounds = state.elementBounds;
            if (!elementBounds.valid) {
              this.setElementBoundsX(state);
              this.setElementBoundsY(state);
              elementBounds.valid = true;
            }
            // Return early if we're still viewing inside the established render window
            // No need to re-render what we've already rendered
            // (Only if there's an established renderWindow and we're not suppressing early exit)
            if (!forceFullLayoutCalc && renderWindow.valid) {
              var rwScreen = renderWindow.screen;
              if (x + rwScreen.x1 <= elementBounds.x1 && x + rwScreen.x2 >= elementBounds.x2 && y - scrollY + rwScreen.y1 <= elementBounds.y1 && y - scrollY + rwScreen.y2 >= elementBounds.y2) {
                this.setStatus(state, 'loaded');
                return;
              }
              // Otherwise invalidate the renderWindow so it can be redone
              renderWindow.valid = false;
              this.setStatus(state, 'loading');
            }
            var _state$props2 = state.props,
              offsetY = _state$props2.offsetY,
              textAlign = _state$props2.textAlign;
            // Create a new renderWindow if needed
            if (!renderWindow.valid) {
              var isPossiblyOnScreen = boundsOverlap(elementBounds, this.rendererBounds);
              if (!isPossiblyOnScreen) {
                // If the element is not possibly on screen, we can skip the layout and rendering completely
                return;
              }
              setRenderWindow(renderWindow, x, y, scrollY, resLineHeight, contain === 'both' ? elementBounds.y2 - elementBounds.y1 : 0, elementBounds, fontSizeRatio);
              // console.log('newRenderWindow', renderWindow);
            }
            var start = getStartConditions(sdfFontSize, sdfLineHeight, trFontFace, verticalAlign, offsetY, fontSizeRatio, renderWindow, lineCache, textH);
            if (!start) {
              // Nothing to render, return early, but still mark as loaded (since the text is just scrolled
              // out of view)
              this.setStatus(state, 'loaded');
              return;
            }
            var letterSpacing = state.props.letterSpacing;
            var out2 = layoutText(start.lineIndex, start.sdfX, start.sdfY, text, textAlign, width, height, fontSize, resLineHeight, letterSpacing, vertexBuffer, contain, lineCache, renderWindow.sdf, trFontFace, forceFullLayoutCalc, scrollable, overflowSuffix, maxLines);
            state.bufferUploaded = false;
            state.bufferNumFloats = out2.bufferNumFloats;
            state.bufferNumQuads = out2.bufferNumQuads;
            state.vertexBuffer = vertexBuffer;
            state.renderWindow = renderWindow;
            debugData.lastLayoutNumCharacters = out2.layoutNumCharacters;
            debugData.bufferSize = vertexBuffer.byteLength;
            // If we didn't exit early, we know we have completely computed w/h
            if (out2.fullyProcessed) {
              state.textW = out2.maxX * fontSizeRatio;
              state.textH = out2.numLines * sdfLineHeight * fontSizeRatio;
            }
            // if (state.props.debug.printLayoutTime) {
            //   debugData.layoutSum += performance.now() - updateStartTime;
            //   debugData.layoutCount++;
            // }
            this.setStatus(state, 'loaded');
          }
          renderQuads(state, transform, clippingRect, alpha, parentHasRenderTexture, framebufferDimensions) {
            var _trFontFace$data, _state$trFontFace;
            if (!state.vertexBuffer) {
              // Nothing to draw
              return;
            }
            var renderer = this.stage.renderer;
            assertTruthy(renderer instanceof WebGlCoreRenderer);
            var _state$props3 = state.props,
              fontSize = _state$props3.fontSize,
              color = _state$props3.color,
              contain = _state$props3.contain,
              scrollable = _state$props3.scrollable,
              zIndex = _state$props3.zIndex,
              debug = _state$props3.debug;
            // scrollY only has an effect when contain === 'both' and scrollable === true
            var scrollY = contain === 'both' && scrollable ? state.props.scrollY : 0;
            var _state$textW = state.textW,
              textW = _state$textW === void 0 ? 0 : _state$textW,
              _state$textH = state.textH,
              textH = _state$textH === void 0 ? 0 : _state$textH,
              distanceRange = state.distanceRange,
              vertexBuffer = state.vertexBuffer,
              bufferUploaded = state.bufferUploaded,
              trFontFace = state.trFontFace,
              elementBounds = state.elementBounds;
            var webGlBuffers = state.webGlBuffers;
            if (!webGlBuffers) {
              var glw = renderer.glw;
              var stride = 4 * Float32Array.BYTES_PER_ELEMENT;
              var webGlBuffer = glw.createBuffer();
              assertTruthy(webGlBuffer);
              state.webGlBuffers = new BufferCollection([{
                buffer: webGlBuffer,
                attributes: {
                  a_position: {
                    name: 'a_position',
                    size: 2,
                    type: glw.FLOAT,
                    normalized: false,
                    stride,
                    offset: 0 // start at the beginning of the buffer
                  },
                  a_textureCoordinate: {
                    name: 'a_textureCoordinate',
                    size: 2,
                    type: glw.FLOAT,
                    normalized: false,
                    stride,
                    offset: 2 * Float32Array.BYTES_PER_ELEMENT
                  }
                }
              }]);
              state.bufferUploaded = false;
              assertTruthy(state.webGlBuffers);
              webGlBuffers = state.webGlBuffers;
            }
            if (!bufferUploaded) {
              var _webGlBuffers$getBuff, _webGlBuffers;
              var _glw = renderer.glw;
              var buffer = (_webGlBuffers$getBuff = (_webGlBuffers = webGlBuffers) === null || _webGlBuffers === void 0 ? void 0 : _webGlBuffers.getBuffer('a_textureCoordinate')) !== null && _webGlBuffers$getBuff !== void 0 ? _webGlBuffers$getBuff : null;
              _glw.arrayBufferData(buffer, vertexBuffer, _glw.STATIC_DRAW);
              state.bufferUploaded = true;
            }
            assertTruthy(trFontFace);
            if (scrollable && contain === 'both') {
              assertTruthy(elementBounds.valid);
              var elementRect = convertBoundToRect(elementBounds, tmpRect);
              if (clippingRect.valid) {
                state.clippingRect.valid = true;
                clippingRect = intersectRect(clippingRect, elementRect, state.clippingRect);
              } else {
                state.clippingRect.valid = true;
                clippingRect = copyRect(elementRect, state.clippingRect);
              }
            }
            var renderOp = new WebGlCoreRenderOp(renderer.glw, renderer.options, webGlBuffers, this.sdfShader, {
              transform: transform.getFloatArr(),
              // IMPORTANT: The SDF Shader expects the color NOT to be premultiplied
              // for the best blending results. Which is why we use `mergeColorAlpha`
              // instead of `mergeColorAlphaPremultiplied` here.
              color: mergeColorAlpha(color, alpha),
              size: fontSize / (((_trFontFace$data = trFontFace.data) === null || _trFontFace$data === void 0 ? void 0 : _trFontFace$data.info.size) || 0),
              scrollY,
              distanceRange,
              debug: debug.sdfShaderDebug
            }, alpha, clippingRect, {
              height: textH,
              width: textW
            }, 0, zIndex, false, parentHasRenderTexture, framebufferDimensions);
            var texture = (_state$trFontFace = state.trFontFace) === null || _state$trFontFace === void 0 ? void 0 : _state$trFontFace.texture;
            assertTruthy(texture);
            var ctxTexture = texture.ctxTexture;
            renderOp.addTexture(ctxTexture);
            renderOp.length = state.bufferNumFloats;
            renderOp.numQuads = state.bufferNumQuads;
            renderer.addRenderOp(renderOp);
            // if (!debug.disableScissor) {
            //   renderer.enableScissor(
            //     visibleRect.x,
            //     visibleRect.y,
            //     visibleRect.w,
            //     visibleRect.h,
            //   );
            // }
            // Draw the arrays
            // gl.drawArrays(
            //   gl.TRIANGLES, // Primitive type
            //   0,
            //   bufferNumVertices, // Number of verticies
            // );
            // renderer.disableScissor();
            // if (debug.showElementRect) {
            //   this.renderer.drawBorder(
            //     Colors.Blue,
            //     elementRect.x,
            //     elementRect.y,
            //     elementRect.w,
            //     elementRect.h,
            //   );
            // }
            // if (debug.showVisibleRect) {
            //   this.renderer.drawBorder(
            //     Colors.Green,
            //     visibleRect.x,
            //     visibleRect.y,
            //     visibleRect.w,
            //     visibleRect.h,
            //   );
            // }
            // if (debug.showRenderWindow && renderWindow) {
            //   this.renderer.drawBorder(
            //     Colors.Red,
            //     x + renderWindow.x1,
            //     y + renderWindow.y1 - scrollY,
            //     x + renderWindow.x2 - (x + renderWindow.x1),
            //     y + renderWindow.y2 - scrollY - (y + renderWindow.y1 - scrollY),
            //   );
            // }
            // if (debug.printLayoutTime) {
            //   debugData.drawSum += performance.now() - drawStartTime;
            //   debugData.drawCount++;
            // }
          }
          setIsRenderable(state, renderable) {
            var _state$trFontFace2;
            super.setIsRenderable(state, renderable);
            (_state$trFontFace2 = state.trFontFace) === null || _state$trFontFace2 === void 0 || _state$trFontFace2.texture.setRenderableOwner(state, renderable);
          }
          destroyState(state) {
            var _state$trFontFace3;
            super.destroyState(state);
            // If there's a Font Face assigned we must free the owner relation to its texture
            (_state$trFontFace3 = state.trFontFace) === null || _state$trFontFace3 === void 0 || _state$trFontFace3.texture.setRenderableOwner(state, false);
          }
          //#endregion Overrides
          resolveFontFace(props) {
            return TrFontManager.resolveFontFace(this.fontFamilyArray, props);
          }
          /**
           * Release the loaded SDF font face
           *
           * @param state
           */
          releaseFontFace(state) {
            state.resLineHeight = undefined;
            if (state.trFontFace) {
              state.trFontFace.texture.setRenderableOwner(state, false);
              state.trFontFace = undefined;
            }
          }
          /**
           * Invalidate the layout cache stored in the state. This will cause the text
           * to be re-layed out on the next update.
           *
           * @remarks
           * This also invalidates the visible window cache.
           *
           * @param state
           */
          invalidateLayoutCache(state) {
            state.renderWindow.valid = false;
            state.elementBounds.valid = false;
            state.textH = undefined;
            state.textW = undefined;
            state.lineCache = [];
            this.setStatus(state, 'loading');
            this.scheduleUpdateState(state);
          }
          setElementBoundsX(state) {
            var _state$props4 = state.props,
              x = _state$props4.x,
              contain = _state$props4.contain,
              width = _state$props4.width;
            var elementBounds = state.elementBounds;
            elementBounds.x1 = x;
            elementBounds.x2 = contain !== 'none' ? x + width : Infinity;
          }
          setElementBoundsY(state) {
            var _state$props5 = state.props,
              y = _state$props5.y,
              contain = _state$props5.contain,
              height = _state$props5.height;
            var elementBounds = state.elementBounds;
            elementBounds.y1 = y;
            elementBounds.y2 = contain === 'both' ? y + height : Infinity;
          }
        }
        var stylePropertyMap = {
          alpha: v => {
            if (v === 1) {
              return null;
            }
            return {
              prop: 'opacity',
              value: `${v}`
            };
          },
          x: _x5 => {
            return {
              prop: 'left',
              value: `${_x5}px`
            };
          },
          y: _y => {
            return {
              prop: 'top',
              value: `${_y}px`
            };
          },
          width: w => {
            if (w === 0) {
              return null;
            }
            return {
              prop: 'width',
              value: `${w}px`
            };
          },
          height: h => {
            if (h === 0) {
              return null;
            }
            return {
              prop: 'height',
              value: `${h}px`
            };
          },
          zIndex: () => 'zIndex',
          fontFamily: () => 'font-family',
          fontSize: () => 'font-size',
          fontStyle: () => 'font-style',
          fontWeight: () => 'font-weight',
          fontStretch: () => 'font-stretch',
          lineHeight: () => 'line-height',
          letterSpacing: () => 'letter-spacing',
          textAlign: () => 'text-align',
          overflowSuffix: () => 'overflow-suffix',
          maxLines: () => 'max-lines',
          contain: () => 'contain',
          verticalAlign: () => 'vertical-align',
          clipping: v => {
            if (v === false) {
              return null;
            }
            return {
              prop: 'overflow',
              value: v ? 'hidden' : 'visible'
            };
          },
          rotation: v => {
            if (v === 0) {
              return null;
            }
            return {
              prop: 'transform',
              value: `rotate(${v}rad)`
            };
          },
          scale: v => {
            if (v === 1) {
              return null;
            }
            return {
              prop: 'transform',
              value: `scale(${v})`
            };
          },
          scaleX: v => {
            if (v === 1) {
              return null;
            }
            return {
              prop: 'transform',
              value: `scaleX(${v})`
            };
          },
          scaleY: v => {
            if (v === 1) {
              return null;
            }
            return {
              prop: 'transform',
              value: `scaleY(${v})`
            };
          },
          color: v => {
            if (v === 0) {
              return null;
            }
            return {
              prop: 'color',
              value: convertColorToRgba(v)
            };
          }
        };
        var convertColorToRgba = color => {
          var a = (color & 0xff) / 255;
          var b = color >> 8 & 0xff;
          var g = color >> 16 & 0xff;
          var r = color >> 24 & 0xff;
          return `rgba(${r},${g},${b},${a})`;
        };
        var domPropertyMap = {
          id: 'test-id'
        };
        class Inspector {
          constructor(canvas, settings) {
            var _settings$appHeight, _settings$deviceLogic, _settings$appWidth, _settings$deviceLogic2, _settings$deviceLogic3, _settings$deviceLogic4;
            _defineProperty(this, "root", null);
            _defineProperty(this, "canvas", null);
            _defineProperty(this, "height", 1080);
            _defineProperty(this, "width", 1920);
            _defineProperty(this, "scaleX", 1);
            _defineProperty(this, "scaleY", 1);
            if (isProductionEnvironment()) return;
            if (!settings) {
              throw new Error('settings is required');
            }
            // calc dimensions based on the devicePixelRatio
            this.height = Math.ceil((_settings$appHeight = settings.appHeight) !== null && _settings$appHeight !== void 0 ? _settings$appHeight : 1080 / ((_settings$deviceLogic = settings.deviceLogicalPixelRatio) !== null && _settings$deviceLogic !== void 0 ? _settings$deviceLogic : 1));
            this.width = Math.ceil((_settings$appWidth = settings.appWidth) !== null && _settings$appWidth !== void 0 ? _settings$appWidth : 1920 / ((_settings$deviceLogic2 = settings.deviceLogicalPixelRatio) !== null && _settings$deviceLogic2 !== void 0 ? _settings$deviceLogic2 : 1));
            this.scaleX = (_settings$deviceLogic3 = settings.deviceLogicalPixelRatio) !== null && _settings$deviceLogic3 !== void 0 ? _settings$deviceLogic3 : 1;
            this.scaleY = (_settings$deviceLogic4 = settings.deviceLogicalPixelRatio) !== null && _settings$deviceLogic4 !== void 0 ? _settings$deviceLogic4 : 1;
            this.canvas = canvas;
            this.root = document.createElement('div');
            this.setRootPosition();
            document.body.appendChild(this.root);
            //listen for changes on canvas
            var mutationObserver = new MutationObserver(this.setRootPosition.bind(this));
            mutationObserver.observe(canvas, {
              attributes: true,
              childList: false,
              subtree: false
            });
            // Create a ResizeObserver to watch for changes in the element's size
            var resizeObserver = new ResizeObserver(this.setRootPosition.bind(this));
            resizeObserver.observe(canvas);
            //listen for changes on window
            window.addEventListener('resize', this.setRootPosition.bind(this));
            console.warn('Inspector is enabled, this will impact performance');
          }
          setRootPosition() {
            if (this.root === null || this.canvas === null) {
              return;
            }
            // get the world position of the canvas object, so we can match the inspector to it
            var rect = this.canvas.getBoundingClientRect();
            var top = document.documentElement.scrollTop + rect.top;
            var left = document.documentElement.scrollLeft + rect.left;
            this.root.id = 'root';
            this.root.style.left = `${left}px`;
            this.root.style.top = `${top}px`;
            this.root.style.width = `${this.width}px`;
            this.root.style.height = `${this.height}px`;
            this.root.style.position = 'absolute';
            this.root.style.transformOrigin = '0 0 0';
            this.root.style.transform = `scale(${this.scaleX}, ${this.scaleY})`;
            this.root.style.overflow = 'hidden';
            this.root.style.zIndex = '65534';
          }
          createDiv(id, properties) {
            var div = document.createElement('div');
            div.style.position = 'absolute';
            div.id = id.toString();
            // set initial properties
            for (var _key24 in properties) {
              this.updateNodeProperty(div,
              // really typescript? really?
              _key24, properties[_key24]);
            }
            return div;
          }
          createNode(node) {
            var div = this.createDiv(node.id, node.props);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
            div.node = node;
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
            node.div = div;
            return this.createProxy(node, div);
          }
          createTextNode(node) {
            var div = this.createDiv(node.id, node.props);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
            div.node = node;
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
            node.div = div;
            return this.createProxy(node, div);
          }
          createProxy(node, div) {
            return new Proxy(node, {
              set: (target, property, value) => {
                this.updateNodeProperty(div, property, value);
                return Reflect.set(target, property, value);
              },
              get: (target, property, receiver) => {
                if (property === 'destroy') {
                  this.destroyNode(target.id);
                }
                if (property === 'animate') {
                  return (props, settings) => {
                    var anim = target.animate(props, settings);
                    // Trap the animate start function so we can update the inspector accordingly
                    return new Proxy(anim, {
                      get: (target, property, receiver) => {
                        if (property === 'start') {
                          this.animateNode(div, props, settings);
                        }
                        return Reflect.get(target, property, receiver);
                      }
                    });
                  };
                }
                return Reflect.get(target, property, receiver);
              }
            });
          }
          destroyNode(id) {
            var div = document.getElementById(id.toString());
            div === null || div === void 0 || div.remove();
          }
          updateNodeProperty(div, property,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          value) {
            if (this.root === null || value === undefined || value === null) {
              return;
            }
            /**
             * Special case for parent property
             */
            if (property === 'parent') {
              var parentId = value.id;
              // only way to detect if the parent is the root node
              // if you are reading this and have a better way, please let me know
              if (parentId === 1) {
                this.root.appendChild(div);
                return;
              }
              var parent = document.getElementById(parentId.toString());
              parent === null || parent === void 0 || parent.appendChild(div);
              return;
            }
            // special case for text
            if (property === 'text') {
              div.innerHTML = String(value);
              // hide text because we can't render SDF fonts
              // it would look weird and obstruct the WebGL rendering
              div.style.visibility = 'hidden';
              return;
            }
            // special case for images
            // we're not setting any CSS properties to avoid images getting loaded twice
            // as the renderer will handle the loading of the image. Setting it to `data-src`
            if (property === 'src' && value) {
              div.setAttribute(`data-src`, String(value));
              return;
            }
            // special case for color gradients (normal colors are handled by the stylePropertyMap)
            // FIXME the renderer seems to return the same number for all colors
            // if (gradientColorPropertyMap.includes(property as string)) {
            //   const color = convertColorToRgba(value as number);
            //   div.setAttribute(`data-${property}`, color);
            //   return;
            // }
            // CSS mappable attribute
            if (stylePropertyMap[property]) {
              var _stylePropertyMap$pro;
              var mappedStyleResponse = (_stylePropertyMap$pro = stylePropertyMap[property]) === null || _stylePropertyMap$pro === void 0 ? void 0 : _stylePropertyMap$pro.call(stylePropertyMap, value);
              if (mappedStyleResponse === null) {
                return;
              }
              if (typeof mappedStyleResponse === 'string') {
                div.style.setProperty(mappedStyleResponse, String(value));
                return;
              }
              if (typeof mappedStyleResponse === 'object') {
                div.style.setProperty(mappedStyleResponse.prop, mappedStyleResponse.value);
              }
              return;
            }
            // DOM properties
            if (domPropertyMap[property]) {
              var domProperty = domPropertyMap[property];
              if (!domProperty) {
                return;
              }
              div.setAttribute(String(domProperty), String(value));
              return;
            }
            // custom data properties
            if (property === 'data') {
              for (var _key25 in value) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                var keyValue = value[_key25];
                if (keyValue === undefined) {
                  div.removeAttribute(`data-${_key25}`);
                } else {
                  div.setAttribute(`data-${_key25}`, String(keyValue));
                }
              }
              return;
            }
          }
          // simple animation handler
          animateNode(div, props, settings) {
            var _settings$duration2 = settings.duration,
              duration = _settings$duration2 === void 0 ? 1000 : _settings$duration2,
              _settings$delay2 = settings.delay,
              delay = _settings$delay2 === void 0 ? 0 : _settings$delay2;
            var x = props.x,
              y = props.y,
              width = props.width,
              height = props.height,
              _props$alpha2 = props.alpha,
              alpha = _props$alpha2 === void 0 ? 1 : _props$alpha2,
              _props$rotation2 = props.rotation,
              rotation = _props$rotation2 === void 0 ? 0 : _props$rotation2,
              _props$scale2 = props.scale,
              scale = _props$scale2 === void 0 ? 1 : _props$scale2,
              color = props.color;
            // ignoring loops and repeats for now, as that might be a bit too much for the inspector
            function animate() {
              setTimeout(() => {
                div.style.top = `${y}px`;
                div.style.left = `${x}px`;
                div.style.width = `${width}px`;
                div.style.height = `${height}px`;
                div.style.opacity = `${alpha}`;
                div.style.rotate = `${rotation}rad`;
                div.style.scale = `${scale}`;
                div.style.color = convertColorToRgba(color);
              }, duration);
            }
            setTimeout(animate, delay);
          }
        }
        var $$EVENTS = "_$DX_DELEGATE";
        function delegateEvents(eventNames, document = window.document) {
          var e = document[$$EVENTS] || (document[$$EVENTS] = new Set());
          for (var i = 0, l = eventNames.length; i < l; i++) {
            var name = eventNames[i];
            if (!e.has(name)) {
              e.add(name);
              document.addEventListener(name, eventHandler);
            }
          }
        }
        function eventHandler(e) {
          if (sharedConfig.registry && sharedConfig.events) {
            if (sharedConfig.events.find(([el, ev]) => ev === e)) return;
          }
          var key = `$$${e.type}`;
          var node = e.composedPath && e.composedPath()[0] || e.target;
          if (e.target !== node) {
            Object.defineProperty(e, "target", {
              configurable: true,
              value: node
            });
          }
          Object.defineProperty(e, "currentTarget", {
            configurable: true,
            get() {
              return node || document;
            }
          });
          if (sharedConfig.registry && !sharedConfig.done) sharedConfig.done = _$HY.done = true;
          while (node) {
            var handler = node[key];
            if (handler && !node.disabled) {
              var data = node[`${key}Data`];
              data !== undefined ? handler.call(node, data, e) : handler.call(node, e);
              if (e.cancelBubble) return;
            }
            node = node._$host || node.parentNode || node.host;
          }
        }
        var voidFn = () => undefined;
        var isServer = false;
        function createBeforeLeave() {
          var listeners = new Set();
          function subscribe(listener) {
            listeners.add(listener);
            return () => listeners.delete(listener);
          }
          var ignore = false;
          function confirm(to, options) {
            if (ignore) return !(ignore = false);
            var e = {
              to,
              options,
              defaultPrevented: false,
              preventDefault: () => e.defaultPrevented = true
            };
            var _iterator17 = _createForOfIteratorHelper(listeners),
              _step17;
            try {
              var _loop8 = function _loop8() {
                var l = _step17.value;
                l.listener(_objectSpread(_objectSpread({}, e), {}, {
                  from: l.location,
                  retry: force => {
                    force && (ignore = true);
                    l.navigate(to, _objectSpread(_objectSpread({}, options), {}, {
                      resolve: false
                    }));
                  }
                }));
              };
              for (_iterator17.s(); !(_step17 = _iterator17.n()).done;) {
                _loop8();
              }
            } catch (err) {
              _iterator17.e(err);
            } finally {
              _iterator17.f();
            }
            return !e.defaultPrevented;
          }
          return {
            subscribe,
            confirm
          };
        }
        // The following supports browser initiated blocking (eg back/forward)
        var depth;
        function saveCurrentDepth() {
          if (!window.history.state || window.history.state._depth == null) {
            window.history.replaceState(_objectSpread(_objectSpread({}, window.history.state), {}, {
              _depth: window.history.length - 1
            }), "");
          }
          depth = window.history.state._depth;
        }
        {
          saveCurrentDepth();
        }
        function keepDepth(state) {
          return _objectSpread(_objectSpread({}, state), {}, {
            _depth: window.history.state && window.history.state._depth
          });
        }
        function notifyIfNotBlocked(notify, block) {
          var ignore = false;
          return () => {
            var prevDepth = depth;
            saveCurrentDepth();
            var delta = prevDepth == null ? null : depth - prevDepth;
            if (ignore) {
              ignore = false;
              return;
            }
            if (delta && block(delta)) {
              ignore = true;
              window.history.go(-delta);
            } else {
              notify();
            }
          };
        }
        var hasSchemeRegex = /^(?:[a-z0-9]+:)?\/\//i;
        var trimPathRegex = /^\/+|(\/)\/+$/g;
        var mockBase = "http://sr";
        function normalizePath(path, omitSlash = false) {
          var s = path.replace(trimPathRegex, "$1");
          return s ? omitSlash || /^[?#]/.test(s) ? s : "/" + s : "";
        }
        function resolvePath(base, path, from) {
          if (hasSchemeRegex.test(path)) {
            return undefined;
          }
          var basePath = normalizePath(base);
          var fromPath = from && normalizePath(from);
          var result = "";
          if (!fromPath || path.startsWith("/")) {
            result = basePath;
          } else if (fromPath.toLowerCase().indexOf(basePath.toLowerCase()) !== 0) {
            result = basePath + fromPath;
          } else {
            result = fromPath;
          }
          return (result || "/") + normalizePath(path, !result);
        }
        function invariant(value, message) {
          if (value == null) {
            throw new Error(message);
          }
          return value;
        }
        function joinPaths(from, to) {
          return normalizePath(from).replace(/\/*(\*.*)?$/g, "") + normalizePath(to);
        }
        function extractSearchParams(url) {
          var params = {};
          url.searchParams.forEach((value, key) => {
            params[key] = value;
          });
          return params;
        }
        function createMatcher(path, partial, matchFilters) {
          var _path$split = path.split("/*", 2),
            _path$split2 = _slicedToArray(_path$split, 2),
            pattern = _path$split2[0],
            splat = _path$split2[1];
          var segments = pattern.split("/").filter(Boolean);
          var len = segments.length;
          return location => {
            var locSegments = location.split("/").filter(Boolean);
            var lenDiff = locSegments.length - len;
            if (lenDiff < 0 || lenDiff > 0 && splat === undefined && !partial) {
              return null;
            }
            var match = {
              path: len ? "" : "/",
              params: {}
            };
            var matchFilter = s => matchFilters === undefined ? undefined : matchFilters[s];
            for (var i = 0; i < len; i++) {
              var segment = segments[i];
              var locSegment = locSegments[i];
              var dynamic = segment[0] === ":";
              var _key26 = dynamic ? segment.slice(1) : segment;
              if (dynamic && matchSegment(locSegment, matchFilter(_key26))) {
                match.params[_key26] = locSegment;
              } else if (dynamic || !matchSegment(locSegment, segment)) {
                return null;
              }
              match.path += `/${locSegment}`;
            }
            if (splat) {
              var remainder = lenDiff ? locSegments.slice(-lenDiff).join("/") : "";
              if (matchSegment(remainder, matchFilter(splat))) {
                match.params[splat] = remainder;
              } else {
                return null;
              }
            }
            return match;
          };
        }
        function matchSegment(input, filter) {
          var isEqual = s => s.localeCompare(input, undefined, {
            sensitivity: "base"
          }) === 0;
          if (filter === undefined) {
            return true;
          } else if (typeof filter === "string") {
            return isEqual(filter);
          } else if (typeof filter === "function") {
            return filter(input);
          } else if (Array.isArray(filter)) {
            return filter.some(isEqual);
          } else if (filter instanceof RegExp) {
            return filter.test(input);
          }
          return false;
        }
        function scoreRoute(route) {
          var _route$pattern$split = route.pattern.split("/*", 2),
            _route$pattern$split2 = _slicedToArray(_route$pattern$split, 2),
            pattern = _route$pattern$split2[0],
            splat = _route$pattern$split2[1];
          var segments = pattern.split("/").filter(Boolean);
          return segments.reduce((score, segment) => score + (segment.startsWith(":") ? 2 : 3), segments.length - (splat === undefined ? 0 : 1));
        }
        function createMemoObject(fn) {
          var map = new Map();
          var owner = getOwner();
          return new Proxy({}, {
            get(_, property) {
              if (!map.has(property)) {
                runWithOwner(owner, () => map.set(property, createMemo(() => fn()[property])));
              }
              return map.get(property)();
            },
            getOwnPropertyDescriptor() {
              return {
                enumerable: true,
                configurable: true
              };
            },
            ownKeys() {
              return Reflect.ownKeys(fn());
            }
          });
        }
        function expandOptionals(pattern) {
          var match = /(\/?\:[^\/]+)\?/.exec(pattern);
          if (!match) return [pattern];
          var prefix = pattern.slice(0, match.index);
          var suffix = pattern.slice(match.index + match[0].length);
          var prefixes = [prefix, prefix += match[1]];
          // This section handles adjacent optional params. We don't actually want all permuations since
          // that will lead to equivalent routes which have the same number of params. For example
          // `/:a?/:b?/:c`? only has the unique expansion: `/`, `/:a`, `/:a/:b`, `/:a/:b/:c` and we can
          // discard `/:b`, `/:c`, `/:b/:c` by building them up in order and not recursing. This also helps
          // ensure predictability where earlier params have precidence.
          while (match = /^(\/\:[^\/]+)\?/.exec(suffix)) {
            prefixes.push(prefix += match[1]);
            suffix = suffix.slice(match[0].length);
          }
          return expandOptionals(suffix).reduce((results, expansion) => [...results, ...prefixes.map(p => p + expansion)], []);
        }
        var MAX_REDIRECTS = 100;
        var RouterContextObj = createContext();
        var RouteContextObj = createContext();
        var useRouter = () => invariant(useContext(RouterContextObj), "<A> and 'use' router primitives can be only used inside a Route.");
        var useNavigate = exports("u", () => useRouter().navigatorFactory());
        var useLocation = () => useRouter().location;
        var useMatch = (path, matchFilters) => {
          var location = useLocation();
          var matchers = createMemo(() => expandOptionals(path()).map(path => createMatcher(path, undefined, matchFilters)));
          return createMemo(() => {
            var _iterator18 = _createForOfIteratorHelper(matchers()),
              _step18;
            try {
              for (_iterator18.s(); !(_step18 = _iterator18.n()).done;) {
                var matcher = _step18.value;
                var match = matcher(location.pathname);
                if (match) return match;
              }
            } catch (err) {
              _iterator18.e(err);
            } finally {
              _iterator18.f();
            }
          });
        };
        var useParams = exports("y", () => useRouter().params);
        function createRoutes(routeDef, base = "") {
          var component = routeDef.component,
            preload = routeDef.preload,
            load = routeDef.load,
            children = routeDef.children,
            info = routeDef.info;
          var isLeaf = !children || Array.isArray(children) && !children.length;
          var shared = {
            key: routeDef,
            component,
            preload: preload || load,
            info
          };
          return asArray(routeDef.path).reduce((acc, originalPath) => {
            var _iterator19 = _createForOfIteratorHelper(expandOptionals(originalPath)),
              _step19;
            try {
              for (_iterator19.s(); !(_step19 = _iterator19.n()).done;) {
                var expandedPath = _step19.value;
                var path = joinPaths(base, expandedPath);
                var pattern = isLeaf ? path : path.split("/*", 1)[0];
                pattern = pattern.split("/").map(s => {
                  return s.startsWith(":") || s.startsWith("*") ? s : encodeURIComponent(s);
                }).join("/");
                acc.push(_objectSpread(_objectSpread({}, shared), {}, {
                  originalPath,
                  pattern,
                  matcher: createMatcher(pattern, !isLeaf, routeDef.matchFilters)
                }));
              }
            } catch (err) {
              _iterator19.e(err);
            } finally {
              _iterator19.f();
            }
            return acc;
          }, []);
        }
        function createBranch(routes, index = 0) {
          return {
            routes,
            score: scoreRoute(routes[routes.length - 1]) * 10000 - index,
            matcher(location) {
              var matches = [];
              for (var i = routes.length - 1; i >= 0; i--) {
                var route = routes[i];
                var match = route.matcher(location);
                if (!match) {
                  return null;
                }
                matches.unshift(_objectSpread(_objectSpread({}, match), {}, {
                  route
                }));
              }
              return matches;
            }
          };
        }
        function asArray(value) {
          return Array.isArray(value) ? value : [value];
        }
        function createBranches(routeDef, base = "", stack = [], branches = []) {
          var routeDefs = asArray(routeDef);
          for (var i = 0, len = routeDefs.length; i < len; i++) {
            var def = routeDefs[i];
            if (def && typeof def === "object") {
              if (!def.hasOwnProperty("path")) def.path = "";
              var routes = createRoutes(def, base);
              var _iterator20 = _createForOfIteratorHelper(routes),
                _step20;
              try {
                for (_iterator20.s(); !(_step20 = _iterator20.n()).done;) {
                  var route = _step20.value;
                  stack.push(route);
                  var isEmptyArray = Array.isArray(def.children) && def.children.length === 0;
                  if (def.children && !isEmptyArray) {
                    createBranches(def.children, route.pattern, stack, branches);
                  } else {
                    var branch = createBranch([...stack], branches.length);
                    branches.push(branch);
                  }
                  stack.pop();
                }
              } catch (err) {
                _iterator20.e(err);
              } finally {
                _iterator20.f();
              }
            }
          }
          // Stack will be empty on final return
          return stack.length ? branches : branches.sort((a, b) => b.score - a.score);
        }
        function getRouteMatches(branches, location) {
          for (var i = 0, len = branches.length; i < len; i++) {
            var match = branches[i].matcher(location);
            if (match) {
              return match;
            }
          }
          return [];
        }
        function createLocation(path, state) {
          var origin = new URL(mockBase);
          var url = createMemo(prev => {
            var path_ = path();
            try {
              return new URL(path_, origin);
            } catch (err) {
              console.error(`Invalid path ${path_}`);
              return prev;
            }
          }, origin, {
            equals: (a, b) => a.href === b.href
          });
          var pathname = createMemo(() => url().pathname);
          var search = createMemo(() => url().search, true);
          var hash = createMemo(() => url().hash);
          var key = () => "";
          return {
            get pathname() {
              return pathname();
            },
            get search() {
              return search();
            },
            get hash() {
              return hash();
            },
            get state() {
              return state();
            },
            get key() {
              return key();
            },
            query: createMemoObject(on(search, () => extractSearchParams(url())))
          };
        }
        var intent;
        function getIntent() {
          return intent;
        }
        function setInPreloadFn(value) {}
        function createRouterContext(integration, branches, getContext, options = {}) {
          var _integration$signal = _slicedToArray(integration.signal, 2),
            source = _integration$signal[0],
            setSource = _integration$signal[1],
            _integration$utils = integration.utils,
            utils = _integration$utils === void 0 ? {} : _integration$utils;
          var parsePath = utils.parsePath || (p => p);
          var renderPath = utils.renderPath || (p => p);
          var beforeLeave = utils.beforeLeave || createBeforeLeave();
          var basePath = resolvePath("", options.base || "");
          if (basePath === undefined) {
            throw new Error(`${basePath} is not a valid base path`);
          } else if (basePath && !source().value) {
            setSource({
              value: basePath,
              replace: true,
              scroll: false
            });
          }
          var _createSignal15 = createSignal(false),
            _createSignal16 = _slicedToArray(_createSignal15, 2),
            isRouting = _createSignal16[0],
            setIsRouting = _createSignal16[1];
          // Keep track of last target, so that last call to transition wins
          var lastTransitionTarget;
          // Transition the location to a new value
          var transition = (newIntent, newTarget) => {
            if (newTarget.value === reference() && newTarget.state === state()) return;
            if (lastTransitionTarget === undefined) setIsRouting(true);
            intent = newIntent;
            lastTransitionTarget = newTarget;
            startTransition(() => {
              if (lastTransitionTarget !== newTarget) return;
              setReference(lastTransitionTarget.value);
              setState(lastTransitionTarget.state);
              submissions[1]([]);
            }).finally(() => {
              if (lastTransitionTarget !== newTarget) return;
              // Batch, in order for isRouting and final source update to happen together
              batch(() => {
                intent = undefined;
                if (newIntent === "navigate") navigateEnd(lastTransitionTarget);
                setIsRouting(false);
                lastTransitionTarget = undefined;
              });
            });
          };
          var _createSignal17 = createSignal(source().value),
            _createSignal18 = _slicedToArray(_createSignal17, 2),
            reference = _createSignal18[0],
            setReference = _createSignal18[1];
          var _createSignal19 = createSignal(source().state),
            _createSignal20 = _slicedToArray(_createSignal19, 2),
            state = _createSignal20[0],
            setState = _createSignal20[1];
          var location = createLocation(reference, state);
          var referrers = [];
          var submissions = createSignal([]);
          var matches = createMemo(() => {
            if (typeof options.transformUrl === "function") {
              return getRouteMatches(branches(), options.transformUrl(location.pathname));
            }
            return getRouteMatches(branches(), location.pathname);
          });
          var params = createMemoObject(() => {
            var m = matches();
            var params = {};
            for (var i = 0; i < m.length; i++) {
              Object.assign(params, m[i].params);
            }
            return params;
          });
          var baseRoute = {
            pattern: basePath,
            path: () => basePath,
            outlet: () => null,
            resolvePath(to) {
              return resolvePath(basePath, to);
            }
          };
          // Create a native transition, when source updates
          createRenderEffect(on(source, source => transition("native", source), {
            defer: true
          }));
          return {
            base: baseRoute,
            location,
            params,
            isRouting,
            renderPath,
            parsePath,
            navigatorFactory,
            matches,
            beforeLeave,
            preloadRoute,
            singleFlight: options.singleFlight === undefined ? true : options.singleFlight,
            submissions
          };
          function navigateFromRoute(route, to, options) {
            // Untrack in case someone navigates in an effect - don't want to track `reference` or route paths
            untrack(() => {
              if (typeof to === "number") {
                if (!to) {
                  // A delta of 0 means stay at the current location, so it is ignored
                } else if (utils.go) {
                  utils.go(to);
                } else {
                  console.warn("Router integration does not support relative routing");
                }
                return;
              }
              var _replace$resolve$scro = _objectSpread({
                  replace: false,
                  resolve: true,
                  scroll: true
                }, options),
                replace = _replace$resolve$scro.replace,
                resolve = _replace$resolve$scro.resolve,
                scroll = _replace$resolve$scro.scroll,
                nextState = _replace$resolve$scro.state;
              var resolvedTo = resolve ? route.resolvePath(to) : resolvePath("", to);
              if (resolvedTo === undefined) {
                throw new Error(`Path '${to}' is not a routable path`);
              } else if (referrers.length >= MAX_REDIRECTS) {
                throw new Error("Too many redirects");
              }
              var current = reference();
              if (resolvedTo !== current || nextState !== state()) {
                if (isServer) ;else if (beforeLeave.confirm(resolvedTo, options)) {
                  referrers.push({
                    value: current,
                    replace,
                    scroll,
                    state: state()
                  });
                  transition("navigate", {
                    value: resolvedTo,
                    state: nextState
                  });
                }
              }
            });
          }
          function navigatorFactory(route) {
            // Workaround for vite issue (https://github.com/vitejs/vite/issues/3803)
            route = route || useContext(RouteContextObj) || baseRoute;
            return (to, options) => navigateFromRoute(route, to, options);
          }
          function navigateEnd(next) {
            var first = referrers[0];
            if (first) {
              setSource(_objectSpread(_objectSpread({}, next), {}, {
                replace: first.replace,
                scroll: first.scroll
              }));
              referrers.length = 0;
            }
          }
          function preloadRoute(url, options = {}) {
            var matches = getRouteMatches(branches(), url.pathname);
            var prevIntent = intent;
            intent = "preload";
            var _loop9 = function _loop9() {
              var _matches$match = matches[match],
                route = _matches$match.route,
                params = _matches$match.params;
              route.component && route.component.preload && route.component.preload();
              var preload = route.preload;
              options.preloadData && preload && runWithOwner(getContext(), () => preload({
                params,
                location: {
                  pathname: url.pathname,
                  search: url.search,
                  hash: url.hash,
                  query: extractSearchParams(url),
                  state: null,
                  key: ""
                },
                intent: "preload"
              }));
            };
            for (var match in matches) {
              _loop9();
            }
            intent = prevIntent;
          }
        }
        function createRouteContext(router, parent, _outlet, match) {
          var base = router.base,
            location = router.location,
            params = router.params;
          var _match$route = match().route,
            pattern = _match$route.pattern,
            component = _match$route.component,
            preload = _match$route.preload;
          var path = createMemo(() => match().path);
          component && component.preload && component.preload();
          var data = preload ? preload({
            params,
            location,
            intent: intent || "initial"
          }) : undefined;
          var route = {
            parent,
            pattern,
            path,
            outlet: () => component ? createComponent$1(component, {
              params,
              location,
              data,
              get children() {
                return _outlet();
              }
            }) : _outlet(),
            resolvePath(to) {
              return resolvePath(base.path(), to, path());
            }
          };
          return route;
        }
        var createRouterComponent = router => props => {
          var base = props.base;
          var routeDefs = children(() => props.children);
          var branches = createMemo(() => createBranches(routeDefs(), props.base || ""));
          var context;
          var routerState = createRouterContext(router, branches, () => context, {
            base,
            singleFlight: props.singleFlight,
            transformUrl: props.transformUrl
          });
          router.create && router.create(routerState);
          return createComponent(RouterContextObj.Provider, {
            value: routerState,
            get children() {
              return createComponent(Root, {
                routerState,
                get root() {
                  return props.root;
                },
                get preload() {
                  return props.rootPreload || props.rootLoad;
                },
                get children() {
                  return [memo(() => (context = getOwner()) && null), createComponent(Routes, {
                    routerState,
                    get branches() {
                      return branches();
                    }
                  })];
                }
              });
            }
          });
        };
        function Root(props) {
          var location = props.routerState.location;
          var params = props.routerState.params;
          var data = createMemo(() => props.preload && untrack(() => {
            setInPreloadFn(true);
            props.preload({
              params,
              location,
              intent: getIntent() || "initial"
            });
            setInPreloadFn(false);
          }));
          return createComponent(Show, {
            get when() {
              return props.root;
            },
            keyed: true,
            get fallback() {
              return props.children;
            },
            children: Root2 => createComponent(Root2, {
              params,
              location,
              get data() {
                return data();
              },
              get children() {
                return props.children;
              }
            })
          });
        }
        function Routes(props) {
          var disposers = [];
          var root;
          var routeStates = createMemo(on(props.routerState.matches, (nextMatches, prevMatches, prev) => {
            var equal = prevMatches && nextMatches.length === prevMatches.length;
            var next = [];
            var _loop10 = function _loop10(i) {
              var prevMatch = prevMatches && prevMatches[i];
              var nextMatch = nextMatches[i];
              if (prev && prevMatch && nextMatch.route.key === prevMatch.route.key) {
                next[i] = prev[i];
              } else {
                equal = false;
                if (disposers[i]) {
                  disposers[i]();
                }
                createRoot(dispose => {
                  disposers[i] = dispose;
                  next[i] = createRouteContext(props.routerState, next[i - 1] || props.routerState.base, createOutlet(() => routeStates()[i + 1]), () => props.routerState.matches()[i]);
                });
              }
            };
            for (var i = 0, len = nextMatches.length; i < len; i++) {
              _loop10(i);
            }
            disposers.splice(nextMatches.length).forEach(dispose => dispose());
            if (prev && equal) {
              return prev;
            }
            root = next[0];
            return next;
          }));
          return createOutlet(() => routeStates() && root)();
        }
        var createOutlet = child => {
          return () => createComponent(Show, {
            get when() {
              return child();
            },
            keyed: true,
            children: child2 => createComponent(RouteContextObj.Provider, {
              value: child2,
              get children() {
                return child2.outlet();
              }
            })
          });
        };
        var Route = props => {
          var childRoutes = children(() => props.children);
          return mergeProps$1(props, {
            get children() {
              return childRoutes();
            }
          });
        };
        function intercept([value, setValue], get, set) {
          return [value, set ? v => setValue(set(v)) : setValue];
        }
        function querySelector(selector) {
          if (selector === "#") {
            return null;
          }
          // Guard against selector being an invalid CSS selector
          try {
            return document.querySelector(selector);
          } catch (e) {
            return null;
          }
        }
        function createRouter(config) {
          var ignore = false;
          var wrap = value => typeof value === "string" ? {
            value
          } : value;
          var signal = intercept(createSignal(wrap(config.get()), {
            equals: (a, b) => a.value === b.value && a.state === b.state
          }), undefined, next => {
            !ignore && config.set(next);
            return next;
          });
          config.init && onCleanup(config.init((value = config.get()) => {
            ignore = true;
            signal[1](wrap(value));
            ignore = false;
          }));
          return createRouterComponent({
            signal,
            create: config.create,
            utils: config.utils
          });
        }
        function bindEvent(target, type, handler) {
          target.addEventListener(type, handler);
          return () => target.removeEventListener(type, handler);
        }
        function scrollToHash(hash, fallbackTop) {
          var el = querySelector(`#${hash}`);
          if (el) {
            el.scrollIntoView();
          } else if (fallbackTop) {
            window.scrollTo(0, 0);
          }
        }
        var actions = /* #__PURE__ */new Map();
        function setupNativeEvents(preload = true, explicitLinks = false, actionBase = "/_server", transformUrl) {
          return router => {
            var basePath = router.base.path();
            var navigateFromRoute = router.navigatorFactory(router.base);
            var preloadTimeout = {};
            function isSvg(el) {
              return el.namespaceURI === "http://www.w3.org/2000/svg";
            }
            function handleAnchor(evt) {
              if (evt.defaultPrevented || evt.button !== 0 || evt.metaKey || evt.altKey || evt.ctrlKey || evt.shiftKey) return;
              var a = evt.composedPath().find(el => el instanceof Node && el.nodeName.toUpperCase() === "A");
              if (!a || explicitLinks && !a.hasAttribute("link")) return;
              var svg = isSvg(a);
              var href = svg ? a.href.baseVal : a.href;
              var target = svg ? a.target.baseVal : a.target;
              if (target || !href && !a.hasAttribute("state")) return;
              var rel = (a.getAttribute("rel") || "").split(/\s+/);
              if (a.hasAttribute("download") || rel && rel.includes("external")) return;
              var url = svg ? new URL(href, document.baseURI) : new URL(href);
              if (url.origin !== window.location.origin || basePath && url.pathname && !url.pathname.toLowerCase().startsWith(basePath.toLowerCase())) return;
              return [a, url];
            }
            function handleAnchorClick(evt) {
              var res = handleAnchor(evt);
              if (!res) return;
              var _res = _slicedToArray(res, 2),
                a = _res[0],
                url = _res[1];
              var to = router.parsePath(url.pathname + url.search + url.hash);
              var state = a.getAttribute("state");
              evt.preventDefault();
              navigateFromRoute(to, {
                resolve: false,
                replace: a.hasAttribute("replace"),
                scroll: !a.hasAttribute("noscroll"),
                state: state && JSON.parse(state)
              });
            }
            function handleAnchorPreload(evt) {
              var res = handleAnchor(evt);
              if (!res) return;
              var _res2 = _slicedToArray(res, 2),
                a = _res2[0],
                url = _res2[1];
              if (!preloadTimeout[url.pathname]) router.preloadRoute(url, {
                preloadData: a.getAttribute("preload") !== "false"
              });
            }
            function handleAnchorIn(evt) {
              var res = handleAnchor(evt);
              if (!res) return;
              var _res3 = _slicedToArray(res, 2),
                a = _res3[0],
                url = _res3[1];
              if (preloadTimeout[url.pathname]) return;
              preloadTimeout[url.pathname] = setTimeout(() => {
                router.preloadRoute(url, {
                  preloadData: a.getAttribute("preload") !== "false"
                });
                delete preloadTimeout[url.pathname];
              }, 200);
            }
            function handleAnchorOut(evt) {
              var res = handleAnchor(evt);
              if (!res) return;
              var _res4 = _slicedToArray(res, 2),
                url = _res4[1];
              if (preloadTimeout[url.pathname]) {
                clearTimeout(preloadTimeout[url.pathname]);
                delete preloadTimeout[url.pathname];
              }
            }
            function handleFormSubmit(evt) {
              if (evt.defaultPrevented) return;
              var actionRef = evt.submitter && evt.submitter.hasAttribute("formaction") ? evt.submitter.getAttribute("formaction") : evt.target.getAttribute("action");
              if (!actionRef) return;
              if (!actionRef.startsWith("https://action/")) {
                // normalize server actions
                var url = new URL(actionRef, mockBase);
                actionRef = router.parsePath(url.pathname + url.search);
                if (!actionRef.startsWith(actionBase)) return;
              }
              if (evt.target.method.toUpperCase() !== "POST") throw new Error("Only POST forms are supported for Actions");
              var handler = actions.get(actionRef);
              if (handler) {
                evt.preventDefault();
                var data = new FormData(evt.target, evt.submitter);
                handler.call({
                  r: router,
                  f: evt.target
                }, evt.target.enctype === "multipart/form-data" ? data : new URLSearchParams(data));
              }
            }
            // ensure delegated event run first
            delegateEvents(["click", "submit"]);
            document.addEventListener("click", handleAnchorClick);
            if (preload) {
              document.addEventListener("mouseover", handleAnchorIn);
              document.addEventListener("mouseout", handleAnchorOut);
              document.addEventListener("focusin", handleAnchorPreload);
              document.addEventListener("touchstart", handleAnchorPreload);
            }
            document.addEventListener("submit", handleFormSubmit);
            onCleanup(() => {
              document.removeEventListener("click", handleAnchorClick);
              if (preload) {
                document.removeEventListener("mouseover", handleAnchorIn);
                document.removeEventListener("mouseout", handleAnchorOut);
                document.removeEventListener("focusin", handleAnchorPreload);
                document.removeEventListener("touchstart", handleAnchorPreload);
              }
              document.removeEventListener("submit", handleFormSubmit);
            });
          };
        }
        function hashParser(str) {
          var to = str.replace(/^.*?#/, "");
          // Hash-only hrefs like `#foo` from plain anchors will come in as `/#foo` whereas a link to
          // `/foo` will be `/#/foo`. Check if the to starts with a `/` and if not append it as a hash
          // to the current path so we can handle these in-page anchors correctly.
          if (!to.startsWith("/")) {
            var _window$location$hash = window.location.hash.split("#", 2),
              _window$location$hash2 = _slicedToArray(_window$location$hash, 2),
              _window$location$hash3 = _window$location$hash2[1],
              path = _window$location$hash3 === void 0 ? "/" : _window$location$hash3;
            return `${path}#${to}`;
          }
          return to;
        }
        function HashRouter(props) {
          var getSource = () => window.location.hash.slice(1);
          var beforeLeave = createBeforeLeave();
          return createRouter({
            get: getSource,
            set({
              value,
              replace,
              scroll,
              state
            }) {
              if (replace) {
                window.history.replaceState(keepDepth(state), "", "#" + value);
              } else {
                window.history.pushState(state, "", "#" + value);
              }
              var hashIndex = value.indexOf("#");
              var hash = hashIndex >= 0 ? value.slice(hashIndex + 1) : "";
              scrollToHash(hash, scroll);
              saveCurrentDepth();
            },
            init: notify => bindEvent(window, "hashchange", notifyIfNotBlocked(notify, delta => !beforeLeave.confirm(delta && delta < 0 ? delta : getSource()))),
            create: setupNativeEvents(props.preload, props.explicitLinks, props.actionBase),
            utils: {
              go: delta => window.history.go(delta),
              renderPath: path => `#${path}`,
              parsePath: hashParser,
              beforeLeave
            }
          })(props);
        }
        var _createSignal21 = createSignal([]),
          _createSignal22 = _slicedToArray(_createSignal21, 2),
          focusPath = _createSignal22[0],
          setFocusPath = _createSignal22[1];
        var useFocusManager = (userKeyMap, keyHoldOptions) => {
          var owner = getOwner();
          var ownerContext = runWithOwner.bind(void 0, owner);
          Config.setActiveElement = activeElm => ownerContext(() => setActiveElement(activeElm));
          var _useFocusManager$ = useFocusManager$1({
              userKeyMap,
              keyHoldOptions,
              ownerContext
            }),
            cleanup = _useFocusManager$.cleanup,
            focusPathCore = _useFocusManager$.focusPath;
          createEffect(on(activeElement, () => {
            setFocusPath([...focusPathCore()]);
          }, {
            defer: true
          }));
          onCleanup(cleanup);
        };
        function flattenStrings(series = []) {
          var flattenedSeries = [];
          var i;
          for (i = 0; i < series.length; i++) {
            var s = series[i];
            if (typeof s === "string" && !s.includes("PAUSE-")) {
              flattenedSeries.push(series[i]);
            } else {
              break;
            }
          }
          return [flattenedSeries.join(",\b ")].concat(series.slice(i));
        }
        function delay(pause) {
          return new Promise(resolve => {
            setTimeout(resolve, pause);
          });
        }
        function speak(phrase, utterances, lang = "en-US") {
          var synth = window.speechSynthesis;
          return new Promise((resolve, reject) => {
            var utterance = new SpeechSynthesisUtterance(phrase);
            utterance.lang = lang;
            utterance.onend = () => {
              resolve();
            };
            utterance.onerror = e => {
              reject(e);
            };
            utterances.push(utterance);
            synth.speak(utterance);
          });
        }
        function speakSeries(series, lang, root = true) {
          var synth = window.speechSynthesis;
          var remainingPhrases = flattenStrings(Array.isArray(series) ? series : [series]);
          var nestedSeriesResults = [];
          var utterances = [];
          var active = true;
          var seriesChain = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16() {
            var phrase, pause, totalRetries, retriesLeft, seriesResult, _seriesResult;
            return _regeneratorRuntime().wrap(function _callee16$(_context17) {
              while (1) switch (_context17.prev = _context17.next) {
                case 0:
                  _context17.prev = 0;
                case 1:
                  if (!(active && remainingPhrases.length)) {
                    _context17.next = 62;
                    break;
                  }
                  _context17.next = 4;
                  return Promise.resolve(remainingPhrases.shift());
                case 4:
                  phrase = _context17.sent;
                  if (active) {
                    _context17.next = 9;
                    break;
                  }
                  return _context17.abrupt("break", 62);
                case 9:
                  if (!(typeof phrase === "string" && phrase.includes("PAUSE-"))) {
                    _context17.next = 16;
                    break;
                  }
                  pause = Number(phrase.split("PAUSE-")[1]) * 1e3;
                  if (isNaN(pause)) {
                    pause = 0;
                  }
                  _context17.next = 14;
                  return delay(pause);
                case 14:
                  _context17.next = 60;
                  break;
                case 16:
                  if (!(typeof phrase === "string" && phrase.length)) {
                    _context17.next = 48;
                    break;
                  }
                  totalRetries = 3;
                  retriesLeft = totalRetries;
                case 19:
                  if (!(active && retriesLeft > 0)) {
                    _context17.next = 46;
                    break;
                  }
                  _context17.prev = 20;
                  _context17.next = 23;
                  return speak(phrase, utterances, lang);
                case 23:
                  retriesLeft = 0;
                  _context17.next = 44;
                  break;
                case 26:
                  _context17.prev = 26;
                  _context17.t0 = _context17["catch"](20);
                  if (!(_context17.t0 instanceof SpeechSynthesisErrorEvent)) {
                    _context17.next = 43;
                    break;
                  }
                  if (!(_context17.t0.error === "network")) {
                    _context17.next = 36;
                    break;
                  }
                  retriesLeft--;
                  console.warn(`Speech synthesis network error. Retries left: ${retriesLeft}`);
                  _context17.next = 34;
                  return delay(500 * (totalRetries - retriesLeft));
                case 34:
                  _context17.next = 41;
                  break;
                case 36:
                  if (!(_context17.t0.error === "canceled" || _context17.t0.error === "interrupted")) {
                    _context17.next = 40;
                    break;
                  }
                  retriesLeft = 0;
                  _context17.next = 41;
                  break;
                case 40:
                  throw new Error(`SpeechSynthesisErrorEvent: ${_context17.t0.error}`);
                case 41:
                  _context17.next = 44;
                  break;
                case 43:
                  throw _context17.t0;
                case 44:
                  _context17.next = 19;
                  break;
                case 46:
                  _context17.next = 60;
                  break;
                case 48:
                  if (!(typeof phrase === "function")) {
                    _context17.next = 55;
                    break;
                  }
                  seriesResult = speakSeries(phrase(), lang, false);
                  nestedSeriesResults.push(seriesResult);
                  _context17.next = 53;
                  return seriesResult.series;
                case 53:
                  _context17.next = 60;
                  break;
                case 55:
                  if (!Array.isArray(phrase)) {
                    _context17.next = 60;
                    break;
                  }
                  _seriesResult = speakSeries(phrase, lang, false);
                  nestedSeriesResults.push(_seriesResult);
                  _context17.next = 60;
                  return _seriesResult.series;
                case 60:
                  _context17.next = 1;
                  break;
                case 62:
                  _context17.prev = 62;
                  active = false;
                  return _context17.finish(62);
                case 65:
                case "end":
                  return _context17.stop();
              }
            }, _callee16, null, [[0,, 62, 65], [20, 26]]);
          }))();
          return {
            series: seriesChain,
            get active() {
              return active;
            },
            append: toSpeak => {
              remainingPhrases.push(toSpeak);
            },
            cancel: () => {
              if (!active) {
                return;
              }
              if (root) {
                synth.cancel();
              }
              nestedSeriesResults.forEach(nestedSeriesResults2 => {
                nestedSeriesResults2.cancel();
              });
              active = false;
            }
          };
        }
        var currentSeries;
        function SpeechEngine(toSpeak, lang = "en-US") {
          currentSeries && currentSeries.cancel();
          currentSeries = speakSeries(toSpeak, lang);
          return currentSeries;
        }

        // src/index.ts
        var debounce = (callback, wait) => {
          var timeoutId;
          var clear = () => clearTimeout(timeoutId);
          if (getOwner()) onCleanup(clear);
          var debounced = (...args) => {
            if (timeoutId !== void 0) clear();
            timeoutId = setTimeout(() => callback(...args), wait);
          };
          return Object.assign(debounced, {
            clear
          });
        };
        var throttle = (callback, wait) => {
          var isThrottled = false,
            timeoutId,
            lastArgs;
          var throttled = (...args) => {
            lastArgs = args;
            if (isThrottled) return;
            isThrottled = true;
            timeoutId = setTimeout(() => {
              callback(...lastArgs);
              isThrottled = false;
            }, wait);
          };
          var clear = () => {
            clearTimeout(timeoutId);
            isThrottled = false;
          };
          if (getOwner()) onCleanup(clear);
          return Object.assign(throttled, {
            clear
          });
        };
        function createScheduled(schedule) {
          var listeners = 0;
          var isDirty = false;
          var _createSignal23 = createSignal(void 0, {
              equals: false
            }),
            _createSignal24 = _slicedToArray(_createSignal23, 2),
            track = _createSignal24[0],
            dirty = _createSignal24[1];
          var call = schedule(() => {
            isDirty = true;
            dirty();
          });
          return () => {
            if (!isDirty) call(), track();
            if (isDirty) {
              isDirty = !!listeners;
              return true;
            }
            if (getListener()) {
              listeners++;
              onCleanup(() => listeners--);
            }
            return false;
          };
        }
        var resetFocusPathTimer;
        var prevFocusPath = [];
        var currentlySpeaking;
        var voiceOutDisabled = false;
        var fiveMinutes = 3e5;
        function debounceWithFlush(callback, time) {
          var trigger = debounce(callback, time);
          var scopedValue;
          var debounced = newValue => {
            scopedValue = newValue;
            trigger(newValue);
          };
          debounced.flush = () => {
            trigger.clear();
            callback(scopedValue);
          };
          debounced.clear = trigger.clear;
          return debounced;
        }
        function getElmName(elm) {
          return elm.id || elm.name;
        }
        function onFocusChangeCore(focusPath2 = []) {
          if (!Announcer.onFocusChange || !Announcer.enabled) {
            return;
          }
          var loaded = focusPath2.every(elm => !elm.loading);
          var focusDiff = focusPath2.filter(elm => !prevFocusPath.includes(elm));
          resetFocusPathTimer();
          if (!loaded && Announcer.onFocusChange) {
            Announcer.onFocusChange([]);
            return;
          }
          prevFocusPath = focusPath2.slice(0);
          var toAnnounceText = [];
          var toAnnounce = focusDiff.reduce((acc, elm) => {
            if (elm.announce) {
              acc.push([getElmName(elm), "Announce", elm.announce]);
              toAnnounceText.push(elm.announce);
            } else if (elm.title) {
              acc.push([getElmName(elm), "Title", elm.title]);
              toAnnounceText.push(elm.title);
            } else {
              acc.push([getElmName(elm), "No Announce", ""]);
            }
            return acc;
          }, []);
          focusDiff.reverse().reduce((acc, elm) => {
            if (elm.announceContext) {
              acc.push([getElmName(elm), "Context", elm.announceContext]);
              toAnnounceText.push(elm.announceContext);
            } else {
              acc.push([getElmName(elm), "No Context", ""]);
            }
            return acc;
          }, toAnnounce);
          if (Announcer.debug) {
            console.table(toAnnounce);
          }
          if (toAnnounceText.length) {
            return Announcer.speak(toAnnounceText.reduce((acc, val) => acc.concat(val), []));
          }
        }
        function textToSpeech(toSpeak) {
          if (voiceOutDisabled) {
            return;
          }
          return currentlySpeaking = SpeechEngine(toSpeak);
        }
        var Announcer = {
          debug: false,
          enabled: true,
          cancel: function cancel() {
            currentlySpeaking && currentlySpeaking.cancel();
          },
          clearPrevFocus: function clearPrevFocus(depth = 0) {
            prevFocusPath = prevFocusPath.slice(0, depth);
            resetFocusPathTimer();
          },
          speak: function speak(text, {
            append = false,
            notification = false
          } = {}) {
            if (Announcer.onFocusChange && Announcer.enabled) {
              Announcer.onFocusChange.flush();
              if (append && currentlySpeaking && currentlySpeaking.active) {
                currentlySpeaking.append(text);
              } else {
                Announcer.cancel();
                textToSpeech(text);
              }
              if (notification) {
                var _currentlySpeaking;
                voiceOutDisabled = true;
                (_currentlySpeaking = currentlySpeaking) === null || _currentlySpeaking === void 0 || _currentlySpeaking.series.finally(() => {
                  voiceOutDisabled = false;
                  Announcer.refresh();
                }).catch(console.error);
              }
            }
            return currentlySpeaking;
          },
          refresh: function refresh(depth = 0) {
            Announcer.clearPrevFocus(depth);
            Announcer.onFocusChange && Announcer.onFocusChange(untrack(() => focusPath()));
          },
          setupTimers: function setupTimers({
            focusDebounce = 400,
            focusChangeTimeout = fiveMinutes
          } = {}) {
            Announcer.onFocusChange = debounceWithFlush(onFocusChangeCore, focusDebounce);
            resetFocusPathTimer = debounceWithFlush(() => {
              prevFocusPath = [];
            }, focusChangeTimeout);
          }
        };
        var useAnnouncer = () => {
          Announcer.setupTimers();
          createEffect(on(focusPath, Announcer.onFocusChange, {
            defer: true
          }));
          return Announcer;
        };
        var isDev = !!DEV;
        function isObject(value) {
          return value !== null && (typeof value === "object" || typeof value === "function");
        }
        function accessWith(valueOrFn, ...args) {
          return typeof valueOrFn === "function" ? valueOrFn(...args) : valueOrFn;
        }
        var tryOnCleanup = isDev ? fn => getOwner() ? onCleanup(fn) : fn : onCleanup;
        var createCallbackStack = () => {
          var stack = [];
          var clear = () => stack = [];
          return {
            push: (...callbacks) => stack.push(...callbacks),
            execute(arg0, arg1, arg2, arg3) {
              stack.forEach(cb => cb(arg0, arg1, arg2, arg3));
              clear();
            },
            clear
          };
        };

        // src/eventListener.ts
        function makeEventListener(target, type, handler, options) {
          target.addEventListener(type, handler, options);
          return tryOnCleanup(target.removeEventListener.bind(target, type, handler, options));
        }
        function makeEventListenerStack(target, options) {
          var _createCallbackStack = createCallbackStack(),
            push = _createCallbackStack.push,
            execute = _createCallbackStack.execute;
          return [(type, handler, overwriteOptions) => {
            var clear = makeEventListener(target, type, handler, overwriteOptions !== null && overwriteOptions !== void 0 ? overwriteOptions : options);
            push(clear);
            return clear;
          }, onCleanup(execute)];
        }
        function createSingletonRoot(factory, detachedOwner = getOwner()) {
          var listeners = 0,
            value,
            disposeRoot;
          return () => {
            listeners++;
            onCleanup(() => {
              listeners--;
              queueMicrotask(() => {
                if (!listeners && disposeRoot) {
                  disposeRoot();
                  disposeRoot = value = void 0;
                }
              });
            });
            if (!disposeRoot) {
              createRoot(dispose => value = factory(disposeRoot = dispose), detachedOwner);
            }
            return value;
          };
        }
        function createHydratableSingletonRoot(factory) {
          var owner = getOwner();
          var singleton = createSingletonRoot(factory, owner);
          return () => sharedConfig.context ? createRoot(factory, owner) : singleton();
        }

        // src/index.ts
        function createStaticStore(init) {
          var copy = _objectSpread({}, init),
            store = _objectSpread({}, init),
            cache = {};
          var getValue = key => {
            var signal = cache[key];
            if (!signal) {
              if (!getListener()) return copy[key];
              cache[key] = signal = createSignal(copy[key], {
                internal: true
              });
              delete copy[key];
            }
            return signal[0]();
          };
          var _loop11 = function _loop11(_key27) {
            Object.defineProperty(store, _key27, {
              get: () => getValue(_key27),
              enumerable: true
            });
          };
          for (var _key27 in init) {
            _loop11(_key27);
          }
          var setValue = (key, value) => {
            var signal = cache[key];
            if (signal) return signal[1](value);
            if (key in copy) copy[key] = accessWith(value, [copy[key]]);
          };
          return [store, (a, b) => {
            if (isObject(a)) {
              var entries = untrack(() => Object.entries(accessWith(a, store)));
              batch(() => {
                var _iterator21 = _createForOfIteratorHelper(entries),
                  _step21;
                try {
                  var _loop12 = function _loop12() {
                    var _step21$value = _slicedToArray(_step21.value, 2),
                      key = _step21$value[0],
                      value = _step21$value[1];
                    setValue(key, () => value);
                  };
                  for (_iterator21.s(); !(_step21 = _iterator21.n()).done;) {
                    _loop12();
                  }
                } catch (err) {
                  _iterator21.e(err);
                } finally {
                  _iterator21.f();
                }
              });
            } else setValue(a, b);
            return store;
          }];
        }

        // src/common.ts
        var PASSIVE = {
          passive: true
        };
        var DEFAULT_MOUSE_POSITION = {
          x: 0,
          y: 0,
          isInside: false,
          sourceType: null
        };
        function makeMousePositionListener(target = window, callback, options = {}) {
          var _options$touch = options.touch,
            touch = _options$touch === void 0 ? true : _options$touch,
            _options$followTouch = options.followTouch,
            followTouch = _options$followTouch === void 0 ? true : _options$followTouch;
          var _makeEventListenerSta = makeEventListenerStack(target, PASSIVE),
            _makeEventListenerSta2 = _slicedToArray(_makeEventListenerSta, 2),
            listen = _makeEventListenerSta2[0],
            clear = _makeEventListenerSta2[1];
          var handleMouse = e => callback({
            x: e.pageX,
            y: e.pageY,
            sourceType: "mouse"
          });
          listen("mousemove", handleMouse);
          listen("dragover", handleMouse);
          if (touch) {
            var handleTouch = e => {
              if (e.touches.length) callback({
                x: e.touches[0].clientX,
                y: e.touches[0].clientY,
                sourceType: "touch"
              });
            };
            listen("touchstart", handleTouch);
            if (followTouch) listen("touchmove", handleTouch);
          }
          return clear;
        }
        function makeMouseInsideListener(target = window, callback, options = {}) {
          var _options$touch2 = options.touch,
            touch = _options$touch2 === void 0 ? true : _options$touch2;
          var _makeEventListenerSta3 = makeEventListenerStack(target, PASSIVE),
            _makeEventListenerSta4 = _slicedToArray(_makeEventListenerSta3, 2),
            listen = _makeEventListenerSta4[0],
            clear = _makeEventListenerSta4[1];
          var mouseIn = false;
          var touchIn = !touch;
          function handleChange(isInside) {
            this === "mouse" ? mouseIn = isInside : touchIn = isInside;
            callback(mouseIn || touchIn);
          }
          listen("mouseover", handleChange.bind("mouse", true));
          listen("mouseout", handleChange.bind("mouse", false));
          listen("mousemove", handleChange.bind("mouse", true), {
            passive: true,
            once: true
          });
          if (touch) {
            listen("touchstart", handleChange.bind("touch", true));
            listen("touchend", handleChange.bind("touch", false));
          }
          return clear;
        }
        function createMousePosition(target, options = {}) {
          var fallback = _objectSpread(_objectSpread({}, DEFAULT_MOUSE_POSITION), options.initialValue);
          var _createStaticStore = createStaticStore(fallback),
            _createStaticStore2 = _slicedToArray(_createStaticStore, 2),
            state = _createStaticStore2[0],
            setState = _createStaticStore2[1];
          var attachListeners = el => {
            makeMousePositionListener(el, setState, options);
            makeMouseInsideListener(el, setState.bind(void 0, "isInside"), options);
          };
          if (typeof target !== "function") attachListeners(target);else createEffect(() => attachListeners(target()));
          return state;
        }
        var useMousePosition = /* @__PURE__ */createHydratableSingletonRoot(createMousePosition.bind(void 0, void 0, void 0));
        function createKeyboardEvent(key, keyCode, eventName = "keydown") {
          return new KeyboardEvent(eventName, {
            key,
            keyCode,
            which: keyCode,
            ctrlKey: false,
            altKey: false,
            shiftKey: false,
            metaKey: false,
            bubbles: true
          });
        }
        var handleScroll = throttle(e => {
          var deltaY = e.deltaY;
          if (deltaY < 0) {
            document.body.dispatchEvent(createKeyboardEvent("ArrowUp", 38));
          } else if (deltaY > 0) {
            document.body.dispatchEvent(createKeyboardEvent("ArrowDown", 40));
          }
        }, 250);
        var handleClick = e => {
          var _Config$rendererOptio2;
          var active = activeElement();
          var precision = ((_Config$rendererOptio2 = Config.rendererOptions) === null || _Config$rendererOptio2 === void 0 ? void 0 : _Config$rendererOptio2.deviceLogicalPixelRatio) || 1;
          if (active && testCollision(e.clientX, e.clientY, active.lng.absX * precision, active.lng.absY * precision, active.width * precision, active.height * precision)) {
            document.dispatchEvent(createKeyboardEvent("Enter", 13));
            setTimeout(() => document.body.dispatchEvent(createKeyboardEvent("Enter", 13, "keyup")), 1);
          }
        };
        function testCollision(px, py, cx, cy, cw = 0, ch = 0) {
          return px >= cx && px <= cx + cw && py >= cy && py <= cy + ch;
        }
        function getChildrenByPosition(node, x, y) {
          var _Config$rendererOptio3;
          var result = [];
          var precision = ((_Config$rendererOptio3 = Config.rendererOptions) === null || _Config$rendererOptio3 === void 0 ? void 0 : _Config$rendererOptio3.deviceLogicalPixelRatio) || 1;
          var queue = [node];
          while (queue.length > 0) {
            var currentLevelNodes = [];
            var _iterator22 = _createForOfIteratorHelper(queue),
              _step22;
            try {
              for (_iterator22.s(); !(_step22 = _iterator22.n()).done;) {
                var currentNode = _step22.value;
                if (currentNode.alpha !== 0 && testCollision(x, y, currentNode.lng.absX * precision, currentNode.lng.absY * precision, currentNode.width * precision, currentNode.height * precision)) {
                  currentLevelNodes.push(currentNode);
                }
              }
            } catch (err) {
              _iterator22.e(err);
            } finally {
              _iterator22.f();
            }
            var size = currentLevelNodes.length;
            if (size === 0) {
              break;
            } else if (size > 1) {
              currentLevelNodes.sort((a, b) => (b.zIndex || 0) - (a.zIndex || 0));
            }
            var highestZIndexNode = currentLevelNodes[0];
            result.push(highestZIndexNode);
            if (highestZIndexNode.isTextNode()) {
              queue = [];
            } else {
              queue = highestZIndexNode.children;
            }
          }
          return result;
        }
        function useMouse(myApp = rootNode, throttleBy = 100) {
          var pos = useMousePosition();
          var scheduled = createScheduled(fn => throttle(fn, throttleBy));
          makeEventListener(window, "wheel", handleScroll);
          makeEventListener(window, "click", handleClick);
          createEffect(() => {
            if (scheduled()) {
              var result = getChildrenByPosition(myApp, pos.x, pos.y).filter(el => (el.focus || el.onFocus || el.onEnter) && !el.skipFocus);
              if (result.length) {
                var activeElm = result[result.length - 1];
                while ((_activeElm$parent = activeElm.parent) !== null && _activeElm$parent !== void 0 && _activeElm$parent.forwardStates) {
                  var _activeElm$parent;
                  activeElm = activeElm.parent;
                }
                var activeElmParent = activeElm.parent;
                if ((activeElmParent === null || activeElmParent === void 0 ? void 0 : activeElmParent.selected) !== void 0) {
                  activeElmParent.selected = activeElmParent.children.indexOf(activeElm);
                }
                activeElm.setFocus();
              }
            }
          });
        }
        var _createSignal25 = createSignal(""),
          _createSignal26 = _slicedToArray(_createSignal25, 2),
          globalBackground = _createSignal26[0],
          setGlobalBackground = _createSignal26[1];
        exports("s", setGlobalBackground);
        var theme = exports("t", {
          name: 'Base Lightning TV',
          alpha: {
            primary: 1,
            secondary: 0.7,
            tertiary: 0.1,
            inactive: 0.5,
            full: 1,
            none: 0,
            alpha1: 0.1,
            alpha2: 0.3,
            alpha3: 0.5,
            alpha4: 0.7,
            alpha5: 0.9,
            alpha6: 0.95
          },
          animation: {
            duration: {
              none: 0,
              xfast: 100,
              fast: 250,
              normal: 500,
              slow: 750,
              xslow: 900
            },
            delay: {
              none: 0,
              xfast: 10,
              fast: 25,
              normal: 50,
              slow: 75,
              xslow: 90
            },
            expressive: {
              timingFunction: 'cubic-bezier(0, 0, 1, 1)',
              delay: 0,
              duration: 0.25
            },
            expressiveEntrance: {
              timingFunction: 'cubic-bezier(0, 0, 1, 1)',
              delay: 0,
              duration: 0.25
            },
            expressiveExit: {
              timingFunction: 'cubic-bezier(0, 0, 1, 1)',
              delay: 0,
              duration: 0.25
            },
            standard: {
              timingFunction: 'cubic-bezier(0, 0, 1, 1)',
              delay: 0,
              duration: 0.25
            },
            standardEntrance: {
              timingFunction: 'cubic-bezier(0, 0, 1, 1)',
              delay: 0,
              duration: 0.25
            },
            standardExit: {
              timingFunction: 'cubic-bezier(0, 0, 1, 1)',
              delay: 0,
              duration: 0.25
            },
            utility: {
              timingFunction: 'cubic-bezier(0, 0, 1, 1)',
              delay: 0,
              duration: 0.25
            },
            utilityEntrance: {
              timingFunction: 'cubic-bezier(0, 0, 1, 1)',
              delay: 0,
              duration: 0.25
            },
            utilityExit: {
              timingFunction: 'cubic-bezier(0, 0, 1, 1)',
              delay: 0,
              duration: 0.25
            }
          },
          asset: {
            arrowLeft: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAGKADAAQAAAABAAAAGAAAAADiNXWtAAAAi0lEQVRIDWNgGAWjIfD//38JID5Fk5AAGqwKxPeA+D/VLQCaaQLEr0CGgwBVLQCa5wbEn0EGwwDVLAAaGA3Ev2AGw2iqWAA0rBiI/8EMRaYptgBoWDeygehsci1gIlcjWfqArqZdEMFcBLSEdpGMZAntkimSJbTLaEiW0K6oQLKEdoUdzJJRemiHAAD4n+yzPWCs7QAAAABJRU5ErkJggg==',
            arrowRight: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAGKADAAQAAAABAAAAGAAAAADiNXWtAAAAg0lEQVRIDWNgGAWjIYArBP7//38KiCVwyVMsDjQcBO4BsSrFhmEzAGw8hHgFpEywqaFIDMkCEPMzELtRZCC6ZjQLQNxfQByNro5sPhYLQEL/gLiYbEORNeKwACbcDVPLBGMMOhrmVDSapkFE00imaTKlaUajaVFB28Ju0CXrUQfhDAEAEgHss6NhpLQAAAAASUVORK5CYII=',
            backspaceOutline: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAACQCAYAAADnRuK4AAAAAXNSR0IArs4c6QAACmpJREFUeF7tnVmoZUcVhv/feY4gBEVEH/KgCCZxCK2itNo4xQQH+kUN0TjEiDGKKBqnaExwBjUaR6KY+NQgiQkOMSYhYEScIopGJOqDE2hHjfP0y4p1Oqdv33v2qr32Prv2Paug6Ye7Vu2qv75TtWvtGohMqUBAAQZ80zUVQAKUEIQUSIBC8qVzApQMhBRIgELypXMClAyEFEiAQvKlcwKUDIQUSIBC8qVzApQMhBRIgELypXMClAyEFEiAQvKlcwKUDIQUSIBC8qVzApQMhBRIgELypXMClAyEFEiAQvKlcwKUDIQUSIBC8qVzApQMhBRIgELypXMClAyEFEiAQvKlcwKUDIQUSIBC8qVzApQMhBRIgELypfPsAJJ0NYC92XRHKPB3AAfLv18BuBLAFSR/NKZWswJI0vkA3jCmILsw75sAvIfkR8eo22wAknQSgMvGEGFD8vwxgFeQvGrI+s4CIEnHAPgugHsMWfkNzevDAM4i+Z8h6t88QJLuXOB5yBAVzjxuVeBaAM8ieXNUjzkAdAmA50Yrmv5HKPATACeQ/GNEm6YBkvRyANblZhpHAXsfekpkOGsWIEmPAHA9gDuOo13mWhS4gOSZfdVoEiBJ9wFwA4D7961Y+lUpsK/v7KxVgL4K4ElOCS4l+Uyn7a41k3Q0gMcC2ANgH4CHV1T2OyStx69OzQEk6TwAZztr8lMAx5P8s9N+Y8wk2cTjfQDu66z080h+zml7yKwpgCSdCOByZyX+BuBRJH/otN84M0kWN/s0gOc4Kv8Nko922B1m0gxAkh4I4AcVwcL9JA/UVnjT7CXdHYD9yEzfVUkAjib5uxqNmgCoBAu/CeBhzsJ/kORZTtuNN5Nk70bXAZ0Hy59G8qIawVoB6LMAnu8suE3tH0/y3077NAMg6esAuoaoC0la7M2dJgdI0ssAXOgs8W8BHEvS/s9UoYCkdwN4bYfL5STto7U7TQpQZbDQehzreawHylSpgKSTAVza4XYDyeNqsp4MoB7BwteQfH9N5dL2NgWK3l0vyAdJWhDXnSYBSNLtANh3GO/KwgMk97trlYbbKiDJPpzea5U8JKuYqDIeql0kvQPAG5352ZLMR5L8q9M+zXZQYFcAJOnJAL7sbGWLMFuk2SLOmYIKzB6gEiz8HoB7O7U4meQXnLZp1qGApD8BuOcsh7AewcL3kuyadg4OjSSbhRxH0j4BjJok2Ufga0j+YdQHlcznDlBNsPAa+xpP8r/rEHbxjAKPbRuyHvKFY0Ik6QUALOprPfIT1gHRbAGSdDoA77aSX5Zg4e8nhGfx6FEgWoJn8Zy1QCTplq5vjc3NwnoEC/eQ/HYD8IwC0TbwrA2i2QHUI1h4JskLGoJnUIhWwLMWiGYFkCSLMX2t5WDhlneeLm5Dw5kDntEhkmRhEVvesWNqZgiTdC6AN3W1Svn72oOFkuxF+WcVIQUrai+IKuA5BBHJ453auc1mA1AJFn7Jsf7EKj9ZsLBHw1ZDtI5neAmaBUBzCxaO2cBj5u2FZtlO0l8A3K3ZIaxHsPB8kt5vYn00c/mM0dBj5OmqzAqjOQDUfLBwJ32HbPAh84pCM5seSNJLAHzcWeFJgoVdZRui4YfIo6ucff8uyVY03LW5IawyWPgvW5u77mChV/QIABFfb/kidk0CVKbDth3Huw35dJLeniqiV2/fniDYx1f7vlWTeoUFah6wZQhrqwcqwUKbrtsaH0+6mOQpHsOpbXpCVFPstcJjBZNkmzHv0swQJultAN7iVO375TyafzjtJzcbEaK1w9McQJXBQlvvYmtsfjE5FZUFGAGiSeBpCqDKYKFtmX0qya9Utl0z5gNCNBk8BSA7CtiODNwxjf4trEew8BySNtTNOg0A0aTwtARQTbDQeh3rfawXmn0KQDQ5PC0B9EkAL3LSkAD9X6hWALIJzJ3mNoSdS9I7U3NyuX6zQO+zKOzkEEmaHqDSFdpZM97tOfkSfRvvk0LUDEAFIgseetf85DS+AYgk/bPr1NvRZ2HLg4ektwI4xzmgZCBxYohaBMjWPeenDOcvaIvZ2oez5gAqQ5mtLbb3oa4z+Bb6nTHW1UP92vFIr54vzJ8BcGplGdYKkSRbCXGHSWdh2z1ckp1taGccroxyFt9cznG4iGuDqFmASk9kZxxakNGTckHZBBA1DVCB6BMAXuwhyA4VmGL/+05l6zlsbdt7DJmXU0uXmSQ7JvD2zQ1hiwJJsotRvlVxXO87SU5+heUYDT5Gni5KVhg1D1DphWqCjOYy6RlAYzb0mHn3gWkWABWIaoKMubHwSBpGebGWZNdc2vmUO6a1BhJXFUSSff/yLuOYamvzzwEcVfFr7tWwPXqi6uN2PXWYG0C1Qca1n8RaDlewl3kPRL3gWXo/XBwo1dXWdk/a3jEOnJoVQGUoqw0yvpLkh7oUHvLvTohC8FRANBo8pT3sxLeVJ/M2M4QtiVYTZJzkNPoOiAaBxwHRqPDMFqBS8Jog4yT3YewA0aDwrIBodHhmDVApvG0mtO3PnjTJjTxbIBoFnm0gWgs8pQ06lxY3N4QtCWZBRgPDezdnHvPr+alV2EiaL0DlF2Dbn20bdB40XtHwQ5nOHqAC0SyCjEM1Wkv57AqACkRvBvB2p7hrDzI6yzU7s90EUPNBxtnR4SjwrgGo9EK1Qca8cM4ByU4mkuz++F93ZHELyZX3iW31n+S+sKWZWfNBxkCbNeUq6ekArugo1I0kH1xT8EkBKj1R80HGGkFbtZVkZ3bb2d2r0tUkn1hTh8kBKhB9DMBLnQWfJMjoLFuTZpJsO/ONAB7UUcBLSHqvX781q1YAqg0yfoDkq5psrQYLJeldAF7nKFr1x+wmACq9kAUZLazvvTV4P8kDDlE22kTSQ4uuK9dCF5HuR/I3NYI1A1CBaB+AK50VsAMj7TJeixNl2kYBSccCsB/ZMQ6Brif5GIfdYSZNAVQg8rzsLSphl/Hapby2LDZTUaBcq/56ALb1fOVxLkuinULy4loRmwOoQGQX7T7DWZnPk3y203bXmkl6AIA91isDOBGADV3e1HsJbasA1QYZvUKl3fYKPI2knXFQnZoEqPRCNUHG6oqnwyEFLiJ5Wl89mgWoQFQTZOyrwSb7WUztcSRtu0+v1DRABaKPADijV+3SaZUCNgE5geTNEZnmAFBtkDGix6b4Xld2BNvJcaHUPEClF6oNMoZE2eXOtm3q1ZFha1mfWQBUINoL4Kqurbm7vPEj1bOAqx3udW0kk62+swGoQHQ2gPOGFGAD8roJgF0t+qkx6jorgApElwE4aQwxZp6n3YNxsPyzA7yst/4iSdvEMFqaHUCjKZEZ91IgAeolWzotFEiAkoWQAglQSL50ToCSgZACCVBIvnROgJKBkAIJUEi+dE6AkoGQAglQSL50ToCSgZACCVBIvnROgJKBkAIJUEi+dE6AkoGQAglQSL50ToCSgZACCVBIvnROgJKBkAIJUEi+dE6AkoGQAglQSL50ToCSgZACCVBIvnROgJKBkAIJUEi+dE6AkoGQAglQSL50ToCSgZACCVBIvnT+H0jPT81J3xWWAAAAAElFTkSuQmCC',
            check: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAOCAYAAAAi2ky3AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACtSURBVHgBvdPdDcIgEAfwoy8Nb45QN3AGF2s36Ahu4gpuIDoBfSgfpdoTlCbEWEMh6T8hFzjyg5AAkBHOcQe5UWqspRx435sDpMYj6IYQwwVSEiJ2MKVUBWuzLSLl2HL+uxmNCGFO8yaL7RHxve6qRZoAuS4hxac8735elWVx7jrtMKL1o0Gcat9jhExHSukN/kUIFZ7MpDRtzE1isDRkAUtDvrA8ZI597FUf8gWH9P0b4gko9wAAAABJRU5ErkJggg=='
          },
          color: {
            palette: {},
            white: '0xffffffff',
            black: '0x000000ff',
            grey: '0x929096ff',
            red: '0xe74c3cff',
            orange: '0xdc7633ff',
            yellow: '0xf7dc6fff',
            green: '0x2ecc71ff',
            blue: '0x93a9fdff',
            purple: '0x663399ff',
            overlay: '0x181819b3',
            material: '0x181819ff',
            materialNeutral: '0x181819ff',
            materialNeutralElevated: '0x373639ff',
            materialInverse: '0xf8f7faff',
            materialInverseElevated: '0xffffffff',
            materialBrand: '0x000033ff',
            materialBrandElevated: '0x242a65ff',
            textNeutral: '0xf8f7faff',
            textNeutralSecondary: '0xf8f7fab3',
            textNeutralTertiary: '0xf8f7fa1a',
            textNeutralDisabled: '0xf8f7fa80',
            textInverse: '0x181819ff',
            textInverseSecondary: '0x181819b3',
            textInverseTertiary: '0x1818191a',
            textInverseDisabled: '0x18181980',
            textBrand: '0x93a9fdff',
            textBrandSecondary: '0x93a9fdb3',
            textBrandTertiary: '0x93a9fd1a',
            textBrandDisabled: '0x93a9fd80',
            textPositive: '0x2ecc71ff',
            textNegative: '0xe74c3cff',
            textInfo: '0x93a9fdff',
            textCaution: '0xdc7633ff',
            fillTransparent: '0xffffff0',
            fillNeutral: '0xf8f7faff',
            fillNeutralSecondary: '0xf8f7fab3',
            fillNeutralTertiary: '0xf8f7fa1a',
            fillNeutralDisabled: '0xf8f7fa80',
            fillInverse: '0x181819ff',
            fillInverseSecondary: '0x181819b3',
            fillInverseTertiary: '0x1818191a',
            fillInverseDisabled: '0x18181980',
            fillBrand: '0x93a9fdff',
            fillBrandSecondary: '0x93a9fdb3',
            fillBrandTertiary: '0x93a9fd1a',
            fillBrandDisabled: '0x93a9fd80',
            fillPositive: '0x2ecc71ff',
            fillNegative: '0xe74c3cff',
            fillInfo: '0x93a9fdff',
            fillCaution: '0xdc7633ff',
            strokeNeutral: '0xf8f7faff',
            strokeNeutralSecondary: '0xf8f7fab3',
            strokeNeutralTertiary: '0xf8f7fa1a',
            strokeNeutralDisabled: '0xf8f7fa80',
            strokeInverse: '0x181819ff',
            strokeInverseSecondary: '0x181819b3',
            strokeInverseTertiary: '0x1818191a',
            strokeInverseDisabled: '0x18181980',
            strokeBrand: '0x93a9fdff',
            strokeBrandSecondary: '0x93a9fdb3',
            strokeBrandTertiary: '0x93a9fd1a',
            strokeBrandDisabled: '0x93a9fd80',
            strokePositive: '0x2ecc71ff',
            strokeNegative: '0xe74c3cff',
            strokeInfo: '0x93a9fdff',
            strokeCaution: '0xdc7633ff',
            interactiveNeutral: '0xffffff1a',
            interactiveNeutralFocus: '0xffffffff',
            interactiveNeutralFocusSoft: '0xffffff1a',
            interactiveInverse: '0x48474b1a',
            interactiveInverseFocus: '0x48474bff',
            interactiveInverseFocusSoft: '0x48474b1a',
            interactiveBrand: '0xbecffe1a',
            interactiveBrandFocus: '0xbecffeff',
            interactiveBrandFocusSoft: '0xbecffe1a',
            shadowNeutral: '0x000000b3',
            shadowNeutralFocus: '0x000000b3',
            shadowNeutralFocusSoft: '0x000000b3',
            shadowNeutralText: '0x000000ff',
            shadowInverse: '0x000000b3',
            shadowInverseFocus: '0x000000b3',
            shadowInverseFocusSoft: '0x000000b3',
            shadowInverseText: '0x000000ff',
            shadowBrand: '0x000000b3',
            shadowBrandFocus: '0x000000b3',
            shadowBrandFocusSoft: '0x000000b3',
            shadowBrandText: '0x000000ff'
          },
          font: [],
          layout: {
            columnCount: 10,
            focusScale: 1.2,
            gutterX: 20,
            gutterY: 20,
            marginX: 150,
            marginY: 150,
            safe: 50,
            screenW: 1920,
            screenH: 1080
          },
          radius: {
            none: 0,
            xs: 2,
            sm: 4,
            md: 8,
            lg: 16,
            xl: 24
          },
          spacer: {
            none: 0,
            xxs: 2,
            xs: 4,
            sm: 8,
            md: 10,
            lg: 20,
            xl: 30,
            xxl: 40,
            xxxl: 50
          },
          stroke: {
            none: 0,
            sm: 2,
            md: 4,
            lg: 6,
            xl: 8
          },
          typography: {
            display1: {
              fontFamily: 'Arial',
              fontSize: 75,
              lineHeight: 85,
              fontWeight: 500,
              verticalAlign: 'middle',
              textBaseline: 'bottom'
            },
            display2: {
              fontFamily: 'Arial',
              fontSize: 50,
              lineHeight: 60,
              fontWeight: 500,
              verticalAlign: 'middle',
              textBaseline: 'bottom'
            },
            display3: {
              fontFamily: 'Arial',
              fontSize: 56,
              fontWeight: 400,
              lineHeight: 68,
              verticalAlign: 'middle',
              textBaseline: 'bottom'
            },
            display4: {
              fontFamily: 'Arial',
              fontSize: 48,
              fontWeight: 400,
              lineHeight: 64,
              verticalAlign: 'middle',
              textBaseline: 'bottom'
            },
            headline1: {
              fontFamily: 'Arial',
              fontSize: 35,
              fontWeight: 500,
              lineHeight: 48,
              verticalAlign: 'middle',
              textBaseline: 'bottom'
            },
            headline2: {
              fontFamily: 'Arial',
              fontSize: 30,
              fontWeight: 500,
              lineHeight: 40,
              verticalAlign: 'middle',
              textBaseline: 'bottom'
            },
            headline3: {
              fontFamily: 'Arial',
              fontSize: 25,
              fontWeight: 500,
              lineHeight: 36,
              verticalAlign: 'middle',
              textBaseline: 'bottom'
            },
            body1: {
              fontFamily: 'Arial',
              fontSize: 25,
              fontWeight: 300,
              lineHeight: 40,
              verticalAlign: 'middle',
              textBaseline: 'bottom'
            },
            body2: {
              fontFamily: 'Arial',
              fontSize: 22,
              fontWeight: 300,
              lineHeight: 32,
              verticalAlign: 'middle',
              textBaseline: 'bottom'
            },
            body3: {
              fontFamily: 'Arial',
              fontSize: 20,
              fontWeight: 300,
              lineHeight: 32,
              verticalAlign: 'middle',
              textBaseline: 'bottom'
            },
            button1: {
              fontFamily: 'Arial',
              fontSize: 25,
              fontWeight: 500,
              lineHeight: 32,
              verticalAlign: 'middle',
              textBaseline: 'bottom'
            },
            button2: {
              fontFamily: 'Arial',
              fontSize: 20,
              fontWeight: 500,
              lineHeight: 32,
              verticalAlign: 'middle',
              textBaseline: 'bottom'
            },
            callout1: {
              fontFamily: 'Arial',
              fontSize: 20,
              fontWeight: 500,
              lineHeight: 32,
              verticalAlign: 'middle',
              textBaseline: 'bottom'
            },
            caption1: {
              fontFamily: 'Arial',
              fontSize: 15,
              fontWeight: 500,
              lineHeight: 24,
              verticalAlign: 'middle',
              textBaseline: 'bottom'
            },
            tag1: {
              fontFamily: 'Arial',
              fontSize: 20,
              fontWeight: 500,
              lineHeight: 24,
              verticalAlign: 'middle',
              textBaseline: 'bottom'
            },
            footnote1: {
              fontFamily: 'Arial',
              fontSize: 22,
              fontWeight: 300,
              lineHeight: 30,
              verticalAlign: 'middle',
              textBaseline: 'bottom'
            },
            subtitle1: {
              fontFamily: 'Arial',
              fontSize: 32,
              fontWeight: 400,
              lineHeight: 36,
              verticalAlign: 'middle',
              textBaseline: 'bottom'
            },
            subtitle2: {
              fontFamily: 'Arial',
              fontSize: 28,
              fontWeight: 500,
              lineHeight: 32,
              verticalAlign: 'middle',
              textBaseline: 'bottom'
            },
            navigation: {
              fontFamily: 'Arial',
              fontSize: 28,
              fontWeight: 400,
              lineHeight: 32,
              verticalAlign: 'middle',
              textBaseline: 'bottom'
            }
          },
          componentConfig: {
            Keyboard: {
              base: {
                keyProps: {
                  delete: {
                    title: null,
                    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAACQCAYAAADnRuK4AAAAAXNSR0IArs4c6QAACmpJREFUeF7tnVmoZUcVhv/feY4gBEVEH/KgCCZxCK2itNo4xQQH+kUN0TjEiDGKKBqnaExwBjUaR6KY+NQgiQkOMSYhYEScIopGJOqDE2hHjfP0y4p1Oqdv33v2qr32Prv2Paug6Ye7Vu2qv75TtWvtGohMqUBAAQZ80zUVQAKUEIQUSIBC8qVzApQMhBRIgELypXMClAyEFEiAQvKlcwKUDIQUSIBC8qVzApQMhBRIgELypXMClAyEFEiAQvKlcwKUDIQUSIBC8qVzApQMhBRIgELypXMClAyEFEiAQvKlcwKUDIQUSIBC8qVzApQMhBRIgELypXMClAyEFEiAQvKlcwKUDIQUSIBC8qVzApQMhBRIgELypfPsAJJ0NYC92XRHKPB3AAfLv18BuBLAFSR/NKZWswJI0vkA3jCmILsw75sAvIfkR8eo22wAknQSgMvGEGFD8vwxgFeQvGrI+s4CIEnHAPgugHsMWfkNzevDAM4i+Z8h6t88QJLuXOB5yBAVzjxuVeBaAM8ieXNUjzkAdAmA50Yrmv5HKPATACeQ/GNEm6YBkvRyANblZhpHAXsfekpkOGsWIEmPAHA9gDuOo13mWhS4gOSZfdVoEiBJ9wFwA4D7961Y+lUpsK/v7KxVgL4K4ElOCS4l+Uyn7a41k3Q0gMcC2ANgH4CHV1T2OyStx69OzQEk6TwAZztr8lMAx5P8s9N+Y8wk2cTjfQDu66z080h+zml7yKwpgCSdCOByZyX+BuBRJH/otN84M0kWN/s0gOc4Kv8Nko922B1m0gxAkh4I4AcVwcL9JA/UVnjT7CXdHYD9yEzfVUkAjib5uxqNmgCoBAu/CeBhzsJ/kORZTtuNN5Nk70bXAZ0Hy59G8qIawVoB6LMAnu8suE3tH0/y3077NAMg6esAuoaoC0la7M2dJgdI0ssAXOgs8W8BHEvS/s9UoYCkdwN4bYfL5STto7U7TQpQZbDQehzreawHylSpgKSTAVza4XYDyeNqsp4MoB7BwteQfH9N5dL2NgWK3l0vyAdJWhDXnSYBSNLtANh3GO/KwgMk97trlYbbKiDJPpzea5U8JKuYqDIeql0kvQPAG5352ZLMR5L8q9M+zXZQYFcAJOnJAL7sbGWLMFuk2SLOmYIKzB6gEiz8HoB7O7U4meQXnLZp1qGApD8BuOcsh7AewcL3kuyadg4OjSSbhRxH0j4BjJok2Ufga0j+YdQHlcznDlBNsPAa+xpP8r/rEHbxjAKPbRuyHvKFY0Ik6QUALOprPfIT1gHRbAGSdDoA77aSX5Zg4e8nhGfx6FEgWoJn8Zy1QCTplq5vjc3NwnoEC/eQ/HYD8IwC0TbwrA2i2QHUI1h4JskLGoJnUIhWwLMWiGYFkCSLMX2t5WDhlneeLm5Dw5kDntEhkmRhEVvesWNqZgiTdC6AN3W1Svn72oOFkuxF+WcVIQUrai+IKuA5BBHJ453auc1mA1AJFn7Jsf7EKj9ZsLBHw1ZDtI5neAmaBUBzCxaO2cBj5u2FZtlO0l8A3K3ZIaxHsPB8kt5vYn00c/mM0dBj5OmqzAqjOQDUfLBwJ32HbPAh84pCM5seSNJLAHzcWeFJgoVdZRui4YfIo6ucff8uyVY03LW5IawyWPgvW5u77mChV/QIABFfb/kidk0CVKbDth3Huw35dJLeniqiV2/fniDYx1f7vlWTeoUFah6wZQhrqwcqwUKbrtsaH0+6mOQpHsOpbXpCVFPstcJjBZNkmzHv0swQJultAN7iVO375TyafzjtJzcbEaK1w9McQJXBQlvvYmtsfjE5FZUFGAGiSeBpCqDKYKFtmX0qya9Utl0z5gNCNBk8BSA7CtiODNwxjf4trEew8BySNtTNOg0A0aTwtARQTbDQeh3rfawXmn0KQDQ5PC0B9EkAL3LSkAD9X6hWALIJzJ3mNoSdS9I7U3NyuX6zQO+zKOzkEEmaHqDSFdpZM97tOfkSfRvvk0LUDEAFIgseetf85DS+AYgk/bPr1NvRZ2HLg4ektwI4xzmgZCBxYohaBMjWPeenDOcvaIvZ2oez5gAqQ5mtLbb3oa4z+Bb6nTHW1UP92vFIr54vzJ8BcGplGdYKkSRbCXGHSWdh2z1ckp1taGccroxyFt9cznG4iGuDqFmASk9kZxxakNGTckHZBBA1DVCB6BMAXuwhyA4VmGL/+05l6zlsbdt7DJmXU0uXmSQ7JvD2zQ1hiwJJsotRvlVxXO87SU5+heUYDT5Gni5KVhg1D1DphWqCjOYy6RlAYzb0mHn3gWkWABWIaoKMubHwSBpGebGWZNdc2vmUO6a1BhJXFUSSff/yLuOYamvzzwEcVfFr7tWwPXqi6uN2PXWYG0C1Qca1n8RaDlewl3kPRL3gWXo/XBwo1dXWdk/a3jEOnJoVQGUoqw0yvpLkh7oUHvLvTohC8FRANBo8pT3sxLeVJ/M2M4QtiVYTZJzkNPoOiAaBxwHRqPDMFqBS8Jog4yT3YewA0aDwrIBodHhmDVApvG0mtO3PnjTJjTxbIBoFnm0gWgs8pQ06lxY3N4QtCWZBRgPDezdnHvPr+alV2EiaL0DlF2Dbn20bdB40XtHwQ5nOHqAC0SyCjEM1Wkv57AqACkRvBvB2p7hrDzI6yzU7s90EUPNBxtnR4SjwrgGo9EK1Qca8cM4ByU4mkuz++F93ZHELyZX3iW31n+S+sKWZWfNBxkCbNeUq6ekArugo1I0kH1xT8EkBKj1R80HGGkFbtZVkZ3bb2d2r0tUkn1hTh8kBKhB9DMBLnQWfJMjoLFuTZpJsO/ONAB7UUcBLSHqvX781q1YAqg0yfoDkq5psrQYLJeldAF7nKFr1x+wmACq9kAUZLazvvTV4P8kDDlE22kTSQ4uuK9dCF5HuR/I3NYI1A1CBaB+AK50VsAMj7TJeixNl2kYBSccCsB/ZMQ6Brif5GIfdYSZNAVQg8rzsLSphl/Hapby2LDZTUaBcq/56ALb1fOVxLkuinULy4loRmwOoQGQX7T7DWZnPk3y203bXmkl6AIA91isDOBGADV3e1HsJbasA1QYZvUKl3fYKPI2knXFQnZoEqPRCNUHG6oqnwyEFLiJ5Wl89mgWoQFQTZOyrwSb7WUztcSRtu0+v1DRABaKPADijV+3SaZUCNgE5geTNEZnmAFBtkDGix6b4Xld2BNvJcaHUPEClF6oNMoZE2eXOtm3q1ZFha1mfWQBUINoL4Kqurbm7vPEj1bOAqx3udW0kk62+swGoQHQ2gPOGFGAD8roJgF0t+qkx6jorgApElwE4aQwxZp6n3YNxsPyzA7yst/4iSdvEMFqaHUCjKZEZ91IgAeolWzotFEiAkoWQAglQSL50ToCSgZACCVBIvnROgJKBkAIJUEi+dE6AkoGQAglQSL50ToCSgZACCVBIvnROgJKBkAIJUEi+dE6AkoGQAglQSL50ToCSgZACCVBIvnROgJKBkAIJUEi+dE6AkoGQAglQSL50ToCSgZACCVBIvnROgJKBkAIJUEi+dE6AkoGQAglQSL50ToCSgZACCVBIvnT+H0jPT81J3xWWAAAAAElFTkSuQmCC'
                  }
                }
              }
            }
          }
        });
        function Background() {
          var params = new URLSearchParams(window.location.search);
          var disableBG = params.get("disableBG") === "true";
          var bg1, bg2, heroMask;
          var active = 0;
          var alpha = 1;
          var animationSettings = {
            duration: 750,
            easing: "ease-in-out"
          };
          var bgStyles = {
            alpha,
            color: 4294967295
          };
          onMount(() => {
            if (disableBG) {
              heroMask.src = "";
              heroMask.colorLeft = 0x000000FF;
              heroMask.colorRight = 0x00000000;
              return;
            }
          });
          function changeBackgrounds(img) {
            if (disableBG) {
              heroMask.src = "";
              heroMask.colorLeft = 0x000000FF;
              heroMask.colorRight = 0x00000000;
              return;
            }
            if (typeof img !== "string") {
              bg1.color = img;
              bg1.src = "";
              bg1.alpha = 1;
              active = 1;
              bg2.alpha = 0;
              heroMask.alpha = 0;
              return;
            } else {
              bg1.color = 4294967295;
              heroMask.alpha = 1;
            }
            if (active === 0) {
              bg1.src = img;
              active = 1;
              return;
            }
            if (active === 1) {
              bg2.src = img;
              active = 2;
              bg2.alpha = 0;
              bg2.animate({
                alpha
              }, animationSettings).start();
              bg1.animate({
                alpha: 0
              }, animationSettings).start();
              return;
            }
            if (active === 2) {
              bg1.src = img;
              active = 1;
              bg1.alpha = 0;
              bg1.animate({
                alpha
              }, animationSettings).start();
              bg2.animate({
                alpha: 0
              }, animationSettings).start();
            }
          }
          createEffect(on(globalBackground, img => {
            changeBackgrounds(img);
          }, {
            defer: true
          }));
          return createComponent(View, {
            width: 1920,
            height: 1080,
            zIndex: -5,
            get children() {
              return [createComponent(View, {
                ref(r$) {
                  var _ref$ = bg1;
                  typeof _ref$ === "function" ? _ref$(r$) : bg1 = r$;
                },
                style: bgStyles
              }), createComponent(View, {
                ref(r$) {
                  var _ref$2 = bg2;
                  typeof _ref$2 === "function" ? _ref$2(r$) : bg2 = r$;
                },
                style: bgStyles,
                alpha: 0
              }), createComponent(View, {
                ref(r$) {
                  var _ref$3 = heroMask;
                  typeof _ref$3 === "function" ? _ref$3(r$) : heroMask = r$;
                },
                src: "./assets/hero-mask-inverted.png",
                get color() {
                  return hexColor(theme.color.materialBrand);
                },
                width: 1920,
                height: 1080
              })];
            }
          });
        }
        function objectFromEntries(entries) {
          if (!entries || !entries[Symbol.iterator]) {
            throw new Error("objectFromEntries requires a single iterable argument");
          }
          var obj = {};
          var _iterator23 = _createForOfIteratorHelper(entries),
            _step23;
          try {
            for (_iterator23.s(); !(_step23 = _iterator23.n()).done;) {
              var _step23$value = _slicedToArray(_step23.value, 2),
                _key28 = _step23$value[0],
                value = _step23$value[1];
              obj[_key28] = value;
            }
          } catch (err) {
            _iterator23.e(err);
          } finally {
            _iterator23.f();
          }
          return obj;
        }

        /*
         * Copyright 2024 Comcast Cable Communications Management, LLC
         * Licensed under the Apache License, Version 2.0 (the "License");
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         *
         * SPDX-License-Identifier: Apache-2.0
         */

        // TODO types, sub components
        // TODO these are configurable per component, move to theme?
        var defaultModeKeys = ['focus', 'disabled'];
        var defaultToneKeys = ['brand', 'inverse', 'neutral'];
        function makeComponentStyles({
          themeKeys,
          base,
          modes = {},
          tones = {},
          themeStyles,
          modeKeys = defaultModeKeys,
          toneKeys = defaultToneKeys
        }, debug = false) {
          /**
           * creates the object of tone styles
           *
           * for each key in the tone object, pass its set of styles to mapModeConfigToSolidStyle for formatting
           */
          var makeToneStyles = (tones, themeComponentStyles, modeStyles) => {
            var toneStyles = toneKeys.map(tone => {
              var _tones$tone, _themeComponentStyles;
              var styles = {};

              // get list of style keys across both style file and theme component config
              // TODO a better way to do this
              var styleList = new Set([].concat.apply([], [(_tones$tone = tones === null || tones === void 0 ? void 0 : tones[tone]) !== null && _tones$tone !== void 0 ? _tones$tone : {}, (_themeComponentStyles = themeComponentStyles === null || themeComponentStyles === void 0 ? void 0 : themeComponentStyles[tone]) !== null && _themeComponentStyles !== void 0 ? _themeComponentStyles : {}].map(Object.keys)));

              // combine style file tones and theme component config tones, ignoring tone modes(added below)
              styleList.forEach(styleKey => {
                // if the style isn't a mode
                if (!modeKeys.includes(styleKey)) {
                  var _themeComponentStyles2, _themeComponentStyles3, _tones$tone2;
                  styles[styleKey] = (_themeComponentStyles2 = themeComponentStyles === null || themeComponentStyles === void 0 || (_themeComponentStyles3 = themeComponentStyles[tone]) === null || _themeComponentStyles3 === void 0 ? void 0 : _themeComponentStyles3[styleKey]) !== null && _themeComponentStyles2 !== void 0 ? _themeComponentStyles2 : tones === null || tones === void 0 || (_tones$tone2 = tones[tone]) === null || _tones$tone2 === void 0 ? void 0 : _tones$tone2[styleKey];
                }
              });

              /**
               *  merge tone modes with the following priority(lowest to highest):
               * - base.mode
               * - style file tone.mode
               * - theme component config tone.mode
               */
              modeKeys.forEach(mode => {
                var _tones$tone3, _themeComponentStyles4;
                styles[mode] = _objectSpread(_objectSpread(_objectSpread({}, modeStyles[mode]), tones === null || tones === void 0 || (_tones$tone3 = tones[tone]) === null || _tones$tone3 === void 0 ? void 0 : _tones$tone3[mode]), themeComponentStyles === null || themeComponentStyles === void 0 || (_themeComponentStyles4 = themeComponentStyles[tone]) === null || _themeComponentStyles4 === void 0 ? void 0 : _themeComponentStyles4[mode]);
              });
              return [tone, styles];
            });
            return objectFromEntries(toneStyles);
          };

          /**
           * creates the object of mode(state-controlled) styles
           *
           * for each key in the mode object, pass its set of styles to mapModeConfigToSolidStyle for formatting
           */
          var makeModeStyles = (modes, themeComponentStyles) => {
            var modeStyles = modeKeys.map(mode => {
              return [mode, _objectSpread(_objectSpread({}, modes === null || modes === void 0 ? void 0 : modes[mode]), themeComponentStyles === null || themeComponentStyles === void 0 ? void 0 : themeComponentStyles[mode])];
            });
            var modeObject = objectFromEntries(modeStyles);
            return modeObject;
          };

          /**
           * creates a base style object
           *
           * if a property has a themeable value(has a corresponding themeKey in the themeKeys object) check the
           * componentConfig for a base value. if one exists use it, otherwise use the value from the defaults object
           */
          var makeBaseStyles = (base, themeComponentStyles) => {
            var baseStyles = _objectSpread(_objectSpread({}, base), themeComponentStyles.base);
            return baseStyles;
          };

          /**
           * uses the themeKey map to assign themed values to solid style properties
           * `themeKeys` is globally available
           */
          var mapThemeKeysToSolid = stylesToMap => objectFromEntries(Object.entries(themeKeys).filter(([_, themeKey]) => stylesToMap[themeKey]).map(([solidKey, themeKey]) => [solidKey, stylesToMap[themeKey]]));
          var convertComponentConfig = themeStyles => {
            var convertedThemeStyles = objectFromEntries(
            // iterate through each variant
            Object.entries(themeStyles).map(([variantName, styles]) => {
              // within each variant, assign the theme value to the correct solid style property for each theme key
              var convertedStyles = mapThemeKeysToSolid(styles);
              // repeat the above for each mode within a variant
              Object.entries(styles).filter(([styleName, _]) => modeKeys.includes(styleName)).forEach(([modeName, modeStyles]) => {
                convertedStyles[modeName] = mapThemeKeysToSolid(modeStyles);
              });
              return [variantName, convertedStyles];
            }));
            return convertedThemeStyles;
          };
          var generateSolidStylesFromLookupObject = (base, modes, tones) => {
            var themeComponentStyles = convertComponentConfig(themeStyles);
            debug && console.log(themeComponentStyles);
            var baseStyles = makeBaseStyles(base, themeComponentStyles);
            debug && console.log(baseStyles);
            var modeStyles = makeModeStyles(modes, themeComponentStyles);
            debug && console.log(modeStyles);
            var toneStyles = makeToneStyles(tones, themeComponentStyles, modeStyles);
            debug && console.log(toneStyles);
            return {
              base: _objectSpread(_objectSpread({}, baseStyles), modeStyles),
              tones: toneStyles
            };
          };
          return generateSolidStylesFromLookupObject(base, modes, tones);
        }
        function withScrolling(isRow) {
          var dimension = isRow ? "width" : "height";
          var axis = isRow ? "x" : "y";
          return (componentRef, selectedElement, selected = 0, lastSelected) => {
            var _ref27, _componentRef$_target, _componentRef$offset, _selectedElement$axis, _selectedElement$dime;
            if (!componentRef.children.length) return;
            var gap = componentRef.gap || 0;
            var scroll = componentRef.scroll || "auto";
            var rootPosition = (_ref27 = (_componentRef$_target = componentRef._targetPosition) !== null && _componentRef$_target !== void 0 ? _componentRef$_target : componentRef[axis]) !== null && _ref27 !== void 0 ? _ref27 : 0;
            componentRef.offset = (_componentRef$offset = componentRef.offset) !== null && _componentRef$offset !== void 0 ? _componentRef$offset : rootPosition;
            var offset = componentRef.offset;
            selectedElement = selectedElement || componentRef.children[selected];
            var selectedPosition = (_selectedElement$axis = selectedElement[axis]) !== null && _selectedElement$axis !== void 0 ? _selectedElement$axis : 0;
            var selectedSize = (_selectedElement$dime = selectedElement[dimension]) !== null && _selectedElement$dime !== void 0 ? _selectedElement$dime : 0;
            var movement = lastSelected === void 0 ? "none" : selected > lastSelected ? "incremental" : "decremental";
            var nextPosition = rootPosition;
            var _updateLastIndex = updateLastIndex(isRow, componentRef),
              _updateLastIndex2 = _slicedToArray(_updateLastIndex, 2),
              lastItem = _updateLastIndex2[0],
              containerSize = _updateLastIndex2[1];
            var isNotShown = (pos, size) => Math.abs(rootPosition) + containerSize < pos + size;
            if (scroll === "auto") {
              if (componentRef.scrollIndex != void 0 && componentRef.scrollIndex >= 0) {
                if (componentRef.selected >= componentRef.scrollIndex) {
                  nextPosition = movement === "incremental" ? rootPosition - selectedSize - gap : rootPosition + selectedSize + gap;
                } else if (movement === "decremental" && componentRef.selected === componentRef.scrollIndex - 1) {
                  nextPosition = rootPosition + selectedSize + gap;
                }
              } else if (isNotShown(lastItem.position, lastItem.size) || selectedPosition < Math.abs(rootPosition)) {
                nextPosition = -selectedPosition + offset;
              }
            } else if (scroll === "always" || scroll === "edge" && movement === "decremental" && Math.abs(rootPosition) > selectedPosition) {
              nextPosition = -selectedPosition + offset;
            } else if (scroll === "edge" && movement === "incremental" && isNotShown(selectedPosition, selectedSize)) {
              nextPosition = rootPosition - selectedSize - gap;
            } else if (scroll === "edge" && movement === "none") {
              var currentChildIndex = 0;
              var isNotShownMemo = isNotShown(selectedPosition, selectedSize);
              while (currentChildIndex < componentRef.children.length && isNotShownMemo) {
                var _currentChild$dimensi;
                var currentChild = componentRef.children[currentChildIndex++];
                if (currentChild.skipFocus) continue;
                var currentChildSize = (_currentChild$dimensi = currentChild[dimension]) !== null && _currentChild$dimensi !== void 0 ? _currentChild$dimensi : 0;
                rootPosition -= currentChildSize + gap;
              }
              nextPosition = rootPosition;
            }
            if (componentRef[axis] !== nextPosition) {
              componentRef[axis] = nextPosition;
              componentRef._targetPosition = nextPosition;
            }
          };
        }
        function updateLastIndex(isRow, items) {
          var _lastChild$y, _lastChild$height, _items$height;
          var lastChild;
          for (var i = items.children.length - 1; i >= 0; i--) {
            if (!items.children[i].skipFocus) {
              lastChild = items.children[i];
              break;
            }
          }
          if (isRow) {
            var _lastChild$x, _lastChild$width, _items$width;
            return [{
              position: (_lastChild$x = lastChild.x) !== null && _lastChild$x !== void 0 ? _lastChild$x : 0,
              size: (_lastChild$width = lastChild.width) !== null && _lastChild$width !== void 0 ? _lastChild$width : 0
            }, (_items$width = items.width) !== null && _items$width !== void 0 ? _items$width : 0];
          }
          return [{
            position: (_lastChild$y = lastChild.y) !== null && _lastChild$y !== void 0 ? _lastChild$y : 0,
            size: (_lastChild$height = lastChild.height) !== null && _lastChild$height !== void 0 ? _lastChild$height : 0
          }, (_items$height = items.height) !== null && _items$height !== void 0 ? _items$height : 0];
        }
        function chainFunctions(...args) {
          var onlyFunctions = args.filter(func => typeof func === "function");
          if (onlyFunctions.length === 0) {
            return void 0;
          }
          if (onlyFunctions.length === 1) {
            return onlyFunctions[0];
          }
          return function (...innerArgs) {
            var result;
            var _iterator24 = _createForOfIteratorHelper(onlyFunctions),
              _step24;
            try {
              for (_iterator24.s(); !(_step24 = _iterator24.n()).done;) {
                var func = _step24.value;
                result = func.apply(this, innerArgs);
                if (result === true) {
                  return result;
                }
              }
            } catch (err) {
              _iterator24.e(err);
            } finally {
              _iterator24.f();
            }
            return result;
          };
        }
        function onGridFocus() {
          if (!this || this.children.length === 0) return false;
          var child = this.selected ? this.children[this.selected] : this.selectedNode;
          while ((_child = child) !== null && _child !== void 0 && _child.skipFocus) {
            var _child;
            this.selected++;
            child = this.children[this.selected];
          }
          if (!(child instanceof ElementNode)) return false;
          child.setFocus();
          return true;
        }
        function handleNavigation(direction) {
          return function () {
            var numChildren = this.children.length;
            var wrap = this.wrap;
            var lastSelected = this.selected || 0;
            if (numChildren === 0) {
              return false;
            }
            if (direction === "right" || direction === "down") {
              do {
                var _this$children$this$s;
                this.selected = (this.selected || 0) % numChildren + 1;
                if (this.selected >= numChildren) {
                  if (!wrap) {
                    this.selected = void 0;
                    break;
                  }
                  this.selected = 0;
                }
              } while ((_this$children$this$s = this.children[this.selected]) !== null && _this$children$this$s !== void 0 && _this$children$this$s.skipFocus);
            } else if (direction === "left" || direction === "up") {
              do {
                var _this$children$this$s2;
                this.selected = (this.selected || 0) % numChildren - 1;
                if (this.selected < 0) {
                  if (!wrap) {
                    this.selected = void 0;
                    break;
                  }
                  this.selected = numChildren - 1;
                }
              } while ((_this$children$this$s2 = this.children[this.selected]) !== null && _this$children$this$s2 !== void 0 && _this$children$this$s2.skipFocus);
            }
            if (this.selected === void 0) {
              var _this$children$this$s3;
              this.selected = lastSelected;
              if ((_this$children$this$s3 = this.children[this.selected]) !== null && _this$children$this$s3 !== void 0 && _this$children$this$s3.states.has("focus")) {
                return false;
              }
            }
            var active = this.children[this.selected];
            assertTruthy(active instanceof ElementNode);
            this.onSelectedChanged && this.onSelectedChanged.call(this, this, active, this.selected, lastSelected);
            if (this.plinko) {
              var lastSelectedChild = this.children[lastSelected];
              assertTruthy(lastSelectedChild instanceof ElementNode);
              var num = lastSelectedChild.selected || 0;
              active.selected = num < active.children.length ? num : active.children.length - 1;
            }
            active.setFocus();
            return true;
          };
        }
        function getWidthByUpCount(upCount = 1) {
          var screenW = theme.layout.screenW;
          var columnCount = theme.layout.columnCount;
          var marginX = theme.layout.marginX;
          var gutterX = theme.layout.gutterX;
          if (upCount < 1 || upCount > columnCount) {
            console.error(`getWidthByUpCount expects an upCount between 1 & ${columnCount}, received ${upCount}. Defaulting to upCount 1.`);
            upCount = 1;
          }
          var columnWidth = screenW - marginX * 2;
          var columnGapTotal = (upCount - 1) * gutterX;
          var totalColumnsWidth = columnWidth - columnGapTotal;
          return totalColumnsWidth / upCount;
        }
        function createSpriteMap(src, subTextures) {
          var spriteMapTexture = renderer$1.createTexture("ImageTexture", {
            src
          });
          return subTextures.reduce((acc, t) => {
            var x = t.x,
              y = t.y,
              width = t.width,
              height = t.height;
            acc[t.name] = renderer$1.createTexture("SubTexture", {
              texture: spriteMapTexture,
              x,
              y,
              width,
              height
            });
            return acc;
          }, {});
        }
        var _theme$componentConfi = theme === null || theme === void 0 ? void 0 : theme.componentConfig,
          _theme$componentConfi2 = _theme$componentConfi.Artwork,
          _theme$componentConfi3 = _theme$componentConfi2 === void 0 ? {
            themeStyles: {}
          } : _theme$componentConfi2,
          defaultTone$h = _theme$componentConfi3.defaultTone,
          themeStyles$g = _objectWithoutProperties(_theme$componentConfi3, _excluded);
        var container$h = {
          themeKeys: {
            fallbackSrc: "fallbackSrc",
            fillColor: "fillColor",
            scale: "imageScale",
            pivotX: "imageScalePivotX",
            pivotY: "imageScalePivotY",
            borderRadius: "radius"
          },
          base: {
            fallbackSrc: void 0,
            fillColor: theme.color.overlay,
            gradientColor: theme.color.material,
            pivotX: 0.5,
            pivotY: 0.5,
            scale: void 0,
            borderRadius: theme.radius.md
          },
          themeStyles: themeStyles$g
        };
        makeComponentStyles(container$h);
        var _theme$componentConfi4 = theme.componentConfig.Badge,
          _theme$componentConfi5 = _theme$componentConfi4 === void 0 ? {
            themeStyles: {}
          } : _theme$componentConfi4,
          defaultTone$g = _theme$componentConfi5.defaultTone,
          themeStyles$f = _objectWithoutProperties(_theme$componentConfi5, _excluded2);
        var container$g = {
          themeKeys: {
            color: "backgroundColor",
            borderRadius: "radius",
            gap: "contentSpacing"
          },
          base: {
            // TODO clew uses strokeColor, but we currently don't account for nested properties (border.color)
            // TODO clew uses strokeWidth, but we currently don't account for nested properties (border.width)
            color: theme.color.fillInverseSecondary,
            borderRadius: theme.radius.sm,
            // borderRadius must be applied _before_ border to prevent the node from breaking
            border: {
              color: theme.color.strokeInverse,
              width: theme.stroke.sm
            },
            gap: theme.spacer.xs,
            display: "flex",
            justifyContent: "flexStart",
            alignItems: "center"
          },
          tones: {
            inverse: {
              color: theme.color.fillNeutralSecondary,
              borderRadius: theme.radius.sm,
              border: {
                color: theme.color.strokeInverseSecondary,
                width: theme.stroke.sm
              }
            },
            brand: {
              color: theme.color.fillBrand,
              borderRadius: theme.radius.sm,
              border: {
                color: theme.color.strokeInverseSecondary,
                width: theme.stroke.sm
              }
            }
          },
          themeStyles: themeStyles$f
        };
        var text$7 = {
          themeKeys: {
            color: "textColor"
          },
          base: _objectSpread(_objectSpread({}, theme.typography.tag1), {}, {
            color: theme.color.textNeutral,
            lineHeight: theme.typography.tag1.lineHeight + 12,
            marginRight: theme.spacer.md + theme.stroke.sm,
            marginLeft: theme.spacer.md + theme.stroke.sm
          }),
          tones: {
            inverse: {
              color: theme.color.textInverse
            },
            brand: {
              color: theme.color.textNeutral
            }
          },
          themeStyles: themeStyles$f
        };
        var icon$2 = {
          themeKeys: {
            color: "iconColor"
          },
          base: {
            color: theme.color.textNeutral
          },
          tones: {
            inverse: {
              color: theme.color.textInverse
            },
            brand: {
              color: theme.color.textNeutral
            }
          },
          themeStyles: themeStyles$f
        };
        var Container$6 = makeComponentStyles(container$g);
        var Icon$1 = makeComponentStyles(icon$2);
        var Text$4 = makeComponentStyles(text$7);
        var styles$8 = exports("r", {
          tone: defaultTone$g || "neutral",
          Container: Container$6,
          Icon: Icon$1,
          Text: Text$4
        });
        var _theme$componentConfi6 = theme === null || theme === void 0 ? void 0 : theme.componentConfig,
          _theme$componentConfi7 = _theme$componentConfi6.Button,
          _theme$componentConfi8 = _theme$componentConfi7 === void 0 ? {
            buttonThemeStyles: {}
          } : _theme$componentConfi7,
          defaultTone$f = _theme$componentConfi8.defaultTone,
          buttonThemeStyles = _objectWithoutProperties(_theme$componentConfi8, _excluded3);
        var _theme$componentConfi9 = theme === null || theme === void 0 ? void 0 : theme.componentConfig,
          _theme$componentConfi10 = _theme$componentConfi9.Surface,
          _theme$componentConfi11 = _theme$componentConfi10 === void 0 ? {
            surfaceThemeStyles: {}
          } : _theme$componentConfi10,
          surfaceDefaultTone = _theme$componentConfi11.surfaceDefaultTone,
          surfaceThemeStyles$1 = _objectWithoutProperties(_theme$componentConfi11, _excluded4);
        var themeStyles$e = _objectSpread(_objectSpread({}, buttonThemeStyles), surfaceThemeStyles$1);
        var container$f = {
          themeKeys: {
            borderRadius: "radius",
            color: "backgroundColor",
            justifyContent: "justify",
            itemSpacing: "contentSpacing"
          },
          base: {
            height: theme.typography.button1.lineHeight + theme.spacer.xl * 2,
            display: "flex",
            padding: [theme.spacer.xxxl, theme.spacer.xl],
            color: theme.color.interactiveNeutral,
            justifyContent: "center",
            alignItems: "center",
            flexBoundary: "fixed",
            borderRadius: theme.radius.sm,
            contentColor: theme.color.fillNeutral
          },
          modes: {
            focus: {
              color: theme.color.interactiveNeutralFocus,
              contentColor: theme.color.fillInverse
            },
            disabled: {
              color: theme.color.fillNeutralDisabled
            }
          },
          tones: {
            inverse: {
              color: theme.color.interactiveInverse
            },
            brand: {
              color: theme.color.interactiveBrand,
              focus: {
                color: theme.color.fillNeutral
              }
            }
          },
          themeStyles: themeStyles$e
        };
        var content = {
          themeKeys: {
            color: "contentColor"
          },
          base: {
            color: theme.color.textNeutral
          },
          modes: {
            focus: {
              color: theme.color.textInverse
            },
            disabled: {
              color: theme.color.textNeutralDisabled
            }
          },
          tones: {
            inverse: {
              color: theme.color.fillNeutral
            },
            brand: {
              color: theme.color.fillBrand,
              focus: {
                color: theme.color.fillBrand
              }
            }
          },
          themeStyles: themeStyles$e
        };
        var text$6 = {
          themeKeys: {
            color: "textColor"
          },
          base: _objectSpread(_objectSpread({
            color: theme.color.textNeutral
          }, theme.typography.button1), {}, {
            textAlign: "center",
            contain: "none"
          }),
          modes: {
            focus: {
              color: theme.color.textInverse
            },
            disabled: {
              color: theme.color.textNeutralDisabled
            }
          },
          tones: {
            inverse: {
              color: theme.color.fillNeutral
            },
            brand: {
              color: theme.color.fillBrand,
              focus: {
                color: theme.color.fillBrand
              }
            }
          },
          themeStyles: themeStyles$e
        };
        var Container$5 = makeComponentStyles(container$f);
        var Content = makeComponentStyles(content);
        var Text$3 = makeComponentStyles(text$6);
        var styles$7 = exports("K", {
          tone: defaultTone$f || surfaceDefaultTone || "neutral",
          Container: Container$5,
          Content,
          Text: Text$3
        });
        var _theme$componentConfi12 = theme === null || theme === void 0 ? void 0 : theme.componentConfig,
          _theme$componentConfi13 = _theme$componentConfi12.Checkbox,
          _theme$componentConfi14 = _theme$componentConfi13 === void 0 ? {
            themeStyles: {}
          } : _theme$componentConfi13,
          defaultTone$e = _theme$componentConfi14.defaultTone,
          themeStyles$d = _objectWithoutProperties(_theme$componentConfi14, _excluded5);
        var container$e = {
          themeKeys: {
            color: "backgroundColor",
            borderRadius: "radius",
            border: "border",
            justifyContent: "justifyContent"
          },
          base: {
            width: theme.spacer.xxl,
            height: theme.spacer.xxl,
            display: "flex",
            justifyContent: "center",
            color: theme.color.fillNeutral,
            alignItems: "center",
            borderRadius: theme.spacer.xxl / 4,
            border: {
              color: theme.color.strokeInverse,
              width: theme.stroke.sm
            }
          },
          modes: {
            disabled: {
              alpha: theme.alpha.inactive
            }
          },
          tones: {
            brand: {
              borderRadius: theme.spacer.xxl / 4,
              border: {
                color: theme.color.strokeNeutralSecondary,
                width: theme.stroke.sm
              },
              color: theme.color.fillNeutralSecondary,
              checked: {
                borderRadius: theme.spacer.xxl / 4,
                border: {
                  color: theme.color.strokeNeutralSecondary,
                  width: theme.stroke.sm
                },
                color: theme.color.fillBrand
              }
            },
            neutral: {
              borderRadius: theme.spacer.xxl / 4,
              border: {
                color: theme.color.strokeNeutralSecondary,
                width: theme.stroke.sm
              },
              color: theme.color.fillInverseSecondary,
              checked: {
                borderRadius: theme.spacer.xxl / 4,
                border: {
                  color: theme.color.strokeNeutralSecondary,
                  width: theme.stroke.sm
                },
                color: theme.color.fillNeutral
              }
            },
            inverse: {
              borderRadius: theme.spacer.xxl / 4,
              border: {
                color: theme.color.strokeInverseSecondary,
                width: theme.stroke.sm
              },
              color: theme.color.fillNeutralSecondary,
              checked: {
                borderRadius: theme.spacer.xxl / 4,
                border: {
                  color: theme.color.strokeInverseSecondary,
                  width: theme.stroke.sm
                },
                color: theme.color.fillInverse
              }
            }
          },
          modeKeys: ["focus", "disabled", "checked"],
          themeStyles: themeStyles$d
        };
        var icon$1 = {
          themeKeys: {
            // color: 'strokeColor', see types 58 for TODO
            width: "checkWidth",
            height: "checkHeight"
          },
          base: {
            width: theme.spacer.lg,
            height: theme.spacer.lg,
            src: theme.asset.check
          },
          tones: {
            neutral: {
              color: theme.color.fillInverse
            },
            inverse: {
              color: theme.color.fillNeutral
            },
            brand: {
              color: theme.color.fillInverse
            }
          },
          themeStyles: themeStyles$d
        };
        makeComponentStyles(container$e);
        makeComponentStyles(icon$1);
        var _theme$componentConfi15 = theme === null || theme === void 0 ? void 0 : theme.componentConfig,
          _theme$componentConfi16 = _theme$componentConfi15.Icon,
          _theme$componentConfi17 = _theme$componentConfi16 === void 0 ? {
            themeStyles: {}
          } : _theme$componentConfi16,
          defaultTone$d = _theme$componentConfi17.defaultTone,
          themeStyles$c = _objectWithoutProperties(_theme$componentConfi17, _excluded6);
        var container$d = {
          themeKeys: {
            color: "color"
          },
          base: {
            width: 100,
            height: 100,
            color: theme.color.fillNeutral
          },
          tones: {
            inverse: {
              color: theme.color.fillInverse
            },
            brand: {
              color: theme.color.fillBrand
            }
          },
          themeStyles: themeStyles$c
        };
        makeComponentStyles(container$d);
        var _theme$componentConfi18 = theme === null || theme === void 0 ? void 0 : theme.componentConfig,
          _theme$componentConfi19 = _theme$componentConfi18.Column,
          _theme$componentConfi20 = _theme$componentConfi19 === void 0 ? {
            themeStyles: {}
          } : _theme$componentConfi19,
          defaultTone$c = _theme$componentConfi20.defaultTone,
          themeStyles$b = _objectWithoutProperties(_theme$componentConfi20, _excluded7);
        var container$c = {
          themeKeys: {
            gap: "itemSpacing",
            scrollIndex: "scrollIndex",
            transition: "itemTransition"
          },
          base: {
            display: "flex",
            flexBoundary: "fixed",
            flexDirection: "column",
            gap: theme.layout.gutterY,
            transition: {
              y: _objectSpread(_objectSpread({}, theme.animation.standardEntrance), {}, {
                duration: theme.animation.duration.fast
              })
            }
          },
          themeStyles: themeStyles$b
        };
        var Container$4 = makeComponentStyles(container$c);
        var styles$6 = {
          tone: defaultTone$c || "neutral",
          Container: Container$4
        };
        var Column = exports("C", props => {
          var onUp = handleNavigation("up");
          var onDown = handleNavigation("down");
          var scroll = withScrolling(false);
          return createComponent(View, mergeProps(props, {
            get onUp() {
              return chainFunctions(props.onUp, onUp);
            },
            get onDown() {
              return chainFunctions(props.onDown, onDown);
            },
            get selected() {
              return props.selected || 0;
            },
            forwardFocus: onGridFocus,
            get onLayout() {
              return memo(() => !!props.selected)() ? chainFunctions(props.onLayout, scroll) : props.onLayout;
            },
            get onSelectedChanged() {
              return chainFunctions(props.onSelectedChanged, props.scroll !== "none" ? scroll : void 0);
            },
            get style() {
              var _props$tone;
              return [props.style,
              //
              styles$6.Container.tones[(_props$tone = props.tone) !== null && _props$tone !== void 0 ? _props$tone : styles$6.tone], styles$6.Container.base];
            }
          }));
        });
        var _theme$componentConfi21 = theme === null || theme === void 0 ? void 0 : theme.componentConfig,
          _theme$componentConfi22 = _theme$componentConfi21.Input,
          _theme$componentConfi23 = _theme$componentConfi22 === void 0 ? {
            themeStyles: {}
          } : _theme$componentConfi22,
          defaultTone$b = _theme$componentConfi23.defaultTone,
          themeStyles$a = _objectWithoutProperties(_theme$componentConfi23, _excluded8);
        var container$b = {
          themeKeys: {
            borderRadius: "radius",
            color: "backgroundColor",
            justifyContent: "justify"
          },
          base: {
            // TODO clew uses strokeColor, but we currently don't account for nested properties (border.color)
            // TODO clew uses strokeWidth, but we currently don't account for nested properties (border.width)
            width: getWidthByUpCount(4),
            height: 100,
            display: "flex",
            flexDirection: "column",
            padding: [theme.spacer.xxxl, theme.spacer.xl],
            color: theme.color.interactiveNeutral,
            contentColor: theme.color.fillInverse,
            borderRadius: theme.radius.sm,
            marginX: theme.spacer.xxxl,
            actualTitle: ""
          },
          themeStyles: themeStyles$a
        };
        var text$5 = {
          themeKeys: {
            color: "textColor"
          },
          base: _objectSpread({
            textAlign: "left",
            color: theme.color.textNeutral
          }, theme.typography.button1),
          themeStyles: themeStyles$a
        };
        var Container$3 = makeComponentStyles(container$b);
        var Text$2 = makeComponentStyles(text$5);
        var styles$5 = exports("G", {
          tone: defaultTone$b || "neutral",
          Container: Container$3,
          Text: Text$2
        });
        var _theme$componentConfi24 = theme === null || theme === void 0 ? void 0 : theme.componentConfig,
          _theme$componentConfi25 = _theme$componentConfi24.Key,
          _theme$componentConfi26 = _theme$componentConfi25 === void 0 ? {
            themeStyles: {}
          } : _theme$componentConfi25,
          defaultTone$a = _theme$componentConfi26.defaultTone,
          themeStyles$9 = _objectWithoutProperties(_theme$componentConfi26, _excluded9);
        var container$a = {
          themeKeys: {
            keySpacing: "keySpacing",
            borderRadius: "borderRadius",
            color: "backgroundColor",
            justifyContent: "justify",
            baseWidth: "baseWidth",
            sizes: "sizes",
            contentColor: "contentColor"
          },
          base: {
            keySpacing: theme.spacer.md,
            height: theme.spacer.md * 9,
            paddingX: theme.spacer.md,
            contentColor: theme.color.fillNeutral,
            sizes: {
              sm: 1,
              md: 2,
              lg: 3,
              xl: 4,
              xxl: 5
            },
            padding: [theme.spacer.md],
            baseWidth: theme.spacer.md * 7,
            color: theme.color.interactiveNeutral,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: theme.radius.sm
          },
          modes: {
            focus: {
              color: theme.color.interactiveNeutralFocus,
              contentColor: theme.color.fillInverse
            },
            disabled: {
              color: theme.color.fillNeutralDisabled,
              contentColor: theme.color.fillNeutralDisabled
            }
          },
          tones: {
            inverse: {
              color: theme.color.interactiveInverse,
              focus: {
                color: theme.color.interactiveInverseFocus,
                contentColor: theme.color.fillNeutral
              }
            },
            brand: {
              focus: {
                contentColor: theme.color.fillNeutral
              }
            }
          },
          themeStyles: themeStyles$9
        };
        var text$4 = {
          themeKeys: {
            color: "textColor"
          },
          base: _objectSpread(_objectSpread({
            color: theme.color.textNeutral
          }, theme.typography.headline2), {}, {
            textAlign: "center",
            contain: "none"
          }),
          modes: {
            focus: {
              color: theme.color.textInverse
            },
            disabled: {
              color: theme.color.textNeutralDisabled
            }
          },
          tones: {
            inverse: {
              focus: {
                color: theme.color.textNeutral
              }
            }
          },
          themeStyles: themeStyles$9
        };
        var Container$2 = makeComponentStyles(container$a);
        var Text$1 = makeComponentStyles(text$4);
        var styles$4 = exports("H", {
          tone: defaultTone$a || "neutral",
          Container: Container$2,
          Text: Text$1
        });
        var _theme$componentConfi27 = theme === null || theme === void 0 ? void 0 : theme.componentConfig,
          _theme$componentConfi28 = _theme$componentConfi27.Keyboard,
          _theme$componentConfi29 = _theme$componentConfi28 === void 0 ? {} : _theme$componentConfi28,
          defaultTone$9 = _theme$componentConfi29.defaultTone,
          themeStyles$8 = _objectWithoutProperties(_theme$componentConfi29, _excluded10);
        var _theme$componentConfi30 = theme === null || theme === void 0 ? void 0 : theme.componentConfig,
          _theme$componentConfi31 = _theme$componentConfi30.Key,
          _theme$componentConfi32 = _theme$componentConfi31 === void 0 ? {} : _theme$componentConfi31,
          keyThemeStyles = Object.assign({}, (_objectDestructuringEmpty(_theme$componentConfi32), _theme$componentConfi32));
        var container$9 = {
          themeKeys: {
            gap: "keySpacing",
            width: "screenW",
            marginX: "marginX",
            keyHeight: "keyHeight"
          },
          base: {
            gap: theme.spacer.md,
            width: theme.layout.screenW,
            display: "flex",
            marginX: theme.layout.marginX,
            keyHeight: 100,
            flexBoundary: "contain"
          },
          // @ts-expect-error TODO fix style types for component configs
          themeStyles: themeStyles$8
        };
        var key = {
          themeKeys: {
            gap: "keySpacing",
            borderRadius: "borderRadius",
            color: "backgroundColor",
            justifyContent: "justify",
            baseWidth: "baseWidth",
            sizes: "sizes",
            contentColor: "contentColor"
            // what is this used for
          },
          base: {
            gap: theme.spacer.md,
            height: theme.spacer.md * 9,
            sizes: {
              sm: 1,
              md: 2,
              lg: 3,
              xl: 4,
              xxl: 5
            },
            contentColor: theme.color.fillNeutral,
            padding: [theme.spacer.xxxl, theme.spacer.xl],
            baseWidth: theme.spacer.md * 7,
            color: theme.color.interactiveNeutral,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: theme.radius.sm
          },
          modes: {
            focus: {
              color: theme.color.interactiveNeutralFocus,
              contentColor: theme.color.fillInverse
            },
            disabled: {
              color: theme.color.fillNeutralDisabled,
              contentColor: theme.color.fillNeutralDisabled
            }
          },
          tones: {
            inverse: {
              color: theme.color.interactiveInverse,
              focus: {
                color: theme.color.interactiveInverseFocus,
                contentColor: theme.color.fillNeutral
              }
            },
            brand: {
              focus: {
                contentColor: theme.color.fillNeutral
              }
            }
          },
          themeStyles: keyThemeStyles
        };
        var text$3 = {
          themeKeys: {
            color: "textColor"
          },
          base: _objectSpread({
            color: theme.color.textNeutral
          }, theme.typography.headline2),
          modes: {
            focus: {
              color: theme.color.textInverse
            },
            disabled: {
              color: theme.color.textNeutralDisabled
            }
          },
          tones: {
            inverse: {
              focus: {
                color: theme.color.textNeutral
              }
            }
          },
          // @ts-expect-error TODO fix style types for component configs
          themeStyles: themeStyles$8
        };
        var Container$1 = makeComponentStyles(container$9);
        var Key = makeComponentStyles(key);
        var Text = makeComponentStyles(text$3);
        var styles$3 = exports("J", {
          tone: defaultTone$9,
          Container: Container$1,
          Key,
          Text
        });
        var _theme$componentConfi33 = theme === null || theme === void 0 ? void 0 : theme.componentConfig,
          _theme$componentConfi34 = _theme$componentConfi33.Row,
          _theme$componentConfi35 = _theme$componentConfi34 === void 0 ? {
            themeStyles: {}
          } : _theme$componentConfi34,
          defaultTone$8 = _theme$componentConfi35.defaultTone,
          themeStyles$7 = _objectWithoutProperties(_theme$componentConfi35, _excluded11);
        var container$8 = {
          themeKeys: {
            gap: "itemSpacing",
            scrollIndex: "scrollIndex",
            transition: "itemTransition"
          },
          base: {
            display: "flex",
            flexBoundary: "fixed",
            flexDirection: "row",
            gap: theme.layout.gutterX,
            transition: {
              x: _objectSpread(_objectSpread({}, theme.animation.standardEntrance), {}, {
                duration: theme.animation.duration.fast
              })
            }
          },
          themeStyles: themeStyles$7
        };
        var Container = makeComponentStyles(container$8);
        var styles$2 = {
          tone: defaultTone$8,
          Container
        };
        var Row = exports("R", props => {
          var onLeft = handleNavigation("left");
          var onRight = handleNavigation("right");
          var scroll = withScrolling(true);
          return createComponent(View, mergeProps(props, {
            get selected() {
              return props.selected || 0;
            },
            get onLeft() {
              return chainFunctions(props.onLeft, onLeft);
            },
            get onRight() {
              return chainFunctions(props.onRight, onRight);
            },
            forwardFocus: onGridFocus,
            get onLayout() {
              return memo(() => !!props.selected)() ? chainFunctions(props.onLayout, scroll) : props.onLayout;
            },
            get onSelectedChanged() {
              return chainFunctions(props.onSelectedChanged, props.scroll !== "none" ? scroll : void 0);
            },
            get style() {
              var _props$tone2;
              return [props.style,
              //
              styles$2.Container.tones[(_props$tone2 = props.tone) !== null && _props$tone2 !== void 0 ? _props$tone2 : styles$2.tone], styles$2.Container.base];
            }
          }));
        });
        var _theme$componentConfi36 = theme === null || theme === void 0 ? void 0 : theme.componentConfig,
          _theme$componentConfi37 = _theme$componentConfi36.Label,
          _theme$componentConfi38 = _theme$componentConfi37 === void 0 ? {
            themeStyles: {}
          } : _theme$componentConfi37,
          defaultTone$7 = _theme$componentConfi38.defaultTone,
          themeStyles$6 = _objectWithoutProperties(_theme$componentConfi38, _excluded12);
        var container$7 = {
          themeKeys: {
            color: "backgroundColor",
            borderRadius: "radius"
          },
          base: {
            display: "flex",
            justifyContent: "flexStart",
            color: theme.color.textNeutral,
            padding: [theme.spacer.md, theme.spacer.lg],
            // TODO themed padding values
            height: theme.typography.caption1.lineHeight + theme.spacer.md * 2,
            borderRadius: [theme.radius.md, theme.radius.md, theme.radius.md, theme.radius.none],
            neutral: {
              backgroundColor: theme.color.fillNeutral
            }
          },
          tones: {
            inverse: {
              color: theme.color.fillInverse
            },
            brand: {
              color: theme.color.fillBrand,
              focus: {
                color: theme.color.orange
              }
            }
          },
          themeStyles: themeStyles$6
        };
        var text$2 = {
          themeKeys: {
            color: "textColor"
          },
          base: _objectSpread(_objectSpread({}, theme.typography.caption1), {}, {
            color: theme.color.textInverse,
            lineHeight: theme.typography.caption1.lineHeight + theme.spacer.md * 2,
            marginRight: theme.spacer.lg,
            marginLeft: theme.spacer.lg
          }),
          tones: {
            inverse: {
              color: theme.color.textNeutral
            },
            brand: {
              color: theme.color.textNeutral
            }
          },
          themeStyles: themeStyles$6
        };
        makeComponentStyles(container$7);
        makeComponentStyles(text$2);
        var _theme$componentConfi39 = theme === null || theme === void 0 ? void 0 : theme.componentConfig,
          _theme$componentConfi40 = _theme$componentConfi39.Details,
          _theme$componentConfi41 = _theme$componentConfi40 === void 0 ? {
            themeStyles: {}
          } : _theme$componentConfi40,
          defaultTone$6 = _theme$componentConfi41.defaultTone,
          themeStyles$5 = _objectWithoutProperties(_theme$componentConfi41, _excluded13);
        var container$6 = {
          themeKeys: {
            alignItems: "alignItems",
            gap: "contentSpacing",
            badgeContentSpacing: "badgeContentSpacing",
            ratingContentSpacing: "ratingContentSpacing"
          },
          base: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: theme.spacer.sm,
            flexBoundary: "contain",
            badgeContentSpacing: theme.spacer.sm,
            ratingContentSpacing: theme.spacer.sm
          },
          themeStyles: themeStyles$5
        };
        var text$1 = {
          themeKeys: {
            color: "textColor"
          },
          base: _objectSpread(_objectSpread({}, theme.typography.body2), {}, {
            marginRight: theme.spacer.lg,
            color: theme.color.textNeutral
          }),
          tones: {
            neutral: {
              disabled: {
                color: theme.color.textNeutralDisabled
              }
            },
            inverse: {
              color: theme.color.textInverse,
              disabled: {
                color: theme.color.textNeutralDisabled
              }
            },
            brand: {
              color: theme.color.textNeutral,
              disabled: {
                color: theme.color.textNeutralDisabled
              }
            }
          },
          themeStyles: themeStyles$5
        };
        makeComponentStyles(container$6);
        makeComponentStyles(text$1);
        var _theme$componentConfi42 = theme === null || theme === void 0 ? void 0 : theme.componentConfig,
          _theme$componentConfi43 = _theme$componentConfi42.Rating,
          _theme$componentConfi44 = _theme$componentConfi43 === void 0 ? {
            themeStyles: {}
          } : _theme$componentConfi43,
          defaultTone$5 = _theme$componentConfi44.defaultTone,
          themeStyles$4 = _objectWithoutProperties(_theme$componentConfi44, _excluded14);
        var container$5 = {
          themeKeys: {
            justifyContent: "justifyContent",
            gap: "contentSpacing"
          },
          base: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "flexStart",
            gap: theme.spacer.sm,
            alignItems: "center"
          },
          themeStyles: themeStyles$4
        };
        var text = {
          themeKeys: {
            color: "textColor"
          },
          base: _objectSpread({
            color: theme.color.textNeutral
          }, theme.typography.body2),
          tones: {
            neutral: {
              disabled: {
                color: theme.color.textNeutralDisabled
              }
            },
            inverse: {
              color: theme.color.textInverse,
              disabled: {
                color: theme.color.textNeutralDisabled
              }
            },
            brand: {
              color: theme.color.textNeutral,
              disabled: {
                color: theme.color.textNeutralDisabled
              }
            }
          },
          themeStyles: themeStyles$4
        };
        var icon = {
          themeKeys: {
            color: "color"
          },
          base: {
            height: theme.typography.body2.lineHeight,
            width: theme.typography.body2.lineHeight,
            color: theme.color.fillNeutral,
            marginRight: theme.spacer.sm
          },
          themeStyles: themeStyles$4
        };
        makeComponentStyles(container$5);
        makeComponentStyles(icon);
        makeComponentStyles(text);
        var _theme$componentConfi45 = theme === null || theme === void 0 ? void 0 : theme.componentConfig,
          _theme$componentConfi46 = _theme$componentConfi45.Metadata,
          _theme$componentConfi47 = _theme$componentConfi46 === void 0 ? {
            themeStyles: {}
          } : _theme$componentConfi46,
          defaultTone$4 = _theme$componentConfi47.defaultTone,
          themeStyles$3 = _objectWithoutProperties(_theme$componentConfi47, _excluded15);
        var container$4 = {
          themeKeys: {
            justifyContent: "justifyContent",
            alpha: "alpha"
          },
          base: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "flexStart",
            flexBoundary: "contain",
            alpha: theme.alpha.primary
          },
          modes: {
            disabled: {
              alpha: theme.alpha.inactive
            }
          },
          themeStyles: themeStyles$3
        };
        var titleText = {
          themeKeys: {
            color: "textColor"
          },
          base: _objectSpread(_objectSpread({
            maxLines: 1,
            contain: "width"
          }, theme.typography.headline3), {}, {
            color: theme.color.textNeutral
          }),
          tones: {
            neutral: {
              disabled: {
                color: theme.color.textNeutralDisabled
              }
            },
            inverse: {
              color: theme.color.textInverse,
              disabled: {
                color: theme.color.textNeutralDisabled
              }
            },
            brand: {
              color: theme.color.textNeutral,
              disabled: {
                color: theme.color.textNeutralDisabled
              }
            }
          },
          themeStyles: themeStyles$3
        };
        var descriptionText = {
          themeKeys: {
            color: "textColor"
          },
          base: _objectSpread(_objectSpread({
            contain: "width",
            maxLines: 2
          }, theme.typography.body3), {}, {
            color: theme.color.textNeutralSecondary
          }),
          tones: {
            neutral: {
              disabled: {
                color: theme.color.textNeutralDisabled
              }
            },
            inverse: {
              color: theme.color.textInverseSecondary,
              disabled: {
                color: theme.color.textNeutralDisabled
              }
            },
            brand: {
              color: theme.color.textNeutralSecondary,
              disabled: {
                color: theme.color.textNeutralDisabled
              }
            }
          },
          themeStyles: themeStyles$3
        };
        makeComponentStyles(container$4);
        makeComponentStyles(descriptionText);
        makeComponentStyles(titleText);
        var _theme$componentConfi48 = theme === null || theme === void 0 ? void 0 : theme.componentConfig,
          _theme$componentConfi49 = _theme$componentConfi48.ProgressBar,
          _theme$componentConfi50 = _theme$componentConfi49 === void 0 ? {
            themeStyles: {}
          } : _theme$componentConfi49,
          defaultTone$3 = _theme$componentConfi50.defaultTone,
          themeStyles$2 = _objectWithoutProperties(_theme$componentConfi50, _excluded16);
        var container$3 = {
          themeKeys: {
            color: "barColor",
            borderRadius: "radius"
          },
          base: {
            height: theme.spacer.md,
            color: theme.color.fillNeutralTertiary,
            borderRadius: theme.radius.xs
          },
          tones: {
            inverse: {
              color: theme.color.fillInverseTertiary
            }
          },
          themeStyles: themeStyles$2
        };
        var progress = {
          themeKeys: {
            color: "progressColor",
            borderRadius: "radius"
          },
          base: {
            borderRadius: theme.radius.xs,
            color: theme.color.fillNeutral
          },
          tones: {
            inverse: {
              color: theme.color.fillInverse
            },
            brand: {
              color: theme.color.fillBrand
            }
          },
          themeStyles: themeStyles$2
        };
        makeComponentStyles(container$3);
        makeComponentStyles(progress);
        var _theme$componentConfi51 = theme === null || theme === void 0 ? void 0 : theme.componentConfig,
          _theme$componentConfi52 = _theme$componentConfi51.Radio,
          _theme$componentConfi53 = _theme$componentConfi52 === void 0 ? {
            themeStyles: {}
          } : _theme$componentConfi52,
          defaultTone$2 = _theme$componentConfi53.defaultTone,
          themeStyles$1 = _objectWithoutProperties(_theme$componentConfi53, _excluded17);
        var container$2 = {
          themeKeys: {
            borderRadius: "radius",
            color: "backgroundColor",
            colorChecked: "backgroundColorChecked"
          },
          base: {
            color: theme.color.fillNeutralSecondary,
            height: theme.spacer.xxl + theme.stroke.sm * 2,
            width: theme.spacer.xxl + theme.stroke.sm * 2,
            borderRadius: theme.spacer.xxl / 2 + theme.stroke.sm,
            border: {
              color: theme.color.strokeNeutralSecondary,
              width: theme.stroke.sm
            }
          },
          tones: {
            inverse: {
              border: {
                color: theme.color.strokeInverseSecondary,
                width: theme.stroke.sm
              }
            },
            brand: {
              border: {
                color: theme.color.fillBrand,
                width: theme.stroke.sm
              }
            }
          },
          modeKeys: ["focus", "disabled", "checked"],
          themeStyles: themeStyles$1
        };
        var knob$1 = {
          themeKeys: {
            width: "knobWidth",
            height: "knobHeight",
            borderRadius: "knobRadius",
            color: "knobColor",
            colorChecked: "knobColorChecked"
          },
          base: {
            color: theme.color.fillInverse,
            colorChecked: theme.color.fillInverse,
            width: theme.spacer.xxl,
            height: theme.spacer.xxl,
            borderRadius: theme.spacer.xxl / 2
          },
          tones: {
            inverse: {
              color: theme.color.fillNeutral
            }
          },
          themeStyles: themeStyles$1
        };
        makeComponentStyles(container$2);
        makeComponentStyles(knob$1);
        var _theme$componentConfi54 = theme === null || theme === void 0 ? void 0 : theme.componentConfig,
          _theme$componentConfi55 = _theme$componentConfi54.Tile,
          _theme$componentConfi56 = _theme$componentConfi55 === void 0 ? {
            tileThemeStyles: {}
          } : _theme$componentConfi55,
          defaultTone$1 = _theme$componentConfi56.defaultTone,
          tileThemeStyles = _objectWithoutProperties(_theme$componentConfi56, _excluded18);
        var _theme$componentConfi57 = theme === null || theme === void 0 ? void 0 : theme.componentConfig,
          _theme$componentConfi58 = _theme$componentConfi57.Surface,
          _theme$componentConfi59 = _theme$componentConfi58 === void 0 ? {
            surfaceThemeStyles: {}
          } : _theme$componentConfi58,
          defaultSurfaceTone = _theme$componentConfi59.defaultSurfaceTone,
          surfaceThemeStyles = _objectWithoutProperties(_theme$componentConfi59, _excluded19);
        var container$1 = {
          themeKeys: {
            alpha: "alpha",
            paddingYProgress: "paddingYProgress",
            paddingYBetweenContent: "paddingYBetweenContent",
            contentSpacingY: "contentSpacingY",
            borderRadius: "radius"
          },
          base: {
            width: 400,
            height: 240,
            padding: [40, 10],
            // TODO support separate paddingX and paddingY values from theme, possibly formatter
            paddingYProgress: theme.spacer.xl,
            paddingYBetweenContent: theme.spacer.md,
            contentSpacingY: theme.spacer.md,
            borderRadius: theme.radius.md,
            alpha: theme.alpha.primary
          },
          modes: {
            disabled: {
              alpha: theme.alpha.inactive
            }
          },
          themeStyles: _objectSpread(_objectSpread({}, surfaceThemeStyles), tileThemeStyles)
        };
        var insetBottom = {
          themeKeys: {},
          base: {
            display: "flex",
            flexDirection: "column",
            flexBoundary: "contain",
            mountY: 1
          },
          themeStyles: tileThemeStyles
        };
        var standardBottom = {
          themeKeys: {},
          base: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "flexStart"
          },
          themeStyles: tileThemeStyles
        };
        var logoContainer = {
          themeKeys: {},
          base: {
            width: theme.spacer.lg * 5,
            height: theme.spacer.xxl + theme.spacer.md
          },
          themeStyles: tileThemeStyles
        };
        makeComponentStyles(container$1);
        makeComponentStyles(insetBottom);
        makeComponentStyles(standardBottom);
        makeComponentStyles(logoContainer);
        var _theme$componentConfi60 = theme === null || theme === void 0 ? void 0 : theme.componentConfig,
          _theme$componentConfi61 = _theme$componentConfi60.Toggle,
          _theme$componentConfi62 = _theme$componentConfi61 === void 0 ? {
            themeStyles: {}
          } : _theme$componentConfi61,
          defaultTone = _theme$componentConfi62.defaultTone,
          themeStyles = _objectWithoutProperties(_theme$componentConfi62, _excluded20);
        var knobSize = theme.spacer.xl;
        var knobPadding = theme.spacer.xs;
        var strokeWidth = theme.stroke.sm;
        var container = {
          themeKeys: {
            borderRadius: "strokeRadius",
            color: "backgroundColor",
            colorChecked: "backgroundColorChecked"
          },
          base: {
            color: theme.color.fillInverseTertiary,
            colorChecked: theme.color.fillNeutral,
            height: knobSize + (knobPadding + strokeWidth) * 2,
            width: (strokeWidth + knobPadding * 2 + knobSize) * 2,
            borderRadius: knobSize / 2 + knobPadding + strokeWidth,
            border: {
              // TODO- strokeWidth, strokeColor, and strokeColorChecked map to border object with themeKeys
              color: theme.color.fillNeutral,
              width: strokeWidth
            }
          },
          modes: {
            focus: {},
            disabled: {
              borderRadius: knobSize / 2 + knobPadding + strokeWidth,
              border: {
                color: theme.color.fillNeutralDisabled,
                width: strokeWidth
              },
              color: theme.color.fillInverseDisabled,
              colorChecked: theme.color.fillNeutralDisabled
            }
          },
          tones: {
            inverse: {
              borderRadius: knobSize / 2 + knobPadding + strokeWidth,
              border: {
                color: theme.color.fillInverse,
                width: strokeWidth
              },
              color: theme.color.fillNeutralTertiary,
              colorChecked: theme.color.fillInverse,
              disabled: {
                borderRadius: knobSize / 2 + knobPadding + strokeWidth,
                border: {
                  color: theme.color.fillInverseDisabled,
                  width: strokeWidth
                },
                color: theme.color.fillNeutralDisabled,
                colorChecked: theme.color.fillInverseDisabled
              }
            },
            brand: {
              borderRadius: knobSize / 2 + knobPadding + strokeWidth,
              border: {
                color: theme.color.fillBrand,
                width: strokeWidth
              },
              color: theme.color.fillBrandTertiary,
              colorChecked: theme.color.fillBrand,
              disabled: {
                borderRadius: knobSize / 2 + knobPadding + strokeWidth,
                border: {
                  color: theme.color.fillNeutralDisabled,
                  width: strokeWidth
                },
                color: theme.color.fillInverseDisabled,
                colorChecked: theme.color.fillNeutralDisabled
              }
            }
          },
          // TODO: figure out checked state
          themeStyles
        };
        var knob = {
          themeKeys: {
            width: "knobWidth",
            height: "knobHeight",
            padding: "knobPadding",
            borderRadius: "knobRadius",
            color: "knobColor",
            colorChecked: "knobColorChecked"
          },
          base: {
            color: theme.color.fillNeutral,
            colorChecked: theme.color.fillInverse,
            width: knobSize,
            height: knobSize,
            borderRadius: knobSize / 2,
            padding: knobPadding
          },
          modes: {
            focus: {},
            disabled: {
              color: theme.color.fillNeutralDisabled,
              colorChecked: theme.color.fillInverseDisabled
            }
          },
          tones: {
            inverse: {
              color: theme.color.fillInverse,
              colorChecked: theme.color.fillNeutral,
              disabled: {
                color: theme.color.fillInverseDisabled,
                colorChecked: theme.color.fillNeutralDisabled
              }
            },
            brand: {
              color: theme.color.fillBrand,
              colorChecked: theme.color.fillInverse,
              disabled: {
                color: theme.color.fillNeutralDisabled,
                colorChecked: theme.color.fillInverseDisabled
              }
            }
          },
          themeStyles
        };
        makeComponentStyles(container);
        makeComponentStyles(knob);
        var fpsStyle = {
          color: 255,
          height: 180,
          width: 330,
          x: 1900,
          y: 6,
          mountX: 1,
          alpha: 0.8,
          zIndex: 100
        };
        var fpsLabel = {
          x: 10,
          fontSize: 20,
          textColor: 4143380223
        };
        var fpsValue = {
          fontSize: 22,
          textColor: 4143380223
        };
        var _createSignal27 = createSignal(0),
          _createSignal28 = _slicedToArray(_createSignal27, 2),
          fps = _createSignal28[0],
          setFps = _createSignal28[1];
        var _createSignal29 = createSignal(0),
          _createSignal30 = _slicedToArray(_createSignal29, 2),
          avgFps = _createSignal30[0],
          setAvgFps = _createSignal30[1];
        var _createSignal31 = createSignal(99),
          _createSignal32 = _slicedToArray(_createSignal31, 2),
          minFps = _createSignal32[0],
          setMinFps = _createSignal32[1];
        var _createSignal33 = createSignal(0),
          _createSignal34 = _slicedToArray(_createSignal33, 2),
          maxFps = _createSignal34[0],
          setMaxFps = _createSignal34[1];
        var _createSignal35 = createSignal(""),
          _createSignal36 = _slicedToArray(_createSignal35, 2),
          criticalThresholdSignal = _createSignal36[0],
          setCriticalThresholdSignal = _createSignal36[1];
        var _createSignal37 = createSignal(""),
          _createSignal38 = _slicedToArray(_createSignal37, 2),
          targetThresholdSignal = _createSignal38[0],
          setTargetThresholdSignal = _createSignal38[1];
        var _createSignal39 = createSignal(""),
          _createSignal40 = _slicedToArray(_createSignal39, 2),
          renderableMemUsedSignal = _createSignal40[0],
          setRenderableMemUsedSignal = _createSignal40[1];
        var _createSignal41 = createSignal(""),
          _createSignal42 = _slicedToArray(_createSignal41, 2),
          memUsedSignal = _createSignal42[0],
          setMemUsedSignal = _createSignal42[1];
        var _createSignal43 = createSignal(0),
          _createSignal44 = _slicedToArray(_createSignal43, 2),
          renderableTexturesLoadedSignal = _createSignal44[0],
          setRenderableTexturesLoadedSignal = _createSignal44[1];
        var _createSignal45 = createSignal(0),
          _createSignal46 = _slicedToArray(_createSignal45, 2),
          loadedTexturesSignal = _createSignal46[0],
          setLoadedTexturesSignal = _createSignal46[1];
        var count = 0;
        var totalFps = 0;
        var infoFontSize = 14;
        function bytesToMb(bytes) {
          return (bytes / 1024 / 1024).toFixed(2) + " Mb";
        }
        var calcFps = fps2 => {
          if (!fps2) return;
          setFps(fps2);
          setMinFps(prev => Math.min(fps2, prev));
          setMaxFps(prev => Math.max(fps2, prev));
          totalFps += fps2;
          count++;
          setAvgFps(Math.round(totalFps / count));
        };
        function updateMemoryInfo(stage) {
          var memInfo = stage.txMemManager.getMemoryInfo();
          setCriticalThresholdSignal(bytesToMb(memInfo.criticalThreshold));
          setTargetThresholdSignal(bytesToMb(memInfo.targetThreshold));
          setRenderableMemUsedSignal(bytesToMb(memInfo.renderableMemUsed));
          setMemUsedSignal(bytesToMb(memInfo.memUsed));
          setRenderableTexturesLoadedSignal(memInfo.renderableTexturesLoaded);
          setLoadedTexturesSignal(memInfo.loadedTextures);
        }
        var frameCount = 0;
        function setupFPS(root) {
          root.renderer.on("fpsUpdate", (target, fpsData) => {
            var fps2 = typeof fpsData === "number" ? fpsData : fpsData.fps;
            if (fps2 > 5) {
              calcFps(fps2);
              if (frameCount % 10 === 0) {
                updateMemoryInfo(target.stage);
                frameCount = 0;
              }
              frameCount++;
            }
          });
        }
        var FPSCounter = props => {
          return createComponent(View, mergeProps(props, {
            style: fpsStyle,
            get children() {
              return [createComponent(View, {
                y: 6,
                get children() {
                  return [createComponent(Text$5, {
                    style: fpsLabel,
                    children: "FPS:"
                  }), createComponent(Text$5, {
                    style: fpsValue,
                    x: 90,
                    get children() {
                      return fps().toString();
                    }
                  })];
                }
              }), createComponent(View, {
                y: 6,
                x: 160,
                get children() {
                  return [createComponent(Text$5, {
                    style: fpsLabel,
                    children: "AVG:"
                  }), createComponent(Text$5, {
                    style: fpsValue,
                    x: 100,
                    get children() {
                      return avgFps().toString();
                    }
                  })];
                }
              }), createComponent(View, {
                x: 0,
                y: 26,
                get children() {
                  return [createComponent(Text$5, {
                    style: fpsLabel,
                    children: "MIN:"
                  }), createComponent(Text$5, {
                    style: fpsValue,
                    x: 90,
                    get children() {
                      return minFps().toString();
                    }
                  })];
                }
              }), createComponent(View, {
                x: 160,
                y: 26,
                get children() {
                  return [createComponent(Text$5, {
                    style: fpsLabel,
                    children: "MAX:"
                  }), createComponent(Text$5, {
                    style: fpsValue,
                    x: 100,
                    get children() {
                      return maxFps().toString();
                    }
                  })];
                }
              }), createComponent(View, {
                display: "flex",
                flexDirection: "column",
                y: 58,
                gap: 4,
                get children() {
                  return [createComponent(View, {
                    height: infoFontSize,
                    get children() {
                      return [createComponent(Text$5, {
                        fontSize: infoFontSize,
                        style: fpsLabel,
                        children: "criticalThreshold:"
                      }), createComponent(Text$5, {
                        fontSize: infoFontSize,
                        style: fpsLabel,
                        x: 230,
                        get children() {
                          return criticalThresholdSignal();
                        }
                      })];
                    }
                  }), createComponent(View, {
                    height: infoFontSize,
                    get children() {
                      return [createComponent(Text$5, {
                        fontSize: infoFontSize,
                        style: fpsLabel,
                        children: "targetThreshold:"
                      }), createComponent(Text$5, {
                        fontSize: infoFontSize,
                        style: fpsLabel,
                        x: 230,
                        get children() {
                          return targetThresholdSignal();
                        }
                      })];
                    }
                  }), createComponent(View, {
                    height: infoFontSize,
                    get children() {
                      return [createComponent(Text$5, {
                        fontSize: infoFontSize,
                        style: fpsLabel,
                        children: "renderableMemUsed:"
                      }), createComponent(Text$5, {
                        fontSize: infoFontSize,
                        style: fpsLabel,
                        x: 230,
                        get children() {
                          return renderableMemUsedSignal();
                        }
                      })];
                    }
                  }), createComponent(View, {
                    height: infoFontSize,
                    get children() {
                      return [createComponent(Text$5, {
                        fontSize: infoFontSize,
                        style: fpsLabel,
                        children: "memUsed:"
                      }), createComponent(Text$5, {
                        fontSize: infoFontSize,
                        style: fpsLabel,
                        x: 230,
                        get children() {
                          return memUsedSignal();
                        }
                      })];
                    }
                  }), createComponent(View, {
                    height: infoFontSize,
                    get children() {
                      return [createComponent(Text$5, {
                        fontSize: infoFontSize,
                        style: fpsLabel,
                        children: "renderableTexturesLoaded:"
                      }), createComponent(Text$5, {
                        fontSize: infoFontSize,
                        style: fpsLabel,
                        x: 230,
                        get children() {
                          return renderableTexturesLoadedSignal();
                        }
                      })];
                    }
                  }), createComponent(View, {
                    height: infoFontSize,
                    get children() {
                      return [createComponent(Text$5, {
                        fontSize: infoFontSize,
                        style: fpsLabel,
                        children: "loadedTextures:"
                      }), createComponent(Text$5, {
                        fontSize: infoFontSize,
                        style: fpsLabel,
                        x: 230,
                        get children() {
                          return loadedTexturesSignal();
                        }
                      })];
                    }
                  })];
                }
              })];
            }
          }));
        };
        var styles$1 = {
          Column: {
            flexDirection: "column",
            display: "flex",
            width: 140,
            height: 600,
            y: 360,
            gap: 20,
            zIndex: 101,
            transition: {
              x: {
                duration: 250,
                easing: "ease-in-out"
              }
            },
            x: 8,
            focus: {
              width: 500,
              x: theme.layout.marginX
            }
          },
          Gradient: {
            zIndex: 99,
            color: 0x000000FF,
            src: "./assets/sidenav.png",
            alpha: 0,
            width: 1200,
            height: 1080,
            focus: {
              alpha: 1
            },
            transition: {
              alpha: true
            }
          },
          NavButton: {
            zIndex: 102,
            height: 70,
            width: 100,
            borderRadius: 8,
            focus: {
              color: 0x424242FF
            },
            active: {
              width: 328,
              height: 70
            }
          }
        };
        var basePath$1 = "/solid-demo-app/";
        var icons = [{
          name: "experiment",
          width: 81,
          height: 100,
          x: 0,
          y: 0
        }, {
          name: "trending",
          width: 100,
          height: 56,
          x: 81,
          y: 0
        }, {
          name: "tv",
          width: 100,
          height: 68,
          x: 181,
          y: 0
        }, {
          name: "movie",
          width: 94,
          height: 100,
          x: 282,
          y: 0
        }];
        function Icon(props) {
          var sprite = createSpriteMap(basePath$1 + "assets/icons_white.png", icons);
          return createComponent(View, mergeProps(props, {
            get texture() {
              return sprite[props.name];
            },
            get width() {
              return sprite[props.name].props.width;
            },
            get height() {
              return sprite[props.name].props.height;
            },
            get x() {
              return (100 - (sprite[props.name].props.width || 0)) / 2;
            },
            get y() {
              return (100 - (sprite[props.name].props.height || 0)) / 2;
            }
          }));
        }
        function NavButton(props) {
          return createComponent(View, mergeProps(props, {
            forwardStates: true,
            get style() {
              return styles$1.NavButton;
            },
            get children() {
              return [createComponent(View, {
                y: -16,
                get children() {
                  return createComponent(Icon, {
                    scale: 0.5,
                    get name() {
                      return props.icon;
                    }
                  });
                }
              }), createComponent(Text$5, {
                style: {
                  fontSize: 38,
                  x: 116,
                  y: 18,
                  height: 50,
                  alpha: 0,
                  active: {
                    alpha: 1
                  }
                },
                get children() {
                  return props.children;
                }
              })];
            }
          }));
        }
        function NavDrawer(props) {
          var backdrop;
          var navigate = useNavigate();
          function onFocus() {
            backdrop.states.add("focus");
            this.children.forEach(c => c.states.add("active"));
            this.children[this.selected || 0].setFocus();
          }
          function onBlur() {
            backdrop.states.remove("focus");
            this.selected = 0;
            this.children.forEach(c => c.states.remove("active"));
          }
          function handleNavigate(page) {
            var isOnPage = useMatch(() => page);
            if (isOnPage()) {
              return props.focusPage();
            }
            navigate(page);
          }
          return [createComponent(View, {
            flexItem: false,
            width: 300,
            height: 150,
            x: 30,
            y: 15,
            zIndex: 105,
            get alpha() {
              return props.showWidgets ? 1 : 0;
            },
            get children() {
              return [createComponent(Text$5, {
                x: 80,
                fontSize: 28,
                color: 4143380036,
                children: "Built With:"
              }), createComponent(View, {
                y: 22,
                src: "./assets/solidWord.png",
                width: 280,
                height: 52
              }), createComponent(View, {
                x: 0,
                y: 110,
                src: "./assets/tmdb.png",
                width: 80,
                height: 41
              }), createComponent(Text$5, {
                x: 90,
                y: 110,
                contain: "width",
                width: 160,
                fontSize: 12,
                color: 4143380036,
                children: "This product uses the TMDB API but is not endorsed or certified by TMDB."
              })];
            }
          }), createComponent(Column, mergeProps(props, {
            onFocus,
            onBlur,
            get style() {
              return styles$1.Column;
            },
            scroll: "none",
            get children() {
              return [createComponent(NavButton, {
                onEnter: () => handleNavigate("/browse/all"),
                icon: "trending",
                children: "Trending"
              }), createComponent(NavButton, {
                icon: "movie",
                onEnter: () => handleNavigate("/browse/movie"),
                children: "Movies"
              }), createComponent(NavButton, {
                icon: "tv",
                onEnter: () => handleNavigate("/browse/tv"),
                children: "TV"
              }), createComponent(NavButton, {
                icon: "experiment",
                onEnter: () => handleNavigate("/examples"),
                children: "Examples"
              })];
            }
          })), createComponent(View, {
            skipFocus: true,
            ref(r$) {
              var _ref$ = backdrop;
              typeof _ref$ === "function" ? _ref$(r$) : backdrop = r$;
            },
            get style() {
              return styles$1.Gradient;
            }
          })];
        }
        var App = props => {
          useFocusManager({
            Announcer: ["a"],
            Menu: ["m"],
            Escape: ["Escape", 27],
            Backspace: ["Backspace", 8],
            Left: ["ArrowLeft", 37],
            Right: ["ArrowRight", 39],
            Up: ["ArrowUp", 38],
            Down: ["ArrowDown", 40],
            Enter: ["Enter", 13]
          });
          useMouse();
          var announcer = useAnnouncer();
          announcer.enabled = false;
          var navigate = useNavigate();
          var navDrawer, lastFocused;
          setupFPS({
            renderer: renderer$1
          });
          function focusNavDrawer() {
            if (navDrawer.states.has("focus")) {
              return false;
            }
            lastFocused = activeElement();
            return navDrawer.setFocus();
          }
          var _createSignal47 = createSignal(true),
            _createSignal48 = _slicedToArray(_createSignal47, 2),
            showWidgets = _createSignal48[0],
            setShowWidgets = _createSignal48[1];
          var location = useLocation();
          var showOnPaths = ["/browse", "/entity"];
          createEffect(() => {
            var currentPath = location.pathname;
            var matchesPartial = showOnPaths.some(path => currentPath.startsWith(path));
            if (currentPath === "/") {
              matchesPartial = true;
            }
            setShowWidgets(matchesPartial);
          });
          return createComponent(View, {
            ref(r$) {
              var _ref$ = window.APP;
              typeof _ref$ === "function" ? _ref$(r$) : window.APP = r$;
            },
            onAnnouncer: () => announcer.enabled = !announcer.enabled,
            onLast: () => history.back(),
            onMenu: () => navigate("/"),
            style: {
              width: 1920,
              height: 1080
            },
            onBackspace: focusNavDrawer,
            onLeft: focusNavDrawer,
            onRight: () => navDrawer.states.has("focus") && lastFocused.setFocus(),
            get children() {
              return [createComponent(Background, {}), createComponent(FPSCounter, {
                mountX: 1,
                x: 1910,
                y: 10,
                get alpha() {
                  return showWidgets() ? 1 : 0;
                }
              }), memo(() => props.children), createComponent(NavDrawer, {
                ref(r$) {
                  var _ref$2 = navDrawer;
                  typeof _ref$2 === "function" ? _ref$2(r$) : navDrawer = r$;
                },
                focusPage: () => lastFocused.setFocus(),
                get showWidgets() {
                  return showWidgets();
                }
              })];
            }
          });
        };
        var params = new URLSearchParams(window.location.search);
        var roundPoster = params.get("roundPoster") !== "false";
        var styles = exports("i", {
          Page: {
            width: 1920,
            height: 1080
          },
          headlineText: {
            width: 1200,
            height: 240,
            x: 360,
            // lineHeight: 170, // TODO: Add back when lineHeight is supported
            y: 455,
            contain: "both",
            fontSize: 66,
            textAlign: "center"
          },
          headlineSubText: {
            width: 960,
            height: 170,
            // lineHeight: 170, // TODO: Add back when lineHeight is supported
            x: 530,
            y: 655,
            contain: "both",
            fontSize: 48,
            textAlign: "center"
          },
          itemsContainer: {
            width: theme.layout.screenW,
            height: 800,
            y: 560,
            x: 0,
            zIndex: 2
          },
          Thumbnail: {
            borderRadius: roundPoster ? 16 : 0,
            width: 185,
            height: 278,
            scale: 1,
            zIndex: 2,
            transition: {
              scale: {
                duration: 250,
                easing: "ease-in-out"
              }
            },
            border: {
              width: 0,
              color: 0
            },
            focus: {
              scale: 1.1,
              border: {
                color: 4294967142,
                width: 8
              }
            }
          },
          FocusRing: {
            borderRadius: 16,
            width: 194,
            height: 286,
            y: -5,
            x: -5,
            zIndex: -1
          },
          FPS: {
            color: 255,
            height: 42,
            width: 140,
            x: 20,
            y: 20,
            zIndex: 100
          },
          FPSLabel: {
            x: 10,
            y: 0,
            fontSize: 36,
            textColor: 0xFFFFFFFF
          },
          FPSValue: {
            x: 90,
            y: 0,
            fontSize: 36,
            textColor: 0xFFFFFFFF
          },
          showHeadline: {
            x: 70,
            y: 20
          },
          headlineBlur: {
            width: 1920,
            height: 150,
            x: 0,
            y: 0,
            zIndex: 14,
            alpha: 0.9,
            color: 0x000000FF
          },
          RowTitle: {
            height: 60,
            width: 300,
            marginBottom: -40,
            fontSize: 36,
            color: 0xF0F0F0FF,
            zIndex: 2
          },
          Row: {
            display: "flex",
            justifyContent: "spaceBetween",
            height: 300
          },
          Column: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "flexStart",
            flexBoundary: "contain",
            gap: 64,
            width: theme.layout.screenW - 2 * theme.layout.marginX,
            x: theme.layout.marginX + theme.layout.gutterX,
            y: 48,
            transition: {
              y: {
                duration: 250,
                easing: "ease-in-out"
              }
            },
            zIndex: 2
          },
          Rect: {
            width: 250,
            height: 100,
            y: 10,
            x: 300,
            color: 0x0000FFFF
          },
          peopleBio: _objectSpread(_objectSpread({}, theme.typography.body1), {}, {
            fontFamily: "Roboto",
            fontWeight: "normal",
            contain: "both",
            width: 780,
            height: 340
          })
        });
        var MaterialButton = {
          width: 386,
          height: 136,
          color: 0x715CABFF,
          focus: {
            color: 0x5A39A2FF
          },
          disabled: {
            color: 0x291D43FF
          }
        };
        var MaterialButtonText = exports("M", {
          fontSize: 32,
          contain: "width",
          textAlign: "center",
          mountY: -0.35,
          color: 0xFFFFFFFF,
          height: MaterialButton.height,
          width: MaterialButton.width,
          // lineHeight: MaterialButton.height, // TODO: Add back when lineHeight is supported
          focus: {
            fontSize: 40
          },
          disabled: {
            color: 0x909090FF
          }
        });
        function Thumbnail(props) {
          function changeBackground(node) {
            node.color = 4294967295;
          }
          return createComponent(View, mergeProps(props, {
            color: 16711935,
            onLoad: changeBackground,
            onFail: node => node.src = "failback.png",
            get style() {
              return styles.Thumbnail;
            }
          }));
        }
        function TileRow(props) {
          var _splitProps = splitProps(props, ["items"]),
            _splitProps2 = _slicedToArray(_splitProps, 2),
            local = _splitProps2[0],
            others = _splitProps2[1];
          return createComponent(Row, mergeProps(others, {
            get style() {
              return styles.Row;
            },
            get children() {
              return createComponent(Index, {
                get each() {
                  return local.items;
                },
                children: item => createComponent(Thumbnail, item)
              });
            }
          }));
        }
        var API_KEY_V4 = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZDE4YjEwMTA0YjdiZTlkNjFiMWYwYjVlMGEwNzM2OCIsInN1YiI6IjYwZTVjMTdlNGNhNjc2MDA3NTA4Njc3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D_nqH9kd-bhhWzeVsTDPYhHnsUaNAuyAa6YATmKHqsA";
        var API_BASE = "https://api.themoviedb.org/3";
        var tmdbConfig;
        var baseImageUrl;
        var basePosterSize = "w185";
        var defaultFetchParams = {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + API_KEY_V4
          }
        };
        function getImageUrl(path, posterSize = basePosterSize) {
          return baseImageUrl + posterSize + path;
        }
        function get(path, params = {}) {
          if (tmdbConfig) {
            return _get(path, params);
          } else {
            return loadConfig().then(() => _get(path, params));
          }
        }
        function _get(path, params = {}) {
          return fetch(API_BASE + path, _objectSpread(_objectSpread({}, defaultFetchParams), params)).then(r => r.json());
        }
        function loadConfig() {
          return _get("/configuration").then(data => {
            var _data$images;
            tmdbConfig = data;
            baseImageUrl = (_data$images = data.images) === null || _data$images === void 0 ? void 0 : _data$images.secure_base_url;
            return data;
          });
        }
        var api = exports("v", {
          get,
          loadConfig
        });
        function truncateString(str, maxLength) {
          if (str.length > maxLength) {
            return str.substring(0, maxLength - 3) + "...";
          }
          return str;
        }
        function chunkArray(array, size = 7) {
          var result = [];
          for (var i = 0, j = array.length; i < j; i += size) {
            result.push(array.slice(i, i + size));
          }
          return result;
        }
        function convertItemsToTiles(items = []) {
          return items.map(item => ({
            src: getImageUrl(item.poster_path || item.profile_path),
            tileSrc: getImageUrl(item.backdrop_path || item.profile_path, "w300"),
            backdrop: getImageUrl(item.backdrop_path, "w1280"),
            href: `/entity/${item.media_type || "people"}/${item.id}`,
            shortTitle: truncateString(item.title || item.name, 30),
            title: item.title || item.name,
            item,
            entityInfo: {
              type: item.media_type || "people",
              id: item.id
            },
            heroContent: {
              title: item.title || item.name,
              description: item.overview
            }
          }));
        }
        var cache = /* @__PURE__ */new Map();
        var leftoverTiles = /* @__PURE__ */new Map();
        function browseProvider(filter) {
          return pageIndex => {
            var url = `/trending/${filter}/week?page=${pageIndex}`;
            if (cache.has(url)) {
              return cache.get(url);
            }
            var result = api.get(url).then(trending => {
              var results = trending.results.filter(r => !r.adult);
              var tiles = (leftoverTiles.has(filter) ? leftoverTiles.get(filter) : []).concat(convertItemsToTiles(results));
              var chunks = chunkArray(tiles);
              if (chunks[chunks.length - 1].length < 7) {
                leftoverTiles.set(filter, chunks.pop());
              } else {
                leftoverTiles.delete(filter);
              }
              return chunks;
            });
            cache.set(url, result);
            return result;
          };
        }
        function createInfiniteScroll(fetcher) {
          var _createSignal49 = createSignal([]),
            _createSignal50 = _slicedToArray(_createSignal49, 2),
            pages = _createSignal50[0],
            setPages = _createSignal50[1];
          var _createSignal51 = createSignal(1),
            _createSignal52 = _slicedToArray(_createSignal51, 2),
            page = _createSignal52[0],
            setPage = _createSignal52[1];
          var _createSignal53 = createSignal(false),
            _createSignal54 = _slicedToArray(_createSignal53, 2),
            end = _createSignal54[0],
            setEnd = _createSignal54[1];
          var _createResource3 = createResource(page, fetcher),
            _createResource4 = _slicedToArray(_createResource3, 1),
            contents = _createResource4[0];
          createComputed(() => {
            var content = contents();
            if (!content) return;
            batch(() => {
              if (content.length === 0) setEnd(true);
              setPages(p => [...p, ...content]);
            });
          });
          return {
            pages,
            page,
            setPage,
            setPages,
            end,
            setEnd
          };
        }
        var blockWidth = 900;
        var ContentBlockStyle = {
          display: "flex",
          flexDirection: "column",
          flexBoundary: "fixed",
          width: blockWidth,
          height: 220,
          gap: 16
        };
        var HeadlineStyles = _objectSpread(_objectSpread({}, theme.typography.display2), {}, {
          fontFamily: "Roboto",
          fontWeight: 700,
          maxLines: 1,
          width: blockWidth,
          contain: "width"
        });
        var Headline = props => createComponent(Text$5, mergeProps(props, {
          style: HeadlineStyles
        }));
        var DescriptionStyles = _objectSpread(_objectSpread({}, theme.typography.body1), {}, {
          fontFamily: "Roboto",
          fontWeight: 400,
          lineHeight: 32,
          width: blockWidth,
          maxLines: 3,
          contain: "width"
        });
        var BadgeStyle = {
          fontSize: 16,
          lineHeight: 20,
          marginLeft: 13,
          marginRight: 13
        };
        var Description = props => createComponent(Text$5, mergeProps(props, {
          style: DescriptionStyles,
          get children() {
            return props.children;
          }
        }));
        var Badge = props => {
          return createComponent(View, mergeProps(props, {
            style: {
              color: "0x00000099",
              borderRadius: 8,
              border: {
                width: 2,
                color: "0xffffffff"
              },
              display: "flex",
              height: 36
            },
            get children() {
              return createComponent(Text$5, {
                lineHeight: 36,
                style: BadgeStyle,
                get children() {
                  return props.children;
                }
              });
            }
          }));
        };
        var MetaTextStyle = _objectSpread(_objectSpread({}, theme.typography.body2), {}, {
          fontFamily: "Roboto",
          fontWeight: 400
        });
        var Metadata = props => createComponent(View, {
          style: {
            display: "flex",
            flexDirection: "row",
            gap: 18,
            width: blockWidth,
            height: 48
          },
          get children() {
            return [createComponent(View, {
              y: -4,
              src: "./assets/stars.png",
              width: 188,
              height: 31
            }), createComponent(View, {
              y: -4,
              flexItem: false,
              clipping: true,
              get width() {
                return 188 * props.voteAverage / 10;
              },
              height: 31,
              get children() {
                return createComponent(View, {
                  src: "./assets/stars-full.png",
                  width: 188,
                  height: 31
                });
              }
            }), createComponent(Text$5, {
              style: MetaTextStyle,
              get children() {
                return [memo(() => props.voteCount), " reviews"];
              }
            }), createComponent(Text$5, {
              style: MetaTextStyle,
              get children() {
                return props.metaText;
              }
            }), createComponent(For, {
              get each() {
                return props.badges;
              },
              children: item => createComponent(Badge, {
                y: -5,
                children: item
              })
            })];
          }
        });
        var ContentBlock = exports("z", props => createComponent(View, mergeProps({
          id: "contentBlock",
          style: ContentBlockStyle
        }, props, {
          get children() {
            return [createComponent(Headline, {
              get children() {
                return props.content.title;
              }
            }), createComponent(Description, {
              get children() {
                return props.content.description;
              }
            }), createComponent(Show, {
              get when() {
                return props.content.voteCount;
              },
              get children() {
                return createComponent(Metadata, {
                  get metaText() {
                    return props.content.metaText;
                  },
                  get badges() {
                    return props.content.badges;
                  },
                  get voteCount() {
                    return props.content.voteCount;
                  },
                  get voteAverage() {
                    return props.content.voteAverage;
                  }
                });
              }
            })];
          }
        })));
        var Browse = () => {
          var params = useParams();
          var _createSignal55 = createSignal(0),
            _createSignal56 = _slicedToArray(_createSignal55, 2),
            columnY = _createSignal56[0],
            setcolumnY = _createSignal56[1];
          var _createSignal57 = createSignal({}),
            _createSignal58 = _slicedToArray(_createSignal57, 2),
            heroContent = _createSignal58[0],
            setHeroContent = _createSignal58[1];
          var navigate = useNavigate();
          var isFirst = createSelector(() => {
            return 0;
          });
          var provider = createMemo(() => {
            return createInfiniteScroll(browseProvider(params.filter || "all"));
          });
          var delayedBackgrounds = debounce(img => setGlobalBackground(img), 400);
          var delayedHero = debounce(content => setHeroContent(content || {}), 200);
          createEffect(on(activeElement, elm => {
            if (elm.backdrop) {
              delayedBackgrounds(elm.backdrop);
            }
            if (elm.heroContent) {
              delayedHero(elm.heroContent);
            }
          }, {
            defer: true
          }));
          function onRowFocus() {
            this.children[this.selected || 0].setFocus();
            setcolumnY((this.y || 0) * -1 + 24);
            var numPages = provider().pages().length;
            this.parent.selected = this.parent.children.indexOf(this);
            if (numPages === 0 || this.parent.selected && this.parent.selected >= numPages - 2) {
              provider().setPage(p => p + 1);
            }
          }
          function onEnter() {
            var entity = this.children.find(c => c.states.has("focus"));
            assertTruthy(entity && entity.href);
            navigate(entity.href);
            return true;
          }
          return createComponent(Show, {
            get when() {
              return provider().pages().length;
            },
            get children() {
              return [createComponent(ContentBlock, {
                y: 360,
                x: 162,
                get content() {
                  return heroContent();
                }
              }), createComponent(View, {
                clipping: true,
                get style() {
                  return styles.itemsContainer;
                },
                get children() {
                  return createComponent(Column, {
                    id: "BrowseColumn",
                    plinko: true,
                    announce: "All Trending - Week",
                    get y() {
                      return columnY();
                    },
                    scroll: "none",
                    get style() {
                      return styles.Column;
                    },
                    get children() {
                      return createComponent(For, {
                        get each() {
                          return provider().pages();
                        },
                        children: (items, i) => createComponent(TileRow, {
                          get autofocus() {
                            return isFirst(i());
                          },
                          items,
                          width: 1620,
                          onFocus: onRowFocus,
                          onEnter
                        })
                      });
                    }
                  });
                }
              })];
            }
          });
        };
        var NotFound = () => {
          return (() => {
            var _el$ = createElement("node");
            setProp(_el$, "style", {
              width: 1920,
              height: 1080,
              color: 868483072
            });
            return _el$;
          })();
        };
        var basePath = "/solid-demo-app/";
        var fonts = [{
          type: "msdf",
          fontFamily: "Roboto",
          descriptors: {
            weight: 700
          },
          atlasDataUrl: basePath + "fonts/Roboto-Bold.msdf.json",
          atlasUrl: basePath + "fonts/Roboto-Bold.msdf.png"
        }, {
          type: "msdf",
          fontFamily: "Roboto",
          descriptors: {
            weight: 400
          },
          atlasDataUrl: basePath + "fonts/Roboto-Regular.msdf.json",
          atlasUrl: basePath + "fonts/Roboto-Regular.msdf.png"
        }, {
          type: "msdf",
          fontFamily: "Arial",
          descriptors: {
            weight: 500
          },
          atlasDataUrl: basePath + "fonts/Roboto-Regular.msdf.json",
          atlasUrl: basePath + "fonts/Roboto-Regular.msdf.png"
        }];
        var Grid = lazy(() => __vitePreload(() => module.import('./Grid-legacy-CGVfThtl.js'), false ? __VITE_PRELOAD__ : void 0));
        var Portal = lazy(() => __vitePreload(() => module.import('./Portal-legacy-D2zhwpnn.js'), false ? __VITE_PRELOAD__ : void 0));
        var TextPage = lazy(() => __vitePreload(() => module.import('./Text-legacy-rEN_tkb1.js'), false ? __VITE_PRELOAD__ : void 0));
        var CreatePage = lazy(() => __vitePreload(() => module.import('./Create-legacy-3CSBjvlD.js'), false ? __VITE_PRELOAD__ : void 0));
        var ViewportPage = lazy(() => __vitePreload(() => module.import('./Viewport-legacy-3EL8fWe6.js'), false ? __VITE_PRELOAD__ : void 0));
        var ButtonsPage = lazy(() => __vitePreload(() => module.import('./Buttons-legacy-4D85tcF3.js'), false ? __VITE_PRELOAD__ : void 0));
        var FlexPage = lazy(() => __vitePreload(() => module.import('./Flex-legacy-DMze8a9a.js'), false ? __VITE_PRELOAD__ : void 0));
        var FlexSizePage = lazy(() => __vitePreload(() => module.import('./FlexSize-legacy-BYqTME6I.js'), false ? __VITE_PRELOAD__ : void 0));
        var FlexColumnSizePage = lazy(() => __vitePreload(() => module.import('./FlexColumnSize-legacy-6qVBC8sj.js'), false ? __VITE_PRELOAD__ : void 0));
        var FlexColumnPage = lazy(() => __vitePreload(() => module.import('./FlexColumn-legacy-CTqONmcF.js'), false ? __VITE_PRELOAD__ : void 0));
        var ButtonsMaterialPage = lazy(() => __vitePreload(() => module.import('./ButtonsMaterial-legacy-Cw0aAwt9.js'), false ? __VITE_PRELOAD__ : void 0));
        var SuperFlexPage = lazy(() => __vitePreload(() => module.import('./SuperFlex-legacy-ByRjP5m4.js'), false ? __VITE_PRELOAD__ : void 0));
        var Entity = lazy(() => __vitePreload(() => module.import('./Entity-legacy-CXT6HWZr.js'), false ? __VITE_PRELOAD__ : void 0));
        var People = lazy(() => __vitePreload(() => module.import('./People-legacy-MKbExVMJ.js'), false ? __VITE_PRELOAD__ : void 0));
        var LoginPage = lazy(() => __vitePreload(() => module.import('./Login-legacy-B5M4KoaH.js'), false ? __VITE_PRELOAD__ : void 0));
        var urlParams = new URLSearchParams(window.location.search);
        var numImageWorkers = 2;
        var numWorkers = urlParams.get("numImageWorkers");
        if (numWorkers) {
          numImageWorkers = parseInt(numWorkers);
        }
        Config.debug = false;
        Config.animationsEnabled = true;
        Config.fontSettings.fontFamily = "Roboto";
        Config.fontSettings.color = 0xF6F6F6FF;
        Config.fontSettings.fontSize = 32;
        Config.rendererOptions = {
          fpsUpdateInterval: 200,
          fontEngines: [SdfTextRenderer],
          renderEngine: WebGlCoreRenderer,
          inspector: Inspector,
          textureMemory: {
            criticalThreshold: 8e7
          },
          numImageWorkers,
          // temp fix for renderer bug
          // Set the resolution based on window height
          // 720p = 0.666667, 1080p = 1, 1440p = 1.5, 2160p = 2
          deviceLogicalPixelRatio: window.innerHeight / 1080
        };
        var _createRenderer = createRenderer(),
          render = _createRenderer.render;
        loadFonts(fonts);
        render(() => createComponent(HashRouter, {
          root: props => createComponent(App, props),
          get children() {
            return [createComponent(Route, {
              path: "",
              component: Browse
            }), createComponent(Route, {
              path: "examples",
              component: Portal
            }), createComponent(Route, {
              path: "browse/:filter",
              component: Browse
            }), createComponent(Route, {
              path: "grid",
              component: Grid
            }), createComponent(Route, {
              path: "text",
              component: TextPage
            }), createComponent(Route, {
              path: "login",
              component: LoginPage
            }), createComponent(Route, {
              path: "buttons",
              component: ButtonsPage
            }), createComponent(Route, {
              path: "flex",
              component: FlexPage
            }), createComponent(Route, {
              path: "create",
              component: CreatePage
            }), createComponent(Route, {
              path: "viewport",
              component: ViewportPage
            }), createComponent(Route, {
              path: "flexsize",
              component: FlexSizePage
            }), createComponent(Route, {
              path: "flexcolumnsize",
              component: FlexColumnSizePage
            }), createComponent(Route, {
              path: "flexcolumn",
              component: FlexColumnPage
            }), createComponent(Route, {
              path: "superflex",
              component: SuperFlexPage
            }), createComponent(Route, {
              path: "buttonsmaterial",
              component: ButtonsMaterialPage
            }), createComponent(Route, {
              path: "entity/people/:id",
              component: People
            }), createComponent(Route, {
              path: "entity/:type/:id",
              component: Entity
            }), createComponent(Route, {
              path: "*all",
              component: NotFound
            })];
          }
        }));

        // Documentation from Shaka player:
        // https://shaka-player-demo.appspot.com/docs/api/tutorial-basic-usage.html

        function playVideo() {
          var video = document.getElementById("video");
          video.hidden = false;
          // Needs delay from hidden to play in Chrome
          setTimeout(() => video.play(), 50);
          video.focus();
          return video;
        }
        function closeVideo() {
          var video = document.getElementById("video");
          video.hidden = true;
          video.pause();
          return video;
        }

        //document.addEventListener("DOMContentLoaded", initApp);
      }
    };
  });
})();
//# sourceMappingURL=index-legacy-B6GZdLbY.js.map
