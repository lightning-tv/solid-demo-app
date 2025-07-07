;
(function () {
  System.register(['./index-legacy-CfYW3R4R.js'], function (exports, module) {
    'use strict';

    var setGlobalBackground, createComponent, Text, Block;
    return {
      setters: [function (module) {
        setGlobalBackground = module.s;
        createComponent = module.h;
        Text = module.T;
        Block = module.K;
      }],
      execute: function execute() {
        var KeyHandling = exports("default", function () {
          setGlobalBackground(0x333333FF);
          var myBlock;
          return [createComponent(Text, {
            x: 400,
            y: 200,
            contain: "both",
            width: 900,
            children: "Move the block with the arrow keys, enter to change color, enterHold to reset color. Open inspector to see console log messages. Use M to test release."
          }), createComponent(Block, {
            ref: function ref(r$) {
              var _ref$ = myBlock;
              typeof _ref$ === "function" ? _ref$(r$) : myBlock = r$;
            },
            autofocus: true,
            x: 1920 / 2 - 50,
            y: 1080 / 2 - 50,
            isBlack: false,
            color: 0x1212DFFF,
            onMenu: function onMenu() {
              return true;
            },
            onMenuRelease: function onMenuRelease() {
              console.log("menu release");
              return true;
            },
            onUp: function onUp() {
              return myBlock.y = Math.max(0, myBlock.y - 20);
            },
            onDown: function onDown() {
              console.log("down press");
              myBlock.y = Math.min(1080, myBlock.y + 20);
            },
            onDownRelease: function onDownRelease() {
              console.log("down release");
            },
            onRight: function onRight() {
              return myBlock.x = Math.min(1920, myBlock.x + 20);
            },
            onLeft: function onLeft() {
              myBlock.x = Math.max(200, myBlock.x - 20);
              return myBlock.x > 200;
            },
            onEnterRelease: function onEnterRelease() {
              console.log("enter release / up");
            },
            onEnterHold: function onEnterHold(e) {
              console.log("enter hold");
              myBlock.color = 0x1212DFFF;
            },
            onEnter: function onEnter() {
              console.log("enter down");
              myBlock.isBlack = !myBlock.isBlack;
              if (myBlock.isBlack) {
                myBlock.color = 0xFFFFFFFF;
              } else {
                myBlock.color = 0x000000FF;
              }
            }
          })];
        });
      }
    };
  });
})();
