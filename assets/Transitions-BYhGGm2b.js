import { s as setGlobalBackground, c as createSignal, h as createComponent, V as View } from "./index-BZ986FVI.js";
const Default = () => {
  setGlobalBackground(506018815);
  const [y, setY] = createSignal(50);
  setTimeout(() => {
    setY(1080 - 50 - 200);
  }, 750);
  function onStart() {
    console.log("start");
  }
  function onEnd() {
    console.log("end");
  }
  return createComponent(View, {
    x: 150,
    autofocus: true,
    get children() {
      return [createComponent(View, {
        width: 200,
        height: 200,
        x: 50,
        get y() {
          return y();
        },
        color: 3689611007,
        transition: true
      }), createComponent(View, {
        width: 200,
        height: 200,
        x: 300,
        get y() {
          return y();
        },
        color: 3218865919,
        transition: {
          y: true
        }
      }), createComponent(View, {
        width: 200,
        height: 200,
        x: 550,
        get y() {
          return y();
        },
        color: 2479226367,
        transition: {
          y: {
            duration: 1e3
          }
        },
        onAnimation: {
          animating: onStart,
          stopped: onEnd
        }
      }), createComponent(View, {
        width: 200,
        height: 200,
        x: 800,
        get y() {
          return y();
        },
        color: 1621490431,
        transition: {
          y: {
            duration: 500,
            delay: 1e3
          }
        },
        onAnimation: {
          animating: onStart,
          stopped: onEnd
        }
      }), createComponent(View, {
        width: 200,
        height: 200,
        x: 1050,
        get y() {
          return y();
        },
        color: 998438655,
        transition: {
          y: {
            duration: 500,
            easing: "ease-in-out"
          }
        },
        onAnimation: {
          stopped: onEnd
        }
      }), createComponent(View, {
        width: 200,
        height: 200,
        x: 1300,
        get y() {
          return y();
        },
        color: 627305471,
        transition: {
          y: {
            duration: 3e3,
            easing: "ease-in-out-back"
          }
        },
        onAnimation: {
          stopped: onEnd
        }
      }), createComponent(View, {
        width: 200,
        height: 200,
        x: 1550,
        get y() {
          return y();
        },
        color: 507153151,
        transition: {
          y: {
            duration: 800,
            easing: "cubic-bezier(1,-0.64,.39,1.44)"
          }
        }
      })];
    }
  });
};
export {
  Default as default
};
