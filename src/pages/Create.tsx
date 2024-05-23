import {
  IntrinsicNodeStyleProps,
  IntrinsicTextNodeStyleProps,
  Text,
  View,
  hexColor,
} from "@lightningjs/solid";
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
    color: hexColor("00000000"),
  } satisfies IntrinsicNodeStyleProps;

  const SublineContainer = {
    width: 900,
    height: 36,
    gap: 6,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flexStart",
    color: hexColor("00000000"),
  } satisfies IntrinsicNodeStyleProps;

  const Title = {
    fontSize: 42,
  };

  const Subline = {
    fontSize: 26,
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
    color: hexColor("#0000ff"),
  } as const;

  const someOtherStyle = {
    // pretty red
    color: hexColor("#f54242"),
    focus: {
      // pretty blue
      color: hexColor("#4287f5"),
    },
  };

  function ChildTest(props) {
    // This causes a parent not rendered error since we're rendering it twice in the template
    const resolved = children(() => props.children);
    return (
      <View {...props} style={[someOtherStyle, props.style, [styleChild]]}>
        <View
          id="child1"
          width={100}
          height={100}
          color={hexColor("#ff0000")}
          y={25}
        >
          {resolved()}
          <View
            id="subChild"
            x={150}
            width={100}
            height={100}
            color={hexColor("#00ff00")}
          />
          <Text>{props.title}</Text>
        </View>
        <View width={100} height={100} color={hexColor("#ffff00")} y={175}>
          {resolved()}
        </View>
      </View>
    );
  }

  const borderStyles = {
    borderLeft: {
      width: 8,
      color: 0x05b2b626,
    },
    borderTop: {
      width: 8,
      color: 0x25a2bd26,
    },
    borderRight: {
      width: 8,
      color: 0x05b2b626,
    },
    borderBottom: {
      width: 8,
      color: 0xc5b23626,
    },
  } as const;

  const childTestPassedStyles = {
    // grey color
    color: hexColor("#cccccc"),
    focus: {
      // black
      color: hexColor("#000000"),
    },
  };

  const childTestPassedStyles2 = {
    // white color
    color: hexColor("#ffffff"),
    focus: {
      // white something...
      color: hexColor("#f6f6cc"),
    },
  };

  function hasFocus(elm) {
    // This doesnt work yet - need to make states reactive
    return elm.states.has("focus");
  }

  return (
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
        style={[childTestPassedStyles2, childTestPassedStyles]}
      >
        <Text>Child Test</Text>
      </ChildTest>
      <View
        ref={myBox}
        style={borderStyles}
        width={100}
        height={100}
        color={hexColor("#00ff00")}
        x={900}
        y={400}
        alpha={hasFocus(myBox) ? 1 : 0.2}
      />
    </View>
  );
};

export default CreatePage;
