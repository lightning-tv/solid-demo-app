import { Text, TextStyles, View } from "@lightningtv/solid";

import { createSignal, createEffect } from "solid-js";
import { setGlobalBackground } from "../state";
import { Row } from "@lightningtv/solid/primitives";
import { Lifecycle, Account, Device, Localization } from "@firebolt-js/sdk";
export default function Firebolt() {
  const fireboltApis = ["Lifecycle", "Audio", "Make", "Model", "latlong"];
  const [activeIndex, setActiveIndex] = createSignal(0);
  const [data, setData] = createSignal("");
  setGlobalBackground("#000000");

  createEffect(() => {
    switch (activeIndex()) {
      case 0:
        setData("LifeCycle state is " + Lifecycle.state());
        break;
      case 1:
        Device.audio().then((supportedAudioProfiles) => {
          setData("DolbyAtmos " + supportedAudioProfiles.dolbyAtmos);
        });
        break;
      case 2:
        Device.make().then((make) => {
          setData("Device Make is " + make);
        });
        break;
      case 3:
        Account.id().then((id) => {
          setData("AccountId is " + id);
        });
        break;
      case 4:
        Localization.latlon().then((val) => {
          setData(`Lat value is ${val[0]}, Long value is ${val[1]}`);
        });
        break;
    }
  });

  const apiStyle: TextStyles = {
    color: "#FFF",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    $focus: {
      color: "#446b9e"
    }
  };

  return (
    <View>
      <Text y={-120} fontSize={24} center>
        Press Right and Left to change API
      </Text>
      <Row autofocus center y={-60} onSelectedChanged={setActiveIndex}>
        {fireboltApis.map((api, index) => (
          <Text style={apiStyle}>{api}</Text>
        ))}
      </Row>
      <Text center>{data()}</Text>
    </View>
  );
}
