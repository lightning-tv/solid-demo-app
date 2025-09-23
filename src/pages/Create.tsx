import {
  IntrinsicNodeStyleProps,
  Text,
  View,
  combineStyles,
  hexColor
} from "@lightningtv/solid";
import { Show, children, createSignal, onMount } from "solid-js";
import { setGlobalBackground } from "../state";

const CreatePage = () => {
  const OverviewContainer = {
    width: 900,
    height: 500,
    y: 50,
    x: 150,
    gap: 25,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flexStart",
    color: hexColor("00000000")
  } satisfies IntrinsicNodeStyleProps;

  const SublineContainer = {
    width: 900,
    height: 36,
    gap: 6,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flexStart",
    color: hexColor("00000000")
  } satisfies IntrinsicNodeStyleProps;

  const Title = {
    fontSize: 42
  };

  const Subline = {
    fontSize: 26
  };

  let myBox, childRef;
  onMount(() => {
    setGlobalBackground("#000000");
    myBox.animate({ x: 100 }, { duration: 2000 }).start();
  });

  const [insertTest, setInsertTest] = createSignal<string | undefined>();
  const [emptyTest, setEmptyTest] = createSignal<string | undefined>();

  setTimeout(() => {
    setInsertTest("- Inserted -");
    childRef
      .getChildById("child1")
      //.searchChildrenById('subChild') - more expensive version of getChildById
      ?.animate({ x: 600 }, { duration: 2000 })
      .start();
  }, 2000);

  const styleChild = {
    width: 400,
    height: 300,
    // Solid blue
    color: "#0000ff"
  } as const;

  const someOtherStyle = {
    // pretty red
    color: "#f54242",
    $focus: {
      // pretty blue
      color: "#4287f5"
    }
  };

  function ChildTest(props) {
    // This causes a parent not rendered error since we're rendering it twice in the template
    const resolved = children(() => props.children);
    return (
      <View
        {...props}
        style={combineStyles(someOtherStyle, props.style, styleChild)}
      >
        <View id="child1" width={100} height={100} color={"#ff0000"} y={25}>
          {resolved()}
          <View
            id="subChild"
            x={150}
            width={100}
            height={100}
            color={"#00ff00"}
          />
          <Text>{props.title}</Text>
        </View>
        <View width={100} height={100} color={"#ffff00"} y={175}>
          {resolved()}
        </View>
      </View>
    );
  }

  function PosTest(props) {
    return (
      <View {...props} width={400} height={400} color={"#0000ff"}>
        <View width={50} height={50} color={"#ff0000"} right={0}>
          <Text fontSize={18}>Right</Text>
        </View>
        <View width={50} height={50} color={"#ff0000"} bottom={0}>
          <Text fontSize={18}>Bottom</Text>
        </View>
        <View
          width={50}
          height={50}
          color={"#ff0000"}
          bottom={0}
          right={0}
          data={{ id: "BR" }}
        >
          <Text fontSize={18}>BR</Text>
        </View>
      </View>
    );
  }

  const borderStyles = {
    border: {
      width: 0,
      color: 0x05b2b626
    },
    borderRadius: 32
  } as const;

  const childTestPassedStyles = {
    // grey color
    color: "#cccccc",
    $focus: {
      // black
      color: "#000000"
    }
  };

  const childTestPassedStyles2 = {
    // white color
    color: "#ffffff",
    $focus: {
      // white something...
      color: "#f6f6cc"
    }
  };

  function hasFocus(elm) {
    // This doesnt work yet - need to make states reactive
    return elm.states.has("focus");
  }

  return (
    <>
    <View style={OverviewContainer}>
      <Text style={Title}>Title of the Page</Text>
      <View style={SublineContainer}>
        <Text>{emptyTest()}</Text>
        <Text style={Subline}>Sub {insertTest()} Text</Text>
        <Show when={insertTest()}>
          <View width={28} height={28} src={"./assets/rt-popcorn.png"}></View>
        </Show>
        <Text style={Subline}>More Text</Text>
      </View>
      <ChildTest
        autofocus
        ref={childRef}
        style={combineStyles(childTestPassedStyles2, childTestPassedStyles)}
      >
        <Text>Child Test</Text>
      </ChildTest>
      <View
        ref={myBox}
        style={borderStyles}
        width={100}
        height={100}
        color={"#00ff00"}
        x={900}
        y={400}
      />
      <PosTest x={100} y={100} />
    </View>
    <View x={1100} y={50} width={200} height={200} linearGradient={{
        colors: [0xffc107ff, 0xff9800ff, 0xff5252ff],
        angle: 4.1,
        stops: [0, 0.5, 1]
      }}>
      </View>
    </>
  );
};

export default CreatePage;
