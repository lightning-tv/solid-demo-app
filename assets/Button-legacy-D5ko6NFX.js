;
(function () {
  System.register(['./index-legacy-B_9HLWKB.js'], function (exports, module) {
    'use strict';

    var createComponent, mergeProps, Text, styles, View;
    return {
      setters: [function (module) {
        createComponent = module.h;
        mergeProps = module.m;
        Text = module.T;
        styles = module.H;
        View = module.V;
      }],
      execute: function execute() {
        var Button = exports("B", function (props) {
          return createComponent(ButtonContainer, mergeProps(props, {
            get color() {
              return props.backgroundColor;
            },
            get itemSpacing() {
              return props.contentSpacing;
            },
            alignItems: "center",
            forwardStates: true,
            get children() {
              return createComponent(Text, {
                get color() {
                  return props.textColor;
                },
                get contain() {
                  var _props$contain;
                  return (_props$contain = props.contain) !== null && _props$contain !== void 0 ? _props$contain : "width";
                },
                get textAlign() {
                  return props.textAlign;
                },
                get style() {
                  var _props$tone;
                  return [styles.Text.tones[(_props$tone = props.tone) !== null && _props$tone !== void 0 ? _props$tone : styles.tone],
                  //
                  styles.Text.base];
                },
                get children() {
                  return props.children;
                }
              });
            }
          }));
        });
        var ButtonContainer = exports("a", function (props) {
          return createComponent(View, mergeProps(props, {
            get color() {
              return props.backgroundColor;
            },
            get justifyContent() {
              return props.justify;
            },
            get itemSpacing() {
              return props.contentSpacing;
            },
            get style() {
              var _styles$Container$ton, _props$tone2;
              return [props.style, //
              (_styles$Container$ton = styles.Container.tones) === null || _styles$Container$ton === void 0 ? void 0 : _styles$Container$ton[(_props$tone2 = props.tone) !== null && _props$tone2 !== void 0 ? _props$tone2 : styles.tone], styles.Container.base];
            },
            forwardStates: true
          }));
        });
      }
    };
  });
})();
