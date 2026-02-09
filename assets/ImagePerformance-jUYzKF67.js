import { a as createSignal, o as onMount, c as createComponent, V as View, F as For, T as Text, X as api, Y as getImageUrl } from "./index-B6bd2mBv.js";

const ImagePerformance = () => {
    const [images, setImages] = createSignal([]);
    const [loadTime, setLoadTime] = createSignal("");
    const [status, setStatus] = createSignal("Initializing...");
    const [loadedCount, setLoadedCount] = createSignal(0);
    let startTime = 0;
    const imageLoadTimes = {};
    const totalImages = 40;
    const fetchImages = async () => {
        try {
            setStatus("Fetching images...");
            const page1 = await api.get("/movie/popular?page=1");
            const page2 = await api.get("/movie/popular?page=2");
            const combined = [ ...page1.results, ...page2.results ].slice(0, 40);
            const newImages = combined.map(item => ({
                id: item.id,
                src: getImageUrl(item.poster_path, "w185"),
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
        if (currentCount % 10 === 0) {
            performance.mark("images-loaded-".concat(currentCount));
        }
        if (currentCount === totalImages) {
            const totalTime = now - startTime;
            setLoadTime("".concat(totalTime.toFixed(2), "ms"));
            setStatus("Loaded in ".concat(totalTime.toFixed(2), "ms"));
            console.log("Individual Image Load Times:", imageLoadTimes);
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
                            const col = index() % 8;
                            const row = Math.floor(index() / 8);
                            const x = 175 + col * 220.71;
                            const y = 50 + row * 188.75;
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

export { ImagePerformance as default };
