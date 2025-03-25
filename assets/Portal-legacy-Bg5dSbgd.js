;
(function () {
  function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
  function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
  function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
  function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
  function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
  System.register(['./index-legacy-CbJ1pZtP.js'], function (exports, module) {
    'use strict';

    var useNavigate, createSelector, createComponent, View, Text, Column, Row, For, mergeProps, assertTruthy, createSignal;
    return {
      setters: [function (module) {
        useNavigate = module.v;
        createSelector = module.e;
        createComponent = module.h;
        View = module.V;
        Text = module.T;
        Column = module.C;
        Row = module.R;
        For = module.F;
        mergeProps = module.m;
        assertTruthy = module.w;
        createSignal = module.c;
      }],
      execute: function execute() {
        var Portal = exports("default", function () {
          var navigate = useNavigate();
          createSelector(function () {
            return 0;
          });
          function onEnter() {
            var entity = this.children[this.selected || 0];
            assertTruthy(entity && entity.id);
            navigate("/" + entity.id);
          }
          var flexDemos = [{
            title: "Focus Basics",
            id: "focusbasics",
            description: "Quick guide on Focus"
          }, {
            title: "Key Handling",
            id: "keyhandling",
            description: "Understanding Key Handling"
          }, {
            title: "Loop Basics",
            id: "loops",
            description: "Understanding For, Index, Lazy and List"
          }, {
            title: "Infinite Items",
            id: "infinite",
            description: "Learn how to manage large list of items"
          }, {
            title: "Layout Basics",
            id: "layout",
            description: "Quick guide on Layout"
          }, {
            title: "Flex Menu",
            id: "flexmenu",
            description: "Flex Menu On Right Implementation"
          }, {
            title: "Flex Row",
            id: "flex",
            description: "Flex Row Implementation"
          }, {
            title: "Flex Column",
            id: "flexcolumn",
            description: "Flex Column Implementation"
          }, {
            title: "Flex Grow",
            id: "flexgrow",
            description: "Flex Grow Examples"
          }, {
            title: "Flex Row Vertical Align",
            id: "flexsize",
            description: "Flex Row Vertical Align Implementation"
          }, {
            title: "Flex Column Vertical Align",
            id: "flexcolumnsize",
            description: "Flex Column Vertical Align Implementation"
          }, {
            title: "Flex Layout Tests",
            id: "superflex",
            description: "Complicated flex layouts"
          }];
          var demos = [{
            title: "Positioning",
            id: "positioning",
            description: "Positioning Elements"
          }, {
            title: "Gradients",
            id: "gradients",
            description: "Basic Gradients"
          }, {
            title: "Transitions",
            id: "transitions",
            description: "Comparing different Transitions"
          }, {
            title: "TMDB",
            id: "tmdb",
            description: "TMDB Example"
          }, {
            title: "Grid Primitive for Layout",
            id: "tmdbgrid",
            description: "Using Grid component"
          }, {
            title: "Firebolt Integration",
            id: "firebolt",
            description: "Firebolt API Integration"
          }, {
            title: "Components",
            id: "components",
            description: "Reusable Components"
          }, {
            title: "Focus Handling",
            id: "focushandling",
            description: "Dealing with Focus Handling"
          }, {
            title: "Grid",
            id: "grid",
            description: "Infinite Scroll Grid"
          }, {
            title: "Destroy",
            id: "destroy",
            description: "Using onDestroy to animate destruction"
          }, {
            title: "Text",
            id: "text",
            description: "Text layout with flexbox"
          }, {
            title: "TextPoster",
            id: "textposter",
            description: "Text layout with flex and Poster"
          }, {
            title: "Create Elements",
            id: "create",
            description: "Testing Show + children + inserting text"
          }, {
            title: "Viewport",
            id: "viewport",
            description: "Events going in and out of viewport"
          }];
          function DemoTile(props) {
            var Container = {
              width: 370,
              height: 320,
              borderRadius: 6,
              scale: 1,
              color: 0x182B44FF,
              transition: {
                color: true,
                scale: true
              },
              $focus: {
                scale: 1.1,
                color: 4294967295
              }
            };
            var _createSignal = createSignal(false),
              _createSignal2 = _slicedToArray(_createSignal, 2),
              hasFocus = _createSignal2[0],
              setHasFocus = _createSignal2[1];
            return createComponent(View, mergeProps(props, {
              onFocusChanged: setHasFocus,
              style: Container,
              get children() {
                return createComponent(View, {
                  x: 30,
                  get children() {
                    return [createComponent(Text, {
                      y: 30,
                      fontSize: 84,
                      get color() {
                        return hasFocus() ? 255 : 4294967295;
                      },
                      get children() {
                        return props.index;
                      }
                    }), createComponent(Text, {
                      y: 140,
                      fontSize: 42,
                      width: 340,
                      height: 42,
                      contain: "both",
                      get color() {
                        return hasFocus() ? 255 : 4294967295;
                      },
                      get children() {
                        return props.title;
                      }
                    }), createComponent(Text, {
                      y: 200,
                      fontSize: 28,
                      width: 330,
                      contain: "width",
                      get color() {
                        return hasFocus() ? 255 : 4294967295;
                      },
                      get children() {
                        return props.description;
                      }
                    })];
                  }
                });
              }
            }));
          }
          return createComponent(View, {
            colorTop: 1147903743,
            colorBottom: 743406847,
            get children() {
              return [createComponent(View, {
                x: 120,
                get children() {
                  return [createComponent(View, {
                    src: "./assets/solidjs.png",
                    width: 101,
                    height: 90,
                    y: 40
                  }), createComponent(Text, {
                    fontSize: 90,
                    x: 110,
                    y: 40,
                    children: "Examples"
                  }), createComponent(View, {
                    y: 140,
                    height: 1,
                    width: 1800,
                    color: 3906468351
                  })];
                }
              }), createComponent(Column, {
                scroll: "none",
                y: 200,
                x: 170,
                gap: 80,
                autofocus: true,
                get children() {
                  return [createComponent(Row, {
                    onEnter: onEnter,
                    gap: 40,
                    height: 320,
                    flexBoundary: "contain",
                    scroll: "always",
                    get children() {
                      return createComponent(For, {
                        each: demos,
                        children: function children(demo, i) {
                          return createComponent(DemoTile, mergeProps({
                            get index() {
                              return i();
                            }
                          }, demo));
                        }
                      });
                    }
                  }), createComponent(Row, {
                    onEnter: onEnter,
                    gap: 40,
                    height: 320,
                    flexBoundary: "contain",
                    scroll: "always",
                    get children() {
                      return createComponent(For, {
                        each: flexDemos,
                        children: function children(demo, i) {
                          return createComponent(DemoTile, mergeProps({
                            get index() {
                              return i();
                            }
                          }, demo));
                        }
                      });
                    }
                  })];
                }
              })];
            }
          });
        });
      }
    };
  });
})();
