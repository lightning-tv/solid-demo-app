import { Component } from "solid-js";
import { IntrinsicTextNodeStyleProps, Text, View } from "@lightningtv/solid";
import type { Meta, StoryObj } from "storybook-solidjs-vite";

const customTheme = {
  headlineBold: {
    fontFamily: "Roboto",
    fontSize: 38,
    fontWeight: 700,
    lineHeight: 46,
    verticalAlign: "bottom"
  } satisfies IntrinsicTextNodeStyleProps,
  headline: {
    fontFamily: "Roboto",
    fontSize: 38,
    fontWeight: 400,
    lineHeight: 46,
    verticalAlign: "bottom"
  } satisfies IntrinsicTextNodeStyleProps,
  callout: {
    fontFamily: "Roboto",
    fontSize: 31,
    fontWeight: 400,
    lineHeight: 38,
    verticalAlign: "bottom"
  } satisfies IntrinsicTextNodeStyleProps,
  calloutBold: {
    fontFamily: "Roboto",
    fontSize: 31,
    fontWeight: 700,
    lineHeight: 38,
    verticalAlign: "bottom"
  } satisfies IntrinsicTextNodeStyleProps,
  body: {
    fontFamily: "Roboto",
    fontSize: 29,
    fontWeight: 400,
    lineHeight: 36,
    verticalAlign: "bottom"
  } satisfies IntrinsicTextNodeStyleProps,
  bodyBold: {
    fontFamily: "Roboto",
    fontSize: 29,
    fontWeight: 700,
    lineHeight: 36,
    verticalAlign: "bottom"
  } satisfies IntrinsicTextNodeStyleProps,
  caption1: {
    fontFamily: "Roboto",
    fontSize: 25,
    fontWeight: 400,
    lineHeight: 32,
    verticalAlign: "bottom"
  } satisfies IntrinsicTextNodeStyleProps,
  caption1Bold: {
    fontFamily: "Roboto",
    fontSize: 25,
    fontWeight: 700,
    lineHeight: 32,
    verticalAlign: "bottom"
  } satisfies IntrinsicTextNodeStyleProps,
  caption2: {
    fontFamily: "Roboto",
    fontSize: 23,
    fontWeight: 400,
    lineHeight: 30,
    verticalAlign: "bottom"
  } satisfies IntrinsicTextNodeStyleProps,
  caption2Bold: {
    fontFamily: "Roboto",
    fontSize: 23,
    fontWeight: 700,
    lineHeight: 30,
    verticalAlign: "bottom"
  } satisfies IntrinsicTextNodeStyleProps,
  caption3: {
    fontFamily: "Roboto",
    fontSize: 18,
    fontWeight: 400,
    lineHeight: 21.09,
    verticalAlign: "bottom"
  } satisfies IntrinsicTextNodeStyleProps,
  caption3Bold: {
    fontFamily: "Roboto",
    fontSize: 18,
    fontWeight: 700,
    lineHeight: 21.09,
    verticalAlign: "bottom"
  } satisfies IntrinsicTextNodeStyleProps
};

const TypographyStory: Component = (props: any) => {
  return (
    <View
      style={{
        height: 100,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        border: { color: 0xffffff66, width: 3 }
      }}
    >
      <Text
        style={{
          fontFamily: props.theme.fontFamily,
          fontSize: props.theme.fontSize,
          fontWeight: props.theme.fontWeight,
          verticalAlign: props.theme.verticalAlign,
          lineHeight: props.theme.lineHeight
        }}
      >
        {props.title}
      </Text>
    </View>
  );
};

const meta: Meta<typeof TypographyStory> = {
  title: "Design System/Typography",
  component: TypographyStory,
  tags: ["!autodocs"]
};
export default meta;

type Story = StoryObj<typeof TypographyStory>;

export const headlineBold: Story = { args: { theme: customTheme.headlineBold, title: "headlineBold" } };
export const headline: Story = { args: { theme: customTheme.headline, title: "headline" } };
export const callout: Story = { args: { theme: customTheme.callout, title: "callout" } };
export const calloutBold: Story = { args: { theme: customTheme.calloutBold, title: "calloutBold" } };
export const body: Story = { args: { theme: customTheme.body, title: "body" } };
export const bodyBold: Story = { args: { theme: customTheme.bodyBold, title: "bodyBold" } };
export const caption1: Story = { args: { theme: customTheme.caption1, title: "caption1" } };
export const caption1Bold: Story = { args: { theme: customTheme.caption1Bold, title: "caption1Bold" } };
export const caption2: Story = { args: { theme: customTheme.caption2, title: "caption2" } };
export const caption2Bold: Story = { args: { theme: customTheme.caption2Bold, title: "caption2Bold" } };
export const caption3: Story = { args: { theme: customTheme.caption3, title: "caption3" } };
export const letterSpacing: Story = { args: { theme: customTheme.headlineBold, title: "toronto" } };
