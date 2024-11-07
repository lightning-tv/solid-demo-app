import { Text, View } from "@lightningtv/solid";
import { onMount } from "solid-js";
import { setGlobalBackground } from "../state";

const TextPosterPage = () => {
  const styles = {
    detailPane: {
      x: 150,
      y: 63,
      width: 1326,
      height: 954,
      border: {
        color: "#535353",
        width: 1,
      },
      borderRadius: 15,
      linearGradient: {
        colors: [0x2c2a3bff, 0x3a3847ff, 0x4c4859ff] as number[],
        angle: 4.1,
      },
    },
    detailTitle: {
      x: 50,
      y: 27,
      fontSize: 30,
      fontWeight: "bold",
    },
    detailImage: {
      width: 570,
      height: 839,
      x: 50,
      y: 80,
      borderRadius: 15,
    },
    detailDescriptionPane: {
      x: 679,
      y: 80,
      width: 602,
      height: 839,
      display: "flex",
      flexDirection: "column",
      gap: 30,
    },
    detailDescription: {
      width: 602,
      display: "flex",
    },
    detailDescriptionTitle: {
      width: 602,
      color: "#F0CB00",
      fontSize: 22,
      fontWeight: "bold",
    },
    detailDescriptionText: {
      width: 602,
      fontSize: 22,
    },
  } as const;

  onMount(() => {
    setGlobalBackground("#000000");
  });

  return (
    <View style={styles.detailPane}>
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
      </View>
    </View>
  );
};

export default TextPosterPage;
