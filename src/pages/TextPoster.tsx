import { Text, View, type NodeStyles } from "@lightningtv/solid";
import { Row } from "@lightningtv/solid/primitives";
import { onMount } from "solid-js";
import { setGlobalBackground } from "../state";

const ButtonContainer: NodeStyles = {
  display: "flex",
  color: "#ffffff",
  alignItems: "center",
  padding: 32,
  gap: 8,
  height: 50,
  effects: {
    radius: { radius: 8 },
    border: {
      width: 2,
      color: "#000000CC"
    }
  }
};

const CircleContainer: NodeStyles = {
  height: 50,
  width: 50,
  color: "#ffffff",
  effects: {
    radius: { radius: 50 },
    border: {
      width: 2,
      color: "#000000CC"
    }
  }
};
const ButtonIcon = (props) => {
  return (
    <View style={ButtonContainer}>
      <View src={props.icon} width={26} height={26}></View>
      <Text fontSize={28} lineHeight={50} color={"#000000"}>
        {props.children}
      </Text>
    </View>
  );
};

const Button = (props) => {
  return (
    <View style={ButtonContainer}>
      <Text fontSize={28} lineHeight={50} color={"#000000"}>
        {props.children}
      </Text>
    </View>
  );
};

const CircleIcon = (props) => {
  return (
    <View style={CircleContainer}>
      <View
        x={25}
        y={25}
        mount={0.5}
        src={props.icon}
        width={30}
        height={30}
      ></View>
    </View>
  );
};

const TextPosterPage = () => {
  const styles = {
    detailPane: {
      x: 150,
      y: 63,
      width: 1326,
      height: 954,
    },
    detailTitle: {
      x: 50,
      y: 27,
      fontSize: 30,
      fontWeight: "bold"
    },
    detailImage: {
      width: 570,
      height: 839,
      x: 50,
      y: 80,
      borderRadius: 15
    },
    detailDescriptionPane: {
      x: 679,
      y: 80,
      width: 602,
      height: 839,
      display: "flex",
      flexDirection: "column",
      gap: 30
    },
    detailDescription: {
      width: 602,
      display: "flex"
    },
    detailDescriptionTitle: {
      width: 602,
      color: "#F0CB00",
      fontSize: 22,
      fontWeight: "bold"
    },
    detailDescriptionText: {
      width: 602,
      fontSize: 22
    }
  } as const;

  onMount(() => {
    setGlobalBackground("#000000");
  });

  return (
    <View id="TextPosterPage" style={styles.detailPane}>
      <Text style={styles.detailTitle}>Movie Name</Text>
      <View style={styles.detailImage} src="https://placehold.co/400x600.png" />
      <View style={styles.detailDescriptionPane}>
        <View style={styles.detailDescription}>
          <Text style={styles.detailDescriptionTitle}>Release Date :</Text>
          <Text style={styles.detailDescriptionText}>10/10/2022</Text>
        </View>

        <View style={styles.detailDescription}>
          <Text style={styles.detailDescriptionTitle}>Genre :</Text>
          <Text style={styles.detailDescriptionText}> Action</Text>
        </View>

        <Text style={styles.detailDescriptionTitle}>Plot :</Text>
        <Text
          style={styles.detailDescriptionText}
          contain="both"
          maxLines={10}
          marginTop={-20}
          height={400}
          overflowSuffix="..."
        >
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata Lorem ipsum dolor
          sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
          invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
          At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
          kasd gubergren, no sea takimata Cast : Tom cruise, ma3ti
          benabdelkader, oussama ramzi
        </Text>
        <Row gap={20} autofocus>
          <ButtonIcon icon="./assets/playIcon.png">Play</ButtonIcon>
          <Button>More Info</Button>
          <CircleIcon icon="./assets/thumbsUp.png"></CircleIcon>
          <CircleIcon icon="./assets/thumbsDown.png"></CircleIcon>
        </Row>
      </View>
    </View>
  );
};

export default TextPosterPage;
