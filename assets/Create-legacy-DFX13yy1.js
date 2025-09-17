;
(function () {
  function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
  function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
  function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
  function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
  function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
  System.register(['./index-legacy-Bd66cRBL.js'], function (exports, module) {
    'use strict';

    var hexColor, onMount, setGlobalBackground, createSignal, createComponent, View, Text, memo, Show, combineStyles, children, mergeProps;
    return {
      setters: [function (module) {
        hexColor = module.H;
        onMount = module.g;
        setGlobalBackground = module.s;
        createSignal = module.c;
        createComponent = module.h;
        View = module.V;
        Text = module.T;
        memo = module.D;
        Show = module.S;
        combineStyles = module.J;
        children = module.A;
        mergeProps = module.m;
      }],
      execute: function execute() {
        var CreatePage = exports("default", function () {
          var OverviewContainer = {
            width: 900,
            height: 500,
            y: 50,
            x: 150,
            gap: 25,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flexStart",
            color: hexColor("00000000")
          };
          var SublineContainer = {
            width: 900,
            height: 36,
            gap: 6,
            display: "flex",
            flexDirection: "row",
            justifyContent: "flexStart",
            color: hexColor("00000000")
          };
          var Title = {
            fontSize: 42
          };
          var Subline = {
            fontSize: 26
          };
          var myBox, childRef;
          onMount(function () {
            setGlobalBackground(0x000000FF);
            myBox.animate({
              x: 100
            }, {
              duration: 2e3
            }).start();
          });
          var _createSignal = createSignal(),
            _createSignal2 = _slicedToArray(_createSignal, 2),
            insertTest = _createSignal2[0],
            setInsertTest = _createSignal2[1];
          var _createSignal3 = createSignal(),
            _createSignal4 = _slicedToArray(_createSignal3, 2),
            emptyTest = _createSignal4[0],
            setEmptyTest = _createSignal4[1];
          setTimeout(function () {
            var _childRef$getChildByI;
            setInsertTest("- Inserted -");
            (_childRef$getChildByI = childRef.getChildById("child1")) === null || _childRef$getChildByI === void 0 || _childRef$getChildByI.animate({
              x: 600
            }, {
              duration: 2e3
            }).start();
          }, 2e3);
          var someOtherStyle = {
            // pretty red
            color: 0xF54242FF,
            $focus: {
              // pretty blue
              color: 0x4287F5FF
            }
          };
          function ChildTest(props) {
            var resolved = children(function () {
              return props.children;
            });
            return createComponent(View, mergeProps(props, {
              get style() {
                return combineStyles(someOtherStyle, props.style);
              },
              get children() {
                return [createComponent(View, {
                  id: "child1",
                  width: 100,
                  height: 100,
                  color: 0xFF0000FF,
                  y: 25,
                  get children() {
                    return [memo(function () {
                      return resolved();
                    }), createComponent(View, {
                      id: "subChild",
                      x: 150,
                      width: 100,
                      height: 100,
                      color: 0x00FF00FF
                    }), createComponent(Text, {
                      get children() {
                        return props.title;
                      }
                    })];
                  }
                }), createComponent(View, {
                  width: 100,
                  height: 100,
                  color: 0xFFFF00FF,
                  y: 175,
                  get children() {
                    return resolved();
                  }
                })];
              }
            }));
          }
          function PosTest(props) {
            return createComponent(View, mergeProps(props, {
              width: 400,
              height: 400,
              color: 0x0000FFFF,
              get children() {
                return [createComponent(View, {
                  width: 50,
                  height: 50,
                  color: 0xFF0000FF,
                  right: 0,
                  get children() {
                    return createComponent(Text, {
                      fontSize: 18,
                      children: "Right"
                    });
                  }
                }), createComponent(View, {
                  width: 50,
                  height: 50,
                  color: 0xFF0000FF,
                  bottom: 0,
                  get children() {
                    return createComponent(Text, {
                      fontSize: 18,
                      children: "Bottom"
                    });
                  }
                }), createComponent(View, {
                  width: 50,
                  height: 50,
                  color: 0xFF0000FF,
                  bottom: 0,
                  right: 0,
                  data: {
                    id: "BR"
                  },
                  get children() {
                    return createComponent(Text, {
                      fontSize: 18,
                      children: "BR"
                    });
                  }
                })];
              }
            }));
          }
          var borderStyles = {
            border: {
              width: 0,
              color: 95598118
            },
            borderRadius: 32
          };
          var childTestPassedStyles = {
            // grey color
            color: 0xCCCCCCFF,
            $focus: {
              // black
              color: 0x000000FF
            }
          };
          var childTestPassedStyles2 = {
            // white color
            color: 0xFFFFFFFF,
            $focus: {
              // white something...
              color: 0xF6F6CCFF
            }
          };
          return [createComponent(View, {
            style: OverviewContainer,
            get children() {
              return [createComponent(Text, {
                style: Title,
                children: "Title of the Page"
              }), createComponent(View, {
                style: SublineContainer,
                get children() {
                  return [createComponent(Text, {
                    get children() {
                      return emptyTest();
                    }
                  }), createComponent(Text, {
                    style: Subline,
                    get children() {
                      return ["Sub ", memo(function () {
                        return insertTest();
                      }), " Text"];
                    }
                  }), createComponent(Show, {
                    get when() {
                      return insertTest();
                    },
                    get children() {
                      return createComponent(View, {
                        width: 28,
                        height: 28,
                        src: "./assets/rt-popcorn.png"
                      });
                    }
                  }), createComponent(Text, {
                    style: Subline,
                    children: "More Text"
                  })];
                }
              }), createComponent(ChildTest, {
                autofocus: true,
                ref: function ref(r$) {
                  var _ref$ = childRef;
                  typeof _ref$ === "function" ? _ref$(r$) : childRef = r$;
                },
                get style() {
                  return combineStyles(childTestPassedStyles2, childTestPassedStyles);
                },
                get children() {
                  return createComponent(Text, {
                    children: "Child Test"
                  });
                }
              }), createComponent(View, {
                ref: function ref(r$) {
                  var _ref$2 = myBox;
                  typeof _ref$2 === "function" ? _ref$2(r$) : myBox = r$;
                },
                style: borderStyles,
                width: 100,
                height: 100,
                color: 0x00FF00FF,
                x: 900,
                y: 400
              }), createComponent(PosTest, {
                x: 100,
                y: 100
              })];
            }
          }), createComponent(View, {
            x: 1100,
            y: 50,
            width: 200,
            height: 200,
            linearGradient: {
              colors: [4290840575, 4288151807, 4283585279],
              angle: 4.1,
              stops: [0, 0.5, 1]
            }
          })];
        });
      }
    };
  });
})();
