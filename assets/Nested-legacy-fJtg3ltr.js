;
(function () {
  System.register(['./index-legacy-BjE01iJc.js'], function (exports, module) {
    'use strict';

    var setGlobalBackground, createComponent, Column, createElement, setProp, insert, Button;
    return {
      setters: [function (module) {
        setGlobalBackground = module.s;
        createComponent = module.h;
        Column = module.C;
        createElement = module.l;
        setProp = module.a2;
        insert = module.r;
        Button = module.N;
      }],
      execute: function execute() {
        var NestedButtonColumns = exports("default", function () {
          setGlobalBackground(0x333333FF);
          var styles = {
            container: {
              x: 400,
              width: 400,
              height: 1080,
              color: 0x999999FF,
              display: "flex",
              flexDirection: "column",
              // Arranges columns horizontally
              justifyContent: "spaceBetween",
              // Distributes columns evenly
              padding: 10
            }
          };
          return createComponent(Column, {
            get style() {
              return styles.container;
            },
            scroll: "none",
            get children() {
              return [function () {
                var _el$ = createElement("view");
                setProp(_el$, "forwardFocus", 0);
                setProp(_el$, "clipping", true);
                setProp(_el$, "height", 600);
                setProp(_el$, "x", 50);
                insert(_el$, createComponent(Column, {
                  scrollIndex: 3,
                  get children() {
                    return [createComponent(Button, {
                      title: "Button 1A",
                      autofocus: true,
                      onEnter: function onEnter() {
                        return console.log("Button 1A pressed");
                      }
                    }), createComponent(Button, {
                      title: "Button 1B",
                      onEnter: function onEnter() {
                        return console.log("Button 1B pressed");
                      }
                    }), createComponent(Button, {
                      title: "Button 1C",
                      onEnter: function onEnter() {
                        return console.log("Button 1C pressed");
                      }
                    }), createComponent(Button, {
                      title: "Button 1D",
                      onEnter: function onEnter() {
                        return console.log("Button 1C pressed");
                      }
                    }), createComponent(Button, {
                      title: "Button 1E",
                      onEnter: function onEnter() {
                        return console.log("Button 1C pressed");
                      }
                    }), createComponent(Button, {
                      title: "Button 1F",
                      onEnter: function onEnter() {
                        return console.log("Button 1C pressed");
                      }
                    }), createComponent(Button, {
                      title: "Button 1G",
                      onEnter: function onEnter() {
                        return console.log("Button 1C pressed");
                      }
                    }), createComponent(Button, {
                      title: "Button 1H",
                      onEnter: function onEnter() {
                        return console.log("Button 1C pressed");
                      }
                    })];
                  }
                }));
                return _el$;
              }(), function () {
                var _el$2 = createElement("view");
                setProp(_el$2, "height", 4);
                setProp(_el$2, "color", 0xC3C3C3FF);
                setProp(_el$2, "skipFocus", true);
                return _el$2;
              }(), function () {
                var _el$3 = createElement("view");
                setProp(_el$3, "forwardFocus", 0);
                setProp(_el$3, "clipping", true);
                setProp(_el$3, "height", 400);
                setProp(_el$3, "x", 50);
                insert(_el$3, createComponent(Column, {
                  get children() {
                    return [createComponent(Button, {
                      title: "Button 3A",
                      onEnter: function onEnter() {
                        return console.log("Button 3A pressed");
                      }
                    }), createComponent(Button, {
                      title: "Button 3B",
                      onEnter: function onEnter() {
                        return console.log("Button 3B pressed");
                      }
                    }), createComponent(Button, {
                      title: "Button 3C",
                      onEnter: function onEnter() {
                        return console.log("Button 3C pressed");
                      }
                    })];
                  }
                }));
                return _el$3;
              }()];
            }
          });
        });
      }
    };
  });
})();
