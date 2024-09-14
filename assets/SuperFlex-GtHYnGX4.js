import { c as createSignal, h as createComponent, C as Column, V as View, T as Text, R as Row, F as For, S as Show } from "./index-C4I4S4Nr.js";
const Items = ["Mary", "had", "a", "little", "lamb", "her", "fleece", "was", "white", "as", "snow"];
const styles = {
  PageContainer: {
    width: 1920,
    height: 1080,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 99
  }
};
const SpecialFont = {
  color: 4278190335,
  focus: {
    color: 4294967295
  }
};
const SuperFlex = () => {
  const [lazyShow, setLazyShow] = createSignal(false);
  let PageLoader;
  setTimeout(() => {
    setLazyShow(true);
    PageLoader.alpha = 0;
  }, 2e3);
  return createComponent(Column, {
    display: "block",
    get children() {
      return [createComponent(View, {
        ref(r$) {
          var _ref$ = PageLoader;
          typeof _ref$ === "function" ? _ref$(r$) : PageLoader = r$;
        },
        get style() {
          return styles.PageContainer;
        },
        get children() {
          return [createComponent(Text, {
            children: "Center - gif doesnt animate"
          }), createComponent(View, {
            autosize: true,
            src: "./assets/spinner.gif"
          }), createComponent(Text, {
            children: "Spinner"
          })];
        }
      }), createComponent(Row, {
        scroll: "always",
        gap: 20,
        selected: 2,
        autofocus: true,
        x: 150,
        y: 50,
        transition: {
          x: {
            duration: 350
          }
        },
        get children() {
          return createComponent(For, {
            each: Items,
            children: (item, index) => createComponent(View, {
              width: 100,
              height: 200,
              style: {
                color: 4278190335,
                focus: {
                  color: 4294967295
                }
              }
            })
          });
        }
      }), createComponent(Show, {
        get when() {
          return lazyShow();
        },
        get children() {
          return createComponent(Row, {
            scroll: "none",
            gap: 20,
            selected: 2,
            autofocus: true,
            x: 150,
            y: 350,
            transition: {
              x: {
                duration: 350
              }
            },
            get children() {
              return createComponent(For, {
                each: Items,
                children: (item, index) => createComponent(View, {
                  width: 100,
                  height: 200,
                  style: {
                    color: 4278190335,
                    focus: {
                      color: 4294967295
                    }
                  }
                })
              });
            }
          });
        }
      }), createComponent(Show, {
        get when() {
          return lazyShow();
        },
        get children() {
          return createComponent(Row, {
            scroll: "none",
            gap: 20,
            selected: 2,
            x: 150,
            y: 650,
            transition: {
              x: {
                duration: 350
              }
            },
            get children() {
              return createComponent(For, {
                each: Items,
                children: (item, index) => createComponent(Text, {
                  style: SpecialFont,
                  fontSize: 24,
                  get children() {
                    return [item, " ", createComponent(Show, {
                      get when() {
                        return lazyShow();
                      },
                      children: "Add Text"
                    })];
                  }
                })
              });
            }
          });
        }
      }), createComponent(Show, {
        get when() {
          return lazyShow();
        },
        get children() {
          return createComponent(Column, {
            scroll: "none",
            gap: 20,
            selected: 2,
            x: 350,
            y: 450,
            get children() {
              return createComponent(For, {
                each: Items,
                children: (item, index) => createComponent(Text, {
                  style: SpecialFont,
                  fontSize: 24,
                  children: item
                })
              });
            }
          });
        }
      })];
    }
  });
};
export {
  SuperFlex as default,
  styles
};
