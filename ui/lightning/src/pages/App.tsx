import { useLocation, useNavigate } from "@solidjs/router";
import { View, activeElement, renderer } from "@lightningjs/solid";
import { useFocusManager, useAnnouncer } from "@lightningjs/solid-primitives";
import Background from "../components/Background";
import NavDrawer from "../components/NavDrawer/NavDrawer";
import { FPSCounter, setupFPS } from "@lightningjs/solid-ui";
import { createEffect, createSignal, onMount } from "solid-js";

declare module "@lightningjs/solid-primitives" {
  // Augment the FocusManager KeyMap interface with our custom keys
  interface KeyMap {
    Announcer: string;
    Menu: string;
    Escape: string;
    Backspace: string;
  }
}

declare module "@lightningjs/solid" {
  interface ElementNode {
    heroContent?: boolean;
    backdrop?: any;
    entityInfo?: any;
    href?: string;
  }
}

const App = (props) => {
  useFocusManager({
    Announcer: "a",
    Menu: "m",
    Escape: "Escape",
    Backspace: "Backspace",
  });
  const announcer = useAnnouncer();
  announcer.enabled = false;
  const navigate = useNavigate();

  let navDrawer, lastFocused;

  onMount(() => {
    setupFPS({ renderer });
  });

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
    const matchesPartial = showOnPaths.some((path) =>
      currentPath.startsWith(path)
    );
    setShowWidgets(matchesPartial);
  });

  return (
    <View
      onAnnouncer={() => (announcer.enabled = !announcer.enabled)}
      onLast={() => history.back()}
      onMenu={() => navigate("/")}
      style={{ width: 1920, height: 1080 }}
      onBackspace={focusNavDrawer}
      onLeft={focusNavDrawer}
      onRight={() => navDrawer.states.has("focus") && lastFocused.setFocus()}
    >
      <Background />
      <FPSCounter mountX={1} x={1910} y={10} alpha={showWidgets() ? 1 : 0} />

      {props.children}

      <NavDrawer ref={navDrawer} showWidgets={showWidgets()} />
      {/* <VideoPlayer ref={videoPlayer} /> */}
    </View>
  );
};

export default App;
