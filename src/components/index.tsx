import { IntrinsicNodeProps, View, Text } from "@lightningtv/solid";
import { Row } from "@lightningtv/solid-ui";
import { Index, splitProps } from "solid-js";
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
      color={0x00ff00ff}
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
  const [local, others] = splitProps(props, ["items"]);

  return (
    <Row {...others} style={styles.Row}>
      <Index each={local.items}>{(item) => <Thumbnail {...item} />}</Index>
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
