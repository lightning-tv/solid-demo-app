import { v as api, w as convertItemsToTiles, x as getImageUrl, y as useParams, u as useNavigate, a as createResource, c as createSignal, f as createEffect, o as on, s as setGlobalBackground, h as createComponent, S as Show, V as View, z as ContentBlock, R as Row, C as Column, i as styles, l as memo, T as Text, A as TileRow, j as assertTruthy, B as closeVideo, D as playVideo, E as setActiveElement } from "./index-BDxPbLSF.js";
import { B as Button } from "./Button-D26ptxUp.js";
function minutesToHMM(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return hours + "h " + (remainingMinutes < 10 ? "0" : "") + remainingMinutes + "min";
}
function formatDate(dateString) {
  const parts = dateString.split("-");
  return parts[1] + "/" + parts[2] + "/" + parts[0];
}
function justYear(dateString) {
  const parts = dateString.split("-");
  return parts[0];
}
function getRecommendations({ type, id }) {
  return api.get("/".concat(type, "/").concat(id, "/recommendations")).then(({ results }) => {
    if (results.length) {
      return convertItemsToTiles(results.slice(0, 7));
    }
    return api.get("/trending/".concat(type, "/week?page=1")).then(({ results: results2 }) => convertItemsToTiles(results2.slice(0, 7)));
  });
}
function getCredits({ type, id }) {
  return api.get("/".concat(type, "/").concat(id, "/credits")).then(({ cast }) => convertItemsToTiles(cast.slice(0, 7)));
}
function getInfo({ type, id }) {
  let rt = type === "movie" ? {
    rtCrit: 86,
    rtFan: 92
  } : {};
  return api.get("/".concat(type, "/").concat(id)).then((data) => ({
    backgroundImage: getImageUrl(data.backdrop_path, "w1280"),
    heroContent: {
      title: data.title || data.name,
      description: data.overview,
      badges: ["HD", "CC"],
      voteAverage: data.vote_average,
      voteCount: data.vote_count,
      metaText: type === "movie" ? minutesToHMM(data.runtime) + "   " + formatDate(data.release_date) : "".concat(justYear(data.first_air_date), " - ").concat(justYear(data.last_air_date)),
      reviews: rt
    },
    ...data
  }));
}
const Entity = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [data] = createResource(() => ({
    ...params
  }), getInfo);
  const [credits] = createResource(() => ({
    ...params
  }), getCredits);
  const [recommendations] = createResource(() => ({
    ...params
  }), getRecommendations);
  const [backdropAlpha, setBackdropAlpha] = createSignal(0);
  createEffect(on(data, (data2) => {
    setGlobalBackground(data2.backgroundImage);
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
      return data();
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
              return data().heroContent;
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
                  return data();
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
                  return memo(() => !!recommendations())() && credits();
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
                      return recommendations();
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
                      return credits();
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
