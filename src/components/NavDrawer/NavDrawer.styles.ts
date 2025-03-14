import { IntrinsicNodeStyleProps } from "@lightningtv/solid";
import theme from "theme";

export default {
  Column: {
    flexDirection: "column",
    display: "flex",
    width: 140,
    height: 600,
    y: 360,
    gap: 20,
    zIndex: 101,
    transition: {
      x: {
        duration: 250,
        easing: "ease-in-out",
      },
    },
    x: 8,
    $focus: {
      width: 500,
      x: theme.layout.marginX,
    },
  } satisfies IntrinsicNodeStyleProps,
  Gradient: {
    zIndex: 99,
    color: "#000000",
    src: "./assets/sidenav.png",
    alpha: 0,
    width: 200,
    height: 1080,
    $focus: {
      alpha: 1,
      width: 1600,
    },
    transition: { alpha: true, width: true },
  } satisfies IntrinsicNodeStyleProps,
  NavButton: {
    zIndex: 102,
    height: 70,
    width: 100,
    borderRadius: 8,
    color: 0,
    $focus: {
      color: "#424242",
    },
    $active: {
      width: 328,
      height: 70,
    },
  } satisfies IntrinsicNodeStyleProps,
};
