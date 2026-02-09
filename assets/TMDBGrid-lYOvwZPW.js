import { a as createSignal, k as createMemo, g as createEffect, l as createElement, n as chainRefs, p as use, q as spread, m as mergeProps, r as insert, c as createComponent, F as For, E as ElementNode, v as debounce, s as setGlobalBackground, i as on, w as activeElement, V as View, T as Text, x as ContentBlock, P as Poster } from "./index-C4XzYpcz.js";

function Grid(props) {
    const [focusedIndex, setFocusedIndex] = createSignal(0);
    const baseColumns = 4;
    const itemWidth = () => {
        var _a;
        return (_a = props.itemWidth) != null ? _a : 300;
    };
    const itemHeight = () => {
        var _a;
        return (_a = props.itemHeight) != null ? _a : 300;
    };
    const columns = createMemo(() => props.columns || baseColumns);
    const totalWidth = createMemo(() => {
        var _a;
        return itemWidth() + ((_a = props.itemOffset) != null ? _a : 0);
    });
    const totalHeight = createMemo(() => {
        var _a;
        return itemHeight() + ((_a = props.itemOffset) != null ? _a : 0);
    });
    function focus() {
        var _a;
        const focusedElm = gridRef.children[focusedIndex()];
        if (focusedElm instanceof ElementNode && !focusedElm.states.has("$focus")) {
            focusedElm.setFocus();
            (_a = props.onSelectedChanged) == null ? void 0 : _a.call(gridRef, focusedIndex(), gridRef, focusedElm);
            return true;
        }
        return false;
    }
    function moveFocus(delta) {
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
        return focus();
    }
    function handleHorizontalFocus(delta) {
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
        return focus();
    }
    createEffect(() => {
        if (props.items && props.items.length > 0 && gridRef && gridRef.states.has("$focus")) {
            queueMicrotask(focus);
        }
    });
    const scrollY = createMemo(() => {
        var _a;
        return props.scroll === "none" ? (_a = props.y) != null ? _a : 0 : -Math.floor(focusedIndex() / columns()) * totalHeight() + (props.y || 0);
    });
    let gridRef;
    return (() => {
        var _el$ = createElement("view");
        var _ref$ = chainRefs(el => gridRef = el, props.ref);
        typeof _ref$ === "function" && use(_ref$, _el$);
        spread(_el$, mergeProps(props, {
            transition: {
                y: true
            },
            onUp: () => moveFocus(-columns()),
            onDown: () => moveFocus(columns()),
            onLeft: () => handleHorizontalFocus(-1),
            onRight: () => handleHorizontalFocus(1),
            onFocus: () => handleHorizontalFocus(0),
            strictBounds: false,
            get y() {
                return scrollY();
            }
        }), true);
        insert(_el$, createComponent(For, {
            get each() {
                return props.items;
            },
            children: (item, index) => createComponent(props.children, {
                item: item,
                get index() {
                    return index();
                },
                get width() {
                    return itemWidth();
                },
                get height() {
                    return itemHeight();
                },
                get x() {
                    return index() % columns() * totalWidth();
                },
                get y() {
                    return Math.floor(index() / columns()) * totalHeight();
                }
            })
        }));
        return _el$;
    })();
}

const TMDB = props => {
    const [heroContent, setHeroContent] = createSignal({});
    let contentBlock, solidLogo, firstRun = true;
    const delayedBackgrounds = debounce(setGlobalBackground, 800);
    const delayedHero = debounce(content => setHeroContent(content || {}), 600);
    createEffect(on(activeElement, elm => {
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
    const items = createMemo(() => props.data.rows.map(row => row.items()).flat());
    return [ createComponent(View, {
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
            return [ createComponent(Text, {
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
            }) ];
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
    }) ];
};

export { TMDB as default };
