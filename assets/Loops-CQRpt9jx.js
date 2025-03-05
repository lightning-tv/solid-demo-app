import { i as splitProps, c as createSignal, f as createEffect, j as createMemo, h as createComponent, S as Show, D as Dynamic, m as mergeProps, I as Index, s as setGlobalBackground, V as View, T as Text, C as Column, R as Row, F as For, P as Poster } from "./index-C9xxDfMI.js";
import { L as List } from "./index-LAJlpd0a.js";
function LazyUp(props) {
  const [p, others] = splitProps(props, ["component", "each", "fallback", "children"]);
  const [offset, setOffset] = createSignal(0);
  createEffect(() => {
    setOffset(props.selected || 0);
  });
  const items = createMemo(() => {
    if (p.each) {
      return p.each.slice(0, props.upCount + offset());
    }
  });
  console.log("LazyUp is deprecated. Please use LazyRow or LazyColumn instead.");
  const isRow = createMemo(() => {
    var _a;
    return others.direction !== void 0 && others.direction === "row" || ((_a = others.style) == null ? void 0 : _a.flexDirection) === "row" || others.flexDirection === "row";
  });
  const keyHandlers = createMemo(() => {
    const updateOffset = () => {
      setOffset((prev) => p.each && Math.min(prev + 1, p.each.length - props.upCount));
    };
    return isRow() ? {
      onRight: updateOffset
    } : {
      onDown: updateOffset
    };
  });
  return createComponent(Show, {
    get when() {
      return items();
    },
    get children() {
      return createComponent(Dynamic, mergeProps({
        get component() {
          return p.component;
        }
      }, others, keyHandlers, {
        get children() {
          return createComponent(Index, {
            get each() {
              return items();
            },
            get fallback() {
              return p.fallback;
            },
            get children() {
              return p.children;
            }
          });
        }
      }));
    }
  });
}
const Loops = (props) => {
  const [activeRow, setActiveRow] = createSignal(props.data.rows[0]);
  let currentIndex = 0, solidLogo;
  setGlobalBackground(255);
  const titleRowStyles = {
    fontFamily: "Raleway",
    fontSize: 24,
    height: 32,
    lineHeight: 32
  };
  function switchRow(e) {
    if (e.key === "[") {
      currentIndex = Math.max(0, currentIndex - 1);
    }
    if (e.key === "]") {
      currentIndex = Math.min(props.data.rows.length - 1, currentIndex + 1);
    }
    if (e.key === "\\") {
      const row = props.data.rows[0];
      const items = row.items().slice().reverse();
      row.setItems(items);
      return;
    }
    setActiveRow(props.data.rows[currentIndex]);
  }
  return [createComponent(View, {
    ref(r$) {
      var _ref$ = solidLogo;
      typeof _ref$ === "function" ? _ref$(r$) : solidLogo = r$;
    },
    width: 300,
    height: 150,
    x: 162,
    y: 80,
    zIndex: 105,
    get children() {
      return [createComponent(Text, {
        x: 80,
        fontSize: 28,
        color: 4143380121,
        children: "Built With:"
      }), createComponent(View, {
        y: 32,
        src: "./assets/solidWord.png",
        width: 280,
        height: 52
      }), createComponent(View, {
        x: 0,
        y: 110,
        src: "./assets/tmdb.png",
        width: 80,
        height: 41
      }), createComponent(Text, {
        x: 90,
        y: 110,
        contain: "width",
        width: 160,
        fontSize: 12,
        color: 4143380121,
        children: "This product uses the TMDB API but is not endorsed or certified by TMDB."
      })];
    }
  }), createComponent(Column, {
    get autofocus() {
      var _a;
      return (_a = activeRow()) == null ? void 0 : _a.items();
    },
    y: 240,
    onKeyPress: switchRow,
    get children() {
      return [createComponent(View, {
        x: 160,
        height: 300,
        forwardFocus: 1,
        marginTop: 30,
        get children() {
          return [createComponent(Text, {
            skipFocus: true,
            style: titleRowStyles,
            children: "For Loop"
          }), createComponent(Row, {
            gap: 20,
            y: 40,
            display: "block",
            get children() {
              return createComponent(For, {
                get each() {
                  var _a;
                  return (_a = activeRow()) == null ? void 0 : _a.items();
                },
                children: (item, index) => createComponent(Poster, mergeProps({
                  get x() {
                    return index() * 210;
                  }
                }, item))
              });
            }
          })];
        }
      }), createComponent(View, {
        x: 160,
        height: 300,
        forwardFocus: 1,
        marginTop: 30,
        get children() {
          return [createComponent(Text, {
            skipFocus: true,
            style: titleRowStyles,
            children: "Map Loop"
          }), createComponent(Row, {
            gap: 20,
            y: 40,
            display: "block",
            get children() {
              var _a, _b;
              return (_b = (_a = activeRow()) == null ? void 0 : _a.items()) == null ? void 0 : _b.map((item, index) => createComponent(Poster, mergeProps({
                x: index * 210
              }, item)));
            }
          })];
        }
      }), createComponent(View, {
        x: 160,
        height: 300,
        forwardFocus: 1,
        marginTop: 30,
        get children() {
          return [createComponent(Text, {
            skipFocus: true,
            style: titleRowStyles,
            children: "Index Loop"
          }), createComponent(Row, {
            gap: 20,
            y: 40,
            display: "block",
            get children() {
              return createComponent(Index, {
                get each() {
                  var _a;
                  return (_a = activeRow()) == null ? void 0 : _a.items();
                },
                children: (item, index) => createComponent(Poster, mergeProps({
                  x: index * 210
                }, item))
              });
            }
          })];
        }
      }), createComponent(View, {
        x: 160,
        height: 300,
        forwardFocus: 1,
        marginTop: 30,
        get children() {
          return [createComponent(Text, {
            skipFocus: true,
            style: titleRowStyles,
            children: "LazyUp Loop"
          }), createComponent(LazyUp, {
            component: Row,
            direction: "row",
            display: "block",
            gap: 20,
            upCount: 5,
            get each() {
              var _a;
              return (_a = activeRow()) == null ? void 0 : _a.items();
            },
            y: 50,
            children: (item, index) => createComponent(Poster, mergeProps({
              x: index * 210
            }, item))
          })];
        }
      }), createComponent(View, {
        x: 160,
        height: 300,
        forwardFocus: 1,
        marginTop: 30,
        get children() {
          return [createComponent(Text, {
            skipFocus: true,
            style: titleRowStyles,
            children: "List Loop"
          }), createComponent(Row, {
            gap: 20,
            y: 40,
            display: "block",
            get children() {
              return createComponent(List, {
                get each() {
                  var _a;
                  return (_a = activeRow()) == null ? void 0 : _a.items();
                },
                children: (item, index) => createComponent(Poster, mergeProps({
                  get x() {
                    return index() * 210;
                  }
                }, item, {
                  transition: {
                    x: {
                      duration: 5550
                    }
                  }
                }))
              });
            }
          })];
        }
      })];
    }
  })];
};
export {
  Loops as default
};
