import { a as createSignal, g as createEffect, s as setGlobalBackground, c as createComponent, V as View, T as Text, S as Show, j as List, P as Poster, m as mergeProps } from "./index-B9nqAPUy.js";
const Loops = (props) => {
  const [allItems, setAllItems] = createSignal([]);
  const [displayedItems, setDisplayedItems] = createSignal([]);
  const [resetCounter, setResetCounter] = createSignal(1);
  const displaySize = 5;
  const bufferSize = 2;
  let currentIndex = 0, solidLogo;
  createEffect(() => {
    const all = [{}, ...props.data.rows.map((row) => row.items()).flat()];
    setAllItems(all);
    setDisplayedItems(all.slice(0, displaySize + bufferSize));
  });
  function updateDisplayedItems() {
    const items = allItems();
    const start = Math.max(currentIndex, 0);
    const end = Math.min(currentIndex + displaySize + bufferSize, items.length);
    setDisplayedItems(items.slice(start, end));
  }
  function reset(_e, elm) {
    currentIndex = 0;
    setResetCounter((r) => r + 1);
    updateDisplayedItems();
    elm.children[1].setFocus();
    return true;
  }
  function shiftLeft(_e, elm) {
    if (currentIndex > 0) {
      currentIndex = Math.max(0, currentIndex - 1);
      elm.children[0].setFocus();
      updateDisplayedItems();
    }
    return true;
  }
  function shiftRight(_e, elm) {
    if (currentIndex < allItems().length - 1) {
      currentIndex = Math.min(allItems().length - 1, currentIndex + 1);
      elm.children[2].setFocus();
      updateDisplayedItems();
    }
    return true;
  }
  function animateOut(node) {
    return node.animate({
      y: 200,
      alpha: 0
    }, {
      duration: 500,
      easing: "ease-in-out"
    }).start().waitUntilStopped();
  }
  function animateIn(node) {
    node.alpha = 0;
    node.y = -100;
    return node.animate({
      y: 55,
      alpha: 1
    }, {
      duration: 500,
      easing: "ease-in-out"
    }).start().waitUntilStopped();
  }
  setGlobalBackground(255);
  const titleRowStyles = {
    fontFamily: "Raleway",
    fontSize: 24,
    height: 32,
    lineHeight: 32
  };
  const withTransition = {
    x: {
      duration: 250
    },
    alpha: {
      duration: 250
    }
  };
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
  }), createComponent(View, {
    x: 160,
    y: 300,
    height: 300,
    get children() {
      return [createComponent(Text, {
        style: titleRowStyles,
        children: "Infinite Item List"
      }), createComponent(Show, {
        get when() {
          return resetCounter();
        },
        keyed: true,
        get children() {
          return createComponent(View, {
            get autofocus() {
              return allItems();
            },
            onDestroy: animateOut,
            onCreate: animateIn,
            onFocus: (elm) => {
              var _a;
              return (_a = elm.children[1]) == null ? void 0 : _a.setFocus();
            },
            onLeft: shiftLeft,
            onRight: shiftRight,
            onUp: reset,
            onDown: reset,
            y: 55,
            get children() {
              return createComponent(List, {
                get each() {
                  return displayedItems();
                },
                children: (item, index) => {
                  const isEdgeItem = () => index() === 0 || index() === displayedItems().length - 1;
                  return createComponent(Poster, mergeProps(item, {
                    get x() {
                      return index() * 210 - 210;
                    },
                    get alpha() {
                      return isEdgeItem() ? 0 : 1;
                    },
                    transition: withTransition
                  }));
                }
              });
            }
          });
        }
      })];
    }
  })];
};
export {
  Loops as default
};
