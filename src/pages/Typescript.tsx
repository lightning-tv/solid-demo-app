import { View, Text } from "@lightningtv/solid";

<View
  x={4}
  y={12}
  width={100}
  height={200}
  alpha={0.8}
  autosize={true}
  clipping={false}
  color={0xff0000ff} // Red color with full opacity
  colorTop={0xff0000ff}
  colorBottom={0x00ff00ff}
  colorLeft={0x0000ffff}
  colorRight={0xffffffff}
  colorTl={0xff0000ff}
  colorTr={0x00ff00ff}
  colorBr={0x0000ffff}
  colorBl={0xffffffff}
  parent={null}
  zIndex={5}
  texture={null}
  textureOptions={{}} // Assuming TextureOptions is an object
  shader={null} // Assuming BaseShaderController instance or null
  src={"https://example.com/image.png"}
  zIndexLocked={10}
  scale={1.0}
  scaleX={1.0}
  scaleY={1.0}
  mount={0.5}
  mountX={0.5}
  mountY={0.5}
  pivot={0.5}
  pivotX={0.5}
  pivotY={0.5}
  rotation={Math.PI / 4}
  rtt={false}
  data={{
    key1: "value1",
    key2: 123,
    key3: true
  }}
/>;

<Text>Hello World</Text>;
