import {
  ElementNode,
  Text,
  View,
  Show,
  assertTruthy
} from "@lightningtv/solid";
import { Column } from "@lightningtv/solid/primitives";
import { useParams } from "@solidjs/router";
import { createResource, onMount } from "solid-js";
import { TileRow } from "../components";
import { setGlobalBackground } from "../state";
import { useNavigate } from "@solidjs/router";
import theme from "theme";
import styles from "../styles";
import * as provider from "../api/providers/people";
import { Tile } from "../api/formatters/ItemFormatter";

const People = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [data] = createResource(() => ({ ...params }), provider.getInfo);
  const [credits] = createResource<any, Tile[]>(
    () => ({ ...params }),
    provider.getCredits
  );

  const Backdrop = {
    color: "#000000",
    alpha: 0.8,
    width: 800,
    height: 440,
    x: 130,
    y: 180,
    borderRadius: 30
  };

  function onEnter(this: ElementNode) {
    let entity = this.children[this.selected || 0];
    assertTruthy(entity && entity.href);
    navigate(entity.href);
  }

  onMount(() => {
    setGlobalBackground("#333333");
  });

  return (
    <Show when={data()} keyed>
      <View
        src={data().backgroundImage}
        width={400}
        autosize
        y={0}
        x={1800}
        mountX={1}
      />
      <View
        x={150}
        y={200}
        width={800}
        gap={24}
        style={styles.Column}
        zIndex={3}
      >
        <Text
          contain="width"
          fontFamily={"Roboto"}
          style={theme.typography.display2}
        >
          {data().name}
        </Text>
        <Text contain="both" style={styles.peopleBio}>
          {data().biography}
        </Text>
      </View>
      <View style={Backdrop} />
      <Column y={670} x={140} style={styles.Column} scroll="none">
        <Show when={credits()}>
          <Text skipFocus style={styles.RowTitle}>
            Credits
          </Text>
          <TileRow autofocus onEnter={onEnter} items={credits()} />
        </Show>
      </Column>
    </Show>
  );
};

export default People;
