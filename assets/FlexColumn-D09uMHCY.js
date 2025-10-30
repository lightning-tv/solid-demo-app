import { h as hexColor, a as createSignal, o as onMount, s as setGlobalBackground, c as createComponent, T as Text, R as Row, C as Column, V as View, m as mergeProps } from "./index-gL7wR27X.js";
const FlexColumnPage = () => {
  const RowStyles = {
    display: "flex",
    justifyContent: "spaceEvenly",
    width: 1920,
    y: 100,
    height: 880,
    color: hexColor("00000000")
  };
  const ColumnStyles = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flexStart",
    //flexBoundary: "fixed",
    color: 1303115263,
    height: 850,
    width: 60
  };
  const rowTitle = {
    fontSize: 44,
    y: 20,
    x: 150
  };
  function Block(props) {
    const styles = {
      width: 50,
      height: 80,
      x: 5,
      color: 392801023
    };
    return createComponent(View, mergeProps(props, {
      style: styles
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
  return [createComponent(Text, {
    style: rowTitle,
    children: "Start, MarginTop, End, MarginBottom, Center, Between, Evenly"
  }), createComponent(Row, {
    gap,
    style: RowStyles,
    onFocus,
    get children() {
      return [createComponent(Column, {
        gap: 30,
        style: ColumnStyles,
        get children() {
          return [createComponent(Block, {
            autofocus: true
          }), createComponent(Block, {}), createComponent(Block, {}), createComponent(Block, {}), createComponent(Block, {})];
        }
      }), createComponent(Column, {
        gap,
        style: ColumnStyles,
        onFocus,
        get children() {
          return [createComponent(Block, {
            marginTop: 100
          }), createComponent(Block, {}), createComponent(Block, {
            marginTop: 100
          }), createComponent(Block, {}), createComponent(Block, {})];
        }
      }), createComponent(Column, {
        gap,
        justifyContent: "flexEnd",
        style: ColumnStyles,
        debug: true,
        onFocus,
        get children() {
          return [createComponent(Block, {}), createComponent(Block, {}), createComponent(Block, {}), createComponent(Block, {}), createComponent(Block, {})];
        }
      }), createComponent(Column, {
        gap,
        justifyContent: "flexEnd",
        style: ColumnStyles,
        onFocus,
        get children() {
          return [createComponent(Block, {}), createComponent(Block, {
            marginBottom: 100
          }), createComponent(Block, {}), createComponent(Block, {}), createComponent(Block, {
            marginBottom: 100
          })];
        }
      }), createComponent(Column, {
        gap,
        justifyContent: "center",
        style: ColumnStyles,
        onFocus,
        get children() {
          return [createComponent(Block, {}), createComponent(Block, {}), createComponent(Block, {}), createComponent(Block, {}), createComponent(Block, {})];
        }
      }), createComponent(Column, {
        gap,
        justifyContent: "spaceBetween",
        style: ColumnStyles,
        onFocus,
        get children() {
          return [createComponent(Block, {}), createComponent(Block, {}), createComponent(Block, {}), createComponent(Block, {}), createComponent(Block, {})];
        }
      }), createComponent(Column, {
        gap,
        justifyContent: "spaceEvenly",
        style: ColumnStyles,
        onFocus,
        get children() {
          return [createComponent(Block, {}), createComponent(Block, {}), createComponent(Block, {}), createComponent(Block, {}), createComponent(Block, {})];
        }
      }), createComponent(Column, {
        gap,
        rowGap: 0,
        flexWrap: "wrap",
        alignItems: "center",
        style: ColumnStyles,
        onFocus,
        get children() {
          return [createComponent(Block, {
            height: 200
          }), createComponent(Block, {}), createComponent(Block, {}), createComponent(Block, {
            height: 200
          }), createComponent(Block, {}), createComponent(Block, {
            height: 200
          }), createComponent(Block, {})];
        }
      })];
    }
  })];
};
export {
  FlexColumnPage as default
};
