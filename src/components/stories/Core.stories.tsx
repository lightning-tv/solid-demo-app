import { View, Text, Show } from "@lightningtv/solid";
import { Column } from "@lightningtv/solid/primitives";
import { Meta, StoryObj } from "storybook-solidjs-vite";
import theme from "theme";

const FAKE_TEXT =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

type Story = StoryObj;
const meta: Meta = {
  title: "Components/Core",
  tags: ["!autodocs"]
};

export const BorderRadiusSmall: Story = {
  render: () => <View width={200} height={75} color={theme.color.white} borderRadius={10}></View>
};

export const BorderRadiusRound: Story = {
  render: () => <View width={50} height={50} color={theme.color.white} borderRadius={25}></View>
};

export const BorderAlignOutside: Story = {
  render: () => (
    <View
      width={200}
      height={100}
      color={theme.color.white}
      border={{ w: 4, gap: 5, color: theme.color.red, align: "outside" }}
    ></View>
  )
};

export const BorderAlignInside: Story = {
  render: () => (
    <View
      width={200}
      height={100}
      color={theme.color.white}
      border={{ w: 4, color: theme.color.red, align: "inside" }}
    ></View>
  )
};

export const BorderAlignCenter: Story = {
  render: () => (
    <View
      width={200}
      height={100}
      color={theme.color.white}
      border={{ w: 4, gap: 5, color: theme.color.red, align: "center" }}
    ></View>
  )
};

export const BorderWithTransparentColor: Story = {
  render: () => (
    <View
      width={200}
      height={100}
      color={theme.color.white}
      border={{ w: 4, gap: 10, color: theme.color.greyscaleWhite50 }}
    ></View>
  )
};

export const TextContainWidthMaxline1: Story = {
  render: () => (
    <View width={300} height={100} color={theme.color.white}>
      <Text color={theme.color.black} contain="width" maxLines={1}>
        {FAKE_TEXT}
      </Text>
    </View>
  )
};

export const TextContainBoth: Story = {
  render: () => (
    <View width={300} height={300} color={theme.color.white}>
      <Text color={theme.color.black} contain="both">
        {FAKE_TEXT}
      </Text>
    </View>
  )
};

export const TextContainWithMaxline5: Story = {
  render: () => (
    <View width={300} height={300} color={theme.color.white}>
      <Text color={theme.color.black} contain="both" maxLines={5}>
        {FAKE_TEXT}
      </Text>
    </View>
  )
};

export const CenterY: Story = {
  render: () => (
    <View width={300} height={120} color={theme.color.white}>
      <Text centerY color={theme.color.black}>
        CenterY
      </Text>
    </View>
  )
};

export const CenterX: Story = {
  render: () => (
    <View width={300} height={120} color={theme.color.white}>
      <Text centerX color={theme.color.black}>
        CenterX
      </Text>
    </View>
  )
};

export const Center: Story = {
  render: () => (
    <View width={300} height={120} color={theme.color.white}>
      <Text center color={theme.color.black}>
        Center
      </Text>
    </View>
  )
};

export const CenterWithIcon: Story = {
  render: () => (
    <View width={300} height={100} color={theme.color.white} display="flex" alignItems="center">
      <View width={50} height={50} borderRadius={50} src={"/assets/ktx/image-8.ktx"} />
      <Text color={theme.color.black}>Center with Icon</Text>
    </View>
  )
};

export const RowWithCenterItems: Story = {
  render: () => (
    <View display="flex">
      <View flexItem={false} height={250} width={300}>
        <Column>
          <View height={120} color={theme.color.white}>
            <Text center style={{ ...theme.typography.body1, color: theme.color.black }}>
              Center 1
            </Text>
          </View>
          <View width={300} height={120} color={theme.color.white}>
            <Text center style={{ ...theme.typography.body1, color: theme.color.black }}>
              Center 2
            </Text>
          </View>
        </Column>
      </View>
    </View>
  )
};

export const RowWithCenterItemsAndBorderRadiusAndFocus: Story = {
  render: () => (
    <View display="flex">
      <View flexItem={false} height={250} width={300}>
        <Column>
          <View
            height={120}
            color={theme.color.greyscaleWhite50}
            style={{ $focus: { color: theme.color.red } }}
            autofocus
            borderRadius={20}
          >
            <Text center color={theme.color.black}>
              Center 3
            </Text>
          </View>
          <View width={300} height={120} color={theme.color.greyscaleWhite50} borderRadius={20}>
            <Text center color={theme.color.black}>
              Center 4
            </Text>
          </View>
        </Column>
      </View>
    </View>
  )
};

export default meta;
