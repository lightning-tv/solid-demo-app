import { View, Text, type NodeStyles, TextStyles } from "@lightningtv/solid";
import { createSignal, onMount, For, Show } from "solid-js";
import api, { getImageUrl } from "../api";

const ImagePerformance = () => {
  const [images, setImages] = createSignal<any[]>([]);
  const [loadTime, setLoadTime] = createSignal<string>("");
  const [status, setStatus] = createSignal<string>("Initializing...");
  const [loadedCount, setLoadedCount] = createSignal(0);

  // Track start time and individual image times
  let startTime = 0;
  const imageLoadTimes: Record<string, number> = {};
  const totalImages = 40;

  const fetchImages = async () => {
    try {
      setStatus("Fetching images...");
      // Fetch 2 pages to get 40 images (20 per page usually)
      const page1 = await api.get("/movie/popular?page=1");
      const page2 = await api.get("/movie/popular?page=2");

      const combined = [...page1.results, ...page2.results].slice(0, 40);

      const newImages = combined.map(item => ({
        id: item.id,
        src: getImageUrl(item.poster_path, "w185"),
        title: item.title
      }));

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

    // Performance mark for every 10 images
    if (currentCount % 10 === 0) {
      performance.mark(`images-loaded-${currentCount}`);
    }

    // Check if all loaded
    if (currentCount === totalImages) {
      const totalTime = now - startTime;
      setLoadTime(`${totalTime.toFixed(2)}ms`);
      setStatus(`Loaded in ${totalTime.toFixed(2)}ms`);
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
    } as TextStyles
  };

  return (
    <View>
      <View style={styles.container} autofocus={true}>
        <For each={images()}>
          {(item, index) => {
            const col = index() % 8;
            const row = Math.floor(index() / 8);

            // Screen 1920x1080
            // Padding Left: 175
            // Padding Right: 50 (Assumed to keep spreading logic)
            // Available width for distribution start points:
            // Start X = 175
            // End X (Right edge - item width) = 1920 - 50 - 150 = 1720
            // Step X = (1720 - 175) / 7 = 220.714

            // Y Padding: 50
            // Start Y = 50
            // End Y (Bottom edge - item height) = 1080 - 50 - 225 = 805
            // Step Y = (805 - 50) / 4 = 188.75

            const x = 175 + (col * 220.71);
            const y = 50 + (row * 188.75);

            return (
              <View
                style={styles.poster}
                src={item.src}
                x={x}
                y={y}
                onEvent={{
                  loaded: () => handleImageLoaded(index(), item.id)
                }}
              />
            );
          }}
        </For>
      </View>

      <View style={styles.statusContainer}>
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

export default ImagePerformance;
