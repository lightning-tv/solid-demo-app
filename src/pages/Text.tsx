import {
  IntrinsicNodeStyleProps,
  IntrinsicTextNodeStyleProps,
  Text,
  View,
  hexColor,
} from "@lightningtv/solid";
import { onMount } from "solid-js";
import { setGlobalBackground } from "../state";

const TextPage = () => {
  const OverviewContainer = {
    width: 900,
    height: 500,
    y: 350,
    x: 150,
    gap: 25,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flexStart",
    color: hexColor("00000000"),
  } satisfies IntrinsicNodeStyleProps;

  const SublineContainer = {
    width: 900,
    height: 36,
    gap: 6,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flexStart",
    color: hexColor("00000000"),
  } satisfies IntrinsicNodeStyleProps;

  const Title = {
    fontSize: 42,
    fontWeight: "bold",
  } as const;

  const SubTitle = {
    fontSize: 38,
    fontWeight: 500,
  };

  const Overview = {
    width: OverviewContainer.width,
    fontSize: 26,
    fontWeight: "normal",
    contain: "width",
  } satisfies IntrinsicTextNodeStyleProps;

  const Subline = {
    fontSize: 26,
    fontWeight: 100,
  };

  onMount(() => {
    setGlobalBackground("#000000");
  });

  return (
    <>
      <View autofocus style={OverviewContainer}>
        <Text style={Title}>Title of the Page</Text>
        <Text style={SubTitle}>Tag line for the page</Text>
        <Text style={Overview}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel
          tempor tellus. Sed eu leo purus. Vestibulum sollicitudin eget tellus a
          varius. Phasellus est turpis, volutpat sed blandit sit amet, rutrum
          sit amet mauris. In dignissim elit orci, a sollicitudin ipsum faucibus
          et. Quisque vel quam rutrum, faucibus augue sed, scelerisque nunc.
        </Text>
        <View style={SublineContainer}>
          <Text style={Subline}>Subline Text</Text>
          <View width={28} height={28} src={"./assets/rt-popcorn.png"}></View>
          <Text style={Subline}>More Text</Text>
        </View>
      </View>

      <View width={600} display="flex" gap={20} height={42} y={200} x={150}>
        <Text style={Title}>Flex Grow</Text>
        <View flexGrow={1} height={4} y={19} color={"#ff3000"} />
        <View flexGrow={3} height={4} y={19} color={"#ff30ff"} />
        <View flexGrow={1} height={4} y={19} color={"#eeba2c"} />
      </View>
    </>
  );
};

export default TextPage;
