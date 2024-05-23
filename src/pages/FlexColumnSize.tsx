import {
  ElementNode,
  IntrinsicNodeStyleProps,
  Text,
  View,
  hexColor,
} from "@lightningjs/solid";
import { Column, Row } from "@lightningjs/solid-ui";
import { createSignal, onMount } from "solid-js";
import { setGlobalBackground } from "../state";

const FlexColumnPage = () => {
  const RowStyles = {
    display: "flex",
    justifyContent: "spaceEvenly",
    width: 1920,
    y: 100,
    height: 880,
    color: hexColor("00000000"),
  } satisfies IntrinsicNodeStyleProps;

  const ColumnStyles = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flexStart",
    color: hexColor("#4dabf5"),
    height: 850,
    width: 80,
  } satisfies IntrinsicNodeStyleProps;

  const rowTitle = {
    fontSize: 44,
    y: 20,
    x: 150,
  };

  function Block(props) {
    const styles = {
      width: randSize(),
      height: 80,
      x: 5,
      color: hexColor("#1769aa"),
    };

    return <View {...props} style={styles} />;
  }

  function randSize() {
    // size 10 to 70
    return Math.floor(Math.random() * 61) + 10;
  }

  const [columnY, setColumnY] = createSignal(50);
  function onFocus(this: ElementNode) {
    this.children.selected?.setFocus();
    setColumnY(150 + (this.y || 0) * -1);
  }

  onMount(() => {
    setGlobalBackground("#333333");
  });

  const gap = 50;

  return (
    <>
      <Text style={rowTitle}>
        Start, MarginTop, End, MarginBottom, Center, Between, Evenly
      </Text>
      <Row gap={gap} style={RowStyles} onFocus={onFocus}>
        <Column gap={30} style={ColumnStyles} alignItems="center">
          <Block autofocus />
          <Block />
          <Block />
          <Block />
          <Block />
        </Column>

        <Column
          gap={gap}
          style={ColumnStyles}
          onFocus={onFocus}
          alignItems="flexStart"
        >
          <Block marginTop={100} />
          <Block />
          <Block marginTop={100} />
          <Block />
          <Block />
        </Column>

        <Column
          gap={gap}
          alignItems="flexEnd"
          justifyContent={"flexEnd"}
          style={ColumnStyles}
          onFocus={onFocus}
        >
          <Block />
          <Block />
          <Block />
          <Block />
          <Block />
        </Column>

        <Column
          gap={gap}
          justifyContent={"flexEnd"}
          style={ColumnStyles}
          onFocus={onFocus}
        >
          <Block />
          <Block marginBottom={100} />
          <Block />
          <Block />
          <Block marginBottom={100} />
        </Column>

        <Column
          gap={gap}
          justifyContent={"center"}
          style={ColumnStyles}
          onFocus={onFocus}
        >
          <Block />
          <Block />
          <Block />
          <Block />
          <Block />
        </Column>

        <Column
          gap={gap}
          justifyContent={"spaceBetween"}
          style={ColumnStyles}
          onFocus={onFocus}
        >
          <Block />
          <Block />
          <Block />
          <Block />
          <Block />
        </Column>

        <Column
          gap={gap}
          justifyContent={"spaceEvenly"}
          style={ColumnStyles}
          onFocus={onFocus}
        >
          <Block />
          <Block />
          <Block />
          <Block />
          <Block />
        </Column>
      </Row>
    </>
  );
};

export default FlexColumnPage;
