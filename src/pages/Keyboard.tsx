import { View } from "@lightningtv/solid";
import { Text } from "@lightningtv/solid";
import { Keyboard } from "@lightningtv/solid-ui";
import { createSignal } from "solid-js";

const KeyboardPage = () => {
  const [keySignal, setKeySignal] = createSignal<string>("");
  return (
    <View x={0} y={600}>
      <Keyboard
        keySignal={[keySignal, setKeySignal]}
        rowWrap={true}
        screenW={1100}
        centerKeyboard={true}
        centerKeys={true}
        autofocus
      />
      <Text x={400} y={200} contain="both" width={900}>
        {keySignal()}
      </Text>
    </View>
  );
};

export default KeyboardPage;
