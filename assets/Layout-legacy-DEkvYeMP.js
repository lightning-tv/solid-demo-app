;
(function () {
  System.register(['./index-legacy-BpNZAEdy.js'], function (exports, module) {
    'use strict';

    var setGlobalBackground, createComponent, View, Block, Text;
    return {
      setters: [function (module) {
        setGlobalBackground = module.s;
        createComponent = module.h;
        View = module.V;
        Block = module.B;
        Text = module.T;
      }],
      execute: function execute() {
        var LayoutPage = exports("default", function () {
          setGlobalBackground(0x000000FF);
          return createComponent(View, {
            x: 150,
            y: 10,
            width: 1e3,
            height: 1e3,
            border: {
              color: 0xFF0000FF,
              width: 5
            },
            get children() {
              return [createComponent(Block, {
                center: true,
                color: 0xFFFF00FF
              }), createComponent(View, {
                x: 500,
                y: 140,
                display: "flex",
                alignItems: "center",
                height: 300,
                flexDirection: "row",
                gap: 20,
                border: {
                  color: 0xFFFFFFFF,
                  width: 5
                },
                get children() {
                  return [createComponent(Block, {
                    color: 0xFF0000FF
                  }), createComponent(Block, {
                    color: 0x00FF08FF
                  }), createComponent(Block, {
                    color: 0x0000FFFF
                  })];
                }
              }), createComponent(View, {
                x: 500,
                y: 100,
                width: 200,
                padding: 20,
                height: 36,
                border: {
                  color: 0xFFFFFFFF,
                  width: 5
                },
                get children() {
                  return createComponent(Text, {
                    contain: "both",
                    textAlign: "left",
                    lineHeight: 36,
                    y: 3,
                    fontSize: 28,
                    children: "Hello World"
                  });
                }
              }), createComponent(View, {
                display: "flex",
                flexDirection: "column",
                gap: 50,
                alignItems: "center",
                width: 460,
                y: 100,
                x: 20,
                border: {
                  color: 0x00FF00FF,
                  width: 5
                },
                onLayout: function onLayout(e) {
                  return e.height += 5;
                },
                get children() {
                  return [createComponent(View, {
                    color: 0x0000FFFF,
                    marginTop: 5,
                    display: "flex",
                    get children() {
                      return createComponent(Text, {
                        fontSize: 24,
                        contain: "width",
                        width: 450,
                        children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu."
                      });
                    }
                  }), createComponent(View, {
                    color: 0x0000FFFF,
                    display: "flex",
                    get children() {
                      return createComponent(Text, {
                        fontSize: 24,
                        contain: "width",
                        width: 450,
                        children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu."
                      });
                    }
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
