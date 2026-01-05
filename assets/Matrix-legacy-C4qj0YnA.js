;
(function () {
  System.register(['./index-legacy-XZaFWDjB.js'], function (exports, module) {
    'use strict';

    var createComponent, View, Column, For, Row;
    return {
      setters: [function (module) {
        createComponent = module.c;
        View = module.V;
        Column = module.C;
        For = module.F;
        Row = module.R;
      }],
      execute: function execute() {
        var blockStyle = {
          color: 1548615679,
          scale: 1,
          $focus: {
            color: 4278255615,
            scale: 1.1
          },
          transition: {
            color: {
              duration: 0.3
            },
            scale: {
              duration: 0.3
            }
          }
        };
        var Matrix = exports("default", function () {
          var rows = Array.from({
            length: 1
          });
          var blocks = Array.from({
            length: 6
          });
          return createComponent(View, {
            color: 505290495,
            width: 1920,
            height: 1080,
            get children() {
              return createComponent(Column, {
                x: 160,
                y: 100,
                gap: 50,
                autofocus: true,
                get children() {
                  return createComponent(For, {
                    each: rows,
                    children: function children() {
                      return createComponent(Row, {
                        gap: 30,
                        height: 250,
                        get children() {
                          return createComponent(For, {
                            each: blocks,
                            children: function children() {
                              return createComponent(View, {
                                width: 150,
                                height: 250,
                                style: blockStyle
                              });
                            }
                          });
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        });
      }
    };
  });
})();
