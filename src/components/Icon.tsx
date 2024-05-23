import { For, IntrinsicNodeProps, View } from "@lightningjs/solid";
import { createSpriteMap } from "@lightningjs/solid-primitives";
// Icons from https://uxwing.com/

const basePath = import.meta.env.BASE_URL;

const icons = [
  { name: "experiment", width: 81, height: 100, x: 0, y: 0 },
  { name: "trending", width: 100, height: 56, x: 81, y: 0 },
  { name: "tv", width: 100, height: 68, x: 181, y: 0 },
  { name: "movie", width: 94, height: 100, x: 282, y: 0 },
];

interface IconProps extends IntrinsicNodeProps {
  name: string;
}

function Icon(props: IconProps) {
  const sprite = createSpriteMap(basePath + "assets/icons_white.png", icons);

  return (
    <View
      {...props}
      texture={sprite[props.name]}
      width={sprite[props.name].props.width}
      height={sprite[props.name].props.height}
      x={(100 - (sprite[props.name].props.width || 0)) / 2}
      y={(100 - (sprite[props.name].props.height || 0)) / 2}
    ></View>
  );
}

export default Icon;
export function PreviewIcons() {
  return (
    <>
      <View
        src={`${basePath}assets/icons.png`}
        width={375}
        height={100}
        y={10}
      />
      <For each={icons}>
        {(icon, i) => <Icon name={icon.name} y={100} x={i() * 105} />}
      </For>
    </>
  );
}
