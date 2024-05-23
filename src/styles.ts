import {
  IntrinsicNodeStyleProps,
  IntrinsicTextNodeStyleProps,
  hexColor,
} from "@lightningjs/solid";
import theme from "theme";

// Augment existing intrinsic style prop interfaces to include our own
// app-specific states
declare module "@lightningjs/solid" {
  interface IntrinsicNodeStyleProps {
    // TODO: Refactor states to use a $ prefix
    active?: IntrinsicNodeStyleProps;
    disabled?: IntrinsicNodeStyleProps;
  }

  interface IntrinsicTextNodeStyleProps {
    // TODO: Refactor states to use a $ prefix
    active?: IntrinsicTextNodeStyleProps;
    disabled?: IntrinsicTextNodeStyleProps;
  }
}

export default {
  Page: {
    width: 1920,
    height: 1080,
  },
  headlineText: {
    width: 1200,
    height: 240,
    x: 360,
    // lineHeight: 170, // TODO: Add back when lineHeight is supported
    y: 455,
    contain: "both",
    fontSize: 66,
    textAlign: "center",
  } satisfies IntrinsicTextNodeStyleProps,
  headlineSubText: {
    width: 960,
    height: 170,
    // lineHeight: 170, // TODO: Add back when lineHeight is supported
    x: 530,
    y: 655,
    contain: "both",
    fontSize: 48,
    textAlign: "center",
  } satisfies IntrinsicTextNodeStyleProps,
  itemsContainer: {
    width: theme.layout.screenW,
    height: 800,
    y: 560,
    x: 0,
    zIndex: 2,
  },
  Thumbnail: {
    borderRadius: 16,
    width: 185,
    height: 278,
    scale: 1,
    zIndex: 2,
    transition: { scale: { duration: 250, easing: "ease-in-out" } },
    border: { width: 0, color: 0x00000000 },
    focus: { scale: 1.1, border: { color: 0xffffff66, width: 8 } },
  },
  FocusRing: {
    borderRadius: 16,
    width: 194,
    height: 286,
    y: -5,
    x: -5,
    zIndex: -1,
  },
  FPS: {
    color: 0x000000ff,
    height: 42,
    width: 140,
    x: 20,
    y: 20,
    zIndex: 100,
  } as const,
  FPSLabel: {
    x: 10,
    y: 0,
    fontSize: 36,
    textColor: hexColor("#ffffff"),
  },
  FPSValue: {
    x: 90,
    y: 0,
    fontSize: 36,
    textColor: hexColor("#ffffff"),
  },
  showHeadline: { x: 70, y: 20 },
  headlineBlur: {
    width: 1920,
    height: 150,
    x: 0,
    y: 0,
    zIndex: 14,
    alpha: 0.9,
    color: hexColor("#000000"),
  },
  RowTitle: {
    height: 60,
    width: 300,
    marginBottom: -40,
    fontSize: 36,
    color: hexColor("#f0f0f0"),
    zIndex: 2,
  } satisfies IntrinsicTextNodeStyleProps,
  Row: {
    display: "flex",
    justifyContent: "spaceBetween",
    height: 300,
  },
  Column: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flexStart",
    flexBoundary: "contain",
    gap: 64,
    width: theme.layout.screenW - 2 * theme.layout.marginX,
    x: theme.layout.marginX + theme.layout.gutterX,
    y: 48,
    transition: { y: { duration: 250, easing: "ease-in-out" } },
    zIndex: 2,
  },
  Rect: {
    width: 250,
    height: 100,
    y: 10,
    x: 300,
    color: hexColor("#0000ff"),
  },
  peopleBio: {
    ...theme.typography.body1,
    fontFamily: "Ubuntu",
    fontWeight: "normal",
    contain: "both",
    width: 780,
    height: 340,
  } satisfies IntrinsicTextNodeStyleProps,
} as const;

const Button = {
  width: 120,
  height: 40,
  mount: 0.5,
  color: 0x000000b3,
  borderRadius: 8,
  borderBottom: { width: 2, color: 0xff00faff },
  border: { width: 2, color: 0xfafafa33 },
  focus: {
    color: 0xfafafaff,
    borderRadius: 20,
    borderBottom: { width: 0, color: 0x00000000 },
  },
} satisfies IntrinsicNodeStyleProps;

const TopBar = {
  color: hexColor("#00A699"),
  height: 8,
  y: 2,
  x: -4,
  width: Button.width + 8,
} satisfies IntrinsicNodeStyleProps;

const ButtonText = {
  fontSize: 12,
  y: 12,
  // lineHeight: Button.height, // TODO: Add back when lineHeight is supported
  contain: "width",
  textAlign: "center",
  color: hexColor("#F6F6F9"),
  height: Button.height,
  width: Button.width,
} satisfies IntrinsicTextNodeStyleProps;

export const buttonStyles = {
  container: Button,
  topBar: TopBar,
  text: ButtonText,
} satisfies Record<string, IntrinsicTextNodeStyleProps>;

export const MaterialButton = {
  width: 386,
  height: 136,
  color: hexColor("#715cab"),
  focus: {
    color: hexColor("#5a39a2"),
  },
  disabled: {
    color: hexColor("#291d43"),
  },
} satisfies IntrinsicNodeStyleProps;

export const MaterialButtonText = {
  fontSize: 32,
  contain: "width",
  textAlign: "center",
  mountY: -0.35,
  color: hexColor("#FFFFFF"),
  height: MaterialButton.height,
  width: MaterialButton.width,
  // lineHeight: MaterialButton.height, // TODO: Add back when lineHeight is supported
  focus: {
    fontSize: 40,
  },
  disabled: {
    color: hexColor("#909090"),
  },
} satisfies IntrinsicTextNodeStyleProps;
