import { IntrinsicNodeStyleProps, hexColor } from "@lightningjs/solid";
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
    focus: {
      width: 500,
      x: theme.layout.marginX,
    },
  } satisfies IntrinsicNodeStyleProps,
  Gradient: {
    zIndex: 99,
    color: hexColor("#000000"),
    src: "./assets/sidenav.png",
    alpha: 0,
    width: 1200,
    height: 1080,
    focus: {
      alpha: 1,
    },
    transition: { alpha: true },
  } satisfies IntrinsicNodeStyleProps,
  NavButton: {
    zIndex: 102,
    height: 70,
    width: 100,
    borderRadius: 8,
    focus: {
      color: hexColor("#424242"),
    },
    active: {
      width: 328,
      height: 70,
    },
  } satisfies IntrinsicNodeStyleProps,
};
