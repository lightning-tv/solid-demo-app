import { View, Text, For } from "@lightningjs/solid";
import { Column, Row } from "@lightningjs/solid-ui";
import { Show, createSignal } from "solid-js";

const Items = [
  "Mary",
  "had",
  "a",
  "little",
  "lamb",
  "her",
  "fleece",
  "was",
  "white",
  "as",
  "snow",
];
export const styles = {
  PageContainer: {
    width: 1920,
    height: 1080,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 99,
  },
} as const;

export default () => {
  const [lazyShow, setLazyShow] = createSignal(false);
  let PageLoader;

  setTimeout(() => {
    setLazyShow(true);
    PageLoader.alpha = 0;
  }, 2000);

  return (
    <>
      <View ref={PageLoader} style={styles.PageContainer}>
        <Text>Center - gif doesnt animate</Text>
        <View autosize src="./assets/spinner.gif" />
        <Text>Spinner</Text>
      </View>
      <Row
        scroll="always"
        gap={20}
        selected={2}
        autofocus
        x={150}
        y={50}
        transition={{ x: { duration: 350 } }}
      >
        <For each={Items}>
          {(item, index) => (
            <View
              width={100}
              height={200}
              style={{ color: 0xff0000ff, focus: { color: 0xffffffff } }}
            />
          )}
        </For>
      </Row>

      <Show when={lazyShow()}>
        <Row
          scroll="none"
          gap={20}
          selected={2}
          autofocus
          x={150}
          y={350}
          transition={{ x: { duration: 350 } }}
        >
          <For each={Items}>
            {(item, index) => (
              <View
                width={100}
                height={200}
                style={{ color: 0xff0000ff, focus: { color: 0xffffffff } }}
              />
            )}
          </For>
        </Row>
      </Show>

      <Show when={lazyShow()}>
        <Row
          scroll="none"
          gap={20}
          selected={2}
          x={150}
          y={650}
          transition={{ x: { duration: 350 } }}
        >
          <For each={Items}>
            {(item, index) => <Text fontSize={24}>{item}</Text>}
          </For>
        </Row>
      </Show>

      <Show when={lazyShow()}>
        <Column scroll="none" gap={20} selected={2} x={350} y={450}>
          <For each={Items}>
            {(item, index) => <Text fontSize={24}>{item}</Text>}
          </For>
        </Column>
      </Show>
    </>
  );
};
