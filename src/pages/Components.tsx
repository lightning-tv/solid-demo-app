import { Text, View, Dynamic } from "@lightningtv/solid";
import { Visible } from "@lightningtv/solid/primitives";
import { createSignal, For, onCleanup } from "solid-js";
import { setGlobalBackground } from "../state";
import { Button } from "../components";

// Define the Square component
function Square(props) {
  return (
    <View
      {...props}
      width={props.size || 80}
      height={props.size || 80}
      color={props.color || "#e0e0e0"}
    />
  );
}

// Define the Card component, which nests a Square
function Card(props) {
  return (
    <View
      {...props}
      width={props.size === "large" ? 400 : 200}
      height={props.size === "large" ? 500 : 300}
      transition={true}
      color="#0891b2"
    >
      <Square x={80} y={80} />
      <Square x={20} y={20} size={40} />
    </View>
  );
}

const PositioningPage = () => {
  setGlobalBackground("#1e293b");

  const [x, setX] = createSignal(100);
  const [size, setSize] = createSignal(true);

  const [dynamicComponents] = createSignal([Square, Card, Square]);

  const interval = setInterval(() => {
    setX((x) => (x === 100 ? 250 : 100));
    setSize((size) => !size);
  }, 2000);

  onCleanup(() => clearInterval(interval));

  return (
    <View x={150} autofocus>
      {/* Simple square components with different sizes */}
      <Visible when={size()}>
        <Square
          onDestroy={() => console.log("destroyed")}
          x={100}
          y={100}
          size={50}
          color="#ef4444"
        />
        <Square x={100} y={200} size={100} color="#22c55e" />
        <Square x={100} y={350} size={200} color="#3b82f6" />
      </Visible>

      {/* Reactive square with animated x position */}
      <Square
        x={x()}
        y={600}
        size={50}
        transition={{ x: { duration: 1000, easing: "linear" } }}
      />

      {/* Card components */}
      <Card x={500} y={100} size={size() ? "large" : "small"} />
      <Card x={500} y={500} size={size() ? "small" : "large"} />

      {/* Dynamic components */}
      <View x={1000} y={100}>
        <Text>Dynamic Components</Text>
        <Dynamic component={Button} y={50} width={300} children="Button" />
        <For each={dynamicComponents()}>
          {(Component, index) => (
            <Dynamic
              component={Component}
              x={205 * index()}
              y={300}
              size={50}
            />
          )}
        </For>
      </View>
    </View>
  );
};

export default PositioningPage;
