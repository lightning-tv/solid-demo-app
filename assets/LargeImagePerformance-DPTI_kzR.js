import { a as createSignal, o as onMount, c as createComponent, V as View, F as For, T as Text, X as api, Y as getImageUrl } from "./index-C4XzYpcz.js";

const LargeImagePerformance = () => {
    const [images, setImages] = createSignal([]);
    const [loadTime, setLoadTime] = createSignal("");
    const [status, setStatus] = createSignal("Initializing...");
    const [loadedCount, setLoadedCount] = createSignal(0);
    let startTime = 0;
    const imageLoadTimes = {};
    const totalImages = 4;
    const fetchImages = async () => {
        try {
            setStatus("Fetching images...");
            const page1 = await api.get("/movie/popular?page=1");
            const combined = page1.results.slice(0, 4);
            const newImages = combined.map(item => ({
                id: item.id,
                src: getImageUrl(item.backdrop_path || item.poster_path, "original"),
                title: item.title
            }));
            startTime = performance.now();
            setImages(newImages);
            setStatus("Loading... 0/".concat(totalImages));
        } catch (error) {
            console.error("Error fetching images:", error);
            setStatus("Error fetching images");
        }
    };
    const handleImageLoaded = (index, id) => {
        const now = performance.now();
        const elapsed = now - startTime;
        imageLoadTimes[id] = elapsed;
        const currentCount = loadedCount() + 1;
        setLoadedCount(currentCount);
        setStatus("Loading... ".concat(currentCount, "/").concat(totalImages));
        performance.mark("large-images-loaded-".concat(currentCount));
        if (currentCount === totalImages) {
            const totalTime = now - startTime;
            setLoadTime("".concat(totalTime.toFixed(2), "ms"));
            setStatus("Loaded in ".concat(totalTime.toFixed(2), "ms"));
            console.log("Individual Large Image Load Times:", imageLoadTimes);
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
            width: 800,
            height: 450
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
                            const i = index();
                            let x = 0;
                            let y = 0;
                            const width = 800;
                            const height = 450;
                            const paddingLeft = 170;
                            const paddingOther = 50;
                            if (i === 0) {
                                x = paddingLeft;
                                y = paddingOther;
                            } else if (i === 1) {
                                x = 1920 - paddingOther - width;
                                y = paddingOther;
                            } else if (i === 2) {
                                x = paddingLeft;
                                y = 1080 - paddingOther - height;
                            } else if (i === 3) {
                                x = 1920 - paddingOther - width;
                                y = 1080 - paddingOther - height;
                            }
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
                pointerEvents: "none",
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

export { LargeImagePerformance as default };
