import * as s from "solid-js";
import * as lng from "@lightningtv/solid";
import {setGlobalBackground} from "../state";

function fadeIn(el: lng.ElementNode) {
  el.alpha = 0;
  el
    .animate({alpha: 1}, {duration: 250, easing: 'ease-in-out'})
    .start();
}
function fadeOut(el: lng.ElementNode) {
  return el
    .animate({alpha: 0}, {duration: 250, easing: 'ease-in-out'})
    .start()
    .waitUntilStopped();
}

export default function SuspensePage() {

  setGlobalBackground("#000000")

  let lastCount = 0;

  const [data, {refetch}] = s.createResource(async () => {
    await new Promise(r => setTimeout(r, 1600));
    return ++lastCount
  })

  return <>
    <view forwardFocus={0}>
      <s.Suspense fallback={<>
        <view
          onCreate={fadeIn}
          onDestroy={fadeOut}
          display="flex"
          center
        >
          <text>Loading...</text>
        </view>
      </>}>
        <view
          autofocus
          preserve
          onCreate={fadeIn}
          onRender={fadeIn}
          onRemove={fadeOut}
          onEnter={() => {refetch()}}
          display="flex"
          center
          ref={(elm) => {

            // Count will persist even after refetch
            const [count, setCount] = s.createSignal(0);

            s.onMount(() => {
              const interval = setInterval(() => {
                setCount(prev => prev + 1);
              }, 200);

              s.onCleanup(() => {
                clearInterval(interval)
                elm.destroy();
              });
            });

            // This effect will be suspensed when the data is loading
            s.createEffect(() => {
              console.log("count", count());
            })
          }}
        >
          <text>Hello World{'!'.repeat(data() ?? 0)} (Press Enter to refetch)</text>
        </view>
      </s.Suspense>
    </view>
  </>
};
