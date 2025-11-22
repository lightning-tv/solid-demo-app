import { a as createSignal, b as createResource, d as createComputed, e as batch, t as theme, f as createSelector, g as createEffect, i as on, o as onMount, s as setGlobalBackground, c as createComponent, V as View, C as Column, I as Index, T as Text } from "./index-B9nqAPUy.js";
function createInfiniteItems(fetcher) {
  const [items, setItems] = createSignal([]);
  const [page, setPage] = createSignal(0);
  const [end, setEnd] = createSignal(false);
  const [contents] = createResource(page, fetcher);
  createComputed(() => {
    const content = contents();
    if (!content) return;
    batch(() => {
      if (content.length === 0) setEnd(true);
      setItems((p) => [...p, ...content]);
    });
  });
  return [
    items,
    {
      page,
      setPage,
      setItems,
      end,
      setEnd
    }
  ];
}
const ROW_HEIGHT = 50;
const styles = {
  ProductRow: {
    width: 500,
    display: "flex",
    flexDirection: "row",
    gap: 40,
    height: ROW_HEIGHT,
    borderRadius: 16,
    color: 4294967053,
    border: { color: 8422911, width: 0 },
    active: {
      color: 960052479
    },
    $focus: {
      color: 4143380991,
      border: { color: 8422911, width: 6 }
    },
    transition: {
      // leave easing blank to use default linear
      x: { duration: 300 },
      width: { duration: 300 },
      alpha: { duration: 300 }
    }
  },
  ProductText: {
    fontSize: 20,
    fontWeight: 600,
    lineHeight: 24,
    color: 4143380223,
    $focus: {
      color: 336861183
    }
  },
  itemsContainer: {
    width: theme.layout.screenW,
    height: 600,
    y: 180,
    x: 180,
    zIndex: 2
  }
};
function ProductRow(props) {
  return createComponent(View, {
    get y() {
      return props.y;
    },
    get autofocus() {
      return props.autofocus;
    },
    get style() {
      return styles.ProductRow;
    },
    forwardStates: true,
    get children() {
      return [createComponent(Text, {
        get style() {
          return styles.ProductText;
        },
        get children() {
          return props.item.id;
        }
      }), createComponent(Text, {
        get style() {
          return styles.ProductText;
        },
        get children() {
          return props.item.title;
        }
      }), createComponent(Text, {
        get style() {
          return styles.ProductText;
        },
        get children() {
          return props.item.price;
        }
      })];
    }
  });
}
const Grid = () => {
  const [columnY, setcolumnY] = createSignal(0);
  const isFirst = createSelector(() => 0);
  const [rowIndex, setRowIndex] = createSignal(0);
  const [items, setItems] = createSignal([]);
  const [products, {
    setPage
  }] = createInfiniteItems((page) => {
    return fetch("https://dummyjson.com/products?limit=20&skip=".concat(20 * page)).then((res) => res.json()).then((data) => {
      data.total;
      return data.products;
    });
  });
  const EXTRA = 8;
  createEffect(on([products, rowIndex], ([products2, index]) => {
    if (items().length - EXTRA > index) return;
    setItems(products2.slice(0, index + EXTRA));
    if (index > products2.length - 5) {
      setPage((p) => p + 1);
    }
  }, {
    defer: true
  }));
  onMount(() => {
    setGlobalBackground(255);
  });
  function changeRow(selectedIndex, elm, active, lastSelectedIndex) {
    setcolumnY((active.y || 0) * -1 + 50);
    setRowIndex(selectedIndex);
  }
  return createComponent(View, {
    clipping: true,
    get style() {
      return styles.itemsContainer;
    },
    get children() {
      return createComponent(Column, {
        plinko: true,
        get y() {
          return columnY();
        },
        scroll: "none",
        onSelectedChanged: changeRow,
        get children() {
          return createComponent(Index, {
            get each() {
              return items();
            },
            children: (item, i) => createComponent(ProductRow, {
              y: i * 50,
              get item() {
                return item();
              },
              get autofocus() {
                return isFirst(i);
              }
            })
          });
        }
      });
    }
  });
};
export {
  Grid as default
};
