import { u as useNavigate, e as createSelector, h as createComponent, V as View, T as Text, C as Column, R as Row, i as styles, F as For, m as mergeProps, j as assertTruthy, c as createSignal } from "./index-J6quNKXY.js";
const Portal = () => {
  const navigate = useNavigate();
  const isFirst = createSelector(() => {
    return 0;
  });
  function onEnter() {
    let entity = this.children[this.selected || 0];
    assertTruthy(entity && entity.id);
    navigate("/" + entity.id);
  }
  const flexDemos = [{
    title: "Flex Row",
    id: "flex",
    description: "Flex Row Implementation"
  }, {
    title: "Flex Column",
    id: "flexcolumn",
    description: "Flex Column Implementation"
  }, {
    title: "Flex Row Vertical Align",
    id: "flexsize",
    description: "Flex Row Vertical Align Implementation"
  }, {
    title: "Flex Column Vertical Align",
    id: "flexcolumnsize",
    description: "Flex Column Vertical Align Implementation"
  }, {
    title: "Flex Layout Tests",
    id: "superflex",
    description: "Complicated flex layouts"
  }];
  const demos = [{
    title: "Grid",
    id: "grid",
    description: "Infinite Scroll Grid"
  }, {
    title: "Buttons",
    id: "buttons",
    description: "Demo a few buttons"
  }, {
    title: "Login",
    id: "login",
    description: "Login example"
  }, {
    title: "Text",
    id: "text",
    description: "Text layout with flexbox"
  }, {
    title: "Create Elements",
    id: "create",
    description: "Testing Show + children + inserting text"
  }, {
    title: "Viewport",
    id: "viewport",
    description: "Events going in and out of viewport"
  }];
  function DemoTile(props) {
    const Container = {
      width: 370,
      height: 320,
      borderRadius: 6,
      scale: 1,
      color: 405488895,
      transition: {
        color: true,
        scale: true
      },
      focus: {
        scale: 1.1,
        color: 4294967295
      }
    };
    const [color, setColor] = createSignal(4294967295);
    return createComponent(View, mergeProps(props, {
      onFocus: () => setColor(255),
      onBlur: () => setColor(4294967295),
      style: Container,
      get children() {
        return createComponent(View, {
          x: 30,
          get children() {
            return [createComponent(Text, {
              y: 30,
              fontSize: 84,
              get color() {
                return color();
              },
              get children() {
                return props.index;
              }
            }), createComponent(Text, {
              y: 140,
              fontSize: 42,
              width: 340,
              height: 42,
              contain: "both",
              get color() {
                return color();
              },
              get children() {
                return props.title;
              }
            }), createComponent(Text, {
              y: 200,
              fontSize: 28,
              width: 330,
              contain: "width",
              get color() {
                return color();
              },
              get children() {
                return props.description;
              }
            })];
          }
        });
      }
    }));
  }
  return createComponent(View, {
    colorTop: 1147903743,
    colorBottom: 743406847,
    get children() {
      return [createComponent(View, {
        x: 120,
        get children() {
          return [createComponent(View, {
            src: "./assets/solidjs.png",
            width: 101,
            height: 90,
            y: 40
          }), createComponent(Text, {
            fontSize: 90,
            x: 110,
            y: 40,
            children: "Examples"
          }), createComponent(View, {
            y: 140,
            height: 1,
            width: 1800,
            color: 3906468351
          })];
        }
      }), createComponent(Column, {
        scroll: "none",
        y: 200,
        x: 170,
        gap: 80,
        get children() {
          return [createComponent(Row, {
            onEnter,
            get style() {
              return styles.Row;
            },
            justifyContent: "flexStart",
            gap: 40,
            get children() {
              return createComponent(For, {
                each: demos,
                children: (demo, i) => createComponent(DemoTile, mergeProps({
                  get autofocus() {
                    return isFirst(i());
                  },
                  get index() {
                    return i();
                  }
                }, demo))
              });
            }
          }), createComponent(Row, {
            onEnter,
            get style() {
              return styles.Row;
            },
            justifyContent: "flexStart",
            gap: 40,
            get children() {
              return createComponent(For, {
                each: flexDemos,
                children: (demo, i) => createComponent(DemoTile, mergeProps({
                  get index() {
                    return i();
                  }
                }, demo))
              });
            }
          })];
        }
      })];
    }
  });
};
export {
  Portal as default
};
