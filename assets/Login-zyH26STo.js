import { a as createSignal, k as createMemo, g as createEffect, i as on, c as createComponent, V as View, m as mergeProps, T as Text, $ as chainFunctions, C as Column, I as Index, R as Row, S as Show, B as memo, a0 as Switch, a1 as Match, o as onMount, s as setGlobalBackground } from "./index-B9nqAPUy.js";
const ContainerStyle = {
  display: "flex",
  flexBoundary: "fixed",
  padding: 20,
  width: 450,
  height: 70,
  borderRadius: 8,
  border: {
    color: 3284386815,
    width: 2
  },
  $focus: {
    border: {
      color: 4294967295,
      width: 2
    }
  }
};
const TextStyle = {
  fontSize: 46,
  lineHeight: 70
};
const getformatValueText = (props, value) => {
  var _a, _b;
  return props.password ? ((_a = props.mask) != null ? _a : "").repeat((_b = value.length) != null ? _b : 0) : value;
};
const Input = (props) => {
  var _a, _b, _c;
  const [value, setValue] = (_a = props.valueSignal) != null ? _a : createSignal("");
  const [position, setPosition] = createSignal((_b = props.position) != null ? _b : value().length);
  const [keyEvent, setKeyEvent] = (_c = props.keyEvents) != null ? _c : createSignal("");
  const formatValueText = createMemo(() => getformatValueText(props, value()));
  const formatInputText = (key) => {
    if (key === void 0 || key === "") return;
    const inputText = value();
    let currentPosition = value().length;
    let newValue = "";
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
    setPosition((p) => Math.max(p + 1, value().length));
    return true;
  }
  function onLeft() {
    setPosition((p) => Math.max(p - 1, 0));
    return true;
  }
  return createComponent(View, mergeProps(props, {
    get position() {
      return position();
    },
    onLeft,
    onRight,
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
const actionKeyContainerStyle = {
  width: 144,
  alpha: 0.8,
  height: 60,
  scale: 1,
  get color() {
    return 65535;
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
const ActionKeyIconStyle = {
  y: 6,
  x: 48,
  width: 48,
  height: 48,
  color: 3334915839
};
const keyContainerStyle = {
  height: 60,
  get color() {
    return 255;
  },
  scale: 1,
  borderRadius: 6,
  $focus: {
    scale: 1.05,
    get color() {
      return 65535;
    }
  }
};
const BaseKeyTextStyle = {
  fontSize: 42,
  lineHeight: 60
};
const KeyText = {
  ...BaseKeyTextStyle,
  width: 48,
  contain: "both",
  textAlign: "center"
};
const Key = (props) => createComponent(View, mergeProps({
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
const ActionKey = (props) => createComponent(Switch, {
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
        var _a;
        return createComponent(View, mergeProps(props, {
          get key() {
            return props.key.key;
          },
          display: "flex",
          padding: 20,
          style: ((_a = props.key) == null ? void 0 : _a.size) ? actionKeyContainerStyle : keyContainerStyle,
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
const Keyboard = (props) => {
  const [layout, setLayout] = createSignal("default");
  const config = createMemo(() => props.formats[layout()]);
  const onEnter = (_e, _keyboard, key) => {
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
  const handleEnter = chainFunctions(onEnter, props.onEnter);
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
        children: (keyRow) => createComponent(Row, {
          gap: 6,
          justifyContent: "center",
          scroll: "none",
          get children() {
            return createComponent(Index, {
              get each() {
                return keyRow();
              },
              children: (key) => createComponent(Show, {
                get when() {
                  return memo(() => typeof key() === "string")() && key().length === 1;
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
              })
            });
          }
        })
      });
    }
  }));
};
const LoginPage = () => {
  const Title = {
    fontSize: 42,
    fontWeight: "bold"
  };
  const formats = {
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
  const keyEvent = createSignal("");
  const valueSignal = createSignal("");
  const [_keyEvent, setKeyEvent] = keyEvent;
  const onEnter = (_e, _keyboard, key) => {
    if (typeof key.key === "string") {
      setKeyEvent(key.key);
    } else if (typeof key.key === "object") {
      if (key.key.title === "save" || key.key.title === "Save") {
        console.log("perform save action", valueSignal[0]());
        return true;
      }
      setKeyEvent(key.key.title);
    }
  };
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
            valueSignal,
            keyEvents: keyEvent
          }), createComponent(Keyboard, {
            width: 550,
            formats,
            onEnter
          })];
        }
      });
    }
  });
};
export {
  LoginPage as default
};
