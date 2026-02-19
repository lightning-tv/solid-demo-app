import { View, Text } from "@lightningtv/solid";
import { Column, Row } from "@lightningtv/solid/primitives";
import { createSignal, For } from "solid-js";

const Card = (props: { index: number }) => {
  const [focused, setFocused] = createSignal(false);

  return (
    <View
      width={180}
      height={100}
      color={focused() ? "#33333399" : "#333333ff"}
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={10}
      padding={10}
      onFocusChanged={setFocused}
    >
      <Text fontSize={20} color="#ffffffff">
        Item {String(props.index)}
      </Text>
      <View color="#0000ffff" padding={8} borderRadius={4} height={40} display="flex" alignItems="center">
        <Text fontSize={16} color="#ffffffff">
          Button
        </Text>
      </View>
    </View>
  );
};

export default function ComplexFlex() {
  const items = Array.from({ length: 8 }).map((_, i) => i);

  return (
    <Column
      width={1720}
      color="#000000ff"
      display="flex"
      flexDirection="column"
      height={100}
      gap={20}
      y={50}
      x={170}
      autofocus
      scroll="none"
      selected={1}
    >
      <Text skipFocus fontSize={40} color="#ffffffff" marginBottom={20}>
        Complex Flex Layout
      </Text>
      <Row width={1400} gap={20} scroll="none">
        <For each={items}>{(item) => <Card index={item} />}</For>
      </Row>
      <Row width={1400} gap={20} scroll="none">
        <For each={items}>{(item) => <Card index={item} />}</For>
      </Row>
      <Row width={1400} gap={20} scroll="none">
        <For each={items}>{(item) => <Card index={item} />}</For>
      </Row>
      <Row width={1400} gap={20} scroll="none">
        <For each={items}>{(item) => <Card index={item} />}</For>
      </Row>
      <Row width={1400} gap={20} scroll="none">
        <For each={items}>{(item) => <Card index={item} />}</For>
      </Row>
      <Row width={1400} gap={20} scroll="none">
        <For each={items}>{(item) => <Card index={item} />}</For>
      </Row>
      <Row width={1400} gap={20} scroll="none">
        <For each={items}>{(item) => <Card index={item} />}</For>
      </Row>
    </Column>
  );
}
