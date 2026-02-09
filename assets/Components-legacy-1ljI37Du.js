(function() {
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
    System.register([ "./index-legacy-PagE8P5A.js" ], function(exports, module) {
        "use strict";
        var createMemo, onCleanup, untrack, createRoot, children, ElementNode, setGlobalBackground, createSignal, createComponent, View, Text, Dynamic, Button, For, mergeProps;
        return {
            setters: [ function(module) {
                createMemo = module.k;
                onCleanup = module.J;
                untrack = module.M;
                createRoot = module.N;
                children = module.z;
                ElementNode = module.E;
                setGlobalBackground = module.s;
                createSignal = module.a;
                createComponent = module.c;
                View = module.V;
                Text = module.T;
                Dynamic = module.O;
                Button = module.Q;
                For = module.F;
                mergeProps = module.m;
            } ],
            execute: function execute() {
                function Visible(props) {
                    var child;
                    var disposer;
                    var keyed = props.keyed;
                    var condition = createMemo(function() {
                        return props.when;
                    }, void 0, {
                        equals: function equals(a, b) {
                            return keyed ? a === b : !a === !b;
                        }
                    });
                    onCleanup(function() {
                        var _disposer;
                        return (_disposer = disposer) === null || _disposer === void 0 ? void 0 : _disposer();
                    });
                    return createMemo(function() {
                        var _child;
                        var c = condition();
                        var isKeyed = untrack(function() {
                            return !!keyed;
                        });
                        if (isKeyed) {
                            var _disposer2;
                            (_disposer2 = disposer) === null || _disposer2 === void 0 || _disposer2();
                            child = void 0;
                        }
                        if (c && !child) {
                            disposer = createRoot(function(dispose) {
                                child = children(function() {
                                    return props.children;
                                });
                                return dispose;
                            });
                        }
                        var isHidden = !c;
                        (_child = child) === null || _child === void 0 || _child.toArray().forEach(function(childNode) {
                            if (childNode instanceof ElementNode) {
                                childNode.hidden = isHidden;
                            }
                        });
                        return c || child ? child : null;
                    });
                }
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
                            return [ createComponent(Square, {
                                x: 80,
                                y: 80
                            }), createComponent(Square, {
                                x: 20,
                                y: 20,
                                size: 40
                            }) ];
                        }
                    }));
                }
                var PositioningPage = exports("default", function() {
                    setGlobalBackground(506018815);
                    var _createSignal = createSignal(100), _createSignal2 = _slicedToArray(_createSignal, 2), x = _createSignal2[0], setX = _createSignal2[1];
                    var _createSignal3 = createSignal(true), _createSignal4 = _slicedToArray(_createSignal3, 2), size = _createSignal4[0], setSize = _createSignal4[1];
                    var _createSignal5 = createSignal([ Square, Card, Square ]), _createSignal6 = _slicedToArray(_createSignal5, 1), dynamicComponents = _createSignal6[0];
                    var interval = setInterval(function() {
                        setX(function(x2) {
                            return x2 === 100 ? 250 : 100;
                        });
                        setSize(function(size2) {
                            return !size2;
                        });
                    }, 2e3);
                    onCleanup(function() {
                        return clearInterval(interval);
                    });
                    return createComponent(View, {
                        x: 150,
                        autofocus: true,
                        get children() {
                            return [ createComponent(Visible, {
                                get when() {
                                    return size();
                                },
                                get children() {
                                    return [ createComponent(Square, {
                                        onDestroy: function onDestroy() {
                                            return console.log("destroyed");
                                        },
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
                                    }) ];
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
                                    return [ createComponent(Text, {
                                        children: "Dynamic Components"
                                    }), createComponent(Dynamic, {
                                        component: Button,
                                        y: 50,
                                        width: 300,
                                        children: "Button"
                                    }), createComponent(For, {
                                        get each() {
                                            return dynamicComponents();
                                        },
                                        children: function children(Component, index) {
                                            return createComponent(Dynamic, {
                                                component: Component,
                                                get x() {
                                                    return 205 * index();
                                                },
                                                y: 300,
                                                size: 50
                                            });
                                        }
                                    }) ];
                                }
                            }) ];
                        }
                    });
                });
            }
        };
    });
})();
