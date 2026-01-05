import { a as createSignal, u as useNavigate, g as createEffect, i as on, s as setGlobalBackground, c as createComponent, S as Show, V as View, x as ContentBlock, R as Row, Q as Button, C as Column, T as Text, D as styles, W as TileRow, B as memo, G as assertTruthy } from "./index-DkcqENzP.js";
const Entity = (props) => {
  const [backdropAlpha, setBackdropAlpha] = createSignal(0);
  const [playFocused, setPlayFocused] = createSignal(false);
  const navigate = useNavigate();
  createEffect(on(props.data.entity, (data) => {
    setGlobalBackground(data.backgroundImage);
  }, {
    defer: true
  }));
  const columnY = 640;
  const Backdrop = {
    colorTop: 236067071,
    colorBottom: 438249471,
    alpha: 0,
    width: 1900,
    height: 1080,
    x: -180,
    y: columnY
  };
  function onRowFocus() {
    this.children[this.selected || 0].setFocus();
    columnRef.y = columnY;
    backdropRef.y = columnY;
    backdropRef.alpha = 0;
  }
  function onRowFocusAnimate() {
    this.children[this.selected || 0].setFocus();
    columnRef.y = 180;
    backdropRef.y = 0;
    backdropRef.alpha = 0.99;
  }
  function onEnter() {
    var _a;
    let entity = this.children.find((c) => c.states.has("focus"));
    assertTruthy(entity && ((_a = entity.item) == null ? void 0 : _a.href));
    navigate(entity.item.href);
  }
  function onEscape() {
    document.getElementsByTagName("canvas")[0].focus();
    entityActions.setFocus();
    setBackdropAlpha(0);
  }
  function onEnterTrailer() {
    navigate("/player/123");
  }
  let columnRef, backdropRef, entityActions;
  return createComponent(Show, {
    get when() {
      return props.data.entity();
    },
    get children() {
      return [createComponent(View, {
        x: 170,
        onUp: () => entityActions.setFocus(),
        onEscape,
        get announce() {
          return [props.data.entity().heroContent.title, "PAUSE-1", props.data.entity().heroContent.description];
        },
        announceContext: "Press LEFT or RIGHT to review items, press UP or DOWN to review categories, press CENTER to select",
        get children() {
          return [createComponent(ContentBlock, {
            y: 260,
            get marquee() {
              return playFocused();
            },
            get content() {
              return props.data.entity().heroContent;
            }
          }), createComponent(Row, {
            ref(r$) {
              var _ref$ = entityActions;
              typeof _ref$ === "function" ? _ref$(r$) : entityActions = r$;
            },
            y: 500,
            scroll: "none",
            height: 90,
            width: 640,
            gap: 40,
            onDown: () => columnRef.setFocus(),
            onEnter: onEnterTrailer,
            get children() {
              return [createComponent(Button, {
                width: 300,
                get autofocus() {
                  return props.data.entity();
                },
                onFocusChanged: setPlayFocused,
                children: "Play"
              }), createComponent(Button, {
                width: 300,
                children: "Resume"
              })];
            }
          }), createComponent(Column, {
            ref(r$) {
              var _ref$2 = columnRef;
              typeof _ref$2 === "function" ? _ref$2(r$) : columnRef = r$;
            },
            x: 0,
            y: columnY,
            get style() {
              return styles.Column;
            },
            height: 880,
            scroll: "none",
            zIndex: 5,
            get children() {
              return createComponent(Show, {
                get when() {
                  return memo(() => !!props.data.recommendations())() && props.data.credits();
                },
                get children() {
                  return [createComponent(Text, {
                    skipFocus: true,
                    get style() {
                      return styles.RowTitle;
                    },
                    children: "Recommendations"
                  }), createComponent(TileRow, {
                    onFocus: onRowFocus,
                    onEnter,
                    announce: "Recommendations",
                    get items() {
                      return props.data.recommendations();
                    },
                    width: 1620
                  }), createComponent(Text, {
                    skipFocus: true,
                    get style() {
                      return styles.RowTitle;
                    },
                    children: "Cast and Crew"
                  }), createComponent(TileRow, {
                    announce: "Cast and Crew",
                    onFocus: onRowFocusAnimate,
                    onEnter,
                    get items() {
                      return props.data.credits();
                    },
                    width: 1620
                  })];
                }
              });
            }
          }), createComponent(View, {
            ref(r$) {
              var _ref$3 = backdropRef;
              typeof _ref$3 === "function" ? _ref$3(r$) : backdropRef = r$;
            },
            style: Backdrop,
            transition: {
              alpha: true,
              y: true
            }
          })];
        }
      }), createComponent(View, {
        get alpha() {
          return backdropAlpha();
        },
        colorTop: 236067071,
        colorBottom: 438249471,
        skipFocus: true,
        zIndex: 200,
        transition: {
          alpha: true
        }
      })];
    }
  });
};
export {
  Entity as default
};
