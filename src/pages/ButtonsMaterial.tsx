import {
  ElementNode,
  IntrinsicNodeStyleProps,
  Text,
  View,
  hexColor,
} from "@lightningjs/solid";
import { Row } from "@lightningjs/solid-ui";

import { MaterialButtonText } from "../styles";

const MaterialButtonsPage = () => {
  function onEnter(this: ElementNode, event, elm) {
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
    x: 100,
  } satisfies IntrinsicNodeStyleProps;

  const MaterialButton = {
    width: 386,
    height: 136,
    color: "0x715cabff",
    focus: {
      color: "0x5a39a2ff",
    },
    disabled: {
      color: "0x291d43ff",
    },
  };
  const RoundedRectangle = ["RoundedRectangle", { radius: 65 }];
  function Button(props) {
    return (
      <View
        {...props}
        forwardStates
        style={MaterialButton}
        shader={RoundedRectangle}
      >
        <Text style={MaterialButtonText}>{props.children}</Text>
      </View>
    );
  }

  return (
    <Row style={RowStyles}>
      <Button autofocus onEnter={onEnter}>
        Focused
      </Button>
      <Button states={{ active: true, disabled: false }}>Normal</Button>
      <Button states="disabled">Disabled</Button>
    </Row>
  );
};

export default MaterialButtonsPage;
