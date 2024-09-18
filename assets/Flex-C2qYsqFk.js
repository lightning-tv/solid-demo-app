import { c as createSignal, g as onMount, h as createComponent, C as Column, i as styles, T as Text, R as Row, V as View, m as mergeProps, s as setGlobalBackground } from "./index-Dph1brLc.js";
const FlexPage = () => {
  const RowStyles = {
    display: "flex",
    justifyContent: "flexStart",
    width: 1600,
    height: 110,
    color: 1303115263
  };
  const rowTitle = {
    fontSize: 44,
    marginTop: 25,
    marginBottom: -20,
    skipFocus: true
  };
  function Block(props) {
    const styles2 = {
      width: 200,
      height: 100,
      y: 5,
      color: 392801023
    };
    return createComponent(View, mergeProps(props, {
      style: styles2
    }));
  }
  const [columnY, setColumnY] = createSignal(50);
  function onFocus() {
    this.children[this.selected || 0].setFocus();
    setColumnY(150 + (this.y || 0) * -1);
  }
  onMount(() => {
    setGlobalBackground(858993663);
  });
  const gap = 50;
  return createComponent(Column, {
    x: 160,
    get y() {
      return columnY();
    },
    gap: 30,
    height: 850,
    get width() {
      return RowStyles.width;
    },
    get style() {
      return styles.Column;
    },
    get children() {
      return [createComponent(Text, {
        style: rowTitle,
        children: "Flex Start"
      }), createComponent(Row, {
        gap,
        style: RowStyles,
        onFocus,
        get children() {
          return [createComponent(Block, {
            autofocus: true
          }), createComponent(Block, {}), createComponent(Block, {}), createComponent(Block, {}), createComponent(Block, {})];
        }
      }), createComponent(Text, {
        style: rowTitle,
        children: "Flex Start - Margin Left"
      }), createComponent(Row, {
        gap,
        style: RowStyles,
        onFocus,
        get children() {
          return [createComponent(Block, {
            marginLeft: 100
          }), createComponent(Block, {}), createComponent(Block, {
            marginLeft: 100
          }), createComponent(Block, {}), createComponent(Block, {})];
        }
      }), createComponent(Text, {
        style: rowTitle,
        children: "Flex End"
      }), createComponent(Row, {
        gap,
        justifyContent: "flexEnd",
        style: RowStyles,
        onFocus,
        get children() {
          return [createComponent(Block, {}), createComponent(Block, {}), createComponent(Block, {}), createComponent(Block, {}), createComponent(Block, {})];
        }
      }), createComponent(Text, {
        style: rowTitle,
        children: "Flex End - Margin Right"
      }), createComponent(Row, {
        gap,
        justifyContent: "flexEnd",
        style: RowStyles,
        onFocus,
        get children() {
          return [createComponent(Block, {}), createComponent(Block, {
            marginRight: 100
          }), createComponent(Block, {}), createComponent(Block, {}), createComponent(Block, {
            marginRight: 100
          })];
        }
      }), createComponent(Text, {
        style: rowTitle,
        children: "Center"
      }), createComponent(Row, {
        gap,
        justifyContent: "center",
        style: RowStyles,
        onFocus,
        get children() {
          return [createComponent(Block, {}), createComponent(Block, {
            marginLeft: 80
          }), createComponent(Block, {}), createComponent(Block, {
            marginLeft: 80
          }), createComponent(Block, {})];
        }
      }), createComponent(Text, {
        style: rowTitle,
        children: "Space Between"
      }), createComponent(Row, {
        gap,
        justifyContent: "spaceBetween",
        style: RowStyles,
        onFocus,
        get children() {
          return [createComponent(Block, {}), createComponent(Block, {}), createComponent(Block, {}), createComponent(Block, {}), createComponent(Block, {
            marginRight: 40
          })];
        }
      }), createComponent(Text, {
        style: rowTitle,
        children: "Space Evenly"
      }), createComponent(Row, {
        gap,
        justifyContent: "spaceEvenly",
        style: RowStyles,
        onFocus,
        get children() {
          return [createComponent(Block, {}), createComponent(Block, {}), createComponent(Block, {
            marginLeft: 80
          }), createComponent(Block, {}), createComponent(Block, {})];
        }
      })];
    }
  });
};
export {
  FlexPage as default
};
