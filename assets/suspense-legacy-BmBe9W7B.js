;
(function () {
  function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
  function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
  function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
  function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
  function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
  function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
  function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
  function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
  function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
  System.register(['./index-legacy-D9OLUiaf.js'], function (exports, module) {
    'use strict';

    var setGlobalBackground, createResource, createElement, setProp, insert, createComponent, Suspense, createTextNode, insertNode, use, createSignal, onMount, onCleanup, createEffect;
    return {
      setters: [function (module) {
        setGlobalBackground = module.s;
        createResource = module.a;
        createElement = module.k;
        setProp = module.a4;
        insert = module.p;
        createComponent = module.h;
        Suspense = module.a9;
        createTextNode = module.aa;
        insertNode = module.a5;
        use = module.u;
        createSignal = module.c;
        onMount = module.g;
        onCleanup = module.H;
        createEffect = module.f;
      }],
      execute: function execute() {
        exports("default", SuspensePage);
        function fadeIn(el) {
          el.alpha = 0;
          el.animate({
            alpha: 1
          }, {
            duration: 250,
            easing: "ease-in-out"
          }).start();
        }
        function fadeOut(el) {
          return el.animate({
            alpha: 0
          }, {
            duration: 250,
            easing: "ease-in-out"
          }).start().waitUntilStopped();
        }
        function SuspensePage() {
          setGlobalBackground(0x000000FF);
          var lastCount = 0;
          var _createResource = createResource(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
              return _regenerator().w(function (_context) {
                while (1) switch (_context.n) {
                  case 0:
                    _context.n = 1;
                    return new Promise(function (r) {
                      return setTimeout(r, 1600);
                    });
                  case 1:
                    return _context.a(2, ++lastCount);
                }
              }, _callee);
            }))),
            _createResource2 = _slicedToArray(_createResource, 2),
            data = _createResource2[0],
            refetch = _createResource2[1].refetch;
          return function () {
            var _el$ = createElement("view");
            setProp(_el$, "forwardFocus", 0);
            insert(_el$, createComponent(Suspense, {
              get fallback() {
                return function () {
                  var _el$6 = createElement("view"),
                    _el$7 = createElement("text");
                  insertNode(_el$6, _el$7);
                  setProp(_el$6, "onCreate", fadeIn);
                  setProp(_el$6, "onDestroy", fadeOut);
                  setProp(_el$6, "display", "flex");
                  setProp(_el$6, "center", true);
                  insertNode(_el$7, createTextNode("Loading..."));
                  return _el$6;
                }();
              },
              get children() {
                var _el$2 = createElement("view"),
                  _el$3 = createElement("text"),
                  _el$4 = createTextNode("Hello World"),
                  _el$5 = createTextNode(" (Press Enter to refetch)");
                insertNode(_el$2, _el$3);
                use(function (elm) {
                  var _createSignal = createSignal(0),
                    _createSignal2 = _slicedToArray(_createSignal, 2),
                    count = _createSignal2[0],
                    setCount = _createSignal2[1];
                  onMount(function () {
                    var interval = setInterval(function () {
                      setCount(function (prev) {
                        return prev + 1;
                      });
                    }, 200);
                    onCleanup(function () {
                      clearInterval(interval);
                      elm.destroy();
                    });
                  });
                  createEffect(function () {
                    console.log("count", count());
                  });
                }, _el$2);
                setProp(_el$2, "autofocus", true);
                setProp(_el$2, "preserve", true);
                setProp(_el$2, "onCreate", fadeIn);
                setProp(_el$2, "onRender", fadeIn);
                setProp(_el$2, "onRemove", fadeOut);
                setProp(_el$2, "onEnter", function () {
                  refetch();
                });
                setProp(_el$2, "display", "flex");
                setProp(_el$2, "center", true);
                insertNode(_el$3, _el$4);
                insertNode(_el$3, _el$5);
                insert(_el$3, function () {
                  var _data;
                  return "!".repeat((_data = data()) !== null && _data !== void 0 ? _data : 0);
                }, _el$5);
                return _el$2;
              }
            }));
            return _el$;
          }();
        }
      }
    };
  });
})();
