import { s as setGlobalBackground, c as createComponent, C as Column, l as createElement, a4 as setProp, r as insert, O as Button } from "./index-gL7wR27X.js";
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
        setProp(_el$2, "height", 4);
        setProp(_el$2, "color", 3284386815);
        setProp(_el$2, "skipFocus", true);
        return _el$2;
      })(), (() => {
        var _el$3 = createElement("view");
        setProp(_el$3, "forwardFocus", 0);
        setProp(_el$3, "clipping", true);
        setProp(_el$3, "height", 400);
        setProp(_el$3, "x", 50);
        insert(_el$3, createComponent(Column, {
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
        return _el$3;
      })()];
    }
  });
};
export {
  NestedButtonColumns as default
};
