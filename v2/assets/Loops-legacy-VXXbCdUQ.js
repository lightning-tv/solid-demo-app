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
    System.register([ "./index-legacy-Dc7vSCGh.js" ], function(exports, module) {
        "use strict";
        var createSignal, setGlobalBackground, createComponent, View, Text, Column, Row, For, Poster, mergeProps, Index, LazyRow, List;
        return {
            setters: [ function(module) {
                createSignal = module.a;
                setGlobalBackground = module.s;
                createComponent = module.c;
                View = module.V;
                Text = module.T;
                Column = module.C;
                Row = module.R;
                For = module.F;
                Poster = module.P;
                mergeProps = module.m;
                Index = module.I;
                LazyRow = module.L;
                List = module.j;
            } ],
            execute: function execute() {
                var Loops = exports("default", function(props) {
                    var _createSignal = createSignal(props.data.rows[0]), _createSignal2 = _slicedToArray(_createSignal, 2), activeRow = _createSignal2[0], setActiveRow = _createSignal2[1];
                    var currentIndex = 0, solidLogo;
                    setGlobalBackground(255);
                    var titleRowStyles = {
                        fontFamily: "Raleway",
                        fontSize: 24,
                        height: 32,
                        lineHeight: 32
                    };
                    function switchRow(e) {
                        if (e.key === "[") {
                            currentIndex = Math.max(0, currentIndex - 1);
                        }
                        if (e.key === "]") {
                            currentIndex = Math.min(props.data.rows.length - 1, currentIndex + 1);
                        }
                        if (e.key === "\\") {
                            var row = props.data.rows[0];
                            var items = row.items().slice().reverse();
                            row.setItems(items);
                            return;
                        }
                        setActiveRow(props.data.rows[currentIndex]);
                    }
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
                    }), createComponent(Column, {
                        get autofocus() {
                            var _activeRow;
                            return (_activeRow = activeRow()) === null || _activeRow === void 0 ? void 0 : _activeRow.items();
                        },
                        y: 240,
                        onKeyPress: switchRow,
                        get children() {
                            return [ createComponent(View, {
                                x: 160,
                                height: 300,
                                forwardFocus: 1,
                                marginTop: 30,
                                get children() {
                                    return [ createComponent(Text, {
                                        skipFocus: true,
                                        style: titleRowStyles,
                                        children: "For Loop"
                                    }), createComponent(Row, {
                                        gap: 20,
                                        y: 40,
                                        display: "block",
                                        get children() {
                                            return createComponent(For, {
                                                get each() {
                                                    var _activeRow2;
                                                    return (_activeRow2 = activeRow()) === null || _activeRow2 === void 0 ? void 0 : _activeRow2.items();
                                                },
                                                children: function children(item, index) {
                                                    return createComponent(Poster, mergeProps({
                                                        get x() {
                                                            return index() * 210;
                                                        }
                                                    }, item));
                                                }
                                            });
                                        }
                                    }) ];
                                }
                            }), createComponent(View, {
                                x: 160,
                                height: 300,
                                forwardFocus: 1,
                                marginTop: 30,
                                get children() {
                                    return [ createComponent(Text, {
                                        skipFocus: true,
                                        style: titleRowStyles,
                                        children: "Map Loop"
                                    }), createComponent(Row, {
                                        gap: 20,
                                        y: 40,
                                        display: "block",
                                        get children() {
                                            var _activeRow3;
                                            return (_activeRow3 = activeRow()) === null || _activeRow3 === void 0 || (_activeRow3 = _activeRow3.items()) === null || _activeRow3 === void 0 ? void 0 : _activeRow3.map(function(item, index) {
                                                return createComponent(Poster, mergeProps({
                                                    x: index * 210
                                                }, item));
                                            });
                                        }
                                    }) ];
                                }
                            }), createComponent(View, {
                                x: 160,
                                height: 300,
                                forwardFocus: 1,
                                marginTop: 30,
                                get children() {
                                    return [ createComponent(Text, {
                                        skipFocus: true,
                                        style: titleRowStyles,
                                        children: "Index Loop"
                                    }), createComponent(Row, {
                                        gap: 20,
                                        y: 40,
                                        display: "block",
                                        get children() {
                                            return createComponent(Index, {
                                                get each() {
                                                    var _activeRow4;
                                                    return (_activeRow4 = activeRow()) === null || _activeRow4 === void 0 ? void 0 : _activeRow4.items();
                                                },
                                                children: function children(item, index) {
                                                    return createComponent(Poster, mergeProps({
                                                        x: index * 210
                                                    }, item));
                                                }
                                            });
                                        }
                                    }) ];
                                }
                            }), createComponent(View, {
                                x: 160,
                                height: 300,
                                forwardFocus: 1,
                                marginTop: 30,
                                get children() {
                                    return [ createComponent(Text, {
                                        skipFocus: true,
                                        style: titleRowStyles,
                                        children: "Lazy Row Loop"
                                    }), createComponent(LazyRow, {
                                        display: "block",
                                        gap: 20,
                                        upCount: 5,
                                        get each() {
                                            var _activeRow5;
                                            return (_activeRow5 = activeRow()) === null || _activeRow5 === void 0 ? void 0 : _activeRow5.items();
                                        },
                                        y: 50,
                                        children: function children(item, index) {
                                            return createComponent(Poster, mergeProps({
                                                x: index * 210
                                            }, item));
                                        }
                                    }) ];
                                }
                            }), createComponent(View, {
                                x: 160,
                                height: 300,
                                forwardFocus: 1,
                                marginTop: 30,
                                get children() {
                                    return [ createComponent(Text, {
                                        skipFocus: true,
                                        style: titleRowStyles,
                                        children: "List Loop"
                                    }), createComponent(Row, {
                                        gap: 20,
                                        y: 40,
                                        display: "block",
                                        get children() {
                                            return createComponent(List, {
                                                get each() {
                                                    var _activeRow6;
                                                    return (_activeRow6 = activeRow()) === null || _activeRow6 === void 0 ? void 0 : _activeRow6.items();
                                                },
                                                children: function children(item, index) {
                                                    return createComponent(Poster, mergeProps({
                                                        get x() {
                                                            return index() * 210;
                                                        }
                                                    }, item, {
                                                        transition: {
                                                            x: {
                                                                duration: 5550
                                                            }
                                                        }
                                                    }));
                                                }
                                            });
                                        }
                                    }) ];
                                }
                            }) ];
                        }
                    }) ];
                });
            }
        };
    });
})();
