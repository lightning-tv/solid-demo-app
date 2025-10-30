import { useMatch, useNavigate } from "@solidjs/router";
import {
  View,
  Text,
  IntrinsicNodeProps,
  ElementNode
} from "@lightningtv/solid";
import { Column } from "@lightningtv/solid/primitives";
import styles from "./NavDrawer.styles";
import Icon from "../Icon";
import theme from "theme";

interface NavButtonProps extends IntrinsicNodeProps {
  icon: string;
  iconColor: string;
  children: string;
}

const NavButtonTextStyles = {
  fontSize: 38,
  x: 116,
  y: 18,
  height: 50,
  alpha: 0,
  color: theme.textSecondary,
  $focus: {
    color: "#fff",
  },
  $active: {
    alpha: 1
  }
};

function NavButton(props: NavButtonProps) {
  return (
    <View {...props} forwardStates style={styles.NavButton}>
      <View y={-16}>
        <Icon color={props.iconColor} scale={0.5} name={props.icon} />
      </View>
      <Text style={NavButtonTextStyles}>{props.children}</Text>
    </View>
  );
}

export default function NavDrawer(props) {
  let backdrop: ElementNode | undefined;
  const navigate = useNavigate();
  function onFocus(this: ElementNode) {
    backdrop!.states.add("$focus");
    this.children.forEach((c) => c.states!.add("$active"));
    this.children[this.selected || 0].setFocus();
  }

  function onBlur(this: ElementNode) {
    backdrop!.states.remove("$focus");
    this.selected = 0;
    this.children.forEach((c) => c.states!.remove("$active"));
  }

  function handleNavigate(page: string) {
    const isOnPage = useMatch(() => page);
    if (isOnPage()) {
      return props.focusPage();
    }

    navigate(page);
  }

  return (
    <>
      <View
        flexItem={false}
        width={300}
        height={150}
        x={30}
        y={15}
        zIndex={105}
        alpha={props.showWidgets ? 1 : 0.01}
      >
        <Text y={8} x={80} fontSize={28} color={theme.textSecondary}>
          Built With:
        </Text>
        <View y={10} src="./assets/solidWord.png" width={280} height={52} />

        <View x={0} y={100} src="./assets/tmdb.png" width={80} height={41} />
        <Text
          x={90}
          y={104}
          contain="width"
          width={160}
          fontSize={12}
          color={theme.textSecondary}
        >
          This product uses the TMDB API but is not endorsed or certified by
          TMDB.
        </Text>
      </View>
      <Column
        {...props}
        onFocus={onFocus}
        onBlur={onBlur}
        style={styles.Column}
        announce={"Main Menu"}
        scroll="none"
      >
        <NavButton
          onEnter={() => handleNavigate("/browse/all")}
          iconColor={useMatch(() => '/browse/all')() ? '#fff' : theme.textSecondary}
          announce={["Trending Browse", "button"]}
          icon="trending"
        >
          Trending
        </NavButton>
        <NavButton icon="movie" iconColor={useMatch(() => '/browse/movie')() ? '#fff' : theme.textSecondary} announce={["Movies Browse", "button"]} onEnter={() => handleNavigate("/browse/movie")}>
          Movies
        </NavButton>
        <NavButton icon="tv" iconColor={useMatch(() => '/browse/tv')() ? '#fff' : theme.textSecondary} announce={["TV Browse", "button"]} onEnter={() => handleNavigate("/browse/tv")}>
          TV
        </NavButton>
        <NavButton
          icon="experiment"
          iconColor={useMatch(() => '/examples')() ? '#fff' : theme.textSecondary}
          announce={["Examples", "button"]}
          onEnter={() => handleNavigate("/examples")}
        >
          Examples
        </NavButton>
      </Column>
      <View skipFocus ref={backdrop} style={styles.Gradient}></View>
    </>
  );
}
