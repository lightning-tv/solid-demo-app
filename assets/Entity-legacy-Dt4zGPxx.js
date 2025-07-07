;
(function () {
  function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
  function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
  function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
  function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
  function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
  System.register(['./index-legacy-CfYW3R4R.js'], function (exports, module) {
    'use strict';

    var createSignal, useNavigate, createEffect, on, setGlobalBackground, createComponent, Show, View, ContentBlock, Row, Button, Column, Text, styles, TileRow, memo, assertTruthy;
    return {
      setters: [function (module) {
        createSignal = module.c;
        useNavigate = module.y;
        createEffect = module.f;
        on = module.o;
        setGlobalBackground = module.s;
        createComponent = module.h;
        Show = module.S;
        View = module.V;
        ContentBlock = module.x;
        Row = module.R;
        Button = module.N;
        Column = module.C;
        Text = module.T;
        styles = module.O;
        TileRow = module.U;
        memo = module.D;
        assertTruthy = module.G;
      }],
      execute: function execute() {
        var Entity = exports("default", function (props) {
          var _createSignal = createSignal(0),
            _createSignal2 = _slicedToArray(_createSignal, 2),
            backdropAlpha = _createSignal2[0],
            setBackdropAlpha = _createSignal2[1];
          var _createSignal3 = createSignal(false),
            _createSignal4 = _slicedToArray(_createSignal3, 2),
            playFocused = _createSignal4[0],
            setPlayFocused = _createSignal4[1];
          var navigate = useNavigate();
          createEffect(on(props.data.entity, function (data) {
            setGlobalBackground(data.backgroundImage);
          }, {
            defer: true
          }));
          var columnY = 640;
          var Backdrop = {
            color: 0x000000FF,
            alpha: 0,
            width: 1900,
            height: 890,
            x: -160,
            y: columnY,
            borderRadius: 30
          };
          function onRowFocus() {
            this.children[this.selected || 0].setFocus();
            columnRef.y = columnY;
            backdropRef.y = columnY;
            backdropRef.alpha = 0;
          }
          function onRowFocusAnimate() {
            this.children[this.selected || 0].setFocus();
            columnRef.y = 200;
            backdropRef.y = 160;
            backdropRef.alpha = 0.9;
          }
          function onEnter() {
            var _entity$item;
            var entity = this.children.find(function (c) {
              return c.states.has("focus");
            });
            assertTruthy(entity && ((_entity$item = entity.item) === null || _entity$item === void 0 ? void 0 : _entity$item.href));
            navigate(entity.item.href);
          }
          function onEscape() {
            document.getElementsByTagName("canvas")[0].focus();
            entityActions.setFocus();
            setBackdropAlpha(0);
          }
          function onEnterTrailer() {
            navigate("/player/123");
          }
          var columnRef, backdropRef, entityActions;
          return createComponent(Show, {
            get when() {
              return props.data.entity();
            },
            get children() {
              return [createComponent(View, {
                x: 170,
                onUp: function onUp() {
                  return entityActions.setFocus();
                },
                onEscape: onEscape,
                get announce() {
                  return [props.data.entity().heroContent.title, "PAUSE-1", props.data.entity().heroContent.description];
                },
                announceContext: "Press LEFT or RIGHT to review items, press UP or DOWN to review categories, press CENTER to select",
                get children() {
                  return [createComponent(ContentBlock, {
                    y: 260,
                    get marquee() {
                      return playFocused();
                    },
                    get content() {
                      return props.data.entity().heroContent;
                    }
                  }), createComponent(Row, {
                    ref: function ref(r$) {
                      var _ref$ = entityActions;
                      typeof _ref$ === "function" ? _ref$(r$) : entityActions = r$;
                    },
                    y: 500,
                    scroll: "none",
                    height: 90,
                    width: 640,
                    gap: 40,
                    onDown: function onDown() {
                      return columnRef.setFocus();
                    },
                    onEnter: onEnterTrailer,
                    get children() {
                      return [createComponent(Button, {
                        width: 300,
                        get autofocus() {
                          return props.data.entity();
                        },
                        onFocusChanged: setPlayFocused,
                        children: "Play"
                      }), createComponent(Button, {
                        width: 300,
                        children: "Resume"
                      })];
                    }
                  }), createComponent(Column, {
                    ref: function ref(r$) {
                      var _ref$2 = columnRef;
                      typeof _ref$2 === "function" ? _ref$2(r$) : columnRef = r$;
                    },
                    x: 0,
                    y: columnY,
                    get style() {
                      return styles.Column;
                    },
                    height: 880,
                    scroll: "none",
                    zIndex: 5,
                    get children() {
                      return createComponent(Show, {
                        get when() {
                          return memo(function () {
                            return !!props.data.recommendations();
                          })() && props.data.credits();
                        },
                        get children() {
                          return [createComponent(Text, {
                            skipFocus: true,
                            get style() {
                              return styles.RowTitle;
                            },
                            children: "Recommendations"
                          }), createComponent(TileRow, {
                            onFocus: onRowFocus,
                            onEnter: onEnter,
                            announce: "Recommendations",
                            get items() {
                              return props.data.recommendations();
                            },
                            width: 1620
                          }), createComponent(Text, {
                            skipFocus: true,
                            get style() {
                              return styles.RowTitle;
                            },
                            children: "Cast and Crew"
                          }), createComponent(TileRow, {
                            announce: "Cast and Crew",
                            onFocus: onRowFocusAnimate,
                            onEnter: onEnter,
                            get items() {
                              return props.data.credits();
                            },
                            width: 1620
                          })];
                        }
                      });
                    }
                  }), createComponent(View, {
                    ref: function ref(r$) {
                      var _ref$3 = backdropRef;
                      typeof _ref$3 === "function" ? _ref$3(r$) : backdropRef = r$;
                    },
                    style: Backdrop,
                    transition: {
                      alpha: true,
                      y: true
                    }
                  })];
                }
              }), createComponent(View, {
                get alpha() {
                  return backdropAlpha();
                },
                color: 0x000000FF,
                skipFocus: true,
                zIndex: 200,
                transition: {
                  alpha: true
                }
              })];
            }
          });
        });
      }
    };
  });
})();
