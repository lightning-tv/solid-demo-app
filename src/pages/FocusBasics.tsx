import { View, activeElement } from "@lightningtv/solid";
import { Row, Column } from "@lightningtv/solid/primitives";
import { setGlobalBackground } from "../state";
import { createEffect, on } from "solid-js";
import { Block } from "../components/";

const FocusPage = () => {
  setGlobalBackground("#333");
  let rowContainer, myBlock, redBlock;

  createEffect(
    on(
      activeElement,
      (elm) => {
        console.log(elm);
      },
      { defer: true }
    )
  );

  return (
    <View x={250} y={200} onUp={() => myBlock.setFocus()}>
      {/* Autofocus sets focus on this element when it's created */}
      <Block
        ref={myBlock}
        color="#1212df"
        onDown={() => rowContainer.setFocus()}
        autofocus
      />

      <Row y={200} ref={rowContainer}>
        <Block ref={redBlock} color="#ff0000" />
        <Block color="#286e17" />
        <Block color="#1c1c97" />
      </Row>
    </View>
  );
};

export default FocusPage;
