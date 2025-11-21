import { s as setGlobalBackground, c as createComponent, V as View, C as Column, m as mergeProps, T as Text } from "./index-CavVauna.js";
const Box = (props) => {
  return createComponent(View, mergeProps(props, {
    height: 100,
    color: 4278255615,
    get children() {
      return createComponent(Text, {
        children: "Text element"
      });
    }
  }));
};
const FlexMenu = () => {
  setGlobalBackground(255);
  return createComponent(View, {
    right: 0,
    display: "flex",
    width: 400,
    flexBoundary: "fixed",
    color: 4294901856,
    flexDirection: "column",
    get children() {
      return createComponent(Column, {
        x: 50,
        width: 300,
        autofocus: true,
        get children() {
          return [createComponent(Box, {
            marginTop: 50
          }), createComponent(Column, {
            flexItem: false,
            justifyContent: "flexEnd",
            get children() {
              return [createComponent(Box, {
                flexOrder: 1
              }), createComponent(Box, {
                flexOrder: 2,
                marginBottom: 50
              })];
            }
          })];
        }
      });
    }
  });
};
export {
  FlexMenu,
  FlexMenu as default
};
