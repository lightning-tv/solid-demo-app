;
(function () {
  System.register(['./index-legacy-D9OLUiaf.js'], function (exports, module) {
    'use strict';

    var setGlobalBackground, createComponent, View, Column, mergeProps, Text;
    return {
      setters: [function (module) {
        setGlobalBackground = module.s;
        createComponent = module.h;
        View = module.V;
        Column = module.C;
        mergeProps = module.m;
        Text = module.T;
      }],
      execute: function execute() {
        var Box = function Box(props) {
          return createComponent(View, mergeProps(props, {
            height: 100,
            color: 0xFF00FFFF,
            get children() {
              return createComponent(Text, {
                children: "Text element"
              });
            }
          }));
        };
        var FlexMenu = function FlexMenu() {
          setGlobalBackground(0x000000FF);
          return createComponent(View, {
            right: 0,
            display: "flex",
            width: 400,
            flexBoundary: "fixed",
            color: 0xFFFF0060,
            flexDirection: "column",
            get children() {
              return createComponent(Column, {
                x: 50,
                width: 300,
                autofocus: true,
                get children() {
                  return [createComponent(Box, {
                    marginTop: 50
                  }), createComponent(Column, {
                    flexItem: false,
                    justifyContent: "flexEnd",
                    get children() {
                      return [createComponent(Box, {
                        flexOrder: 1
                      }), createComponent(Box, {
                        flexOrder: 2,
                        marginBottom: 50
                      })];
                    }
                  })];
                }
              });
            }
          });
        };
        exports({
          FlexMenu: FlexMenu,
          default: FlexMenu
        });
      }
    };
  });
})();
