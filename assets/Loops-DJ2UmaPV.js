import { i as createMemo, j as onCleanup, $ as $TRACK, u as untrack, d as batch, k as createRoot, c as createSignal, s as setGlobalBackground, h as createComponent, V as View, T as Text, C as Column, R as Row, F as For, P as Poster, m as mergeProps, I as Index, L as LazyUp } from "./index-OkTwG4DX.js";
function disposeList(list) {
  var _a;
  for (let i = 0; i < list.length; i++) {
    (_a = list[i]) == null ? void 0 : _a.disposer();
  }
}
function listArray(list, mapFn, options = {}) {
  const items = [];
  let mapped = [], unusedItems, i, j, item, oldValue, oldIndex, newValue, fallback, fallbackDisposer;
  onCleanup(() => {
    fallbackDisposer == null ? void 0 : fallbackDisposer();
    fallbackDisposer = void 0;
    disposeList(items);
  });
  return () => {
    const newItems = list() || [];
    newItems[$TRACK];
    return untrack(() => {
      var _a, _b, _c, _d, _e, _f;
      if (newItems.length > 0 && fallbackDisposer) {
        fallbackDisposer();
        fallbackDisposer = void 0;
        fallback = void 0;
      }
      const temp = new Array(newItems.length);
      unusedItems = items.length;
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
      const matcher = /* @__PURE__ */ new Map();
      const matchedItems = new Uint8Array(unusedItems);
      for (j = unusedItems - 1; j >= 0; --j) {
        oldValue = items[j].value;
        (_b = (_a = matcher.get(oldValue)) == null ? void 0 : _a.push(j)) != null ? _b : matcher.set(oldValue, [j]);
      }
      for (i = 0; i < newItems.length; ++i) {
        if (i in temp)
          continue;
        newValue = newItems[i];
        j = (_d = (_c = matcher.get(newValue)) == null ? void 0 : _c.pop()) != null ? _d : -1;
        if (j >= 0) {
          item = items[j];
          oldIndex = item.index;
          temp[i] = mapped[oldIndex];
          item.index = i;
          (_e = item.indexSetter) == null ? void 0 : _e.call(item, i);
          matchedItems[j] = 1;
        }
      }
      for (j = matchedItems.length - 1; j >= 0; --j) {
        if (matchedItems[j] && --unusedItems !== j) {
          item = items[j];
          items[j] = items[unusedItems];
          items[unusedItems] = item;
        }
      }
      for (j = unusedItems - 1; j >= 0; --j) {
        item = items[j];
        oldIndex = item.index;
        if (!(oldIndex in temp) && oldIndex < newItems.length) {
          temp[oldIndex] = mapped[oldIndex];
          newValue = newItems[oldIndex];
          item.value = newValue;
          (_f = item.valueSetter) == null ? void 0 : _f.call(item, newValueGetter);
          if (--unusedItems !== j) {
            items[j] = items[unusedItems];
            items[unusedItems] = item;
          }
        }
      }
      for (i = 0; i < newItems.length; ++i) {
        if (i in temp)
          continue;
        newValue = newItems[i];
        if (unusedItems > 0) {
          item = items[--unusedItems];
          temp[i] = mapped[item.index];
          batch(changeBoth);
        } else {
          temp[i] = createRoot(mapper);
        }
      }
      disposeList(items.splice(0, unusedItems));
      if (newItems.length === 0 && options.fallback) {
        if (!fallbackDisposer) {
          fallback = [
            createRoot((d) => {
              fallbackDisposer = d;
              return options.fallback();
            })
          ];
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
    var _a, _b;
    item.index = i;
    (_a = item.indexSetter) == null ? void 0 : _a.call(item, i);
    item.value = newValue;
    (_b = item.valueSetter) == null ? void 0 : _b.call(item, newValueGetter);
  }
  function mapper(disposer) {
    const t = {
      value: newValue,
      index: i,
      disposer
    }, scopedV = newValue, scopedI = i;
    items.push(t);
    let sV = () => {
      [sV, t.valueSetter] = createSignal(scopedV);
      return sV();
    }, sI = () => {
      [sI, t.indexSetter] = createSignal(scopedI);
      return sI();
    };
    return mapFn(() => sV(), () => sI());
  }
}
function List(props) {
  const fallback = "fallback" in props && { fallback: () => props.fallback };
  return createMemo(listArray(() => props.each, props.children, fallback || void 0));
}
const Loops = (props) => {
  const [activeRow, setActiveRow] = createSignal(props.data.rows[0]);
  let currentIndex = 0, solidLogo;
  setGlobalBackground(255);
  const titleRowStyles = {
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
      const row = props.data.rows[0];
      const items = row.items().slice().reverse();
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
      var _a;
      return (_a = activeRow()) == null ? void 0 : _a.items();
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
                  var _a;
                  return (_a = activeRow()) == null ? void 0 : _a.items();
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
              var _a, _b;
              return (_b = (_a = activeRow()) == null ? void 0 : _a.items()) == null ? void 0 : _b.map((item, index) => createComponent(Poster, mergeProps({
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
                  var _a;
                  return (_a = activeRow()) == null ? void 0 : _a.items();
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
              var _a;
              return (_a = activeRow()) == null ? void 0 : _a.items();
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
                  var _a;
                  return (_a = activeRow()) == null ? void 0 : _a.items();
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
};
export {
  Loops as default
};
