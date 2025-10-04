;
(function () {
  function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
  function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
  function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
  function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
  function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
  function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
  System.register(['./index-legacy-BTxoXT-W.js'], function (exports, module) {
    'use strict';

    var createSignal, createMemo, createEffect, on, createComponent, View, mergeProps, Text, chainFunctions, Column, Index, Row, Show, memo, Switch, Match, onMount, setGlobalBackground;
    return {
      setters: [function (module) {
        createSignal = module.c;
        createMemo = module.i;
        createEffect = module.f;
        on = module.o;
        createComponent = module.h;
        View = module.V;
        mergeProps = module.m;
        Text = module.T;
        chainFunctions = module._;
        Column = module.C;
        Index = module.I;
        Row = module.R;
        Show = module.S;
        memo = module.D;
        Switch = module.a0;
        Match = module.a1;
        onMount = module.g;
        setGlobalBackground = module.s;
      }],
      execute: function execute() {
        var ContainerStyle = {
          display: "flex",
          flexBoundary: "fixed",
          padding: 20,
          width: 450,
          height: 70,
          borderRadius: 8,
          border: {
            color: 0xC3C3C3FF,
            width: 2
          },
          $focus: {
            border: {
              color: 0xFFFFFFFF,
              width: 2
            }
          }
        };
        var TextStyle = {
          fontSize: 46,
          lineHeight: 70
        };
        var getformatValueText = function getformatValueText(props, value) {
          var _props$mask, _value$length;
          return props.password ? ((_props$mask = props.mask) !== null && _props$mask !== void 0 ? _props$mask : "").repeat((_value$length = value.length) !== null && _value$length !== void 0 ? _value$length : 0) : value;
        };
        var Input = function Input(props) {
          var _props$valueSignal, _props$position, _props$keyEvents;
          var _ref = (_props$valueSignal = props.valueSignal) !== null && _props$valueSignal !== void 0 ? _props$valueSignal : createSignal(""),
            _ref2 = _slicedToArray(_ref, 2),
            value = _ref2[0],
            setValue = _ref2[1];
          var _createSignal = createSignal((_props$position = props.position) !== null && _props$position !== void 0 ? _props$position : value().length),
            _createSignal2 = _slicedToArray(_createSignal, 2),
            position = _createSignal2[0],
            setPosition = _createSignal2[1];
          var _ref3 = (_props$keyEvents = props.keyEvents) !== null && _props$keyEvents !== void 0 ? _props$keyEvents : createSignal(""),
            _ref4 = _slicedToArray(_ref3, 2),
            keyEvent = _ref4[0],
            setKeyEvent = _ref4[1];
          var formatValueText = createMemo(function () {
            return getformatValueText(props, value());
          });
          var formatInputText = function formatInputText(key) {
            if (key === void 0 || key === "") return;
            var inputText = value();
            var currentPosition = value().length;
            var newValue = "";
            switch (key.toLowerCase()) {
              case "bksp":
              case "delete":
                newValue = currentPosition > 0 ? inputText.slice(0, currentPosition - 1) + inputText.slice(currentPosition) : inputText;
                currentPosition--;
                break;
              case "done":
                break;
              case "space":
                newValue = currentPosition > 0 ? "".concat(inputText.slice(0, currentPosition), " ").concat(inputText.slice(currentPosition)) : " ".concat(inputText);
                currentPosition++;
                break;
              case "clear":
                newValue = "";
                currentPosition = 0;
                break;
              default:
                newValue = currentPosition > 0 ? inputText.slice(0, currentPosition) + key + inputText.slice(currentPosition) : key + inputText;
                currentPosition++;
                break;
            }
            setKeyEvent("");
            setValue(newValue);
            return "";
          };
          createEffect(on(keyEvent, formatInputText, {
            defer: true
          }));
          function onRight() {
            setPosition(function (p) {
              return Math.max(p + 1, value().length);
            });
            return true;
          }
          function onLeft() {
            setPosition(function (p) {
              return Math.max(p - 1, 0);
            });
            return true;
          }
          return createComponent(View, mergeProps(props, {
            get position() {
              return position();
            },
            onLeft: onLeft,
            onRight: onRight,
            style: ContainerStyle,
            get children() {
              return createComponent(Text, {
                style: TextStyle,
                get children() {
                  return formatValueText() || props.placeholder || "";
                }
              });
            }
          }));
        };
        var actionKeyContainerStyle = {
          width: 144,
          alpha: 0.8,
          height: 60,
          scale: 1,
          get color() {
            return 0x0000FFFF;
          },
          borderRadius: 6,
          $focus: {
            alpha: 1,
            scale: 1.05
          },
          transition: {
            scale: true
          }
        };
        var ActionKeyIconStyle = {
          y: 6,
          x: 48,
          width: 48,
          height: 48,
          color: 0xC6C6C6FF
        };
        var keyContainerStyle = {
          height: 60,
          get color() {
            return 0x000000FF;
          },
          scale: 1,
          borderRadius: 6,
          $focus: {
            scale: 1.05,
            get color() {
              return 0x0000FFFF;
            }
          }
        };
        var BaseKeyTextStyle = {
          fontSize: 42,
          lineHeight: 60
        };
        var KeyText = _objectSpread(_objectSpread({}, BaseKeyTextStyle), {}, {
          width: 48,
          contain: "both",
          textAlign: "center"
        });
        var Key = function Key(props) {
          return createComponent(View, mergeProps({
            width: 48
          }, props, {
            style: keyContainerStyle,
            get children() {
              return createComponent(Text, {
                style: KeyText,
                get children() {
                  return props.key || props.title;
                }
              });
            }
          }));
        };
        var ActionKey = function ActionKey(props) {
          return createComponent(Switch, {
            get children() {
              return [createComponent(Match, {
                get when() {
                  return typeof props.key === "string";
                },
                get children() {
                  return createComponent(View, mergeProps(props, {
                    get key() {
                      return props.key;
                    },
                    display: "flex",
                    padding: 20,
                    style: keyContainerStyle,
                    get children() {
                      return createComponent(Text, {
                        style: BaseKeyTextStyle,
                        get children() {
                          return props.key;
                        }
                      });
                    }
                  }));
                }
              }), createComponent(Match, {
                get when() {
                  return props.key.icon;
                },
                get children() {
                  return createComponent(View, mergeProps(props, {
                    get key() {
                      return props.key.key;
                    },
                    style: actionKeyContainerStyle,
                    get children() {
                      return createComponent(View, {
                        get src() {
                          return "".concat(props.key.icon);
                        },
                        style: ActionKeyIconStyle
                      });
                    }
                  }));
                }
              }), createComponent(Match, {
                when: true,
                get children() {
                  var _props$key;
                  return createComponent(View, mergeProps(props, {
                    get key() {
                      return props.key.key;
                    },
                    display: "flex",
                    padding: 20,
                    style: (_props$key = props.key) !== null && _props$key !== void 0 && _props$key.size ? actionKeyContainerStyle : keyContainerStyle,
                    get children() {
                      return createComponent(Text, {
                        style: BaseKeyTextStyle,
                        get children() {
                          return props.key.title;
                        }
                      });
                    }
                  }));
                }
              })];
            }
          });
        };
        var Keyboard = function Keyboard(props) {
          var _createSignal3 = createSignal("default"),
            _createSignal4 = _slicedToArray(_createSignal3, 2),
            layout = _createSignal4[0],
            setLayout = _createSignal4[1];
          var config = createMemo(function () {
            return props.formats[layout()];
          });
          var onEnter = function onEnter(_e, _keyboard, key) {
            if (typeof key.key === "string") {
              return false;
            }
            if (key.key.title === "shift") {
              setLayout(layout() === "uppercase" ? "default" : "uppercase");
              return true;
            }
            if (key.key.title === "symbol") {
              setLayout(layout() === "symbol" ? "default" : "symbol");
              return true;
            }
            return false;
          };
          var handleEnter = chainFunctions(onEnter, props.onEnter);
          return createComponent(Column, mergeProps({
            transition: false
          }, props, {
            gap: 12,
            plinko: true,
            scroll: "none",
            onEnter: handleEnter,
            get children() {
              return createComponent(Index, {
                get each() {
                  return config();
                },
                children: function children(keyRow) {
                  return createComponent(Row, {
                    gap: 6,
                    justifyContent: "center",
                    scroll: "none",
                    get children() {
                      return createComponent(Index, {
                        get each() {
                          return keyRow();
                        },
                        children: function children(key) {
                          return createComponent(Show, {
                            get when() {
                              return memo(function () {
                                return typeof key() === "string";
                              })() && key().length === 1;
                            },
                            get fallback() {
                              return createComponent(ActionKey, {
                                get key() {
                                  return key();
                                }
                              });
                            },
                            get children() {
                              return createComponent(Key, {
                                get key() {
                                  return key();
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
            }
          }));
        };
        var LoginPage = exports("default", function () {
          var Title = {
            fontSize: 42,
            fontWeight: "bold"
          };
          var formats = {
            uppercase: [["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", {
              title: "Delete",
              size: "md",
              keyId: "delete",
              announce: "delete, button"
            }], ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", {
              title: "#@!",
              size: "md",
              toggle: "symbols",
              announce: "symbol mode, button",
              keyId: "symbols"
            }], ["A", "S", "D", "F", "G", "H", "J", "K", "L", "@", {
              title: "áöû",
              size: "md",
              toggle: "accents",
              announce: "accents, button",
              keyId: "accents"
            }], ["Z", "X", "C", "V", "B", "N", "M", {
              title: ".",
              announce: "period, button"
            }, {
              title: "-",
              announce: "dash, button"
            }, {
              title: "_",
              announce: "underscore, button"
            }, {
              title: "shift",
              size: "md",
              toggle: "default",
              announce: "shift off, button",
              keyId: "shift"
            }], [{
              title: ".com",
              announce: "dot, com",
              size: "md"
            }, {
              title: ".net",
              announce: "dot, net",
              size: "md"
            }, {
              title: ".edu",
              announce: "dot, edu",
              size: "md"
            }, {
              title: ".org",
              announce: "dot, org",
              size: "md"
            }, {
              title: ".co",
              announce: "dot, co",
              size: "md"
            }, {
              title: ".uk",
              announce: "dot, uk",
              size: "md"
            }], [{
              title: "Clear",
              size: "lg",
              keyId: "clear",
              announce: "clear, button"
            }, {
              title: "Space",
              size: "xl",
              keyId: "space",
              announce: "space, button"
            }, {
              title: "Save",
              size: "lg",
              keyId: "save",
              announce: "save, button"
            }]],
            default: [["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", {
              title: "Delete",
              size: "md",
              keyId: "delete",
              announce: "delete, button"
            }], ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", {
              title: "#@!",
              size: "md",
              toggle: "symbols",
              announce: "symbol mode, button",
              keyId: "symbols"
            }], ["a", "s", "d", "f", "g", "h", "j", "k", "l", "@"], ["z", "x", "c", "v", "b", "n", "m", {
              title: "_",
              announce: "underscore, button"
            }, {
              title: ".",
              announce: "period, button"
            }, {
              title: "-",
              announce: "dash, button"
            }, {
              title: "shift",
              size: "md",
              toggle: "uppercase",
              announce: "shift on, button",
              keyId: "shift"
            }], [{
              title: ".com",
              announce: "dot, com",
              size: "md"
            }, {
              title: ".net",
              announce: "dot, net",
              size: "md"
            }, {
              title: ".edu",
              announce: "dot, edu",
              size: "md"
            }, {
              title: ".org",
              announce: "dot, org",
              size: "md"
            }, {
              title: ".co",
              announce: "dot, co",
              size: "md"
            }, {
              title: ".uk",
              announce: "dot, uk",
              size: "md"
            }], [{
              title: "Clear",
              size: "lg",
              keyId: "clear",
              announce: "clear, button"
            }, {
              title: "Space",
              size: "xl",
              keyId: "space",
              announce: "space, button"
            }, {
              title: "Save",
              size: "lg",
              keyId: "save",
              announce: "save, button"
            }]]
          };
          var keyEvent = createSignal("");
          var valueSignal = createSignal("");
          var _keyEvent2 = _slicedToArray(keyEvent, 2),
            _keyEvent = _keyEvent2[0],
            setKeyEvent = _keyEvent2[1];
          var onEnter = function onEnter(_e, _keyboard, key) {
            if (typeof key.key === "string") {
              setKeyEvent(key.key);
            } else if (_typeof(key.key) === "object") {
              if (key.key.title === "save" || key.key.title === "Save") {
                console.log("perform save action", valueSignal[0]());
                return true;
              }
              setKeyEvent(key.key.title);
            }
          };
          onMount(function () {
            setGlobalBackground(0x000000FF);
          });
          return createComponent(View, {
            width: 1080,
            x: 350,
            y: 100,
            get children() {
              return createComponent(Column, {
                autofocus: true,
                selected: 1,
                scroll: "none",
                get children() {
                  return [createComponent(Text, {
                    skipFocus: true,
                    style: Title,
                    children: "Username"
                  }), createComponent(Input, {
                    valueSignal: valueSignal,
                    keyEvents: keyEvent
                  }), createComponent(Keyboard, {
                    width: 550,
                    formats: formats,
                    onEnter: onEnter
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
