import { c as createComponent, V as View, C as Column, F as For, R as Row } from "./index-DQC749ds.js";

const blockStyle = {
    color: 1548615679,
    scale: 1,
    $focus: {
        color: 4278255615,
        scale: 1.1
    },
    transition: {
        color: {
            duration: .3
        },
        scale: {
            duration: .3
        }
    }
};

const Matrix = () => {
    const rows = Array.from({
        length: 1
    });
    const blocks = Array.from({
        length: 6
    });
    return createComponent(View, {
        color: 505290495,
        width: 1920,
        height: 1080,
        get children() {
            return createComponent(Column, {
                x: 160,
                y: 100,
                gap: 50,
                autofocus: true,
                get children() {
                    return createComponent(For, {
                        each: rows,
                        children: () => createComponent(Row, {
                            gap: 30,
                            height: 250,
                            get children() {
                                return createComponent(For, {
                                    each: blocks,
                                    children: () => createComponent(View, {
                                        width: 150,
                                        height: 250,
                                        style: blockStyle
                                    })
                                });
                            }
                        })
                    });
                }
            });
        }
    });
};

export { Matrix as default };
