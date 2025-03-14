import {createEffect, createMemo, on, createSignal, Show, For} from "solid-js";
import {ElementNode, View, activeElement, assertTruthy} from "@lightningtv/solid";
import {Column} from "@lightningtv/solid/primitives";
import {useNavigate, usePreloadRoute} from "@solidjs/router";
import {TileRow} from "../components";
import styles from "../styles";
import {setGlobalBackground} from "../state";
import {createInfiniteScroll} from "../components/pagination";
import ContentBlock from "../components/ContentBlock";
import {debounce} from "@solid-primitives/scheduled";

const Browse = (props) => {
  const [columnY, setcolumnY] = createSignal(0);
  const preload = usePreloadRoute();
  const [heroContent, setHeroContent] = createSignal({});
  const navigate = useNavigate();
  let firstRun = true;

  const provider = createMemo(() => {
    return createInfiniteScroll(props.data());
  });

  const delayedBackgrounds = debounce((img: string) => setGlobalBackground(img), 800);
  const delayedHero = debounce((content: {}) => setHeroContent(content || {}), 600);

  createEffect(
    on(
      activeElement,
      (elm) => {
        if (!elm) return;

        const item = elm.item || ({} as any);

        if (firstRun) {
          // no content set yet, set right away
          if (item.backdrop) {
            setGlobalBackground(item.backdrop);
          }

          if (item.heroContent) {
            setHeroContent(item.heroContent);
          }

          preload(`/browse/tv`, {preloadData: true});
          preload(`/browse/movie`, {preloadData: true});

          firstRun = false;
          return;
        }

        if (item.href) {
          preload(item.href, {preloadData: true});
        }

        if (item.backdrop) {
          delayedBackgrounds(item.backdrop);
        }

        if (item.heroContent) {
          delayedHero(item.heroContent);
        }
      },
      {defer: true},
    ),
  );

  function onRowFocus(this: ElementNode) {
    (this.children[this.selected || 0] as ElementNode).setFocus();
    setcolumnY((this.y || 0) * -1 + 24);
    let numPages = provider().pages().length;
    this.parent!.selected = this.parent!.children.indexOf(this);

    if (numPages === 0 || (this.parent!.selected && this.parent!.selected >= numPages - 2)) {
      provider().setPage((p) => p + 1);
    }
  }

  function onEnter(this: ElementNode) {
    this.display = "flex";
    let entity = this.children.find((c) => c.states!.has("focus")) as ElementNode;
    assertTruthy(entity && entity.item?.href);
    navigate(entity.item.href);
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
          autofocus
          style={styles.Column}
        >
          <For each={provider().pages()}>
            {(items) => <TileRow items={items} width={1620} onFocus={onRowFocus} onEnter={onEnter} />}
          </For>
        </Column>
      </View>
    </Show>
  );
};

export default Browse;
