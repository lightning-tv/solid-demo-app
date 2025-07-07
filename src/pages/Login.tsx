import {
  Text,
  View,
} from "@lightningtv/solid";
import { createSignal, onMount } from "solid-js";
import { Column } from "@lightningtv/solid/primitives";
import { setGlobalBackground } from "../state";
import Input from "../components/Input";
import {Keyboard} from "../components/Keyboard";

const LoginPage = () => {
  const Title = {
    fontSize: 42,
    fontWeight: "bold",
  } as const;

  const formats = {
    uppercase: [
      [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "0",
        {
          title: "Delete",
          size: "md",
          keyId: "delete",
          announce: "delete, button",
        },
      ],
      [
        "Q",
        "W",
        "E",
        "R",
        "T",
        "Y",
        "U",
        "I",
        "O",
        "P",
        {
          title: "#@!",
          size: "md",
          toggle: "symbols",
          announce: "symbol mode, button",
          keyId: "symbols",
        },
      ],
      [
        "A",
        "S",
        "D",
        "F",
        "G",
        "H",
        "J",
        "K",
        "L",
        "@",
        {
          title: "áöû",
          size: "md",
          toggle: "accents",
          announce: "accents, button",
          keyId: "accents",
        },
      ],
      [
        "Z",
        "X",
        "C",
        "V",
        "B",
        "N",
        "M",
        { title: ".", announce: "period, button" },
        { title: "-", announce: "dash, button" },
        { title: "_", announce: "underscore, button" },
        {
          title: "shift",
          size: "md",
          toggle: "default",
          announce: "shift off, button",
          keyId: "shift",
        },
      ],
      [
        { title: ".com", announce: "dot, com", size: "md" },
        { title: ".net", announce: "dot, net", size: "md" },
        { title: ".edu", announce: "dot, edu", size: "md" },
        { title: ".org", announce: "dot, org", size: "md" },
        { title: ".co", announce: "dot, co", size: "md" },
        { title: ".uk", announce: "dot, uk", size: "md" },
      ],
      [
        {
          title: "Clear",
          size: "lg",
          keyId: "clear",
          announce: "clear, button",
        },
        {
          title: "Space",
          size: "xl",
          keyId: "space",
          announce: "space, button",
        },
        {
          title: "Save",
          size: "lg",
          keyId: "save",
          announce: "save, button",
        },
      ],
    ],
    default: [
      [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "0",
        {
          title: "Delete",
          size: "md",
          keyId: "delete",
          announce: "delete, button",
        },
      ],
      [
        "q",
        "w",
        "e",
        "r",
        "t",
        "y",
        "u",
        "i",
        "o",
        "p",
        {
          title: "#@!",
          size: "md",
          toggle: "symbols",
          announce: "symbol mode, button",
          keyId: "symbols",
        },
      ],
      [
        "a",
        "s",
        "d",
        "f",
        "g",
        "h",
        "j",
        "k",
        "l",
        "@",
      ],
      [
        "z",
        "x",
        "c",
        "v",
        "b",
        "n",
        "m",
        { title: "_", announce: "underscore, button" },
        { title: ".", announce: "period, button" },
        { title: "-", announce: "dash, button" },
        {
          title: "shift",
          size: "md",
          toggle: "uppercase",
          announce: "shift on, button",
          keyId: "shift",
        },
      ],
      [
        { title: ".com", announce: "dot, com", size: "md" },
        { title: ".net", announce: "dot, net", size: "md" },
        { title: ".edu", announce: "dot, edu", size: "md" },
        { title: ".org", announce: "dot, org", size: "md" },
        { title: ".co", announce: "dot, co", size: "md" },
        { title: ".uk", announce: "dot, uk", size: "md" },
      ],
      [
        {
          title: "Clear",
          size: "lg",
          keyId: "clear",
          announce: "clear, button",
        },
        {
          title: "Space",
          size: "xl",
          keyId: "space",
          announce: "space, button",
        },
        {
          title: "Save",
          size: "lg",
          keyId: "save",
          announce: "save, button",
        },
      ],
    ],
  };
  const keyEvent = createSignal("");
  const valueSignal = createSignal("");
  const [ _keyEvent, setKeyEvent ] = keyEvent;

  const onEnter: lng.KeyHandler = (_e, _keyboard, key) => {
    if (typeof key.key === "string") {
      setKeyEvent(key.key as string);
    }
    else if (typeof key.key === "object") {
      if (key.key.title === 'save' || key.key.title === 'Save') {
        console.log('perform save action', valueSignal[0]());
        return true;
      }
      setKeyEvent(key.key.title as string);
    }

  };

  onMount(() => {
    setGlobalBackground("#000000");
  });

  return (
      <View width={1080} x={350} y={100}>
        <Column autofocus selected={1} scroll={"none"}>
          <Text skipFocus style={Title}>
            Username
          </Text>
          <Input valueSignal={valueSignal} keyEvents={keyEvent} />
          <Keyboard width={550} formats={formats} onEnter={onEnter} />
        </Column>
      </View>
  );
};

export default LoginPage;
