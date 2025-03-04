;
(function () {
  function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
  function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
  function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
  function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
  function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
  System.register(['./index-legacy-xPoyTx9F.js', './index-legacy-BWs8kLCt.js'], function (exports, module) {
    'use strict';

    var splitProps, createSignal, createEffect, createMemo, createComponent, Show, Dynamic, mergeProps, Index, setGlobalBackground, View, Text, Column, Row, For, Poster, List;
    return {
      setters: [function (module) {
        splitProps = module.i;
        createSignal = module.c;
        createEffect = module.f;
        createMemo = module.j;
        createComponent = module.h;
        Show = module.S;
        Dynamic = module.D;
        mergeProps = module.m;
        Index = module.I;
        setGlobalBackground = module.s;
        View = module.V;
        Text = module.T;
        Column = module.C;
        Row = module.R;
        For = module.F;
        Poster = module.P;
      }, function (module) {
        List = module.L;
      }],
      execute: function execute() {
        function LazyUp(props) {
          var _splitProps = splitProps(props, ["component", "each", "fallback", "children"]),
            _splitProps2 = _slicedToArray(_splitProps, 2),
            p = _splitProps2[0],
            others = _splitProps2[1];
          var _createSignal = createSignal(0),
            _createSignal2 = _slicedToArray(_createSignal, 2),
            offset = _createSignal2[0],
            setOffset = _createSignal2[1];
          createEffect(function () {
            setOffset(props.selected || 0);
          });
          var items = createMemo(function () {
            if (p.each) {
              return p.each.slice(0, props.upCount + offset());
            }
          });
          console.log("LazyUp is deprecated. Please use LazyRow or LazyColumn instead.");
          var isRow = createMemo(function () {
            var _others$style;
            return others.direction !== undefined && others.direction === "row" || ((_others$style = others.style) === null || _others$style === void 0 ? void 0 : _others$style.flexDirection) === "row" || others.flexDirection === "row";
          });
          var keyHandlers = createMemo(function () {
            var updateOffset = function updateOffset() {
              setOffset(function (prev) {
                return p.each && Math.min(prev + 1, p.each.length - props.upCount);
              });
            };
            return isRow() ? {
              onRight: updateOffset
            } : {
              onDown: updateOffset
            };
          });
          return createComponent(Show, {
            get when() {
              return items();
            },
            get children() {
              return createComponent(Dynamic, mergeProps({
                get component() {
                  return p.component;
                }
              }, others, keyHandlers, {
                get children() {
                  return createComponent(Index, {
                    get each() {
                      return items();
                    },
                    get fallback() {
                      return p.fallback;
                    },
                    get children() {
                      return p.children;
                    }
                  });
                }
              }));
            }
          });
        }
        var Loops = exports("default", function (props) {
          var _createSignal3 = createSignal(props.data.rows[0]),
            _createSignal4 = _slicedToArray(_createSignal3, 2),
            activeRow = _createSignal4[0],
            setActiveRow = _createSignal4[1];
          var currentIndex = 0,
            solidLogo;
          setGlobalBackground(0x000000FF);
          var titleRowStyles = {
            fontFamily: "Raleway",
            fontSize: 24,
            height: 32,
            lineHeight: 32
          };
          function switchRow(e) {
            if (e.key === "[") {
              currentIndex = Math.max(0, currentIndex - 1);
            }
            if (e.key === "]") {
              currentIndex = Math.min(props.data.rows.length - 1, currentIndex + 1);
            }
            if (e.key === "\\") {
              var row = props.data.rows[0];
              var items = row.items().slice().reverse();
              row.setItems(items);
              return;
            }
            setActiveRow(props.data.rows[currentIndex]);
          }
          return [createComponent(View, {
            ref: function ref(r$) {
              var _ref$ = solidLogo;
              typeof _ref$ === "function" ? _ref$(r$) : solidLogo = r$;
            },
            width: 300,
            height: 150,
            x: 162,
            y: 80,
            zIndex: 105,
            get children() {
              return [createComponent(Text, {
                x: 80,
                fontSize: 28,
                color: 4143380121,
                children: "Built With:"
              }), createComponent(View, {
                y: 32,
                src: "./assets/solidWord.png",
                width: 280,
                height: 52
              }), createComponent(View, {
                x: 0,
                y: 110,
                src: "./assets/tmdb.png",
                width: 80,
                height: 41
              }), createComponent(Text, {
                x: 90,
                y: 110,
                contain: "width",
                width: 160,
                fontSize: 12,
                color: 4143380121,
                children: "This product uses the TMDB API but is not endorsed or certified by TMDB."
              })];
            }
          }), createComponent(Column, {
            get autofocus() {
              var _activeRow;
              return (_activeRow = activeRow()) === null || _activeRow === void 0 ? void 0 : _activeRow.items();
            },
            y: 240,
            onKeyPress: switchRow,
            get children() {
              return [createComponent(View, {
                x: 160,
                height: 300,
                forwardFocus: 1,
                marginTop: 30,
                get children() {
                  return [createComponent(Text, {
                    skipFocus: true,
                    style: titleRowStyles,
                    children: "For Loop"
                  }), createComponent(Row, {
                    gap: 20,
                    y: 40,
                    display: "block",
                    get children() {
                      return createComponent(For, {
                        get each() {
                          var _activeRow2;
                          return (_activeRow2 = activeRow()) === null || _activeRow2 === void 0 ? void 0 : _activeRow2.items();
                        },
                        children: function children(item, index) {
                          return createComponent(Poster, mergeProps({
                            get x() {
                              return index() * 210;
                            }
                          }, item));
                        }
                      });
                    }
                  })];
                }
              }), createComponent(View, {
                x: 160,
                height: 300,
                forwardFocus: 1,
                marginTop: 30,
                get children() {
                  return [createComponent(Text, {
                    skipFocus: true,
                    style: titleRowStyles,
                    children: "Map Loop"
                  }), createComponent(Row, {
                    gap: 20,
                    y: 40,
                    display: "block",
                    get children() {
                      var _activeRow3;
                      return (_activeRow3 = activeRow()) === null || _activeRow3 === void 0 || (_activeRow3 = _activeRow3.items()) === null || _activeRow3 === void 0 ? void 0 : _activeRow3.map(function (item, index) {
                        return createComponent(Poster, mergeProps({
                          x: index * 210
                        }, item));
                      });
                    }
                  })];
                }
              }), createComponent(View, {
                x: 160,
                height: 300,
                forwardFocus: 1,
                marginTop: 30,
                get children() {
                  return [createComponent(Text, {
                    skipFocus: true,
                    style: titleRowStyles,
                    children: "Index Loop"
                  }), createComponent(Row, {
                    gap: 20,
                    y: 40,
                    display: "block",
                    get children() {
                      return createComponent(Index, {
                        get each() {
                          var _activeRow4;
                          return (_activeRow4 = activeRow()) === null || _activeRow4 === void 0 ? void 0 : _activeRow4.items();
                        },
                        children: function children(item, index) {
                          return createComponent(Poster, mergeProps({
                            x: index * 210
                          }, item));
                        }
                      });
                    }
                  })];
                }
              }), createComponent(View, {
                x: 160,
                height: 300,
                forwardFocus: 1,
                marginTop: 30,
                get children() {
                  return [createComponent(Text, {
                    skipFocus: true,
                    style: titleRowStyles,
                    children: "LazyUp Loop"
                  }), createComponent(LazyUp, {
                    component: Row,
                    direction: "row",
                    display: "block",
                    gap: 20,
                    upCount: 5,
                    get each() {
                      var _activeRow5;
                      return (_activeRow5 = activeRow()) === null || _activeRow5 === void 0 ? void 0 : _activeRow5.items();
                    },
                    y: 50,
                    children: function children(item, index) {
                      return createComponent(Poster, mergeProps({
                        x: index * 210
                      }, item));
                    }
                  })];
                }
              }), createComponent(View, {
                x: 160,
                height: 300,
                forwardFocus: 1,
                marginTop: 30,
                get children() {
                  return [createComponent(Text, {
                    skipFocus: true,
                    style: titleRowStyles,
                    children: "List Loop"
                  }), createComponent(Row, {
                    gap: 20,
                    y: 40,
                    display: "block",
                    get children() {
                      return createComponent(List, {
                        get each() {
                          var _activeRow6;
                          return (_activeRow6 = activeRow()) === null || _activeRow6 === void 0 ? void 0 : _activeRow6.items();
                        },
                        children: function children(item, index) {
                          return createComponent(Poster, mergeProps({
                            get x() {
                              return index() * 210;
                            }
                          }, item, {
                            transition: {
                              x: {
                                duration: 5550
                              }
                            }
                          }));
                        }
                      });
                    }
                  })];
                }
              })];
            }
          })];
        });
      }
    };
  });
})();
