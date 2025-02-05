import { j as hexColor, h as createComponent, R as Row, V as View, m as mergeProps, T as Text, M as MaterialButtonText } from "./index-DU4QJroE.js";
const MaterialButtonsPage = () => {
  function onEnter(event, elm) {
    this.states.toggle("disabled");
  }
  const RowStyles = {
    display: "flex",
    justifyContent: "flexStart",
    width: 1500,
    height: 300,
    color: hexColor("00000000"),
    gap: 26,
    y: 400,
    x: 100
  };
  const MaterialButton = {
    width: 386,
    height: 136,
    color: "0x715cabff",
    $focus: {
      color: "0x5a39a2ff"
    },
    disabled: {
      color: "0x291d43ff"
    }
  };
  const RoundedRectangle = ["RoundedRectangle", {
    radius: 65
  }];
  function Button(props) {
    return createComponent(View, mergeProps(props, {
      forwardStates: true,
      style: MaterialButton,
      shader: RoundedRectangle,
      get children() {
        return createComponent(Text, {
          style: MaterialButtonText,
          get children() {
            return props.children;
          }
        });
      }
    }));
  }
  return createComponent(Row, {
    style: RowStyles,
    get children() {
      return [createComponent(Button, {
        autofocus: true,
        onEnter,
        children: "Focused"
      }), createComponent(Button, {
        states: {
          active: true,
          disabled: false
        },
        children: "Normal"
      }), createComponent(Button, {
        states: "disabled",
        children: "Disabled"
      })];
    }
  });
};
export {
  MaterialButtonsPage as default
};
