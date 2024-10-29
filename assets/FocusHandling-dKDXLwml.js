import { s as setGlobalBackground, h as createComponent, V as View, R as Row, C as Column, m as mergeProps } from "./index-C8EVRuji.js";
const styles = {
  button: {
    alpha: 0.4,
    focus: {
      alpha: 1
    }
  }
};
function Button(props) {
  return createComponent(View, mergeProps(props, {
    width: 200,
    height: 60,
    get style() {
      return styles.button;
    },
    get color() {
      return props.color || 3772834047;
    }
  }));
}
const PositioningPage = () => {
  setGlobalBackground(506018815);
  const leftMenuStyle = {
    width: 200,
    height: 240,
    focus: {
      width: 900,
      transition: true
    }
  };
  return createComponent(View, {
    x: 450,
    y: 200,
    get children() {
      return createComponent(Row, {
        display: "block",
        get children() {
          return [createComponent(View, {
            forwardFocus: 0,
            style: leftMenuStyle,
            colorLeft: 1196779946,
            colorRight: 1685359530,
            zIndex: 5,
            get children() {
              return createComponent(Column, {
                id: "SideMenu",
                gap: 20,
                get children() {
                  return [createComponent(Button, {
                    color: 3840206847
                  }), createComponent(Button, {
                    color: 3840206847
                  }), createComponent(Button, {
                    color: 3840206847
                  })];
                }
              });
            }
          }), createComponent(Column, {
            x: 250,
            gap: 20,
            plinko: true,
            autofocus: true,
            get children() {
              return [createComponent(Row, {
                gap: 20,
                height: 60,
                get children() {
                  return [createComponent(Button, {
                    color: 4014228735
                  }), createComponent(Button, {
                    color: 4185069311
                  }), createComponent(Button, {
                    color: 2227967743
                  })];
                }
              }), createComponent(Row, {
                gap: 20,
                height: 60,
                get children() {
                  return [createComponent(Button, {
                    color: 280592895
                  }), createComponent(Button, {
                    color: 112645375
                  }), createComponent(Button, {
                    color: 998438655
                  })];
                }
              }), createComponent(Row, {
                gap: 20,
                height: 60,
                get children() {
                  return [createComponent(Button, {
                    color: 2338125567
                  }), createComponent(Button, {
                    color: 3645304831
                  }), createComponent(Button, {
                    color: 4097793791
                  })];
                }
              })];
            }
          })];
        }
      });
    }
  });
};
export {
  PositioningPage as default
};
