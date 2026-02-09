import { a as createSignal, o as onMount, c as createComponent, V as View, F as For, T as Text } from "./index-B6bd2mBv.js";

const TextureCompressionPerformance = () => {
    const [images, setImages] = createSignal([]);
    const [loadTime, setLoadTime] = createSignal("");
    const [status, setStatus] = createSignal("Initializing...");
    const [loadedCount, setLoadedCount] = createSignal(0);
    let startTime = 0;
    const imageLoadTimes = {};
    const totalImages = 25;
    const fetchImages = async () => {
        try {
            setStatus("Preparing images...");
            const newImages = Array.from({
                length: totalImages
            }, (_, i) => {
                const id = i + 1;
                return {
                    id: "img-".concat(id),
                    src: "/assets/ktx/image-".concat(id, ".ktx"),
                    title: "Image ".concat(id)
                };
            });
            startTime = performance.now();
            setImages(newImages);
            setStatus("Loading... 0/".concat(totalImages));
        } catch (error) {
            console.error("Error setting up images:", error);
            setStatus("Error setting up images");
        }
    };
    const handleImageLoaded = (index, id) => {
        const now = performance.now();
        const elapsed = now - startTime;
        imageLoadTimes[id] = elapsed;
        const currentCount = loadedCount() + 1;
        setLoadedCount(currentCount);
        setStatus("Loading... ".concat(currentCount, "/").concat(totalImages));
        if (currentCount % 5 === 0) {
            performance.mark("images-loaded-".concat(currentCount));
        }
        if (currentCount === totalImages) {
            const totalTime = now - startTime;
            setLoadTime("".concat(totalTime.toFixed(2), "ms"));
            setStatus("Loaded in ".concat(totalTime.toFixed(2), "ms"));
            console.log("Individual KTX Image Load Times:", imageLoadTimes);
        }
    };
    onMount(() => {
        fetchImages();
    });
    const styles = {
        container: {
            width: 1920,
            height: 1080,
            x: 0,
            y: 0
        },
        poster: {
            width: 185,
            height: 278
        },
        statusContainer: {
            width: 1920,
            height: 1080,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 100,
            position: "absolute"
        },
        statusText: {
            fontSize: 90,
            color: 4294967295
        }
    };
    return createComponent(View, {
        get children() {
            return [ createComponent(View, {
                get style() {
                    return styles.container;
                },
                autofocus: true,
                get children() {
                    return createComponent(For, {
                        get each() {
                            return images();
                        },
                        children: (item, index) => {
                            const col = index() % 5;
                            const row = Math.floor(index() / 5);
                            const x = 175 + col * 377.5;
                            const y = 50 + row * 175.5;
                            return createComponent(View, {
                                get style() {
                                    return styles.poster;
                                },
                                get src() {
                                    return item.src;
                                },
                                x: x,
                                y: y,
                                onEvent: {
                                    loaded: () => handleImageLoaded(index(), item.id)
                                }
                            });
                        }
                    });
                }
            }), createComponent(View, {
                get style() {
                    return styles.statusContainer;
                },
                get children() {
                    return createComponent(View, {
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: 204,
                        width: 900,
                        height: 200,
                        padding: 20,
                        get children() {
                            return createComponent(Text, {
                                get style() {
                                    return styles.statusText;
                                },
                                get children() {
                                    return status();
                                }
                            });
                        }
                    });
                }
            }) ];
        }
    });
};

export { TextureCompressionPerformance as default };
