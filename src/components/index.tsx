import { IntrinsicNodeProps, View, Text } from "@lightningtv/solid";
import { Row } from "@lightningtv/solid-ui";
import { For } from "solid-js";
import styles, { buttonStyles } from "../styles";
import { type Tile } from "../api/formatters/ItemFormatter";
import { INode } from "@lightningtv/solid";

export function Thumbnail(props: IntrinsicNodeProps) {
  function changeBackground(node: INode) {
    node.color = 0xffffffff;
  }
  return (
    <View
      {...props}
      color={"#808080"}
      onLoad={changeBackground}
      onFail={(node) => (node.src = "failback.png")}
      style={styles.Thumbnail}
    />
  );
}

export function FocusRing(props: IntrinsicNodeProps) {
  return <View {...props} style={styles.FocusRing} />;
}

export interface TileRowProps extends IntrinsicNodeProps {
  items: Tile[];
}

export function TileRow(props: TileRowProps) {
  return (
    <Row {...props} style={styles.Row}>
      <For each={props.items}>{(item) => <Thumbnail {...item} />}</For>
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
