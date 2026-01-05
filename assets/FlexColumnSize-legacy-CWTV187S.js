;
(function () {
  function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
  function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
  function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
  function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
  function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
  System.register(['./index-legacy-DVDw-036.js'], function (exports, module) {
    'use strict';

    var hexColor, createSignal, onMount, setGlobalBackground, createComponent, Text, Row, Column, View, mergeProps;
    return {
      setters: [function (module) {
        hexColor = module.h;
        createSignal = module.a;
        onMount = module.o;
        setGlobalBackground = module.s;
        createComponent = module.c;
        Text = module.T;
        Row = module.R;
        Column = module.C;
        View = module.V;
        mergeProps = module.m;
      }],
      execute: function execute() {
        var FlexColumnPage = exports("default", function () {
          var RowStyles = {
            display: "flex",
            justifyContent: "spaceEvenly",
            width: 1920,
            y: 100,
            height: 880,
            color: hexColor("00000000")
          };
          var ColumnStyles = {
            display: "flex",
            flexDirection: "column",
            justifyContent: "flexStart",
            color: 0x4DABF5FF,
            height: 850,
            width: 80
          };
          var rowTitle = {
            fontSize: 44,
            y: 20,
            x: 150
          };
          function Block(props) {
            var styles = {
              width: randSize(),
              height: 80,
              x: 5,
              color: 0x1769AAFF
            };
            return createComponent(View, mergeProps(props, {
              style: styles
            }));
          }
          function randSize() {
            return Math.floor(Math.random() * 61) + 10;
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
          return [createComponent(Text, {
            style: rowTitle,
            children: "Start, MarginTop, End, MarginBottom, Center, Between, Evenly"
          }), createComponent(Row, {
            gap: gap,
            style: RowStyles,
            onFocus: onFocus,
            get children() {
              return [createComponent(Column, {
                gap: 30,
                style: ColumnStyles,
                alignItems: "center",
                get children() {
                  return [createComponent(Block, {
                    autofocus: true
                  }), createComponent(Block, {}), createComponent(Block, {}), createComponent(Block, {}), createComponent(Block, {})];
                }
              }), createComponent(Column, {
                gap: gap,
                style: ColumnStyles,
                onFocus: onFocus,
                alignItems: "flexStart",
                get children() {
                  return [createComponent(Block, {
                    marginTop: 100
                  }), createComponent(Block, {}), createComponent(Block, {
                    marginTop: 100
                  }), createComponent(Block, {}), createComponent(Block, {})];
                }
              }), createComponent(Column, {
                gap: gap,
                alignItems: "flexEnd",
                justifyContent: "flexEnd",
                style: ColumnStyles,
                onFocus: onFocus,
                get children() {
                  return [createComponent(Block, {}), createComponent(Block, {}), createComponent(Block, {}), createComponent(Block, {}), createComponent(Block, {})];
                }
              }), createComponent(Column, {
                gap: gap,
                justifyContent: "flexEnd",
                style: ColumnStyles,
                onFocus: onFocus,
                get children() {
                  return [createComponent(Block, {}), createComponent(Block, {
                    marginBottom: 100
                  }), createComponent(Block, {}), createComponent(Block, {}), createComponent(Block, {
                    marginBottom: 100
                  })];
                }
              }), createComponent(Column, {
                gap: gap,
                justifyContent: "center",
                style: ColumnStyles,
                onFocus: onFocus,
                get children() {
                  return [createComponent(Block, {}), createComponent(Block, {}), createComponent(Block, {}), createComponent(Block, {}), createComponent(Block, {})];
                }
              }), createComponent(Column, {
                gap: gap,
                justifyContent: "spaceBetween",
                style: ColumnStyles,
                onFocus: onFocus,
                get children() {
                  return [createComponent(Block, {}), createComponent(Block, {}), createComponent(Block, {}), createComponent(Block, {}), createComponent(Block, {})];
                }
              }), createComponent(Column, {
                gap: gap,
                justifyContent: "spaceEvenly",
                style: ColumnStyles,
                onFocus: onFocus,
                get children() {
                  return [createComponent(Block, {}), createComponent(Block, {}), createComponent(Block, {}), createComponent(Block, {}), createComponent(Block, {})];
                }
              })];
            }
          })];
        });
      }
    };
  });
})();
