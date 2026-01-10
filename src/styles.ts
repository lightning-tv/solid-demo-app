import {
  IntrinsicNodeStyleProps,
  IntrinsicTextNodeStyleProps,
} from "@lightningtv/solid";
import theme from "theme";

// Augment existing intrinsic style prop interfaces to include our own
// app-specific states
declare module "@lightningtv/solid" {
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

const params = new URLSearchParams(window.location.search);
const roundPoster = params.get("roundPoster") !== "false";

export default {
  Page: {
    width: 1920,
    height: 1080
  },
  headlineText: {
    width: 1200,
    height: 240,
    x: 360,
    // lineHeight: 170, // TODO: Add back when lineHeight is supported
    y: 455,
    contain: "both",
    fontSize: 66,
    textAlign: "center"
  } satisfies IntrinsicTextNodeStyleProps,
  headlineSubText: {
    width: 960,
    height: 170,
    // lineHeight: 170, // TODO: Add back when lineHeight is supported
    x: 530,
    y: 655,
    contain: "both",
    fontSize: 48,
    textAlign: "center"
  } satisfies IntrinsicTextNodeStyleProps,
  itemsContainer: {
    width: theme.layout.screenW,
    height: 800,
    y: 560,
    x: 0,
    zIndex: 2
  },
  Thumbnail: {
    width: 185,
    height: 278,
    scale: 1,
    zIndex: 2,
    transition: {
      scale: { duration: 250, easing: "linear" },
      border: { duration: 250, easing: "linear" },
    },
    borderRadius: roundPoster ? 16 : 0,
    border: { width: 0, color: 0x00000000 },
    $focus: {
      scale: 1.1,
      border: { color: theme.primaryLight, width: 6 },
    },
    $hover: {
      scale: 1.07,
      border: { color: theme.primaryLight, width: 3 },
    },
    $pressed: {
      scale: 1.05,
      border: { color: theme.primary, width: 6 },
    }
  },
  FocusRing: {
    borderRadius: 16,
    width: 194,
    height: 286,
    y: -5,
    x: -5,
    zIndex: -1
  },
  FPS: {
    color: 0x000000ff,
    height: 42,
    width: 140,
    x: 20,
    y: 20,
    zIndex: 100
  } as const,
  FPSLabel: {
    x: 10,
    y: 0,
    fontSize: 36,
    textColor: "#ffffff"
  },
  FPSValue: {
    x: 90,
    y: 0,
    fontSize: 36,
    textColor: "#ffffff"
  },
  showHeadline: { x: 70, y: 20 },
  headlineBlur: {
    width: 1920,
    height: 150,
    x: 0,
    y: 0,
    zIndex: 14,
    alpha: 0.9,
    color: "#000000"
  },
  RowTitle: {
    height: 44,
    width: 300,
    marginBottom: -54,
    fontSize: 26,
    color: "#f0f0f0",
    zIndex: 2
  } satisfies IntrinsicTextNodeStyleProps,
  Row: {
    display: "flex",
    justifyContent: "spaceBetween",
    height: 300
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
    zIndex: 2
  },
  Rect: {
    width: 250,
    height: 100,
    y: 10,
    x: 300,
    color: "#0000ff"
  },
  peopleBio: {
    ...theme.typography.body1,
    fontFamily: "Roboto",
    fontWeight: "normal",
    contain: "both",
    width: 780,
    height: 340
  } satisfies IntrinsicTextNodeStyleProps
} as const;

const Button = {
  width: 300,
  height: 90,
  color: theme.primary,
  borderRadius: 12,
  $focus: {
    color: theme.primaryLight
  }
} satisfies IntrinsicNodeStyleProps;

const TopBar = {
  color: "#00A699",
  height: 8,
  y: 2,
  x: -4,
  width: Button.width + 8
} satisfies IntrinsicNodeStyleProps;

const ButtonText = {
  fontSize: 26,
  lineHeight: Button.height,
  contain: "width",
  textAlign: "center",
  height: Button.height,
  width: Button.width,
  color: theme.textPrimary,
} satisfies IntrinsicTextNodeStyleProps;

export const buttonStyles = {
  container: Button,
  topBar: TopBar,
  text: ButtonText
} satisfies Record<string, IntrinsicTextNodeStyleProps>;

export const MaterialButton = {
  width: 386,
  height: 136,
  color: "#715cab",
  $focus: {
    color: "#5a39a2"
  },
  $disabled: {
    color: "#291d43"
  }
} satisfies IntrinsicNodeStyleProps;

export const MaterialButtonText = {
  fontSize: 32,
  contain: "width",
  textAlign: "center",
  mountY: -0.35,
  color: "#FFFFFF",
  height: MaterialButton.height,
  width: MaterialButton.width,
  // lineHeight: MaterialButton.height, // TODO: Add back when lineHeight is supported
  $focus: {
    fontSize: 40
  },
  $disabled: {
    color: "#909090"
  }
} satisfies IntrinsicTextNodeStyleProps;
