import { View, Text } from "@lightningtv/solid";
import { Marquee } from "@lightningtv/solid/primitives";
import { For, Show } from "solid-js";
import theme from "theme";

const blockWidth = 900;

const ContentBlockStyle = {
  display: "flex",
  flexDirection: "column",
  flexBoundary: "fixed",
  width: blockWidth,
  height: 220,
  gap: 16
};

const HeadlineStyles = {
  ...theme.typography.display2,
  fontFamily: "Roboto",
  fontWeight: 700,
  maxLines: 1,
  width: blockWidth,
};
const Headline = (props) => <Marquee {...props} textProps={HeadlineStyles}></Marquee>;

const DescriptionStyles = {
  ...theme.typography.body1,
  fontFamily: "Roboto",
  fontWeight: 400,
  lineHeight: 32,
  width: blockWidth,
  maxLines: 3,
  contain: "width"
};

const BadgeStyle = {
  fontSize: 16,
  lineHeight: 20,
  marginLeft: 13,
  marginRight: 13
};

const Description = (props) => (
  <Text {...props} style={DescriptionStyles}>
    {props.children}
  </Text>
);

export const Badge = (props) => {
  return (
    <View
      {...props}
      style={{
        color: "0x00000099",
        borderRadius: 8,
        border: { width: 2, color: "0xffffffff" },
        display: "flex",
        height: 36
      }}
    >
      <Text lineHeight={36} style={BadgeStyle}>
        {props.children}
      </Text>
    </View>
  );
};

const MetaTextStyle = {
  ...theme.typography.body2,
  fontFamily: "Roboto",
  fontWeight: 400
};

const Metadata = (props) => (
  <View
    style={{
      display: "flex",
      flexDirection: "row",
      gap: 18,
      width: blockWidth,
      height: 48
    }}
  >
    <View y={-4} src="./assets/stars.png" width={188} height={31}></View>
    <View
      y={-4}
      flexItem={false}
      clipping
      width={(188 * props.voteAverage) / 10}
      height={31}
    >
      <View src="./assets/stars-full.png" width={188} height={31}></View>
    </View>
    <Text style={MetaTextStyle}>{props.voteCount} reviews</Text>
    <Text style={MetaTextStyle}>{props.metaText}</Text>
    <For each={props.badges}>{(item) => <Badge y={-5}>{item}</Badge>}</For>
  </View>
);

const ContentBlock = (props) => (
  <View id="contentBlock" style={ContentBlockStyle} {...props}>
    <Headline marquee={props.marquee}>{props.content.title}</Headline>
    <Description>{props.content.description}</Description>
    <Show when={props.content.voteCount}>
      <Metadata
        metaText={props.content.metaText}
        badges={props.content.badges}
        voteCount={props.content.voteCount}
        voteAverage={props.content.voteAverage}
      />
    </Show>
  </View>
);

export default ContentBlock;
