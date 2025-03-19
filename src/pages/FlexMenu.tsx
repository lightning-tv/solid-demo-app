import { Column } from "@lightningtv/solid/primitives";
import { Text, View } from "@lightningtv/solid";
import { setGlobalBackground } from "../state";

const Box = (props) => {
  return (
    <View {...props} height={100} color="#FF00FF">
      <Text>Text element</Text>
    </View>
  );
};

export const FlexMenu = () => {
  setGlobalBackground("#000");
  return (
      <View
        right={0}
        display="flex" 
        width={400}
        flexBoundary="fixed"
        color="#FFFF0060"
        flexDirection="column"
      >
        <Column x={50} width={300} autofocus>
          <Box marginTop={50} />
          <Column flexItem={false} justifyContent="flexEnd">
            <Box flexOrder={1} />
            <Box flexOrder={2} marginBottom={50} />
          </Column>
        </Column>
      </View>
  );
};

export default FlexMenu;
