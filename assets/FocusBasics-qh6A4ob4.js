import { s as setGlobalBackground, g as createEffect, i as on, w as activeElement, c as createComponent, V as View, K as Block, R as Row } from "./index-DkcqENzP.js";
const FocusPage = () => {
  setGlobalBackground(858993663);
  let rowContainer, myBlock, redBlock;
  createEffect(on(activeElement, (elm) => {
    console.log(elm);
  }, {
    defer: true
  }));
  return createComponent(View, {
    x: 250,
    y: 200,
    onUp: () => myBlock.setFocus(),
    get children() {
      return [createComponent(Block, {
        ref(r$) {
          var _ref$ = myBlock;
          typeof _ref$ === "function" ? _ref$(r$) : myBlock = r$;
        },
        color: 303226879,
        onDown: () => rowContainer.setFocus(),
        autofocus: true
      }), createComponent(Row, {
        y: 200,
        ref(r$) {
          var _ref$2 = rowContainer;
          typeof _ref$2 === "function" ? _ref$2(r$) : rowContainer = r$;
        },
        get children() {
          return [createComponent(Block, {
            ref(r$) {
              var _ref$3 = redBlock;
              typeof _ref$3 === "function" ? _ref$3(r$) : redBlock = r$;
            },
            color: 4278190335
          }), createComponent(Block, {
            color: 678303743
          }), createComponent(Block, {
            color: 471635967
          })];
        }
      })];
    }
  });
};
export {
  FocusPage as default
};
