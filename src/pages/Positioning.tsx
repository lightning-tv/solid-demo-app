import { Text, View } from "@lightningtv/solid";
import { createSignal, onCleanup } from "solid-js";
import { setGlobalBackground } from "../state";

const PositioningPage = () => {
  setGlobalBackground("#1e293b");

  // this would be easier with a store, but then it wouldn't work pre-proxy
  const [state, setState] = createSignal({
    x1: 20,
    x2: 140,
    x3: 20 + 140 + 100,
    x4: 380,
    y: 140,
    xA: 20,
    xB: 140,
    xC: 260,
    xD: 380,
    yNested: 0,
    xNested: 0,
    bar2: {
      direction: "up",
      v: "10%"
    },
    bar3: "10%"
  });

  setTimeout(() => {
    setState((prevState) => ({
      ...prevState,
      xD: prevState.xD + 200,
      xC: prevState.xC + 100,
      xB: prevState.xB + 50,
      xA: prevState.xA + 25
    }));
  }, 4000);

  const intervals: number[] = [];

  intervals.push(
    setInterval(() => {
      setState((prevState) => ({
        ...prevState,
        yNested: prevState.yNested === 0 ? 50 : 0
      }));
    }, 2000)
  );

  intervals.push(
    setInterval(() => {
      setState((prevState) => ({
        ...prevState,
        xNested: prevState.xNested === 0 ? 150 : 0
      }));
    }, 1000)
  );

  intervals.push(
    setInterval(() => {
      setState((prevState) => ({
        ...prevState,
        bar3: Math.ceil(Math.random() * 96) + ""
      }));
    }, 2000)
  );

  intervals.push(
    setInterval(() => {
      setState((prevState) => {
        const v = parseFloat(prevState.bar2.v);
        const newV = prevState.bar2.direction === "up" ? v + 10 : v - 10;

        return {
          ...prevState,
          bar2: {
            ...prevState.bar2,
            v: newV + "%",
            direction:
              newV >= 90 ? "down" : newV <= 10 ? "up" : prevState.bar2.direction
          }
        };
      });
    }, 400)
  );

  onCleanup(() => {
    intervals.forEach((interval) => clearInterval(interval));
  });

  return (
    <View x={150} autofocus>
      {/* regular positioning */}
      <View width={100} height={100} x={20} y={20} color="#ecfeff" />
      <View width={100} height={100} x={140} y={20} color="#a5f3fc" />
      <View width={100} height={100} x={260} y={20} color="#22d3ee" />
      <View width={100} height={100} x={380} y={20} color="#0891b2" />

      {/* positioning with dynamic values */}
      <View
        width={100}
        height={100}
        x={state().x1}
        y={state().y}
        color="#fdf4ff"
      />
      <View
        width={100}
        height={100}
        x={state().x2}
        y={state().y}
        color="#f5d0fe"
      />
      <View
        width={100}
        height={100}
        x={state().x3}
        y={state().y}
        color="#e879f9"
      />
      <View
        width={100}
        height={100}
        x={state().x4}
        y={state().y}
        color="#c026d3"
      />

      {/* positioning with reactive values */}
      <View width={100} height={100} x={state().xA} y={260} color="#fff7ed" />
      <View width={100} height={100} x={state().xB} y={260} color="#fed7aa" />
      <View width={100} height={100} x={state().xC} y={260} color="#fb923c" />
      <View width={100} height={100} x={state().xD} y={260} color="#ea580c" />

      {/*- positioning of nested elements */}
      <View width={800} height={800} y={20} x={800} color="#ecfdf5">
        <View width={600} height={600} y={20} x={20} color="#a7f3d0">
          <View width={400} height={400} y={100} x={20} color="#34d399">
            <View
              width={200}
              height={100}
              y={(400 - 100) / 2}
              x={(400 - 200) / 2}
              color="#059669"
            >
              <View
                width={50}
                height={50}
                y={state().yNested}
                x={state().xNested}
                transition={{
                  x: { duration: 300, easing: "ease" },
                  y: { duration: 300, easing: "ease" }
                }}
                color="#065f46"
              />
            </View>
          </View>
        </View>
      </View>

      {/* positioning after a set of nested elements */}
      <View width={100} height={100} y={500} x={20} color="#e11d48" />

      {/* zIndex not inherited by children - currently broken and being investigated :) */}
      <View
        width={200}
        height={200}
        x={300}
        y={600}
        color="#94a3b8"
        zIndex={100}
      >
        <Text x={100} y={140}>
          Lightning!
        </Text>
        <View width={300} height={100} color="#475569" />
        <View
          x={150}
          y={150}
          width={100}
          height={100}
          color="#fff"
          borderRadius={75}
        />
      </View>
      <View width={300} height={300} x={300} y={600} color="#ef444480" />

      {/* No percentages with Solid - just calculate percentages if you want them, or use flex */}
      <View width={400} height={100} x={800} y={900} color="#0284c7">
        <View
          width={400 * 0.42}
          height={100 * 0.3}
          y={100 * 0.05}
          x={400 * 0.01}
          color="#075985"
        />
        <View
          width={(400 * parseFloat(state().bar2.v)) / 100}
          height={100 * 0.3}
          y={100 * 0.35}
          x={400 * 0.01}
          color="#6b21a8"
        />
        <View
          width={(400 * parseFloat(state().bar3)) / 100}
          height={100 * 0.3}
          y={100 * 0.65}
          x={400 * 0.01}
          transition={{ width: { duration: 300, easing: "ease" } }}
          color="#9f1239"
        />
      </View>
    </View>
  );
};

export default PositioningPage;
