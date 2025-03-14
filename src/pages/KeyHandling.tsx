import { Text } from "@lightningtv/solid";
import { setGlobalBackground } from "../state";
import { Block } from "../components";

const KeyHandling = () => {
  setGlobalBackground("#333");
  let myBlock;

  return (
    <>
      <Text x={400} y={200} contain="both" width={900}>
        Move the block with the arrow keys, enter to change color, enterHold to
        reset color. Open inspector to see console log messages. Use M to test
        release.
      </Text>
      <Block
        ref={myBlock}
        autofocus
        x={1920 / 2 - 50}
        y={1080 / 2 - 50}
        isBlack={false}
        color="#1212df"
        onMenu={() => {
          // This will be called when you press M key, and keep being called until you release M key
          return true;
        }}
        onMenuRelease={() => {
          // This wont be logged until you release M key, and only called once even if held
          console.log("menu release");
          return true;
        }}
        onUp={() => (myBlock.y = Math.max(0, myBlock.y - 20))}
        onDown={() => {
          console.log("down press");
          myBlock.y = Math.min(1080, myBlock.y + 20);
        }}
        onDownRelease={() => {
          console.log("down release");
        }}
        onRight={() => (myBlock.x = Math.min(1920, myBlock.x + 20))}
        onLeft={() => {
          myBlock.x = Math.max(200, myBlock.x - 20);
          // need to return true so we dont open menu
          return myBlock.x > 200;
        }}
        onEnterRelease={() => {
          console.log("enter release / up");
        }}
        onEnterHold={(e) => {
          console.log("enter hold");
          myBlock.color = "#1212df";
        }}
        onEnter={() => {
          console.log("enter down");
          myBlock.isBlack = !myBlock.isBlack;
          if (myBlock.isBlack) {
            myBlock.color = "#ffffff";
          } else {
            myBlock.color = "#000000";
          }
        }}
      />
    </>
  );
};

export default KeyHandling;
