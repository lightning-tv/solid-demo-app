import { createSignal, createSelector, For } from "solid-js";
import { ElementNode, View, Text } from "@lightningjs/solid";
import { Column, Row } from "@lightningjs/solid-ui";
import { useNavigate } from "@solidjs/router";
import styles from "../styles";
import { assertTruthy } from "@lightningjs/renderer/utils";

const Portal = () => {
  const navigate = useNavigate();
  const isFirst = createSelector(() => {
    return 0;
  });

  function onEnter(this: ElementNode) {
    let entity = this.children.selected;
    assertTruthy(entity && entity.id);
    navigate("/" + entity.id);
  }

  const flexDemos = [
    {
      title: "Flex Row",
      id: "flex",
      description: "Flex Row Implementation",
    },
    {
      title: "Flex Column",
      id: "flexcolumn",
      description: "Flex Column Implementation",
    },
    {
      title: "Flex Row Vertical Align",
      id: "flexsize",
      description: "Flex Row Vertical Align Implementation",
    },
    {
      title: "Flex Column Vertical Align",
      id: "flexcolumnsize",
      description: "Flex Column Vertical Align Implementation",
    },
    {
      title: "Flex Layout Tests",
      id: "superflex",
      description: "Complicated flex layouts",
    },
  ];

  const demos = [
    {
      title: "Grid",
      id: "grid",
      description: "Infinite Scroll Grid",
    },
    {
      title: "Buttons",
      id: "buttons",
      description: "Demo a few buttons",
    },
    {
      title: "Text",
      id: "text",
      description: "Text layout with flexbox",
    },
    {
      title: "Create Elements",
      id: "create",
      description: "Testing Show + children + inserting text",
    },
    {
      title: "Viewport",
      id: "viewport",
      description: "Events going in and out of viewport",
    },
  ];

  function DemoTile(props) {
    const Container = {
      width: 370,
      height: 320,
      borderRadius: 6,
      scale: 1,
      color: 0x182b44ff,
      transition: { color: true, scale: true },
      focus: {
        scale: 1.1,
        color: 0xffffffff,
      },
    };
    const [color, setColor] = createSignal(0xffffffff);

    return (
      <View
        {...props}
        onFocus={() => setColor(0x000000ff)}
        onBlur={() => setColor(0xffffffff)}
        style={Container}
      >
        <View x={30}>
          <Text y={30} fontSize={84} color={color()}>
            {props.index}
          </Text>
          <Text
            y={140}
            fontSize={42}
            width={340}
            height={42}
            contain="both"
            color={color()}
          >
            {props.title}
          </Text>
          <Text
            y={200}
            fontSize={28}
            width={330}
            contain="width"
            color={color()}
          >
            {props.description}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View colorTop={0x446b9eff} colorBottom={0x2c4f7cff}>
      <View x={120}>
        <View src="./assets/solidjs.png" width={101} height={90} y={40} />
        <Text fontSize={90} x={110} y={40}>
          Examples
        </Text>
        <View y={140} height={1} width={1800} color={0xe8d7f9ff} />
      </View>
      <Column scroll="none" y={200} x={170} gap={80}>
        <Row
          onEnter={onEnter}
          style={styles.Row}
          justifyContent={"flexStart"}
          gap={40}
        >
          <For each={demos}>
            {(demo, i) => (
              <DemoTile autofocus={isFirst(i())} index={i()} {...demo} />
            )}
          </For>
        </Row>

        <Row
          onEnter={onEnter}
          style={styles.Row}
          justifyContent={"flexStart"}
          gap={40}
        >
          <For each={flexDemos}>
            {(demo, i) => <DemoTile index={i()} {...demo} />}
          </For>
        </Row>
      </Column>
    </View>
  );
};

export default Portal;
