;
(function () {
  function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
  function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
  function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
  function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
  function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
  System.register(['./index-legacy-DxXZRw_g.js'], function (exports, module) {
    'use strict';

    var createSignal, createComponent, Column, View, Text, Row, For, Show, memo;
    return {
      setters: [function (module) {
        createSignal = module.c;
        createComponent = module.h;
        Column = module.C;
        View = module.V;
        Text = module.T;
        Row = module.R;
        For = module.F;
        Show = module.S;
        memo = module.k;
      }],
      execute: function execute() {
        var Items = ["Mary", "had", "a", "little", "lamb", "her", "fleece", "was", "white", "as", "snow"];
        var styles = exports("styles", {
          PageContainer: {
            width: 1920,
            height: 1080,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 99
          }
        });
        var SpecialFont = {
          color: 4278190335,
          focus: {
            color: 4294967295
          }
        };
        var SuperFlex = exports("default", function () {
          var _createSignal = createSignal(false),
            _createSignal2 = _slicedToArray(_createSignal, 2),
            lazyShow = _createSignal2[0],
            setLazyShow = _createSignal2[1];
          var PageLoader;
          setTimeout(function () {
            setLazyShow(true);
            PageLoader.alpha = 0;
          }, 2e3);
          return createComponent(Column, {
            display: "block",
            get children() {
              return [createComponent(View, {
                ref: function ref(r$) {
                  var _ref$ = PageLoader;
                  typeof _ref$ === "function" ? _ref$(r$) : PageLoader = r$;
                },
                get style() {
                  return styles.PageContainer;
                },
                get children() {
                  return [createComponent(Text, {
                    children: "Center - gif doesnt animate"
                  }), createComponent(View, {
                    autosize: true,
                    src: "./assets/spinner.gif"
                  }), createComponent(Text, {
                    children: "Spinner"
                  })];
                }
              }), createComponent(Row, {
                scroll: "always",
                gap: 20,
                selected: 2,
                autofocus: true,
                x: 150,
                y: 50,
                transition: {
                  x: {
                    duration: 350
                  }
                },
                get children() {
                  return createComponent(For, {
                    each: Items,
                    children: function children(item, index) {
                      return createComponent(View, {
                        width: 100,
                        height: 200,
                        style: {
                          color: 4278190335,
                          focus: {
                            color: 4294967295
                          }
                        }
                      });
                    }
                  });
                }
              }), createComponent(Show, {
                get when() {
                  return lazyShow();
                },
                get children() {
                  return createComponent(Row, {
                    scroll: "none",
                    gap: 20,
                    selected: 2,
                    autofocus: true,
                    x: 150,
                    y: 350,
                    transition: {
                      x: {
                        duration: 350
                      }
                    },
                    get children() {
                      return createComponent(For, {
                        each: Items,
                        children: function children(item, index) {
                          return createComponent(View, {
                            width: 100,
                            height: 200,
                            style: {
                              color: 4278190335,
                              focus: {
                                color: 4294967295
                              }
                            }
                          });
                        }
                      });
                    }
                  });
                }
              }), createComponent(Show, {
                get when() {
                  return lazyShow();
                },
                get children() {
                  return createComponent(Row, {
                    scroll: "none",
                    gap: 20,
                    selected: 2,
                    x: 150,
                    y: 650,
                    transition: {
                      x: {
                        duration: 350
                      }
                    },
                    get children() {
                      return createComponent(For, {
                        each: Items,
                        children: function children(item, index) {
                          return createComponent(Text, {
                            style: SpecialFont,
                            fontSize: 24,
                            get children() {
                              return [item, " ", memo(function () {
                                return lazyShow() ? "Add Text" : "";
                              })];
                            }
                          });
                        }
                      });
                    }
                  });
                }
              }), createComponent(Show, {
                get when() {
                  return lazyShow();
                },
                get children() {
                  return createComponent(Column, {
                    scroll: "none",
                    gap: 20,
                    selected: 2,
                    x: 350,
                    y: 450,
                    get children() {
                      return createComponent(For, {
                        each: Items,
                        children: function children(item, index) {
                          return createComponent(Text, {
                            style: SpecialFont,
                            fontSize: 24,
                            children: item
                          });
                        }
                      });
                    }
                  });
                }
              })];
            }
          });
        });
      }
    };
  });
})();
