import { createSignal, createSelector, For } from "solid-js";
import { ElementNode, View, Text, assertTruthy } from "@lightningtv/solid";
import { Column, Row } from "@lightningtv/solid/primitives";
import { useNavigate } from "@solidjs/router";
import styles from "../styles";

const Portal = () => {
    const navigate = useNavigate();
    const isFirst = createSelector(() => {
        return 0;
    });

    function onEnter(this: ElementNode) {
        let entity = this.children[this.selected || 0];
        assertTruthy(entity && entity.id);
        navigate("/" + entity.id);
    }

    const flexDemos = [
        {
            title: "Focus Basics",
            id: "focusbasics",
            description: "Quick guide on Focus",
        },
        {
            title: "Key Handling",
            id: "keyhandling",
            description: "Understanding Key Handling",
        },
        {
            title: "Loop Basics",
            id: "loops",
            description: "Understanding For, Index, Lazy and List",
        },
        {
            title: "Infinite Items",
            id: "infinite",
            description: "Learn how to manage large list of items",
        },
        {
            title: "Layout Basics",
            id: "layout",
            description: "Quick guide on Layout",
        },
        {
            title: "Flex Row",
            id: "flex",
            description: "Flex Row Implementation",
        },
        {
            title: "Flex Column",
            id: "flexcolumn",
            description: "Flex Column Implementation",
        },
        {
            title: "Flex Grow",
            id: "flexgrow",
            description: "Flex Grow Examples",
        },
        {
            title: "Flex Row Vertical Align",
            id: "flexsize",
            description: "Flex Row Vertical Align Implementation",
        },
        {
            title: "Flex Column Vertical Align",
            id: "flexcolumnsize",
            description: "Flex Column Vertical Align Implementation",
        },
        {
            title: "Flex Layout Tests",
            id: "superflex",
            description: "Complicated flex layouts",
        },
    ];

    const demos = [
        {
            title: "Positioning",
            id: "positioning",
            description: "Positioning Elements",
        },
        {
            title: "Gradients",
            id: "gradients",
            description: "Basic Gradients",
        },
        {
            title: "Transitions",
            id: "transitions",
            description: "Comparing different Transitions",
        },
        {
            title: "TMDB",
            id: "tmdb",
            description: "TMDB Example",
        },
        {
            title: "Grid Primitive for Layout",
            id: "tmdbgrid",
            description: "Using Grid component",
        },
        {
            title: "Firebolt Integration",
            id: "firebolt",
            description: "Firebolt API Integration",
        },
        {
            title: "Components",
            id: "components",
            description: "Reusable Components",
        },
        {
            title: "Focus Handling",
            id: "focushandling",
            description: "Dealing with Focus Handling",
        },
        {
            title: "Grid",
            id: "grid",
            description: "Infinite Scroll Grid",
        },
        {
            title: "Destroy",
            id: "destroy",
            description: "Using onDestroy to animate destruction",
        },
        {
            title: "Text",
            id: "text",
            description: "Text layout with flexbox",
        },
        {
            title: "TextPoster",
            id: "textposter",
            description: "Text layout with flex and Poster",
        },
        {
            title: "Create Elements",
            id: "create",
            description: "Testing Show + children + inserting text",
        },
        {
            title: "Viewport",
            id: "viewport",
            description: "Events going in and out of viewport",
        },
    ];

    function DemoTile(props) {
        const Container = {
            width: 370,
            height: 320,
            borderRadius: 6,
            scale: 1,
            color: "#182b44",
            transition: { color: true, scale: true },
            $focus: {
                scale: 1.1,
                color: 0xffffffff,
            },
        };
        const [hasFocus, setHasFocus] = createSignal(false);

        return (
            <View {...props} onFocusChanged={setHasFocus} style={Container}>
                <View x={30}>
                    <Text y={30} fontSize={84} color={hasFocus() ? 0x000000ff : 0xffffffff}>
                        {props.index}
                    </Text>
                    <Text
                        y={140}
                        fontSize={42}
                        width={340}
                        height={42}
                        contain="both"
                        color={hasFocus() ? 0x000000ff : 0xffffffff}
                    >
                        {props.title}
                    </Text>
                    <Text
                        y={200}
                        fontSize={28}
                        width={330}
                        contain="width"
                        color={hasFocus() ? 0x000000ff : 0xffffffff}
                    >
                        {props.description}
                    </Text>
                </View>
            </View>
        );
    }

    return (
        <View colorTop={0x446b9eff} colorBottom={0x2c4f7cff}>
            <View x={120}>
                <View src="./assets/solidjs.png" width={101} height={90} y={40} />
                <Text fontSize={90} x={110} y={40}>
                    Examples
                </Text>
                <View y={140} height={1} width={1800} color={0xe8d7f9ff} />
            </View>
            <Column scroll="none" y={200} x={170} gap={80} autofocus>
                <Row onEnter={onEnter} gap={40} height={320} flexBoundary="contain" scroll="always">
                    <For each={demos}>{(demo, i) => <DemoTile index={i()} {...demo} />}</For>
                </Row>

                <Row onEnter={onEnter} gap={40} height={320} flexBoundary="contain" scroll="always">
                    <For each={flexDemos}>{(demo, i) => <DemoTile index={i()} {...demo} />}</For>
                </Row>
            </Column>
        </View>
    );
};

export default Portal;
