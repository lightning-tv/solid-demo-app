import { v as api, w as convertItemsToTiles, x as getImageUrl, y as useParams, u as useNavigate, a as createResource, g as onMount, h as createComponent, S as Show, V as View, i as styles, T as Text, t as theme, C as Column, A as TileRow, j as assertTruthy, s as setGlobalBackground } from "./index-CpzpOQNC.js";
function getCredits({ id }) {
  return api.get("/person/".concat(id, "/combined_credits")).then(({ cast }) => convertItemsToTiles(cast.slice(0, 7)));
}
function getInfo({ id }) {
  return api.get("/person/".concat(id)).then((data) => ({
    backgroundImage: getImageUrl(data.profile_path, "original"),
    heroContent: {
      title: data.title || data.name,
      description: data.biography
    },
    ...data
  }));
}
const People = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [data] = createResource(() => ({
    ...params
  }), getInfo);
  const [credits] = createResource(() => ({
    ...params
  }), getCredits);
  const Backdrop = {
    color: 255,
    alpha: 0.8,
    width: 800,
    height: 440,
    x: 130,
    y: 180,
    borderRadius: 30
  };
  function onEnter() {
    let entity = this.children[this.selected || 0];
    assertTruthy(entity && entity.href);
    navigate(entity.href);
  }
  onMount(() => {
    setGlobalBackground(858993663);
  });
  return createComponent(Show, {
    get when() {
      return data();
    },
    keyed: true,
    get children() {
      return [createComponent(View, {
        get src() {
          return data().backgroundImage;
        },
        width: 400,
        autosize: true,
        y: 0,
        x: 1800,
        mountX: 1
      }), createComponent(View, {
        x: 150,
        y: 200,
        width: 800,
        gap: 24,
        get style() {
          return styles.Column;
        },
        zIndex: 3,
        get children() {
          return [createComponent(Text, {
            contain: "width",
            fontFamily: "Roboto",
            get style() {
              return theme.typography.display2;
            },
            get children() {
              return data().name;
            }
          }), createComponent(Text, {
            contain: "both",
            get style() {
              return styles.peopleBio;
            },
            get children() {
              return data().biography;
            }
          })];
        }
      }), createComponent(View, {
        style: Backdrop
      }), createComponent(Column, {
        y: 670,
        x: 140,
        get style() {
          return styles.Column;
        },
        scroll: "none",
        get children() {
          return createComponent(Show, {
            get when() {
              return credits();
            },
            get children() {
              return [createComponent(Text, {
                skipFocus: true,
                get style() {
                  return styles.RowTitle;
                },
                children: "Credits"
              }), createComponent(TileRow, {
                autofocus: true,
                onEnter,
                get items() {
                  return credits();
                }
              })];
            }
          });
        }
      })];
    }
  });
};
export {
  People as default
};
//# sourceMappingURL=People-D9Qllfnv.js.map
