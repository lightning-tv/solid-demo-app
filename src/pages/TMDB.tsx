import { createEffect, on, createSignal } from "solid-js";
import { ElementNode, activeElement, View, Text } from "@lightningtv/solid";
import { LazyRow, LazyColumn, useFocusStack, VirtualRow } from "@lightningtv/solid/primitives";
import { Hero, TitleRow, AssetPanel } from "../components";
import styles from "../styles";
import { setGlobalBackground } from "../state";
import ContentBlock from "../components/ContentBlock";
import { debounce } from "@solid-primitives/scheduled";

const TMDB = (props) => {
  const [heroContent, setHeroContent] = createSignal({});
  const [openPanel, setOpenPanel] = createSignal(false);
  const { storeFocus, restoreFocus } = useFocusStack();
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
        const item = elm.item || ({} as any);

        if (firstRun) {
          item.backdrop && setGlobalBackground(item.backdrop);
          item.heroContent && setHeroContent(item.heroContent);
          firstRun = false;
        } else {
          item.backdrop && delayedBackgrounds(item.backdrop);
          item.heroContent && delayedHero(item.heroContent);
        }
      },
      { defer: true }
    )
  );

  function onRowChanged(this: ElementNode, selectedIndex, column, row, lastIndex) {
    if (selectedIndex === lastIndex) return;

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
    <View forwardFocus={2}>
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
      <LazyColumn
        y={500}
        upCount={3}
        each={props.data.rows}
        id="BrowseColumn"
        onSelectedChanged={onRowChanged}
        onEnter={() => setOpenPanel(true)}
        autofocus={props.data.rows[0].items()}
        gap={40}
        transition={{ y: { duration: 300, easing: "ease-in-out" } }}
        style={styles.Column}
      >
        {(row) =>
          row().type === "Hero" ? (
            <VirtualRow
              gap={80}
              displaySize={3}
              bufferSize={1}
              scroll="center"
              centerScroll
              each={row().items()}
              y={50}
              height={row().height}
            >
              {(item) => <Hero item={item()} />}
            </VirtualRow>
          ) : (
            <TitleRow
              row={row()}
              title={row().title}
              height={row().height}
              items={row().items()}
            />
          )
        }
      </LazyColumn>
      <AssetPanel onFocus={storeFocus} close={() => {
        setOpenPanel(false);
        restoreFocus();
        return true;
      }} open={openPanel()} item={heroContent()} />
    </View>
  );
};

export default TMDB;
