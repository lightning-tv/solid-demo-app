import { ElementNode, Text, View, hexColor } from "@lightningtv/solid";
import { Column, Row } from "@lightningtv/solid/primitives";
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
  } as const;

  const ColumnStyles = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flexStart",
    //flexBoundary: "fixed",
    color: "#4dabf5",
    height: 850,
    width: 60,
  } as const;

  const rowTitle = {
    fontSize: 44,
    y: 20,
    x: 150,
  };

  function Block(props) {
    const styles = {
      width: 50,
      height: 80,
      x: 5,
      color: "#1769aa",
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
      <Text style={rowTitle}>
        Start, MarginTop, End, MarginBottom, Center, Between, Evenly
      </Text>
      <Row gap={gap} style={RowStyles} onFocus={onFocus}>
        <Column gap={30} style={ColumnStyles}>
          <Block autofocus />
          <Block />
          <Block />
          <Block />
          <Block />
        </Column>

        <Column gap={gap} style={ColumnStyles} onFocus={onFocus}>
          <Block marginTop={100} />
          <Block />
          <Block marginTop={100} />
          <Block />
          <Block />
        </Column>

        <Column
          gap={gap}
          justifyContent={"flexEnd"}
          style={ColumnStyles}
          debug
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
