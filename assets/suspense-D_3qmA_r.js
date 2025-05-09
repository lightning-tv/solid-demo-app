import { s as setGlobalBackground, a as createResource, l as createElement, n as setProp, q as insert, h as createComponent, a4 as createTextNode, _ as insertNode, a1 as use, c as createSignal, g as onMount, j as onCleanup, f as createEffect, a5 as Suspense$1, D as memo, A as children } from "./index-CMF002ea.js";
function Suspense(props) {
  let children$1;
  let suspense = Suspense$1({
    get children() {
      return [children$1 = children(() => props.children)];
    }
  });
  return [memo(() => {
    var _a;
    return (_a = suspense()) != null ? _a : props.fallback;
  }), (() => {
    var _el$ = createElement("view");
    setProp(_el$, "hidden", true);
    insert(_el$, () => suspense() ? null : children$1);
    return _el$;
  })()];
}
function fadeIn(el) {
  el.alpha = 0;
  el.animate({
    alpha: 1
  }, {
    duration: 250,
    easing: "ease-in-out"
  }).start();
}
function fadeOut(el) {
  return el.animate({
    alpha: 0
  }, {
    duration: 250,
    easing: "ease-in-out"
  }).start().waitUntilStopped();
}
function SuspensePage() {
  setGlobalBackground(255);
  let lastCount = 0;
  const [data, {
    refetch
  }] = createResource(async () => {
    await new Promise((r) => setTimeout(r, 1600));
    return ++lastCount;
  });
  return (() => {
    var _el$2 = createElement("view");
    setProp(_el$2, "forwardFocus", 0);
    insert(_el$2, createComponent(Suspense, {
      get fallback() {
        return (() => {
          var _el$7 = createElement("view"), _el$8 = createElement("text");
          insertNode(_el$7, _el$8);
          setProp(_el$7, "onCreate", fadeIn);
          setProp(_el$7, "onDestroy", fadeOut);
          setProp(_el$7, "display", "flex");
          setProp(_el$7, "center", true);
          insertNode(_el$8, createTextNode("Loading..."));
          return _el$7;
        })();
      },
      get children() {
        var _el$3 = createElement("view"), _el$4 = createElement("text"), _el$5 = createTextNode("Hello World"), _el$6 = createTextNode(" (Press Enter to refetch)");
        insertNode(_el$3, _el$4);
        use(() => {
          const [count, setCount] = createSignal(0);
          onMount(() => {
            const interval = setInterval(() => {
              setCount((prev) => prev + 1);
            }, 200);
            onCleanup(() => clearInterval(interval));
          });
          createEffect(() => {
            console.log("count", count());
          });
        }, _el$3);
        setProp(_el$3, "autofocus", true);
        setProp(_el$3, "onCreate", fadeIn);
        setProp(_el$3, "onDestroy", fadeOut);
        setProp(_el$3, "onEnter", () => {
          refetch();
        });
        setProp(_el$3, "display", "flex");
        setProp(_el$3, "center", true);
        insertNode(_el$4, _el$5);
        insertNode(_el$4, _el$6);
        insert(_el$4, () => {
          var _a;
          return "!".repeat((_a = data()) != null ? _a : 0);
        }, _el$6);
        return _el$3;
      }
    }));
    return _el$2;
  })();
}
export {
  SuspensePage as default
};
