import {
  createMemo,
  createSignal,
  Show,
  onCleanup
} from "solid-js";
import {
  ElementNode,
  View,
  activeElement,
  assertTruthy
} from "@lightningtv/solid";
import { Column, VirtualGrid, Image } from "@lightningtv/solid/primitives";
import { useNavigate, usePreloadRoute } from "@solidjs/router";
import { Thumbnail, TileRow } from "../components";
import styles from "../styles";
import { setGlobalBackground } from "../state";
import { createInfiniteScroll } from "../components/pagination";
import ContentBlock from "../components/ContentBlock";
import { debounce } from "@solid-primitives/scheduled";

const Browse = (props) => {
  const preload = usePreloadRoute();
  const [heroContent, setHeroContent] = createSignal({});
  const navigate = useNavigate();
  let firstRun = true;
  let vgRef;

  onCleanup(() => {
    console.log('cleanup');
  })

  const provider = createMemo(() => {
    return createInfiniteScroll(props.data());
  });

  const delayedBackgrounds = debounce(
    (img: string) => setGlobalBackground(img),
    800
  );
  const delayedHero = debounce(
    (content: {}) => setHeroContent(content || {}),
    600
  );

  function updateContentBlock(_index, _col, elm) {
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

      // preload(`/browse/tv`, { preloadData: true });
      // preload(`/browse/movie`, { preloadData: true });

      firstRun = false;
      return;
    }

    if (item.href) {
      // preload(item.href, { preloadData: true });
    }

    if (item.backdrop) {
      delayedBackgrounds(item.backdrop);
    }

    if (item.heroContent) {
      delayedHero(item.heroContent);
    }
  }

  function onEndReached(this: ElementNode) {
    provider().setPage((p) => p + 1);
  }

  function onEnter(this: ElementNode) {
    this.display = "flex";
    let entity = this.children.find((c) =>
      c.states!.has("focus")
    ) as ElementNode;
    assertTruthy(entity && entity.item?.href);
    navigate(entity.item.href);
    return true;
  }

  return (
    <Show when={provider().pages().length}>
      <ContentBlock y={360} x={162} content={heroContent()} forwardFocus={() => vgRef.setFocus()} />
      <View clipping style={styles.itemsContainer}>
        <VirtualGrid
          y={24}
          x={160}
          id="BrowseGrid"
          ref={vgRef}
          scroll="always"
          announce={`All Trending ${props.params.filter}`}
          onEnter={onEnter}
          columns={7}
          gap={50}
          rows={2}
          buffer={2}
          onSelectedChanged={updateContentBlock}
          onEndReached={onEndReached}
          onEndReachedThreshold={22}
          width={1620}
          autofocus
          each={provider().pages()}>
          {(item) =>
            <Thumbnail item={item()} />
          }
        </VirtualGrid>
      </View>
    </Show>
  );
};

export default Browse;
