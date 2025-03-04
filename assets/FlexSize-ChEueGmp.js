import { c as createSignal, g as onMount, h as createComponent, C as Column, G as styles, T as Text, R as Row, V as View, m as mergeProps, s as setGlobalBackground } from "./index-C01m-28w.js";
const FlexSizePage = () => {
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
  function randSize() {
    return Math.floor(Math.random() * 91) + 10;
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
        children: "Flex Start - AlignItems: center"
      }), createComponent(Row, {
        alignItems: "center",
        gap,
        style: RowStyles,
        onFocus,
        get children() {
          return [createComponent(Block, {
            autofocus: true,
            get height() {
              return randSize();
            }
          }), createComponent(Block, {
            get height() {
              return randSize();
            }
          }), createComponent(Block, {
            get height() {
              return randSize();
            }
          }), createComponent(Block, {
            get height() {
              return randSize();
            }
          }), createComponent(Block, {
            get height() {
              return randSize();
            }
          })];
        }
      }), createComponent(Text, {
        style: rowTitle,
        children: "Flex Start - Margin Left - AlignItems: flexStart"
      }), createComponent(Row, {
        gap,
        alignItems: "flexStart",
        style: RowStyles,
        onFocus,
        get children() {
          return [createComponent(Block, {
            marginLeft: 100,
            get height() {
              return randSize();
            }
          }), createComponent(Block, {
            get height() {
              return randSize();
            }
          }), createComponent(Block, {
            marginLeft: 100,
            get height() {
              return randSize();
            }
          }), createComponent(Block, {
            get height() {
              return randSize();
            }
          }), createComponent(Block, {
            get height() {
              return randSize();
            }
          })];
        }
      }), createComponent(Text, {
        style: rowTitle,
        children: "Flex End - AlignItems: flexEnd"
      }), createComponent(Row, {
        gap,
        justifyContent: "flexEnd",
        alignItems: "flexEnd",
        style: RowStyles,
        onFocus,
        get children() {
          return [createComponent(Block, {
            get height() {
              return randSize();
            }
          }), createComponent(Block, {
            get height() {
              return randSize();
            }
          }), createComponent(Block, {
            get height() {
              return randSize();
            }
          }), createComponent(Block, {
            get height() {
              return randSize();
            }
          }), createComponent(Block, {
            get height() {
              return randSize();
            }
          })];
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
          return [createComponent(Block, {
            get height() {
              return randSize();
            }
          }), createComponent(Block, {
            marginRight: 100,
            get height() {
              return randSize();
            }
          }), createComponent(Block, {
            get height() {
              return randSize();
            }
          }), createComponent(Block, {
            get height() {
              return randSize();
            }
          }), createComponent(Block, {
            marginRight: 100,
            get height() {
              return randSize();
            }
          })];
        }
      }), createComponent(Text, {
        style: rowTitle,
        children: "Center - No Margin Support"
      }), createComponent(Row, {
        gap,
        justifyContent: "center",
        style: RowStyles,
        onFocus,
        get children() {
          return [createComponent(Block, {
            get height() {
              return randSize();
            }
          }), createComponent(Block, {
            get height() {
              return randSize();
            }
          }), createComponent(Block, {
            get height() {
              return randSize();
            }
          }), createComponent(Block, {
            get height() {
              return randSize();
            }
          }), createComponent(Block, {
            get height() {
              return randSize();
            }
          })];
        }
      }), createComponent(Text, {
        style: rowTitle,
        children: "Space Between - No Margin Support"
      }), createComponent(Row, {
        gap,
        justifyContent: "spaceBetween",
        style: RowStyles,
        onFocus,
        get children() {
          return [createComponent(Block, {
            get height() {
              return randSize();
            }
          }), createComponent(Block, {
            get height() {
              return randSize();
            }
          }), createComponent(Block, {
            get height() {
              return randSize();
            }
          }), createComponent(Block, {
            get height() {
              return randSize();
            }
          }), createComponent(Block, {
            get height() {
              return randSize();
            }
          })];
        }
      }), createComponent(Text, {
        style: rowTitle,
        children: "Space Evenly - No Margin Support"
      }), createComponent(Row, {
        gap,
        justifyContent: "spaceEvenly",
        style: RowStyles,
        onFocus,
        get children() {
          return [createComponent(Block, {
            get height() {
              return randSize();
            }
          }), createComponent(Block, {
            get height() {
              return randSize();
            }
          }), createComponent(Block, {
            get height() {
              return randSize();
            }
          }), createComponent(Block, {
            get height() {
              return randSize();
            }
          }), createComponent(Block, {
            get height() {
              return randSize();
            }
          })];
        }
      })];
    }
  });
};
export {
  FlexSizePage as default
};
