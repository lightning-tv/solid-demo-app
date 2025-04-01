;
(function () {
  function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
  function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
  function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
  function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
  function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
  function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
  function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
  function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
  function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
  function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
  function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
  function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
  function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
  function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
  function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
  function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
  System.register(['./index-legacy-B9ONHhp-.js'], function (exports, module) {
    'use strict';

    var createSignal, setGlobalBackground, createEffect, createComponent, View, Text, Row;
    return {
      setters: [function (module) {
        createSignal = module.c;
        setGlobalBackground = module.s;
        createEffect = module.f;
        createComponent = module.h;
        View = module.V;
        Text = module.T;
        Row = module.R;
      }],
      execute: function execute() {
        exports("default", Firebolt);

        /*
         * Copyright 2021 Comcast Cable Communications Management, LLC
         *
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

        var win$3 = typeof window !== 'undefined' ? window : {};
        var listener;
        var setMockListener = function setMockListener(func) {
          listener = func;
        };
        var mock$1;
        var pending = [];
        var eventMap = {};
        var callback;
        var testHarness;
        if (win$3.__firebolt && win$3.__firebolt.testHarness) {
          testHarness = win$3.__firebolt.testHarness;
        }
        function send(message) {
          console.debug('Sending message to transport: ' + message);
          var json = JSON.parse(message);

          // handle bulk sends
          if (Array.isArray(json)) {
            json.forEach(function (j) {
              return send(JSON.stringify(j));
            });
            return;
          }
          var _json$method$split = json.method.split('.'),
            _json$method$split2 = _slicedToArray(_json$method$split, 2),
            module = _json$method$split2[0],
            method = _json$method$split2[1];
          if (testHarness && testHarness.onSend) {
            testHarness.onSend(module, method, json.params, json.id);
          }

          // store the ID of the first listen for each event
          if (method.match(/^on[A-Z]/)) {
            if (json.params.listen) {
              eventMap[json.id] = module.toLowerCase() + '.' + method[2].toLowerCase() + method.substr(3);
            } else {
              Object.keys(eventMap).forEach(function (key) {
                if (eventMap[key] === module.toLowerCase() + '.' + method[2].toLowerCase() + method.substr(3)) {
                  delete eventMap[key];
                }
              });
            }
          }
          if (mock$1) handle(json);else pending.push(json);
        }
        function handle(json) {
          var result;
          try {
            result = getResult(json.method, json.params);
          } catch (error) {
            setTimeout(function () {
              return callback(JSON.stringify({
                jsonrpc: '2.0',
                error: {
                  code: -32602,
                  message: 'Invalid params (this is a mock error from the mock transport layer)'
                },
                id: json.id
              }));
            });
          }
          setTimeout(function () {
            return callback(JSON.stringify({
              jsonrpc: '2.0',
              result: result,
              id: json.id
            }));
          });
        }
        function receive(_callback) {
          callback = _callback;
          if (testHarness && typeof testHarness.initialize === 'function') {
            testHarness.initialize({
              emit: event,
              listen: function listen() {
                listener.apply(void 0, arguments);
              }
            });
          }
        }
        function event(module, event, value) {
          var listener = Object.entries(eventMap).find(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
              k = _ref2[0],
              v = _ref2[1];
            return v.toLowerCase() === module.toLowerCase() + '.' + event.toLowerCase();
          });
          if (listener) {
            var message = JSON.stringify({
              jsonrpc: '2.0',
              id: parseInt(listener[0]),
              result: value
            });
            callback(message);
          }
        }
        function dotGrab$1() {
          var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          var key = arguments.length > 1 ? arguments[1] : undefined;
          var keys = key.split('.');
          var ref = obj;
          var _loop = function _loop(i) {
            ref = (Object.entries(ref).find(function (_ref3) {
              var _ref4 = _slicedToArray(_ref3, 2),
                k = _ref4[0],
                v = _ref4[1];
              return k.toLowerCase() === keys[i].toLowerCase();
            }) || [null, {}])[1];
          };
          for (var i = 0; i < keys.length; i++) {
            _loop(i);
          }
          return ref;
        }
        function getResult(method, params) {
          var api = dotGrab$1(mock$1, method);
          if (method.match(/^[a-zA-Z]+\.on[A-Za-z]+$/)) {
            api = {
              event: method,
              listening: true
            };
          }
          if (typeof api === 'function') {
            return params == null ? api() : api(params);
          } else return api;
        }
        function setMockResponses(m) {
          mock$1 = m;
          pending.forEach(function (json) {
            return handle(json);
          });
          pending.length = 0;
        }
        var mock$2 = {
          send: send,
          receive: receive,
          event: event
        };
        function router(params, callbackOrValue, contextParameterCount) {
          var numArgs = params ? Object.values(params).length : 0;
          if (numArgs === contextParameterCount && callbackOrValue === undefined) {
            // getter
            return 'getter';
          } else if (numArgs === contextParameterCount && typeof callbackOrValue === 'function') {
            // subscribe
            return 'subscriber';
          } else if (numArgs === 0 && typeof callbackOrValue === 'function') {
            // for x-subscriber-type: global
            return 'subscriber';
          } else if (numArgs === contextParameterCount && callbackOrValue !== undefined) {
            // setter
            return 'setter';
          }
          return null;
        }
        var mocks = {};
        function mock(module, method, params, value, contextParameterCount, def) {
          var type = router(params, value, contextParameterCount);
          var hash = contextParameterCount ? '.' + Object.keys(params).filter(function (key) {
            return key !== 'value';
          }).map(function (key) {
            return params[key];
          }).join('.') : '';
          var key = "".concat(module, ".").concat(method).concat(hash);
          if (type === 'getter') {
            var _value = mocks.hasOwnProperty(key) ? mocks[key] : def;
            return _value;
          } else if (type === 'subscriber') ;else if (type === 'setter') {
            mocks[key] = value;
            mock$2.event(module, "".concat(method, "Changed"), {
              value: value
            });
            return null;
          }
        }
        var MockProps = {
          mock: mock
        };

        /*
         * Copyright 2021 Comcast Cable Communications Management, LLC
         *
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

        var _Accessibility = {
          closedCaptions: {
            enabled: true,
            styles: {
              fontFamily: 'monospaced_sanserif',
              fontSize: 1,
              fontColor: 0xFFFFFFFF,
              fontEdge: 'none',
              fontEdgeColor: 0x7F7F7FFF,
              fontOpacity: 100,
              backgroundColor: 0x000000FF,
              backgroundOpacity: 100,
              textAlign: 'center',
              textAlignVertical: 'middle',
              windowColor: 'white',
              windowOpacity: 50
            },
            preferredLanguages: ['eng', 'spa']
          },
          closedCaptionsSettings: function closedCaptionsSettings(params) {
            return MockProps.mock('Accessibility', 'closedCaptionsSettings', params, undefined, 0, {
              enabled: true,
              styles: {
                fontFamily: 'monospaced_sanserif',
                fontSize: 1,
                fontColor: 0xFFFFFFFF,
                fontEdge: 'none',
                fontEdgeColor: 0x7F7F7FFF,
                fontOpacity: 100,
                backgroundColor: 0x000000FF,
                backgroundOpacity: 100,
                textAlign: 'center',
                textAlignVertical: 'middle',
                windowColor: 'white',
                windowOpacity: 50
              },
              preferredLanguages: ['eng', 'spa']
            });
          },
          highContrastUI: function highContrastUI(params) {
            return MockProps.mock('Accessibility', 'highContrastUI', params, undefined, 0, true);
          },
          voiceGuidance: {
            enabled: true,
            navigationHints: true,
            rate: 1
          },
          voiceGuidanceSettings: function voiceGuidanceSettings(params) {
            return MockProps.mock('Accessibility', 'voiceGuidanceSettings', params, undefined, 0, {
              enabled: true,
              navigationHints: true,
              rate: 1
            });
          },
          audioDescriptionSettings: function audioDescriptionSettings(params) {
            return MockProps.mock('Accessibility', 'audioDescriptionSettings', params, undefined, 0, {
              enabled: true
            });
          }
        };

        /*
         * Copyright 2021 Comcast Cable Communications Management, LLC
         *
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

        var _Account = {
          id: function id(params) {
            return MockProps.mock('Account', 'id', params, undefined, 0, '123');
          },
          uid: function uid(params) {
            return MockProps.mock('Account', 'uid', params, undefined, 0, 'ee6723b8-7ab3-462c-8d93-dbf61227998e');
          }
        };

        /*
         * Copyright 2021 Comcast Cable Communications Management, LLC
         *
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

        var _Advertising = {
          config: {
            adServerUrl: 'https://demo.v.fwmrm.net/ad/p/1',
            adServerUrlTemplate: 'https://demo.v.fwmrm.net/ad/p/1?flag=+sltp+exvt+slcb+emcr+amcb+aeti&prof=12345:caf_allinone_profile &nw=12345&mode=live&vdur=123&caid=a110523018&asnw=372464&csid=gmott_ios_tablet_watch_live_ESPNU&ssnw=372464&vip=198.205.92.1&resp=vmap1&metr=1031&pvrn=12345&vprn=12345&vcid=1X0Ce7L3xRWlTeNhc7br8Q%3D%3D',
            adNetworkId: '519178',
            adProfileId: '12345:caf_allinone_profile',
            adSiteSectionId: 'caf_allinone_profile_section',
            adOptOut: true,
            privacyData: 'ew0KICAicGR0IjogImdkcDp2MSIsDQogICJ1c19wcml2YWN5IjogIjEtTi0iLA0KICAibG10IjogIjEiIA0KfQ0K',
            ifaValue: '01234567-89AB-CDEF-GH01-23456789ABCD',
            ifa: 'ewogICJ2YWx1ZSI6ICIwMTIzNDU2Ny04OUFCLUNERUYtR0gwMS0yMzQ1Njc4OUFCQ0QiLAogICJpZmFfdHlwZSI6ICJzc3BpZCIsCiAgImxtdCI6ICIwIgp9Cg==',
            appName: 'FutureToday',
            appBundleId: 'FutureToday.comcast',
            distributorAppId: '1001',
            deviceAdAttributes: 'ewogICJib0F0dHJpYnV0ZXNGb3JSZXZTaGFyZUlkIjogIjEyMzQiCn0=',
            coppa: 0,
            authenticationEntity: '60f72475281cfba3852413bd53e957f6'
          },
          policy: function policy(params) {
            return MockProps.mock('Advertising', 'policy', params, undefined, 0, {
              skipRestriction: 'adsUnwatched',
              limitAdTracking: false
            });
          },
          advertisingId: {
            ifa: '01234567-89AB-CDEF-GH01-23456789ABCD',
            ifa_type: 'sspid',
            lmt: '0'
          },
          deviceAttributes: {},
          appBundleId: 'app.operator'
        };

        /*
         * Copyright 2021 Comcast Cable Communications Management, LLC
         *
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

        var _Authentication = {
          token: {
            value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
            expires: '2022-04-23T18:25:43.511Z',
            type: 'platform'
          },
          device: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
          session: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
          root: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
        };

        /*
         * Copyright 2021 Comcast Cable Communications Management, LLC
         *
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

        var _Capabilities = {
          supported: true,
          available: true,
          permitted: true,
          granted: true,
          info: [{
            capability: 'xrn:firebolt:capability:device:model',
            supported: true,
            available: true,
            use: {
              permitted: true,
              granted: true
            },
            manage: {
              permitted: true,
              granted: true
            },
            provide: {
              permitted: true,
              granted: true
            }
          }, {
            capability: 'xrn:firebolt:capability:input:keyboard',
            supported: true,
            available: true,
            use: {
              permitted: true,
              granted: true
            },
            manage: {
              permitted: true,
              granted: true
            },
            provide: {
              permitted: true,
              granted: true
            }
          }, {
            capability: 'xrn:firebolt:capability:protocol:bluetoothle',
            supported: false,
            available: false,
            use: {
              permitted: true,
              granted: true
            },
            manage: {
              permitted: true,
              granted: true
            },
            provide: {
              permitted: true,
              granted: true
            },
            details: ['unsupported']
          }, {
            capability: 'xrn:firebolt:capability:token:device',
            supported: true,
            available: true,
            use: {
              permitted: true,
              granted: true
            },
            manage: {
              permitted: true,
              granted: true
            },
            provide: {
              permitted: true,
              granted: true
            }
          }, {
            capability: 'xrn:firebolt:capability:token:platform',
            supported: true,
            available: false,
            use: {
              permitted: true,
              granted: true
            },
            manage: {
              permitted: true,
              granted: true
            },
            provide: {
              permitted: true,
              granted: true
            },
            details: ['unavailable']
          }, {
            capability: 'xrn:firebolt:capability:protocol:moca',
            supported: true,
            available: false,
            use: {
              permitted: true,
              granted: true
            },
            manage: {
              permitted: true,
              granted: true
            },
            provide: {
              permitted: true,
              granted: true
            },
            details: ['disabled', 'unavailable']
          }, {
            capability: 'xrn:firebolt:capability:wifi:scan',
            supported: true,
            available: true,
            use: {
              permitted: true,
              granted: true
            },
            manage: {
              permitted: true,
              granted: true
            },
            provide: {
              permitted: true,
              granted: true
            },
            details: ['unpermitted']
          }, {
            capability: 'xrn:firebolt:capability:localization:postal-code',
            supported: true,
            available: true,
            use: {
              permitted: true,
              granted: null
            },
            manage: {
              permitted: true,
              granted: true
            },
            provide: {
              permitted: true,
              granted: true
            },
            details: ['ungranted']
          }, {
            capability: 'xrn:firebolt:capability:localization:postal-code',
            supported: true,
            available: true,
            use: {
              permitted: true,
              granted: true
            },
            manage: {
              permitted: true,
              granted: true
            },
            provide: {
              permitted: true,
              granted: true
            },
            details: ['ungranted']
          }, {
            capability: 'xrn:firebolt:capability:localization:locality',
            supported: true,
            available: true,
            use: {
              permitted: true,
              granted: true
            },
            manage: {
              permitted: true,
              granted: true
            },
            provide: {
              permitted: true,
              granted: true
            },
            details: ['grantDenied', 'ungranted']
          }],
          request: [{
            capability: 'xrn:firebolt:capability:commerce:purchase',
            supported: true,
            available: true,
            use: {
              permitted: true,
              granted: true
            },
            manage: {
              permitted: true,
              granted: true
            },
            provide: {
              permitted: true,
              granted: true
            }
          }]
        };

        /*
         * Copyright 2021 Comcast Cable Communications Management, LLC
         *
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

        var _Device = {
          id: function id(params) {
            return MockProps.mock('Device', 'id', params, undefined, 0, '123');
          },
          distributor: function distributor(params) {
            return MockProps.mock('Device', 'distributor', params, undefined, 0, 'Company');
          },
          platform: function platform(params) {
            return MockProps.mock('Device', 'platform', params, undefined, 0, 'WPE');
          },
          uid: function uid(params) {
            return MockProps.mock('Device', 'uid', params, undefined, 0, 'ee6723b8-7ab3-462c-8d93-dbf61227998e');
          },
          type: function type(params) {
            return MockProps.mock('Device', 'type', params, undefined, 0, 'STB');
          },
          model: function model(params) {
            return MockProps.mock('Device', 'model', params, undefined, 0, 'xi6');
          },
          sku: function sku(params) {
            return MockProps.mock('Device', 'sku', params, undefined, 0, 'AX061AEI');
          },
          make: function make(params) {
            return MockProps.mock('Device', 'make', params, undefined, 0, 'Arris');
          },
          version: function version(params) {
            return MockProps.mock('Device', 'version', params, undefined, 0, {
              sdk: {
                major: 0,
                minor: 8,
                patch: 0,
                readable: 'Firebolt JS SDK v0.8.0'
              },
              api: {
                major: 0,
                minor: 8,
                patch: 0,
                readable: 'Firebolt API v0.8.0'
              },
              firmware: {
                major: 1,
                minor: 2,
                patch: 3,
                readable: 'Device Firmware v1.2.3'
              },
              os: {
                major: 0,
                minor: 1,
                patch: 0,
                readable: 'Firebolt OS v0.1.0'
              },
              debug: 'Non-parsable build info for error logging only.'
            });
          },
          hdcp: function hdcp(params) {
            return MockProps.mock('Device', 'hdcp', params, undefined, 0, {
              'hdcp1.4': true,
              'hdcp2.2': true
            });
          },
          hdr: function hdr(params) {
            return MockProps.mock('Device', 'hdr', params, undefined, 0, {
              hdr10: true,
              hdr10Plus: true,
              dolbyVision: true,
              hlg: true
            });
          },
          audio: function audio(params) {
            return MockProps.mock('Device', 'audio', params, undefined, 0, {
              stereo: true,
              'dolbyDigital5.1': true,
              'dolbyDigital5.1+': true,
              dolbyAtmos: true
            });
          },
          screenResolution: function screenResolution(params) {
            return MockProps.mock('Device', 'screenResolution', params, undefined, 0, [1920, 1080]);
          },
          videoResolution: function videoResolution(params) {
            return MockProps.mock('Device', 'videoResolution', params, undefined, 0, [1920, 1080]);
          },
          name: function name(params) {
            return MockProps.mock('Device', 'name', params, undefined, 0, 'Living Room');
          },
          network: function network(params) {
            return MockProps.mock('Device', 'network', params, undefined, 0, {
              state: 'connected',
              type: 'wifi'
            });
          }
        };

        /*
         * Copyright 2021 Comcast Cable Communications Management, LLC
         *
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

        var _Discovery = {
          policy: function policy(params) {
            return MockProps.mock('Discovery', 'policy', params, undefined, 0, {
              enableRecommendations: true,
              shareWatchHistory: true,
              rememberWatchedPrograms: true
            });
          },
          entityInfo: true,
          purchasedContent: true,
          watched: true,
          watchNext: true,
          entitlements: true,
          contentAccess: null,
          clearContentAccess: null,
          launch: true,
          signIn: true,
          signOut: true,
          userInterest: null,
          userInterestResponse: null,
          userInterestError: null
        };

        /*
         * Copyright 2021 Comcast Cable Communications Management, LLC
         *
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

        var _Keyboard = {
          email: 'user@domain.com',
          password: 'abc123',
          standard: 'Living Room'
        };

        /*
         * Copyright 2021 Comcast Cable Communications Management, LLC
         *
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

        var inactive = {
          state: 'inactive',
          previous: 'initializing'
        };
        var foreground = {
          state: 'foreground',
          previous: 'inactive'
        };
        var unloading = {
          state: 'unloading',
          previous: 'inactive'
        };
        var emit$1 = function emit$1(value) {
          mock$2.event('Lifecycle', value.state, value);
        };
        var win$2 = typeof window !== 'undefined' ? window : {};
        var automation = win$2.__firebolt ? !!win$2.__firebolt.automation : false;
        var _Lifecycle = {
          ready: function ready() {
            inactive.previous = 'initializing';
            setTimeout(function () {
              return emit$1(inactive);
            }, automation ? 1 : 500);
            foreground.previous = 'inactive';
            setTimeout(function () {
              return emit$1(foreground);
            }, automation ? 2 : 1000);
          },
          close: function close(params) {
            var reason = params.reason;
            if (reason === 'remoteButton') {
              inactive.previous = 'foreground';
              setTimeout(function () {
                return emit$1(inactive);
              }, automation ? 1 : 500);
            } else if (['userExit', 'error'].includes(reason)) {
              inactive.previous = 'foreground';
              unloading.previous = 'inactive';
              setTimeout(function () {
                return emit$1(inactive);
              }, automation ? 1 : 500);
              setTimeout(function () {
                return emit$1(unloading);
              }, automation ? 2 : 1000);
            } else {
              throw 'Invalid close reason';
            }
          },
          finished: function finished() {
            if (win$2.location) win$2.location.href = 'about:blank';
          }
        };

        /*
         * Copyright 2021 Comcast Cable Communications Management, LLC
         *
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

        var _Localization = {
          locality: function locality(params) {
            return MockProps.mock('Localization', 'locality', params, undefined, 0, 'Philadelphia');
          },
          postalCode: function postalCode(params) {
            return MockProps.mock('Localization', 'postalCode', params, undefined, 0, '19103');
          },
          countryCode: function countryCode(params) {
            return MockProps.mock('Localization', 'countryCode', params, undefined, 0, 'US');
          },
          language: function language(params) {
            return MockProps.mock('Localization', 'language', params, undefined, 0, 'en');
          },
          preferredAudioLanguages: function preferredAudioLanguages(params) {
            return MockProps.mock('Localization', 'preferredAudioLanguages', params, undefined, 0, ['spa', 'eng']);
          },
          locale: function locale(params) {
            return MockProps.mock('Localization', 'locale', params, undefined, 0, 'en-US');
          },
          latlon: [39.9549, 75.1699],
          additionalInfo: {}
        };

        /*
         * Copyright 2021 Comcast Cable Communications Management, LLC
         *
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

        var _Metrics = {
          ready: true,
          signIn: true,
          signOut: true,
          startContent: true,
          stopContent: true,
          page: true,
          action: true,
          error: true,
          mediaLoadStart: true,
          mediaPlay: true,
          mediaPlaying: true,
          mediaPause: true,
          mediaWaiting: true,
          mediaProgress: true,
          mediaSeeking: true,
          mediaSeeked: true,
          mediaRateChange: true,
          mediaRenditionChange: true,
          mediaEnded: true,
          appInfo: null
        };

        /*
         * Copyright 2021 Comcast Cable Communications Management, LLC
         *
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

        var _Parameters = {
          initialization: {
            lmt: 0,
            us_privacy: '1-Y-',
            discovery: {
              navigateTo: {
                action: 'entity',
                data: {
                  entityId: 'abc',
                  entityType: 'program',
                  programType: 'movie'
                },
                context: {
                  source: 'voice'
                }
              }
            }
          }
        };

        /*
         * Copyright 2021 Comcast Cable Communications Management, LLC
         *
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

        var _Profile = {
          approveContentRating: false,
          approvePurchase: false,
          flags: {
            userExperience: '1000'
          }
        };

        /*
         * Copyright 2021 Comcast Cable Communications Management, LLC
         *
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

        var _SecondScreen = {
          protocols: {
            'dial1.7': true
          },
          device: 'device-id',
          friendlyName: function friendlyName(params) {
            return MockProps.mock('SecondScreen', 'friendlyName', params, undefined, 0, 'Living Room');
          }
        };

        /*
         * Copyright 2021 Comcast Cable Communications Management, LLC
         *
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

        var _SecureStorage = {
          get: 'VGhpcyBub3QgYSByZWFsIHRva2VuLgo=',
          set: null,
          remove: null,
          clear: null
        };

        /*
         * Copyright 2021 Comcast Cable Communications Management, LLC
         *
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

        var _Platform = {
          localization: _Localization,
          device: _Device,
          accessibility: _Accessibility
        };

        /*
         * Copyright 2021 Comcast Cable Communications Management, LLC
         *
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
        var Queue = /*#__PURE__*/function () {
          function Queue() {
            _classCallCheck(this, Queue);
            this._callback = null;
            this._queue = [];
          }
          return _createClass(Queue, [{
            key: "send",
            value: function send(json) {
              this._queue.push(json);
            }
          }, {
            key: "receive",
            value: function receive(_callback) {
              this._callback = _callback;
            }
          }, {
            key: "flush",
            value: function flush(transport) {
              transport.receive(this._callback);
              this._queue.forEach(function (item) {
                return transport.send(item);
              });
            }
          }]);
        }();
        /*
         * Copyright 2021 Comcast Cable Communications Management, LLC
         *
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
        var settings = {};
        var subscribers = {};
        var initSettings = function initSettings(appSettings, platformSettings) {
          settings['app'] = appSettings;
          settings['platform'] = _objectSpread({
            logLevel: 'WARN'
          }, platformSettings);
          settings['user'] = {};
        };
        var publish = function publish(key, value) {
          subscribers[key] && subscribers[key].forEach(function (subscriber) {
            return subscriber(value);
          });
        };
        var dotGrab = function dotGrab() {
          var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          var key = arguments.length > 1 ? arguments[1] : undefined;
          var keys = key.split('.');
          for (var i = 0; i < keys.length; i++) {
            obj = obj[keys[i]] = obj[keys[i]] !== undefined ? obj[keys[i]] : {};
          }
          return _typeof(obj) === 'object' ? Object.keys(obj).length ? obj : undefined : obj;
        };
        var Settings = {
          get: function get(type, key) {
            var fallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
            var val = dotGrab(settings[type], key);
            return val !== undefined ? val : fallback;
          },
          has: function has(type, key) {
            return !!this.get(type, key);
          },
          set: function set(key, value) {
            settings['user'][key] = value;
            publish(key, value);
          },
          subscribe: function subscribe(key, callback) {
            subscribers[key] = subscribers[key] || [];
            subscribers[key].push(callback);
          },
          unsubscribe: function unsubscribe(key, callback) {
            if (callback) {
              var index = subscribers[key] && subscribers[key].findIndex(function (cb) {
                return cb === callback;
              });
              index > -1 && subscribers[key].splice(index, 1);
            } else {
              if (key in subscribers) {
                subscribers[key] = [];
              }
            }
          },
          clearSubscribers: function clearSubscribers() {
            var _iterator = _createForOfIteratorHelper(Object.getOwnPropertyNames(subscribers)),
              _step;
            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var key = _step.value;
                delete subscribers[key];
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }
          },
          setLogLevel: function setLogLevel(logLevel) {
            settings.platform.logLevel = logLevel;
          },
          getLogLevel: function getLogLevel() {
            return settings.platform.logLevel;
          }
        };

        /*
         * Copyright 2021 Comcast Cable Communications Management, LLC
         *
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

        var win$1 = typeof window !== 'undefined' ? window : {};
        var LegacyTransport = /*#__PURE__*/function () {
          function LegacyTransport(bridge) {
            _classCallCheck(this, LegacyTransport);
            this.bridge = bridge;
          }
          return _createClass(LegacyTransport, [{
            key: "send",
            value: function send(msg) {
              this.bridge.JSMessageChanged(msg, function () {});
            }
          }, {
            key: "receive",
            value: function receive(callback) {
              win$1.$badger = win$1.$badger || {};
              /** Hold on to real $badger callback and event methods so they can be called for non-jsonrpc messages */
              var badgerCallback = win$1.$badger.callback ? win$1.$badger.callback.bind(win$1.$badger) : null;
              var badgerEvent = win$1.$badger.event ? win$1.$badger.event.bind(win$1.$badger) : null;
              win$1.$badger.callback = function (pid, success, json) {
                if (json.jsonrpc) {
                  callback(JSON.stringify(json));
                } else if (badgerCallback) {
                  badgerCallback(pid, success, json);
                }
              };
              win$1.$badger.event = function (handlerId, json) {
                if (json.jsonrpc) {
                  callback(JSON.stringify(json));
                } else if (badgerEvent) {
                  badgerEvent(handlerId, json);
                }
              };
            }
          }], [{
            key: "isLegacy",
            value: function isLegacy(transport) {
              return LegacyTransport.isXREProxy(transport) || transport.send === undefined && transport.JSMessageChanged;
            }
          }, {
            key: "isXREProxy",
            value: function isXREProxy(transport) {
              /** Set top boxes running XRE has a "Proxy" transport
               * native object that intercepts ALL method calls, so we
               * cannot test for transport.send existence because it will return true
               * even though it actually is not supported. Check if some obscure method
               * name like "proxyObjectTest" is defined. If it is then we know we are using a
               * Proxy object and thus is legacy transport.
               */
              return transport.proxyObjectTest !== undefined;
            }
          }]);
        }();
        var MAX_QUEUED_MESSAGES = 100;
        var WebsocketTransport = /*#__PURE__*/function () {
          function WebsocketTransport(endpoint) {
            _classCallCheck(this, WebsocketTransport);
            this._endpoint = endpoint;
            this._ws = null;
            this._connected = false;
            this._queue = [];
            this._callbacks = [];
          }
          return _createClass(WebsocketTransport, [{
            key: "send",
            value: function send(msg) {
              this._connect();
              if (this._connected) {
                this._ws.send(msg);
              } else {
                if (this._queue.length < MAX_QUEUED_MESSAGES) {
                  this._queue.push(msg);
                }
              }
            }
          }, {
            key: "receive",
            value: function receive(callback) {
              if (!callback) return;
              this._connect();
              this._callbacks.push(callback);
            }
          }, {
            key: "_notifyCallbacks",
            value: function _notifyCallbacks(message) {
              var _this = this;
              var _loop2 = function _loop2(i) {
                setTimeout(function () {
                  return _this._callbacks[i](message);
                }, 1);
              };
              for (var i = 0; i < this._callbacks.length; i++) {
                _loop2(i);
              }
            }
          }, {
            key: "_connect",
            value: function _connect() {
              var _this2 = this;
              if (this._ws) return;
              this._ws = new WebSocket(this._endpoint, ['jsonrpc']);
              this._ws.addEventListener('message', function (message) {
                _this2._notifyCallbacks(message.data);
              });
              this._ws.addEventListener('error', function (message) {});
              this._ws.addEventListener('close', function (message) {
                _this2._ws = null;
                _this2._connected = false;
              });
              this._ws.addEventListener('open', function (message) {
                _this2._connected = true;
                for (var i = 0; i < _this2._queue.length; i++) {
                  _this2._ws.send(_this2._queue[i]);
                }
                _this2._queue = [];
              });
            }
          }]);
        }();
        /*
        methods = Map<string, {
            x-this-param: 'accessory',
            x-additional-params: ['timeout'],
            x-method: 'Accessory.pair'
        }>
        */
        function transform(result, transforms) {
          if (!transforms || !transforms.methods) {
            return result;
          }
          var methods = transforms.methods;
          var transformed = JSON.parse(JSON.stringify(result));
          Object.keys(methods).forEach(function (key) {
            var method_info = methods[key];
            var rpc_method = method_info['x-method'];
            var _rpc_method$split = rpc_method.split('.'),
              _rpc_method$split2 = _slicedToArray(_rpc_method$split, 2),
              module = _rpc_method$split2[0],
              method = _rpc_method$split2[1];
            var params = {};
            params[method_info['x-this-param']] = transformed;
            transformed[key] = function () {
              // copy the args into the correct RPC param names
              for (var i = 0; i < arguments.length; i++) {
                params[method_info['x-additional-params'][i]] = i < 0 || arguments.length <= i ? undefined : arguments[i];
              }
              return Transport.send(module.toLowerCase(), method, params);
            };
          });
          return transformed;
        }
        var Results = {
          transform: transform
        };

        /*
         * Copyright 2021 Comcast Cable Communications Management, LLC
         *
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

        var LEGACY_TRANSPORT_SERVICE_NAME = 'com.comcast.BridgeObject_1';
        var moduleInstance = null;
        var isEventSuccess = function isEventSuccess(x) {
          return x && typeof x.event === 'string' && typeof x.listening === 'boolean';
        };
        var win = typeof window !== 'undefined' ? window : {};
        var Transport = /*#__PURE__*/function () {
          function Transport() {
            _classCallCheck(this, Transport);
            this._promises = [];
            this._transport = null;
            this._id = 1;
            this._eventEmitters = [];
            this._eventIds = [];
            this._queue = new Queue();
            this._deprecated = {};
            this.isMock = false;
          }
          return _createClass(Transport, [{
            key: "_endpoint",
            value: function _endpoint() {
              if (win.__firebolt && win.__firebolt.endpoint) {
                return win.__firebolt.endpoint;
              }
              return null;
            }
          }, {
            key: "constructTransportLayer",
            value: function constructTransportLayer() {
              var _this3 = this;
              var transport;
              var endpoint = this._endpoint();
              if (endpoint && (endpoint.startsWith('ws://') || endpoint.startsWith('wss://'))) {
                transport = new WebsocketTransport(endpoint);
                transport.receive(this.receiveHandler.bind(this));
              } else if (typeof win.ServiceManager !== 'undefined' && win.ServiceManager && win.ServiceManager.version) {
                // Wire up the queue
                transport = this._queue;
                // get the default bridge service, and flush the queue
                win.ServiceManager.getServiceForJavaScript(LEGACY_TRANSPORT_SERVICE_NAME, function (service) {
                  if (LegacyTransport.isLegacy(service)) {
                    transport = new LegacyTransport(service);
                  } else {
                    transport = service;
                  }
                  _this3.setTransportLayer(transport);
                });
              } else {
                this.isMock = true;
                transport = mock$2;
                transport.receive(this.receiveHandler.bind(this));
              }
              return transport;
            }
          }, {
            key: "setTransportLayer",
            value: function setTransportLayer(tl) {
              this._transport = tl;
              this._queue.flush(tl);
            }
          }, {
            key: "_send",
            value: function _send(module, method, params, transforms) {
              if (Array.isArray(module) && !method && !params) {
                return this._batch(module);
              } else {
                return this._sendAndGetId(module, method, params, transforms).promise;
              }
            }
          }, {
            key: "_sendAndGetId",
            value: function _sendAndGetId(module, method, params, transforms) {
              var _this$_processRequest = this._processRequest(module, method, params, transforms),
                promise = _this$_processRequest.promise,
                json = _this$_processRequest.json,
                id = _this$_processRequest.id;
              var msg = JSON.stringify(json);
              if (Settings.getLogLevel() === 'DEBUG') {
                console.debug('Sending message to transport: ' + msg);
              }
              this._transport.send(msg);
              return {
                id: id,
                promise: promise
              };
            }
          }, {
            key: "_batch",
            value: function _batch(requests) {
              var _this4 = this;
              var results = [];
              var json = [];
              requests.forEach(function (_ref5) {
                var module = _ref5.module,
                  method = _ref5.method,
                  params = _ref5.params,
                  transforms = _ref5.transforms;
                var result = _this4._processRequest(module, method, params, transforms);
                results.push({
                  promise: result.promise,
                  id: result.id
                });
                json.push(result.json);
              });
              var msg = JSON.stringify(json);
              if (Settings.getLogLevel() === 'DEBUG') {
                console.debug('Sending message to transport: ' + msg);
              }
              this._transport.send(msg);
              return results;
            }
          }, {
            key: "_processRequest",
            value: function _processRequest(module, method, params, transforms) {
              var p = this._addPromiseToQueue(module, method, params, transforms);
              var json = this._createRequestJSON(module, method, params);
              var result = {
                promise: p,
                json: json,
                id: this._id
              };
              this._id++;
              return result;
            }
          }, {
            key: "_createRequestJSON",
            value: function _createRequestJSON(module, method, params) {
              return {
                jsonrpc: '2.0',
                method: module.toLowerCase() + '.' + method,
                params: params,
                id: this._id
              };
            }
          }, {
            key: "_addPromiseToQueue",
            value: function _addPromiseToQueue(module, method, params, transforms) {
              var _this5 = this;
              return new Promise(function (resolve, reject) {
                _this5._promises[_this5._id] = {};
                _this5._promises[_this5._id].promise = _this5;
                _this5._promises[_this5._id].resolve = resolve;
                _this5._promises[_this5._id].reject = reject;
                _this5._promises[_this5._id].transforms = transforms;
                var deprecated = _this5._deprecated[module.toLowerCase() + '.' + method.toLowerCase()];
                if (deprecated) {
                  console.warn("WARNING: ".concat(module, ".").concat(method, "() is deprecated. ") + deprecated.alternative);
                }

                // store the ID of the first listen for each event
                // TODO: what about wild cards?
                if (method.match(/^on[A-Z]/)) {
                  if (params.listen) {
                    _this5._eventIds.push(_this5._id);
                  } else {
                    _this5._eventIds = _this5._eventIds.filter(function (id) {
                      return id !== _this5._id;
                    });
                  }
                }
              });
            }

            /**
             * If we have a global transport, use that. Otherwise, use the module-scoped transport instance.
             * @returns {Transport}
             */
          }, {
            key: "receiveHandler",
            value: function receiveHandler(message) {
              if (Settings.getLogLevel() === 'DEBUG') {
                console.debug('Received message from transport: ' + message);
              }
              var json = JSON.parse(message);
              var p = this._promises[json.id];
              if (p) {
                if (json.error) p.reject(json.error);else {
                  // Do any module-specific transforms on the result
                  var result = json.result;
                  if (p.transforms) {
                    if (Array.isArray(json.result)) {
                      result = result.map(function (x) {
                        return Results.transform(x, p.transforms);
                      });
                    } else {
                      result = Results.transform(result, p.transforms);
                    }
                  }
                  p.resolve(result);
                }
                delete this._promises[json.id];
              }

              // event responses need to be emitted, even after the listen call is resolved
              if (this._eventIds.includes(json.id) && !isEventSuccess(json.result)) {
                this._eventEmitters.forEach(function (emit) {
                  emit(json.id, json.result);
                });
              }
            }
          }, {
            key: "init",
            value: function init() {
              initSettings({}, {
                log: true
              });
              this._queue.receive(this.receiveHandler.bind(this));
              if (win.__firebolt) {
                if (win.__firebolt.mockTransportLayer === true) {
                  this.isMock = true;
                  this.setTransportLayer(mock$2);
                } else if (win.__firebolt.getTransportLayer) {
                  this.setTransportLayer(win.__firebolt.getTransportLayer());
                }
              }
              if (this._transport == null) {
                this._transport = this.constructTransportLayer();
              }
            }
          }], [{
            key: "addEventEmitter",
            value: function addEventEmitter(emitter) {
              Transport.get()._eventEmitters.push(emitter);
            }
          }, {
            key: "registerDeprecatedMethod",
            value: function registerDeprecatedMethod(module, method, alternative) {
              Transport.get()._deprecated[module.toLowerCase() + '.' + method.toLowerCase()] = {
                alternative: alternative || ''
              };
            }
          }, {
            key: "send",
            value: function send(module, method, params, transforms) {
              /** Transport singleton across all SDKs to keep single id map */
              return Transport.get()._send(module, method, params, transforms);
            }
          }, {
            key: "listen",
            value: function listen(module, method, params, transforms) {
              return Transport.get()._sendAndGetId(module, method, params, transforms);
            }
          }, {
            key: "get",
            value: function get() {
              /** Set up singleton and initialize it */
              win.__firebolt = win.__firebolt || {};
              if (win.__firebolt.transport == null && moduleInstance == null) {
                var transport = new Transport();
                transport.init();
                if (transport.isMock) {
                  /** We should use the mock transport built with the SDK, not a global */
                  moduleInstance = transport;
                } else {
                  win.__firebolt = win.__firebolt || {};
                  win.__firebolt.transport = transport;
                }
                win.__firebolt.setTransportLayer = transport.setTransportLayer.bind(transport);
              }
              return win.__firebolt.transport ? win.__firebolt.transport : moduleInstance;
            }
          }]);
        }();
        win.__firebolt = win.__firebolt || {};
        win.__firebolt.setTransportLayer = function (transport) {
          Transport.get().setTransportLayer(transport);
        };

        /*
         * Copyright 2021 Comcast Cable Communications Management, LLC
         *
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

        var listenerId = 0;

        // holds two maps of ${module}.${event} => listenerId, e.g. callback method id
        // note that one callback can listen to multiple events, e.g. 'discovery.*'
        // internal is only available via a private export that we use to ensure our modules know about
        // events before the apps using the SDK (otherwise state errors can happen)
        var listeners = {
          internal: {},
          external: {},
          // Several convenience functions below for checking both internal & external lists w/ one operation

          // gets a merge list of ids for a single event key
          get: function get(key) {
            return Object.assign(Object.assign({}, listeners.internal[key]), listeners.external[key]);
          },
          // adds a callback/id to a key on the external list only
          set: function set(key, id, value) {
            listeners.external[key] = listeners.external[key] || {};
            listeners.external[key][id] = value;
          },
          // adds a callback/id to a key on the internal list only
          setInternal: function setInternal(key, id, value) {
            listeners.internal[key] = listeners.internal[key] || {};
            listeners.internal[key][id] = value;
          },
          // finds the key for an id in either list (it can only be in one)
          find: function find(id) {
            var key;
            [listeners.internal, listeners.external].find(function (group) {
              key = Object.keys(group).find(function (key) {
                return group[key][id];
              });
              if (key) return true;
            });
            return key;
          },
          // removes an id from either list
          remove: function remove(id) {
            [listeners.internal, listeners.external].forEach(function (group) {
              Object.keys(group).forEach(function (key) {
                if (group[key] && group[key][id]) {
                  delete group[key][id];
                  if (Object.values(group[key]).length === 0) {
                    delete group[key];
                  }
                }
              });
            });
          },
          // removes a key from both lists if _internal is true, otherwise only the external list
          removeKey: function removeKey(key) {
            var _internal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            _internal && listeners.internal[key] && delete listeners.internal[key];
            listeners.external[key] && delete listeners.external[key];
          },
          // gives a list of all keys
          keys: function keys() {
            return Array.from(new Set(Object.keys(listeners.internal).concat(Object.keys(listeners.external))));
          },
          // counts how many listeners are in a key across both lists
          count: function count(key) {
            return Object.values(listeners.get(key)).length;
          }
        };

        // holds a map of RPC Ids => Context Key, e.g. the RPC id of an onEvent call mapped to the corresponding context parameters key for that RPC call
        var keys = {};

        // holds a map of ${module}.${event} => Transport.send calls (only called once per event)
        // note that the keys here MUST NOT contain wild cards
        var oncers = [];
        var validEvents = {};
        var validContext = {};
        var transportInitialized = false;
        var emit = function emit(id, value) {
          callCallbacks(listeners.internal[keys[id]], [value]);
          callCallbacks(listeners.external[keys[id]], [value]);
        };
        var registerEvents = function registerEvents(module, events) {
          validEvents[module.toLowerCase()] = events.concat();
        };
        var registerEventContext = function registerEventContext(module, event, context) {
          validContext[module.toLowerCase()] = validContext[module.toLowerCase()] || {};
          validContext[module.toLowerCase()][event] = context.concat();
        };
        var callCallbacks = function callCallbacks(cbs, args) {
          cbs && Object.keys(cbs).forEach(function (listenerId) {
            var callback = cbs[listenerId];
            if (oncers.indexOf(parseInt(listenerId)) >= 0) {
              oncers.splice(oncers.indexOf(parseInt(listenerId)), 1);
              delete cbs[listenerId];
            }
            callback.apply(null, args);
          });
        };
        var doListen = function doListen(module, event, callback, context, once) {
          var internal = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
          init();
          if (typeof callback !== 'function') {
            return Promise.reject('No valid callback function provided.');
          } else {
            if (module === '*') {
              return Promise.reject('No valid module name provided');
            }
            var wildcard = event === '*';
            var events = wildcard ? validEvents[module] : [event]; // explodes wildcards into an array
            var promises = [];
            var hasContext = Object.values(context).length > 0;
            var contextKey = Object.keys(context).sort().map(function (key) {
              return key + '=' + JSON.stringify(context[key]);
            }).join('&');
            listenerId++;
            if (once) {
              oncers.push(listenerId);
            }
            events.forEach(function (event) {
              var key = module + '.' + event + (hasContext ? ".".concat(contextKey) : '');
              if (Object.values(listeners.get(key)).length === 0) {
                var args = Object.assign({
                  listen: true
                }, context);
                var _Transport$listen = Transport.listen(module, 'on' + event[0].toUpperCase() + event.substring(1), args),
                  _id = _Transport$listen.id,
                  promise = _Transport$listen.promise;
                keys[_id] = key;
                promises.push(promise);
              }
              var setter = internal ? listeners.setInternal : listeners.set;
              if (wildcard) {
                setter(key, '' + listenerId, function (value) {
                  return callback(event, value);
                });
              } else {
                setter(key, '' + listenerId, callback);
              }
            });
            var resolve, reject;
            var p = new Promise(function (res, rej) {
              resolve = res;
              reject = rej;
            });

            // Iterate and resolve/reject through the list of promises sequentially
            var templistenerId = listenerId;
            if (promises.length) {
              promises.reduce(function (prevPromise, currentPromise) {
                return prevPromise.then(function () {
                  return currentPromise;
                }).then(function (responses) {
                  resolve(templistenerId);
                }).catch(function (error) {
                  if (event === '*') {
                    resolve(templistenerId);
                  } else {
                    // Remove the failed listener
                    doClear(templistenerId, event, context);
                    reject(error);
                  }
                });
              }, Promise.resolve());
            } else {
              resolve(listenerId);
            }
            return p;
          }
        };
        var getListenArgs = function getListenArgs() {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          var callback = args.pop();
          var _getClearArgs = getClearArgs.apply(void 0, args),
            _getClearArgs2 = _slicedToArray(_getClearArgs, 3),
            module = _getClearArgs2[0],
            event = _getClearArgs2[1],
            context = _getClearArgs2[2];
          return [module, event, callback, context];
        };
        var getClearArgs = function getClearArgs() {
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }
          var module = (args.shift() || '*').toLowerCase();
          var event = args.shift() || '*';
          var context = {};
          for (var i = 0; args.length; i++) {
            context[validContext[module][event][i]] = args.shift();
          }
          return [module, event, context];
        };
        var once$3 = function once$3() {
          var _getListenArgs = getListenArgs.apply(void 0, arguments),
            _getListenArgs2 = _slicedToArray(_getListenArgs, 4),
            module = _getListenArgs2[0],
            event = _getListenArgs2[1],
            callback = _getListenArgs2[2],
            context = _getListenArgs2[3];
          return doListen(module, event, callback, context, true);
        };
        var listen$3 = function listen$3() {
          var _getListenArgs3 = getListenArgs.apply(void 0, arguments),
            _getListenArgs4 = _slicedToArray(_getListenArgs3, 4),
            module = _getListenArgs4[0],
            event = _getListenArgs4[1],
            callback = _getListenArgs4[2],
            context = _getListenArgs4[3];
          return doListen(module, event, callback, context, false);
        };
        var clear$3 = function clear$3() {
          for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }
          if (args && args.length && typeof args[0] === 'number') {
            return doClear(args[0]);
          } else if (args && args.length && typeof args[1] === 'number') {
            return doClear(args[1]);
          } else {
            var _getClearArgs3 = getClearArgs.apply(void 0, args),
              _getClearArgs4 = _slicedToArray(_getClearArgs3, 3),
              moduleOrId = _getClearArgs4[0],
              _event = _getClearArgs4[1],
              context = _getClearArgs4[2];
            return doClear(moduleOrId, _event, context);
          }
        };

        // calls doListen with a priority flag for internal listeners to get priority
        var prioritize = function prioritize() {
          var _getListenArgs5 = getListenArgs.apply(void 0, arguments),
            _getListenArgs6 = _slicedToArray(_getListenArgs5, 4),
            module = _getListenArgs6[0],
            event = _getListenArgs6[1],
            callback = _getListenArgs6[2],
            context = _getListenArgs6[3];
          return doListen(module, event, callback, context, false, true);
        };
        var unsubscribe = function unsubscribe(key, context) {
          var _key$split$slice = key.split('.').slice(0, 2),
            _key$split$slice2 = _slicedToArray(_key$split$slice, 2),
            module = _key$split$slice2[0],
            event = _key$split$slice2[1];
          var args = Object.assign({
            listen: false
          }, context);
          Transport.send(module, 'on' + event[0].toUpperCase() + event.substr(1), args);
        };

        // TODO: clear needs to go through Transport Layer
        var doClear = function doClear() {
          var moduleOrId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
          var event = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
          var context = arguments.length > 2 ? arguments[2] : undefined;
          if (event === '*') {
            event = false;
          }
          if (typeof moduleOrId === 'number') {
            var searchId = moduleOrId.toString();
            var key = listeners.find(searchId);
            if (key) {
              listeners.remove(searchId);
              if (listeners.count(key) === 0) {
                unsubscribe(key);
              }
              return true;
            }
            return false;
          } else {
            if (!moduleOrId && !event) {
              listeners.keys().forEach(function (key) {
                listeners.removeKey(key);
                unsubscribe(key);
              });
            } else if (!event) {
              listeners.keys().forEach(function (key) {
                if (key.indexOf(moduleOrId.toLowerCase()) === 0) {
                  listeners.removeKey(key);
                  unsubscribe(key);
                }
              });
            } else {
              var hasContext = Object.values(context).length > 0;
              var contextKey = Object.keys(context).sort().map(function (key) {
                return key + '=' + JSON.stringify(context[key]);
              }).join('&');
              var _key4 = moduleOrId + '.' + event + (hasContext ? ".".concat(contextKey) : '');
              listeners.removeKey(_key4);
              unsubscribe(_key4, context);
            }
          }
        };
        var init = function init() {
          if (!transportInitialized) {
            Transport.addEventEmitter(emit);
            setMockListener(listen$3);
            transportInitialized = true;
          }
        };
        var Events = {
          listen: listen$3,
          once: once$3,
          clear: clear$3,
          broadcast: function broadcast(event, value) {
            emit(Object.entries(keys).find(function (_ref6) {
              var _ref7 = _slicedToArray(_ref6, 2),
                k = _ref7[0],
                v = _ref7[1];
              return v === 'app.' + event;
            })[0], value);
          }
        };
        function prop(moduleName, key, params) {
          var callbackOrValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
          var immutable = arguments.length > 4 ? arguments[4] : undefined;
          var readonly = arguments.length > 5 ? arguments[5] : undefined;
          var contextParameterCount = arguments.length > 6 ? arguments[6] : undefined;
          var numArgs = Object.values(params).length;
          var type = router(params, callbackOrValue, contextParameterCount);
          if (type === 'getter') {
            return Transport.send(moduleName, key, params);
          } else if (type === 'subscriber') {
            // subscriber
            if (immutable) {
              throw new Error('Cannot subscribe to an immutable property');
            }
            return Events.listen.apply(Events, [moduleName, key + 'Changed'].concat(_toConsumableArray(Object.values(params)), [callbackOrValue]));
          } else if (type === 'setter') {
            // setter
            if (immutable) {
              throw new Error('Cannot set a value to an immutable property');
            }
            if (readonly) {
              throw new Error('Cannot set a value to a readonly property');
            }
            return Transport.send(moduleName, 'set' + key[0].toUpperCase() + key.substring(1), Object.assign({
              value: callbackOrValue
            }, params));
          } else if (numArgs < contextParameterCount) {
            throw new Error('Cannot get a value without all required context parameters.');
          } else {
            throw new Error('Property accessed with unexpected number of parameters.');
          }
        }
        var Prop = {
          prop: prop
        };

        /*
         * Copyright 2021 Comcast Cable Communications Management, LLC
         *
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

        registerEvents('Accessibility', ['audioDescriptionSettingsChanged', 'closedCaptionsSettingsChanged', 'highContrastUIChanged', 'voiceGuidanceSettingsChanged']);
        Transport.registerDeprecatedMethod('Accessibility', 'closedCaptions', 'Use Accessibility.closedCaptionsSettings() instead.');
        Transport.registerDeprecatedMethod('Accessibility', 'voiceGuidance', 'Use Accessibility.voiceGuidanceSettings() instead.');

        /*
         * Copyright 2021 Comcast Cable Communications Management, LLC
         *
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

        // Methods
        function id$1() {
          var callbackOrValue = arguments[0];
          var params = {};

          // x-subscriber-type: global
          if (arguments.length === 1 && typeof arguments[0] === 'function') {
            callbackOrValue = arguments[0];
            params = {};
          }
          return Prop.prop('Account', 'id', params, callbackOrValue, true, true, 0);
        }
        function uid$1() {
          var callbackOrValue = arguments[0];
          var params = {};

          // x-subscriber-type: global
          if (arguments.length === 1 && typeof arguments[0] === 'function') {
            callbackOrValue = arguments[0];
            params = {};
          }
          return Prop.prop('Account', 'uid', params, callbackOrValue, true, true, 0);
        }
        var Account = {
          id: id$1,
          uid: uid$1
        };

        /*
         * Copyright 2021 Comcast Cable Communications Management, LLC
         *
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

        registerEvents('Advertising', ['policyChanged']);

        /*
         * Copyright 2021 Comcast Cable Communications Management, LLC
         *
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

        Transport.registerDeprecatedMethod('Authentication', 'token', 'Use Authentication module has individual methods for each token type. instead.');

        /*
         * Copyright 2021 Comcast Cable Communications Management, LLC
         *
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

        registerEvents('Capabilities', ['available', 'granted', 'revoked', 'unavailable']);

        // onAvailable is accessed via listen('available, ...)

        registerEventContext('Capabilities', 'available', ['capability']);
        // onGranted is accessed via listen('granted, ...)

        registerEventContext('Capabilities', 'granted', ['role', 'capability']);
        // onRevoked is accessed via listen('revoked, ...)

        registerEventContext('Capabilities', 'revoked', ['role', 'capability']);
        // onUnavailable is accessed via listen('unavailable, ...)

        registerEventContext('Capabilities', 'unavailable', ['capability']);

        /*
         * Copyright 2021 Comcast Cable Communications Management, LLC
         *
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

        registerEvents('Device', ['audioChanged', 'deviceNameChanged', 'hdcpChanged', 'hdrChanged', 'nameChanged', 'networkChanged', 'screenResolutionChanged', 'videoResolutionChanged']);
        Transport.registerDeprecatedMethod('Device', 'screenResolution', 'Use Use non-Firebolt APIs specific to your platform, e.g. W3C APIs instead.');
        Transport.registerDeprecatedMethod('Device', 'onDeviceNameChanged', 'Use Device.name() instead.');
        Transport.registerDeprecatedMethod('Device', 'onScreenResolutionChanged', 'Use screenResolution instead.');
        function version() {
          return new Promise(function (resolve, reject) {
            Transport.send('device', 'version').then(function (v) {
              v = v || {};
              v.sdk = v.sdk || {};
              v.sdk.major = parseInt('1');
              v.sdk.minor = parseInt('5');
              v.sdk.patch = parseInt('0');
              v.sdk.readable = 'Firebolt Core SDK 1.5.0';
              resolve(v);
            }).catch(function (error) {
              reject(error);
            });
          });
        }

        // Methods
        function audio() {
          var callbackOrValue = arguments[0];
          var params = {};

          // x-subscriber-type: global
          if (arguments.length === 1 && typeof arguments[0] === 'function') {
            callbackOrValue = arguments[0];
            params = {};
          }
          return Prop.prop('Device', 'audio', params, callbackOrValue, false, true, 0);
        }
        function clear$2() {
          for (var _len4 = arguments.length, args = new Array(_len4), _key5 = 0; _key5 < _len4; _key5++) {
            args[_key5] = arguments[_key5];
          }
          return Events.clear.apply(Events, ['Device'].concat(args));
        }
        function distributor() {
          var callbackOrValue = arguments[0];
          var params = {};

          // x-subscriber-type: global
          if (arguments.length === 1 && typeof arguments[0] === 'function') {
            callbackOrValue = arguments[0];
            params = {};
          }
          return Prop.prop('Device', 'distributor', params, callbackOrValue, true, true, 0);
        }
        function hdcp() {
          var callbackOrValue = arguments[0];
          var params = {};

          // x-subscriber-type: global
          if (arguments.length === 1 && typeof arguments[0] === 'function') {
            callbackOrValue = arguments[0];
            params = {};
          }
          return Prop.prop('Device', 'hdcp', params, callbackOrValue, false, true, 0);
        }
        function hdr() {
          var callbackOrValue = arguments[0];
          var params = {};

          // x-subscriber-type: global
          if (arguments.length === 1 && typeof arguments[0] === 'function') {
            callbackOrValue = arguments[0];
            params = {};
          }
          return Prop.prop('Device', 'hdr', params, callbackOrValue, false, true, 0);
        }
        function id() {
          var callbackOrValue = arguments[0];
          var params = {};

          // x-subscriber-type: global
          if (arguments.length === 1 && typeof arguments[0] === 'function') {
            callbackOrValue = arguments[0];
            params = {};
          }
          return Prop.prop('Device', 'id', params, callbackOrValue, true, true, 0);
        }
        function listen$2() {
          for (var _len5 = arguments.length, args = new Array(_len5), _key6 = 0; _key6 < _len5; _key6++) {
            args[_key6] = arguments[_key6];
          }
          return Events.listen.apply(Events, ['Device'].concat(args));
        }
        function make() {
          var callbackOrValue = arguments[0];
          var params = {};

          // x-subscriber-type: global
          if (arguments.length === 1 && typeof arguments[0] === 'function') {
            callbackOrValue = arguments[0];
            params = {};
          }
          return Prop.prop('Device', 'make', params, callbackOrValue, true, true, 0);
        }
        function model() {
          var callbackOrValue = arguments[0];
          var params = {};

          // x-subscriber-type: global
          if (arguments.length === 1 && typeof arguments[0] === 'function') {
            callbackOrValue = arguments[0];
            params = {};
          }
          return Prop.prop('Device', 'model', params, callbackOrValue, true, true, 0);
        }
        function name() {
          var callbackOrValue = arguments[0];
          var params = {};

          // x-subscriber-type: global
          if (arguments.length === 1 && typeof arguments[0] === 'function') {
            callbackOrValue = arguments[0];
            params = {};
          }
          return Prop.prop('Device', 'name', params, callbackOrValue, false, true, 0);
        }
        function network() {
          var callbackOrValue = arguments[0];
          var params = {};

          // x-subscriber-type: global
          if (arguments.length === 1 && typeof arguments[0] === 'function') {
            callbackOrValue = arguments[0];
            params = {};
          }
          return Prop.prop('Device', 'network', params, callbackOrValue, false, true, 0);
        }
        function once$2() {
          for (var _len6 = arguments.length, args = new Array(_len6), _key7 = 0; _key7 < _len6; _key7++) {
            args[_key7] = arguments[_key7];
          }
          return Events.once.apply(Events, ['Device'].concat(args));
        }
        function platform() {
          var callbackOrValue = arguments[0];
          var params = {};

          // x-subscriber-type: global
          if (arguments.length === 1 && typeof arguments[0] === 'function') {
            callbackOrValue = arguments[0];
            params = {};
          }
          return Prop.prop('Device', 'platform', params, callbackOrValue, true, true, 0);
        }
        function screenResolution() {
          var callbackOrValue = arguments[0];
          var params = {};

          // x-subscriber-type: global
          if (arguments.length === 1 && typeof arguments[0] === 'function') {
            callbackOrValue = arguments[0];
            params = {};
          }
          return Prop.prop('Device', 'screenResolution', params, callbackOrValue, false, true, 0);
        }
        function sku() {
          var callbackOrValue = arguments[0];
          var params = {};

          // x-subscriber-type: global
          if (arguments.length === 1 && typeof arguments[0] === 'function') {
            callbackOrValue = arguments[0];
            params = {};
          }
          return Prop.prop('Device', 'sku', params, callbackOrValue, true, true, 0);
        }
        function type() {
          var callbackOrValue = arguments[0];
          var params = {};

          // x-subscriber-type: global
          if (arguments.length === 1 && typeof arguments[0] === 'function') {
            callbackOrValue = arguments[0];
            params = {};
          }
          return Prop.prop('Device', 'type', params, callbackOrValue, true, true, 0);
        }
        function uid() {
          var callbackOrValue = arguments[0];
          var params = {};

          // x-subscriber-type: global
          if (arguments.length === 1 && typeof arguments[0] === 'function') {
            callbackOrValue = arguments[0];
            params = {};
          }
          return Prop.prop('Device', 'uid', params, callbackOrValue, true, true, 0);
        }
        function videoResolution() {
          var callbackOrValue = arguments[0];
          var params = {};

          // x-subscriber-type: global
          if (arguments.length === 1 && typeof arguments[0] === 'function') {
            callbackOrValue = arguments[0];
            params = {};
          }
          return Prop.prop('Device', 'videoResolution', params, callbackOrValue, false, true, 0);
        }
        var Device = {
          Events: {
            DEVICE_NAME_CHANGED: 'deviceNameChanged',
            NAME_CHANGED: 'nameChanged',
            HDCP_CHANGED: 'hdcpChanged',
            HDR_CHANGED: 'hdrChanged',
            AUDIO_CHANGED: 'audioChanged',
            SCREEN_RESOLUTION_CHANGED: 'screenResolutionChanged',
            VIDEO_RESOLUTION_CHANGED: 'videoResolutionChanged',
            NETWORK_CHANGED: 'networkChanged'
          },
          /**
           * The type of network that is currently active
           */
          NetworkState: {
            CONNECTED: 'connected',
            DISCONNECTED: 'disconnected'
          },
          /**
           * The type of network that is currently active
           */
          NetworkType: {
            WIFI: 'wifi',
            ETHERNET: 'ethernet',
            HYBRID: 'hybrid'
          },
          version: version,
          audio: audio,
          clear: clear$2,
          distributor: distributor,
          hdcp: hdcp,
          hdr: hdr,
          id: id,
          listen: listen$2,
          make: make,
          model: model,
          name: name,
          network: network,
          once: once$2,
          platform: platform,
          screenResolution: screenResolution,
          sku: sku,
          type: type,
          uid: uid,
          videoResolution: videoResolution
        };

        /*
         * Copyright 2021 Comcast Cable Communications Management, LLC
         *
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

        var providerInterfaces = {};
        var registerProviderInterface = function registerProviderInterface(capability, module, methods) {
          if (providerInterfaces[capability]) {
            throw "Capability ".concat(capability, " has multiple provider interfaces registered.");
          }
          methods.forEach(function (m) {
            return m.name = "".concat(module, ".").concat(m.name);
          });
          providerInterfaces[capability] = methods.concat();
        };

        /*
         * Copyright 2021 Comcast Cable Communications Management, LLC
         *
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

        function ready$1() {
          return Transport.send('metrics', 'ready', {});
        }

        /*
         * Copyright 2021 Comcast Cable Communications Management, LLC
         *
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

        registerEvents('Discovery', ['navigateTo', 'policyChanged']);
        registerProviderInterface('xrn:firebolt:capability:discovery:interest', 'Discovery', [{
          name: 'userInterest',
          focus: false,
          response: true,
          parameters: true
        }]);
        Transport.registerDeprecatedMethod('Discovery', 'entityInfo', 'Use null instead.');
        Transport.registerDeprecatedMethod('Discovery', 'purchasedContent', 'Use null instead.');
        Transport.registerDeprecatedMethod('Discovery', 'entitlements', 'Use Discovery.contentAccess() instead.');
        Transport.registerDeprecatedMethod('Discovery', 'onPullEntityInfo', 'Use null instead.');
        Transport.registerDeprecatedMethod('Discovery', 'onPullPurchasedContent', 'Use null instead.');

        /*
         * Copyright 2021 Comcast Cable Communications Management, LLC
         *
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

        registerEvents('Lifecycle', ['background', 'foreground', 'inactive', 'suspended', 'unloading']);
        var store = {
          _current: 'initializing',
          get current() {
            return this._current;
          }
        };
        function ready() {
          return _ready.apply(this, arguments);
        } // Methods
        function _ready() {
          _ready = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            var readyRes;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return prioritize('Lifecycle', function (event, value) {
                    store._current = event;
                  });
                case 2:
                  _context.next = 4;
                  return Transport.send('lifecycle', 'ready', {});
                case 4:
                  readyRes = _context.sent;
                  setTimeout(function (_) {
                    ready$1();
                  });
                  return _context.abrupt("return", readyRes);
                case 7:
                case "end":
                  return _context.stop();
              }
            }, _callee);
          }));
          return _ready.apply(this, arguments);
        }
        function clear$1() {
          for (var _len7 = arguments.length, args = new Array(_len7), _key8 = 0; _key8 < _len7; _key8++) {
            args[_key8] = arguments[_key8];
          }
          return Events.clear.apply(Events, ['Lifecycle'].concat(args));
        }
        function close(reason) {
          var transforms = null;
          return Transport.send('Lifecycle', 'close', {
            reason: reason
          }, transforms);
        }
        function listen$1() {
          for (var _len8 = arguments.length, args = new Array(_len8), _key9 = 0; _key9 < _len8; _key9++) {
            args[_key9] = arguments[_key9];
          }
          return Events.listen.apply(Events, ['Lifecycle'].concat(args));
        }
        function once$1() {
          for (var _len9 = arguments.length, args = new Array(_len9), _key10 = 0; _key10 < _len9; _key10++) {
            args[_key10] = arguments[_key10];
          }
          return Events.once.apply(Events, ['Lifecycle'].concat(args));
        }
        function state() {
          return store.current;
        }
        function finished() {
          if (store.current === 'unloading') {
            return Transport.send('lifecycle', 'finished');
          } else {
            throw 'Cannot call finished() except when in the unloading transition';
          }
        }

        // public API
        var Lifecycle = {
          Events: {
            INACTIVE: 'inactive',
            FOREGROUND: 'foreground',
            BACKGROUND: 'background',
            SUSPENDED: 'suspended',
            UNLOADING: 'unloading'
          },
          /**
           * The application close reason
           */
          CloseReason: {
            REMOTE_BUTTON: 'remoteButton',
            USER_EXIT: 'userExit',
            DONE: 'done',
            ERROR: 'error'
          },
          /**
           * The application lifecycle state
           */
          LifecycleState: {
            INITIALIZING: 'initializing',
            INACTIVE: 'inactive',
            FOREGROUND: 'foreground',
            BACKGROUND: 'background',
            UNLOADING: 'unloading',
            SUSPENDED: 'suspended'
          },
          ready: ready,
          state: state,
          finished: finished,
          clear: clear$1,
          close: close,
          listen: listen$1,
          once: once$1
        };

        /*
         * Copyright 2021 Comcast Cable Communications Management, LLC
         *
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

        registerEvents('Localization', ['countryCodeChanged', 'languageChanged', 'localeChanged', 'localityChanged', 'postalCodeChanged', 'preferredAudioLanguagesChanged']);
        Transport.registerDeprecatedMethod('Localization', 'language', 'Use Localization.locale instead.');
        Transport.registerDeprecatedMethod('Localization', 'onLanguageChanged', 'Use language instead.');

        // onCountryCodeChanged is accessed via listen('countryCodeChanged, ...)

        // onLanguageChanged is accessed via listen('languageChanged, ...)

        // onLocaleChanged is accessed via listen('localeChanged, ...)

        // onLocalityChanged is accessed via listen('localityChanged, ...)

        // onPostalCodeChanged is accessed via listen('postalCodeChanged, ...)

        // onPreferredAudioLanguagesChanged is accessed via listen('preferredAudioLanguagesChanged, ...)

        // Methods

        function additionalInfo() {
          var transforms = null;
          return Transport.send('Localization', 'additionalInfo', {}, transforms);
        }
        function clear() {
          for (var _len10 = arguments.length, args = new Array(_len10), _key11 = 0; _key11 < _len10; _key11++) {
            args[_key11] = arguments[_key11];
          }
          return Events.clear.apply(Events, ['Localization'].concat(args));
        }
        function countryCode() {
          var callbackOrValue = arguments[0];
          var params = {};

          // x-subscriber-type: global
          if (arguments.length === 1 && typeof arguments[0] === 'function') {
            callbackOrValue = arguments[0];
            params = {};
          }
          return Prop.prop('Localization', 'countryCode', params, callbackOrValue, false, true, 0);
        }
        function language() {
          var callbackOrValue = arguments[0];
          var params = {};

          // x-subscriber-type: global
          if (arguments.length === 1 && typeof arguments[0] === 'function') {
            callbackOrValue = arguments[0];
            params = {};
          }
          return Prop.prop('Localization', 'language', params, callbackOrValue, false, true, 0);
        }
        function latlon() {
          var transforms = null;
          return Transport.send('Localization', 'latlon', {}, transforms);
        }
        function listen() {
          for (var _len11 = arguments.length, args = new Array(_len11), _key12 = 0; _key12 < _len11; _key12++) {
            args[_key12] = arguments[_key12];
          }
          return Events.listen.apply(Events, ['Localization'].concat(args));
        }
        function locale() {
          var callbackOrValue = arguments[0];
          var params = {};

          // x-subscriber-type: global
          if (arguments.length === 1 && typeof arguments[0] === 'function') {
            callbackOrValue = arguments[0];
            params = {};
          }
          return Prop.prop('Localization', 'locale', params, callbackOrValue, false, true, 0);
        }
        function locality() {
          var callbackOrValue = arguments[0];
          var params = {};

          // x-subscriber-type: global
          if (arguments.length === 1 && typeof arguments[0] === 'function') {
            callbackOrValue = arguments[0];
            params = {};
          }
          return Prop.prop('Localization', 'locality', params, callbackOrValue, false, true, 0);
        }
        function once() {
          for (var _len12 = arguments.length, args = new Array(_len12), _key13 = 0; _key13 < _len12; _key13++) {
            args[_key13] = arguments[_key13];
          }
          return Events.once.apply(Events, ['Localization'].concat(args));
        }
        function postalCode() {
          var callbackOrValue = arguments[0];
          var params = {};

          // x-subscriber-type: global
          if (arguments.length === 1 && typeof arguments[0] === 'function') {
            callbackOrValue = arguments[0];
            params = {};
          }
          return Prop.prop('Localization', 'postalCode', params, callbackOrValue, false, true, 0);
        }
        function preferredAudioLanguages() {
          var callbackOrValue = arguments[0];
          var params = {};

          // x-subscriber-type: global
          if (arguments.length === 1 && typeof arguments[0] === 'function') {
            callbackOrValue = arguments[0];
            params = {};
          }
          return Prop.prop('Localization', 'preferredAudioLanguages', params, callbackOrValue, false, true, 0);
        }
        var Localization = {
          Events: {
            LOCALITY_CHANGED: 'localityChanged',
            POSTAL_CODE_CHANGED: 'postalCodeChanged',
            COUNTRY_CODE_CHANGED: 'countryCodeChanged',
            LANGUAGE_CHANGED: 'languageChanged',
            PREFERRED_AUDIO_LANGUAGES_CHANGED: 'preferredAudioLanguagesChanged',
            LOCALE_CHANGED: 'localeChanged'
          },
          additionalInfo: additionalInfo,
          clear: clear,
          countryCode: countryCode,
          language: language,
          latlon: latlon,
          listen: listen,
          locale: locale,
          locality: locality,
          once: once,
          postalCode: postalCode,
          preferredAudioLanguages: preferredAudioLanguages
        };

        /*
         * Copyright 2021 Comcast Cable Communications Management, LLC
         *
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

        registerEvents('SecondScreen', ['closeRequest', 'friendlyNameChanged', 'launchRequest']);

        /*
         * Copyright 2021 Comcast Cable Communications Management, LLC
         *
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

        setMockResponses({
          Accessibility: _Accessibility,
          Account: _Account,
          Advertising: _Advertising,
          Authentication: _Authentication,
          Capabilities: _Capabilities,
          Device: _Device,
          Discovery: _Discovery,
          Keyboard: _Keyboard,
          Lifecycle: _Lifecycle,
          Localization: _Localization,
          Metrics: _Metrics,
          Parameters: _Parameters,
          Profile: _Profile,
          SecondScreen: _SecondScreen,
          SecureStorage: _SecureStorage,
          Platform: _Platform
        });
        function Firebolt() {
          var fireboltApis = ["Lifecycle", "Audio", "Make", "Model", "latlong"];
          var _createSignal = createSignal(0),
            _createSignal2 = _slicedToArray(_createSignal, 2),
            activeIndex = _createSignal2[0],
            setActiveIndex = _createSignal2[1];
          var _createSignal3 = createSignal(""),
            _createSignal4 = _slicedToArray(_createSignal3, 2),
            data = _createSignal4[0],
            setData = _createSignal4[1];
          setGlobalBackground(0x000000FF);
          createEffect(function () {
            switch (activeIndex()) {
              case 0:
                setData("LifeCycle state is " + Lifecycle.state());
                break;
              case 1:
                Device.audio().then(function (supportedAudioProfiles) {
                  setData("DolbyAtmos " + supportedAudioProfiles.dolbyAtmos);
                });
                break;
              case 2:
                Device.make().then(function (make) {
                  setData("Device Make is " + make);
                });
                break;
              case 3:
                Account.id().then(function (id) {
                  setData("AccountId is " + id);
                });
                break;
              case 4:
                Localization.latlon().then(function (val) {
                  setData("Lat value is ".concat(val[0], ", Long value is ").concat(val[1]));
                });
                break;
            }
          });
          var apiStyle = {
            color: 0xFFFFFFFF,
            fontSize: 32,
            fontWeight: "bold",
            textAlign: "center",
            $focus: {
              color: 0x446B9EFF
            }
          };
          return createComponent(View, {
            get children() {
              return [createComponent(Text, {
                y: -120,
                fontSize: 24,
                center: true,
                children: "Press Right and Left to change API"
              }), createComponent(Row, {
                autofocus: true,
                center: true,
                y: -60,
                onSelectedChanged: setActiveIndex,
                get children() {
                  return fireboltApis.map(function (api, index) {
                    return createComponent(Text, {
                      style: apiStyle,
                      children: api
                    });
                  });
                }
              }), createComponent(Text, {
                center: true,
                get children() {
                  return data();
                }
              })];
            }
          });
        }
      }
    };
  });
})();
