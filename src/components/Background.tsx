import { globalBackground } from "../state.js";
import {
  type IntrinsicNodeStyleProps,
  type AnimationSettings,
  View,
  hexColor
} from "@lightningtv/solid";
import { createEffect, on, onMount } from "solid-js";
import theme from "theme";

export default function Background() {
  const params = new URLSearchParams(window.location.search);
  const disableBG = params.get("disableBG") === "true";

  let bg1, bg2, heroMask;
  let active = 0;
  const alpha = 1;
  const animationSettings = {
    duration: 550,
    easing: "ease-in-out"
  } satisfies Partial<AnimationSettings>;
  const bgStyles = {
    alpha,
    color: 0xffffffff
  } satisfies IntrinsicNodeStyleProps;

  onMount(() => {
    if (disableBG) {
      heroMask.src = "";
      heroMask.colorLeft = "#000000";
      heroMask.colorRight = "#00000000";
      return;
    }
  });

  function changeBackgrounds(img: string | number) {
    if (disableBG) {
      heroMask.src = "";
      heroMask.colorLeft = "#000000";
      heroMask.colorRight = "#00000000";
      return;
    }

    if (typeof img !== "string") {
      bg1.color = img;
      bg1.src = "";
      bg1.alpha = 1;
      active = 1;
      bg2.alpha = 0;
      heroMask.alpha = 0;
      return;
    } else {
      bg1.color = 0xffffffff;
      heroMask.alpha = 1;
    }

    const currentBg = active === 1 ? bg2 : bg1;
    const nextBg = active === 1 ? bg1 : bg2;

    currentBg.src = img;
    if (active === 0) {
      // First time
      currentBg.alpha = 1;
    } else {
      currentBg.alpha = 0.01;
      currentBg.animate({ alpha: 1 }, animationSettings).start();
    }

    nextBg.animate({ alpha: 0.01 }, animationSettings).start();
    active = active === 1 ? 2 : 1;
  }

  createEffect(
    on(
      globalBackground,
      (img: string | number) => {
        changeBackgrounds(img);
      },
      { defer: true }
    )
  );

  return (
    <>
      <View width={1920} height={1080} zIndex={-5}>
        <View ref={bg1} style={bgStyles} />
        <View ref={bg2} style={bgStyles} alpha={0} />
        <View
          ref={heroMask}
          src="./assets/hero-mask-inverted.png"
          color={hexColor(theme.color.materialBrand)}
          width={1920}
          height={1080}
        />
        {/* <View
          ref={heroMask}
          effects={{
            radialGradient: {
              colors: ["#000000FF", "#00000000", 0x000000ff],
              stops: [0, 0.4, 1.0],
              height: 720,
              width: 1920,
              pivot: [0.8, 0],
            },
          }}
        /> */}
      </View>
    </>
  );
}
