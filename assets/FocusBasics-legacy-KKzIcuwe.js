(function() {
    System.register([ "./index-legacy-PagE8P5A.js" ], function(exports, module) {
        "use strict";
        var setGlobalBackground, createEffect, on, activeElement, createComponent, View, Block, Row;
        return {
            setters: [ function(module) {
                setGlobalBackground = module.s;
                createEffect = module.g;
                on = module.i;
                activeElement = module.w;
                createComponent = module.c;
                View = module.V;
                Block = module.K;
                Row = module.R;
            } ],
            execute: function execute() {
                var FocusPage = exports("default", function() {
                    setGlobalBackground(858993663);
                    var rowContainer, myBlock, redBlock;
                    createEffect(on(activeElement, function(elm) {
                        console.log(elm);
                    }, {
                        defer: true
                    }));
                    return createComponent(View, {
                        x: 250,
                        y: 200,
                        onUp: function onUp() {
                            return myBlock.setFocus();
                        },
                        get children() {
                            return [ createComponent(Block, {
                                ref: function ref(r$) {
                                    var _ref$ = myBlock;
                                    typeof _ref$ === "function" ? _ref$(r$) : myBlock = r$;
                                },
                                color: 303226879,
                                onDown: function onDown() {
                                    return rowContainer.setFocus();
                                },
                                autofocus: true
                            }), createComponent(Row, {
                                y: 200,
                                ref: function ref(r$) {
                                    var _ref$2 = rowContainer;
                                    typeof _ref$2 === "function" ? _ref$2(r$) : rowContainer = r$;
                                },
                                get children() {
                                    return [ createComponent(Block, {
                                        ref: function ref(r$) {
                                            var _ref$3 = redBlock;
                                            typeof _ref$3 === "function" ? _ref$3(r$) : redBlock = r$;
                                        },
                                        color: 4278190335
                                    }), createComponent(Block, {
                                        color: 678303743
                                    }), createComponent(Block, {
                                        color: 471635967
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
