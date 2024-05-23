import { IntrinsicNodeProps, View, Text } from "@lightningjs/solid";
import { Row } from "@lightningjs/solid-ui";
import { For, splitProps } from "solid-js";
import styles, { buttonStyles } from "../styles";
import { type Tile } from "../api/formatters/ItemFormatter";

export function Thumbnail(props: IntrinsicNodeProps) {
  return <View {...props} style={styles.Thumbnail} />;
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
      <For each={local.items}>{(item) => <Thumbnail {...item} />}</For>
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
