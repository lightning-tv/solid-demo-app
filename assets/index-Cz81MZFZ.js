import { j as createMemo, k as onCleanup, $ as $TRACK, u as untrack, d as batch, l as createRoot, c as createSignal } from "./index-ht7_KKhI.js";
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
export {
  List as L
};
