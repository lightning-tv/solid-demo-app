import { a as createSignal, l as createElement, a7 as insertNode, a4 as setProp, r as insert, B as memo, c as createComponent, N as createRoot, a8 as getOwner, J as onCleanup, p as use, g as createEffect, a6 as effect, a9 as Config } from "./index-CekWesQ9.js";

function createPersistentComponent(fn) {
    let result;
    let owner;
    let dispose = null;
    let [props, setProps] = createSignal(null);
    let detachedOwner = getOwner();
    return p => {
        setProps(() => p);
        if (dispose == null) {
            createRoot(d => {
                dispose = d;
                result = fn(props);
            }, detachedOwner);
        }
        let o = owner = getOwner();
        onCleanup(() => {
            queueMicrotask(() => {
                if (dispose != null && owner === o) {
                    dispose();
                    dispose = owner = result = null;
                }
            });
        });
        return result;
    };
}

function getElementRect(el) {
    let {width: width, height: height} = el;
    let x = 0, y = 0;
    if (el.scaleX != null) width *= el.scaleX;
    if (el.scaleY != null) height *= el.scaleY;
    let curr = el;
    while (curr != null) {
        x += curr.x;
        y += curr.y;
        if (curr.scaleX != null) {
            x += curr.width / 2 * (1 - curr.scaleX);
        }
        if (curr.scaleY != null) {
            y += curr.height / 2 * (1 - curr.scaleY);
        }
        curr = curr.parent;
    }
    if (Config.rendererOptions != null) {
        let dpr = Config.rendererOptions.deviceLogicalPixelRatio;
        if (dpr != null) {
            x *= dpr;
            y *= dpr;
            width *= dpr;
            height *= dpr;
        }
    }
    return {
        x: x,
        y: y,
        width: width,
        height: height
    };
}

function KeepAlivePage() {
    const [counter, setCounter] = createSignal(0);
    setInterval(() => {
        setCounter(prev => prev + 1);
    }, 1e3);
    const Comp = createPersistentComponent(props => (() => {
        var _el$ = createElement("view"), _el$2 = createElement("text");
        insertNode(_el$, _el$2);
        use(el => {
            createEffect(rect => {
                var _a, _b;
                props();
                let r = getElementRect(el);
                if (rect != null) {
                    el.lng.x = ((_a = el.lng.x) != null ? _a : 0) - (r.x - rect.x);
                    el.lng.y = ((_b = el.lng.y) != null ? _b : 0) - (r.y - rect.y);
                    el.animate({
                        x: Math.random() * 40,
                        y: Math.random() * 60,
                        alpha: 1
                    }, {
                        duration: 250,
                        easing: "ease-in-out"
                    }).start();
                }
                return r;
            });
        }, _el$);
        setProp(_el$, "height", 80);
        setProp(_el$, "width", 120);
        setProp(_el$, "onCreate", el => {
            el.alpha = 0;
            el.animate({
                alpha: 1
            }, {
                duration: 250,
                easing: "ease-in-out"
            }).start();
        });
        setProp(_el$, "onDestroy", el => {
            el.rtt = true;
            return el.animate({
                alpha: 0
            }, {
                duration: 250,
                easing: "ease-in-out"
            }).start().waitUntilStopped();
        });
        setProp(_el$2, "color", 4294967295);
        insert(_el$2, () => props().text);
        effect(_p$ => {
            var _v$ = Math.floor(Math.random() * 16777215) << 8 | 255, _v$2 = Math.random() * 40, _v$3 = Math.random() * 60;
            _v$ !== _p$.e && (_p$.e = setProp(_el$, "color", _v$, _p$.e));
            _v$2 !== _p$.t && (_p$.t = setProp(_el$, "x", _v$2, _p$.t));
            _v$3 !== _p$.a && (_p$.a = setProp(_el$, "y", _v$3, _p$.a));
            return _p$;
        }, {
            e: void 0,
            t: void 0,
            a: void 0
        });
        return _el$;
    })());
    return (() => {
        var _el$3 = createElement("view"), _el$4 = createElement("view"), _el$5 = createElement("view");
        insertNode(_el$3, _el$4);
        insertNode(_el$3, _el$5);
        setProp(_el$3, "display", "flex");
        setProp(_el$3, "flexDirection", "row");
        setProp(_el$4, "color", 286331391);
        setProp(_el$4, "width", 160);
        setProp(_el$4, "height", 160);
        insert(_el$4, (() => {
            var _c$ = memo(() => counter() % 3 == 0);
            return () => _c$() && createComponent(Comp, {
                text: "one"
            });
        })());
        setProp(_el$5, "color", 572662527);
        setProp(_el$5, "width", 160);
        setProp(_el$5, "height", 160);
        insert(_el$5, (() => {
            var _c$2 = memo(() => counter() % 3 == 1);
            return () => _c$2() && createComponent(Comp, {
                text: "two"
            });
        })());
        return _el$3;
    })();
}

export { KeepAlivePage as default };
