;
(function () {
  function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
  function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
  function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
  function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
  function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
  function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
  function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
  function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
  function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
  function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
  function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
  function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
  function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
  function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
  function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
  function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
  function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
  function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
  function _wrapNativeSuper(t) { var r = "function" == typeof Map ? new Map() : void 0; return _wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !_isNativeFunction(t)) return t; if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return _construct(t, arguments, _getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf(Wrapper, t); }, _wrapNativeSuper(t); }
  function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
  function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
  function _isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf("[native code]"); } catch (n) { return "function" == typeof t; } }
  function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
  function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
  function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
  function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
  System.register(['./index-legacy-8BTrbbvE.js', './Button-legacy-gie-4sDd.js'], function (exports, module) {
    'use strict';

    var assertTruthy, createComponent, View, mergeProps, memo, combineStyles, styles, createSignal, createMemo, createEffect, on, styles$1, Text, styles$2, styles$3, styles$4, For, Show, onMount, Column$1, setGlobalBackground, ButtonContainer;
    return {
      setters: [function (module) {
        assertTruthy = module.i;
        createComponent = module.h;
        View = module.V;
        mergeProps = module.m;
        memo = module.k;
        combineStyles = module.l;
        styles = module.L;
        createSignal = module.c;
        createMemo = module.r;
        createEffect = module.f;
        on = module.o;
        styles$1 = module.N;
        Text = module.T;
        styles$2 = module.O;
        styles$3 = module.P;
        styles$4 = module.Q;
        For = module.F;
        Show = module.S;
        onMount = module.g;
        Column$1 = module.C;
        setGlobalBackground = module.s;
      }, function (module) {
        ButtonContainer = module.a;
      }],
      execute: function execute() {
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
        // From the renderer, not exported
        var InViewPort = 8;
        var isNotShown = function isNotShown(node) {
          return node.lng.renderState !== InViewPort;
        };
        /*
          Auto Scrolling starts scrolling right away until the last item is shown. Keeping a full view of the list.
          Edge starts scrolling when it reaches the edge of the viewport.
          Always scroll moves the list every time
        */
        function withScrolling(isRow) {
          var dimension = isRow ? 'width' : 'height';
          var axis = isRow ? 'x' : 'y';
          return function (selected, componentRef, selectedElement, lastSelected) {
            var _componentRef$_target, _componentRef$offset2, _selectedElement$axis, _selectedElement$dime, _ref, _selectedElement$scal, _selectedElement$styl, _componentRef$dimensi;
            if (typeof selected !== 'number') {
              componentRef = selected;
              selected = componentRef.selected || 0;
            }
            if (componentRef.scroll === 'none' || !componentRef.children.length) return;
            var lng = componentRef.lng;
            var screenSize = isRow ? lng.stage.root.width : lng.stage.root.height;
            // Determine if movement is incremental or decremental
            var isIncrementing = lastSelected === undefined || lastSelected - 1 !== selected;
            if (componentRef._screenOffset === undefined) {
              var _componentRef$offset;
              componentRef._screenOffset = (_componentRef$offset = componentRef.offset) !== null && _componentRef$offset !== void 0 ? _componentRef$offset : (isRow ? lng.absX : lng.absY) - componentRef[axis];
            }
            var screenOffset = componentRef._screenOffset;
            var gap = componentRef.gap || 0;
            var scroll = componentRef.scroll || 'auto';
            // Allows manual position control
            var targetPosition = (_componentRef$_target = componentRef._targetPosition) !== null && _componentRef$_target !== void 0 ? _componentRef$_target : componentRef[axis];
            var rootPosition = isIncrementing ? Math.min(targetPosition, componentRef[axis]) : Math.max(targetPosition, componentRef[axis]);
            componentRef.offset = (_componentRef$offset2 = componentRef.offset) !== null && _componentRef$offset2 !== void 0 ? _componentRef$offset2 : rootPosition;
            var offset = componentRef.offset;
            selectedElement = selectedElement || componentRef.children[selected];
            var selectedPosition = (_selectedElement$axis = selectedElement[axis]) !== null && _selectedElement$axis !== void 0 ? _selectedElement$axis : 0;
            var selectedSize = (_selectedElement$dime = selectedElement[dimension]) !== null && _selectedElement$dime !== void 0 ? _selectedElement$dime : 0;
            var selectedScale = (_ref = (_selectedElement$scal = selectedElement.scale) !== null && _selectedElement$scal !== void 0 ? _selectedElement$scal : (_selectedElement$styl = selectedElement.style) === null || _selectedElement$styl === void 0 || (_selectedElement$styl = _selectedElement$styl.focus) === null || _selectedElement$styl === void 0 ? void 0 : _selectedElement$styl.scale) !== null && _ref !== void 0 ? _ref : 1;
            var selectedSizeScaled = selectedSize * selectedScale;
            var containerSize = (_componentRef$dimensi = componentRef[dimension]) !== null && _componentRef$dimensi !== void 0 ? _componentRef$dimensi : 0;
            var maxOffset = Math.min(screenSize - containerSize - screenOffset - 2 * gap, offset);
            // Determine the next element based on whether incrementing or decrementing
            var nextIndex = isIncrementing ? selected + 1 : selected - 1;
            var nextElement = componentRef.children[nextIndex] || null;
            // Default nextPosition to align with the selected position and offset
            var nextPosition = rootPosition;
            // Update nextPosition based on scroll type and specific conditions
            if (selectedElement.centerScroll) {
              nextPosition = -selectedPosition + (screenSize - selectedSizeScaled) / 2;
            } else if (scroll === 'always') {
              nextPosition = -selectedPosition + offset;
            } else if (scroll === 'center') {
              nextPosition = -selectedPosition + (screenSize - selectedSizeScaled) / 2 - screenOffset;
            } else if (!nextElement) {
              // If at the last element, align to end
              nextPosition = isIncrementing ? maxOffset : offset;
            } else if (scroll === 'auto') {
              if (isIncrementing && componentRef.scrollIndex > 0) {
                if (componentRef.selected >= componentRef.scrollIndex) {
                  nextPosition = rootPosition - selectedSize - gap;
                }
              } else if (isIncrementing) {
                nextPosition = -selectedPosition + offset;
              } else {
                nextPosition = rootPosition + selectedSize + gap;
              }
            } // Handle Edge scrolling
            else if (isIncrementing && isNotShown(nextElement)) {
              nextPosition = rootPosition - selectedSize - gap;
            } else if (isNotShown(nextElement)) {
              nextPosition = -selectedPosition + offset;
            }
            // Prevent container from moving beyond bounds
            nextPosition = isIncrementing && scroll !== 'always' ? Math.max(nextPosition, maxOffset) : Math.min(nextPosition, offset);
            // Update position if it has changed
            if (componentRef[axis] !== nextPosition) {
              componentRef[axis] = nextPosition;
              // Store the new position to keep track during animations
              componentRef._targetPosition = nextPosition;
            }
          };
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
        // take an array of functions and if you return true from a function, it will stop the chain
        function chainFunctions() {
          for (var _len = arguments.length, args = new Array(_len), _key2 = 0; _key2 < _len; _key2++) {
            args[_key2] = arguments[_key2];
          }
          var onlyFunctions = args.filter(function (func) {
            return typeof func === 'function';
          });
          if (onlyFunctions.length === 0) {
            return undefined;
          }
          if (onlyFunctions.length === 1) {
            return onlyFunctions[0];
          }
          return function () {
            var result;
            for (var _len2 = arguments.length, innerArgs = new Array(_len2), _key3 = 0; _key3 < _len2; _key3++) {
              innerArgs[_key3] = arguments[_key3];
            }
            var _iterator = _createForOfIteratorHelper(onlyFunctions),
              _step;
            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var func = _step.value;
                result = func.apply(this, innerArgs);
                if (result === true) {
                  return result;
                }
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }
            return result;
          };
        }
        var renderer;
        var createShader;
        ({
          "BASE_URL": "/solid-demo-app/",
          "DEV": false,
          "LEGACY": true,
          "MODE": "production",
          "PROD": true,
          "SSR": false
        });
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
          enableShaderCaching: false,
          setActiveElement: function setActiveElement() {},
          focusStateKey: "$focus"
        };
        var NodeType = {
          Element: 'element',
          TextNode: 'textNode',
          Text: 'text'
        };
        function log(msg, node) {}
        var isFunc = function isFunc(obj) {
          return obj instanceof Function;
        };
        function isArray(item) {
          return Array.isArray(item);
        }
        function isString(item) {
          return typeof item === 'string';
        }
        function isNumber(item) {
          return typeof item === 'number';
        }
        function isINode(node) {
          return 'destroy' in node && typeof node.destroy === 'function';
        }
        function isElementNode(node) {
          return node instanceof ElementNode;
        }
        function isElementText(node) {
          return node._type === NodeType.TextNode;
        }
        function isTextNode(node) {
          return node._type === NodeType.Text;
        }
        function keyExists(obj, keys) {
          var _iterator2 = _createForOfIteratorHelper(keys),
            _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var key = _step2.value;
              if (key in obj) {
                return true;
              }
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
          return false;
        }
        var States = /*#__PURE__*/function (_Array) {
          function States(callback) {
            var _this;
            var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            _classCallCheck(this, States);
            if (isArray(initialState)) {
              _this = _callSuper(this, States, _toConsumableArray(initialState));
              _defineProperty(_assertThisInitialized(_this), "onChange", void 0);
            } else if (isString(initialState)) {
              _this = _callSuper(this, States, [initialState]); // Assert as DollarString
              _defineProperty(_assertThisInitialized(_this), "onChange", void 0);
            } else {
              _this = _callSuper(this, States, _toConsumableArray(Object.entries(initialState).filter(function (_ref2) {
                var _ref3 = _slicedToArray(_ref2, 2),
                  _key = _ref3[0],
                  value = _ref3[1];
                return value;
              }).map(function (_ref4) {
                var _ref5 = _slicedToArray(_ref4, 1),
                  key = _ref5[0];
                return key;
              })));
              _defineProperty(_assertThisInitialized(_this), "onChange", void 0);
            }
            _this.onChange = callback;
            return _possibleConstructorReturn(_this, _assertThisInitialized(_this));
          }
          _inherits(States, _Array);
          return _createClass(States, [{
            key: "has",
            value: function has(state) {
              // temporary check for $ prefix
              return this.indexOf(state) >= 0 || this.indexOf("$".concat(state)) >= 0;
            }
          }, {
            key: "is",
            value: function is(state) {
              return this.indexOf(state) >= 0;
            }
          }, {
            key: "add",
            value: function add(state) {
              if (this.has(state)) {
                return;
              }
              this.push(state);
              this.onChange();
            }
          }, {
            key: "toggle",
            value: function toggle(state, force) {
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
          }, {
            key: "merge",
            value: function merge(newStates) {
              if (isArray(newStates)) {
                this.length = 0; // Clear the current states
                this.push.apply(this, _toConsumableArray(newStates));
              } else if (isString(newStates)) {
                this.length = 0; // Clear the current states
                this.push(newStates); // Assert as DollarString
              } else {
                for (var state in newStates) {
                  var value = newStates[state];
                  if (value) {
                    if (!this.has(state)) {
                      this.push(state);
                    }
                  } else {
                    var stateIndexToRemove = this.indexOf(state);
                    if (stateIndexToRemove >= 0) {
                      this.splice(stateIndexToRemove, 1);
                    }
                  }
                }
              }
              return this;
            }
          }, {
            key: "remove",
            value: function remove(state) {
              var stateIndexToRemove = this.indexOf(state);
              if (stateIndexToRemove >= 0) {
                this.splice(stateIndexToRemove, 1);
                this.onChange();
              }
            }
          }]);
        }(/*#__PURE__*/_wrapNativeSuper(Array));
        function calculateFlex(node) {
          var children = [];
          var hasOrder = false;
          var growSize = 0;
          for (var i = 0; i < node.children.length; i++) {
            var c = node.children[i];
            if (isElementText(c) && c.text && !(c.width || c.height)) {
              return false;
            }
            // Filter empty text nodes which are place holders for <Show> and elements missing dimensions
            if (isTextNode(c) || c.flexItem === false) {
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
            children.sort(function (a, b) {
              return (a.flexOrder || 0) - (b.flexOrder || 0);
            });
          }
          var numChildren = children.length;
          var direction = node.flexDirection || 'row';
          var isRow = direction === 'row';
          var dimension = isRow ? 'width' : 'height';
          var crossDimension = isRow ? 'height' : 'width';
          var marginOne = isRow ? 'marginLeft' : 'marginTop';
          var crossMarginOne = isRow ? 'marginTop' : 'marginLeft';
          var marginTwo = isRow ? 'marginRight' : 'marginBottom';
          var crossMarginTwo = isRow ? 'marginBottom' : 'marginRight';
          var prop = isRow ? 'x' : 'y';
          var crossProp = isRow ? 'y' : 'x';
          var containerSize = node[dimension] || 0;
          var containerCrossSize = node[crossDimension] || 0;
          var gap = node.gap || 0;
          var justify = node.justifyContent || 'flexStart';
          var align = node.alignItems;
          var containerUpdated = false;
          if (growSize) {
            var flexBasis = children.reduce(function (prev, c) {
              return prev + (c.flexGrow ? 0 : c[dimension] || 0) + (c[marginOne] || 0) + (c[marginTwo] || 0);
            }, 0);
            var growFactor = (containerSize - flexBasis - gap * (numChildren - 1)) / growSize;
            for (var _i = 0; _i < children.length; _i++) {
              var _c = children[_i];
              if (_c.flexGrow !== undefined && _c.flexGrow > 0) {
                _c[dimension] = _c.flexGrow * growFactor;
              }
            }
          }
          var itemSize = 0;
          if (['center', 'spaceBetween', 'spaceEvenly'].includes(justify)) {
            itemSize = children.reduce(function (prev, c) {
              return prev + (c[dimension] || 0) + (c[marginOne] || 0) + (c[marginTwo] || 0);
            }, 0);
          }
          // Only align children if container has a cross size
          var crossAlignChild = containerCrossSize && align ? function (c) {
            if (align === 'flexStart') {
              c[crossProp] = c[crossMarginOne] || 0;
            } else if (align === 'center') {
              c[crossProp] = (containerCrossSize - (c[crossDimension] || 0)) / 2 + (c[crossMarginOne] || 0);
            } else if (align === 'flexEnd') {
              c[crossProp] = containerCrossSize - (c[crossDimension] || 0) - (c[crossMarginTwo] || 0);
            }
          } : function (c) {
            return c;
          };
          if (isRow && node._calcHeight && !node.flexCrossBoundary) {
            var _children$;
            // Assuming all the children have the same height
            var newHeight = ((_children$ = children[0]) === null || _children$ === void 0 ? void 0 : _children$.height) || node.height;
            if (newHeight !== node.height) {
              containerUpdated = true;
              node.height = containerCrossSize = newHeight;
            }
          }
          if (justify === 'flexStart') {
            var start = node.padding || 0;
            for (var _i2 = 0; _i2 < children.length; _i2++) {
              var _c2 = children[_i2];
              _c2[prop] = start + (_c2[marginOne] || 0);
              start += (_c2[dimension] || 0) + gap + (_c2[marginOne] || 0) + (_c2[marginTwo] || 0);
              crossAlignChild(_c2);
            }
            // Update container size
            if (node.flexBoundary !== 'fixed') {
              var calculatedSize = start - gap + (node.padding || 0);
              if (calculatedSize !== containerSize) {
                // store the original size for Row & Column
                node["preFlex".concat(dimension)] = containerSize;
                node[dimension] = calculatedSize;
                return true;
              }
            }
          } else if (justify === 'flexEnd') {
            var _start = containerSize;
            for (var _i3 = numChildren - 1; _i3 >= 0; _i3--) {
              var _c3 = children[_i3];
              _c3[prop] = _start - (_c3[dimension] || 0) - (_c3[marginTwo] || 0);
              _start -= (_c3[dimension] || 0) + gap + (_c3[marginOne] || 0) + (_c3[marginTwo] || 0);
              crossAlignChild(_c3);
            }
          } else if (justify === 'center') {
            var _start2 = (containerSize - (itemSize + gap * (numChildren - 1))) / 2;
            for (var _i4 = 0; _i4 < children.length; _i4++) {
              var _c4 = children[_i4];
              _c4[prop] = _start2 + (_c4[marginOne] || 0);
              _start2 += (_c4[dimension] || 0) + gap + (_c4[marginOne] || 0) + (_c4[marginTwo] || 0);
              crossAlignChild(_c4);
            }
          } else if (justify === 'spaceBetween') {
            var toPad = (containerSize - itemSize) / (numChildren - 1);
            var _start3 = 0;
            for (var _i5 = 0; _i5 < children.length; _i5++) {
              var _c5 = children[_i5];
              _c5[prop] = _start3 + (_c5[marginOne] || 0);
              _start3 += (_c5[dimension] || 0) + toPad + (_c5[marginOne] || 0) + (_c5[marginTwo] || 0);
              crossAlignChild(_c5);
            }
          } else if (justify === 'spaceEvenly') {
            var _toPad = (containerSize - itemSize) / (numChildren + 1);
            var _start4 = _toPad;
            for (var _i6 = 0; _i6 < children.length; _i6++) {
              var _c6 = children[_i6];
              _c6[prop] = _start4 + (_c6[marginOne] || 0);
              _start4 += (_c6[dimension] || 0) + _toPad + (_c6[marginOne] || 0) + (_c6[marginTwo] || 0);
              crossAlignChild(_c6);
            }
          }
          // Container was not updated
          return containerUpdated;
        }
        var activeElement;
        var setActiveElement = function setActiveElement(elm) {
          updateFocusPath(elm, activeElement);
          activeElement = elm;
        };
        var focusPath = [];
        var updateFocusPath = function updateFocusPath(currentFocusedElm, prevFocusedElm) {
          var current = currentFocusedElm;
          var fp = [];
          while (current) {
            if (!current.states.has(Config.focusStateKey) || current === currentFocusedElm) {
              var _current$onFocus, _current$onFocusChang;
              current.states.add(Config.focusStateKey);
              (_current$onFocus = current.onFocus) === null || _current$onFocus === void 0 || _current$onFocus.call(current, currentFocusedElm, prevFocusedElm);
              (_current$onFocusChang = current.onFocusChanged) === null || _current$onFocusChang === void 0 || _current$onFocusChang.call(current, true, currentFocusedElm, prevFocusedElm);
            }
            fp.push(current);
            current = current.parent;
          }
          focusPath.forEach(function (elm) {
            if (!fp.includes(elm)) {
              var _elm$onBlur, _elm$onFocusChanged;
              elm.states.remove(Config.focusStateKey);
              (_elm$onBlur = elm.onBlur) === null || _elm$onBlur === void 0 || _elm$onBlur.call(elm, currentFocusedElm, prevFocusedElm);
              (_elm$onFocusChanged = elm.onFocusChanged) === null || _elm$onFocusChanged === void 0 || _elm$onFocusChanged.call(elm, false, currentFocusedElm, prevFocusedElm);
            }
          });
          focusPath = fp;
          return fp;
        };
        var layoutQueue = new Set();
        var flushQueued = false;
        function runLayout() {
          var queue = _toConsumableArray(layoutQueue);
          layoutQueue.clear();
          for (var i = queue.length - 1; i >= 0; i--) {
            var node = queue[i];
            node.updateLayout();
          }
        }
        function flushLayout() {
          if (flushQueued) return;
          flushQueued = true;
          // Use setTimeout to allow renderers microtasks to finish
          setTimeout(function () {
            flushQueued = false;
            runLayout();
          }, 0);
        }
        function convertEffectsToShader(node, styleEffects) {
          var effects = [];
          for (var _i7 = 0, _Object$entries = Object.entries(styleEffects); _i7 < _Object$entries.length; _i7++) {
            var _Object$entries$_i = _slicedToArray(_Object$entries[_i7], 2),
              type = _Object$entries$_i[0],
              props = _Object$entries$_i[1];
            effects.push({
              type: type,
              props: props
            });
          }
          var shader = createShader('DynamicShader', {
            effects: effects
          });
          return shader;
        }
        function borderAccessor() {
          var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
          return {
            set: function set(value) {
              // Format: width || { width, color }
              if (isNumber(value)) {
                value = {
                  width: value,
                  color: 0x000000ff
                };
              }
              this.effects = this.effects ? _objectSpread(_objectSpread({}, this.effects || {}), _defineProperty({}, "border".concat(direction), value)) : _defineProperty({}, "border".concat(direction), value);
            },
            get: function get() {
              var _this$effects;
              return (_this$effects = this.effects) === null || _this$effects === void 0 ? void 0 : _this$effects["border".concat(direction)];
            }
          };
        }
        var LightningRendererNumberProps = ['alpha', 'color', 'colorTop', 'colorRight', 'colorLeft', 'colorBottom', 'colorTl', 'colorTr', 'colorBl', 'colorBr', 'height', 'fontSize', 'lineHeight', 'mount', 'mountX', 'mountY', 'pivot', 'pivotX', 'pivotY', 'rotation', 'scale', 'scaleX', 'scaleY', 'width', 'worldX', 'worldY', 'x', 'y', 'zIndex', 'zIndexLocked'];
        var LightningRendererNonAnimatingProps = ['absX', 'absY', 'autosize', 'clipping', 'contain', 'data', 'fontFamily', 'fontStretch', 'fontStyle', 'fontWeight', 'imageType', 'letterSpacing', 'maxLines', 'offsetY', 'overflowSuffix', 'preventCleanup', 'rtt', 'scrollable', 'scrollY', 'srcHeight', 'srcWidth', 'srcX', 'srcY', 'strictBounds', 'text', 'textAlign', 'textBaseline', 'textOverflow', 'texture', 'textureOptions', 'verticalAlign', 'wordWrap'];
        var ElementNode = /*#__PURE__*/function (_Object) {
          function ElementNode(name) {
            var _this2;
            _classCallCheck(this, ElementNode);
            _this2 = _callSuper(this, ElementNode);
            _this2._type = name === 'text' ? NodeType.TextNode : NodeType.Element;
            _this2.rendered = false;
            _this2.lng = {};
            _this2.children = [];
            return _this2;
          }
          _inherits(ElementNode, _Object);
          return _createClass(ElementNode, [{
            key: "effects",
            get: function get() {
              return this._effects;
            },
            set: function set(v) {
              this._effects = v;
              if (this.rendered) {
                this.shader = convertEffectsToShader(this, v);
              }
            }
          }, {
            key: "id",
            get: function get() {
              return this._id;
            },
            set: function set(id) {
              var _Config$rendererOptio;
              this._id = id;
              if ((_Config$rendererOptio = Config.rendererOptions) !== null && _Config$rendererOptio !== void 0 && _Config$rendererOptio.inspector) {
                this.data = _objectSpread(_objectSpread({}, this.data), {}, {
                  testId: id
                });
              }
            }
          }, {
            key: "parent",
            get: function get() {
              return this._parent;
            },
            set: function set(p) {
              this._parent = p;
              if (this.rendered) {
                var _p$lng;
                this.lng.parent = (_p$lng = p === null || p === void 0 ? void 0 : p.lng) !== null && _p$lng !== void 0 ? _p$lng : null;
              }
            }
          }, {
            key: "insertChild",
            value: function insertChild(node, beforeNode) {
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
          }, {
            key: "removeChild",
            value: function removeChild(node) {
              var nodeIndexToRemove = this.children.indexOf(node);
              if (nodeIndexToRemove >= 0) {
                this.children.splice(nodeIndexToRemove, 1);
              }
            }
          }, {
            key: "selectedNode",
            get: function get() {
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
          }, {
            key: "shader",
            set: function set(shaderProps) {
              var shProps = shaderProps;
              if (isArray(shaderProps)) {
                shProps = createShader.apply(void 0, _toConsumableArray(shaderProps));
              }
              this.lng.shader = shProps;
            }
          }, {
            key: "_sendToLightningAnimatable",
            value: function _sendToLightningAnimatable(name, value) {
              var _this3 = this;
              if (this.transition && this.rendered && Config.animationsEnabled && (this.transition === true || this.transition[name])) {
                var animationSettings = this.transition === true || this.transition[name] === true ? undefined : this.transition[name];
                var animationController = this.animate(_defineProperty({}, name, value), animationSettings);
                if (this.onAnimation) {
                  var animationEvents = Object.keys(this.onAnimation);
                  var _loop = function _loop() {
                    var event = _animationEvents[_i8];
                    var handler = _this3.onAnimation[event];
                    animationController.on(event, function (controller, props) {
                      handler.call(_this3, controller, name, value, props);
                    });
                  };
                  for (var _i8 = 0, _animationEvents = animationEvents; _i8 < _animationEvents.length; _i8++) {
                    _loop();
                  }
                }
                return animationController.start();
              }
              this.lng[name] = value;
            }
          }, {
            key: "animate",
            value: function animate(props, animationSettings) {
              assertTruthy(this.rendered);
              return this.lng.animate(props, animationSettings || this.animationSettings || {});
            }
          }, {
            key: "chain",
            value: function chain(props, animationSettings) {
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
                props: props,
                animationSettings: animationSettings
              });
              return this;
            }
          }, {
            key: "start",
            value: function () {
              var _start5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
                var animation;
                return _regeneratorRuntime().wrap(function _callee$(_context) {
                  while (1) switch (_context.prev = _context.next) {
                    case 0:
                      animation = this._animationQueue.shift();
                    case 1:
                      if (!animation) {
                        _context.next = 8;
                        break;
                      }
                      this._animationRunning = true;
                      _context.next = 5;
                      return this.animate(animation.props, animation.animationSettings).start().waitUntilStopped();
                    case 5:
                      animation = this._animationQueue.shift();
                      _context.next = 1;
                      break;
                    case 8:
                      this._animationRunning = false;
                      this._animationQueueSettings = undefined;
                    case 10:
                    case "end":
                      return _context.stop();
                  }
                }, _callee, this);
              }));
              function start() {
                return _start5.apply(this, arguments);
              }
              return start;
            }()
          }, {
            key: "setFocus",
            value: function setFocus() {
              var _this4 = this;
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
                queueMicrotask(function () {
                  return setActiveElement(_this4);
                });
              } else {
                this._autofocus = true;
              }
            }
          }, {
            key: "_layoutOnLoad",
            value: function _layoutOnLoad() {
              var _this5 = this;
              this.lng.on('loaded', function () {
                // Re-add the node to the layout queue because somehow the queue fluses and there is a straggler
                layoutQueue.add(_this5.parent);
                flushLayout();
              });
            }
          }, {
            key: "getText",
            value: function getText() {
              var result = '';
              for (var i = 0; i < this.children.length; i++) {
                result += this.children[i].text;
              }
              return result;
            }
          }, {
            key: "destroy",
            value: function destroy() {
              var _this6 = this;
              if (this.onDestroy) {
                var destroyPromise = this.onDestroy(this);
                // If onDestroy returns a promise, wait for it to resolve before destroying
                // Useful with animations waitUntilStopped method which returns promise
                if (destroyPromise instanceof Promise) {
                  destroyPromise.then(function () {
                    return _this6._destroy();
                  });
                } else {
                  this._destroy();
                }
              } else {
                this._destroy();
              }
            }
          }, {
            key: "_destroy",
            value: function _destroy() {
              if (this._queueDelete && isINode(this.lng)) {
                var _this$parent;
                this.lng.destroy();
                if ((_this$parent = this.parent) !== null && _this$parent !== void 0 && _this$parent.requiresLayout()) {
                  this.parent.updateLayout();
                }
              }
            }
          }, {
            key: "style",
            get: function get() {
              return this._style;
            },
            set: function set(style) {
              if (!style) {
                return;
              }
              this._style = style;
              // Keys set in JSX are more important
              for (var key in this._style) {
                // be careful of 0 values
                if (this[key] === undefined) {
                  this[key] = this._style[key];
                }
              }
            }
          }, {
            key: "hasChildren",
            get: function get() {
              return this.children.length > 0;
            }
          }, {
            key: "src",
            get: function get() {
              return this.lng.src;
            },
            set: function set(src) {
              if (typeof src === 'string') {
                this.lng.src = src;
                if (!this.color && this.rendered) {
                  this.color = 0xffffffff;
                }
              } else {
                this.color = 0x00000000;
              }
            }
          }, {
            key: "getChildById",
            value: function getChildById(id) {
              return this.children.find(function (c) {
                return c.id === id;
              });
            }
          }, {
            key: "searchChildrenById",
            value: function searchChildrenById(id) {
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
          }, {
            key: "states",
            get: function get() {
              this._states = this._states || new States(this._stateChanged.bind(this));
              return this._states;
            },
            set: function set(states) {
              this._states = this._states ? this._states.merge(states) : new States(this._stateChanged.bind(this), states);
              if (this.rendered) {
                this._stateChanged();
              }
            }
          }, {
            key: "animationSettings",
            get: function get() {
              return this._animationSettings || Config.animationSettings;
            },
            set: function set(animationSettings) {
              this._animationSettings = animationSettings;
            }
          }, {
            key: "hidden",
            get: function get() {
              return this.alpha === 0;
            }
            /**
             * Sets the autofocus state of the element.
             * When set to a truthy value, the element will automatically gain focus.
             * You can also set it to a signal to recalculate
             *
             * @param val - A value to determine if the element should autofocus.
             *              A truthy value enables autofocus, otherwise disables it.
             */,
            set: function set(val) {
              this.alpha = val ? 0 : 1;
            }
          }, {
            key: "autofocus",
            get: function get() {
              return this._autofocus;
            },
            set: function set(val) {
              this._autofocus = val;
              val && this.setFocus();
            }
          }, {
            key: "requiresLayout",
            value: function requiresLayout() {
              return this.display === 'flex' || this.onLayout;
            }
          }, {
            key: "updateLayoutOn",
            get: function get() {
              return null;
            },
            set: function set(v) {
              this.updateLayout();
            }
          }, {
            key: "updateLayout",
            value: function updateLayout() {
              if (this.hasChildren) {
                if (this.display === 'flex') {
                  if (calculateFlex(this)) {
                    var _this$parent2;
                    (_this$parent2 = this.parent) === null || _this$parent2 === void 0 || _this$parent2.updateLayout();
                  }
                }
                if (isFunc(this.onLayout) && this.onLayout.call(this, this)) {
                  var _this$parent3;
                  (_this$parent3 = this.parent) === null || _this$parent3 === void 0 || _this$parent3.updateLayout();
                }
              }
            }
          }, {
            key: "_stateChanged",
            value: function _stateChanged() {
              var _this7 = this;
              log('State Changed: ', this, this.states);
              if (this.forwardStates) {
                // apply states to children first
                var _states = this.states.slice();
                this.children.forEach(function (c) {
                  c.states = _states;
                });
              }
              var states = this.states;
              if (this._undoStyles || keyExists(this, states)) {
                var stylesToUndo;
                if (this._undoStyles && this._undoStyles.length) {
                  stylesToUndo = {};
                  this._undoStyles.forEach(function (styleKey) {
                    stylesToUndo[styleKey] = _this7.style[styleKey];
                  });
                }
                var numStates = states.length;
                if (numStates === 0) {
                  Object.assign(this, stylesToUndo);
                  this._undoStyles = [];
                  return;
                }
                var newStyles;
                if (numStates === 1) {
                  newStyles = this[states[0]];
                  newStyles = stylesToUndo ? _objectSpread(_objectSpread({}, stylesToUndo), newStyles) : newStyles;
                } else {
                  newStyles = states.reduce(function (acc, state) {
                    var styles = _this7[state];
                    return styles ? _objectSpread(_objectSpread({}, acc), styles) : acc;
                  }, stylesToUndo || {});
                }
                if (newStyles) {
                  this._undoStyles = Object.keys(newStyles);
                  // Apply transition first
                  if (newStyles.transition !== undefined) {
                    this.transition = newStyles.transition;
                  }
                  // Apply the styles
                  Object.assign(this, newStyles);
                } else {
                  this._undoStyles = [];
                }
              }
            }
          }, {
            key: "render",
            value: function render(topNode) {
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
              props.x = props.x || 0;
              props.y = props.y || 0;
              props.parent = parent.lng;
              if (this.right || this.right === 0) {
                props.x = (parent.width || 0) - this.right;
                props.mountX = 1;
              }
              if (this.bottom || this.bottom === 0) {
                props.y = (parent.height || 0) - this.bottom;
                props.mountY = 1;
              }
              if (this.center) {
                this.centerX = this.centerY = true;
              }
              if (this.centerX) {
                props.x += (parent.width || 0) / 2;
                props.mountX = 0.5;
              }
              if (this.centerY) {
                props.y += (parent.height || 0) / 2;
                props.mountY = 0.5;
              }
              if (isElementText(node)) {
                var textProps = props;
                {
                  for (var key in Config.fontSettings) {
                    if (textProps[key] === undefined) {
                      textProps[key] = Config.fontSettings[key];
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
                if (node._effects) {
                  props.shader = convertEffectsToShader(node, node._effects);
                }
                node.lng = renderer.createTextNode(props);
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
                    node._calcWidth = true;
                  }
                  if (isNaN(props.height)) {
                    props.height = (parent.height || 0) - props.y;
                    node._calcHeight = true;
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
                if (node._effects) {
                  props.shader = convertEffectsToShader(node, node._effects);
                }
                node.lng = renderer.createNode(props);
              }
              node.rendered = true;
              if (node.autosize && parent.requiresLayout()) {
                node._layoutOnLoad();
              }
              isFunc(this.onCreate) && this.onCreate.call(this, node);
              if (node.onEvent) {
                var _loop2 = function _loop2() {
                  var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i9], 2),
                    name = _Object$entries2$_i[0],
                    handler = _Object$entries2$_i[1];
                  node.lng.on(name, function (_inode, data) {
                    return handler.call(node, node, data);
                  });
                };
                for (var _i9 = 0, _Object$entries2 = Object.entries(node.onEvent); _i9 < _Object$entries2.length; _i9++) {
                  _loop2();
                }
              }
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
                  if (isElementNode(c)) {
                    c.render();
                  }
                }
              }
              if (topNode) {
                //Do one pass of layout, then another with Text completed
                runLayout();
              }
              node._autofocus && node.setFocus();
            }
          }]);
        }(/*#__PURE__*/_wrapNativeSuper(Object));
        var _loop3 = function _loop3() {
          var key = _LightningRendererNum[_i10];
          Object.defineProperty(ElementNode.prototype, key, {
            get: function get() {
              return this.lng[key];
            },
            set: function set(v) {
              this._sendToLightningAnimatable(key, v);
            }
          });
        };
        for (var _i10 = 0, _LightningRendererNum = LightningRendererNumberProps; _i10 < _LightningRendererNum.length; _i10++) {
          _loop3();
        }
        var _loop4 = function _loop4() {
          var key = _LightningRendererNon[_i11];
          Object.defineProperty(ElementNode.prototype, key, {
            get: function get() {
              return this.lng[key];
            },
            set: function set(v) {
              this.lng[key] = v;
            }
          });
        };
        for (var _i11 = 0, _LightningRendererNon = LightningRendererNonAnimatingProps; _i11 < _LightningRendererNon.length; _i11++) {
          _loop4();
        }
        // Add Border Helpers
        function createEffectAccessor(key) {
          return {
            set: function set(value) {
              this.effects = this.effects ? _objectSpread(_objectSpread({}, this.effects), {}, _defineProperty({}, key, value)) : _defineProperty({}, key, value);
            },
            get: function get() {
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
            set: function set(radius) {
              this.effects = this.effects ? _objectSpread(_objectSpread({}, this.effects), {}, {
                radius: {
                  radius: radius
                }
              }) : {
                radius: {
                  radius: radius
                }
              };
            },
            get: function get() {
              var _this$effects3;
              return (_this$effects3 = this.effects) === null || _this$effects3 === void 0 || (_this$effects3 = _this$effects3.radius) === null || _this$effects3 === void 0 ? void 0 : _this$effects3.radius;
            }
          }
        });

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
        // Converts params from onFocus to onSelectedChanged
        function handleOnSelect(onSelectedChanged) {
          return function () {
            return onSelectedChanged.call(this, this.selected, this, this.children[this.selected]);
          };
        }
        function handleNavigation(direction) {
          return function () {
            var numChildren = this.children.length;
            var wrap = this.wrap;
            var lastSelected = this.selected || 0;
            if (numChildren === 0) {
              return false;
            }
            if (direction === 'right' || direction === 'down') {
              do {
                var _this$children$this$s;
                this.selected = (this.selected || 0) % numChildren + 1;
                if (this.selected >= numChildren) {
                  if (!wrap) {
                    this.selected = undefined;
                    break;
                  }
                  this.selected = 0;
                }
              } while ((_this$children$this$s = this.children[this.selected]) !== null && _this$children$this$s !== void 0 && _this$children$this$s.skipFocus);
            } else if (direction === 'left' || direction === 'up') {
              do {
                var _this$children$this$s2;
                this.selected = (this.selected || 0) % numChildren - 1;
                if (this.selected < 0) {
                  if (!wrap) {
                    this.selected = undefined;
                    break;
                  }
                  this.selected = numChildren - 1;
                }
              } while ((_this$children$this$s2 = this.children[this.selected]) !== null && _this$children$this$s2 !== void 0 && _this$children$this$s2.skipFocus);
            }
            if (this.selected === undefined) {
              var _this$children$this$s3;
              this.selected = lastSelected;
              if ((_this$children$this$s3 = this.children[this.selected]) !== null && _this$children$this$s3 !== void 0 && _this$children$this$s3.states.has('focus')) {
                // This child is already focused, so bubble up to next handler
                return false;
              }
            }
            var active = this.children[this.selected];
            this.onSelectedChanged && this.onSelectedChanged.call(this, this.selected, this, active, lastSelected);
            if (this.plinko) {
              // Set the next item to have the same selected index
              // so we move up / down directly
              var lastSelectedChild = this.children[lastSelected];
              var num = lastSelectedChild.selected || 0;
              active.selected = num < active.children.length ? num : active.children.length - 1;
            }
            active.setFocus();
            return true;
          };
        }
        var onUp = handleNavigation("up");
        var onDown = handleNavigation("down");
        var scroll$1 = withScrolling(false);
        var Column = function Column(props) {
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
            get onFocus() {
              return chainFunctions(props.onFocus, props.onSelectedChanged && handleOnSelect(props.onSelectedChanged));
            },
            get onLayout() {
              return memo(function () {
                return !!props.selected;
              })() ? chainFunctions(props.onLayout, scroll$1) : props.onLayout;
            },
            get onSelectedChanged() {
              return chainFunctions(props.onSelectedChanged, props.scroll !== "none" ? scroll$1 : undefined);
            },
            get style() {
              var _props$tone;
              return combineStyles(props.style, styles.Container.tones[(_props$tone = props.tone) !== null && _props$tone !== void 0 ? _props$tone : styles.tone]);
            }
          }));
        };
        var getformatTitleText = function getformatTitleText(props, title) {
          var _props$mask, _title$length;
          return props.password ? ((_props$mask = props.mask) !== null && _props$mask !== void 0 ? _props$mask : "").repeat((_title$length = title.length) !== null && _title$length !== void 0 ? _title$length : 0) : title;
        };
        var Input = function Input(props) {
          var _props$position;
          var _props$titleSignal = _slicedToArray(props.titleSignal, 2),
            title = _props$titleSignal[0],
            setTitle = _props$titleSignal[1];
          var _createSignal = createSignal((_props$position = props.position) !== null && _props$position !== void 0 ? _props$position : title().length),
            _createSignal2 = _slicedToArray(_createSignal, 2),
            position = _createSignal2[0],
            setPosition = _createSignal2[1];
          var _props$keyEvent = _slicedToArray(props.keyEvent, 2),
            keyEvent = _props$keyEvent[0],
            setKeyEvent = _props$keyEvent[1];
          var formatTitleText = createMemo(function () {
            return getformatTitleText(props, title());
          });
          var formatInputText = function formatInputText(key) {
            if (key === undefined || key === "") {
              return;
            }
            var inputText = title();
            var currentPosition = position();
            var newTitle = "";
            switch (key.toLowerCase()) {
              case "backspace":
              case "delete":
                newTitle = currentPosition > 0 ? inputText.slice(0, currentPosition - 1) + inputText.slice(currentPosition) : inputText;
                currentPosition--;
                break;
              case "done":
                break;
              case "space":
                newTitle = currentPosition > 0 ? inputText.slice(0, currentPosition) + " " + inputText.slice(currentPosition) : " " + inputText;
                currentPosition++;
                break;
              case "clear":
                newTitle = "";
                currentPosition = 0;
                break;
              default:
                newTitle = currentPosition > 0 ? inputText.slice(0, currentPosition) + key + inputText.slice(currentPosition) : key + inputText;
                currentPosition++;
                break;
            }
            setKeyEvent("");
            setTitle(newTitle);
            setPosition(currentPosition);
            return "";
          };
          createEffect(on(function () {
            return keyEvent();
          }, function (keyEvent2) {
            formatInputText(keyEvent2);
          }, {
            defer: true
          }));
          function onRight() {
            setPosition(function (p) {
              return Math.max(p + 1, title().length);
            });
            return true;
          }
          function onLeft() {
            setPosition(function (p) {
              return Math.max(p - 1, 0);
            });
            return true;
          }
          return createComponent(View, mergeProps(props, {
            get color() {
              return props.backgroundColor;
            },
            get justifyContent() {
              return props.justify;
            },
            get borderRadius() {
              return props.radius;
            },
            get position() {
              return position();
            },
            onLeft: onLeft,
            onRight: onRight,
            get style() {
              var _props$tone2;
              return combineStyles(props.style,
              //
              styles$1.Container.tones[(_props$tone2 = props.tone) !== null && _props$tone2 !== void 0 ? _props$tone2 : styles$1.tone]);
            },
            get children() {
              return createComponent(Text, {
                get tone() {
                  var _props$tone3;
                  return (_props$tone3 = props.tone) !== null && _props$tone3 !== void 0 ? _props$tone3 : styles$1.tone;
                },
                get color() {
                  return props.textColor;
                },
                get style() {
                  var _props$tone4;
                  return combineStyles(styles$1.Text.tones[(_props$tone4 = props.tone) !== null && _props$tone4 !== void 0 ? _props$tone4 : styles$1.tone],
                  //
                  styles$1.Text.base);
                },
                get children() {
                  return formatTitleText() || " ";
                }
              });
            }
          }));
        };
        var getTone$1 = function getTone$1(props) {
          var _props$tone5;
          return (_props$tone5 = props.tone) !== null && _props$tone5 !== void 0 ? _props$tone5 : styles$2.tone;
        };
        var getMultiplier$1 = function getMultiplier$1(props) {
          var _ref8, _props$sizes, _props$sizes2, _props$size, _styles$2$Container, _props$tone6, _props$size2, _props$size3;
          return (_ref8 = (_props$sizes = (_props$sizes2 = props.sizes) === null || _props$sizes2 === void 0 ? void 0 : _props$sizes2[(_props$size = props.size) !== null && _props$size !== void 0 ? _props$size : "sm"]) !== null && _props$sizes !== void 0 ? _props$sizes : (_styles$2$Container = styles$2.Container) === null || _styles$2$Container === void 0 || (_styles$2$Container = _styles$2$Container.tones) === null || _styles$2$Container === void 0 || (_styles$2$Container = _styles$2$Container[(_props$tone6 = props.tone) !== null && _props$tone6 !== void 0 ? _props$tone6 : styles$2.tone]) === null || _styles$2$Container === void 0 || (_styles$2$Container = _styles$2$Container.sizes) === null || _styles$2$Container === void 0 ? void 0 : _styles$2$Container[(_props$size2 = props.size) !== null && _props$size2 !== void 0 ? _props$size2 : "sm"]) !== null && _ref8 !== void 0 ? _ref8 : styles$2.Container.base.sizes[(_props$size3 = props.size) !== null && _props$size3 !== void 0 ? _props$size3 : "sm"];
        };
        var getBaseWidth$1 = function getBaseWidth$1(props) {
          var _ref9, _props$baseWidth, _styles$2$Container2, _props$tone7;
          return (_ref9 = (_props$baseWidth = props.baseWidth) !== null && _props$baseWidth !== void 0 ? _props$baseWidth : (_styles$2$Container2 = styles$2.Container) === null || _styles$2$Container2 === void 0 || (_styles$2$Container2 = _styles$2$Container2.tones) === null || _styles$2$Container2 === void 0 || (_styles$2$Container2 = _styles$2$Container2[(_props$tone7 = props.tone) !== null && _props$tone7 !== void 0 ? _props$tone7 : styles$2.tone]) === null || _styles$2$Container2 === void 0 ? void 0 : _styles$2$Container2.baseWidth) !== null && _ref9 !== void 0 ? _ref9 : styles$2.Container.base.baseWidth;
        };
        var getKeySpacing$1 = function getKeySpacing$1(props) {
          var _ref10, _props$keySpacing, _styles$2$Container$t, _props$tone8;
          return (_ref10 = (_props$keySpacing = props.keySpacing) !== null && _props$keySpacing !== void 0 ? _props$keySpacing : (_styles$2$Container$t = styles$2.Container.tones) === null || _styles$2$Container$t === void 0 || (_styles$2$Container$t = _styles$2$Container$t[(_props$tone8 = props.tone) !== null && _props$tone8 !== void 0 ? _props$tone8 : styles$2.tone]) === null || _styles$2$Container$t === void 0 ? void 0 : _styles$2$Container$t.keySpacing) !== null && _ref10 !== void 0 ? _ref10 : styles$2.Container.base.keySpacing;
        };
        var Key = function Key(props) {
          var tone = createMemo(function () {
            return getTone$1(props);
          });
          var multiplier = createMemo(function () {
            return getMultiplier$1(props);
          });
          var baseWidth = createMemo(function () {
            return getBaseWidth$1(props);
          });
          var keySpacing = createMemo(function () {
            return getKeySpacing$1(props);
          });
          return createComponent(ButtonContainer, mergeProps(props, {
            get style() {
              var _styles$2$Container$t2;
              return combineStyles(props.style, //
              (_styles$2$Container$t2 = styles$2.Container.tones) === null || _styles$2$Container$t2 === void 0 ? void 0 : _styles$2$Container$t2[tone()]);
            },
            forwardStates: true,
            get width() {
              return multiplier() * baseWidth() + keySpacing() * (multiplier() - 1);
            },
            get children() {
              return createComponent(Text, {
                get contain() {
                  var _props$contain;
                  return (_props$contain = props.contain) !== null && _props$contain !== void 0 ? _props$contain : "width";
                },
                get textAlign() {
                  return props.textAlign;
                },
                get style() {
                  return combineStyles(styles$2.Text.tones[tone()],
                  //
                  styles$2.Text.base);
                },
                get children() {
                  return props.title ? props.title : "";
                }
              });
            }
          }));
        };
        var onLeft = handleNavigation("left");
        var onRight = handleNavigation("right");
        var scroll = withScrolling(true);
        var Row = function Row(props) {
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
            get onFocus() {
              return chainFunctions(props.onFocus, props.onSelectedChanged && handleOnSelect(props.onSelectedChanged));
            },
            forwardFocus: onGridFocus,
            get onLayout() {
              return memo(function () {
                return !!props.selected;
              })() ? chainFunctions(props.onLayout, scroll) : props.onLayout;
            },
            get onSelectedChanged() {
              return chainFunctions(props.onSelectedChanged, props.scroll !== "none" ? scroll : undefined);
            },
            get style() {
              var _props$tone9;
              return combineStyles(props.style, styles$3.Container.tones[(_props$tone9 = props.tone) !== null && _props$tone9 !== void 0 ? _props$tone9 : styles$3.tone]);
            }
          }));
        };
        var getTone = function getTone(props) {
          var _props$tone10;
          return (_props$tone10 = props.tone) !== null && _props$tone10 !== void 0 ? _props$tone10 : styles$4.tone;
        };
        var getGap = function getGap(props) {
          var _ref11, _ref12, _props$gap, _styles$4$Container$t, _props$tone11;
          return (_ref11 = (_ref12 = (_props$gap = props.gap) !== null && _props$gap !== void 0 ? _props$gap : props.keySpacing) !== null && _ref12 !== void 0 ? _ref12 : (_styles$4$Container$t = styles$4.Container.tones[(_props$tone11 = props.tone) !== null && _props$tone11 !== void 0 ? _props$tone11 : styles$4.tone]) === null || _styles$4$Container$t === void 0 ? void 0 : _styles$4$Container$t.keySpacing) !== null && _ref11 !== void 0 ? _ref11 : styles$4.Container.base.keySpacing;
        };
        var getKeyHeight = function getKeyHeight(props) {
          var _ref13, _props$keyHeight, _styles$4$Container$t2, _props$tone12;
          return (_ref13 = (_props$keyHeight = props.keyHeight) !== null && _props$keyHeight !== void 0 ? _props$keyHeight : (_styles$4$Container$t2 = styles$4.Container.tones[(_props$tone12 = props.tone) !== null && _props$tone12 !== void 0 ? _props$tone12 : styles$4.tone]) === null || _styles$4$Container$t2 === void 0 ? void 0 : _styles$4$Container$t2.keyHeight) !== null && _ref13 !== void 0 ? _ref13 : styles$4.Container.base.keyHeight;
        };
        var getTotalWidth = function getTotalWidth(props) {
          var _ref14, _ref15, _props$screenW, _styles$4$Container$t3, _props$tone13;
          return (_ref14 = (_ref15 = (_props$screenW = props.screenW) !== null && _props$screenW !== void 0 ? _props$screenW : props.width) !== null && _ref15 !== void 0 ? _ref15 : (_styles$4$Container$t3 = styles$4.Container.tones[(_props$tone13 = props.tone) !== null && _props$tone13 !== void 0 ? _props$tone13 : styles$4.tone]) === null || _styles$4$Container$t3 === void 0 ? void 0 : _styles$4$Container$t3.width) !== null && _ref14 !== void 0 ? _ref14 : styles$4.Container.base.width;
        };
        var getMultiplier = function getMultiplier(props) {
          var _ref16, _props$sizes3, _props$sizes4, _props$size4, _styles$2$Container3, _props$tone14, _props$size5, _props$size6;
          return (_ref16 = (_props$sizes3 = (_props$sizes4 = props.sizes) === null || _props$sizes4 === void 0 ? void 0 : _props$sizes4[(_props$size4 = props.size) !== null && _props$size4 !== void 0 ? _props$size4 : "sm"]) !== null && _props$sizes3 !== void 0 ? _props$sizes3 : (_styles$2$Container3 = styles$2.Container) === null || _styles$2$Container3 === void 0 || (_styles$2$Container3 = _styles$2$Container3.tones) === null || _styles$2$Container3 === void 0 || (_styles$2$Container3 = _styles$2$Container3[(_props$tone14 = props.tone) !== null && _props$tone14 !== void 0 ? _props$tone14 : styles$2.tone]) === null || _styles$2$Container3 === void 0 || (_styles$2$Container3 = _styles$2$Container3.sizes) === null || _styles$2$Container3 === void 0 ? void 0 : _styles$2$Container3[(_props$size5 = props.size) !== null && _props$size5 !== void 0 ? _props$size5 : "sm"]) !== null && _ref16 !== void 0 ? _ref16 : styles$2.Container.base.sizes[(_props$size6 = props.size) !== null && _props$size6 !== void 0 ? _props$size6 : "sm"];
        };
        var getBaseWidth = function getBaseWidth(props) {
          var _ref17, _props$baseWidth2, _styles$2$Container4, _props$tone15;
          return (_ref17 = (_props$baseWidth2 = props.baseWidth) !== null && _props$baseWidth2 !== void 0 ? _props$baseWidth2 : (_styles$2$Container4 = styles$2.Container) === null || _styles$2$Container4 === void 0 || (_styles$2$Container4 = _styles$2$Container4.tones) === null || _styles$2$Container4 === void 0 || (_styles$2$Container4 = _styles$2$Container4[(_props$tone15 = props.tone) !== null && _props$tone15 !== void 0 ? _props$tone15 : styles$2.tone]) === null || _styles$2$Container4 === void 0 ? void 0 : _styles$2$Container4.baseWidth) !== null && _ref17 !== void 0 ? _ref17 : styles$2.Container.base.baseWidth;
        };
        var getKeySpacing = function getKeySpacing(props) {
          var _ref18, _props$keySpacing2, _styles$2$Container$t3, _props$tone16;
          return (_ref18 = (_props$keySpacing2 = props.keySpacing) !== null && _props$keySpacing2 !== void 0 ? _props$keySpacing2 : (_styles$2$Container$t3 = styles$2.Container.tones) === null || _styles$2$Container$t3 === void 0 || (_styles$2$Container$t3 = _styles$2$Container$t3[(_props$tone16 = props.tone) !== null && _props$tone16 !== void 0 ? _props$tone16 : styles$2.tone]) === null || _styles$2$Container$t3 === void 0 ? void 0 : _styles$2$Container$t3.keySpacing) !== null && _ref18 !== void 0 ? _ref18 : styles$2.Container.base.keySpacing;
        };
        var KeyboardBase = function KeyboardBase(props) {
          var _props$keySignal;
          var _ref19 = (_props$keySignal = props.keySignal) !== null && _props$keySignal !== void 0 ? _props$keySignal : createSignal(""),
            _ref20 = _slicedToArray(_ref19, 2),
            _ = _ref20[0],
            setKeySignal = _ref20[1];
          var _createSignal3 = createSignal("default"),
            _createSignal4 = _slicedToArray(_createSignal3, 2),
            activeKeyboard = _createSignal4[0],
            setActiveKeyboard = _createSignal4[1];
          var _createSignal5 = createSignal(0),
            _createSignal6 = _slicedToArray(_createSignal5, 2),
            selectedRowIndex = _createSignal6[0],
            setSelectedRowIndex = _createSignal6[1];
          var _createSignal7 = createSignal(0),
            _createSignal8 = _slicedToArray(_createSignal7, 2),
            selectedColumnIndex = _createSignal8[0],
            setSelectedColumnIndex = _createSignal8[1];
          var _createSignal9 = createSignal(0),
            _createSignal10 = _slicedToArray(_createSignal9, 2),
            rowWidth = _createSignal10[0],
            setRowWidth = _createSignal10[1];
          var tone = createMemo(function () {
            return getTone(props);
          });
          var gap = createMemo(function () {
            return getGap(props);
          });
          var totalWidth = createMemo(function () {
            return getTotalWidth(props);
          });
          var keyHeight = createMemo(function () {
            return getKeyHeight(props);
          });
          var keyboardRefList = /* @__PURE__ */new Map();
          var setOnEnter = function setOnEnter(key, rowIdx, colIdx) {
            if (typeof key === "string") {
              return function () {
                return setKeySignal(key);
              };
            } else if (key.toggle) {
              return function () {
                var _keyboardRefList$key$, _keyboardRefList$key$2, _keyboardRefList$key$3;
                setSelectedRowIndex(rowIdx());
                setSelectedColumnIndex(colIdx());
                setActiveKeyboard(key.toggle);
                (_keyboardRefList$key$ = keyboardRefList[key.toggle]) === null || _keyboardRefList$key$ === void 0 || (_keyboardRefList$key$ = _keyboardRefList$key$.element) === null || _keyboardRefList$key$ === void 0 || _keyboardRefList$key$.setFocus();
                setRowWidth((_keyboardRefList$key$2 = (_keyboardRefList$key$3 = keyboardRefList[key.toggle]) === null || _keyboardRefList$key$3 === void 0 ? void 0 : _keyboardRefList$key$3.width) !== null && _keyboardRefList$key$2 !== void 0 ? _keyboardRefList$key$2 : 0);
              };
            } else {
              return function () {
                var _key$title;
                return setKeySignal(typeof key === "string" ? key : (_key$title = key.title) !== null && _key$title !== void 0 ? _key$title : "");
              };
            }
          };
          var addKeyboardWidth = function addKeyboardWidth(keyboard) {
            var maxRow = 0;
            var _iterator3 = _createForOfIteratorHelper(props.formats[keyboard]),
              _step3;
            try {
              for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                var row = _step3.value;
                var rowWidth2 = 0;
                var _iterator4 = _createForOfIteratorHelper(row),
                  _step4;
                try {
                  for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                    var key = _step4.value;
                    var width = getBaseWidth(props);
                    if (_typeof(key) === "object") {
                      width = getMultiplier(key) * getBaseWidth(props) + getKeySpacing(props) * (getMultiplier(key) - 1);
                    }
                    rowWidth2 += width + getKeySpacing(props);
                  }
                } catch (err) {
                  _iterator4.e(err);
                } finally {
                  _iterator4.f();
                }
                if (maxRow < rowWidth2) {
                  maxRow = rowWidth2;
                }
              }
            } catch (err) {
              _iterator3.e(err);
            } finally {
              _iterator3.f();
            }
            return maxRow;
          };
          return createComponent(View, mergeProps(props, {
            forwardFocus: 0,
            get style() {
              return combineStyles(props.style,
              //
              styles$4.Container.tones[tone()]);
            },
            get width() {
              return totalWidth();
            },
            height: undefined,
            get children() {
              return createComponent(For, {
                get each() {
                  return Object.keys(props.formats);
                },
                children: function children(keyboard) {
                  return createComponent(Show, {
                    get when() {
                      return activeKeyboard() === keyboard;
                    },
                    get children() {
                      return createComponent(View, {
                        ref: function ref(element) {
                          keyboardRefList[keyboard] = {
                            element: element,
                            width: addKeyboardWidth(keyboard)
                          };
                          if (activeKeyboard() === keyboard) {
                            var _keyboardRefList$keyb, _keyboardRefList$keyb2;
                            element.setFocus();
                            setRowWidth((_keyboardRefList$keyb = (_keyboardRefList$keyb2 = keyboardRefList[keyboard]) === null || _keyboardRefList$keyb2 === void 0 ? void 0 : _keyboardRefList$keyb2.width) !== null && _keyboardRefList$keyb !== void 0 ? _keyboardRefList$keyb : 0);
                          }
                          return keyboard;
                        },
                        get justifyContent() {
                          return props.centerKeyboard ? "center" : "flexStart";
                        },
                        display: "flex",
                        forwardFocus: 0,
                        get children() {
                          return createComponent(Column, {
                            scroll: "none",
                            plinko: true,
                            get selected() {
                              return selectedColumnIndex();
                            },
                            get alignItems() {
                              return props.centerKeys || props.centerKeyboard ? "center" : "flexStart";
                            },
                            get width() {
                              return rowWidth();
                            },
                            get gap() {
                              return gap();
                            },
                            get children() {
                              return createComponent(For, {
                                get each() {
                                  return props.formats[keyboard];
                                },
                                children: function children(row, colIdx) {
                                  return createComponent(Row, {
                                    scroll: "none",
                                    get selected() {
                                      return selectedRowIndex();
                                    },
                                    get flexBoundary() {
                                      var _props$flexBoundary;
                                      return (_props$flexBoundary = props.flexBoundary) !== null && _props$flexBoundary !== void 0 ? _props$flexBoundary : "contain";
                                    },
                                    display: "flex",
                                    get gap() {
                                      return gap();
                                    },
                                    get height() {
                                      return keyHeight();
                                    },
                                    get wrap() {
                                      return props.rowWrap;
                                    },
                                    get children() {
                                      return createComponent(For, {
                                        each: row,
                                        children: function children(key, rowIdx) {
                                          return createComponent(Key, mergeProps(typeof key === "string" ? {} : key, {
                                            get onEnter() {
                                              return setOnEnter(key, rowIdx, colIdx);
                                            },
                                            get title() {
                                              var _key$title2;
                                              return typeof key === "string" ? key : (_key$title2 = key.title) !== null && _key$title2 !== void 0 ? _key$title2 : "";
                                            },
                                            get height() {
                                              return keyHeight();
                                            }
                                          }));
                                        }
                                      });
                                    }
                                  });
                                }
                              });
                            }
                          });
                        }
                      });
                    }
                  });
                }
              });
            }
          }));
        };
        var dialpad = {
          default: [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9'], ['0']]
        };
        var dialpadExtended = {
          default: [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9'], ['0', {
            title: 'Delete',
            size: 'md',
            keyId: 'delete',
            announce: 'delete, button'
          }]]
        }; // fixes type issue when assigned to KeyboardBase.formats
        var email = {
          uppercase: [['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', {
            title: 'Delete',
            size: 'md',
            keyId: 'delete',
            announce: 'delete, button'
          }], ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', {
            title: '#@!',
            size: 'md',
            toggle: 'symbols',
            announce: 'symbol mode, button',
            keyId: 'symbols'
          }], ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', '@', {
            title: 'áöû',
            size: 'md',
            toggle: 'accents',
            announce: 'accents, button',
            keyId: 'accents'
          }], ['Z', 'X', 'C', 'V', 'B', 'N', 'M', {
            title: '.',
            announce: 'period, button'
          }, {
            title: '-',
            announce: 'dash, button'
          }, {
            title: '_',
            announce: 'underscore, button'
          }, {
            title: 'shift',
            size: 'md',
            toggle: 'default',
            announce: 'shift off, button',
            keyId: 'shift'
          }], [{
            title: '.com',
            announce: 'dot, com',
            size: 'md'
          }, {
            title: '.net',
            announce: 'dot, net',
            size: 'md'
          }, {
            title: '.edu',
            announce: 'dot, edu',
            size: 'md'
          }, {
            title: '.org',
            announce: 'dot, org',
            size: 'md'
          }, {
            title: '.co',
            announce: 'dot, co',
            size: 'md'
          }, {
            title: '.uk',
            announce: 'dot, uk',
            size: 'md'
          }], [{
            title: 'Clear',
            size: 'lg',
            keyId: 'clear',
            announce: 'clear, button'
          }, {
            title: 'Space',
            size: 'xl',
            keyId: 'space',
            announce: 'space, button'
          }, {
            title: 'Done',
            size: 'lg',
            keyId: 'done',
            announce: 'done, button'
          }]],
          default: [['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', {
            title: 'Delete',
            size: 'md',
            keyId: 'delete',
            announce: 'delete, button'
          }], ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', {
            title: '#@!',
            size: 'md',
            toggle: 'symbols',
            announce: 'symbol mode, button',
            keyId: 'symbols'
          }], ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', '@', {
            title: 'áöû',
            size: 'md',
            toggle: 'accents',
            announce: 'accents, button',
            keyId: 'accents'
          }], ['z', 'x', 'c', 'v', 'b', 'n', 'm', {
            title: '_',
            announce: 'underscore, button'
          }, {
            title: '.',
            announce: 'period, button'
          }, {
            title: '-',
            announce: 'dash, button'
          }, {
            title: 'shift',
            size: 'md',
            toggle: 'uppercase',
            announce: 'shift on, button',
            keyId: 'shift'
          }], [{
            title: '.com',
            announce: 'dot, com',
            size: 'md'
          }, {
            title: '.net',
            announce: 'dot, net',
            size: 'md'
          }, {
            title: '.edu',
            announce: 'dot, edu',
            size: 'md'
          }, {
            title: '.org',
            announce: 'dot, org',
            size: 'md'
          }, {
            title: '.co',
            announce: 'dot, co',
            size: 'md'
          }, {
            title: '.uk',
            announce: 'dot, uk',
            size: 'md'
          }], [{
            title: 'Clear',
            size: 'lg',
            keyId: 'clear',
            announce: 'clear, button'
          }, {
            title: 'Space',
            size: 'xl',
            keyId: 'space',
            announce: 'space, button'
          }, {
            title: 'Done',
            size: 'lg',
            keyId: 'done',
            announce: 'done, button'
          }]],
          accents: [['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', {
            title: 'Delete',
            size: 'md',
            keyId: 'delete',
            announce: 'delete, button'
          }], ['ä', 'ë', 'ï', 'ö', 'ü', 'ÿ', 'à', 'è', 'ì', 'ò', {
            title: '#@!',
            size: 'md',
            toggle: 'symbols',
            announce: 'symbol mode, button',
            keyId: 'symbols'
          }], ['ù', 'á', 'é', 'í', 'ó', 'ú', 'ý', 'â', 'ê', '@', {
            title: 'abc',
            size: 'md',
            toggle: 'default',
            announce: 'alpha mode, button'
          }], ['î', 'ô', 'û', 'ã', 'ñ', {
            title: '_',
            announce: 'underscore, button'
          }, {
            title: '.',
            announce: 'period, button'
          }, {
            title: '-',
            announce: 'dash, button'
          }, {
            title: 'shift',
            size: 'xl',
            toggle: 'accentsUpper',
            announce: 'shift off, button',
            keyId: 'shift'
          }], [{
            title: '.com',
            announce: 'dot, com',
            size: 'md'
          }, {
            title: '.net',
            announce: 'dot, net',
            size: 'md'
          }, {
            title: '.edu',
            announce: 'dot, edu',
            size: 'md'
          }, {
            title: '.org',
            announce: 'dot, org',
            size: 'md'
          }, {
            title: '.co',
            announce: 'dot, co',
            size: 'md'
          }, {
            title: '.uk',
            announce: 'dot, uk',
            size: 'md'
          }], [{
            title: 'Clear',
            size: 'lg',
            keyId: 'clear',
            announce: 'clear, button'
          }, {
            title: 'Space',
            size: 'xl',
            keyId: 'space',
            announce: 'space, button'
          }, {
            title: 'Done',
            size: 'lg',
            keyId: 'done',
            announce: 'done, button'
          }]],
          accentsUpper: [['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', {
            title: 'Delete',
            size: 'md',
            keyId: 'delete',
            announce: 'delete, button'
          }], ['Ä', 'Ë', 'Ï', 'Ö', 'Ü', 'Ÿ', 'À', 'È', 'Ì', 'Ò', {
            title: '#@!',
            size: 'md',
            toggle: 'symbols',
            announce: 'symbol mode, button',
            keyId: 'symbols'
          }], ['Ù', 'Á', 'É', 'Í', 'Ó', 'Ú', 'Ý', 'Â', 'Ê', '@', {
            title: 'abc',
            size: 'md',
            toggle: 'default',
            announce: 'alpha mode, button'
          }], ['Î', 'Ô', 'Û', 'Ã', 'Ñ', {
            title: '.',
            announce: 'period, button'
          }, {
            title: '-',
            announce: 'dash, button'
          }, {
            title: '_',
            announce: 'underscore, button'
          }, {
            title: 'shift',
            size: 'xl',
            toggle: 'accents',
            announce: 'shift off, button',
            keyId: 'shift'
          }], [{
            title: '.com',
            announce: 'dot, com',
            size: 'md'
          }, {
            title: '.net',
            announce: 'dot, net',
            size: 'md'
          }, {
            title: '.edu',
            announce: 'dot, edu',
            size: 'md'
          }, {
            title: '.org',
            announce: 'dot, org',
            size: 'md'
          }, {
            title: '.co',
            announce: 'dot, co',
            size: 'md'
          }, {
            title: '.uk',
            announce: 'dot, uk',
            size: 'md'
          }], [{
            title: 'Clear',
            size: 'lg',
            keyId: 'clear',
            announce: 'clear, button'
          }, {
            title: 'Space',
            size: 'xl',
            keyId: 'space',
            announce: 'space, button'
          }, {
            title: 'Done',
            size: 'lg',
            keyId: 'done',
            announce: 'done, button'
          }]],
          symbols: [['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', {
            title: 'Delete',
            size: 'md',
            keyId: 'delete',
            announce: 'delete, button'
          }], [{
            title: '!',
            announce: 'exclamation, button'
          }, '@', '#', '$', '%', {
            title: '^',
            announce: 'caret circumflex, button'
          }, '&', '*', {
            title: '(',
            announce: 'open parenthesis, button'
          }, {
            title: ')',
            announce: 'close parenthesis, button'
          }, {
            title: 'abc',
            size: 'md',
            toggle: 'default',
            announce: 'alpha mode, button'
          }], [{
            title: '{',
            announce: 'open brace, button'
          }, {
            title: '}',
            announce: 'close brace, button'
          }, {
            title: '[',
            announce: 'open bracket, button'
          }, {
            title: ']',
            announce: 'close bracket, button'
          }, {
            title: ';',
            announce: 'semicolon, button'
          }, {
            title: '"',
            announce: 'doublequote, button'
          }, {
            title: ',',
            announce: 'comma, button'
          }, {
            title: '|',
            announce: 'vertical bar, button'
          }, {
            title: '\\',
            announce: 'backslash, button'
          }, {
            title: '/',
            announce: 'forwardslash, button'
          }, {
            title: 'áöû',
            size: 'md',
            toggle: 'accents',
            announce: 'accents, button',
            keyId: 'accents'
          }], [{
            title: '<',
            announce: 'less than, button'
          }, {
            title: '>',
            announce: 'greater than, button'
          }, {
            title: '?',
            announce: 'question mark, button'
          }, {
            title: '=',
            announce: 'equal sign, button'
          }, {
            title: '`',
            announce: 'grave accent, button'
          }, {
            title: '~',
            announce: 'tilde, button'
          }, {
            title: '_',
            announce: 'underscore, button'
          }, {
            title: ':',
            announce: 'colon, button'
          }, {
            title: '-',
            announce: 'dash, button'
          }, {
            title: '+',
            announce: 'plus sign, button'
          }], [{
            title: '.com',
            announce: 'dot, com',
            size: 'md'
          }, {
            title: '.net',
            announce: 'dot, net',
            size: 'md'
          }, {
            title: '.edu',
            announce: 'dot, edu',
            size: 'md'
          }, {
            title: '.org',
            announce: 'dot, org',
            size: 'md'
          }, {
            title: '.co',
            announce: 'dot, co',
            size: 'md'
          }, {
            title: '.uk',
            announce: 'dot, uk',
            size: 'md'
          }], [{
            title: 'Clear',
            size: 'lg',
            keyId: 'clear',
            announce: 'clear, button'
          }, {
            title: 'Space',
            size: 'xl',
            keyId: 'space',
            announce: 'space, button'
          }, {
            title: 'Done',
            size: 'lg',
            keyId: 'done',
            announce: 'done, button'
          }]]
        };
        var fullscreen = {
          letters: [['', '', '', '', '', '', '', '', '', {
            title: '#@!',
            size: 'lg',
            toggle: 'symbols',
            announce: 'symbol mode, button',
            keyId: 'symbols'
          }, {
            title: 'Space',
            size: 'lg',
            keyId: 'space',
            announce: 'space, button'
          }, {
            title: 'Delete',
            size: 'md',
            keyId: 'delete',
            announce: 'delete, button'
          }, '', '', '', '', '', '', '', '', ''], ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']],
          symbols: [['', '', '', '', '', '', '', '', '', {
            title: 'ABC',
            size: 'lg',
            toggle: 'letters',
            announce: 'caps on, button'
          }, {
            title: 'Space',
            size: 'lg',
            keyId: 'space',
            announce: 'space, button'
          }, {
            title: 'Delete',
            size: 'md',
            keyId: 'delete',
            announce: 'delete, button'
          }, '', '', '', '', '', '', '', '', ''], ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', {
            title: '!',
            announce: 'exclamation, button'
          }, '@', '#', '$', '%', {
            title: '^',
            announce: 'caret circumflex, button'
          }, '&', '*', {
            title: '(',
            announce: 'open parenthesis, button'
          }, {
            title: ')',
            announce: 'close parenthesis, button'
          }, {
            title: '`',
            announce: 'grave accent, button'
          }, '~', '_', '.', '-', '+']]
        };
        var numbers = {
          default: [['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']]
        };
        var qwerty = {
          uppercase: [['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', {
            title: 'Delete',
            size: 'md',
            keyId: 'delete',
            announce: 'delete, button'
          }], ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', {
            title: '#@!',
            size: 'md',
            toggle: 'symbols',
            announce: 'symbol mode, button',
            keyId: 'symbols'
          }], ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', '@', {
            title: 'áöû',
            size: 'md',
            toggle: 'accents',
            announce: 'accents, button',
            keyId: 'accents'
          }], ['Z', 'X', 'C', 'V', 'B', 'N', 'M', {
            title: '.',
            announce: 'period, button'
          }, {
            title: '-',
            announce: 'dash, button'
          }, {
            title: '_',
            announce: 'underscore, button'
          }, {
            title: 'shift',
            size: 'md',
            toggle: 'default',
            announce: 'shift off, button',
            keyId: 'shift'
          }], [{
            title: 'Clear',
            size: 'lg',
            keyId: 'clear',
            announce: 'clear, button'
          }, {
            title: 'Space',
            size: 'xl',
            keyId: 'space',
            announce: 'space, button'
          }, {
            title: 'Done',
            size: 'lg',
            keyId: 'done',
            announce: 'done, button'
          }]],
          default: [['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', {
            title: 'Delete',
            size: 'md',
            keyId: 'delete',
            announce: 'delete, button'
          }], ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', {
            title: '#@!',
            size: 'md',
            toggle: 'symbols',
            announce: 'symbol mode, button',
            keyId: 'symbols'
          }], ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', '@', {
            title: 'áöû',
            size: 'md',
            toggle: 'accents',
            announce: 'accents, button',
            keyId: 'accents'
          }], ['z', 'x', 'c', 'v', 'b', 'n', 'm', {
            title: '_',
            announce: 'underscore, button'
          }, {
            title: '.',
            announce: 'period, button'
          }, {
            title: '-',
            announce: 'dash, button'
          }, {
            title: 'shift',
            size: 'md',
            toggle: 'uppercase',
            announce: 'shift on, button',
            keyId: 'shift'
          }], [{
            title: 'Clear',
            size: 'lg',
            keyId: 'clear',
            announce: 'clear, button'
          }, {
            title: 'Space',
            size: 'xl',
            keyId: 'space',
            announce: 'space, button'
          }, {
            title: 'Done',
            size: 'lg',
            keyId: 'done',
            announce: 'done, button'
          }]],
          accents: [['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', {
            title: 'Delete',
            size: 'md',
            keyId: 'delete',
            announce: 'delete, button'
          }], ['ä', 'ë', 'ï', 'ö', 'ü', 'ÿ', 'à', 'è', 'ì', 'ò', {
            title: '#@!',
            size: 'md',
            toggle: 'symbols',
            announce: 'symbol mode, button',
            keyId: 'symbols'
          }], ['ù', 'á', 'é', 'í', 'ó', 'ú', 'ý', 'â', 'ê', '@', {
            title: 'abc',
            size: 'md',
            toggle: 'default',
            announce: 'alpha mode, button'
          }], ['î', 'ô', 'û', 'ã', 'ñ', {
            title: '_',
            announce: 'underscore, button'
          }, {
            title: '.',
            announce: 'period, button'
          }, {
            title: '-',
            announce: 'dash, button'
          }, {
            title: 'shift',
            size: 'xl',
            toggle: 'accentsUpper',
            announce: 'shift off, button',
            keyId: 'shift'
          }], [{
            title: 'Clear',
            size: 'lg',
            keyId: 'clear',
            announce: 'clear, button'
          }, {
            title: 'Space',
            size: 'xl',
            keyId: 'space',
            announce: 'space, button'
          }, {
            title: 'Done',
            size: 'lg',
            keyId: 'done',
            announce: 'done, button'
          }]],
          accentsUpper: [['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', {
            title: 'Delete',
            size: 'md',
            keyId: 'delete',
            announce: 'delete, button'
          }], ['Ä', 'Ë', 'Ï', 'Ö', 'Ü', 'Ÿ', 'À', 'È', 'Ì', 'Ò', {
            title: '#@!',
            size: 'md',
            toggle: 'symbols',
            announce: 'symbol mode, button',
            keyId: 'symbols'
          }], ['Ù', 'Á', 'É', 'Í', 'Ó', 'Ú', 'Ý', 'Â', 'Ê', '@', {
            title: 'abc',
            size: 'md',
            toggle: 'default',
            announce: 'alpha mode, button'
          }], ['Î', 'Ô', 'Û', 'Ã', 'Ñ', {
            title: '.',
            announce: 'period, button'
          }, {
            title: '-',
            announce: 'dash, button'
          }, {
            title: '_',
            announce: 'underscore, button'
          }, {
            title: 'shift',
            size: 'xl',
            toggle: 'accents',
            announce: 'shift off, button',
            keyId: 'shift'
          }], [{
            title: 'Clear',
            size: 'lg',
            keyId: 'clear',
            announce: 'clear, button'
          }, {
            title: 'Space',
            size: 'xl',
            keyId: 'space',
            announce: 'space, button'
          }, {
            title: 'Done',
            size: 'lg',
            keyId: 'done',
            announce: 'done, button'
          }]],
          symbols: [['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', {
            title: 'Delete',
            size: 'md',
            keyId: 'delete',
            announce: 'delete, button'
          }], [{
            title: '!',
            announce: 'exclamation, button'
          }, '@', '#', '$', '%', {
            title: '^',
            announce: 'caret circumflex, button'
          }, '&', '*', {
            title: '(',
            announce: 'open parenthesis, button'
          }, {
            title: ')',
            announce: 'close parenthesis, button'
          }, {
            title: 'abc',
            size: 'md',
            toggle: 'default',
            announce: 'alpha mode, button'
          }], [{
            title: '{',
            announce: 'open brace, button'
          }, {
            title: '}',
            announce: 'close brace, button'
          }, {
            title: '[',
            announce: 'open bracket, button'
          }, {
            title: ']',
            announce: 'close bracket, button'
          }, {
            title: ';',
            announce: 'semicolon, button'
          }, {
            title: '"',
            announce: 'doublequote, button'
          }, {
            title: ',',
            announce: 'comma, button'
          }, {
            title: '|',
            announce: 'vertical bar, button'
          }, {
            title: '\\',
            announce: 'backslash, button'
          }, {
            title: '/',
            announce: 'forwardslash, button'
          }, {
            title: 'áöû',
            size: 'md',
            toggle: 'accents',
            announce: 'accents, button',
            keyId: 'accents'
          }], [{
            title: '<',
            announce: 'less than, button'
          }, {
            title: '>',
            announce: 'greater than, button'
          }, {
            title: '?',
            announce: 'question mark, button'
          }, {
            title: '=',
            announce: 'equal sign, button'
          }, {
            title: '`',
            announce: 'grave accent, button'
          }, {
            title: '~',
            announce: 'tilde, button'
          }, {
            title: '_',
            announce: 'underscore, button'
          }, {
            title: ':',
            announce: 'colon, button'
          }, {
            title: '-',
            announce: 'dash, button'
          }, {
            title: '+',
            announce: 'plus sign, button'
          }], [{
            title: 'Clear',
            size: 'lg',
            keyId: 'clear',
            announce: 'clear, button'
          }, {
            title: 'Space',
            size: 'xl',
            keyId: 'space',
            announce: 'space, button'
          }, {
            title: 'Done',
            size: 'lg',
            keyId: 'done',
            announce: 'done, button'
          }]]
        };
        var search = {
          uppercase: [['A', 'B', 'C', 'D', 'E', 'F'], ['G', 'H', 'I', 'J', 'K', 'L'], ['M', 'N', 'O', 'P', 'Q', 'R'], ['S', 'T', 'U', 'V', 'W', 'X'], ['Y', 'Z', {
            title: '1',
            keyId: 'number'
          }, {
            title: '2',
            keyId: 'number'
          }, {
            title: '3',
            keyId: 'number'
          }, {
            title: '4',
            keyId: 'number'
          }], [{
            title: '5',
            keyId: 'number'
          }, {
            title: '6',
            keyId: 'number'
          }, {
            title: '7',
            keyId: 'number'
          }, {
            title: '8',
            keyId: 'number'
          }, {
            title: '9',
            keyId: 'number'
          }, {
            title: '0',
            keyId: 'number'
          }], [{
            title: 'Space',
            size: 'xl',
            keyId: 'space',
            announce: 'space, button'
          }, {
            title: 'Delete',
            size: 'md',
            keyId: 'delete',
            announce: 'delete, button'
          }]]
        };
        var simple = {
          default: [['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', {
            title: 'Delete',
            size: 'md'
          }], ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'], ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'], ['z', 'x', 'c', 'v', 'b', 'n', 'm'], [{
            title: 'Clear',
            size: 'lg'
          }, {
            title: 'Space',
            size: 'xl'
          }, {
            title: 'Done',
            size: 'lg'
          }]]
        };
        var formats = {
          dialpad: dialpad,
          dialpadExtended: dialpadExtended,
          email: email,
          fullscreen: fullscreen,
          numbers: numbers,
          qwerty: qwerty,
          search: search,
          simple: simple
        };
        var Keyboard = function Keyboard(props) {
          return createComponent(KeyboardBase, mergeProps(props, {
            get formats() {
              return formats.simple;
            }
          }));
        };
        var TextPage = exports("default", function () {
          var Title = {
            fontSize: 42,
            fontWeight: "bold"
          };
          var formats = {
            uppercase: [["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", {
              title: "Delete",
              size: "md",
              keyId: "delete",
              announce: "delete, button"
            }], ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", {
              title: "#@!",
              size: "md",
              toggle: "symbols",
              announce: "symbol mode, button",
              keyId: "symbols"
            }], ["A", "S", "D", "F", "G", "H", "J", "K", "L", "@", {
              title: "áöû",
              size: "md",
              toggle: "accents",
              announce: "accents, button",
              keyId: "accents"
            }], ["Z", "X", "C", "V", "B", "N", "M", {
              title: ".",
              announce: "period, button"
            }, {
              title: "-",
              announce: "dash, button"
            }, {
              title: "_",
              announce: "underscore, button"
            }, {
              title: "shift",
              size: "md",
              toggle: "default",
              announce: "shift off, button",
              keyId: "shift"
            }], [{
              title: ".com",
              announce: "dot, com",
              size: "md"
            }, {
              title: ".net",
              announce: "dot, net",
              size: "md"
            }, {
              title: ".edu",
              announce: "dot, edu",
              size: "md"
            }, {
              title: ".org",
              announce: "dot, org",
              size: "md"
            }, {
              title: ".co",
              announce: "dot, co",
              size: "md"
            }, {
              title: ".uk",
              announce: "dot, uk",
              size: "md"
            }], [{
              title: "Clear",
              size: "lg",
              keyId: "clear",
              announce: "clear, button"
            }, {
              title: "Space",
              size: "xl",
              keyId: "space",
              announce: "space, button"
            }, {
              title: "Done",
              size: "lg",
              keyId: "done",
              announce: "done, button"
            }]],
            default: [["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", {
              title: "Delete",
              size: "md",
              keyId: "delete",
              announce: "delete, button"
            }], ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", {
              title: "#@!",
              size: "md",
              toggle: "symbols",
              announce: "symbol mode, button",
              keyId: "symbols"
            }], ["a", "s", "d", "f", "g", "h", "j", "k", "l", "@", {
              title: "áöû",
              size: "md",
              toggle: "accents",
              announce: "accents, button",
              keyId: "accents"
            }], ["z", "x", "c", "v", "b", "n", "m", {
              title: "_",
              announce: "underscore, button"
            }, {
              title: ".",
              announce: "period, button"
            }, {
              title: "-",
              announce: "dash, button"
            }, {
              title: "shift",
              size: "md",
              toggle: "uppercase",
              announce: "shift on, button",
              keyId: "shift"
            }], [{
              title: ".com",
              announce: "dot, com",
              size: "md"
            }, {
              title: ".net",
              announce: "dot, net",
              size: "md"
            }, {
              title: ".edu",
              announce: "dot, edu",
              size: "md"
            }, {
              title: ".org",
              announce: "dot, org",
              size: "md"
            }, {
              title: ".co",
              announce: "dot, co",
              size: "md"
            }, {
              title: ".uk",
              announce: "dot, uk",
              size: "md"
            }], [{
              title: "Clear",
              size: "lg",
              keyId: "clear",
              announce: "clear, button"
            }, {
              title: "Space",
              size: "xl",
              keyId: "space",
              announce: "space, button"
            }, {
              title: "Done",
              size: "lg",
              keyId: "done",
              announce: "done, button"
            }]]
          };
          var keyEvent = createSignal("");
          var titleSignal = createSignal("");
          onMount(function () {
            setGlobalBackground(0x000000FF);
          });
          return createComponent(View, {
            width: 1080,
            x: 350,
            y: 100,
            get children() {
              return createComponent(Column$1, {
                autofocus: true,
                selected: 1,
                scroll: "none",
                get children() {
                  return [createComponent(Text, {
                    skipFocus: true,
                    style: Title,
                    children: "Username"
                  }), createComponent(Input, {
                    titleSignal: titleSignal,
                    keyEvent: keyEvent
                  }), createComponent(Keyboard, {
                    formats: formats,
                    keySignal: keyEvent
                  })];
                }
              });
            }
          });
        });
      }
    };
  });
})();
