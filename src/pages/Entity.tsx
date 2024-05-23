import {
  ElementNode,
  Text,
  View,
  Show,
  hexColor,
  setActiveElement,
} from "@lightningjs/solid";
import { Column, Button, Row } from "@lightningjs/solid-ui";
import { useParams } from "@solidjs/router";
import { createEffect, createResource, on, createSignal } from "solid-js";
import { TileRow } from "../components";
import { setGlobalBackground } from "../state";
import ContentBlock from "../components/ContentBlock";
import { useNavigate } from "@solidjs/router";
import styles from "../styles";
import * as provider from "../api/providers/entity";
import { assertTruthy } from "@lightningjs/renderer/utils";
import type { Tile } from "../api/formatters/ItemFormatter";
import { playVideo, closeVideo } from "../video";

const Entity = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [data] = createResource(() => ({ ...params }), provider.getInfo);
  const [credits] = createResource<any, Tile[]>(
    () => ({ ...params }),
    provider.getCredits,
  );
  const [recommendations] = createResource<any, Tile[]>(
    () => ({ ...params }),
    provider.getRecommendations,
  );
  const [backdropAlpha, setBackdropAlpha] = createSignal(0);

  createEffect(
    on(
      data,
      (data) => {
        setGlobalBackground(data.backgroundImage);
      },
      { defer: true },
    ),
  );

  const columnY = 640;

  const Backdrop = {
    color: hexColor("#000000"),
    alpha: 0,
    width: 1900,
    height: 890,
    x: -160,
    y: columnY,
    borderRadius: 30,
  };

  function onRowFocus(this: ElementNode) {
    this.children.selected?.setFocus();
    columnRef.y = columnY;
    backdropRef.y = columnY;
    backdropRef.alpha = 0;
  }

  function onRowFocusAnimate(this: ElementNode) {
    this.children.selected?.setFocus();
    columnRef.y = 200;
    backdropRef.y = 160;
    backdropRef.alpha = 0.9;
  }

  function onEnter(this: ElementNode) {
    let entity = this.children.find((c) => c.states!.has("focus"));
    assertTruthy(entity && entity.href);
    navigate(entity.href);
  }

  function onEscape() {
    closeVideo();
    // Set focus back to lightning app
    document.getElementsByTagName("canvas")[0].focus();
    entityActions.setFocus();
    setBackdropAlpha(0);
  }

  function onEnterTrailer() {
    const video = playVideo();
    setActiveElement(video);
    setBackdropAlpha(0.9);
  }

  let columnRef, backdropRef, entityActions;

  return (
    <Show when={data()} keyed>
      <View x={170} onUp={() => entityActions.setFocus()} onEscape={onEscape}>
        <ContentBlock y={260} content={data().heroContent}></ContentBlock>
        <Row
          ref={entityActions}
          y={500}
          scroll="none"
          height={90}
          width={640}
          gap={40}
          onDown={() => columnRef.setFocus()}
          onEnter={onEnterTrailer}
        >
          <Button width={300} autofocus>
            Play
          </Button>
          <Button width={300}>Resume</Button>
        </Row>

        <Column
          ref={columnRef}
          x={0}
          y={columnY}
          style={styles.Column}
          height={880}
          scroll="none"
          zIndex={5}
        >
          <Show when={recommendations() && credits()}>
            <Text skipFocus style={styles.RowTitle}>
              Recommendations
            </Text>
            <TileRow
              onFocus={onRowFocus}
              onEnter={onEnter}
              items={recommendations()}
              width={1620}
            />
            <Text skipFocus style={styles.RowTitle}>
              Cast and Crew
            </Text>
            <TileRow
              onFocus={onRowFocusAnimate}
              onEnter={onEnter}
              items={credits()}
              width={1620}
            />
          </Show>
        </Column>
        <View
          ref={backdropRef}
          style={Backdrop}
          transition={{ alpha: true, y: true }}
        />
      </View>
      <View
        alpha={backdropAlpha()}
        color={hexColor("#000000")}
        skipFocus
        zIndex={200}
        transition={{ alpha: true }}
      />
    </Show>
  );
};

export default Entity;
