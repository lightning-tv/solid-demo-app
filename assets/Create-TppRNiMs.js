import { x as hexColor, g as onMount, c as createSignal, h as createComponent, V as View, T as Text, y as memo, S as Show, z as combineStyles, s as setGlobalBackground, A as children, m as mergeProps } from "./index-BZ986FVI.js";
const CreatePage = () => {
  const OverviewContainer = {
    width: 900,
    height: 500,
    y: 50,
    x: 150,
    gap: 25,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flexStart",
    color: hexColor("00000000")
  };
  const SublineContainer = {
    width: 900,
    height: 36,
    gap: 6,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flexStart",
    color: hexColor("00000000")
  };
  const Title = {
    fontSize: 42
  };
  const Subline = {
    fontSize: 26
  };
  let myBox, childRef;
  onMount(() => {
    setGlobalBackground(255);
    myBox.animate({
      x: 100
    }, {
      duration: 2e3
    }).start();
  });
  const [insertTest, setInsertTest] = createSignal();
  const [emptyTest, setEmptyTest] = createSignal();
  setTimeout(() => {
    var _a;
    setInsertTest("- Inserted -");
    (_a = childRef.getChildById("child1")) == null ? void 0 : _a.animate({
      x: 600
    }, {
      duration: 2e3
    }).start();
  }, 2e3);
  const someOtherStyle = {
    // pretty red
    color: 4114760447,
    $focus: {
      // pretty blue
      color: 1116206591
    }
  };
  function ChildTest(props) {
    const resolved = children(() => props.children);
    return createComponent(View, mergeProps(props, {
      get style() {
        return combineStyles(someOtherStyle, props.style);
      },
      get children() {
        return [createComponent(View, {
          id: "child1",
          width: 100,
          height: 100,
          color: 4278190335,
          y: 25,
          get children() {
            return [memo(() => resolved()), createComponent(View, {
              id: "subChild",
              x: 150,
              width: 100,
              height: 100,
              color: 16711935
            }), createComponent(Text, {
              get children() {
                return props.title;
              }
            })];
          }
        }), createComponent(View, {
          width: 100,
          height: 100,
          color: 4294902015,
          y: 175,
          get children() {
            return resolved();
          }
        })];
      }
    }));
  }
  function PosTest(props) {
    return createComponent(View, mergeProps(props, {
      width: 400,
      height: 400,
      color: 65535,
      get children() {
        return [createComponent(View, {
          width: 50,
          height: 50,
          color: 4278190335,
          right: 0,
          get children() {
            return createComponent(Text, {
              fontSize: 18,
              children: "Right"
            });
          }
        }), createComponent(View, {
          width: 50,
          height: 50,
          color: 4278190335,
          bottom: 0,
          get children() {
            return createComponent(Text, {
              fontSize: 18,
              children: "Bottom"
            });
          }
        }), createComponent(View, {
          width: 50,
          height: 50,
          color: 4278190335,
          bottom: 0,
          right: 0,
          data: {
            id: "BR"
          },
          get children() {
            return createComponent(Text, {
              fontSize: 18,
              children: "BR"
            });
          }
        })];
      }
    }));
  }
  const borderStyles = {
    borderLeft: {
      width: 8,
      color: 95598118
    },
    borderTop: {
      width: 8,
      color: 631422246
    },
    borderRight: {
      width: 8,
      color: 95598118
    },
    borderBottom: {
      width: 8,
      color: 3316790822
    }
  };
  const childTestPassedStyles = {
    // grey color
    color: 3435973887,
    $focus: {
      // black
      color: 255
    }
  };
  const childTestPassedStyles2 = {
    // white color
    color: 4294967295,
    $focus: {
      // white something...
      color: 4143369471
    }
  };
  function hasFocus(elm) {
    return elm.states.has("focus");
  }
  return createComponent(View, {
    style: OverviewContainer,
    get children() {
      return [createComponent(Text, {
        style: Title,
        children: "Title of the Page"
      }), createComponent(View, {
        style: SublineContainer,
        get children() {
          return [createComponent(Text, {
            get children() {
              return emptyTest();
            }
          }), createComponent(Text, {
            style: Subline,
            get children() {
              return ["Sub ", memo(() => insertTest()), " Text"];
            }
          }), createComponent(Show, {
            get when() {
              return insertTest();
            },
            get children() {
              return createComponent(View, {
                width: 28,
                height: 28,
                src: "./assets/rt-popcorn.png"
              });
            }
          }), createComponent(Text, {
            style: Subline,
            children: "More Text"
          })];
        }
      }), createComponent(ChildTest, {
        autofocus: true,
        ref(r$) {
          var _ref$ = childRef;
          typeof _ref$ === "function" ? _ref$(r$) : childRef = r$;
        },
        get style() {
          return combineStyles(childTestPassedStyles2, childTestPassedStyles);
        },
        get children() {
          return createComponent(Text, {
            children: "Child Test"
          });
        }
      }), createComponent(View, {
        ref(r$) {
          var _ref$2 = myBox;
          typeof _ref$2 === "function" ? _ref$2(r$) : myBox = r$;
        },
        style: borderStyles,
        width: 100,
        height: 100,
        color: 16711935,
        x: 900,
        y: 400,
        get alpha() {
          return hasFocus(myBox) ? 1 : 0.2;
        }
      }), createComponent(PosTest, {
        x: 100,
        y: 100
      })];
    }
  });
};
export {
  CreatePage as default
};
