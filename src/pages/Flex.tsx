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

const FlexPage = () => {
  const RowStyles = {
    display: "flex",
    justifyContent: "flexStart",
    width: 1600,
    height: 110,
    color: "#4dabf5"
  } satisfies IntrinsicNodeStyleProps;

  const rowTitle = {
    fontSize: 44,
    marginTop: 25,
    marginBottom: -20,
    skipFocus: true
  };

  function Block(props) {
    const styles = {
      width: 200,
      height: 100,
      y: 5,
      color: 0x1769aaff
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
        <Text style={rowTitle}>Flex Start</Text>
        <Row gap={gap} style={RowStyles} onFocus={onFocus}>
          <Block autofocus />
          <Block />
          <Block />
          <Block />
          <Block />
        </Row>
        <Text style={rowTitle}>Flex Start - Margin Left</Text>
        <Row gap={gap} style={RowStyles} onFocus={onFocus}>
          <Block marginLeft={100} />
          <Block />
          <Block marginLeft={100} />
          <Block />
          <Block />
        </Row>
        <Text style={rowTitle}>Flex End</Text>
        <Row
          gap={gap}
          justifyContent={"flexEnd"}
          style={RowStyles}
          onFocus={onFocus}
        >
          <Block />
          <Block />
          <Block />
          <Block />
          <Block />
        </Row>

        <Text style={rowTitle}>Flex End - Margin Right</Text>
        <Row
          gap={gap}
          justifyContent={"flexEnd"}
          style={RowStyles}
          onFocus={onFocus}
        >
          <Block />
          <Block marginRight={100} />
          <Block />
          <Block />
          <Block marginRight={100} />
        </Row>

        <Text style={rowTitle}>Center</Text>
        <Row
          gap={gap}
          justifyContent={"center"}
          style={RowStyles}
          onFocus={onFocus}
        >
          <Block />
          <Block marginLeft={80} />
          <Block />
          <Block marginLeft={80} />
          <Block />
        </Row>

        <Text style={rowTitle}>Space Between</Text>
        <Row
          gap={gap}
          justifyContent={"spaceBetween"}
          style={RowStyles}
          onFocus={onFocus}
        >
          <Block />
          <Block />
          <Block />
          <Block />
          <Block marginRight={40} />
        </Row>

        <Text style={rowTitle}>Space Evenly</Text>
        <Row
          gap={gap}
          justifyContent={"spaceEvenly"}
          style={RowStyles}
          onFocus={onFocus}
        >
          <Block />
          <Block />
          <Block marginLeft={80} />
          <Block />
          <Block />
        </Row>

        <Text style={rowTitle}>Flex Wrap</Text>
        <Row
          gap={gap}
          justifyContent={"flexStart"}
          flexWrap={"wrap"}
          alignItems="center"
          style={RowStyles}
          onFocus={onFocus}
        >
          <Block width={300} />
          <Block width={300} />
          <Block width={300} alignSelf="flexStart" />
          <Block width={300} />
          <Block width={300} />
          <Block width={300} alignSelf="flexEnd" />
          <Block width={300} />
        </Row>
      </Column>
    </>
  );
};

export default FlexPage;
