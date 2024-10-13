import { createEffect, on, createSignal, For } from "solid-js";
import {
  ElementNode,
  View,
  activeElement,
  assertTruthy,
} from "@lightningtv/solid";
import { Column } from "@lightningtv/solid-ui";
import { useNavigate } from "@solidjs/router";
import { TitleRow } from "../components";
import styles from "../styles";
import { setGlobalBackground } from "../state";
import ContentBlock from "../components/ContentBlock";
import { debounce } from "@solid-primitives/scheduled";

const TMDB = (props) => {
  const [offsetY, setoffsetY] = createSignal(500);
  const [heroContent, setHeroContent] = createSignal({});
  const navigate = useNavigate();
  let contentBlock,
    firstRun = true;

  const delayedBackgrounds = debounce(
    (img: string) => setGlobalBackground(img),
    800
  );
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
          // no content set yet, set right away
          if (elm.backdrop) {
            setGlobalBackground(elm.backdrop);
          }

          if (elm.heroContent) {
            setHeroContent(elm.heroContent);
          }

          firstRun = false;
          return;
        }

        if (elm.backdrop) {
          delayedBackgrounds(elm.backdrop);
        }

        if (elm.heroContent) {
          delayedHero(elm.heroContent);
        }
      },
      { defer: true }
    )
  );

  function onSelectedChanged(this: ElementNode, selectedIndex, column, row) {
    setoffsetY(selectedIndex === 0 ? 500 : 100);
    const values =
      selectedIndex === 0 ? { y: 300, alpha: 1 } : { y: 200, alpha: 0 };
    contentBlock
      .animate(values, { duration: 300, easing: "ease-in-out" })
      .start();
  }

  function onEnter(this: ElementNode) {
    this.display = "flex";
    let entity = this.children.find((c) =>
      c.states!.has("focus")
    ) as ElementNode;
    assertTruthy(entity && entity.href);
    navigate(entity.href);
    return true;
  }

  const yTransition = { duration: 300, easing: "ease-in-out" };

  return (
    <>
      <ContentBlock
        ref={contentBlock}
        y={300}
        x={162}
        content={heroContent()}
      />
      <View y={offsetY()} transition={{ y: yTransition }}>
        <Column
          id="BrowseColumn"
          plinko
          announce="All Trending - Week"
          scroll="always"
          onSelectedChanged={onSelectedChanged}
          autofocus={props.data.rows[0].items()}
          style={styles.Column}
          gap={40}
          transition={{ y: yTransition }}
        >
          <For each={props.data.rows}>
            {(row) => (
              <TitleRow
                row={row}
                title={row.title}
                height={row.height}
                items={row.items()}
              />
            )}
          </For>
        </Column>
      </View>
    </>
  );
};

export default TMDB;
