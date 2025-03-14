import { Text, View } from "@lightningtv/solid";
import { setGlobalBackground } from "../state";
import { Block } from "../components";

const LayoutPage = () => {
  setGlobalBackground("#000");

  const Title = {
    fontSize: 42,
    fontWeight: "bold"
  } as const;

  return (
    <View
      x={150}
      y={10}
      width={1000}
      height={1000}
      border={{ color: "#ff0000", width: 5 }}
    >
      <Block center color="#ffff00" />

      <View
        x={500}
        y={140}
        display="flex"
        alignItems="center"
        height={300}
        flexDirection="row"
        gap={20}
        border={{ color: "#ffffff", width: 5 }}
      >
        <Block color="#ff0000" />
        <Block color="#00ff08" />
        <Block color="#0000ff" />
      </View>

      <View
        x={500}
        y={100}
        width={200}
        padding={20}
        height={36}
        border={{ color: "#ffffff", width: 5 }}
      >
        <Text
          contain="both"
          textAlign="left"
          lineHeight={36}
          y={3}
          fontSize={28}
        >
          Hello World
        </Text>
      </View>

      <View
        display="flex"
        flexDirection="column"
        gap={50}
        alignItems="center"
        width={460}
        y={100}
        x={20}
        border={{ color: "#00ff00", width: 5 }}
        onLayout={(e) => (e.height += 5)}
      >
        <View color={"#0000FF"} marginTop={5} display="flex">
          <Text fontSize={24} contain="width" width={450}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu.
          </Text>
        </View>

        <View color={"#0000FF"} display="flex">
          <Text fontSize={24} contain="width" width={450}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default LayoutPage;
