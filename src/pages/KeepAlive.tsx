import * as s from "solid-js";
import * as lng from "@lightningtv/solid";

/**
 * Creates a presistant component to be reused between different layouts
 * without losing their internal state or recreating elements.
 * 
 * The component will be created when needed
 * and disposed of when it is no longer needed used,
 * or when the owner is destroyed.
 * 
 * Use cases:
 * - Preserve component state when switching between pages
 * - Maintain animations or transitions between different layout states
 * - Optimize performance by avoiding recreation of expensive components
 * 
 * @param fn - A function that takes props accessor and returns JSX to render
 * @returns A component function that maintains a single persistent instance
 * @example
 * ```tsx
 * const PersistentView = createPersistentComponent<{color: number}>(props => (
 *   <view color={props().color}>
 *     <text>This view persists!</text>
 *   </view>
 * ))
 * 
 * <view>
 *   <text>Branch A</text>
 *   {showAtA() && <PersistentView color={0xff0000ff} />}
 * </view>
 * <view>
 *   <text>Branch B</text>
 *   {showAtB() && <PersistentView color={0x00ff00ff} />}
 * </view>
 * ```
 */
function createPersistentComponent<T extends Record<string, any>>(
  fn: (props: s.Accessor<T>) => s.JSX.Element,
): s.Component<T> {
  let result: s.JSX.Element
  let owner: s.Owner | null
  let dispose: (() => void) | null = null
  let [props, setProps] = s.createSignal(null as any as T)
  let detachedOwner = s.getOwner()
  return p => {
    setProps(() => p);
    if (dispose == null) {
      s.createRoot(d => {
        dispose = d;
        result = fn(props);
      }, detachedOwner)
    }
    let o = owner = s.getOwner();
    s.onCleanup(() => {
      queueMicrotask(() => {
        if (dispose != null && owner === o) {
          dispose();
          dispose = owner = result = null;
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

  const Comp = createPersistentComponent<{ text: string }>(props => <>
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