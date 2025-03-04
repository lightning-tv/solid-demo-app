;
(function () {
  function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
  function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
  function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
  function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
  function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
  System.register(['./index-legacy--L2i5Mlc.js'], function (exports, module) {
    'use strict';

    var createSignal, onMount, createComponent, Column, styles, Text, Row, View, mergeProps, setGlobalBackground;
    return {
      setters: [function (module) {
        createSignal = module.c;
        onMount = module.g;
        createComponent = module.h;
        Column = module.C;
        styles = module.G;
        Text = module.T;
        Row = module.R;
        View = module.V;
        mergeProps = module.m;
        setGlobalBackground = module.s;
      }],
      execute: function execute() {
        var FlexGrow = exports("default", function () {
          var RowStyles = {
            display: "flex",
            justifyContent: "flexStart",
            width: 1600,
            height: 110,
            color: 0xFFFFFFFF
          };
          var rowTitle = {
            fontSize: 44,
            marginTop: 25,
            marginBottom: -20,
            skipFocus: true
          };
          var red = 0xFF0000FF;
          var darkorange = 0xFF8C00FF;
          var green = 0x00FF00FF;
          function Block(props) {
            var styles2 = {
              width: props.flexGrow ? undefined : 200,
              // Allow flexible width if flexGrow exists
              height: 100,
              y: 5
            };
            return createComponent(View, mergeProps(props, {
              style: styles2
            }));
          }
          var _createSignal = createSignal(50),
            _createSignal2 = _slicedToArray(_createSignal, 2),
            columnY = _createSignal2[0],
            setColumnY = _createSignal2[1];
          function onFocus() {
            this.children[this.selected || 0].setFocus();
            setColumnY(150 + (this.y || 0) * -1);
          }
          onMount(function () {
            setGlobalBackground(0x333333FF);
          });
          var gap = 50;
          return createComponent(Column, {
            x: 160,
            get y() {
              return columnY();
            },
            gap: 30,
            height: 850,
            get width() {
              return RowStyles.width;
            },
            get style() {
              return styles.Column;
            },
            get children() {
              return [createComponent(Text, {
                style: rowTitle,
                children: "Flex Start RTL"
              }), createComponent(Row, {
                gap: gap,
                direction: "rtl",
                style: RowStyles,
                onFocus: onFocus,
                get children() {
                  return [createComponent(Block, {
                    flexGrow: 1,
                    autofocus: true,
                    color: red
                  }), createComponent(Block, {
                    flexGrow: 2,
                    color: darkorange
                  }), createComponent(Block, {
                    color: green
                  })];
                }
              }), createComponent(Text, {
                style: rowTitle,
                children: "Flex End with Flex Grow"
              }), createComponent(Row, {
                gap: gap,
                style: RowStyles,
                onFocus: onFocus,
                get children() {
                  return [createComponent(Block, {
                    color: green
                  }), createComponent(Block, {
                    flexGrow: 1,
                    color: red
                  }), createComponent(Block, {
                    flexGrow: 2,
                    color: darkorange
                  })];
                }
              }), createComponent(Text, {
                style: rowTitle,
                children: "Space Between with Flex Grow"
              }), createComponent(Row, {
                gap: gap,
                justifyContent: "spaceBetween",
                style: RowStyles,
                onFocus: onFocus,
                get children() {
                  return [createComponent(Block, {
                    flexGrow: 1,
                    color: red
                  }), createComponent(Block, {
                    flexGrow: 1,
                    flexOrder: -1,
                    color: darkorange
                  }), createComponent(Block, {
                    flexGrow: 2,
                    color: green
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
