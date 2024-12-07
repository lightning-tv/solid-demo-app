import { createEffect, on, createSignal } from "solid-js";
import { ElementNode, activeElement, View, Text } from "@lightningtv/solid";
import { LazyUp } from "@lightningtv/solid/primitives";
import { Column, Row } from "@lightningtv/solid/primitives";
import { Hero, TitleRow } from "../components";
import styles from "../styles";
import { setGlobalBackground } from "../state";
import ContentBlock from "../components/ContentBlock";
import { debounce } from "@solid-primitives/scheduled";

const TMDB = (props) => {
  const [heroContent, setHeroContent] = createSignal({});
  let contentBlock,
    solidLogo,
    firstRun = true;

  const delayedBackgrounds = debounce(setGlobalBackground, 800);
  const delayedHero = debounce(
    (content: {}) => setHeroContent(content || {}),
    600
  );

  createEffect(
    on(
      activeElement,
      (elm) => {
        if (!elm) return;

        if (firstRun) {
          elm.backdrop && setGlobalBackground(elm.backdrop);
          elm.heroContent && setHeroContent(elm.heroContent);
          firstRun = false;
        } else {
          elm.backdrop && delayedBackgrounds(elm.backdrop);
          elm.heroContent && delayedHero(elm.heroContent);
        }
      },
      { defer: true }
    )
  );

  function onSelectedChanged(this: ElementNode, selectedIndex, column, row) {
    const values =
      selectedIndex === 0 ? { y: 300, alpha: 1 } : { y: 200, alpha: 0 };
    contentBlock
      .animate(values, { duration: 300, easing: "ease-in-out" })
      .start();

    const values2 =
      selectedIndex === 0 ? { y: 80, alpha: 1 } : { y: 0, alpha: 0 };
    solidLogo
      .animate(values2, { duration: 300, easing: "ease-in-out" })
      .start();
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

      <ContentBlock
        ref={contentBlock}
        y={300}
        x={162}
        content={heroContent()}
      />
      <LazyUp
        y={500}
        component={Column}
        direction="column"
        upCount={3}
        each={props.data.rows}
        id="BrowseColumn"
        onSelectedChanged={onSelectedChanged}
        autofocus={props.data.rows[0].items()}
        gap={40}
        transition={{ y: { duration: 300, easing: "ease-in-out" } }}
        style={styles.Column}
      >
        {(row) =>
          row().type === "Hero" ? (
            <LazyUp
              component={Row}
              direction="row"
              gap={80}
              upCount={3}
              scroll="center"
              centerScroll
              each={row().items()}
              y={50}
              height={row().height}
            >
              {(item) => <Hero {...item()} />}
            </LazyUp>
          ) : (
            <TitleRow
              row={row()}
              title={row().title}
              height={row().height}
              items={row().items()}
            />
          )
        }
      </LazyUp>
    </>
  );
};

export default TMDB;
