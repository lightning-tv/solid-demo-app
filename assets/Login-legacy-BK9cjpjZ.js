;
(function () {
  function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
  function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
  function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
  function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
  function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
  function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
  function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
  System.register(['./index-legacy-DKXjmquD.js', './Button-legacy-Y8JRP98l.js'], function (exports, module) {
    'use strict';

    var createSignal, createMemo, createEffect, on, createComponent, View, mergeProps, styles, Text, styles$1, styles$2, For, Show, Column, Row, onMount, setGlobalBackground, ButtonContainer;
    return {
      setters: [function (module) {
        createSignal = module.c;
        createMemo = module.p;
        createEffect = module.f;
        on = module.o;
        createComponent = module.h;
        View = module.V;
        mergeProps = module.m;
        styles = module.H;
        Text = module.T;
        styles$1 = module.J;
        styles$2 = module.K;
        For = module.F;
        Show = module.S;
        Column = module.C;
        Row = module.R;
        onMount = module.g;
        setGlobalBackground = module.s;
      }, function (module) {
        ButtonContainer = module.a;
      }],
      execute: function execute() {
        var getformatTitleText = function getformatTitleText(props, title) {
          var _props$mask, _title$length;
          return props.password ? ((_props$mask = props.mask) !== null && _props$mask !== void 0 ? _props$mask : "").repeat((_title$length = title.length) !== null && _title$length !== void 0 ? _title$length : 0) : title;
        };
        var Input = function Input(props) {
          var _props$position;
          var _props$titleSignal = _slicedToArray(props.titleSignal, 2),
            title = _props$titleSignal[0],
            setTitle = _props$titleSignal[1];
          var _createSignal = createSignal((_props$position = props.position) !== null && _props$position !== void 0 ? _props$position : title().length),
            _createSignal2 = _slicedToArray(_createSignal, 2),
            position = _createSignal2[0],
            setPosition = _createSignal2[1];
          var _props$keyEvent = _slicedToArray(props.keyEvent, 2),
            keyEvent = _props$keyEvent[0],
            setKeyEvent = _props$keyEvent[1];
          var formatTitleText = createMemo(function () {
            return getformatTitleText(props, title());
          });
          var formatInputText = function formatInputText(key) {
            if (key === void 0 || key === "") {
              return;
            }
            var inputText = title();
            var currentPosition = position();
            var newTitle = "";
            switch (key.toLowerCase()) {
              case "backspace":
              case "delete":
                newTitle = currentPosition > 0 ? inputText.slice(0, currentPosition - 1) + inputText.slice(currentPosition) : inputText;
                currentPosition--;
                break;
              case "done":
                break;
              case "space":
                newTitle = currentPosition > 0 ? inputText.slice(0, currentPosition) + " " + inputText.slice(currentPosition) : " " + inputText;
                currentPosition++;
                break;
              case "clear":
                newTitle = "";
                currentPosition = 0;
                break;
              default:
                newTitle = currentPosition > 0 ? inputText.slice(0, currentPosition) + key + inputText.slice(currentPosition) : key + inputText;
                currentPosition++;
                break;
            }
            setKeyEvent("");
            setTitle(newTitle);
            setPosition(currentPosition);
            return "";
          };
          createEffect(on(function () {
            return keyEvent();
          }, function (keyEvent2) {
            formatInputText(keyEvent2);
          }, {
            defer: true
          }));
          function onRight() {
            setPosition(function (p) {
              return Math.max(p + 1, title().length);
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
            get color() {
              return props.backgroundColor;
            },
            get justifyContent() {
              return props.justify;
            },
            get borderRadius() {
              return props.radius;
            },
            get position() {
              return position();
            },
            onLeft: onLeft,
            onRight: onRight,
            get style() {
              var _props$tone;
              return [props.style,
              //
              styles.Container.tones[(_props$tone = props.tone) !== null && _props$tone !== void 0 ? _props$tone : styles.tone], styles.Container.base];
            },
            get children() {
              return createComponent(Text, {
                get tone() {
                  var _props$tone2;
                  return (_props$tone2 = props.tone) !== null && _props$tone2 !== void 0 ? _props$tone2 : styles.tone;
                },
                get color() {
                  return props.textColor;
                },
                get style() {
                  var _props$tone3;
                  return [styles.Text.tones[(_props$tone3 = props.tone) !== null && _props$tone3 !== void 0 ? _props$tone3 : styles.tone],
                  //
                  styles.Text.base];
                },
                get children() {
                  return formatTitleText() || " ";
                }
              });
            }
          }));
        };
        var getTone$1 = function getTone$1(props) {
          var _props$tone4;
          return (_props$tone4 = props.tone) !== null && _props$tone4 !== void 0 ? _props$tone4 : styles$1.tone;
        };
        var getMultiplier$1 = function getMultiplier$1(props) {
          var _ref, _props$sizes, _props$sizes2, _props$size, _styles$1$Container, _props$tone5, _props$size2, _props$size3;
          return (_ref = (_props$sizes = (_props$sizes2 = props.sizes) === null || _props$sizes2 === void 0 ? void 0 : _props$sizes2[(_props$size = props.size) !== null && _props$size !== void 0 ? _props$size : "sm"]) !== null && _props$sizes !== void 0 ? _props$sizes : (_styles$1$Container = styles$1.Container) === null || _styles$1$Container === void 0 || (_styles$1$Container = _styles$1$Container.tones) === null || _styles$1$Container === void 0 || (_styles$1$Container = _styles$1$Container[(_props$tone5 = props.tone) !== null && _props$tone5 !== void 0 ? _props$tone5 : styles$1.tone]) === null || _styles$1$Container === void 0 || (_styles$1$Container = _styles$1$Container.sizes) === null || _styles$1$Container === void 0 ? void 0 : _styles$1$Container[(_props$size2 = props.size) !== null && _props$size2 !== void 0 ? _props$size2 : "sm"]) !== null && _ref !== void 0 ? _ref : styles$1.Container.base.sizes[(_props$size3 = props.size) !== null && _props$size3 !== void 0 ? _props$size3 : "sm"];
        };
        var getBaseWidth$1 = function getBaseWidth$1(props) {
          var _ref2, _props$baseWidth, _styles$1$Container2, _props$tone6;
          return (_ref2 = (_props$baseWidth = props.baseWidth) !== null && _props$baseWidth !== void 0 ? _props$baseWidth : (_styles$1$Container2 = styles$1.Container) === null || _styles$1$Container2 === void 0 || (_styles$1$Container2 = _styles$1$Container2.tones) === null || _styles$1$Container2 === void 0 || (_styles$1$Container2 = _styles$1$Container2[(_props$tone6 = props.tone) !== null && _props$tone6 !== void 0 ? _props$tone6 : styles$1.tone]) === null || _styles$1$Container2 === void 0 ? void 0 : _styles$1$Container2.baseWidth) !== null && _ref2 !== void 0 ? _ref2 : styles$1.Container.base.baseWidth;
        };
        var getKeySpacing$1 = function getKeySpacing$1(props) {
          var _ref3, _props$keySpacing, _styles$1$Container$t, _props$tone7;
          return (_ref3 = (_props$keySpacing = props.keySpacing) !== null && _props$keySpacing !== void 0 ? _props$keySpacing : (_styles$1$Container$t = styles$1.Container.tones) === null || _styles$1$Container$t === void 0 || (_styles$1$Container$t = _styles$1$Container$t[(_props$tone7 = props.tone) !== null && _props$tone7 !== void 0 ? _props$tone7 : styles$1.tone]) === null || _styles$1$Container$t === void 0 ? void 0 : _styles$1$Container$t.keySpacing) !== null && _ref3 !== void 0 ? _ref3 : styles$1.Container.base.keySpacing;
        };
        var Key = function Key(props) {
          var tone = createMemo(function () {
            return getTone$1(props);
          });
          var multiplier = createMemo(function () {
            return getMultiplier$1(props);
          });
          var baseWidth = createMemo(function () {
            return getBaseWidth$1(props);
          });
          var keySpacing = createMemo(function () {
            return getKeySpacing$1(props);
          });
          return createComponent(ButtonContainer, mergeProps(props, {
            get style() {
              var _styles$1$Container$t2;
              return [props.style, //
              (_styles$1$Container$t2 = styles$1.Container.tones) === null || _styles$1$Container$t2 === void 0 ? void 0 : _styles$1$Container$t2[tone()], styles$1.Container.base];
            },
            forwardStates: true,
            get width() {
              return multiplier() * baseWidth() + keySpacing() * (multiplier() - 1);
            },
            get children() {
              return createComponent(Text, {
                get contain() {
                  var _props$contain;
                  return (_props$contain = props.contain) !== null && _props$contain !== void 0 ? _props$contain : "width";
                },
                get textAlign() {
                  return props.textAlign;
                },
                get style() {
                  return [styles$1.Text.tones[tone()],
                  //
                  styles$1.Text.base];
                },
                get children() {
                  return props.title ? props.title : "";
                }
              });
            }
          }));
        };
        var getTone = function getTone(props) {
          var _props$tone8;
          return (_props$tone8 = props.tone) !== null && _props$tone8 !== void 0 ? _props$tone8 : styles$2.tone;
        };
        var getGap = function getGap(props) {
          var _ref4, _ref5, _props$gap, _styles$2$Container$t, _props$tone9;
          return (_ref4 = (_ref5 = (_props$gap = props.gap) !== null && _props$gap !== void 0 ? _props$gap : props.keySpacing) !== null && _ref5 !== void 0 ? _ref5 : (_styles$2$Container$t = styles$2.Container.tones[(_props$tone9 = props.tone) !== null && _props$tone9 !== void 0 ? _props$tone9 : styles$2.tone]) === null || _styles$2$Container$t === void 0 ? void 0 : _styles$2$Container$t.keySpacing) !== null && _ref4 !== void 0 ? _ref4 : styles$2.Container.base.keySpacing;
        };
        var getKeyHeight = function getKeyHeight(props) {
          var _ref6, _props$keyHeight, _styles$2$Container$t2, _props$tone10;
          return (_ref6 = (_props$keyHeight = props.keyHeight) !== null && _props$keyHeight !== void 0 ? _props$keyHeight : (_styles$2$Container$t2 = styles$2.Container.tones[(_props$tone10 = props.tone) !== null && _props$tone10 !== void 0 ? _props$tone10 : styles$2.tone]) === null || _styles$2$Container$t2 === void 0 ? void 0 : _styles$2$Container$t2.keyHeight) !== null && _ref6 !== void 0 ? _ref6 : styles$2.Container.base.keyHeight;
        };
        var getTotalWidth = function getTotalWidth(props) {
          var _ref7, _ref8, _props$screenW, _styles$2$Container$t3, _props$tone11;
          return (_ref7 = (_ref8 = (_props$screenW = props.screenW) !== null && _props$screenW !== void 0 ? _props$screenW : props.width) !== null && _ref8 !== void 0 ? _ref8 : (_styles$2$Container$t3 = styles$2.Container.tones[(_props$tone11 = props.tone) !== null && _props$tone11 !== void 0 ? _props$tone11 : styles$2.tone]) === null || _styles$2$Container$t3 === void 0 ? void 0 : _styles$2$Container$t3.width) !== null && _ref7 !== void 0 ? _ref7 : styles$2.Container.base.width;
        };
        var getMultiplier = function getMultiplier(props) {
          var _ref9, _props$sizes3, _props$sizes4, _props$size4, _styles$1$Container3, _props$tone12, _props$size5, _props$size6;
          return (_ref9 = (_props$sizes3 = (_props$sizes4 = props.sizes) === null || _props$sizes4 === void 0 ? void 0 : _props$sizes4[(_props$size4 = props.size) !== null && _props$size4 !== void 0 ? _props$size4 : "sm"]) !== null && _props$sizes3 !== void 0 ? _props$sizes3 : (_styles$1$Container3 = styles$1.Container) === null || _styles$1$Container3 === void 0 || (_styles$1$Container3 = _styles$1$Container3.tones) === null || _styles$1$Container3 === void 0 || (_styles$1$Container3 = _styles$1$Container3[(_props$tone12 = props.tone) !== null && _props$tone12 !== void 0 ? _props$tone12 : styles$1.tone]) === null || _styles$1$Container3 === void 0 || (_styles$1$Container3 = _styles$1$Container3.sizes) === null || _styles$1$Container3 === void 0 ? void 0 : _styles$1$Container3[(_props$size5 = props.size) !== null && _props$size5 !== void 0 ? _props$size5 : "sm"]) !== null && _ref9 !== void 0 ? _ref9 : styles$1.Container.base.sizes[(_props$size6 = props.size) !== null && _props$size6 !== void 0 ? _props$size6 : "sm"];
        };
        var getBaseWidth = function getBaseWidth(props) {
          var _ref10, _props$baseWidth2, _styles$1$Container4, _props$tone13;
          return (_ref10 = (_props$baseWidth2 = props.baseWidth) !== null && _props$baseWidth2 !== void 0 ? _props$baseWidth2 : (_styles$1$Container4 = styles$1.Container) === null || _styles$1$Container4 === void 0 || (_styles$1$Container4 = _styles$1$Container4.tones) === null || _styles$1$Container4 === void 0 || (_styles$1$Container4 = _styles$1$Container4[(_props$tone13 = props.tone) !== null && _props$tone13 !== void 0 ? _props$tone13 : styles$1.tone]) === null || _styles$1$Container4 === void 0 ? void 0 : _styles$1$Container4.baseWidth) !== null && _ref10 !== void 0 ? _ref10 : styles$1.Container.base.baseWidth;
        };
        var getKeySpacing = function getKeySpacing(props) {
          var _ref11, _props$keySpacing2, _styles$1$Container$t3, _props$tone14;
          return (_ref11 = (_props$keySpacing2 = props.keySpacing) !== null && _props$keySpacing2 !== void 0 ? _props$keySpacing2 : (_styles$1$Container$t3 = styles$1.Container.tones) === null || _styles$1$Container$t3 === void 0 || (_styles$1$Container$t3 = _styles$1$Container$t3[(_props$tone14 = props.tone) !== null && _props$tone14 !== void 0 ? _props$tone14 : styles$1.tone]) === null || _styles$1$Container$t3 === void 0 ? void 0 : _styles$1$Container$t3.keySpacing) !== null && _ref11 !== void 0 ? _ref11 : styles$1.Container.base.keySpacing;
        };
        var KeyboardBase = function KeyboardBase(props) {
          var _props$keySignal;
          var _ref12 = (_props$keySignal = props.keySignal) !== null && _props$keySignal !== void 0 ? _props$keySignal : createSignal(""),
            _ref13 = _slicedToArray(_ref12, 2),
            _ = _ref13[0],
            setKeySignal = _ref13[1];
          var _createSignal3 = createSignal("default"),
            _createSignal4 = _slicedToArray(_createSignal3, 2),
            activeKeyboard = _createSignal4[0],
            setActiveKeyboard = _createSignal4[1];
          var _createSignal5 = createSignal(0),
            _createSignal6 = _slicedToArray(_createSignal5, 2),
            selectedRowIndex = _createSignal6[0],
            setSelectedRowIndex = _createSignal6[1];
          var _createSignal7 = createSignal(0),
            _createSignal8 = _slicedToArray(_createSignal7, 2),
            selectedColumnIndex = _createSignal8[0],
            setSelectedColumnIndex = _createSignal8[1];
          var _createSignal9 = createSignal(0),
            _createSignal10 = _slicedToArray(_createSignal9, 2),
            rowWidth = _createSignal10[0],
            setRowWidth = _createSignal10[1];
          var tone = createMemo(function () {
            return getTone(props);
          });
          var gap = createMemo(function () {
            return getGap(props);
          });
          var totalWidth = createMemo(function () {
            return getTotalWidth(props);
          });
          var keyHeight = createMemo(function () {
            return getKeyHeight(props);
          });
          var keyboardRefList = /* @__PURE__ */new Map();
          var setOnEnter = function setOnEnter(key, rowIdx, colIdx) {
            if (typeof key === "string") {
              return function () {
                return setKeySignal(key);
              };
            } else if (key.toggle) {
              return function () {
                var _keyboardRefList$key$, _keyboardRefList$key$2, _keyboardRefList$key$3;
                setSelectedRowIndex(rowIdx());
                setSelectedColumnIndex(colIdx());
                setActiveKeyboard(key.toggle);
                (_keyboardRefList$key$ = keyboardRefList[key.toggle]) === null || _keyboardRefList$key$ === void 0 || (_keyboardRefList$key$ = _keyboardRefList$key$.element) === null || _keyboardRefList$key$ === void 0 || _keyboardRefList$key$.setFocus();
                setRowWidth((_keyboardRefList$key$2 = (_keyboardRefList$key$3 = keyboardRefList[key.toggle]) === null || _keyboardRefList$key$3 === void 0 ? void 0 : _keyboardRefList$key$3.width) !== null && _keyboardRefList$key$2 !== void 0 ? _keyboardRefList$key$2 : 0);
              };
            } else {
              return function () {
                var _key$title;
                return setKeySignal(typeof key === "string" ? key : (_key$title = key.title) !== null && _key$title !== void 0 ? _key$title : "");
              };
            }
          };
          var addKeyboardWidth = function addKeyboardWidth(keyboard) {
            var maxRow = 0;
            var _iterator = _createForOfIteratorHelper(props.formats[keyboard]),
              _step;
            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var row = _step.value;
                var rowWidth2 = 0;
                var _iterator2 = _createForOfIteratorHelper(row),
                  _step2;
                try {
                  for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                    var key = _step2.value;
                    var width = getBaseWidth(props);
                    if (_typeof(key) === "object") {
                      width = getMultiplier(key) * getBaseWidth(props) + getKeySpacing(props) * (getMultiplier(key) - 1);
                    }
                    rowWidth2 += width + getKeySpacing(props);
                  }
                } catch (err) {
                  _iterator2.e(err);
                } finally {
                  _iterator2.f();
                }
                if (maxRow < rowWidth2) {
                  maxRow = rowWidth2;
                }
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }
            return maxRow;
          };
          return createComponent(View, mergeProps(props, {
            forwardFocus: 0,
            get style() {
              return [props.style,
              //
              styles$2.Container.tones[tone()], styles$2.Container.base];
            },
            get width() {
              return totalWidth();
            },
            height: void 0,
            get children() {
              return createComponent(For, {
                get each() {
                  return Object.keys(props.formats);
                },
                children: function children(keyboard) {
                  return createComponent(Show, {
                    get when() {
                      return activeKeyboard() === keyboard;
                    },
                    get children() {
                      return createComponent(View, {
                        ref: function ref(element) {
                          keyboardRefList[keyboard] = {
                            element: element,
                            width: addKeyboardWidth(keyboard)
                          };
                          if (activeKeyboard() === keyboard) {
                            var _keyboardRefList$keyb, _keyboardRefList$keyb2;
                            element.setFocus();
                            setRowWidth((_keyboardRefList$keyb = (_keyboardRefList$keyb2 = keyboardRefList[keyboard]) === null || _keyboardRefList$keyb2 === void 0 ? void 0 : _keyboardRefList$keyb2.width) !== null && _keyboardRefList$keyb !== void 0 ? _keyboardRefList$keyb : 0);
                          }
                          return keyboard;
                        },
                        get justifyContent() {
                          return props.centerKeyboard ? "center" : "flexStart";
                        },
                        display: "flex",
                        forwardFocus: 0,
                        get children() {
                          return createComponent(Column, {
                            scroll: "none",
                            plinko: true,
                            get selected() {
                              return selectedColumnIndex();
                            },
                            get alignItems() {
                              return props.centerKeys || props.centerKeyboard ? "center" : "flexStart";
                            },
                            get width() {
                              return rowWidth();
                            },
                            get gap() {
                              return gap();
                            },
                            get children() {
                              return createComponent(For, {
                                get each() {
                                  return props.formats[keyboard];
                                },
                                children: function children(row, colIdx) {
                                  return createComponent(Row, {
                                    scroll: "none",
                                    get selected() {
                                      return selectedRowIndex();
                                    },
                                    get flexBoundary() {
                                      var _props$flexBoundary;
                                      return (_props$flexBoundary = props.flexBoundary) !== null && _props$flexBoundary !== void 0 ? _props$flexBoundary : "contain";
                                    },
                                    display: "flex",
                                    get gap() {
                                      return gap();
                                    },
                                    get height() {
                                      return keyHeight();
                                    },
                                    get wrap() {
                                      return props.rowWrap;
                                    },
                                    get children() {
                                      return createComponent(For, {
                                        each: row,
                                        children: function children(key, rowIdx) {
                                          return createComponent(Key, mergeProps(typeof key === "string" ? {} : key, {
                                            get onEnter() {
                                              return setOnEnter(key, rowIdx, colIdx);
                                            },
                                            get title() {
                                              var _key$title2;
                                              return typeof key === "string" ? key : (_key$title2 = key.title) !== null && _key$title2 !== void 0 ? _key$title2 : "";
                                            },
                                            get height() {
                                              return keyHeight();
                                            }
                                          }));
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
                  });
                }
              });
            }
          }));
        };
        var dialpad = {
          default: [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9'], ['0']]
        };
        var dialpadExtended = {
          default: [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9'], ['0', {
            title: 'Delete',
            size: 'md',
            keyId: 'delete',
            announce: 'delete, button'
          }]]
        }; // fixes type issue when assigned to KeyboardBase.formats
        var email = {
          uppercase: [['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', {
            title: 'Delete',
            size: 'md',
            keyId: 'delete',
            announce: 'delete, button'
          }], ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', {
            title: '#@!',
            size: 'md',
            toggle: 'symbols',
            announce: 'symbol mode, button',
            keyId: 'symbols'
          }], ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', '@', {
            title: 'áöû',
            size: 'md',
            toggle: 'accents',
            announce: 'accents, button',
            keyId: 'accents'
          }], ['Z', 'X', 'C', 'V', 'B', 'N', 'M', {
            title: '.',
            announce: 'period, button'
          }, {
            title: '-',
            announce: 'dash, button'
          }, {
            title: '_',
            announce: 'underscore, button'
          }, {
            title: 'shift',
            size: 'md',
            toggle: 'default',
            announce: 'shift off, button',
            keyId: 'shift'
          }], [{
            title: '.com',
            announce: 'dot, com',
            size: 'md'
          }, {
            title: '.net',
            announce: 'dot, net',
            size: 'md'
          }, {
            title: '.edu',
            announce: 'dot, edu',
            size: 'md'
          }, {
            title: '.org',
            announce: 'dot, org',
            size: 'md'
          }, {
            title: '.co',
            announce: 'dot, co',
            size: 'md'
          }, {
            title: '.uk',
            announce: 'dot, uk',
            size: 'md'
          }], [{
            title: 'Clear',
            size: 'lg',
            keyId: 'clear',
            announce: 'clear, button'
          }, {
            title: 'Space',
            size: 'xl',
            keyId: 'space',
            announce: 'space, button'
          }, {
            title: 'Done',
            size: 'lg',
            keyId: 'done',
            announce: 'done, button'
          }]],
          default: [['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', {
            title: 'Delete',
            size: 'md',
            keyId: 'delete',
            announce: 'delete, button'
          }], ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', {
            title: '#@!',
            size: 'md',
            toggle: 'symbols',
            announce: 'symbol mode, button',
            keyId: 'symbols'
          }], ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', '@', {
            title: 'áöû',
            size: 'md',
            toggle: 'accents',
            announce: 'accents, button',
            keyId: 'accents'
          }], ['z', 'x', 'c', 'v', 'b', 'n', 'm', {
            title: '_',
            announce: 'underscore, button'
          }, {
            title: '.',
            announce: 'period, button'
          }, {
            title: '-',
            announce: 'dash, button'
          }, {
            title: 'shift',
            size: 'md',
            toggle: 'uppercase',
            announce: 'shift on, button',
            keyId: 'shift'
          }], [{
            title: '.com',
            announce: 'dot, com',
            size: 'md'
          }, {
            title: '.net',
            announce: 'dot, net',
            size: 'md'
          }, {
            title: '.edu',
            announce: 'dot, edu',
            size: 'md'
          }, {
            title: '.org',
            announce: 'dot, org',
            size: 'md'
          }, {
            title: '.co',
            announce: 'dot, co',
            size: 'md'
          }, {
            title: '.uk',
            announce: 'dot, uk',
            size: 'md'
          }], [{
            title: 'Clear',
            size: 'lg',
            keyId: 'clear',
            announce: 'clear, button'
          }, {
            title: 'Space',
            size: 'xl',
            keyId: 'space',
            announce: 'space, button'
          }, {
            title: 'Done',
            size: 'lg',
            keyId: 'done',
            announce: 'done, button'
          }]],
          accents: [['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', {
            title: 'Delete',
            size: 'md',
            keyId: 'delete',
            announce: 'delete, button'
          }], ['ä', 'ë', 'ï', 'ö', 'ü', 'ÿ', 'à', 'è', 'ì', 'ò', {
            title: '#@!',
            size: 'md',
            toggle: 'symbols',
            announce: 'symbol mode, button',
            keyId: 'symbols'
          }], ['ù', 'á', 'é', 'í', 'ó', 'ú', 'ý', 'â', 'ê', '@', {
            title: 'abc',
            size: 'md',
            toggle: 'default',
            announce: 'alpha mode, button'
          }], ['î', 'ô', 'û', 'ã', 'ñ', {
            title: '_',
            announce: 'underscore, button'
          }, {
            title: '.',
            announce: 'period, button'
          }, {
            title: '-',
            announce: 'dash, button'
          }, {
            title: 'shift',
            size: 'xl',
            toggle: 'accentsUpper',
            announce: 'shift off, button',
            keyId: 'shift'
          }], [{
            title: '.com',
            announce: 'dot, com',
            size: 'md'
          }, {
            title: '.net',
            announce: 'dot, net',
            size: 'md'
          }, {
            title: '.edu',
            announce: 'dot, edu',
            size: 'md'
          }, {
            title: '.org',
            announce: 'dot, org',
            size: 'md'
          }, {
            title: '.co',
            announce: 'dot, co',
            size: 'md'
          }, {
            title: '.uk',
            announce: 'dot, uk',
            size: 'md'
          }], [{
            title: 'Clear',
            size: 'lg',
            keyId: 'clear',
            announce: 'clear, button'
          }, {
            title: 'Space',
            size: 'xl',
            keyId: 'space',
            announce: 'space, button'
          }, {
            title: 'Done',
            size: 'lg',
            keyId: 'done',
            announce: 'done, button'
          }]],
          accentsUpper: [['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', {
            title: 'Delete',
            size: 'md',
            keyId: 'delete',
            announce: 'delete, button'
          }], ['Ä', 'Ë', 'Ï', 'Ö', 'Ü', 'Ÿ', 'À', 'È', 'Ì', 'Ò', {
            title: '#@!',
            size: 'md',
            toggle: 'symbols',
            announce: 'symbol mode, button',
            keyId: 'symbols'
          }], ['Ù', 'Á', 'É', 'Í', 'Ó', 'Ú', 'Ý', 'Â', 'Ê', '@', {
            title: 'abc',
            size: 'md',
            toggle: 'default',
            announce: 'alpha mode, button'
          }], ['Î', 'Ô', 'Û', 'Ã', 'Ñ', {
            title: '.',
            announce: 'period, button'
          }, {
            title: '-',
            announce: 'dash, button'
          }, {
            title: '_',
            announce: 'underscore, button'
          }, {
            title: 'shift',
            size: 'xl',
            toggle: 'accents',
            announce: 'shift off, button',
            keyId: 'shift'
          }], [{
            title: '.com',
            announce: 'dot, com',
            size: 'md'
          }, {
            title: '.net',
            announce: 'dot, net',
            size: 'md'
          }, {
            title: '.edu',
            announce: 'dot, edu',
            size: 'md'
          }, {
            title: '.org',
            announce: 'dot, org',
            size: 'md'
          }, {
            title: '.co',
            announce: 'dot, co',
            size: 'md'
          }, {
            title: '.uk',
            announce: 'dot, uk',
            size: 'md'
          }], [{
            title: 'Clear',
            size: 'lg',
            keyId: 'clear',
            announce: 'clear, button'
          }, {
            title: 'Space',
            size: 'xl',
            keyId: 'space',
            announce: 'space, button'
          }, {
            title: 'Done',
            size: 'lg',
            keyId: 'done',
            announce: 'done, button'
          }]],
          symbols: [['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', {
            title: 'Delete',
            size: 'md',
            keyId: 'delete',
            announce: 'delete, button'
          }], [{
            title: '!',
            announce: 'exclamation, button'
          }, '@', '#', '$', '%', {
            title: '^',
            announce: 'caret circumflex, button'
          }, '&', '*', {
            title: '(',
            announce: 'open parenthesis, button'
          }, {
            title: ')',
            announce: 'close parenthesis, button'
          }, {
            title: 'abc',
            size: 'md',
            toggle: 'default',
            announce: 'alpha mode, button'
          }], [{
            title: '{',
            announce: 'open brace, button'
          }, {
            title: '}',
            announce: 'close brace, button'
          }, {
            title: '[',
            announce: 'open bracket, button'
          }, {
            title: ']',
            announce: 'close bracket, button'
          }, {
            title: ';',
            announce: 'semicolon, button'
          }, {
            title: '"',
            announce: 'doublequote, button'
          }, {
            title: ',',
            announce: 'comma, button'
          }, {
            title: '|',
            announce: 'vertical bar, button'
          }, {
            title: '\\',
            announce: 'backslash, button'
          }, {
            title: '/',
            announce: 'forwardslash, button'
          }, {
            title: 'áöû',
            size: 'md',
            toggle: 'accents',
            announce: 'accents, button',
            keyId: 'accents'
          }], [{
            title: '<',
            announce: 'less than, button'
          }, {
            title: '>',
            announce: 'greater than, button'
          }, {
            title: '?',
            announce: 'question mark, button'
          }, {
            title: '=',
            announce: 'equal sign, button'
          }, {
            title: '`',
            announce: 'grave accent, button'
          }, {
            title: '~',
            announce: 'tilde, button'
          }, {
            title: '_',
            announce: 'underscore, button'
          }, {
            title: ':',
            announce: 'colon, button'
          }, {
            title: '-',
            announce: 'dash, button'
          }, {
            title: '+',
            announce: 'plus sign, button'
          }], [{
            title: '.com',
            announce: 'dot, com',
            size: 'md'
          }, {
            title: '.net',
            announce: 'dot, net',
            size: 'md'
          }, {
            title: '.edu',
            announce: 'dot, edu',
            size: 'md'
          }, {
            title: '.org',
            announce: 'dot, org',
            size: 'md'
          }, {
            title: '.co',
            announce: 'dot, co',
            size: 'md'
          }, {
            title: '.uk',
            announce: 'dot, uk',
            size: 'md'
          }], [{
            title: 'Clear',
            size: 'lg',
            keyId: 'clear',
            announce: 'clear, button'
          }, {
            title: 'Space',
            size: 'xl',
            keyId: 'space',
            announce: 'space, button'
          }, {
            title: 'Done',
            size: 'lg',
            keyId: 'done',
            announce: 'done, button'
          }]]
        };
        var fullscreen = {
          letters: [['', '', '', '', '', '', '', '', '', {
            title: '#@!',
            size: 'lg',
            toggle: 'symbols',
            announce: 'symbol mode, button',
            keyId: 'symbols'
          }, {
            title: 'Space',
            size: 'lg',
            keyId: 'space',
            announce: 'space, button'
          }, {
            title: 'Delete',
            size: 'md',
            keyId: 'delete',
            announce: 'delete, button'
          }, '', '', '', '', '', '', '', '', ''], ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']],
          symbols: [['', '', '', '', '', '', '', '', '', {
            title: 'ABC',
            size: 'lg',
            toggle: 'letters',
            announce: 'caps on, button'
          }, {
            title: 'Space',
            size: 'lg',
            keyId: 'space',
            announce: 'space, button'
          }, {
            title: 'Delete',
            size: 'md',
            keyId: 'delete',
            announce: 'delete, button'
          }, '', '', '', '', '', '', '', '', ''], ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', {
            title: '!',
            announce: 'exclamation, button'
          }, '@', '#', '$', '%', {
            title: '^',
            announce: 'caret circumflex, button'
          }, '&', '*', {
            title: '(',
            announce: 'open parenthesis, button'
          }, {
            title: ')',
            announce: 'close parenthesis, button'
          }, {
            title: '`',
            announce: 'grave accent, button'
          }, '~', '_', '.', '-', '+']]
        };
        var numbers = {
          default: [['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']]
        };
        var qwerty = {
          uppercase: [['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', {
            title: 'Delete',
            size: 'md',
            keyId: 'delete',
            announce: 'delete, button'
          }], ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', {
            title: '#@!',
            size: 'md',
            toggle: 'symbols',
            announce: 'symbol mode, button',
            keyId: 'symbols'
          }], ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', '@', {
            title: 'áöû',
            size: 'md',
            toggle: 'accents',
            announce: 'accents, button',
            keyId: 'accents'
          }], ['Z', 'X', 'C', 'V', 'B', 'N', 'M', {
            title: '.',
            announce: 'period, button'
          }, {
            title: '-',
            announce: 'dash, button'
          }, {
            title: '_',
            announce: 'underscore, button'
          }, {
            title: 'shift',
            size: 'md',
            toggle: 'default',
            announce: 'shift off, button',
            keyId: 'shift'
          }], [{
            title: 'Clear',
            size: 'lg',
            keyId: 'clear',
            announce: 'clear, button'
          }, {
            title: 'Space',
            size: 'xl',
            keyId: 'space',
            announce: 'space, button'
          }, {
            title: 'Done',
            size: 'lg',
            keyId: 'done',
            announce: 'done, button'
          }]],
          default: [['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', {
            title: 'Delete',
            size: 'md',
            keyId: 'delete',
            announce: 'delete, button'
          }], ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', {
            title: '#@!',
            size: 'md',
            toggle: 'symbols',
            announce: 'symbol mode, button',
            keyId: 'symbols'
          }], ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', '@', {
            title: 'áöû',
            size: 'md',
            toggle: 'accents',
            announce: 'accents, button',
            keyId: 'accents'
          }], ['z', 'x', 'c', 'v', 'b', 'n', 'm', {
            title: '_',
            announce: 'underscore, button'
          }, {
            title: '.',
            announce: 'period, button'
          }, {
            title: '-',
            announce: 'dash, button'
          }, {
            title: 'shift',
            size: 'md',
            toggle: 'uppercase',
            announce: 'shift on, button',
            keyId: 'shift'
          }], [{
            title: 'Clear',
            size: 'lg',
            keyId: 'clear',
            announce: 'clear, button'
          }, {
            title: 'Space',
            size: 'xl',
            keyId: 'space',
            announce: 'space, button'
          }, {
            title: 'Done',
            size: 'lg',
            keyId: 'done',
            announce: 'done, button'
          }]],
          accents: [['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', {
            title: 'Delete',
            size: 'md',
            keyId: 'delete',
            announce: 'delete, button'
          }], ['ä', 'ë', 'ï', 'ö', 'ü', 'ÿ', 'à', 'è', 'ì', 'ò', {
            title: '#@!',
            size: 'md',
            toggle: 'symbols',
            announce: 'symbol mode, button',
            keyId: 'symbols'
          }], ['ù', 'á', 'é', 'í', 'ó', 'ú', 'ý', 'â', 'ê', '@', {
            title: 'abc',
            size: 'md',
            toggle: 'default',
            announce: 'alpha mode, button'
          }], ['î', 'ô', 'û', 'ã', 'ñ', {
            title: '_',
            announce: 'underscore, button'
          }, {
            title: '.',
            announce: 'period, button'
          }, {
            title: '-',
            announce: 'dash, button'
          }, {
            title: 'shift',
            size: 'xl',
            toggle: 'accentsUpper',
            announce: 'shift off, button',
            keyId: 'shift'
          }], [{
            title: 'Clear',
            size: 'lg',
            keyId: 'clear',
            announce: 'clear, button'
          }, {
            title: 'Space',
            size: 'xl',
            keyId: 'space',
            announce: 'space, button'
          }, {
            title: 'Done',
            size: 'lg',
            keyId: 'done',
            announce: 'done, button'
          }]],
          accentsUpper: [['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', {
            title: 'Delete',
            size: 'md',
            keyId: 'delete',
            announce: 'delete, button'
          }], ['Ä', 'Ë', 'Ï', 'Ö', 'Ü', 'Ÿ', 'À', 'È', 'Ì', 'Ò', {
            title: '#@!',
            size: 'md',
            toggle: 'symbols',
            announce: 'symbol mode, button',
            keyId: 'symbols'
          }], ['Ù', 'Á', 'É', 'Í', 'Ó', 'Ú', 'Ý', 'Â', 'Ê', '@', {
            title: 'abc',
            size: 'md',
            toggle: 'default',
            announce: 'alpha mode, button'
          }], ['Î', 'Ô', 'Û', 'Ã', 'Ñ', {
            title: '.',
            announce: 'period, button'
          }, {
            title: '-',
            announce: 'dash, button'
          }, {
            title: '_',
            announce: 'underscore, button'
          }, {
            title: 'shift',
            size: 'xl',
            toggle: 'accents',
            announce: 'shift off, button',
            keyId: 'shift'
          }], [{
            title: 'Clear',
            size: 'lg',
            keyId: 'clear',
            announce: 'clear, button'
          }, {
            title: 'Space',
            size: 'xl',
            keyId: 'space',
            announce: 'space, button'
          }, {
            title: 'Done',
            size: 'lg',
            keyId: 'done',
            announce: 'done, button'
          }]],
          symbols: [['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', {
            title: 'Delete',
            size: 'md',
            keyId: 'delete',
            announce: 'delete, button'
          }], [{
            title: '!',
            announce: 'exclamation, button'
          }, '@', '#', '$', '%', {
            title: '^',
            announce: 'caret circumflex, button'
          }, '&', '*', {
            title: '(',
            announce: 'open parenthesis, button'
          }, {
            title: ')',
            announce: 'close parenthesis, button'
          }, {
            title: 'abc',
            size: 'md',
            toggle: 'default',
            announce: 'alpha mode, button'
          }], [{
            title: '{',
            announce: 'open brace, button'
          }, {
            title: '}',
            announce: 'close brace, button'
          }, {
            title: '[',
            announce: 'open bracket, button'
          }, {
            title: ']',
            announce: 'close bracket, button'
          }, {
            title: ';',
            announce: 'semicolon, button'
          }, {
            title: '"',
            announce: 'doublequote, button'
          }, {
            title: ',',
            announce: 'comma, button'
          }, {
            title: '|',
            announce: 'vertical bar, button'
          }, {
            title: '\\',
            announce: 'backslash, button'
          }, {
            title: '/',
            announce: 'forwardslash, button'
          }, {
            title: 'áöû',
            size: 'md',
            toggle: 'accents',
            announce: 'accents, button',
            keyId: 'accents'
          }], [{
            title: '<',
            announce: 'less than, button'
          }, {
            title: '>',
            announce: 'greater than, button'
          }, {
            title: '?',
            announce: 'question mark, button'
          }, {
            title: '=',
            announce: 'equal sign, button'
          }, {
            title: '`',
            announce: 'grave accent, button'
          }, {
            title: '~',
            announce: 'tilde, button'
          }, {
            title: '_',
            announce: 'underscore, button'
          }, {
            title: ':',
            announce: 'colon, button'
          }, {
            title: '-',
            announce: 'dash, button'
          }, {
            title: '+',
            announce: 'plus sign, button'
          }], [{
            title: 'Clear',
            size: 'lg',
            keyId: 'clear',
            announce: 'clear, button'
          }, {
            title: 'Space',
            size: 'xl',
            keyId: 'space',
            announce: 'space, button'
          }, {
            title: 'Done',
            size: 'lg',
            keyId: 'done',
            announce: 'done, button'
          }]]
        };
        var search = {
          uppercase: [['A', 'B', 'C', 'D', 'E', 'F'], ['G', 'H', 'I', 'J', 'K', 'L'], ['M', 'N', 'O', 'P', 'Q', 'R'], ['S', 'T', 'U', 'V', 'W', 'X'], ['Y', 'Z', {
            title: '1',
            keyId: 'number'
          }, {
            title: '2',
            keyId: 'number'
          }, {
            title: '3',
            keyId: 'number'
          }, {
            title: '4',
            keyId: 'number'
          }], [{
            title: '5',
            keyId: 'number'
          }, {
            title: '6',
            keyId: 'number'
          }, {
            title: '7',
            keyId: 'number'
          }, {
            title: '8',
            keyId: 'number'
          }, {
            title: '9',
            keyId: 'number'
          }, {
            title: '0',
            keyId: 'number'
          }], [{
            title: 'Space',
            size: 'xl',
            keyId: 'space',
            announce: 'space, button'
          }, {
            title: 'Delete',
            size: 'md',
            keyId: 'delete',
            announce: 'delete, button'
          }]]
        };
        var simple = {
          default: [['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', {
            title: 'Delete',
            size: 'md'
          }], ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'], ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'], ['z', 'x', 'c', 'v', 'b', 'n', 'm'], [{
            title: 'Clear',
            size: 'lg'
          }, {
            title: 'Space',
            size: 'xl'
          }, {
            title: 'Done',
            size: 'lg'
          }]]
        };
        var formats = {
          dialpad: dialpad,
          dialpadExtended: dialpadExtended,
          email: email,
          fullscreen: fullscreen,
          numbers: numbers,
          qwerty: qwerty,
          search: search,
          simple: simple
        };
        var Keyboard = function Keyboard(props) {
          return createComponent(KeyboardBase, mergeProps(props, {
            get formats() {
              return formats.simple;
            }
          }));
        };
        var TextPage = exports("default", function () {
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
              title: "Done",
              size: "lg",
              keyId: "done",
              announce: "done, button"
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
            }], ["a", "s", "d", "f", "g", "h", "j", "k", "l", "@", {
              title: "áöû",
              size: "md",
              toggle: "accents",
              announce: "accents, button",
              keyId: "accents"
            }], ["z", "x", "c", "v", "b", "n", "m", {
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
              title: "Done",
              size: "lg",
              keyId: "done",
              announce: "done, button"
            }]]
          };
          var keyEvent = createSignal("");
          var titleSignal = createSignal("");
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
                    titleSignal: titleSignal,
                    keyEvent: keyEvent
                  }), createComponent(Keyboard, {
                    formats: formats,
                    keySignal: keyEvent
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
