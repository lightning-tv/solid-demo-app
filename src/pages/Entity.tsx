import {
  ElementNode,
  Text,
  View,
  Show,
  assertTruthy,
  setActiveElement
} from "@lightningtv/solid";
import { Column, Row } from "@lightningtv/solid/primitives";

import { createEffect, on, createSignal } from "solid-js";
import { TileRow, Button } from "../components";
import { setGlobalBackground } from "../state";
import ContentBlock from "../components/ContentBlock";
import { useNavigate } from "@solidjs/router";
import styles from "../styles";
import * as player from "../video";

const Entity = (props) => {
  const [backdropAlpha, setBackdropAlpha] = createSignal(0);
  const navigate = useNavigate();

  createEffect(
    on(
      props.data.entity,
      (data) => {
        setGlobalBackground(data.backgroundImage);
      },
      { defer: true }
    )
  );

  const columnY = 640;

  const Backdrop = {
    color: "#000000",
    alpha: 0,
    width: 1900,
    height: 890,
    x: -160,
    y: columnY,
    borderRadius: 30
  };

  function onRowFocus(this: ElementNode) {
    this.children[this.selected || 0].setFocus();
    columnRef.y = columnY;
    backdropRef.y = columnY;
    backdropRef.alpha = 0;
  }

  function onRowFocusAnimate(this: ElementNode) {
    this.children[this.selected || 0].setFocus();
    columnRef.y = 200;
    backdropRef.y = 160;
    backdropRef.alpha = 0.9;
  }

  function onEnter(this: ElementNode) {
    let entity = this.children.find((c) => c.states.has("focus"));
    assertTruthy(entity && entity.item?.href);
    navigate(entity.item.href as string);
  }

  function onEscape() {
    //closeVideo();
    // Set focus back to lightning app
    document.getElementsByTagName("canvas")[0].focus();
    entityActions.setFocus();
    setBackdropAlpha(0);
  }

  function onEnterTrailer() {
    console.log("onEnterTrailer");
    //const video = playVideo();
    //setActiveElement(video);
    // setBackdropAlpha(0.9);
    navigate("/player/123");
  }

  let columnRef, backdropRef, entityActions;

  /**
   * I used to have keyed on Show - This would cause the entire tree to be destroyed and recreated. Without keyed, the data is diffed and the nodes are reused and passed in new props.
   * Only one element gets deleted and recreated - a text node for reviews.
   *
   * However this causes problems with elements which have internal state like Row & Column because the selected does not get reset.
   */
  return (
    <Show when={props.data.entity()}>
      <View x={170} onUp={() => entityActions.setFocus()} onEscape={onEscape}>
        <ContentBlock
          y={260}
          content={props.data.entity().heroContent}
        ></ContentBlock>
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
          <Button width={300} autofocus={props.data.entity()}>
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
          <Show when={props.data.recommendations() && props.data.credits()}>
            <Text skipFocus style={styles.RowTitle}>
              Recommendations
            </Text>
            <TileRow
              onFocus={onRowFocus}
              onEnter={onEnter}
              items={props.data.recommendations()}
              width={1620}
            />
            <Text skipFocus style={styles.RowTitle}>
              Cast and Crew
            </Text>
            <TileRow
              onFocus={onRowFocusAnimate}
              onEnter={onEnter}
              items={props.data.credits()}
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
        color={"#000000"}
        skipFocus
        zIndex={200}
        transition={{ alpha: true }}
      />
    </Show>
  );
};

export default Entity;
