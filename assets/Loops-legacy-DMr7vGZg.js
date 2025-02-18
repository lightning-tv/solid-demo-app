;
(function () {
  function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
  function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
  function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
  function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
  function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
  System.register(['./index-legacy-CWDVRzFw.js'], function (exports, module) {
    'use strict';

    var createMemo, onCleanup, $TRACK, untrack, batch, createRoot, createSignal, setGlobalBackground, createComponent, View, Text, Column, Row, For, Poster, mergeProps, Index, LazyUp;
    return {
      setters: [module => {
        createMemo = module.i;
        onCleanup = module.j;
        $TRACK = module.$;
        untrack = module.u;
        batch = module.d;
        createRoot = module.k;
        createSignal = module.c;
        setGlobalBackground = module.s;
        createComponent = module.h;
        View = module.V;
        Text = module.T;
        Column = module.C;
        Row = module.R;
        For = module.F;
        Poster = module.P;
        mergeProps = module.m;
        Index = module.I;
        LazyUp = module.L;
      }],
      execute: function execute() {
        function disposeList(list) {
          for (var i = 0; i < list.length; i++) {
            var _list$i;
            (_list$i = list[i]) === null || _list$i === void 0 || _list$i.disposer();
          }
        }
        /**
         * Reactively transforms an array with a callback function - underlying helper for the `<List>` unkeyed control flow.
         *
         * Alternative to `mapArray` or `indexArray` that provides reactive value and index for array elements.
         */
        function listArray(list, mapFn) {
          var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
          var items = [];
          var mapped = [],
            unusedItems,
            i,
            j,
            item,
            oldValue,
            oldIndex,
            newValue,
            fallback,
            fallbackDisposer;
          onCleanup(() => {
            var _fallbackDisposer;
            (_fallbackDisposer = fallbackDisposer) === null || _fallbackDisposer === void 0 || _fallbackDisposer();
            fallbackDisposer = undefined;
            disposeList(items);
          });
          return () => {
            var newItems = list() || [];
            newItems[$TRACK]; // top level tracking
            return untrack(() => {
              if (newItems.length > 0 && fallbackDisposer) {
                fallbackDisposer();
                fallbackDisposer = undefined;
                fallback = undefined;
              }
              var temp = new Array(newItems.length); // new mapped array
              unusedItems = items.length;
              // 1) no change when values & indexes match
              for (j = unusedItems - 1; j >= 0; --j) {
                item = items[j];
                oldIndex = item.index;
                if (oldIndex < newItems.length && newItems[oldIndex] === item.value) {
                  temp[oldIndex] = mapped[oldIndex];
                  if (--unusedItems !== j) {
                    items[j] = items[unusedItems];
                    items[unusedItems] = item;
                  }
                }
              }
              // #2 prepare values matcher
              var matcher = new Map();
              var matchedItems = new Uint8Array(unusedItems);
              for (j = unusedItems - 1; j >= 0; --j) {
                var _matcher$get$push, _matcher$get;
                oldValue = items[j].value;
                (_matcher$get$push = (_matcher$get = matcher.get(oldValue)) === null || _matcher$get === void 0 ? void 0 : _matcher$get.push(j)) !== null && _matcher$get$push !== void 0 ? _matcher$get$push : matcher.set(oldValue, [j]);
              }
              // 2) change indexes when values match
              for (i = 0; i < newItems.length; ++i) {
                var _matcher$get$pop, _matcher$get2;
                if (i in temp) continue;
                newValue = newItems[i];
                j = (_matcher$get$pop = (_matcher$get2 = matcher.get(newValue)) === null || _matcher$get2 === void 0 ? void 0 : _matcher$get2.pop()) !== null && _matcher$get$pop !== void 0 ? _matcher$get$pop : -1;
                if (j >= 0) {
                  var _item$indexSetter, _item;
                  item = items[j];
                  oldIndex = item.index;
                  temp[i] = mapped[oldIndex];
                  item.index = i;
                  (_item$indexSetter = (_item = item).indexSetter) === null || _item$indexSetter === void 0 || _item$indexSetter.call(_item, i);
                  matchedItems[j] = 1;
                }
              }
              // #2 reduce unusedItems for matched items
              for (j = matchedItems.length - 1; j >= 0; --j) {
                if (matchedItems[j] && --unusedItems !== j) {
                  item = items[j];
                  items[j] = items[unusedItems];
                  items[unusedItems] = item;
                }
              }
              // 3) change values when indexes match
              for (j = unusedItems - 1; j >= 0; --j) {
                item = items[j];
                oldIndex = item.index;
                if (!(oldIndex in temp) && oldIndex < newItems.length) {
                  var _item$valueSetter, _item2;
                  temp[oldIndex] = mapped[oldIndex];
                  newValue = newItems[oldIndex];
                  item.value = newValue;
                  (_item$valueSetter = (_item2 = item).valueSetter) === null || _item$valueSetter === void 0 || _item$valueSetter.call(_item2, newValueGetter);
                  if (--unusedItems !== j) {
                    items[j] = items[unusedItems];
                    items[unusedItems] = item;
                  }
                }
              }
              // 4) change value & index when none matched
              // 5) create new if no unused items left
              for (i = 0; i < newItems.length; ++i) {
                if (i in temp) continue;
                newValue = newItems[i];
                if (unusedItems > 0) {
                  item = items[--unusedItems];
                  temp[i] = mapped[item.index];
                  batch(changeBoth);
                } else {
                  temp[i] = createRoot(mapper);
                }
              }
              // 6) delete any old unused items left
              disposeList(items.splice(0, unusedItems));
              if (newItems.length === 0 && options.fallback) {
                if (!fallbackDisposer) {
                  fallback = [createRoot(d => {
                    fallbackDisposer = d;
                    return options.fallback();
                  })];
                }
                return fallback;
              }
              return mapped = temp;
            });
          };
          function newValueGetter() {
            return newValue;
          }
          function changeBoth() {
            var _item$indexSetter2, _item3, _item$valueSetter2, _item4;
            item.index = i;
            (_item$indexSetter2 = (_item3 = item).indexSetter) === null || _item$indexSetter2 === void 0 || _item$indexSetter2.call(_item3, i);
            item.value = newValue;
            (_item$valueSetter2 = (_item4 = item).valueSetter) === null || _item$valueSetter2 === void 0 || _item$valueSetter2.call(_item4, newValueGetter);
          }
          function mapper(disposer) {
            var t = {
                value: newValue,
                index: i,
                disposer
              },
              scopedV = newValue,
              scopedI = i;
            items.push(t);
            // signal created when used
            var sV = () => {
                var _createSignal = createSignal(scopedV);
                var _createSignal2 = _slicedToArray(_createSignal, 2);
                sV = _createSignal2[0];
                t.valueSetter = _createSignal2[1];
                return sV();
              },
              sI = () => {
                var _createSignal3 = createSignal(scopedI);
                var _createSignal4 = _slicedToArray(_createSignal3, 2);
                sI = _createSignal4[0];
                t.indexSetter = _createSignal4[1];
                return sI();
              };
            return mapFn(() => sV(), () => sI());
          }
        }
        /**
         * Iteration over a list creating elements from its items.
         * It avoids recreating elements, instead reorders existing elements whenever possible and / or changes reactive value.
         *
         * To be used if you have a list with changing indexes and values.
         * ```typescript
         * <List each={items} fallback={<div>No items</div>}>
         *   {(item, index) => <div data-index={index()}>{item()}</div>}
         * </List>
         * ```
         */
        function List(props) {
          var fallback = "fallback" in props && {
            fallback: () => props.fallback
          };
          return createMemo(listArray(() => props.each, props.children, fallback || undefined));
        }
        var Loops = exports("default", props => {
          var _createSignal5 = createSignal(props.data.rows[0]),
            _createSignal6 = _slicedToArray(_createSignal5, 2),
            activeRow = _createSignal6[0],
            setActiveRow = _createSignal6[1];
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
            ref(r$) {
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
                        children: (item, index) => createComponent(Poster, mergeProps({
                          get x() {
                            return index() * 210;
                          }
                        }, item))
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
                      return (_activeRow3 = activeRow()) === null || _activeRow3 === void 0 || (_activeRow3 = _activeRow3.items()) === null || _activeRow3 === void 0 ? void 0 : _activeRow3.map((item, index) => createComponent(Poster, mergeProps({
                        x: index * 210
                      }, item)));
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
                        children: (item, index) => createComponent(Poster, mergeProps({
                          x: index * 210
                        }, item))
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
                    children: (item, index) => createComponent(Poster, mergeProps({
                      x: index * 210
                    }, item))
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
                        children: (item, index) => createComponent(Poster, mergeProps({
                          get x() {
                            return index() * 210;
                          }
                        }, item, {
                          transition: {
                            x: {
                              duration: 5550
                            }
                          }
                        }))
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
