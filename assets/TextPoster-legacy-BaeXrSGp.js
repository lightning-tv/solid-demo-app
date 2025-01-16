;
(function () {
  System.register(['./index-legacy-8BTrbbvE.js'], function (exports, module) {
    'use strict';

    var onMount, createComponent, View, Text, Row, setGlobalBackground;
    return {
      setters: [function (module) {
        onMount = module.g;
        createComponent = module.h;
        View = module.V;
        Text = module.T;
        Row = module.R;
        setGlobalBackground = module.s;
      }],
      execute: function execute() {
        var ButtonContainer = {
          display: "flex",
          color: 0xFFFFFFFF,
          alignItems: "center",
          padding: 32,
          gap: 8,
          height: 50,
          effects: {
            radius: {
              radius: 8
            },
            border: {
              width: 2,
              color: 0x000000CC
            }
          }
        };
        var CircleContainer = {
          height: 50,
          width: 50,
          color: 0xFFFFFFFF,
          effects: {
            radius: {
              radius: 50
            },
            border: {
              width: 2,
              color: 0x000000CC
            }
          }
        };
        var ButtonIcon = function ButtonIcon(props) {
          return createComponent(View, {
            style: ButtonContainer,
            get children() {
              return [createComponent(View, {
                get src() {
                  return props.icon;
                },
                width: 26,
                height: 26
              }), createComponent(Text, {
                fontSize: 28,
                lineHeight: 50,
                color: 0x000000FF,
                get children() {
                  return props.children;
                }
              })];
            }
          });
        };
        var Button = function Button(props) {
          return createComponent(View, {
            style: ButtonContainer,
            get children() {
              return createComponent(Text, {
                fontSize: 28,
                lineHeight: 50,
                color: 0x000000FF,
                get children() {
                  return props.children;
                }
              });
            }
          });
        };
        var CircleIcon = function CircleIcon(props) {
          return createComponent(View, {
            style: CircleContainer,
            get children() {
              return createComponent(View, {
                x: 25,
                y: 25,
                mount: 0.5,
                get src() {
                  return props.icon;
                },
                width: 30,
                height: 30
              });
            }
          });
        };
        var TextPosterPage = exports("default", function () {
          var styles = {
            detailPane: {
              x: 150,
              y: 63,
              width: 1326,
              height: 954,
              border: {
                color: 0x535353FF,
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
              color: 0xF0CB00FF,
              fontSize: 22,
              fontWeight: "bold"
            },
            detailDescriptionText: {
              width: 602,
              fontSize: 22
            }
          };
          onMount(function () {
            setGlobalBackground(0x000000FF);
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
                  }), createComponent(Row, {
                    gap: 20,
                    autofocus: true,
                    get children() {
                      return [createComponent(ButtonIcon, {
                        icon: "./assets/playIcon.png",
                        children: "Play"
                      }), createComponent(Button, {
                        children: "More Info"
                      }), createComponent(CircleIcon, {
                        icon: "./assets/thumbsUp.png"
                      }), createComponent(CircleIcon, {
                        icon: "./assets/thumbsDown.png"
                      })];
                    }
                  })];
                }
              })];
            }
          });
        });
      }
    };
  });
})();