;
(function () {
  System.register(['./index-legacy-B_9HLWKB.js', './Button-legacy-D5ko6NFX.js'], function (exports, module) {
    'use strict';

    var createMemo, styles, createComponent, mergeProps, Text, View, Row, Button;
    return {
      setters: [function (module) {
        createMemo = module.p;
        styles = module.q;
        createComponent = module.h;
        mergeProps = module.m;
        Text = module.T;
        View = module.V;
        Row = module.R;
      }, function (module) {
        Button = module.B;
      }],
      execute: function execute() {
        var BadgeContainer = function BadgeContainer(props) {
          return createComponent(View, mergeProps(props, {
            get color() {
              return props.backgroundColor;
            },
            get borderRadius() {
              return props.radius;
            },
            get style() {
              var _props$tone;
              return [props.style,
              //
              styles.Container.tones[(_props$tone = props.tone) !== null && _props$tone !== void 0 ? _props$tone : styles.tone], styles.Container.base];
            },
            forwardStates: true
          }));
        };
        var Badge = function Badge(props) {
          var tone = createMemo(function () {
            var _props$tone2;
            return (_props$tone2 = props.tone) !== null && _props$tone2 !== void 0 ? _props$tone2 : styles.tone;
          });
          var baseBorderStyle = styles.Container.base.border;
          return createComponent(BadgeContainer, mergeProps(props, {
            get height() {
              return props.height || styles.Text.base.lineHeight;
            },
            get tone() {
              return tone();
            },
            get style() {
              return props.style;
            },
            get children() {
              return createComponent(Text, {
                get color() {
                  return props.textColor;
                },
                get lineHeight() {
                  return (props.height || styles.Text.base.lineHeight) + baseBorderStyle.width;
                },
                get style() {
                  return [styles.Text.tones[tone()],
                  //
                  styles.Text.base];
                },
                get children() {
                  return props.title;
                }
              });
            }
          }));
        };
        var ButtonsPage = exports("default", function () {
          function onEnter(event, elm) {
            this.states.toggle("disabled");
          }
          var RowStyles = {
            display: "flex",
            justifyContent: "flexStart",
            width: 1500,
            height: 300,
            color: 0x00000000,
            gap: 26,
            y: 400
          };
          return [createComponent(Row, {
            x: 100,
            y: 200,
            gap: 5,
            style: RowStyles,
            get children() {
              return [createComponent(Badge, {
                children: "HD"
              }), createComponent(Badge, {
                children: "PG13"
              }), createComponent(Badge, {
                children: "NC17"
              }), createComponent(Text, {
                fontSize: 30,
                children: "I like bananas"
              }), createComponent(Badge, {
                children: "DOLBY"
              })];
            }
          }), createComponent(Row, {
            x: 100,
            gap: 40,
            style: RowStyles,
            get children() {
              return [createComponent(Button, {
                autofocus: true,
                onEnter: onEnter,
                children: "TV Shows"
              }), createComponent(Button, {
                states: {
                  active: true,
                  disabled: false
                },
                children: "Movies"
              }), createComponent(Button, {
                states: "active",
                children: "Sports"
              }), createComponent(Button, {
                states: "disabled",
                children: "News"
              })];
            }
          })];
        });
      }
    };
  });
})();
