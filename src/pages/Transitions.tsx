import { Text, View } from "@lightningtv/solid";
import { createSignal, onCleanup } from "solid-js";
import { setGlobalBackground } from "../state";

const Default = () => {
  setGlobalBackground("#1e293b");

  // this would be easier with a store, but then it wouldn't work pre-proxy
  const [y, setY] = createSignal(50);

  setTimeout(() => {
    setY(1080 - 50 - 200);
  }, 1750);

  function onStart() {
    console.log("start");
  }

  function onEnd() {
    console.log("end");
  }

  return (
    <View x={150} autofocus>
      {/* simple, default transition */}
      <View
        width={200}
        height={200}
        x={50}
        y={y()}
        color="#dbeafe"
        transition={true}
      />

      {/* simple, default transition with object syntax */}
      <View
        width={200}
        height={200}
        x={300}
        y={y()}
        color="#bfdbfe"
        transition={{ y: true }}
      />

      {/* transition with custom duration */}
      <View
        width={200}
        height={200}
        x={550}
        y={y()}
        color="#93c5fd"
        transition={{ y: { duration: 1000 } }}
        // This doesn't work with simple animation
        onAnimation={{
          animating: onStart,
          stopped: onEnd
        }}
      />

      {/* transition with custom duration and wait */}
      <View
        width={200}
        height={200}
        x={800}
        y={y()}
        color="#60a5fa"
        transition={{ y: { duration: 500, delay: 1000 } }}
        onAnimation={{
          animating: onStart,
          stopped: onEnd
        }}
      />

      {/* transition with built-in easing function */}
      <View
        width={200}
        height={200}
        x={1050}
        y={y()}
        color="#3b82f6"
        transition={{ y: { duration: 500, easing: "ease-in-out" } }}
        onAnimation={{
          stopped: onEnd
        }}
      />

      {/* transition with custom duration and a built-in easing function */}
      <View
        width={200}
        height={200}
        x={1300}
        y={y()}
        color="#2563eb"
        transition={{ y: { duration: 3000, easing: "ease-in-out-back" } }}
        onAnimation={{
          stopped: onEnd
        }}
      />

      {/* transition with custom duration and a custom bezier function */}
      <View
        width={200}
        height={200}
        x={1550}
        y={y()}
        color="#1e3a8a"
        transition={{
          y: { duration: 800, easing: "cubic-bezier(1,-0.64,.39,1.44)" }
        }}
      />
    </View>
  );
};

export default Default;
