import { View, Text, type NodeStyles } from "@lightningtv/solid";
import { createSignal, onMount, For, Show } from "solid-js";
import api, { getImageUrl } from "../api";

const LargeImagePerformance = () => {
  const [images, setImages] = createSignal<any[]>([]);
  const [loadTime, setLoadTime] = createSignal<string>("");
  const [status, setStatus] = createSignal<string>("Initializing...");
  const [loadedCount, setLoadedCount] = createSignal(0);

  // Track start time and individual image times
  let startTime = 0;
  const imageLoadTimes: Record<string, number> = {};
  const totalImages = 4;

  const fetchImages = async () => {
    try {
      setStatus("Fetching images...");
      // Fetch 1 page is enough for 4 images
      const page1 = await api.get("/movie/popular?page=1");

      const combined = page1.results.slice(0, 4);

      const newImages = combined.map(item => ({
        id: item.id,
        src: getImageUrl(item.backdrop_path || item.poster_path, "original"), // Use backdrop if available for 16:9 1080p feel, or original poster
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

    // Performance mark
    performance.mark(`large-images-loaded-${currentCount}`);

    // Check if all loaded
    if (currentCount === totalImages) {
      const totalTime = now - startTime;
      setLoadTime(`${totalTime.toFixed(2)}ms`);
      setStatus(`Loaded in ${totalTime.toFixed(2)}ms`);
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
    } as NodeStyles,
    poster: {
      width: 800,
      height: 450, // 16:9 aspect ratio
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
            let x = 0;
            let y = 0;
            const width = 800;
            const height = 450;
            const paddingLeft = 170;
            const paddingOther = 50;

            // 0: TL, 1: TR, 2: BL, 3: BR
            if (i === 0) { // TL
                x = paddingLeft;
                y = paddingOther;
            } else if (i === 1) { // TR
                x = 1920 - paddingOther - width;
                y = paddingOther;
            } else if (i === 2) { // BL
                x = paddingLeft;
                y = 1080 - paddingOther - height;
            } else if (i === 3) { // BR
                x = 1920 - paddingOther - width;
                y = 1080 - paddingOther - height;
            }

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

export default LargeImagePerformance;
