import {
  IntrinsicNodeStyleProps,
  IntrinsicTextNodeStyleProps,
  hexColor,
} from "@lightningjs/solid";
import theme from "theme";

const ROW_HEIGHT = 50;
export default {
  ProductRow: {
    width: 500,
    display: "flex",
    flexDirection: "row",
    gap: 40,
    height: ROW_HEIGHT,
    borderRadius: 16,
    color: 0xffffff0d,
    border: { color: 0x008085ff, width: 0 },
    active: {
      color: 0x39393cff,
    },
    focus: {
      color: 0xf6f6f9ff,
      border: { color: 0x008085ff, width: 6 },
    },
    transition: {
      // leave easing blank to use default linear
      x: { duration: 300 },
      width: { duration: 300 },
      alpha: { duration: 300 },
    },
  },
  ProductText: {
    fontSize: 20,
    fontWeight: 600,
    lineHeight: 24,
    color: hexColor("#f6f6f6"),
    focus: {
      color: 0x141417ff,
    },
  },
  itemsContainer: {
    width: theme.layout.screenW,
    height: 600,
    y: 180,
    x: 180,
    zIndex: 2,
  },
} as const;
