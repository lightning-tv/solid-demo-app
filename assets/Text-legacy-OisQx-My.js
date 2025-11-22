;
(function () {
  System.register(['./index-legacy-DMdkGOpW.js'], function (exports, module) {
    'use strict';

    var hexColor, onMount, setGlobalBackground, createComponent, View, Text;
    return {
      setters: [function (module) {
        hexColor = module.h;
        onMount = module.o;
        setGlobalBackground = module.s;
        createComponent = module.c;
        View = module.V;
        Text = module.T;
      }],
      execute: function execute() {
        var TextPage = exports("default", function () {
          var OverviewContainer = {
            width: 900,
            height: 500,
            y: 350,
            x: 150,
            gap: 25,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flexStart",
            color: hexColor("00000000")
          };
          var SublineContainer = {
            width: 900,
            gap: 6,
            display: "flex",
            flexDirection: "row",
            justifyContent: "flexStart",
            color: 0x00000000
          };
          var Title = {
            fontSize: 42,
            fontWeight: "bold"
          };
          var SubTitle = {
            fontSize: 38,
            fontWeight: 500
          };
          var Overview = {
            width: OverviewContainer.width,
            fontSize: 26,
            fontWeight: "normal",
            contain: "width"
          };
          var Subline = {
            fontSize: 26,
            fontWeight: 100
          };
          onMount(function () {
            setGlobalBackground(0x000000FF);
          });
          return [createComponent(View, {
            autofocus: true,
            style: OverviewContainer,
            get children() {
              return [createComponent(Text, {
                style: Title,
                children: "Title of the Page"
              }), createComponent(Text, {
                style: SubTitle,
                children: "Tag line for the page"
              }), createComponent(Text, {
                style: Overview,
                children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel tempor tellus. Sed eu leo purus. Vestibulum sollicitudin eget tellus a varius. Phasellus est turpis, volutpat sed blandit sit amet, rutrum sit amet mauris. In dignissim elit orci, a sollicitudin ipsum faucibus et. Quisque vel quam rutrum, faucibus augue sed, scelerisque nunc."
              }), createComponent(View, {
                style: SublineContainer,
                get children() {
                  return [createComponent(Text, {
                    style: Subline,
                    children: "Subline Text"
                  }), createComponent(View, {
                    width: 28,
                    height: 28,
                    src: "./assets/rt-popcorn.png"
                  }), createComponent(Text, {
                    style: Subline,
                    children: "More Text"
                  })];
                }
              })];
            }
          }), createComponent(View, {
            width: 600,
            display: "flex",
            gap: 20,
            height: 42,
            y: 200,
            x: 150,
            get children() {
              return [createComponent(Text, {
                style: Title,
                children: "Flex Grow"
              }), createComponent(View, {
                flexGrow: 1,
                height: 4,
                y: 19,
                color: 0xFF3000FF
              }), createComponent(View, {
                flexGrow: 3,
                height: 4,
                y: 19,
                color: 0xFF30FFFF
              }), createComponent(View, {
                flexGrow: 1,
                height: 4,
                y: 19,
                color: 0xEEBA2CFF
              })];
            }
          })];
        });
      }
    };
  });
})();
