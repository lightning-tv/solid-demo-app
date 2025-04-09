import * as s from "solid-js";
import * as lng from "@lightningtv/solid";
import {setGlobalBackground} from "../state";

/**
 * Tracks all resources inside a component and renders a fallback until they are all resolved.
 * 
 * ```tsx
 * const [data] = createResource(async () => ...);
 *
 * <Suspense fallback={<LoadingIndicator />}>
 *   <view>
 *     <text>{data()}</text>
 *   </view>
 * </Suspense>
 * ```
 * 
 * This is a modified version of the SolidJS Suspense component that works with Lightning.
 * 
 * @see https://docs.solidjs.com/reference/components/suspense
 */
function Suspense(props: {
  fallback?: s.JSX.Element;
  children: s.JSX.Element;
}): s.JSX.Element {
  
  let children: s.JSX.Element;

  let suspense = s.Suspense({
    get children() {
      return [children = s.children(() => props.children) as any];
    },
  }) as any as () => s.JSX.Element;

  return <>
    {suspense() ?? props.fallback}
    <view hidden>
      {suspense() ? null : children}
    </view>
  </>
}

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
      <Suspense fallback={<>
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
          onCreate={fadeIn}
          onDestroy={fadeOut}
          onEnter={() => {refetch()}}
          display="flex"
          center
          ref={() => {

            // Count will persist even after refetch
            const [count, setCount] = s.createSignal(0);

            s.onMount(() => {
              const interval = setInterval(() => {
                setCount(prev => prev + 1);
              }, 200);
          
              s.onCleanup(() => clearInterval(interval));
            });

            // This effect will be suspensed when the data is loading
            s.createEffect(() => {
              console.log("count", count());
            })
          }}
        >
          <text>Hello World{'!'.repeat(data() ?? 0)} (Press Enter to refetch)</text>
        </view>
      </Suspense>
    </view>
  </>
};
