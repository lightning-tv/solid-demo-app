;
(function () {
  System.register(['./index-legacy-BrGESeG6.js'], function (exports, module) {
    'use strict';

    var onMount, setGlobalBackground, createComponent, LazyColumn, TitleRow, styles;
    return {
      setters: [function (module) {
        onMount = module.o;
        setGlobalBackground = module.s;
        createComponent = module.c;
        LazyColumn = module.a2;
        TitleRow = module.a3;
        styles = module.D;
      }],
      execute: function execute() {
        var VirtualPage = exports("default", function (props) {
          onMount(function () {
            return setGlobalBackground(0x333333FF);
          });
          var scrolls = ["auto", "edge", "always"];
          return createComponent(LazyColumn, {
            y: 50,
            upCount: 3,
            bufferSize: 0,
            get each() {
              return props.data.rows.filter(function (item) {
                return item.type !== "Hero";
              });
            },
            id: "BrowseColumn",
            get autofocus() {
              return props.data.rows[0].items();
            },
            gap: 30,
            transition: {
              y: {
                duration: 300,
                easing: "ease-in-out"
              }
            },
            get style() {
              return styles.Column;
            },
            children: function children(row, index) {
              return createComponent(TitleRow, {
                get row() {
                  return row();
                },
                get scroll() {
                  return scrolls[index % 3];
                },
                get title() {
                  return scrolls[index % 3] + " " + (index >= 3 ? "wrap" : "");
                },
                height: 330,
                get items() {
                  return row().items();
                },
                wrap: index >= 3
              });
            }
          });
        });
      }
    };
  });
})();
