import { s as setGlobalBackground, c as createSignal, p as onCleanup, h as createComponent, V as View, T as Text, D as Dynamic, F as For, m as mergeProps } from "./index-4ZWPfbJM.js";
import { B as Button } from "./Button-BRDy66rN.js";
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
      return [createComponent(Square, {
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
