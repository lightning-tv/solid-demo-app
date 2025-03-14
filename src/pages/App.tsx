import { useLocation, useNavigate } from "@solidjs/router";
import { View, Text, activeElement, renderer } from "@lightningtv/solid";
import {
  useFocusManager,
  useAnnouncer,
  useMouse,
  FPSCounter,
  setupFPS
} from "@lightningtv/solid/primitives";
import Background from "../components/Background";
import NavDrawer from "../components/NavDrawer/NavDrawer";
import { createEffect, createSignal, onCleanup } from "solid-js";
import { KeyMap, KeyHoldMap } from "@lightningtv/core/focusManager";

declare module "@lightningtv/solid" {
  // Augment the FocusManager KeyMap interface with our custom keys
  interface KeyMap {
    Announcer: (string | number)[];
    Menu: (string | number)[];
    Escape: (string | number)[];
    Backspace: (string | number)[];
  }
  interface ElementNode {
    heroContent?: boolean;
    backdrop?: any;
    entityInfo?: any;
    href?: string;
  }
}

const App = (props) => {
  return <>{props.children}</>;
};

export default App;
