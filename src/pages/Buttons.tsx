import {
  View,
  Text,
  ElementNode,
  IntrinsicNodeStyleProps,
} from "@lightningtv/solid";
import { Button, Badge } from "@lightningtv/solid-ui";
import { Row } from "@lightningtv/solid-ui";

const ButtonsPage = () => {
  function onEnter(this: ElementNode, event, elm) {
    this.states.toggle("disabled");
  }

  const RowStyles = {
    display: "flex",
    justifyContent: "flexStart",
    width: 1500,
    height: 300,
    color: "#00000000",
    gap: 26,
    y: 400,
  } satisfies IntrinsicNodeStyleProps;

  return (
    <>
      <Row x={100} y={200} gap={5} style={RowStyles}>
        <Badge>HD</Badge>
        <Badge>PG13</Badge>
        <Badge>NC17</Badge>
        <Text fontSize={30}>I like bananas</Text>
        <Badge>DOLBY</Badge>
      </Row>

      <Row x={100} gap={40} style={RowStyles}>
        <Button autofocus onEnter={onEnter}>
          TV Shows
        </Button>
        <Button states={{ active: true, disabled: false }}>Movies</Button>
        <Button states={"active"}>Sports</Button>
        <Button states="disabled">News</Button>
      </Row>
    </>
  );
};

export default ButtonsPage;
