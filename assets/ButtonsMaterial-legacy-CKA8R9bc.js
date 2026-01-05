;
(function () {
  System.register(['./index-legacy-DVDw-036.js'], function (exports, module) {
    'use strict';

    var hexColor, createComponent, Row, View, mergeProps, Text, MaterialButtonText;
    return {
      setters: [function (module) {
        hexColor = module.h;
        createComponent = module.c;
        Row = module.R;
        View = module.V;
        mergeProps = module.m;
        Text = module.T;
        MaterialButtonText = module.U;
      }],
      execute: function execute() {
        var MaterialButtonsPage = exports("default", function () {
          function onEnter(event, elm) {
            this.states.toggle("disabled");
          }
          var RowStyles = {
            display: "flex",
            justifyContent: "flexStart",
            width: 1500,
            height: 300,
            color: hexColor("00000000"),
            gap: 26,
            y: 400,
            x: 100
          };
          var MaterialButton = {
            width: 386,
            height: 136,
            color: "0x715cabff",
            $focus: {
              color: "0x5a39a2ff"
            },
            disabled: {
              color: "0x291d43ff"
            }
          };
          var RoundedRectangle = ["RoundedRectangle", {
            radius: 65
          }];
          function Button(props) {
            return createComponent(View, mergeProps(props, {
              forwardStates: true,
              style: MaterialButton,
              shader: RoundedRectangle,
              get children() {
                return createComponent(Text, {
                  style: MaterialButtonText,
                  get children() {
                    return props.children;
                  }
                });
              }
            }));
          }
          return createComponent(Row, {
            style: RowStyles,
            get children() {
              return [createComponent(Button, {
                autofocus: true,
                onEnter: onEnter,
                children: "Focused"
              }), createComponent(Button, {
                states: {
                  active: true,
                  disabled: false
                },
                children: "Normal"
              }), createComponent(Button, {
                states: "disabled",
                children: "Disabled"
              })];
            }
          });
        });
      }
    };
  });
})();
