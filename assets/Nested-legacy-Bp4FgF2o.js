;
(function () {
  function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
  function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
  function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
  function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
  function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
  System.register(['./index-legacy-BrGESeG6.js'], function (exports, module) {
    'use strict';

    var setGlobalBackground, createSignal, createComponent, Column, createElement, setProp, insert, Button, effect;
    return {
      setters: [function (module) {
        setGlobalBackground = module.s;
        createSignal = module.a;
        createComponent = module.c;
        Column = module.C;
        createElement = module.l;
        setProp = module.a4;
        insert = module.r;
        Button = module.Q;
        effect = module.a6;
      }],
      execute: function execute() {
        var NestedButtonColumns = exports("default", function () {
          setGlobalBackground(0x333333FF);
          var styles = {
            container: {
              x: 400,
              width: 400,
              height: 1080,
              color: 0x999999FF,
              display: "flex",
              flexDirection: "column",
              // Arranges columns horizontally
              justifyContent: "spaceBetween",
              // Distributes columns evenly
              padding: 10
            }
          };
          var _createSignal = createSignal(0),
            _createSignal2 = _slicedToArray(_createSignal, 2),
            currentIndex = _createSignal2[0],
            setCurrentIndex = _createSignal2[1];
          return createComponent(Column, {
            get style() {
              return styles.container;
            },
            scroll: "none",
            get children() {
              return [function () {
                var _el$ = createElement("view");
                setProp(_el$, "forwardFocus", 0);
                setProp(_el$, "clipping", true);
                setProp(_el$, "height", 600);
                setProp(_el$, "x", 50);
                insert(_el$, createComponent(Column, {
                  scrollIndex: 3,
                  onSelectedChanged: setCurrentIndex,
                  get children() {
                    return [createComponent(Button, {
                      title: "Button 1A",
                      autofocus: true,
                      onEnter: function onEnter() {
                        return console.log("Button 1A pressed");
                      }
                    }), createComponent(Button, {
                      title: "Button 1B",
                      onEnter: function onEnter() {
                        return console.log("Button 1B pressed");
                      }
                    }), createComponent(Button, {
                      title: "Button 1C",
                      onEnter: function onEnter() {
                        return console.log("Button 1C pressed");
                      }
                    }), createComponent(Button, {
                      title: "Button 1D",
                      onEnter: function onEnter() {
                        return console.log("Button 1C pressed");
                      }
                    }), createComponent(Button, {
                      title: "Button 1E",
                      onEnter: function onEnter() {
                        return console.log("Button 1C pressed");
                      }
                    }), createComponent(Button, {
                      title: "Button 1F",
                      onEnter: function onEnter() {
                        return console.log("Button 1C pressed");
                      }
                    }), createComponent(Button, {
                      title: "Button 1G",
                      onEnter: function onEnter() {
                        return console.log("Button 1C pressed");
                      }
                    }), createComponent(Button, {
                      title: "Button 1H",
                      onEnter: function onEnter() {
                        return console.log("Button 1C pressed");
                      }
                    })];
                  }
                }));
                return _el$;
              }(), function () {
                var _el$2 = createElement("view");
                setProp(_el$2, "colorTop", 2576980479);
                setProp(_el$2, "colorBottom", 2576980224);
                setProp(_el$2, "height", 100);
                setProp(_el$2, "y", 10);
                setProp(_el$2, "skipFocus", true);
                setProp(_el$2, "flexItem", false);
                effect(function (_$p) {
                  return setProp(_el$2, "alpha", currentIndex() > 0 ? 1 : 0, _$p);
                });
                return _el$2;
              }(), function () {
                var _el$3 = createElement("view");
                setProp(_el$3, "colorTop", 2576980224);
                setProp(_el$3, "colorBottom", 2576980479);
                setProp(_el$3, "height", 100);
                setProp(_el$3, "y", 510);
                setProp(_el$3, "skipFocus", true);
                setProp(_el$3, "flexItem", false);
                effect(function (_$p) {
                  return setProp(_el$3, "alpha", currentIndex() === 7 ? 0 : 1, _$p);
                });
                return _el$3;
              }(), function () {
                var _el$4 = createElement("view");
                setProp(_el$4, "height", 4);
                setProp(_el$4, "color", 0xC3C3C3FF);
                setProp(_el$4, "skipFocus", true);
                return _el$4;
              }(), function () {
                var _el$5 = createElement("view");
                setProp(_el$5, "forwardFocus", 0);
                setProp(_el$5, "clipping", true);
                setProp(_el$5, "height", 400);
                setProp(_el$5, "x", 50);
                insert(_el$5, createComponent(Column, {
                  get children() {
                    return [createComponent(Button, {
                      title: "Button 3A",
                      onEnter: function onEnter() {
                        return console.log("Button 3A pressed");
                      }
                    }), createComponent(Button, {
                      title: "Button 3B",
                      onEnter: function onEnter() {
                        return console.log("Button 3B pressed");
                      }
                    }), createComponent(Button, {
                      title: "Button 3C",
                      onEnter: function onEnter() {
                        return console.log("Button 3C pressed");
                      }
                    })];
                  }
                }));
                return _el$5;
              }()];
            }
          });
        });
      }
    };
  });
})();
