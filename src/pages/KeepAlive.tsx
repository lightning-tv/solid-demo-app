import * as s from "solid-js";
import * as lng from "@lightningtv/solid";

function createSingletonComponent<T extends Record<string, any>>(
  fn: (props: s.Accessor<T>) => s.JSX.Element,
): s.Component<T> {
  let active = false;
  let result: s.JSX.Element
  let owner: s.Owner | null;
  let dispose: (() => void) | null = null
  let [props, setProps] = s.createSignal(null as any as T);
  return p => {
    setProps(() => p);
    if (!active) {
      s.createRoot(d => {
        dispose = d;
        active = true;
        result = fn(props);
      })
    }
    let o = s.getOwner();
    owner = o
    s.onCleanup(() => {
      queueMicrotask(() => {
        if (active && owner === o) {
          dispose!();
          dispose = null;
          owner = null;
          active = false;
          result = null;
        }
      })
    })
    return result;
  }
}

type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
}

function getElementRect(el: lng.ElementNode): Rect {
  let { width, height } = el;
  let x = 0,
    y = 0;

  if (el.scaleX != null) width *= el.scaleX;
  if (el.scaleY != null) height *= el.scaleY;

  let curr = el as lng.ElementNode | undefined | null;
  while (curr != null) {
    x += curr.x;
    y += curr.y;

    if (curr.scaleX != null) {
      x += (curr.width / 2) * (1 - curr.scaleX);
    }
    if (curr.scaleY != null) {
      y += (curr.height / 2) * (1 - curr.scaleY);
    }

    curr = curr.parent;
  }

  if (lng.Config.rendererOptions != null) {
    let dpr = lng.Config.rendererOptions.deviceLogicalPixelRatio;
    if (dpr != null) {
      x *= dpr;
      y *= dpr;
      width *= dpr;
      height *= dpr;
    }
  }

  return { x, y, width, height };
}

export default function KeepAlivePage() {

  const [counter, setCounter] = s.createSignal(0);

  setInterval(() => {
    setCounter((prev) => prev + 1);
  }, 1000);

  const Comp = createSingletonComponent<{ text: string }>(props => <>
    <view
      color={Math.floor(Math.random() * 0xffffff) << 8 | 0xff}
      x={Math.random() * 40}
      y={Math.random() * 60}
      height={80}
      width={120}
      ref={el => {
        s.createEffect((rect: Rect | undefined) => {
          // will rerun on each "mount" change
          props()

          let r = getElementRect(el);

          if (rect != null) {
            el.lng.x = (el.lng.x ?? 0) - (r.x - rect.x);
            el.lng.y = (el.lng.y ?? 0) - (r.y - rect.y);

            el.animate({
              x: Math.random() * 40,
              y: Math.random() * 60,
              alpha: 1,
            }, {
              duration: 250,
              easing: 'ease-in-out',
            }).start();
          }

          return r
        })
      }}
      onCreate={el => {
        el.alpha = 0;
        el.animate({ alpha: 1 }, { duration: 250, easing: 'ease-in-out' })
          .start();
      }}
      onDestroy={el => {
        el.rtt = true;
        return el
          .animate({ alpha: 0 }, { duration: 250, easing: 'ease-in-out' })
          .start()
          .waitUntilStopped();
      }}
    >
      <text color={0xffffffff}>
        {props().text}
      </text>
    </view>
  </>)

  return <>
    <view display="flex" flexDirection="row">
      <view color={0x111111ff} width={160} height={160}>
        {counter() % 3 == 0 && <Comp text='one' />}
      </view>
      <view color={0x222222ff} width={160} height={160}>
        {counter() % 3 == 1 && <Comp text='two' />}
      </view>
    </view>
  </>
};