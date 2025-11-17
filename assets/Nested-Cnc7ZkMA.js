import { s as setGlobalBackground, a as createSignal, c as createComponent, C as Column, p as createElement, a4 as setProp, w as insert, N as Button, a5 as effect } from "./index-DL_ssk2q.js";
const NestedButtonColumns = () => {
  setGlobalBackground(858993663);
  const styles = {
    container: {
      x: 400,
      width: 400,
      height: 1080,
      color: 2576980479,
      display: "flex",
      flexDirection: "column",
      // Arranges columns horizontally
      justifyContent: "spaceBetween",
      // Distributes columns evenly
      padding: 10
    }
  };
  const [currentIndex, setCurrentIndex] = createSignal(0);
  return createComponent(Column, {
    get style() {
      return styles.container;
    },
    scroll: "none",
    get children() {
      return [(() => {
        var _el$ = createElement("view");
        setProp(_el$, "forwardFocus", 0);
        setProp(_el$, "clipping", true);
        setProp(_el$, "height", 600);
        setProp(_el$, "x", 50);
        insert(_el$, createComponent(Column, {
          scrollIndex: 3,
          onSelectedChanged: setCurrentIndex,
          get children() {
            return [createComponent(Button, {
              title: "Button 1A",
              autofocus: true,
              onEnter: () => console.log("Button 1A pressed")
            }), createComponent(Button, {
              title: "Button 1B",
              onEnter: () => console.log("Button 1B pressed")
            }), createComponent(Button, {
              title: "Button 1C",
              onEnter: () => console.log("Button 1C pressed")
            }), createComponent(Button, {
              title: "Button 1D",
              onEnter: () => console.log("Button 1C pressed")
            }), createComponent(Button, {
              title: "Button 1E",
              onEnter: () => console.log("Button 1C pressed")
            }), createComponent(Button, {
              title: "Button 1F",
              onEnter: () => console.log("Button 1C pressed")
            }), createComponent(Button, {
              title: "Button 1G",
              onEnter: () => console.log("Button 1C pressed")
            }), createComponent(Button, {
              title: "Button 1H",
              onEnter: () => console.log("Button 1C pressed")
            })];
          }
        }));
        return _el$;
      })(), (() => {
        var _el$2 = createElement("view");
        setProp(_el$2, "colorTop", 2576980479);
        setProp(_el$2, "colorBottom", 2576980224);
        setProp(_el$2, "height", 100);
        setProp(_el$2, "y", 10);
        setProp(_el$2, "skipFocus", true);
        setProp(_el$2, "flexItem", false);
        effect((_$p) => setProp(_el$2, "alpha", currentIndex() > 0 ? 1 : 0, _$p));
        return _el$2;
      })(), (() => {
        var _el$3 = createElement("view");
        setProp(_el$3, "colorTop", 2576980224);
        setProp(_el$3, "colorBottom", 2576980479);
        setProp(_el$3, "height", 100);
        setProp(_el$3, "y", 510);
        setProp(_el$3, "skipFocus", true);
        setProp(_el$3, "flexItem", false);
        effect((_$p) => setProp(_el$3, "alpha", currentIndex() === 7 ? 0 : 1, _$p));
        return _el$3;
      })(), (() => {
        var _el$4 = createElement("view");
        setProp(_el$4, "height", 4);
        setProp(_el$4, "color", 3284386815);
        setProp(_el$4, "skipFocus", true);
        return _el$4;
      })(), (() => {
        var _el$5 = createElement("view");
        setProp(_el$5, "forwardFocus", 0);
        setProp(_el$5, "clipping", true);
        setProp(_el$5, "height", 400);
        setProp(_el$5, "x", 50);
        insert(_el$5, createComponent(Column, {
          get children() {
            return [createComponent(Button, {
              title: "Button 3A",
              onEnter: () => console.log("Button 3A pressed")
            }), createComponent(Button, {
              title: "Button 3B",
              onEnter: () => console.log("Button 3B pressed")
            }), createComponent(Button, {
              title: "Button 3C",
              onEnter: () => console.log("Button 3C pressed")
            })];
          }
        }));
        return _el$5;
      })()];
    }
  });
};
export {
  NestedButtonColumns as default
};
