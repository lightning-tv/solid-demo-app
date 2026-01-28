import { a as createSignal, o as onMount, s as setGlobalBackground, c as createComponent, C as Column, T as Text, R as Row, D as styles, V as View, m as mergeProps } from "./index-CaTkshWx.js";

const FlexGrow = () => {
    const RowStyles = {
        display: "flex",
        justifyContent: "flexStart",
        width: 1600,
        height: 110,
        color: 4294967295
    };
    const rowTitle = {
        fontSize: 44,
        marginTop: 25,
        marginBottom: -20,
        skipFocus: true
    };
    const red = 4278190335;
    const darkorange = 4287365375;
    const green = 16711935;
    function Block(props) {
        const styles2 = {
            width: props.flexGrow ? 0 : 200,
            height: 100,
            y: 5
        };
        return createComponent(View, mergeProps(props, {
            style: styles2
        }));
    }
    const [columnY, setColumnY] = createSignal(50);
    function onFocus() {
        this.children[this.selected || 0].setFocus();
        setColumnY(150 + (this.y || 0) * -1);
    }
    onMount(() => {
        setGlobalBackground(858993663);
    });
    const gap = 50;
    return createComponent(Column, {
        x: 160,
        get y() {
            return columnY();
        },
        gap: 30,
        height: 850,
        get width() {
            return RowStyles.width;
        },
        get style() {
            return styles.Column;
        },
        get children() {
            return [ createComponent(Text, {
                style: rowTitle,
                children: "Flex Start RTL"
            }), createComponent(Row, {
                gap: gap,
                direction: "rtl",
                style: RowStyles,
                onFocus: onFocus,
                get children() {
                    return [ createComponent(Block, {
                        flexGrow: 1,
                        autofocus: true,
                        color: red
                    }), createComponent(Block, {
                        flexGrow: 2,
                        color: darkorange
                    }), createComponent(Block, {
                        color: green
                    }) ];
                }
            }), createComponent(Text, {
                style: rowTitle,
                children: "Flex End with Flex Grow"
            }), createComponent(Row, {
                gap: gap,
                style: RowStyles,
                onFocus: onFocus,
                get children() {
                    return [ createComponent(Block, {
                        color: green
                    }), createComponent(Block, {
                        flexGrow: 1,
                        color: red
                    }), createComponent(Block, {
                        flexGrow: 2,
                        color: darkorange
                    }) ];
                }
            }), createComponent(Text, {
                style: rowTitle,
                children: "Space Between with Flex Grow"
            }), createComponent(Row, {
                gap: gap,
                justifyContent: "spaceBetween",
                style: RowStyles,
                onFocus: onFocus,
                get children() {
                    return [ createComponent(Block, {
                        flexGrow: 1,
                        color: red
                    }), createComponent(Block, {
                        flexGrow: 1,
                        flexOrder: -1,
                        color: darkorange
                    }), createComponent(Block, {
                        flexGrow: 2,
                        color: green
                    }) ];
                }
            }) ];
        }
    });
};

export { FlexGrow as default };
