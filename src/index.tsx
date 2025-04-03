import * as s from "solid-js";
import { createRenderer, Config, loadFonts, ElementNode, isElementNode, activeElement } from "@lightningtv/solid";
import {
  WebGlCoreRenderer,
  SdfTextRenderer,
} from "@lightningjs/renderer/webgl";
import {
  CanvasCoreRenderer,
  CanvasTextRenderer,
} from "@lightningjs/renderer/canvas";

import { Inspector } from "@lightningjs/renderer/inspector";
import { HashRouter } from "@lightningtv/solid/primitives";
import { Route, RouteSectionProps, RouteProps } from "@solidjs/router";
import 'solid-devtools';
import App from "./pages/App";
import Browse from "./pages/Browse";
import TMDB from "./pages/TMDB";
import DestroyPage from "./pages/Destroy";
import { tmdbData, destroyData } from "./api/tmdbData";
import NotFound from "./pages/NotFound";
import fonts from "./fonts";
import { browsePreload } from "./api/browsePreload";
import { entityPreload } from "./api/entityPreload";

const Grid = s.lazy(() => import("./pages/Grid"));
const Loops = s.lazy(() => import("./pages/Loops"));
const Infinite = s.lazy(() => import("./pages/Infinite"));
const TMDBGrid = s.lazy(() => import("./pages/TMDBGrid"));
const Portal = s.lazy(() => import("./pages/Portal"));
const TextPage = s.lazy(() => import("./pages/Text"));
const TextPosterPage = s.lazy(() => import("./pages/TextPoster"));
const CreatePage = s.lazy(() => import("./pages/Create"));
const ViewportPage = s.lazy(() => import("./pages/Viewport"));
const PositioningPage = s.lazy(() => import("./pages/Positioning"));
const LayoutPage = s.lazy(() => import("./pages/Layout"));
const FocusBasicsPage = s.lazy(() => import("./pages/FocusBasics"));
const KeyHandlingPage = s.lazy(() => import("./pages/KeyHandling"));
const TransitionsPage = s.lazy(() => import("./pages/Transitions"));
const ComponentsPage = s.lazy(() => import("./pages/Components"));
const FocusHandlingPage = s.lazy(() => import("./pages/FocusHandling"));
const GradientsPage = s.lazy(() => import("./pages/Gradients"));
const FlexPage = s.lazy(() => import("./pages/Flex"));
const FlexGrowPage = s.lazy(() => import("./pages/FlexGrow"));
const FlexMenuPage = s.lazy(() => import("./pages/FlexMenu"));
const FlexSizePage = s.lazy(() => import("./pages/FlexSize"));
const FlexColumnSizePage = s.lazy(() => import("./pages/FlexColumnSize"));
const FlexColumnPage = s.lazy(() => import("./pages/FlexColumn"));
const ButtonsMaterialPage = s.lazy(() => import("./pages/ButtonsMaterial"));
const SuperFlexPage = s.lazy(() => import("./pages/SuperFlex"));
const Entity = s.lazy(() => import("./pages/Entity"));
const People = s.lazy(() => import("./pages/People"));
const FireboltPage = s.lazy(() => import("./pages/Firebolt"));

const urlParams = new URLSearchParams(window.location.search);
let numImageWorkers = 3;
const numWorkers = urlParams.get("numImageWorkers");
const screenSize = urlParams.get("size") || "default";
const rendererMode = urlParams.get("mode") || "webgl";
const animationsEnabled = urlParams.get("animate") || "true";

if (numWorkers) {
  numImageWorkers = parseInt(numWorkers);
}

const deviceLogicalPixelRatio = {
  "720": 0.666667,
  "1080": 1,
  "4k": 2,
  default: window.innerHeight / 1080,
}[screenSize];

const logFps = true;
Config.debug = false;
// Config.keyDebug = true;
Config.animationsEnabled = animationsEnabled === "true";
Config.fontSettings.fontFamily = "Roboto";
Config.fontSettings.color = "#f6f6f6";
Config.fontSettings.fontSize = 32;
// Config.focusDebug = true;

Config.rendererOptions = {
  fpsUpdateInterval: logFps ? 1000 : 0,
  inspector: import.meta.env.DEV ? Inspector : undefined,
  // textureMemory: {
  //   criticalThreshold: 80e6,
  // },
  numImageWorkers, // temp fix for renderer bug
  // Set the resolution based on window height
  // 720p = 0.666667, 1080p = 1, 1440p = 1.5, 2160p = 2
  deviceLogicalPixelRatio,
  devicePhysicalPixelRatio: 1,
  createImageBitmapSupport: "auto",
};

// Ideally you'd do two separate builds for canvas and webgl to reduce bundle size.
if (rendererMode === "canvas") {
  Config.rendererOptions.fontEngines = [CanvasTextRenderer];
  Config.rendererOptions.renderEngine = CanvasCoreRenderer;
} else {
  Config.rendererOptions.fontEngines = [SdfTextRenderer];
  Config.rendererOptions.renderEngine = WebGlCoreRenderer;
}

const { renderer, render } = createRenderer();
loadFonts(fonts);

// Prepare for RC3 of Renderer
import {
  Rounded,
  RoundedWithBorder,
  RoundedWithShadow,
  RoundedWithBorderAndShadow,
  RadialGradient,
  LinearGradient,
  HolePunch,
} from '@lightningjs/renderer/webgl/shaders';

const shManager = renderer.stage.shManager;
shManager.registerShaderType('rounded', Rounded)
shManager.registerShaderType('roundedWithBorder', RoundedWithBorder)
shManager.registerShaderType('roundedWithShadow', RoundedWithShadow)
shManager.registerShaderType('roundedWithBorderWithShadow', RoundedWithBorderAndShadow)
shManager.registerShaderType('radialGradient', RadialGradient)
shManager.registerShaderType('linearGradient', LinearGradient)
shManager.registerShaderType('holePunch', HolePunch)


function KeepAliveRoutes(routesProps: {
  children: s.JSX.Element
  size:     number
}): s.JSX.Element {

  type Route = RouteProps<string, unknown>

  type RoutesStackItem = {
    key:           string
    props:         RouteSectionProps
    dispose:       () => void
    view:          ElementNode
    activeElement: ElementNode | null
  }
  const [routesStack, setRoutesStack] = s.createSignal<RoutesStackItem[]>([]);

  let lastKey = '';

  const rootElement = <view>
    {routesStack().map(item => item.view) as any}
  </view>

  // <Routes> children are actually <Route> props
  let children = s.children(() => routesProps.children).toArray as () => Route[]

  return s.createMemo(() => {

    let routesIn = children()
    let routesOut: Route[] = []

    for (let routeIn of routesIn) {

      // Skip routes without a component
      if (routeIn.component == null) {
        routesOut.push(routeIn)
        continue
      }

      // Overwrite the route.component with a wrapper
      let Component = routeIn.component // so it can be used like <Component {...props} />
      let component: s.Component<RouteSectionProps<unknown>> = props => {

        let key = props.location.pathname;

        // Keep the last active element to restore focus later
        let lastActiveElement = activeElement() ?? null
        for (let item of routesStack()) {
          if (item.key === lastKey) {
            item.activeElement = lastActiveElement
            break
          }
        }

        lastKey = key;

        let stackItem!: RoutesStackItem
        searchStack: {
          // Handle already existing route
          for (let item of routesStack()) {
            if (item.key === key) {
              stackItem = item;
              stackItem.props = props;
              // Focus on the last active element
              if (stackItem.activeElement != null) {
                stackItem.activeElement.setFocus();
              }
              // ...or first focusable child
              else {
                for (let child of stackItem.view.children) {
                  if (isElementNode(child)) {
                    child.setFocus();
                    break
                  }
                }
              }
              break searchStack;
            }
          }

          // Create new route
          // in a root so it can be disposed manually later
          s.createRoot(dispose => {
            stackItem = {
              key,
              props,
              dispose,
              view: null!,
              activeElement: null,
            }
            stackItem.view = <view forwardFocus={0}>
              <Component
                params={(routesStack(), stackItem.props.params)}
                location={(routesStack(), stackItem.props.location)}
                data={(routesStack(), stackItem.props.data as any)}
                children={(routesStack(), stackItem.props.children)}
              />
            </view> as any
          })

          // Add to stack & dispose the oldest route if stack is full
          setRoutesStack(stack => {
            stack = [...stack, stackItem];
            if (stack.length > routesProps.size) {
              stack.shift()?.dispose();
            }
            return stack;
          })
        }

        // Show only the current route
        for (let item of routesStack()) {
          item.view.hidden = item.key !== key
        }

        return rootElement;
      }

      routesOut.push({...routeIn, component})
    }

    return routesOut
  }) as any;
}

render(() => <>
  <HashRouter root={(props) => <App {...props} />}>
    <KeepAliveRoutes size={4}>
      <Route path="" component={Browse} preload={browsePreload} />
      <Route path="examples" component={Portal} />
      <Route path="browse/:filter" component={Browse} preload={browsePreload} />
      <Route path="tmdb" component={TMDB} preload={tmdbData} />
      <Route path="loops" component={Loops} preload={tmdbData} />
      <Route path="infinite" component={Infinite} preload={tmdbData} />
      <Route path="tmdbgrid" component={TMDBGrid} preload={tmdbData} />
      <Route path="destroy" component={DestroyPage} preload={destroyData} />
      <Route path="grid" component={Grid} />
      <Route path="text" component={TextPage} />
      <Route path="firebolt" component={FireboltPage} />
      <Route path="textposter" component={TextPosterPage} />
      <Route path="positioning" component={PositioningPage} />
      <Route path="layout" component={LayoutPage} />
      <Route path="focusbasics" component={FocusBasicsPage} />
      <Route path="transitions" component={TransitionsPage} />
      <Route path="components" component={ComponentsPage} />
      <Route path="focushandling" component={FocusHandlingPage} />
      <Route path="keyhandling" component={KeyHandlingPage} />
      <Route path="gradients" component={GradientsPage} />
      <Route path="flex" component={FlexPage} />
      <Route path="create" component={CreatePage} />
      <Route path="viewport" component={ViewportPage} />
      <Route path="flexsize" component={FlexSizePage} />
      <Route path="flexmenu" component={FlexMenuPage} />
      <Route path="flexcolumnsize" component={FlexColumnSizePage} />
      <Route path="flexcolumn" component={FlexColumnPage} />
      <Route path="flexgrow" component={FlexGrowPage} />
      <Route path="superflex" component={SuperFlexPage} />
      <Route path="buttonsmaterial" component={ButtonsMaterialPage} />
      <Route path="entity/people/:id" component={People} />
      <Route path="entity/:type/:id" component={Entity} preload={entityPreload} />
      <Route path="*all" component={NotFound} />
    </KeepAliveRoutes>
  </HashRouter>
</>);
