import { s as setGlobalBackground, a as createSignal, k as onCleanup, c as createComponent, V as View, T as Text } from "./index-DL_ssk2q.js";
const PositioningPage = () => {
  setGlobalBackground(506018815);
  const [state, setState] = createSignal({
    x1: 20,
    x2: 140,
    x3: 20 + 140 + 100,
    x4: 380,
    y: 140,
    xA: 20,
    xB: 140,
    xC: 260,
    xD: 380,
    yNested: 0,
    xNested: 0,
    bar2: {
      direction: "up",
      v: "10%"
    },
    bar3: "10%"
  });
  setTimeout(() => {
    setState((prevState) => ({
      ...prevState,
      xD: prevState.xD + 200,
      xC: prevState.xC + 100,
      xB: prevState.xB + 50,
      xA: prevState.xA + 25
    }));
  }, 4e3);
  const intervals = [];
  intervals.push(setInterval(() => {
    setState((prevState) => ({
      ...prevState,
      yNested: prevState.yNested === 0 ? 50 : 0
    }));
  }, 2e3));
  intervals.push(setInterval(() => {
    setState((prevState) => ({
      ...prevState,
      xNested: prevState.xNested === 0 ? 150 : 0
    }));
  }, 1e3));
  intervals.push(setInterval(() => {
    setState((prevState) => ({
      ...prevState,
      bar3: Math.ceil(Math.random() * 96) + ""
    }));
  }, 2e3));
  intervals.push(setInterval(() => {
    setState((prevState) => {
      const v = parseFloat(prevState.bar2.v);
      const newV = prevState.bar2.direction === "up" ? v + 10 : v - 10;
      return {
        ...prevState,
        bar2: {
          ...prevState.bar2,
          v: newV + "%",
          direction: newV >= 90 ? "down" : newV <= 10 ? "up" : prevState.bar2.direction
        }
      };
    });
  }, 400));
  onCleanup(() => {
    intervals.forEach((interval) => clearInterval(interval));
  });
  return createComponent(View, {
    x: 150,
    autofocus: true,
    get children() {
      return [createComponent(View, {
        width: 100,
        height: 100,
        x: 20,
        y: 20,
        color: 3976134655
      }), createComponent(View, {
        width: 100,
        height: 100,
        x: 140,
        y: 20,
        color: 2784230655
      }), createComponent(View, {
        width: 100,
        height: 100,
        x: 260,
        y: 20,
        color: 584314623
      }), createComponent(View, {
        width: 100,
        height: 100,
        x: 380,
        y: 20,
        color: 143766271
      }), createComponent(View, {
        width: 100,
        height: 100,
        get x() {
          return state().x1;
        },
        get y() {
          return state().y;
        },
        color: 4260691967
      }), createComponent(View, {
        width: 100,
        height: 100,
        get x() {
          return state().x2;
        },
        get y() {
          return state().y;
        },
        color: 4124114687
      }), createComponent(View, {
        width: 100,
        height: 100,
        get x() {
          return state().x3;
        },
        get y() {
          return state().y;
        },
        color: 3900307967
      }), createComponent(View, {
        width: 100,
        height: 100,
        get x() {
          return state().x4;
        },
        get y() {
          return state().y;
        },
        color: 3223770111
      }), createComponent(View, {
        width: 100,
        height: 100,
        get x() {
          return state().xA;
        },
        y: 260,
        color: 4294438399
      }), createComponent(View, {
        width: 100,
        height: 100,
        get x() {
          return state().xB;
        },
        y: 260,
        color: 4275546879
      }), createComponent(View, {
        width: 100,
        height: 100,
        get x() {
          return state().xC;
        },
        y: 260,
        color: 4220665087
      }), createComponent(View, {
        width: 100,
        height: 100,
        get x() {
          return state().xD;
        },
        y: 260,
        color: 3931639039
      }), createComponent(View, {
        width: 800,
        height: 800,
        y: 20,
        x: 800,
        color: 3976066559,
        get children() {
          return createComponent(View, {
            width: 600,
            height: 600,
            y: 20,
            x: 20,
            color: 2817773823,
            get children() {
              return createComponent(View, {
                width: 400,
                height: 400,
                y: 100,
                x: 20,
                color: 886282751,
                get children() {
                  return createComponent(View, {
                    width: 200,
                    height: 100,
                    y: (400 - 100) / 2,
                    x: (400 - 200) / 2,
                    color: 93743615,
                    get children() {
                      return createComponent(View, {
                        width: 50,
                        height: 50,
                        get y() {
                          return state().yNested;
                        },
                        get x() {
                          return state().xNested;
                        },
                        transition: {
                          x: {
                            duration: 300,
                            easing: "ease"
                          },
                          y: {
                            duration: 300,
                            easing: "ease"
                          }
                        },
                        color: 106907391
                      });
                    }
                  });
                }
              });
            }
          });
        }
      }), createComponent(View, {
        width: 100,
        height: 100,
        y: 500,
        x: 20,
        color: 3776792831
      }), createComponent(View, {
        width: 200,
        height: 200,
        x: 300,
        y: 600,
        color: 2493757695,
        zIndex: 100,
        get children() {
          return [createComponent(Text, {
            x: 100,
            y: 140,
            children: "Lightning!"
          }), createComponent(View, {
            width: 300,
            height: 100,
            color: 1196780031
          }), createComponent(View, {
            x: 150,
            y: 150,
            width: 100,
            height: 100,
            color: 4294967295,
            borderRadius: 75
          })];
        }
      }), createComponent(View, {
        width: 300,
        height: 300,
        x: 300,
        y: 600,
        color: 4014228608
      }), createComponent(View, {
        width: 400,
        height: 100,
        x: 800,
        y: 900,
        color: 42256383,
        get children() {
          return [createComponent(View, {
            width: 400 * 0.42,
            height: 100 * 0.3,
            y: 100 * 0.05,
            x: 400 * 0.01,
            color: 123307519
          }), createComponent(View, {
            get width() {
              return 400 * parseFloat(state().bar2.v) / 100;
            },
            height: 100 * 0.3,
            y: 100 * 0.35,
            x: 400 * 0.01,
            color: 1797368063
          }), createComponent(View, {
            get width() {
              return 400 * parseFloat(state().bar3) / 100;
            },
            height: 100 * 0.3,
            y: 100 * 0.65,
            x: 400 * 0.01,
            transition: {
              width: {
                duration: 300,
                easing: "ease"
              }
            },
            color: 2668771839
          })];
        }
      })];
    }
  });
};
export {
  PositioningPage as default
};
