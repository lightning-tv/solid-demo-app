(function() {
    function _toConsumableArray(r) {
        return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
    }
    function _nonIterableSpread() {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _iterableToArray(r) {
        if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
    }
    function _arrayWithoutHoles(r) {
        if (Array.isArray(r)) return _arrayLikeToArray(r);
    }
    function _slicedToArray(r, e) {
        return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
    }
    function _nonIterableRest() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _unsupportedIterableToArray(r, a) {
        if (r) {
            if ("string" == typeof r) return _arrayLikeToArray(r, a);
            var t = {}.toString.call(r).slice(8, -1);
            return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
        }
    }
    function _arrayLikeToArray(r, a) {
        (null == a || a > r.length) && (a = r.length);
        for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
        return n;
    }
    function _iterableToArrayLimit(r, l) {
        var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
        if (null != t) {
            var e, n, i, u, a = [], f = !0, o = !1;
            try {
                if (i = (t = t.call(r)).next, 0 === l) {
                    if (Object(t) !== t) return;
                    f = !1;
                } else for (;!(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) ;
            } catch (r) {
                o = !0, n = r;
            } finally {
                try {
                    if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
                } finally {
                    if (o) throw n;
                }
            }
            return a;
        }
    }
    function _arrayWithHoles(r) {
        if (Array.isArray(r)) return r;
    }
    System.register([ "./index-legacy-Cl2kdb-x.js" ], function(exports, module) {
        "use strict";
        var createSignal, createEffect, setGlobalBackground, createComponent, View, Text, Show, List, Poster, mergeProps;
        return {
            setters: [ function(module) {
                createSignal = module.a;
                createEffect = module.g;
                setGlobalBackground = module.s;
                createComponent = module.c;
                View = module.V;
                Text = module.T;
                Show = module.S;
                List = module.j;
                Poster = module.P;
                mergeProps = module.m;
            } ],
            execute: function execute() {
                var Loops = exports("default", function(props) {
                    var _createSignal = createSignal([]), _createSignal2 = _slicedToArray(_createSignal, 2), allItems = _createSignal2[0], setAllItems = _createSignal2[1];
                    var _createSignal3 = createSignal([]), _createSignal4 = _slicedToArray(_createSignal3, 2), displayedItems = _createSignal4[0], setDisplayedItems = _createSignal4[1];
                    var _createSignal5 = createSignal(1), _createSignal6 = _slicedToArray(_createSignal5, 2), resetCounter = _createSignal6[0], setResetCounter = _createSignal6[1];
                    var displaySize = 5;
                    var bufferSize = 2;
                    var currentIndex = 0, solidLogo;
                    createEffect(function() {
                        var all = [ {} ].concat(_toConsumableArray(props.data.rows.map(function(row) {
                            return row.items();
                        }).flat()));
                        setAllItems(all);
                        setDisplayedItems(all.slice(0, displaySize + bufferSize));
                    });
                    function updateDisplayedItems() {
                        var items = allItems();
                        var start = Math.max(currentIndex, 0);
                        var end = Math.min(currentIndex + displaySize + bufferSize, items.length);
                        setDisplayedItems(items.slice(start, end));
                    }
                    function reset(_e, elm) {
                        currentIndex = 0;
                        setResetCounter(function(r) {
                            return r + 1;
                        });
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
                    var titleRowStyles = {
                        fontFamily: "Raleway",
                        fontSize: 24,
                        height: 32,
                        lineHeight: 32
                    };
                    var withTransition = {
                        x: {
                            duration: 250
                        },
                        alpha: {
                            duration: 250
                        }
                    };
                    return [ createComponent(View, {
                        ref: function ref(r$) {
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
                            }) ];
                        }
                    }), createComponent(View, {
                        x: 160,
                        y: 300,
                        height: 300,
                        get children() {
                            return [ createComponent(Text, {
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
                                        onFocus: function onFocus(elm) {
                                            var _elm$children$;
                                            return (_elm$children$ = elm.children[1]) === null || _elm$children$ === void 0 ? void 0 : _elm$children$.setFocus();
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
                                                children: function children(item, index) {
                                                    var isEdgeItem = function isEdgeItem() {
                                                        return index() === 0 || index() === displayedItems().length - 1;
                                                    };
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
                            }) ];
                        }
                    }) ];
                });
            }
        };
    });
})();
