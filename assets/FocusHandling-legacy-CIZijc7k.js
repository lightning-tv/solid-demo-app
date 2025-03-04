;
(function () {
  System.register(['./index-legacy-Qm7ZIRGq.js'], function (exports, module) {
    'use strict';

    var setGlobalBackground, createComponent, View, Row, Column, mergeProps;
    return {
      setters: [function (module) {
        setGlobalBackground = module.s;
        createComponent = module.h;
        View = module.V;
        Row = module.R;
        Column = module.C;
        mergeProps = module.m;
      }],
      execute: function execute() {
        var styles = {
          button: {
            alpha: 0.4,
            $focus: {
              alpha: 1
            }
          }
        };
        function Button(props) {
          return createComponent(View, mergeProps(props, {
            width: 200,
            height: 60,
            get style() {
              return styles.button;
            },
            get color() {
              return props.color || 0xE0E0E0FF;
            }
          }));
        }
        var PositioningPage = exports("default", function () {
          setGlobalBackground(0x1E293BFF);
          var leftMenuStyle = {
            width: 200,
            height: 240,
            $focus: {
              width: 900,
              transition: true
            }
          };
          return createComponent(View, {
            x: 450,
            y: 200,
            get children() {
              return createComponent(Row, {
                display: "block",
                get children() {
                  return [createComponent(View, {
                    forwardFocus: 0,
                    style: leftMenuStyle,
                    colorLeft: 0x475569AA,
                    colorRight: 0x64748BAA,
                    zIndex: 5,
                    get children() {
                      return createComponent(Column, {
                        id: "SideMenu",
                        gap: 20,
                        get children() {
                          return [createComponent(Button, {
                            color: 0xE4E4E7FF
                          }), createComponent(Button, {
                            color: 0xE4E4E7FF
                          }), createComponent(Button, {
                            color: 0xE4E4E7FF
                          })];
                        }
                      });
                    }
                  }), createComponent(Column, {
                    x: 250,
                    gap: 20,
                    plinko: true,
                    autofocus: true,
                    get children() {
                      return [createComponent(Row, {
                        gap: 20,
                        height: 60,
                        get children() {
                          return [createComponent(Button, {
                            color: 0xEF4444FF
                          }), createComponent(Button, {
                            color: 0xF97316FF
                          }), createComponent(Button, {
                            color: 0x84CC16FF
                          })];
                        }
                      }), createComponent(Row, {
                        gap: 20,
                        height: 60,
                        get children() {
                          return [createComponent(Button, {
                            color: 0x10B981FF
                          }), createComponent(Button, {
                            color: 0x06B6D4FF
                          }), createComponent(Button, {
                            color: 0x3B82F6FF
                          })];
                        }
                      }), createComponent(Row, {
                        gap: 20,
                        height: 60,
                        get children() {
                          return [createComponent(Button, {
                            color: 0x8B5CF6FF
                          }), createComponent(Button, {
                            color: 0xD946EFFF
                          }), createComponent(Button, {
                            color: 0xF43F5EFF
                          })];
                        }
                      })];
                    }
                  })];
                }
              });
            }
          });
        });
      }
    };
  });
})();
