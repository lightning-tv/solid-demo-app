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
    System.register([ "./index-legacy-D1gw9B_c.js" ], function(exports, module) {
        "use strict";
        var createSignal, createElement, setProp, rootNode, insert, effect, spread, mergeProps, setGlobalBackground, createComponent, View, Text, onCleanup;
        return {
            setters: [ function(module) {
                createSignal = module.a;
                createElement = module.l;
                setProp = module.a4;
                rootNode = module.a5;
                insert = module.r;
                effect = module.a6;
                spread = module.q;
                mergeProps = module.m;
                setGlobalBackground = module.s;
                createComponent = module.c;
                View = module.V;
                Text = module.T;
                onCleanup = module.J;
            } ],
            execute: function execute() {
                function createTag(children) {
                    var _createSignal = createSignal(null), _createSignal2 = _slicedToArray(_createSignal, 2), texture = _createSignal2[0], setTexture = _createSignal2[1];
                    var Tag = function() {
                        var _el$ = createElement("view");
                        setProp(_el$, "display", "flex");
                        setProp(_el$, "onLayout", function(n) {
                            if (n.preFlexwidth && n.width !== n.preFlexwidth) {
                                n.rtt = true;
                                setTimeout(function() {
                                    return setTexture(n.texture);
                                }, 1);
                            }
                        });
                        setProp(_el$, "parent", rootNode);
                        setProp(_el$, "textureOptions", {
                            preventCleanup: true
                        });
                        insert(_el$, children);
                        effect(function(_p$) {
                            var _v$ = rootNode.w - 1, _v$2 = rootNode.h - 1;
                            _v$ !== _p$.e && (_p$.e = setProp(_el$, "x", _v$, _p$.e));
                            _v$2 !== _p$.t && (_p$.t = setProp(_el$, "y", _v$2, _p$.t));
                            return _p$;
                        }, {
                            e: void 0,
                            t: void 0
                        });
                        return _el$;
                    }();
                    Tag.render(false);
                    var TagComponent = function TagComponent(props) {
                        return function() {
                            var _el$2 = createElement("view");
                            setProp(_el$2, "color", 4294967295);
                            setProp(_el$2, "autosize", true);
                            spread(_el$2, mergeProps(props, {
                                get texture() {
                                    return texture();
                                }
                            }), false);
                            return _el$2;
                        }();
                    };
                    TagComponent.destroy = function() {
                        return Tag.destroy();
                    };
                    return TagComponent;
                }
                var TagsPage = exports("default", function() {
                    setGlobalBackground(286331391);
                    var watchIconTextStyle = {
                        fontWeight: 600,
                        fontSize: 22,
                        lineHeight: 40,
                        y: 1
                    };
                    var ActionTag = createTag(createComponent(View, {
                        color: 293806847,
                        borderRadius: 8,
                        display: "flex",
                        padding: 8,
                        get children() {
                            return createComponent(Text, {
                                style: watchIconTextStyle,
                                children: "Action"
                            });
                        }
                    }));
                    var ComedyTag = createTag(createComponent(View, {
                        color: 621793023,
                        borderRadius: 8,
                        display: "flex",
                        padding: 8,
                        get children() {
                            return createComponent(Text, {
                                style: watchIconTextStyle,
                                children: "Comedy"
                            });
                        }
                    }));
                    var DramaTag = createTag(createComponent(View, {
                        color: 4278190335,
                        borderRadius: 8,
                        display: "flex",
                        padding: 8,
                        get children() {
                            return createComponent(Text, {
                                style: watchIconTextStyle,
                                children: "Drama"
                            });
                        }
                    }));
                    var NewEpisodeTag = createTag(createComponent(View, {
                        color: 4294967295,
                        borderRadius: 8,
                        display: "flex",
                        padding: 8,
                        effects: {
                            rounded: {
                                radius: [ 10, 0, 10, 0 ]
                            }
                        },
                        get children() {
                            return createComponent(Text, {
                                style: watchIconTextStyle,
                                color: 255,
                                fontWeight: 400,
                                children: "New Episode"
                            });
                        }
                    }));
                    onCleanup(function() {
                        ActionTag.destroy();
                        ComedyTag.destroy();
                        DramaTag.destroy();
                        NewEpisodeTag.destroy();
                    });
                    return [ createComponent(Text, {
                        x: 100,
                        y: 100,
                        fontSize: 50,
                        color: 4294967295,
                        children: "Tags Page"
                    }), createComponent(View, {
                        x: 150,
                        y: 200,
                        display: "flex",
                        flexDirection: "row",
                        gap: 16,
                        flexWrap: "wrap",
                        autofocus: true,
                        get children() {
                            return [ createComponent(ComedyTag, {}), createComponent(DramaTag, {}), createComponent(ActionTag, {}), createComponent(NewEpisodeTag, {}), createComponent(ComedyTag, {}), createComponent(DramaTag, {}), createComponent(ActionTag, {}), createComponent(NewEpisodeTag, {}), createComponent(ComedyTag, {}), createComponent(DramaTag, {}), createComponent(ActionTag, {}), createComponent(NewEpisodeTag, {}), createComponent(ComedyTag, {}), createComponent(DramaTag, {}), createComponent(ActionTag, {}), createComponent(NewEpisodeTag, {}), createComponent(ComedyTag, {}), createComponent(DramaTag, {}), createComponent(ActionTag, {}), createComponent(NewEpisodeTag, {}), createComponent(ComedyTag, {}), createComponent(DramaTag, {}), createComponent(ActionTag, {}), createComponent(NewEpisodeTag, {}), createComponent(ComedyTag, {}), createComponent(DramaTag, {}), createComponent(ActionTag, {}), createComponent(NewEpisodeTag, {}), createComponent(ComedyTag, {}), createComponent(DramaTag, {}), createComponent(ActionTag, {}), createComponent(NewEpisodeTag, {}), createComponent(ComedyTag, {}), createComponent(DramaTag, {}), createComponent(ActionTag, {}) ];
                        }
                    }) ];
                });
            }
        };
    });
})();
