import { q as createMemo, r as styles, h as createComponent, m as mergeProps, T as Text, V as View, R as Row } from "./index-BvvzSHHn.js";
import { B as Button } from "./Button-CsgM-Hfs.js";
const BadgeContainer = (props) => {
  return createComponent(View, mergeProps(props, {
    get color() {
      return props.backgroundColor;
    },
    get borderRadius() {
      return props.radius;
    },
    get style() {
      var _a;
      return [
        props.style,
        //
        styles.Container.tones[(_a = props.tone) != null ? _a : styles.tone],
        styles.Container.base
      ];
    },
    forwardStates: true
  }));
};
const Badge = (props) => {
  const tone = createMemo(() => {
    var _a;
    return (_a = props.tone) != null ? _a : styles.tone;
  });
  const baseBorderStyle = styles.Container.base.border;
  return createComponent(BadgeContainer, mergeProps(props, {
    get height() {
      return props.height || styles.Text.base.lineHeight;
    },
    get tone() {
      return tone();
    },
    get style() {
      return props.style;
    },
    get children() {
      return createComponent(Text, {
        get color() {
          return props.textColor;
        },
        get lineHeight() {
          return (props.height || styles.Text.base.lineHeight) + baseBorderStyle.width;
        },
        get style() {
          return [
            styles.Text.tones[tone()],
            //
            styles.Text.base
          ];
        },
        get children() {
          return props.title;
        }
      });
    }
  }));
};
const ButtonsPage = () => {
  function onEnter(event, elm) {
    this.states.toggle("disabled");
  }
  const RowStyles = {
    display: "flex",
    justifyContent: "flexStart",
    width: 1500,
    height: 300,
    color: 0,
    gap: 26,
    y: 400
  };
  return [createComponent(Row, {
    x: 100,
    y: 200,
    gap: 5,
    style: RowStyles,
    get children() {
      return [createComponent(Badge, {
        children: "HD"
      }), createComponent(Badge, {
        children: "PG13"
      }), createComponent(Badge, {
        children: "NC17"
      }), createComponent(Text, {
        fontSize: 30,
        children: "I like bananas"
      }), createComponent(Badge, {
        children: "DOLBY"
      })];
    }
  }), createComponent(Row, {
    x: 100,
    gap: 40,
    style: RowStyles,
    get children() {
      return [createComponent(Button, {
        autofocus: true,
        onEnter,
        children: "TV Shows"
      }), createComponent(Button, {
        states: {
          active: true,
          disabled: false
        },
        children: "Movies"
      }), createComponent(Button, {
        states: "active",
        children: "Sports"
      }), createComponent(Button, {
        states: "disabled",
        children: "News"
      })];
    }
  })];
};
export {
  ButtonsPage as default
};
