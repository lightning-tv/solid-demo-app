import {
  type IntrinsicNodeProps,
  View,
  Text,
  type NodeProps,
  Dynamic
} from "@lightningtv/solid";
import { Column, Row, VirtualRow, Image } from "@lightningtv/solid/primitives";
import { createEffect, createSignal, For, Index } from "solid-js";
import styles, { buttonStyles } from "../styles";
import { type Tile } from "../api/formatters/ItemFormatter";

export function Thumbnail(props: IntrinsicNodeProps & { item: Tile }) {
  return (
    <Image
      {...props}
      id="thumbnail"
      src={props.item.src}
      placeholder="./assets/fallback.png"
      item={props.item}
      announce={[props.item.title, 'PAUSE-1', props.item.overview]}
      style={styles.Thumbnail}
    />
  );
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
      <Index each={props.items}>{(item, index) => <Thumbnail item={item()} announceContext={`${index + 1} of ${props.items.length}`} />}</Index>
    </Row>
  );
}

export function Button(props) {
  return (
    <View {...props} announce={[props.children, 'button']} forwardStates style={buttonStyles.container}>
      <Text style={buttonStyles.text}>{props.children || props.title}</Text>
    </View>
  );
}

export function AssetPanel(props) {
  let panelRef, actionRef;

  createEffect(() => {
    if (props.open) {
      panelRef.animate({
        x: 1470,
      }, { duration: 400, easing: "ease-in-out" }).start();
      actionRef.setFocus();
    } else if (panelRef.rendered) {
      panelRef.animate({
        x: 1920,
      }, { duration: 400, easing: "ease-in-out" }).start();
    }
  })

  return (
    <View {...props} x={1920} ref={panelRef} color={"#000000"} width={450} height={1080} zIndex={5}>
      <Text x={75} y={50} fontSize={32}>{props.item?.title}</Text>

      <Column ref={actionRef} onLeft={props.close} onBack={props.close} x={75} y={200}>
        <Button onEnter={props.close}>Record</Button>
        <Button onEnter={props.close}>Watch</Button>
        <Button onEnter={props.close}>Close</Button>
      </Column>
    </View>
  );
}

const heroTransition = {
  duration: 300,
  easing: "cubic-bezier(0.20, 1.00, 0.80, 1.00)"
};

const titleRowStyles = {
  fontFamily: "Raleway",
  fontSize: 24,
  height: 32,
  lineHeight: 32
};

export function TitleRow(props: TileRowProps) {
  return (
    <View height={props.height} forwardFocus={1} marginTop={30}>
      <Text skipFocus style={titleRowStyles}>
        {props.title}
      </Text>
      <VirtualRow gap={20} displaySize={8} bufferSize={3} each={props.items} y={50} scroll={props.scroll} wrap={props.wrap} debugInfo>
        {(item, index) => (
          <Dynamic component={typeToComponent[props.row.type]} index={index()} item={item()} />
        )}
      </VirtualRow>
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
    scale: { duration: 200, easing: "linear" }
  },
  $focus: { scale: 1.1, color: "#fff" }
};

export function Poster(props: NodeProps) {
  return (
    <View
      src={props.item?.src}
      title={props.item?.shortTitle}
      backdrop={props.item?.backdrop}
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
    y: 288
  },
  transition: {
    y: heroTransition,
    alpha: heroTransition
  }
} as const;

export function PosterTitle(props: NodeProps & { title: string }) {
  return (
    <View
      src={props.item?.src}
      backdrop={props.item?.backdrop}
      {...props}
      onFail={(node) => (node.src = "failback.png")}
      style={posterStyles}
      forwardStates
    >
      <Text style={posterTitleStyles}>{props.item?.title}</Text>
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
    scale: heroTransition
  },
  $focus: { scale: 1.05 }
};

const heroTextStyles = {
  fontFamily: "Raleway",
  contain: "width"
} as const;

export function Hero(
  props: NodeProps & {
    item: {
      src: string;
      backdrop: string;
      title: string;
      overview: string;
    };
  }
) {
  const [hasFocus, setHasFocus] = createSignal(false);
  return (
    <View
      {...props}
      src={props.item.backdrop}
      style={heroStyles}
      onFocusChanged={setHasFocus}
      forwardStates
    >
      <View transition={{ alpha: heroTransition }} alpha={hasFocus() ? 1 : 0}>
        <View width={185} height={278} x={54} y={220} src={props.item.src} />
        <Text
          y={520}
          x={54}
          fontSize={64}
          width={1000}
          maxLines={1}
          style={heroTextStyles}
        >
          {props.item.title}
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
          {props.item.overview}
        </Text>
      </View>
    </View>
  );
}

const typeToComponent = {
  Poster: Poster,
  Hero: Hero,
  PosterTitle: PosterTitle
};

const BlockStyle = {
  alpha: 0.85,
  border: { width: 0, color: "#000000" },
  $focus: {
    border: { width: 4, color: "#FFF" },
    alpha: 1
  }
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
