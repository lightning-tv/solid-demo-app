import {
  createEffect,
  createMemo,
  on,
  createSignal,
  Show,
  createSelector,
  For,
} from "solid-js";
import { ElementNode, View, activeElement } from "@lightningjs/solid";
import { Column } from "@lightningjs/solid-ui";
import { useNavigate, useParams } from "@solidjs/router";
import { TileRow } from "../components";
import styles from "../styles";
import { setGlobalBackground } from "../state";
import browseProvider from "../api/providers/browse";
import { createInfiniteScroll } from "../components/pagination";
import ContentBlock from "../components/ContentBlock";
import { assertTruthy } from "@lightningjs/renderer/utils";
import { debounce } from "@solid-primitives/scheduled";

const Browse = () => {
  const params = useParams();
  const [columnY, setcolumnY] = createSignal(0);
  const [heroContent, setHeroContent] = createSignal({});
  const navigate = useNavigate();
  const isFirst = createSelector(() => {
    return 0;
  });

  const provider = createMemo(() => {
    return createInfiniteScroll(browseProvider(params.filter || "all"));
  });

  const delayedBackgrounds = debounce(
    (img: string) => setGlobalBackground(img),
    400,
  );
  const delayedHero = debounce(
    (content: {}) => setHeroContent(content || {}),
    200,
  );

  createEffect(
    on(
      activeElement,
      (elm) => {
        if (elm.backdrop) {
          delayedBackgrounds(elm.backdrop);
        }

        if (elm.heroContent) {
          delayedHero(elm.heroContent);
        }
      },
      { defer: true },
    ),
  );

  function onRowFocus(this: ElementNode) {
    this.children.selected?.setFocus();
    setcolumnY((this.y || 0) * -1 + 24);
    let numPages = provider().pages().length;
    this.parent!.selected = this.parent!.children.indexOf(this);

    if (
      numPages === 0 ||
      (this.parent.selected && this.parent.selected >= numPages - 2)
    ) {
      provider().setPage((p) => p + 1);
    }
  }

  function onEnter(this: ElementNode) {
    let entity = this.children.find((c) => c.states!.has("focus"));
    assertTruthy(entity && entity.href);
    navigate(entity.href);
    return true;
  }

  return (
    <Show when={provider().pages().length}>
      <ContentBlock y={360} x={162} content={heroContent()} />
      <View clipping style={styles.itemsContainer}>
        <Column
          id="BrowseColumn"
          plinko
          announce="All Trending - Week"
          y={columnY()}
          scroll="none"
          style={styles.Column}
        >
          <For each={provider().pages()}>
            {(items, i) => (
              <TileRow
                autofocus={isFirst(i())}
                items={items}
                width={1620}
                onFocus={onRowFocus}
                onEnter={onEnter}
              />
            )}
          </For>
        </Column>
      </View>
    </Show>
  );
};

export default Browse;
