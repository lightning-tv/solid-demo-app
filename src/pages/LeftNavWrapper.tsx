import { useLocation, useNavigate } from "@solidjs/router";
import { View, Text, activeElement, renderer } from "@lightningtv/solid";
import {
  useAnnouncer,
  FPSCounter,
  setupFPS
} from "@lightningtv/solid/primitives";
import Background from "../components/Background";
import NavDrawer from "../components/NavDrawer/NavDrawer";
import { createEffect, createSignal, onCleanup } from "solid-js";

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

const LeftNavWrapper = (props) => {

  const navigate = useNavigate();
  const announcer = useAnnouncer();
  announcer.debug = true;
  announcer.enabled = false;

  let navDrawer, lastFocused;

  setupFPS({ renderer });

  function focusNavDrawer() {
    if (navDrawer.states.has("focus")) {
      return false;
    }
    lastFocused = activeElement();
    return navDrawer.setFocus();
  }

  const [showWidgets, setShowWidgets] = createSignal(true);
  const location = useLocation();
  const showOnPaths = ["/browse", "/entity"];
  createEffect(() => {
    const currentPath = location.pathname;
    let matchesPartial = showOnPaths.some((path) =>
      currentPath.startsWith(path)
    );
    if (currentPath === "/") {
      matchesPartial = true;
    }
    setShowWidgets(matchesPartial);
  });

  const [lastKey, setLastKey] = createSignal<string | undefined>();
  const [lastError, setLastError] = createSignal<string | undefined>();
  const keyPressHandler = (e) => {
    setLastKey(`Last key: ${e.key}, Code: ${e.keyCode}`);
  };
  document.addEventListener("keydown", keyPressHandler);
  const displayError = (e) => {
    setLastError((p) => (p || "") + "\n" + e.message);
  };
  document.addEventListener("onerror", displayError);
  onCleanup(() => {
    document.removeEventListener("onerror", displayError);
    document.removeEventListener("keydown", keyPressHandler);
  });

  let pageContainer;

  return (
    <View
      ref={window.APP as any}
      onAnnouncer={() => (announcer.enabled = !announcer.enabled)}
      onLast={() => history.back()}
      onMenu={() => navigate("/")}
      onBack={() => navigate(-1)}
      style={{ width: 1920, height: 1080 }}
      onBackspace={focusNavDrawer}
      onLeft={focusNavDrawer}
      onRight={() =>
        navDrawer.states.has("focus") &&
        (lastFocused || pageContainer).setFocus()
      }
    >
      <Background />
      <FPSCounter mountX={1} x={1910} y={10} alpha={showWidgets() ? 1 : 0} />
      <View
        mountX={1}
        width={330}
        height={28}
        x={1910}
        y={190}
        color={0x000000ff}
        hidden={!showWidgets()}
      >
        <Text fontSize={20} y={4} x={4}>
          {lastKey()}
        </Text>
      </View>
      <Text x={270} y={20} fontSize={24} contain="width" width={800}>
        {lastError()}
      </Text>
      <NavDrawer
        ref={navDrawer}
        focusPage={() => lastFocused.setFocus()}
        showWidgets={showWidgets()}
      />
      <View id="pageContainer" ref={pageContainer} forwardFocus={0} children={props.children} />
    </View>
  );
};

export default LeftNavWrapper;
