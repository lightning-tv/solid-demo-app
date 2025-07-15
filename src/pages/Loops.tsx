import { createSignal, For, Index } from "solid-js";
import { View, Text } from "@lightningtv/solid";
import { LazyRow, Column, Row } from "@lightningtv/solid/primitives";
import { List } from "@solid-primitives/list";
import { Poster } from "../components";
import { setGlobalBackground } from "../state";

const Loops = (props) => {
  const [activeRow, setActiveRow] = createSignal(props.data.rows[0]);

  let contentBlock,
    currentIndex = 0,
    solidLogo;

  setGlobalBackground("#000000");

  const titleRowStyles = {
    fontFamily: "Raleway",
    fontSize: 24,
    height: 32,
    lineHeight: 32
  };

  function switchRow(e) {
    if (e.key === "[") {
      currentIndex = Math.max(0, currentIndex - 1);
    }
    if (e.key === "]") {
      currentIndex = Math.min(props.data.rows.length - 1, currentIndex + 1);
    }

    if (e.key === "\\") {
      const row = props.data.rows[0];
      const items = row.items().slice().reverse();
      row.setItems(items);
      return;
    }

    setActiveRow(props.data.rows[currentIndex]);
  }

  return (
    <>
      <View
        ref={solidLogo}
        width={300}
        height={150}
        x={162}
        y={80}
        zIndex={105}
      >
        <Text x={80} fontSize={28} color={0xf6f6f699}>
          Built With:
        </Text>
        <View y={32} src="./assets/solidWord.png" width={280} height={52} />

        <View x={0} y={110} src="./assets/tmdb.png" width={80} height={41} />
        <Text
          x={90}
          y={110}
          contain="width"
          width={160}
          fontSize={12}
          color={0xf6f6f699}
        >
          This product uses the TMDB API but is not endorsed or certified by
          TMDB.
        </Text>
      </View>
      <Column autofocus={activeRow()?.items()} y={240} onKeyPress={switchRow}>
        <View x={160} height={300} forwardFocus={1} marginTop={30}>
          <Text skipFocus style={titleRowStyles}>
            For Loop
          </Text>
          <Row gap={20} y={40} display="block">
            <For each={activeRow()?.items()}>
              {(item, index) => <Poster x={index() * 210} {...item} />}
            </For>
          </Row>
        </View>

        <View x={160} height={300} forwardFocus={1} marginTop={30}>
          <Text skipFocus style={titleRowStyles}>
            Map Loop
          </Text>
          <Row gap={20} y={40} display="block">
            {activeRow()
              ?.items()
              ?.map((item, index) => <Poster x={index * 210} {...item} />)}
          </Row>
        </View>

        <View x={160} height={300} forwardFocus={1} marginTop={30}>
          <Text skipFocus style={titleRowStyles}>
            Index Loop
          </Text>
          <Row gap={20} y={40} display="block">
            <Index each={activeRow()?.items()}>
              {(item, index) => <Poster x={index * 210} {...item()} />}
            </Index>
          </Row>
        </View>

        <View x={160} height={300} forwardFocus={1} marginTop={30}>
          <Text skipFocus style={titleRowStyles}>
            Lazy Row Loop
          </Text>
          <LazyRow
            display="block"
            gap={20}
            upCount={5}
            each={activeRow()?.items()}
            y={50}
          >
            {(item, index) => <Poster x={index * 210} {...item()} />}
          </LazyRow>
        </View>

        <View x={160} height={300} forwardFocus={1} marginTop={30}>
          <Text skipFocus style={titleRowStyles}>
            List Loop
          </Text>
          <Row gap={20} y={40} display="block">
            <List each={activeRow()?.items()}>
              {(item, index) => (
                <Poster
                  x={index() * 210}
                  {...item()}
                  transition={{ x: { duration: 5550 } }}
                />
              )}
            </List>
          </Row>
        </View>
      </Column>
    </>
  );
};

export default Loops;
