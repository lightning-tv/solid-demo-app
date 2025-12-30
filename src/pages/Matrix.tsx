
import { For } from "solid-js";
import { View } from "@lightningtv/solid";
import { Column, Row } from "@lightningtv/solid/primitives";

const blockStyle = {
  color: 0x5c4dffff,
  scale: 1,
                        $focus: { color: 0xff00ffff, scale: 1.1 },
                        transition: { color: { duration: 0.3 }, scale: { duration: 0.3 } }
                      }
const Matrix = () => {
  const rows = Array.from({ length: 1 });
  const blocks = Array.from({ length: 6 });

  return (
    <View color={0x1e1e1eff} width={1920} height={1080}>
        <Column x={160} y={100} gap={50} autofocus>
        <For each={rows}>
            {() => (
            <Row gap={30} height={250}>
                <For each={blocks}>
                {() => (
                    <View
                      width={150}
                      height={250}
                      style={blockStyle}
                    />
                )}
                </For>
            </Row>
            )}
        </For>
        </Column>
    </View>
  );
};

export default Matrix;
