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

    var createSignal, createResource, createComputed, batch, theme, createSelector, createEffect, on, onMount, createComponent, View, Column, Index, Text, setGlobalBackground;
    return {
      setters: [module => {
        createSignal = module.c;
        createResource = module.a;
        createComputed = module.b;
        batch = module.d;
        theme = module.t;
        createSelector = module.e;
        createEffect = module.f;
        on = module.o;
        onMount = module.g;
        createComponent = module.h;
        View = module.V;
        Column = module.C;
        Index = module.I;
        Text = module.T;
        setGlobalBackground = module.s;
      }],
      execute: function execute() {
        function createInfiniteItems(fetcher) {
          var _createSignal = createSignal([]),
            _createSignal2 = _slicedToArray(_createSignal, 2),
            items = _createSignal2[0],
            setItems = _createSignal2[1];
          var _createSignal3 = createSignal(0),
            _createSignal4 = _slicedToArray(_createSignal3, 2),
            page = _createSignal4[0],
            setPage = _createSignal4[1];
          var _createSignal5 = createSignal(false),
            _createSignal6 = _slicedToArray(_createSignal5, 2),
            end = _createSignal6[0],
            setEnd = _createSignal6[1];
          var _createResource = createResource(page, fetcher),
            _createResource2 = _slicedToArray(_createResource, 1),
            contents = _createResource2[0];
          createComputed(() => {
            var content = contents();
            if (!content) return;
            batch(() => {
              if (content.length === 0) setEnd(true);
              setItems(p => [...p, ...content]);
            });
          });
          return [items, {
            page,
            setPage,
            setItems,
            end,
            setEnd
          }];
        }
        var ROW_HEIGHT = 50;
        var styles = {
          ProductRow: {
            width: 500,
            display: "flex",
            flexDirection: "row",
            gap: 40,
            height: ROW_HEIGHT,
            borderRadius: 16,
            color: 4294967053,
            border: {
              color: 8422911,
              width: 0
            },
            active: {
              color: 960052479
            },
            focus: {
              color: 4143380991,
              border: {
                color: 8422911,
                width: 6
              }
            },
            transition: {
              // leave easing blank to use default linear
              x: {
                duration: 300
              },
              width: {
                duration: 300
              },
              alpha: {
                duration: 300
              }
            }
          },
          ProductText: {
            fontSize: 20,
            fontWeight: 600,
            lineHeight: 24,
            color: 0xF6F6F6FF,
            focus: {
              color: 336861183
            }
          },
          itemsContainer: {
            width: theme.layout.screenW,
            height: 600,
            y: 180,
            x: 180,
            zIndex: 2
          }
        };
        function ProductRow(props) {
          return createComponent(View, {
            get y() {
              return props.y;
            },
            get autofocus() {
              return props.autofocus;
            },
            get style() {
              return styles.ProductRow;
            },
            forwardStates: true,
            get children() {
              return [createComponent(Text, {
                get style() {
                  return styles.ProductText;
                },
                get children() {
                  return props.item.id;
                }
              }), createComponent(Text, {
                get style() {
                  return styles.ProductText;
                },
                get children() {
                  return props.item.title;
                }
              }), createComponent(Text, {
                get style() {
                  return styles.ProductText;
                },
                get children() {
                  return props.item.price;
                }
              })];
            }
          });
        }
        var Grid = exports("default", () => {
          var _createSignal7 = createSignal(0),
            _createSignal8 = _slicedToArray(_createSignal7, 2),
            columnY = _createSignal8[0],
            setcolumnY = _createSignal8[1];
          var isFirst = createSelector(() => 0);
          var _createSignal9 = createSignal(0),
            _createSignal10 = _slicedToArray(_createSignal9, 2),
            rowIndex = _createSignal10[0],
            setRowIndex = _createSignal10[1];
          var _createSignal11 = createSignal([]),
            _createSignal12 = _slicedToArray(_createSignal11, 2),
            items = _createSignal12[0],
            setItems = _createSignal12[1];
          var _createInfiniteItems = createInfiniteItems(page => {
              return fetch(`https://dummyjson.com/products?limit=20&skip=${20 * page}`).then(res => res.json()).then(data => {
                data.total;
                return data.products;
              });
            }),
            _createInfiniteItems2 = _slicedToArray(_createInfiniteItems, 2),
            products = _createInfiniteItems2[0],
            setPage = _createInfiniteItems2[1].setPage;
          var EXTRA = 8;
          createEffect(on([products, rowIndex], ([products2, index]) => {
            if (items().length - EXTRA > index) return;
            setItems(products2.slice(0, index + EXTRA));
            if (index > products2.length - 5) {
              setPage(p => p + 1);
            }
          }, {
            defer: true
          }));
          onMount(() => {
            setGlobalBackground(0x000000FF);
          });
          function changeRow(elm, active, selectedIndex, lastSelectedIndex) {
            setcolumnY((active.y || 0) * -1 + 50);
            setRowIndex(selectedIndex);
          }
          return createComponent(View, {
            clipping: true,
            get style() {
              return styles.itemsContainer;
            },
            get children() {
              return createComponent(Column, {
                plinko: true,
                get y() {
                  return columnY();
                },
                scroll: "none",
                onSelectedChanged: changeRow,
                get children() {
                  return createComponent(Index, {
                    get each() {
                      return items();
                    },
                    children: (item, i) => createComponent(ProductRow, {
                      y: i * 50,
                      get item() {
                        return item();
                      },
                      get autofocus() {
                        return isFirst(i);
                      }
                    })
                  });
                }
              });
            }
          });
        });
      }
    };
  });
})();
//# sourceMappingURL=Grid-legacy-B_drUEx1.js.map
