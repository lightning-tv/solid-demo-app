import { a as createSignal, o as onMount, c as createComponent, V as View, F as For, T as Text, X as api, Y as getImageUrl } from "./index-C4XzYpcz.js";

const MixedImagePerformance = () => {
    const [images, setImages] = createSignal([]);
    const [loadTime, setLoadTime] = createSignal("");
    const [status, setStatus] = createSignal("Initializing...");
    const [loadedCount, setLoadedCount] = createSignal(0);
    let startTime = 0;
    const imageLoadTimes = {};
    const totalImages = 11;
    const fetchImages = async () => {
        try {
            setStatus("Fetching images...");
            const page1 = await api.get("/movie/popular?page=1");
            const combined = page1.results.slice(0, 11);
            const newImages = combined.map((item, index) => {
                const isMain = index === 0;
                const size = isMain ? "original" : "w342";
                const path = isMain && item.backdrop_path ? item.backdrop_path : item.poster_path;
                return {
                    id: item.id,
                    src: getImageUrl(path, size),
                    title: item.title,
                    isMain: isMain
                };
            });
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
        performance.mark("mixed-images-loaded-".concat(currentCount));
        if (currentCount === totalImages) {
            const totalTime = now - startTime;
            setLoadTime("".concat(totalTime.toFixed(2), "ms"));
            setStatus("Loaded in ".concat(totalTime.toFixed(2), "ms"));
            console.log("Individual Mixed Image Load Times:", imageLoadTimes);
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
        mainImage: {
            width: 1152,
            height: 648,
            x: (1920 - 1152) / 2,
            y: 50
        },
        poster: {
            width: 150,
            height: 225
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
                            if (item.isMain) {
                                return createComponent(View, {
                                    get style() {
                                        return styles.mainImage;
                                    },
                                    get src() {
                                        return item.src;
                                    },
                                    onEvent: {
                                        loaded: () => handleImageLoaded(i, item.id)
                                    }
                                });
                            }
                            const posterIndex = i - 1;
                            const gap = 20;
                            const startX = 120;
                            const startY = 750;
                            const x = startX + posterIndex * (150 + gap);
                            const y = startY;
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
                                    loaded: () => handleImageLoaded(i, item.id)
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

export { MixedImagePerformance as default };
