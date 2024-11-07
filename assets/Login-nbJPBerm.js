import { c as createSignal, q as createMemo, f as createEffect, o as on, h as createComponent, V as View, m as mergeProps, l as combineStyles, E as styles, T as Text, G as styles$1, H as styles$2, F as For, S as Show, C as Column, R as Row, g as onMount, s as setGlobalBackground } from "./index-Cwp1Y-pO.js";
import { a as ButtonContainer } from "./Button-BXhWV0gP.js";
const getformatTitleText = (props, title) => {
  var _a, _b;
  return props.password ? ((_a = props.mask) != null ? _a : "").repeat((_b = title.length) != null ? _b : 0) : title;
};
const Input = (props) => {
  var _a;
  const [title, setTitle] = props.titleSignal;
  const [position, setPosition] = createSignal((_a = props.position) != null ? _a : title().length);
  const [keyEvent, setKeyEvent] = props.keyEvent;
  const formatTitleText = createMemo(() => getformatTitleText(props, title()));
  const formatInputText = (key) => {
    if (key === void 0 || key === "") {
      return;
    }
    const inputText = title();
    let currentPosition = position();
    let newTitle = "";
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
  createEffect(on(() => keyEvent(), (keyEvent2) => {
    formatInputText(keyEvent2);
  }, {
    defer: true
  }));
  function onRight() {
    setPosition((p) => Math.max(p + 1, title().length));
    return true;
  }
  function onLeft() {
    setPosition((p) => Math.max(p - 1, 0));
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
    onLeft,
    onRight,
    get style() {
      var _a2;
      return combineStyles(
        props.style,
        //
        styles.Container.tones[(_a2 = props.tone) != null ? _a2 : styles.tone],
        styles.Container.base
      );
    },
    get children() {
      return createComponent(Text, {
        get tone() {
          var _a2;
          return (_a2 = props.tone) != null ? _a2 : styles.tone;
        },
        get color() {
          return props.textColor;
        },
        get style() {
          var _a2;
          return combineStyles(
            styles.Text.tones[(_a2 = props.tone) != null ? _a2 : styles.tone],
            //
            styles.Text.base
          );
        },
        get children() {
          return formatTitleText() || " ";
        }
      });
    }
  }));
};
const getTone$1 = (props) => {
  var _a;
  return (_a = props.tone) != null ? _a : styles$1.tone;
};
const getMultiplier$1 = (props) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
  return (_k = (_i = (_b = props.sizes) == null ? void 0 : _b[(_a = props.size) != null ? _a : "sm"]) != null ? _i : (_h = (_f = (_e = (_c = styles$1.Container) == null ? void 0 : _c.tones) == null ? void 0 : _e[(_d = props.tone) != null ? _d : styles$1.tone]) == null ? void 0 : _f.sizes) == null ? void 0 : _h[(_g = props.size) != null ? _g : "sm"]) != null ? _k : styles$1.Container.base.sizes[(_j = props.size) != null ? _j : "sm"];
};
const getBaseWidth$1 = (props) => {
  var _a, _b, _c, _d, _e, _f;
  return (_f = (_e = props.baseWidth) != null ? _e : (_d = (_c = (_a = styles$1.Container) == null ? void 0 : _a.tones) == null ? void 0 : _c[(_b = props.tone) != null ? _b : styles$1.tone]) == null ? void 0 : _d.baseWidth) != null ? _f : styles$1.Container.base.baseWidth;
};
const getKeySpacing$1 = (props) => {
  var _a, _b, _c, _d, _e;
  return (_e = (_d = props.keySpacing) != null ? _d : (_c = (_b = styles$1.Container.tones) == null ? void 0 : _b[(_a = props.tone) != null ? _a : styles$1.tone]) == null ? void 0 : _c.keySpacing) != null ? _e : styles$1.Container.base.keySpacing;
};
const Key = (props) => {
  const tone = createMemo(() => getTone$1(props));
  const multiplier = createMemo(() => getMultiplier$1(props));
  const baseWidth = createMemo(() => getBaseWidth$1(props));
  const keySpacing = createMemo(() => getKeySpacing$1(props));
  return createComponent(ButtonContainer, mergeProps(props, {
    get style() {
      var _a;
      return combineStyles(
        props.style,
        //
        (_a = styles$1.Container.tones) == null ? void 0 : _a[tone()],
        styles$1.Container.base
      );
    },
    forwardStates: true,
    get width() {
      return multiplier() * baseWidth() + keySpacing() * (multiplier() - 1);
    },
    get children() {
      return createComponent(Text, {
        get contain() {
          var _a;
          return (_a = props.contain) != null ? _a : "width";
        },
        get textAlign() {
          return props.textAlign;
        },
        get style() {
          return combineStyles(
            styles$1.Text.tones[tone()],
            //
            styles$1.Text.base
          );
        },
        get children() {
          return props.title ? props.title : "";
        }
      });
    }
  }));
};
const getTone = (props) => {
  var _a;
  return (_a = props.tone) != null ? _a : styles$2.tone;
};
const getGap = (props) => {
  var _a, _b, _c, _d, _e;
  return (_e = (_d = (_a = props.gap) != null ? _a : props.keySpacing) != null ? _d : (_c = styles$2.Container.tones[(_b = props.tone) != null ? _b : styles$2.tone]) == null ? void 0 : _c.keySpacing) != null ? _e : styles$2.Container.base.keySpacing;
};
const getKeyHeight = (props) => {
  var _a, _b, _c, _d;
  return (_d = (_c = props.keyHeight) != null ? _c : (_b = styles$2.Container.tones[(_a = props.tone) != null ? _a : styles$2.tone]) == null ? void 0 : _b.keyHeight) != null ? _d : styles$2.Container.base.keyHeight;
};
const getTotalWidth = (props) => {
  var _a, _b, _c, _d, _e;
  return (_e = (_d = (_a = props.screenW) != null ? _a : props.width) != null ? _d : (_c = styles$2.Container.tones[(_b = props.tone) != null ? _b : styles$2.tone]) == null ? void 0 : _c.width) != null ? _e : styles$2.Container.base.width;
};
const getMultiplier = (props) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
  return (_k = (_i = (_b = props.sizes) == null ? void 0 : _b[(_a = props.size) != null ? _a : "sm"]) != null ? _i : (_h = (_f = (_e = (_c = styles$1.Container) == null ? void 0 : _c.tones) == null ? void 0 : _e[(_d = props.tone) != null ? _d : styles$1.tone]) == null ? void 0 : _f.sizes) == null ? void 0 : _h[(_g = props.size) != null ? _g : "sm"]) != null ? _k : styles$1.Container.base.sizes[(_j = props.size) != null ? _j : "sm"];
};
const getBaseWidth = (props) => {
  var _a, _b, _c, _d, _e, _f;
  return (_f = (_e = props.baseWidth) != null ? _e : (_d = (_c = (_a = styles$1.Container) == null ? void 0 : _a.tones) == null ? void 0 : _c[(_b = props.tone) != null ? _b : styles$1.tone]) == null ? void 0 : _d.baseWidth) != null ? _f : styles$1.Container.base.baseWidth;
};
const getKeySpacing = (props) => {
  var _a, _b, _c, _d, _e;
  return (_e = (_d = props.keySpacing) != null ? _d : (_c = (_b = styles$1.Container.tones) == null ? void 0 : _b[(_a = props.tone) != null ? _a : styles$1.tone]) == null ? void 0 : _c.keySpacing) != null ? _e : styles$1.Container.base.keySpacing;
};
const KeyboardBase = (props) => {
  var _a;
  const [_, setKeySignal] = (_a = props.keySignal) != null ? _a : createSignal("");
  const [activeKeyboard, setActiveKeyboard] = createSignal("default");
  const [selectedRowIndex, setSelectedRowIndex] = createSignal(0);
  const [selectedColumnIndex, setSelectedColumnIndex] = createSignal(0);
  const [rowWidth, setRowWidth] = createSignal(0);
  const tone = createMemo(() => getTone(props));
  const gap = createMemo(() => getGap(props));
  const totalWidth = createMemo(() => getTotalWidth(props));
  const keyHeight = createMemo(() => getKeyHeight(props));
  const keyboardRefList = /* @__PURE__ */ new Map();
  const setOnEnter = (key, rowIdx, colIdx) => {
    if (typeof key === "string") {
      return () => setKeySignal(key);
    } else if (key.toggle) {
      return () => {
        var _a2, _b, _c, _d;
        setSelectedRowIndex(rowIdx());
        setSelectedColumnIndex(colIdx());
        setActiveKeyboard(key.toggle);
        (_b = (_a2 = keyboardRefList[key.toggle]) == null ? void 0 : _a2.element) == null ? void 0 : _b.setFocus();
        setRowWidth((_d = (_c = keyboardRefList[key.toggle]) == null ? void 0 : _c.width) != null ? _d : 0);
      };
    } else {
      return () => {
        var _a2;
        return setKeySignal(typeof key === "string" ? key : (_a2 = key.title) != null ? _a2 : "");
      };
    }
  };
  const addKeyboardWidth = (keyboard) => {
    let maxRow = 0;
    for (const row of props.formats[keyboard]) {
      let rowWidth2 = 0;
      for (const key of row) {
        let width = getBaseWidth(props);
        if (typeof key === "object") {
          width = getMultiplier(key) * getBaseWidth(props) + getKeySpacing(props) * (getMultiplier(key) - 1);
        }
        rowWidth2 += width + getKeySpacing(props);
      }
      if (maxRow < rowWidth2) {
        maxRow = rowWidth2;
      }
    }
    return maxRow;
  };
  return createComponent(View, mergeProps(props, {
    forwardFocus: 0,
    get style() {
      return combineStyles(
        props.style,
        //
        styles$2.Container.tones[tone()],
        styles$2.Container.base
      );
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
        children: (keyboard) => createComponent(Show, {
          get when() {
            return activeKeyboard() === keyboard;
          },
          get children() {
            return createComponent(View, {
              ref: (element) => {
                var _a2, _b;
                keyboardRefList[keyboard] = {
                  element,
                  width: addKeyboardWidth(keyboard)
                };
                if (activeKeyboard() === keyboard) {
                  element.setFocus();
                  setRowWidth((_b = (_a2 = keyboardRefList[keyboard]) == null ? void 0 : _a2.width) != null ? _b : 0);
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
                      children: (row, colIdx) => createComponent(Row, {
                        scroll: "none",
                        get selected() {
                          return selectedRowIndex();
                        },
                        get flexBoundary() {
                          var _a2;
                          return (_a2 = props.flexBoundary) != null ? _a2 : "contain";
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
                            children: (key, rowIdx) => createComponent(Key, mergeProps(typeof key === "string" ? {} : key, {
                              get onEnter() {
                                return setOnEnter(key, rowIdx, colIdx);
                              },
                              get title() {
                                var _a2;
                                return typeof key === "string" ? key : (_a2 = key.title) != null ? _a2 : "";
                              },
                              get height() {
                                return keyHeight();
                              }
                            }))
                          });
                        }
                      })
                    });
                  }
                });
              }
            });
          }
        })
      });
    }
  }));
};
const dialpad = {
  default: [["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"], ["0"]]
};
const dialpadExtended = {
  default: [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    [
      "0",
      {
        title: "Delete",
        size: "md",
        keyId: "delete",
        announce: "delete, button"
      }
    ]
  ]
};
const email = {
  uppercase: [
    [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      {
        title: "Delete",
        size: "md",
        keyId: "delete",
        announce: "delete, button"
      }
    ],
    [
      "Q",
      "W",
      "E",
      "R",
      "T",
      "Y",
      "U",
      "I",
      "O",
      "P",
      {
        title: "#@!",
        size: "md",
        toggle: "symbols",
        announce: "symbol mode, button",
        keyId: "symbols"
      }
    ],
    [
      "A",
      "S",
      "D",
      "F",
      "G",
      "H",
      "J",
      "K",
      "L",
      "@",
      {
        title: "áöû",
        size: "md",
        toggle: "accents",
        announce: "accents, button",
        keyId: "accents"
      }
    ],
    [
      "Z",
      "X",
      "C",
      "V",
      "B",
      "N",
      "M",
      { title: ".", announce: "period, button" },
      { title: "-", announce: "dash, button" },
      { title: "_", announce: "underscore, button" },
      {
        title: "shift",
        size: "md",
        toggle: "default",
        announce: "shift off, button",
        keyId: "shift"
      }
    ],
    [
      { title: ".com", announce: "dot, com", size: "md" },
      { title: ".net", announce: "dot, net", size: "md" },
      { title: ".edu", announce: "dot, edu", size: "md" },
      { title: ".org", announce: "dot, org", size: "md" },
      { title: ".co", announce: "dot, co", size: "md" },
      { title: ".uk", announce: "dot, uk", size: "md" }
    ],
    [
      {
        title: "Clear",
        size: "lg",
        keyId: "clear",
        announce: "clear, button"
      },
      {
        title: "Space",
        size: "xl",
        keyId: "space",
        announce: "space, button"
      },
      {
        title: "Done",
        size: "lg",
        keyId: "done",
        announce: "done, button"
      }
    ]
  ],
  default: [
    [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      {
        title: "Delete",
        size: "md",
        keyId: "delete",
        announce: "delete, button"
      }
    ],
    [
      "q",
      "w",
      "e",
      "r",
      "t",
      "y",
      "u",
      "i",
      "o",
      "p",
      {
        title: "#@!",
        size: "md",
        toggle: "symbols",
        announce: "symbol mode, button",
        keyId: "symbols"
      }
    ],
    [
      "a",
      "s",
      "d",
      "f",
      "g",
      "h",
      "j",
      "k",
      "l",
      "@",
      {
        title: "áöû",
        size: "md",
        toggle: "accents",
        announce: "accents, button",
        keyId: "accents"
      }
    ],
    [
      "z",
      "x",
      "c",
      "v",
      "b",
      "n",
      "m",
      { title: "_", announce: "underscore, button" },
      { title: ".", announce: "period, button" },
      { title: "-", announce: "dash, button" },
      {
        title: "shift",
        size: "md",
        toggle: "uppercase",
        announce: "shift on, button",
        keyId: "shift"
      }
    ],
    [
      { title: ".com", announce: "dot, com", size: "md" },
      { title: ".net", announce: "dot, net", size: "md" },
      { title: ".edu", announce: "dot, edu", size: "md" },
      { title: ".org", announce: "dot, org", size: "md" },
      { title: ".co", announce: "dot, co", size: "md" },
      { title: ".uk", announce: "dot, uk", size: "md" }
    ],
    [
      {
        title: "Clear",
        size: "lg",
        keyId: "clear",
        announce: "clear, button"
      },
      {
        title: "Space",
        size: "xl",
        keyId: "space",
        announce: "space, button"
      },
      {
        title: "Done",
        size: "lg",
        keyId: "done",
        announce: "done, button"
      }
    ]
  ],
  accents: [
    [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      {
        title: "Delete",
        size: "md",
        keyId: "delete",
        announce: "delete, button"
      }
    ],
    [
      "ä",
      "ë",
      "ï",
      "ö",
      "ü",
      "ÿ",
      "à",
      "è",
      "ì",
      "ò",
      {
        title: "#@!",
        size: "md",
        toggle: "symbols",
        announce: "symbol mode, button",
        keyId: "symbols"
      }
    ],
    [
      "ù",
      "á",
      "é",
      "í",
      "ó",
      "ú",
      "ý",
      "â",
      "ê",
      "@",
      {
        title: "abc",
        size: "md",
        toggle: "default",
        announce: "alpha mode, button"
      }
    ],
    [
      "î",
      "ô",
      "û",
      "ã",
      "ñ",
      { title: "_", announce: "underscore, button" },
      { title: ".", announce: "period, button" },
      { title: "-", announce: "dash, button" },
      {
        title: "shift",
        size: "xl",
        toggle: "accentsUpper",
        announce: "shift off, button",
        keyId: "shift"
      }
    ],
    [
      { title: ".com", announce: "dot, com", size: "md" },
      { title: ".net", announce: "dot, net", size: "md" },
      { title: ".edu", announce: "dot, edu", size: "md" },
      { title: ".org", announce: "dot, org", size: "md" },
      { title: ".co", announce: "dot, co", size: "md" },
      { title: ".uk", announce: "dot, uk", size: "md" }
    ],
    [
      {
        title: "Clear",
        size: "lg",
        keyId: "clear",
        announce: "clear, button"
      },
      {
        title: "Space",
        size: "xl",
        keyId: "space",
        announce: "space, button"
      },
      {
        title: "Done",
        size: "lg",
        keyId: "done",
        announce: "done, button"
      }
    ]
  ],
  accentsUpper: [
    [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      {
        title: "Delete",
        size: "md",
        keyId: "delete",
        announce: "delete, button"
      }
    ],
    [
      "Ä",
      "Ë",
      "Ï",
      "Ö",
      "Ü",
      "Ÿ",
      "À",
      "È",
      "Ì",
      "Ò",
      {
        title: "#@!",
        size: "md",
        toggle: "symbols",
        announce: "symbol mode, button",
        keyId: "symbols"
      }
    ],
    [
      "Ù",
      "Á",
      "É",
      "Í",
      "Ó",
      "Ú",
      "Ý",
      "Â",
      "Ê",
      "@",
      {
        title: "abc",
        size: "md",
        toggle: "default",
        announce: "alpha mode, button"
      }
    ],
    [
      "Î",
      "Ô",
      "Û",
      "Ã",
      "Ñ",
      { title: ".", announce: "period, button" },
      { title: "-", announce: "dash, button" },
      { title: "_", announce: "underscore, button" },
      {
        title: "shift",
        size: "xl",
        toggle: "accents",
        announce: "shift off, button",
        keyId: "shift"
      }
    ],
    [
      { title: ".com", announce: "dot, com", size: "md" },
      { title: ".net", announce: "dot, net", size: "md" },
      { title: ".edu", announce: "dot, edu", size: "md" },
      { title: ".org", announce: "dot, org", size: "md" },
      { title: ".co", announce: "dot, co", size: "md" },
      { title: ".uk", announce: "dot, uk", size: "md" }
    ],
    [
      {
        title: "Clear",
        size: "lg",
        keyId: "clear",
        announce: "clear, button"
      },
      {
        title: "Space",
        size: "xl",
        keyId: "space",
        announce: "space, button"
      },
      {
        title: "Done",
        size: "lg",
        keyId: "done",
        announce: "done, button"
      }
    ]
  ],
  symbols: [
    [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      {
        title: "Delete",
        size: "md",
        keyId: "delete",
        announce: "delete, button"
      }
    ],
    [
      { title: "!", announce: "exclamation, button" },
      "@",
      "#",
      "$",
      "%",
      { title: "^", announce: "caret circumflex, button" },
      "&",
      "*",
      { title: "(", announce: "open parenthesis, button" },
      { title: ")", announce: "close parenthesis, button" },
      {
        title: "abc",
        size: "md",
        toggle: "default",
        announce: "alpha mode, button"
      }
    ],
    [
      { title: "{", announce: "open brace, button" },
      { title: "}", announce: "close brace, button" },
      { title: "[", announce: "open bracket, button" },
      { title: "]", announce: "close bracket, button" },
      { title: ";", announce: "semicolon, button" },
      { title: '"', announce: "doublequote, button" },
      { title: ",", announce: "comma, button" },
      { title: "|", announce: "vertical bar, button" },
      { title: "\\", announce: "backslash, button" },
      { title: "/", announce: "forwardslash, button" },
      {
        title: "áöû",
        size: "md",
        toggle: "accents",
        announce: "accents, button",
        keyId: "accents"
      }
    ],
    [
      { title: "<", announce: "less than, button" },
      { title: ">", announce: "greater than, button" },
      { title: "?", announce: "question mark, button" },
      { title: "=", announce: "equal sign, button" },
      { title: "`", announce: "grave accent, button" },
      { title: "~", announce: "tilde, button" },
      { title: "_", announce: "underscore, button" },
      { title: ":", announce: "colon, button" },
      { title: "-", announce: "dash, button" },
      { title: "+", announce: "plus sign, button" }
    ],
    [
      { title: ".com", announce: "dot, com", size: "md" },
      { title: ".net", announce: "dot, net", size: "md" },
      { title: ".edu", announce: "dot, edu", size: "md" },
      { title: ".org", announce: "dot, org", size: "md" },
      { title: ".co", announce: "dot, co", size: "md" },
      { title: ".uk", announce: "dot, uk", size: "md" }
    ],
    [
      {
        title: "Clear",
        size: "lg",
        keyId: "clear",
        announce: "clear, button"
      },
      {
        title: "Space",
        size: "xl",
        keyId: "space",
        announce: "space, button"
      },
      {
        title: "Done",
        size: "lg",
        keyId: "done",
        announce: "done, button"
      }
    ]
  ]
};
const fullscreen = {
  letters: [
    [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      {
        title: "#@!",
        size: "lg",
        toggle: "symbols",
        announce: "symbol mode, button",
        keyId: "symbols"
      },
      {
        title: "Space",
        size: "lg",
        keyId: "space",
        announce: "space, button"
      },
      {
        title: "Delete",
        size: "md",
        keyId: "delete",
        announce: "delete, button"
      },
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
    ],
    [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z"
    ]
  ],
  symbols: [
    [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      {
        title: "ABC",
        size: "lg",
        toggle: "letters",
        announce: "caps on, button"
      },
      {
        title: "Space",
        size: "lg",
        keyId: "space",
        announce: "space, button"
      },
      {
        title: "Delete",
        size: "md",
        keyId: "delete",
        announce: "delete, button"
      },
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
    ],
    [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      { title: "!", announce: "exclamation, button" },
      "@",
      "#",
      "$",
      "%",
      { title: "^", announce: "caret circumflex, button" },
      "&",
      "*",
      { title: "(", announce: "open parenthesis, button" },
      { title: ")", announce: "close parenthesis, button" },
      { title: "`", announce: "grave accent, button" },
      "~",
      "_",
      ".",
      "-",
      "+"
    ]
  ]
};
const numbers = {
  default: [["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]]
};
const qwerty = {
  uppercase: [
    [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      {
        title: "Delete",
        size: "md",
        keyId: "delete",
        announce: "delete, button"
      }
    ],
    [
      "Q",
      "W",
      "E",
      "R",
      "T",
      "Y",
      "U",
      "I",
      "O",
      "P",
      {
        title: "#@!",
        size: "md",
        toggle: "symbols",
        announce: "symbol mode, button",
        keyId: "symbols"
      }
    ],
    [
      "A",
      "S",
      "D",
      "F",
      "G",
      "H",
      "J",
      "K",
      "L",
      "@",
      {
        title: "áöû",
        size: "md",
        toggle: "accents",
        announce: "accents, button",
        keyId: "accents"
      }
    ],
    [
      "Z",
      "X",
      "C",
      "V",
      "B",
      "N",
      "M",
      { title: ".", announce: "period, button" },
      { title: "-", announce: "dash, button" },
      { title: "_", announce: "underscore, button" },
      {
        title: "shift",
        size: "md",
        toggle: "default",
        announce: "shift off, button",
        keyId: "shift"
      }
    ],
    [
      {
        title: "Clear",
        size: "lg",
        keyId: "clear",
        announce: "clear, button"
      },
      {
        title: "Space",
        size: "xl",
        keyId: "space",
        announce: "space, button"
      },
      {
        title: "Done",
        size: "lg",
        keyId: "done",
        announce: "done, button"
      }
    ]
  ],
  default: [
    [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      {
        title: "Delete",
        size: "md",
        keyId: "delete",
        announce: "delete, button"
      }
    ],
    [
      "q",
      "w",
      "e",
      "r",
      "t",
      "y",
      "u",
      "i",
      "o",
      "p",
      {
        title: "#@!",
        size: "md",
        toggle: "symbols",
        announce: "symbol mode, button",
        keyId: "symbols"
      }
    ],
    [
      "a",
      "s",
      "d",
      "f",
      "g",
      "h",
      "j",
      "k",
      "l",
      "@",
      {
        title: "áöû",
        size: "md",
        toggle: "accents",
        announce: "accents, button",
        keyId: "accents"
      }
    ],
    [
      "z",
      "x",
      "c",
      "v",
      "b",
      "n",
      "m",
      { title: "_", announce: "underscore, button" },
      { title: ".", announce: "period, button" },
      { title: "-", announce: "dash, button" },
      {
        title: "shift",
        size: "md",
        toggle: "uppercase",
        announce: "shift on, button",
        keyId: "shift"
      }
    ],
    [
      {
        title: "Clear",
        size: "lg",
        keyId: "clear",
        announce: "clear, button"
      },
      {
        title: "Space",
        size: "xl",
        keyId: "space",
        announce: "space, button"
      },
      {
        title: "Done",
        size: "lg",
        keyId: "done",
        announce: "done, button"
      }
    ]
  ],
  accents: [
    [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      {
        title: "Delete",
        size: "md",
        keyId: "delete",
        announce: "delete, button"
      }
    ],
    [
      "ä",
      "ë",
      "ï",
      "ö",
      "ü",
      "ÿ",
      "à",
      "è",
      "ì",
      "ò",
      {
        title: "#@!",
        size: "md",
        toggle: "symbols",
        announce: "symbol mode, button",
        keyId: "symbols"
      }
    ],
    [
      "ù",
      "á",
      "é",
      "í",
      "ó",
      "ú",
      "ý",
      "â",
      "ê",
      "@",
      {
        title: "abc",
        size: "md",
        toggle: "default",
        announce: "alpha mode, button"
      }
    ],
    [
      "î",
      "ô",
      "û",
      "ã",
      "ñ",
      { title: "_", announce: "underscore, button" },
      { title: ".", announce: "period, button" },
      { title: "-", announce: "dash, button" },
      {
        title: "shift",
        size: "xl",
        toggle: "accentsUpper",
        announce: "shift off, button",
        keyId: "shift"
      }
    ],
    [
      {
        title: "Clear",
        size: "lg",
        keyId: "clear",
        announce: "clear, button"
      },
      {
        title: "Space",
        size: "xl",
        keyId: "space",
        announce: "space, button"
      },
      {
        title: "Done",
        size: "lg",
        keyId: "done",
        announce: "done, button"
      }
    ]
  ],
  accentsUpper: [
    [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      {
        title: "Delete",
        size: "md",
        keyId: "delete",
        announce: "delete, button"
      }
    ],
    [
      "Ä",
      "Ë",
      "Ï",
      "Ö",
      "Ü",
      "Ÿ",
      "À",
      "È",
      "Ì",
      "Ò",
      {
        title: "#@!",
        size: "md",
        toggle: "symbols",
        announce: "symbol mode, button",
        keyId: "symbols"
      }
    ],
    [
      "Ù",
      "Á",
      "É",
      "Í",
      "Ó",
      "Ú",
      "Ý",
      "Â",
      "Ê",
      "@",
      {
        title: "abc",
        size: "md",
        toggle: "default",
        announce: "alpha mode, button"
      }
    ],
    [
      "Î",
      "Ô",
      "Û",
      "Ã",
      "Ñ",
      { title: ".", announce: "period, button" },
      { title: "-", announce: "dash, button" },
      { title: "_", announce: "underscore, button" },
      {
        title: "shift",
        size: "xl",
        toggle: "accents",
        announce: "shift off, button",
        keyId: "shift"
      }
    ],
    [
      {
        title: "Clear",
        size: "lg",
        keyId: "clear",
        announce: "clear, button"
      },
      {
        title: "Space",
        size: "xl",
        keyId: "space",
        announce: "space, button"
      },
      {
        title: "Done",
        size: "lg",
        keyId: "done",
        announce: "done, button"
      }
    ]
  ],
  symbols: [
    [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      {
        title: "Delete",
        size: "md",
        keyId: "delete",
        announce: "delete, button"
      }
    ],
    [
      { title: "!", announce: "exclamation, button" },
      "@",
      "#",
      "$",
      "%",
      { title: "^", announce: "caret circumflex, button" },
      "&",
      "*",
      { title: "(", announce: "open parenthesis, button" },
      { title: ")", announce: "close parenthesis, button" },
      {
        title: "abc",
        size: "md",
        toggle: "default",
        announce: "alpha mode, button"
      }
    ],
    [
      { title: "{", announce: "open brace, button" },
      { title: "}", announce: "close brace, button" },
      { title: "[", announce: "open bracket, button" },
      { title: "]", announce: "close bracket, button" },
      { title: ";", announce: "semicolon, button" },
      { title: '"', announce: "doublequote, button" },
      { title: ",", announce: "comma, button" },
      { title: "|", announce: "vertical bar, button" },
      { title: "\\", announce: "backslash, button" },
      { title: "/", announce: "forwardslash, button" },
      {
        title: "áöû",
        size: "md",
        toggle: "accents",
        announce: "accents, button",
        keyId: "accents"
      }
    ],
    [
      { title: "<", announce: "less than, button" },
      { title: ">", announce: "greater than, button" },
      { title: "?", announce: "question mark, button" },
      { title: "=", announce: "equal sign, button" },
      { title: "`", announce: "grave accent, button" },
      { title: "~", announce: "tilde, button" },
      { title: "_", announce: "underscore, button" },
      { title: ":", announce: "colon, button" },
      { title: "-", announce: "dash, button" },
      { title: "+", announce: "plus sign, button" }
    ],
    [
      {
        title: "Clear",
        size: "lg",
        keyId: "clear",
        announce: "clear, button"
      },
      {
        title: "Space",
        size: "xl",
        keyId: "space",
        announce: "space, button"
      },
      {
        title: "Done",
        size: "lg",
        keyId: "done",
        announce: "done, button"
      }
    ]
  ]
};
const search = {
  uppercase: [
    ["A", "B", "C", "D", "E", "F"],
    ["G", "H", "I", "J", "K", "L"],
    ["M", "N", "O", "P", "Q", "R"],
    ["S", "T", "U", "V", "W", "X"],
    [
      "Y",
      "Z",
      { title: "1", keyId: "number" },
      { title: "2", keyId: "number" },
      { title: "3", keyId: "number" },
      { title: "4", keyId: "number" }
    ],
    [
      { title: "5", keyId: "number" },
      { title: "6", keyId: "number" },
      { title: "7", keyId: "number" },
      { title: "8", keyId: "number" },
      { title: "9", keyId: "number" },
      { title: "0", keyId: "number" }
    ],
    [
      {
        title: "Space",
        size: "xl",
        keyId: "space",
        announce: "space, button"
      },
      {
        title: "Delete",
        size: "md",
        keyId: "delete",
        announce: "delete, button"
      }
    ]
  ]
};
const simple = {
  default: [
    [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      {
        title: "Delete",
        size: "md"
      }
    ],
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"],
    [
      {
        title: "Clear",
        size: "lg"
      },
      {
        title: "Space",
        size: "xl"
      },
      {
        title: "Done",
        size: "lg"
      }
    ]
  ]
};
const formats = {
  dialpad,
  dialpadExtended,
  email,
  fullscreen,
  numbers,
  qwerty,
  search,
  simple
};
const Keyboard = (props) => {
  return createComponent(KeyboardBase, mergeProps(props, {
    get formats() {
      return formats.simple;
    }
  }));
};
const TextPage = () => {
  const Title = {
    fontSize: 42,
    fontWeight: "bold"
  };
  const formats2 = {
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
  const keyEvent = createSignal("");
  const titleSignal = createSignal("");
  onMount(() => {
    setGlobalBackground(255);
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
            titleSignal,
            keyEvent
          }), createComponent(Keyboard, {
            formats: formats2,
            keySignal: keyEvent
          })];
        }
      });
    }
  });
};
export {
  TextPage as default
};
