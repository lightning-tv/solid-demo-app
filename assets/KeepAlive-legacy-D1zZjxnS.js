;
(function () {
  function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
  function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
  function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
  function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
  function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
  System.register(['./index-legacy-BmJBK5sW.js'], function (exports, module) {
    'use strict';

    var createSignal, createElement, insertNode, setProp, insert, memo, createComponent, createRoot, getOwner, onCleanup, use, createEffect, effect, Config;
    return {
      setters: [function (module) {
        createSignal = module.c;
        createElement = module.l;
        insertNode = module._;
        setProp = module.a0;
        insert = module.r;
        memo = module.D;
        createComponent = module.h;
        createRoot = module.k;
        getOwner = module.a1;
        onCleanup = module.j;
        use = module.p;
        createEffect = module.f;
        effect = module.a2;
        Config = module.a3;
      }],
      execute: function execute() {
        exports("default", KeepAlivePage);
        function createPersistentComponent(fn) {
          var result;
          var owner;
          var dispose = null;
          var _createSignal = createSignal(null),
            _createSignal2 = _slicedToArray(_createSignal, 2),
            props = _createSignal2[0],
            setProps = _createSignal2[1];
          var detachedOwner = getOwner();
          return function (p) {
            setProps(function () {
              return p;
            });
            if (dispose == null) {
              createRoot(function (d) {
                dispose = d;
                result = fn(props);
              }, detachedOwner);
            }
            var o = owner = getOwner();
            onCleanup(function () {
              queueMicrotask(function () {
                if (dispose != null && owner === o) {
                  dispose();
                  dispose = owner = result = null;
                }
              });
            });
            return result;
          };
        }
        function getElementRect(el) {
          var width = el.width,
            height = el.height;
          var x = 0,
            y = 0;
          if (el.scaleX != null) width *= el.scaleX;
          if (el.scaleY != null) height *= el.scaleY;
          var curr = el;
          while (curr != null) {
            x += curr.x;
            y += curr.y;
            if (curr.scaleX != null) {
              x += curr.width / 2 * (1 - curr.scaleX);
            }
            if (curr.scaleY != null) {
              y += curr.height / 2 * (1 - curr.scaleY);
            }
            curr = curr.parent;
          }
          if (Config.rendererOptions != null) {
            var dpr = Config.rendererOptions.deviceLogicalPixelRatio;
            if (dpr != null) {
              x *= dpr;
              y *= dpr;
              width *= dpr;
              height *= dpr;
            }
          }
          return {
            x: x,
            y: y,
            width: width,
            height: height
          };
        }
        function KeepAlivePage() {
          var _createSignal3 = createSignal(0),
            _createSignal4 = _slicedToArray(_createSignal3, 2),
            counter = _createSignal4[0],
            setCounter = _createSignal4[1];
          setInterval(function () {
            setCounter(function (prev) {
              return prev + 1;
            });
          }, 1e3);
          var Comp = createPersistentComponent(function (props) {
            return function () {
              var _el$ = createElement("view"),
                _el$2 = createElement("text");
              insertNode(_el$, _el$2);
              use(function (el) {
                createEffect(function (rect) {
                  props();
                  var r = getElementRect(el);
                  if (rect != null) {
                    var _el$lng$x, _el$lng$y;
                    el.lng.x = ((_el$lng$x = el.lng.x) !== null && _el$lng$x !== void 0 ? _el$lng$x : 0) - (r.x - rect.x);
                    el.lng.y = ((_el$lng$y = el.lng.y) !== null && _el$lng$y !== void 0 ? _el$lng$y : 0) - (r.y - rect.y);
                    el.animate({
                      x: Math.random() * 40,
                      y: Math.random() * 60,
                      alpha: 1
                    }, {
                      duration: 250,
                      easing: "ease-in-out"
                    }).start();
                  }
                  return r;
                });
              }, _el$);
              setProp(_el$, "height", 80);
              setProp(_el$, "width", 120);
              setProp(_el$, "onCreate", function (el) {
                el.alpha = 0;
                el.animate({
                  alpha: 1
                }, {
                  duration: 250,
                  easing: "ease-in-out"
                }).start();
              });
              setProp(_el$, "onDestroy", function (el) {
                el.rtt = true;
                return el.animate({
                  alpha: 0
                }, {
                  duration: 250,
                  easing: "ease-in-out"
                }).start().waitUntilStopped();
              });
              setProp(_el$2, "color", 4294967295);
              insert(_el$2, function () {
                return props().text;
              });
              effect(function (_p$) {
                var _v$ = Math.floor(Math.random() * 16777215) << 8 | 255,
                  _v$2 = Math.random() * 40,
                  _v$3 = Math.random() * 60;
                _v$ !== _p$.e && (_p$.e = setProp(_el$, "color", _v$, _p$.e));
                _v$2 !== _p$.t && (_p$.t = setProp(_el$, "x", _v$2, _p$.t));
                _v$3 !== _p$.a && (_p$.a = setProp(_el$, "y", _v$3, _p$.a));
                return _p$;
              }, {
                e: void 0,
                t: void 0,
                a: void 0
              });
              return _el$;
            }();
          });
          return function () {
            var _el$3 = createElement("view"),
              _el$4 = createElement("view"),
              _el$5 = createElement("view");
            insertNode(_el$3, _el$4);
            insertNode(_el$3, _el$5);
            setProp(_el$3, "display", "flex");
            setProp(_el$3, "flexDirection", "row");
            setProp(_el$4, "color", 286331391);
            setProp(_el$4, "width", 160);
            setProp(_el$4, "height", 160);
            insert(_el$4, function () {
              var _c$ = memo(function () {
                return counter() % 3 == 0;
              });
              return function () {
                return _c$() && createComponent(Comp, {
                  text: "one"
                });
              };
            }());
            setProp(_el$5, "color", 572662527);
            setProp(_el$5, "width", 160);
            setProp(_el$5, "height", 160);
            insert(_el$5, function () {
              var _c$2 = memo(function () {
                return counter() % 3 == 1;
              });
              return function () {
                return _c$2() && createComponent(Comp, {
                  text: "two"
                });
              };
            }());
            return _el$3;
          }();
        }
      }
    };
  });
})();
