import { View } from "@lightningtv/solid";
import { Column } from "@lightningtv/solid/primitives";
import { setGlobalBackground } from "../state";
import { Button } from "../components/";
import { createSignal } from "solid-js";


const NestedButtonColumns = () => {
  setGlobalBackground("#333");

  const styles = {
    container: {
      x: 400,
      width: 400,
      height: 1080,
      color: "#999",
      display: 'flex',
      flexDirection: 'column', // Arranges columns horizontally
      justifyContent: 'spaceBetween', // Distributes columns evenly
      padding: 10,
    },
    column: {
      display: 'flex',
      flexDirection: 'column', // Stacks buttons vertically within each column
      padding: 5, // Add some spacing between columns
    },
  } as const;

  const [currentIndex, setCurrentIndex] = createSignal(0);

  return (
    <Column style={styles.container} scroll="none">
      {/* Column 1 */}

      <view forwardFocus={0} clipping height={600} x={50}>
        <Column scrollIndex={3} onSelectedChanged={setCurrentIndex}>
          <Button title="Button 1A" autofocus onEnter={() => console.log('Button 1A pressed')} />
          <Button title="Button 1B" onEnter={() => console.log('Button 1B pressed')} />
          <Button title="Button 1C" onEnter={() => console.log('Button 1C pressed')} />
          <Button title="Button 1D" onEnter={() => console.log('Button 1C pressed')} />
          <Button title="Button 1E" onEnter={() => console.log('Button 1C pressed')} />
          <Button title="Button 1F" onEnter={() => console.log('Button 1C pressed')} />
          <Button title="Button 1G" onEnter={() => console.log('Button 1C pressed')} />
          <Button title="Button 1H" onEnter={() => console.log('Button 1C pressed')} />
        </Column>
      </view>
      <view colorTop={0x999999ff} colorBottom={0x99999900} height={100} y={10} skipFocus flexItem={false} alpha={currentIndex() > 0 ? 1 : 0} />
      <view colorTop={0x99999900} colorBottom={0x999999ff} height={100} y={510} skipFocus flexItem={false} alpha={currentIndex() === 7 ? 0 : 1} />

      <view height={4} color={'#c3c3c3'} skipFocus />
      {/* Column 2 */}
      {/* <Column>
        <Button title="Button 2A" onEnter={() => console.log('Button 2A pressed')} />
        <Button title="Button 2B" onEnter={() => console.log('Button 2B pressed')} />
      </Column> */}

      {/* Column 3 */}
      <view forwardFocus={0} clipping height={400} x={50}>
        <Column>
          <Button title="Button 3A" onEnter={() => console.log('Button 3A pressed')} />
          <Button title="Button 3B" onEnter={() => console.log('Button 3B pressed')} />
          <Button title="Button 3C" onEnter={() => console.log('Button 3C pressed')} />
        </Column>
      </view>
    </Column>
  );
};

export default NestedButtonColumns;
