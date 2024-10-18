import { createRenderer, Config, loadFonts } from "@lightningtv/solid";
import {
  WebGlCoreRenderer,
  SdfTextRenderer,
} from "@lightningjs/renderer/webgl";
import {
  CanvasCoreRenderer,
  CanvasTextRenderer,
} from "@lightningjs/renderer/canvas";

import { Inspector } from "@lightningjs/renderer/inspector";
import { HashRouter } from "./components/router";
import { Route } from "@solidjs/router";
import { lazy } from "solid-js";
import App from "./pages/App";
import Browse from "./pages/Browse";
import TMDB from "./pages/TMDB";
import DestroyPage from "./pages/Destroy";
import { tmdbData, destroyData } from "./api/tmdbData";
import NotFound from "./pages/NotFound";
import fonts from "./fonts";
import { entityPreload } from "./api/entityPreload";

const Grid = lazy(() => import("./pages/Grid"));
const Portal = lazy(() => import("./pages/Portal"));
const TextPage = lazy(() => import("./pages/Text"));
const CreatePage = lazy(() => import("./pages/Create"));
const ViewportPage = lazy(() => import("./pages/Viewport"));
const ButtonsPage = lazy(() => import("./pages/Buttons"));
const PositioningPage = lazy(() => import("./pages/Positioning"));
const TransitionsPage = lazy(() => import("./pages/Transitions"));
const ComponentsPage = lazy(() => import("./pages/Components"));
const FocusHandlingPage = lazy(() => import("./pages/FocusHandling"));
const GradientsPage = lazy(() => import("./pages/Gradients"));
const FlexPage = lazy(() => import("./pages/Flex"));
const FlexSizePage = lazy(() => import("./pages/FlexSize"));
const FlexColumnSizePage = lazy(() => import("./pages/FlexColumnSize"));
const FlexColumnPage = lazy(() => import("./pages/FlexColumn"));
const ButtonsMaterialPage = lazy(() => import("./pages/ButtonsMaterial"));
const SuperFlexPage = lazy(() => import("./pages/SuperFlex"));
const Entity = lazy(() => import("./pages/Entity"));
const People = lazy(() => import("./pages/People"));
const LoginPage = lazy(() => import("./pages/Login"));

const urlParams = new URLSearchParams(window.location.search);
let numImageWorkers = 3;
const numWorkers = urlParams.get("numImageWorkers");
const screenSize = urlParams.get("size") || "default";
const rendererMode = urlParams.get("mode") || "webgl";

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
Config.animationsEnabled = true;
Config.fontSettings.fontFamily = "Roboto";
Config.fontSettings.color = "#f6f6f6";
Config.fontSettings.fontSize = 32;
// Config.focusDebug = true;

Config.rendererOptions = {
  fpsUpdateInterval: logFps ? 1000 : 0,
  //inspector: Inspector,
  // textureMemory: {
  //   criticalThreshold: 80e6,
  // },
  numImageWorkers, // temp fix for renderer bug
  // Set the resolution based on window height
  // 720p = 0.666667, 1080p = 1, 1440p = 1.5, 2160p = 2
  deviceLogicalPixelRatio,
  devicePhysicalPixelRatio: 1,
};

// Ideally you'd do two separate builds for canvas and webgl to reduce bundle size.
if (rendererMode === "canvas") {
  Config.rendererOptions.fontEngines = [CanvasTextRenderer];
  Config.rendererOptions.renderEngine = CanvasCoreRenderer;
} else {
  Config.rendererOptions.fontEngines = [SdfTextRenderer];
  Config.rendererOptions.renderEngine = WebGlCoreRenderer;
}

const { render } = createRenderer();
loadFonts(fonts);
render(() => (
  <HashRouter root={(props) => <App {...props} />}>
    <Route path="" component={Browse} />
    <Route path="examples" component={Portal} />
    <Route path="browse/:filter" component={Browse} />
    <Route path="tmdb" component={TMDB} preload={tmdbData} />
    <Route path="destroy" component={DestroyPage} preload={destroyData} />
    <Route path="grid" component={Grid} />
    <Route path="text" component={TextPage} />
    <Route path="login" component={LoginPage} />
    <Route path="buttons" component={ButtonsPage} />
    <Route path="positioning" component={PositioningPage} />
    <Route path="transitions" component={TransitionsPage} />
    <Route path="components" component={ComponentsPage} />
    <Route path="focushandling" component={FocusHandlingPage} />
    <Route path="gradients" component={GradientsPage} />
    <Route path="flex" component={FlexPage} />
    <Route path="create" component={CreatePage} />
    <Route path="viewport" component={ViewportPage} />
    <Route path="flexsize" component={FlexSizePage} />
    <Route path="flexcolumnsize" component={FlexColumnSizePage} />
    <Route path="flexcolumn" component={FlexColumnPage} />
    <Route path="superflex" component={SuperFlexPage} />
    <Route path="buttonsmaterial" component={ButtonsMaterialPage} />
    <Route path="entity/people/:id" component={People} />
    <Route path="entity/:type/:id" component={Entity} preload={entityPreload} />
    <Route path="*all" component={NotFound} />
  </HashRouter>
));
