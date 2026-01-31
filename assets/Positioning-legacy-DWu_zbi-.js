(function() {
    function _typeof(o) {
        "@babel/helpers - typeof";
        return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
            return typeof o;
        } : function(o) {
            return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
        }, _typeof(o);
    }
    function ownKeys(e, r) {
        var t = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var o = Object.getOwnPropertySymbols(e);
            r && (o = o.filter(function(r) {
                return Object.getOwnPropertyDescriptor(e, r).enumerable;
            })), t.push.apply(t, o);
        }
        return t;
    }
    function _objectSpread(e) {
        for (var r = 1; r < arguments.length; r++) {
            var t = null != arguments[r] ? arguments[r] : {};
            r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
                _defineProperty(e, r, t[r]);
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
                Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
            });
        }
        return e;
    }
    function _defineProperty(e, r, t) {
        return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
            value: t,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[r] = t, e;
    }
    function _toPropertyKey(t) {
        var i = _toPrimitive(t, "string");
        return "symbol" == _typeof(i) ? i : i + "";
    }
    function _toPrimitive(t, r) {
        if ("object" != _typeof(t) || !t) return t;
        var e = t[Symbol.toPrimitive];
        if (void 0 !== e) {
            var i = e.call(t, r || "default");
            if ("object" != _typeof(i)) return i;
            throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return ("string" === r ? String : Number)(t);
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
    System.register([ "./index-legacy-Rdw2PADi.js" ], function(exports, module) {
        "use strict";
        var setGlobalBackground, createSignal, onCleanup, createComponent, View, Text;
        return {
            setters: [ function(module) {
                setGlobalBackground = module.s;
                createSignal = module.a;
                onCleanup = module.J;
                createComponent = module.c;
                View = module.V;
                Text = module.T;
            } ],
            execute: function execute() {
                var PositioningPage = exports("default", function() {
                    setGlobalBackground(506018815);
                    var _createSignal = createSignal({
                        x1: 20,
                        x2: 140,
                        x3: 20 + 140 + 100,
                        x4: 380,
                        y: 140,
                        xA: 20,
                        xB: 140,
                        xC: 260,
                        xD: 380,
                        yNested: 0,
                        xNested: 0,
                        bar2: {
                            direction: "up",
                            v: "10%"
                        },
                        bar3: "10%"
                    }), _createSignal2 = _slicedToArray(_createSignal, 2), state = _createSignal2[0], setState = _createSignal2[1];
                    setTimeout(function() {
                        setState(function(prevState) {
                            return _objectSpread(_objectSpread({}, prevState), {}, {
                                xD: prevState.xD + 200,
                                xC: prevState.xC + 100,
                                xB: prevState.xB + 50,
                                xA: prevState.xA + 25
                            });
                        });
                    }, 4e3);
                    var intervals = [];
                    intervals.push(setInterval(function() {
                        setState(function(prevState) {
                            return _objectSpread(_objectSpread({}, prevState), {}, {
                                yNested: prevState.yNested === 0 ? 50 : 0
                            });
                        });
                    }, 2e3));
                    intervals.push(setInterval(function() {
                        setState(function(prevState) {
                            return _objectSpread(_objectSpread({}, prevState), {}, {
                                xNested: prevState.xNested === 0 ? 150 : 0
                            });
                        });
                    }, 1e3));
                    intervals.push(setInterval(function() {
                        setState(function(prevState) {
                            return _objectSpread(_objectSpread({}, prevState), {}, {
                                bar3: Math.ceil(Math.random() * 96) + ""
                            });
                        });
                    }, 2e3));
                    intervals.push(setInterval(function() {
                        setState(function(prevState) {
                            var v = parseFloat(prevState.bar2.v);
                            var newV = prevState.bar2.direction === "up" ? v + 10 : v - 10;
                            return _objectSpread(_objectSpread({}, prevState), {}, {
                                bar2: _objectSpread(_objectSpread({}, prevState.bar2), {}, {
                                    v: newV + "%",
                                    direction: newV >= 90 ? "down" : newV <= 10 ? "up" : prevState.bar2.direction
                                })
                            });
                        });
                    }, 400));
                    onCleanup(function() {
                        intervals.forEach(function(interval) {
                            return clearInterval(interval);
                        });
                    });
                    return createComponent(View, {
                        x: 150,
                        autofocus: true,
                        get children() {
                            return [ createComponent(View, {
                                width: 100,
                                height: 100,
                                x: 20,
                                y: 20,
                                color: 3976134655
                            }), createComponent(View, {
                                width: 100,
                                height: 100,
                                x: 140,
                                y: 20,
                                color: 2784230655
                            }), createComponent(View, {
                                width: 100,
                                height: 100,
                                x: 260,
                                y: 20,
                                color: 584314623
                            }), createComponent(View, {
                                width: 100,
                                height: 100,
                                x: 380,
                                y: 20,
                                color: 143766271
                            }), createComponent(View, {
                                width: 100,
                                height: 100,
                                get x() {
                                    return state().x1;
                                },
                                get y() {
                                    return state().y;
                                },
                                color: 4260691967
                            }), createComponent(View, {
                                width: 100,
                                height: 100,
                                get x() {
                                    return state().x2;
                                },
                                get y() {
                                    return state().y;
                                },
                                color: 4124114687
                            }), createComponent(View, {
                                width: 100,
                                height: 100,
                                get x() {
                                    return state().x3;
                                },
                                get y() {
                                    return state().y;
                                },
                                color: 3900307967
                            }), createComponent(View, {
                                width: 100,
                                height: 100,
                                get x() {
                                    return state().x4;
                                },
                                get y() {
                                    return state().y;
                                },
                                color: 3223770111
                            }), createComponent(View, {
                                width: 100,
                                height: 100,
                                get x() {
                                    return state().xA;
                                },
                                y: 260,
                                color: 4294438399
                            }), createComponent(View, {
                                width: 100,
                                height: 100,
                                get x() {
                                    return state().xB;
                                },
                                y: 260,
                                color: 4275546879
                            }), createComponent(View, {
                                width: 100,
                                height: 100,
                                get x() {
                                    return state().xC;
                                },
                                y: 260,
                                color: 4220665087
                            }), createComponent(View, {
                                width: 100,
                                height: 100,
                                get x() {
                                    return state().xD;
                                },
                                y: 260,
                                color: 3931639039
                            }), createComponent(View, {
                                width: 800,
                                height: 800,
                                y: 20,
                                x: 800,
                                color: 3976066559,
                                get children() {
                                    return createComponent(View, {
                                        width: 600,
                                        height: 600,
                                        y: 20,
                                        x: 20,
                                        color: 2817773823,
                                        get children() {
                                            return createComponent(View, {
                                                width: 400,
                                                height: 400,
                                                y: 100,
                                                x: 20,
                                                color: 886282751,
                                                get children() {
                                                    return createComponent(View, {
                                                        width: 200,
                                                        height: 100,
                                                        y: (400 - 100) / 2,
                                                        x: (400 - 200) / 2,
                                                        color: 93743615,
                                                        get children() {
                                                            return createComponent(View, {
                                                                width: 50,
                                                                height: 50,
                                                                get y() {
                                                                    return state().yNested;
                                                                },
                                                                get x() {
                                                                    return state().xNested;
                                                                },
                                                                transition: {
                                                                    x: {
                                                                        duration: 300,
                                                                        easing: "ease"
                                                                    },
                                                                    y: {
                                                                        duration: 300,
                                                                        easing: "ease"
                                                                    }
                                                                },
                                                                color: 106907391
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            }), createComponent(View, {
                                width: 100,
                                height: 100,
                                y: 500,
                                x: 20,
                                color: 3776792831
                            }), createComponent(View, {
                                width: 200,
                                height: 200,
                                x: 300,
                                y: 600,
                                color: 2493757695,
                                zIndex: 100,
                                get children() {
                                    return [ createComponent(Text, {
                                        x: 100,
                                        y: 140,
                                        children: "Lightning!"
                                    }), createComponent(View, {
                                        width: 300,
                                        height: 100,
                                        color: 1196780031
                                    }), createComponent(View, {
                                        x: 150,
                                        y: 150,
                                        width: 100,
                                        height: 100,
                                        color: 4294967295,
                                        borderRadius: 75
                                    }) ];
                                }
                            }), createComponent(View, {
                                width: 300,
                                height: 300,
                                x: 300,
                                y: 600,
                                color: 4014228608
                            }), createComponent(View, {
                                width: 400,
                                height: 100,
                                x: 800,
                                y: 900,
                                color: 42256383,
                                get children() {
                                    return [ createComponent(View, {
                                        width: 400 * .42,
                                        height: 100 * .3,
                                        y: 100 * .05,
                                        x: 400 * .01,
                                        color: 123307519
                                    }), createComponent(View, {
                                        get width() {
                                            return 400 * parseFloat(state().bar2.v) / 100;
                                        },
                                        height: 100 * .3,
                                        y: 100 * .35,
                                        x: 400 * .01,
                                        color: 1797368063
                                    }), createComponent(View, {
                                        get width() {
                                            return 400 * parseFloat(state().bar3) / 100;
                                        },
                                        height: 100 * .3,
                                        y: 100 * .65,
                                        x: 400 * .01,
                                        transition: {
                                            width: {
                                                duration: 300,
                                                easing: "ease"
                                            }
                                        },
                                        color: 2668771839
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
