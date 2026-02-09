import { View, Text, type NodeStyles, TextStyles } from "@lightningtv/solid";
import { createSignal, onMount, For } from "solid-js";

const TextureCompressionPerformance = () => {
  const [images, setImages] = createSignal<any[]>([]);
  const [loadTime, setLoadTime] = createSignal<string>("");
  const [status, setStatus] = createSignal<string>("Initializing...");
  const [loadedCount, setLoadedCount] = createSignal(0);
  const basePath = import.meta.env.BASE_URL;

  // Track start time and individual image times
  let startTime = 0;
  const imageLoadTimes: Record<string, number> = {};
  const totalImages = 25;

  const fetchImages = async () => {
    try {
      setStatus("Preparing images...");

      // Generate 25 images pointing to local KTX assets
      const newImages = Array.from({ length: totalImages }, (_, i) => {
        const id = i + 1;
        return {
          id: `img-${id}`,
          src: `${basePath}assets/ktx/image-${id}.ktx`,
          title: `Image ${id}`
        };
      });

      // Start timing right before setting images which triggers rendering
      startTime = performance.now();
      setImages(newImages);
      setStatus(`Loading... 0/${totalImages}`);
    } catch (error) {
      console.error("Error setting up images:", error);
      setStatus("Error setting up images");
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

    // Performance mark for every 5 images
    if (currentCount % 5 === 0) {
      performance.mark(`images-loaded-${currentCount}`);
    }

    // Check if all loaded
    if (currentCount === totalImages) {
      const totalTime = now - startTime;
      setLoadTime(`${totalTime.toFixed(2)}ms`);
      setStatus(`Loaded in ${totalTime.toFixed(2)}ms`);
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
    } as NodeStyles,
    poster: {
      width: 185,
      height: 278,
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
            const col = index() % 5;
            const row = Math.floor(index() / 5);

            // Screen 1920x1080
            // Padding Left: 175
            // Padding Right: 50
            // Item Width: 185, Height: 278

            // X Calculation:
            // End X = 1920 - 50 - 185 = 1685
            // Start X = 175
            // Step X = (1685 - 175) / 4 = 377.5

            // Y Calculation:
            // End Y = 1080 - 50 - 278 = 752
            // Start Y = 50
            // Step Y = (752 - 50) / 4 = 175.5

            const x = 175 + (col * 377.5);
            const y = 50 + (row * 175.5);

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

export default TextureCompressionPerformance;
