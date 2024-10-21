;
(function () {
  function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
  function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
  function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
  function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
  function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
  System.register(['./index-legacy-C-LxdsFU.js'], function (exports, module) {
    'use strict';

    var setGlobalBackground, createSignal, createComponent, View;
    return {
      setters: [function (module) {
        setGlobalBackground = module.s;
        createSignal = module.c;
        createComponent = module.h;
        View = module.V;
      }],
      execute: function execute() {
        var Default = exports("default", function () {
          setGlobalBackground(0x1E293BFF);
          var _createSignal = createSignal(50),
            _createSignal2 = _slicedToArray(_createSignal, 2),
            y = _createSignal2[0],
            setY = _createSignal2[1];
          setTimeout(function () {
            setY(1080 - 50 - 200);
          }, 750);
          function onStart() {
            console.log("start");
          }
          function onEnd() {
            console.log("end");
          }
          return createComponent(View, {
            x: 150,
            autofocus: true,
            get children() {
              return [createComponent(View, {
                width: 200,
                height: 200,
                x: 50,
                get y() {
                  return y();
                },
                color: 0xDBEAFEFF,
                transition: true
              }), createComponent(View, {
                width: 200,
                height: 200,
                x: 300,
                get y() {
                  return y();
                },
                color: 0xBFDBFEFF,
                transition: {
                  y: true
                }
              }), createComponent(View, {
                width: 200,
                height: 200,
                x: 550,
                get y() {
                  return y();
                },
                color: 0x93C5FDFF,
                transition: {
                  y: {
                    duration: 1e3
                  }
                },
                onAnimationStarted: onStart,
                onAnimationFinished: onEnd
              }), createComponent(View, {
                width: 200,
                height: 200,
                x: 800,
                get y() {
                  return y();
                },
                color: 0x60A5FAFF,
                transition: {
                  y: {
                    duration: 500,
                    delay: 1e3
                  }
                },
                onAnimationStarted: onStart,
                onAnimationFinished: onEnd
              }), createComponent(View, {
                width: 200,
                height: 200,
                x: 1050,
                get y() {
                  return y();
                },
                color: 0x3B82F6FF,
                transition: {
                  y: {
                    duration: 500,
                    easing: "ease-in-out"
                  }
                },
                onAnimationFinished: onEnd
              }), createComponent(View, {
                width: 200,
                height: 200,
                x: 1300,
                get y() {
                  return y();
                },
                color: 0x2563EBFF,
                transition: {
                  y: {
                    duration: 3e3,
                    easing: "ease-in-out-back"
                  }
                },
                onAnimationFinished: onEnd
              }), createComponent(View, {
                width: 200,
                height: 200,
                x: 1550,
                get y() {
                  return y();
                },
                color: 0x1E3A8AFF,
                transition: {
                  y: {
                    duration: 800,
                    easing: "cubic-bezier(1,-0.64,.39,1.44)"
                  }
                }
              })];
            }
          });
        });
      }
    };
  });
})();
