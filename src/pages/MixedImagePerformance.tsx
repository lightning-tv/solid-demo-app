import { View, Text, type NodeStyles } from "@lightningtv/solid";
import { createSignal, onMount, For, Show } from "solid-js";
import api, { getImageUrl } from "../api";

const MixedImagePerformance = () => {
  const [images, setImages] = createSignal<any[]>([]);
  const [loadTime, setLoadTime] = createSignal<string>("");
  const [status, setStatus] = createSignal<string>("Initializing...");
  const [loadedCount, setLoadedCount] = createSignal(0);

  // Track start time and individual image times
  let startTime = 0;
  const imageLoadTimes: Record<string, number> = {};
  const totalImages = 11; // 1 main + 10 posters

  const fetchImages = async () => {
    try {
      setStatus("Fetching images...");
      const page1 = await api.get("/movie/popular?page=1");

      const combined = page1.results.slice(0, 11);

      const newImages = combined.map((item, index) => {
        // First image is the main one (landscape/backdrop logic if possible, or just use poster)
        // Others are posters
        const isMain = index === 0;
        const size = isMain ? "original" : "w342";
        // Use backdrop for main if available to look better, else poster
        const path = isMain && item.backdrop_path ? item.backdrop_path : item.poster_path;

        return {
            id: item.id,
            src: getImageUrl(path, size),
            title: item.title,
            isMain
        };
      });

      // Start timing right before setting images which triggers rendering
      startTime = performance.now();
      setImages(newImages);
      setStatus(`Loading... 0/${totalImages}`);
    } catch (error) {
      console.error("Error fetching images:", error);
      setStatus("Error fetching images");
    }
  };

  const handleImageLoaded = (index: number, id: string) => {
    const now = performance.now();
    const elapsed = now - startTime;

    // Store individual time
    imageLoadTimes[id] = elapsed;

    const currentCount = loadedCount() + 1;
    setLoadedCount(currentCount);
    setStatus(`Loading... ${currentCount}/${totalImages}`);

    // Performance mark
    performance.mark(`mixed-images-loaded-${currentCount}`);

    // Check if all loaded
    if (currentCount === totalImages) {
      const totalTime = now - startTime;
      setLoadTime(`${totalTime.toFixed(2)}ms`);
      setStatus(`Loaded in ${totalTime.toFixed(2)}ms`);
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
    } as NodeStyles,
    mainImage: {
      width: 1152, // 60% of 1920
      height: 648, // 16:9 of 1152
      x: (1920 - 1152) / 2, // Centered
      y: 50
    } as NodeStyles,
    poster: {
      width: 150,
      height: 225,
    } as NodeStyles,
    statusContainer: {
      width: 1920,
      height: 1080,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 100,
      position: "absolute",
    } as NodeStyles,
    statusText: {
      fontSize: 90,
      color: "#ffffff",
    }
  };

  return (
    <View>
      <View style={styles.container} autofocus={true}>
        <For each={images()}>
          {(item, index) => {
            const i = index();
            /**
             * Index 0: Main Image
             * Index 1-10: Posters
             */

            if (item.isMain) {
                return (
                    <View
                        style={styles.mainImage}
                        src={item.src}
                        onEvent={{
                            loaded: () => handleImageLoaded(i, item.id)
                        }}
                    />
                );
            }

            // Posters row
            // Main image bottom is at 50 + 648 = 698
            // Let's put posters at y = 750 (~50px gap)
            // Available width: 1920
            // 10 posters of 150px = 1500px total width
            // Gap needed?
            // Space remaining = 1920 - 1500 = 420
            // 11 gaps (outsides + between) = 420 / 11 = ~38px spacing
            // Or simple centering:
            // Start X = (1920 - (10 * 150 + 9 * 20)) / 2 ... let's just use simple math
            // 10 items.
            // Let's center the block of 10 items.
            // Width of 1 item = 150.
            // Let's say gap is 20px.
            // Total width = (10 * 150) + (9 * 20) = 1500 + 180 = 1680.
            // Start X = (1920 - 1680) / 2 = 240 / 2 = 120.

            const posterIndex = i - 1; // 0 to 9
            const gap = 20;
            const startX = 120;
            const startY = 750;
            const x = startX + (posterIndex * (150 + gap));
            const y = startY;

            return (
              <View
                style={styles.poster}
                src={item.src}
                x={x}
                y={y}
                onEvent={{
                  loaded: () => handleImageLoaded(i, item.id)
                }}
              />
            );
          }}
        </For>
      </View>

      <View style={styles.statusContainer} pointerEvents="none">
         <View
          display="flex"
          justifyContent="center"
          alignItems="center"
          color="#000000cc"
          width={900}
          height={200}
          padding={20}
        >
          <Text style={styles.statusText}>{status()}</Text>
        </View>
      </View>
    </View>
  );
};

export default MixedImagePerformance;
