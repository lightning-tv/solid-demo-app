import { View, Text } from "@lightningtv/solid";
import { createTag } from "@lightningtv/solid/primitives";
import { setGlobalBackground } from "../state";
import { onCleanup } from "solid-js";

const TagsPage = () => {
  setGlobalBackground("#111");
  const watchIconTextStyle = {
    fontWeight: 600,
    fontSize: 22,
    lineHeight: 40,
    y: 1,
  };

  const ActionTag = createTag(
    <View color={'#118322ff'} borderRadius={8} display="flex" padding={8}>
      <Text style={watchIconTextStyle}>
        Action
      </Text>
    </View>
  );

  const ComedyTag = createTag(
    <View color={'#250fceff'} borderRadius={8} display="flex" padding={8}>
      <Text style={watchIconTextStyle}>
        Comedy
      </Text>
    </View>
  );

  const DramaTag = createTag(
    <View color={'#ff0000ff'} borderRadius={8} display="flex" padding={8}>
      <Text style={watchIconTextStyle}>
        Drama
      </Text>
    </View>
  );

  const NewEpisodeTag = createTag(
    <View color={'#fff'} borderRadius={8} display="flex" padding={8} effects={{ rounded: { radius: [ 10, 0, 10, 0 ]} }}>
      <Text style={watchIconTextStyle} color={'#000'} fontWeight={400}>
        New Episode
      </Text>
    </View>
  );


  onCleanup(() => {
    ActionTag.destroy();
    ComedyTag.destroy();
    DramaTag.destroy();
    NewEpisodeTag.destroy();
  });

  return (
    <>
      <Text x={100} y={100} fontSize={50} color="#ffffff">Tags Page</Text>

      <View x={150} y={200} display="flex" flexDirection="row" gap={16} flexWrap="wrap" autofocus>
        <ComedyTag />
        <DramaTag />
        <ActionTag />
        <NewEpisodeTag />
        <ComedyTag />
        <DramaTag />
        <ActionTag />
        <NewEpisodeTag />
        <ComedyTag />
        <DramaTag />
        <ActionTag />
        <NewEpisodeTag />
        <ComedyTag />
        <DramaTag />
        <ActionTag />
        <NewEpisodeTag />
        <ComedyTag />
        <DramaTag />
        <ActionTag />
        <NewEpisodeTag />
        <ComedyTag />
        <DramaTag />
        <ActionTag />
        <NewEpisodeTag />
        <ComedyTag />
        <DramaTag />
        <ActionTag />
        <NewEpisodeTag />
        <ComedyTag />
        <DramaTag />
        <ActionTag />
        <NewEpisodeTag />
        <ComedyTag />
        <DramaTag />
        <ActionTag />
      </View>
    </>
  );
};

export default TagsPage;
