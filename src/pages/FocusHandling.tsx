import { View } from "@lightningtv/solid";
import { Row, Column } from "@lightningtv/solid/primitives";
import { setGlobalBackground } from "../state";

const styles = {
  button: {
    alpha: 0.4,
    $focus: {
      alpha: 1
    }
  }
};
function Button(props) {
  return (
    <View
      {...props}
      width={200}
      height={60}
      style={styles.button}
      color={props.color || "#e0e0e0"}
    />
  );
}

const PositioningPage = () => {
  setGlobalBackground("#1e293b");

  const leftMenuStyle = {
    width: 200,
    height: 240,
    $focus: {
      width: 900,
      transition: true
    }
  };

  return (
    <View x={450} y={200}>
      {/* Disable flex layout on this Row */}
      <Row display="block">
        {/* Send focus to the first child (the column) */}
        <View
          forwardFocus={0}
          style={leftMenuStyle}
          colorLeft={"#475569aa"}
          colorRight={"#64748baa"}
          zIndex={5}
        >
          <Column id="SideMenu" gap={20}>
            <Button color="#e4e4e7" />
            <Button color="#e4e4e7" />
            <Button color="#e4e4e7" />
          </Column>
        </View>
        {/* Row and Column take care of focus with built in on{Direction} handlers */}
        <Column x={250} gap={20} plinko autofocus>
          <Row gap={20} height={60}>
            <Button color="#ef4444" />
            <Button color="#f97316" />
            <Button color="#84cc16" />
          </Row>
          <Row gap={20} height={60}>
            <Button color="#10b981" />
            <Button color="#06b6d4" />
            <Button color="#3b82f6" />
          </Row>
          <Row gap={20} height={60}>
            <Button color="#8b5cf6" />
            <Button color="#d946ef" />
            <Button color="#f43f5e" />
          </Row>
        </Column>
      </Row>
    </View>
  );
};

export default PositioningPage;
