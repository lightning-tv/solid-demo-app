import { c as createSignal, r as createRenderEffect, o as on, v as createRoot, E as ElementNode, p as onCleanup, k as memo, n as children, s as setGlobalBackground, h as createComponent, V as View, T as Text, D as Dynamic, F as For, m as mergeProps } from "./index-nPRVyzNv.js";
import { B as Button } from "./Button-Dzn4zw2O.js";
const Visible = (props) => {
  const [current, setCurrent] = createSignal();
  createRenderEffect(on(() => props.when, (condition) => {
    var _a;
    if (condition && !current()) {
      const root = createRoot((dispose) => ({
        disposer: dispose,
        childList: children(() => props.children).toArray()
      }));
      setCurrent(root);
    }
    const isHidden = !condition;
    (_a = current()) == null ? void 0 : _a.childList.forEach((child) => {
      if (child instanceof ElementNode) {
        child.hidden = isHidden;
      }
    });
  }));
  onCleanup(() => {
    var _a;
    return (_a = current()) == null ? void 0 : _a.disposer();
  });
  return memo(() => {
    var _a;
    return (_a = current()) == null ? void 0 : _a.childList;
  });
};
function Square(props) {
  return createComponent(View, mergeProps(props, {
    get width() {
      return props.size || 80;
    },
    get height() {
      return props.size || 80;
    },
    get color() {
      return props.color || 3772834047;
    }
  }));
}
function Card(props) {
  return createComponent(View, mergeProps(props, {
    get width() {
      return props.size === "large" ? 400 : 200;
    },
    get height() {
      return props.size === "large" ? 500 : 300;
    },
    transition: true,
    color: 143766271,
    get children() {
      return [createComponent(Square, {
        x: 80,
        y: 80
      }), createComponent(Square, {
        x: 20,
        y: 20,
        size: 40
      })];
    }
  }));
}
const PositioningPage = () => {
  setGlobalBackground(506018815);
  const [x, setX] = createSignal(100);
  const [size, setSize] = createSignal(true);
  const [dynamicComponents] = createSignal([Square, Card, Square]);
  const interval = setInterval(() => {
    setX((x2) => x2 === 100 ? 250 : 100);
    setSize((size2) => !size2);
  }, 2e3);
  onCleanup(() => clearInterval(interval));
  return createComponent(View, {
    x: 150,
    autofocus: true,
    get children() {
      return [createComponent(Visible, {
        get when() {
          return size();
        },
        get children() {
          return [createComponent(Square, {
            onDestroy: () => console.log("destroyed"),
            x: 100,
            y: 100,
            size: 50,
            color: 4014228735
          }), createComponent(Square, {
            x: 100,
            y: 200,
            size: 100,
            color: 583360255
          }), createComponent(Square, {
            x: 100,
            y: 350,
            size: 200,
            color: 998438655
          })];
        }
      }), createComponent(Square, {
        get x() {
          return x();
        },
        y: 600,
        size: 50,
        transition: {
          x: {
            duration: 1e3,
            easing: "linear"
          }
        }
      }), createComponent(Card, {
        x: 500,
        y: 100,
        get size() {
          return size() ? "large" : "small";
        }
      }), createComponent(Card, {
        x: 500,
        y: 500,
        get size() {
          return size() ? "small" : "large";
        }
      }), createComponent(View, {
        x: 1e3,
        y: 100,
        get children() {
          return [createComponent(Text, {
            children: "Dynamic Components"
          }), createComponent(Dynamic, {
            component: Button,
            y: 50,
            width: 200,
            children: "Button"
          }), createComponent(For, {
            get each() {
              return dynamicComponents();
            },
            children: (Component, index) => createComponent(Dynamic, {
              component: Component,
              get x() {
                return 205 * index();
              },
              y: 300,
              size: 50
            })
          })];
        }
      })];
    }
  });
};
export {
  PositioningPage as default
};
