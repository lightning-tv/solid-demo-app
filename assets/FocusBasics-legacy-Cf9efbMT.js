;
(function () {
  System.register(['./index-legacy-cng_CHKt.js'], function (exports, module) {
    'use strict';

    var setGlobalBackground, createEffect, on, activeElement, createComponent, View, Block, Row;
    return {
      setters: [function (module) {
        setGlobalBackground = module.s;
        createEffect = module.f;
        on = module.o;
        activeElement = module.q;
        createComponent = module.h;
        View = module.V;
        Block = module.B;
        Row = module.R;
      }],
      execute: function execute() {
        var FocusPage = exports("default", function () {
          setGlobalBackground(0x333333FF);
          var rowContainer, myBlock, redBlock;
          createEffect(on(activeElement, function (elm) {
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
              return [createComponent(Block, {
                ref: function ref(r$) {
                  var _ref$ = myBlock;
                  typeof _ref$ === "function" ? _ref$(r$) : myBlock = r$;
                },
                color: 0x1212DFFF,
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
                  return [createComponent(Block, {
                    ref: function ref(r$) {
                      var _ref$3 = redBlock;
                      typeof _ref$3 === "function" ? _ref$3(r$) : redBlock = r$;
                    },
                    color: 0xFF0000FF
                  }), createComponent(Block, {
                    color: 0x286E17FF
                  }), createComponent(Block, {
                    color: 0x1C1C97FF
                  })];
                }
              })];
            }
          });
        });
      }
    };
  });
})();
