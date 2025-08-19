
import 'solid-devtools';
import {setElementInterface} from 'solid-devtools/setup';
import {elementInterface} from "@lightningtv/solid/devtools";

setElementInterface(elementInterface)

import * as s from "solid-js";
import * as router from "@solidjs/router";
import * as lng from "@lightningtv/solid";
import * as lngp from "@lightningtv/solid/primitives";

import fonts from "./fonts";


let numImageWorkers = 3;
const urlParams = new URLSearchParams(window.location.search);
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
  default: window.innerHeight / 1080
}[screenSize];

const logFps = true;
lng.Config.debug = false;
// Config.keyDebug = true;
lng.Config.animationsEnabled = animationsEnabled === "true";
lng.Config.fontSettings.fontFamily = "Roboto";
lng.Config.fontSettings.color = "#f6f6f6";
lng.Config.fontSettings.fontSize = 32;
// Config.focusDebug = true;

lng.Config.rendererOptions = {
  fpsUpdateInterval: logFps ? 1000 : 0,
  // textureMemory: {
  //   criticalThreshold: 80e6,
  // },
  numImageWorkers, // temp fix for renderer bug
  // Set the resolution based on window height
  // 720p = 0.666667, 1080p = 1, 1440p = 1.5, 2160p = 2
  deviceLogicalPixelRatio,
  devicePhysicalPixelRatio: 1,
  createImageBitmapSupport: "auto"
};

// Ideally you'd do two separate builds for canvas and webgl to reduce bundle size.
if (rendererMode === "canvas") {
  lng.useCanvasFontEngine()
  lng.useCanvasRenderEngine()
} else {
  lng.useSdfFontEngine()
  lng.useWebglRenderEngine()
}

if (import.meta.env.DEV) {
  lng.useInspector()
}

const { renderer, render } = lng.createRenderer();

lng.loadFonts(fonts);

lng.registerDefaultShaders(renderer.stage.shManager);


const Route = router.Route;
const lazy = s.lazy;

import App from "./pages/App";
import Browse from "./pages/Browse";
import TMDB from "./pages/TMDB";
import DestroyPage from "./pages/Destroy";
import { tmdbData, destroyData } from "./api/tmdbData";
import NotFound from "./pages/NotFound";
import { browsePreload } from "./api/browsePreload";
import { entityPreload } from "./api/entityPreload";
import Player from "./pages/Player";
import LeftNavWrapper from "./pages/LeftNavWrapper";

const Grid = lazy(() => import("./pages/Grid"));
const Loops = lazy(() => import("./pages/Loops"));
const Infinite = lazy(() => import("./pages/Infinite"));
const TMDBGrid = lazy(() => import("./pages/TMDBGrid"));
const Portal = lazy(() => import("./pages/Portal"));
const TextPage = lazy(() => import("./pages/Text"));
const TextPosterPage = lazy(() => import("./pages/TextPoster"));
const CreatePage = lazy(() => import("./pages/Create"));
const ViewportPage = lazy(() => import("./pages/Viewport"));
const PositioningPage = lazy(() => import("./pages/Positioning"));
const LayoutPage = lazy(() => import("./pages/Layout"));
const FocusBasicsPage = lazy(() => import("./pages/FocusBasics"));
const KeyHandlingPage = lazy(() => import("./pages/KeyHandling"));
const TransitionsPage = lazy(() => import("./pages/Transitions"));
const ComponentsPage = lazy(() => import("./pages/Components"));
const FocusHandlingPage = lazy(() => import("./pages/FocusHandling"));
const GradientsPage = lazy(() => import("./pages/Gradients"));
const FlexPage = lazy(() => import("./pages/Flex"));
const FlexGrowPage = lazy(() => import("./pages/FlexGrow"));
const FlexMenuPage = lazy(() => import("./pages/FlexMenu"));
const FlexSizePage = lazy(() => import("./pages/FlexSize"));
const FlexColumnSizePage = lazy(() => import("./pages/FlexColumnSize"));
const FlexColumnPage = lazy(() => import("./pages/FlexColumn"));
const ButtonsMaterialPage = lazy(() => import("./pages/ButtonsMaterial"));
const SuperFlexPage = lazy(() => import("./pages/SuperFlex"));
const Entity = lazy(() => import("./pages/Entity"));
const People = lazy(() => import("./pages/People"));
const FireboltPage = lazy(() => import("./pages/Firebolt"));

render(() => (
  <lngp.FocusStackProvider>
    <router.HashRouter root={(props) => <App {...props} />}>
      <Route path="" component={LeftNavWrapper}>
        <Route path="" component={Browse} preload={browsePreload} />
        <Route path="examples" component={Portal}>
          <Route path="/" />
          <Route path="tmdb" component={TMDB} preload={tmdbData} />
        </Route>
        <Route path="browse/:filter" component={Browse} preload={browsePreload} />
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
        <Route path="keepalive" component={lazy(() => import('./pages/KeepAlive.jsx'))} />
        <Route path="suspense" component={lazy(() => import('./pages/suspense.jsx'))} />
        <Route path="superflex" component={SuperFlexPage} />
        <Route path="buttonsmaterial" component={ButtonsMaterialPage} />
        <Route path="entity/people/:id" component={People} />
        <Route path="entity/:type/:id" component={Entity} preload={entityPreload} />
        <Route path="*all" component={NotFound} />
      </Route>
      <Route path="player">
        <Route path=":id" component={Player} />
      </Route>
    </router.HashRouter>
  </lngp.FocusStackProvider>
));
