import { createEffect, on, createSignal, Show, onMount } from "solid-js";
import { View } from "@lightningtv/solid";
import { Hero } from "../components";
import { setGlobalBackground } from "../state";

type hero = {
  backdrop: string;
  src: string;
  title: string;
  overview: string;
};

const Destroy = (props) => {
  const [heroContent, setHeroContent] = createSignal<hero>();
  const [heroIndex, setHeroIndex] = createSignal(0);

  onMount(() => setGlobalBackground("#333"));

  createEffect(
    on([props.data.heroRow.items, heroIndex], ([heros, index]) => {
      if (heros) setHeroContent(heros[index]);
      // preload next image
      if (heros && index < heros.length - 1) {
        const img = new Image();
        img.crossOrigin = "anonymous"; // Enable CORS
        img.src = heros[index + 1].backdrop;
      }
    })
  );

  function onDown() {
    if (heroIndex() >= 19) return false;
    setHeroIndex((p) => p + 1);
  }

  function onUp() {
    if (heroIndex() === 0) return false;
    setHeroIndex((p) => p - 1);
    return true;
  }

  function animateOut(node) {
    return node
      .animate({ y: 200, alpha: 0 }, { duration: 500, easing: "ease-in-out" })
      .start()
      .waitUntilStopped();
  }

  function animateIn(node) {
    node.alpha = 0;
    node.y = -100;
    return node
      .animate({ y: 0, alpha: 1 }, { duration: 500, easing: "ease-in-out" })
      .start()
      .waitUntilStopped();
  }

  return (
    <View x={300} y={200} onDown={onDown} onUp={onUp}>
      {/* The keyed attribue makes Solid destroy the old content and create a new copy allowing for the animation */}
      <View
        src={"assets/up.svg"}
        width={350}
        height={200}
        x={450}
        y={-200}
        rotation={Math.PI}
      />
      <Show when={heroContent()} keyed>
        <Hero
          id="Hero"
          autofocus
          onDestroy={animateOut}
          onCreate={animateIn}
          item={heroContent()!}
          title={heroContent()!.title}
        />
      </Show>
    </View>
  );
};

export default Destroy;
