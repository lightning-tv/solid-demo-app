import {
  ElementNode,
  IntrinsicNodeStyleProps,
  Text,
  View
} from "@lightningtv/solid";
import { Column, Row } from "@lightningtv/solid/primitives";
import { createSignal, onMount } from "solid-js";
import styles from "../styles";
import { setGlobalBackground } from "../state";

const FlexGrow = () => {
  const RowStyles = {
    display: "flex",
    justifyContent: "flexStart",
    width: 1600,
    height: 110,
    color: "#FFF"
  } satisfies IntrinsicNodeStyleProps;

  const rowTitle = {
    fontSize: 44,
    marginTop: 25,
    marginBottom: -20,
    skipFocus: true
  };

  const red = "#ff0000ff";
  const darkorange = "#ff8c00ff";
  const green = "#00ff00ff";

  function Block(props) {
    const styles = {
      width: props.flexGrow ? 0 : 200, // Allow flexible width if flexGrow exists
      height: 100,
      y: 5
    };

    return <View {...props} style={styles} />;
  }

  const [columnY, setColumnY] = createSignal(50);
  function onFocus(this: ElementNode) {
    this.children[this.selected || 0].setFocus();
    setColumnY(150 + (this.y || 0) * -1);
  }

  onMount(() => {
    setGlobalBackground("#333333");
  });

  const gap = 50;

  return (
    <>
      <Column
        x={160}
        y={columnY()}
        gap={30}
        height={850}
        width={RowStyles.width}
        style={styles.Column}
      >
        <Text style={rowTitle}>Flex Start RTL</Text>
        <Row gap={gap} direction={"rtl"} style={RowStyles} onFocus={onFocus}>
          <Block flexGrow={1} autofocus color={red} />
          <Block flexGrow={2} color={darkorange} />
          <Block color={green} />
        </Row>

        <Text style={rowTitle}>Flex End with Flex Grow</Text>
        <Row gap={gap} style={RowStyles} onFocus={onFocus}>
          <Block color={green} />
          <Block flexGrow={1} color={red} />
          <Block flexGrow={2} color={darkorange} />
        </Row>

        <Text style={rowTitle}>Space Between with Flex Grow</Text>
        <Row
          gap={gap}
          justifyContent={"spaceBetween"}
          style={RowStyles}
          onFocus={onFocus}
        >
          <Block flexGrow={1} color={red} />
          <Block flexGrow={1} flexOrder={-1} color={darkorange} />
          <Block flexGrow={2} color={green} />
        </Row>
      </Column>
    </>
  );
};

export default FlexGrow;
