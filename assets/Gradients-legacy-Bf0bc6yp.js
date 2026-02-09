(function() {
    System.register([ "./index-legacy-BQB2da4P.js" ], function(exports, module) {
        "use strict";
        var setGlobalBackground, createComponent, View;
        return {
            setters: [ function(module) {
                setGlobalBackground = module.s;
                createComponent = module.c;
                View = module.V;
            } ],
            execute: function execute() {
                var Default = exports("default", function() {
                    setGlobalBackground(506018815);
                    return createComponent(View, {
                        autofocus: true,
                        get children() {
                            return [ createComponent(View, {
                                width: 1920 / 4,
                                height: 1080,
                                colorTop: 143766271,
                                colorBottom: 2784230655
                            }), createComponent(View, {
                                width: 1920 / 4,
                                height: 1080,
                                x: 1920 / 4,
                                colorLeft: 3693487871,
                                colorRight: 4168184319
                            }), createComponent(View, {
                                width: 1920 / 4,
                                height: 1080,
                                x: 1920 / 4 * 2,
                                colorTop: 143766271,
                                colorRight: 4168184319
                            }), createComponent(View, {
                                width: 1920 / 4,
                                height: 1080,
                                x: 1920 / 4 * 3,
                                colorRight: 8388863,
                                colorBottom: 4292280575
                            }) ];
                        }
                    });
                });
            }
        };
    });
})();
