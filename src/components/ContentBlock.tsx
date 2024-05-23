import { View, Text } from "@lightningjs/solid";
import { For, Show } from "solid-js";
import { withPadding } from "@lightningjs/solid-primitives";
import theme from "theme";
withPadding;

const blockWidth = 900;

const ContentBlockStyle = {
  display: "flex",
  flexDirection: "column",
  flexBoundary: "fixed",
  width: blockWidth,
  height: 220,
  gap: 16,
};

const HeadlineStyles = {
  ...theme.typography.display2,
  fontFamily: "Ubuntu",
  fontWeight: 700,
  maxLines: 1,
  width: blockWidth,
  contain: "width",
};
const Headline = (props) => <Text {...props} style={HeadlineStyles}></Text>;

const DescriptionStyles = {
  ...theme.typography.body1,
  fontFamily: "Ubuntu",
  fontWeight: 400,
  lineHeight: 32,
  width: blockWidth,
  maxLines: 3,
  contain: "width",
};

const BadgeStyle = {
  fontSize: 16,
  lineHeight: 20,
};

const Description = (props) => (
  <Text {...props} style={DescriptionStyles}>
    {props.children}
  </Text>
);

const Badge = (props) => {
  return (
    <node
      use:withPadding={[8, 13, 11, 13]}
      {...props}
      style={{
        color: "0x00000099",
        borderRadius: 8,
        border: { width: 2, color: "0xffffffff" },
      }}
    >
      <Text style={BadgeStyle}>{props.children}</Text>
    </node>
  );
};

const MetaTextStyle = {
  ...theme.typography.body2,
  fontFamily: "Ubuntu",
  fontWeight: 400,
};

const Metadata = (props) => (
  <View
    style={{
      display: "flex",
      flexDirection: "row",
      gap: 18,
      width: blockWidth,
      height: 48,
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
    <Headline>{props.content.title}</Headline>
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
