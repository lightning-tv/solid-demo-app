import {
  useFocusManager,
  useMouse,
} from "@lightningtv/solid/primitives";
import { KeyMap, KeyHoldMap } from "@lightningtv/core/focusManager";

const App = (props) => {
  useFocusManager(
      {
        Announcer: ["a"],
        Menu: ["m"],
        Escape: ["Escape", 27],
        Backspace: ["Backspace", 8],
        Back: ["b"],
        Left: ["ArrowLeft", 37],
        Right: ["ArrowRight", 39],
        Up: ["ArrowUp", 38],
        Down: ["ArrowDown", 40],
        Enter: ["Enter", 13]
      } as unknown as KeyMap,
      {
        userKeyHoldMap: {
          EnterHold: ["Enter", 13],
          BackHold: ["b", 66]
        } as unknown as KeyHoldMap,
        holdThreshold: 1000
      }
    );
     useMouse(undefined, 100, {
      customStates: {
        hoverState: '$hover',
        pressedState: '$pressed',
        pressedStateDuration: 150, // optional, default is 150ms
      },
    });
  return props.children;
};

export default App;
