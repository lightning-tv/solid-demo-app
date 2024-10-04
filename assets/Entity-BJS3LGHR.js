import { c as createSignal, u as useNavigate, f as createEffect, o as on, s as setGlobalBackground, h as createComponent, S as Show, V as View, v as ContentBlock, R as Row, C as Column, r as styles, k as memo, T as Text, w as TileRow, i as assertTruthy, x as closeVideo, y as playVideo, z as setActiveElement } from "./index-BaMa5j_y.js";
import { B as Button } from "./Button-COD7zryg.js";
const Entity = (props) => {
  const [backdropAlpha, setBackdropAlpha] = createSignal(0);
  const navigate = useNavigate();
  createEffect(on(props.data.entity, (data) => {
    setGlobalBackground(data.backgroundImage);
  }, {
    defer: true
  }));
  const columnY = 640;
  const Backdrop = {
    color: 255,
    alpha: 0,
    width: 1900,
    height: 890,
    x: -160,
    y: columnY,
    borderRadius: 30
  };
  function onRowFocus() {
    this.children[this.selected || 0].setFocus();
    columnRef.y = columnY;
    backdropRef.y = columnY;
    backdropRef.alpha = 0;
  }
  function onRowFocusAnimate() {
    this.children[this.selected || 0].setFocus();
    columnRef.y = 200;
    backdropRef.y = 160;
    backdropRef.alpha = 0.9;
  }
  function onEnter() {
    let entity = this.children.find((c) => c.states.has("focus"));
    assertTruthy(entity && entity.href);
    navigate(entity.href);
  }
  function onEscape() {
    closeVideo();
    document.getElementsByTagName("canvas")[0].focus();
    entityActions.setFocus();
    setBackdropAlpha(0);
  }
  function onEnterTrailer() {
    const video = playVideo();
    setActiveElement(video);
    setBackdropAlpha(0.9);
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
        get children() {
          return [createComponent(ContentBlock, {
            y: 260,
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
        color: 255,
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
