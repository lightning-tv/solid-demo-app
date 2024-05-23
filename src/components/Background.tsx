import { type AnimationSettings } from "@lightningjs/renderer";
import { globalBackground } from "../state.js";
import {
  type IntrinsicNodeStyleProps,
  View,
  Text,
  hexColor,
} from "@lightningjs/solid";
import { createEffect, on } from "solid-js";
import theme from "theme";

export default function Background() {
  let bg1, bg2, heroMask;
  let active = 0;
  const alpha = 1;
  const animationSettings = {
    duration: 750,
    easing: "ease-in-out",
  } satisfies Partial<AnimationSettings>;
  const bgStyles = {
    alpha,
    color: 0xffffffff,
  } satisfies IntrinsicNodeStyleProps;

  function changeBackgrounds(img: string) {
    if (img.startsWith("#")) {
      bg1.color = hexColor(img);
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

    if (active === 0) {
      bg1.src = img;
      active = 1;
      return;
    }

    if (active === 1) {
      bg2.src = img;
      active = 2;
      bg2.alpha = 0;
      bg2.animate({ alpha }, animationSettings).start();
      bg1.animate({ alpha: 0 }, animationSettings).start();
      return;
    }

    if (active === 2) {
      bg1.src = img;
      active = 1;
      bg1.alpha = 0;
      bg1.animate({ alpha }, animationSettings).start();
      bg2.animate({ alpha: 0 }, animationSettings).start();
    }
  }

  createEffect(
    on(
      globalBackground,
      (img: string) => {
        changeBackgrounds(img);
      },
      { defer: true },
    ),
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
      </View>
    </>
  );
}
