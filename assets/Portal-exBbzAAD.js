import { v as useNavigate, e as createSelector, h as createComponent, V as View, T as Text, C as Column, R as Row, F as For, m as mergeProps, w as assertTruthy, c as createSignal } from "./index-BRHPQvYN.js";
const Portal = () => {
  const navigate = useNavigate();
  createSelector(() => {
    return 0;
  });
  function onEnter() {
    let entity = this.children[this.selected || 0];
    assertTruthy(entity && entity.id);
    navigate("/" + entity.id);
  }
  const flexDemos = [{
    title: "Focus Basics",
    id: "focusbasics",
    description: "Quick guide on Focus"
  }, {
    title: "Key Handling",
    id: "keyhandling",
    description: "Understanding Key Handling"
  }, {
    title: "Loop Basics",
    id: "loops",
    description: "Understanding For, Index, Lazy and List"
  }, {
    title: "Infinite Items",
    id: "infinite",
    description: "Learn how to manage large list of items"
  }, {
    title: "Layout Basics",
    id: "layout",
    description: "Quick guide on Layout"
  }, {
    title: "Flex Menu",
    id: "flexmenu",
    description: "Flex Menu On Right Implementation"
  }, {
    title: "Flex Row",
    id: "flex",
    description: "Flex Row Implementation"
  }, {
    title: "Flex Column",
    id: "flexcolumn",
    description: "Flex Column Implementation"
  }, {
    title: "Flex Grow",
    id: "flexgrow",
    description: "Flex Grow Examples"
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
    title: "Positioning",
    id: "positioning",
    description: "Positioning Elements"
  }, {
    title: "Gradients",
    id: "gradients",
    description: "Basic Gradients"
  }, {
    title: "Transitions",
    id: "transitions",
    description: "Comparing different Transitions"
  }, {
    title: "TMDB",
    id: "tmdb",
    description: "TMDB Example"
  }, {
    title: "Grid Primitive for Layout",
    id: "tmdbgrid",
    description: "Using Grid component"
  }, {
    title: "Firebolt Integration",
    id: "firebolt",
    description: "Firebolt API Integration"
  }, {
    title: "Components",
    id: "components",
    description: "Reusable Components"
  }, {
    title: "Focus Handling",
    id: "focushandling",
    description: "Dealing with Focus Handling"
  }, {
    title: "Grid",
    id: "grid",
    description: "Infinite Scroll Grid"
  }, {
    title: "Destroy",
    id: "destroy",
    description: "Using onDestroy to animate destruction"
  }, {
    title: "Text",
    id: "text",
    description: "Text layout with flexbox"
  }, {
    title: "TextPoster",
    id: "textposter",
    description: "Text layout with flex and Poster"
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
      $focus: {
        scale: 1.1,
        color: 4294967295
      }
    };
    const [hasFocus, setHasFocus] = createSignal(false);
    return createComponent(View, mergeProps(props, {
      onFocusChanged: setHasFocus,
      style: Container,
      get children() {
        return createComponent(View, {
          x: 30,
          get children() {
            return [createComponent(Text, {
              y: 30,
              fontSize: 84,
              get color() {
                return hasFocus() ? 255 : 4294967295;
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
                return hasFocus() ? 255 : 4294967295;
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
                return hasFocus() ? 255 : 4294967295;
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
        autofocus: true,
        get children() {
          return [createComponent(Row, {
            onEnter,
            gap: 40,
            height: 320,
            flexBoundary: "contain",
            scroll: "always",
            get children() {
              return createComponent(For, {
                each: demos,
                children: (demo, i) => createComponent(DemoTile, mergeProps({
                  get index() {
                    return i();
                  }
                }, demo))
              });
            }
          }), createComponent(Row, {
            onEnter,
            gap: 40,
            height: 320,
            flexBoundary: "contain",
            scroll: "always",
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
