import { c as createSignal, j as createMemo, h as createComponent, V as View, m as mergeProps, F as For, D as Dynamic, n as isFunction, p as debounce, f as createEffect, o as on, s as setGlobalBackground, q as activeElement, T as Text, r as ContentBlock, P as Poster } from "./index-B9eBRlnz.js";
const Grid = (props) => {
  const [focusedIndex, setFocusedIndex] = createSignal(0);
  const baseColumns = 4;
  const columns = createMemo(() => props.columns || baseColumns);
  const totalWidth = createMemo(() => {
    var _a, _b;
    return ((_a = props.itemWidth) != null ? _a : 300) + ((_b = props.itemOffset) != null ? _b : 0);
  });
  const totalHeight = createMemo(() => {
    var _a, _b;
    return ((_a = props.itemHeight) != null ? _a : 300) + ((_b = props.itemOffset) != null ? _b : 0);
  });
  const moveFocus = (delta, elm) => {
    if (!props.items || props.items.length === 0) return false;
    const newIndex = focusedIndex() + delta;
    if (newIndex >= 0 && newIndex < props.items.length) {
      setFocusedIndex(newIndex);
    } else if (props.looping) {
      const totalItems = props.items.length;
      if (delta < 0) {
        const lastRowStart = totalItems - totalItems % columns() || totalItems - columns();
        const target = lastRowStart + focusedIndex() % columns();
        setFocusedIndex(target < totalItems ? target : target - columns());
      } else {
        setFocusedIndex(focusedIndex() % columns());
      }
    } else {
      return false;
    }
    const focusedElm = elm.children[focusedIndex()];
    focusedElm.setFocus();
    isFunction(props.onSelectedChanged) && props.onSelectedChanged.call(elm, focusedIndex(), elm, focusedElm);
    return true;
  };
  const handleHorizontalFocus = (delta, elm) => {
    if (!props.items || props.items.length === 0) return false;
    const newIndex = focusedIndex() + delta;
    const isWithinRow = Math.floor(newIndex / columns()) === Math.floor(focusedIndex() / columns());
    if (newIndex >= 0 && newIndex < props.items.length && isWithinRow) {
      setFocusedIndex(newIndex);
    } else if (props.looping) {
      const rowStart = Math.floor(focusedIndex() / columns()) * columns();
      const rowEnd = Math.min(rowStart + columns() - 1, props.items.length - 1);
      setFocusedIndex(delta > 0 ? newIndex > rowEnd ? rowStart : newIndex : newIndex < rowStart ? rowEnd : newIndex);
    } else {
      return false;
    }
    const focusedElm = elm.children[focusedIndex()];
    focusedElm.setFocus();
    isFunction(props.onSelectedChanged) && props.onSelectedChanged.call(elm, focusedIndex(), elm, focusedElm);
    return true;
  };
  function onFocus() {
    handleHorizontalFocus(0, this);
  }
  const scrollY = createMemo(() => {
    var _a;
    return props.scroll === "none" ? (_a = props.y) != null ? _a : 0 : -Math.floor(focusedIndex() / columns()) * totalHeight() + (props.y || 0);
  });
  return createComponent(View, mergeProps({
    transition: {
      y: true
    }
  }, props, {
    onUp: (_e, elm) => moveFocus(-columns(), elm),
    onDown: (_e, elm) => moveFocus(columns(), elm),
    onLeft: (_e, elm) => handleHorizontalFocus(-1, elm),
    onRight: (_e, elm) => handleHorizontalFocus(1, elm),
    onFocus,
    strictBounds: false,
    get y() {
      return scrollY();
    },
    get children() {
      return createComponent(For, {
        get each() {
          return props.items;
        },
        children: (item, index) => createComponent(Dynamic, mergeProps(item, {
          get component() {
            return props.item;
          },
          get width() {
            return props.itemWidth;
          },
          get height() {
            return props.itemHeight;
          },
          get x() {
            return index() % columns() * totalWidth();
          },
          get y() {
            return Math.floor(index() / columns()) * totalHeight();
          }
        }))
      });
    }
  }));
};
const TMDB = (props) => {
  const [heroContent, setHeroContent] = createSignal({});
  let contentBlock, solidLogo, firstRun = true;
  const delayedBackgrounds = debounce(setGlobalBackground, 800);
  const delayedHero = debounce((content) => setHeroContent(content || {}), 600);
  createEffect(on(activeElement, (elm) => {
    if (!elm) return;
    if (firstRun) {
      elm.backdrop && setGlobalBackground(elm.backdrop);
      elm.heroContent && setHeroContent(elm.heroContent);
      firstRun = false;
    } else {
      elm.backdrop && delayedBackgrounds(elm.backdrop);
      elm.heroContent && delayedHero(elm.heroContent);
    }
  }, {
    defer: true
  }));
  const items = createMemo(() => {
    return props.data.rows.map((row) => row.items()).flat();
  });
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
        children: "Built with"
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
  }), createComponent(ContentBlock, {
    ref(r$) {
      var _ref$2 = contentBlock;
      typeof _ref$2 === "function" ? _ref$2(r$) : contentBlock = r$;
    },
    y: 300,
    x: 162,
    get content() {
      return heroContent();
    }
  }), createComponent(View, {
    x: 165,
    y: 540,
    clipping: true,
    get children() {
      return createComponent(Grid, {
        x: 12,
        y: 12,
        get autofocus() {
          return items();
        },
        item: Poster,
        itemWidth: 200,
        get items() {
          return items();
        },
        columns: 6,
        itemOffset: 36
      });
    }
  })];
};
export {
  TMDB as default
};
