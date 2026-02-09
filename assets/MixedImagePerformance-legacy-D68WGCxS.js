(function() {
    function _regenerator() {
        var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag";
        function i(r, n, o, i) {
            var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype);
            return _regeneratorDefine2(u, "_invoke", function(r, n, o) {
                var i, c, u, f = 0, p = o || [], y = !1, G = {
                    p: 0,
                    n: 0,
                    v: e,
                    a: d,
                    f: d.bind(e, 4),
                    d: function d(t, r) {
                        return i = t, c = 0, u = e, G.n = r, a;
                    }
                };
                function d(r, n) {
                    for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) {
                        var o, i = p[t], d = G.p, l = i[2];
                        r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, 
                        G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, 
                        G.n = l, c = 0));
                    }
                    if (o || r > 1) return a;
                    throw y = !0, n;
                }
                return function(o, p, l) {
                    if (f > 1) throw TypeError("Generator is already running");
                    for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y; ) {
                        i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u);
                        try {
                            if (f = 2, i) {
                                if (c || (o = "next"), t = i[o]) {
                                    if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object");
                                    if (!t.done) return t;
                                    u = t.value, c < 2 && (c = 0);
                                } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), 
                                c = 1);
                                i = e;
                            } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break;
                        } catch (t) {
                            i = e, c = 1, u = t;
                        } finally {
                            f = 1;
                        }
                    }
                    return {
                        value: t,
                        done: y
                    };
                };
            }(r, o, i), !0), u;
        }
        var a = {};
        function Generator() {}
        function GeneratorFunction() {}
        function GeneratorFunctionPrototype() {}
        t = Object.getPrototypeOf;
        var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function() {
            return this;
        }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c);
        function f(e) {
            return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, 
            _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), 
            e;
        }
        return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), 
        _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), 
        GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), 
        _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function() {
            return this;
        }), _regeneratorDefine2(u, "toString", function() {
            return "[object Generator]";
        }), (_regenerator = function _regenerator() {
            return {
                w: i,
                m: f
            };
        })();
    }
    function _regeneratorDefine2(e, r, n, t) {
        var i = Object.defineProperty;
        try {
            i({}, "", {});
        } catch (e) {
            i = 0;
        }
        _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) {
            function o(r, n) {
                _regeneratorDefine2(e, r, function(e) {
                    return this._invoke(r, n, e);
                });
            }
            r ? i ? i(e, r, {
                value: n,
                enumerable: !t,
                configurable: !t,
                writable: !t
            }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2));
        }, _regeneratorDefine2(e, r, n, t);
    }
    function asyncGeneratorStep(n, t, e, r, o, a, c) {
        try {
            var i = n[a](c), u = i.value;
        } catch (n) {
            return void e(n);
        }
        i.done ? t(u) : Promise.resolve(u).then(r, o);
    }
    function _asyncToGenerator(n) {
        return function() {
            var t = this, e = arguments;
            return new Promise(function(r, o) {
                var a = n.apply(t, e);
                function _next(n) {
                    asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
                }
                function _throw(n) {
                    asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
                }
                _next(void 0);
            });
        };
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
    System.register([ "./index-legacy-PagE8P5A.js" ], function(exports, module) {
        "use strict";
        var createSignal, onMount, createComponent, View, For, Text, api, getImageUrl;
        return {
            setters: [ function(module) {
                createSignal = module.a;
                onMount = module.o;
                createComponent = module.c;
                View = module.V;
                For = module.F;
                Text = module.T;
                api = module.X;
                getImageUrl = module.Y;
            } ],
            execute: function execute() {
                var MixedImagePerformance = exports("default", function() {
                    var _createSignal = createSignal([]), _createSignal2 = _slicedToArray(_createSignal, 2), images = _createSignal2[0], setImages = _createSignal2[1];
                    var _createSignal3 = createSignal(""), _createSignal4 = _slicedToArray(_createSignal3, 2), loadTime = _createSignal4[0], setLoadTime = _createSignal4[1];
                    var _createSignal5 = createSignal("Initializing..."), _createSignal6 = _slicedToArray(_createSignal5, 2), status = _createSignal6[0], setStatus = _createSignal6[1];
                    var _createSignal7 = createSignal(0), _createSignal8 = _slicedToArray(_createSignal7, 2), loadedCount = _createSignal8[0], setLoadedCount = _createSignal8[1];
                    var startTime = 0;
                    var imageLoadTimes = {};
                    var totalImages = 11;
                    var fetchImages = function() {
                        var _ref = _asyncToGenerator(_regenerator().m(function _callee() {
                            var page1, combined, newImages, _t;
                            return _regenerator().w(function(_context) {
                                while (1) switch (_context.p = _context.n) {
                                  case 0:
                                    _context.p = 0;
                                    setStatus("Fetching images...");
                                    _context.n = 1;
                                    return api.get("/movie/popular?page=1");

                                  case 1:
                                    page1 = _context.v;
                                    combined = page1.results.slice(0, 11);
                                    newImages = combined.map(function(item, index) {
                                        var isMain = index === 0;
                                        var size = isMain ? "original" : "w342";
                                        var path = isMain && item.backdrop_path ? item.backdrop_path : item.poster_path;
                                        return {
                                            id: item.id,
                                            src: getImageUrl(path, size),
                                            title: item.title,
                                            isMain: isMain
                                        };
                                    });
                                    startTime = performance.now();
                                    setImages(newImages);
                                    setStatus("Loading... 0/".concat(totalImages));
                                    _context.n = 3;
                                    break;

                                  case 2:
                                    _context.p = 2;
                                    _t = _context.v;
                                    console.error("Error fetching images:", _t);
                                    setStatus("Error fetching images");

                                  case 3:
                                    return _context.a(2);
                                }
                            }, _callee, null, [ [ 0, 2 ] ]);
                        }));
                        return function fetchImages() {
                            return _ref.apply(this, arguments);
                        };
                    }();
                    var handleImageLoaded = function handleImageLoaded(index, id) {
                        var now = performance.now();
                        var elapsed = now - startTime;
                        imageLoadTimes[id] = elapsed;
                        var currentCount = loadedCount() + 1;
                        setLoadedCount(currentCount);
                        setStatus("Loading... ".concat(currentCount, "/").concat(totalImages));
                        performance.mark("mixed-images-loaded-".concat(currentCount));
                        if (currentCount === totalImages) {
                            var totalTime = now - startTime;
                            setLoadTime("".concat(totalTime.toFixed(2), "ms"));
                            setStatus("Loaded in ".concat(totalTime.toFixed(2), "ms"));
                            console.log("Individual Mixed Image Load Times:", imageLoadTimes);
                        }
                    };
                    onMount(function() {
                        fetchImages();
                    });
                    var styles = {
                        container: {
                            width: 1920,
                            height: 1080,
                            x: 0,
                            y: 0
                        },
                        mainImage: {
                            width: 1152,
                            height: 648,
                            x: (1920 - 1152) / 2,
                            y: 50
                        },
                        poster: {
                            width: 150,
                            height: 225
                        },
                        statusContainer: {
                            width: 1920,
                            height: 1080,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            zIndex: 100,
                            position: "absolute"
                        },
                        statusText: {
                            fontSize: 90,
                            color: 4294967295
                        }
                    };
                    return createComponent(View, {
                        get children() {
                            return [ createComponent(View, {
                                get style() {
                                    return styles.container;
                                },
                                autofocus: true,
                                get children() {
                                    return createComponent(For, {
                                        get each() {
                                            return images();
                                        },
                                        children: function children(item, index) {
                                            var i = index();
                                            if (item.isMain) {
                                                return createComponent(View, {
                                                    get style() {
                                                        return styles.mainImage;
                                                    },
                                                    get src() {
                                                        return item.src;
                                                    },
                                                    onEvent: {
                                                        loaded: function loaded() {
                                                            return handleImageLoaded(i, item.id);
                                                        }
                                                    }
                                                });
                                            }
                                            var posterIndex = i - 1;
                                            var gap = 20;
                                            var startX = 120;
                                            var startY = 750;
                                            var x = startX + posterIndex * (150 + gap);
                                            var y = startY;
                                            return createComponent(View, {
                                                get style() {
                                                    return styles.poster;
                                                },
                                                get src() {
                                                    return item.src;
                                                },
                                                x: x,
                                                y: y,
                                                onEvent: {
                                                    loaded: function loaded() {
                                                        return handleImageLoaded(i, item.id);
                                                    }
                                                }
                                            });
                                        }
                                    });
                                }
                            }), createComponent(View, {
                                get style() {
                                    return styles.statusContainer;
                                },
                                pointerEvents: "none",
                                get children() {
                                    return createComponent(View, {
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        color: 204,
                                        width: 900,
                                        height: 200,
                                        padding: 20,
                                        get children() {
                                            return createComponent(Text, {
                                                get style() {
                                                    return styles.statusText;
                                                },
                                                get children() {
                                                    return status();
                                                }
                                            });
                                        }
                                    });
                                }
                            }) ];
                        }
                    });
                });
            }
        };
    });
})();
