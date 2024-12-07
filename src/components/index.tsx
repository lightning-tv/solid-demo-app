import {
  type IntrinsicNodeProps,
  View,
  Text,
  type NodeProps,
  Dynamic,
} from "@lightningtv/solid";
import { Row } from "@lightningtv/solid/primitives";
import { createSignal, For, Index } from "solid-js";
import styles, { buttonStyles } from "../styles";
import { type Tile } from "../api/formatters/ItemFormatter";
import { INode } from "@lightningtv/solid";
import { LazyUp } from "@lightningtv/solid/primitives";

export function Thumbnail(props: IntrinsicNodeProps) {
  return <View {...props} style={styles.Thumbnail} />;
}

export function FocusRing(props: IntrinsicNodeProps) {
  return <View {...props} style={styles.FocusRing} />;
}

export interface TileRowProps extends IntrinsicNodeProps {
  items: Tile[];
  title?: string;
}

export function TileRow(props: TileRowProps) {
  return (
    <Row {...props} style={styles.Row}>
      <Index each={props.items}>{(item) => <Thumbnail {...item} />}</Index>
    </Row>
  );
}

export function Button(props) {
  return (
    <View {...props} forwardStates style={buttonStyles.container}>
      <Text style={buttonStyles.text}>{props.children}</Text>
    </View>
  );
}

const heroTransition = {
  duration: 300,
  easing: "cubic-bezier(0.20, 1.00, 0.80, 1.00)",
};

const titleRowStyles = {
  fontFamily: "Raleway",
  fontSize: 24,
  height: 32,
  lineHeight: 32,
};

export function TitleRow(props: TileRowProps) {
  return (
    <View height={props.height} forwardFocus={1} marginTop={30}>
      <Text skipFocus style={titleRowStyles}>
        {props.title}
      </Text>
      <LazyUp
        component={Row}
        direction="row"
        gap={20}
        upCount={11}
        each={props.items}
        y={50}
      >
        {(item) => (
          <Dynamic component={typeToComponent[props.row.type]} {...item()} />
        )}
      </LazyUp>
    </View>
  );
}

const posterStyles = {
  width: 185,
  height: 278,
  scale: 1,
  zIndex: 2,
  color: "#b0b0b0",
  //borderRadius: 8,
  transition: {
    scale: { duration: 200, easing: "cubic-bezier(0.20, 1.00, 0.80, 1.00)" },
  },
  $focus: { scale: 1.1, color: "#fff" },
};

export function Poster(props: NodeProps) {
  return (
    <View
      {...props}
      onFail={(node) => (node.src = "failback.png")}
      style={posterStyles}
    />
  );
}

const posterTitleStyles = {
  fontFamily: "Raleway",
  fontSize: 22,
  lineHeight: 22,
  height: 22,
  x: 10,
  y: 278,
  contain: "width",
  width: 185,
  maxLines: 2,
  alpha: 0,
  $focus: {
    alpha: 1,
    y: 288,
  },
  transition: {
    y: heroTransition,
    alpha: heroTransition,
  },
} as const;

export function PosterTitle(props: NodeProps & { title: string }) {
  return (
    <View
      {...props}
      onFail={(node) => (node.src = "failback.png")}
      style={posterStyles}
      forwardStates
    >
      <Text style={posterTitleStyles}>{props.title}</Text>
    </View>
  );
}

const heroStyles = {
  width: 1280,
  height: 720,
  scale: 1,
  zIndex: 2,
  colorTop: "#fff",
  colorBottom: "#000",
  //borderRadius: 8,
  transition: {
    scale: heroTransition,
  },
  $focus: { scale: 1.05 },
};

const heroTextStyles = {
  fontFamily: "Raleway",
  contain: "width",
} as const;

export function Hero(
  props: NodeProps & {
    src: string;
    backdrop: string;
    title: string;
    overview: string;
  }
) {
  const [hasFocus, setHasFocus] = createSignal(false);
  return (
    <View
      {...props}
      src={props.backdrop}
      style={heroStyles}
      onFocusChanged={setHasFocus}
      forwardStates
    >
      <View transition={{ alpha: heroTransition }} alpha={hasFocus() ? 1 : 0}>
        <View width={185} height={278} x={54} y={220} src={props.src} />
        <Text
          y={520}
          x={54}
          fontSize={64}
          width={1000}
          maxLines={1}
          style={heroTextStyles}
        >
          {props.title}
        </Text>
        <Text
          y={620}
          x={60}
          fontSize={21}
          width={1000}
          maxLines={2}
          lineHeight={36}
          color={"#ccc"}
          style={heroTextStyles}
        >
          {props.overview}
        </Text>
      </View>
    </View>
  );
}

const typeToComponent = {
  Poster: Poster,
  Hero: Hero,
  PosterTitle: PosterTitle,
};

const BlockStyle = {
  alpha: 0.85,
  border: { width: 0, color: "#000000" },
  $focus: {
    border: { width: 4, color: "#FFF" },
    alpha: 1,
  },
};
export function Block(props) {
  return (
    <View
      {...props}
      width={100}
      height={100}
      style={BlockStyle}
      color={props.color || "#e0e0e0"}
    />
  );
}
