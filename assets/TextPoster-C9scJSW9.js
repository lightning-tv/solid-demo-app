import { g as onMount, h as createComponent, V as View, T as Text, s as setGlobalBackground } from "./index-Cwp1Y-pO.js";
const TextPosterPage = () => {
  const styles = {
    detailPane: {
      x: 150,
      y: 63,
      width: 1326,
      height: 954,
      border: {
        color: 1397969919,
        width: 1
      },
      borderRadius: 15,
      linearGradient: {
        colors: [740965375, 976766975, 1279810047],
        angle: 4.1
      }
    },
    detailTitle: {
      x: 50,
      y: 27,
      fontSize: 30,
      fontWeight: "bold"
    },
    detailImage: {
      width: 570,
      height: 839,
      x: 50,
      y: 80,
      borderRadius: 15
    },
    detailDescriptionPane: {
      x: 679,
      y: 80,
      width: 602,
      height: 839,
      display: "flex",
      flexDirection: "column",
      gap: 30
    },
    detailDescription: {
      width: 602,
      display: "flex"
    },
    detailDescriptionTitle: {
      width: 602,
      color: 4039835903,
      fontSize: 22,
      fontWeight: "bold"
    },
    detailDescriptionText: {
      width: 602,
      fontSize: 22
    }
  };
  onMount(() => {
    setGlobalBackground(255);
  });
  return createComponent(View, {
    get style() {
      return styles.detailPane;
    },
    get children() {
      return [createComponent(Text, {
        get style() {
          return styles.detailTitle;
        },
        children: "Movie Name"
      }), createComponent(View, {
        get style() {
          return styles.detailImage;
        },
        src: "https://placehold.co/400x600.png"
      }), createComponent(View, {
        get style() {
          return styles.detailDescriptionPane;
        },
        get children() {
          return [createComponent(View, {
            get style() {
              return styles.detailDescription;
            },
            get children() {
              return [createComponent(Text, {
                get style() {
                  return styles.detailDescriptionTitle;
                },
                children: "Release Date :"
              }), createComponent(Text, {
                get style() {
                  return styles.detailDescriptionText;
                },
                children: "10/10/2022"
              })];
            }
          }), createComponent(View, {
            get style() {
              return styles.detailDescription;
            },
            get children() {
              return [createComponent(Text, {
                get style() {
                  return styles.detailDescriptionTitle;
                },
                children: "Genre :"
              }), createComponent(Text, {
                get style() {
                  return styles.detailDescriptionText;
                },
                children: " Action"
              })];
            }
          }), createComponent(Text, {
            get style() {
              return styles.detailDescriptionTitle;
            },
            children: "Plot :"
          }), createComponent(Text, {
            get style() {
              return styles.detailDescriptionText;
            },
            contain: "both",
            maxLines: 10,
            marginTop: -20,
            height: 400,
            overflowSuffix: "...",
            children: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata Cast : Tom cruise, ma3ti benabdelkader, oussama ramzi"
          })];
        }
      })];
    }
  });
};
export {
  TextPosterPage as default
};
