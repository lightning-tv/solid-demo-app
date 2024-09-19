;
(function () {
  function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
  function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
  function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
  function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
  function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
  System.register(['./index-legacy-BbBum_jH.js'], function (exports, module) {
    'use strict';

    var useNavigate, createSelector, createComponent, View, Text, Column, Row, styles, For, mergeProps, assertTruthy, createSignal;
    return {
      setters: [function (module) {
        useNavigate = module.u;
        createSelector = module.e;
        createComponent = module.h;
        View = module.V;
        Text = module.T;
        Column = module.C;
        Row = module.R;
        styles = module.i;
        For = module.F;
        mergeProps = module.m;
        assertTruthy = module.j;
        createSignal = module.c;
      }],
      execute: function execute() {
        var Portal = exports("default", function () {
          var navigate = useNavigate();
          var isFirst = createSelector(function () {
            return 0;
          });
          function onEnter() {
            var entity = this.children[this.selected || 0];
            assertTruthy(entity && entity.id);
            navigate("/" + entity.id);
          }
          var flexDemos = [{
            title: "Flex Row",
            id: "flex",
            description: "Flex Row Implementation"
          }, {
            title: "Flex Column",
            id: "flexcolumn",
            description: "Flex Column Implementation"
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
            title: "Grid",
            id: "grid",
            description: "Infinite Scroll Grid"
          }, {
            title: "Buttons",
            id: "buttons",
            description: "Demo a few buttons"
          }, {
            title: "Login",
            id: "login",
            description: "Login example"
          }, {
            title: "Text",
            id: "text",
            description: "Text layout with flexbox"
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
              focus: {
                scale: 1.1,
                color: 4294967295
              }
            };
            var _createSignal = createSignal(4294967295),
              _createSignal2 = _slicedToArray(_createSignal, 2),
              color = _createSignal2[0],
              setColor = _createSignal2[1];
            return createComponent(View, mergeProps(props, {
              onFocus: function onFocus() {
                return setColor(255);
              },
              onBlur: function onBlur() {
                return setColor(4294967295);
              },
              style: Container,
              get children() {
                return createComponent(View, {
                  x: 30,
                  get children() {
                    return [createComponent(Text, {
                      y: 30,
                      fontSize: 84,
                      get color() {
                        return color();
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
                        return color();
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
                        return color();
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
                get children() {
                  return [createComponent(Row, {
                    onEnter: onEnter,
                    get style() {
                      return styles.Row;
                    },
                    justifyContent: "flexStart",
                    gap: 40,
                    get children() {
                      return createComponent(For, {
                        each: demos,
                        children: function children(demo, i) {
                          return createComponent(DemoTile, mergeProps({
                            get autofocus() {
                              return isFirst(i());
                            },
                            get index() {
                              return i();
                            }
                          }, demo));
                        }
                      });
                    }
                  }), createComponent(Row, {
                    onEnter: onEnter,
                    get style() {
                      return styles.Row;
                    },
                    justifyContent: "flexStart",
                    gap: 40,
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
