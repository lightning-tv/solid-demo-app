import { Text, View, hexColor } from "@lightningjs/solid";
import { onMount, onCleanup, createSignal } from "solid-js";
import { setGlobalBackground } from "../state";

export default () => {
  let ball, invervalTimer;

  const [ballStatus, setBallStatus] = createSignal([]);

  const styleBall = {
    width: 100,
    height: 100,
    x: -400,
    y: -400,
    rotation: 0,
    borderRadius: 50,
    color: hexColor("#4287f5"),
    transition: {
      x: { duration: 1250, easing: "linear" },
      y: { duration: 1250, easing: "linear" },
      rotation: { duration: 1400, easing: "ease-in-out" },
    },
  } as const;

  const Title = {
    fontSize: 32,
    x: 960,
    y: 540,
    mount: 0.5,
    lineheight: 52,
  };

  const randomIntBetween = (from, to) =>
    Math.floor(Math.random() * (to - from + 1) + from);

  onMount(() => {
    setGlobalBackground("#000000");

    ball.x = (1920 - 100) / 2;
    ball.y = (1080 - 100) / 2;
    invervalTimer = setInterval(() => {
      ball.rotation = randomIntBetween(-90, 90);
      ball.x = randomIntBetween(-300, 2220);
      ball.y = randomIntBetween(-300, 1380);
    }, 2500);
  });

  function logEvent(name, elm) {
    setBallStatus((prev) => {
      return [...prev, name].slice(-4);
    });
    console.log(name);
  }

  onCleanup(() => {
    clearInterval(invervalTimer);
  });

  return (
    <View>
      <Text style={Title}>{ballStatus().join("\n")}</Text>
      <View
        autofocus
        style={styleBall}
        ref={ball}
        onEvents={[
          ["inBounds", (elm) => logEvent("inBounds", elm)],
          ["outOfBounds", (elm) => logEvent("outOfBounds", elm)],
          ["inViewport", (elm) => logEvent("inViewport", elm)],
          ["outOfViewport", (elm) => logEvent("outOfViewport", elm)],
        ]}
      />
    </View>
  );
};
