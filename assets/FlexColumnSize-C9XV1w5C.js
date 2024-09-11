import { k as hexColor, c as createSignal, g as onMount, h as createComponent, T as Text, R as Row, C as Column, V as View, m as mergeProps, s as setGlobalBackground } from "./index-CYh9chBZ.js";
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
    color: 1303115263,
    height: 850,
    width: 80
  };
  const rowTitle = {
    fontSize: 44,
    y: 20,
    x: 150
  };
  function Block(props) {
    const styles = {
      width: randSize(),
      height: 80,
      x: 5,
      color: 392801023
    };
    return createComponent(View, mergeProps(props, {
      style: styles
    }));
  }
  function randSize() {
    return Math.floor(Math.random() * 61) + 10;
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
        alignItems: "center",
        get children() {
          return [createComponent(Block, {
            autofocus: true
          }), createComponent(Block, {}), createComponent(Block, {}), createComponent(Block, {}), createComponent(Block, {})];
        }
      }), createComponent(Column, {
        gap,
        style: ColumnStyles,
        onFocus,
        alignItems: "flexStart",
        get children() {
          return [createComponent(Block, {
            marginTop: 100
          }), createComponent(Block, {}), createComponent(Block, {
            marginTop: 100
          }), createComponent(Block, {}), createComponent(Block, {})];
        }
      }), createComponent(Column, {
        gap,
        alignItems: "flexEnd",
        justifyContent: "flexEnd",
        style: ColumnStyles,
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
      })];
    }
  })];
};
export {
  FlexColumnPage as default
};
//# sourceMappingURL=FlexColumnSize-C9XV1w5C.js.map
