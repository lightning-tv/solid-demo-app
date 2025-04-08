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
    return "Hello World" + '!'.repeat(++lastCount);
  })

  s.createEffect(() => {
    console.log("data", data());
  })

  return <>
    <view forwardFocus={0}>
      <lng.Suspense fallback={<>
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
        >
          <text>{data()}</text>
        </view>
      </lng.Suspense>
    </view>
  </>
};
