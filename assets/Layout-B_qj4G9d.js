import { s as setGlobalBackground, h as createComponent, V as View, B as Block, T as Text } from "./index-CDYBrYjd.js";
const LayoutPage = () => {
  setGlobalBackground(255);
  return createComponent(View, {
    x: 150,
    y: 10,
    width: 1e3,
    height: 1e3,
    border: {
      color: 4278190335,
      width: 5
    },
    get children() {
      return [createComponent(Block, {
        center: true,
        color: 4294902015
      }), createComponent(View, {
        x: 500,
        y: 140,
        display: "flex",
        alignItems: "center",
        height: 300,
        flexDirection: "row",
        gap: 20,
        border: {
          color: 4294967295,
          width: 5
        },
        get children() {
          return [createComponent(Block, {
            color: 4278190335
          }), createComponent(Block, {
            color: 16713983
          }), createComponent(Block, {
            color: 65535
          })];
        }
      }), createComponent(View, {
        x: 500,
        y: 100,
        width: 200,
        padding: 20,
        height: 36,
        border: {
          color: 4294967295,
          width: 5
        },
        get children() {
          return createComponent(Text, {
            contain: "both",
            textAlign: "left",
            lineHeight: 36,
            y: 3,
            fontSize: 28,
            children: "Hello World"
          });
        }
      }), createComponent(View, {
        display: "flex",
        flexDirection: "column",
        gap: 50,
        alignItems: "center",
        width: 460,
        y: 100,
        x: 20,
        border: {
          color: 16711935,
          width: 5
        },
        onLayout: (e) => e.height += 5,
        get children() {
          return [createComponent(View, {
            color: 65535,
            marginTop: 5,
            display: "flex",
            get children() {
              return createComponent(Text, {
                fontSize: 24,
                contain: "width",
                width: 450,
                children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu."
              });
            }
          }), createComponent(View, {
            color: 65535,
            display: "flex",
            get children() {
              return createComponent(Text, {
                fontSize: 24,
                contain: "width",
                width: 450,
                children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu."
              });
            }
          })];
        }
      })];
    }
  });
};
export {
  LayoutPage as default
};
