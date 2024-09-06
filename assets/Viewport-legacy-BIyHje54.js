;
(function () {
  function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
  function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
  function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
  function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
  function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
  System.register(['./index-legacy-C0ZcyP8s.js'], function (exports, module) {
    'use strict';

    var createSignal, onMount, onCleanup, createComponent, View, Text, setGlobalBackground;
    return {
      setters: [module => {
        createSignal = module.c;
        onMount = module.g;
        onCleanup = module.p;
        createComponent = module.h;
        View = module.V;
        Text = module.T;
        setGlobalBackground = module.s;
      }],
      execute: function execute() {
        var Viewport = exports("default", () => {
          var ball, invervalTimer;
          var _createSignal = createSignal([]),
            _createSignal2 = _slicedToArray(_createSignal, 2),
            ballStatus = _createSignal2[0],
            setBallStatus = _createSignal2[1];
          var styleBall = {
            width: 100,
            height: 100,
            x: -400,
            y: -400,
            rotation: 0,
            borderRadius: 50,
            color: 0x4287F5FF,
            transition: {
              x: {
                duration: 1250,
                easing: "linear"
              },
              y: {
                duration: 1250,
                easing: "linear"
              },
              rotation: {
                duration: 1400,
                easing: "ease-in-out"
              }
            }
          };
          var Title = {
            fontSize: 32,
            x: 960,
            y: 540,
            mount: 0.5,
            lineheight: 52
          };
          var randomIntBetween = (from, to) => Math.floor(Math.random() * (to - from + 1) + from);
          onMount(() => {
            setGlobalBackground(0x000000FF);
            ball.x = (1920 - 100) / 2;
            ball.y = (1080 - 100) / 2;
            invervalTimer = setInterval(() => {
              ball.rotation = randomIntBetween(-90, 90);
              ball.x = randomIntBetween(-300, 2220);
              ball.y = randomIntBetween(-300, 1380);
            }, 2500);
          });
          function logEvent(name, elm) {
            setBallStatus(prev => {
              return [...prev, name].slice(-4);
            });
            console.log(name);
          }
          onCleanup(() => {
            clearInterval(invervalTimer);
          });
          return createComponent(View, {
            get children() {
              return [createComponent(Text, {
                style: Title,
                get children() {
                  return ballStatus().join("\n");
                }
              }), createComponent(View, {
                autofocus: true,
                style: styleBall,
                ref(r$) {
                  var _ref$ = ball;
                  typeof _ref$ === "function" ? _ref$(r$) : ball = r$;
                },
                onEvents: [["inBounds", elm => logEvent("inBounds")], ["outOfBounds", elm => logEvent("outOfBounds")], ["inViewport", elm => logEvent("inViewport")], ["outOfViewport", elm => logEvent("outOfViewport")]]
              })];
            }
          });
        });
      }
    };
  });
})();
//# sourceMappingURL=Viewport-legacy-BIyHje54.js.map
