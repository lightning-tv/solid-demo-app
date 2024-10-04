;
(function () {
  System.register(['./index-legacy-DKXjmquD.js'], function (exports, module) {
    'use strict';

    var setGlobalBackground, createComponent, View;
    return {
      setters: [function (module) {
        setGlobalBackground = module.s;
        createComponent = module.h;
        View = module.V;
      }],
      execute: function execute() {
        var Default = exports("default", function () {
          setGlobalBackground(0x1E293BFF);
          return createComponent(View, {
            autofocus: true,
            get children() {
              return [createComponent(View, {
                width: 1920 / 4,
                height: 1080,
                colorTop: 0x0891B2FF,
                colorBottom: 0xA5F3FCFF
              }), createComponent(View, {
                width: 1920 / 4,
                height: 1080,
                x: 1920 / 4,
                colorLeft: 0xDC2626FF,
                colorRight: 0xF87171FF
              }), createComponent(View, {
                width: 1920 / 4,
                height: 1080,
                x: 1920 / 4 * 2,
                colorTop: 0x0891B2FF,
                colorRight: 0xF87171FF
              }), createComponent(View, {
                width: 1920 / 4,
                height: 1080,
                x: 1920 / 4 * 3,
                colorRight: 0x008000FF,
                colorBottom: 0xFFD700FF
              })];
            }
          });
        });
      }
    };
  });
})();
