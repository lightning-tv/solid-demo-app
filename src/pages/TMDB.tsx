import { createEffect, on, createSignal, For } from "solid-js";
import {
  ElementNode,
  View,
  activeElement,
  assertTruthy,
} from "@lightningtv/solid";
import { LazyUp } from "@lightningtv/solid/primitives";
import { Column, Row } from "@lightningtv/solid-ui";
import { useNavigate } from "@solidjs/router";
import { Hero, TitleRow } from "../components";
import styles from "../styles";
import { setGlobalBackground } from "../state";
import ContentBlock from "../components/ContentBlock";
import { debounce } from "@solid-primitives/scheduled";

const TMDB = (props) => {
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
        transition={{ y: yTransition }}
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
