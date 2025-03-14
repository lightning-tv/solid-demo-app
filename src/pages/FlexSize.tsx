import {
  ElementNode,
  IntrinsicNodeStyleProps,
  Text,
  View,
  hexColor
} from "@lightningtv/solid";
import { Column, Row } from "@lightningtv/solid/primitives";
import { createSignal, onMount } from "solid-js";
import styles from "../styles";
import { setGlobalBackground } from "../state";

const FlexSizePage = () => {
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

  function randSize() {
    // size 21 to 100
    return Math.floor(Math.random() * 91) + 10;
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
        <Text style={rowTitle}>Flex Start - AlignItems: center</Text>
        <Row alignItems="center" gap={gap} style={RowStyles} onFocus={onFocus}>
          <Block autofocus height={randSize()} />
          <Block height={randSize()} />
          <Block height={randSize()} />
          <Block height={randSize()} />
          <Block height={randSize()} />
        </Row>
        <Text style={rowTitle}>
          Flex Start - Margin Left - AlignItems: flexStart
        </Text>
        <Row
          gap={gap}
          alignItems="flexStart"
          style={RowStyles}
          onFocus={onFocus}
        >
          <Block marginLeft={100} height={randSize()} />
          <Block height={randSize()} />
          <Block marginLeft={100} height={randSize()} />
          <Block height={randSize()} />
          <Block height={randSize()} />
        </Row>
        <Text style={rowTitle}>Flex End - AlignItems: flexEnd</Text>
        <Row
          gap={gap}
          justifyContent="flexEnd"
          alignItems="flexEnd"
          style={RowStyles}
          onFocus={onFocus}
        >
          <Block height={randSize()} />
          <Block height={randSize()} />
          <Block height={randSize()} />
          <Block height={randSize()} />
          <Block height={randSize()} />
        </Row>

        <Text style={rowTitle}>Flex End - Margin Right</Text>
        <Row
          gap={gap}
          justifyContent={"flexEnd"}
          style={RowStyles}
          onFocus={onFocus}
        >
          <Block height={randSize()} />
          <Block marginRight={100} height={randSize()} />
          <Block height={randSize()} />
          <Block height={randSize()} />
          <Block marginRight={100} height={randSize()} />
        </Row>

        <Text style={rowTitle}>Center - No Margin Support</Text>
        <Row
          gap={gap}
          justifyContent={"center"}
          style={RowStyles}
          onFocus={onFocus}
        >
          <Block height={randSize()} />
          <Block height={randSize()} />
          <Block height={randSize()} />
          <Block height={randSize()} />
          <Block height={randSize()} />
        </Row>

        <Text style={rowTitle}>Space Between - No Margin Support</Text>
        <Row
          gap={gap}
          justifyContent={"spaceBetween"}
          style={RowStyles}
          onFocus={onFocus}
        >
          <Block height={randSize()} />
          <Block height={randSize()} />
          <Block height={randSize()} />
          <Block height={randSize()} />
          <Block height={randSize()} />
        </Row>

        <Text style={rowTitle}>Space Evenly - No Margin Support</Text>
        <Row
          gap={gap}
          justifyContent={"spaceEvenly"}
          style={RowStyles}
          onFocus={onFocus}
        >
          <Block height={randSize()} />
          <Block height={randSize()} />
          <Block height={randSize()} />
          <Block height={randSize()} />
          <Block height={randSize()} />
        </Row>
      </Column>
    </>
  );
};

export default FlexSizePage;
