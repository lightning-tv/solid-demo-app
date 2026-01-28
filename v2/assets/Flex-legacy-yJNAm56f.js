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
        var createSignal, onMount, setGlobalBackground, createComponent, Column, Text, Row, styles, View, mergeProps;
        return {
            setters: [ function(module) {
                createSignal = module.a;
                onMount = module.o;
                setGlobalBackground = module.s;
                createComponent = module.c;
                Column = module.C;
                Text = module.T;
                Row = module.R;
                styles = module.D;
                View = module.V;
                mergeProps = module.m;
            } ],
            execute: function execute() {
                var FlexPage = exports("default", function() {
                    var RowStyles = {
                        display: "flex",
                        justifyContent: "flexStart",
                        width: 1600,
                        height: 110,
                        color: 1303115263
                    };
                    var rowTitle = {
                        fontSize: 44,
                        marginTop: 25,
                        marginBottom: -20,
                        skipFocus: true
                    };
                    function Block(props) {
                        var styles2 = {
                            width: 200,
                            height: 100,
                            y: 5,
                            color: 392801023
                        };
                        return createComponent(View, mergeProps(props, {
                            style: styles2
                        }));
                    }
                    var _createSignal = createSignal(50), _createSignal2 = _slicedToArray(_createSignal, 2), columnY = _createSignal2[0], setColumnY = _createSignal2[1];
                    function onFocus() {
                        this.children[this.selected || 0].setFocus();
                        setColumnY(150 + (this.y || 0) * -1);
                    }
                    onMount(function() {
                        setGlobalBackground(858993663);
                    });
                    var gap = 50;
                    return createComponent(Column, {
                        x: 160,
                        get y() {
                            return columnY();
                        },
                        gap: 30,
                        height: 850,
                        get width() {
                            return RowStyles.width;
                        },
                        get style() {
                            return styles.Column;
                        },
                        get children() {
                            return [ createComponent(Text, {
                                style: rowTitle,
                                children: "Flex Start"
                            }), createComponent(Row, {
                                gap: gap,
                                style: RowStyles,
                                onFocus: onFocus,
                                get children() {
                                    return [ createComponent(Block, {
                                        autofocus: true
                                    }), createComponent(Block, {}), createComponent(Block, {}), createComponent(Block, {}), createComponent(Block, {}) ];
                                }
                            }), createComponent(Text, {
                                style: rowTitle,
                                children: "Flex Start - Margin Left"
                            }), createComponent(Row, {
                                gap: gap,
                                style: RowStyles,
                                onFocus: onFocus,
                                get children() {
                                    return [ createComponent(Block, {
                                        marginLeft: 100
                                    }), createComponent(Block, {}), createComponent(Block, {
                                        marginLeft: 100
                                    }), createComponent(Block, {}), createComponent(Block, {}) ];
                                }
                            }), createComponent(Text, {
                                style: rowTitle,
                                children: "Flex End"
                            }), createComponent(Row, {
                                gap: gap,
                                justifyContent: "flexEnd",
                                style: RowStyles,
                                onFocus: onFocus,
                                get children() {
                                    return [ createComponent(Block, {}), createComponent(Block, {}), createComponent(Block, {}), createComponent(Block, {}), createComponent(Block, {}) ];
                                }
                            }), createComponent(Text, {
                                style: rowTitle,
                                children: "Flex End - Margin Right"
                            }), createComponent(Row, {
                                gap: gap,
                                justifyContent: "flexEnd",
                                style: RowStyles,
                                onFocus: onFocus,
                                get children() {
                                    return [ createComponent(Block, {}), createComponent(Block, {
                                        marginRight: 100
                                    }), createComponent(Block, {}), createComponent(Block, {}), createComponent(Block, {
                                        marginRight: 100
                                    }) ];
                                }
                            }), createComponent(Text, {
                                style: rowTitle,
                                children: "Center"
                            }), createComponent(Row, {
                                gap: gap,
                                justifyContent: "center",
                                style: RowStyles,
                                onFocus: onFocus,
                                get children() {
                                    return [ createComponent(Block, {}), createComponent(Block, {
                                        marginLeft: 80
                                    }), createComponent(Block, {}), createComponent(Block, {
                                        marginLeft: 80
                                    }), createComponent(Block, {}) ];
                                }
                            }), createComponent(Text, {
                                style: rowTitle,
                                children: "Space Between"
                            }), createComponent(Row, {
                                gap: gap,
                                justifyContent: "spaceBetween",
                                style: RowStyles,
                                onFocus: onFocus,
                                get children() {
                                    return [ createComponent(Block, {}), createComponent(Block, {}), createComponent(Block, {}), createComponent(Block, {}), createComponent(Block, {
                                        marginRight: 40
                                    }) ];
                                }
                            }), createComponent(Text, {
                                style: rowTitle,
                                children: "Space Evenly"
                            }), createComponent(Row, {
                                gap: gap,
                                justifyContent: "spaceEvenly",
                                style: RowStyles,
                                onFocus: onFocus,
                                get children() {
                                    return [ createComponent(Block, {}), createComponent(Block, {}), createComponent(Block, {
                                        marginLeft: 80
                                    }), createComponent(Block, {}), createComponent(Block, {}) ];
                                }
                            }), createComponent(Text, {
                                style: rowTitle,
                                children: "Flex Wrap"
                            }), createComponent(Row, {
                                gap: gap,
                                justifyContent: "flexStart",
                                flexWrap: "wrap",
                                alignItems: "center",
                                style: RowStyles,
                                onFocus: onFocus,
                                get children() {
                                    return [ createComponent(Block, {
                                        width: 300
                                    }), createComponent(Block, {
                                        width: 300
                                    }), createComponent(Block, {
                                        width: 300,
                                        alignSelf: "flexStart"
                                    }), createComponent(Block, {
                                        width: 300
                                    }), createComponent(Block, {
                                        width: 300
                                    }), createComponent(Block, {
                                        width: 300,
                                        alignSelf: "flexEnd"
                                    }), createComponent(Block, {
                                        width: 300
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
