import { h as createComponent, m as mergeProps, T as Text, l as combineStyles, U as styles, V as View } from "./index-nPRVyzNv.js";
const Button = (props) => {
  return createComponent(ButtonContainer, mergeProps(props, {
    get color() {
      return props.backgroundColor;
    },
    get itemSpacing() {
      return props.contentSpacing;
    },
    alignItems: "center",
    forwardStates: true,
    get children() {
      return createComponent(Text, {
        get color() {
          return props.textColor;
        },
        get contain() {
          var _a;
          return (_a = props.contain) != null ? _a : "width";
        },
        get textAlign() {
          return props.textAlign;
        },
        get style() {
          var _a;
          return combineStyles(
            styles.Text.tones[(_a = props.tone) != null ? _a : styles.tone],
            //
            styles.Text.base
          );
        },
        get children() {
          return props.children;
        }
      });
    }
  }));
};
const ButtonContainer = (props) => {
  return createComponent(View, mergeProps(props, {
    get color() {
      return props.backgroundColor;
    },
    get justifyContent() {
      return props.justify;
    },
    get itemSpacing() {
      return props.contentSpacing;
    },
    get style() {
      var _a, _b;
      return combineStyles(
        props.style,
        //
        (_b = styles.Container.tones) == null ? void 0 : _b[(_a = props.tone) != null ? _a : styles.tone]
      );
    },
    forwardStates: true
  }));
};
export {
  Button as B,
  ButtonContainer as a
};