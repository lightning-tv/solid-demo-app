const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Loops-37A4Aufd.js","assets/index-Dyz0ouRP.js","assets/Infinite-BA4GGGtO.js","assets/Components-C26B4buY.js","assets/Button-cGyaOyiK.js","assets/Login-CLADL0mr.js"])))=>i.map(i=>d[i]);
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key2, value) => key2 in obj ? __defProp(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
var __publicField = (obj, key2, value) => __defNormalProp(obj, typeof key2 !== "symbol" ? key2 + "" : key2, value);
var _a;
function __vite_legacy_guard() {
  import.meta.url;
  import("_").catch(() => 1);
  (async function* () {
  })().next();
}
;
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const scriptRel = "modulepreload";
const assetsURL = function(dep) {
  return "/solid-demo-app/" + dep;
};
const seen = {};
const __vitePreload = function preload(baseModule, deps, importerUrl) {
  let promise = Promise.resolve();
  if (deps && deps.length > 0) {
    document.getElementsByTagName("link");
    const cspNonceMeta = document.querySelector(
      "meta[property=csp-nonce]"
    );
    const cspNonce = (cspNonceMeta == null ? void 0 : cspNonceMeta.nonce) || (cspNonceMeta == null ? void 0 : cspNonceMeta.getAttribute("nonce"));
    promise = Promise.allSettled(
      deps.map((dep) => {
        dep = assetsURL(dep);
        if (dep in seen) return;
        seen[dep] = true;
        const isCss = dep.endsWith(".css");
        const cssSelector = isCss ? '[rel="stylesheet"]' : "";
        if (document.querySelector('link[href="'.concat(dep, '"]').concat(cssSelector))) {
          return;
        }
        const link = document.createElement("link");
        link.rel = isCss ? "stylesheet" : scriptRel;
        if (!isCss) {
          link.as = "script";
        }
        link.crossOrigin = "";
        link.href = dep;
        if (cspNonce) {
          link.setAttribute("nonce", cspNonce);
        }
        document.head.appendChild(link);
        if (isCss) {
          return new Promise((res, rej) => {
            link.addEventListener("load", res);
            link.addEventListener(
              "error",
              () => rej(new Error("Unable to preload CSS for ".concat(dep)))
            );
          });
        }
      })
    );
  }
  function handlePreloadError(err) {
    const e = new Event("vite:preloadError", {
      cancelable: true
    });
    e.payload = err;
    window.dispatchEvent(e);
    if (!e.defaultPrevented) {
      throw err;
    }
  }
  return promise.then((res) => {
    for (const item of res || []) {
      if (item.status !== "rejected") continue;
      handlePreloadError(item.reason);
    }
    return baseModule().catch(handlePreloadError);
  });
};
({ "BASE_URL": "/solid-demo-app/", "DEV": false, "LEGACY": false, "MODE": "production", "PROD": true, "SSR": false });
function createWebGLContext(canvas, forceWebGL2 = false, contextSpy) {
  const config = {
    alpha: true,
    antialias: false,
    depth: false,
    stencil: true,
    desynchronized: false,
    // Disabled because it prevents Visual Regression Tests from working
    // failIfMajorPerformanceCaveat: true,
    powerPreference: "high-performance",
    premultipliedAlpha: true,
    preserveDrawingBuffer: false
  };
  const gl = (
    // TODO: Remove this assertion once this issue is fixed in TypeScript
    // https://github.com/microsoft/TypeScript/issues/53614
    canvas.getContext(forceWebGL2 ? "webgl2" : "webgl", config) || canvas.getContext("experimental-webgl", config)
  );
  if (!gl) {
    throw new Error("Unable to create WebGL context");
  }
  if (contextSpy) {
    return new Proxy(gl, {
      get(target, prop) {
        const value = target[prop];
        if (typeof value === "function") {
          contextSpy.increment(String(prop));
          return value.bind(target);
        }
        return value;
      }
    });
  }
  return gl;
}
function assertTruthy(condition, message) {
  return;
}
function mergeColorProgress(rgba1, rgba2, p) {
  const r1 = Math.trunc(rgba1 >>> 24);
  const g1 = Math.trunc(rgba1 >>> 16 & 255);
  const b1 = Math.trunc(rgba1 >>> 8 & 255);
  const a1 = Math.trunc(rgba1 & 255);
  const r2 = Math.trunc(rgba2 >>> 24);
  const g2 = Math.trunc(rgba2 >>> 16 & 255);
  const b2 = Math.trunc(rgba2 >>> 8 & 255);
  const a2 = Math.trunc(rgba2 & 255);
  const r = Math.round(r2 * p + r1 * (1 - p));
  const g = Math.round(g2 * p + g1 * (1 - p));
  const b = Math.round(b2 * p + b1 * (1 - p));
  const a = Math.round(a2 * p + a1 * (1 - p));
  return (r << 24 | g << 16 | b << 8 | a) >>> 0;
}
function mergeColorAlpha(rgba, alpha) {
  const r = rgba >>> 24;
  const g = rgba >>> 16 & 255;
  const b = rgba >>> 8 & 255;
  const a = Math.trunc((rgba & 255) * alpha);
  return (r << 24 | g << 16 | b << 8 | a) >>> 0;
}
let premultiplyRGB = true;
function setPremultiplyMode(mode) {
  premultiplyRGB = mode === "webgl";
}
function mergeColorAlphaPremultiplied(rgba, alpha, flipEndianess = false) {
  const newAlpha = (rgba & 255) / 255 * alpha;
  const rgbAlpha = premultiplyRGB ? newAlpha : 1;
  const r = Math.trunc((rgba >>> 24) * rgbAlpha);
  const g = Math.trunc((rgba >>> 16 & 255) * rgbAlpha);
  const b = Math.trunc((rgba >>> 8 & 255) * rgbAlpha);
  const a = Math.trunc(newAlpha * 255);
  if (flipEndianess) {
    return (a << 24 | b << 16 | g << 8 | r) >>> 0;
  }
  return (r << 24 | g << 16 | b << 8 | a) >>> 0;
}
function hasOwn(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}
function isProductionEnvironment() {
  return true;
}
let nextId = 1;
function getNewId() {
  return nextId++;
}
class EventEmitter {
  constructor() {
    __publicField(this, "eventListeners", {});
  }
  on(event, listener) {
    let listeners = this.eventListeners[event];
    if (!listeners) {
      listeners = [];
    }
    listeners.push(listener);
    this.eventListeners[event] = listeners;
  }
  off(event, listener) {
    const listeners = this.eventListeners[event];
    if (!listeners) {
      return;
    }
    if (!listener) {
      delete this.eventListeners[event];
      return;
    }
    const index = listeners.indexOf(listener);
    if (index >= 0) {
      listeners.splice(index, 1);
    }
  }
  once(event, listener) {
    const onceListener = (target, data) => {
      this.off(event, onceListener);
      listener(target, data);
    };
    this.on(event, onceListener);
  }
  emit(event, data) {
    const listeners = this.eventListeners[event];
    if (!listeners) {
      return;
    }
    [...listeners].forEach((listener) => {
      listener(this, data);
    });
  }
  removeAllListeners() {
    this.eventListeners = {};
  }
}
var TextureType;
(function(TextureType2) {
  TextureType2[TextureType2["generic"] = 0] = "generic";
  TextureType2[TextureType2["color"] = 1] = "color";
  TextureType2[TextureType2["image"] = 2] = "image";
  TextureType2[TextureType2["noise"] = 3] = "noise";
  TextureType2[TextureType2["renderToTexture"] = 4] = "renderToTexture";
  TextureType2[TextureType2["subTexture"] = 5] = "subTexture";
})(TextureType || (TextureType = {}));
class Texture extends EventEmitter {
  constructor(txManager) {
    super();
    __publicField(this, "txManager");
    /**
     * The dimensions of the texture
     *
     * @remarks
     * Until the texture data is loaded for the first time the value will be
     * `null`.
     */
    __publicField(this, "dimensions", null);
    __publicField(this, "error", null);
    // aggregate state
    __publicField(this, "state", "initial");
    __publicField(this, "renderableOwners", /* @__PURE__ */ new Set());
    __publicField(this, "renderable", false);
    __publicField(this, "type", TextureType.generic);
    __publicField(this, "preventCleanup", false);
    __publicField(this, "ctxTexture");
    __publicField(this, "textureData", null);
    this.txManager = txManager;
  }
  /**
   * Add/remove an owner to/from the Texture based on its renderability.
   *
   * @remarks
   * Any object can own a texture, be it a CoreNode or even the state object
   * from a Text Renderer.
   *
   * When the reference to the texture that an owner object holds is replaced
   * or cleared it must call this with `renderable=false` to release the owner
   * association.
   *
   * @param owner
   * @param renderable
   */
  setRenderableOwner(owner, renderable) {
    var _a2, _b;
    const oldSize = this.renderableOwners.size;
    if (renderable === true) {
      if (this.renderableOwners.has(owner) === false) {
        this.renderableOwners.add(owner);
      }
      const newSize = this.renderableOwners.size;
      if (newSize > oldSize && newSize === 1) {
        this.renderable = true;
        (_a2 = this.onChangeIsRenderable) == null ? void 0 : _a2.call(this, true);
        this.load();
      }
    } else {
      this.renderableOwners.delete(owner);
      const newSize = this.renderableOwners.size;
      if (newSize < oldSize && newSize === 0) {
        this.renderable = false;
        (_b = this.onChangeIsRenderable) == null ? void 0 : _b.call(this, false);
        this.txManager.orphanTexture(this);
      }
    }
  }
  load() {
    this.txManager.loadTexture(this);
  }
  /**
   * Load the core context texture for this Texture.
   * The ctxTexture is created by the renderer and lives on the GPU.
   *
   * @returns
   */
  loadCtxTexture() {
    if (this.ctxTexture === void 0) {
      this.ctxTexture = this.txManager.renderer.createCtxTexture(this);
    }
    return this.ctxTexture;
  }
  /**
   * Free the core context texture for this Texture.
   *
   * @remarks
   * The ctxTexture is created by the renderer and lives on the GPU.
   */
  free() {
    var _a2;
    (_a2 = this.ctxTexture) == null ? void 0 : _a2.free();
  }
  /**
   * Free the source texture data for this Texture.
   *
   * @remarks
   * The texture data is the source data that is used to populate the CoreContextTexture.
   * e.g. ImageData that is downloaded from a URL.
   */
  freeTextureData() {
    this.textureData = null;
  }
  setState(state, errorOrDimensions) {
    if (this.state === state) {
      return;
    }
    let payload = null;
    if (state === "loaded") {
      this.dimensions = errorOrDimensions;
      payload = this.dimensions;
    } else if (state === "failed") {
      this.error = errorOrDimensions;
      payload = this.error;
    }
    this.state = state;
    this.emit(state, payload);
  }
  /**
   * Get the texture data for this texture.
   *
   * @remarks
   * This method is called by the CoreContextTexture when the texture is loaded.
   * The texture data is then used to populate the CoreContextTexture.
   *
   * @returns
   * The texture data for this texture.
   */
  async getTextureData() {
    if (this.textureData === null) {
      this.textureData = await this.getTextureSource();
    }
    return this.textureData;
  }
  /**
   * Make a cache key for this texture.
   *
   * @remarks
   * Each concrete `Texture` subclass must implement this method to provide an
   * appropriate cache key for the texture type including the texture's
   * properties that uniquely identify a copy of the texture. If the texture
   * type does not support caching, then this method should return `false`.
   *
   * @param props
   * @returns
   * A cache key for this texture or `false` if the texture type does not
   * support caching.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static makeCacheKey(props) {
    return false;
  }
  /**
   * Resolve the default values for the texture's properties.
   *
   * @remarks
   * Each concrete `Texture` subclass must implement this method to provide
   * default values for the texture's optional properties.
   *
   * @param props
   * @returns
   * The default values for the texture's properties.
   */
  static resolveDefaults(props) {
    return {};
  }
}
const PROTOCOL_REGEX = /^(data|ftps?|https?):/;
const getNormalizedRgbaComponents = (rgba) => {
  const r = rgba >>> 24;
  const g = rgba >>> 16 & 255;
  const b = rgba >>> 8 & 255;
  const a = rgba & 255;
  return [r / 255, g / 255, b / 255, a / 255];
};
const getRgbaComponents = (rgba) => {
  const r = rgba >>> 24;
  const g = rgba >>> 16 & 255;
  const b = rgba >>> 8 & 255;
  const a = rgba & 255;
  return [r, g, b, a];
};
function getNormalizedAlphaComponent(rgba) {
  return (rgba & 255) / 255;
}
function getRgbaString(color) {
  const r = Math.floor(color[0] * 255);
  const g = Math.floor(color[1] * 255);
  const b = Math.floor(color[2] * 255);
  const a = Math.floor(color[3] * 255);
  return "rgba(".concat(r, ",").concat(g, ",").concat(b, ",").concat(a.toFixed(4), ")");
}
function createBound(x1, y1, x2, y2, out) {
  if (out) {
    out.x1 = x1;
    out.y1 = y1;
    out.x2 = x2;
    out.y2 = y2;
    return out;
  }
  return {
    x1,
    y1,
    x2,
    y2
  };
}
function boundsOverlap(a, b) {
  return a.x1 < b.x2 && a.x2 > b.x1 && a.y1 < b.y2 && a.y2 > b.y1;
}
function convertBoundToRect(bound, out) {
  {
    out.x = bound.x1;
    out.y = bound.y1;
    out.width = bound.x2 - bound.x1;
    out.height = bound.y2 - bound.y1;
    return out;
  }
}
function intersectRect(a, b, out) {
  const x = Math.max(a.x, b.x);
  const y = Math.max(a.y, b.y);
  const width = Math.min(a.x + a.width, b.x + b.width) - x;
  const height = Math.min(a.y + a.height, b.y + b.height) - y;
  if (width > 0 && height > 0) {
    if (out) {
      out.x = x;
      out.y = y;
      out.width = width;
      out.height = height;
      return out;
    }
    return {
      x,
      y,
      width,
      height
    };
  }
  if (out) {
    out.x = 0;
    out.y = 0;
    out.width = 0;
    out.height = 0;
    return out;
  }
  return {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  };
}
function copyRect(a, out) {
  if (out) {
    out.x = a.x;
    out.y = a.y;
    out.width = a.width;
    out.height = a.height;
    return out;
  }
  return {
    x: a.x,
    y: a.y,
    width: a.width,
    height: a.height
  };
}
function compareRect(a, b) {
  if (a === b) {
    return true;
  }
  if (a === null || b === null) {
    return false;
  }
  return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
}
function boundInsideBound(bound1, bound2) {
  return bound1.x1 <= bound2.x2 && bound1.y1 <= bound2.y2 && bound1.x2 >= bound2.x1 && bound1.y2 >= bound2.y1;
}
function boundLargeThanBound(bound1, bound2) {
  return bound1.x1 < bound2.x1 && bound1.x2 > bound2.x2 && bound1.y1 < bound2.y1 && bound1.y2 > bound2.y2;
}
function isBoundPositive(bound) {
  return bound.x1 < bound.x2 && bound.y1 < bound.y2;
}
function createPreloadBounds(strictBound, boundsMargin) {
  return createBound(strictBound.x1 - boundsMargin[3], strictBound.y1 - boundsMargin[0], strictBound.x2 + boundsMargin[1], strictBound.y2 + boundsMargin[2]);
}
function convertUrlToAbsolute(url) {
  if (self.location.protocol === "file:" && !PROTOCOL_REGEX.test(url)) {
    const path = self.location.pathname.split("/");
    path.pop();
    const basePath2 = path.join("/");
    const baseUrl = self.location.protocol + "//" + basePath2;
    if (url.charAt(0) === ".") {
      url = url.slice(1);
    }
    if (url.charAt(0) === "/") {
      url = url.slice(1);
    }
    return baseUrl + "/" + url;
  }
  const absoluteUrl = new URL(url, self.location.href);
  return absoluteUrl.href;
}
function isBase64Image(src) {
  return src.startsWith("data:") === true;
}
class Matrix3d {
  /**
   * Creates a new 3x3 matrix.
   *
   * @param entries Row-major 3x3 matrix
   */
  constructor() {
    __publicField(this, "ta");
    __publicField(this, "tb");
    __publicField(this, "tx");
    __publicField(this, "tc");
    __publicField(this, "td");
    __publicField(this, "ty");
    __publicField(this, "_floatArr", null);
    /**
     * Potential Mutation Flag
     *
     * @remarks
     * This flag is set to true whenever the matrix is potentially modified.
     * We don't waste CPU trying to identify if each operation actually modifies
     * the matrix. Instead, we set this flag to true whenever we think the matrix
     * is modified. This signals that the `floatArr` should to be updated.
     */
    __publicField(this, "mutation");
    this.ta = 0;
    this.tb = 0;
    this.tx = 0;
    this.tc = 0;
    this.td = 0;
    this.ty = 0;
    this.mutation = true;
  }
  /**
   * Returns a temporary matrix that can be used for calculations.
   *
   * @remarks
   * This is useful for avoiding allocations in tight loops.
   *
   * The matrix is not guaranteed to be the same between calls.
   *
   * @returns
   */
  static get temp() {
    return tempMatrix;
  }
  static multiply(a, b, out) {
    const e0 = a.ta * b.ta + a.tb * b.tc;
    const e1 = a.ta * b.tb + a.tb * b.td;
    const e2 = a.ta * b.tx + a.tb * b.ty + a.tx;
    const e3 = a.tc * b.ta + a.td * b.tc;
    const e4 = a.tc * b.tb + a.td * b.td;
    const e5 = a.tc * b.tx + a.td * b.ty + a.ty;
    if (!out) {
      out = new Matrix3d();
    }
    out.ta = e0;
    out.tb = e1;
    out.tx = e2;
    out.tc = e3;
    out.td = e4;
    out.ty = e5;
    out.mutation = true;
    return out;
  }
  static identity(out) {
    if (!out) {
      out = new Matrix3d();
    }
    out.ta = 1;
    out.tb = 0;
    out.tx = 0;
    out.tc = 0;
    out.td = 1;
    out.ty = 0;
    out.mutation = true;
    return out;
  }
  static translate(x, y, out) {
    if (!out) {
      out = new Matrix3d();
    }
    out.ta = 1;
    out.tb = 0;
    out.tx = x;
    out.tc = 0;
    out.td = 1;
    out.ty = y;
    out.mutation = true;
    return out;
  }
  static scale(sx, sy, out) {
    if (!out) {
      out = new Matrix3d();
    }
    out.ta = sx;
    out.tb = 0;
    out.tx = 0;
    out.tc = 0;
    out.td = sy;
    out.ty = 0;
    out.mutation = true;
    return out;
  }
  static rotate(angle, out) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    if (!out) {
      out = new Matrix3d();
    }
    out.ta = cos;
    out.tb = -sin;
    out.tx = 0;
    out.tc = sin;
    out.td = cos;
    out.ty = 0;
    out.mutation = true;
    return out;
  }
  static copy(src, dst) {
    if (!dst) {
      dst = new Matrix3d();
    }
    dst.ta = src.ta;
    dst.tc = src.tc;
    dst.tb = src.tb;
    dst.td = src.td;
    dst.tx = src.tx;
    dst.ty = src.ty;
    dst.mutation = true;
    return dst;
  }
  translate(x, y) {
    this.tx = this.ta * x + this.tb * y + this.tx;
    this.ty = this.tc * x + this.td * y + this.ty;
    this.mutation = true;
    return this;
  }
  scale(sx, sy) {
    this.ta = this.ta * sx;
    this.tb = this.tb * sy;
    this.tc = this.tc * sx;
    this.td = this.td * sy;
    this.mutation = true;
    return this;
  }
  rotate(angle) {
    if (angle === 0 || !(angle % Math.PI * 2)) {
      return this;
    }
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const e0 = this.ta * cos + this.tb * sin;
    const e1 = this.tb * cos - this.ta * sin;
    const e3 = this.tc * cos + this.td * sin;
    const e4 = this.td * cos - this.tc * sin;
    this.ta = e0;
    this.tb = e1;
    this.tc = e3;
    this.td = e4;
    this.mutation = true;
    return this;
  }
  multiply(other) {
    return Matrix3d.multiply(this, other, this);
  }
  /**
   * Returns the matrix as a Float32Array in column-major order.
   *
   * @remarks
   * This method is optimized to avoid unnecessary allocations. The same array
   * is returned every time this method is called, and is updated in place.
   *
   * WARNING: Use the array only for passing directly to a WebGL shader uniform
   * during a frame render. Do not modify or hold onto the array for longer than
   * a frame.
   */
  getFloatArr() {
    if (!this._floatArr) {
      this._floatArr = new Float32Array(9);
    }
    if (this.mutation) {
      this._floatArr[0] = this.ta;
      this._floatArr[1] = this.tc;
      this._floatArr[2] = 0;
      this._floatArr[3] = this.tb;
      this._floatArr[4] = this.td;
      this._floatArr[5] = 0;
      this._floatArr[6] = this.tx;
      this._floatArr[7] = this.ty;
      this._floatArr[8] = 1;
      this.mutation = false;
    }
    return this._floatArr;
  }
}
const tempMatrix = new Matrix3d();
const rx1 = 0;
const rx2 = 2;
const rx3 = 4;
const rx4 = 6;
const ry1 = 1;
const ry2 = 3;
const ry3 = 5;
const ry4 = 7;
class RenderCoords {
  constructor(entries) {
    __publicField(this, "data");
    this.data = new Float32Array(8);
    if (entries) {
      this.data[rx1] = entries[rx1];
      this.data[rx2] = entries[rx2];
      this.data[rx3] = entries[rx3];
      this.data[rx4] = entries[rx4];
      this.data[ry1] = entries[ry1];
      this.data[ry2] = entries[ry2];
      this.data[ry3] = entries[ry3];
      this.data[ry4] = entries[ry4];
    }
  }
  static translate(x1, y1, x2, y2, x3, y3, x4, y4, out) {
    if (!out) {
      out = new RenderCoords();
    }
    out.data[rx1] = x1;
    out.data[rx2] = x2;
    out.data[rx3] = x3;
    out.data[rx4] = x4;
    out.data[ry1] = y1;
    out.data[ry2] = y2;
    out.data[ry3] = y3;
    out.data[ry4] = y4;
    return out;
  }
  get x1() {
    return this.data[rx1];
  }
  get x2() {
    return this.data[rx2];
  }
  get x3() {
    return this.data[rx3];
  }
  get x4() {
    return this.data[rx4];
  }
  get y1() {
    return this.data[ry1];
  }
  get y2() {
    return this.data[ry2];
  }
  get y3() {
    return this.data[ry3];
  }
  get y4() {
    return this.data[ry4];
  }
}
const getTimingBezier = (a, b, c, d) => {
  const xc = 3 * a;
  const xb = 3 * (c - a) - xc;
  const xa = 1 - xc - xb;
  const yc = 3 * b;
  const yb = 3 * (d - b) - yc;
  const ya = 1 - yc - yb;
  return function(time) {
    if (time >= 1) {
      return 1;
    }
    if (time <= 0) {
      return 0;
    }
    let t = 0.5, cbx, cbxd, dx;
    for (let it = 0; it < 20; it++) {
      cbx = t * (t * (t * xa + xb) + xc);
      dx = time - cbx;
      if (dx > -1e-8 && dx < 1e-8) {
        return t * (t * (t * ya + yb) + yc);
      }
      cbxd = t * (t * (3 * xa) + 2 * xb) + xc;
      if (cbxd > 1e-10 && cbxd < 1e-10) {
        break;
      }
      t += dx / cbxd;
    }
    let minT = 0;
    let maxT = 1;
    for (let it = 0; it < 20; it++) {
      t = 0.5 * (minT + maxT);
      cbx = t * (t * (t * xa + xb) + xc);
      dx = time - cbx;
      if (dx > -1e-8 && dx < 1e-8) {
        return t * (t * (t * ya + yb) + yc);
      }
      if (dx < 0) {
        maxT = t;
      } else {
        minT = t;
      }
    }
  };
};
const timingMapping = {};
const timingLookup = {
  ease: [0.25, 0.1, 0.25, 1],
  "ease-in": [0.42, 0, 1, 1],
  "ease-out": [0, 0, 0.58, 1],
  "ease-in-out": [0.42, 0, 0.58, 1],
  "ease-in-sine": [0.12, 0, 0.39, 0],
  "ease-out-sine": [0.12, 0, 0.39, 0],
  "ease-in-out-sine": [0.37, 0, 0.63, 1],
  "ease-in-cubic": [0.32, 0, 0.67, 0],
  "ease-out-cubic": [0.33, 1, 0.68, 1],
  "ease-in-out-cubic": [0.65, 0, 0.35, 1],
  "ease-in-circ": [0.55, 0, 1, 0.45],
  "ease-out-circ": [0, 0.55, 0.45, 1],
  "ease-in-out-circ": [0.85, 0, 0.15, 1],
  "ease-in-back": [0.36, 0, 0.66, -0.56],
  "ease-out-back": [0.34, 1.56, 0.64, 1],
  "ease-in-out-back": [0.68, -0.6, 0.32, 1.6]
};
const defaultTiming = (t) => t;
const parseCubicBezier = (str) => {
  const regex = /-?\d*\.?\d+/g;
  const match = str.match(regex);
  if (match) {
    const [num1, num2, num3, num4] = match;
    const a = parseFloat(num1 || "0.42");
    const b = parseFloat(num2 || "0");
    const c = parseFloat(num3 || "1");
    const d = parseFloat(num4 || "1");
    const timing = getTimingBezier(a, b, c, d);
    timingMapping[str] = timing;
    return timing;
  }
  console.warn("Unknown cubic-bezier timing: " + str);
  return defaultTiming;
};
const getTimingFunction = (str) => {
  if (str === "linear") {
    return defaultTiming;
  }
  if (timingMapping[str] !== void 0) {
    return timingMapping[str] || defaultTiming;
  }
  if (str === "step-start") {
    return () => {
      return 1;
    };
  }
  if (str === "step-end") {
    return (time) => {
      return time === 1 ? 1 : 0;
    };
  }
  const lookup = timingLookup[str];
  if (lookup !== void 0) {
    const [a, b, c, d] = lookup;
    const timing = getTimingBezier(a, b, c, d);
    timingMapping[str] = timing;
    return timing;
  }
  if (str.startsWith("cubic-bezier")) {
    return parseCubicBezier(str);
  }
  console.warn("Unknown timing function: " + str);
  return defaultTiming;
};
function bytesToMb$1(bytes) {
  return (bytes / 1024 / 1024).toFixed(2);
}
class CoreAnimation extends EventEmitter {
  constructor(node, props, settings) {
    var _a2, _b, _c, _d, _e, _f;
    super();
    __publicField(this, "node");
    __publicField(this, "props");
    __publicField(this, "settings");
    __publicField(this, "progress", 0);
    __publicField(this, "delayFor", 0);
    __publicField(this, "delay", 0);
    __publicField(this, "timingFunction");
    __publicField(this, "propValuesMap", {});
    __publicField(this, "dynPropValuesMap");
    this.node = node;
    this.props = props;
    for (const key2 in props) {
      if (key2 !== "shaderProps") {
        if (this.propValuesMap["props"] === void 0) {
          this.propValuesMap["props"] = {};
        }
        this.propValuesMap["props"][key2] = {
          start: node[key2] || 0,
          target: props[key2]
        };
      } else if (node.shader.type !== "DynamicShader") {
        this.propValuesMap["shaderProps"] = {};
        for (const key3 in props.shaderProps) {
          this.propValuesMap["shaderProps"][key3] = {
            start: node.shader.props[key3],
            target: props.shaderProps[key3]
          };
        }
      } else {
        const shaderPropKeys = Object.keys(props.shaderProps);
        const spLength = shaderPropKeys.length;
        this.dynPropValuesMap = {};
        for (let j = 0; j < spLength; j++) {
          const effectName = shaderPropKeys[j];
          const effect2 = props.shaderProps[effectName];
          this.dynPropValuesMap[effectName] = {};
          const effectProps = Object.entries(effect2);
          const eLength = effectProps.length;
          for (let k = 0; k < eLength; k++) {
            const [key3, value] = effectProps[k];
            this.dynPropValuesMap[effectName][key3] = {
              start: node.shader.props[effectName][key3],
              target: value
            };
          }
        }
      }
    }
    const easing = settings.easing || "linear";
    const delay2 = (_a2 = settings.delay) != null ? _a2 : 0;
    this.settings = {
      duration: (_b = settings.duration) != null ? _b : 0,
      delay: delay2,
      easing,
      loop: (_c = settings.loop) != null ? _c : false,
      repeat: (_d = settings.repeat) != null ? _d : 0,
      repeatDelay: (_e = settings.repeatDelay) != null ? _e : 0,
      stopMethod: (_f = settings.stopMethod) != null ? _f : false
    };
    this.timingFunction = getTimingFunction(easing);
    this.delayFor = delay2;
    this.delay = delay2;
  }
  reset() {
    this.progress = 0;
    this.delayFor = this.settings.delay || 0;
    this.update(0);
  }
  restoreValues(target, valueMap) {
    const entries = Object.entries(valueMap);
    const eLength = entries.length;
    for (let i = 0; i < eLength; i++) {
      const [key2, value] = entries[i];
      target[key2] = value.start;
    }
  }
  restore() {
    this.reset();
    if (this.propValuesMap["props"] !== void 0) {
      this.restoreValues(this.node, this.propValuesMap["props"]);
    }
    if (this.propValuesMap["shaderProps"] !== void 0) {
      this.restoreValues(this.node.shader.props, this.propValuesMap["shaderProps"]);
    }
    if (this.dynPropValuesMap !== void 0) {
      const dynEntries = Object.keys(this.dynPropValuesMap);
      const dynEntriesL = dynEntries.length;
      if (dynEntriesL > 0) {
        for (let i = 0; i < dynEntriesL; i++) {
          const key2 = dynEntries[i];
          this.restoreValues(this.node.shader.props[key2], this.dynPropValuesMap[key2]);
        }
      }
    }
  }
  reverseValues(valueMap) {
    const entries = Object.entries(valueMap);
    const eLength = entries.length;
    for (let i = 0; i < eLength; i++) {
      const [key2, value] = entries[i];
      valueMap[key2] = {
        start: value.target,
        target: value.start
      };
    }
  }
  reverse() {
    this.progress = 0;
    if (this.propValuesMap["props"] !== void 0) {
      this.reverseValues(this.propValuesMap["props"]);
    }
    if (this.propValuesMap["shaderProps"] !== void 0) {
      this.reverseValues(this.propValuesMap["shaderProps"]);
    }
    if (this.dynPropValuesMap !== void 0) {
      const dynEntries = Object.keys(this.dynPropValuesMap);
      const dynEntriesL = dynEntries.length;
      if (dynEntriesL > 0) {
        for (let i = 0; i < dynEntriesL; i++) {
          const key2 = dynEntries[i];
          this.reverseValues(this.dynPropValuesMap[key2]);
        }
      }
    }
    if (!this.settings.loop) {
      this.settings.stopMethod = false;
    }
  }
  applyEasing(p, s, e) {
    return (this.timingFunction(p) || p) * (e - s) + s;
  }
  updateValue(propName, propValue, startValue, easing) {
    if (this.progress === 1) {
      return propValue;
    }
    if (this.progress === 0) {
      return startValue;
    }
    const endValue = propValue;
    if (propName.indexOf("color") !== -1) {
      if (startValue === endValue) {
        return startValue;
      }
      if (easing) {
        const easingProgressValue = this.timingFunction(this.progress) || this.progress;
        return mergeColorProgress(startValue, endValue, easingProgressValue);
      }
      return mergeColorProgress(startValue, endValue, this.progress);
    }
    if (easing) {
      return this.applyEasing(this.progress, startValue, endValue);
    }
    return startValue + (endValue - startValue) * this.progress;
  }
  updateValues(target, valueMap, easing) {
    const entries = Object.entries(valueMap);
    const eLength = entries.length;
    for (let i = 0; i < eLength; i++) {
      const [key2, value] = entries[i];
      target[key2] = this.updateValue(key2, value.target, value.start, easing);
    }
  }
  update(dt) {
    const { duration, loop, easing, stopMethod } = this.settings;
    const { delayFor } = this;
    if (duration === 0 && delayFor === 0) {
      this.emit("finished", {});
      return;
    }
    if (this.delayFor > 0) {
      this.delayFor -= dt;
      if (this.delayFor >= 0) {
        return;
      } else {
        dt = -this.delayFor;
        this.delayFor = 0;
      }
    }
    if (duration === 0) {
      this.emit("finished", {});
      return;
    }
    if (this.progress === 0) {
      this.emit("animating", {});
    }
    this.progress += dt / duration;
    if (this.progress > 1) {
      this.progress = loop ? 0 : 1;
      this.delayFor = this.delay;
      if (stopMethod) {
        this.emit("finished", {});
        return;
      }
    }
    if (this.propValuesMap["props"] !== void 0) {
      this.updateValues(this.node, this.propValuesMap["props"], easing);
    }
    if (this.propValuesMap["shaderProps"] !== void 0) {
      this.updateValues(this.node.shader.props, this.propValuesMap["shaderProps"], easing);
    }
    if (this.dynPropValuesMap !== void 0) {
      const dynEntries = Object.keys(this.dynPropValuesMap);
      const dynEntriesL = dynEntries.length;
      if (dynEntriesL > 0) {
        for (let i = 0; i < dynEntriesL; i++) {
          const key2 = dynEntries[i];
          this.updateValues(this.node.shader.props[key2], this.dynPropValuesMap[key2], easing);
        }
      }
    }
    if (this.progress < 1) {
      this.emit("tick", { progress: this.progress });
    }
    if (this.progress === 1) {
      this.emit("finished", {});
    }
  }
}
class CoreAnimationController extends EventEmitter {
  constructor(manager, animation) {
    super();
    __publicField(this, "manager");
    __publicField(this, "animation");
    __publicField(this, "stoppedPromise");
    /**
     * If this is null, then the animation is in a finished / stopped state.
     */
    __publicField(this, "stoppedResolve", null);
    __publicField(this, "state");
    this.manager = manager;
    this.animation = animation;
    this.state = "stopped";
    this.stoppedPromise = Promise.resolve();
    this.onAnimating = this.onAnimating.bind(this);
    this.onFinished = this.onFinished.bind(this);
    this.onTick = this.onTick.bind(this);
  }
  start() {
    if (this.state !== "running" && this.state !== "scheduled") {
      this.makeStoppedPromise();
      this.registerAnimation();
      this.state = "scheduled";
    }
    return this;
  }
  stop() {
    this.unregisterAnimation();
    if (this.stoppedResolve !== null) {
      this.stoppedResolve();
      this.stoppedResolve = null;
      this.emit("stopped", this);
    }
    this.animation.reset();
    this.state = "stopped";
    return this;
  }
  pause() {
    this.unregisterAnimation();
    this.state = "paused";
    return this;
  }
  restore() {
    this.stoppedResolve = null;
    this.animation.restore();
    return this;
  }
  waitUntilStopped() {
    return this.stoppedPromise;
  }
  registerAnimation() {
    this.animation.once("finished", this.onFinished);
    this.animation.on("animating", this.onAnimating);
    this.animation.on("tick", this.onTick);
    this.manager.registerAnimation(this.animation);
  }
  unregisterAnimation() {
    this.manager.unregisterAnimation(this.animation);
    this.animation.off("finished", this.onFinished);
    this.animation.off("animating", this.onAnimating);
    this.animation.off("tick", this.onTick);
  }
  makeStoppedPromise() {
    if (this.stoppedResolve === null) {
      this.stoppedPromise = new Promise((resolve) => {
        this.stoppedResolve = resolve;
      });
    }
  }
  onFinished() {
    assertTruthy(this.stoppedResolve);
    const { loop, stopMethod } = this.animation.settings;
    if (stopMethod === "reverse") {
      this.animation.once("finished", this.onFinished);
      this.animation.reverse();
      return;
    }
    if (loop) {
      return;
    }
    this.unregisterAnimation();
    this.stoppedResolve();
    this.stoppedResolve = null;
    this.emit("stopped", this);
    this.state = "stopped";
  }
  onAnimating() {
    this.state = "running";
    this.emit("animating", this);
  }
  onTick(_animation, data) {
    this.emit("tick", data);
  }
}
var CoreNodeRenderState;
(function(CoreNodeRenderState2) {
  CoreNodeRenderState2[CoreNodeRenderState2["Init"] = 0] = "Init";
  CoreNodeRenderState2[CoreNodeRenderState2["OutOfBounds"] = 2] = "OutOfBounds";
  CoreNodeRenderState2[CoreNodeRenderState2["InBounds"] = 4] = "InBounds";
  CoreNodeRenderState2[CoreNodeRenderState2["InViewport"] = 8] = "InViewport";
})(CoreNodeRenderState || (CoreNodeRenderState = {}));
const CoreNodeRenderStateMap = /* @__PURE__ */ new Map();
CoreNodeRenderStateMap.set(CoreNodeRenderState.Init, "init");
CoreNodeRenderStateMap.set(CoreNodeRenderState.OutOfBounds, "outOfBounds");
CoreNodeRenderStateMap.set(CoreNodeRenderState.InBounds, "inBounds");
CoreNodeRenderStateMap.set(CoreNodeRenderState.InViewport, "inViewport");
var UpdateType;
(function(UpdateType2) {
  UpdateType2[UpdateType2["Children"] = 1] = "Children";
  UpdateType2[UpdateType2["ScaleRotate"] = 2] = "ScaleRotate";
  UpdateType2[UpdateType2["Local"] = 4] = "Local";
  UpdateType2[UpdateType2["Global"] = 8] = "Global";
  UpdateType2[UpdateType2["Clipping"] = 16] = "Clipping";
  UpdateType2[UpdateType2["CalculatedZIndex"] = 32] = "CalculatedZIndex";
  UpdateType2[UpdateType2["ZIndexSortedChildren"] = 64] = "ZIndexSortedChildren";
  UpdateType2[UpdateType2["PremultipliedColors"] = 128] = "PremultipliedColors";
  UpdateType2[UpdateType2["WorldAlpha"] = 256] = "WorldAlpha";
  UpdateType2[UpdateType2["RenderState"] = 512] = "RenderState";
  UpdateType2[UpdateType2["IsRenderable"] = 1024] = "IsRenderable";
  UpdateType2[UpdateType2["RenderTexture"] = 2048] = "RenderTexture";
  UpdateType2[UpdateType2["ParentRenderTexture"] = 4096] = "ParentRenderTexture";
  UpdateType2[UpdateType2["RenderBounds"] = 8192] = "RenderBounds";
  UpdateType2[UpdateType2["None"] = 0] = "None";
  UpdateType2[UpdateType2["All"] = 14335] = "All";
})(UpdateType || (UpdateType = {}));
class CoreNode extends EventEmitter {
  constructor(stage, props) {
    super();
    __publicField(this, "stage");
    __publicField(this, "children", []);
    __publicField(this, "_id", getNewId());
    __publicField(this, "props");
    __publicField(this, "updateType", UpdateType.All);
    __publicField(this, "childUpdateType", UpdateType.None);
    __publicField(this, "globalTransform");
    __publicField(this, "scaleRotateTransform");
    __publicField(this, "localTransform");
    __publicField(this, "sceneGlobalTransform");
    __publicField(this, "renderCoords");
    __publicField(this, "sceneRenderCoords");
    __publicField(this, "renderBound");
    __publicField(this, "strictBound");
    __publicField(this, "preloadBound");
    __publicField(this, "clippingRect", {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      valid: false
    });
    __publicField(this, "isRenderable", false);
    __publicField(this, "renderState", CoreNodeRenderState.Init);
    __publicField(this, "worldAlpha", 1);
    __publicField(this, "premultipliedColorTl", 0);
    __publicField(this, "premultipliedColorTr", 0);
    __publicField(this, "premultipliedColorBl", 0);
    __publicField(this, "premultipliedColorBr", 0);
    __publicField(this, "calcZIndex", 0);
    __publicField(this, "hasRTTupdates", false);
    __publicField(this, "parentHasRenderTexture", false);
    __publicField(this, "rttParent", null);
    __publicField(this, "onTextureLoaded", (_, dimensions) => {
      var _a2, _b;
      this.autosizeNode(dimensions);
      this.setUpdateType(UpdateType.IsRenderable);
      this.stage.requestRender();
      if (this.parentHasRenderTexture) {
        this.notifyParentRTTOfUpdate();
      }
      if (dimensions.width > 1 && dimensions.height > 1) {
        this.emit("loaded", {
          type: "texture",
          dimensions
        });
      }
      if (((_b = (_a2 = this.props.textureOptions) == null ? void 0 : _a2.resizeMode) == null ? void 0 : _b.type) === "contain") {
        this.setUpdateType(UpdateType.Local);
      }
    });
    __publicField(this, "onTextureFailed", (_, error) => {
      this.setUpdateType(UpdateType.IsRenderable);
      if (this.parentHasRenderTexture) {
        this.notifyParentRTTOfUpdate();
      }
      this.emit("failed", {
        type: "texture",
        error
      });
    });
    __publicField(this, "onTextureFreed", () => {
      this.setUpdateType(UpdateType.IsRenderable);
      if (this.parentHasRenderTexture) {
        this.notifyParentRTTOfUpdate();
      }
      this.emit("freed", {
        type: "texture"
      });
    });
    this.stage = stage;
    this.props = {
      ...props,
      parent: null,
      texture: null,
      src: null,
      rtt: false
    };
    this.parent = props.parent;
    this.texture = props.texture;
    this.src = props.src;
    this.rtt = props.rtt;
    if (props.boundsMargin) {
      this.boundsMargin = Array.isArray(props.boundsMargin) ? props.boundsMargin : [
        props.boundsMargin,
        props.boundsMargin,
        props.boundsMargin,
        props.boundsMargin
      ];
    }
    this.setUpdateType(UpdateType.ScaleRotate | UpdateType.Local | UpdateType.RenderBounds | UpdateType.RenderState);
    if (this.stage.defaultTexture && this.stage.defaultTexture.state !== "loaded") {
      this.stage.defaultTexture.once("loaded", () => {
        this.setUpdateType(UpdateType.IsRenderable);
      });
    }
  }
  //#region Textures
  loadTexture() {
    const { texture } = this.props;
    queueMicrotask(() => {
      var _a2, _b;
      if (this.textureOptions.preload === true) {
        this.stage.txManager.loadTexture(texture);
      }
      texture.preventCleanup = (_b = (_a2 = this.props.textureOptions) == null ? void 0 : _a2.preventCleanup) != null ? _b : false;
      texture.on("loaded", this.onTextureLoaded);
      texture.on("failed", this.onTextureFailed);
      texture.on("freed", this.onTextureFreed);
      if (this.parentHasRenderTexture) {
        this.notifyParentRTTOfUpdate();
        return;
      }
      if (texture.state === "loaded") {
        assertTruthy(texture.dimensions);
        this.onTextureLoaded(texture, texture.dimensions);
      } else if (texture.state === "failed") {
        assertTruthy(texture.error);
        this.onTextureFailed(texture, texture.error);
      } else if (texture.state === "freed") {
        this.onTextureFreed(texture);
      }
    });
  }
  unloadTexture() {
    if (this.texture !== null) {
      this.texture.off("loaded", this.onTextureLoaded);
      this.texture.off("failed", this.onTextureFailed);
      this.texture.off("freed", this.onTextureFreed);
      this.texture.setRenderableOwner(this, false);
    }
  }
  autosizeNode(dimensions) {
    if (this.autosize) {
      this.width = dimensions.width;
      this.height = dimensions.height;
    }
  }
  //#endregion Textures
  /**
   * Change types types is used to determine the scope of the changes being applied
   *
   * @remarks
   * See {@link UpdateType} for more information on each type
   *
   * @param type
   */
  setUpdateType(type) {
    this.updateType |= type;
    const parent = this.props.parent;
    if (!parent)
      return;
    if ((parent.updateType & UpdateType.Children) === 0) {
      parent.setUpdateType(UpdateType.Children);
    }
  }
  sortChildren() {
    this.children.sort((a, b) => a.calcZIndex - b.calcZIndex);
  }
  updateScaleRotateTransform() {
    const { rotation, scaleX, scaleY } = this.props;
    if (rotation === 0 && scaleX === 1 && scaleY === 1) {
      this.scaleRotateTransform = void 0;
      return;
    }
    this.scaleRotateTransform = Matrix3d.rotate(rotation, this.scaleRotateTransform).scale(scaleX, scaleY);
  }
  updateLocalTransform() {
    var _a2, _b;
    const { x, y, width, height } = this.props;
    const mountTranslateX = this.props.mountX * width;
    const mountTranslateY = this.props.mountY * height;
    if (this.scaleRotateTransform) {
      const pivotTranslateX = this.props.pivotX * width;
      const pivotTranslateY = this.props.pivotY * height;
      this.localTransform = Matrix3d.translate(x - mountTranslateX + pivotTranslateX, y - mountTranslateY + pivotTranslateY, this.localTransform).multiply(this.scaleRotateTransform).translate(-pivotTranslateX, -pivotTranslateY);
    } else {
      this.localTransform = Matrix3d.translate(x - mountTranslateX, y - mountTranslateY, this.localTransform);
    }
    const texture = this.props.texture;
    if (texture && texture.dimensions && ((_b = (_a2 = this.props.textureOptions) == null ? void 0 : _a2.resizeMode) == null ? void 0 : _b.type) === "contain") {
      let resizeModeScaleX = 1;
      let resizeModeScaleY = 1;
      let extraX = 0;
      let extraY = 0;
      const { width: tw, height: th } = texture.dimensions;
      const txAspectRatio = tw / th;
      const nodeAspectRatio = width / height;
      if (txAspectRatio > nodeAspectRatio) {
        const scaleX = width / tw;
        const scaledTxHeight = th * scaleX;
        extraY = (height - scaledTxHeight) / 2;
        resizeModeScaleY = scaledTxHeight / height;
      } else {
        const scaleY = height / th;
        const scaledTxWidth = tw * scaleY;
        extraX = (width - scaledTxWidth) / 2;
        resizeModeScaleX = scaledTxWidth / width;
      }
      this.localTransform.translate(extraX, extraY).scale(resizeModeScaleX, resizeModeScaleY);
    }
    this.setUpdateType(UpdateType.Global);
  }
  /**
   * @todo: test for correct calculation flag
   * @param delta
   */
  update(delta, parentClippingRect) {
    if (this.updateType & UpdateType.ScaleRotate) {
      this.updateScaleRotateTransform();
      this.setUpdateType(UpdateType.Local);
    }
    if (this.updateType & UpdateType.Local) {
      this.updateLocalTransform();
      this.setUpdateType(UpdateType.Global);
    }
    const parent = this.props.parent;
    let renderState = null;
    if (this.updateType & UpdateType.RenderTexture && this.rtt) {
      this.hasRTTupdates = true;
    }
    if (this.updateType & UpdateType.Global) {
      assertTruthy(this.localTransform);
      if (this.parentHasRenderTexture === true && (parent == null ? void 0 : parent.rtt) === true) {
        this.globalTransform = Matrix3d.identity();
        this.sceneGlobalTransform = Matrix3d.copy((parent == null ? void 0 : parent.globalTransform) || Matrix3d.identity()).multiply(this.localTransform);
      } else if (this.parentHasRenderTexture === true && (parent == null ? void 0 : parent.rtt) === false) {
        this.sceneGlobalTransform = Matrix3d.copy((parent == null ? void 0 : parent.sceneGlobalTransform) || this.localTransform).multiply(this.localTransform);
        this.globalTransform = Matrix3d.copy((parent == null ? void 0 : parent.globalTransform) || this.localTransform, this.globalTransform);
      } else {
        this.globalTransform = Matrix3d.copy((parent == null ? void 0 : parent.globalTransform) || this.localTransform, this.globalTransform);
      }
      if (parent !== null) {
        this.globalTransform.multiply(this.localTransform);
      }
      this.calculateRenderCoords();
      this.updateBoundingRect();
      this.setUpdateType(UpdateType.RenderState | UpdateType.Children);
      this.childUpdateType |= UpdateType.Global;
      if (this.clipping === true) {
        this.setUpdateType(UpdateType.Clipping | UpdateType.RenderBounds);
        this.childUpdateType |= UpdateType.RenderBounds;
      }
    }
    if (this.updateType & UpdateType.RenderBounds) {
      this.createRenderBounds();
      this.setUpdateType(UpdateType.RenderState);
      this.setUpdateType(UpdateType.Children);
      this.childUpdateType |= UpdateType.RenderBounds;
    }
    if (this.updateType & UpdateType.RenderState) {
      renderState = this.checkRenderBounds();
      this.setUpdateType(UpdateType.IsRenderable);
      if (renderState !== CoreNodeRenderState.OutOfBounds) {
        this.updateRenderState(renderState);
      }
    }
    if (this.updateType & UpdateType.WorldAlpha) {
      if (parent) {
        this.worldAlpha = parent.worldAlpha * this.props.alpha;
      } else {
        this.worldAlpha = this.props.alpha;
      }
      this.setUpdateType(UpdateType.Children | UpdateType.PremultipliedColors | UpdateType.IsRenderable);
      this.childUpdateType |= UpdateType.WorldAlpha;
    }
    if (this.updateType & UpdateType.IsRenderable) {
      this.updateIsRenderable();
    }
    if (this.updateType & UpdateType.Clipping) {
      this.calculateClippingRect(parentClippingRect);
      this.setUpdateType(UpdateType.Children);
      this.childUpdateType |= UpdateType.Clipping;
      this.childUpdateType |= UpdateType.RenderBounds;
    }
    if (this.updateType & UpdateType.PremultipliedColors) {
      this.premultipliedColorTl = mergeColorAlphaPremultiplied(this.props.colorTl, this.worldAlpha, true);
      if (this.props.colorTl === this.props.colorTr && this.props.colorBl === this.props.colorBr && this.props.colorTl === this.props.colorBl) {
        this.premultipliedColorTr = this.premultipliedColorBl = this.premultipliedColorBr = this.premultipliedColorTl;
      } else {
        this.premultipliedColorTr = mergeColorAlphaPremultiplied(this.props.colorTr, this.worldAlpha, true);
        this.premultipliedColorBl = mergeColorAlphaPremultiplied(this.props.colorBl, this.worldAlpha, true);
        this.premultipliedColorBr = mergeColorAlphaPremultiplied(this.props.colorBr, this.worldAlpha, true);
      }
    }
    if (parent !== null && this.updateType & UpdateType.CalculatedZIndex) {
      this.calculateZIndex();
      parent.setUpdateType(UpdateType.ZIndexSortedChildren);
    }
    if (this.props.strictBounds === true && this.renderState === CoreNodeRenderState.OutOfBounds) {
      this.updateType &= ~UpdateType.RenderBounds;
      return;
    }
    if (this.updateType & UpdateType.Children && this.children.length > 0) {
      for (let i = 0, length = this.children.length; i < length; i++) {
        const child = this.children[i];
        child.setUpdateType(this.childUpdateType);
        if (child.updateType === 0) {
          continue;
        }
        let childClippingRect = this.clippingRect;
        if (this.rtt === true) {
          childClippingRect = {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            valid: false
          };
        }
        child.update(delta, childClippingRect);
      }
    }
    if (this.parentHasRenderTexture && this.updateType > 0) {
      this.notifyParentRTTOfUpdate();
    }
    if (this.updateType & UpdateType.ZIndexSortedChildren) {
      this.sortChildren();
    }
    if (renderState === CoreNodeRenderState.OutOfBounds) {
      this.updateRenderState(renderState);
      this.updateIsRenderable();
      if (this.rtt === true && renderState === CoreNodeRenderState.OutOfBounds) {
        this.notifyChildrenRTTOfUpdate(renderState);
      }
    }
    this.updateType = 0;
    this.childUpdateType = 0;
  }
  findParentRTTNode() {
    let rttNode = this.parent;
    while (rttNode && !rttNode.rtt) {
      rttNode = rttNode.parent;
    }
    return rttNode;
  }
  getRTTParentRenderState() {
    const rttNode = this.rttParent || this.findParentRTTNode();
    if (!rttNode) {
      return null;
    }
    return rttNode.renderState;
  }
  notifyChildrenRTTOfUpdate(renderState) {
    for (const child of this.children) {
      child.updateRenderState(renderState);
      child.updateIsRenderable();
      child.notifyChildrenRTTOfUpdate(renderState);
    }
  }
  notifyParentRTTOfUpdate() {
    if (this.parent === null) {
      return;
    }
    const rttNode = this.rttParent || this.findParentRTTNode();
    if (!rttNode) {
      return;
    }
    rttNode.hasRTTupdates = true;
    rttNode.setUpdateType(UpdateType.RenderTexture);
    if (rttNode.parentHasRenderTexture === true) {
      rttNode.notifyParentRTTOfUpdate();
    }
  }
  checkRenderBounds() {
    assertTruthy(this.renderBound);
    assertTruthy(this.strictBound);
    assertTruthy(this.preloadBound);
    if (boundInsideBound(this.renderBound, this.strictBound)) {
      return CoreNodeRenderState.InViewport;
    }
    if (boundInsideBound(this.renderBound, this.preloadBound)) {
      return CoreNodeRenderState.InBounds;
    }
    if (boundLargeThanBound(this.renderBound, this.strictBound)) {
      return CoreNodeRenderState.InViewport;
    }
    if (this.parent !== null && (this.props.width === 0 || this.props.height === 0)) {
      return this.parent.renderState;
    }
    return CoreNodeRenderState.OutOfBounds;
  }
  updateBoundingRect() {
    const transform = this.sceneGlobalTransform || this.globalTransform;
    const renderCoords = this.sceneRenderCoords || this.renderCoords;
    const { tb, tc } = transform;
    const { x1, y1, x3, y3 } = renderCoords;
    if (tb === 0 || tc === 0) {
      this.renderBound = createBound(x1, y1, x3, y3, this.renderBound);
    } else {
      const { x2, x4, y2, y4 } = renderCoords;
      this.renderBound = createBound(Math.min(x1, x2, x3, x4), Math.min(y1, y2, y3, y4), Math.max(x1, x2, x3, x4), Math.max(y1, y2, y3, y4), this.renderBound);
    }
  }
  createRenderBounds() {
    assertTruthy(this.stage);
    if (this.parent !== null && this.parent.strictBound !== void 0) {
      const parentBound = this.parent.strictBound;
      this.strictBound = createBound(parentBound.x1, parentBound.y1, parentBound.x2, parentBound.y2);
      this.preloadBound = createPreloadBounds(this.strictBound, this.boundsMargin);
    } else {
      this.strictBound = this.stage.strictBound;
      this.preloadBound = this.stage.preloadBound;
    }
    if (this.props.clipping === false) {
      return;
    }
    if (this.renderBound === void 0) {
      return;
    }
    if (boundInsideBound(this.renderBound, this.strictBound) === false) {
      return;
    }
    const { x, y, width, height } = this.props;
    const { tx, ty } = this.sceneGlobalTransform || this.globalTransform || {};
    const _x = tx != null ? tx : x;
    const _y = ty != null ? ty : y;
    this.strictBound = createBound(_x, _y, _x + width, _y + height, this.strictBound);
    this.preloadBound = createPreloadBounds(this.strictBound, this.boundsMargin);
  }
  updateRenderState(renderState) {
    if (renderState === this.renderState) {
      return;
    }
    const previous = this.renderState;
    this.renderState = renderState;
    const event = CoreNodeRenderStateMap.get(renderState);
    this.emit(event, {
      previous,
      current: renderState
    });
  }
  /**
   * Updates the `isRenderable` property based on various conditions.
   */
  updateIsRenderable() {
    let newIsRenderable = false;
    let needsTextureOwnership = false;
    if (this.checkBasicRenderability() === false) {
      this.updateTextureOwnership(false);
      this.setRenderable(false);
      return;
    }
    if (this.texture !== null) {
      needsTextureOwnership = true;
      newIsRenderable = this.texture.state === "loaded";
    } else if ((this.hasShader() || this.hasColorProperties() === true) && this.hasDimensions() === true) {
      if (this.stage.defaultTexture && this.stage.defaultTexture.state === "loaded") {
        newIsRenderable = true;
      }
    }
    this.updateTextureOwnership(needsTextureOwnership);
    this.setRenderable(newIsRenderable);
  }
  /**
   * Checks if the node is renderable based on world alpha, dimensions and out of bounds status.
   */
  checkBasicRenderability() {
    if (this.worldAlpha === 0 || this.isOutOfBounds() === true) {
      return false;
    } else {
      return true;
    }
  }
  /**
   * Sets the renderable state and triggers changes if necessary.
   * @param isRenderable - The new renderable state
   */
  setRenderable(isRenderable) {
    this.isRenderable = isRenderable;
  }
  /**
   * Changes the renderable state of the node.
   */
  updateTextureOwnership(isRenderable) {
    var _a2;
    (_a2 = this.texture) == null ? void 0 : _a2.setRenderableOwner(this, isRenderable);
  }
  /**
   * Checks if the node is out of the viewport bounds.
   */
  isOutOfBounds() {
    return this.renderState <= CoreNodeRenderState.OutOfBounds;
  }
  /**
   * Checks if the node has dimensions (width/height)
   */
  hasDimensions() {
    return this.props.width !== 0 && this.props.height !== 0;
  }
  /**
   * Checks if the node has any color properties set.
   */
  hasColorProperties() {
    return this.props.color !== 0 || this.props.colorTop !== 0 || this.props.colorBottom !== 0 || this.props.colorLeft !== 0 || this.props.colorRight !== 0 || this.props.colorTl !== 0 || this.props.colorTr !== 0 || this.props.colorBl !== 0 || this.props.colorBr !== 0;
  }
  hasShader() {
    return this.props.shader !== null;
  }
  calculateRenderCoords() {
    const { width, height } = this;
    const { tx, ty, ta, tb, tc, td } = this.globalTransform;
    if (tb === 0 && tc === 0) {
      const minX = tx;
      const maxX = tx + width * ta;
      const minY = ty;
      const maxY = ty + height * td;
      this.renderCoords = RenderCoords.translate(
        //top-left
        minX,
        minY,
        //top-right
        maxX,
        minY,
        //bottom-right
        maxX,
        maxY,
        //bottom-left
        minX,
        maxY,
        this.renderCoords
      );
    } else {
      this.renderCoords = RenderCoords.translate(
        //top-left
        tx,
        ty,
        //top-right
        tx + width * ta,
        ty + width * tc,
        //bottom-right
        tx + width * ta + height * tb,
        ty + width * tc + height * td,
        //bottom-left
        tx + height * tb,
        ty + height * td,
        this.renderCoords
      );
    }
    if (this.sceneGlobalTransform === void 0) {
      return;
    }
    const { tx: stx, ty: sty, ta: sta, tb: stb, tc: stc, td: std } = this.sceneGlobalTransform;
    if (stb === 0 && stc === 0) {
      const minX = stx;
      const maxX = stx + width * sta;
      const minY = sty;
      const maxY = sty + height * std;
      this.sceneRenderCoords = RenderCoords.translate(
        //top-left
        minX,
        minY,
        //top-right
        maxX,
        minY,
        //bottom-right
        maxX,
        maxY,
        //bottom-left
        minX,
        maxY,
        this.sceneRenderCoords
      );
    } else {
      this.sceneRenderCoords = RenderCoords.translate(
        //top-left
        stx,
        sty,
        //top-right
        stx + width * sta,
        sty + width * stc,
        //bottom-right
        stx + width * sta + height * stb,
        sty + width * stc + height * std,
        //bottom-left
        stx + height * stb,
        sty + height * std,
        this.sceneRenderCoords
      );
    }
  }
  /**
   * This function calculates the clipping rectangle for a node.
   *
   * The function then checks if the node is rotated. If the node requires clipping and is not rotated, a new clipping rectangle is created based on the node's global transform and dimensions.
   * If a parent clipping rectangle exists, it is intersected with the node's clipping rectangle (if it exists), or replaces the node's clipping rectangle.
   *
   * Finally, the node's parentClippingRect and clippingRect properties are updated.
   */
  calculateClippingRect(parentClippingRect) {
    assertTruthy(this.globalTransform);
    const { clippingRect, props, globalTransform: gt } = this;
    const { clipping } = props;
    const isRotated = gt.tb !== 0 || gt.tc !== 0;
    if (clipping === true && isRotated === false) {
      clippingRect.x = gt.tx;
      clippingRect.y = gt.ty;
      clippingRect.width = this.width * gt.ta;
      clippingRect.height = this.height * gt.td;
      clippingRect.valid = true;
    } else {
      clippingRect.valid = false;
    }
    if (parentClippingRect.valid === true && clippingRect.valid === true) {
      intersectRect(parentClippingRect, clippingRect, clippingRect);
    } else if (parentClippingRect.valid === true) {
      copyRect(parentClippingRect, clippingRect);
      clippingRect.valid = true;
    }
  }
  calculateZIndex() {
    var _a2, _b;
    const props = this.props;
    const z = props.zIndex || 0;
    const p = ((_a2 = props.parent) == null ? void 0 : _a2.zIndex) || 0;
    let zIndex = z;
    if ((_b = props.parent) == null ? void 0 : _b.zIndexLocked) {
      zIndex = z < p ? z : p;
    }
    this.calcZIndex = zIndex;
  }
  /**
   * Destroy the node and cleanup all resources
   */
  destroy() {
    var _a2;
    this.unloadTexture();
    this.clippingRect.valid = false;
    this.isRenderable = false;
    this.renderCoords = void 0;
    this.renderBound = void 0;
    this.strictBound = void 0;
    this.preloadBound = void 0;
    this.globalTransform = void 0;
    this.scaleRotateTransform = void 0;
    this.localTransform = void 0;
    this.props.texture = null;
    this.props.shader = this.stage.defShaderCtr;
    while (this.children.length > 0) {
      (_a2 = this.children[0]) == null ? void 0 : _a2.destroy();
    }
    this.parent = null;
    if (this.rtt) {
      this.stage.renderer.removeRTTNode(this);
    }
    this.removeAllListeners();
  }
  renderQuads(renderer2) {
    if (this.parentHasRenderTexture) {
      if (!renderer2.renderToTextureActive) {
        return;
      }
      if (this.parentRenderTexture !== renderer2.activeRttNode) {
        return;
      }
    }
    assertTruthy(this.globalTransform);
    assertTruthy(this.renderCoords);
    renderer2.addQuad({
      width: this.props.width,
      height: this.props.height,
      colorTl: this.premultipliedColorTl,
      colorTr: this.premultipliedColorTr,
      colorBl: this.premultipliedColorBl,
      colorBr: this.premultipliedColorBr,
      // if we do not have a texture, use the default texture
      // this assumes any renderable node is either a distinct texture or a ColorTexture
      texture: this.texture || this.stage.defaultTexture,
      textureOptions: this.textureOptions,
      zIndex: this.zIndex,
      shader: this.shader.shader,
      shaderProps: this.shader.getResolvedProps(),
      alpha: this.worldAlpha,
      clippingRect: this.clippingRect,
      tx: this.globalTransform.tx,
      ty: this.globalTransform.ty,
      ta: this.globalTransform.ta,
      tb: this.globalTransform.tb,
      tc: this.globalTransform.tc,
      td: this.globalTransform.td,
      renderCoords: this.renderCoords,
      rtt: this.rtt,
      parentHasRenderTexture: this.parentHasRenderTexture,
      framebufferDimensions: this.framebufferDimensions
    });
  }
  //#region Properties
  get id() {
    return this._id;
  }
  get data() {
    return this.props.data;
  }
  set data(d) {
    this.props.data = d;
  }
  get x() {
    return this.props.x;
  }
  set x(value) {
    if (this.props.x !== value) {
      this.props.x = value;
      this.setUpdateType(UpdateType.Local);
    }
  }
  get absX() {
    var _a2, _b, _c;
    return this.props.x + -this.props.width * this.props.mountX + (((_a2 = this.props.parent) == null ? void 0 : _a2.absX) || ((_c = (_b = this.props.parent) == null ? void 0 : _b.globalTransform) == null ? void 0 : _c.tx) || 0);
  }
  get absY() {
    var _a2, _b;
    return this.props.y + -this.props.height * this.props.mountY + ((_b = (_a2 = this.props.parent) == null ? void 0 : _a2.absY) != null ? _b : 0);
  }
  get y() {
    return this.props.y;
  }
  set y(value) {
    if (this.props.y !== value) {
      this.props.y = value;
      this.setUpdateType(UpdateType.Local);
    }
  }
  get width() {
    return this.props.width;
  }
  set width(value) {
    if (this.props.width !== value) {
      this.props.width = value;
      this.setUpdateType(UpdateType.Local);
      if (this.props.rtt) {
        this.texture = this.stage.txManager.createTexture("RenderTexture", {
          width: this.width,
          height: this.height
        });
        this.setUpdateType(UpdateType.RenderTexture);
      }
    }
  }
  get height() {
    return this.props.height;
  }
  set height(value) {
    if (this.props.height !== value) {
      this.props.height = value;
      this.setUpdateType(UpdateType.Local);
      if (this.props.rtt) {
        this.texture = this.stage.txManager.createTexture("RenderTexture", {
          width: this.width,
          height: this.height
        });
        this.setUpdateType(UpdateType.RenderTexture);
      }
    }
  }
  get scale() {
    return this.scaleX;
  }
  set scale(value) {
    this.scaleX = value;
    this.scaleY = value;
  }
  get scaleX() {
    return this.props.scaleX;
  }
  set scaleX(value) {
    if (this.props.scaleX !== value) {
      this.props.scaleX = value;
      this.setUpdateType(UpdateType.ScaleRotate);
    }
  }
  get scaleY() {
    return this.props.scaleY;
  }
  set scaleY(value) {
    if (this.props.scaleY !== value) {
      this.props.scaleY = value;
      this.setUpdateType(UpdateType.ScaleRotate);
    }
  }
  get mount() {
    return this.props.mount;
  }
  set mount(value) {
    if (this.props.mountX !== value || this.props.mountY !== value) {
      this.props.mountX = value;
      this.props.mountY = value;
      this.props.mount = value;
      this.setUpdateType(UpdateType.Local);
    }
  }
  get mountX() {
    return this.props.mountX;
  }
  set mountX(value) {
    if (this.props.mountX !== value) {
      this.props.mountX = value;
      this.setUpdateType(UpdateType.Local);
    }
  }
  get mountY() {
    return this.props.mountY;
  }
  set mountY(value) {
    if (this.props.mountY !== value) {
      this.props.mountY = value;
      this.setUpdateType(UpdateType.Local);
    }
  }
  get pivot() {
    return this.props.pivot;
  }
  set pivot(value) {
    if (this.props.pivotX !== value || this.props.pivotY !== value) {
      this.props.pivotX = value;
      this.props.pivotY = value;
      this.props.pivot = value;
      this.setUpdateType(UpdateType.Local);
    }
  }
  get pivotX() {
    return this.props.pivotX;
  }
  set pivotX(value) {
    if (this.props.pivotX !== value) {
      this.props.pivotX = value;
      this.setUpdateType(UpdateType.Local);
    }
  }
  get pivotY() {
    return this.props.pivotY;
  }
  set pivotY(value) {
    if (this.props.pivotY !== value) {
      this.props.pivotY = value;
      this.setUpdateType(UpdateType.Local);
    }
  }
  get rotation() {
    return this.props.rotation;
  }
  set rotation(value) {
    if (this.props.rotation !== value) {
      this.props.rotation = value;
      this.setUpdateType(UpdateType.ScaleRotate);
    }
  }
  get alpha() {
    return this.props.alpha;
  }
  set alpha(value) {
    this.props.alpha = value;
    this.setUpdateType(UpdateType.PremultipliedColors | UpdateType.WorldAlpha | UpdateType.Children | UpdateType.IsRenderable);
    this.childUpdateType |= UpdateType.WorldAlpha;
  }
  get autosize() {
    return this.props.autosize;
  }
  set autosize(value) {
    this.props.autosize = value;
  }
  get boundsMargin() {
    var _a2, _b, _c;
    return (_c = (_b = this.props.boundsMargin) != null ? _b : (_a2 = this.parent) == null ? void 0 : _a2.boundsMargin) != null ? _c : this.stage.boundsMargin;
  }
  set boundsMargin(value) {
    if (value === this.props.boundsMargin) {
      return;
    }
    if (value === null) {
      this.props.boundsMargin = value;
    } else {
      const bm = Array.isArray(value) ? value : [value, value, value, value];
      this.props.boundsMargin = bm;
    }
    this.setUpdateType(UpdateType.RenderBounds);
  }
  get clipping() {
    return this.props.clipping;
  }
  set clipping(value) {
    this.props.clipping = value;
    this.setUpdateType(UpdateType.Clipping | UpdateType.RenderBounds | UpdateType.Children);
    this.childUpdateType |= UpdateType.Global | UpdateType.Clipping;
  }
  get color() {
    return this.props.color;
  }
  set color(value) {
    this.colorTop = value;
    this.colorBottom = value;
    this.colorLeft = value;
    this.colorRight = value;
    this.props.color = value;
    this.setUpdateType(UpdateType.PremultipliedColors);
  }
  get colorTop() {
    return this.props.colorTop;
  }
  set colorTop(value) {
    if (this.props.colorTl !== value || this.props.colorTr !== value) {
      this.colorTl = value;
      this.colorTr = value;
    }
    this.props.colorTop = value;
    this.setUpdateType(UpdateType.PremultipliedColors);
  }
  get colorBottom() {
    return this.props.colorBottom;
  }
  set colorBottom(value) {
    if (this.props.colorBl !== value || this.props.colorBr !== value) {
      this.colorBl = value;
      this.colorBr = value;
    }
    this.props.colorBottom = value;
    this.setUpdateType(UpdateType.PremultipliedColors);
  }
  get colorLeft() {
    return this.props.colorLeft;
  }
  set colorLeft(value) {
    if (this.props.colorTl !== value || this.props.colorBl !== value) {
      this.colorTl = value;
      this.colorBl = value;
    }
    this.props.colorLeft = value;
    this.setUpdateType(UpdateType.PremultipliedColors);
  }
  get colorRight() {
    return this.props.colorRight;
  }
  set colorRight(value) {
    if (this.props.colorTr !== value || this.props.colorBr !== value) {
      this.colorTr = value;
      this.colorBr = value;
    }
    this.props.colorRight = value;
    this.setUpdateType(UpdateType.PremultipliedColors);
  }
  get colorTl() {
    return this.props.colorTl;
  }
  set colorTl(value) {
    this.props.colorTl = value;
    this.setUpdateType(UpdateType.PremultipliedColors);
  }
  get colorTr() {
    return this.props.colorTr;
  }
  set colorTr(value) {
    this.props.colorTr = value;
    this.setUpdateType(UpdateType.PremultipliedColors);
  }
  get colorBl() {
    return this.props.colorBl;
  }
  set colorBl(value) {
    this.props.colorBl = value;
    this.setUpdateType(UpdateType.PremultipliedColors);
  }
  get colorBr() {
    return this.props.colorBr;
  }
  set colorBr(value) {
    this.props.colorBr = value;
    this.setUpdateType(UpdateType.PremultipliedColors);
  }
  // we're only interested in parent zIndex to test
  // if we should use node zIndex is higher then parent zIndex
  get zIndexLocked() {
    return this.props.zIndexLocked || 0;
  }
  set zIndexLocked(value) {
    this.props.zIndexLocked = value;
    this.setUpdateType(UpdateType.CalculatedZIndex | UpdateType.Children);
    for (let i = 0, length = this.children.length; i < length; i++) {
      this.children[i].setUpdateType(UpdateType.CalculatedZIndex);
    }
  }
  get zIndex() {
    return this.props.zIndex;
  }
  set zIndex(value) {
    this.props.zIndex = value;
    this.setUpdateType(UpdateType.CalculatedZIndex | UpdateType.Children);
    for (let i = 0, length = this.children.length; i < length; i++) {
      this.children[i].setUpdateType(UpdateType.CalculatedZIndex);
    }
  }
  get parent() {
    return this.props.parent;
  }
  set parent(newParent) {
    const oldParent = this.props.parent;
    if (oldParent === newParent) {
      return;
    }
    this.props.parent = newParent;
    if (oldParent) {
      const index = oldParent.children.indexOf(this);
      oldParent.children.splice(index, 1);
      oldParent.setUpdateType(UpdateType.Children | UpdateType.ZIndexSortedChildren);
    }
    if (newParent) {
      newParent.children.push(this);
      this.setUpdateType(UpdateType.All);
      newParent.setUpdateType(UpdateType.Children | UpdateType.ZIndexSortedChildren);
      if (newParent.rtt || newParent.parentHasRenderTexture) {
        this.applyRTTInheritance(newParent);
      }
    }
    this.updateScaleRotateTransform();
    this.setUpdateType(UpdateType.RenderBounds | UpdateType.Children);
  }
  get preventCleanup() {
    return this.props.textureOptions.preventCleanup || false;
  }
  set preventCleanup(value) {
    this.props.textureOptions.preventCleanup = value;
  }
  get rtt() {
    return this.props.rtt;
  }
  set rtt(value) {
    if (this.props.rtt === value) {
      return;
    }
    this.props.rtt = value;
    if (value === true) {
      this.initRenderTexture();
      this.markChildrenWithRTT();
    } else {
      this.cleanupRenderTexture();
    }
    this.setUpdateType(UpdateType.RenderTexture);
    if (this.parentHasRenderTexture === true) {
      this.notifyParentRTTOfUpdate();
    }
  }
  initRenderTexture() {
    this.texture = this.stage.txManager.createTexture("RenderTexture", {
      width: this.width,
      height: this.height
    });
    this.stage.renderer.renderToTexture(this);
  }
  cleanupRenderTexture() {
    this.unloadTexture();
    this.clearRTTInheritance();
    this.hasRTTupdates = false;
    this.texture = null;
  }
  markChildrenWithRTT(node = null) {
    const parent = node || this;
    for (const child of parent.children) {
      child.setUpdateType(UpdateType.All);
      child.parentHasRenderTexture = true;
      child.markChildrenWithRTT();
    }
  }
  // Apply RTT inheritance when a node has an RTT-enabled parent
  applyRTTInheritance(parent) {
    if (parent.rtt) {
      parent.setUpdateType(UpdateType.RenderTexture);
    }
    this.markChildrenWithRTT(parent);
  }
  // Clear RTT inheritance when detaching from an RTT chain
  clearRTTInheritance() {
    if (this.rtt) {
      return;
    }
    for (const child of this.children) {
      child.parentHasRenderTexture = false;
      child.rttParent = null;
      child.setUpdateType(UpdateType.All);
      child.clearRTTInheritance();
    }
  }
  get shader() {
    return this.props.shader;
  }
  set shader(value) {
    if (this.props.shader === value) {
      return;
    }
    this.props.shader = value;
    this.setUpdateType(UpdateType.IsRenderable);
  }
  get src() {
    return this.props.src;
  }
  set src(imageUrl) {
    if (this.props.src === imageUrl) {
      return;
    }
    this.props.src = imageUrl;
    if (!imageUrl) {
      this.texture = null;
      return;
    }
    this.texture = this.stage.txManager.createTexture("ImageTexture", {
      src: imageUrl,
      width: this.props.width,
      height: this.props.height,
      type: this.props.imageType,
      sx: this.props.srcX,
      sy: this.props.srcY,
      sw: this.props.srcWidth,
      sh: this.props.srcHeight
    });
  }
  set imageType(type) {
    if (this.props.imageType === type) {
      return;
    }
    this.props.imageType = type;
  }
  get imageType() {
    return this.props.imageType || null;
  }
  get srcHeight() {
    return this.props.srcHeight;
  }
  set srcHeight(value) {
    this.props.srcHeight = value;
  }
  get srcWidth() {
    return this.props.srcWidth;
  }
  set srcWidth(value) {
    this.props.srcWidth = value;
  }
  get srcX() {
    return this.props.srcX;
  }
  set srcX(value) {
    this.props.srcX = value;
  }
  get srcY() {
    return this.props.srcY;
  }
  set srcY(value) {
    this.props.srcY = value;
  }
  /**
   * Returns the framebuffer dimensions of the node.
   * If the node has a render texture, the dimensions are the same as the node's dimensions.
   * If the node does not have a render texture, the dimensions are inherited from the parent.
   * If the node parent has a render texture and the node is a render texture, the nodes dimensions are used.
   */
  get framebufferDimensions() {
    if (this.parentHasRenderTexture && !this.rtt && this.parent) {
      return this.parent.framebufferDimensions;
    }
    return { width: this.width, height: this.height };
  }
  /**
   * Returns the parent render texture node if it exists.
   */
  get parentRenderTexture() {
    let parent = this.parent;
    while (parent) {
      if (parent.rtt) {
        return parent;
      }
      parent = parent.parent;
    }
    return null;
  }
  get texture() {
    return this.props.texture;
  }
  set texture(value) {
    if (this.props.texture === value) {
      return;
    }
    const oldTexture = this.props.texture;
    if (oldTexture) {
      oldTexture.setRenderableOwner(this, false);
      this.unloadTexture();
    }
    this.props.texture = value;
    if (value !== null) {
      value.setRenderableOwner(this, this.isRenderable);
      this.loadTexture();
    }
    this.setUpdateType(UpdateType.IsRenderable);
  }
  set textureOptions(value) {
    this.props.textureOptions = value;
  }
  get textureOptions() {
    return this.props.textureOptions;
  }
  get strictBounds() {
    return this.props.strictBounds;
  }
  set strictBounds(v) {
    if (v === this.props.strictBounds) {
      return;
    }
    this.props.strictBounds = v;
    this.setUpdateType(UpdateType.RenderBounds | UpdateType.Children);
    this.childUpdateType |= UpdateType.RenderBounds | UpdateType.Children;
  }
  animate(props, settings) {
    const animation = new CoreAnimation(this, props, settings);
    const controller = new CoreAnimationController(this.stage.animationManager, animation);
    return controller;
  }
  flush() {
  }
}
const startLoop = (stage) => {
  let isIdle = false;
  const runLoop = () => {
    stage.updateFrameTime();
    stage.updateAnimations();
    if (!stage.hasSceneUpdates()) {
      stage.calculateFps();
      setTimeout(runLoop, 16.666666666666668);
      if (!isIdle) {
        stage.eventBus.emit("idle");
        isIdle = true;
      }
      if (stage.txMemManager.checkCleanup() === true) {
        stage.txMemManager.cleanup(false);
      }
      stage.flushFrameEvents();
      return;
    }
    isIdle = false;
    stage.drawFrame();
    stage.flushFrameEvents();
    requestAnimationFrame(runLoop);
  };
  requestAnimationFrame(runLoop);
};
const getTimeStamp = () => {
  return performance ? performance.now() : Date.now();
};
class AnimationManager {
  constructor() {
    __publicField(this, "activeAnimations", /* @__PURE__ */ new Set());
  }
  registerAnimation(animation) {
    this.activeAnimations.add(animation);
  }
  unregisterAnimation(animation) {
    this.activeAnimations.delete(animation);
  }
  update(dt) {
    this.activeAnimations.forEach((animation) => {
      animation.update(dt);
    });
  }
}
function createImageWorker() {
  function hasAlphaChannel(mimeType) {
    return mimeType.indexOf("image/png") !== -1;
  }
  function getImage(src, premultiplyAlpha, x, y, width, height, options) {
    return new Promise(function(resolve, reject) {
      var supportsOptionsCreateImageBitmap = options.supportsOptionsCreateImageBitmap;
      var supportsFullCreateImageBitmap = options.supportsFullCreateImageBitmap;
      var xhr = new XMLHttpRequest();
      xhr.open("GET", src, true);
      xhr.responseType = "blob";
      xhr.onload = function() {
        if (xhr.status !== 200 && xhr.status !== 0) {
          return reject(new Error("Failed to load image: " + xhr.statusText));
        }
        var blob = xhr.response;
        var withAlphaChannel = premultiplyAlpha !== void 0 ? premultiplyAlpha : hasAlphaChannel(blob.type);
        if (supportsFullCreateImageBitmap === true && width !== null && height !== null) {
          createImageBitmap(blob, x || 0, y || 0, width, height, {
            premultiplyAlpha: withAlphaChannel ? "premultiply" : "none",
            colorSpaceConversion: "none",
            imageOrientation: "none"
          }).then(function(data) {
            resolve({ data, premultiplyAlpha });
          }).catch(function(error) {
            reject(error);
          });
          return;
        } else if (supportsOptionsCreateImageBitmap === false && supportsOptionsCreateImageBitmap === false) {
          createImageBitmap(blob).then(function(data) {
            resolve({ data, premultiplyAlpha });
          }).catch(function(error) {
            reject(error);
          });
        } else {
          createImageBitmap(blob, {
            premultiplyAlpha: withAlphaChannel ? "premultiply" : "none",
            colorSpaceConversion: "none",
            imageOrientation: "none"
          }).then(function(data) {
            resolve({ data, premultiplyAlpha });
          }).catch(function(error) {
            reject(error);
          });
        }
      };
      xhr.onerror = function() {
        reject(new Error("Network error occurred while trying to fetch the image."));
      };
      xhr.send();
    });
  }
  self.onmessage = (event) => {
    var src = event.data.src;
    var id = event.data.id;
    var premultiplyAlpha = event.data.premultiplyAlpha;
    var x = event.data.sx;
    var y = event.data.sy;
    var width = event.data.sw;
    var height = event.data.sh;
    var supportsOptionsCreateImageBitmap = false;
    var supportsFullCreateImageBitmap = false;
    getImage(src, premultiplyAlpha, x, y, width, height, {
      supportsOptionsCreateImageBitmap,
      supportsFullCreateImageBitmap
    }).then(function(data) {
      self.postMessage({ id, src, data });
    }).catch(function(error) {
      self.postMessage({ id, src, error: error.message });
    });
  };
}
class ImageWorkerManager {
  constructor(numImageWorkers2, createImageBitmapSupport) {
    __publicField(this, "imageWorkersEnabled", true);
    __publicField(this, "messageManager", {});
    __publicField(this, "workers", []);
    __publicField(this, "workerIndex", 0);
    __publicField(this, "nextId", 0);
    this.workers = this.createWorkers(numImageWorkers2, createImageBitmapSupport);
    this.workers.forEach((worker) => {
      worker.onmessage = this.handleMessage.bind(this);
    });
  }
  handleMessage(event) {
    const { id, data, error } = event.data;
    const msg = this.messageManager[id];
    if (msg) {
      const [resolve, reject] = msg;
      delete this.messageManager[id];
      if (error) {
        reject(new Error(error));
      } else {
        resolve(data);
      }
    }
  }
  createWorkers(numWorkers2 = 1, createImageBitmapSupport) {
    let workerCode = "(".concat(createImageWorker.toString(), ")()");
    if (createImageBitmapSupport.options === true) {
      workerCode = workerCode.replace("var supportsOptionsCreateImageBitmap = false;", "var supportsOptionsCreateImageBitmap = true;");
    }
    if (createImageBitmapSupport.full === true) {
      workerCode = workerCode.replace("var supportsOptionsCreateImageBitmap = false;", "var supportsOptionsCreateImageBitmap = true;");
      workerCode = workerCode.replace("var supportsFullCreateImageBitmap = false;", "var supportsFullCreateImageBitmap = true;");
    }
    workerCode = workerCode.replace('"use strict";', "");
    const blob = new Blob([workerCode], {
      type: "application/javascript"
    });
    const blobURL = (self.URL ? URL : webkitURL).createObjectURL(blob);
    const workers = [];
    for (let i = 0; i < numWorkers2; i++) {
      workers.push(new Worker(blobURL));
    }
    return workers;
  }
  getNextWorker() {
    const worker = this.workers[this.workerIndex];
    this.workerIndex = (this.workerIndex + 1) % this.workers.length;
    return worker;
  }
  getImage(src, premultiplyAlpha, sx, sy, sw, sh) {
    return new Promise((resolve, reject) => {
      try {
        if (this.workers) {
          const id = this.nextId++;
          this.messageManager[id] = [resolve, reject];
          const nextWorker = this.getNextWorker();
          if (nextWorker) {
            nextWorker.postMessage({
              id,
              src,
              premultiplyAlpha,
              sx,
              sy,
              sw,
              sh
            });
          }
        }
      } catch (error) {
        reject(error);
      }
    });
  }
}
const _ColorTexture = class _ColorTexture extends Texture {
  constructor(txManager, props) {
    super(txManager);
    __publicField(this, "type", TextureType.color);
    __publicField(this, "props");
    this.props = _ColorTexture.resolveDefaults(props || {});
  }
  get color() {
    return this.props.color;
  }
  set color(color) {
    this.props.color = color;
  }
  async getTextureSource() {
    const pixelData = new Uint8Array(4);
    if (this.color === 4294967295) {
      pixelData[0] = 255;
      pixelData[1] = 255;
      pixelData[2] = 255;
      pixelData[3] = 255;
    } else {
      pixelData[0] = this.color >> 16 & 255;
      pixelData[1] = this.color >> 8 & 255;
      pixelData[2] = this.color & 255;
      pixelData[3] = this.color >>> 24 & 255;
    }
    this.setState("fetched", { width: 1, height: 1 });
    return {
      data: pixelData,
      premultiplyAlpha: true
    };
  }
  static makeCacheKey(props) {
    const resolvedProps = _ColorTexture.resolveDefaults(props);
    return "ColorTexture,".concat(resolvedProps.color);
  }
  static resolveDefaults(props) {
    return {
      color: props.color || 4294967295
    };
  }
};
__publicField(_ColorTexture, "z$__type__Props");
let ColorTexture = _ColorTexture;
function isCompressedTextureContainer(url) {
  return /\.(ktx|pvr)$/.test(url);
}
const loadCompressedTexture = async (url) => {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  if (url.indexOf(".ktx") !== -1) {
    return loadKTXData(arrayBuffer);
  }
  return loadPVRData(arrayBuffer);
};
const loadKTXData = async (buffer) => {
  const view = new DataView(buffer);
  const littleEndian = view.getUint32(12) === 16909060 ? true : false;
  const mipmaps = [];
  const data = {
    glInternalFormat: view.getUint32(28, littleEndian),
    pixelWidth: view.getUint32(36, littleEndian),
    pixelHeight: view.getUint32(40, littleEndian),
    numberOfMipmapLevels: view.getUint32(56, littleEndian),
    bytesOfKeyValueData: view.getUint32(60, littleEndian)
  };
  let offset = 64;
  offset += data.bytesOfKeyValueData;
  for (let i = 0; i < data.numberOfMipmapLevels; i++) {
    const imageSize = view.getUint32(offset);
    offset += 4;
    mipmaps.push(view.buffer.slice(offset, imageSize));
    offset += imageSize;
  }
  return {
    data: {
      glInternalFormat: data.glInternalFormat,
      mipmaps,
      width: data.pixelWidth || 0,
      height: data.pixelHeight || 0,
      type: "ktx"
    },
    premultiplyAlpha: false
  };
};
const loadPVRData = async (buffer) => {
  const pvrHeaderLength = 13;
  const pvrFormatEtc1 = 36196;
  const pvrWidth = 7;
  const pvrHeight = 6;
  const pvrMipmapCount = 11;
  const pvrMetadata = 12;
  const arrayBuffer = buffer;
  const header = new Int32Array(arrayBuffer, 0, pvrHeaderLength);
  const dataOffset = header[pvrMetadata] + 52;
  const pvrtcData = new Uint8Array(arrayBuffer, dataOffset);
  const mipmaps = [];
  const data = {
    pixelWidth: header[pvrWidth],
    pixelHeight: header[pvrHeight],
    numberOfMipmapLevels: header[pvrMipmapCount] || 0
  };
  let offset = 0;
  let width = data.pixelWidth || 0;
  let height = data.pixelHeight || 0;
  for (let i = 0; i < data.numberOfMipmapLevels; i++) {
    const level = (width + 3 >> 2) * (height + 3 >> 2) * 8;
    const view = new Uint8Array(arrayBuffer, pvrtcData.byteOffset + offset, level);
    mipmaps.push(view);
    offset += level;
    width = width >> 1;
    height = height >> 1;
  }
  return {
    data: {
      glInternalFormat: pvrFormatEtc1,
      mipmaps,
      width: data.pixelWidth || 0,
      height: data.pixelHeight || 0,
      type: "pvr"
    },
    premultiplyAlpha: false
  };
};
function isSvgImage(url) {
  return /\.(svg)(\?.*)?$/.test(url);
}
const loadSvg = (url, width, height, sx, sy, sw, sh) => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = true;
    const img = new Image();
    img.onload = () => {
      const x = sx != null ? sx : 0;
      const y = sy != null ? sy : 0;
      const w = width || img.width;
      const h = height || img.height;
      canvas.width = w;
      canvas.height = h;
      ctx.drawImage(img, 0, 0, w, h);
      resolve({
        data: ctx.getImageData(x, y, sw != null ? sw : w, sh != null ? sh : h),
        premultiplyAlpha: false
      });
    };
    img.onerror = (err) => {
      reject(err);
    };
    img.src = url;
  });
};
function fetchJson(url, responseType = "") {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = responseType;
    xhr.onreadystatechange = function() {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        if (xhr.status === 0 || xhr.status === 200) {
          resolve(xhr.response);
        } else {
          reject(xhr.statusText);
        }
      }
    };
    xhr.open("GET", url, true);
    xhr.send(null);
  });
}
const _ImageTexture = class _ImageTexture extends Texture {
  constructor(txManager, props) {
    super(txManager);
    __publicField(this, "props");
    __publicField(this, "type", TextureType.image);
    this.props = _ImageTexture.resolveDefaults(props);
  }
  hasAlphaChannel(mimeType) {
    return mimeType.indexOf("image/png") !== -1;
  }
  async loadImageFallback(src, hasAlpha) {
    const img = new Image();
    if (isBase64Image(src) === false) {
      img.crossOrigin = "anonymous";
    }
    return new Promise((resolve) => {
      img.onload = () => {
        resolve({ data: img, premultiplyAlpha: hasAlpha });
      };
      img.onerror = () => {
        console.warn("Image loading failed, returning fallback object.");
        resolve({ data: img, premultiplyAlpha: hasAlpha });
      };
      img.src = src;
    });
  }
  async createImageBitmap(blob, premultiplyAlpha, sx, sy, sw, sh) {
    const hasAlphaChannel = premultiplyAlpha != null ? premultiplyAlpha : blob.type.includes("image/png");
    const imageBitmapSupported = this.txManager.imageBitmapSupported;
    if (imageBitmapSupported.full === true && sw !== null && sh !== null) {
      const bitmap2 = await createImageBitmap(blob, sx || 0, sy || 0, sw, sh, {
        premultiplyAlpha: hasAlphaChannel ? "premultiply" : "none",
        colorSpaceConversion: "none",
        imageOrientation: "none"
      });
      return { data: bitmap2, premultiplyAlpha: hasAlphaChannel };
    } else if (imageBitmapSupported.basic === true) {
      return {
        data: await createImageBitmap(blob),
        premultiplyAlpha: hasAlphaChannel
      };
    }
    const bitmap = await createImageBitmap(blob, {
      premultiplyAlpha: hasAlphaChannel ? "premultiply" : "none",
      colorSpaceConversion: "none",
      imageOrientation: "none"
    });
    return { data: bitmap, premultiplyAlpha: hasAlphaChannel };
  }
  async loadImage(src) {
    const { premultiplyAlpha, sx, sy, sw, sh } = this.props;
    if (this.txManager.hasCreateImageBitmap === true) {
      if (isBase64Image(src) === false && this.txManager.hasWorker === true && this.txManager.imageWorkerManager !== null) {
        return this.txManager.imageWorkerManager.getImage(src, premultiplyAlpha, sx, sy, sw, sh);
      }
      const blob = await fetchJson(src, "blob").then((response) => response);
      return this.createImageBitmap(blob, premultiplyAlpha, sx, sy, sw, sh);
    }
    return this.loadImageFallback(src, premultiplyAlpha != null ? premultiplyAlpha : true);
  }
  async getTextureSource() {
    var _a2, _b, _c, _d, _e, _f, _g;
    let resp;
    try {
      resp = await this.determineImageTypeAndLoadImage();
    } catch (e) {
      this.setState("failed", e);
      return {
        data: null
      };
    }
    if (resp.data === null) {
      this.setState("failed", Error("ImageTexture: No image data"));
      return {
        data: null
      };
    }
    let width, height;
    if (resp.data instanceof Uint8Array) {
      width = (_a2 = this.props.width) != null ? _a2 : 0;
      height = (_b = this.props.height) != null ? _b : 0;
    } else {
      width = (_d = (_c = resp.data) == null ? void 0 : _c.width) != null ? _d : this.props.width || 0;
      height = (_f = (_e = resp.data) == null ? void 0 : _e.height) != null ? _f : this.props.height || 0;
    }
    this.setState("fetched", {
      width,
      height
    });
    return {
      data: resp.data,
      premultiplyAlpha: (_g = this.props.premultiplyAlpha) != null ? _g : true
    };
  }
  determineImageTypeAndLoadImage() {
    const { src, premultiplyAlpha, type } = this.props;
    if (src === null) {
      return {
        data: null
      };
    }
    if (typeof src !== "string") {
      if (src instanceof ImageData) {
        return {
          data: src,
          premultiplyAlpha
        };
      }
      return {
        data: src(),
        premultiplyAlpha
      };
    }
    const absoluteSrc = convertUrlToAbsolute(src);
    if (type === "regular") {
      return this.loadImage(absoluteSrc);
    }
    if (type === "svg") {
      return loadSvg(absoluteSrc, this.props.width, this.props.height, this.props.sx, this.props.sy, this.props.sw, this.props.sh);
    }
    if (isSvgImage(src) === true) {
      return loadSvg(absoluteSrc, this.props.width, this.props.height, this.props.sx, this.props.sy, this.props.sw, this.props.sh);
    }
    if (type === "compressed") {
      return loadCompressedTexture(absoluteSrc);
    }
    if (isCompressedTextureContainer(src) === true) {
      return loadCompressedTexture(absoluteSrc);
    }
    return this.loadImage(absoluteSrc);
  }
  /**
   * Generates a cache key for the ImageTexture based on the provided props.
   * @param props - The props used to generate the cache key.
   * @returns The cache key as a string, or `false` if the key cannot be generated.
   */
  static makeCacheKey(props) {
    var _a2, _b, _c;
    const resolvedProps = _ImageTexture.resolveDefaults(props);
    const key2 = resolvedProps.key || resolvedProps.src;
    if (typeof key2 !== "string") {
      return false;
    }
    let dimensionProps = "";
    if (resolvedProps.sh !== null && resolvedProps.sw !== null) {
      dimensionProps += ",";
      dimensionProps += (_a2 = resolvedProps.sx) != null ? _a2 : "";
      dimensionProps += (_b = resolvedProps.sy) != null ? _b : "";
      dimensionProps += resolvedProps.sw || "";
      dimensionProps += resolvedProps.sh || "";
    }
    return "ImageTexture,".concat(key2, ",").concat((_c = resolvedProps.premultiplyAlpha) != null ? _c : "true").concat(dimensionProps);
  }
  static resolveDefaults(props) {
    var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j;
    return {
      src: (_a2 = props.src) != null ? _a2 : "",
      premultiplyAlpha: (_b = props.premultiplyAlpha) != null ? _b : true,
      // null,
      key: (_c = props.key) != null ? _c : null,
      type: (_d = props.type) != null ? _d : null,
      width: (_e = props.width) != null ? _e : null,
      height: (_f = props.height) != null ? _f : null,
      sx: (_g = props.sx) != null ? _g : null,
      sy: (_h = props.sy) != null ? _h : null,
      sw: (_i = props.sw) != null ? _i : null,
      sh: (_j = props.sh) != null ? _j : null
    };
  }
};
__publicField(_ImageTexture, "z$__type__Props");
let ImageTexture = _ImageTexture;
const _NoiseTexture = class _NoiseTexture extends Texture {
  constructor(txManager, props) {
    super(txManager);
    __publicField(this, "props");
    __publicField(this, "type", TextureType.noise);
    this.props = _NoiseTexture.resolveDefaults(props);
  }
  async getTextureSource() {
    const { width, height } = this.props;
    const size = width * height * 4;
    const pixelData8 = new Uint8ClampedArray(size);
    for (let i = 0; i < size; i += 4) {
      const v = Math.floor(Math.random() * 256);
      pixelData8[i] = v;
      pixelData8[i + 1] = v;
      pixelData8[i + 2] = v;
      pixelData8[i + 3] = 255;
    }
    this.setState("fetched");
    return {
      data: new ImageData(pixelData8, width, height)
    };
  }
  static makeCacheKey(props) {
    if (props.cacheId === void 0) {
      return false;
    }
    const resolvedProps = _NoiseTexture.resolveDefaults(props);
    return "NoiseTexture,".concat(resolvedProps.width, ",").concat(resolvedProps.height, ",").concat(resolvedProps.cacheId);
  }
  static resolveDefaults(props) {
    var _a2, _b, _c;
    return {
      width: (_a2 = props.width) != null ? _a2 : 128,
      height: (_b = props.height) != null ? _b : 128,
      cacheId: (_c = props.cacheId) != null ? _c : 0
    };
  }
};
__publicField(_NoiseTexture, "z$__type__Props");
let NoiseTexture = _NoiseTexture;
const _SubTexture = class _SubTexture extends Texture {
  constructor(txManager, props) {
    super(txManager);
    __publicField(this, "props");
    __publicField(this, "parentTexture");
    __publicField(this, "type", TextureType.subTexture);
    __publicField(this, "onParentTxLoaded", () => {
      this.forwardParentTxState("loaded", {
        width: this.props.width,
        height: this.props.height
      });
    });
    __publicField(this, "onParentTxFailed", (target, error) => {
      this.forwardParentTxState("failed", error);
    });
    __publicField(this, "onParentTxFetched", () => {
      this.forwardParentTxState("fetched", {
        width: this.props.width,
        height: this.props.height
      });
    });
    __publicField(this, "onParentTxFetching", () => {
      this.forwardParentTxState("fetching");
    });
    __publicField(this, "onParentTxLoading", () => {
      this.forwardParentTxState("loading");
    });
    __publicField(this, "onParentTxFreed", () => {
      this.forwardParentTxState("freed");
    });
    this.props = _SubTexture.resolveDefaults(props || {});
    assertTruthy(this.props.texture);
    assertTruthy(this.props.texture instanceof ImageTexture);
    this.parentTexture = txManager.resolveParentTexture(this.props.texture);
    if (this.renderableOwners.size > 0) {
      this.parentTexture.setRenderableOwner(this, true);
    }
    queueMicrotask(() => {
      const parentTx = this.parentTexture;
      if (parentTx.state === "loaded") {
        this.onParentTxLoaded(parentTx, parentTx.dimensions);
      } else if (parentTx.state === "fetching") {
        this.onParentTxFetching();
      } else if (parentTx.state === "fetched") {
        this.onParentTxFetched();
      } else if (parentTx.state === "loading") {
        this.onParentTxLoading();
      } else if (parentTx.state === "failed") {
        this.onParentTxFailed(parentTx, parentTx.error);
      } else if (parentTx.state === "freed") {
        this.onParentTxFreed();
      }
      parentTx.on("fetched", this.onParentTxFetched);
      parentTx.on("loading", this.onParentTxLoading);
      parentTx.on("fetching", this.onParentTxFetching);
      parentTx.on("loaded", this.onParentTxLoaded);
      parentTx.on("failed", this.onParentTxFailed);
      parentTx.on("freed", this.onParentTxFreed);
    });
  }
  forwardParentTxState(state, errorOrDimensions) {
    this.setState(state, errorOrDimensions);
  }
  onChangeIsRenderable(isRenderable) {
    this.parentTexture.setRenderableOwner(this, isRenderable);
  }
  async getTextureSource() {
    return new Promise((resolve, reject) => {
      this.setState("fetched");
      resolve({
        data: this.props
      });
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static makeCacheKey(props) {
    return false;
  }
  static resolveDefaults(props) {
    return {
      texture: props.texture,
      x: props.x || 0,
      y: props.y || 0,
      width: props.width || 0,
      height: props.height || 0
    };
  }
};
__publicField(_SubTexture, "z$__type__Props");
let SubTexture = _SubTexture;
const _RenderTexture = class _RenderTexture extends Texture {
  constructor(txManager, props) {
    super(txManager);
    __publicField(this, "props");
    __publicField(this, "type", TextureType.renderToTexture);
    this.props = _RenderTexture.resolveDefaults(props || {});
  }
  get width() {
    return this.props.width;
  }
  set width(value) {
    this.props.width = value;
  }
  get height() {
    return this.props.height;
  }
  set height(value) {
    this.props.height = value;
  }
  async getTextureSource() {
    this.setState("fetched");
    return {
      data: null,
      premultiplyAlpha: null
    };
  }
  static resolveDefaults(props) {
    return {
      width: props.width || 256,
      height: props.height || 256
    };
  }
};
__publicField(_RenderTexture, "z$__type__Props");
let RenderTexture = _RenderTexture;
async function validateCreateImageBitmap() {
  var _a2, _b, _c;
  const pngBinaryData = new Uint8Array([
    137,
    80,
    78,
    71,
    13,
    10,
    26,
    10,
    // PNG signature
    0,
    0,
    0,
    13,
    // IHDR chunk length
    73,
    72,
    68,
    82,
    // "IHDR" chunk type
    0,
    0,
    0,
    1,
    // Width: 1
    0,
    0,
    0,
    1,
    // Height: 1
    1,
    // Bit depth: 1
    3,
    // Color type: Indexed
    0,
    // Compression method: Deflate
    0,
    // Filter method: None
    0,
    // Interlace method: None
    37,
    219,
    86,
    202,
    // CRC for IHDR
    0,
    0,
    0,
    3,
    // PLTE chunk length
    80,
    76,
    84,
    69,
    // "PLTE" chunk type
    0,
    0,
    0,
    // Palette entry: Black
    167,
    122,
    61,
    218,
    // CRC for PLTE
    0,
    0,
    0,
    1,
    // tRNS chunk length
    116,
    82,
    78,
    83,
    // "tRNS" chunk type
    0,
    // Transparency for black: Fully transparent
    64,
    230,
    216,
    102,
    // CRC for tRNS
    0,
    0,
    0,
    10,
    // IDAT chunk length
    73,
    68,
    65,
    84,
    // "IDAT" chunk type
    8,
    215,
    // Deflate header
    99,
    96,
    0,
    0,
    0,
    2,
    0,
    1,
    // Zlib-compressed data
    226,
    33,
    188,
    51,
    // CRC for IDAT
    0,
    0,
    0,
    0,
    // IEND chunk length
    73,
    69,
    78,
    68,
    // "IEND" chunk type
    174,
    66,
    96,
    130
    // CRC for IEND
  ]);
  const support = {
    basic: false,
    options: false,
    full: false
  };
  const blob = new Blob([pngBinaryData], { type: "image/png" });
  const bitmap = await createImageBitmap(blob);
  (_a2 = bitmap.close) == null ? void 0 : _a2.call(bitmap);
  support.basic = true;
  try {
    const options = { premultiplyAlpha: "none" };
    const bitmapWithOptions = await createImageBitmap(blob, options);
    (_b = bitmapWithOptions.close) == null ? void 0 : _b.call(bitmapWithOptions);
    support.options = true;
  } catch (e) {
  }
  try {
    const bitmapWithFullOptions = await createImageBitmap(blob, 0, 0, 1, 1, {
      premultiplyAlpha: "none"
    });
    (_c = bitmapWithFullOptions.close) == null ? void 0 : _c.call(bitmapWithFullOptions);
    support.full = true;
  } catch (e) {
  }
  return support;
}
class CoreTextureManager extends EventEmitter {
  constructor(stage, settings) {
    super();
    /**
     * Map of textures by cache key
     */
    __publicField(this, "keyCache", /* @__PURE__ */ new Map());
    /**
     * Map of cache keys by texture
     */
    __publicField(this, "inverseKeyCache", /* @__PURE__ */ new WeakMap());
    /**
     * Map of texture constructors by their type name
     */
    __publicField(this, "txConstructors", {});
    __publicField(this, "downloadTextureSourceQueue", []);
    __publicField(this, "priorityQueue", []);
    __publicField(this, "uploadTextureQueue", []);
    __publicField(this, "initialized", false);
    __publicField(this, "stage");
    __publicField(this, "numImageWorkers");
    __publicField(this, "imageWorkerManager", null);
    __publicField(this, "hasCreateImageBitmap", !!self.createImageBitmap);
    __publicField(this, "imageBitmapSupported", {
      basic: false,
      options: false,
      full: false
    });
    __publicField(this, "hasWorker", !!self.Worker);
    /**
     * Renderer that this texture manager is associated with
     *
     * @remarks
     * This MUST be set before the texture manager is used. Otherwise errors
     * will occur when using the texture manager.
     */
    __publicField(this, "renderer");
    /**
     * The current frame time in milliseconds
     *
     * @remarks
     * This is used to populate the `lastRenderableChangeTime` property of
     * {@link Texture} instances when their renderable state changes.
     *
     * Set by stage via `updateFrameTime` method.
     */
    __publicField(this, "frameTime", 0);
    const { numImageWorkers: numImageWorkers2, createImageBitmapSupport } = settings;
    this.stage = stage;
    this.numImageWorkers = numImageWorkers2;
    if (createImageBitmapSupport === "auto") {
      validateCreateImageBitmap().then((result) => {
        this.initialize(result);
      }).catch((e) => {
        console.warn("[Lightning] createImageBitmap is not supported on this browser. ImageTexture will be slower.");
        this.initialized = true;
        this.emit("initialized");
      });
    } else {
      this.initialize({
        basic: createImageBitmapSupport === "basic",
        options: createImageBitmapSupport === "options",
        full: createImageBitmapSupport === "full"
      });
    }
    this.registerTextureType("ImageTexture", ImageTexture);
    this.registerTextureType("ColorTexture", ColorTexture);
    this.registerTextureType("NoiseTexture", NoiseTexture);
    this.registerTextureType("SubTexture", SubTexture);
    this.registerTextureType("RenderTexture", RenderTexture);
  }
  registerTextureType(textureType, textureClass) {
    this.txConstructors[textureType] = textureClass;
  }
  initialize(support) {
    this.hasCreateImageBitmap = support.basic || support.options || support.full;
    this.imageBitmapSupported = support;
    if (!this.hasCreateImageBitmap) {
      console.warn("[Lightning] createImageBitmap is not supported on this browser. ImageTexture will be slower.");
    }
    if (this.hasCreateImageBitmap && this.hasWorker && this.numImageWorkers > 0) {
      this.imageWorkerManager = new ImageWorkerManager(this.numImageWorkers, support);
    } else {
      console.warn("[Lightning] Imageworker is 0 or not supported on this browser. Image loading will be slower.");
    }
    this.initialized = true;
    this.emit("initialized");
  }
  /**
   * Enqueue a texture for downloading its source image.
   */
  enqueueDownloadTextureSource(texture) {
    if (!this.downloadTextureSourceQueue.includes(texture)) {
      this.downloadTextureSourceQueue.push(texture);
    }
  }
  /**
   * Enqueue a texture for uploading to the GPU.
   *
   * @param texture - The texture to upload
   */
  enqueueUploadTexture(texture) {
    if (this.uploadTextureQueue.includes(texture) === false) {
      this.uploadTextureQueue.push(texture);
    }
  }
  /**
   * Create a texture
   *
   * @param textureType - The type of texture to create
   * @param props - The properties to use for the texture
   */
  createTexture(textureType, props) {
    let texture;
    const TextureClass = this.txConstructors[textureType];
    if (!TextureClass) {
      throw new Error('Texture type "'.concat(textureType, '" is not registered'));
    }
    const cacheKey = TextureClass.makeCacheKey(props);
    if (cacheKey && this.keyCache.has(cacheKey)) {
      texture = this.keyCache.get(cacheKey);
    } else {
      texture = new TextureClass(this, props);
      if (cacheKey) {
        this.initTextureToCache(texture, cacheKey);
      }
    }
    return texture;
  }
  orphanTexture(texture) {
    this.removeTextureFromQueue(texture);
    if (texture.type === TextureType.subTexture) {
      return;
    }
    this.stage.txMemManager.addToOrphanedTextures(texture);
  }
  /**
   * Override loadTexture to use the batched approach.
   *
   * @param texture - The texture to load
   * @param immediate - Whether to prioritize the texture for immediate loading
   */
  loadTexture(texture, priority) {
    this.stage.txMemManager.removeFromOrphanedTextures(texture);
    if (texture.type === TextureType.subTexture) {
      return;
    }
    if (texture.ctxTexture !== void 0 && texture.ctxTexture.state === "loaded") {
      texture.setState("loaded");
      return;
    }
    if (this.downloadTextureSourceQueue.includes(texture) === true || this.uploadTextureQueue.includes(texture) === true) {
      return;
    }
    if (texture.ctxTexture !== void 0 && texture.ctxTexture.state === "loading") {
      if (texture.textureData !== null) {
        this.enqueueUploadTexture(texture);
      }
      texture.free();
    }
    if (this.initialized === false) {
      this.priorityQueue.push(texture);
      return;
    }
    if ((texture.type === TextureType.color || texture.type === TextureType.renderToTexture) && texture.state !== "initial") {
      texture.setState("fetched");
      this.enqueueUploadTexture(texture);
      return;
    }
    texture.setState("loading");
    if (priority === true) {
      texture.getTextureData().then(() => {
        this.uploadTexture(texture);
      }).catch((err) => {
        console.error(err);
      });
    }
    this.enqueueDownloadTextureSource(texture);
  }
  /**
   * Upload a texture to the GPU
   *
   * @param texture Texture to upload
   */
  uploadTexture(texture) {
    if (this.stage.txMemManager.doNotExceedCriticalThreshold === true && this.stage.txMemManager.criticalCleanupRequested === true) {
      this.enqueueUploadTexture(texture);
      return;
    }
    const coreContext = texture.loadCtxTexture();
    if (coreContext !== null && coreContext.state === "loaded") {
      texture.setState("loaded");
      return;
    }
    coreContext.load();
  }
  /**
   * Check if a texture is being processed
   */
  isProcessingTexture(texture) {
    return this.downloadTextureSourceQueue.includes(texture) === true || this.uploadTextureQueue.includes(texture) === true;
  }
  /**
   * Process a limited number of downloads and uploads.
   *
   * @param maxItems - The maximum number of items to process
   */
  processSome(maxProcessingTime) {
    if (this.initialized === false) {
      return;
    }
    const startTime = getTimeStamp();
    while (this.priorityQueue.length > 0 && getTimeStamp() - startTime < maxProcessingTime) {
      const texture = this.priorityQueue.pop();
      texture.getTextureData().then(() => {
        this.uploadTexture(texture);
      });
    }
    while (this.uploadTextureQueue.length > 0 && getTimeStamp() - startTime < maxProcessingTime) {
      this.uploadTexture(this.uploadTextureQueue.pop());
    }
    while (this.downloadTextureSourceQueue.length > 0 && getTimeStamp() - startTime < maxProcessingTime) {
      const texture = this.downloadTextureSourceQueue.shift();
      texture.getTextureData().then(() => {
        if (texture.state === "fetched") {
          this.enqueueUploadTexture(texture);
        }
      });
    }
  }
  hasUpdates() {
    return this.downloadTextureSourceQueue.length > 0 || this.uploadTextureQueue.length > 0;
  }
  /**
   * Initialize a texture to the cache
   *
   * @param texture Texture to cache
   * @param cacheKey Cache key for the texture
   */
  initTextureToCache(texture, cacheKey) {
    const { keyCache, inverseKeyCache } = this;
    keyCache.set(cacheKey, texture);
    inverseKeyCache.set(texture, cacheKey);
  }
  /**
   * Get a texture from the cache
   *
   * @param cacheKey
   */
  getTextureFromCache(cacheKey) {
    return this.keyCache.get(cacheKey);
  }
  /**
   * Remove a texture from the cache
   *
   * @remarks
   * Called by Texture Cleanup when a texture is freed.
   *
   * @param texture
   */
  removeTextureFromCache(texture) {
    const { inverseKeyCache, keyCache } = this;
    const cacheKey = inverseKeyCache.get(texture);
    if (cacheKey) {
      keyCache.delete(cacheKey);
    }
  }
  /**
   * Remove texture from the queue's
   *
   * @param texture - The texture to remove
   */
  removeTextureFromQueue(texture) {
    const downloadIndex = this.downloadTextureSourceQueue.indexOf(texture);
    if (downloadIndex !== -1) {
      this.downloadTextureSourceQueue.splice(downloadIndex, 1);
    }
    const uploadIndex = this.uploadTextureQueue.indexOf(texture);
    if (uploadIndex !== -1) {
      this.uploadTextureQueue.splice(uploadIndex, 1);
    }
  }
  /**
   * Resolve a parent texture from the cache or fallback to the provided texture.
   *
   * @param texture - The provided texture to resolve.
   * @returns The cached or provided texture.
   */
  resolveParentTexture(texture) {
    if (!(texture == null ? void 0 : texture.props)) {
      return texture;
    }
    const cacheKey = ImageTexture.makeCacheKey(texture.props);
    const cachedTexture = cacheKey ? this.getTextureFromCache(cacheKey) : void 0;
    return cachedTexture != null ? cachedTexture : texture;
  }
}
const weightConversions = {
  normal: 400,
  bold: 700,
  bolder: 900,
  lighter: 100
};
const fontWeightToNumber = (weight) => {
  if (typeof weight === "number") {
    return weight;
  }
  return weightConversions[weight] || 400;
};
function resolveFontToUse(familyMapsByPriority, family, weightIn, style, stretch) {
  let weight = fontWeightToNumber(weightIn);
  for (const fontFamiles of familyMapsByPriority) {
    const fontFaces = fontFamiles[family];
    if (!fontFaces) {
      continue;
    }
    if (fontFaces.size === 1) {
      console.warn("TrFontManager: Only one font face found for family: '".concat(family, "' - will be used for all weights and styles"));
      return fontFaces.values().next().value;
    }
    const weightMap = /* @__PURE__ */ new Map();
    for (const fontFace of fontFaces) {
      const fontFamilyWeight = fontWeightToNumber(fontFace.descriptors.weight);
      if (fontFamilyWeight === weight && fontFace.descriptors.style === style && fontFace.descriptors.stretch === stretch) {
        return fontFace;
      }
      weightMap.set(fontFamilyWeight, fontFace);
    }
    const msg = "TrFontManager: No exact match: '".concat(family, " Weight: ").concat(weight, " Style: ").concat(style, " Stretch: ").concat(stretch, "'");
    console.error(msg);
    if (weight === 400 && weightMap.has(500)) {
      return weightMap.get(500);
    }
    if (weight === 500 && weightMap.has(400)) {
      return weightMap.get(400);
    }
    if (weight < 400) {
      while (weight > 0) {
        if (weightMap.has(weight)) {
          return weightMap.get(weight);
        }
        weight -= 100;
      }
      weight = 600;
    }
    while (weight < 1e3) {
      if (weightMap.has(weight)) {
        return weightMap.get(weight);
      }
      weight += 100;
    }
    weight = 500;
    while (weight > 0) {
      if (weightMap.has(weight)) {
        return weightMap.get(weight);
      }
      weight -= 100;
    }
  }
  return;
}
class TrFontManager {
  constructor(textRenderers) {
    __publicField(this, "textRenderers");
    __publicField(this, "fontCache", /* @__PURE__ */ new Map());
    this.textRenderers = textRenderers;
  }
  addFontFace(font) {
    for (const trId in this.textRenderers) {
      const tr = this.textRenderers[trId];
      if (tr && tr.isFontFaceSupported(font)) {
        tr.addFontFace(font);
      }
    }
  }
  /**
   * Utility method to resolve a single font face from a list of prioritized family maps based on
   * a set of font properties.
   *
   * @remarks
   * These are to be used by a text renderer to resolve a font face if needed.
   *
   * @param familyMapsByPriority
   * @param props
   * @returns
   */
  resolveFontFace(familyMapsByPriority, props, rendererType) {
    const { fontFamily, fontWeight, fontStyle, fontStretch } = props;
    const fontCacheString = "".concat(rendererType, "_").concat(fontFamily, "_").concat(fontStyle, "_").concat(fontWeight, "_").concat(fontStretch);
    if (this.fontCache.has(fontCacheString) === true) {
      return this.fontCache.get(fontCacheString);
    }
    const resolvedFont = resolveFontToUse(familyMapsByPriority, fontFamily, fontWeight, fontStyle, fontStretch);
    if (resolvedFont !== void 0) {
      this.fontCache.set(fontCacheString, resolvedFont);
    }
    return resolvedFont;
  }
}
class CoreShader {
  // abstract draw(): void;
  static makeCacheKey(props) {
    return false;
  }
  static resolveDefaults(props) {
    return {};
  }
}
function createShader(glw, type, source) {
  const shader = glw.createShader(type);
  if (!shader) {
    const glError = glw.getError();
    throw new Error("Unable to create the shader: ".concat(type === glw.VERTEX_SHADER ? "VERTEX_SHADER" : "FRAGMENT_SHADER", ".").concat(glError ? " WebGlContext Error: ".concat(glError) : ""));
  }
  glw.shaderSource(shader, source);
  glw.compileShader(shader);
  const success = !!glw.getShaderParameter(shader, glw.COMPILE_STATUS);
  if (success) {
    return shader;
  }
  console.error(glw.getShaderInfoLog(shader));
  glw.deleteShader(shader);
}
function createProgram(glw, vertexShader, fragmentShader) {
  const program = glw.createProgram();
  if (!program) {
    throw new Error("Unable to create program");
  }
  glw.attachShader(program, vertexShader);
  glw.attachShader(program, fragmentShader);
  glw.linkProgram(program);
  const success = !!glw.getProgramParameter(program, glw.LINK_STATUS);
  if (success) {
    return program;
  }
  console.warn(glw.getProgramInfoLog(program));
  glw.deleteProgram(program);
  return void 0;
}
class WebGlCoreShader extends CoreShader {
  constructor(options) {
    super();
    __publicField(this, "boundBufferCollection", null);
    __publicField(this, "buffersBound", false);
    __publicField(this, "program");
    /**
     * Vertex Array Object
     *
     * @remarks
     * Used by WebGL2 Only
     */
    __publicField(this, "vao");
    __publicField(this, "renderer");
    __publicField(this, "glw");
    __publicField(this, "attributeBuffers");
    __publicField(this, "attributeLocations");
    __publicField(this, "attributeNames");
    __publicField(this, "uniformLocations");
    __publicField(this, "uniformTypes");
    __publicField(this, "supportsIndexedTextures");
    const renderer2 = this.renderer = options.renderer;
    const glw = this.glw = this.renderer.glw;
    this.supportsIndexedTextures = options.supportsIndexedTextures || false;
    const webGl2 = glw.isWebGl2();
    const requiredExtensions = webGl2 && options.webgl2Extensions || !webGl2 && options.webgl1Extensions || [];
    const glVersion = webGl2 ? "2.0" : "1.0";
    requiredExtensions.forEach((extensionName) => {
      if (!glw.getExtension(extensionName)) {
        throw new Error('Shader "'.concat(this.constructor.name, '" requires extension "').concat(extensionName, '" for WebGL ').concat(glVersion, " but wasn't found"));
      }
    });
    const shaderSources = options.shaderSources || this.constructor.shaderSources;
    if (!shaderSources) {
      throw new Error('Shader "'.concat(this.constructor.name, '" is missing shaderSources.'));
    } else if (webGl2 && (shaderSources == null ? void 0 : shaderSources.webGl2)) {
      shaderSources.fragment = shaderSources.webGl2.fragment;
      shaderSources.vertex = shaderSources.webGl2.vertex;
      delete shaderSources.webGl2;
    }
    const textureUnits = renderer2.system.parameters.MAX_VERTEX_TEXTURE_IMAGE_UNITS;
    const vertexSource = shaderSources.vertex instanceof Function ? shaderSources.vertex(textureUnits) : shaderSources.vertex;
    const fragmentSource = shaderSources.fragment instanceof Function ? shaderSources.fragment(textureUnits) : shaderSources.fragment;
    const vertexShader = createShader(glw, glw.VERTEX_SHADER, vertexSource);
    const fragmentShader = createShader(glw, glw.FRAGMENT_SHADER, fragmentSource);
    if (!vertexShader || !fragmentShader) {
      throw new Error("Unable to create the following shader(s): ".concat([
        !vertexShader && "VERTEX_SHADER",
        !fragmentShader && "FRAGMENT_SHADER"
      ].filter(Boolean).join(" and ")));
    }
    const program = createProgram(glw, vertexShader, fragmentShader);
    if (!program) {
      throw new Error("Unable to create program");
    }
    this.program = program;
    this.attributeLocations = {};
    this.attributeBuffers = {};
    this.attributeNames = [];
    [...options.attributes].forEach((attributeName) => {
      const location = glw.getAttribLocation(this.program, attributeName);
      if (location < 0) {
        throw new Error("".concat(this.constructor.name, ': Vertex shader must have an attribute "').concat(attributeName, '"!'));
      }
      const buffer = glw.createBuffer();
      if (!buffer) {
        throw new Error("".concat(this.constructor.name, ': Could not create buffer for attribute "').concat(attributeName, '"'));
      }
      this.attributeLocations[attributeName] = location;
      this.attributeBuffers[attributeName] = buffer;
      this.attributeNames.push(attributeName);
    });
    this.uniformLocations = {};
    this.uniformTypes = {};
    options.uniforms.forEach((uniform) => {
      const location = glw.getUniformLocation(this.program, uniform.name);
      this.uniformTypes[uniform.name] = uniform.uniform;
      if (!location) {
        console.warn('Shader "'.concat(this.constructor.name, '" could not get uniform location for "').concat(uniform.name, '"'));
        return;
      }
      this.uniformLocations[uniform.name] = location;
    });
  }
  bindBufferAttribute(location, buffer, attribute) {
    const { glw } = this;
    glw.enableVertexAttribArray(location);
    glw.vertexAttribPointer(buffer, location, attribute.size, attribute.type, attribute.normalized, attribute.stride, attribute.offset);
  }
  disableAttribute(location) {
    this.glw.disableVertexAttribArray(location);
  }
  disableAttributes() {
    for (const loc in this.attributeLocations) {
      this.disableAttribute(this.attributeLocations[loc]);
    }
    this.boundBufferCollection = null;
  }
  /**
   * Given two sets of Shader props destined for this Shader, determine if they can be batched together
   * to reduce the number of draw calls.
   *
   * @remarks
   * This is used by the {@link WebGlCoreRenderer} to determine if it can batch multiple consecutive draw
   * calls into a single draw call.
   *
   * By default, this returns false (meaning no batching is allowed), but can be
   * overridden by child classes to provide more efficient batching.
   *
   * @param propsA
   * @param propsB
   * @returns
   */
  canBatchShaderProps(propsA, propsB) {
    return false;
  }
  bindRenderOp(renderOp, props) {
    this.bindBufferCollection(renderOp.buffers);
    if (renderOp.textures.length > 0) {
      this.bindTextures(renderOp.textures);
    }
    const { glw, parentHasRenderTexture, renderToTexture } = renderOp;
    if (renderToTexture && parentHasRenderTexture) {
      return;
    }
    if (parentHasRenderTexture) {
      const { width, height } = renderOp.framebufferDimensions || {};
      glw.uniform1f(this.getUniformLocation("u_pixelRatio"), 1);
      glw.uniform2f(this.getUniformLocation("u_resolution"), width != null ? width : 0, height != null ? height : 0);
    } else {
      glw.uniform1f(this.getUniformLocation("u_pixelRatio"), renderOp.options.pixelRatio);
      glw.uniform2f(this.getUniformLocation("u_resolution"), glw.canvas.width, glw.canvas.height);
    }
    if (props) {
      if (hasOwn(props, "$dimensions")) {
        let dimensions = props.$dimensions;
        if (!dimensions) {
          dimensions = renderOp.dimensions;
        }
        glw.uniform2f(this.getUniformLocation("u_dimensions"), dimensions.width, dimensions.height);
      }
      if (hasOwn(props, "$alpha")) {
        let alpha = props.$alpha;
        if (!alpha) {
          alpha = renderOp.alpha;
        }
        glw.uniform1f(this.getUniformLocation("u_alpha"), alpha);
      }
      this.bindProps(props);
    }
  }
  getUniformLocation(name) {
    return this.uniformLocations[name] || null;
  }
  bindBufferCollection(buffer) {
    if (this.boundBufferCollection === buffer) {
      return;
    }
    for (const attributeName in this.attributeLocations) {
      const resolvedBuffer = buffer.getBuffer(attributeName);
      const resolvedInfo = buffer.getAttributeInfo(attributeName);
      this.bindBufferAttribute(this.attributeLocations[attributeName], resolvedBuffer, resolvedInfo);
    }
    this.boundBufferCollection = buffer;
  }
  bindProps(props) {
  }
  bindTextures(textures) {
  }
  attach() {
    this.glw.useProgram(this.program);
    if (this.glw.isWebGl2() && this.vao) {
      this.glw.bindVertexArray(this.vao);
    }
  }
  detach() {
    this.disableAttributes();
  }
}
__publicField(WebGlCoreShader, "shaderSources");
class DefaultShader extends WebGlCoreShader {
  constructor(renderer2) {
    super({
      renderer: renderer2,
      attributes: ["a_position", "a_textureCoordinate", "a_color"],
      uniforms: [
        { name: "u_resolution", uniform: "uniform2fv" },
        { name: "u_pixelRatio", uniform: "uniform1f" },
        { name: "u_texture", uniform: "uniform2fv" }
      ]
    });
  }
  bindTextures(textures) {
    const { glw } = this;
    glw.activeTexture(0);
    glw.bindTexture(textures[0].ctxTexture);
  }
}
__publicField(DefaultShader, "shaderSources", {
  vertex: "\n      # ifdef GL_FRAGMENT_PRECISION_HIGH\n      precision highp float;\n      # else\n      precision mediump float;\n      # endif\n\n      attribute vec2 a_position;\n      attribute vec2 a_textureCoordinate;\n      attribute vec4 a_color;\n\n      uniform vec2 u_resolution;\n      uniform float u_pixelRatio;\n\n\n      varying vec4 v_color;\n      varying vec2 v_textureCoordinate;\n\n      void main() {\n        vec2 normalized = a_position * u_pixelRatio;\n        vec2 screenSpace = vec2(2.0 / u_resolution.x, -2.0 / u_resolution.y);\n\n        v_color = a_color;\n        v_textureCoordinate = a_textureCoordinate;\n\n        gl_Position = vec4(normalized.x * screenSpace.x - 1.0, normalized.y * -abs(screenSpace.y) + 1.0, 0.0, 1.0);\n        gl_Position.y = -sign(screenSpace.y) * gl_Position.y;\n      }\n    ",
  fragment: "\n      # ifdef GL_FRAGMENT_PRECISION_HIGH\n      precision highp float;\n      # else\n      precision mediump float;\n      # endif\n\n      uniform vec2 u_resolution;\n      uniform sampler2D u_texture;\n\n      varying vec4 v_color;\n      varying vec2 v_textureCoordinate;\n\n      void main() {\n          vec4 color = texture2D(u_texture, v_textureCoordinate);\n          gl_FragColor = vec4(v_color) * texture2D(u_texture, v_textureCoordinate);\n      }\n    "
});
class DefaultShaderBatched extends WebGlCoreShader {
  constructor(renderer2) {
    super({
      renderer: renderer2,
      attributes: [
        "a_position",
        "a_textureCoordinate",
        "a_color",
        "a_textureIndex"
      ],
      uniforms: [
        { name: "u_resolution", uniform: "uniform2fv" },
        { name: "u_pixelRatio", uniform: "uniform1f" },
        { name: "u_textures[0]", uniform: "uniform1iv" }
      ]
    });
    __publicField(this, "supportsIndexedTextures", true);
  }
  bindTextures(texture) {
    const { renderer: renderer2, glw } = this;
    if (texture.length > renderer2.system.parameters.MAX_VERTEX_TEXTURE_IMAGE_UNITS) {
      throw new Error("DefaultShaderBatched: Cannot bind more than ".concat(renderer2.system.parameters.MAX_VERTEX_TEXTURE_IMAGE_UNITS, " textures"));
    }
    texture.forEach((t, i) => {
      glw.activeTexture(i);
      glw.bindTexture(t.ctxTexture);
    });
    const samplers = Array.from(Array(texture.length).keys());
    this.glw.uniform1iv(this.getUniformLocation("u_textures[0]"), samplers);
  }
}
__publicField(DefaultShaderBatched, "shaderSources", {
  vertex: "\n      # ifdef GL_FRAGMENT_PRECISION_HIGH\n      precision highp float;\n      # else\n      precision mediump float;\n      # endif\n\n      attribute vec2 a_textureCoordinate;\n      attribute vec2 a_position;\n      attribute vec4 a_color;\n      attribute float a_textureIndex;\n      attribute float a_depth;\n\n      uniform vec2 u_resolution;\n      uniform float u_pixelRatio;\n\n      varying vec4 v_color;\n      varying vec2 v_textureCoordinate;\n      varying float v_textureIndex;\n\n      void main(){\n        vec2 normalized = a_position * u_pixelRatio / u_resolution;\n        vec2 zero_two = normalized * 2.0;\n        vec2 clip_space = zero_two - 1.0;\n\n        // pass to fragment\n        v_color = a_color;\n        v_textureCoordinate = a_textureCoordinate;\n        v_textureIndex = a_textureIndex;\n\n        // flip y\n        gl_Position = vec4(clip_space * vec2(1.0, -1.0), 0, 1);\n      }\n    ",
  fragment: (textureUnits) => "\n      #define txUnits ".concat(textureUnits, "\n      # ifdef GL_FRAGMENT_PRECISION_HIGH\n      precision highp float;\n      # else\n      precision mediump float;\n      # endif\n\n      uniform vec2 u_resolution;\n      uniform sampler2D u_image;\n      uniform sampler2D u_textures[txUnits];\n\n      varying vec4 v_color;\n      varying vec2 v_textureCoordinate;\n      varying float v_textureIndex;\n\n      vec4 sampleFromTexture(sampler2D textures[").concat(textureUnits, "], int idx, vec2 uv) {\n        ").concat(Array.from(Array(textureUnits).keys()).map((idx) => "\n          ".concat(idx !== 0 ? "else " : "", "if (idx == ").concat(idx, ") {\n            return texture2D(textures[").concat(idx, "], uv);\n          }\n        ")).join(""), "\n        return texture2D(textures[0], uv);\n      }\n\n      void main(){\n        gl_FragColor = vec4(v_color) * sampleFromTexture(u_textures, int(v_textureIndex), v_textureCoordinate);\n      }\n    ")
});
class ShaderEffect {
  constructor(options) {
    __publicField(this, "priority", 1);
    __publicField(this, "name", "");
    __publicField(this, "ref");
    __publicField(this, "target");
    __publicField(this, "passParameters", "");
    __publicField(this, "declaredUniforms", "");
    __publicField(this, "uniformInfo", {});
    const { ref, target, props = {} } = options;
    this.ref = ref;
    this.target = target;
    const uniformInfo = {};
    const passParameters = [];
    let declaredUniforms = "";
    const uniforms = this.constructor.uniforms || {};
    for (const u in uniforms) {
      const unif = uniforms[u];
      const uniType = unif.type;
      const uniformName = "".concat(ref, "_").concat(u);
      let define = "";
      if (unif.size) {
        define = "[".concat(unif.size(props), "]");
      }
      passParameters.push(uniformName);
      declaredUniforms += "uniform ".concat(uniType, " ").concat(uniformName).concat(define, ";");
      uniformInfo[u] = { name: uniformName, uniform: uniforms[u].method };
    }
    this.passParameters = passParameters.join(",");
    this.declaredUniforms = declaredUniforms;
    this.uniformInfo = uniformInfo;
  }
  static getEffectKey(props) {
    return "";
  }
  static getMethodParameters(uniforms, props) {
    const res = [];
    for (const u in uniforms) {
      const uni = uniforms[u];
      let define = "";
      if (uni.size) {
        define = "[".concat(uni.size(props), "]");
      }
      res.push("".concat(uni.type, " ").concat(u).concat(define));
    }
    return res.join(",");
  }
  static resolveDefaults(props) {
    return {};
  }
  static makeEffectKey(props) {
    return false;
  }
}
__publicField(ShaderEffect, "uniforms", {});
__publicField(ShaderEffect, "methods");
__publicField(ShaderEffect, "onShaderMask");
__publicField(ShaderEffect, "onColorize");
__publicField(ShaderEffect, "onEffectMask");
const effectCache = /* @__PURE__ */ new Map();
const getResolvedEffect = (effects, effectContructors) => {
  const key2 = JSON.stringify(effects);
  if (effectCache.has(key2)) {
    return effectCache.get(key2);
  }
  effects = effects != null ? effects : [];
  const resolvedEffects = [];
  const effectsLength = effects.length;
  let i = 0;
  for (; i < effectsLength; i++) {
    const { name, type, props } = effects[i];
    const resolvedEffect = {
      name,
      type,
      props: {}
    };
    const effectConstructor = effectContructors[type];
    const defaultPropValues = effectConstructor.resolveDefaults(props);
    const uniforms = effectConstructor.uniforms;
    const uniformKeys = Object.keys(uniforms);
    const uniformsLength = uniformKeys.length;
    let j = 0;
    for (; j < uniformsLength; j++) {
      const key3 = uniformKeys[j];
      const uniform = uniforms[key3];
      const result = {
        value: defaultPropValues[key3],
        programValue: void 0,
        method: uniform.method,
        updateOnBind: uniform.updateOnBind || false,
        hasValidator: uniform.validator !== void 0,
        hasProgramValueUpdater: uniform.updateProgramValue !== void 0
      };
      const validatedValue = result.hasValidator && uniform.validator(defaultPropValues[key3], defaultPropValues) || defaultPropValues[key3];
      if (defaultPropValues[key3] !== validatedValue) {
        result.validatedValue = validatedValue;
      }
      if (result.hasProgramValueUpdater) {
        uniform.updateProgramValue(result);
      }
      if (result.programValue === void 0) {
        result.programValue = result.value;
      }
      resolvedEffect.props[key3] = result;
    }
    resolvedEffects.push(resolvedEffect);
  }
  effectCache.set(key2, resolvedEffects);
  return resolvedEffects;
};
const _DynamicShader = class _DynamicShader extends WebGlCoreShader {
  constructor(renderer2, props, effectContructors) {
    const shader = _DynamicShader.createShader(props, effectContructors);
    super({
      renderer: renderer2,
      attributes: ["a_position", "a_textureCoordinate", "a_color"],
      uniforms: [
        { name: "u_resolution", uniform: "uniform2fv" },
        { name: "u_pixelRatio", uniform: "uniform1f" },
        { name: "u_texture", uniform: "uniform2fv" },
        { name: "u_dimensions", uniform: "uniform2fv" },
        { name: "u_alpha", uniform: "uniform1f" },
        ...shader.uniforms
      ],
      shaderSources: {
        vertex: shader.vertex,
        fragment: shader.fragment
      }
    });
    __publicField(this, "effects", []);
    this.effects = shader.effects;
  }
  bindTextures(textures) {
    const { glw } = this;
    glw.activeTexture(0);
    glw.bindTexture(textures[0].ctxTexture);
  }
  bindUniformMethods(props) {
    const glw = this.glw;
    const effects = props.effects;
    const effectsL = effects.length;
    for (let i = 0; i < effectsL; i++) {
      const uniformInfo = this.effects[i].uniformInfo;
      const effect2 = effects[i];
      const propKeys = Object.keys(effect2.props);
      const propsLength = propKeys.length;
      for (let j = 0; j < propsLength; j++) {
        const key2 = propKeys[j];
        const method = effect2.props[key2].method;
        const location = this.getUniformLocation(uniformInfo[key2].name);
        if (method === "uniform2fv" || method === "uniform2iv" || //uniform === 'uniform3fv	' || <--- check why this isnt recognized
        method === "uniform3iv" || method === "uniform4fv" || method === "uniform4iv" || method === "uniformMatrix2fv" || method === "uniformMatrix3fv" || method === "uniformMatrix4fv" || method === "uniform1f" || method === "uniform1fv" || method === "uniform1i" || method === "uniform1iv") {
          effect2.props[key2].setUniformValue = function() {
            glw[method](location, this.programValue);
          };
          continue;
        }
        if (method === "uniform2f" || method === "uniform2i") {
          effect2.props[key2].setUniformValue = function() {
            glw[method](location, this.programValue[0], this.programValue[1]);
          };
          continue;
        }
        if (method === "uniform3f" || method === "uniform3i") {
          effect2.props[key2].setUniformValue = function() {
            glw[method](location, this.programValue[0], this.programValue[1], this.programValue[2]);
          };
          continue;
        }
        if (method === "uniform4f" || method === "uniform4i") {
          effect2.props[key2].setUniformValue = function() {
            glw[method](location, this.programValue[0], this.programValue[1], this.programValue[2], this.programValue[3]);
          };
          continue;
        }
      }
    }
  }
  bindProps(props) {
    var _a2;
    const effects = props.effects;
    const effectsL = effects.length;
    let i = 0;
    for (; i < effectsL; i++) {
      const effect2 = effects[i];
      const propKeys = Object.keys(effect2.props);
      const propsLength = propKeys.length;
      let j = 0;
      for (; j < propsLength; j++) {
        const key2 = propKeys[j];
        const prop = effect2.props[key2];
        if (prop.updateOnBind === true) {
          const uniform = (_a2 = this.renderer.shManager.getRegisteredEffects()[effect2.type]) == null ? void 0 : _a2.uniforms[key2];
          uniform == null ? void 0 : uniform.updateProgramValue(effect2.props[key2], props);
        }
        prop.setUniformValue();
      }
    }
  }
  canBatchShaderProps(propsA, propsB) {
    if (propsA.$alpha !== propsB.$alpha || propsA.$dimensions.width !== propsB.$dimensions.width || propsA.$dimensions.height !== propsB.$dimensions.height || propsA.effects.length !== propsB.effects.length) {
      return false;
    }
    const propsEffectsLen = propsA.effects.length;
    let i = 0;
    for (; i < propsEffectsLen; i++) {
      const effectA = propsA.effects[i];
      const effectB = propsB.effects[i];
      if (effectA.type !== effectB.type) {
        return false;
      }
      for (const key2 in effectA.props) {
        if (effectB.props && !effectB.props[key2] || effectA.props[key2].value !== effectB.props[key2].value) {
          return false;
        }
      }
    }
    return true;
  }
  static createShader(props, effectContructors) {
    const effectNameCount = {};
    const methods = {};
    let declareUniforms = "";
    const uniforms = [];
    const uFx = [];
    const effects = props.effects.map((effect2) => {
      const baseClass = effectContructors[effect2.type];
      const key2 = baseClass.getEffectKey(effect2.props || {});
      effectNameCount[key2] = effectNameCount[key2] ? ++effectNameCount[key2] : 1;
      const nr = effectNameCount[key2];
      if (nr === 1) {
        uFx.push({ key: key2, type: effect2.type, props: effect2.props });
      }
      const fxClass = new baseClass({
        ref: "".concat(key2).concat(nr === 1 ? "" : nr),
        target: key2,
        props: effect2.props
      });
      declareUniforms += fxClass.declaredUniforms;
      uniforms.push(...Object.values(fxClass.uniformInfo));
      return fxClass;
    });
    let effectMethods = "";
    uFx == null ? void 0 : uFx.forEach((fx) => {
      var _a2;
      const fxClass = effectContructors[fx.type];
      const fxProps = fxClass.resolveDefaults((_a2 = fx.props) != null ? _a2 : {});
      const remap = [];
      for (const m in fxClass.methods) {
        let cm = m;
        const fxMethod = fxClass.methods[m];
        if (methods[m] && methods[m] !== fxMethod) {
          cm = _DynamicShader.resolveMethodDuplicate(m, fxMethod, methods);
        }
        methods[cm] = fxMethod.replace("function", cm);
        remap.push({ m, cm });
      }
      let onShaderMask = fxClass.onShaderMask instanceof Function ? fxClass.onShaderMask(fxProps) : fxClass.onShaderMask;
      let onColorize = fxClass.onColorize instanceof Function ? fxClass.onColorize(fxProps) : fxClass.onColorize;
      let onEffectMask = fxClass.onEffectMask instanceof Function ? fxClass.onEffectMask(fxProps) : fxClass.onEffectMask;
      remap.forEach((r) => {
        const { m, cm } = r;
        const reg = new RegExp("\\$".concat(m), "g");
        if (onShaderMask) {
          onShaderMask = onShaderMask.replace(reg, cm);
        }
        if (onColorize) {
          onColorize = onColorize.replace(reg, cm);
        }
        if (onEffectMask) {
          onEffectMask = onEffectMask.replace(reg, cm);
        }
      });
      const methodParameters = fxClass.getMethodParameters(fxClass.uniforms, fxProps);
      const pm = methodParameters.length > 0 ? ", ".concat(methodParameters) : "";
      if (onShaderMask) {
        effectMethods += "\n        float fx_".concat(fx.key, "_onShaderMask(float shaderMask ").concat(pm, ") {\n          ").concat(onShaderMask, "\n        }\n        ");
      }
      if (onColorize) {
        effectMethods += "\n          vec4 fx_".concat(fx.key, "_onColorize(float shaderMask, vec4 maskColor, vec4 shaderColor").concat(pm, ") {\n            ").concat(onColorize, "\n          }\n        ");
      }
      if (onEffectMask) {
        effectMethods += "\n          vec4 fx_".concat(fx.key, "_onEffectMask(float shaderMask, vec4 maskColor, vec4 shaderColor").concat(pm, ") {\n            ").concat(onEffectMask, "\n          }\n        ");
      }
    });
    let sharedMethods = "";
    for (const m in methods) {
      sharedMethods += methods[m];
    }
    let currentMask = "mix(shaderColor, maskColor, clamp(-(lng_DefaultMask), 0.0, 1.0))";
    let drawEffects = "\n\n    ";
    for (let i = 0; i < effects.length; i++) {
      const current = effects[i];
      const pm = current.passParameters.length > 0 ? ", ".concat(current.passParameters) : "";
      const currentClass = effectContructors[current.name];
      if (currentClass.onShaderMask) {
        drawEffects += "\n        shaderMask = fx_".concat(current.target, "_onShaderMask(shaderMask ").concat(pm, ");\n        ");
      }
      if (currentClass.onColorize) {
        drawEffects += "\n        maskColor = fx_".concat(current.target, "_onColorize(shaderMask, maskColor, shaderColor").concat(pm, ");\n        ");
      }
      if (currentClass.onEffectMask) {
        currentMask = "fx_".concat(current.target, "_onEffectMask(shaderMask, maskColor, shaderColor").concat(pm, ")");
      }
      const next = effects[i + 1];
      if (next === void 0 || effectContructors[next.name].onEffectMask) {
        drawEffects += "\n          shaderColor = ".concat(currentMask, ";\n        ");
      }
    }
    return {
      effects,
      uniforms,
      fragment: _DynamicShader.fragment(declareUniforms, sharedMethods, effectMethods, drawEffects),
      vertex: _DynamicShader.vertex()
    };
  }
  static resolveMethodDuplicate(key2, effectMethod, methodCollection, increment = 0) {
    const m = key2 + (increment > 0 ? increment : "");
    if (methodCollection[m] && methodCollection[m] !== effectMethod) {
      return this.resolveMethodDuplicate(key2, effectMethod, methodCollection, ++increment);
    }
    return m;
  }
  static resolveDefaults(props, effectContructors) {
    var _a2;
    return {
      effects: getResolvedEffect((_a2 = props.effects) != null ? _a2 : [], effectContructors),
      $dimensions: {
        width: 0,
        height: 0
      },
      $alpha: 0
    };
  }
  static makeCacheKey(props, effectContructors) {
    var _a2;
    let fx = "";
    (_a2 = props.effects) == null ? void 0 : _a2.forEach((effect2) => {
      const baseClass = effectContructors[effect2.type];
      const key2 = baseClass.getEffectKey(effect2.props || {});
      fx += ",".concat(key2);
    });
    return "DynamicShader".concat(fx);
  }
};
__publicField(_DynamicShader, "z$__type__Props");
__publicField(_DynamicShader, "vertex", () => "\n    # ifdef GL_FRAGMENT_PRECISION_HIGH\n    precision highp float;\n    # else\n    precision mediump float;\n    # endif\n\n    attribute vec2 a_textureCoordinate;\n    attribute vec2 a_position;\n    attribute vec4 a_color;\n    attribute float a_textureIndex;\n\n    uniform vec2 u_resolution;\n    uniform float u_pixelRatio;\n\n    varying vec4 v_color;\n    varying vec2 v_textureCoordinate;\n    varying float v_textureIndex;\n\n    void main(){\n      vec2 normalized = a_position * u_pixelRatio / u_resolution;\n      vec2 zero_two = normalized * 2.0;\n      vec2 clip_space = zero_two - 1.0;\n\n      // pass to fragment\n      v_color = a_color;\n      v_textureCoordinate = a_textureCoordinate;\n      v_textureIndex = a_textureIndex;\n\n      // flip y\n      gl_Position = vec4(clip_space * vec2(1.0, -1.0), 0, 1);\n    }\n  ");
__publicField(_DynamicShader, "fragment", (uniforms, methods, effectMethods, drawEffects) => "\n    # ifdef GL_FRAGMENT_PRECISION_HIGH\n    precision highp float;\n    # else\n    precision mediump float;\n    # endif\n\n    #define PI 3.14159265359\n\n    uniform vec2 u_resolution;\n    uniform vec2 u_dimensions;\n    uniform float u_alpha;\n    uniform float u_radius;\n    uniform sampler2D u_texture;\n    uniform float u_pixelRatio;\n\n    ".concat(uniforms, "\n\n    varying vec4 v_color;\n    varying vec2 v_textureCoordinate;\n\n    ").concat(methods, "\n\n    ").concat(effectMethods, "\n\n    void main() {\n      vec2 p = v_textureCoordinate.xy * u_dimensions - u_dimensions * 0.5;\n      vec2 d = abs(p) - (u_dimensions) * 0.5;\n      float lng_DefaultMask = min(max(d.x, d.y), 0.0) + length(max(d, 0.0));\n\n      vec4 shaderColor = vec4(0.0);\n      float shaderMask = lng_DefaultMask;\n\n      vec4 maskColor = texture2D(u_texture, v_textureCoordinate) * v_color;\n\n      shaderColor = mix(shaderColor, maskColor, clamp(-(lng_DefaultMask + 0.5), 0.0, 1.0));\n\n      ").concat(drawEffects, "\n\n      gl_FragColor = shaderColor * u_alpha;\n    }\n  "));
let DynamicShader = _DynamicShader;
class RoundedRectangle extends WebGlCoreShader {
  constructor(renderer2) {
    super({
      renderer: renderer2,
      attributes: ["a_position", "a_textureCoordinate", "a_color"],
      uniforms: [
        { name: "u_resolution", uniform: "uniform2fv" },
        { name: "u_pixelRatio", uniform: "uniform1f" },
        { name: "u_texture", uniform: "uniform2f" },
        { name: "u_dimensions", uniform: "uniform2fv" },
        { name: "u_radius", uniform: "uniform1f" }
      ]
    });
  }
  static resolveDefaults(props) {
    return {
      radius: props.radius || 10,
      $dimensions: {
        width: 0,
        height: 0
      }
    };
  }
  bindTextures(textures) {
    const { glw } = this;
    glw.activeTexture(0);
    glw.bindTexture(textures[0].ctxTexture);
  }
  bindProps(props) {
    const radiusFactor = Math.min(props.$dimensions.width, props.$dimensions.height) / (2 * props.radius);
    this.glw.uniform1f(this.getUniformLocation("u_radius"), props.radius * Math.min(radiusFactor, 1));
  }
  canBatchShaderProps(propsA, propsB) {
    return propsA.radius === propsB.radius && propsA.$dimensions.width === propsB.$dimensions.width && propsA.$dimensions.height === propsB.$dimensions.height;
  }
}
__publicField(RoundedRectangle, "z$__type__Props");
__publicField(RoundedRectangle, "shaderSources", {
  vertex: "\n      # ifdef GL_FRAGMENT_PRECISION_HIGH\n      precision highp float;\n      # else\n      precision mediump float;\n      # endif\n\n      attribute vec2 a_position;\n      attribute vec2 a_textureCoordinate;\n      attribute vec4 a_color;\n      attribute float a_textureIndex;\n      attribute float a_depth;\n\n      uniform vec2 u_resolution;\n      uniform float u_pixelRatio;\n\n      varying vec4 v_color;\n      varying vec2 v_textureCoordinate;\n\n      void main() {\n        vec2 normalized = a_position * u_pixelRatio / u_resolution;\n        vec2 zero_two = normalized * 2.0;\n        vec2 clip_space = zero_two - 1.0;\n\n        // pass to fragment\n        v_color = a_color;\n        v_textureCoordinate = a_textureCoordinate;\n\n        // flip y\n        gl_Position = vec4(clip_space * vec2(1.0, -1.0), 0, 1);\n      }\n    ",
  fragment: "\n      # ifdef GL_FRAGMENT_PRECISION_HIGH\n      precision highp float;\n      # else\n      precision mediump float;\n      # endif\n\n      uniform vec2 u_resolution;\n      uniform vec2 u_dimensions;\n      uniform float u_radius;\n      uniform sampler2D u_texture;\n\n      varying vec4 v_color;\n      varying vec2 v_textureCoordinate;\n\n      float boxDist(vec2 p, vec2 size, float radius){\n        size -= vec2(radius);\n        vec2 d = abs(p) - size;\n        return min(max(d.x, d.y), 0.0) + length(max(d, 0.0)) - radius;\n      }\n\n      float fillMask(float dist) {\n        return clamp(-dist, 0.0, 1.0);\n      }\n\n      void main() {\n        vec4 color = texture2D(u_texture, v_textureCoordinate) * v_color;\n        vec2 halfDimensions = u_dimensions * 0.5;\n\n        float d = boxDist(v_textureCoordinate.xy * u_dimensions - halfDimensions, halfDimensions + 0.5, u_radius);\n        gl_FragColor = mix(vec4(0.0), color, fillMask(d));\n      }\n    "
});
const IDENTITY_MATRIX_3x3 = new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);
const _SdfShader = class _SdfShader extends WebGlCoreShader {
  constructor(renderer2) {
    super({
      renderer: renderer2,
      attributes: ["a_position", "a_textureCoordinate"],
      uniforms: [
        { name: "u_resolution", uniform: "uniform2fv" },
        { name: "u_transform", uniform: "uniformMatrix3fv" },
        { name: "u_scrollY", uniform: "uniform1f" },
        { name: "u_pixelRatio", uniform: "uniform1f" },
        { name: "u_texture", uniform: "uniform2f" },
        { name: "u_color", uniform: "uniform4fv" },
        { name: "u_size", uniform: "uniform1f" },
        { name: "u_distanceRange", uniform: "uniform1f" },
        { name: "u_debug", uniform: "uniform1i" }
      ]
    });
  }
  bindTextures(textures) {
    const { glw } = this;
    glw.activeTexture(0);
    glw.bindTexture(textures[0].ctxTexture);
  }
  bindProps(props) {
    const resolvedProps = _SdfShader.resolveDefaults(props);
    for (const key2 in resolvedProps) {
      if (key2 === "transform") {
        this.glw.uniformMatrix3fv(this.getUniformLocation("u_transform"), resolvedProps[key2]);
      } else if (key2 === "scrollY") {
        this.glw.uniform1f(this.getUniformLocation("u_scrollY"), resolvedProps[key2]);
      } else if (key2 === "color") {
        const components = getNormalizedRgbaComponents(resolvedProps.color);
        this.glw.uniform4fv(this.getUniformLocation("u_color"), components);
      } else if (key2 === "size") {
        this.glw.uniform1f(this.getUniformLocation("u_size"), resolvedProps[key2]);
      } else if (key2 === "distanceRange") {
        this.glw.uniform1f(this.getUniformLocation("u_distanceRange"), resolvedProps[key2]);
      } else if (key2 === "debug") {
        this.glw.uniform1i(this.getUniformLocation("u_debug"), resolvedProps[key2] ? 1 : 0);
      }
    }
  }
  static resolveDefaults(props = {}) {
    var _a2, _b, _c, _d, _e, _f;
    return {
      transform: (_a2 = props.transform) != null ? _a2 : IDENTITY_MATRIX_3x3,
      scrollY: (_b = props.scrollY) != null ? _b : 0,
      color: (_c = props.color) != null ? _c : 4294967295,
      size: (_d = props.size) != null ? _d : 16,
      distanceRange: (_e = props.distanceRange) != null ? _e : 1,
      debug: (_f = props.debug) != null ? _f : false
    };
  }
};
__publicField(_SdfShader, "z$__type__Props");
__publicField(_SdfShader, "shaderSources", {
  vertex: "\n      # ifdef GL_FRAGMENT_PRECISION_HIGH\n      precision highp float;\n      # else\n      precision mediump float;\n      # endif\n      // an attribute is an input (in) to a vertex shader.\n      // It will receive data from a buffer\n      attribute vec2 a_position;\n      attribute vec2 a_textureCoordinate;\n\n      uniform vec2 u_resolution;\n      uniform mat3 u_transform;\n      uniform float u_scrollY;\n      uniform float u_pixelRatio;\n      uniform float u_size;\n\n      varying vec2 v_texcoord;\n\n      void main() {\n        vec2 scrolledPosition = a_position * u_size - vec2(0, u_scrollY);\n        vec2 transformedPosition = (u_transform * vec3(scrolledPosition, 1)).xy;\n\n        // Calculate screen space with pixel ratio\n        vec2 screenSpace = (transformedPosition * u_pixelRatio / u_resolution * 2.0 - 1.0) * vec2(1, -1);\n\n        gl_Position = vec4(screenSpace, 0.0, 1.0);\n        v_texcoord = a_textureCoordinate;\n\n      }\n    ",
  fragment: "\n      # ifdef GL_FRAGMENT_PRECISION_HIGH\n      precision highp float;\n      # else\n      precision mediump float;\n      # endif\n      uniform vec4 u_color;\n      uniform sampler2D u_texture;\n      uniform float u_distanceRange;\n      uniform float u_pixelRatio;\n      uniform int u_debug;\n\n      varying vec2 v_texcoord;\n\n      float median(float r, float g, float b) {\n          return max(min(r, g), min(max(r, g), b));\n      }\n\n      void main() {\n          vec3 sample = texture2D(u_texture, v_texcoord).rgb;\n          if (u_debug == 1) {\n            gl_FragColor = vec4(sample.r, sample.g, sample.b, 1.0);\n            return;\n          }\n          float scaledDistRange = u_distanceRange * u_pixelRatio;\n          float sigDist = scaledDistRange * (median(sample.r, sample.g, sample.b) - 0.5);\n          float opacity = clamp(sigDist + 0.5, 0.0, 1.0) * u_color.a;\n\n          // Build the final color.\n          // IMPORTANT: We must premultiply the color by the alpha value before returning it.\n          gl_FragColor = vec4(u_color.r * opacity, u_color.g * opacity, u_color.b * opacity, opacity);\n      }\n    "
});
let SdfShader = _SdfShader;
const updateShaderEffectColor = (values) => {
  if (values.programValue === void 0) {
    values.programValue = new Float32Array(4);
  }
  const rgba = values.value;
  const floatArray = values.programValue;
  floatArray[0] = (rgba >>> 24) / 255;
  floatArray[1] = (rgba >>> 16 & 255) / 255;
  floatArray[2] = (rgba >>> 8 & 255) / 255;
  floatArray[3] = (rgba & 255) / 255;
};
const updateFloat32ArrayLength2 = (values) => {
  const validatedValue = values.validatedValue || values.value;
  if (values.programValue instanceof Float32Array) {
    const floatArray = values.programValue;
    floatArray[0] = validatedValue[0];
    floatArray[1] = validatedValue[1];
  } else {
    values.programValue = new Float32Array(validatedValue);
  }
};
const updateFloat32ArrayLength4 = (values) => {
  const validatedValue = values.validatedValue || values.value;
  if (values.programValue instanceof Float32Array) {
    const floatArray = values.programValue;
    floatArray[0] = validatedValue[0];
    floatArray[1] = validatedValue[1];
    floatArray[2] = validatedValue[2];
    floatArray[3] = validatedValue[3];
  } else {
    values.programValue = new Float32Array(validatedValue);
  }
};
const updateFloat32ArrayLengthN = (values) => {
  const validatedValue = values.validatedValue || values.value;
  if (values.programValue instanceof Float32Array) {
    const len = validatedValue.length;
    const programValue = values.programValue;
    for (let i = 0; i < len; i++) {
      programValue[i] = validatedValue[i];
    }
  } else {
    values.programValue = new Float32Array(validatedValue);
  }
};
const validateArrayLength4 = (value) => {
  const isArray2 = Array.isArray(value);
  if (!isArray2) {
    return [value, value, value, value];
  } else if (isArray2 && value.length === 4) {
    return value;
  } else if (isArray2 && value.length === 2) {
    return [value[0], value[1], value[0], value[1]];
  } else if (isArray2 && value.length === 3) {
    return [value[0], value[1], value[2], value[0]];
  }
  return [value[0], value[0], value[0], value[0]];
};
const updateWebSafeRadius = (values, shaderProps) => {
  if (values.programValue === void 0) {
    values.programValue = new Float32Array(4);
  }
  const programValue = values.programValue;
  const validatedValue = values.validatedValue || values.value;
  if (shaderProps === void 0 && values.$dimensions === void 0) {
    programValue[0] = validatedValue[0];
    programValue[1] = validatedValue[1];
    programValue[2] = validatedValue[2];
    programValue[3] = validatedValue[3];
    return;
  }
  let storedDimensions = values.$dimensions;
  if (shaderProps !== void 0) {
    const { $dimensions } = shaderProps;
    if (storedDimensions !== void 0 && (storedDimensions.width === $dimensions.width || storedDimensions.height === $dimensions.height)) {
      return;
    }
    if (storedDimensions === void 0) {
      storedDimensions = {
        width: $dimensions == null ? void 0 : $dimensions.width,
        height: $dimensions == null ? void 0 : $dimensions.height
      };
      values.$dimensions = storedDimensions;
    }
  }
  const { width, height } = storedDimensions;
  const [r0, r1, r2, r3] = validatedValue;
  const factor = Math.min(Math.min(Math.min(width / Math.max(width, r0 + r1), width / Math.max(width, r2 + r3)), Math.min(height / Math.max(height, r0 + r2), height / Math.max(height, r1 + r3))), 1);
  programValue[0] = r0 * factor;
  programValue[1] = r1 * factor;
  programValue[2] = r2 * factor;
  programValue[3] = r3 * factor;
};
class RadiusEffect extends ShaderEffect {
  constructor() {
    super(...arguments);
    __publicField(this, "name", "radius");
  }
  static getEffectKey() {
    return "radius";
  }
  static resolveDefaults(props) {
    var _a2;
    return {
      radius: (_a2 = props.radius) != null ? _a2 : 10
    };
  }
}
__publicField(RadiusEffect, "z$__type__Props");
__publicField(RadiusEffect, "uniforms", {
  radius: {
    value: 0,
    method: "uniform4fv",
    type: "vec4",
    updateOnBind: true,
    validator: validateArrayLength4,
    updateProgramValue: updateWebSafeRadius
  }
});
__publicField(RadiusEffect, "methods", {
  fillMask: "\n      float function(float dist) {\n        return clamp(-dist, 0.0, 1.0);\n      }\n    ",
  boxDist: "\n      float function(vec2 p, vec2 size, float radius) {\n        size -= vec2(radius);\n        vec2 d = abs(p) - size;\n        return min(max(d.x, d.y), 0.0) + length(max(d, 0.0)) - radius;\n      }\n    "
});
__publicField(RadiusEffect, "onShaderMask", "\n  vec2 halfDimensions = u_dimensions * 0.5;\n  float r = radius[0] * step(v_textureCoordinate.x, 0.5) * step(v_textureCoordinate.y, 0.5);\n  r = r + radius[1] * step(0.5, v_textureCoordinate.x) * step(v_textureCoordinate.y, 0.5);\n  r = r + radius[2] * step(0.5, v_textureCoordinate.x) * step(0.5, v_textureCoordinate.y);\n  r = r + radius[3] * step(v_textureCoordinate.x, 0.5) * step(0.5, v_textureCoordinate.y);\n  return $boxDist(v_textureCoordinate.xy * u_dimensions - halfDimensions, halfDimensions, r);\n  ");
__publicField(RadiusEffect, "onEffectMask", "\n  return mix(vec4(0.0), maskColor, $fillMask(shaderMask));\n  ");
class BorderEffect extends ShaderEffect {
  constructor() {
    super(...arguments);
    __publicField(this, "name", "border");
  }
  static getEffectKey() {
    return "border";
  }
  static resolveDefaults(props) {
    var _a2, _b;
    return {
      width: (_a2 = props.width) != null ? _a2 : 10,
      color: (_b = props.color) != null ? _b : 4294967295
    };
  }
}
__publicField(BorderEffect, "z$__type__Props");
__publicField(BorderEffect, "uniforms", {
  width: {
    value: 0,
    method: "uniform1f",
    type: "float"
  },
  color: {
    value: 4294967295,
    updateProgramValue: updateShaderEffectColor,
    method: "uniform4fv",
    type: "vec4"
  }
});
__publicField(BorderEffect, "onEffectMask", "\n  float intR = shaderMask + 1.0;\n  float mask = clamp(intR + width, 0.0, 1.0) - clamp(intR, 0.0, 1.0);\n  return mix(shaderColor, mix(shaderColor, maskColor, maskColor.a), mask);\n  ");
__publicField(BorderEffect, "onColorize", "\n    return color;\n  ");
const _LinearGradientEffect = class _LinearGradientEffect extends ShaderEffect {
  constructor() {
    super(...arguments);
    __publicField(this, "name", "linearGradient");
  }
  static getEffectKey(props) {
    if (props.colors.value) {
      return "linearGradient".concat(props.colors.value.length);
    }
    return "linearGradient".concat(props.colors.length);
  }
  static resolveDefaults(props) {
    var _a2, _b;
    const colors = (_a2 = props.colors) != null ? _a2 : [4278190080, 4294967295];
    let stops = props.stops || [];
    if (stops.length === 0 || stops.length !== colors.length) {
      const colorsL = colors.length;
      let i = 0;
      const tmp = stops;
      for (; i < colorsL; i++) {
        if (stops[i]) {
          tmp[i] = stops[i];
          if (stops[i - 1] === void 0 && tmp[i - 2] !== void 0) {
            tmp[i - 1] = tmp[i - 2] + (stops[i] - tmp[i - 2]) / 2;
          }
        } else {
          tmp[i] = i * (1 / (colors.length - 1));
        }
      }
      stops = tmp;
    }
    return {
      colors,
      stops,
      angle: (_b = props.angle) != null ? _b : 0
    };
  }
};
__publicField(_LinearGradientEffect, "z$__type__Props");
__publicField(_LinearGradientEffect, "uniforms", {
  angle: {
    value: 0,
    method: "uniform1f",
    type: "float"
  },
  colors: {
    value: 4294967295,
    validator: (rgbas) => {
      return rgbas.reduce((acc, val) => acc.concat(getNormalizedRgbaComponents(val)), []);
    },
    updateProgramValue: updateFloat32ArrayLengthN,
    size: (props) => props.colors.length,
    method: "uniform4fv",
    type: "vec4"
  },
  stops: {
    value: [],
    size: (props) => props.colors.length,
    method: "uniform1fv",
    type: "float"
  }
});
__publicField(_LinearGradientEffect, "methods", {
  fromLinear: "\n      vec4 function(vec4 linearRGB) {\n        vec4 higher = vec4(1.055)*pow(linearRGB, vec4(1.0/2.4)) - vec4(0.055);\n        vec4 lower = linearRGB * vec4(12.92);\n        return mix(higher, lower, 1.0);\n      }\n    ",
  toLinear: "\n      vec4 function(vec4 sRGB) {\n        vec4 higher = pow((sRGB + vec4(0.055))/vec4(1.055), vec4(2.4));\n        vec4 lower = sRGB/vec4(12.92);\n        return mix(higher, lower, 1.0);\n      }\n    ",
  calcPoint: "\n      vec2 function(float d, float angle) {\n        return d * vec2(cos(angle), sin(angle)) + (u_dimensions * 0.5);\n      }\n    "
});
__publicField(_LinearGradientEffect, "ColorLoop", (amount) => {
  let loop = "";
  for (let i = 2; i < amount; i++) {
    loop += "colorOut = mix(colorOut, colors[".concat(i, "], clamp((dist - stops[").concat(i - 1, "]) / (stops[").concat(i, "] - stops[").concat(i - 1, "]), 0.0, 1.0));");
  }
  return loop;
});
__publicField(_LinearGradientEffect, "onColorize", (props) => {
  const colors = props.colors.length || 1;
  return "\n      float a = angle - (PI / 180.0 * 90.0);\n      float lineDist = abs(u_dimensions.x * cos(a)) + abs(u_dimensions.y * sin(a));\n      vec2 f = $calcPoint(lineDist * 0.5, a);\n      vec2 t = $calcPoint(lineDist * 0.5, a + PI);\n      vec2 gradVec = t - f;\n      float dist = dot(v_textureCoordinate.xy * u_dimensions - f, gradVec) / dot(gradVec, gradVec);\n\n      float stopCalc = (dist - stops[0]) / (stops[1] - stops[0]);\n      vec4 colorOut = $fromLinear(mix($toLinear(colors[0]), $toLinear(colors[1]), stopCalc));\n      ".concat(_LinearGradientEffect.ColorLoop(colors), "\n      return mix(maskColor, colorOut, clamp(colorOut.a, 0.0, 1.0));\n    ");
});
let LinearGradientEffect = _LinearGradientEffect;
class GrayscaleEffect extends ShaderEffect {
  constructor() {
    super(...arguments);
    __publicField(this, "name", "grayscale");
  }
  static getEffectKey() {
    return "grayscale";
  }
  static resolveDefaults(props) {
    var _a2;
    return {
      amount: (_a2 = props.amount) != null ? _a2 : 1
    };
  }
}
__publicField(GrayscaleEffect, "uniforms", {
  amount: {
    value: 1,
    method: "uniform1f",
    type: "float"
  }
});
__publicField(GrayscaleEffect, "onColorize", "\n    float grayness = 0.2 * maskColor.r + 0.6 * maskColor.g + 0.2 * maskColor.b;\n    return vec4(amount * vec3(grayness) + (1.0 - amount) * maskColor.rgb, maskColor.a);\n  ");
class BorderRightEffect extends ShaderEffect {
  constructor() {
    super(...arguments);
    __publicField(this, "name", "borderRight");
  }
  static getEffectKey() {
    return "borderRight";
  }
  static resolveDefaults(props) {
    var _a2, _b;
    return {
      width: (_a2 = props.width) != null ? _a2 : 10,
      color: (_b = props.color) != null ? _b : 4294967295
    };
  }
}
__publicField(BorderRightEffect, "z$__type__Props");
__publicField(BorderRightEffect, "uniforms", {
  width: {
    value: 0,
    method: "uniform1f",
    type: "float"
  },
  color: {
    value: 4294967295,
    updateProgramValue: updateShaderEffectColor,
    method: "uniform4fv",
    type: "vec4"
  }
});
__publicField(BorderRightEffect, "methods", {
  fillMask: "\n      float function(float dist) {\n        return clamp(-dist, 0.0, 1.0);\n      }\n    ",
  rectDist: "\n      float function(vec2 p, vec2 size) {\n        vec2 d = abs(p) - size;\n        return min(max(d.x, d.y), 0.0) + length(max(d, 0.0));\n      }\n    "
});
__publicField(BorderRightEffect, "onEffectMask", "\n  vec2 pos = vec2(u_dimensions.x - width * 0.5, 0.0);\n  float mask = $rectDist(v_textureCoordinate.xy * u_dimensions - pos, vec2(width*0.5, u_dimensions.y));\n  return mix(shaderColor, maskColor, $fillMask(mask));\n  ");
__publicField(BorderRightEffect, "onColorize", "\n    return color;\n  ");
class BorderTopEffect extends ShaderEffect {
  constructor() {
    super(...arguments);
    __publicField(this, "name", "borderTop");
  }
  static getEffectKey() {
    return "borderTop";
  }
  static resolveDefaults(props) {
    var _a2, _b;
    return {
      width: (_a2 = props.width) != null ? _a2 : 10,
      color: (_b = props.color) != null ? _b : 4294967295
    };
  }
}
__publicField(BorderTopEffect, "z$__type__Props");
__publicField(BorderTopEffect, "uniforms", {
  width: {
    value: 0,
    method: "uniform1f",
    type: "float"
  },
  color: {
    value: 4294967295,
    updateProgramValue: updateShaderEffectColor,
    method: "uniform4fv",
    type: "vec4"
  }
});
__publicField(BorderTopEffect, "methods", {
  fillMask: "\n      float function(float dist) {\n        return clamp(-dist, 0.0, 1.0);\n      }\n    ",
  rectDist: "\n      float function(vec2 p, vec2 size) {\n        vec2 d = abs(p) - size;\n        return min(max(d.x, d.y), 0.0) + length(max(d, 0.0));\n      }\n    "
});
__publicField(BorderTopEffect, "onEffectMask", "\n  vec2 pos = vec2(0.0, width * 0.5);\n  float mask = $rectDist(v_textureCoordinate.xy * u_dimensions - pos, vec2(u_dimensions.x, width*0.5));\n  return mix(shaderColor, maskColor, $fillMask(mask));\n  ");
__publicField(BorderTopEffect, "onColorize", "\n    return color;\n  ");
class BorderBottomEffect extends ShaderEffect {
  constructor() {
    super(...arguments);
    __publicField(this, "name", "borderBottom");
  }
  static getEffectKey() {
    return "borderBottom";
  }
  static resolveDefaults(props) {
    var _a2, _b;
    return {
      width: (_a2 = props.width) != null ? _a2 : 10,
      color: (_b = props.color) != null ? _b : 4294967295
    };
  }
}
__publicField(BorderBottomEffect, "z$__type__Props");
__publicField(BorderBottomEffect, "uniforms", {
  width: {
    value: 0,
    method: "uniform1f",
    type: "float"
  },
  color: {
    value: 4294967295,
    updateProgramValue: updateShaderEffectColor,
    method: "uniform4fv",
    type: "vec4"
  }
});
__publicField(BorderBottomEffect, "methods", {
  fillMask: "\n      float function(float dist) {\n        return clamp(-dist, 0.0, 1.0);\n      }\n    ",
  rectDist: "\n      float function(vec2 p, vec2 size) {\n        vec2 d = abs(p) - size;\n        return min(max(d.x, d.y), 0.0) + length(max(d, 0.0));\n      }\n    "
});
__publicField(BorderBottomEffect, "onEffectMask", "\n  vec2 pos = vec2(0.0, u_dimensions.y - width * 0.5);\n  float mask = $rectDist(v_textureCoordinate.xy * u_dimensions - pos, vec2(u_dimensions.x, width*0.5));\n  return mix(shaderColor, maskColor, $fillMask(mask));\n  ");
__publicField(BorderBottomEffect, "onColorize", "\n    return color;\n  ");
class BorderLeftEffect extends ShaderEffect {
  constructor() {
    super(...arguments);
    __publicField(this, "name", "borderLeft");
  }
  static getEffectKey() {
    return "borderLeft";
  }
  static resolveDefaults(props) {
    var _a2, _b;
    return {
      width: (_a2 = props.width) != null ? _a2 : 10,
      color: (_b = props.color) != null ? _b : 4294967295
    };
  }
}
__publicField(BorderLeftEffect, "z$__type__Props");
__publicField(BorderLeftEffect, "uniforms", {
  width: {
    value: 0,
    method: "uniform1f",
    type: "float"
  },
  color: {
    value: 4294967295,
    updateProgramValue: updateShaderEffectColor,
    method: "uniform4fv",
    type: "vec4"
  }
});
__publicField(BorderLeftEffect, "methods", {
  fillMask: "\n      float function(float dist) {\n        return clamp(-dist, 0.0, 1.0);\n      }\n    ",
  rectDist: "\n      float function(vec2 p, vec2 size) {\n        vec2 d = abs(p) - size;\n        return min(max(d.x, d.y), 0.0) + length(max(d, 0.0));\n      }\n    "
});
__publicField(BorderLeftEffect, "onEffectMask", "\n  vec2 pos = vec2(width * 0.5, 0.0);\n  float mask = $rectDist(v_textureCoordinate.xy * u_dimensions - pos, vec2(width*0.5, u_dimensions.y));\n  return mix(shaderColor, maskColor, $fillMask(mask));\n  ");
__publicField(BorderLeftEffect, "onColorize", "\n    return color;\n  ");
class GlitchEffect extends ShaderEffect {
  constructor() {
    super(...arguments);
    __publicField(this, "name", "glitch");
  }
  static getEffectKey(props) {
    return "glitch";
  }
  static resolveDefaults(props) {
    var _a2, _b, _c, _d, _e;
    return {
      amplitude: (_a2 = props.amplitude) != null ? _a2 : 0.2,
      narrowness: (_b = props.narrowness) != null ? _b : 4,
      blockiness: (_c = props.blockiness) != null ? _c : 2,
      minimizer: (_d = props.minimizer) != null ? _d : 8,
      time: (_e = props.time) != null ? _e : Date.now()
    };
  }
}
__publicField(GlitchEffect, "z$__type__Props");
__publicField(GlitchEffect, "uniforms", {
  amplitude: {
    value: 0,
    method: "uniform1f",
    type: "float"
  },
  narrowness: {
    value: 0,
    method: "uniform1f",
    type: "float"
  },
  blockiness: {
    value: 0,
    method: "uniform1f",
    type: "float"
  },
  minimizer: {
    value: 0,
    method: "uniform1f",
    type: "float"
  },
  time: {
    value: 0,
    method: "uniform1f",
    updateOnBind: true,
    updateProgramValue: (values) => {
      const value = values.value = (Date.now() - values.value) % 1e3;
      values.programValue = value;
    },
    type: "float"
  }
});
__publicField(GlitchEffect, "methods", {
  rand: "\n      float function(vec2 p, float time) {\n        float t = floor(time * 20.) / 10.;\n        return fract(sin(dot(p, vec2(t * 12.9898, t * 78.233))) * 43758.5453);\n      }\n    ",
  noise: "\n      float function(vec2 uv, float blockiness, float time) {\n        vec2 lv = fract(uv);\n        vec2 id = floor(uv);\n\n        float n1 = rand(id, time);\n        float n2 = rand(id+vec2(1,0), time);\n        float n3 = rand(id+vec2(0,1), time);\n        float n4 = rand(id+vec2(1,1), time);\n        vec2 u = smoothstep(0.0, 1.0 + blockiness, lv);\n        return mix(mix(n1, n2, u.x), mix(n3, n4, u.x), u.y);\n      }\n    ",
  fbm: "\n      float function(vec2 uv, int count, float blockiness, float complexity, float time) {\n        float val = 0.0;\n        float amp = 0.5;\n        const int MAX_ITERATIONS = 10;\n\n        for(int i = 0; i < MAX_ITERATIONS; i++) {\n          if(i >= count) {break;}\n          val += amp * noise(uv, blockiness, time);\n          amp *= 0.5;\n          uv *= complexity;\n        }\n        return val;\n      }\n    "
});
__publicField(GlitchEffect, "onColorize", "\n    vec2 uv = v_textureCoordinate.xy;\n    float aspect = u_dimensions.x / u_dimensions.y;\n    vec2 a = vec2(uv.x * aspect , uv.y);\n    vec2 uv2 = vec2(a.x / u_dimensions.x, exp(a.y));\n\n    float shift = amplitude * pow($fbm(uv2, 4, blockiness, narrowness, time), minimizer);\n    float colR = texture2D(u_texture, vec2(uv.x + shift, uv.y)).r * (1. - shift);\n    float colG = texture2D(u_texture, vec2(uv.x - shift, uv.y)).g * (1. - shift);\n    float colB = texture2D(u_texture, vec2(uv.x - shift, uv.y)).b * (1. - shift);\n\n    vec3 f = vec3(colR, colG, colB);\n    return vec4(f, texture2D(u_texture, vec2(uv.x - shift, uv.y)).a);\n  ");
class FadeOutEffect extends ShaderEffect {
  constructor() {
    super(...arguments);
    __publicField(this, "name", "fadeOut");
  }
  static getEffectKey() {
    return "fadeOut";
  }
  static resolveDefaults(props) {
    var _a2;
    return {
      fade: (_a2 = props.fade) != null ? _a2 : 10
    };
  }
}
__publicField(FadeOutEffect, "z$__type__Props");
__publicField(FadeOutEffect, "uniforms", {
  fade: {
    value: 0,
    method: "uniform4fv",
    type: "vec4",
    validator: validateArrayLength4,
    updateProgramValue: updateFloat32ArrayLength4
  }
});
__publicField(FadeOutEffect, "onColorize", "\n  vec2 point = v_textureCoordinate.xy * u_dimensions.xy;\n  vec2 pos1;\n  vec2 pos2;\n  vec2 d;\n  float c;\n  vec4 result = maskColor;\n\n\n  if(fade[0] > 0.0) {\n    pos1 = vec2(point.x, point.y);\n    pos2 = vec2(point.x, point.y + fade[0]);\n    d = pos2 - pos1;\n    c = dot(pos1, d) / dot(d, d);\n    result = mix(vec4(0.0), result, smoothstep(0.0, 1.0, clamp(c, 0.0, 1.0)));\n  }\n\n  if(fade[1] > 0.0) {\n    pos1 = vec2(point.x - u_dimensions.x - fade[1], v_textureCoordinate.y);\n    pos2 = vec2(point.x - u_dimensions.x, v_textureCoordinate.y);\n    d = pos1 - pos2;\n    c = dot(pos2, d) / dot(d, d);\n    result = mix(vec4(0.0), result, smoothstep(0.0, 1.0, clamp(c, 0.0, 1.0)));\n  }\n\n  if(fade[2] > 0.0) {\n    pos1 = vec2(v_textureCoordinate.x, point.y - u_dimensions.y - fade[2]);\n    pos2 = vec2(v_textureCoordinate.x, point.y - u_dimensions.y);\n    d = pos1 - pos2;\n    c = dot(pos2, d) / dot(d, d);\n    result = mix(vec4(0.0), result, smoothstep(0.0, 1.0, clamp(c, 0.0, 1.0)));\n  }\n\n  if(fade[3] > 0.0) {\n    pos1 = vec2(point.x, point.y);\n    pos2 = vec2(point.x + fade[3], point.y);\n    d = pos2 - pos1;\n    c = dot(pos1, d) / dot(d, d);\n    result = mix(vec4(0.0), result, smoothstep(0.0, 1.0, clamp(c, 0.0, 1.0)));\n  }\n\n  return result;\n  ");
const _RadialGradientEffect = class _RadialGradientEffect extends ShaderEffect {
  constructor() {
    super(...arguments);
    __publicField(this, "name", "radialGradient");
  }
  static getEffectKey(props) {
    if (props.colors.value) {
      return "radialGradient".concat(props.colors.value.length);
    }
    return "radialGradient".concat(props.colors.length);
  }
  static resolveDefaults(props) {
    var _a2, _b, _c, _d, _e;
    const colors = (_a2 = props.colors) != null ? _a2 : [4278190080, 4294967295];
    let stops = props.stops || [];
    if (stops.length === 0 || stops.length !== colors.length) {
      const colorsL = colors.length;
      let i = 0;
      const tmp = stops;
      for (; i < colorsL; i++) {
        if (stops[i]) {
          tmp[i] = stops[i];
          if (stops[i - 1] === void 0 && tmp[i - 2] !== void 0) {
            tmp[i - 1] = tmp[i - 2] + (stops[i] - tmp[i - 2]) / 2;
          }
        } else {
          tmp[i] = i * (1 / (colors.length - 1));
        }
      }
      stops = tmp;
    }
    return {
      colors,
      stops,
      width: (_b = props.width) != null ? _b : 0,
      height: (_d = (_c = props.height) != null ? _c : props.width) != null ? _d : 0,
      pivot: (_e = props.pivot) != null ? _e : [0.5, 0.5]
    };
  }
};
__publicField(_RadialGradientEffect, "z$__type__Props");
__publicField(_RadialGradientEffect, "uniforms", {
  width: {
    value: 0,
    method: "uniform1f",
    type: "float"
  },
  height: {
    value: 0,
    method: "uniform1f",
    type: "float"
  },
  pivot: {
    value: [0.5, 0.5],
    updateProgramValue: updateFloat32ArrayLength2,
    method: "uniform2fv",
    type: "vec2"
  },
  colors: {
    value: 4294967295,
    validator: (rgbas) => {
      return rgbas.reduce((acc, val) => acc.concat(getNormalizedRgbaComponents(val)), []);
    },
    updateProgramValue: updateFloat32ArrayLengthN,
    size: (props) => props.colors.length,
    method: "uniform4fv",
    type: "vec4"
  },
  stops: {
    value: [],
    size: (props) => props.colors.length,
    method: "uniform1fv",
    type: "float"
  }
});
__publicField(_RadialGradientEffect, "ColorLoop", (amount) => {
  let loop = "";
  for (let i = 2; i < amount; i++) {
    loop += "colorOut = mix(colorOut, colors[".concat(i, "], clamp((dist - stops[").concat(i - 1, "]) / (stops[").concat(i, "] - stops[").concat(i - 1, "]), 0.0, 1.0));");
  }
  return loop;
});
__publicField(_RadialGradientEffect, "onColorize", (props) => {
  const colors = props.colors.length || 1;
  return "\n      vec2 point = v_textureCoordinate.xy * u_dimensions;\n      vec2 projection = vec2(pivot.x * u_dimensions.x, pivot.y * u_dimensions.y);\n\n      float dist = length((point - projection) / vec2(width, height));\n\n      float stopCalc = (dist - stops[0]) / (stops[1] - stops[0]);\n      vec4 colorOut = mix(colors[0], colors[1], stopCalc);\n      ".concat(_RadialGradientEffect.ColorLoop(colors), "\n      return mix(maskColor, colorOut, clamp(colorOut.a, 0.0, 1.0));\n    ");
});
let RadialGradientEffect = _RadialGradientEffect;
class RadialProgressEffect extends ShaderEffect {
  constructor() {
    super(...arguments);
    __publicField(this, "name", "radialProgress");
  }
  static getEffectKey() {
    return "radialProgress";
  }
  static resolveDefaults(props) {
    var _a2, _b, _c, _d, _e, _f, _g;
    return {
      width: (_a2 = props.width) != null ? _a2 : 10,
      progress: (_b = props.progress) != null ? _b : 0.5,
      offset: (_c = props.offset) != null ? _c : 0,
      range: (_d = props.range) != null ? _d : Math.PI * 2,
      rounded: (_e = props.rounded) != null ? _e : false,
      radius: (_f = props.radius) != null ? _f : 1,
      color: (_g = props.color) != null ? _g : 4294967295
    };
  }
}
__publicField(RadialProgressEffect, "z$__type__Props");
__publicField(RadialProgressEffect, "uniforms", {
  width: {
    value: 0,
    method: "uniform1f",
    type: "float"
  },
  progress: {
    value: 0.5,
    method: "uniform1f",
    type: "float"
  },
  offset: {
    value: 0,
    method: "uniform1f",
    type: "float"
  },
  range: {
    value: 0,
    method: "uniform1f",
    type: "float"
  },
  rounded: {
    value: 0,
    method: "uniform1f",
    type: "float",
    validator: (value) => {
      return value ? 1 : 0;
    }
  },
  radius: {
    value: 1,
    method: "uniform1f",
    type: "float"
  },
  color: {
    value: 4294967295,
    updateProgramValue: updateShaderEffectColor,
    method: "uniform4fv",
    type: "vec4"
  }
});
__publicField(RadialProgressEffect, "methods", {
  rotateUV: "\n    vec2 function(vec2 uv, float d) {\n      float s = sin(d);\n      float c = cos(d);\n      mat2 rotMatrix = mat2(c, -s, s, c);\n      return uv * rotMatrix;\n    }\n    ",
  drawDot: "\n    float function(vec2 uv, vec2 p, float r) {\n      uv += p;\n      float circle = length(uv) - r;\n      return clamp(-circle, 0.0, 1.0);\n    }\n    "
});
__publicField(RadialProgressEffect, "onEffectMask", "\n    float outerRadius = radius * u_dimensions.y * 0.5;\n\n    float endAngle = range * progress - 0.0005;\n\n    vec2 uv = v_textureCoordinate.xy * u_dimensions.xy - u_dimensions * 0.5;\n\n    uv = $rotateUV(uv, -(offset));\n    float linewidth = width * u_pixelRatio;\n    float circle = length(uv) - (outerRadius - linewidth) ;\n    circle = abs(circle) - linewidth;\n    circle = clamp(-circle, 0.0, 1.0);\n\n    float angle = (atan(uv.x, -uv.y) / 3.14159265359 * 0.5);\n    float p = endAngle / (PI * 2.);\n\n    circle *= step(fract(angle), fract(p));\n\n    circle = rounded < 1. ? circle : max(circle, $drawDot(uv, vec2(0, outerRadius - linewidth), linewidth));\n    circle = rounded < 1. ? circle : max(circle, $drawDot($rotateUV(uv, -(endAngle)), vec2(0, outerRadius - linewidth), linewidth));\n\n    return mix(shaderColor, maskColor, circle);\n  ");
__publicField(RadialProgressEffect, "onColorize", "\n    return color;\n  ");
class HolePunchEffect extends ShaderEffect {
  constructor() {
    super(...arguments);
    __publicField(this, "name", "holePunch");
  }
  static getEffectKey() {
    return "holePunch";
  }
  static resolveDefaults(props) {
    var _a2;
    return {
      x: props.x || 0,
      y: props.y || 0,
      width: props.width || 50,
      height: props.height || 50,
      radius: (_a2 = props.radius) != null ? _a2 : 0
    };
  }
}
__publicField(HolePunchEffect, "z$__type__Props");
__publicField(HolePunchEffect, "uniforms", {
  x: {
    value: 0,
    method: "uniform1f",
    type: "float"
  },
  y: {
    value: 0,
    method: "uniform1f",
    type: "float"
  },
  width: {
    value: 0,
    method: "uniform1f",
    type: "float"
  },
  height: {
    value: 0,
    method: "uniform1f",
    type: "float"
  },
  radius: {
    value: 0,
    method: "uniform4fv",
    type: "vec4",
    updateOnBind: true,
    validator: validateArrayLength4,
    updateProgramValue: updateWebSafeRadius
  }
});
__publicField(HolePunchEffect, "methods", {
  fillMask: "\n      float function(float dist) {\n        return clamp(-dist, 0.0, 1.0);\n      }\n    ",
  boxDist: "\n      float function(vec2 p, vec2 size, float radius) {\n        size -= vec2(radius);\n        vec2 d = abs(p) - size;\n        return min(max(d.x, d.y), 0.0) + length(max(d, 0.0)) - radius;\n      }\n    "
});
__publicField(HolePunchEffect, "onShaderMask", "\n  vec2 halfDimensions = u_dimensions * 0.5;\n  vec2 size = vec2(width, height) * 0.5;\n  vec2 basePos = v_textureCoordinate.xy * u_dimensions.xy - vec2(x, y);\n  vec2 pos = basePos - size;\n  float r = radius[0] * step(pos.x, 0.5) * step(pos.y, 0.5);\n  r = r + radius[1] * step(0.5, pos.x) * step(pos.y, 0.5);\n  r = r + radius[2] * step(0.5, pos.x) * step(0.5, pos.y);\n  r = r + radius[3] * step(pos.x, 0.5) * step(0.5, pos.y);\n  return $boxDist(pos, size, r);\n  ");
__publicField(HolePunchEffect, "onEffectMask", "\n  return mix(maskColor, vec4(0.0), $fillMask(shaderMask));\n  ");
const ROUNDED_RECTANGLE_SHADER_TYPE = "RoundedRectangle";
class UnsupportedShader extends CoreShader {
  constructor(shType) {
    super();
    __publicField(this, "shType");
    this.shType = shType;
  }
  bindRenderOp() {
  }
  bindProps() {
  }
  attach() {
  }
  detach() {
  }
}
class ShaderController {
  constructor(type, shader, props, stage) {
    __publicField(this, "type");
    __publicField(this, "shader");
    __publicField(this, "resolvedProps");
    __publicField(this, "props");
    this.type = type;
    this.shader = shader;
    this.resolvedProps = props;
    const keys = Object.keys(props);
    const l = keys.length;
    const definedProps = {};
    for (let i = 0; i < l; i++) {
      const name = keys[i];
      Object.defineProperty(definedProps, name, {
        get: () => {
          return this.resolvedProps[name];
        },
        set: (value) => {
          this.resolvedProps[name] = value;
          stage.requestRender();
        }
      });
    }
    this.props = definedProps;
  }
  getResolvedProps() {
    return this.resolvedProps;
  }
}
class DynamicShaderController {
  constructor(shader, props, shManager) {
    __publicField(this, "shader");
    __publicField(this, "resolvedProps");
    __publicField(this, "props");
    __publicField(this, "type");
    this.shader = shader;
    this.type = "DynamicShader";
    this.resolvedProps = props;
    const effectConstructors = shManager.getRegisteredEffects();
    const definedProps = {};
    const effects = props.effects;
    const effectsLength = effects.length;
    for (let i = 0; i < effectsLength; i++) {
      const { name: effectName, props: effectProps, type: effectType } = effects[i];
      if (effectName === void 0) {
        continue;
      }
      const definedEffectProps = {};
      const propEntries = Object.keys(effectProps);
      const propEntriesLength = propEntries.length;
      for (let j = 0; j < propEntriesLength; j++) {
        const propName = propEntries[j];
        Object.defineProperty(definedEffectProps, propName, {
          get: () => {
            return this.resolvedProps.effects[i].props[propName].value;
          },
          set: (value) => {
            var _a2, _b;
            const target = this.resolvedProps.effects[i].props[propName];
            target.value = value;
            if (target.hasValidator) {
              value = target.validatedValue = (_a2 = effectConstructors[effectType].uniforms[propName]) == null ? void 0 : _a2.validator(value, effectProps);
            }
            if (target.hasProgramValueUpdater) {
              (_b = effectConstructors[effectType].uniforms[propName]) == null ? void 0 : _b.updateProgramValue(target);
            } else {
              target.programValue = value;
            }
            shManager.renderer.stage.requestRender();
          }
        });
      }
      Object.defineProperty(definedProps, effectName, {
        get: () => {
          return definedEffectProps;
        }
      });
    }
    this.props = definedProps;
  }
  getResolvedProps() {
    return this.resolvedProps;
  }
}
class CoreShaderManager {
  constructor() {
    __publicField(this, "shCache", /* @__PURE__ */ new Map());
    __publicField(this, "shConstructors", {});
    __publicField(this, "attachedShader", null);
    __publicField(this, "effectConstructors", {});
    __publicField(this, "renderer");
    this.registerShaderType("DefaultShader", DefaultShader);
    this.registerShaderType("DefaultShaderBatched", DefaultShaderBatched);
    this.registerShaderType("RoundedRectangle", RoundedRectangle);
    this.registerShaderType("DynamicShader", DynamicShader);
    this.registerShaderType("SdfShader", SdfShader);
    this.registerEffectType("border", BorderEffect);
    this.registerEffectType("borderBottom", BorderBottomEffect);
    this.registerEffectType("borderLeft", BorderLeftEffect);
    this.registerEffectType("borderRight", BorderRightEffect);
    this.registerEffectType("borderTop", BorderTopEffect);
    this.registerEffectType("fadeOut", FadeOutEffect);
    this.registerEffectType("linearGradient", LinearGradientEffect);
    this.registerEffectType("radialGradient", RadialGradientEffect);
    this.registerEffectType("grayscale", GrayscaleEffect);
    this.registerEffectType("glitch", GlitchEffect);
    this.registerEffectType("radius", RadiusEffect);
    this.registerEffectType("radialProgress", RadialProgressEffect);
    this.registerEffectType("holePunch", HolePunchEffect);
  }
  registerShaderType(shType, shClass) {
    this.shConstructors[shType] = shClass;
  }
  registerEffectType(effectType, effectClass) {
    this.effectConstructors[effectType] = effectClass;
  }
  getRegisteredEffects() {
    return this.effectConstructors;
  }
  getRegisteredShaders() {
    return this.shConstructors;
  }
  /**
   * Loads a shader (if not already loaded) and returns a controller for it.
   *
   * @param shType
   * @param props
   * @returns
   */
  loadShader(shType, props) {
    if (!this.renderer) {
      throw new Error("Renderer is not been defined");
    }
    const ShaderClass = this.shConstructors[shType];
    if (!ShaderClass) {
      throw new Error('Shader type "'.concat(shType, '" is not registered'));
    }
    if (this.renderer.mode === "canvas" && ShaderClass.prototype instanceof WebGlCoreShader) {
      return this._createShaderCtr(shType, new UnsupportedShader(shType), props);
    }
    if (shType === "DynamicShader") {
      return this.loadDynamicShader(props);
    }
    const resolvedProps = ShaderClass.resolveDefaults(props);
    const cacheKey = ShaderClass.makeCacheKey(resolvedProps) || ShaderClass.name;
    if (cacheKey && this.shCache.has(cacheKey)) {
      return this._createShaderCtr(shType, this.shCache.get(cacheKey), resolvedProps);
    }
    const shader = new ShaderClass(this.renderer, props);
    if (cacheKey) {
      this.shCache.set(cacheKey, shader);
    }
    return this._createShaderCtr(shType, shader, resolvedProps);
  }
  loadDynamicShader(props) {
    if (!this.renderer) {
      throw new Error("Renderer is not been defined");
    }
    const resolvedProps = DynamicShader.resolveDefaults(props, this.effectConstructors);
    const cacheKey = DynamicShader.makeCacheKey(resolvedProps, this.effectConstructors);
    if (cacheKey && this.shCache.has(cacheKey)) {
      return this._createDynShaderCtr(this.shCache.get(cacheKey), resolvedProps);
    }
    const shader = new DynamicShader(this.renderer, props, this.effectConstructors);
    if (cacheKey) {
      this.shCache.set(cacheKey, shader);
    }
    return this._createDynShaderCtr(shader, resolvedProps);
  }
  _createShaderCtr(type, shader, props) {
    return new ShaderController(type, shader, props, this.renderer.stage);
  }
  _createDynShaderCtr(shader, props) {
    shader.bindUniformMethods(props);
    return new DynamicShaderController(shader, props, this);
  }
  useShader(shader) {
    if (this.attachedShader === shader) {
      return;
    }
    if (this.attachedShader) {
      this.attachedShader.detach();
    }
    shader.attach();
    this.attachedShader = shader;
  }
}
const trPropSetterDefaults = {
  x: (state, value) => {
    state.props.x = value;
  },
  y: (state, value) => {
    state.props.y = value;
  },
  width: (state, value) => {
    state.props.width = value;
  },
  height: (state, value) => {
    state.props.height = value;
  },
  color: (state, value) => {
    state.props.color = value;
  },
  zIndex: (state, value) => {
    state.props.zIndex = value;
  },
  fontFamily: (state, value) => {
    state.props.fontFamily = value;
  },
  fontWeight: (state, value) => {
    state.props.fontWeight = value;
  },
  fontStyle: (state, value) => {
    state.props.fontStyle = value;
  },
  fontStretch: (state, value) => {
    state.props.fontStretch = value;
  },
  fontSize: (state, value) => {
    state.props.fontSize = value;
  },
  text: (state, value) => {
    state.props.text = value;
  },
  textAlign: (state, value) => {
    state.props.textAlign = value;
  },
  contain: (state, value) => {
    state.props.contain = value;
  },
  offsetY: (state, value) => {
    state.props.offsetY = value;
  },
  scrollable: (state, value) => {
    state.props.scrollable = value;
  },
  scrollY: (state, value) => {
    state.props.scrollY = value;
  },
  letterSpacing: (state, value) => {
    state.props.letterSpacing = value;
  },
  lineHeight: (state, value) => {
    state.props.lineHeight = value;
  },
  maxLines: (state, value) => {
    state.props.maxLines = value;
  },
  textBaseline: (state, value) => {
    state.props.textBaseline = value;
  },
  verticalAlign: (state, value) => {
    state.props.verticalAlign = value;
  },
  overflowSuffix: (state, value) => {
    state.props.overflowSuffix = value;
  },
  debug: (state, value) => {
    state.props.debug = value;
  }
};
class TextRenderer {
  constructor(stage) {
    __publicField(this, "stage");
    __publicField(this, "set");
    this.stage = stage;
    const propSetters = {
      ...trPropSetterDefaults,
      ...this.getPropertySetters()
    };
    const propSet = {};
    Object.keys(propSetters).forEach((key2) => {
      Object.defineProperty(propSet, key2, {
        value: (state, value) => {
          if (state.props[key2] !== value) {
            propSetters[key2](state, value);
            this.stage.requestRender();
          }
        },
        writable: false,
        // Prevents property from being changed
        configurable: false
        // Prevents property from being deleted
      });
    });
    this.set = propSet;
  }
  setStatus(state, status, error) {
    if (state.status === status) {
      return;
    }
    state.status = status;
    state.emitter.emit(status, error);
  }
  /**
   * Allows the CoreTextNode to communicate changes to the isRenderable state of
   * the itself.
   *
   * @param state
   * @param renderable
   */
  setIsRenderable(state, renderable) {
    state.isRenderable = renderable;
  }
  /**
   * Destroy/Clean up the state object
   *
   * @remarks
   * Opposite of createState(). Frees any event listeners / resources held by
   * the state that may not reliably get garbage collected.
   *
   * @param state
   */
  destroyState(state) {
    this.setStatus(state, "destroyed");
    state.emitter.removeAllListeners();
  }
  /**
   * Schedule a state update via queueMicrotask
   *
   * @remarks
   * This method is used to schedule a state update via queueMicrotask. This
   * method should be called whenever a state update is needed, and it will
   * ensure that the state is only updated once per microtask.
   * @param state
   * @returns
   */
  scheduleUpdateState(state) {
    if (state.updateScheduled) {
      return;
    }
    state.updateScheduled = true;
    queueMicrotask(() => {
      if (state.status === "destroyed") {
        return;
      }
      state.updateScheduled = false;
      this.updateState(state);
    });
  }
}
class ContextSpy {
  constructor() {
    __publicField(this, "data", {});
  }
  reset() {
    this.data = {};
  }
  increment(name) {
    if (!this.data[name]) {
      this.data[name] = 0;
    }
    this.data[name]++;
  }
  getData() {
    return { ...this.data };
  }
}
class TextureMemoryManager {
  constructor(stage, settings) {
    __publicField(this, "stage");
    __publicField(this, "memUsed", 0);
    __publicField(this, "loadedTextures", /* @__PURE__ */ new Map());
    __publicField(this, "orphanedTextures", []);
    __publicField(this, "criticalThreshold");
    __publicField(this, "targetThreshold");
    __publicField(this, "cleanupInterval");
    __publicField(this, "debugLogging");
    __publicField(this, "lastCleanupTime", 0);
    __publicField(this, "baselineMemoryAllocation");
    __publicField(this, "criticalCleanupRequested", false);
    __publicField(this, "doNotExceedCriticalThreshold");
    /**
     * The current frame time in milliseconds
     *
     * @remarks
     * This is used to determine when to perform Idle Texture Cleanups.
     *
     * Set by stage via `updateFrameTime` method.
     */
    __publicField(this, "frameTime", 0);
    this.stage = stage;
    const { criticalThreshold, doNotExceedCriticalThreshold } = settings;
    this.doNotExceedCriticalThreshold = doNotExceedCriticalThreshold || false;
    this.criticalThreshold = Math.round(criticalThreshold);
    const targetFraction = Math.max(0, Math.min(1, settings.targetThresholdLevel));
    this.cleanupInterval = settings.cleanupInterval;
    this.debugLogging = settings.debugLogging;
    this.baselineMemoryAllocation = Math.round(settings.baselineMemoryAllocation);
    this.targetThreshold = Math.max(Math.round(criticalThreshold * targetFraction), this.baselineMemoryAllocation);
    this.memUsed = Math.round(settings.baselineMemoryAllocation);
    if (settings.debugLogging) {
      let lastMemUse = 0;
      setInterval(() => {
        if (lastMemUse !== this.memUsed) {
          lastMemUse = this.memUsed;
          console.log("[TextureMemoryManager] Memory used: ".concat(bytesToMb$1(this.memUsed), " mb / ").concat(bytesToMb$1(this.criticalThreshold), " mb (").concat((this.memUsed / this.criticalThreshold * 100).toFixed(1), "%)"));
        }
      }, 1e3);
    }
    if (criticalThreshold === 0) {
      this.setTextureMemUse = () => {
      };
    }
  }
  /**
   * Add a texture to the orphaned textures list
   *
   * @param texture - The texture to add to the orphaned textures list
   */
  addToOrphanedTextures(texture) {
    if (this.orphanedTextures.includes(texture)) {
      this.removeFromOrphanedTextures(texture);
    }
    if (texture.preventCleanup === false) {
      this.orphanedTextures.push(texture);
    }
  }
  /**
   * Remove a texture from the orphaned textures list
   *
   * @param texture - The texture to remove from the orphaned textures list
   */
  removeFromOrphanedTextures(texture) {
    const index = this.orphanedTextures.indexOf(texture);
    if (index !== -1) {
      this.orphanedTextures.splice(index, 1);
    }
  }
  /**
   * Set the memory usage of a texture
   *
   * @param texture - The texture to set memory usage for
   * @param byteSize - The size of the texture in bytes
   */
  setTextureMemUse(texture, byteSize) {
    if (this.loadedTextures.has(texture)) {
      this.memUsed -= this.loadedTextures.get(texture);
    }
    if (byteSize === 0) {
      this.loadedTextures.delete(texture);
      return;
    } else {
      this.memUsed += byteSize;
      this.loadedTextures.set(texture, byteSize);
    }
    if (this.memUsed > this.criticalThreshold) {
      this.criticalCleanupRequested = true;
    }
  }
  checkCleanup() {
    return this.criticalCleanupRequested || this.memUsed > this.targetThreshold && this.frameTime - this.lastCleanupTime >= this.cleanupInterval;
  }
  checkCriticalCleanup() {
    return this.memUsed > this.criticalThreshold;
  }
  cleanupQuick(critical) {
    const memTarget = this.targetThreshold;
    const txManager = this.stage.txManager;
    const timestamp = getTimeStamp();
    while (this.memUsed >= memTarget && this.orphanedTextures.length > 0 && (critical || getTimeStamp() - timestamp < 10)) {
      const texture = this.orphanedTextures.shift();
      if (texture === void 0) {
        continue;
      }
      if (texture.renderable === true) {
        continue;
      }
      texture.free();
      txManager.removeTextureFromCache(texture);
    }
  }
  cleanupDeep(critical) {
    const memTarget = critical ? this.criticalThreshold : this.targetThreshold;
    const txManager = this.stage.txManager;
    const filteredAndSortedTextures = [];
    const textures = [...this.loadedTextures.keys()];
    for (let i = 0; i < textures.length; i++) {
      const texture = textures[i];
      if (texture === void 0) {
        continue;
      }
      if (texture.type === TextureType.image || texture.type === TextureType.noise || texture.type === TextureType.renderToTexture) {
        if (texture.renderable === true) {
          filteredAndSortedTextures.push(texture);
        } else {
          filteredAndSortedTextures.unshift(texture);
        }
      }
    }
    while (this.memUsed >= memTarget && filteredAndSortedTextures.length > 0) {
      const texture = filteredAndSortedTextures.shift();
      if (texture === void 0) {
        continue;
      }
      if (texture.preventCleanup === true) {
        continue;
      }
      if (texture.renderable === true) {
        break;
      }
      texture.free();
      this.removeFromOrphanedTextures(texture);
      txManager.removeTextureFromCache(texture);
      txManager.removeTextureFromQueue(texture);
    }
  }
  cleanup(aggressive = false) {
    const critical = this.criticalCleanupRequested;
    this.lastCleanupTime = this.frameTime;
    if (critical === true) {
      this.stage.queueFrameEvent("criticalCleanup", {
        memUsed: this.memUsed,
        criticalThreshold: this.criticalThreshold
      });
    }
    if (this.debugLogging === true) {
      console.log("[TextureMemoryManager] Cleaning up textures. Critical: ".concat(critical, ". Aggressive: ").concat(aggressive));
    }
    this.cleanupQuick(critical);
    if (aggressive === true && this.memUsed >= this.criticalThreshold) {
      this.cleanupDeep(critical);
    }
    if (this.memUsed >= this.criticalThreshold) {
      this.stage.queueFrameEvent("criticalCleanupFailed", {
        memUsed: this.memUsed,
        criticalThreshold: this.criticalThreshold
      });
      if (this.debugLogging === true || isProductionEnvironment() === false) {
        console.warn("[TextureMemoryManager] Memory usage above critical threshold after cleanup: ".concat(this.memUsed));
      }
    } else {
      this.criticalCleanupRequested = false;
    }
  }
  /**
   * Get the current texture memory usage information
   *
   * @remarks
   * This method is for debugging purposes and returns information about the
   * current memory usage of the textures in the Renderer.
   */
  getMemoryInfo() {
    let renderableTexturesLoaded = 0;
    const renderableMemUsed = [...this.loadedTextures.keys()].reduce((acc, texture) => {
      renderableTexturesLoaded += texture.renderable ? 1 : 0;
      return acc + (texture.renderable ? this.loadedTextures.get(texture) : 0);
    }, this.baselineMemoryAllocation);
    return {
      criticalThreshold: this.criticalThreshold,
      targetThreshold: this.targetThreshold,
      renderableMemUsed,
      memUsed: this.memUsed,
      renderableTexturesLoaded,
      loadedTextures: this.loadedTextures.size,
      baselineMemoryAllocation: this.baselineMemoryAllocation
    };
  }
}
class CoreContextTexture {
  constructor(memManager, textureSource) {
    __publicField(this, "textureSource");
    __publicField(this, "memManager");
    __publicField(this, "state", "freed");
    this.memManager = memManager;
    this.textureSource = textureSource;
  }
  setTextureMemUse(byteSize) {
    this.memManager.setTextureMemUse(this.textureSource, byteSize);
  }
  get renderable() {
    return this.textureSource.renderable;
  }
}
class CoreRenderer {
  constructor(options) {
    __publicField(this, "options");
    __publicField(this, "mode");
    __publicField(this, "stage");
    //// Core Managers
    __publicField(this, "txManager");
    __publicField(this, "txMemManager");
    __publicField(this, "shManager");
    __publicField(this, "rttNodes", []);
    this.options = options;
    this.stage = options.stage;
    this.txManager = options.txManager;
    this.txMemManager = options.txMemManager;
    this.shManager = options.shManager;
  }
}
class CoreTextNode extends CoreNode {
  constructor(stage, props, textRenderer) {
    super(stage, props);
    __publicField(this, "textRenderer");
    __publicField(this, "trState");
    __publicField(this, "_textRendererOverride", null);
    __publicField(this, "onTextLoaded", () => {
      const { contain } = this;
      const setWidth = this.trState.props.width;
      const setHeight = this.trState.props.height;
      const calcWidth = this.trState.textW || 0;
      const calcHeight2 = this.trState.textH || 0;
      if (contain === "both") {
        this.props.width = setWidth;
        this.props.height = setHeight;
      } else if (contain === "width") {
        this.props.width = setWidth;
        this.props.height = calcHeight2;
      } else if (contain === "none") {
        this.props.width = calcWidth;
        this.props.height = calcHeight2;
      }
      this.updateLocalTransform();
      this.stage.requestRender();
      this.emit("loaded", {
        type: "text",
        dimensions: {
          width: this.trState.textW || 0,
          height: this.trState.textH || 0
        }
      });
    });
    __publicField(this, "onTextFailed", (target, error) => {
      this.emit("failed", {
        type: "text",
        error
      });
    });
    this._textRendererOverride = props.textRendererOverride;
    this.textRenderer = textRenderer;
    const textRendererState = this.createState({
      x: this.absX,
      y: this.absY,
      width: props.width,
      height: props.height,
      textAlign: props.textAlign,
      color: props.color,
      zIndex: props.zIndex,
      contain: props.contain,
      scrollable: props.scrollable,
      scrollY: props.scrollY,
      offsetY: props.offsetY,
      letterSpacing: props.letterSpacing,
      debug: props.debug,
      fontFamily: props.fontFamily,
      fontSize: props.fontSize,
      fontStretch: props.fontStretch,
      fontStyle: props.fontStyle,
      fontWeight: props.fontWeight,
      text: props.text,
      lineHeight: props.lineHeight,
      maxLines: props.maxLines,
      textBaseline: props.textBaseline,
      verticalAlign: props.verticalAlign,
      overflowSuffix: props.overflowSuffix
    });
    this.trState = textRendererState;
  }
  get width() {
    return this.props.width;
  }
  set width(value) {
    this.props.width = value;
    this.textRenderer.set.width(this.trState, value);
    if (this.contain === "none") {
      this.setUpdateType(UpdateType.Local);
    }
  }
  get height() {
    return this.props.height;
  }
  set height(value) {
    this.props.height = value;
    this.textRenderer.set.height(this.trState, value);
    if (this.contain !== "both") {
      this.setUpdateType(UpdateType.Local);
    }
  }
  get color() {
    return this.trState.props.color;
  }
  set color(value) {
    this.textRenderer.set.color(this.trState, value);
  }
  get text() {
    return this.trState.props.text;
  }
  set text(value) {
    this.textRenderer.set.text(this.trState, value);
  }
  get textRendererOverride() {
    return this._textRendererOverride;
  }
  set textRendererOverride(value) {
    this._textRendererOverride = value;
    this.textRenderer.destroyState(this.trState);
    const textRenderer = this.stage.resolveTextRenderer(this.trState.props, this._textRendererOverride);
    if (!textRenderer) {
      console.warn("Text Renderer not found for font", this.trState.props.fontFamily);
      return;
    }
    this.textRenderer = textRenderer;
    this.trState = this.createState(this.trState.props);
  }
  get fontSize() {
    return this.trState.props.fontSize;
  }
  set fontSize(value) {
    this.textRenderer.set.fontSize(this.trState, value);
  }
  get fontFamily() {
    return this.trState.props.fontFamily;
  }
  set fontFamily(value) {
    this.textRenderer.set.fontFamily(this.trState, value);
  }
  get fontStretch() {
    return this.trState.props.fontStretch;
  }
  set fontStretch(value) {
    this.textRenderer.set.fontStretch(this.trState, value);
  }
  get fontStyle() {
    return this.trState.props.fontStyle;
  }
  set fontStyle(value) {
    this.textRenderer.set.fontStyle(this.trState, value);
  }
  get fontWeight() {
    return this.trState.props.fontWeight;
  }
  set fontWeight(value) {
    this.textRenderer.set.fontWeight(this.trState, value);
  }
  get textAlign() {
    return this.trState.props.textAlign;
  }
  set textAlign(value) {
    this.textRenderer.set.textAlign(this.trState, value);
  }
  get contain() {
    return this.trState.props.contain;
  }
  set contain(value) {
    this.textRenderer.set.contain(this.trState, value);
  }
  get scrollable() {
    return this.trState.props.scrollable;
  }
  set scrollable(value) {
    this.textRenderer.set.scrollable(this.trState, value);
  }
  get scrollY() {
    return this.trState.props.scrollY;
  }
  set scrollY(value) {
    this.textRenderer.set.scrollY(this.trState, value);
  }
  get offsetY() {
    return this.trState.props.offsetY;
  }
  set offsetY(value) {
    this.textRenderer.set.offsetY(this.trState, value);
  }
  get letterSpacing() {
    return this.trState.props.letterSpacing;
  }
  set letterSpacing(value) {
    this.textRenderer.set.letterSpacing(this.trState, value);
  }
  get lineHeight() {
    return this.trState.props.lineHeight;
  }
  set lineHeight(value) {
    this.textRenderer.set.lineHeight(this.trState, value);
  }
  get maxLines() {
    return this.trState.props.maxLines;
  }
  set maxLines(value) {
    this.textRenderer.set.maxLines(this.trState, value);
  }
  get textBaseline() {
    return this.trState.props.textBaseline;
  }
  set textBaseline(value) {
    this.textRenderer.set.textBaseline(this.trState, value);
  }
  get verticalAlign() {
    return this.trState.props.verticalAlign;
  }
  set verticalAlign(value) {
    this.textRenderer.set.verticalAlign(this.trState, value);
  }
  get overflowSuffix() {
    return this.trState.props.overflowSuffix;
  }
  set overflowSuffix(value) {
    this.textRenderer.set.overflowSuffix(this.trState, value);
  }
  get debug() {
    return this.trState.props.debug;
  }
  set debug(value) {
    this.textRenderer.set.debug(this.trState, value);
  }
  update(delta, parentClippingRect) {
    super.update(delta, parentClippingRect);
    assertTruthy(this.globalTransform);
    this.textRenderer.set.x(this.trState, this.globalTransform.tx);
    this.textRenderer.set.y(this.trState, this.globalTransform.ty);
  }
  checkBasicRenderability() {
    if (this.worldAlpha === 0 || this.isOutOfBounds() === true) {
      return false;
    }
    if (this.trState && this.trState.props.text !== "") {
      return true;
    }
    return false;
  }
  setRenderable(isRenderable) {
    super.setRenderable(isRenderable);
    this.textRenderer.setIsRenderable(this.trState, isRenderable);
  }
  renderQuads(renderer2) {
    var _a2;
    assertTruthy(this.globalTransform);
    if (!this.textRenderer.renderQuads) {
      super.renderQuads(renderer2);
      return;
    }
    if (this.parentHasRenderTexture) {
      if (!renderer2.renderToTextureActive) {
        return;
      }
      if (this.parentRenderTexture !== renderer2.activeRttNode) {
        return;
      }
    }
    if (this.parentHasRenderTexture && ((_a2 = this.props.parent) == null ? void 0 : _a2.rtt)) {
      this.globalTransform = Matrix3d.identity();
      if (this.localTransform) {
        this.globalTransform.multiply(this.localTransform);
      }
    }
    assertTruthy(this.globalTransform);
    this.textRenderer.renderQuads(this.trState, this.globalTransform, this.clippingRect, this.worldAlpha, this.parentHasRenderTexture, this.framebufferDimensions);
  }
  /**
   * Destroy the node and cleanup all resources
   */
  destroy() {
    super.destroy();
    this.textRenderer.destroyState(this.trState);
  }
  /**
   * Resolve a text renderer and a new state based on the current text renderer props provided
   * @param props
   * @returns
   */
  createState(props) {
    const textRendererState = this.textRenderer.createState(props, this);
    textRendererState.emitter.on("loaded", this.onTextLoaded);
    textRendererState.emitter.on("failed", this.onTextFailed);
    this.textRenderer.scheduleUpdateState(textRendererState);
    return textRendererState;
  }
}
function santizeCustomDataMap(d) {
  const validTypes = {
    boolean: true,
    string: true,
    number: true,
    undefined: true
  };
  const keys = Object.keys(d);
  for (let i = 0; i < keys.length; i++) {
    const key2 = keys[i];
    if (!key2) {
      continue;
    }
    const value = d[key2];
    const valueType = typeof value;
    if (valueType === "string" && value.length > 2048) {
      console.warn("Custom Data value for ".concat(key2, " is too long, it will be truncated to 2048 characters"));
      d[key2] = value.substring(0, 2048);
    }
    if (!validTypes[valueType]) {
      console.warn("Custom Data value for ".concat(key2, " is not a boolean, string, or number, it will be ignored"));
      delete d[key2];
    }
  }
  return d;
}
const bufferMemory = 2e6;
class Stage {
  /**
   * Stage constructor
   */
  constructor(options) {
    __publicField(this, "options");
    /// Module Instances
    __publicField(this, "animationManager");
    __publicField(this, "txManager");
    __publicField(this, "txMemManager");
    __publicField(this, "fontManager");
    __publicField(this, "textRenderers");
    __publicField(this, "shManager");
    __publicField(this, "renderer");
    __publicField(this, "root");
    __publicField(this, "boundsMargin");
    __publicField(this, "defShaderCtr");
    __publicField(this, "strictBound");
    __publicField(this, "preloadBound");
    __publicField(this, "strictBounds");
    __publicField(this, "defaultTexture", null);
    /**
     * Renderer Event Bus for the Stage to emit events onto
     *
     * @remarks
     * In reality this is just the RendererMain instance, which is an EventEmitter.
     * this allows us to directly emit events from the Stage to RendererMain
     * without having to set up forwarding handlers.
     */
    __publicField(this, "eventBus");
    /// State
    __publicField(this, "deltaTime", 0);
    __publicField(this, "lastFrameTime", 0);
    __publicField(this, "currentFrameTime", 0);
    __publicField(this, "fpsNumFrames", 0);
    __publicField(this, "fpsElapsedTime", 0);
    __publicField(this, "numQuadsRendered", 0);
    __publicField(this, "renderRequested", false);
    __publicField(this, "frameEventQueue", []);
    __publicField(this, "fontResolveMap", {});
    /// Debug data
    __publicField(this, "contextSpy", null);
    this.options = options;
    const { canvas, clearColor, appWidth, appHeight, boundsMargin, enableContextSpy, forceWebGL2, numImageWorkers: numImageWorkers2, textureMemory, renderEngine, fontEngines, createImageBitmapSupport } = options;
    this.eventBus = options.eventBus;
    this.txManager = new CoreTextureManager(this, {
      numImageWorkers: numImageWorkers2,
      createImageBitmapSupport
    });
    this.txManager.on("initialized", () => {
      this.requestRender();
    });
    this.txMemManager = new TextureMemoryManager(this, textureMemory);
    this.shManager = new CoreShaderManager();
    this.animationManager = new AnimationManager();
    this.contextSpy = enableContextSpy ? new ContextSpy() : null;
    this.strictBounds = options.strictBounds;
    let bm = [0, 0, 0, 0];
    if (boundsMargin) {
      bm = Array.isArray(boundsMargin) ? boundsMargin : [boundsMargin, boundsMargin, boundsMargin, boundsMargin];
    }
    this.boundsMargin = bm;
    this.strictBound = createBound(0, 0, appWidth, appHeight);
    this.preloadBound = createPreloadBounds(this.strictBound, bm);
    const rendererOptions = {
      stage: this,
      canvas,
      pixelRatio: options.devicePhysicalPixelRatio * options.deviceLogicalPixelRatio,
      clearColor: clearColor != null ? clearColor : 4278190080,
      bufferMemory,
      txManager: this.txManager,
      txMemManager: this.txMemManager,
      shManager: this.shManager,
      contextSpy: this.contextSpy,
      forceWebGL2
    };
    this.renderer = new renderEngine(rendererOptions);
    const renderMode = this.renderer.mode || "webgl";
    this.createDefaultTexture();
    this.defShaderCtr = this.renderer.getDefShaderCtr();
    setPremultiplyMode(renderMode);
    this.txManager.renderer = this.renderer;
    this.textRenderers = {};
    fontEngines.forEach((fontEngineConstructor) => {
      const fontEngineInstance = new fontEngineConstructor(this);
      const className = fontEngineInstance.type;
      if (className === "sdf" && renderMode === "canvas") {
        console.warn("SdfTextRenderer is not compatible with Canvas renderer. Skipping...");
        return;
      }
      if (fontEngineInstance instanceof TextRenderer) {
        if (className === "canvas") {
          this.textRenderers["canvas"] = fontEngineInstance;
        } else if (className === "sdf") {
          this.textRenderers["sdf"] = fontEngineInstance;
        }
      }
    });
    if (Object.keys(this.textRenderers).length === 0) {
      console.warn("No text renderers available. Your text will not render.");
    }
    this.fontManager = new TrFontManager(this.textRenderers);
    const rootNode2 = new CoreNode(this, {
      x: 0,
      y: 0,
      width: appWidth,
      height: appHeight,
      alpha: 1,
      autosize: false,
      boundsMargin: null,
      clipping: false,
      color: 0,
      colorTop: 0,
      colorBottom: 0,
      colorLeft: 0,
      colorRight: 0,
      colorTl: 0,
      colorTr: 0,
      colorBl: 0,
      colorBr: 0,
      zIndex: 0,
      zIndexLocked: 0,
      scaleX: 1,
      scaleY: 1,
      mountX: 0,
      mountY: 0,
      mount: 0,
      pivot: 0.5,
      pivotX: 0.5,
      pivotY: 0.5,
      rotation: 0,
      parent: null,
      texture: null,
      textureOptions: {},
      shader: this.defShaderCtr,
      rtt: false,
      src: null,
      scale: 1,
      preventCleanup: false,
      strictBounds: this.strictBounds
    });
    this.root = rootNode2;
    {
      startLoop(this);
    }
  }
  setClearColor(color) {
    this.renderer.updateClearColor(color);
    this.renderRequested = true;
  }
  updateFrameTime() {
    const newFrameTime = getTimeStamp();
    this.lastFrameTime = this.currentFrameTime;
    this.currentFrameTime = newFrameTime;
    this.deltaTime = !this.lastFrameTime ? 100 / 6 : newFrameTime - this.lastFrameTime;
    this.txManager.frameTime = newFrameTime;
    this.txMemManager.frameTime = newFrameTime;
    this.eventBus.emit("frameTick", {
      time: this.currentFrameTime,
      delta: this.deltaTime
    });
  }
  /**
   * Create default PixelTexture
   */
  createDefaultTexture() {
    console.log("Creating default texture");
    this.defaultTexture = this.txManager.createTexture("ColorTexture", {
      color: 4294967295
    });
    assertTruthy(this.defaultTexture instanceof ColorTexture);
    this.txManager.loadTexture(this.defaultTexture, true);
    this.defaultTexture.setRenderableOwner(this, true);
    this.defaultTexture.once("loaded", () => {
      this.requestRender();
    });
  }
  /**
   * Update animations
   */
  updateAnimations() {
    const { animationManager } = this;
    if (!this.root) {
      return;
    }
    animationManager.update(this.deltaTime);
  }
  /**
   * Check if the scene has updates
   */
  hasSceneUpdates() {
    return !!this.root.updateType || this.renderRequested || this.txManager.hasUpdates();
  }
  /**
   * Start a new frame draw
   */
  drawFrame() {
    const { renderer: renderer2, renderRequested } = this;
    if (this.root.updateType !== 0) {
      this.root.update(this.deltaTime, this.root.clippingRect);
    }
    this.txManager.processSome(this.options.textureProcessingTimeLimit);
    renderer2.reset();
    if (this.txMemManager.criticalCleanupRequested === true) {
      this.txMemManager.cleanup(false);
      if (this.txMemManager.criticalCleanupRequested === true) {
        this.txMemManager.cleanup(true);
      }
    }
    if (renderer2.rttNodes.length > 0) {
      renderer2.renderRTTNodes();
    }
    this.addQuads(this.root);
    renderer2 == null ? void 0 : renderer2.render();
    this.calculateFps();
    this.calculateQuads();
    if (renderRequested) {
      this.renderRequested = false;
    }
  }
  /**
   * Queue an event to be emitted after the current/next frame is rendered
   *
   * @remarks
   * When we are operating in the context of the render loop, we may want to
   * emit events that are related to the current frame. However, we generally do
   * NOT want to emit events directly in the middle of the render loop, since
   * this could enable event handlers to modify the scene graph and cause
   * unexpected behavior. Instead, we queue up events to be emitted and then
   * flush the queue after the frame has been rendered.
   *
   * @param name
   * @param data
   */
  queueFrameEvent(name, data) {
    this.frameEventQueue.push([name, data]);
  }
  /**
   * Emit all queued frame events
   *
   * @remarks
   * This method should be called after the frame has been rendered to emit
   * all events that were queued during the frame.
   *
   * See {@link queueFrameEvent} for more information.
   */
  flushFrameEvents() {
    for (const [name, data] of this.frameEventQueue) {
      this.eventBus.emit(name, data);
    }
    this.frameEventQueue = [];
  }
  calculateFps() {
    var _a2, _b, _c;
    const { fpsUpdateInterval } = this.options;
    if (fpsUpdateInterval) {
      this.fpsNumFrames++;
      this.fpsElapsedTime += this.deltaTime;
      if (this.fpsElapsedTime >= fpsUpdateInterval) {
        const fps2 = Math.round(this.fpsNumFrames * 1e3 / this.fpsElapsedTime);
        this.fpsNumFrames = 0;
        this.fpsElapsedTime = 0;
        this.queueFrameEvent("fpsUpdate", {
          fps: fps2,
          contextSpyData: (_b = (_a2 = this.contextSpy) == null ? void 0 : _a2.getData()) != null ? _b : null
        });
        (_c = this.contextSpy) == null ? void 0 : _c.reset();
      }
    }
  }
  calculateQuads() {
    const quads = this.renderer.getQuadCount();
    if (quads && quads !== this.numQuadsRendered) {
      this.numQuadsRendered = quads;
      this.queueFrameEvent("quadsUpdate", {
        quads
      });
    }
  }
  addQuads(node) {
    assertTruthy(this.renderer);
    if (node.isRenderable === true) {
      node.renderQuads(this.renderer);
    }
    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i];
      if (child === void 0) {
        continue;
      }
      if (child.worldAlpha === 0 || child.strictBounds === true && child.renderState === CoreNodeRenderState.OutOfBounds) {
        continue;
      }
      this.addQuads(child);
    }
  }
  /**
   * Request a render pass without forcing an update
   */
  requestRender() {
    this.renderRequested = true;
  }
  /**
   * Given a font name, and possible renderer override, return the best compatible text renderer.
   *
   * @remarks
   * Will try to return a canvas renderer if no other suitable renderer can be resolved.
   *
   * @param fontFamily
   * @param textRendererOverride
   * @returns
   */
  resolveTextRenderer(trProps, textRendererOverride = null) {
    const fontCacheString = "".concat(trProps.fontFamily).concat(trProps.fontStyle).concat(trProps.fontWeight).concat(trProps.fontStretch).concat(textRendererOverride ? textRendererOverride : "");
    if (this.fontResolveMap[fontCacheString] !== void 0) {
      return this.fontResolveMap[fontCacheString];
    }
    let rendererId = textRendererOverride;
    let overrideFallback = false;
    if (rendererId) {
      const possibleRenderer = this.textRenderers[rendererId];
      if (!possibleRenderer) {
        console.warn("Text renderer override '".concat(rendererId, "' not found."));
        rendererId = null;
        overrideFallback = true;
      } else if (!possibleRenderer.canRenderFont(trProps)) {
        console.warn("Cannot use override text renderer '".concat(rendererId, "' for font"), trProps);
        rendererId = null;
        overrideFallback = true;
      }
    }
    if (!rendererId) {
      for (const [trId, tr] of Object.entries(this.textRenderers)) {
        if (tr.canRenderFont(trProps)) {
          rendererId = trId;
          break;
        }
      }
      if (!rendererId && this.textRenderers.canvas !== void 0) {
        rendererId = "canvas";
      }
    }
    if (overrideFallback) {
      console.warn("Falling back to text renderer ".concat(String(rendererId)));
    }
    if (!rendererId) {
      return null;
    }
    const resolvedTextRenderer = this.textRenderers[rendererId];
    this.fontResolveMap[fontCacheString] = resolvedTextRenderer;
    return resolvedTextRenderer;
  }
  /**
   * Create a shader controller instance
   *
   * @param type
   * @param props
   * @returns
   */
  createShaderCtr(type, props) {
    return this.shManager.loadShader(type, props);
  }
  createNode(props) {
    const resolvedProps = this.resolveNodeDefaults(props);
    return new CoreNode(this, resolvedProps);
  }
  createTextNode(props) {
    var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r;
    const fontSize = (_a2 = props.fontSize) != null ? _a2 : 16;
    const resolvedProps = {
      ...this.resolveNodeDefaults(props),
      text: (_b = props.text) != null ? _b : "",
      textRendererOverride: (_c = props.textRendererOverride) != null ? _c : null,
      fontSize,
      fontFamily: (_d = props.fontFamily) != null ? _d : "sans-serif",
      fontStyle: (_e = props.fontStyle) != null ? _e : "normal",
      fontWeight: (_f = props.fontWeight) != null ? _f : "normal",
      fontStretch: (_g = props.fontStretch) != null ? _g : "normal",
      textAlign: (_h = props.textAlign) != null ? _h : "left",
      contain: (_i = props.contain) != null ? _i : "none",
      scrollable: (_j = props.scrollable) != null ? _j : false,
      scrollY: (_k = props.scrollY) != null ? _k : 0,
      offsetY: (_l = props.offsetY) != null ? _l : 0,
      letterSpacing: (_m = props.letterSpacing) != null ? _m : 0,
      lineHeight: props.lineHeight,
      // `undefined` is a valid value
      maxLines: (_n = props.maxLines) != null ? _n : 0,
      textBaseline: (_o = props.textBaseline) != null ? _o : "alphabetic",
      verticalAlign: (_p = props.verticalAlign) != null ? _p : "middle",
      overflowSuffix: (_q = props.overflowSuffix) != null ? _q : "...",
      debug: (_r = props.debug) != null ? _r : {},
      shaderProps: null
    };
    const resolvedTextRenderer = this.resolveTextRenderer(resolvedProps, props.textRendererOverride);
    if (!resolvedTextRenderer) {
      throw new Error("No compatible text renderer found for ".concat(resolvedProps.fontFamily));
    }
    return new CoreTextNode(this, resolvedProps, resolvedTextRenderer);
  }
  setBoundsMargin(value) {
    this.boundsMargin = Array.isArray(value) ? value : [value, value, value, value];
    this.root.setUpdateType(UpdateType.RenderBounds);
  }
  /**
   * Resolves the default property values for a Node
   *
   * @remarks
   * This method is used internally by the RendererMain to resolve the default
   * property values for a Node. It is exposed publicly so that it can be used
   * by Core Driver implementations.
   *
   * @param props
   * @returns
   */
  resolveNodeDefaults(props) {
    var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z;
    const color = (_a2 = props.color) != null ? _a2 : 4294967295;
    const colorTl = (_d = (_c = (_b = props.colorTl) != null ? _b : props.colorTop) != null ? _c : props.colorLeft) != null ? _d : color;
    const colorTr = (_g = (_f = (_e = props.colorTr) != null ? _e : props.colorTop) != null ? _f : props.colorRight) != null ? _g : color;
    const colorBl = (_j = (_i = (_h = props.colorBl) != null ? _h : props.colorBottom) != null ? _i : props.colorLeft) != null ? _j : color;
    const colorBr = (_m = (_l = (_k = props.colorBr) != null ? _k : props.colorBottom) != null ? _l : props.colorRight) != null ? _m : color;
    let data = {};
    if (this.options.inspector === true) {
      data = santizeCustomDataMap((_n = props.data) != null ? _n : {});
    }
    return {
      x: (_o = props.x) != null ? _o : 0,
      y: (_p = props.y) != null ? _p : 0,
      width: (_q = props.width) != null ? _q : 0,
      height: (_r = props.height) != null ? _r : 0,
      alpha: (_s = props.alpha) != null ? _s : 1,
      autosize: (_t = props.autosize) != null ? _t : false,
      boundsMargin: (_u = props.boundsMargin) != null ? _u : null,
      clipping: (_v = props.clipping) != null ? _v : false,
      color,
      colorTop: (_w = props.colorTop) != null ? _w : color,
      colorBottom: (_x = props.colorBottom) != null ? _x : color,
      colorLeft: (_y = props.colorLeft) != null ? _y : color,
      colorRight: (_z = props.colorRight) != null ? _z : color,
      colorBl,
      colorBr,
      colorTl,
      colorTr,
      zIndex: (_A = props.zIndex) != null ? _A : 0,
      zIndexLocked: (_B = props.zIndexLocked) != null ? _B : 0,
      parent: (_C = props.parent) != null ? _C : null,
      texture: (_D = props.texture) != null ? _D : null,
      textureOptions: (_E = props.textureOptions) != null ? _E : {},
      shader: (_F = props.shader) != null ? _F : this.defShaderCtr,
      // Since setting the `src` will trigger a texture load, we need to set it after
      // we set the texture. Otherwise, problems happen.
      src: (_G = props.src) != null ? _G : null,
      srcHeight: props.srcHeight,
      srcWidth: props.srcWidth,
      srcX: props.srcX,
      srcY: props.srcY,
      scale: (_H = props.scale) != null ? _H : null,
      scaleX: (_J = (_I = props.scaleX) != null ? _I : props.scale) != null ? _J : 1,
      scaleY: (_L = (_K = props.scaleY) != null ? _K : props.scale) != null ? _L : 1,
      mount: (_M = props.mount) != null ? _M : 0,
      mountX: (_O = (_N = props.mountX) != null ? _N : props.mount) != null ? _O : 0,
      mountY: (_Q = (_P = props.mountY) != null ? _P : props.mount) != null ? _Q : 0,
      pivot: (_R = props.pivot) != null ? _R : 0.5,
      pivotX: (_T = (_S = props.pivotX) != null ? _S : props.pivot) != null ? _T : 0.5,
      pivotY: (_V = (_U = props.pivotY) != null ? _U : props.pivot) != null ? _V : 0.5,
      rotation: (_W = props.rotation) != null ? _W : 0,
      rtt: (_X = props.rtt) != null ? _X : false,
      data,
      preventCleanup: (_Y = props.preventCleanup) != null ? _Y : false,
      imageType: props.imageType,
      strictBounds: (_Z = props.strictBounds) != null ? _Z : this.strictBounds
    };
  }
  /**
   * Cleanup Orphaned Textures
   *
   * @remarks
   * This method is used to cleanup orphaned textures that are no longer in use.
   */
  cleanup(aggressive) {
    this.txMemManager.cleanup(aggressive);
  }
}
class RendererMain extends EventEmitter {
  /**
   * Constructs a new Renderer instance
   *
   * @param settings Renderer settings
   * @param target Element ID or HTMLElement to insert the canvas into
   * @param driver Core Driver to use
   */
  constructor(settings, target) {
    var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
    super();
    __publicField(this, "root");
    __publicField(this, "canvas");
    __publicField(this, "settings");
    __publicField(this, "stage");
    __publicField(this, "inspector", null);
    const resolvedTxSettings = {
      criticalThreshold: ((_a2 = settings.textureMemory) == null ? void 0 : _a2.criticalThreshold) || 124e6,
      targetThresholdLevel: ((_b = settings.textureMemory) == null ? void 0 : _b.targetThresholdLevel) || 0.5,
      cleanupInterval: ((_c = settings.textureMemory) == null ? void 0 : _c.cleanupInterval) || 5e3,
      debugLogging: ((_d = settings.textureMemory) == null ? void 0 : _d.debugLogging) || false,
      baselineMemoryAllocation: ((_e = settings.textureMemory) == null ? void 0 : _e.baselineMemoryAllocation) || 26e6,
      doNotExceedCriticalThreshold: ((_f = settings.textureMemory) == null ? void 0 : _f.doNotExceedCriticalThreshold) || false
    };
    const resolvedSettings = {
      appWidth: settings.appWidth || 1920,
      appHeight: settings.appHeight || 1080,
      textureMemory: resolvedTxSettings,
      boundsMargin: settings.boundsMargin || 0,
      deviceLogicalPixelRatio: settings.deviceLogicalPixelRatio || 1,
      devicePhysicalPixelRatio: settings.devicePhysicalPixelRatio || window.devicePixelRatio,
      clearColor: (_g = settings.clearColor) != null ? _g : 0,
      fpsUpdateInterval: settings.fpsUpdateInterval || 0,
      numImageWorkers: settings.numImageWorkers !== void 0 ? settings.numImageWorkers : 2,
      enableContextSpy: (_h = settings.enableContextSpy) != null ? _h : false,
      forceWebGL2: (_i = settings.forceWebGL2) != null ? _i : false,
      inspector: (_j = settings.inspector) != null ? _j : false,
      renderEngine: settings.renderEngine,
      quadBufferSize: (_k = settings.quadBufferSize) != null ? _k : 4 * 1024 * 1024,
      fontEngines: settings.fontEngines,
      strictBounds: (_l = settings.strictBounds) != null ? _l : true,
      textureProcessingTimeLimit: settings.textureProcessingTimeLimit || 10,
      canvas: settings.canvas || document.createElement("canvas"),
      createImageBitmapSupport: settings.createImageBitmapSupport || "full"
    };
    this.settings = resolvedSettings;
    const { appWidth, appHeight, deviceLogicalPixelRatio: deviceLogicalPixelRatio2, devicePhysicalPixelRatio, inspector, canvas } = resolvedSettings;
    const deviceLogicalWidth = appWidth * deviceLogicalPixelRatio2;
    const deviceLogicalHeight = appHeight * deviceLogicalPixelRatio2;
    this.canvas = canvas;
    canvas.width = deviceLogicalWidth * devicePhysicalPixelRatio;
    canvas.height = deviceLogicalHeight * devicePhysicalPixelRatio;
    canvas.style.width = "".concat(deviceLogicalWidth, "px");
    canvas.style.height = "".concat(deviceLogicalHeight, "px");
    this.stage = new Stage({
      appWidth: this.settings.appWidth,
      appHeight: this.settings.appHeight,
      boundsMargin: this.settings.boundsMargin,
      clearColor: this.settings.clearColor,
      canvas: this.canvas,
      deviceLogicalPixelRatio: this.settings.deviceLogicalPixelRatio,
      devicePhysicalPixelRatio: this.settings.devicePhysicalPixelRatio,
      enableContextSpy: this.settings.enableContextSpy,
      forceWebGL2: this.settings.forceWebGL2,
      fpsUpdateInterval: this.settings.fpsUpdateInterval,
      numImageWorkers: this.settings.numImageWorkers,
      renderEngine: this.settings.renderEngine,
      textureMemory: resolvedTxSettings,
      eventBus: this,
      quadBufferSize: this.settings.quadBufferSize,
      fontEngines: this.settings.fontEngines,
      inspector: this.settings.inspector !== null,
      strictBounds: this.settings.strictBounds,
      textureProcessingTimeLimit: this.settings.textureProcessingTimeLimit,
      createImageBitmapSupport: this.settings.createImageBitmapSupport
    });
    this.root = this.stage.root;
    let targetEl;
    if (typeof target === "string") {
      targetEl = document.getElementById(target);
    } else {
      targetEl = target;
    }
    if (!targetEl) {
      throw new Error("Could not find target element");
    }
    targetEl.appendChild(canvas);
  }
  /**
   * Create a new scene graph node
   *
   * @remarks
   * A node is the main graphical building block of the Renderer scene graph. It
   * can be a container for other nodes, or it can be a leaf node that renders a
   * solid color, gradient, image, or specific texture, using a specific shader.
   *
   * To create a text node, see {@link createTextNode}.
   *
   * See {@link CoreNode} for more details.
   *
   * @param props
   * @returns
   */
  createNode(props) {
    const node = this.stage.createNode(props);
    if (this.inspector) {
      return this.inspector.createNode(node);
    }
    return node;
  }
  /**
   * Create a new scene graph text node
   *
   * @remarks
   * A text node is the second graphical building block of the Renderer scene
   * graph. It renders text using a specific text renderer that is automatically
   * chosen based on the font requested and what type of fonts are installed
   * into an app.
   *
   * See {@link ITextNode} for more details.
   *
   * @param props
   * @returns
   */
  createTextNode(props) {
    const textNode = this.stage.createTextNode(props);
    if (this.inspector) {
      return this.inspector.createTextNode(textNode);
    }
    return textNode;
  }
  /**
   * Destroy a node
   *
   * @remarks
   * This method destroys a node
   *
   * @param node
   * @returns
   */
  destroyNode(node) {
    if (this.inspector) {
      this.inspector.destroyNode(node.id);
    }
    return node.destroy();
  }
  /**
   * Create a new texture reference
   *
   * @remarks
   * This method creates a new reference to a texture. The texture is not
   * loaded until it is used on a node.
   *
   * It can be assigned to a node's `texture` property, or it can be used
   * when creating a SubTexture.
   *
   * @param textureType
   * @param props
   * @param options
   * @returns
   */
  createTexture(textureType, props) {
    return this.stage.txManager.createTexture(textureType, props);
  }
  /**
   * Create a new shader controller for a shader type
   *
   * @remarks
   * This method creates a new Shader Controller for a specific shader type.
   *
   * If the shader has not been loaded yet, it will be loaded. Otherwise, the
   * existing shader will be reused.
   *
   * It can be assigned to a Node's `shader` property.
   *
   * @param shaderType
   * @param props
   * @returns
   */
  createShader(shaderType, props) {
    return this.stage.shManager.loadShader(shaderType, props);
  }
  /**
   * Create a new Dynamic Shader controller
   *
   * @remarks
   * A Dynamic Shader is a shader that can be composed of an array of mulitple
   * effects. Each effect can be animated or changed after creation (provided
   * the effect is given a name).
   *
   * Example:
   * ```ts
   * renderer.createNode({
   *   shader: renderer.createDynamicShader([
   *     renderer.createEffect('radius', {
   *       radius: 0
   *     }, 'effect1'),
   *     renderer.createEffect('border', {
   *       color: 0xff00ffff,
   *       width: 10,
   *     }, 'effect2'),
   *   ]),
   * });
   * ```
   *
   * @param effects
   * @returns
   */
  createDynamicShader(effects) {
    return this.stage.shManager.loadDynamicShader({
      effects
    });
  }
  /**
   * Create an effect to be used in a Dynamic Shader
   *
   * @remark
   * The {name} parameter is optional but required if you want to animate the effect
   * or change the effect's properties after creation.
   *
   * See {@link createDynamicShader} for an example.
   *
   * @param type
   * @param props
   * @param name
   * @returns
   */
  createEffect(type, props, name) {
    return {
      name,
      type,
      props
    };
  }
  /**
   * Get a Node by its ID
   *
   * @param id
   * @returns
   */
  getNodeById(id) {
    var _a2;
    const root = (_a2 = this.stage) == null ? void 0 : _a2.root;
    if (!root) {
      return null;
    }
    const findNode = (node) => {
      if (node.id === id) {
        return node;
      }
      for (const child of node.children) {
        const found = findNode(child);
        if (found) {
          return found;
        }
      }
      return null;
    };
    return findNode(root);
  }
  toggleFreeze() {
    throw new Error("Not implemented");
  }
  advanceFrame() {
    throw new Error("Not implemented");
  }
  getBufferInfo() {
    return this.stage.renderer.getBufferInfo();
  }
  /**
   * Re-render the current frame without advancing any running animations.
   *
   * @remarks
   * Any state changes will be reflected in the re-rendered frame. Useful for
   * debugging.
   *
   * May not do anything if the render loop is running on a separate worker.
   */
  rerender() {
    this.stage.requestRender();
  }
  /**
   * Cleanup textures that are not being used
   *
   * @param aggressive - If true, will cleanup all textures, regardless of render status
   *
   * @remarks
   * This can be used to free up GFX memory used by textures that are no longer
   * being displayed.
   *
   * This routine is also called automatically when the memory used by textures
   * exceeds the critical threshold on frame generation **OR** when the renderer
   * is idle and the memory used by textures exceeds the target threshold.
   *
   * **NOTE**: This is a heavy operation and should be used sparingly.
   * **NOTE2**: This will not cleanup textures that are currently being displayed.
   * **NOTE3**: This will not cleanup textures that are marked as `preventCleanup`.
   * **NOTE4**: This has nothing to do with the garbage collection of JavaScript.
   */
  cleanup(aggressive = false) {
    this.stage.cleanup(aggressive);
  }
  /**
   * Sets the clear color for the stage.
   *
   * @param color - The color to set as the clear color.
   */
  setClearColor(color) {
    this.stage.setClearColor(color);
  }
}
class TrFontFace extends EventEmitter {
  constructor(options) {
    super();
    __publicField(this, "fontFamily");
    __publicField(this, "descriptors");
    __publicField(this, "loaded", false);
    __publicField(this, "metrics", null);
    const { fontFamily, descriptors, metrics } = options;
    if (metrics) {
      this.metrics = {
        ascender: metrics.ascender / metrics.unitsPerEm,
        descender: metrics.descender / metrics.unitsPerEm,
        lineGap: metrics.lineGap / metrics.unitsPerEm
      };
    }
    this.fontFamily = fontFamily;
    this.descriptors = {
      style: "normal",
      weight: "normal",
      stretch: "normal",
      ...descriptors
    };
  }
  /**
   * Convert a TrFontFaceDescriptors to a FontFaceDescriptors which differ slightly
   *
   * @param descriptors
   * @returns
   */
  static convertToCssFontFaceDescriptors(descriptors) {
    return {
      style: descriptors.style,
      weight: typeof descriptors.weight === "number" ? "".concat(descriptors.weight) : descriptors.weight,
      stretch: descriptors.stretch,
      unicodeRange: descriptors.unicodeRange,
      featureSettings: descriptors.featureSettings,
      display: descriptors.display
    };
  }
}
class WebTrFontFace extends TrFontFace {
  constructor(options) {
    super(options);
    __publicField(this, "fontFace");
    __publicField(this, "fontUrl");
    const { fontFamily, fontUrl } = options;
    const fontUrlWithoutParentheses = fontUrl.replace(/\(|\)/g, "");
    const determinedDescriptors = this.descriptors;
    let cssDescriptors = {
      style: determinedDescriptors.style,
      weight: typeof determinedDescriptors.weight === "number" ? "".concat(determinedDescriptors.weight) : determinedDescriptors.weight,
      stretch: determinedDescriptors.stretch,
      unicodeRange: determinedDescriptors.unicodeRange,
      featureSettings: determinedDescriptors.featureSettings,
      display: determinedDescriptors.display
    };
    for (const k in cssDescriptors) {
      const key2 = k;
      if (cssDescriptors[key2] === void 0) {
        delete cssDescriptors[key2];
      }
    }
    const fontFace = new FontFace(fontFamily, "url(".concat(fontUrlWithoutParentheses, ")"), cssDescriptors);
    if (fontUrlWithoutParentheses.length > 0) {
      fontFace.load().then(() => {
        this.loaded = true;
        this.emit("loaded");
      }).catch(console.error);
    } else {
      this.loaded = true;
      this.emit("loaded");
    }
    this.fontFace = fontFace;
    this.fontUrl = fontUrl;
  }
}
class CoreRenderOp {
}
class WebGlCoreRenderOp extends CoreRenderOp {
  constructor(glw, options, buffers, shader, shaderProps, alpha, clippingRect, dimensions, bufferIdx, zIndex, renderToTexture, parentHasRenderTexture, framebufferDimensions) {
    super();
    __publicField(this, "glw");
    __publicField(this, "options");
    __publicField(this, "buffers");
    __publicField(this, "shader");
    __publicField(this, "shaderProps");
    __publicField(this, "alpha");
    __publicField(this, "clippingRect");
    __publicField(this, "dimensions");
    __publicField(this, "bufferIdx");
    __publicField(this, "zIndex");
    __publicField(this, "renderToTexture");
    __publicField(this, "parentHasRenderTexture");
    __publicField(this, "framebufferDimensions");
    __publicField(this, "length", 0);
    __publicField(this, "numQuads", 0);
    __publicField(this, "textures", []);
    __publicField(this, "maxTextures");
    this.glw = glw;
    this.options = options;
    this.buffers = buffers;
    this.shader = shader;
    this.shaderProps = shaderProps;
    this.alpha = alpha;
    this.clippingRect = clippingRect;
    this.dimensions = dimensions;
    this.bufferIdx = bufferIdx;
    this.zIndex = zIndex;
    this.renderToTexture = renderToTexture;
    this.parentHasRenderTexture = parentHasRenderTexture;
    this.framebufferDimensions = framebufferDimensions;
    this.maxTextures = shader.supportsIndexedTextures ? glw.getParameter(glw.MAX_VERTEX_TEXTURE_IMAGE_UNITS) : 1;
  }
  addTexture(texture) {
    const { textures, maxTextures } = this;
    let existingIdx = -1;
    const texturesLength = textures.length;
    for (let i = 0; i < texturesLength; i++) {
      const t = textures[i];
      if (t === texture) {
        existingIdx = i;
        break;
      }
    }
    if (existingIdx !== -1) {
      return existingIdx;
    }
    if (texturesLength >= maxTextures) {
      return 4294967295;
    }
    this.textures.push(texture);
    return texturesLength;
  }
  draw() {
    const { glw, shader, shaderProps, options } = this;
    const { shManager } = options;
    shManager.useShader(shader);
    shader.bindRenderOp(this, shaderProps);
    const quadIdx = this.bufferIdx / 24 * 6 * 2;
    if (this.clippingRect.valid) {
      const { x, y, width, height } = this.clippingRect;
      const pixelRatio = this.parentHasRenderTexture ? 1 : options.pixelRatio;
      const canvasHeight = options.canvas.height;
      const clipX = Math.round(x * pixelRatio);
      const clipWidth = Math.round(width * pixelRatio);
      const clipHeight = Math.round(height * pixelRatio);
      let clipY = Math.round(canvasHeight - clipHeight - y * pixelRatio);
      if (this.parentHasRenderTexture) {
        clipY = this.framebufferDimensions ? this.framebufferDimensions.height - this.dimensions.height : 0;
      }
      glw.setScissorTest(true);
      glw.scissor(clipX, clipY, clipWidth, clipHeight);
    } else {
      glw.setScissorTest(false);
    }
    glw.drawElements(glw.TRIANGLES, 6 * this.numQuads, glw.UNSIGNED_SHORT, quadIdx);
  }
}
function getWebGlParameters(glw) {
  const params2 = {
    MAX_RENDERBUFFER_SIZE: 0,
    MAX_TEXTURE_SIZE: 0,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
    MAX_VIEWPORT_DIMS: 0,
    // Code below will replace this with an Int32Array
    MAX_VERTEX_TEXTURE_IMAGE_UNITS: 0,
    MAX_TEXTURE_IMAGE_UNITS: 0,
    MAX_COMBINED_TEXTURE_IMAGE_UNITS: 0,
    MAX_VERTEX_ATTRIBS: 0,
    MAX_VARYING_VECTORS: 0,
    MAX_VERTEX_UNIFORM_VECTORS: 0,
    MAX_FRAGMENT_UNIFORM_VECTORS: 0
  };
  const keys = Object.keys(params2);
  keys.forEach((key2) => {
    params2[key2] = glw.getParameter(glw[key2]);
  });
  return params2;
}
function getWebGlExtensions(glw) {
  const extensions = {
    ANGLE_instanced_arrays: null,
    WEBGL_compressed_texture_s3tc: null,
    WEBGL_compressed_texture_astc: null,
    WEBGL_compressed_texture_etc: null,
    WEBGL_compressed_texture_etc1: null,
    WEBGL_compressed_texture_pvrtc: null,
    WEBKIT_WEBGL_compressed_texture_pvrtc: null,
    WEBGL_compressed_texture_s3tc_srgb: null,
    OES_vertex_array_object: null
  };
  const keys = Object.keys(extensions);
  keys.forEach((key2) => {
    extensions[key2] = glw.getExtension(key2);
  });
  return extensions;
}
function createIndexBuffer(glw, size) {
  const maxQuads = ~~(size / 80);
  const indices = new Uint16Array(maxQuads * 6);
  for (let i = 0, j = 0; i < maxQuads; i += 6, j += 4) {
    indices[i] = j;
    indices[i + 1] = j + 1;
    indices[i + 2] = j + 2;
    indices[i + 3] = j + 2;
    indices[i + 4] = j + 1;
    indices[i + 5] = j + 3;
  }
  const buffer = glw.createBuffer();
  glw.elementArrayBufferData(buffer, indices, glw.STATIC_DRAW);
}
function isHTMLImageElement(obj) {
  return obj !== null && (typeof obj === "object" && obj.constructor && obj.constructor.name === "HTMLImageElement" || typeof HTMLImageElement !== "undefined" && obj instanceof HTMLImageElement);
}
const TRANSPARENT_TEXTURE_DATA = new Uint8Array([0, 0, 0, 0]);
class WebGlCoreCtxTexture extends CoreContextTexture {
  constructor(glw, memManager, textureSource) {
    super(memManager, textureSource);
    __publicField(this, "glw");
    __publicField(this, "_nativeCtxTexture", null);
    __publicField(this, "_w", 0);
    __publicField(this, "_h", 0);
    this.glw = glw;
  }
  get ctxTexture() {
    if (this.state === "freed") {
      this.load();
      return null;
    }
    assertTruthy(this._nativeCtxTexture);
    return this._nativeCtxTexture;
  }
  get w() {
    return this._w;
  }
  get h() {
    return this._h;
  }
  /**
   * Load the texture data from the Texture source and upload it to the GPU
   *
   * @remarks
   * This method is called automatically when accessing the ctxTexture property
   * if the texture hasn't been loaded yet. But it can also be called manually
   * to force the texture to be pre-loaded prior to accessing the ctxTexture
   * property.
   */
  load() {
    if (this.state === "loading" || this.state === "loaded") {
      return;
    }
    this.state = "loading";
    this.textureSource.setState("loading");
    this._nativeCtxTexture = this.createNativeCtxTexture();
    if (this._nativeCtxTexture === null) {
      this.state = "failed";
      this.textureSource.setState("failed", new Error("Could not create WebGL Texture"));
      console.error("Could not create WebGL Texture");
      return;
    }
    this.onLoadRequest().then(({ width, height }) => {
      if (this.state === "freed") {
        return;
      }
      this.state = "loaded";
      this._w = width;
      this._h = height;
      this.textureSource.setState("loaded", { width, height });
      this.textureSource.freeTextureData();
    }).catch((err) => {
      if (this.state === "freed") {
        return;
      }
      this.state = "failed";
      this.textureSource.setState("failed", err);
      this.textureSource.freeTextureData();
      console.error(err);
    });
  }
  /**
   * Called when the texture data needs to be loaded and uploaded to a texture
   */
  async onLoadRequest() {
    var _a2;
    const { glw } = this;
    const textureData = this.textureSource.textureData;
    if (textureData === null || this._nativeCtxTexture === null) {
      throw new Error("Texture data or native texture is null " + this.textureSource.type);
    }
    glw.texImage2D(0, glw.RGBA, 1, 1, 0, glw.RGBA, glw.UNSIGNED_BYTE, null);
    this.setTextureMemUse(TRANSPARENT_TEXTURE_DATA.byteLength);
    let width = 0;
    let height = 0;
    glw.activeTexture(0);
    const tdata = textureData.data;
    const format = glw.RGBA;
    const formatBytes = 4;
    const memoryPadding = 1.1;
    if (typeof ImageBitmap !== "undefined" && tdata instanceof ImageBitmap || tdata instanceof ImageData || // not using typeof HTMLImageElement due to web worker
    isHTMLImageElement(tdata)) {
      width = tdata.width;
      height = tdata.height;
      glw.bindTexture(this._nativeCtxTexture);
      glw.pixelStorei(glw.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !!textureData.premultiplyAlpha);
      glw.texImage2D(0, format, format, glw.UNSIGNED_BYTE, tdata);
      this.setTextureMemUse(height * width * formatBytes * memoryPadding);
    } else if (tdata === null) {
      width = 0;
      height = 0;
      glw.bindTexture(this._nativeCtxTexture);
      glw.texImage2D(0, format, 1, 1, 0, format, glw.UNSIGNED_BYTE, TRANSPARENT_TEXTURE_DATA);
      this.setTextureMemUse(TRANSPARENT_TEXTURE_DATA.byteLength);
    } else if ("mipmaps" in tdata && tdata.mipmaps) {
      const { mipmaps, width: width2 = 0, height: height2 = 0, type, glInternalFormat } = tdata;
      const view = type === "ktx" ? new DataView((_a2 = mipmaps[0]) != null ? _a2 : new ArrayBuffer(0)) : mipmaps[0];
      glw.bindTexture(this._nativeCtxTexture);
      glw.compressedTexImage2D(0, glInternalFormat, width2, height2, 0, view);
      glw.texParameteri(glw.TEXTURE_WRAP_S, glw.CLAMP_TO_EDGE);
      glw.texParameteri(glw.TEXTURE_WRAP_T, glw.CLAMP_TO_EDGE);
      glw.texParameteri(glw.TEXTURE_MAG_FILTER, glw.LINEAR);
      glw.texParameteri(glw.TEXTURE_MIN_FILTER, glw.LINEAR);
      this.setTextureMemUse(view.byteLength);
    } else if (tdata && tdata instanceof Uint8Array) {
      width = 1;
      height = 1;
      glw.bindTexture(this._nativeCtxTexture);
      glw.pixelStorei(glw.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !!textureData.premultiplyAlpha);
      glw.texImage2D(0, format, width, height, 0, format, glw.UNSIGNED_BYTE, tdata);
      this.setTextureMemUse(width * height * formatBytes);
    } else {
      console.error("WebGlCoreCtxTexture.onLoadRequest: Unexpected textureData returned", textureData);
    }
    return {
      width,
      height
    };
  }
  /**
   * Free the WebGLTexture from the GPU
   *
   * @returns
   */
  free() {
    if (this.state === "freed") {
      return;
    }
    this.state = "freed";
    this.textureSource.setState("freed");
    this._w = 0;
    this._h = 0;
    if (this._nativeCtxTexture !== null) {
      this.glw.deleteTexture(this._nativeCtxTexture);
      this.setTextureMemUse(0);
      this._nativeCtxTexture = null;
    }
    this.textureSource.freeTextureData();
  }
  /**
   * Create native context texture
   *
   * @remarks
   * When this method returns the returned texture will be bound to the GL context state.
   *
   * @param width
   * @param height
   * @returns
   */
  createNativeCtxTexture() {
    const { glw } = this;
    const nativeTexture = glw.createTexture();
    if (!nativeTexture) {
      return null;
    }
    glw.activeTexture(0);
    glw.bindTexture(nativeTexture);
    glw.texParameteri(glw.TEXTURE_MAG_FILTER, glw.LINEAR);
    glw.texParameteri(glw.TEXTURE_MIN_FILTER, glw.LINEAR);
    glw.texParameteri(glw.TEXTURE_WRAP_S, glw.CLAMP_TO_EDGE);
    glw.texParameteri(glw.TEXTURE_WRAP_T, glw.CLAMP_TO_EDGE);
    return nativeTexture;
  }
}
class WebGlCoreCtxSubTexture extends WebGlCoreCtxTexture {
  constructor(glw, memManager, textureSource) {
    super(glw, memManager, textureSource);
  }
  async onLoadRequest() {
    var _a2, _b;
    const props = this.textureSource.textureData;
    if (props.data instanceof Uint8Array) {
      return { width: 1, height: 1 };
    }
    return {
      width: ((_a2 = props.data) == null ? void 0 : _a2.width) || 0,
      height: ((_b = props.data) == null ? void 0 : _b.height) || 0
    };
  }
}
class BufferCollection {
  constructor(config) {
    __publicField(this, "config");
    this.config = config;
  }
  /**
   * Get the WebGLBuffer associated with the given attribute name if it exists.
   *
   * @param attributeName
   * @returns
   */
  getBuffer(attributeName) {
    var _a2;
    return (_a2 = this.config.find((item) => item.attributes[attributeName])) == null ? void 0 : _a2.buffer;
  }
  /**
   * Get the AttributeInfo associated with the given attribute name if it exists.
   *
   * @param attributeName
   * @returns
   */
  getAttributeInfo(attributeName) {
    var _a2;
    return (_a2 = this.config.find((item) => item.attributes[attributeName])) == null ? void 0 : _a2.attributes[attributeName];
  }
}
function isWebGl2(gl) {
  return self.WebGL2RenderingContext && gl instanceof self.WebGL2RenderingContext;
}
class WebGlContextWrapper {
  //#endregion WebGL Enums
  constructor(gl) {
    __publicField(this, "gl");
    //#region Cached WebGL State
    __publicField(this, "activeTextureUnit", 0);
    __publicField(this, "texture2dUnits");
    __publicField(this, "texture2dParams", /* @__PURE__ */ new WeakMap());
    __publicField(this, "scissorEnabled");
    __publicField(this, "scissorX");
    __publicField(this, "scissorY");
    __publicField(this, "scissorWidth");
    __publicField(this, "scissorHeight");
    __publicField(this, "blendEnabled");
    __publicField(this, "blendSrcRgb");
    __publicField(this, "blendDstRgb");
    __publicField(this, "blendSrcAlpha");
    __publicField(this, "blendDstAlpha");
    __publicField(this, "boundArrayBuffer");
    __publicField(this, "boundElementArrayBuffer");
    __publicField(this, "curProgram");
    //#endregion Cached WebGL State
    //#region Canvas
    __publicField(this, "canvas");
    //#endregion Canvas
    //#region WebGL Enums
    __publicField(this, "MAX_RENDERBUFFER_SIZE");
    __publicField(this, "MAX_TEXTURE_SIZE");
    __publicField(this, "MAX_VIEWPORT_DIMS");
    __publicField(this, "MAX_VERTEX_TEXTURE_IMAGE_UNITS");
    __publicField(this, "MAX_TEXTURE_IMAGE_UNITS");
    __publicField(this, "MAX_COMBINED_TEXTURE_IMAGE_UNITS");
    __publicField(this, "MAX_VERTEX_ATTRIBS");
    __publicField(this, "MAX_VARYING_VECTORS");
    __publicField(this, "MAX_VERTEX_UNIFORM_VECTORS");
    __publicField(this, "MAX_FRAGMENT_UNIFORM_VECTORS");
    __publicField(this, "TEXTURE_MAG_FILTER");
    __publicField(this, "TEXTURE_MIN_FILTER");
    __publicField(this, "TEXTURE_WRAP_S");
    __publicField(this, "TEXTURE_WRAP_T");
    __publicField(this, "LINEAR");
    __publicField(this, "CLAMP_TO_EDGE");
    __publicField(this, "RGB");
    __publicField(this, "RGBA");
    __publicField(this, "UNSIGNED_BYTE");
    __publicField(this, "UNPACK_PREMULTIPLY_ALPHA_WEBGL");
    __publicField(this, "UNPACK_FLIP_Y_WEBGL");
    __publicField(this, "FLOAT");
    __publicField(this, "TRIANGLES");
    __publicField(this, "UNSIGNED_SHORT");
    __publicField(this, "ONE");
    __publicField(this, "ONE_MINUS_SRC_ALPHA");
    __publicField(this, "VERTEX_SHADER");
    __publicField(this, "FRAGMENT_SHADER");
    __publicField(this, "STATIC_DRAW");
    __publicField(this, "COMPILE_STATUS");
    __publicField(this, "LINK_STATUS");
    __publicField(this, "DYNAMIC_DRAW");
    __publicField(this, "COLOR_ATTACHMENT0");
    __publicField(this, "INVALID_ENUM");
    __publicField(this, "INVALID_OPERATION");
    this.gl = gl;
    this.activeTextureUnit = gl.getParameter(gl.ACTIVE_TEXTURE) - gl.TEXTURE0;
    const maxTextureUnits = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
    this.texture2dUnits = new Array(maxTextureUnits).fill(void 0).map((_, i) => {
      this.activeTexture(i);
      return gl.getParameter(gl.TEXTURE_BINDING_2D);
    });
    this.activeTexture(this.activeTextureUnit);
    this.scissorEnabled = gl.isEnabled(gl.SCISSOR_TEST);
    const scissorBox = gl.getParameter(gl.SCISSOR_BOX);
    this.scissorX = scissorBox[0];
    this.scissorY = scissorBox[1];
    this.scissorWidth = scissorBox[2];
    this.scissorHeight = scissorBox[3];
    this.blendEnabled = gl.isEnabled(gl.BLEND);
    this.blendSrcRgb = gl.getParameter(gl.BLEND_SRC_RGB);
    this.blendDstRgb = gl.getParameter(gl.BLEND_DST_RGB);
    this.blendSrcAlpha = gl.getParameter(gl.BLEND_SRC_ALPHA);
    this.blendDstAlpha = gl.getParameter(gl.BLEND_DST_ALPHA);
    this.boundArrayBuffer = gl.getParameter(gl.ARRAY_BUFFER_BINDING);
    this.boundElementArrayBuffer = gl.getParameter(gl.ELEMENT_ARRAY_BUFFER_BINDING);
    this.curProgram = gl.getParameter(gl.CURRENT_PROGRAM);
    this.canvas = gl.canvas;
    this.MAX_RENDERBUFFER_SIZE = gl.MAX_RENDERBUFFER_SIZE;
    this.MAX_TEXTURE_SIZE = gl.MAX_TEXTURE_SIZE;
    this.MAX_VIEWPORT_DIMS = gl.MAX_VIEWPORT_DIMS;
    this.MAX_VERTEX_TEXTURE_IMAGE_UNITS = gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS;
    this.MAX_TEXTURE_IMAGE_UNITS = gl.MAX_TEXTURE_IMAGE_UNITS;
    this.MAX_COMBINED_TEXTURE_IMAGE_UNITS = gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS;
    this.MAX_VERTEX_ATTRIBS = gl.MAX_VERTEX_ATTRIBS;
    this.MAX_VARYING_VECTORS = gl.MAX_VARYING_VECTORS;
    this.MAX_VERTEX_UNIFORM_VECTORS = gl.MAX_VERTEX_UNIFORM_VECTORS;
    this.MAX_FRAGMENT_UNIFORM_VECTORS = gl.MAX_FRAGMENT_UNIFORM_VECTORS;
    this.TEXTURE_MAG_FILTER = gl.TEXTURE_MAG_FILTER;
    this.TEXTURE_MIN_FILTER = gl.TEXTURE_MIN_FILTER;
    this.TEXTURE_WRAP_S = gl.TEXTURE_WRAP_S;
    this.TEXTURE_WRAP_T = gl.TEXTURE_WRAP_T;
    this.LINEAR = gl.LINEAR;
    this.CLAMP_TO_EDGE = gl.CLAMP_TO_EDGE;
    this.RGB = gl.RGB;
    this.RGBA = gl.RGBA;
    this.UNSIGNED_BYTE = gl.UNSIGNED_BYTE;
    this.UNPACK_PREMULTIPLY_ALPHA_WEBGL = gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL;
    this.UNPACK_FLIP_Y_WEBGL = gl.UNPACK_FLIP_Y_WEBGL;
    this.FLOAT = gl.FLOAT;
    this.TRIANGLES = gl.TRIANGLES;
    this.UNSIGNED_SHORT = gl.UNSIGNED_SHORT;
    this.ONE = gl.ONE;
    this.ONE_MINUS_SRC_ALPHA = gl.ONE_MINUS_SRC_ALPHA;
    this.MAX_VERTEX_TEXTURE_IMAGE_UNITS = gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS;
    this.TRIANGLES = gl.TRIANGLES;
    this.UNSIGNED_SHORT = gl.UNSIGNED_SHORT;
    this.VERTEX_SHADER = gl.VERTEX_SHADER;
    this.FRAGMENT_SHADER = gl.FRAGMENT_SHADER;
    this.STATIC_DRAW = gl.STATIC_DRAW;
    this.COMPILE_STATUS = gl.COMPILE_STATUS;
    this.LINK_STATUS = gl.LINK_STATUS;
    this.DYNAMIC_DRAW = gl.DYNAMIC_DRAW;
    this.COLOR_ATTACHMENT0 = gl.COLOR_ATTACHMENT0;
    this.INVALID_ENUM = gl.INVALID_ENUM;
    this.INVALID_OPERATION = gl.INVALID_OPERATION;
  }
  /**
   * Returns true if the WebGL context is WebGL2
   *
   * @returns
   */
  isWebGl2() {
    return isWebGl2(this.gl);
  }
  /**
   * ```
   * gl.activeTexture(textureUnit + gl.TEXTURE0);
   * ```
   *
   * @remarks
   * **WebGL Difference**: `textureUnit` is based from 0, not `gl.TEXTURE0`.
   *
   * @param textureUnit
   */
  activeTexture(textureUnit) {
    const { gl } = this;
    if (this.activeTextureUnit !== textureUnit) {
      gl.activeTexture(textureUnit + gl.TEXTURE0);
      this.activeTextureUnit = textureUnit;
    }
  }
  /**
   * ```
   * gl.bindTexture(gl.TEXTURE_2D, texture);
   * ```
   * @remarks
   * **WebGL Difference**: Bind target is always `gl.TEXTURE_2D`
   *
   * @param texture
   */
  bindTexture(texture) {
    const { gl, activeTextureUnit, texture2dUnits } = this;
    if (texture2dUnits[activeTextureUnit] === texture) {
      return;
    }
    texture2dUnits[activeTextureUnit] = texture;
    gl.bindTexture(this.gl.TEXTURE_2D, texture);
  }
  _getActiveTexture() {
    const { activeTextureUnit, texture2dUnits } = this;
    return texture2dUnits[activeTextureUnit];
  }
  /**
   * ```
   * gl.texParameteri(gl.TEXTURE_2D, pname, param);
   * ```
   * @remarks
   * **WebGL Difference**: Bind target is always `gl.TEXTURE_2D`
   *
   * @param pname
   * @param param
   * @returns
   */
  texParameteri(pname, param) {
    const { gl, texture2dParams } = this;
    const activeTexture = this._getActiveTexture();
    if (!activeTexture) {
      throw new Error("No active texture");
    }
    let textureParams = texture2dParams.get(activeTexture);
    if (!textureParams) {
      textureParams = {};
      texture2dParams.set(activeTexture, textureParams);
    }
    if (textureParams[pname] === param) {
      return;
    }
    textureParams[pname] = param;
    gl.texParameteri(gl.TEXTURE_2D, pname, param);
  }
  texImage2D(level, internalFormat, widthOrFormat, heightOrType, borderOrSource, format, type, pixels) {
    const { gl } = this;
    if (format) {
      gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, widthOrFormat, heightOrType, borderOrSource, format, type, pixels);
    } else {
      gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, widthOrFormat, heightOrType, borderOrSource);
    }
  }
  /**
   * ```
   * gl.compressedTexImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, border, data);
   * ```
   *
   * @remarks
   * **WebGL Difference**: Bind target is always `gl.TEXTURE_2D`
   */
  compressedTexImage2D(level, internalformat, width, height, border, data) {
    const { gl } = this;
    gl.compressedTexImage2D(gl.TEXTURE_2D, level, internalformat, width, height, border, data);
  }
  /**
   * ```
   * gl.pixelStorei(pname, param);
   * ```
   *
   * @param pname
   * @param param
   */
  pixelStorei(pname, param) {
    const { gl } = this;
    gl.pixelStorei(pname, param);
  }
  /**
   * ```
   * gl.generateMipmap(gl.TEXTURE_2D);
   * ```
   *
   * @remarks
   * **WebGL Difference**: Bind target is always `gl.TEXTURE_2D`
   */
  generateMipmap() {
    const { gl } = this;
    gl.generateMipmap(gl.TEXTURE_2D);
  }
  /**
   * ```
   * gl.createTexture();
   * ```
   *
   * @returns
   */
  createTexture() {
    const { gl } = this;
    return gl.createTexture();
  }
  /**
   * ```
   * gl.deleteTexture(texture);
   * ```
   *
   * @param texture
   */
  deleteTexture(texture) {
    const { gl } = this;
    if (texture) {
      this.texture2dParams.delete(texture);
    }
    gl.deleteTexture(texture);
  }
  /**
   * ```
   * gl.deleteFramebuffer(framebuffer);
   *
   * @param framebuffer
   */
  deleteFramebuffer(framebuffer) {
    this.gl.deleteFramebuffer(framebuffer);
  }
  /**
   * ```
   * gl.viewport(x, y, width, height);
   * ```
   */
  viewport(x, y, width, height) {
    const { gl } = this;
    gl.viewport(x, y, width, height);
  }
  /**
   * ```
   * gl.clearColor(red, green, blue, alpha);
   * ```
   *
   * @param red
   * @param green
   * @param blue
   * @param alpha
   */
  clearColor(red, green, blue, alpha) {
    const { gl } = this;
    gl.clearColor(red, green, blue, alpha);
  }
  /**
   * ```
   * gl["enable"|"disable"](gl.SCISSOR_TEST);
   * ```
   * @param enable
   */
  setScissorTest(enable) {
    const { gl, scissorEnabled } = this;
    if (enable === scissorEnabled) {
      return;
    }
    if (enable) {
      gl.enable(gl.SCISSOR_TEST);
    } else {
      gl.disable(gl.SCISSOR_TEST);
    }
    this.scissorEnabled = enable;
  }
  /**
   * ```
   * gl.scissor(x, y, width, height);
   * ```
   *
   * @param x
   * @param y
   * @param width
   * @param height
   */
  scissor(x, y, width, height) {
    const { gl, scissorX, scissorY, scissorWidth, scissorHeight } = this;
    if (x !== scissorX || y !== scissorY || width !== scissorWidth || height !== scissorHeight) {
      gl.scissor(x, y, width, height);
      this.scissorX = x;
      this.scissorY = y;
      this.scissorWidth = width;
      this.scissorHeight = height;
    }
  }
  /**
   * ```
   * gl["enable"|"disable"](gl.BLEND);
   * ```
   *
   * @param blend
   * @returns
   */
  setBlend(blend) {
    const { gl, blendEnabled } = this;
    if (blend === blendEnabled) {
      return;
    }
    if (blend) {
      gl.enable(gl.BLEND);
    } else {
      gl.disable(gl.BLEND);
    }
    this.blendEnabled = blend;
  }
  /**
   * ```
   * gl.blendFunc(src, dst);
   * ```
   *
   * @param src
   * @param dst
   */
  blendFunc(src, dst) {
    const { gl, blendSrcRgb, blendDstRgb, blendSrcAlpha, blendDstAlpha } = this;
    if (src !== blendSrcRgb || dst !== blendDstRgb || src !== blendSrcAlpha || dst !== blendDstAlpha) {
      gl.blendFunc(src, dst);
      this.blendSrcRgb = src;
      this.blendDstRgb = dst;
      this.blendSrcAlpha = src;
      this.blendDstAlpha = dst;
    }
  }
  /**
   * ```
   * gl.createBuffer();
   * ```
   *
   * @returns
   */
  createBuffer() {
    const { gl } = this;
    return gl.createBuffer();
  }
  /**
   * ```
   * gl.createFramebuffer();
   * ```
   * @returns
   */
  createFramebuffer() {
    const { gl } = this;
    return gl.createFramebuffer();
  }
  /**
   * ```
   * gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
   * ```
   *
   * @param framebuffer
   */
  bindFramebuffer(framebuffer) {
    const { gl } = this;
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
  }
  /**
   * ```
   * gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
   * ```
   * @remarks
   * **WebGL Difference**: Bind target is always `gl.FRAMEBUFFER` and textarget is always `gl.TEXTURE_2D`
   */
  framebufferTexture2D(attachment, texture, level) {
    const { gl } = this;
    gl.framebufferTexture2D(gl.FRAMEBUFFER, attachment, gl.TEXTURE_2D, texture, level);
  }
  /**
   * ```
   * gl.clear(gl.COLOR_BUFFER_BIT);
   * ```
   *
   * @remarks
   * **WebGL Difference**: Clear mask is always `gl.COLOR_BUFFER_BIT`
   */
  clear() {
    const { gl } = this;
    gl.clear(gl.COLOR_BUFFER_BIT);
  }
  /**
   * ```
   * gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
   * gl.bufferData(gl.ARRAY_BUFFER, data, usage);
   * ```
   *
   * @remarks
   * **WebGL Combo**: `gl.bindBuffer` and `gl.bufferData` are combined into one function.
   *
   * @param buffer
   * @param data
   * @param usage
   */
  arrayBufferData(buffer, data, usage) {
    const { gl, boundArrayBuffer } = this;
    if (boundArrayBuffer !== buffer) {
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      this.boundArrayBuffer = buffer;
    }
    gl.bufferData(gl.ARRAY_BUFFER, data, usage);
  }
  /**
   * ```
   * gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
   * gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, usage);
   * ```
   * @remarks
   * **WebGL Combo**: `gl.bindBuffer` and `gl.bufferData` are combined into one function.
   *
   * @param buffer
   * @param data
   * @param usage
   */
  elementArrayBufferData(buffer, data, usage) {
    const { gl, boundElementArrayBuffer } = this;
    if (boundElementArrayBuffer !== buffer) {
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
      this.boundElementArrayBuffer = buffer;
    }
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, usage);
  }
  /**
   * ```
   * gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
   * gl.vertexAttribPointer(index, size, type, normalized, stride, offset);
   * ```
   *
   * @remarks
   * **WebGL Combo**: `gl.bindBuffer` and `gl.vertexAttribPointer` are combined into one function.
   *
   * @param buffer
   * @param index
   * @param size
   * @param type
   * @param normalized
   * @param stride
   * @param offset
   */
  vertexAttribPointer(buffer, index, size, type, normalized, stride, offset) {
    const { gl, boundArrayBuffer } = this;
    if (boundArrayBuffer !== buffer) {
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      this.boundArrayBuffer = buffer;
    }
    gl.vertexAttribPointer(index, size, type, normalized, stride, offset);
  }
  /**
   * ```
   * gl.useProgram(program);
   * ```
   *
   * @param program
   * @returns
   */
  useProgram(program) {
    const { gl, curProgram } = this;
    if (curProgram === program) {
      return;
    }
    gl.useProgram(program);
    this.curProgram = program;
  }
  /**
   * Sets the value of a single float uniform variable.
   *
   * @param location - The location of the uniform variable.
   * @param v0 - The value to set.
   */
  uniform1f(location, v0) {
    const { gl } = this;
    gl.uniform1f(location, v0);
  }
  /**
   * Sets the value of a float array uniform variable.
   *
   * @param location - The location of the uniform variable.
   * @param value - The array of values to set.
   */
  uniform1fv(location, value) {
    const { gl } = this;
    gl.uniform1fv(location, value);
  }
  /**
   * Sets the value of a single integer uniform variable.
   *
   * @param location - The location of the uniform variable.
   * @param v0 - The value to set.
   */
  uniform1i(location, v0) {
    const { gl } = this;
    gl.uniform1i(location, v0);
  }
  /**
   * Sets the value of an integer array uniform variable.
   *
   * @param location - The location of the uniform variable.
   * @param value - The array of values to set.
   */
  uniform1iv(location, value) {
    const { gl } = this;
    gl.uniform1iv(location, value);
  }
  /**
   * Sets the value of a vec2 uniform variable.
   *
   * @param location - The location of the uniform variable.
   * @param v0 - The first component of the vector.
   * @param v1 - The second component of the vector.
   */
  uniform2f(location, v0, v1) {
    const { gl } = this;
    gl.uniform2f(location, v0, v1);
  }
  /**
   * Sets the value of a vec2 array uniform variable.
   *
   * @param location - The location of the uniform variable.
   * @param value - The array of vec2 values to set.
   */
  uniform2fv(location, value) {
    const { gl } = this;
    gl.uniform2fv(location, value);
  }
  /**
   * Sets the value of a ivec2 uniform variable.
   *
   * @param location - The location of the uniform variable.
   * @param v0 - The first component of the vector.
   * @param v1 - The second component of the vector.
   */
  uniform2i(location, v0, v1) {
    const { gl } = this;
    gl.uniform2i(location, v0, v1);
  }
  /**
   * Sets the value of an ivec2 array uniform variable.
   *
   * @param location - The location of the uniform variable.
   * @param value - The array of ivec2 values to set.
   */
  uniform2iv(location, value) {
    const { gl } = this;
    gl.uniform2iv(location, value);
  }
  /**
   * Sets the value of a vec3 uniform variable.
   *
   * @param location - The location of the uniform variable.
   * @param v0 - The first component of the vector.
   * @param v1 - The second component of the vector.
   * @param v2 - The third component of the vector.
   */
  uniform3f(location, v0, v1, v2) {
    const { gl } = this;
    gl.uniform3f(location, v0, v1, v2);
  }
  /**
   * Sets the value of a vec3 array uniform variable.
   *
   * @param location - The location of the uniform variable.
   * @param value - The array of vec3 values to set.
   */
  uniform3fv(location, value) {
    const { gl } = this;
    gl.uniform3fv(location, value);
  }
  /**
   * Sets the value of a ivec3 uniform variable.
   *
   * @param location - The location of the uniform variable.
   * @param v0 - The first component of the vector.
   * @param v1 - The second component of the vector.
   * @param v2 - The third component of the vector.
   */
  uniform3i(location, v0, v1, v2) {
    const { gl } = this;
    gl.uniform3i(location, v0, v1, v2);
  }
  /**
   * Sets the value of an ivec3 array uniform variable.
   *
   * @param location - The location of the uniform variable.
   * @param value - The array of ivec3 values to set.
   */
  uniform3iv(location, value) {
    const { gl } = this;
    gl.uniform3iv(location, value);
  }
  /**
   * Sets the value of a vec4 uniform variable.
   *
   * @param location - The location of the uniform variable.
   * @param v0 - The first component of the vector.
   * @param v1 - The second component of the vector.
   * @param v2 - The third component of the vector.
   * @param v3 - The fourth component of the vector.
   */
  uniform4f(location, v0, v1, v2, v3) {
    const { gl } = this;
    gl.uniform4f(location, v0, v1, v2, v3);
  }
  /**
   * Sets the value of a vec4 array uniform variable.
   *
   * @param location - The location of the uniform variable.
   * @param value - The array of vec4 values to set.
   */
  uniform4fv(location, value) {
    const { gl } = this;
    gl.uniform4fv(location, value);
  }
  /**
   * Sets the value of a ivec4 uniform variable.
   *
   * @param location - The location of the uniform variable.
   * @param v0 - The first component of the vector.
   * @param v1 - The second component of the vector.
   * @param v2 - The third component of the vector.
   * @param v3 - The fourth component of the vector.
   */
  uniform4i(location, v0, v1, v2, v3) {
    const { gl } = this;
    gl.uniform4i(location, v0, v1, v2, v3);
  }
  /**
   * Sets the value of an ivec4 array uniform variable.
   *
   * @param location - The location of the uniform variable.
   * @param value - The array of ivec4 values to set.
   */
  uniform4iv(location, value) {
    const { gl } = this;
    gl.uniform4iv(location, value);
  }
  /**
   * Sets the value of a mat2 uniform variable.
   *
   * @param location - The location of the uniform variable.
   * @param transpose - Whether to transpose the matrix.
   * @param value - The array of mat2 values to set.
   */
  uniformMatrix2fv(location, value) {
    const { gl } = this;
    gl.uniformMatrix2fv(location, false, value);
  }
  /**
   * Sets the value of a mat2 uniform variable.
   * @param location - The location of the uniform variable.
   * @param value - The array of mat2 values to set.
   */
  uniformMatrix3fv(location, value) {
    const { gl } = this;
    gl.uniformMatrix3fv(location, false, value);
  }
  /**
   * Sets the value of a mat4 uniform variable.
   * @param location - The location of the uniform variable.
   * @param value - The array of mat4 values to set.
   */
  uniformMatrix4fv(location, value) {
    const { gl } = this;
    gl.uniformMatrix4fv(location, false, value);
  }
  /**
   * ```
   * gl.getParameter(pname);
   * ```
   *
   * @param pname
   * @returns
   */
  getParameter(pname) {
    const { gl } = this;
    return gl.getParameter(pname);
  }
  /**
   * ```
   * gl.drawElements(mode, count, type, offset);
   * ```
   *
   * @param mode
   * @param count
   * @param type
   * @param offset
   */
  drawElements(mode, count2, type, offset) {
    const { gl } = this;
    gl.drawElements(mode, count2, type, offset);
  }
  /**
   * ```
   * gl.drawArrays(mode, first, count);
   * ```
   *
   * @param name
   * @returns
   */
  getExtension(name) {
    const { gl } = this;
    return gl.getExtension(name);
  }
  /**
   * ```
   * gl.getError(type);
   * ```
   *
   * @returns
   */
  getError() {
    const { gl } = this;
    return gl.getError();
  }
  /**
   * ```
   * gl.createVertexArray();
   * ```
   *
   * @returns
   */
  createVertexArray() {
    const { gl } = this;
    return gl.createVertexArray();
  }
  /**
   * ```
   * gl.bindVertexArray(vertexArray);
   * ```
   *
   * @param vertexArray
   */
  bindVertexArray(vertexArray) {
    const { gl } = this;
    gl.bindVertexArray(vertexArray);
  }
  /**
   * ```
   * gl.getAttribLocation(program, name);
   * ```
   *
   * @param program
   * @param name
   * @returns
   */
  getAttribLocation(program, name) {
    const { gl } = this;
    return gl.getAttribLocation(program, name);
  }
  /**
   * ```
   * gl.getUniformLocation(program, name);
   * ```
   *
   * @param program
   * @param name
   * @returns
   */
  getUniformLocation(program, name) {
    const { gl } = this;
    return gl.getUniformLocation(program, name);
  }
  /**
   * ```
   * gl.enableVertexAttribArray(index);
   * ```
   *
   * @param index
   */
  enableVertexAttribArray(index) {
    const { gl } = this;
    gl.enableVertexAttribArray(index);
  }
  /**
   * ```
   * gl.disableVertexAttribArray(index);
   * ```
   *
   * @param index
   */
  disableVertexAttribArray(index) {
    const { gl } = this;
    gl.disableVertexAttribArray(index);
  }
  /**
   * ```
   * gl.createShader(type);
   * ```
   *
   * @param type
   * @returns
   */
  createShader(type) {
    const { gl } = this;
    return gl.createShader(type);
  }
  /**
   * ```
   * gl.compileShader(shader);
   * ```
   *
   * @param shader
   * @returns
   */
  compileShader(shader) {
    const { gl } = this;
    gl.compileShader(shader);
  }
  /**
   * ```
   * gl.attachShader(program, shader);
   * ```
   *
   * @param program
   * @param shader
   */
  attachShader(program, shader) {
    const { gl } = this;
    gl.attachShader(program, shader);
  }
  /**
   * ```
   * gl.linkProgram(program);
   * ```
   *
   * @param program
   */
  linkProgram(program) {
    const { gl } = this;
    gl.linkProgram(program);
  }
  /**
   * ```
   * gl.deleteProgram(shader);
   * ```
   *
   * @param shader
   */
  deleteProgram(shader) {
    const { gl } = this;
    gl.deleteProgram(shader);
  }
  /**
   * ```
   * gl.getShaderParameter(shader, pname);
   * ```
   *
   * @param shader
   * @param pname
   */
  getShaderParameter(shader, pname) {
    const { gl } = this;
    return gl.getShaderParameter(shader, pname);
  }
  /**
   * ```
   * gl.getShaderInfoLog(shader);
   * ```
   *
   * @param shader
   */
  getShaderInfoLog(shader) {
    const { gl } = this;
    return gl.getShaderInfoLog(shader);
  }
  /**
   * ```
   * gl.createProgram();
   * ```
   *
   * @returns
   */
  createProgram() {
    const { gl } = this;
    return gl.createProgram();
  }
  /**
   * ```
   * gl.getProgramParameter(program, pname);
   * ```
   *
   * @param program
   * @param pname
   * @returns
   */
  getProgramParameter(program, pname) {
    const { gl } = this;
    return gl.getProgramParameter(program, pname);
  }
  /**
   * ```
   * gl.getProgramInfoLog(program);
   * ```
   *
   * @param program
   * @returns
   */
  getProgramInfoLog(program) {
    const { gl } = this;
    return gl.getProgramInfoLog(program);
  }
  /**
   * ```
   * gl.shaderSource(shader, source);
   * ```
   *
   * @param shader
   * @param source
   */
  shaderSource(shader, source) {
    const { gl } = this;
    gl.shaderSource(shader, source);
  }
  /**
   * ```
   * gl.deleteShader(shader);
   * ```
   *
   * @param shader
   */
  deleteShader(shader) {
    const { gl } = this;
    gl.deleteShader(shader);
  }
}
class WebGlCoreCtxRenderTexture extends WebGlCoreCtxTexture {
  constructor(glw, memManager, textureSource) {
    super(glw, memManager, textureSource);
    __publicField(this, "framebuffer", null);
  }
  async onLoadRequest() {
    const { glw } = this;
    const nativeTexture = this._nativeCtxTexture = this.createNativeCtxTexture();
    const { width, height } = this.textureSource;
    this.framebuffer = glw.createFramebuffer();
    glw.texImage2D(0, glw.RGBA, width, height, 0, glw.RGBA, glw.UNSIGNED_BYTE, null);
    this.setTextureMemUse(width * height * 4);
    glw.bindFramebuffer(this.framebuffer);
    glw.framebufferTexture2D(glw.COLOR_ATTACHMENT0, nativeTexture, 0);
    glw.bindFramebuffer(null);
    return {
      width,
      height
    };
  }
  free() {
    super.free();
    this.glw.deleteFramebuffer(this.framebuffer);
    this.framebuffer = null;
  }
}
const WORDS_PER_QUAD = 24;
class WebGlCoreRenderer extends CoreRenderer {
  constructor(options) {
    super(options);
    //// WebGL Native Context and Data
    __publicField(this, "glw");
    __publicField(this, "system");
    //// Persistent data
    __publicField(this, "quadBuffer");
    __publicField(this, "fQuadBuffer");
    __publicField(this, "uiQuadBuffer");
    __publicField(this, "renderOps", []);
    //// Render Op / Buffer Filling State
    __publicField(this, "curBufferIdx", 0);
    __publicField(this, "curRenderOp", null);
    __publicField(this, "rttNodes", []);
    __publicField(this, "activeRttNode", null);
    //// Default Shader
    __publicField(this, "defShaderCtrl");
    __publicField(this, "defaultShader");
    __publicField(this, "quadBufferCollection");
    __publicField(this, "clearColor", {
      raw: 0,
      normalized: [0, 0, 0, 0]
    });
    /**
     * White pixel texture used by default when no texture is specified.
     */
    __publicField(this, "quadBufferUsage", 0);
    __publicField(this, "numQuadsRendered", 0);
    /**
     * Whether the renderer is currently rendering to a texture.
     */
    __publicField(this, "renderToTextureActive", false);
    this.quadBuffer = new ArrayBuffer(this.stage.options.quadBufferSize);
    this.fQuadBuffer = new Float32Array(this.quadBuffer);
    this.uiQuadBuffer = new Uint32Array(this.quadBuffer);
    this.mode = "webgl";
    const { canvas, clearColor, bufferMemory: bufferMemory2 } = options;
    const gl = createWebGLContext(canvas, options.forceWebGL2, options.contextSpy);
    const glw = this.glw = new WebGlContextWrapper(gl);
    glw.viewport(0, 0, canvas.width, canvas.height);
    this.updateClearColor(clearColor);
    glw.setBlend(true);
    glw.blendFunc(glw.ONE, glw.ONE_MINUS_SRC_ALPHA);
    createIndexBuffer(glw, bufferMemory2);
    this.system = {
      parameters: getWebGlParameters(this.glw),
      extensions: getWebGlExtensions(this.glw)
    };
    this.shManager.renderer = this;
    this.defShaderCtrl = this.shManager.loadShader("DefaultShader");
    this.defaultShader = this.defShaderCtrl.shader;
    const quadBuffer = glw.createBuffer();
    const stride = 6 * Float32Array.BYTES_PER_ELEMENT;
    this.quadBufferCollection = new BufferCollection([
      {
        buffer: quadBuffer,
        attributes: {
          a_position: {
            name: "a_position",
            size: 2,
            // 2 components per iteration
            type: glw.FLOAT,
            // the data is 32bit floats
            normalized: false,
            // don't normalize the data
            stride,
            // 0 = move forward size * sizeof(type) each iteration to get the next position
            offset: 0
            // start at the beginning of the buffer
          },
          a_textureCoordinate: {
            name: "a_textureCoordinate",
            size: 2,
            type: glw.FLOAT,
            normalized: false,
            stride,
            offset: 2 * Float32Array.BYTES_PER_ELEMENT
          },
          a_color: {
            name: "a_color",
            size: 4,
            type: glw.UNSIGNED_BYTE,
            normalized: true,
            stride,
            offset: 4 * Float32Array.BYTES_PER_ELEMENT
          },
          a_textureIndex: {
            name: "a_textureIndex",
            size: 1,
            type: glw.FLOAT,
            normalized: false,
            stride,
            offset: 5 * Float32Array.BYTES_PER_ELEMENT
          }
        }
      }
    ]);
  }
  reset() {
    const { glw } = this;
    this.curBufferIdx = 0;
    this.curRenderOp = null;
    this.renderOps.length = 0;
    glw.setScissorTest(false);
    glw.clear();
  }
  getShaderManager() {
    return this.shManager;
  }
  createCtxTexture(textureSource) {
    if (textureSource instanceof SubTexture) {
      return new WebGlCoreCtxSubTexture(this.glw, this.txMemManager, textureSource);
    } else if (textureSource instanceof RenderTexture) {
      return new WebGlCoreCtxRenderTexture(this.glw, this.txMemManager, textureSource);
    }
    return new WebGlCoreCtxTexture(this.glw, this.txMemManager, textureSource);
  }
  /**
   * This function adds a quad (a rectangle composed of two triangles) to the WebGL rendering pipeline.
   *
   * It takes a set of options that define the quad's properties, such as its dimensions, colors, texture, shader, and transformation matrix.
   * The function first updates the shader properties with the current dimensions if necessary, then sets the default texture if none is provided.
   * It then checks if a new render operation is needed, based on the current shader and clipping rectangle.
   * If a new render operation is needed, it creates one and updates the current render operation.
   * The function then adjusts the texture coordinates based on the texture options and adds the texture to the texture manager.
   *
   * Finally, it calculates the vertices for the quad, taking into account any transformations, and adds them to the quad buffer.
   * The function updates the length and number of quads in the current render operation, and updates the current buffer index.
   */
  addQuad(params2) {
    var _a2, _b;
    const { fQuadBuffer, uiQuadBuffer } = this;
    let texture = params2.texture;
    if (params2.shaderProps !== null) {
      if (hasOwn(params2.shaderProps, "$dimensions") == true) {
        const dimensions = params2.shaderProps.$dimensions;
        dimensions.width = params2.width;
        dimensions.height = params2.height;
      }
      if (hasOwn(params2.shaderProps, "$alpha") === true) {
        params2.shaderProps.$alpha = params2.alpha;
      }
    }
    let { curBufferIdx: bufferIdx, curRenderOp } = this;
    const targetDims = { width: -1, height: -1 };
    targetDims.width = params2.width;
    targetDims.height = params2.height;
    const targetShader = params2.shader || this.defaultShader;
    assertTruthy(targetShader.getUniformLocation !== void 0);
    if (this.reuseRenderOp(params2) === false) {
      this.newRenderOp(targetShader, params2.shaderProps, params2.alpha, targetDims, params2.clippingRect, bufferIdx, params2.rtt, params2.parentHasRenderTexture, params2.framebufferDimensions);
      curRenderOp = this.curRenderOp;
    }
    let texCoordX1 = 0;
    let texCoordY1 = 0;
    let texCoordX2 = 1;
    let texCoordY2 = 1;
    if (texture.type === TextureType.subTexture) {
      const { x: tx, y: ty, width: tw, height: th } = texture.props;
      const { width: parentW = 0, height: parentH = 0 } = texture.parentTexture.dimensions || { width: 0, height: 0 };
      texCoordX1 = tx / parentW;
      texCoordX2 = texCoordX1 + tw / parentW;
      texCoordY1 = ty / parentH;
      texCoordY2 = texCoordY1 + th / parentH;
      texture = texture.parentTexture;
    }
    if (texture.type === TextureType.image && params2.textureOptions !== null && params2.textureOptions.resizeMode !== void 0 && texture.dimensions !== null) {
      const resizeMode = params2.textureOptions.resizeMode;
      const { width: tw, height: th } = texture.dimensions;
      if (resizeMode.type === "cover") {
        const scaleX = params2.width / tw;
        const scaleY = params2.height / th;
        const scale = Math.max(scaleX, scaleY);
        const precision = 1 / scale;
        if (scale && scaleX && scaleX < scale) {
          const desiredSize = precision * params2.width;
          texCoordX1 = (1 - desiredSize / tw) * ((_a2 = resizeMode.clipX) != null ? _a2 : 0.5);
          texCoordX2 = texCoordX1 + desiredSize / tw;
        }
        if (scale && scaleY && scaleY < scale) {
          const desiredSize = precision * params2.height;
          texCoordY1 = (1 - desiredSize / th) * ((_b = resizeMode.clipY) != null ? _b : 0.5);
          texCoordY2 = texCoordY1 + desiredSize / th;
        }
      }
    }
    let flipY = 0;
    if (params2.textureOptions !== null) {
      if (params2.textureOptions.flipX === true) {
        [texCoordX1, texCoordX2] = [texCoordX2, texCoordX1];
      }
      flipY = +(params2.textureOptions.flipY || false);
    }
    if (flipY ^ +(texture.type === TextureType.renderToTexture)) {
      [texCoordY1, texCoordY2] = [texCoordY2, texCoordY1];
    }
    const ctxTexture = texture.ctxTexture;
    const textureIdx = this.addTexture(ctxTexture, bufferIdx);
    assertTruthy(this.curRenderOp !== null);
    if (params2.renderCoords) {
      fQuadBuffer[bufferIdx++] = params2.renderCoords.x1;
      fQuadBuffer[bufferIdx++] = params2.renderCoords.y1;
      fQuadBuffer[bufferIdx++] = texCoordX1;
      fQuadBuffer[bufferIdx++] = texCoordY1;
      uiQuadBuffer[bufferIdx++] = params2.colorTl;
      fQuadBuffer[bufferIdx++] = textureIdx;
      fQuadBuffer[bufferIdx++] = params2.renderCoords.x2;
      fQuadBuffer[bufferIdx++] = params2.renderCoords.y2;
      fQuadBuffer[bufferIdx++] = texCoordX2;
      fQuadBuffer[bufferIdx++] = texCoordY1;
      uiQuadBuffer[bufferIdx++] = params2.colorTr;
      fQuadBuffer[bufferIdx++] = textureIdx;
      fQuadBuffer[bufferIdx++] = params2.renderCoords.x4;
      fQuadBuffer[bufferIdx++] = params2.renderCoords.y4;
      fQuadBuffer[bufferIdx++] = texCoordX1;
      fQuadBuffer[bufferIdx++] = texCoordY2;
      uiQuadBuffer[bufferIdx++] = params2.colorBl;
      fQuadBuffer[bufferIdx++] = textureIdx;
      fQuadBuffer[bufferIdx++] = params2.renderCoords.x3;
      fQuadBuffer[bufferIdx++] = params2.renderCoords.y3;
      fQuadBuffer[bufferIdx++] = texCoordX2;
      fQuadBuffer[bufferIdx++] = texCoordY2;
      uiQuadBuffer[bufferIdx++] = params2.colorBr;
      fQuadBuffer[bufferIdx++] = textureIdx;
    } else if (params2.tb !== 0 || params2.tc !== 0) {
      fQuadBuffer[bufferIdx++] = params2.tx;
      fQuadBuffer[bufferIdx++] = params2.ty;
      fQuadBuffer[bufferIdx++] = texCoordX1;
      fQuadBuffer[bufferIdx++] = texCoordY1;
      uiQuadBuffer[bufferIdx++] = params2.colorTl;
      fQuadBuffer[bufferIdx++] = textureIdx;
      fQuadBuffer[bufferIdx++] = params2.tx + params2.width * params2.ta;
      fQuadBuffer[bufferIdx++] = params2.ty + params2.width * params2.tc;
      fQuadBuffer[bufferIdx++] = texCoordX2;
      fQuadBuffer[bufferIdx++] = texCoordY1;
      uiQuadBuffer[bufferIdx++] = params2.colorTr;
      fQuadBuffer[bufferIdx++] = textureIdx;
      fQuadBuffer[bufferIdx++] = params2.tx + params2.height * params2.tb;
      fQuadBuffer[bufferIdx++] = params2.ty + params2.height * params2.td;
      fQuadBuffer[bufferIdx++] = texCoordX1;
      fQuadBuffer[bufferIdx++] = texCoordY2;
      uiQuadBuffer[bufferIdx++] = params2.colorBl;
      fQuadBuffer[bufferIdx++] = textureIdx;
      fQuadBuffer[bufferIdx++] = params2.tx + params2.width * params2.ta + params2.height * params2.tb;
      fQuadBuffer[bufferIdx++] = params2.ty + params2.width * params2.tc + params2.height * params2.td;
      fQuadBuffer[bufferIdx++] = texCoordX2;
      fQuadBuffer[bufferIdx++] = texCoordY2;
      uiQuadBuffer[bufferIdx++] = params2.colorBr;
      fQuadBuffer[bufferIdx++] = textureIdx;
    } else {
      const rightCornerX = params2.tx + params2.width * params2.ta;
      const rightCornerY = params2.ty + params2.height * params2.td;
      fQuadBuffer[bufferIdx++] = params2.tx;
      fQuadBuffer[bufferIdx++] = params2.ty;
      fQuadBuffer[bufferIdx++] = texCoordX1;
      fQuadBuffer[bufferIdx++] = texCoordY1;
      uiQuadBuffer[bufferIdx++] = params2.colorTl;
      fQuadBuffer[bufferIdx++] = textureIdx;
      fQuadBuffer[bufferIdx++] = rightCornerX;
      fQuadBuffer[bufferIdx++] = params2.ty;
      fQuadBuffer[bufferIdx++] = texCoordX2;
      fQuadBuffer[bufferIdx++] = texCoordY1;
      uiQuadBuffer[bufferIdx++] = params2.colorTr;
      fQuadBuffer[bufferIdx++] = textureIdx;
      fQuadBuffer[bufferIdx++] = params2.tx;
      fQuadBuffer[bufferIdx++] = rightCornerY;
      fQuadBuffer[bufferIdx++] = texCoordX1;
      fQuadBuffer[bufferIdx++] = texCoordY2;
      uiQuadBuffer[bufferIdx++] = params2.colorBl;
      fQuadBuffer[bufferIdx++] = textureIdx;
      fQuadBuffer[bufferIdx++] = rightCornerX;
      fQuadBuffer[bufferIdx++] = rightCornerY;
      fQuadBuffer[bufferIdx++] = texCoordX2;
      fQuadBuffer[bufferIdx++] = texCoordY2;
      uiQuadBuffer[bufferIdx++] = params2.colorBr;
      fQuadBuffer[bufferIdx++] = textureIdx;
    }
    this.curRenderOp.length += WORDS_PER_QUAD;
    this.curRenderOp.numQuads++;
    this.curBufferIdx = bufferIdx;
  }
  /**
   * Replace the existing RenderOp with a new one that uses the specified Shader
   * and starts at the specified buffer index.
   *
   * @param shader
   * @param bufferIdx
   */
  newRenderOp(shader, shaderProps, alpha, dimensions, clippingRect, bufferIdx, renderToTexture, parentHasRenderTexture, framebufferDimensions) {
    const curRenderOp = new WebGlCoreRenderOp(
      this.glw,
      this.options,
      this.quadBufferCollection,
      shader,
      shaderProps,
      alpha,
      clippingRect,
      dimensions,
      bufferIdx,
      0,
      // Z-Index is only used for explictly added Render Ops
      renderToTexture,
      parentHasRenderTexture,
      framebufferDimensions
    );
    this.curRenderOp = curRenderOp;
    this.renderOps.push(curRenderOp);
  }
  /**
   * Add a texture to the current RenderOp. If the texture cannot be added to the
   * current RenderOp, a new RenderOp will be created and the texture will be added
   * to that one.
   *
   * If the texture cannot be added to the new RenderOp, an error will be thrown.
   *
   * @param texture
   * @param bufferIdx
   * @param recursive
   * @returns Assigned Texture Index of the texture in the render op
   */
  addTexture(texture, bufferIdx, recursive) {
    const { curRenderOp } = this;
    const textureIdx = curRenderOp.addTexture(texture);
    if (textureIdx === 4294967295) {
      if (recursive) {
        throw new Error("Unable to add texture to render op");
      }
      this.newRenderOp(curRenderOp.shader, curRenderOp.shaderProps, curRenderOp.alpha, curRenderOp.dimensions, curRenderOp.clippingRect, bufferIdx);
      return this.addTexture(texture, bufferIdx, true);
    }
    return textureIdx;
  }
  /**
   * Test if the current Render operation can be reused for the specified parameters.
   * @param params
   * @returns
   */
  reuseRenderOp(params2) {
    var _a2;
    const { shader, shaderProps, parentHasRenderTexture, rtt, clippingRect } = params2;
    const targetShader = shader || this.defaultShader;
    if (((_a2 = this.curRenderOp) == null ? void 0 : _a2.shader) !== targetShader) {
      return false;
    }
    if (compareRect(this.curRenderOp.clippingRect, clippingRect) === false) {
      return false;
    }
    if (parentHasRenderTexture !== void 0 || rtt !== void 0) {
      return false;
    }
    if (this.curRenderOp.shader !== this.defaultShader && (shaderProps === null || this.curRenderOp.shader.canBatchShaderProps(this.curRenderOp.shaderProps, shaderProps) === false)) {
      return false;
    }
    return true;
  }
  /**
   * add RenderOp to the render pipeline
   */
  addRenderOp(renderable) {
    this.renderOps.push(renderable);
    this.curRenderOp = null;
  }
  /**
   * Render the current set of RenderOps to render to the specified surface.
   *
   * TODO: 'screen' is the only supported surface at the moment.
   *
   * @param surface
   */
  render(surface = "screen") {
    const { glw, quadBuffer } = this;
    const arr = new Float32Array(quadBuffer, 0, this.curBufferIdx);
    const buffer = this.quadBufferCollection.getBuffer("a_position") || null;
    glw.arrayBufferData(buffer, arr, glw.STATIC_DRAW);
    for (let i = 0, length = this.renderOps.length; i < length; i++) {
      this.renderOps[i].draw();
    }
    this.quadBufferUsage = this.curBufferIdx * arr.BYTES_PER_ELEMENT;
    const QUAD_SIZE_IN_BYTES = 4 * (6 * arr.BYTES_PER_ELEMENT);
    this.numQuadsRendered = this.quadBufferUsage / QUAD_SIZE_IN_BYTES;
  }
  getQuadCount() {
    return this.numQuadsRendered;
  }
  renderToTexture(node) {
    for (let i = 0; i < this.rttNodes.length; i++) {
      if (this.rttNodes[i] === node) {
        return;
      }
    }
    this.insertRTTNodeInOrder(node);
  }
  /**
   * Inserts an RTT node into `this.rttNodes` while maintaining the correct rendering order based on hierarchy.
   *
   * Rendering order for RTT nodes is critical when nested RTT nodes exist in a parent-child relationship.
   * Specifically:
   *  - Child RTT nodes must be rendered before their RTT-enabled parents to ensure proper texture composition.
   *  - If an RTT node is added and it has existing RTT children, it should be rendered after those children.
   *
   * This function addresses both cases by:
   * 1. **Checking Upwards**: It traverses the node's hierarchy upwards to identify any RTT parent
   *    already in `rttNodes`. If an RTT parent is found, the new node is placed before this parent.
   * 2. **Checking Downwards**: It traverses the node’s children recursively to find any RTT-enabled
   *    children that are already in `rttNodes`. If such children are found, the new node is inserted
   *    after the last (highest index) RTT child node.
   *
   * The final calculated insertion index ensures the new node is positioned in `rttNodes` to respect
   * both parent-before-child and child-before-parent rendering rules, preserving the correct order
   * for the WebGL renderer.
   *
   * @param node - The RTT-enabled CoreNode to be added to `rttNodes` in the appropriate hierarchical position.
   */
  insertRTTNodeInOrder(node) {
    let insertIndex = this.rttNodes.length;
    let currentNode = node;
    while (currentNode) {
      if (!currentNode.parent) {
        break;
      }
      const parentIndex = this.rttNodes.indexOf(currentNode.parent);
      if (parentIndex !== -1) {
        insertIndex = parentIndex;
        break;
      }
      currentNode = currentNode.parent;
    }
    const maxChildIndex = this.findMaxChildRTTIndex(node);
    if (maxChildIndex !== -1) {
      insertIndex = Math.max(insertIndex, maxChildIndex + 1);
    }
    this.rttNodes.splice(insertIndex, 0, node);
  }
  // Helper function to find the highest index of any RTT children of a node within rttNodes
  findMaxChildRTTIndex(node) {
    let maxIndex = -1;
    const traverseChildren = (currentNode) => {
      const currentIndex = this.rttNodes.indexOf(currentNode);
      if (currentIndex !== -1) {
        maxIndex = Math.max(maxIndex, currentIndex);
      }
      for (const child of currentNode.children) {
        traverseChildren(child);
      }
    };
    traverseChildren(node);
    return maxIndex;
  }
  renderRTTNodes() {
    const { glw } = this;
    this.stage;
    for (let i = 0; i < this.rttNodes.length; i++) {
      const node = this.rttNodes[i];
      if (node === void 0 || node.hasRTTupdates === false) {
        continue;
      }
      if (node.worldAlpha === 0 || node.strictBounds === true && node.renderState === CoreNodeRenderState.OutOfBounds) {
        continue;
      }
      if (node.texture === null || node.texture.state !== "loaded") {
        continue;
      }
      this.activeRttNode = node;
      assertTruthy(node.texture);
      const ctxTexture = node.texture.ctxTexture;
      this.renderToTextureActive = true;
      glw.bindFramebuffer(ctxTexture.framebuffer);
      glw.viewport(0, 0, ctxTexture.w, ctxTexture.h);
      glw.clearColor(0, 0, 0, 0);
      glw.clear();
      for (let i2 = 0; i2 < node.children.length; i2++) {
        const child = node.children[i2];
        if (child === void 0) {
          continue;
        }
        this.stage.addQuads(child);
        child.hasRTTupdates = false;
      }
      this.render();
      this.renderOps.length = 0;
      node.hasRTTupdates = false;
    }
    const clearColor = this.clearColor.normalized;
    glw.clearColor(clearColor[0], clearColor[1], clearColor[2], clearColor[3]);
    glw.bindFramebuffer(null);
    glw.viewport(0, 0, this.glw.canvas.width, this.glw.canvas.height);
    this.renderToTextureActive = false;
  }
  removeRTTNode(node) {
    const index = this.rttNodes.indexOf(node);
    if (index === -1) {
      return;
    }
    this.rttNodes.splice(index, 1);
  }
  getBufferInfo() {
    const bufferInfo = {
      totalAvailable: this.stage.options.quadBufferSize,
      totalUsed: this.quadBufferUsage
    };
    return bufferInfo;
  }
  getDefShaderCtr() {
    return this.defShaderCtrl;
  }
  /**
   * Updates the WebGL context's clear color and clears the color buffer.
   *
   * @param color - The color to set as the clear color, represented as a 32-bit integer.
   */
  updateClearColor(color) {
    if (this.clearColor.raw === color) {
      return;
    }
    const glw = this.glw;
    const normalizedColor = getNormalizedRgbaComponents(color);
    glw.clearColor(normalizedColor[0], normalizedColor[1], normalizedColor[2], normalizedColor[3]);
    this.clearColor = {
      raw: color,
      normalized: normalizedColor
    };
    glw.clear();
  }
}
const SpecialCodepoints = {
  LINE_FEED: 10,
  CARRIAGE_RETURN: 13,
  SPACE: 32,
  TAB: 9,
  ZERO_WIDTH_SPACE: 8203,
  ZERO_WIDTH_NON_JOINER: 8204,
  ZERO_WIDTH_JOINER: 8205,
  LEFT_TO_RIGHT_MARK: 8206,
  RIGHT_TO_LEFT_MARK: 8207,
  LEFT_TO_RIGHT_EMBEDDING: 8234,
  RIGHT_TO_LEFT_EMBEDDING: 8235,
  POP_DIRECTIONAL_FORMATTING: 8236,
  LEFT_TO_RIGHT_OVERRIDE: 8237,
  RIGHT_TO_LEFT_OVERRIDE: 8238,
  LINE_SEPARATOR: 8232,
  PARAGRAPH_SEPARATOR: 8233,
  OBJECT_REPLACEMENT_CHARACTER: 65532,
  REPLACEMENT_CHARACTER: 65533,
  ZERO_WIDTH_NO_BREAK_SPACE: 65279,
  LEFT_TO_RIGHT_ISOLATE: 8294,
  RIGHT_TO_LEFT_ISOLATE: 8295,
  FIRST_STRONG_ISOLATE: 8296,
  POP_DIRECTIONAL_ISOLATE: 8297,
  INHIBIT_SYMMETRIC_SWAPPING: 8298,
  ACTIVATE_SYMMETRIC_SWAPPING: 8299,
  INHIBIT_ARABIC_FORM_SHAPING: 8300,
  ACTIVATE_ARABIC_FORM_SHAPING: 8301,
  NATIONAL_DIGIT_SHAPES: 8302,
  NOMINAL_DIGIT_SHAPES: 8303,
  LEFT_TO_RIGHT_BOUNDARY: 8206,
  RIGHT_TO_LEFT_BOUNDARY: 8207
};
class FontShaper {
}
class SdfFontShaper extends FontShaper {
  constructor(data, glyphMap) {
    super();
    __publicField(this, "data");
    __publicField(this, "glyphMap");
    __publicField(this, "kernings");
    this.data = data;
    this.glyphMap = glyphMap;
    const kernings = this.kernings = {};
    data.kernings.forEach((kerning) => {
      const second = kerning.second;
      const firsts = kernings[second] = kernings[second] || {};
      firsts[kerning.first] = kerning.amount;
    });
    this.kernings = kernings;
  }
  *shapeText(props, codepoints) {
    var _a2;
    let codepointResult;
    let lastGlyphId = void 0;
    while ((codepointResult = codepoints.peek()) && !codepointResult.done) {
      const codepoint = codepointResult.value;
      const glyph = this.glyphMap.get(codepoint);
      codepoints.next();
      if (glyph !== void 0) {
        const kerning = lastGlyphId !== void 0 ? (((_a2 = this.kernings[glyph.id]) == null ? void 0 : _a2[lastGlyphId]) || 0) + props.letterSpacing : 0;
        lastGlyphId = glyph.id;
        yield {
          mapped: true,
          glyphId: glyph.id,
          codepoint,
          cluster: codepoints.lastIndex,
          xAdvance: glyph.xadvance + kerning,
          yAdvance: 0,
          xOffset: glyph.xoffset + kerning,
          yOffset: glyph.yoffset,
          xBearing: 0,
          yBearing: 0,
          width: glyph.width,
          height: glyph.height
        };
      } else {
        if (codepoint === SpecialCodepoints.LINE_FEED) {
          lastGlyphId = void 0;
        }
        yield {
          mapped: false,
          codepoint,
          cluster: codepoints.lastIndex
        };
      }
    }
  }
}
class SdfTrFontFace extends TrFontFace {
  constructor(type, options) {
    super(options);
    __publicField(this, "type");
    __publicField(this, "texture");
    /**
     * Height of the tallest character in the font including the whitespace above it
     * in SDF/vertex units.
     */
    __publicField(this, "maxCharHeight", 0);
    __publicField(this, "shaper");
    __publicField(this, "glyphMap", /* @__PURE__ */ new Map());
    __publicField(this, "data");
    const { atlasUrl, atlasDataUrl, stage } = options;
    this.type = type;
    stage.renderer;
    this.texture = stage.txManager.createTexture("ImageTexture", {
      src: atlasUrl,
      // IMPORTANT: The SDF shader requires the alpha channel to NOT be
      // premultiplied on the atlas texture. If it is premultiplied, the
      // rendering of SDF glyphs (especially single-channel SDF fonts) will
      // be very jagged.
      premultiplyAlpha: false
    });
    stage.txManager.loadTexture(this.texture, true);
    this.texture.preventCleanup = true;
    this.texture.on("loaded", () => {
      this.checkLoaded();
      stage.requestRender();
    });
    fetchJson(atlasDataUrl).then((response) => {
      var _a2;
      this.data = JSON.parse(response);
      assertTruthy(this.data);
      let maxCharHeight = 0;
      this.data.chars.forEach((glyph) => {
        this.glyphMap.set(glyph.id, glyph);
        const charHeight = glyph.yoffset + glyph.height;
        if (charHeight > maxCharHeight) {
          maxCharHeight = charHeight;
        }
      });
      this.maxCharHeight = maxCharHeight;
      this.shaper = new SdfFontShaper(this.data, this.glyphMap);
      if (!this.metrics) {
        if ((_a2 = this.data) == null ? void 0 : _a2.lightningMetrics) {
          const { ascender, descender, lineGap, unitsPerEm } = this.data.lightningMetrics;
          this.metrics = {
            ascender: ascender / unitsPerEm,
            descender: descender / unitsPerEm,
            lineGap: lineGap / unitsPerEm
          };
        } else {
          throw new Error("Font metrics not found in ".concat(this.type, " font ").concat(this.fontFamily, ". ") + "Make sure you are using the latest version of the Lightning 3 `msdf-generator` tool to generate your SDF fonts.");
        }
      }
      this.checkLoaded();
    }).catch(console.error);
  }
  getAtlasEntry(glyphId) {
    const glyph = this.glyphMap.get(glyphId);
    if (glyph === void 0) {
      throw new Error("Glyph ".concat(glyphId, " not found in font ").concat(this.fontFamily));
    }
    return {
      x: glyph.x,
      y: glyph.y,
      width: glyph.width,
      height: glyph.height
    };
  }
  checkLoaded() {
    if (this.loaded)
      return;
    if (this.texture.state === "loaded" && this.data) {
      this.loaded = true;
      this.emit("loaded");
    }
  }
}
let renderer$2;
function startLightningRenderer(options, rootId = "app") {
  renderer$2 = new RendererMain(options, rootId);
  return renderer$2;
}
function loadFonts(fonts2) {
  const stage = renderer$2.stage;
  for (const font of fonts2) {
    if ("type" in font && (font.type === "msdf" || font.type === "ssdf")) {
      if (renderer$2.stage.renderer.mode === "webgl") {
        stage.fontManager.addFontFace(new SdfTrFontFace(font.type, {
          ...font,
          stage
        }));
      }
    } else if ("fontUrl" in font) {
      stage.fontManager.addFontFace(new WebTrFontFace(font));
    }
  }
}
({ "BASE_URL": "/solid-demo-app/", "DEV": false, "LEGACY": false, "MODE": "production", "PROD": true, "SSR": false });
const Config = {
  debug: false,
  focusDebug: false,
  keyDebug: false,
  animationsEnabled: true,
  animationSettings: {
    duration: 250,
    easing: "ease-in-out"
  },
  fontSettings: {
    fontFamily: "Ubuntu",
    fontSize: 100
  },
  setActiveElement: () => {
  },
  focusStateKey: "$focus"
};
const NodeType = {
  Element: "element",
  TextNode: "textNode",
  Text: "text"
};
function log(msg, node, ...args) {
}
const isFunc = (obj) => obj instanceof Function;
const isFunction = (obj) => typeof obj === "function";
function isArray(item) {
  return Array.isArray(item);
}
function isString(item) {
  return typeof item === "string";
}
function isNumber(item) {
  return typeof item === "number";
}
function isInteger(item) {
  return Number.isInteger(item);
}
function isINode(node) {
  return "destroy" in node && typeof node.destroy === "function";
}
function isElementNode(node) {
  return node instanceof ElementNode;
}
function isElementText(node) {
  return node._type === NodeType.TextNode;
}
function isTextNode(node) {
  return node._type === NodeType.Text;
}
function keyExists(obj, keys) {
  for (const key2 of keys) {
    if (key2 in obj) {
      return true;
    }
  }
  return false;
}
class States extends Array {
  constructor(callback, initialState = {}) {
    var __super = (...args) => {
      super(...args);
      __publicField(this, "onChange");
      return this;
    };
    if (isArray(initialState)) {
      __super(...initialState);
    } else if (isString(initialState)) {
      __super(initialState);
    } else {
      __super(...Object.entries(initialState).filter(([_key, value]) => value).map(([key2]) => key2));
    }
    this.onChange = callback;
    return this;
  }
  has(state) {
    return this.indexOf(state) >= 0 || this.indexOf("$".concat(state)) >= 0;
  }
  is(state) {
    return this.indexOf(state) >= 0;
  }
  add(state) {
    if (this.has(state)) {
      return;
    }
    this.push(state);
    this.onChange();
  }
  toggle(state, force) {
    if (force === true) {
      this.add(state);
    } else if (force === false) {
      this.remove(state);
    } else {
      if (this.has(state)) {
        this.remove(state);
      } else {
        this.add(state);
      }
    }
  }
  merge(newStates) {
    if (isArray(newStates)) {
      this.length = 0;
      this.push(...newStates);
    } else if (isString(newStates)) {
      this.length = 0;
      this.push(newStates);
    } else {
      for (const state in newStates) {
        const value = newStates[state];
        if (value) {
          if (!this.has(state)) {
            this.push(state);
          }
        } else {
          const stateIndexToRemove = this.indexOf(state);
          if (stateIndexToRemove >= 0) {
            this.splice(stateIndexToRemove, 1);
          }
        }
      }
    }
    return this;
  }
  remove(state) {
    const stateIndexToRemove = this.indexOf(state);
    if (stateIndexToRemove >= 0) {
      this.splice(stateIndexToRemove, 1);
      this.onChange();
    }
  }
}
function calculateFlex(node) {
  var _a2;
  const children2 = [];
  let hasOrder = false;
  let growSize = 0;
  for (let i = 0; i < node.children.length; i++) {
    const c = node.children[i];
    if (isElementText(c) && c.text && !(c.width || c.height)) {
      return false;
    }
    if (isTextNode(c) || c.flexItem === false) {
      continue;
    }
    if (c.flexOrder !== void 0) {
      hasOrder = true;
    }
    if (c.flexGrow !== void 0) {
      growSize += c.flexGrow;
    }
    children2.push(c);
  }
  if (hasOrder) {
    children2.sort((a, b) => (a.flexOrder || 0) - (b.flexOrder || 0));
  } else if (node.direction === "rtl") {
    children2.reverse();
  }
  const numChildren = children2.length;
  const direction = node.flexDirection || "row";
  const isRow = direction === "row";
  const dimension = isRow ? "width" : "height";
  const crossDimension = isRow ? "height" : "width";
  const marginOne = isRow ? "marginLeft" : "marginTop";
  const crossMarginOne = isRow ? "marginTop" : "marginLeft";
  const marginTwo = isRow ? "marginRight" : "marginBottom";
  const crossMarginTwo = isRow ? "marginBottom" : "marginRight";
  const prop = isRow ? "x" : "y";
  const crossProp = isRow ? "y" : "x";
  const containerSize = node[dimension] || 0;
  let containerCrossSize = node[crossDimension] || 0;
  const gap = node.gap || 0;
  const justify = node.justifyContent || "flexStart";
  const align = node.alignItems;
  let containerUpdated = false;
  if (growSize && numChildren > 1) {
    node.flexBoundary = node.flexBoundary || "fixed";
    const flexBasis = children2.reduce((prev, c) => prev + (c.flexGrow != null && c.flexGrow >= 0 ? 0 : c[dimension] || 0) + (c[marginOne] || 0) + (c[marginTwo] || 0), 0);
    const growFactor = (containerSize - flexBasis - gap * (numChildren - 1)) / growSize;
    if (growFactor >= 0) {
      for (let i = 0; i < numChildren; i++) {
        const c = children2[i];
        if (c.flexGrow != null && c.flexGrow >= 0) {
          c[dimension] = c.flexGrow * growFactor;
        }
      }
    } else {
      console.warn("Negative growFactor, flexGrow not applied");
    }
  }
  let itemSize = 0;
  if (justify === "center" || justify === "spaceBetween" || justify === "spaceEvenly") {
    itemSize = children2.reduce((prev, c) => prev + (c[dimension] || 0) + (c[marginOne] || 0) + (c[marginTwo] || 0), 0);
  }
  const crossAlignChild = containerCrossSize && align ? (c) => {
    if (align === "flexStart") {
      c[crossProp] = c[crossMarginOne] || 0;
    } else if (align === "center") {
      c[crossProp] = (containerCrossSize - (c[crossDimension] || 0)) / 2 + (c[crossMarginOne] || 0);
    } else if (align === "flexEnd") {
      c[crossProp] = containerCrossSize - (c[crossDimension] || 0) - (c[crossMarginTwo] || 0);
    }
  } : (c) => c;
  if (isRow && node._calcHeight && !node.flexCrossBoundary) {
    const newHeight = ((_a2 = children2[0]) == null ? void 0 : _a2.height) || node.height;
    if (newHeight !== node.height) {
      containerUpdated = true;
      node.height = containerCrossSize = newHeight;
    }
  }
  if (justify === "flexStart") {
    let start = node.padding || 0;
    for (let i = 0; i < children2.length; i++) {
      const c = children2[i];
      c[prop] = start + (c[marginOne] || 0);
      start += (c[dimension] || 0) + gap + (c[marginOne] || 0) + (c[marginTwo] || 0);
      crossAlignChild(c);
    }
    if (node.flexBoundary !== "fixed") {
      const calculatedSize = start - gap + (node.padding || 0);
      if (calculatedSize !== containerSize) {
        node["preFlex".concat(dimension)] = containerSize;
        node[dimension] = calculatedSize;
        return true;
      }
    }
  } else if (justify === "flexEnd") {
    let start = containerSize;
    for (let i = numChildren - 1; i >= 0; i--) {
      const c = children2[i];
      c[prop] = start - (c[dimension] || 0) - (c[marginTwo] || 0);
      start -= (c[dimension] || 0) + gap + (c[marginOne] || 0) + (c[marginTwo] || 0);
      crossAlignChild(c);
    }
  } else if (justify === "center") {
    let start = (containerSize - (itemSize + gap * (numChildren - 1))) / 2;
    for (let i = 0; i < children2.length; i++) {
      const c = children2[i];
      c[prop] = start + (c[marginOne] || 0);
      start += (c[dimension] || 0) + gap + (c[marginOne] || 0) + (c[marginTwo] || 0);
      crossAlignChild(c);
    }
  } else if (justify === "spaceBetween") {
    const toPad = (containerSize - itemSize) / (numChildren - 1);
    let start = 0;
    for (let i = 0; i < children2.length; i++) {
      const c = children2[i];
      c[prop] = start + (c[marginOne] || 0);
      start += (c[dimension] || 0) + toPad + (c[marginOne] || 0) + (c[marginTwo] || 0);
      crossAlignChild(c);
    }
  } else if (justify === "spaceEvenly") {
    const toPad = (containerSize - itemSize) / (numChildren + 1);
    let start = toPad;
    for (let i = 0; i < children2.length; i++) {
      const c = children2[i];
      c[prop] = start + (c[marginOne] || 0);
      start += (c[dimension] || 0) + toPad + (c[marginOne] || 0) + (c[marginTwo] || 0);
      crossAlignChild(c);
    }
  }
  return containerUpdated;
}
const keyMapEntries = {
  ArrowLeft: "Left",
  ArrowRight: "Right",
  ArrowUp: "Up",
  ArrowDown: "Down",
  Enter: "Enter",
  l: "Last",
  " ": "Space",
  Backspace: "Back",
  Escape: "Escape"
};
const keyHoldMapEntries = {
  // Enter: 'EnterHold',
};
const flattenKeyMap = (keyMap, targetMap) => {
  for (const [key2, value] of Object.entries(keyMap)) {
    if (Array.isArray(value)) {
      value.forEach((v) => {
        targetMap[v] = key2;
      });
    } else if (value === null) {
      delete targetMap[key2];
    } else {
      targetMap[value] = key2;
    }
  }
};
let needFocusDebugStyles = true;
const addFocusDebug = (prevFocusPath2, newFocusPath) => {
  if (needFocusDebugStyles) {
    const style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = '\n      [data-focus="3"] {\n        border: 2px solid rgba(255, 33, 33, 0.2);\n        border-radius: 5px;\n        transition: border-color 0.3s ease;\n      }\n\n      [data-focus="2"] {\n        border: 2px solid rgba(255, 33, 33, 0.4);\n        border-radius: 5px;\n        transition: border-color 0.3s ease;\n      }\n\n      [data-focus="1"] {\n        border: 4px solid rgba(255, 33, 33, 0.9);\n        border-radius: 5px;\n        transition: border-color 0.5s ease;\n      }\n    ';
    document.head.appendChild(style);
    needFocusDebugStyles = false;
  }
  prevFocusPath2.forEach((elm) => {
    elm.data = {
      ...elm.data,
      focus: void 0
    };
  });
  newFocusPath.forEach((elm, i) => {
    elm.data = {
      ...elm.data,
      focus: i + 1
    };
  });
};
let activeElement$1;
const setActiveElement$1 = (elm) => {
  updateFocusPath(elm, activeElement$1);
  activeElement$1 = elm;
  Config.setActiveElement(elm);
};
let focusPath$1 = [];
const updateFocusPath = (currentFocusedElm, prevFocusedElm) => {
  var _a2, _b;
  let current = currentFocusedElm;
  const fp = [];
  while (current) {
    if (!current.states.has(Config.focusStateKey) || current === currentFocusedElm) {
      current.states.add(Config.focusStateKey);
      (_a2 = current.onFocus) == null ? void 0 : _a2.call(current, currentFocusedElm, prevFocusedElm);
      (_b = current.onFocusChanged) == null ? void 0 : _b.call(current, true, currentFocusedElm, prevFocusedElm);
    }
    fp.push(current);
    current = current.parent;
  }
  focusPath$1.forEach((elm) => {
    var _a3, _b2;
    if (!fp.includes(elm)) {
      elm.states.remove(Config.focusStateKey);
      (_a3 = elm.onBlur) == null ? void 0 : _a3.call(elm, currentFocusedElm, prevFocusedElm);
      (_b2 = elm.onFocusChanged) == null ? void 0 : _b2.call(elm, false, currentFocusedElm, prevFocusedElm);
    }
  });
  if (Config.focusDebug) {
    addFocusDebug(focusPath$1, fp);
  }
  focusPath$1 = fp;
  return fp;
};
const propagateKeyPress = (e, mappedEvent, isHold = false, isUp = false) => {
  let finalFocusElm;
  const numItems = focusPath$1.length;
  for (let i = numItems - 1; i >= 0; i--) {
    const elm = focusPath$1[i];
    const captureKey = "capture".concat(e.key);
    const captureHandler = elm[captureKey] || elm.captureKey;
    if (isFunction(captureHandler)) {
      if (captureHandler.call(elm, e, elm, finalFocusElm) === true) {
        return true;
      }
    }
  }
  for (let i = 0; i < numItems; i++) {
    const elm = focusPath$1[i];
    if (!finalFocusElm)
      finalFocusElm = elm;
    if (mappedEvent) {
      const eventHandler = isUp ? elm["on".concat(mappedEvent, "Release")] : elm["on".concat(mappedEvent)];
      if (isFunction(eventHandler)) {
        if (eventHandler.call(elm, e, elm, finalFocusElm) === true) {
          return true;
        }
      }
    }
    if (!isUp) {
      const fallbackHandler = isHold ? elm.onKeyHold : elm.onKeyPress;
      if (isFunction(fallbackHandler)) {
        if (fallbackHandler.call(elm, e, mappedEvent, elm, finalFocusElm) === true) {
          return true;
        }
      }
    }
  }
  return false;
};
const DEFAULT_KEY_HOLD_THRESHOLD = 500;
const keyHoldTimeouts = {};
const handleKeyEvents = (delay2, keydown, keyup) => {
  if (keydown) {
    const key2 = keydown.key || keydown.keyCode;
    const mappedKeyHoldEvent = keyHoldMapEntries[keydown.key] || keyHoldMapEntries[keydown.keyCode];
    const mappedKeyEvent = keyMapEntries[keydown.key] || keyMapEntries[keydown.keyCode];
    if (mappedKeyHoldEvent) {
      if (!keyHoldTimeouts[key2]) {
        keyHoldTimeouts[key2] = window.setTimeout(() => {
          keyHoldTimeouts[key2] = true;
          propagateKeyPress(keydown, mappedKeyHoldEvent, true);
        }, delay2);
      }
      return;
    }
    propagateKeyPress(keydown, mappedKeyEvent, false);
  } else if (keyup) {
    const key2 = keyup.key || keyup.keyCode;
    const mappedKeyEvent = keyMapEntries[keyup.key] || keyMapEntries[keyup.keyCode];
    if (keyHoldTimeouts[key2] === true) {
      delete keyHoldTimeouts[key2];
    } else if (keyHoldTimeouts[key2]) {
      clearTimeout(keyHoldTimeouts[key2]);
      delete keyHoldTimeouts[key2];
      propagateKeyPress(keyup, mappedKeyEvent, false);
    }
    propagateKeyPress(keyup, mappedKeyEvent, false, true);
  }
};
const useFocusManager$1 = ({ userKeyMap, keyHoldOptions, ownerContext = (cb) => {
  cb();
} } = {}) => {
  if (userKeyMap) {
    flattenKeyMap(userKeyMap, keyMapEntries);
  }
  if (keyHoldOptions == null ? void 0 : keyHoldOptions.userKeyHoldMap) {
    flattenKeyMap(keyHoldOptions.userKeyHoldMap, keyHoldMapEntries);
  }
  const delay2 = (keyHoldOptions == null ? void 0 : keyHoldOptions.holdThreshold) || DEFAULT_KEY_HOLD_THRESHOLD;
  const runKeyEvent = handleKeyEvents.bind(null, delay2);
  const keyPressHandler = (event) => ownerContext(() => {
    runKeyEvent(event, void 0);
  });
  const keyUpHandler = (event) => ownerContext(() => {
    runKeyEvent(void 0, event);
  });
  document.addEventListener("keyup", keyUpHandler);
  document.addEventListener("keydown", keyPressHandler);
  return {
    cleanup: () => {
      document.removeEventListener("keydown", keyPressHandler);
      document.removeEventListener("keyup", keyUpHandler);
      for (const [_, timeout] of Object.entries(keyHoldTimeouts)) {
        if (timeout && timeout !== true)
          clearTimeout(timeout);
      }
    },
    focusPath: () => focusPath$1
  };
};
const layoutQueue = /* @__PURE__ */ new Set();
function runLayout() {
  const queue = [...layoutQueue];
  layoutQueue.clear();
  for (let i = queue.length - 1; i >= 0; i--) {
    const node = queue[i];
    node.updateLayout();
  }
}
function convertEffectsToShader(node, styleEffects) {
  const effects = [];
  for (const type in styleEffects) {
    effects.push(renderer$2.createEffect(type, styleEffects[type], type));
  }
  return renderer$2.createShader("DynamicShader", { effects });
}
function borderAccessor(direction = "") {
  return {
    set(value) {
      if (isNumber(value)) {
        value = { width: value, color: 255 };
      }
      this.effects = this.effects ? {
        ...this.effects || {},
        ...{ ["border".concat(direction)]: value }
      } : { ["border".concat(direction)]: value };
    },
    get() {
      var _a2;
      return (_a2 = this.effects) == null ? void 0 : _a2["border".concat(direction)];
    }
  };
}
const LightningRendererNumberProps = [
  "alpha",
  "color",
  "colorTop",
  "colorRight",
  "colorLeft",
  "colorBottom",
  "colorTl",
  "colorTr",
  "colorBl",
  "colorBr",
  "height",
  "fontSize",
  "lineHeight",
  "mount",
  "mountX",
  "mountY",
  "pivot",
  "pivotX",
  "pivotY",
  "rotation",
  "scale",
  "scaleX",
  "scaleY",
  "width",
  "worldX",
  "worldY",
  "x",
  "y",
  "zIndex",
  "zIndexLocked"
];
const LightningRendererNonAnimatingProps = [
  "absX",
  "absY",
  "autosize",
  "clipping",
  "contain",
  "data",
  "fontFamily",
  "fontStretch",
  "fontStyle",
  "fontWeight",
  "imageType",
  "letterSpacing",
  "maxLines",
  "offsetY",
  "overflowSuffix",
  "preventCleanup",
  "rtt",
  "scrollable",
  "scrollY",
  "srcHeight",
  "srcWidth",
  "srcX",
  "srcY",
  "strictBounds",
  "text",
  "textAlign",
  "textBaseline",
  "textOverflow",
  "texture",
  "textureOptions",
  "verticalAlign",
  "wordWrap"
];
class ElementNode extends Object {
  constructor(name) {
    super();
    this._type = name === "text" ? NodeType.TextNode : NodeType.Element;
    this.rendered = false;
    this.lng = {};
    this.children = [];
  }
  get effects() {
    return this._effects;
  }
  set effects(v) {
    this._effects = v;
    if (this.rendered) {
      this.lng.shader = convertEffectsToShader(this, v);
    }
  }
  set id(id) {
    var _a2;
    this._id = id;
    if ((_a2 = Config.rendererOptions) == null ? void 0 : _a2.inspector) {
      this.data = { ...this.data, testId: id };
    }
  }
  get id() {
    return this._id;
  }
  get parent() {
    return this._parent;
  }
  set parent(p) {
    var _a2;
    this._parent = p;
    if (this.rendered) {
      this.lng.parent = (_a2 = p == null ? void 0 : p.lng) != null ? _a2 : null;
    }
  }
  insertChild(node, beforeNode) {
    node.parent = this;
    if (beforeNode) {
      this.removeChild(node);
      const index = this.children.indexOf(beforeNode);
      if (index >= 0) {
        this.children.splice(index, 0, node);
        return;
      }
    }
    this.children.push(node);
  }
  removeChild(node) {
    const nodeIndexToRemove = this.children.indexOf(node);
    if (nodeIndexToRemove >= 0) {
      this.children.splice(nodeIndexToRemove, 1);
    }
  }
  get selectedNode() {
    const selectedIndex = this.selected || 0;
    for (let i = selectedIndex; i < this.children.length; i++) {
      const element = this.children[i];
      if (isElementNode(element)) {
        this.selected = i;
        return element;
      }
    }
    return void 0;
  }
  set shader(shaderProps) {
    let shProps = shaderProps;
    if (isArray(shaderProps)) {
      shProps = renderer$2.createShader(...shaderProps);
    }
    this.lng.shader = shProps;
  }
  _sendToLightningAnimatable(name, value) {
    if (this.transition && this.rendered && Config.animationsEnabled && (this.transition === true || this.transition[name])) {
      const animationSettings = this.transition === true || this.transition[name] === true ? void 0 : this.transition[name];
      const animationController = this.animate({ [name]: value }, animationSettings);
      if (this.onAnimation) {
        const animationEvents = Object.keys(this.onAnimation);
        for (const event of animationEvents) {
          const handler = this.onAnimation[event];
          animationController.on(event, (controller, props) => {
            handler.call(this, controller, name, value, props);
          });
        }
      }
      return animationController.start();
    }
    this.lng[name] = value;
  }
  animate(props, animationSettings) {
    assertTruthy(this.rendered);
    return this.lng.animate(props, animationSettings || this.animationSettings || {});
  }
  chain(props, animationSettings) {
    if (this._animationRunning) {
      this._animationQueue = [];
      this._animationRunning = false;
    }
    if (animationSettings) {
      this._animationQueueSettings = animationSettings;
    } else if (!this._animationQueueSettings) {
      this._animationQueueSettings = animationSettings || this.animationSettings;
    }
    animationSettings = animationSettings || this._animationQueueSettings;
    this._animationQueue = this._animationQueue || [];
    this._animationQueue.push({ props, animationSettings });
    return this;
  }
  async start() {
    let animation = this._animationQueue.shift();
    while (animation) {
      this._animationRunning = true;
      await this.animate(animation.props, animation.animationSettings).start().waitUntilStopped();
      animation = this._animationQueue.shift();
    }
    this._animationRunning = false;
    this._animationQueueSettings = void 0;
  }
  emit(event, ...args) {
    let current = this;
    const capitalizedEvent = "on".concat(event.charAt(0).toUpperCase()).concat(event.slice(1));
    while (current) {
      const handler = current[capitalizedEvent];
      if (isFunction(handler)) {
        if (handler.call(current, this, ...args) === true) {
          return true;
        }
      }
      current = current.parent;
    }
    return false;
  }
  setFocus() {
    if (this.rendered) {
      if (this.forwardFocus !== void 0) {
        if (isFunc(this.forwardFocus)) {
          if (this.forwardFocus.call(this, this) !== false) {
            return;
          }
        } else {
          const focusedIndex = typeof this.forwardFocus === "number" ? this.forwardFocus : null;
          const nodes = this.children;
          if (focusedIndex !== null && focusedIndex < nodes.length) {
            const child = nodes[focusedIndex];
            isElementNode(child) && child.setFocus();
            return;
          }
        }
      }
      queueMicrotask(() => setActiveElement$1(this));
    } else {
      this._autofocus = true;
    }
  }
  _layoutOnLoad() {
    this.lng.on("loaded", () => {
      this.parent.updateLayout();
    });
  }
  getText() {
    let result = "";
    for (let i = 0; i < this.children.length; i++) {
      result += this.children[i].text;
    }
    return result;
  }
  destroy() {
    if (this.onDestroy) {
      const destroyPromise = this.onDestroy(this);
      if (destroyPromise instanceof Promise) {
        destroyPromise.then(() => this._destroy());
      } else {
        this._destroy();
      }
    } else {
      this._destroy();
    }
  }
  _destroy() {
    var _a2;
    if (this._queueDelete && isINode(this.lng)) {
      this.lng.destroy();
      if ((_a2 = this.parent) == null ? void 0 : _a2.requiresLayout()) {
        this.parent.updateLayout();
      }
    }
  }
  set style(style) {
    if (!style) {
      return;
    }
    this._style = style;
    for (const key2 in this._style) {
      if (this[key2] === void 0) {
        this[key2] = this._style[key2];
      }
    }
  }
  get style() {
    return this._style;
  }
  get hasChildren() {
    return this.children.length > 0;
  }
  set src(src) {
    if (typeof src === "string") {
      this.lng.src = src;
      if (!this.color && this.rendered) {
        this.color = 4294967295;
      }
    } else {
      this.color = 0;
    }
  }
  get src() {
    return this.lng.src;
  }
  getChildById(id) {
    return this.children.find((c) => c.id === id);
  }
  searchChildrenById(id) {
    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      if (isElementNode(child)) {
        if (child.id === id) {
          return child;
        }
        const found = child.searchChildrenById(id);
        if (found) {
          return found;
        }
      }
    }
  }
  set states(states) {
    this._states = this._states ? this._states.merge(states) : new States(this._stateChanged.bind(this), states);
    if (this.rendered) {
      this._stateChanged();
    }
  }
  get states() {
    this._states = this._states || new States(this._stateChanged.bind(this));
    return this._states;
  }
  get animationSettings() {
    return this._animationSettings || Config.animationSettings;
  }
  set animationSettings(animationSettings) {
    this._animationSettings = animationSettings;
  }
  set hidden(val) {
    this.alpha = val ? 0 : 1;
  }
  get hidden() {
    return this.alpha === 0;
  }
  /**
   * Sets the autofocus state of the element.
   * When set to a truthy value, the element will automatically gain focus.
   * You can also set it to a signal to recalculate
   *
   * @param val - A value to determine if the element should autofocus.
   *              A truthy value enables autofocus, otherwise disables it.
   */
  set autofocus(val) {
    this._autofocus = val;
    val && queueMicrotask(() => this.setFocus());
  }
  get autofocus() {
    return this._autofocus;
  }
  requiresLayout() {
    return this.display === "flex" || this.onLayout;
  }
  set updateLayoutOn(v) {
    this.updateLayout();
  }
  get updateLayoutOn() {
    return null;
  }
  updateLayout() {
    var _a2, _b;
    if (this.hasChildren) {
      if (this.display === "flex") {
        if (calculateFlex(this)) {
          (_a2 = this.parent) == null ? void 0 : _a2.updateLayout();
        }
      }
      if (isFunc(this.onLayout) && this.onLayout.call(this, this)) {
        (_b = this.parent) == null ? void 0 : _b.updateLayout();
      }
    }
  }
  _stateChanged() {
    log("State Changed: ", this, this.states);
    if (this.forwardStates) {
      const states2 = this.states.slice();
      this.children.forEach((c) => {
        c.states = states2;
      });
    }
    const states = this.states;
    if (this._undoStyles || keyExists(this, states)) {
      let stylesToUndo;
      if (this._undoStyles && this._undoStyles.length) {
        stylesToUndo = {};
        this._undoStyles.forEach((styleKey) => {
          stylesToUndo[styleKey] = this.style[styleKey];
        });
      }
      const numStates = states.length;
      if (numStates === 0) {
        Object.assign(this, stylesToUndo);
        this._undoStyles = [];
        return;
      }
      let newStyles;
      if (numStates === 1) {
        newStyles = this[states[0]];
        newStyles = stylesToUndo ? { ...stylesToUndo, ...newStyles } : newStyles;
      } else {
        newStyles = states.reduce((acc, state) => {
          const styles2 = this[state];
          return styles2 ? { ...acc, ...styles2 } : acc;
        }, stylesToUndo || {});
      }
      if (newStyles) {
        this._undoStyles = Object.keys(newStyles);
        if (newStyles.transition !== void 0) {
          this.transition = newStyles.transition;
        }
        Object.assign(this, newStyles);
      } else {
        this._undoStyles = [];
      }
    }
  }
  render(topNode) {
    var _a2;
    const node = this;
    const parent = this.parent;
    if (!parent) {
      console.warn("Parent not set - no node created for: ", this);
      return;
    }
    if (!parent.rendered) {
      console.warn("Parent not rendered yet: ", this);
      return;
    }
    if (parent.requiresLayout()) {
      layoutQueue.add(parent);
    }
    if (this.rendered) {
      return;
    }
    if (this._states) {
      this._stateChanged();
    }
    const props = node.lng;
    props.x = props.x || 0;
    props.y = props.y || 0;
    props.parent = parent.lng;
    if (this.right || this.right === 0) {
      props.x = (parent.width || 0) - this.right;
      props.mountX = 1;
    }
    if (this.bottom || this.bottom === 0) {
      props.y = (parent.height || 0) - this.bottom;
      props.mountY = 1;
    }
    if (this.center) {
      this.centerX = this.centerY = true;
    }
    if (this.centerX) {
      props.x += (parent.width || 0) / 2;
      props.mountX = 0.5;
    }
    if (this.centerY) {
      props.y += (parent.height || 0) / 2;
      props.mountY = 0.5;
    }
    if (isElementText(node)) {
      const textProps = props;
      if (Config.fontSettings) {
        for (const key2 in Config.fontSettings) {
          if (textProps[key2] === void 0) {
            textProps[key2] = Config.fontSettings[key2];
          }
        }
      }
      textProps.text = textProps.text || node.getText();
      if (textProps.textAlign && !textProps.contain) {
        console.warn("Text align requires contain: ", node.getText());
      }
      if (textProps.contain) {
        if (!textProps.width) {
          textProps.width = (parent.width || 0) - textProps.x - (textProps.marginRight || 0);
        }
        if (textProps.contain === "both" && !textProps.height && !textProps.maxLines) {
          textProps.height = (parent.height || 0) - textProps.y - (textProps.marginBottom || 0);
        } else if (textProps.maxLines === 1) {
          textProps.height = textProps.height || textProps.lineHeight || textProps.fontSize;
        }
      }
      if (node._effects) {
        props.shader = convertEffectsToShader(node, node._effects);
      }
      node.lng = renderer$2.createTextNode(props);
      if (parent.requiresLayout()) {
        if (!props.width || !props.height) {
          node._layoutOnLoad();
        }
      }
    } else {
      if (!props.texture) {
        if (isNaN(props.width)) {
          props.width = (parent.width || 0) - props.x;
          node._calcWidth = true;
        }
        if (isNaN(props.height)) {
          props.height = (parent.height || 0) - props.y;
          node._calcHeight = true;
        }
        if (props.rtt && !props.color) {
          props.color = 4294967295;
        }
        if (!props.color && !props.src) {
          props.color = 0;
        }
      }
      if (node._effects) {
        props.shader = convertEffectsToShader(node, node._effects);
      }
      node.lng = renderer$2.createNode(props);
    }
    node.rendered = true;
    if (node.autosize && parent.requiresLayout()) {
      node._layoutOnLoad();
    }
    isFunc(this.onCreate) && this.onCreate.call(this, node);
    if (node.onEvent) {
      for (const [name, handler] of Object.entries(node.onEvent)) {
        node.lng.on(name, (_inode, data) => handler.call(node, node, data));
      }
    }
    if ((_a2 = node.lng) == null ? void 0 : _a2.div) {
      node.lng.div.element = node;
    }
    if (node._type === NodeType.Element) {
      const numChildren = node.children.length;
      for (let i = 0; i < numChildren; i++) {
        const c = node.children[i];
        if (isElementNode(c)) {
          c.render();
        }
      }
    }
    if (topNode) {
      runLayout();
    }
    node._autofocus && node.setFocus();
  }
}
for (const key2 of LightningRendererNumberProps) {
  Object.defineProperty(ElementNode.prototype, key2, {
    get() {
      return this.lng[key2];
    },
    set(v) {
      this._sendToLightningAnimatable(key2, v);
    }
  });
}
for (const key2 of LightningRendererNonAnimatingProps) {
  Object.defineProperty(ElementNode.prototype, key2, {
    get() {
      return this.lng[key2];
    },
    set(v) {
      this.lng[key2] = v;
    }
  });
}
function createEffectAccessor(key2) {
  return {
    set(value) {
      this.effects = this.effects ? {
        ...this.effects,
        [key2]: value
      } : { [key2]: value };
    },
    get() {
      var _a2;
      return (_a2 = this.effects) == null ? void 0 : _a2[key2];
    }
  };
}
Object.defineProperties(ElementNode.prototype, {
  border: borderAccessor(),
  borderLeft: borderAccessor("Left"),
  borderRight: borderAccessor("Right"),
  borderTop: borderAccessor("Top"),
  borderBottom: borderAccessor("Bottom"),
  linearGradient: createEffectAccessor("linearGradient"),
  radialGradient: createEffectAccessor("radialGradient"),
  radialProgress: createEffectAccessor("radialProgressGradient"),
  borderRadius: {
    set(radius) {
      this.effects = this.effects ? {
        ...this.effects,
        radius: { radius }
      } : { radius: { radius } };
    },
    get() {
      var _a2, _b;
      return (_b = (_a2 = this.effects) == null ? void 0 : _a2.radius) == null ? void 0 : _b.radius;
    }
  }
});
const sharedConfig = {
  context: void 0,
  registry: void 0,
  effects: void 0,
  done: false,
  getContextId() {
    return getContextId(this.context.count);
  },
  getNextContextId() {
    return getContextId(this.context.count++);
  }
};
function getContextId(count2) {
  const num = String(count2), len = num.length - 1;
  return sharedConfig.context.id + (len ? String.fromCharCode(96 + len) : "") + num;
}
function setHydrateContext(context) {
  sharedConfig.context = context;
}
const equalFn = (a, b) => a === b;
const $PROXY = Symbol("solid-proxy");
const SUPPORTS_PROXY$1 = typeof Proxy === "function";
const $TRACK = Symbol("solid-track");
const signalOptions = {
  equals: equalFn
};
let runEffects = runQueue;
const STALE = 1;
const PENDING = 2;
const UNOWNED = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
};
const NO_INIT = {};
var Owner = null;
let Transition = null;
let ExternalSourceConfig = null;
let Listener = null;
let Updates = null;
let Effects = null;
let ExecCount = 0;
function createRoot(fn, detachedOwner) {
  const listener = Listener, owner = Owner, unowned = fn.length === 0, current = owner, root = unowned ? UNOWNED : {
    owned: null,
    cleanups: null,
    context: current ? current.context : null,
    owner: current
  }, updateFn = unowned ? fn : () => fn(() => untrack(() => cleanNode(root)));
  Owner = root;
  Listener = null;
  try {
    return runUpdates(updateFn, true);
  } finally {
    Listener = listener;
    Owner = owner;
  }
}
function createSignal(value, options) {
  options = options ? Object.assign({}, signalOptions, options) : signalOptions;
  const s = {
    value,
    observers: null,
    observerSlots: null,
    comparator: options.equals || void 0
  };
  const setter = (value2) => {
    if (typeof value2 === "function") {
      value2 = value2(s.value);
    }
    return writeSignal(s, value2);
  };
  return [readSignal.bind(s), setter];
}
function createComputed(fn, value, options) {
  const c = createComputation(fn, value, true, STALE);
  updateComputation(c);
}
function createRenderEffect(fn, value, options) {
  const c = createComputation(fn, value, false, STALE);
  updateComputation(c);
}
function createEffect(fn, value, options) {
  runEffects = runUserEffects;
  const c = createComputation(fn, value, false, STALE);
  c.user = true;
  Effects ? Effects.push(c) : updateComputation(c);
}
function createMemo(fn, value, options) {
  options = options ? Object.assign({}, signalOptions, options) : signalOptions;
  const c = createComputation(fn, value, true, 0);
  c.observers = null;
  c.observerSlots = null;
  c.comparator = options.equals || void 0;
  updateComputation(c);
  return readSignal.bind(c);
}
function isPromise(v) {
  return v && typeof v === "object" && "then" in v;
}
function createResource(pSource, pFetcher, pOptions) {
  let source;
  let fetcher;
  let options;
  if (typeof pFetcher === "function") {
    source = pSource;
    fetcher = pFetcher;
    options = {};
  } else {
    source = true;
    fetcher = pSource;
    options = pFetcher || {};
  }
  let pr = null, initP = NO_INIT, id = null, scheduled = false, resolved = "initialValue" in options, dynamic = typeof source === "function" && createMemo(source);
  const contexts = /* @__PURE__ */ new Set(), [value, setValue] = (options.storage || createSignal)(options.initialValue), [error, setError] = createSignal(void 0), [track, trigger] = createSignal(void 0, {
    equals: false
  }), [state, setState] = createSignal(resolved ? "ready" : "unresolved");
  if (sharedConfig.context) {
    id = sharedConfig.getNextContextId();
    if (options.ssrLoadFrom === "initial") initP = options.initialValue;
    else if (sharedConfig.load && sharedConfig.has(id)) initP = sharedConfig.load(id);
  }
  function loadEnd(p, v, error2, key2) {
    if (pr === p) {
      pr = null;
      key2 !== void 0 && (resolved = true);
      if ((p === initP || v === initP) && options.onHydrated)
        queueMicrotask(
          () => options.onHydrated(key2, {
            value: v
          })
        );
      initP = NO_INIT;
      completeLoad(v, error2);
    }
    return v;
  }
  function completeLoad(v, err) {
    runUpdates(() => {
      if (err === void 0) setValue(() => v);
      setState(err !== void 0 ? "errored" : resolved ? "ready" : "unresolved");
      setError(err);
      for (const c of contexts.keys()) c.decrement();
      contexts.clear();
    }, false);
  }
  function read() {
    const c = SuspenseContext, v = value(), err = error();
    if (err !== void 0 && !pr) throw err;
    if (Listener && !Listener.user && c) ;
    return v;
  }
  function load(refetching = true) {
    if (refetching !== false && scheduled) return;
    scheduled = false;
    const lookup = dynamic ? dynamic() : source;
    if (lookup == null || lookup === false) {
      loadEnd(pr, untrack(value));
      return;
    }
    const p = initP !== NO_INIT ? initP : untrack(
      () => fetcher(lookup, {
        value: value(),
        refetching
      })
    );
    if (!isPromise(p)) {
      loadEnd(pr, p, void 0, lookup);
      return p;
    }
    pr = p;
    if ("value" in p) {
      if (p.status === "success") loadEnd(pr, p.value, void 0, lookup);
      else loadEnd(pr, void 0, castError(p.value), lookup);
      return p;
    }
    scheduled = true;
    queueMicrotask(() => scheduled = false);
    runUpdates(() => {
      setState(resolved ? "refreshing" : "pending");
      trigger();
    }, false);
    return p.then(
      (v) => loadEnd(p, v, void 0, lookup),
      (e) => loadEnd(p, void 0, castError(e), lookup)
    );
  }
  Object.defineProperties(read, {
    state: {
      get: () => state()
    },
    error: {
      get: () => error()
    },
    loading: {
      get() {
        const s = state();
        return s === "pending" || s === "refreshing";
      }
    },
    latest: {
      get() {
        if (!resolved) return read();
        const err = error();
        if (err && !pr) throw err;
        return value();
      }
    }
  });
  if (dynamic) createComputed(() => load(false));
  else load(false);
  return [
    read,
    {
      refetch: load,
      mutate: setValue
    }
  ];
}
function createSelector(source, fn = equalFn, options) {
  const subs = /* @__PURE__ */ new Map();
  const node = createComputation(
    (p) => {
      const v = source();
      for (const [key2, val] of subs.entries())
        if (fn(key2, v) !== fn(key2, p)) {
          for (const c of val.values()) {
            c.state = STALE;
            if (c.pure) Updates.push(c);
            else Effects.push(c);
          }
        }
      return v;
    },
    void 0,
    true,
    STALE
  );
  updateComputation(node);
  return (key2) => {
    const listener = Listener;
    if (listener) {
      let l;
      if (l = subs.get(key2)) l.add(listener);
      else subs.set(key2, l = /* @__PURE__ */ new Set([listener]));
      onCleanup(() => {
        l.delete(listener);
        !l.size && subs.delete(key2);
      });
    }
    return fn(
      key2,
      node.value
    );
  };
}
function batch(fn) {
  return runUpdates(fn, false);
}
function untrack(fn) {
  if (Listener === null) return fn();
  const listener = Listener;
  Listener = null;
  try {
    if (ExternalSourceConfig) ;
    return fn();
  } finally {
    Listener = listener;
  }
}
function on(deps, fn, options) {
  const isArray2 = Array.isArray(deps);
  let prevInput;
  let defer = options && options.defer;
  return (prevValue) => {
    let input;
    if (isArray2) {
      input = Array(deps.length);
      for (let i = 0; i < deps.length; i++) input[i] = deps[i]();
    } else input = deps();
    if (defer) {
      defer = false;
      return prevValue;
    }
    const result = untrack(() => fn(input, prevInput, prevValue));
    prevInput = input;
    return result;
  };
}
function onMount(fn) {
  createEffect(() => untrack(fn));
}
function onCleanup(fn) {
  if (Owner === null) ;
  else if (Owner.cleanups === null) Owner.cleanups = [fn];
  else Owner.cleanups.push(fn);
  return fn;
}
function getOwner() {
  return Owner;
}
function runWithOwner(o, fn) {
  const prev = Owner;
  const prevListener = Listener;
  Owner = o;
  Listener = null;
  try {
    return runUpdates(fn, true);
  } catch (err) {
    handleError(err);
  } finally {
    Owner = prev;
    Listener = prevListener;
  }
}
function startTransition(fn) {
  const l = Listener;
  const o = Owner;
  return Promise.resolve().then(() => {
    Listener = l;
    Owner = o;
    let t;
    runUpdates(fn, false);
    Listener = Owner = null;
    return t ? t.done : void 0;
  });
}
function createContext(defaultValue, options) {
  const id = Symbol("context");
  return {
    id,
    Provider: createProvider(id),
    defaultValue
  };
}
function useContext(context) {
  let value;
  return Owner && Owner.context && (value = Owner.context[context.id]) !== void 0 ? value : context.defaultValue;
}
function children(fn) {
  const children2 = createMemo(fn);
  const memo2 = createMemo(() => resolveChildren(children2()));
  memo2.toArray = () => {
    const c = memo2();
    return Array.isArray(c) ? c : c != null ? [c] : [];
  };
  return memo2;
}
let SuspenseContext;
function readSignal() {
  if (this.sources && this.state) {
    if (this.state === STALE) updateComputation(this);
    else {
      const updates = Updates;
      Updates = null;
      runUpdates(() => lookUpstream(this), false);
      Updates = updates;
    }
  }
  if (Listener) {
    const sSlot = this.observers ? this.observers.length : 0;
    if (!Listener.sources) {
      Listener.sources = [this];
      Listener.sourceSlots = [sSlot];
    } else {
      Listener.sources.push(this);
      Listener.sourceSlots.push(sSlot);
    }
    if (!this.observers) {
      this.observers = [Listener];
      this.observerSlots = [Listener.sources.length - 1];
    } else {
      this.observers.push(Listener);
      this.observerSlots.push(Listener.sources.length - 1);
    }
  }
  return this.value;
}
function writeSignal(node, value, isComp) {
  let current = node.value;
  if (!node.comparator || !node.comparator(current, value)) {
    node.value = value;
    if (node.observers && node.observers.length) {
      runUpdates(() => {
        for (let i = 0; i < node.observers.length; i += 1) {
          const o = node.observers[i];
          const TransitionRunning = Transition && Transition.running;
          if (TransitionRunning && Transition.disposed.has(o)) ;
          if (TransitionRunning ? !o.tState : !o.state) {
            if (o.pure) Updates.push(o);
            else Effects.push(o);
            if (o.observers) markDownstream(o);
          }
          if (!TransitionRunning) o.state = STALE;
        }
        if (Updates.length > 1e6) {
          Updates = [];
          if (false) ;
          throw new Error();
        }
      }, false);
    }
  }
  return value;
}
function updateComputation(node) {
  if (!node.fn) return;
  cleanNode(node);
  const time = ExecCount;
  runComputation(
    node,
    node.value,
    time
  );
}
function runComputation(node, value, time) {
  let nextValue;
  const owner = Owner, listener = Listener;
  Listener = Owner = node;
  try {
    nextValue = node.fn(value);
  } catch (err) {
    if (node.pure) {
      {
        node.state = STALE;
        node.owned && node.owned.forEach(cleanNode);
        node.owned = null;
      }
    }
    node.updatedAt = time + 1;
    return handleError(err);
  } finally {
    Listener = listener;
    Owner = owner;
  }
  if (!node.updatedAt || node.updatedAt <= time) {
    if (node.updatedAt != null && "observers" in node) {
      writeSignal(node, nextValue);
    } else node.value = nextValue;
    node.updatedAt = time;
  }
}
function createComputation(fn, init, pure, state = STALE, options) {
  const c = {
    fn,
    state,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: init,
    owner: Owner,
    context: Owner ? Owner.context : null,
    pure
  };
  if (Owner === null) ;
  else if (Owner !== UNOWNED) {
    {
      if (!Owner.owned) Owner.owned = [c];
      else Owner.owned.push(c);
    }
  }
  return c;
}
function runTop(node) {
  if (node.state === 0) return;
  if (node.state === PENDING) return lookUpstream(node);
  if (node.suspense && untrack(node.suspense.inFallback)) return node.suspense.effects.push(node);
  const ancestors = [node];
  while ((node = node.owner) && (!node.updatedAt || node.updatedAt < ExecCount)) {
    if (node.state) ancestors.push(node);
  }
  for (let i = ancestors.length - 1; i >= 0; i--) {
    node = ancestors[i];
    if (node.state === STALE) {
      updateComputation(node);
    } else if (node.state === PENDING) {
      const updates = Updates;
      Updates = null;
      runUpdates(() => lookUpstream(node, ancestors[0]), false);
      Updates = updates;
    }
  }
}
function runUpdates(fn, init) {
  if (Updates) return fn();
  let wait = false;
  if (!init) Updates = [];
  if (Effects) wait = true;
  else Effects = [];
  ExecCount++;
  try {
    const res = fn();
    completeUpdates(wait);
    return res;
  } catch (err) {
    if (!wait) Effects = null;
    Updates = null;
    handleError(err);
  }
}
function completeUpdates(wait) {
  if (Updates) {
    runQueue(Updates);
    Updates = null;
  }
  if (wait) return;
  const e = Effects;
  Effects = null;
  if (e.length) runUpdates(() => runEffects(e), false);
}
function runQueue(queue) {
  for (let i = 0; i < queue.length; i++) runTop(queue[i]);
}
function runUserEffects(queue) {
  let i, userLength = 0;
  for (i = 0; i < queue.length; i++) {
    const e = queue[i];
    if (!e.user) runTop(e);
    else queue[userLength++] = e;
  }
  if (sharedConfig.context) {
    if (sharedConfig.count) {
      sharedConfig.effects || (sharedConfig.effects = []);
      sharedConfig.effects.push(...queue.slice(0, userLength));
      return;
    }
    setHydrateContext();
  }
  if (sharedConfig.effects && (sharedConfig.done || !sharedConfig.count)) {
    queue = [...sharedConfig.effects, ...queue];
    userLength += sharedConfig.effects.length;
    delete sharedConfig.effects;
  }
  for (i = 0; i < userLength; i++) runTop(queue[i]);
}
function lookUpstream(node, ignore) {
  node.state = 0;
  for (let i = 0; i < node.sources.length; i += 1) {
    const source = node.sources[i];
    if (source.sources) {
      const state = source.state;
      if (state === STALE) {
        if (source !== ignore && (!source.updatedAt || source.updatedAt < ExecCount))
          runTop(source);
      } else if (state === PENDING) lookUpstream(source, ignore);
    }
  }
}
function markDownstream(node) {
  for (let i = 0; i < node.observers.length; i += 1) {
    const o = node.observers[i];
    if (!o.state) {
      o.state = PENDING;
      if (o.pure) Updates.push(o);
      else Effects.push(o);
      o.observers && markDownstream(o);
    }
  }
}
function cleanNode(node) {
  let i;
  if (node.sources) {
    while (node.sources.length) {
      const source = node.sources.pop(), index = node.sourceSlots.pop(), obs = source.observers;
      if (obs && obs.length) {
        const n = obs.pop(), s = source.observerSlots.pop();
        if (index < obs.length) {
          n.sourceSlots[s] = index;
          obs[index] = n;
          source.observerSlots[index] = s;
        }
      }
    }
  }
  if (node.tOwned) {
    for (i = node.tOwned.length - 1; i >= 0; i--) cleanNode(node.tOwned[i]);
    delete node.tOwned;
  }
  if (node.owned) {
    for (i = node.owned.length - 1; i >= 0; i--) cleanNode(node.owned[i]);
    node.owned = null;
  }
  if (node.cleanups) {
    for (i = node.cleanups.length - 1; i >= 0; i--) node.cleanups[i]();
    node.cleanups = null;
  }
  node.state = 0;
}
function castError(err) {
  if (err instanceof Error) return err;
  return new Error(typeof err === "string" ? err : "Unknown error", {
    cause: err
  });
}
function handleError(err, owner = Owner) {
  const error = castError(err);
  throw error;
}
function resolveChildren(children2) {
  if (typeof children2 === "function" && !children2.length) return resolveChildren(children2());
  if (Array.isArray(children2)) {
    const results = [];
    for (let i = 0; i < children2.length; i++) {
      const result = resolveChildren(children2[i]);
      Array.isArray(result) ? results.push.apply(results, result) : results.push(result);
    }
    return results;
  }
  return children2;
}
function createProvider(id, options) {
  return function provider(props) {
    let res;
    createRenderEffect(
      () => res = untrack(() => {
        Owner.context = {
          ...Owner.context,
          [id]: props.value
        };
        return children(() => props.children);
      }),
      void 0
    );
    return res;
  };
}
const FALLBACK = Symbol("fallback");
function dispose(d) {
  for (let i = 0; i < d.length; i++) d[i]();
}
function mapArray(list, mapFn, options = {}) {
  let items = [], mapped = [], disposers = [], len = 0, indexes = mapFn.length > 1 ? [] : null;
  onCleanup(() => dispose(disposers));
  return () => {
    let newItems = list() || [], newLen = newItems.length, i, j;
    newItems[$TRACK];
    return untrack(() => {
      let newIndices, newIndicesNext, temp, tempdisposers, tempIndexes, start, end, newEnd, item;
      if (newLen === 0) {
        if (len !== 0) {
          dispose(disposers);
          disposers = [];
          items = [];
          mapped = [];
          len = 0;
          indexes && (indexes = []);
        }
        if (options.fallback) {
          items = [FALLBACK];
          mapped[0] = createRoot((disposer) => {
            disposers[0] = disposer;
            return options.fallback();
          });
          len = 1;
        }
      } else if (len === 0) {
        mapped = new Array(newLen);
        for (j = 0; j < newLen; j++) {
          items[j] = newItems[j];
          mapped[j] = createRoot(mapper);
        }
        len = newLen;
      } else {
        temp = new Array(newLen);
        tempdisposers = new Array(newLen);
        indexes && (tempIndexes = new Array(newLen));
        for (start = 0, end = Math.min(len, newLen); start < end && items[start] === newItems[start]; start++) ;
        for (end = len - 1, newEnd = newLen - 1; end >= start && newEnd >= start && items[end] === newItems[newEnd]; end--, newEnd--) {
          temp[newEnd] = mapped[end];
          tempdisposers[newEnd] = disposers[end];
          indexes && (tempIndexes[newEnd] = indexes[end]);
        }
        newIndices = /* @__PURE__ */ new Map();
        newIndicesNext = new Array(newEnd + 1);
        for (j = newEnd; j >= start; j--) {
          item = newItems[j];
          i = newIndices.get(item);
          newIndicesNext[j] = i === void 0 ? -1 : i;
          newIndices.set(item, j);
        }
        for (i = start; i <= end; i++) {
          item = items[i];
          j = newIndices.get(item);
          if (j !== void 0 && j !== -1) {
            temp[j] = mapped[i];
            tempdisposers[j] = disposers[i];
            indexes && (tempIndexes[j] = indexes[i]);
            j = newIndicesNext[j];
            newIndices.set(item, j);
          } else disposers[i]();
        }
        for (j = start; j < newLen; j++) {
          if (j in temp) {
            mapped[j] = temp[j];
            disposers[j] = tempdisposers[j];
            if (indexes) {
              indexes[j] = tempIndexes[j];
              indexes[j](j);
            }
          } else mapped[j] = createRoot(mapper);
        }
        mapped = mapped.slice(0, len = newLen);
        items = newItems.slice(0);
      }
      return mapped;
    });
    function mapper(disposer) {
      disposers[j] = disposer;
      if (indexes) {
        const [s, set] = createSignal(j);
        indexes[j] = set;
        return mapFn(newItems[j], s);
      }
      return mapFn(newItems[j]);
    }
  };
}
function indexArray(list, mapFn, options = {}) {
  let items = [], mapped = [], disposers = [], signals = [], len = 0, i;
  onCleanup(() => dispose(disposers));
  return () => {
    const newItems = list() || [], newLen = newItems.length;
    newItems[$TRACK];
    return untrack(() => {
      if (newLen === 0) {
        if (len !== 0) {
          dispose(disposers);
          disposers = [];
          items = [];
          mapped = [];
          len = 0;
          signals = [];
        }
        if (options.fallback) {
          items = [FALLBACK];
          mapped[0] = createRoot((disposer) => {
            disposers[0] = disposer;
            return options.fallback();
          });
          len = 1;
        }
        return mapped;
      }
      if (items[0] === FALLBACK) {
        disposers[0]();
        disposers = [];
        items = [];
        mapped = [];
        len = 0;
      }
      for (i = 0; i < newLen; i++) {
        if (i < items.length && items[i] !== newItems[i]) {
          signals[i](() => newItems[i]);
        } else if (i >= items.length) {
          mapped[i] = createRoot(mapper);
        }
      }
      for (; i < items.length; i++) {
        disposers[i]();
      }
      len = signals.length = disposers.length = newLen;
      items = newItems.slice(0);
      return mapped = mapped.slice(0, len);
    });
    function mapper(disposer) {
      disposers[i] = disposer;
      const [s, set] = createSignal(newItems[i]);
      signals[i] = set;
      return mapFn(s, i);
    }
  };
}
function createComponent$1(Comp, props) {
  return untrack(() => Comp(props || {}));
}
function trueFn() {
  return true;
}
const propTraps = {
  get(_, property, receiver) {
    if (property === $PROXY) return receiver;
    return _.get(property);
  },
  has(_, property) {
    if (property === $PROXY) return true;
    return _.has(property);
  },
  set: trueFn,
  deleteProperty: trueFn,
  getOwnPropertyDescriptor(_, property) {
    return {
      configurable: true,
      enumerable: true,
      get() {
        return _.get(property);
      },
      set: trueFn,
      deleteProperty: trueFn
    };
  },
  ownKeys(_) {
    return _.keys();
  }
};
function resolveSource(s) {
  return !(s = typeof s === "function" ? s() : s) ? {} : s;
}
function resolveSources() {
  for (let i = 0, length = this.length; i < length; ++i) {
    const v = this[i]();
    if (v !== void 0) return v;
  }
}
function mergeProps$1(...sources) {
  let proxy = false;
  for (let i = 0; i < sources.length; i++) {
    const s = sources[i];
    proxy = proxy || !!s && $PROXY in s;
    sources[i] = typeof s === "function" ? (proxy = true, createMemo(s)) : s;
  }
  if (SUPPORTS_PROXY$1 && proxy) {
    return new Proxy(
      {
        get(property) {
          for (let i = sources.length - 1; i >= 0; i--) {
            const v = resolveSource(sources[i])[property];
            if (v !== void 0) return v;
          }
        },
        has(property) {
          for (let i = sources.length - 1; i >= 0; i--) {
            if (property in resolveSource(sources[i])) return true;
          }
          return false;
        },
        keys() {
          const keys = [];
          for (let i = 0; i < sources.length; i++)
            keys.push(...Object.keys(resolveSource(sources[i])));
          return [...new Set(keys)];
        }
      },
      propTraps
    );
  }
  const sourcesMap = {};
  const defined = /* @__PURE__ */ Object.create(null);
  for (let i = sources.length - 1; i >= 0; i--) {
    const source = sources[i];
    if (!source) continue;
    const sourceKeys = Object.getOwnPropertyNames(source);
    for (let i2 = sourceKeys.length - 1; i2 >= 0; i2--) {
      const key2 = sourceKeys[i2];
      if (key2 === "__proto__" || key2 === "constructor") continue;
      const desc = Object.getOwnPropertyDescriptor(source, key2);
      if (!defined[key2]) {
        defined[key2] = desc.get ? {
          enumerable: true,
          configurable: true,
          get: resolveSources.bind(sourcesMap[key2] = [desc.get.bind(source)])
        } : desc.value !== void 0 ? desc : void 0;
      } else {
        const sources2 = sourcesMap[key2];
        if (sources2) {
          if (desc.get) sources2.push(desc.get.bind(source));
          else if (desc.value !== void 0) sources2.push(() => desc.value);
        }
      }
    }
  }
  const target = {};
  const definedKeys = Object.keys(defined);
  for (let i = definedKeys.length - 1; i >= 0; i--) {
    const key2 = definedKeys[i], desc = defined[key2];
    if (desc && desc.get) Object.defineProperty(target, key2, desc);
    else target[key2] = desc ? desc.value : void 0;
  }
  return target;
}
function splitProps(props, ...keys) {
  if (SUPPORTS_PROXY$1 && $PROXY in props) {
    const blocked = new Set(keys.length > 1 ? keys.flat() : keys[0]);
    const res = keys.map((k) => {
      return new Proxy(
        {
          get(property) {
            return k.includes(property) ? props[property] : void 0;
          },
          has(property) {
            return k.includes(property) && property in props;
          },
          keys() {
            return k.filter((property) => property in props);
          }
        },
        propTraps
      );
    });
    res.push(
      new Proxy(
        {
          get(property) {
            return blocked.has(property) ? void 0 : props[property];
          },
          has(property) {
            return blocked.has(property) ? false : property in props;
          },
          keys() {
            return Object.keys(props).filter((k) => !blocked.has(k));
          }
        },
        propTraps
      )
    );
    return res;
  }
  const otherObject = {};
  const objects = keys.map(() => ({}));
  for (const propName of Object.getOwnPropertyNames(props)) {
    const desc = Object.getOwnPropertyDescriptor(props, propName);
    const isDefaultDesc = !desc.get && !desc.set && desc.enumerable && desc.writable && desc.configurable;
    let blocked = false;
    let objectIndex = 0;
    for (const k of keys) {
      if (k.includes(propName)) {
        blocked = true;
        isDefaultDesc ? objects[objectIndex][propName] = desc.value : Object.defineProperty(objects[objectIndex], propName, desc);
      }
      ++objectIndex;
    }
    if (!blocked) {
      isDefaultDesc ? otherObject[propName] = desc.value : Object.defineProperty(otherObject, propName, desc);
    }
  }
  return [...objects, otherObject];
}
function lazy(fn) {
  let comp;
  let p;
  const wrap = (props) => {
    const ctx = sharedConfig.context;
    if (ctx) {
      const [s, set] = createSignal();
      sharedConfig.count || (sharedConfig.count = 0);
      sharedConfig.count++;
      (p || (p = fn())).then((mod) => {
        !sharedConfig.done && setHydrateContext(ctx);
        sharedConfig.count--;
        set(() => mod.default);
        setHydrateContext();
      });
      comp = s;
    } else if (!comp) {
      const [s] = createResource(() => (p || (p = fn())).then((mod) => mod.default));
      comp = s;
    }
    let Comp;
    return createMemo(
      () => (Comp = comp()) ? untrack(() => {
        if (false) ;
        if (!ctx || sharedConfig.done) return Comp(props);
        const c = sharedConfig.context;
        setHydrateContext(ctx);
        const r = Comp(props);
        setHydrateContext(c);
        return r;
      }) : ""
    );
  };
  wrap.preload = () => p || ((p = fn()).then((mod) => comp = () => mod.default), p);
  return wrap;
}
const narrowedError = (name) => "Stale read from <".concat(name, ">.");
function For(props) {
  const fallback = "fallback" in props && {
    fallback: () => props.fallback
  };
  return createMemo(mapArray(() => props.each, props.children, fallback || void 0));
}
function Index(props) {
  const fallback = "fallback" in props && {
    fallback: () => props.fallback
  };
  return createMemo(indexArray(() => props.each, props.children, fallback || void 0));
}
function Show(props) {
  const keyed = props.keyed;
  const condition = createMemo(() => props.when, void 0, {
    equals: (a, b) => keyed ? a === b : !a === !b
  });
  return createMemo(
    () => {
      const c = condition();
      if (c) {
        const child = props.children;
        const fn = typeof child === "function" && child.length > 0;
        return fn ? untrack(
          () => child(
            keyed ? c : () => {
              if (!untrack(condition)) throw narrowedError("Show");
              return props.when;
            }
          )
        ) : child;
      }
      return props.fallback;
    },
    void 0,
    void 0
  );
}
const [activeElement, setActiveElement] = createSignal(void 0);
function hexColor(color = "") {
  if (isInteger(color)) {
    return color;
  }
  if (typeof color === "string") {
    if (color.startsWith("#")) {
      return Number(
        color.replace("#", "0x") + (color.length === 7 ? "ff" : "")
      );
    }
    if (color.startsWith("0x")) {
      return Number(color);
    }
    return Number("0x" + (color.length === 6 ? color + "ff" : color));
  }
  return 0;
}
function combineStyles(style1, style2) {
  if (!style1) {
    return style2;
  }
  if (!style2) {
    return style1;
  }
  return {
    ...style2,
    ...style1
  };
}
function createRenderer$1({
  createElement: createElement2,
  createTextNode: createTextNode2,
  isTextNode: isTextNode2,
  replaceText,
  insertNode: insertNode2,
  removeNode,
  setProperty,
  getParentNode,
  getFirstChild,
  getNextSibling
}) {
  function insert2(parent, accessor, marker, initial) {
    if (marker !== void 0 && !initial) initial = [];
    if (typeof accessor !== "function") return insertExpression(parent, accessor, initial, marker);
    createRenderEffect((current) => insertExpression(parent, accessor(), current, marker), initial);
  }
  function insertExpression(parent, value, current, marker, unwrapArray) {
    while (typeof current === "function") current = current();
    if (value === current) return current;
    const t = typeof value, multi = marker !== void 0;
    if (t === "string" || t === "number") {
      if (t === "number") value = value.toString();
      if (multi) {
        let node = current[0];
        if (node && isTextNode2(node)) {
          replaceText(node, value);
        } else node = createTextNode2(value);
        current = cleanChildren(parent, current, marker, node);
      } else {
        if (current !== "" && typeof current === "string") {
          replaceText(getFirstChild(parent), current = value);
        } else {
          cleanChildren(parent, current, marker, createTextNode2(value));
          current = value;
        }
      }
    } else if (value == null || t === "boolean") {
      current = cleanChildren(parent, current, marker);
    } else if (t === "function") {
      createRenderEffect(() => {
        let v = value();
        while (typeof v === "function") v = v();
        current = insertExpression(parent, v, current, marker);
      });
      return () => current;
    } else if (Array.isArray(value)) {
      const array = [];
      if (normalizeIncomingArray(array, value, unwrapArray)) {
        createRenderEffect(
          () => current = insertExpression(parent, array, current, marker, true)
        );
        return () => current;
      }
      if (array.length === 0) {
        const replacement = cleanChildren(parent, current, marker);
        if (multi) return current = replacement;
      } else {
        if (Array.isArray(current)) {
          if (current.length === 0) {
            appendNodes(parent, array, marker);
          } else reconcileArrays(parent, current, array);
        } else if (current == null || current === "") {
          appendNodes(parent, array);
        } else {
          reconcileArrays(parent, multi && current || [getFirstChild(parent)], array);
        }
      }
      current = array;
    } else {
      if (Array.isArray(current)) {
        if (multi) return current = cleanChildren(parent, current, marker, value);
        cleanChildren(parent, current, null, value);
      } else if (current == null || current === "" || !getFirstChild(parent)) {
        insertNode2(parent, value);
      } else replaceNode(parent, value, getFirstChild(parent));
      current = value;
    }
    return current;
  }
  function normalizeIncomingArray(normalized, array, unwrap) {
    let dynamic = false;
    for (let i = 0, len = array.length; i < len; i++) {
      let item = array[i], t;
      if (item == null || item === true || item === false) ;
      else if (Array.isArray(item)) {
        dynamic = normalizeIncomingArray(normalized, item) || dynamic;
      } else if ((t = typeof item) === "string" || t === "number") {
        normalized.push(createTextNode2(item));
      } else if (t === "function") {
        if (unwrap) {
          while (typeof item === "function") item = item();
          dynamic = normalizeIncomingArray(normalized, Array.isArray(item) ? item : [item]) || dynamic;
        } else {
          normalized.push(item);
          dynamic = true;
        }
      } else normalized.push(item);
    }
    return dynamic;
  }
  function reconcileArrays(parentNode, a, b) {
    let bLength = b.length, aEnd = a.length, bEnd = bLength, aStart = 0, bStart = 0, after = getNextSibling(a[aEnd - 1]), map = null;
    while (aStart < aEnd || bStart < bEnd) {
      if (a[aStart] === b[bStart]) {
        aStart++;
        bStart++;
        continue;
      }
      while (a[aEnd - 1] === b[bEnd - 1]) {
        aEnd--;
        bEnd--;
      }
      if (aEnd === aStart) {
        const node = bEnd < bLength ? bStart ? getNextSibling(b[bStart - 1]) : b[bEnd - bStart] : after;
        while (bStart < bEnd) insertNode2(parentNode, b[bStart++], node);
      } else if (bEnd === bStart) {
        while (aStart < aEnd) {
          if (!map || !map.has(a[aStart])) removeNode(parentNode, a[aStart]);
          aStart++;
        }
      } else if (a[aStart] === b[bEnd - 1] && b[bStart] === a[aEnd - 1]) {
        const node = getNextSibling(a[--aEnd]);
        insertNode2(parentNode, b[bStart++], getNextSibling(a[aStart++]));
        insertNode2(parentNode, b[--bEnd], node);
        a[aEnd] = b[bEnd];
      } else {
        if (!map) {
          map = /* @__PURE__ */ new Map();
          let i = bStart;
          while (i < bEnd) map.set(b[i], i++);
        }
        const index = map.get(a[aStart]);
        if (index != null) {
          if (bStart < index && index < bEnd) {
            let i = aStart, sequence = 1, t;
            while (++i < aEnd && i < bEnd) {
              if ((t = map.get(a[i])) == null || t !== index + sequence) break;
              sequence++;
            }
            if (sequence > index - bStart) {
              const node = a[aStart];
              while (bStart < index) insertNode2(parentNode, b[bStart++], node);
            } else replaceNode(parentNode, b[bStart++], a[aStart++]);
          } else aStart++;
        } else removeNode(parentNode, a[aStart++]);
      }
    }
  }
  function cleanChildren(parent, current, marker, replacement) {
    if (marker === void 0) {
      let removed;
      while (removed = getFirstChild(parent)) removeNode(parent, removed);
      replacement && insertNode2(parent, replacement);
      return "";
    }
    const node = replacement || createTextNode2("");
    if (current.length) {
      let inserted = false;
      for (let i = current.length - 1; i >= 0; i--) {
        const el = current[i];
        if (node !== el) {
          const isParent = getParentNode(el) === parent;
          if (!inserted && !i)
            isParent ? replaceNode(parent, node, el) : insertNode2(parent, node, marker);
          else isParent && removeNode(parent, el);
        } else inserted = true;
      }
    } else insertNode2(parent, node, marker);
    return [node];
  }
  function appendNodes(parent, array, marker) {
    for (let i = 0, len = array.length; i < len; i++) insertNode2(parent, array[i], marker);
  }
  function replaceNode(parent, newNode, oldNode) {
    insertNode2(parent, newNode, oldNode);
    removeNode(parent, oldNode);
  }
  function spreadExpression(node, props, prevProps = {}, skipChildren) {
    props || (props = {});
    if (!skipChildren) {
      createRenderEffect(
        () => prevProps.children = insertExpression(node, props.children, prevProps.children)
      );
    }
    createRenderEffect(() => props.ref && props.ref(node));
    createRenderEffect(() => {
      for (const prop in props) {
        if (prop === "children" || prop === "ref") continue;
        const value = props[prop];
        if (value === prevProps[prop]) continue;
        setProperty(node, prop, value, prevProps[prop]);
        prevProps[prop] = value;
      }
    });
    return prevProps;
  }
  return {
    render(code, element) {
      let disposer;
      createRoot((dispose2) => {
        disposer = dispose2;
        insert2(element, code());
      });
      return disposer;
    },
    insert: insert2,
    spread(node, accessor, skipChildren) {
      if (typeof accessor === "function") {
        createRenderEffect((current) => spreadExpression(node, accessor(), current, skipChildren));
      } else spreadExpression(node, accessor, void 0, skipChildren);
    },
    createElement: createElement2,
    createTextNode: createTextNode2,
    insertNode: insertNode2,
    setProp(node, name, value, prev) {
      setProperty(node, name, value, prev);
      return value;
    },
    mergeProps: mergeProps$1,
    effect: createRenderEffect,
    memo: createMemo,
    createComponent: createComponent$1,
    use(fn, element, arg) {
      return untrack(() => fn(element, arg));
    }
  };
}
function createRenderer$2(options) {
  const renderer2 = createRenderer$1(options);
  renderer2.mergeProps = mergeProps$1;
  return renderer2;
}
const nodeOpts = {
  createElement(name) {
    return new ElementNode(name);
  },
  createTextNode(text2) {
    return { _type: NodeType.Text, text: text2 };
  },
  replaceText(node, value) {
    node.text = value;
    const parent = node.parent;
    parent.text = parent.getText();
  },
  setProperty(node, name, value = true) {
    node[name] = value;
  },
  insertNode(parent, node, anchor) {
    parent.insertChild(node, anchor);
    node._queueDelete = false;
    if (node instanceof ElementNode) {
      parent.rendered && node.render(true);
    } else if (isElementText(parent)) {
      parent.text = parent.getText();
    }
  },
  isTextNode(node) {
    return isElementText(node);
  },
  removeNode(parent, node) {
    parent.removeChild(node);
    node._queueDelete = true;
    if (node instanceof ElementNode) {
      queueMicrotask(() => node.destroy());
    }
  },
  getParentNode(node) {
    return node.parent;
  },
  getFirstChild(node) {
    return node.children[0];
  },
  getNextSibling(node) {
    const children2 = node.parent.children || [];
    const index = children2.indexOf(node) + 1;
    if (index < children2.length) {
      return children2[index];
    }
    return void 0;
  }
};
const solidRenderer = createRenderer$2(nodeOpts);
let renderer$1;
const rootNode = nodeOpts.createElement("App");
const render$1 = function(code) {
  return solidRenderer.render(code, rootNode);
};
function createRenderer(rendererOptions, node) {
  const options = Config.rendererOptions;
  renderer$1 = startLightningRenderer(options, "app");
  Config.setActiveElement = setActiveElement;
  rootNode.lng = renderer$1.root;
  rootNode.rendered = true;
  renderer$1.on("idle", () => {
    tasksEnabled = true;
    processTasks();
  });
  return {
    renderer: renderer$1,
    rootNode,
    render: render$1
  };
}
const {
  effect,
  memo,
  createComponent,
  createElement,
  createTextNode,
  insertNode,
  insert,
  spread,
  setProp,
  mergeProps,
  use
} = solidRenderer;
const taskQueue = [];
let tasksEnabled = false;
createRenderEffect(() => {
  activeElement();
  tasksEnabled = false;
});
function processTasks() {
  if (tasksEnabled && taskQueue.length) {
    setTimeout(() => {
      const task = taskQueue.shift();
      if (task) {
        task();
        processTasks();
      }
    }, 0);
  }
}
function Dynamic(props) {
  const [p, others] = splitProps(props, ["component"]);
  const cached = createMemo(() => p.component);
  return createMemo(() => {
    const component = cached();
    switch (typeof component) {
      case "function":
        return untrack(() => component(others));
      case "string": {
        const el = createElement(component);
        spread(el, others);
        return el;
      }
    }
  });
}
const View = (props) => {
  const el = createElement("node");
  spread(el, props, false);
  return el;
};
const Text$4 = (props) => {
  const el = createElement("text");
  spread(el, props, false);
  return el;
};
const FLOATS_PER_GLYPH = 24;
function getStartConditions(sdfFontSize, sdfLineHeight, fontFace, verticalAlign, offsetY, fontSizeRatio, renderWindow, lineCache, textH) {
  const startLineIndex = Math.min(Math.max(renderWindow.firstLineIdx, 0), lineCache.length);
  const sdfStartX = 0;
  const { metrics } = fontFace;
  assertTruthy(fontFace.data);
  const sdfBareLineHeight = (metrics.ascender - metrics.descender) * sdfFontSize;
  let sdfVerticalAlignYOffset = 0;
  if (verticalAlign === "middle") {
    sdfVerticalAlignYOffset = (sdfLineHeight - sdfBareLineHeight) / 2;
  } else if (verticalAlign === "bottom") {
    sdfVerticalAlignYOffset = sdfLineHeight - sdfBareLineHeight;
  }
  const sdfOffsetY = offsetY / fontSizeRatio;
  const sdfEncodedAscender = fontFace.data.common.base;
  const sdfConfiguredAscender = metrics.ascender * sdfFontSize;
  const sdfAscenderAdjOffset = sdfConfiguredAscender - sdfEncodedAscender;
  const sdfStartY = sdfOffsetY + sdfAscenderAdjOffset + startLineIndex * sdfLineHeight + sdfVerticalAlignYOffset;
  if (textH && sdfStartY >= textH / fontSizeRatio) {
    return;
  }
  return {
    sdfX: sdfStartX,
    sdfY: sdfStartY,
    lineIndex: startLineIndex
  };
}
class PeekableIterator {
  constructor(iterator, indexBase = 0) {
    __publicField(this, "iterator");
    __publicField(this, "peekBuffer", []);
    __publicField(this, "_lastIndex");
    this.iterator = iterator;
    this.iterator = iterator;
    this._lastIndex = indexBase - 1;
    this.peekBuffer = [];
  }
  next() {
    const nextResult = this.peekBuffer.length > 0 ? (
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.peekBuffer.pop()
    ) : this.iterator.next();
    if (nextResult.done) {
      this._lastIndex = -1;
    } else {
      this._lastIndex++;
    }
    return nextResult;
  }
  peek() {
    if (this.peekBuffer.length > 0) {
      return this.peekBuffer[0];
    }
    const result = this.iterator.next();
    this.peekBuffer.push(result);
    return result;
  }
  get lastIndex() {
    return this._lastIndex;
  }
}
function* getUnicodeCodepoints(text2, start = 0) {
  let i = start;
  while (i < text2.length) {
    const codePoint = text2.codePointAt(i);
    if (codePoint === void 0) {
      throw new Error("Invalid Unicode code point");
    }
    yield codePoint;
    i += codePoint <= 65535 ? 1 : 2;
  }
}
function measureText(text2, shaperProps, shaper) {
  const glyphs = shaper.shapeText(shaperProps, new PeekableIterator(getUnicodeCodepoints(text2, 0), 0));
  let width = 0;
  for (const glyph of glyphs) {
    if (glyph.mapped && glyph.codepoint !== 8203) {
      width += glyph.xAdvance;
    }
  }
  return width;
}
function layoutText(curLineIndex, startX, startY, text2, textAlign, width, height, fontSize, lineHeight, letterSpacing, vertexBuffer, contain, lineCache, rwSdf, trFontFace, forceFullLayoutCalc, scrollable, overflowSuffix, maxLines) {
  assertTruthy(trFontFace.loaded);
  assertTruthy(trFontFace.data);
  assertTruthy(trFontFace.shaper);
  const fontSizeRatio = fontSize / trFontFace.data.info.size;
  const vertexLineHeight = lineHeight / fontSizeRatio;
  const vertexW = width / fontSizeRatio;
  const vertexLSpacing = letterSpacing / fontSizeRatio;
  const startingLineCacheEntry = lineCache[curLineIndex];
  const startingCodepointIndex = (startingLineCacheEntry == null ? void 0 : startingLineCacheEntry.codepointIndex) || 0;
  const startingMaxX = (startingLineCacheEntry == null ? void 0 : startingLineCacheEntry.maxX) || 0;
  const startingMaxY = (startingLineCacheEntry == null ? void 0 : startingLineCacheEntry.maxY) || 0;
  let maxX = startingMaxX;
  let maxY = startingMaxY;
  let curX = startX;
  let curY = startY;
  let bufferOffset = 0;
  const lastWord = {
    codepointIndex: -1,
    bufferOffset: -1,
    xStart: -1
  };
  const shaper = trFontFace.shaper;
  const shaperProps = {
    letterSpacing: vertexLSpacing
  };
  if (text2.endsWith(" ")) {
    text2 += " ";
  }
  let glyphs = shaper.shapeText(shaperProps, new PeekableIterator(getUnicodeCodepoints(text2, startingCodepointIndex), startingCodepointIndex));
  let glyphResult;
  let curLineBufferStart = -1;
  const bufferLineInfos = [];
  const vertexTruncateHeight = height / fontSizeRatio;
  const overflowSuffVertexWidth = measureText(overflowSuffix, shaperProps, shaper);
  let moreLines = true;
  while (moreLines) {
    const nextLineWillFit = (maxLines === 0 || curLineIndex + 1 < maxLines) && (contain !== "both" || scrollable || curY + vertexLineHeight + trFontFace.maxCharHeight <= vertexTruncateHeight);
    const lineVertexW = nextLineWillFit ? vertexW : vertexW - overflowSuffVertexWidth;
    let xStartLastWordBoundary = 0;
    const lineIsBelowWindowTop = curY + trFontFace.maxCharHeight >= rwSdf.y1;
    const lineIsAboveWindowBottom = curY <= rwSdf.y2;
    const lineIsWithinWindow = lineIsBelowWindowTop && lineIsAboveWindowBottom;
    while ((glyphResult = glyphs.next()) && !glyphResult.done) {
      const glyph = glyphResult.value;
      if (curLineIndex === lineCache.length) {
        lineCache.push({
          codepointIndex: glyph.cluster,
          maxY,
          maxX
        });
      } else if (curLineIndex > lineCache.length) {
        throw new Error("Unexpected lineCache length");
      }
      if (glyph.codepoint === 32 || glyph.codepoint === 10 || glyph.codepoint === 8203) {
        if (lastWord.codepointIndex !== -1) {
          lastWord.codepointIndex = -1;
          xStartLastWordBoundary = curX;
        }
      } else if (lastWord.codepointIndex === -1) {
        lastWord.codepointIndex = glyph.cluster;
        lastWord.bufferOffset = bufferOffset;
        lastWord.xStart = xStartLastWordBoundary;
      }
      if (glyph.mapped) {
        const charEndX = curX + glyph.xOffset + glyph.width;
        if (
          // We are containing the text
          contain !== "none" && // The current glyph reaches outside the contained width
          charEndX >= lineVertexW && // There is a last word that we can break to the next line
          lastWord.codepointIndex !== -1 && // Prevents infinite loop when a single word is longer than the width
          lastWord.xStart > 0
        ) {
          if (nextLineWillFit) {
            glyphs = shaper.shapeText(shaperProps, new PeekableIterator(getUnicodeCodepoints(text2, lastWord.codepointIndex), lastWord.codepointIndex));
            bufferOffset = lastWord.bufferOffset;
            break;
          } else {
            glyphs = shaper.shapeText(shaperProps, new PeekableIterator(getUnicodeCodepoints(overflowSuffix, 0), 0));
            curX = lastWord.xStart;
            bufferOffset = lastWord.bufferOffset;
            contain = "none";
          }
        } else {
          const quadX = curX + glyph.xOffset;
          const quadY = curY + glyph.yOffset;
          if (lineIsWithinWindow) {
            if (curLineBufferStart === -1) {
              curLineBufferStart = bufferOffset;
            }
            const atlasEntry = trFontFace.getAtlasEntry(glyph.glyphId);
            const u = atlasEntry.x / trFontFace.data.common.scaleW;
            const v = atlasEntry.y / trFontFace.data.common.scaleH;
            const uvWidth = atlasEntry.width / trFontFace.data.common.scaleW;
            const uvHeight = atlasEntry.height / trFontFace.data.common.scaleH;
            vertexBuffer[bufferOffset++] = quadX;
            vertexBuffer[bufferOffset++] = quadY;
            vertexBuffer[bufferOffset++] = u;
            vertexBuffer[bufferOffset++] = v;
            vertexBuffer[bufferOffset++] = quadX + glyph.width;
            vertexBuffer[bufferOffset++] = quadY;
            vertexBuffer[bufferOffset++] = u + uvWidth;
            vertexBuffer[bufferOffset++] = v;
            vertexBuffer[bufferOffset++] = quadX;
            vertexBuffer[bufferOffset++] = quadY + glyph.height;
            vertexBuffer[bufferOffset++] = u;
            vertexBuffer[bufferOffset++] = v + uvHeight;
            vertexBuffer[bufferOffset++] = quadX + glyph.width;
            vertexBuffer[bufferOffset++] = quadY + glyph.height;
            vertexBuffer[bufferOffset++] = u + uvWidth;
            vertexBuffer[bufferOffset++] = v + uvHeight;
          }
          maxY = Math.max(maxY, quadY + glyph.height);
          maxX = Math.max(maxX, quadX + glyph.width);
          curX += glyph.xAdvance;
        }
      } else {
        if (glyph.codepoint === 10) {
          if (nextLineWillFit) {
            break;
          } else {
            glyphs = shaper.shapeText(shaperProps, new PeekableIterator(getUnicodeCodepoints(overflowSuffix, 0), 0));
            contain = "none";
          }
        }
      }
    }
    if (curLineBufferStart !== -1) {
      bufferLineInfos.push({
        bufferStart: curLineBufferStart,
        bufferEnd: bufferOffset
      });
      curLineBufferStart = -1;
    }
    curX = 0;
    curY += vertexLineHeight;
    curLineIndex++;
    lastWord.codepointIndex = -1;
    xStartLastWordBoundary = 0;
    if (!forceFullLayoutCalc && contain === "both" && curY > rwSdf.y2) {
      moreLines = false;
    } else if (glyphResult && glyphResult.done) {
      moreLines = false;
    } else if (!nextLineWillFit) {
      moreLines = false;
    }
  }
  if (textAlign === "center") {
    const vertexTextW = contain === "none" ? maxX : vertexW;
    for (let i = 0; i < bufferLineInfos.length; i++) {
      const line = bufferLineInfos[i];
      const lineWidth = (
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        vertexBuffer[line.bufferEnd - 4] - vertexBuffer[line.bufferStart]
      );
      const xOffset = (vertexTextW - lineWidth) / 2;
      for (let j = line.bufferStart; j < line.bufferEnd; j += 4) {
        vertexBuffer[j] += xOffset;
      }
    }
  } else if (textAlign === "right") {
    const vertexTextW = contain === "none" ? maxX : vertexW;
    for (let i = 0; i < bufferLineInfos.length; i++) {
      const line = bufferLineInfos[i];
      const lineWidth = line.bufferEnd === line.bufferStart ? 0 : (
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        vertexBuffer[line.bufferEnd - 4] - vertexBuffer[line.bufferStart]
      );
      const xOffset = vertexTextW - lineWidth;
      for (let j = line.bufferStart; j < line.bufferEnd; j += 4) {
        vertexBuffer[j] += xOffset;
      }
    }
  }
  return {
    bufferNumFloats: bufferOffset,
    bufferNumQuads: bufferOffset / 16,
    layoutNumCharacters: glyphResult.done ? text2.length - startingCodepointIndex : glyphResult.value.cluster - startingCodepointIndex + 1,
    fullyProcessed: !!glyphResult.done,
    maxX,
    maxY,
    numLines: lineCache.length
  };
}
function roundUpToMultiple(value, multiple) {
  return Math.ceil(value / multiple) * multiple;
}
function roundDownToMultiple(value, multiple) {
  return Math.floor(value / multiple) * multiple;
}
function setRenderWindow(outRenderWindow, x, y, scrollY, lineHeight, bufferMargin, visibleWindow, fontSizeRatio) {
  const { screen, sdf } = outRenderWindow;
  if (!isBoundPositive(visibleWindow)) {
    screen.x1 = 0;
    screen.y1 = 0;
    screen.x2 = 0;
    screen.y2 = 0;
    sdf.x1 = 0;
    sdf.y1 = 0;
    sdf.x2 = 0;
    sdf.y2 = 0;
    outRenderWindow.numLines = 0;
    outRenderWindow.firstLineIdx = 0;
  } else {
    const x1 = visibleWindow.x1 - x;
    const x2 = x1 + (visibleWindow.x2 - visibleWindow.x1);
    const y1Base = visibleWindow.y1 - y + scrollY;
    const y1 = roundDownToMultiple(y1Base - bufferMargin, lineHeight || 1);
    const y2 = roundUpToMultiple(y1Base + (visibleWindow.y2 - visibleWindow.y1) + bufferMargin, lineHeight || 1);
    screen.x1 = x1;
    screen.y1 = y1;
    screen.x2 = x2;
    screen.y2 = y2;
    sdf.x1 = x1 / fontSizeRatio;
    sdf.y1 = y1 / fontSizeRatio;
    sdf.x2 = x2 / fontSizeRatio;
    sdf.y2 = y2 / fontSizeRatio;
    outRenderWindow.numLines = Math.ceil((y2 - y1) / lineHeight);
    outRenderWindow.firstLineIdx = lineHeight ? Math.floor(y1 / lineHeight) : 0;
  }
  outRenderWindow.valid = true;
}
function calcDefaultLineHeight(metrics, fontSize) {
  return fontSize * (metrics.ascender - metrics.descender + metrics.lineGap);
}
const tmpRect = {
  x: 0,
  y: 0,
  width: 0,
  height: 0
};
class SdfTextRenderer extends TextRenderer {
  constructor(stage) {
    super(stage);
    /**
     * Map of font family names to a set of font faces.
     */
    __publicField(this, "ssdfFontFamilies", {});
    __publicField(this, "msdfFontFamilies", {});
    __publicField(this, "fontFamilyArray", [
      this.ssdfFontFamilies,
      this.msdfFontFamilies
    ]);
    __publicField(this, "sdfShader");
    __publicField(this, "rendererBounds");
    __publicField(this, "type", "sdf");
    this.sdfShader = this.stage.shManager.loadShader("SdfShader", {
      transform: new Float32Array(),
      color: 0,
      size: 0,
      scrollY: 0,
      distanceRange: 0,
      debug: false
    }).shader;
    this.rendererBounds = {
      x1: 0,
      y1: 0,
      x2: this.stage.options.appWidth,
      y2: this.stage.options.appHeight
    };
  }
  //#region Overrides
  getPropertySetters() {
    return {
      fontFamily: (state, value) => {
        state.props.fontFamily = value;
        this.releaseFontFace(state);
        this.invalidateLayoutCache(state);
      },
      fontWeight: (state, value) => {
        state.props.fontWeight = value;
        this.releaseFontFace(state);
        this.invalidateLayoutCache(state);
      },
      fontStyle: (state, value) => {
        state.props.fontStyle = value;
        this.releaseFontFace(state);
        this.invalidateLayoutCache(state);
      },
      fontStretch: (state, value) => {
        state.props.fontStretch = value;
        this.releaseFontFace(state);
        this.invalidateLayoutCache(state);
      },
      fontSize: (state, value) => {
        state.props.fontSize = value;
        this.invalidateLayoutCache(state);
      },
      text: (state, value) => {
        state.props.text = value;
        this.invalidateLayoutCache(state);
      },
      textAlign: (state, value) => {
        state.props.textAlign = value;
        this.invalidateLayoutCache(state);
      },
      color: (state, value) => {
        state.props.color = value;
      },
      x: (state, value) => {
        state.props.x = value;
        if (state.elementBounds.valid) {
          this.setElementBoundsX(state);
          if (!state.renderWindow.valid && boundsOverlap(state.elementBounds, this.rendererBounds)) {
            this.scheduleUpdateState(state);
          }
        }
      },
      y: (state, value) => {
        state.props.y = value;
        if (state.elementBounds.valid) {
          this.setElementBoundsY(state);
          if (!state.renderWindow.valid && boundsOverlap(state.elementBounds, this.rendererBounds)) {
            this.scheduleUpdateState(state);
          }
        }
      },
      contain: (state, value) => {
        state.props.contain = value;
        this.invalidateLayoutCache(state);
      },
      width: (state, value) => {
        state.props.width = value;
        if (state.props.contain !== "none") {
          this.invalidateLayoutCache(state);
        }
      },
      height: (state, value) => {
        state.props.height = value;
        if (state.props.contain === "both") {
          this.invalidateLayoutCache(state);
        }
      },
      offsetY: (state, value) => {
        state.props.offsetY = value;
        this.invalidateLayoutCache(state);
      },
      scrollable: (state, value) => {
        state.props.scrollable = value;
        this.invalidateLayoutCache(state);
      },
      scrollY: (state, value) => {
        state.props.scrollY = value;
        this.scheduleUpdateState(state);
      },
      letterSpacing: (state, value) => {
        state.props.letterSpacing = value;
        this.invalidateLayoutCache(state);
      },
      lineHeight: (state, value) => {
        state.props.lineHeight = value;
        state.resLineHeight = void 0;
        this.invalidateLayoutCache(state);
      },
      maxLines: (state, value) => {
        state.props.maxLines = value;
        this.invalidateLayoutCache(state);
      },
      textBaseline: (state, value) => {
        state.props.textBaseline = value;
        this.invalidateLayoutCache(state);
      },
      verticalAlign: (state, value) => {
        state.props.verticalAlign = value;
        this.invalidateLayoutCache(state);
      },
      overflowSuffix: (state, value) => {
        state.props.overflowSuffix = value;
        this.invalidateLayoutCache(state);
      },
      debug: (state, value) => {
        state.props.debug = value;
      }
    };
  }
  canRenderFont(props) {
    const { fontFamily } = props;
    return fontFamily in this.ssdfFontFamilies || fontFamily in this.msdfFontFamilies || fontFamily === "$$SDF_FAILURE_TEST$$";
  }
  isFontFaceSupported(fontFace) {
    return fontFace instanceof SdfTrFontFace;
  }
  addFontFace(fontFace) {
    const familyName = fontFace.fontFamily;
    const fontFamiles = fontFace.type === "ssdf" ? this.ssdfFontFamilies : fontFace.type === "msdf" ? this.msdfFontFamilies : void 0;
    if (!fontFamiles) {
      console.warn("Invalid font face type: ".concat(fontFace.type));
      return;
    }
    let faceSet = fontFamiles[familyName];
    if (!faceSet) {
      faceSet = /* @__PURE__ */ new Set();
      fontFamiles[familyName] = faceSet;
    }
    faceSet.add(fontFace);
  }
  createState(props) {
    return {
      props,
      status: "initialState",
      updateScheduled: false,
      emitter: new EventEmitter(),
      lineCache: [],
      forceFullLayoutCalc: false,
      renderWindow: {
        screen: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 0
        },
        sdf: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 0
        },
        firstLineIdx: 0,
        numLines: 0,
        valid: false
      },
      elementBounds: {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
        valid: false
      },
      clippingRect: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        valid: false
      },
      bufferNumFloats: 0,
      bufferNumQuads: 0,
      vertexBuffer: void 0,
      webGlBuffers: null,
      bufferUploaded: false,
      textH: void 0,
      textW: void 0,
      distanceRange: 0,
      trFontFace: void 0,
      isRenderable: false,
      resLineHeight: void 0,
      debugData: {
        updateCount: 0,
        layoutCount: 0,
        lastLayoutNumCharacters: 0,
        layoutSum: 0,
        drawSum: 0,
        drawCount: 0,
        bufferSize: 0
      }
    };
  }
  updateState(state) {
    let { trFontFace } = state;
    const { textH, lineCache, debugData, forceFullLayoutCalc } = state;
    debugData.updateCount++;
    if (state.status === "initialState") {
      this.setStatus(state, "loading");
    }
    if (trFontFace === void 0) {
      trFontFace = this.resolveFontFace(state.props);
      state.trFontFace = trFontFace;
      if (trFontFace === void 0) {
        const msg = "SdfTextRenderer: Could not resolve font face for family: '".concat(state.props.fontFamily, "'");
        console.error(msg);
        this.setStatus(state, "failed", new Error(msg));
        return;
      }
      trFontFace.texture.setRenderableOwner(state, true);
    }
    if (trFontFace.loaded === false) {
      trFontFace.once("loaded", () => {
        this.scheduleUpdateState(state);
      });
      return;
    }
    assertTruthy(trFontFace.data);
    assertTruthy(trFontFace.metrics);
    const { text: text2, fontSize, x, y, contain, width, height, verticalAlign, scrollable, overflowSuffix, maxLines } = state.props;
    const scrollY = contain === "both" && scrollable ? state.props.scrollY : 0;
    const { renderWindow } = state;
    const sdfFontSize = trFontFace.data.info.size;
    const fontSizeRatio = fontSize / sdfFontSize;
    let resLineHeight = state.resLineHeight;
    if (resLineHeight === void 0) {
      const lineHeight = state.props.lineHeight;
      if (lineHeight === void 0) {
        resLineHeight = calcDefaultLineHeight(trFontFace.metrics, fontSize);
      } else {
        resLineHeight = lineHeight;
      }
      state.resLineHeight = resLineHeight;
    }
    const sdfLineHeight = resLineHeight / fontSizeRatio;
    state.distanceRange = fontSizeRatio * trFontFace.data.distanceField.distanceRange;
    const neededLength = text2.length * FLOATS_PER_GLYPH;
    let vertexBuffer = state.vertexBuffer;
    if (!vertexBuffer || vertexBuffer.length < neededLength) {
      vertexBuffer = new Float32Array(neededLength * 2);
    }
    const elementBounds = state.elementBounds;
    if (!elementBounds.valid) {
      this.setElementBoundsX(state);
      this.setElementBoundsY(state);
      elementBounds.valid = true;
    }
    if (!forceFullLayoutCalc && renderWindow.valid) {
      const rwScreen = renderWindow.screen;
      if (x + rwScreen.x1 <= elementBounds.x1 && x + rwScreen.x2 >= elementBounds.x2 && y - scrollY + rwScreen.y1 <= elementBounds.y1 && y - scrollY + rwScreen.y2 >= elementBounds.y2) {
        this.setStatus(state, "loaded");
        return;
      }
      renderWindow.valid = false;
      this.setStatus(state, "loading");
    }
    const { offsetY, textAlign } = state.props;
    if (!renderWindow.valid) {
      const isPossiblyOnScreen = boundsOverlap(elementBounds, this.rendererBounds);
      if (!isPossiblyOnScreen) {
        return;
      }
      setRenderWindow(renderWindow, x, y, scrollY, resLineHeight, contain === "both" ? elementBounds.y2 - elementBounds.y1 : 0, elementBounds, fontSizeRatio);
    }
    const start = getStartConditions(sdfFontSize, sdfLineHeight, trFontFace, verticalAlign, offsetY, fontSizeRatio, renderWindow, lineCache, textH);
    if (!start) {
      this.setStatus(state, "loaded");
      return;
    }
    const { letterSpacing } = state.props;
    const out2 = layoutText(start.lineIndex, start.sdfX, start.sdfY, text2, textAlign, width, height, fontSize, resLineHeight, letterSpacing, vertexBuffer, contain, lineCache, renderWindow.sdf, trFontFace, forceFullLayoutCalc, scrollable, overflowSuffix, maxLines);
    state.bufferUploaded = false;
    state.bufferNumFloats = out2.bufferNumFloats;
    state.bufferNumQuads = out2.bufferNumQuads;
    state.vertexBuffer = vertexBuffer;
    state.renderWindow = renderWindow;
    debugData.lastLayoutNumCharacters = out2.layoutNumCharacters;
    debugData.bufferSize = vertexBuffer.byteLength;
    if (out2.fullyProcessed) {
      state.textW = out2.maxX * fontSizeRatio;
      state.textH = out2.numLines * sdfLineHeight * fontSizeRatio;
    }
    this.setStatus(state, "loaded");
  }
  renderQuads(state, transform, clippingRect, alpha, parentHasRenderTexture, framebufferDimensions) {
    var _a2, _b, _c;
    if (!state.vertexBuffer) {
      return;
    }
    const renderer2 = this.stage.renderer;
    const { fontSize, color, contain, scrollable, zIndex, debug } = state.props;
    const scrollY = contain === "both" && scrollable ? state.props.scrollY : 0;
    const { textW = 0, textH = 0, distanceRange, vertexBuffer, bufferUploaded, trFontFace, elementBounds } = state;
    let { webGlBuffers } = state;
    if (!webGlBuffers) {
      const glw = renderer2.glw;
      const stride = 4 * Float32Array.BYTES_PER_ELEMENT;
      const webGlBuffer = glw.createBuffer();
      state.webGlBuffers = new BufferCollection([
        {
          buffer: webGlBuffer,
          attributes: {
            a_position: {
              name: "a_position",
              size: 2,
              // 2 components per iteration
              type: glw.FLOAT,
              // the data is 32bit floats
              normalized: false,
              // don't normalize the data
              stride,
              // 0 = move forward size * sizeof(type) each iteration to get the next position
              offset: 0
              // start at the beginning of the buffer
            },
            a_textureCoordinate: {
              name: "a_textureCoordinate",
              size: 2,
              type: glw.FLOAT,
              normalized: false,
              stride,
              offset: 2 * Float32Array.BYTES_PER_ELEMENT
            }
          }
        }
      ]);
      state.bufferUploaded = false;
      assertTruthy(state.webGlBuffers);
      webGlBuffers = state.webGlBuffers;
    }
    if (!bufferUploaded) {
      const glw = renderer2.glw;
      const buffer = (_a2 = webGlBuffers == null ? void 0 : webGlBuffers.getBuffer("a_textureCoordinate")) != null ? _a2 : null;
      glw.arrayBufferData(buffer, vertexBuffer, glw.STATIC_DRAW);
      state.bufferUploaded = true;
    }
    if (scrollable && contain === "both") {
      assertTruthy(elementBounds.valid);
      const elementRect = convertBoundToRect(elementBounds, tmpRect);
      if (clippingRect.valid) {
        state.clippingRect.valid = true;
        clippingRect = intersectRect(clippingRect, elementRect, state.clippingRect);
      } else {
        state.clippingRect.valid = true;
        clippingRect = copyRect(elementRect, state.clippingRect);
      }
    }
    const renderOp = new WebGlCoreRenderOp(renderer2.glw, renderer2.options, webGlBuffers, this.sdfShader, {
      transform: transform.getFloatArr(),
      // IMPORTANT: The SDF Shader expects the color NOT to be premultiplied
      // for the best blending results. Which is why we use `mergeColorAlpha`
      // instead of `mergeColorAlphaPremultiplied` here.
      color: mergeColorAlpha(color, alpha),
      size: fontSize / (((_b = trFontFace.data) == null ? void 0 : _b.info.size) || 0),
      scrollY,
      distanceRange,
      debug: debug.sdfShaderDebug
    }, alpha, clippingRect, { height: textH, width: textW }, 0, zIndex, false, parentHasRenderTexture, framebufferDimensions);
    const texture = (_c = state.trFontFace) == null ? void 0 : _c.texture;
    const ctxTexture = texture.ctxTexture;
    renderOp.addTexture(ctxTexture);
    renderOp.length = state.bufferNumFloats;
    renderOp.numQuads = state.bufferNumQuads;
    renderer2.addRenderOp(renderOp);
  }
  setIsRenderable(state, renderable) {
    var _a2;
    super.setIsRenderable(state, renderable);
    (_a2 = state.trFontFace) == null ? void 0 : _a2.texture.setRenderableOwner(state, renderable);
  }
  destroyState(state) {
    var _a2;
    super.destroyState(state);
    (_a2 = state.trFontFace) == null ? void 0 : _a2.texture.setRenderableOwner(state, false);
  }
  //#endregion Overrides
  resolveFontFace(props) {
    return this.stage.fontManager.resolveFontFace(this.fontFamilyArray, props, "sdf");
  }
  /**
   * Release the loaded SDF font face
   *
   * @param state
   */
  releaseFontFace(state) {
    state.resLineHeight = void 0;
    if (state.trFontFace) {
      state.trFontFace.texture.setRenderableOwner(state, false);
      state.trFontFace = void 0;
    }
  }
  /**
   * Invalidate the layout cache stored in the state. This will cause the text
   * to be re-layed out on the next update.
   *
   * @remarks
   * This also invalidates the visible window cache.
   *
   * @param state
   */
  invalidateLayoutCache(state) {
    state.renderWindow.valid = false;
    state.elementBounds.valid = false;
    state.textH = void 0;
    state.textW = void 0;
    state.lineCache = [];
    this.setStatus(state, "loading");
    this.scheduleUpdateState(state);
  }
  setElementBoundsX(state) {
    const { x, contain, width } = state.props;
    const { elementBounds } = state;
    elementBounds.x1 = x;
    elementBounds.x2 = contain !== "none" ? x + width : Infinity;
  }
  setElementBoundsY(state) {
    const { y, contain, height } = state.props;
    const { elementBounds } = state;
    elementBounds.y1 = y;
    elementBounds.y2 = contain === "both" ? y + height : Infinity;
  }
}
function isZeroWidthSpace(space) {
  return space === "" || space === "​";
}
function getWebFontMetrics(context, fontFace, fontSize) {
  if (fontFace.metrics) {
    return fontFace.metrics;
  }
  const browserMetrics = context.measureText("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz");
  console.warn("Font metrics not provided for Canvas Web font ".concat(fontFace.fontFamily, ". ") + "Using fallback values. It is HIGHLY recommended you use the latest version of the Lightning 3 `msdf-generator` tool to extract the default metrics for the font and provide them in the Canvas Web font definition.");
  let metrics;
  if (browserMetrics.actualBoundingBoxDescent && browserMetrics.actualBoundingBoxAscent) {
    metrics = {
      ascender: browserMetrics.actualBoundingBoxAscent / fontSize,
      descender: -browserMetrics.actualBoundingBoxDescent / fontSize,
      lineGap: 0.2
    };
  } else {
    metrics = {
      ascender: 0.8,
      descender: -0.2,
      lineGap: 0.2
    };
  }
  fontFace.metrics = metrics;
  return metrics;
}
const MAX_TEXTURE_DIMENSION = 2048;
function calcHeight(textBaseline, fontSize, lineHeight, numLines, offsetY) {
  const baselineOffset = textBaseline !== "bottom" ? 0.5 * fontSize : 0;
  return lineHeight * (numLines - 1) + baselineOffset + Math.max(lineHeight, fontSize) + (offsetY || 0);
}
class LightningTextTextureRenderer {
  constructor(canvas, context) {
    __publicField(this, "_canvas");
    __publicField(this, "_context");
    __publicField(this, "_settings");
    this._canvas = canvas;
    this._context = context;
    this._settings = this.mergeDefaults({});
  }
  set settings(v) {
    this._settings = this.mergeDefaults(v);
  }
  get settings() {
    return this._settings;
  }
  getPrecision() {
    return this._settings.precision;
  }
  setFontProperties() {
    this._context.font = this._getFontSetting();
    this._context.textBaseline = this._settings.textBaseline;
  }
  _getFontSetting() {
    const ff = [this._settings.fontFamily];
    const ffs = [];
    for (let i = 0, n = ff.length; i < n; i++) {
      if (ff[i] === "serif" || ff[i] === "sans-serif") {
        ffs.push(ff[i]);
      } else {
        ffs.push('"'.concat(ff[i], '"'));
      }
    }
    return "".concat(this._settings.fontStyle, " ").concat(this._settings.fontSize * this.getPrecision(), "px ").concat(ffs.join(","));
  }
  _load() {
    if (document.fonts) {
      const fontSetting = this._getFontSetting();
      try {
        if (!document.fonts.check(fontSetting, this._settings.text)) {
          return document.fonts.load(fontSetting, this._settings.text).catch((err) => {
            console.warn("[Lightning] Font load error", err, fontSetting);
          }).then(() => {
            if (!document.fonts.check(fontSetting, this._settings.text)) {
              console.warn("[Lightning] Font not found", fontSetting);
            }
          });
        }
      } catch (e) {
        console.warn("[Lightning] Can't check font loading for " + fontSetting);
      }
    }
  }
  calculateRenderInfo() {
    const renderInfo = {};
    const precision = this.getPrecision();
    const paddingLeft = this._settings.paddingLeft * precision;
    const paddingRight = this._settings.paddingRight * precision;
    const fontSize = this._settings.fontSize * precision;
    let offsetY = this._settings.offsetY === null ? null : this._settings.offsetY * precision;
    const w = this._settings.w * precision;
    const h = this._settings.h * precision;
    let wordWrapWidth = this._settings.wordWrapWidth * precision;
    const cutSx = this._settings.cutSx * precision;
    const cutEx = this._settings.cutEx * precision;
    const cutSy = this._settings.cutSy * precision;
    const cutEy = this._settings.cutEy * precision;
    const letterSpacing = (this._settings.letterSpacing || 0) * precision;
    const textIndent = this._settings.textIndent * precision;
    const trFontFace = this._settings.trFontFace;
    this.setFontProperties();
    const metrics = getWebFontMetrics(this._context, trFontFace, fontSize);
    const defLineHeight = calcDefaultLineHeight(metrics, fontSize) * precision;
    const lineHeight = this._settings.lineHeight !== null ? this._settings.lineHeight * precision : defLineHeight;
    const maxHeight = this._settings.maxHeight;
    const containedMaxLines = maxHeight !== null && lineHeight > 0 ? Math.floor(maxHeight / lineHeight) : 0;
    const setMaxLines = this._settings.maxLines;
    const calcMaxLines = containedMaxLines > 0 && setMaxLines > 0 ? Math.min(containedMaxLines, setMaxLines) : Math.max(containedMaxLines, setMaxLines);
    let width = w || 2048 / this.getPrecision();
    let innerWidth = width - paddingLeft;
    if (innerWidth < 10) {
      width += 10 - innerWidth;
      innerWidth = 10;
    }
    if (!wordWrapWidth) {
      wordWrapWidth = innerWidth;
    }
    if (this._settings.textOverflow && !this._settings.wordWrap) {
      let suffix;
      switch (this._settings.textOverflow) {
        case "clip":
          suffix = "";
          break;
        case "ellipsis":
          suffix = this._settings.overflowSuffix;
          break;
        default:
          suffix = this._settings.textOverflow;
      }
      this._settings.text = this.wrapWord(this._settings.text, wordWrapWidth - textIndent, suffix);
    }
    let linesInfo;
    if (this._settings.wordWrap) {
      linesInfo = this.wrapText(this._settings.text, wordWrapWidth, letterSpacing, textIndent);
    } else {
      linesInfo = { l: this._settings.text.split(/(?:\r\n|\r|\n)/), n: [] };
      const n = linesInfo.l.length;
      for (let i = 0; i < n - 1; i++) {
        linesInfo.n.push(i);
      }
    }
    let lines = linesInfo.l;
    if (calcMaxLines && lines.length > calcMaxLines) {
      const usedLines = lines.slice(0, calcMaxLines);
      let otherLines = null;
      if (this._settings.overflowSuffix) {
        const w2 = this._settings.overflowSuffix ? this.measureText(this._settings.overflowSuffix) : 0;
        const al = this.wrapText(usedLines[usedLines.length - 1], wordWrapWidth - w2, letterSpacing, textIndent);
        usedLines[usedLines.length - 1] = "".concat(al.l[0]).concat(this._settings.overflowSuffix);
        otherLines = [al.l.length > 1 ? al.l[1] : ""];
      } else {
        otherLines = [""];
      }
      let i;
      const n = lines.length;
      let j = 0;
      const m = linesInfo.n.length;
      for (i = calcMaxLines; i < n; i++) {
        otherLines[j] += "".concat(otherLines[j] ? " " : "").concat(lines[i]);
        if (i + 1 < m && linesInfo.n[i + 1]) {
          j++;
        }
      }
      renderInfo.remainingText = otherLines.join("\n");
      renderInfo.moreTextLines = true;
      lines = usedLines;
    } else {
      renderInfo.moreTextLines = false;
      renderInfo.remainingText = "";
    }
    let maxLineWidth = 0;
    const lineWidths = [];
    for (let i = 0; i < lines.length; i++) {
      const lineWidth = this.measureText(lines[i], letterSpacing) + (i === 0 ? textIndent : 0);
      lineWidths.push(lineWidth);
      maxLineWidth = Math.max(maxLineWidth, lineWidth);
    }
    renderInfo.lineWidths = lineWidths;
    if (!w) {
      width = maxLineWidth + paddingLeft + paddingRight;
      innerWidth = maxLineWidth;
    }
    if (this._settings.wordWrap && w > maxLineWidth && this._settings.textAlign === "left" && lines.length === 1) {
      width = maxLineWidth + paddingLeft + paddingRight;
    }
    let height;
    if (h) {
      height = h;
    } else {
      height = calcHeight(this._settings.textBaseline, fontSize, lineHeight, lines.length, offsetY);
    }
    if (offsetY === null) {
      offsetY = fontSize;
    }
    renderInfo.w = width;
    renderInfo.h = height;
    renderInfo.lines = lines;
    renderInfo.precision = precision;
    if (!width) {
      width = 1;
    }
    if (!height) {
      height = 1;
    }
    if (cutSx || cutEx) {
      width = Math.min(width, cutEx - cutSx);
    }
    if (cutSy || cutEy) {
      height = Math.min(height, cutEy - cutSy);
    }
    renderInfo.width = width;
    renderInfo.innerWidth = innerWidth;
    renderInfo.height = height;
    renderInfo.fontSize = fontSize;
    renderInfo.cutSx = cutSx;
    renderInfo.cutSy = cutSy;
    renderInfo.cutEx = cutEx;
    renderInfo.cutEy = cutEy;
    renderInfo.lineHeight = lineHeight;
    renderInfo.defLineHeight = defLineHeight;
    renderInfo.lineWidths = lineWidths;
    renderInfo.offsetY = offsetY;
    renderInfo.paddingLeft = paddingLeft;
    renderInfo.paddingRight = paddingRight;
    renderInfo.letterSpacing = letterSpacing;
    renderInfo.textIndent = textIndent;
    renderInfo.metrics = metrics;
    return renderInfo;
  }
  draw(renderInfo, linesOverride) {
    const precision = this.getPrecision();
    const lines = (linesOverride == null ? void 0 : linesOverride.lines) || renderInfo.lines;
    const lineWidths = (linesOverride == null ? void 0 : linesOverride.lineWidths) || renderInfo.lineWidths;
    const height = linesOverride ? calcHeight(this._settings.textBaseline, renderInfo.fontSize, renderInfo.lineHeight, linesOverride.lines.length, this._settings.offsetY === null ? null : this._settings.offsetY * precision) : renderInfo.height;
    this._canvas.width = Math.min(Math.ceil(renderInfo.width + this._settings.textRenderIssueMargin), MAX_TEXTURE_DIMENSION);
    this._canvas.height = Math.min(Math.ceil(height), MAX_TEXTURE_DIMENSION);
    this.setFontProperties();
    if (renderInfo.fontSize >= 128) {
      this._context.globalAlpha = 0.01;
      this._context.fillRect(0, 0, 0.01, 0.01);
      this._context.globalAlpha = 1;
    }
    if (renderInfo.cutSx || renderInfo.cutSy) {
      this._context.translate(-renderInfo.cutSx, -renderInfo.cutSy);
    }
    let linePositionX;
    let linePositionY;
    const drawLines = [];
    const { metrics } = renderInfo;
    const ascenderPx = metrics ? metrics.ascender * renderInfo.fontSize : renderInfo.fontSize;
    const bareLineHeightPx = (metrics.ascender - metrics.descender) * renderInfo.fontSize;
    for (let i = 0, n = lines.length; i < n; i++) {
      linePositionX = i === 0 ? renderInfo.textIndent : 0;
      linePositionY = i * renderInfo.lineHeight + ascenderPx;
      if (this._settings.verticalAlign == "middle") {
        linePositionY += (renderInfo.lineHeight - bareLineHeightPx) / 2;
      } else if (this._settings.verticalAlign == "bottom") {
        linePositionY += renderInfo.lineHeight - bareLineHeightPx;
      }
      if (this._settings.textAlign === "right") {
        linePositionX += renderInfo.innerWidth - lineWidths[i];
      } else if (this._settings.textAlign === "center") {
        linePositionX += (renderInfo.innerWidth - lineWidths[i]) / 2;
      }
      linePositionX += renderInfo.paddingLeft;
      drawLines.push({
        text: lines[i],
        x: linePositionX,
        y: linePositionY,
        w: lineWidths[i]
      });
    }
    if (this._settings.highlight) {
      const color = this._settings.highlightColor;
      const hlHeight = this._settings.highlightHeight * precision || renderInfo.fontSize * 1.5;
      const offset = this._settings.highlightOffset * precision;
      const hlPaddingLeft = this._settings.highlightPaddingLeft !== null ? this._settings.highlightPaddingLeft * precision : renderInfo.paddingLeft;
      const hlPaddingRight = this._settings.highlightPaddingRight !== null ? this._settings.highlightPaddingRight * precision : renderInfo.paddingRight;
      this._context.fillStyle = getRgbaString(color);
      for (let i = 0; i < drawLines.length; i++) {
        const drawLine = drawLines[i];
        this._context.fillRect(drawLine.x - hlPaddingLeft, drawLine.y - renderInfo.offsetY + offset, drawLine.w + hlPaddingRight + hlPaddingLeft, hlHeight);
      }
    }
    let prevShadowSettings = null;
    if (this._settings.shadow) {
      prevShadowSettings = [
        this._context.shadowColor,
        this._context.shadowOffsetX,
        this._context.shadowOffsetY,
        this._context.shadowBlur
      ];
      this._context.shadowColor = getRgbaString(this._settings.shadowColor);
      this._context.shadowOffsetX = this._settings.shadowOffsetX * precision;
      this._context.shadowOffsetY = this._settings.shadowOffsetY * precision;
      this._context.shadowBlur = this._settings.shadowBlur * precision;
    }
    this._context.fillStyle = getRgbaString(this._settings.textColor);
    for (let i = 0, n = drawLines.length; i < n; i++) {
      const drawLine = drawLines[i];
      if (renderInfo.letterSpacing === 0) {
        this._context.fillText(drawLine.text, drawLine.x, drawLine.y);
      } else {
        const textSplit = drawLine.text.split("");
        let x = drawLine.x;
        for (let i2 = 0, j = textSplit.length; i2 < j; i2++) {
          this._context.fillText(textSplit[i2], x, drawLine.y);
          x += this.measureText(textSplit[i2], renderInfo.letterSpacing);
        }
      }
    }
    if (prevShadowSettings) {
      this._context.shadowColor = prevShadowSettings[0];
      this._context.shadowOffsetX = prevShadowSettings[1];
      this._context.shadowOffsetY = prevShadowSettings[2];
      this._context.shadowBlur = prevShadowSettings[3];
    }
    if (renderInfo.cutSx || renderInfo.cutSy) {
      this._context.translate(renderInfo.cutSx, renderInfo.cutSy);
    }
  }
  wrapWord(word, wordWrapWidth, suffix) {
    const suffixWidth = this._context.measureText(suffix).width;
    const wordLen = word.length;
    const wordWidth = this._context.measureText(word).width;
    if (wordWidth <= wordWrapWidth) {
      return word;
    }
    let cutoffIndex = Math.floor(wordWrapWidth * wordLen / wordWidth);
    let truncWordWidth = this._context.measureText(word.substring(0, cutoffIndex)).width + suffixWidth;
    if (truncWordWidth > wordWrapWidth) {
      while (cutoffIndex > 0) {
        truncWordWidth = this._context.measureText(word.substring(0, cutoffIndex)).width + suffixWidth;
        if (truncWordWidth > wordWrapWidth) {
          cutoffIndex -= 1;
        } else {
          break;
        }
      }
    } else {
      while (cutoffIndex < wordLen) {
        truncWordWidth = this._context.measureText(word.substring(0, cutoffIndex)).width + suffixWidth;
        if (truncWordWidth < wordWrapWidth) {
          cutoffIndex += 1;
        } else {
          cutoffIndex -= 1;
          break;
        }
      }
    }
    return word.substring(0, cutoffIndex) + (wordWrapWidth >= suffixWidth ? suffix : "");
  }
  /**
   * Applies newlines to a string to have it optimally fit into the horizontal
   * bounds set by the Text object's wordWrapWidth property.
   */
  wrapText(text2, wordWrapWidth, letterSpacing, indent = 0) {
    const spaceRegex = / |\u200B/g;
    const lines = text2.split(/\r?\n/g);
    let allLines = [];
    const realNewlines = [];
    for (let i = 0; i < lines.length; i++) {
      const resultLines = [];
      let result = "";
      let spaceLeft = wordWrapWidth - indent;
      const words = lines[i].split(spaceRegex);
      const spaces = lines[i].match(spaceRegex) || [];
      for (let j = 0; j < words.length; j++) {
        const space = spaces[j - 1] || "";
        const word = words[j];
        const wordWidth = this.measureText(word, letterSpacing);
        const wordWidthWithSpace = isZeroWidthSpace(space) ? wordWidth : wordWidth + this.measureText(space, letterSpacing);
        if (j === 0 || wordWidthWithSpace > spaceLeft) {
          if (j > 0) {
            resultLines.push(result);
            result = "";
          }
          result += word;
          spaceLeft = wordWrapWidth - wordWidth - (j === 0 ? indent : 0);
        } else {
          spaceLeft -= wordWidthWithSpace;
          result += space + word;
        }
      }
      resultLines.push(result);
      result = "";
      allLines = allLines.concat(resultLines);
      if (i < lines.length - 1) {
        realNewlines.push(allLines.length);
      }
    }
    return { l: allLines, n: realNewlines };
  }
  measureText(word, space = 0) {
    if (!space) {
      return this._context.measureText(word).width;
    }
    return word.split("").reduce((acc, char) => {
      if (isZeroWidthSpace(char)) {
        return acc;
      }
      return acc + this._context.measureText(char).width + space;
    }, 0);
  }
  mergeDefaults(settings) {
    return {
      text: "",
      w: 0,
      h: 0,
      fontStyle: "normal",
      fontSize: 40,
      fontFamily: null,
      trFontFace: null,
      wordWrap: true,
      wordWrapWidth: 0,
      wordBreak: false,
      textOverflow: "",
      lineHeight: null,
      textBaseline: "alphabetic",
      textAlign: "left",
      verticalAlign: "top",
      offsetY: null,
      maxLines: 0,
      maxHeight: null,
      overflowSuffix: "...",
      textColor: [1, 1, 1, 1],
      paddingLeft: 0,
      paddingRight: 0,
      shadow: false,
      shadowColor: [0, 0, 0, 1],
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      shadowBlur: 5,
      highlight: false,
      highlightHeight: 0,
      highlightColor: [0, 0, 0, 1],
      highlightOffset: 0,
      highlightPaddingLeft: 0,
      highlightPaddingRight: 0,
      letterSpacing: 0,
      textIndent: 0,
      cutSx: 0,
      cutEx: 0,
      cutSy: 0,
      cutEy: 0,
      advancedRenderer: false,
      fontBaselineRatio: 0,
      precision: 1,
      textRenderIssueMargin: 0,
      ...settings
    };
  }
}
const resolvedGlobal = typeof self === "undefined" ? globalThis : self;
const globalFontSet = ((_a = resolvedGlobal.document) == null ? void 0 : _a.fonts) || resolvedGlobal.fonts;
function getFontCssString(props) {
  const { fontFamily, fontStyle, fontWeight, fontStretch, fontSize } = props;
  return [fontStyle, fontWeight, fontStretch, "".concat(fontSize, "px"), fontFamily].join(" ");
}
class CanvasTextRenderer extends TextRenderer {
  constructor(stage) {
    super(stage);
    __publicField(this, "canvas");
    __publicField(this, "context");
    /**
     * Font family map used to store web font faces that were added to the
     * canvas text renderer.
     */
    __publicField(this, "fontFamilies", {});
    __publicField(this, "fontFamilyArray", [this.fontFamilies]);
    __publicField(this, "type", "canvas");
    __publicField(this, "loadFont", (state) => {
      const cssString = getFontCssString(state.props);
      const trFontFace = this.stage.fontManager.resolveFontFace(this.fontFamilyArray, state.props, "canvas");
      state.fontInfo = {
        fontFace: trFontFace,
        cssString,
        // TODO: For efficiency we would use this here but it's not reliable on WPE -> document.fonts.check(cssString),
        loaded: false
      };
      if (!state.fontInfo.loaded) {
        globalFontSet.load(cssString).then(this.onFontLoaded.bind(this, state, cssString)).catch(this.onFontLoadError.bind(this, state, cssString));
        return;
      }
    });
    if (typeof OffscreenCanvas !== "undefined") {
      this.canvas = new OffscreenCanvas(0, 0);
    } else {
      this.canvas = document.createElement("canvas");
    }
    let context = this.canvas.getContext("2d", {
      willReadFrequently: true
    });
    if (!context) {
      this.canvas = document.createElement("canvas");
      context = this.canvas.getContext("2d", {
        willReadFrequently: true
      });
    }
    this.context = context;
    this.addFontFace(new WebTrFontFace({
      fontFamily: "sans-serif",
      descriptors: {},
      fontUrl: ""
    }));
  }
  //#region Overrides
  getPropertySetters() {
    return {
      fontFamily: (state, value) => {
        state.props.fontFamily = value;
        state.fontInfo = void 0;
        this.invalidateLayoutCache(state);
      },
      fontWeight: (state, value) => {
        state.props.fontWeight = value;
        state.fontInfo = void 0;
        this.invalidateLayoutCache(state);
      },
      fontStyle: (state, value) => {
        state.props.fontStyle = value;
        state.fontInfo = void 0;
        this.invalidateLayoutCache(state);
      },
      fontStretch: (state, value) => {
        state.props.fontStretch = value;
        state.fontInfo = void 0;
        this.invalidateLayoutCache(state);
      },
      fontSize: (state, value) => {
        state.props.fontSize = value;
        state.fontInfo = void 0;
        this.invalidateLayoutCache(state);
      },
      text: (state, value) => {
        state.props.text = value;
        this.invalidateLayoutCache(state);
      },
      textAlign: (state, value) => {
        state.props.textAlign = value;
        this.invalidateLayoutCache(state);
      },
      color: (state, value) => {
        state.props.color = value;
        this.invalidateLayoutCache(state);
      },
      x: (state, value) => {
        state.props.x = value;
      },
      y: (state, value) => {
        state.props.y = value;
      },
      contain: (state, value) => {
        state.props.contain = value;
        this.invalidateLayoutCache(state);
      },
      width: (state, value) => {
        state.props.width = value;
        if (state.props.contain !== "none") {
          this.invalidateLayoutCache(state);
        }
      },
      height: (state, value) => {
        state.props.height = value;
        if (state.props.contain === "both") {
          this.invalidateLayoutCache(state);
        }
      },
      offsetY: (state, value) => {
        state.props.offsetY = value;
        this.invalidateLayoutCache(state);
      },
      scrollY: (state, value) => {
        state.props.scrollY = value;
      },
      letterSpacing: (state, value) => {
        state.props.letterSpacing = value;
        this.invalidateLayoutCache(state);
      },
      lineHeight: (state, value) => {
        state.props.lineHeight = value;
        this.invalidateLayoutCache(state);
      },
      maxLines: (state, value) => {
        state.props.maxLines = value;
        this.invalidateLayoutCache(state);
      },
      textBaseline: (state, value) => {
        state.props.textBaseline = value;
        this.invalidateLayoutCache(state);
      },
      verticalAlign: (state, value) => {
        state.props.verticalAlign = value;
        this.invalidateLayoutCache(state);
      },
      overflowSuffix: (state, value) => {
        state.props.overflowSuffix = value;
        this.invalidateLayoutCache(state);
      }
    };
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  canRenderFont(props) {
    return true;
  }
  isFontFaceSupported(fontFace) {
    return fontFace instanceof WebTrFontFace;
  }
  addFontFace(fontFace) {
    const fontFamily = fontFace.fontFamily;
    if (fontFamily !== "sans-serif") {
      globalFontSet.add(fontFace.fontFace);
    }
    let faceSet = this.fontFamilies[fontFamily];
    if (!faceSet) {
      faceSet = /* @__PURE__ */ new Set();
      this.fontFamilies[fontFamily] = faceSet;
    }
    faceSet.add(fontFace);
  }
  createState(props, node) {
    return {
      node,
      props,
      status: "initialState",
      updateScheduled: false,
      emitter: new EventEmitter(),
      textureNode: void 0,
      lightning2TextRenderer: new LightningTextTextureRenderer(this.canvas, this.context),
      renderInfo: void 0,
      forceFullLayoutCalc: false,
      textW: 0,
      textH: 0,
      fontInfo: void 0,
      isRenderable: false,
      debugData: {
        updateCount: 0,
        layoutCount: 0,
        drawCount: 0,
        lastLayoutNumCharacters: 0,
        layoutSum: 0,
        drawSum: 0,
        bufferSize: 0
      }
    };
  }
  updateState(state) {
    if (state.status === "initialState") {
      this.setStatus(state, "loading");
    }
    if (state.status === "loaded") {
      return;
    }
    if (!state.fontInfo) {
      return this.loadFont(state);
    }
    if (!state.fontInfo.loaded) {
      return;
    }
    if (!state.renderInfo) {
      state.renderInfo = this.calculateRenderInfo(state);
      state.textH = state.renderInfo.lineHeight * state.renderInfo.lines.length;
      state.textW = state.renderInfo.width;
      this.renderSingleCanvasPage(state);
    }
  }
  renderSingleCanvasPage(state) {
    assertTruthy(state.renderInfo);
    const node = state.node;
    const texture = this.stage.txManager.createTexture("ImageTexture", {
      premultiplyAlpha: true,
      src: (function(lightning2TextRenderer, renderInfo) {
        lightning2TextRenderer.draw(renderInfo, {
          lines: renderInfo.lines,
          lineWidths: renderInfo.lineWidths
        });
        if (this.canvas.width === 0 || this.canvas.height === 0) {
          return null;
        }
        return this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
      }).bind(this, state.lightning2TextRenderer, state.renderInfo)
    });
    if (state.textureNode) {
      state.textureNode.texture = texture;
      state.textureNode.alpha = getNormalizedAlphaComponent(state.props.color);
    } else {
      const textureNode = this.stage.createNode({
        parent: node,
        texture,
        autosize: true,
        // The alpha channel of the color is ignored when rasterizing the text
        // texture so we need to pass it directly to the texture node.
        alpha: getNormalizedAlphaComponent(state.props.color)
      });
      state.textureNode = textureNode;
    }
    this.setStatus(state, "loaded");
  }
  calculateRenderInfo(state) {
    var _a2, _b;
    state.lightning2TextRenderer.settings = {
      text: state.props.text,
      textAlign: state.props.textAlign,
      fontFamily: state.props.fontFamily,
      trFontFace: (_a2 = state.fontInfo) == null ? void 0 : _a2.fontFace,
      fontSize: state.props.fontSize,
      fontStyle: [
        state.props.fontStretch,
        state.props.fontStyle,
        state.props.fontWeight
      ].join(" "),
      textColor: getNormalizedRgbaComponents(state.props.color),
      offsetY: state.props.offsetY,
      wordWrap: state.props.contain !== "none",
      wordWrapWidth: state.props.contain === "none" ? void 0 : state.props.width,
      letterSpacing: state.props.letterSpacing,
      lineHeight: (_b = state.props.lineHeight) != null ? _b : null,
      maxLines: state.props.maxLines,
      maxHeight: state.props.contain === "both" ? state.props.height - state.props.offsetY : null,
      textBaseline: state.props.textBaseline,
      verticalAlign: state.props.verticalAlign,
      overflowSuffix: state.props.overflowSuffix,
      w: state.props.contain !== "none" ? state.props.width : void 0
    };
    state.renderInfo = state.lightning2TextRenderer.calculateRenderInfo();
    return state.renderInfo;
  }
  renderQuads() {
    return;
  }
  destroyState(state) {
    if (state.status === "destroyed") {
      return;
    }
    super.destroyState(state);
    if (state.textureNode) {
      state.textureNode.destroy();
      delete state.textureNode;
    }
    delete state.renderInfo;
  }
  //#endregion Overrides
  /**
   * Invalidate the layout cache stored in the state. This will cause the text
   * to be re-rendered on the next update.
   *
   * @remarks
   * This also invalidates the visible window cache.
   *
   * @param state
   */
  invalidateLayoutCache(state) {
    state.renderInfo = void 0;
    this.setStatus(state, "loading");
    this.scheduleUpdateState(state);
  }
  onFontLoaded(state, cssString) {
    var _a2;
    if (cssString !== ((_a2 = state.fontInfo) == null ? void 0 : _a2.cssString) || !state.fontInfo) {
      return;
    }
    state.fontInfo.loaded = true;
    this.scheduleUpdateState(state);
  }
  onFontLoadError(state, cssString, error) {
    var _a2;
    if (cssString !== ((_a2 = state.fontInfo) == null ? void 0 : _a2.cssString) || !state.fontInfo) {
      return;
    }
    state.fontInfo.loaded = true;
    console.error("CanvasTextRenderer: Error loading font '".concat(state.fontInfo.cssString, "'"), error);
    this.scheduleUpdateState(state);
  }
}
const WHITE = {
  isWhite: true,
  a: 1,
  r: 255,
  g: 255,
  b: 255
};
function parseColor(abgr) {
  if (abgr === 4294967295) {
    return WHITE;
  }
  const a = (abgr >>> 24 & 255) / 255;
  const b = abgr >>> 16 & 255 & 255;
  const g = abgr >>> 8 & 255 & 255;
  const r = abgr & 255 & 255;
  return { isWhite: false, a, r, g, b };
}
function parseColorRgba(rgba) {
  if (rgba === 4294967295) {
    return WHITE;
  }
  const r = rgba >>> 24 & 255;
  const g = rgba >>> 16 & 255 & 255;
  const b = rgba >>> 8 & 255 & 255;
  const a = (rgba & 255 & 255) / 255;
  return { isWhite: false, r, g, b, a };
}
function formatRgba({ a, r, g, b }) {
  return "rgba(".concat(r, ",").concat(g, ",").concat(b, ",").concat(a, ")");
}
class CanvasCoreTexture extends CoreContextTexture {
  constructor() {
    super(...arguments);
    __publicField(this, "image");
    __publicField(this, "tintCache");
  }
  load() {
    this.textureSource.setState("loading");
    this.onLoadRequest().then((size) => {
      this.textureSource.setState("loaded", size);
      this.textureSource.freeTextureData();
      this.updateMemSize();
    }).catch((err) => {
      this.textureSource.setState("failed", err);
      this.textureSource.freeTextureData();
    });
  }
  free() {
    this.image = void 0;
    this.tintCache = void 0;
    this.textureSource.setState("freed");
    this.setTextureMemUse(0);
    this.textureSource.freeTextureData();
  }
  updateMemSize() {
    const mult = this.tintCache ? 8 : 4;
    if (this.textureSource.dimensions) {
      const { width, height } = this.textureSource.dimensions;
      this.setTextureMemUse(width * height * mult);
    }
  }
  hasImage() {
    return this.image !== void 0;
  }
  getImage(color) {
    var _a2;
    const image = this.image;
    if (color.isWhite) {
      if (this.tintCache) {
        this.tintCache = void 0;
        this.updateMemSize();
      }
      return image;
    }
    const key2 = formatRgba(color);
    if (((_a2 = this.tintCache) == null ? void 0 : _a2.key) === key2) {
      return this.tintCache.image;
    }
    const tintedImage = this.tintTexture(image, key2);
    this.tintCache = {
      key: key2,
      image: tintedImage
    };
    this.updateMemSize();
    return tintedImage;
  }
  tintTexture(source, color) {
    const { width, height } = source;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = color;
      ctx.globalCompositeOperation = "copy";
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = "multiply";
      ctx.drawImage(source, 0, 0, width, height, 0, 0, width, height);
      ctx.globalCompositeOperation = "destination-in";
      ctx.drawImage(source, 0, 0, width, height, 0, 0, width, height);
    }
    return canvas;
  }
  async onLoadRequest() {
    var _a2, _b;
    assertTruthy((_b = (_a2 = this.textureSource) == null ? void 0 : _a2.textureData) == null ? void 0 : _b.data);
    const { data } = this.textureSource.textureData;
    if (data instanceof ImageData) {
      const canvas = document.createElement("canvas");
      canvas.width = data.width;
      canvas.height = data.height;
      const ctx = canvas.getContext("2d");
      if (ctx)
        ctx.putImageData(data, 0, 0);
      this.image = canvas;
      return { width: data.width, height: data.height };
    } else if (typeof ImageBitmap !== "undefined" && data instanceof ImageBitmap || data instanceof HTMLImageElement) {
      this.image = data;
      return { width: data.width, height: data.height };
    }
    return { width: 0, height: 0 };
  }
}
function getRadius(quad) {
  var _a2, _b, _c;
  if (quad.shader instanceof UnsupportedShader) {
    const shType = quad.shader.shType;
    if (shType === ROUNDED_RECTANGLE_SHADER_TYPE) {
      return (_b = (_a2 = quad.shaderProps) == null ? void 0 : _a2.radius) != null ? _b : 0;
    } else if (shType === "DynamicShader") {
      const effects = (_c = quad.shaderProps) == null ? void 0 : _c.effects;
      if (effects) {
        const effect2 = effects.find((effect3) => {
          var _a3;
          return effect3.type === "radius" && ((_a3 = effect3 == null ? void 0 : effect3.props) == null ? void 0 : _a3.radius);
        });
        return effect2 && effect2.type === "radius" && effect2.props.radius || 0;
      }
    }
  }
  return 0;
}
function getBorder(quad, direction = "") {
  var _a2;
  if (quad.shader instanceof UnsupportedShader) {
    const shType = quad.shader.shType;
    if (shType === "DynamicShader") {
      const effects = (_a2 = quad.shaderProps) == null ? void 0 : _a2.effects;
      if (effects && effects.length) {
        const effect2 = effects.find((effect3) => {
          return effect3.type === "border".concat(direction) && effect3.props && effect3.props.width;
        });
        return effect2 && effect2.props;
      }
    }
  }
  return void 0;
}
function roundRect(x, y, width, height, radius) {
  const context = Object.getPrototypeOf(this);
  if (!context.roundRect) {
    const fixOverlappingCorners = (radii2) => {
      const maxRadius = Math.min(width / 2, height / 2);
      const totalHorizontal = radii2.topLeft + radii2.topRight + radii2.bottomRight + radii2.bottomLeft;
      if (totalHorizontal > width || totalHorizontal > height) {
        const scale = maxRadius / Math.max(radii2.topLeft, radii2.topRight, radii2.bottomRight, radii2.bottomLeft);
        radii2.topLeft *= scale;
        radii2.topRight *= scale;
        radii2.bottomRight *= scale;
        radii2.bottomLeft *= scale;
      }
    };
    const radii = typeof radius === "number" ? {
      topLeft: radius,
      topRight: radius,
      bottomRight: radius,
      bottomLeft: radius
    } : { topLeft: 0, topRight: 0, bottomRight: 0, bottomLeft: 0, ...radius };
    fixOverlappingCorners(radii);
    this.moveTo(x + radii.topLeft, y);
    this.lineTo(x + width - radii.topRight, y);
    this.ellipse(x + width - radii.topRight, y + radii.topRight, radii.topRight, radii.topRight, 0, 1.5 * Math.PI, 2 * Math.PI);
    this.lineTo(x + width, y + height - radii.bottomRight);
    this.ellipse(x + width - radii.bottomRight, y + height - radii.bottomRight, radii.bottomRight, radii.bottomRight, 0, 0, 0.5 * Math.PI);
    this.lineTo(x + radii.bottomLeft, y + height);
    this.ellipse(x + radii.bottomLeft, y + height - radii.bottomLeft, radii.bottomLeft, radii.bottomLeft, 0, 0.5 * Math.PI, Math.PI);
    this.lineTo(x, y + radii.topLeft);
    this.ellipse(x + radii.topLeft, y + radii.topLeft, radii.topLeft, radii.topLeft, 0, Math.PI, 1.5 * Math.PI);
  } else {
    this.roundRect(x, y, width, height, radius);
  }
}
function strokeLine(ctx, x, y, width, height, lineWidth = 0, color, direction) {
  if (!lineWidth) {
    return;
  }
  let sx, sy = 0;
  let ex, ey = 0;
  switch (direction) {
    case "Top":
      sx = x;
      sy = y;
      ex = width + x;
      ey = y;
      break;
    case "Right":
      sx = x + width;
      sy = y;
      ex = x + width;
      ey = y + height;
      break;
    case "Bottom":
      sx = x;
      sy = y + height;
      ex = x + width;
      ey = y + height;
      break;
    case "Left":
      sx = x;
      sy = y;
      ex = x;
      ey = y + height;
      break;
  }
  ctx.beginPath();
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = formatRgba(parseColorRgba(color != null ? color : 0));
  ctx.moveTo(sx, sy);
  ctx.lineTo(ex, ey);
  ctx.stroke();
}
class CanvasCoreRenderer extends CoreRenderer {
  constructor(options) {
    super(options);
    __publicField(this, "context");
    __publicField(this, "canvas");
    __publicField(this, "pixelRatio");
    __publicField(this, "clearColor");
    __publicField(this, "renderToTextureActive", false);
    __publicField(this, "activeRttNode", null);
    __publicField(this, "defShaderCtr");
    this.mode = "canvas";
    this.shManager.renderer = this;
    const { canvas, pixelRatio, clearColor } = options;
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.pixelRatio = pixelRatio;
    this.clearColor = clearColor ? getRgbaComponents(clearColor) : void 0;
    this.defShaderCtr = {
      type: "DefaultShader",
      props: {},
      shader: new UnsupportedShader("DefaultShader"),
      getResolvedProps: () => () => {
        return {};
      }
    };
  }
  reset() {
    this.canvas.width = this.canvas.width;
    const ctx = this.context;
    if (this.clearColor) {
      const [r, g, b, a] = this.clearColor;
      ctx.fillStyle = "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(a / 255, ")");
      ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    ctx.scale(this.pixelRatio, this.pixelRatio);
  }
  render() {
  }
  addQuad(quad) {
    var _a2, _b;
    const ctx = this.context;
    const { tx, ty, width, height, alpha, colorTl, colorTr, colorBr, ta, tb, tc, td, clippingRect } = quad;
    let texture = quad.texture;
    let ctxTexture = void 0;
    let frame;
    const textureType = texture == null ? void 0 : texture.type;
    if (textureType !== TextureType.image && textureType !== TextureType.color && textureType !== TextureType.subTexture && textureType !== TextureType.noise) {
      return;
    }
    if (texture) {
      if (texture instanceof SubTexture) {
        frame = texture.props;
        texture = texture.parentTexture;
      }
      ctxTexture = texture.ctxTexture;
      if (texture.state === "freed") {
        return;
      }
      if (texture.state !== "loaded") {
        return;
      }
    }
    const color = parseColor(colorTl);
    const hasTransform = ta !== 1;
    const hasClipping = clippingRect.width !== 0 && clippingRect.height !== 0;
    const hasGradient = colorTl !== colorTr || colorTl !== colorBr;
    const hasQuadShader = Boolean(quad.shader);
    const radius = hasQuadShader ? getRadius(quad) : 0;
    const border = hasQuadShader ? getBorder(quad) : void 0;
    if (hasTransform || hasClipping || radius) {
      ctx.save();
    }
    if (hasClipping) {
      const path = new Path2D();
      const { x, y, width: width2, height: height2 } = clippingRect;
      path.rect(x, y, width2, height2);
      ctx.clip(path);
    }
    if (hasTransform) {
      const scale = this.pixelRatio;
      ctx.setTransform(ta, tc, tb, td, tx * scale, ty * scale);
      ctx.scale(scale, scale);
      ctx.translate(-tx, -ty);
    }
    if (radius) {
      const path = new Path2D();
      roundRect.call(path, tx, ty, width, height, radius);
      ctx.clip(path);
    }
    if ((textureType === TextureType.image || textureType === TextureType.subTexture || textureType === TextureType.noise) && ctxTexture) {
      const image = ctxTexture.getImage(color);
      ctx.globalAlpha = (_a2 = color.a) != null ? _a2 : alpha;
      if (frame) {
        ctx.drawImage(image, frame.x, frame.y, frame.width, frame.height, tx, ty, width, height);
      } else {
        try {
          ctx.drawImage(image, tx, ty, width, height);
        } catch (error) {
        }
      }
      ctx.globalAlpha = 1;
    } else if (textureType === TextureType.color && hasGradient) {
      let endX = tx;
      let endY = ty;
      let endColor;
      if (colorTl === colorTr) {
        endX = tx;
        endY = ty + height;
        endColor = parseColor(colorBr);
      } else {
        endX = tx + width;
        endY = ty;
        endColor = parseColor(colorTr);
      }
      const gradient = ctx.createLinearGradient(tx, ty, endX, endY);
      gradient.addColorStop(0, formatRgba(color));
      gradient.addColorStop(1, formatRgba(endColor));
      ctx.fillStyle = gradient;
      ctx.fillRect(tx, ty, width, height);
    } else if (textureType === TextureType.color) {
      ctx.fillStyle = formatRgba(color);
      ctx.fillRect(tx, ty, width, height);
    }
    if (border && border.width) {
      const borderWidth = border.width;
      const borderInnerWidth = border.width / 2;
      const borderColor = formatRgba(parseColorRgba((_b = border.color) != null ? _b : 0));
      ctx.beginPath();
      ctx.lineWidth = borderWidth;
      ctx.strokeStyle = borderColor;
      ctx.globalAlpha = alpha;
      if (radius) {
        roundRect.call(ctx, tx + borderInnerWidth, ty + borderInnerWidth, width - borderWidth, height - borderWidth, radius);
        ctx.stroke();
      } else {
        ctx.strokeRect(tx + borderInnerWidth, ty + borderInnerWidth, width - borderWidth, height - borderWidth);
      }
      ctx.globalAlpha = 1;
    } else if (hasQuadShader) {
      const borderTop = getBorder(quad, "Top");
      const borderRight = getBorder(quad, "Right");
      const borderBottom = getBorder(quad, "Bottom");
      const borderLeft = getBorder(quad, "Left");
      if (borderTop) {
        strokeLine(ctx, tx, ty, width, height, borderTop.width, borderTop.color, "Top");
      }
      if (borderRight) {
        strokeLine(ctx, tx, ty, width, height, borderRight.width, borderRight.color, "Right");
      }
      if (borderBottom) {
        strokeLine(ctx, tx, ty, width, height, borderBottom.width, borderBottom.color, "Bottom");
      }
      if (borderLeft) {
        strokeLine(ctx, tx, ty, width, height, borderLeft.width, borderLeft.color, "Left");
      }
    }
    if (hasTransform || hasClipping || radius) {
      ctx.restore();
    }
  }
  createCtxTexture(textureSource) {
    return new CanvasCoreTexture(this.txMemManager, textureSource);
  }
  getShaderManager() {
    return this.shManager;
  }
  getDefShaderCtr() {
    return this.defShaderCtr;
  }
  renderRTTNodes() {
  }
  removeRTTNode(node) {
  }
  renderToTexture(node) {
  }
  getBufferInfo() {
    return null;
  }
  getQuadCount() {
    return null;
  }
  /**
   * Updates the clear color of the canvas renderer.
   *
   * @param color - The color to set as the clear color.
   */
  updateClearColor(color) {
    this.clearColor = color ? getRgbaComponents(color) : void 0;
  }
}
const [focusPath, setFocusPath] = createSignal([]);
const useFocusManager = (userKeyMap, keyHoldOptions) => {
  const owner = getOwner();
  const ownerContext = runWithOwner.bind(void 0, owner);
  Config.setActiveElement = (activeElm) => ownerContext(() => setActiveElement(activeElm));
  const { cleanup, focusPath: focusPathCore } = useFocusManager$1({
    userKeyMap,
    keyHoldOptions,
    ownerContext
  });
  createEffect(
    on(
      activeElement,
      () => {
        setFocusPath([...focusPathCore()]);
      },
      { defer: true }
    )
  );
  onCleanup(cleanup);
};
function flattenStrings(series = []) {
  const flattenedSeries = [];
  let i;
  for (i = 0; i < series.length; i++) {
    const s = series[i];
    if (typeof s === "string" && !s.includes("PAUSE-")) {
      flattenedSeries.push(series[i]);
    } else {
      break;
    }
  }
  return [flattenedSeries.join(",\b ")].concat(
    series.slice(i)
  );
}
function delay(pause) {
  return new Promise((resolve) => {
    setTimeout(resolve, pause);
  });
}
function speak(phrase, utterances, lang = "en-US") {
  const synth = window.speechSynthesis;
  return new Promise((resolve, reject) => {
    const utterance = new SpeechSynthesisUtterance(phrase);
    utterance.lang = lang;
    utterance.onend = () => {
      resolve();
    };
    utterance.onerror = (e) => {
      reject(e);
    };
    utterances.push(utterance);
    synth.speak(utterance);
  });
}
function speakSeries(series, lang, root = true) {
  const synth = window.speechSynthesis;
  const remainingPhrases = flattenStrings(
    Array.isArray(series) ? series : [series]
  );
  const nestedSeriesResults = [];
  const utterances = [];
  let active = true;
  const seriesChain = (async () => {
    try {
      while (active && remainingPhrases.length) {
        const phrase = await Promise.resolve(remainingPhrases.shift());
        if (!active) {
          break;
        } else if (typeof phrase === "string" && phrase.includes("PAUSE-")) {
          let pause = Number(phrase.split("PAUSE-")[1]) * 1e3;
          if (isNaN(pause)) {
            pause = 0;
          }
          await delay(pause);
        } else if (typeof phrase === "string" && phrase.length) {
          const totalRetries = 3;
          let retriesLeft = totalRetries;
          while (active && retriesLeft > 0) {
            try {
              await speak(phrase, utterances, lang);
              retriesLeft = 0;
            } catch (e) {
              if (e instanceof SpeechSynthesisErrorEvent) {
                if (e.error === "network") {
                  retriesLeft--;
                  console.warn(
                    "Speech synthesis network error. Retries left: ".concat(retriesLeft)
                  );
                  await delay(500 * (totalRetries - retriesLeft));
                } else if (e.error === "canceled" || e.error === "interrupted") {
                  retriesLeft = 0;
                } else {
                  throw new Error("SpeechSynthesisErrorEvent: ".concat(e.error));
                }
              } else {
                throw e;
              }
            }
          }
        } else if (typeof phrase === "function") {
          const seriesResult = speakSeries(phrase(), lang, false);
          nestedSeriesResults.push(seriesResult);
          await seriesResult.series;
        } else if (Array.isArray(phrase)) {
          const seriesResult = speakSeries(phrase, lang, false);
          nestedSeriesResults.push(seriesResult);
          await seriesResult.series;
        }
      }
    } finally {
      active = false;
    }
  })();
  return {
    series: seriesChain,
    get active() {
      return active;
    },
    append: (toSpeak) => {
      remainingPhrases.push(toSpeak);
    },
    cancel: () => {
      if (!active) {
        return;
      }
      if (root) {
        synth.cancel();
      }
      nestedSeriesResults.forEach((nestedSeriesResults2) => {
        nestedSeriesResults2.cancel();
      });
      active = false;
    }
  };
}
let currentSeries;
function SpeechEngine(toSpeak, lang = "en-US") {
  currentSeries && currentSeries.cancel();
  currentSeries = speakSeries(toSpeak, lang);
  return currentSeries;
}
const voidFn = () => void 0;
const isServer = false;
var debounce = (callback, wait) => {
  let timeoutId;
  const clear = () => clearTimeout(timeoutId);
  if (getOwner()) onCleanup(clear);
  const debounced = (...args) => {
    if (timeoutId !== void 0) clear();
    timeoutId = setTimeout(() => callback(...args), wait);
  };
  return Object.assign(debounced, { clear });
};
let resetFocusPathTimer;
let prevFocusPath = [];
let currentlySpeaking;
let voiceOutDisabled = false;
const fiveMinutes = 3e5;
function debounceWithFlush(callback, time) {
  const trigger = debounce(callback, time);
  let scopedValue;
  const debounced = (newValue) => {
    scopedValue = newValue;
    trigger(newValue);
  };
  debounced.flush = () => {
    trigger.clear();
    callback(scopedValue);
  };
  debounced.clear = trigger.clear;
  return debounced;
}
function getElmName(elm) {
  return elm.id || elm.name;
}
function onFocusChangeCore(focusPath2 = []) {
  if (!Announcer.onFocusChange || !Announcer.enabled) {
    return;
  }
  const loaded = focusPath2.every((elm) => !elm.loading);
  const focusDiff = focusPath2.filter((elm) => !prevFocusPath.includes(elm));
  resetFocusPathTimer();
  if (!loaded && Announcer.onFocusChange) {
    Announcer.onFocusChange([]);
    return;
  }
  prevFocusPath = focusPath2.slice(0);
  const toAnnounceText = [];
  const toAnnounce = focusDiff.reduce(
    (acc, elm) => {
      if (elm.announce) {
        acc.push([getElmName(elm), "Announce", elm.announce]);
        toAnnounceText.push(elm.announce);
      } else if (elm.title) {
        acc.push([getElmName(elm), "Title", elm.title]);
        toAnnounceText.push(elm.title);
      } else {
        acc.push([getElmName(elm), "No Announce", ""]);
      }
      return acc;
    },
    []
  );
  focusDiff.reverse().reduce((acc, elm) => {
    if (elm.announceContext) {
      acc.push([getElmName(elm), "Context", elm.announceContext]);
      toAnnounceText.push(elm.announceContext);
    } else {
      acc.push([getElmName(elm), "No Context", ""]);
    }
    return acc;
  }, toAnnounce);
  if (Announcer.debug) {
    console.table(toAnnounce);
  }
  if (toAnnounceText.length) {
    return Announcer.speak(
      toAnnounceText.reduce((acc, val) => acc.concat(val), [])
    );
  }
}
function textToSpeech(toSpeak, lang) {
  if (voiceOutDisabled) {
    return;
  }
  return currentlySpeaking = SpeechEngine(toSpeak, lang);
}
const Announcer = {
  debug: false,
  enabled: true,
  lang: "en-US",
  cancel: function() {
    currentlySpeaking && currentlySpeaking.cancel();
  },
  clearPrevFocus: function(depth2 = 0) {
    prevFocusPath = prevFocusPath.slice(0, depth2);
    resetFocusPathTimer();
  },
  speak: function(text2, { append = false, notification = false } = {}) {
    if (Announcer.onFocusChange && Announcer.enabled) {
      Announcer.onFocusChange.flush();
      if (append && currentlySpeaking && currentlySpeaking.active) {
        currentlySpeaking.append(text2);
      } else {
        Announcer.cancel();
        textToSpeech(text2, Announcer.lang);
      }
      if (notification) {
        voiceOutDisabled = true;
        currentlySpeaking == null ? void 0 : currentlySpeaking.series.finally(() => {
          voiceOutDisabled = false;
          Announcer.refresh();
        }).catch(console.error);
      }
    }
    return currentlySpeaking;
  },
  refresh: function(depth2 = 0) {
    Announcer.clearPrevFocus(depth2);
    Announcer.onFocusChange && Announcer.onFocusChange(untrack(() => focusPath()));
  },
  setupTimers: function({
    focusDebounce = 400,
    focusChangeTimeout = fiveMinutes
  } = {}) {
    Announcer.onFocusChange = debounceWithFlush(
      onFocusChangeCore,
      focusDebounce
    );
    resetFocusPathTimer = debounceWithFlush(() => {
      prevFocusPath = [];
    }, focusChangeTimeout);
  }
};
const useAnnouncer = () => {
  Announcer.setupTimers();
  createEffect(on(focusPath, Announcer.onFocusChange, { defer: true }));
  return Announcer;
};
function createLazy(component, props, keyHandler) {
  const [offset, setOffset] = createSignal(1);
  let timeoutId = null;
  createEffect(() => setOffset(props.selected || 1));
  if (props.sync !== true) {
    createEffect(() => {
      if (props.each) {
        let count2 = untrack(offset);
        const loadItems = () => {
          if (count2 < props.upCount) {
            setOffset(count2 + 1);
            timeoutId = setTimeout(loadItems, 16);
            count2++;
          }
        };
        loadItems();
      }
    });
  } else {
    setOffset(props.upCount);
  }
  const items = createMemo(() => Array.isArray(props.each) ? props.each.slice(0, offset()) : []);
  const updateOffset = () => {
    var _a2;
    const maxOffset = props.each ? props.each.length - 1 : 0;
    if (offset() >= maxOffset) return;
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      setOffset((prev) => Math.min(prev + 1, maxOffset));
      timeoutId = null;
    }, (_a2 = props.delay) != null ? _a2 : 0);
  };
  return createComponent(Show, {
    get when() {
      return items();
    },
    get fallback() {
      return props.fallback;
    },
    get children() {
      return createComponent(Dynamic, mergeProps({
        component
      }, props, () => keyHandler(updateOffset), {
        get children() {
          return createComponent(Index, {
            get each() {
              return items();
            },
            get children() {
              return props.children;
            }
          });
        }
      }));
    }
  });
}
function LazyRow(props) {
  return createLazy(Row, props, (updateOffset) => ({
    onRight: updateOffset
  }));
}
function LazyColumn(props) {
  return createLazy(Column, props, (updateOffset) => ({
    onDown: updateOffset
  }));
}
function createBeforeLeave() {
  let listeners = /* @__PURE__ */ new Set();
  function subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }
  let ignore = false;
  function confirm(to, options) {
    if (ignore)
      return !(ignore = false);
    const e = {
      to,
      options,
      defaultPrevented: false,
      preventDefault: () => e.defaultPrevented = true
    };
    for (const l of listeners)
      l.listener({
        ...e,
        from: l.location,
        retry: (force) => {
          force && (ignore = true);
          l.navigate(to, { ...options, resolve: false });
        }
      });
    return !e.defaultPrevented;
  }
  return {
    subscribe,
    confirm
  };
}
let depth;
function saveCurrentDepth() {
  if (!window.history.state || window.history.state._depth == null) {
    window.history.replaceState({ ...window.history.state, _depth: window.history.length - 1 }, "");
  }
  depth = window.history.state._depth;
}
{
  saveCurrentDepth();
}
function keepDepth(state) {
  return {
    ...state,
    _depth: window.history.state && window.history.state._depth
  };
}
function notifyIfNotBlocked(notify, block) {
  let ignore = false;
  return () => {
    const prevDepth = depth;
    saveCurrentDepth();
    const delta = prevDepth == null ? null : depth - prevDepth;
    if (ignore) {
      ignore = false;
      return;
    }
    if (delta && block(delta)) {
      ignore = true;
      window.history.go(-delta);
    } else {
      notify();
    }
  };
}
const hasSchemeRegex = /^(?:[a-z0-9]+:)?\/\//i;
const trimPathRegex = /^\/+|(\/)\/+$/g;
const mockBase = "http://sr";
function normalizePath(path, omitSlash = false) {
  const s = path.replace(trimPathRegex, "$1");
  return s ? omitSlash || /^[?#]/.test(s) ? s : "/" + s : "";
}
function resolvePath(base, path, from) {
  if (hasSchemeRegex.test(path)) {
    return void 0;
  }
  const basePath2 = normalizePath(base);
  const fromPath = from && normalizePath(from);
  let result = "";
  if (!fromPath || path.startsWith("/")) {
    result = basePath2;
  } else if (fromPath.toLowerCase().indexOf(basePath2.toLowerCase()) !== 0) {
    result = basePath2 + fromPath;
  } else {
    result = fromPath;
  }
  return (result || "/") + normalizePath(path, !result);
}
function invariant(value, message) {
  if (value == null) {
    throw new Error(message);
  }
  return value;
}
function joinPaths(from, to) {
  return normalizePath(from).replace(/\/*(\*.*)?$/g, "") + normalizePath(to);
}
function extractSearchParams(url) {
  const params2 = {};
  url.searchParams.forEach((value, key2) => {
    if (key2 in params2) {
      if (Array.isArray(params2[key2]))
        params2[key2].push(value);
      else
        params2[key2] = [params2[key2], value];
    } else
      params2[key2] = value;
  });
  return params2;
}
function createMatcher(path, partial, matchFilters) {
  const [pattern, splat] = path.split("/*", 2);
  const segments = pattern.split("/").filter(Boolean);
  const len = segments.length;
  return (location) => {
    const locSegments = location.split("/").filter(Boolean);
    const lenDiff = locSegments.length - len;
    if (lenDiff < 0 || lenDiff > 0 && splat === void 0 && !partial) {
      return null;
    }
    const match = {
      path: len ? "" : "/",
      params: {}
    };
    const matchFilter = (s) => matchFilters === void 0 ? void 0 : matchFilters[s];
    for (let i = 0; i < len; i++) {
      const segment = segments[i];
      const dynamic = segment[0] === ":";
      const locSegment = dynamic ? locSegments[i] : locSegments[i].toLowerCase();
      const key2 = dynamic ? segment.slice(1) : segment.toLowerCase();
      if (dynamic && matchSegment(locSegment, matchFilter(key2))) {
        match.params[key2] = locSegment;
      } else if (dynamic || !matchSegment(locSegment, key2)) {
        return null;
      }
      match.path += "/".concat(locSegment);
    }
    if (splat) {
      const remainder = lenDiff ? locSegments.slice(-lenDiff).join("/") : "";
      if (matchSegment(remainder, matchFilter(splat))) {
        match.params[splat] = remainder;
      } else {
        return null;
      }
    }
    return match;
  };
}
function matchSegment(input, filter) {
  const isEqual = (s) => s === input;
  if (filter === void 0) {
    return true;
  } else if (typeof filter === "string") {
    return isEqual(filter);
  } else if (typeof filter === "function") {
    return filter(input);
  } else if (Array.isArray(filter)) {
    return filter.some(isEqual);
  } else if (filter instanceof RegExp) {
    return filter.test(input);
  }
  return false;
}
function scoreRoute(route) {
  const [pattern, splat] = route.pattern.split("/*", 2);
  const segments = pattern.split("/").filter(Boolean);
  return segments.reduce((score, segment) => score + (segment.startsWith(":") ? 2 : 3), segments.length - (splat === void 0 ? 0 : 1));
}
function createMemoObject(fn) {
  const map = /* @__PURE__ */ new Map();
  const owner = getOwner();
  return new Proxy({}, {
    get(_, property) {
      if (!map.has(property)) {
        runWithOwner(owner, () => map.set(property, createMemo(() => fn()[property])));
      }
      return map.get(property)();
    },
    getOwnPropertyDescriptor() {
      return {
        enumerable: true,
        configurable: true
      };
    },
    ownKeys() {
      return Reflect.ownKeys(fn());
    }
  });
}
function expandOptionals(pattern) {
  let match = /(\/?\:[^\/]+)\?/.exec(pattern);
  if (!match)
    return [pattern];
  let prefix = pattern.slice(0, match.index);
  let suffix = pattern.slice(match.index + match[0].length);
  const prefixes = [prefix, prefix += match[1]];
  while (match = /^(\/\:[^\/]+)\?/.exec(suffix)) {
    prefixes.push(prefix += match[1]);
    suffix = suffix.slice(match[0].length);
  }
  return expandOptionals(suffix).reduce((results, expansion) => [...results, ...prefixes.map((p) => p + expansion)], []);
}
const MAX_REDIRECTS = 100;
const RouterContextObj = createContext();
const RouteContextObj = createContext();
const useRouter = () => invariant(useContext(RouterContextObj), "<A> and 'use' router primitives can be only used inside a Route.");
const useNavigate = () => useRouter().navigatorFactory();
const useLocation = () => useRouter().location;
const usePreloadRoute = () => {
  const pre = useRouter().preloadRoute;
  return (url, options = {}) => pre(url instanceof URL ? url : new URL(url, mockBase), options.preloadData);
};
const useMatch = (path, matchFilters) => {
  const location = useLocation();
  const matchers = createMemo(() => expandOptionals(path()).map((path2) => createMatcher(path2, void 0, matchFilters)));
  return createMemo(() => {
    for (const matcher of matchers()) {
      const match = matcher(location.pathname);
      if (match)
        return match;
    }
  });
};
const useParams = () => useRouter().params;
function createRoutes(routeDef, base = "") {
  const { component, preload: preload2, load, children: children2, info } = routeDef;
  const isLeaf = !children2 || Array.isArray(children2) && !children2.length;
  const shared = {
    key: routeDef,
    component,
    preload: preload2 || load,
    info
  };
  return asArray(routeDef.path).reduce((acc, originalPath) => {
    for (const expandedPath of expandOptionals(originalPath)) {
      const path = joinPaths(base, expandedPath);
      let pattern = isLeaf ? path : path.split("/*", 1)[0];
      pattern = pattern.split("/").map((s) => {
        return s.startsWith(":") || s.startsWith("*") ? s : encodeURIComponent(s);
      }).join("/");
      acc.push({
        ...shared,
        originalPath,
        pattern,
        matcher: createMatcher(pattern, !isLeaf, routeDef.matchFilters)
      });
    }
    return acc;
  }, []);
}
function createBranch(routes, index = 0) {
  return {
    routes,
    score: scoreRoute(routes[routes.length - 1]) * 1e4 - index,
    matcher(location) {
      const matches = [];
      for (let i = routes.length - 1; i >= 0; i--) {
        const route = routes[i];
        const match = route.matcher(location);
        if (!match) {
          return null;
        }
        matches.unshift({
          ...match,
          route
        });
      }
      return matches;
    }
  };
}
function asArray(value) {
  return Array.isArray(value) ? value : [value];
}
function createBranches(routeDef, base = "", stack = [], branches = []) {
  const routeDefs = asArray(routeDef);
  for (let i = 0, len = routeDefs.length; i < len; i++) {
    const def = routeDefs[i];
    if (def && typeof def === "object") {
      if (!def.hasOwnProperty("path"))
        def.path = "";
      const routes = createRoutes(def, base);
      for (const route of routes) {
        stack.push(route);
        const isEmptyArray = Array.isArray(def.children) && def.children.length === 0;
        if (def.children && !isEmptyArray) {
          createBranches(def.children, route.pattern, stack, branches);
        } else {
          const branch = createBranch([...stack], branches.length);
          branches.push(branch);
        }
        stack.pop();
      }
    }
  }
  return stack.length ? branches : branches.sort((a, b) => b.score - a.score);
}
function getRouteMatches(branches, location) {
  for (let i = 0, len = branches.length; i < len; i++) {
    const match = branches[i].matcher(location);
    if (match) {
      return match;
    }
  }
  return [];
}
function createLocation(path, state, queryWrapper) {
  const origin = new URL(mockBase);
  const url = createMemo((prev) => {
    const path_ = path();
    try {
      return new URL(path_, origin);
    } catch (err) {
      console.error("Invalid path ".concat(path_));
      return prev;
    }
  }, origin, {
    equals: (a, b) => a.href === b.href
  });
  const pathname = createMemo(() => url().pathname);
  const search = createMemo(() => url().search, true);
  const hash = createMemo(() => url().hash);
  const key2 = () => "";
  const queryFn = on(search, () => extractSearchParams(url()));
  return {
    get pathname() {
      return pathname();
    },
    get search() {
      return search();
    },
    get hash() {
      return hash();
    },
    get state() {
      return state();
    },
    get key() {
      return key2();
    },
    query: queryWrapper ? queryWrapper(queryFn) : createMemoObject(queryFn)
  };
}
let intent;
function getIntent() {
  return intent;
}
function setInPreloadFn(value) {
}
function createRouterContext(integration, branches, getContext, options = {}) {
  const { signal: [source, setSource], utils = {} } = integration;
  const parsePath = utils.parsePath || ((p) => p);
  const renderPath = utils.renderPath || ((p) => p);
  const beforeLeave = utils.beforeLeave || createBeforeLeave();
  const basePath2 = resolvePath("", options.base || "");
  if (basePath2 === void 0) {
    throw new Error("".concat(basePath2, " is not a valid base path"));
  } else if (basePath2 && !source().value) {
    setSource({ value: basePath2, replace: true, scroll: false });
  }
  const [isRouting, setIsRouting] = createSignal(false);
  let lastTransitionTarget;
  const transition = (newIntent, newTarget) => {
    if (newTarget.value === reference() && newTarget.state === state())
      return;
    if (lastTransitionTarget === void 0)
      setIsRouting(true);
    intent = newIntent;
    lastTransitionTarget = newTarget;
    startTransition(() => {
      if (lastTransitionTarget !== newTarget)
        return;
      setReference(lastTransitionTarget.value);
      setState(lastTransitionTarget.state);
      submissions[1]((subs) => subs.filter((s) => s.pending));
    }).finally(() => {
      if (lastTransitionTarget !== newTarget)
        return;
      batch(() => {
        intent = void 0;
        if (newIntent === "navigate")
          navigateEnd(lastTransitionTarget);
        setIsRouting(false);
        lastTransitionTarget = void 0;
      });
    });
  };
  const [reference, setReference] = createSignal(source().value);
  const [state, setState] = createSignal(source().state);
  const location = createLocation(reference, state, utils.queryWrapper);
  const referrers = [];
  const submissions = createSignal([]);
  const matches = createMemo(() => {
    if (typeof options.transformUrl === "function") {
      return getRouteMatches(branches(), options.transformUrl(location.pathname));
    }
    return getRouteMatches(branches(), location.pathname);
  });
  const buildParams = () => {
    const m = matches();
    const params3 = {};
    for (let i = 0; i < m.length; i++) {
      Object.assign(params3, m[i].params);
    }
    return params3;
  };
  const params2 = utils.paramsWrapper ? utils.paramsWrapper(buildParams, branches) : createMemoObject(buildParams);
  const baseRoute = {
    pattern: basePath2,
    path: () => basePath2,
    outlet: () => null,
    resolvePath(to) {
      return resolvePath(basePath2, to);
    }
  };
  createRenderEffect(on(source, (source2) => transition("native", source2), { defer: true }));
  return {
    base: baseRoute,
    location,
    params: params2,
    isRouting,
    renderPath,
    parsePath,
    navigatorFactory,
    matches,
    beforeLeave,
    preloadRoute,
    singleFlight: options.singleFlight === void 0 ? true : options.singleFlight,
    submissions
  };
  function navigateFromRoute(route, to, options2) {
    untrack(() => {
      if (typeof to === "number") {
        if (!to) {
        } else if (utils.go) {
          utils.go(to);
        } else {
          console.warn("Router integration does not support relative routing");
        }
        return;
      }
      const queryOnly = !to || to[0] === "?";
      const { replace, resolve, scroll: scroll2, state: nextState } = {
        replace: false,
        resolve: !queryOnly,
        scroll: true,
        ...options2
      };
      const resolvedTo = resolve ? route.resolvePath(to) : resolvePath(queryOnly && location.pathname || "", to);
      if (resolvedTo === void 0) {
        throw new Error("Path '".concat(to, "' is not a routable path"));
      } else if (referrers.length >= MAX_REDIRECTS) {
        throw new Error("Too many redirects");
      }
      const current = reference();
      if (resolvedTo !== current || nextState !== state()) {
        if (isServer) ;
        else if (beforeLeave.confirm(resolvedTo, options2)) {
          referrers.push({ value: current, replace, scroll: scroll2, state: state() });
          transition("navigate", {
            value: resolvedTo,
            state: nextState
          });
        }
      }
    });
  }
  function navigatorFactory(route) {
    route = route || useContext(RouteContextObj) || baseRoute;
    return (to, options2) => navigateFromRoute(route, to, options2);
  }
  function navigateEnd(next) {
    const first = referrers[0];
    if (first) {
      setSource({
        ...next,
        replace: first.replace,
        scroll: first.scroll
      });
      referrers.length = 0;
    }
  }
  function preloadRoute(url, preloadData) {
    const matches2 = getRouteMatches(branches(), url.pathname);
    const prevIntent = intent;
    intent = "preload";
    for (let match in matches2) {
      const { route, params: params3 } = matches2[match];
      route.component && route.component.preload && route.component.preload();
      const { preload: preload2 } = route;
      preloadData && preload2 && runWithOwner(getContext(), () => preload2({
        params: params3,
        location: {
          pathname: url.pathname,
          search: url.search,
          hash: url.hash,
          query: extractSearchParams(url),
          state: null,
          key: ""
        },
        intent: "preload"
      }));
    }
    intent = prevIntent;
  }
}
function createRouteContext(router, parent, outlet, match) {
  const { base, location, params: params2 } = router;
  const { pattern, component, preload: preload2 } = match().route;
  const path = createMemo(() => match().path);
  component && component.preload && component.preload();
  const data = preload2 ? preload2({ params: params2, location, intent: intent || "initial" }) : void 0;
  const route = {
    parent,
    pattern,
    path,
    outlet: () => component ? createComponent$1(component, {
      params: params2,
      location,
      data,
      get children() {
        return outlet();
      }
    }) : outlet(),
    resolvePath(to) {
      return resolvePath(base.path(), to, path());
    }
  };
  return route;
}
const createRouterComponent = (router) => (props) => {
  const {
    base
  } = props;
  const routeDefs = children(() => props.children);
  const branches = createMemo(() => createBranches(routeDefs(), props.base || ""));
  let context;
  const routerState = createRouterContext(router, branches, () => context, {
    base,
    singleFlight: props.singleFlight,
    transformUrl: props.transformUrl
  });
  router.create && router.create(routerState);
  return createComponent(RouterContextObj.Provider, {
    value: routerState,
    get children() {
      return createComponent(Root, {
        routerState,
        get root() {
          return props.root;
        },
        get preload() {
          return props.rootPreload || props.rootLoad;
        },
        get children() {
          return [memo(() => (context = getOwner()) && null), createComponent(Routes, {
            routerState,
            get branches() {
              return branches();
            }
          })];
        }
      });
    }
  });
};
function Root(props) {
  const location = props.routerState.location;
  const params2 = props.routerState.params;
  const data = createMemo(() => props.preload && untrack(() => {
    setInPreloadFn(true);
    props.preload({
      params: params2,
      location,
      intent: getIntent() || "initial"
    });
    setInPreloadFn(false);
  }));
  return createComponent(Show, {
    get when() {
      return props.root;
    },
    keyed: true,
    get fallback() {
      return props.children;
    },
    children: (Root2) => createComponent(Root2, {
      params: params2,
      location,
      get data() {
        return data();
      },
      get children() {
        return props.children;
      }
    })
  });
}
function Routes(props) {
  const disposers = [];
  let root;
  const routeStates = createMemo(on(props.routerState.matches, (nextMatches, prevMatches, prev) => {
    let equal = prevMatches && nextMatches.length === prevMatches.length;
    const next = [];
    for (let i = 0, len = nextMatches.length; i < len; i++) {
      const prevMatch = prevMatches && prevMatches[i];
      const nextMatch = nextMatches[i];
      if (prev && prevMatch && nextMatch.route.key === prevMatch.route.key) {
        next[i] = prev[i];
      } else {
        equal = false;
        if (disposers[i]) {
          disposers[i]();
        }
        createRoot((dispose2) => {
          disposers[i] = dispose2;
          next[i] = createRouteContext(props.routerState, next[i - 1] || props.routerState.base, createOutlet(() => routeStates()[i + 1]), () => props.routerState.matches()[i]);
        });
      }
    }
    disposers.splice(nextMatches.length).forEach((dispose2) => dispose2());
    if (prev && equal) {
      return prev;
    }
    root = next[0];
    return next;
  }));
  return createOutlet(() => routeStates() && root)();
}
const createOutlet = (child) => {
  return () => createComponent(Show, {
    get when() {
      return child();
    },
    keyed: true,
    children: (child2) => createComponent(RouteContextObj.Provider, {
      value: child2,
      get children() {
        return child2.outlet();
      }
    })
  });
};
const Route = (props) => {
  const childRoutes = children(() => props.children);
  return mergeProps$1(props, {
    get children() {
      return childRoutes();
    }
  });
};
function intercept([value, setValue], get2, set) {
  return [value, (v) => setValue(set(v))];
}
function createRouter(config) {
  let ignore = false;
  const wrap = (value) => typeof value === "string" ? { value } : value;
  const signal = intercept(createSignal(wrap(config.get()), {
    equals: (a, b) => a.value === b.value && a.state === b.state
  }), void 0, (next) => {
    !ignore && config.set(next);
    if (sharedConfig.registry && !sharedConfig.done)
      sharedConfig.done = true;
    return next;
  });
  config.init && onCleanup(config.init((value = config.get()) => {
    ignore = true;
    signal[1](wrap(value));
    ignore = false;
  }));
  return createRouterComponent({
    signal,
    create: config.create,
    utils: config.utils
  });
}
function hashParser(str) {
  const to = str.replace(/^.*?#/, "");
  if (!to.startsWith("/")) {
    const [, path = "/"] = window.location.hash.split("#", 2);
    return "".concat(path, "#").concat(to);
  }
  return to;
}
function bindEvent(target, type, handler) {
  target.addEventListener(type, handler);
  return () => target.removeEventListener(type, handler);
}
function HashRouter(props) {
  const getSource = () => window.location.hash.slice(1);
  const beforeLeave = createBeforeLeave();
  return createRouter({
    get: getSource,
    set({ value, replace, state }) {
      if (replace) {
        window.history.replaceState(keepDepth(state), "", "#" + value);
      } else {
        window.history.pushState(state, "", "#" + value);
      }
      saveCurrentDepth();
    },
    init: (notify) => bindEvent(
      window,
      "hashchange",
      notifyIfNotBlocked(
        notify,
        (delta) => !beforeLeave.confirm(delta && delta < 0 ? delta : getSource())
      )
    ),
    utils: {
      go: (delta) => window.history.go(delta),
      renderPath: (path) => "#".concat(path),
      parsePath: hashParser,
      beforeLeave,
      queryWrapper: props.forceProxy || !SUPPORTS_PROXY ? (getQuery) => {
        return createMemoWithoutProxy(getQuery, props.queryParams);
      } : void 0,
      paramsWrapper: props.forceProxy || !SUPPORTS_PROXY ? (buildParams, branches) => {
        return createMemoWithoutProxy(
          buildParams,
          collectDynamicParams(branches())
        );
      } : void 0
    }
  })(props);
}
const SUPPORTS_PROXY = typeof Proxy === "function";
function createMemoWithoutProxy(fn, allKeys) {
  const map = /* @__PURE__ */ new Map();
  const owner = getOwner();
  const target = {};
  const handler = (property) => {
    if (!map.has(property)) {
      runWithOwner(
        owner,
        () => map.set(
          property,
          createMemo(() => fn()[property])
        )
      );
    }
    return map.get(property)();
  };
  const keys = allKeys ? allKeys : Object.keys(fn());
  keys.forEach((key2) => {
    Object.defineProperty(target, key2, {
      get: () => handler(key2),
      enumerable: true,
      configurable: true
    });
  });
  return target;
}
const collectDynamicParams = (branches) => {
  const dynamicParams = [];
  branches.forEach((branch) => {
    branch.routes.forEach((route) => {
      if (route.pattern) {
        const matches = route.pattern.match(/:(\w+)/g);
        if (matches) {
          matches.forEach((param) => {
            const p = param.slice(1);
            if (!dynamicParams.includes(p)) dynamicParams.push(p);
          });
        }
      }
    });
  });
  return dynamicParams;
};
function onGridFocus(onSelectedChanged) {
  return function() {
    if (!this || this.children.length === 0) return false;
    this.selected = this.selected || 0;
    let child = this.selected ? this.children[this.selected] : this.selectedNode;
    while (child == null ? void 0 : child.skipFocus) {
      this.selected++;
      child = this.children[this.selected];
    }
    if (!(child instanceof ElementNode)) return false;
    child.setFocus();
    if (onSelectedChanged) {
      const grid = this;
      onSelectedChanged.call(grid, grid.selected, grid, child);
    }
    return true;
  };
}
function handleNavigation(direction) {
  return function() {
    var _a2, _b, _c;
    const numChildren = this.children.length;
    const wrap = this.wrap;
    const lastSelected = this.selected || 0;
    if (numChildren === 0) {
      return false;
    }
    if (direction === "right" || direction === "down") {
      do {
        this.selected = (this.selected || 0) % numChildren + 1;
        if (this.selected >= numChildren) {
          if (!wrap) {
            this.selected = -1;
            break;
          }
          this.selected = 0;
        }
      } while ((_a2 = this.children[this.selected]) == null ? void 0 : _a2.skipFocus);
    } else if (direction === "left" || direction === "up") {
      do {
        this.selected = (this.selected || 0) % numChildren - 1;
        if (this.selected < 0) {
          if (!wrap) {
            this.selected = -1;
            break;
          }
          this.selected = numChildren - 1;
        }
      } while ((_b = this.children[this.selected]) == null ? void 0 : _b.skipFocus);
    }
    if (this.selected === -1) {
      this.selected = lastSelected;
      if ((_c = this.children[this.selected]) == null ? void 0 : _c.states.has(
        Config.focusStateKey || "$focus"
      )) {
        return false;
      }
    }
    const active = this.children[this.selected || 0];
    const navigableThis = this;
    navigableThis.onSelectedChanged && navigableThis.onSelectedChanged.call(
      navigableThis,
      navigableThis.selected,
      navigableThis,
      active,
      lastSelected
    );
    if (this.plinko) {
      const lastSelectedChild = this.children[lastSelected];
      const num = lastSelectedChild.selected || 0;
      active.selected = num < active.children.length ? num : active.children.length - 1;
    }
    active.setFocus();
    return true;
  };
}
const InViewPort = 8;
const isNotShown = (node) => {
  return node.lng.renderState !== InViewPort;
};
function withScrolling(isRow) {
  const dimension = isRow ? "width" : "height";
  const axis = isRow ? "x" : "y";
  return (selected, component, selectedElement, lastSelected) => {
    var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j;
    let componentRef = component;
    if (typeof selected !== "number") {
      componentRef = selected;
      selected = componentRef.selected || 0;
    }
    if (!componentRef || componentRef.scroll === "none" || !componentRef.children.length)
      return;
    const lng = componentRef.lng;
    const screenSize2 = isRow ? lng.stage.root.width : lng.stage.root.height;
    const isIncrementing = lastSelected === void 0 || lastSelected - 1 !== selected;
    if (componentRef._screenOffset === void 0) {
      if (componentRef.parent.clipping) {
        const p = componentRef.parent;
        componentRef.endOffset = screenSize2 - ((isRow ? p.absX : p.absY) || 0) - p[dimension];
      }
      componentRef._screenOffset = (_a2 = componentRef.offset) != null ? _a2 : (isRow ? lng.absX : lng.absY) - componentRef[axis];
    }
    const screenOffset = componentRef._screenOffset;
    const gap = componentRef.gap || 0;
    const scroll2 = componentRef.scroll || "auto";
    const targetPosition = (_b = componentRef._targetPosition) != null ? _b : componentRef[axis];
    const rootPosition = isIncrementing ? Math.min(targetPosition, componentRef[axis]) : Math.max(targetPosition, componentRef[axis]);
    componentRef.offset = (_c = componentRef.offset) != null ? _c : rootPosition;
    const offset = componentRef.offset;
    selectedElement = selectedElement || componentRef.children[selected];
    if (!selectedElement) {
      return;
    }
    const selectedPosition = (_d = selectedElement[axis]) != null ? _d : 0;
    const selectedSize = (_e = selectedElement[dimension]) != null ? _e : 0;
    const selectedScale = (_i = (_h = selectedElement.scale) != null ? _h : (_g = (_f = selectedElement.style) == null ? void 0 : _f.focus) == null ? void 0 : _g.scale) != null ? _i : 1;
    const selectedSizeScaled = selectedSize * selectedScale;
    const containerSize = (_j = componentRef[dimension]) != null ? _j : 0;
    const maxOffset = Math.min(
      screenSize2 - containerSize - screenOffset - (componentRef.endOffset || 2 * gap),
      offset
    );
    const nextIndex = isIncrementing ? selected + 1 : selected - 1;
    const nextElement = componentRef.children[nextIndex] || null;
    let nextPosition = rootPosition;
    if (selectedElement.centerScroll) {
      nextPosition = -selectedPosition + (screenSize2 - selectedSizeScaled) / 2;
    } else if (scroll2 === "always") {
      nextPosition = -selectedPosition + offset;
    } else if (scroll2 === "center") {
      const centerPosition = -selectedPosition + (screenSize2 - selectedSizeScaled) / 2 - screenOffset;
      nextPosition = Math.min(Math.max(centerPosition, maxOffset), offset);
    } else if (!nextElement) {
      nextPosition = isIncrementing ? maxOffset : offset;
    } else if (scroll2 === "auto") {
      if (componentRef.scrollIndex && componentRef.scrollIndex > 0) {
        const totalItems = componentRef.children.length;
        const nearEndIndex = totalItems - componentRef.scrollIndex;
        if (isIncrementing && componentRef.selected >= componentRef.scrollIndex) {
          nextPosition = rootPosition - selectedSize - gap;
        } else if (!isIncrementing && componentRef.selected < nearEndIndex) {
          nextPosition = rootPosition + selectedSize + gap;
        }
      } else if (isIncrementing) {
        nextPosition = -selectedPosition + offset;
      } else {
        nextPosition = rootPosition + selectedSize + gap;
      }
    } else if (isIncrementing && isNotShown(nextElement)) {
      nextPosition = rootPosition - selectedSize - gap;
    } else if (isNotShown(nextElement)) {
      nextPosition = -selectedPosition + offset;
    }
    nextPosition = isIncrementing && scroll2 !== "always" ? Math.max(nextPosition, maxOffset) : Math.min(nextPosition, offset);
    if (componentRef[axis] !== nextPosition) {
      componentRef[axis] = nextPosition;
      componentRef._targetPosition = nextPosition;
    }
  };
}
function chainFunctions(...args) {
  const onlyFunctions = args.filter((func) => typeof func === "function");
  if (onlyFunctions.length === 0) {
    return void 0;
  }
  if (onlyFunctions.length === 1) {
    return onlyFunctions[0];
  }
  return function(...innerArgs) {
    let result;
    for (const func of onlyFunctions) {
      result = func.apply(this, innerArgs);
      if (result === true) {
        return result;
      }
    }
    return result;
  };
}
const ColumnStyles = {
  display: "flex",
  flexDirection: "column",
  gap: 30,
  transition: {
    y: {
      duration: 250,
      easing: "ease-in-out"
    }
  }
};
const onUp = handleNavigation("up");
const onDown = handleNavigation("down");
const scroll$1 = withScrolling(false);
function scrollToIndex$1(index) {
  this.selected = index;
  scroll$1(index, this);
  this.setFocus();
}
const Column = (props) => {
  return createComponent(View, mergeProps(props, {
    onUp: chainFunctions(props.onUp, onUp),
    onDown: chainFunctions(props.onDown, onDown),
    get selected() {
      return props.selected || 0;
    },
    scrollToIndex: scrollToIndex$1,
    get forwardFocus() {
      return (
        /* once */
        onGridFocus(props.onSelectedChanged)
      );
    },
    onLayout: props.selected ? chainFunctions(props.onLayout, scroll$1) : props.onLayout,
    onSelectedChanged: chainFunctions(props.onSelectedChanged, props.scroll !== "none" ? scroll$1 : void 0),
    style: combineStyles(props.style, ColumnStyles)
  }));
};
const RowStyles = {
  display: "flex",
  gap: 30,
  transition: {
    x: {
      duration: 250,
      easing: "ease-in-out"
    }
  }
};
const onLeft = handleNavigation("left");
const onRight = handleNavigation("right");
const scroll = withScrolling(true);
function scrollToIndex(index) {
  this.selected = index;
  scroll(index, this);
  this.setFocus();
}
const Row = (props) => {
  return createComponent(View, mergeProps(props, {
    get selected() {
      return props.selected || 0;
    },
    onLeft: chainFunctions(props.onLeft, onLeft),
    onRight: chainFunctions(props.onRight, onRight),
    get forwardFocus() {
      return (
        /* once */
        onGridFocus(props.onSelectedChanged)
      );
    },
    scrollToIndex,
    onLayout: props.selected ? chainFunctions(props.onLayout, scroll) : props.onLayout,
    onSelectedChanged: chainFunctions(props.onSelectedChanged, props.scroll !== "none" ? scroll : void 0),
    style: combineStyles(props.style, RowStyles)
  }));
};
function createSpriteMap(src, subTextures) {
  const spriteMapTexture = renderer$2.createTexture("ImageTexture", {
    src
  });
  return subTextures.reduce((acc, t) => {
    const { x, y, width, height } = t;
    acc[t.name] = renderer$2.createTexture("SubTexture", {
      texture: spriteMapTexture,
      x,
      y,
      width,
      height
    });
    return acc;
  }, {});
}
const [globalBackground, setGlobalBackground] = createSignal("");
const theme = {
  name: "Base Lightning TV",
  alpha: {
    primary: 1,
    secondary: 0.7,
    tertiary: 0.1,
    inactive: 0.5,
    full: 1,
    none: 0,
    alpha1: 0.1,
    alpha2: 0.3,
    alpha3: 0.5,
    alpha4: 0.7,
    alpha5: 0.9,
    alpha6: 0.95
  },
  animation: {
    duration: {
      none: 0,
      xfast: 100,
      fast: 250,
      normal: 500,
      slow: 750,
      xslow: 900
    },
    delay: { none: 0, xfast: 10, fast: 25, normal: 50, slow: 75, xslow: 90 },
    expressive: {
      timingFunction: "cubic-bezier(0, 0, 1, 1)",
      delay: 0,
      duration: 0.25
    },
    expressiveEntrance: {
      timingFunction: "cubic-bezier(0, 0, 1, 1)",
      delay: 0,
      duration: 0.25
    },
    expressiveExit: {
      timingFunction: "cubic-bezier(0, 0, 1, 1)",
      delay: 0,
      duration: 0.25
    },
    standard: {
      timingFunction: "cubic-bezier(0, 0, 1, 1)",
      delay: 0,
      duration: 0.25
    },
    standardEntrance: {
      timingFunction: "cubic-bezier(0, 0, 1, 1)",
      delay: 0,
      duration: 0.25
    },
    standardExit: {
      timingFunction: "cubic-bezier(0, 0, 1, 1)",
      delay: 0,
      duration: 0.25
    },
    utility: {
      timingFunction: "cubic-bezier(0, 0, 1, 1)",
      delay: 0,
      duration: 0.25
    },
    utilityEntrance: {
      timingFunction: "cubic-bezier(0, 0, 1, 1)",
      delay: 0,
      duration: 0.25
    },
    utilityExit: {
      timingFunction: "cubic-bezier(0, 0, 1, 1)",
      delay: 0,
      duration: 0.25
    }
  },
  asset: {
    arrowLeft: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAGKADAAQAAAABAAAAGAAAAADiNXWtAAAAi0lEQVRIDWNgGAWjIfD//38JID5Fk5AAGqwKxPeA+D/VLQCaaQLEr0CGgwBVLQCa5wbEn0EGwwDVLAAaGA3Ev2AGw2iqWAA0rBiI/8EMRaYptgBoWDeygehsci1gIlcjWfqArqZdEMFcBLSEdpGMZAntkimSJbTLaEiW0K6oQLKEdoUdzJJRemiHAAD4n+yzPWCs7QAAAABJRU5ErkJggg==",
    arrowRight: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAGKADAAQAAAABAAAAGAAAAADiNXWtAAAAg0lEQVRIDWNgGAWjIYArBP7//38KiCVwyVMsDjQcBO4BsSrFhmEzAGw8hHgFpEywqaFIDMkCEPMzELtRZCC6ZjQLQNxfQByNro5sPhYLQEL/gLiYbEORNeKwACbcDVPLBGMMOhrmVDSapkFE00imaTKlaUajaVFB28Ju0CXrUQfhDAEAEgHss6NhpLQAAAAASUVORK5CYII=",
    backspaceOutline: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAACQCAYAAADnRuK4AAAAAXNSR0IArs4c6QAACmpJREFUeF7tnVmoZUcVhv/feY4gBEVEH/KgCCZxCK2itNo4xQQH+kUN0TjEiDGKKBqnaExwBjUaR6KY+NQgiQkOMSYhYEScIopGJOqDE2hHjfP0y4p1Oqdv33v2qr32Prv2Paug6Ye7Vu2qv75TtWvtGohMqUBAAQZ80zUVQAKUEIQUSIBC8qVzApQMhBRIgELypXMClAyEFEiAQvKlcwKUDIQUSIBC8qVzApQMhBRIgELypXMClAyEFEiAQvKlcwKUDIQUSIBC8qVzApQMhBRIgELypXMClAyEFEiAQvKlcwKUDIQUSIBC8qVzApQMhBRIgELypXMClAyEFEiAQvKlcwKUDIQUSIBC8qVzApQMhBRIgELypfPsAJJ0NYC92XRHKPB3AAfLv18BuBLAFSR/NKZWswJI0vkA3jCmILsw75sAvIfkR8eo22wAknQSgMvGEGFD8vwxgFeQvGrI+s4CIEnHAPgugHsMWfkNzevDAM4i+Z8h6t88QJLuXOB5yBAVzjxuVeBaAM8ieXNUjzkAdAmA50Yrmv5HKPATACeQ/GNEm6YBkvRyANblZhpHAXsfekpkOGsWIEmPAHA9gDuOo13mWhS4gOSZfdVoEiBJ9wFwA4D7961Y+lUpsK/v7KxVgL4K4ElOCS4l+Uyn7a41k3Q0gMcC2ANgH4CHV1T2OyStx69OzQEk6TwAZztr8lMAx5P8s9N+Y8wk2cTjfQDu66z080h+zml7yKwpgCSdCOByZyX+BuBRJH/otN84M0kWN/s0gOc4Kv8Nko922B1m0gxAkh4I4AcVwcL9JA/UVnjT7CXdHYD9yEzfVUkAjib5uxqNmgCoBAu/CeBhzsJ/kORZTtuNN5Nk70bXAZ0Hy59G8qIawVoB6LMAnu8suE3tH0/y3077NAMg6esAuoaoC0la7M2dJgdI0ssAXOgs8W8BHEvS/s9UoYCkdwN4bYfL5STto7U7TQpQZbDQehzreawHylSpgKSTAVza4XYDyeNqsp4MoB7BwteQfH9N5dL2NgWK3l0vyAdJWhDXnSYBSNLtANh3GO/KwgMk97trlYbbKiDJPpzea5U8JKuYqDIeql0kvQPAG5352ZLMR5L8q9M+zXZQYFcAJOnJAL7sbGWLMFuk2SLOmYIKzB6gEiz8HoB7O7U4meQXnLZp1qGApD8BuOcsh7AewcL3kuyadg4OjSSbhRxH0j4BjJok2Ufga0j+YdQHlcznDlBNsPAa+xpP8r/rEHbxjAKPbRuyHvKFY0Ik6QUALOprPfIT1gHRbAGSdDoA77aSX5Zg4e8nhGfx6FEgWoJn8Zy1QCTplq5vjc3NwnoEC/eQ/HYD8IwC0TbwrA2i2QHUI1h4JskLGoJnUIhWwLMWiGYFkCSLMX2t5WDhlneeLm5Dw5kDntEhkmRhEVvesWNqZgiTdC6AN3W1Svn72oOFkuxF+WcVIQUrai+IKuA5BBHJ453auc1mA1AJFn7Jsf7EKj9ZsLBHw1ZDtI5neAmaBUBzCxaO2cBj5u2FZtlO0l8A3K3ZIaxHsPB8kt5vYn00c/mM0dBj5OmqzAqjOQDUfLBwJ32HbPAh84pCM5seSNJLAHzcWeFJgoVdZRui4YfIo6ucff8uyVY03LW5IawyWPgvW5u77mChV/QIABFfb/kidk0CVKbDth3Huw35dJLeniqiV2/fniDYx1f7vlWTeoUFah6wZQhrqwcqwUKbrtsaH0+6mOQpHsOpbXpCVFPstcJjBZNkmzHv0swQJultAN7iVO375TyafzjtJzcbEaK1w9McQJXBQlvvYmtsfjE5FZUFGAGiSeBpCqDKYKFtmX0qya9Utl0z5gNCNBk8BSA7CtiODNwxjf4trEew8BySNtTNOg0A0aTwtARQTbDQeh3rfawXmn0KQDQ5PC0B9EkAL3LSkAD9X6hWALIJzJ3mNoSdS9I7U3NyuX6zQO+zKOzkEEmaHqDSFdpZM97tOfkSfRvvk0LUDEAFIgseetf85DS+AYgk/bPr1NvRZ2HLg4ektwI4xzmgZCBxYohaBMjWPeenDOcvaIvZ2oez5gAqQ5mtLbb3oa4z+Bb6nTHW1UP92vFIr54vzJ8BcGplGdYKkSRbCXGHSWdh2z1ckp1taGccroxyFt9cznG4iGuDqFmASk9kZxxakNGTckHZBBA1DVCB6BMAXuwhyA4VmGL/+05l6zlsbdt7DJmXU0uXmSQ7JvD2zQ1hiwJJsotRvlVxXO87SU5+heUYDT5Gni5KVhg1D1DphWqCjOYy6RlAYzb0mHn3gWkWABWIaoKMubHwSBpGebGWZNdc2vmUO6a1BhJXFUSSff/yLuOYamvzzwEcVfFr7tWwPXqi6uN2PXWYG0C1Qca1n8RaDlewl3kPRL3gWXo/XBwo1dXWdk/a3jEOnJoVQGUoqw0yvpLkh7oUHvLvTohC8FRANBo8pT3sxLeVJ/M2M4QtiVYTZJzkNPoOiAaBxwHRqPDMFqBS8Jog4yT3YewA0aDwrIBodHhmDVApvG0mtO3PnjTJjTxbIBoFnm0gWgs8pQ06lxY3N4QtCWZBRgPDezdnHvPr+alV2EiaL0DlF2Dbn20bdB40XtHwQ5nOHqAC0SyCjEM1Wkv57AqACkRvBvB2p7hrDzI6yzU7s90EUPNBxtnR4SjwrgGo9EK1Qca8cM4ByU4mkuz++F93ZHELyZX3iW31n+S+sKWZWfNBxkCbNeUq6ekArugo1I0kH1xT8EkBKj1R80HGGkFbtZVkZ3bb2d2r0tUkn1hTh8kBKhB9DMBLnQWfJMjoLFuTZpJsO/ONAB7UUcBLSHqvX781q1YAqg0yfoDkq5psrQYLJeldAF7nKFr1x+wmACq9kAUZLazvvTV4P8kDDlE22kTSQ4uuK9dCF5HuR/I3NYI1A1CBaB+AK50VsAMj7TJeixNl2kYBSccCsB/ZMQ6Brif5GIfdYSZNAVQg8rzsLSphl/Hapby2LDZTUaBcq/56ALb1fOVxLkuinULy4loRmwOoQGQX7T7DWZnPk3y203bXmkl6AIA91isDOBGADV3e1HsJbasA1QYZvUKl3fYKPI2knXFQnZoEqPRCNUHG6oqnwyEFLiJ5Wl89mgWoQFQTZOyrwSb7WUztcSRtu0+v1DRABaKPADijV+3SaZUCNgE5geTNEZnmAFBtkDGix6b4Xld2BNvJcaHUPEClF6oNMoZE2eXOtm3q1ZFha1mfWQBUINoL4Kqurbm7vPEj1bOAqx3udW0kk62+swGoQHQ2gPOGFGAD8roJgF0t+qkx6jorgApElwE4aQwxZp6n3YNxsPyzA7yst/4iSdvEMFqaHUCjKZEZ91IgAeolWzotFEiAkoWQAglQSL50ToCSgZACCVBIvnROgJKBkAIJUEi+dE6AkoGQAglQSL50ToCSgZACCVBIvnROgJKBkAIJUEi+dE6AkoGQAglQSL50ToCSgZACCVBIvnROgJKBkAIJUEi+dE6AkoGQAglQSL50ToCSgZACCVBIvnROgJKBkAIJUEi+dE6AkoGQAglQSL50ToCSgZACCVBIvnT+H0jPT81J3xWWAAAAAElFTkSuQmCC",
    check: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAOCAYAAAAi2ky3AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACtSURBVHgBvdPdDcIgEAfwoy8Nb45QN3AGF2s36Ahu4gpuIDoBfSgfpdoTlCbEWEMh6T8hFzjyg5AAkBHOcQe5UWqspRx435sDpMYj6IYQwwVSEiJ2MKVUBWuzLSLl2HL+uxmNCGFO8yaL7RHxve6qRZoAuS4hxac8735elWVx7jrtMKL1o0Gcat9jhExHSukN/kUIFZ7MpDRtzE1isDRkAUtDvrA8ZI597FUf8gWH9P0b4gko9wAAAABJRU5ErkJggg=="
  },
  color: {
    palette: {},
    white: "0xffffffff",
    black: "0x000000ff",
    grey: "0x929096ff",
    red: "0xe74c3cff",
    orange: "0xdc7633ff",
    yellow: "0xf7dc6fff",
    green: "0x2ecc71ff",
    blue: "0x93a9fdff",
    purple: "0x663399ff",
    overlay: "0x181819b3",
    material: "0x181819ff",
    materialNeutral: "0x181819ff",
    materialNeutralElevated: "0x373639ff",
    materialInverse: "0xf8f7faff",
    materialInverseElevated: "0xffffffff",
    materialBrand: "0x000033ff",
    materialBrandElevated: "0x242a65ff",
    textNeutral: "0xf8f7faff",
    textNeutralSecondary: "0xf8f7fab3",
    textNeutralTertiary: "0xf8f7fa1a",
    textNeutralDisabled: "0xf8f7fa80",
    textInverse: "0x181819ff",
    textInverseSecondary: "0x181819b3",
    textInverseTertiary: "0x1818191a",
    textInverseDisabled: "0x18181980",
    textBrand: "0x93a9fdff",
    textBrandSecondary: "0x93a9fdb3",
    textBrandTertiary: "0x93a9fd1a",
    textBrandDisabled: "0x93a9fd80",
    textPositive: "0x2ecc71ff",
    textNegative: "0xe74c3cff",
    textInfo: "0x93a9fdff",
    textCaution: "0xdc7633ff",
    fillTransparent: "0xffffff0",
    fillNeutral: "0xf8f7faff",
    fillNeutralSecondary: "0xf8f7fab3",
    fillNeutralTertiary: "0xf8f7fa1a",
    fillNeutralDisabled: "0xf8f7fa80",
    fillInverse: "0x181819ff",
    fillInverseSecondary: "0x181819b3",
    fillInverseTertiary: "0x1818191a",
    fillInverseDisabled: "0x18181980",
    fillBrand: "0x93a9fdff",
    fillBrandSecondary: "0x93a9fdb3",
    fillBrandTertiary: "0x93a9fd1a",
    fillBrandDisabled: "0x93a9fd80",
    fillPositive: "0x2ecc71ff",
    fillNegative: "0xe74c3cff",
    fillInfo: "0x93a9fdff",
    fillCaution: "0xdc7633ff",
    strokeNeutral: "0xf8f7faff",
    strokeNeutralSecondary: "0xf8f7fab3",
    strokeNeutralTertiary: "0xf8f7fa1a",
    strokeNeutralDisabled: "0xf8f7fa80",
    strokeInverse: "0x181819ff",
    strokeInverseSecondary: "0x181819b3",
    strokeInverseTertiary: "0x1818191a",
    strokeInverseDisabled: "0x18181980",
    strokeBrand: "0x93a9fdff",
    strokeBrandSecondary: "0x93a9fdb3",
    strokeBrandTertiary: "0x93a9fd1a",
    strokeBrandDisabled: "0x93a9fd80",
    strokePositive: "0x2ecc71ff",
    strokeNegative: "0xe74c3cff",
    strokeInfo: "0x93a9fdff",
    strokeCaution: "0xdc7633ff",
    interactiveNeutral: "0xffffff1a",
    interactiveNeutralFocus: "0xffffffff",
    interactiveNeutralFocusSoft: "0xffffff1a",
    interactiveInverse: "0x48474b1a",
    interactiveInverseFocus: "0x48474bff",
    interactiveInverseFocusSoft: "0x48474b1a",
    interactiveBrand: "0xbecffe1a",
    interactiveBrandFocus: "0xbecffeff",
    interactiveBrandFocusSoft: "0xbecffe1a",
    shadowNeutral: "0x000000b3",
    shadowNeutralFocus: "0x000000b3",
    shadowNeutralFocusSoft: "0x000000b3",
    shadowNeutralText: "0x000000ff",
    shadowInverse: "0x000000b3",
    shadowInverseFocus: "0x000000b3",
    shadowInverseFocusSoft: "0x000000b3",
    shadowInverseText: "0x000000ff",
    shadowBrand: "0x000000b3",
    shadowBrandFocus: "0x000000b3",
    shadowBrandFocusSoft: "0x000000b3",
    shadowBrandText: "0x000000ff"
  },
  font: [],
  layout: {
    columnCount: 10,
    focusScale: 1.2,
    gutterX: 20,
    gutterY: 20,
    marginX: 150,
    marginY: 150,
    safe: 50,
    screenW: 1920,
    screenH: 1080
  },
  radius: { none: 0, xs: 2, sm: 4, md: 8, lg: 16, xl: 24 },
  spacer: {
    none: 0,
    xxs: 2,
    xs: 4,
    sm: 8,
    md: 10,
    lg: 20,
    xl: 30,
    xxl: 40,
    xxxl: 50
  },
  stroke: { none: 0, sm: 2, md: 4, lg: 6, xl: 8 },
  typography: {
    display1: {
      fontFamily: "Arial",
      fontSize: 75,
      lineHeight: 85,
      fontWeight: 500,
      verticalAlign: "middle",
      textBaseline: "bottom"
    },
    display2: {
      fontFamily: "Arial",
      fontSize: 50,
      lineHeight: 60,
      fontWeight: 500,
      verticalAlign: "middle",
      textBaseline: "bottom"
    },
    display3: {
      fontFamily: "Arial",
      fontSize: 56,
      fontWeight: 400,
      lineHeight: 68,
      verticalAlign: "middle",
      textBaseline: "bottom"
    },
    display4: {
      fontFamily: "Arial",
      fontSize: 48,
      fontWeight: 400,
      lineHeight: 64,
      verticalAlign: "middle",
      textBaseline: "bottom"
    },
    headline1: {
      fontFamily: "Arial",
      fontSize: 35,
      fontWeight: 500,
      lineHeight: 48,
      verticalAlign: "middle",
      textBaseline: "bottom"
    },
    headline2: {
      fontFamily: "Arial",
      fontSize: 30,
      fontWeight: 500,
      lineHeight: 40,
      verticalAlign: "middle",
      textBaseline: "bottom"
    },
    headline3: {
      fontFamily: "Arial",
      fontSize: 25,
      fontWeight: 500,
      lineHeight: 36,
      verticalAlign: "middle",
      textBaseline: "bottom"
    },
    body1: {
      fontFamily: "Arial",
      fontSize: 25,
      fontWeight: 300,
      lineHeight: 40,
      verticalAlign: "middle",
      textBaseline: "bottom"
    },
    body2: {
      fontFamily: "Arial",
      fontSize: 22,
      fontWeight: 300,
      lineHeight: 32,
      verticalAlign: "middle",
      textBaseline: "bottom"
    },
    body3: {
      fontFamily: "Arial",
      fontSize: 20,
      fontWeight: 300,
      lineHeight: 32,
      verticalAlign: "middle",
      textBaseline: "bottom"
    },
    button1: {
      fontFamily: "Arial",
      fontSize: 25,
      fontWeight: 500,
      lineHeight: 32,
      verticalAlign: "middle",
      textBaseline: "bottom"
    },
    button2: {
      fontFamily: "Arial",
      fontSize: 20,
      fontWeight: 500,
      lineHeight: 32,
      verticalAlign: "middle",
      textBaseline: "bottom"
    },
    callout1: {
      fontFamily: "Arial",
      fontSize: 20,
      fontWeight: 500,
      lineHeight: 32,
      verticalAlign: "middle",
      textBaseline: "bottom"
    },
    caption1: {
      fontFamily: "Arial",
      fontSize: 15,
      fontWeight: 500,
      lineHeight: 24,
      verticalAlign: "middle",
      textBaseline: "bottom"
    },
    tag1: {
      fontFamily: "Arial",
      fontSize: 20,
      fontWeight: 500,
      lineHeight: 24,
      verticalAlign: "middle",
      textBaseline: "bottom"
    },
    footnote1: {
      fontFamily: "Arial",
      fontSize: 22,
      fontWeight: 300,
      lineHeight: 30,
      verticalAlign: "middle",
      textBaseline: "bottom"
    },
    subtitle1: {
      fontFamily: "Arial",
      fontSize: 32,
      fontWeight: 400,
      lineHeight: 36,
      verticalAlign: "middle",
      textBaseline: "bottom"
    },
    subtitle2: {
      fontFamily: "Arial",
      fontSize: 28,
      fontWeight: 500,
      lineHeight: 32,
      verticalAlign: "middle",
      textBaseline: "bottom"
    },
    navigation: {
      fontFamily: "Arial",
      fontSize: 28,
      fontWeight: 400,
      lineHeight: 32,
      verticalAlign: "middle",
      textBaseline: "bottom"
    }
  },
  componentConfig: {
    Keyboard: {
      base: {
        keyProps: {
          delete: {
            title: null,
            icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAACQCAYAAADnRuK4AAAAAXNSR0IArs4c6QAACmpJREFUeF7tnVmoZUcVhv/feY4gBEVEH/KgCCZxCK2itNo4xQQH+kUN0TjEiDGKKBqnaExwBjUaR6KY+NQgiQkOMSYhYEScIopGJOqDE2hHjfP0y4p1Oqdv33v2qr32Prv2Paug6Ye7Vu2qv75TtWvtGohMqUBAAQZ80zUVQAKUEIQUSIBC8qVzApQMhBRIgELypXMClAyEFEiAQvKlcwKUDIQUSIBC8qVzApQMhBRIgELypXMClAyEFEiAQvKlcwKUDIQUSIBC8qVzApQMhBRIgELypXMClAyEFEiAQvKlcwKUDIQUSIBC8qVzApQMhBRIgELypXMClAyEFEiAQvKlcwKUDIQUSIBC8qVzApQMhBRIgELypfPsAJJ0NYC92XRHKPB3AAfLv18BuBLAFSR/NKZWswJI0vkA3jCmILsw75sAvIfkR8eo22wAknQSgMvGEGFD8vwxgFeQvGrI+s4CIEnHAPgugHsMWfkNzevDAM4i+Z8h6t88QJLuXOB5yBAVzjxuVeBaAM8ieXNUjzkAdAmA50Yrmv5HKPATACeQ/GNEm6YBkvRyANblZhpHAXsfekpkOGsWIEmPAHA9gDuOo13mWhS4gOSZfdVoEiBJ9wFwA4D7961Y+lUpsK/v7KxVgL4K4ElOCS4l+Uyn7a41k3Q0gMcC2ANgH4CHV1T2OyStx69OzQEk6TwAZztr8lMAx5P8s9N+Y8wk2cTjfQDu66z080h+zml7yKwpgCSdCOByZyX+BuBRJH/otN84M0kWN/s0gOc4Kv8Nko922B1m0gxAkh4I4AcVwcL9JA/UVnjT7CXdHYD9yEzfVUkAjib5uxqNmgCoBAu/CeBhzsJ/kORZTtuNN5Nk70bXAZ0Hy59G8qIawVoB6LMAnu8suE3tH0/y3077NAMg6esAuoaoC0la7M2dJgdI0ssAXOgs8W8BHEvS/s9UoYCkdwN4bYfL5STto7U7TQpQZbDQehzreawHylSpgKSTAVza4XYDyeNqsp4MoB7BwteQfH9N5dL2NgWK3l0vyAdJWhDXnSYBSNLtANh3GO/KwgMk97trlYbbKiDJPpzea5U8JKuYqDIeql0kvQPAG5352ZLMR5L8q9M+zXZQYFcAJOnJAL7sbGWLMFuk2SLOmYIKzB6gEiz8HoB7O7U4meQXnLZp1qGApD8BuOcsh7AewcL3kuyadg4OjSSbhRxH0j4BjJok2Ufga0j+YdQHlcznDlBNsPAa+xpP8r/rEHbxjAKPbRuyHvKFY0Ik6QUALOprPfIT1gHRbAGSdDoA77aSX5Zg4e8nhGfx6FEgWoJn8Zy1QCTplq5vjc3NwnoEC/eQ/HYD8IwC0TbwrA2i2QHUI1h4JskLGoJnUIhWwLMWiGYFkCSLMX2t5WDhlneeLm5Dw5kDntEhkmRhEVvesWNqZgiTdC6AN3W1Svn72oOFkuxF+WcVIQUrai+IKuA5BBHJ453auc1mA1AJFn7Jsf7EKj9ZsLBHw1ZDtI5neAmaBUBzCxaO2cBj5u2FZtlO0l8A3K3ZIaxHsPB8kt5vYn00c/mM0dBj5OmqzAqjOQDUfLBwJ32HbPAh84pCM5seSNJLAHzcWeFJgoVdZRui4YfIo6ucff8uyVY03LW5IawyWPgvW5u77mChV/QIABFfb/kidk0CVKbDth3Huw35dJLeniqiV2/fniDYx1f7vlWTeoUFah6wZQhrqwcqwUKbrtsaH0+6mOQpHsOpbXpCVFPstcJjBZNkmzHv0swQJultAN7iVO375TyafzjtJzcbEaK1w9McQJXBQlvvYmtsfjE5FZUFGAGiSeBpCqDKYKFtmX0qya9Utl0z5gNCNBk8BSA7CtiODNwxjf4trEew8BySNtTNOg0A0aTwtARQTbDQeh3rfawXmn0KQDQ5PC0B9EkAL3LSkAD9X6hWALIJzJ3mNoSdS9I7U3NyuX6zQO+zKOzkEEmaHqDSFdpZM97tOfkSfRvvk0LUDEAFIgseetf85DS+AYgk/bPr1NvRZ2HLg4ektwI4xzmgZCBxYohaBMjWPeenDOcvaIvZ2oez5gAqQ5mtLbb3oa4z+Bb6nTHW1UP92vFIr54vzJ8BcGplGdYKkSRbCXGHSWdh2z1ckp1taGccroxyFt9cznG4iGuDqFmASk9kZxxakNGTckHZBBA1DVCB6BMAXuwhyA4VmGL/+05l6zlsbdt7DJmXU0uXmSQ7JvD2zQ1hiwJJsotRvlVxXO87SU5+heUYDT5Gni5KVhg1D1DphWqCjOYy6RlAYzb0mHn3gWkWABWIaoKMubHwSBpGebGWZNdc2vmUO6a1BhJXFUSSff/yLuOYamvzzwEcVfFr7tWwPXqi6uN2PXWYG0C1Qca1n8RaDlewl3kPRL3gWXo/XBwo1dXWdk/a3jEOnJoVQGUoqw0yvpLkh7oUHvLvTohC8FRANBo8pT3sxLeVJ/M2M4QtiVYTZJzkNPoOiAaBxwHRqPDMFqBS8Jog4yT3YewA0aDwrIBodHhmDVApvG0mtO3PnjTJjTxbIBoFnm0gWgs8pQ06lxY3N4QtCWZBRgPDezdnHvPr+alV2EiaL0DlF2Dbn20bdB40XtHwQ5nOHqAC0SyCjEM1Wkv57AqACkRvBvB2p7hrDzI6yzU7s90EUPNBxtnR4SjwrgGo9EK1Qca8cM4ByU4mkuz++F93ZHELyZX3iW31n+S+sKWZWfNBxkCbNeUq6ekArugo1I0kH1xT8EkBKj1R80HGGkFbtZVkZ3bb2d2r0tUkn1hTh8kBKhB9DMBLnQWfJMjoLFuTZpJsO/ONAB7UUcBLSHqvX781q1YAqg0yfoDkq5psrQYLJeldAF7nKFr1x+wmACq9kAUZLazvvTV4P8kDDlE22kTSQ4uuK9dCF5HuR/I3NYI1A1CBaB+AK50VsAMj7TJeixNl2kYBSccCsB/ZMQ6Brif5GIfdYSZNAVQg8rzsLSphl/Hapby2LDZTUaBcq/56ALb1fOVxLkuinULy4loRmwOoQGQX7T7DWZnPk3y203bXmkl6AIA91isDOBGADV3e1HsJbasA1QYZvUKl3fYKPI2knXFQnZoEqPRCNUHG6oqnwyEFLiJ5Wl89mgWoQFQTZOyrwSb7WUztcSRtu0+v1DRABaKPADijV+3SaZUCNgE5geTNEZnmAFBtkDGix6b4Xld2BNvJcaHUPEClF6oNMoZE2eXOtm3q1ZFha1mfWQBUINoL4Kqurbm7vPEj1bOAqx3udW0kk62+swGoQHQ2gPOGFGAD8roJgF0t+qkx6jorgApElwE4aQwxZp6n3YNxsPyzA7yst/4iSdvEMFqaHUCjKZEZ91IgAeolWzotFEiAkoWQAglQSL50ToCSgZACCVBIvnROgJKBkAIJUEi+dE6AkoGQAglQSL50ToCSgZACCVBIvnROgJKBkAIJUEi+dE6AkoGQAglQSL50ToCSgZACCVBIvnROgJKBkAIJUEi+dE6AkoGQAglQSL50ToCSgZACCVBIvnROgJKBkAIJUEi+dE6AkoGQAglQSL50ToCSgZACCVBIvnT+H0jPT81J3xWWAAAAAElFTkSuQmCC"
          }
        }
      }
    }
  }
};
function Background() {
  const params2 = new URLSearchParams(window.location.search);
  const disableBG = params2.get("disableBG") === "true";
  let bg1, bg2, heroMask;
  let active = 0;
  const alpha = 1;
  const animationSettings = {
    duration: 550,
    easing: "ease-in-out"
  };
  const bgStyles = {
    alpha,
    color: 4294967295
  };
  onMount(() => {
    if (disableBG) {
      heroMask.src = "";
      heroMask.colorLeft = 255;
      heroMask.colorRight = 0;
      return;
    }
  });
  function changeBackgrounds(img) {
    if (disableBG) {
      heroMask.src = "";
      heroMask.colorLeft = 255;
      heroMask.colorRight = 0;
      return;
    }
    if (typeof img !== "string") {
      bg1.color = img;
      bg1.src = "";
      bg1.alpha = 1;
      active = 1;
      bg2.alpha = 0;
      heroMask.alpha = 0;
      return;
    } else {
      bg1.color = 4294967295;
      heroMask.alpha = 1;
    }
    const currentBg = active === 1 ? bg2 : bg1;
    const nextBg = active === 1 ? bg1 : bg2;
    currentBg.src = img;
    if (active === 0) {
      currentBg.alpha = 1;
    } else {
      currentBg.alpha = 0.01;
      currentBg.animate({
        alpha: 1
      }, animationSettings).start();
    }
    nextBg.animate({
      alpha: 0.01
    }, animationSettings).start();
    active = active === 1 ? 2 : 1;
  }
  createEffect(on(globalBackground, (img) => {
    changeBackgrounds(img);
  }, {
    defer: true
  }));
  return createComponent(View, {
    width: 1920,
    height: 1080,
    zIndex: -5,
    get children() {
      return [createComponent(View, {
        ref(r$) {
          var _ref$ = bg1;
          typeof _ref$ === "function" ? _ref$(r$) : bg1 = r$;
        },
        style: bgStyles
      }), createComponent(View, {
        ref(r$) {
          var _ref$2 = bg2;
          typeof _ref$2 === "function" ? _ref$2(r$) : bg2 = r$;
        },
        style: bgStyles,
        alpha: 0
      }), createComponent(View, {
        ref(r$) {
          var _ref$3 = heroMask;
          typeof _ref$3 === "function" ? _ref$3(r$) : heroMask = r$;
        },
        src: "./assets/hero-mask-inverted.png",
        get color() {
          return hexColor(theme.color.materialBrand);
        },
        width: 1920,
        height: 1080
      })];
    }
  });
}
const styles$7 = {
  Column: {
    flexDirection: "column",
    display: "flex",
    width: 140,
    height: 600,
    y: 360,
    gap: 20,
    zIndex: 101,
    transition: {
      x: {
        duration: 250,
        easing: "ease-in-out"
      }
    },
    x: 8,
    $focus: {
      width: 500,
      x: theme.layout.marginX
    }
  },
  Gradient: {
    zIndex: 99,
    color: 255,
    src: "./assets/sidenav.png",
    alpha: 0,
    width: 200,
    height: 1080,
    $focus: {
      alpha: 1,
      width: 1600
    },
    transition: { alpha: true, width: true }
  },
  NavButton: {
    zIndex: 102,
    height: 70,
    width: 100,
    borderRadius: 8,
    color: 0,
    $focus: {
      color: 1111638783
    },
    $active: {
      width: 328,
      height: 70
    }
  }
};
const basePath$1 = "/solid-demo-app/";
const icons = [{
  name: "experiment",
  width: 81,
  height: 100,
  x: 0,
  y: 0
}, {
  name: "trending",
  width: 100,
  height: 56,
  x: 81,
  y: 0
}, {
  name: "tv",
  width: 100,
  height: 68,
  x: 181,
  y: 0
}, {
  name: "movie",
  width: 94,
  height: 100,
  x: 282,
  y: 0
}];
let sprite;
function Icon(props) {
  sprite = sprite || createSpriteMap(basePath$1 + "assets/icons_white.png", icons);
  return createComponent(View, mergeProps(props, {
    get texture() {
      return sprite[props.name];
    },
    get width() {
      return sprite[props.name].props.width;
    },
    get height() {
      return sprite[props.name].props.height;
    },
    get x() {
      return (100 - (sprite[props.name].props.width || 0)) / 2;
    },
    get y() {
      return (100 - (sprite[props.name].props.height || 0)) / 2;
    }
  }));
}
const NavButtonTextStyles = {
  fontSize: 38,
  x: 116,
  y: 18,
  height: 50,
  alpha: 0,
  $active: {
    alpha: 1
  }
};
function NavButton(props) {
  return createComponent(View, mergeProps(props, {
    forwardStates: true,
    get style() {
      return styles$7.NavButton;
    },
    get children() {
      return [createComponent(View, {
        y: -16,
        get children() {
          return createComponent(Icon, {
            scale: 0.5,
            get name() {
              return props.icon;
            }
          });
        }
      }), createComponent(Text$4, {
        style: NavButtonTextStyles,
        get children() {
          return props.children;
        }
      })];
    }
  }));
}
function NavDrawer(props) {
  let backdrop;
  const navigate = useNavigate();
  function onFocus() {
    backdrop.states.add("$focus");
    this.children.forEach((c) => c.states.add("$active"));
    this.children[this.selected || 0].setFocus();
  }
  function onBlur() {
    backdrop.states.remove("$focus");
    this.selected = 0;
    this.children.forEach((c) => c.states.remove("$active"));
  }
  function handleNavigate(page) {
    const isOnPage = useMatch(() => page);
    if (isOnPage()) {
      return props.focusPage();
    }
    navigate(page);
  }
  return [createComponent(View, {
    flexItem: false,
    width: 300,
    height: 150,
    x: 30,
    y: 15,
    zIndex: 105,
    get alpha() {
      return props.showWidgets ? 1 : 0.01;
    },
    get children() {
      return [createComponent(Text$4, {
        x: 80,
        fontSize: 28,
        color: 4143380036,
        children: "Built With:"
      }), createComponent(View, {
        y: 22,
        src: "./assets/solidWord.png",
        width: 280,
        height: 52
      }), createComponent(View, {
        x: 0,
        y: 110,
        src: "./assets/tmdb.png",
        width: 80,
        height: 41
      }), createComponent(Text$4, {
        x: 90,
        y: 110,
        contain: "width",
        width: 160,
        fontSize: 12,
        color: 4143380036,
        children: "This product uses the TMDB API but is not endorsed or certified by TMDB."
      })];
    }
  }), createComponent(Column, mergeProps(props, {
    onFocus,
    onBlur,
    get style() {
      return styles$7.Column;
    },
    scroll: "none",
    get children() {
      return [createComponent(NavButton, {
        onEnter: () => handleNavigate("/browse/all"),
        icon: "trending",
        children: "Trending"
      }), createComponent(NavButton, {
        icon: "movie",
        onEnter: () => handleNavigate("/browse/movie"),
        children: "Movies"
      }), createComponent(NavButton, {
        icon: "tv",
        onEnter: () => handleNavigate("/browse/tv"),
        children: "TV"
      }), createComponent(NavButton, {
        icon: "experiment",
        onEnter: () => handleNavigate("/examples"),
        children: "Examples"
      })];
    }
  })), createComponent(View, {
    skipFocus: true,
    ref(r$) {
      var _ref$ = backdrop;
      typeof _ref$ === "function" ? _ref$(r$) : backdrop = r$;
    },
    get style() {
      return styles$7.Gradient;
    }
  })];
}
function objectFromEntries(entries) {
  if (!entries || !entries[Symbol.iterator]) {
    throw new Error("objectFromEntries requires a single iterable argument");
  }
  const obj = {};
  for (const [key2, value] of entries) {
    obj[key2] = value;
  }
  return obj;
}
const defaultModeKeys = ["focus", "disabled"];
const defaultToneKeys = ["brand", "inverse", "neutral"];
function makeComponentStyles({ themeKeys, base, themeStyles: themeStyles2, modes = {}, tones = {}, modeKeys = defaultModeKeys, toneKeys = defaultToneKeys }, debug = false) {
  const makeToneStyles = (tones2, themeComponentStyles, modeStyles) => {
    const toneStyles = toneKeys.map((tone) => {
      var _a2, _b;
      const styles2 = {};
      const styleList = new Set(
        // eslint-disable-next-line prefer-spread
        [].concat.apply([], [(_a2 = tones2 == null ? void 0 : tones2[tone]) != null ? _a2 : {}, (_b = themeComponentStyles == null ? void 0 : themeComponentStyles[tone]) != null ? _b : {}].map(Object.keys))
      );
      styleList.forEach((styleKey) => {
        var _a3, _b2, _c;
        if (!modeKeys.includes(styleKey)) {
          styles2[styleKey] = (_c = (_a3 = themeComponentStyles == null ? void 0 : themeComponentStyles[tone]) == null ? void 0 : _a3[styleKey]) != null ? _c : (_b2 = tones2 == null ? void 0 : tones2[tone]) == null ? void 0 : _b2[styleKey];
        }
      });
      modeKeys.forEach((mode) => {
        var _a3, _b2;
        styles2[mode] = {
          ...modeStyles[mode],
          // fallbacks from base.mode
          ...(_a3 = tones2 == null ? void 0 : tones2[tone]) == null ? void 0 : _a3[mode],
          // component configured tone.mode
          ...(_b2 = themeComponentStyles == null ? void 0 : themeComponentStyles[tone]) == null ? void 0 : _b2[mode]
          // theme configure tone.mode
        };
      });
      return [tone, styles2];
    });
    return objectFromEntries(toneStyles);
  };
  const makeModeStyles = (modes2, themeComponentStyles) => {
    const modeStyles = modeKeys.map((mode) => {
      return [mode, { ...modes2 == null ? void 0 : modes2[mode], ...themeComponentStyles == null ? void 0 : themeComponentStyles[mode] }];
    });
    const modeObject = objectFromEntries(modeStyles);
    return modeObject;
  };
  const makeBaseStyles = (base2, themeComponentStyles) => {
    const baseStyles = {
      ...base2,
      ...themeComponentStyles.base
    };
    return baseStyles;
  };
  const mapThemeKeysToSolid = (stylesToMap) => objectFromEntries(Object.entries(themeKeys).filter(([_, themeKey]) => stylesToMap[themeKey]).map(([solidKey, themeKey]) => [solidKey, stylesToMap[themeKey]]));
  const convertComponentConfig = (themeStyles3) => {
    const convertedThemeStyles = objectFromEntries(
      // iterate through each variant
      Object.entries(themeStyles3).map(([variantName, styles2]) => {
        const convertedStyles = mapThemeKeysToSolid(styles2);
        Object.entries(styles2).filter(([styleName, _]) => modeKeys.includes(styleName)).forEach(([modeName, modeStyles]) => {
          convertedStyles[modeName] = mapThemeKeysToSolid(modeStyles);
        });
        return [variantName, convertedStyles];
      })
    );
    return convertedThemeStyles;
  };
  const generateSolidStylesFromLookupObject = (base2, modes2, tones2) => {
    const themeComponentStyles = convertComponentConfig(themeStyles2);
    debug && console.log(themeComponentStyles);
    const baseStyles = makeBaseStyles(base2, themeComponentStyles);
    debug && console.log(baseStyles);
    const modeStyles = makeModeStyles(modes2, themeComponentStyles);
    debug && console.log(modeStyles);
    const toneStyles = makeToneStyles(tones2, themeComponentStyles, modeStyles);
    debug && console.log(toneStyles);
    return {
      base: {
        ...baseStyles,
        ...modeStyles
      },
      tones: toneStyles
    };
  };
  return generateSolidStylesFromLookupObject(base, modes, tones);
}
function getWidthByUpCount(upCount = 1) {
  const screenW = theme.layout.screenW;
  const columnCount = theme.layout.columnCount;
  const marginX = theme.layout.marginX;
  const gutterX = theme.layout.gutterX;
  if (upCount < 1 || upCount > columnCount) {
    console.error("getWidthByUpCount expects an upCount between 1 & ".concat(columnCount, ", received ").concat(upCount, ". Defaulting to upCount 1."));
    upCount = 1;
  }
  const columnWidth = screenW - marginX * 2;
  const columnGapTotal = (upCount - 1) * gutterX;
  const totalColumnsWidth = columnWidth - columnGapTotal;
  return totalColumnsWidth / upCount;
}
const { Artwork: { defaultTone: defaultTone$e, ...themeStyles$e } = { themeStyles: {} } } = theme == null ? void 0 : theme.componentConfig;
const container$e = {
  themeKeys: {
    borderRadius: "radius",
    fallbackSrc: "fallbackSrc",
    fillColor: "fillColor",
    gradientColor: "gradientColor",
    pivotX: "imageScalePivotX",
    pivotY: "imageScalePivotY",
    scale: "imageScale"
  },
  base: {
    fallbackSrc: void 0,
    fillColor: theme.color.overlay,
    gradientColor: theme.color.material,
    pivotX: 0.5,
    pivotY: 0.5,
    scale: void 0,
    borderRadius: theme.radius.md
  },
  themeStyles: themeStyles$e
};
makeComponentStyles(container$e);
const { Badge: { defaultTone: defaultTone$d, ...themeStyles$d } = { themeStyles: {} } } = theme.componentConfig;
const container$d = {
  themeKeys: {
    color: "backgroundColor",
    borderRadius: "radius",
    gap: "contentSpacing"
  },
  base: {
    // TODO clew uses strokeColor, but we currently don't account for nested properties (border.color)
    // TODO clew uses strokeWidth, but we currently don't account for nested properties (border.width)
    color: theme.color.fillInverseSecondary,
    borderRadius: theme.radius.sm,
    // borderRadius must be applied _before_ border to prevent the node from breaking
    border: {
      color: theme.color.strokeInverse,
      width: theme.stroke.sm
    },
    gap: theme.spacer.xs,
    display: "flex",
    justifyContent: "flexStart",
    alignItems: "center"
  },
  tones: {
    inverse: {
      color: theme.color.fillNeutralSecondary,
      borderRadius: theme.radius.sm,
      border: {
        color: theme.color.strokeInverseSecondary,
        width: theme.stroke.sm
      }
    },
    brand: {
      color: theme.color.fillBrand,
      borderRadius: theme.radius.sm,
      border: {
        color: theme.color.strokeInverseSecondary,
        width: theme.stroke.sm
      }
    }
  },
  themeStyles: themeStyles$d
};
const text$5 = {
  themeKeys: {
    color: "textColor"
  },
  base: {
    ...theme.typography.tag1,
    color: theme.color.textNeutral,
    lineHeight: theme.typography.tag1.lineHeight + 12,
    marginRight: theme.spacer.md + theme.stroke.sm,
    marginLeft: theme.spacer.md + theme.stroke.sm
  },
  tones: {
    inverse: {
      color: theme.color.textInverse
    },
    brand: {
      color: theme.color.textNeutral
    }
  },
  themeStyles: themeStyles$d
};
const icon$1 = {
  themeKeys: {
    color: "iconColor"
  },
  base: {
    color: theme.color.textNeutral
  },
  tones: {
    inverse: {
      color: theme.color.textInverse
    },
    brand: {
      color: theme.color.textNeutral
    }
  },
  themeStyles: themeStyles$d
};
makeComponentStyles(container$d);
makeComponentStyles(icon$1);
makeComponentStyles(text$5);
const { Button: { defaultTone: defaultTone$c, ...buttonThemeStyles } = { buttonThemeStyles: {} } } = theme == null ? void 0 : theme.componentConfig;
const { Surface: { surfaceDefaultTone, ...surfaceThemeStyles } = { surfaceThemeStyles: {} } } = theme == null ? void 0 : theme.componentConfig;
const themeStyles$c = {
  ...buttonThemeStyles,
  ...surfaceThemeStyles
};
const container$c = {
  themeKeys: {
    borderRadius: "radius",
    color: "backgroundColor",
    justifyContent: "justify",
    itemSpacing: "contentSpacing"
  },
  base: {
    height: theme.typography.button1.lineHeight + theme.spacer.xl * 2,
    display: "flex",
    padding: [theme.spacer.xxxl, theme.spacer.xl],
    color: theme.color.interactiveNeutral,
    justifyContent: "center",
    alignItems: "center",
    flexBoundary: "fixed",
    borderRadius: theme.radius.sm,
    contentColor: theme.color.fillNeutral
  },
  modes: {
    focus: {
      color: theme.color.interactiveNeutralFocus,
      contentColor: theme.color.fillInverse
    },
    disabled: {
      color: theme.color.fillNeutralDisabled
    }
  },
  tones: {
    inverse: {
      color: theme.color.interactiveInverse
    },
    brand: {
      color: theme.color.interactiveBrand,
      focus: {
        color: theme.color.fillNeutral
      }
    }
  },
  themeStyles: themeStyles$c
};
const content = {
  themeKeys: {
    color: "contentColor"
  },
  base: {
    color: theme.color.textNeutral
  },
  modes: {
    focus: {
      color: theme.color.textInverse
    },
    disabled: {
      color: theme.color.textNeutralDisabled
    }
  },
  tones: {
    inverse: {
      color: theme.color.fillNeutral
    },
    brand: {
      color: theme.color.fillBrand,
      focus: {
        color: theme.color.fillBrand
      }
    }
  },
  themeStyles: themeStyles$c
};
const text$4 = {
  themeKeys: {
    color: "textColor"
  },
  base: {
    color: theme.color.textNeutral,
    ...theme.typography.button1,
    textAlign: "center",
    contain: "none"
  },
  modes: {
    focus: {
      color: theme.color.textInverse
    },
    disabled: {
      color: theme.color.textNeutralDisabled
    }
  },
  tones: {
    inverse: {
      color: theme.color.fillNeutral
    },
    brand: {
      color: theme.color.fillBrand,
      focus: {
        color: theme.color.fillBrand
      }
    }
  },
  themeStyles: themeStyles$c
};
const Container$5 = makeComponentStyles(container$c);
const Content = makeComponentStyles(content);
const Text$3 = makeComponentStyles(text$4);
const styles$6 = {
  tone: defaultTone$c || surfaceDefaultTone || "neutral",
  Container: Container$5,
  Content,
  Text: Text$3
};
const { Checkbox: { defaultTone: defaultTone$b, ...themeStyles$b } = { themeStyles: {} } } = theme == null ? void 0 : theme.componentConfig;
const container$b = {
  themeKeys: {
    color: "backgroundColor",
    borderRadius: "radius",
    border: "border",
    justifyContent: "justifyContent"
  },
  base: {
    width: theme.spacer.xxl,
    height: theme.spacer.xxl,
    display: "flex",
    justifyContent: "center",
    color: theme.color.fillNeutral,
    alignItems: "center",
    borderRadius: theme.spacer.xxl / 4,
    border: {
      color: theme.color.strokeInverse,
      width: theme.stroke.sm
    }
  },
  modes: {
    disabled: {
      alpha: theme.alpha.inactive
    }
  },
  tones: {
    brand: {
      borderRadius: theme.spacer.xxl / 4,
      border: {
        color: theme.color.strokeNeutralSecondary,
        width: theme.stroke.sm
      },
      color: theme.color.fillNeutralSecondary,
      checked: {
        borderRadius: theme.spacer.xxl / 4,
        border: {
          color: theme.color.strokeNeutralSecondary,
          width: theme.stroke.sm
        },
        color: theme.color.fillBrand
      }
    },
    neutral: {
      borderRadius: theme.spacer.xxl / 4,
      border: {
        color: theme.color.strokeNeutralSecondary,
        width: theme.stroke.sm
      },
      color: theme.color.fillInverseSecondary,
      checked: {
        borderRadius: theme.spacer.xxl / 4,
        border: {
          color: theme.color.strokeNeutralSecondary,
          width: theme.stroke.sm
        },
        color: theme.color.fillNeutral
      }
    },
    inverse: {
      borderRadius: theme.spacer.xxl / 4,
      border: {
        color: theme.color.strokeInverseSecondary,
        width: theme.stroke.sm
      },
      color: theme.color.fillNeutralSecondary,
      checked: {
        borderRadius: theme.spacer.xxl / 4,
        border: {
          color: theme.color.strokeInverseSecondary,
          width: theme.stroke.sm
        },
        color: theme.color.fillInverse
      }
    }
  },
  modeKeys: ["focus", "disabled", "checked"],
  themeStyles: themeStyles$b
};
const icon = {
  themeKeys: {
    // color: 'strokeColor', see types 58 for TODO
    width: "checkWidth",
    height: "checkHeight"
  },
  base: {
    width: theme.spacer.lg,
    height: theme.spacer.lg,
    src: theme.asset.check
  },
  tones: {
    neutral: {
      color: theme.color.fillInverse
    },
    inverse: {
      color: theme.color.fillNeutral
    },
    brand: {
      color: theme.color.fillInverse
    }
  },
  themeStyles: themeStyles$b
};
makeComponentStyles(container$b);
makeComponentStyles(icon);
const { Icon: { defaultTone: defaultTone$a, ...themeStyles$a } = { themeStyles: {} } } = theme == null ? void 0 : theme.componentConfig;
const container$a = {
  themeKeys: {
    color: "color"
  },
  base: {
    width: 100,
    height: 100,
    color: theme.color.fillNeutral
  },
  tones: {
    inverse: {
      color: theme.color.fillInverse
    },
    brand: {
      color: theme.color.fillBrand
    }
  },
  themeStyles: themeStyles$a
};
makeComponentStyles(container$a);
const { Column: { defaultTone: defaultTone$9, ...themeStyles$9 } = { themeStyles: {} } } = theme == null ? void 0 : theme.componentConfig;
const container$9 = {
  themeKeys: {
    gap: "itemSpacing",
    scrollIndex: "scrollIndex",
    transition: "itemTransition"
  },
  base: {
    display: "flex",
    flexDirection: "column",
    gap: theme.layout.gutterY,
    transition: {
      y: {
        ...theme.animation.standardEntrance,
        duration: theme.animation.duration.fast
      }
    }
  },
  themeStyles: themeStyles$9
};
const Container$4 = makeComponentStyles(container$9);
const styles$5 = {
  tone: defaultTone$9 || "neutral",
  Container: Container$4
};
const { FocusRing: { defaultTone: defaultTone$8, ...themeStyles$8 } = { themeStyles: {} } } = theme == null ? void 0 : theme.componentConfig;
const container$8 = {
  themeKeys: {
    borderRadius: "radius"
  },
  base: {
    x: 0,
    y: 0,
    borderRadius: theme.radius.lg,
    border: {
      color: theme.color.interactiveNeutralFocus,
      width: theme.stroke.md
    }
  },
  themeStyles: themeStyles$8
};
makeComponentStyles(container$8);
const { Input: { defaultTone: defaultTone$7, ...themeStyles$7 } = { themeStyles: {} } } = theme == null ? void 0 : theme.componentConfig;
const container$7 = {
  themeKeys: {
    borderRadius: "radius",
    color: "backgroundColor",
    justifyContent: "justify"
  },
  base: {
    // TODO clew uses strokeColor, but we currently don't account for nested properties (border.color)
    // TODO clew uses strokeWidth, but we currently don't account for nested properties (border.width)
    width: getWidthByUpCount(4),
    height: 100,
    padding: [theme.spacer.xxxl, theme.spacer.xl],
    color: theme.color.interactiveNeutral,
    contentColor: theme.color.fillInverse,
    borderRadius: theme.radius.sm,
    marginX: theme.spacer.xxxl,
    actualTitle: ""
  },
  themeStyles: themeStyles$7
};
const text$3 = {
  themeKeys: {
    color: "textColor"
  },
  base: {
    textAlign: "left",
    color: theme.color.textNeutral,
    ...theme.typography.button1
  },
  themeStyles: themeStyles$7
};
const Container$3 = makeComponentStyles(container$7);
const Text$2 = makeComponentStyles(text$3);
const styles$4 = {
  tone: defaultTone$7 || "neutral",
  Container: Container$3,
  Text: Text$2
};
const { Key: { defaultTone: defaultTone$6, ...themeStyles$6 } = { themeStyles: {} } } = theme == null ? void 0 : theme.componentConfig;
const container$6 = {
  themeKeys: {
    keySpacing: "keySpacing",
    borderRadius: "borderRadius",
    color: "backgroundColor",
    justifyContent: "justify",
    baseWidth: "baseWidth",
    sizes: "sizes",
    contentColor: "contentColor"
  },
  base: {
    keySpacing: theme.spacer.md,
    height: theme.spacer.md * 9,
    paddingX: theme.spacer.md,
    contentColor: theme.color.fillNeutral,
    sizes: {
      sm: 1,
      md: 2,
      lg: 3,
      xl: 4,
      xxl: 5
    },
    padding: [theme.spacer.md],
    baseWidth: theme.spacer.md * 7,
    color: theme.color.interactiveNeutral,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: theme.radius.sm
  },
  modes: {
    focus: {
      color: theme.color.interactiveNeutralFocus,
      contentColor: theme.color.fillInverse
    },
    disabled: {
      color: theme.color.fillNeutralDisabled,
      contentColor: theme.color.fillNeutralDisabled
    }
  },
  tones: {
    inverse: {
      color: theme.color.interactiveInverse,
      focus: {
        color: theme.color.interactiveInverseFocus,
        contentColor: theme.color.fillNeutral
      }
    },
    brand: {
      focus: {
        contentColor: theme.color.fillNeutral
      }
    }
  },
  themeStyles: themeStyles$6
};
const text$2 = {
  themeKeys: {
    color: "textColor"
  },
  base: {
    color: theme.color.textNeutral,
    ...theme.typography.headline2,
    textAlign: "center",
    contain: "none"
  },
  modes: {
    focus: {
      color: theme.color.textInverse
    },
    disabled: {
      color: theme.color.textNeutralDisabled
    }
  },
  tones: {
    inverse: {
      focus: {
        color: theme.color.textNeutral
      }
    }
  },
  themeStyles: themeStyles$6
};
const Container$2 = makeComponentStyles(container$6);
const Text$1 = makeComponentStyles(text$2);
const styles$3 = {
  tone: defaultTone$6 || "neutral",
  Container: Container$2,
  Text: Text$1
};
const { Row: { defaultTone: defaultTone$5, ...themeStyles$5 } = { themeStyles: {} } } = theme == null ? void 0 : theme.componentConfig;
const container$5 = {
  themeKeys: {
    gap: "itemSpacing",
    scrollIndex: "scrollIndex",
    transition: "itemTransition"
  },
  base: {
    display: "flex",
    flexDirection: "row",
    gap: theme.layout.gutterX,
    transition: {
      x: {
        ...theme.animation.standardEntrance,
        duration: theme.animation.duration.fast
      }
    }
  },
  themeStyles: themeStyles$5
};
const Container$1 = makeComponentStyles(container$5);
const styles$2 = {
  tone: defaultTone$5,
  Container: Container$1
};
const { Keyboard: { defaultTone: defaultTone$4, ...themeStyles$4 } = {} } = theme == null ? void 0 : theme.componentConfig;
const { Key: { ...keyThemeStyles } = {} } = theme == null ? void 0 : theme.componentConfig;
const container$4 = {
  themeKeys: {
    gap: "keySpacing",
    width: "screenW",
    marginX: "marginX",
    keyHeight: "keyHeight"
  },
  base: {
    gap: theme.spacer.md,
    width: theme.layout.screenW,
    display: "flex",
    marginX: theme.layout.marginX,
    keyHeight: 100,
    flexBoundary: "contain"
  },
  // @ts-expect-error TODO fix style types for component configs
  themeStyles: themeStyles$4
};
const key = {
  themeKeys: {
    gap: "keySpacing",
    borderRadius: "borderRadius",
    color: "backgroundColor",
    justifyContent: "justify",
    baseWidth: "baseWidth",
    sizes: "sizes",
    contentColor: "contentColor"
    // what is this used for
  },
  base: {
    gap: theme.spacer.md,
    height: theme.spacer.md * 9,
    sizes: {
      sm: 1,
      md: 2,
      lg: 3,
      xl: 4,
      xxl: 5
    },
    contentColor: theme.color.fillNeutral,
    padding: [theme.spacer.xxxl, theme.spacer.xl],
    baseWidth: theme.spacer.md * 7,
    color: theme.color.interactiveNeutral,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: theme.radius.sm
  },
  modes: {
    focus: {
      color: theme.color.interactiveNeutralFocus,
      contentColor: theme.color.fillInverse
    },
    disabled: {
      color: theme.color.fillNeutralDisabled,
      contentColor: theme.color.fillNeutralDisabled
    }
  },
  tones: {
    inverse: {
      color: theme.color.interactiveInverse,
      focus: {
        color: theme.color.interactiveInverseFocus,
        contentColor: theme.color.fillNeutral
      }
    },
    brand: {
      focus: {
        contentColor: theme.color.fillNeutral
      }
    }
  },
  themeStyles: keyThemeStyles
};
const text$1 = {
  themeKeys: {
    color: "textColor"
  },
  base: {
    color: theme.color.textNeutral,
    ...theme.typography.headline2
  },
  modes: {
    focus: {
      color: theme.color.textInverse
    },
    disabled: {
      color: theme.color.textNeutralDisabled
    }
  },
  tones: {
    inverse: {
      focus: {
        color: theme.color.textNeutral
      }
    }
  },
  // @ts-expect-error TODO fix style types for component configs
  themeStyles: themeStyles$4
};
const Container = makeComponentStyles(container$4);
const Key = makeComponentStyles(key);
const Text = makeComponentStyles(text$1);
const styles$1 = {
  tone: defaultTone$4,
  Container,
  Key,
  Text
};
const { Label: { defaultTone: defaultTone$3, ...themeStyles$3 } = { themeStyles: {} } } = theme == null ? void 0 : theme.componentConfig;
const container$3 = {
  themeKeys: {
    color: "backgroundColor",
    borderRadius: "radius"
  },
  base: {
    display: "flex",
    justifyContent: "flexStart",
    color: theme.color.textNeutral,
    padding: [theme.spacer.md, theme.spacer.lg],
    // TODO themed padding values
    height: theme.typography.caption1.lineHeight + theme.spacer.md * 2,
    borderRadius: [theme.radius.md, theme.radius.md, theme.radius.md, theme.radius.none],
    neutral: {
      backgroundColor: theme.color.fillNeutral
    }
  },
  tones: {
    inverse: {
      color: theme.color.fillInverse
    },
    brand: {
      color: theme.color.fillBrand,
      focus: {
        color: theme.color.orange
      }
    }
  },
  themeStyles: themeStyles$3
};
const text = {
  themeKeys: {
    color: "textColor"
  },
  base: {
    ...theme.typography.caption1,
    color: theme.color.textInverse,
    lineHeight: theme.typography.caption1.lineHeight + theme.spacer.md * 2,
    marginRight: theme.spacer.lg,
    marginLeft: theme.spacer.lg
  },
  tones: {
    inverse: {
      color: theme.color.textNeutral
    },
    brand: {
      color: theme.color.textNeutral
    }
  },
  themeStyles: themeStyles$3
};
makeComponentStyles(container$3);
makeComponentStyles(text);
const { ProgressBar: { defaultTone: defaultTone$2, ...themeStyles$2 } = { themeStyles: {} } } = theme == null ? void 0 : theme.componentConfig;
const container$2 = {
  themeKeys: {
    color: "barColor",
    borderRadius: "radius"
  },
  base: {
    height: theme.spacer.md,
    color: theme.color.fillNeutralTertiary,
    borderRadius: theme.radius.xs
  },
  tones: {
    inverse: {
      color: theme.color.fillInverseTertiary
    }
  },
  themeStyles: themeStyles$2
};
const progress = {
  themeKeys: {
    color: "progressColor",
    borderRadius: "radius"
  },
  base: {
    borderRadius: theme.radius.xs,
    color: theme.color.fillNeutral
  },
  tones: {
    inverse: {
      color: theme.color.fillInverse
    },
    brand: {
      color: theme.color.fillBrand
    }
  },
  themeStyles: themeStyles$2
};
makeComponentStyles(container$2);
makeComponentStyles(progress);
const { Radio: { defaultTone: defaultTone$1, ...themeStyles$1 } = { themeStyles: {} } } = theme == null ? void 0 : theme.componentConfig;
const container$1 = {
  themeKeys: {
    borderRadius: "radius",
    color: "backgroundColor",
    colorChecked: "backgroundColorChecked"
  },
  base: {
    color: theme.color.fillNeutralSecondary,
    height: theme.spacer.xxl + theme.stroke.sm * 2,
    width: theme.spacer.xxl + theme.stroke.sm * 2,
    borderRadius: theme.spacer.xxl / 2 + theme.stroke.sm,
    border: {
      color: theme.color.strokeNeutralSecondary,
      width: theme.stroke.sm
    }
  },
  tones: {
    inverse: {
      border: {
        color: theme.color.strokeInverseSecondary,
        width: theme.stroke.sm
      }
    },
    brand: {
      border: {
        color: theme.color.fillBrand,
        width: theme.stroke.sm
      }
    }
  },
  modeKeys: ["focus", "disabled", "checked"],
  themeStyles: themeStyles$1
};
const knob$1 = {
  themeKeys: {
    width: "knobWidth",
    height: "knobHeight",
    borderRadius: "knobRadius",
    color: "knobColor",
    colorChecked: "knobColorChecked"
  },
  base: {
    color: theme.color.fillInverse,
    colorChecked: theme.color.fillInverse,
    width: theme.spacer.xxl,
    height: theme.spacer.xxl,
    borderRadius: theme.spacer.xxl / 2
  },
  tones: {
    inverse: {
      color: theme.color.fillNeutral
    }
  },
  themeStyles: themeStyles$1
};
makeComponentStyles(container$1);
makeComponentStyles(knob$1);
const { Toggle: { defaultTone, ...themeStyles } = { themeStyles: {} } } = theme == null ? void 0 : theme.componentConfig;
const knobSize = theme.spacer.xl;
const knobPadding = theme.spacer.xs;
const strokeWidth = theme.stroke.sm;
const container = {
  themeKeys: {
    borderRadius: "strokeRadius",
    color: "backgroundColor",
    colorChecked: "backgroundColorChecked"
  },
  base: {
    color: theme.color.fillInverseTertiary,
    colorChecked: theme.color.fillNeutral,
    height: knobSize + (knobPadding + strokeWidth) * 2,
    width: (strokeWidth + knobPadding * 2 + knobSize) * 2,
    borderRadius: knobSize / 2 + knobPadding + strokeWidth,
    border: {
      // TODO- strokeWidth, strokeColor, and strokeColorChecked map to border object with themeKeys
      color: theme.color.fillNeutral,
      width: strokeWidth
    }
  },
  modes: {
    focus: {},
    disabled: {
      borderRadius: knobSize / 2 + knobPadding + strokeWidth,
      border: {
        color: theme.color.fillNeutralDisabled,
        width: strokeWidth
      },
      color: theme.color.fillInverseDisabled,
      colorChecked: theme.color.fillNeutralDisabled
    }
  },
  tones: {
    inverse: {
      borderRadius: knobSize / 2 + knobPadding + strokeWidth,
      border: {
        color: theme.color.fillInverse,
        width: strokeWidth
      },
      color: theme.color.fillNeutralTertiary,
      colorChecked: theme.color.fillInverse,
      disabled: {
        borderRadius: knobSize / 2 + knobPadding + strokeWidth,
        border: {
          color: theme.color.fillInverseDisabled,
          width: strokeWidth
        },
        color: theme.color.fillNeutralDisabled,
        colorChecked: theme.color.fillInverseDisabled
      }
    },
    brand: {
      borderRadius: knobSize / 2 + knobPadding + strokeWidth,
      border: {
        color: theme.color.fillBrand,
        width: strokeWidth
      },
      color: theme.color.fillBrandTertiary,
      colorChecked: theme.color.fillBrand,
      disabled: {
        borderRadius: knobSize / 2 + knobPadding + strokeWidth,
        border: {
          color: theme.color.fillNeutralDisabled,
          width: strokeWidth
        },
        color: theme.color.fillInverseDisabled,
        colorChecked: theme.color.fillNeutralDisabled
      }
    }
  },
  // TODO: figure out checked state
  themeStyles
};
const knob = {
  themeKeys: {
    width: "knobWidth",
    height: "knobHeight",
    padding: "knobPadding",
    borderRadius: "knobRadius",
    color: "knobColor",
    colorChecked: "knobColorChecked"
  },
  base: {
    color: theme.color.fillNeutral,
    colorChecked: theme.color.fillInverse,
    width: knobSize,
    height: knobSize,
    borderRadius: knobSize / 2,
    padding: knobPadding
  },
  modes: {
    focus: {},
    disabled: {
      color: theme.color.fillNeutralDisabled,
      colorChecked: theme.color.fillInverseDisabled
    }
  },
  tones: {
    inverse: {
      color: theme.color.fillInverse,
      colorChecked: theme.color.fillNeutral,
      disabled: {
        color: theme.color.fillInverseDisabled,
        colorChecked: theme.color.fillNeutralDisabled
      }
    },
    brand: {
      color: theme.color.fillBrand,
      colorChecked: theme.color.fillInverse,
      disabled: {
        color: theme.color.fillNeutralDisabled,
        colorChecked: theme.color.fillInverseDisabled
      }
    }
  },
  themeStyles
};
makeComponentStyles(container);
makeComponentStyles(knob);
const fpsStyle = {
  color: 255,
  height: 180,
  width: 330,
  x: 1900,
  y: 6,
  mountX: 1,
  alpha: 0.8,
  zIndex: 100
};
const fpsLabel = {
  x: 10,
  fontSize: 20,
  textColor: 4143380223
};
const fpsValue = {
  fontSize: 22,
  textColor: 4143380223
};
const [fps, setFps] = createSignal(0);
const [avgFps, setAvgFps] = createSignal(0);
const [minFps, setMinFps] = createSignal(99);
const [maxFps, setMaxFps] = createSignal(0);
const [criticalThresholdSignal, setCriticalThresholdSignal] = createSignal("");
const [targetThresholdSignal, setTargetThresholdSignal] = createSignal("");
const [renderableMemUsedSignal, setRenderableMemUsedSignal] = createSignal("");
const [memUsedSignal, setMemUsedSignal] = createSignal("");
const [renderableTexturesLoadedSignal, setRenderableTexturesLoadedSignal] = createSignal(0);
const [loadedTexturesSignal, setLoadedTexturesSignal] = createSignal(0);
let count = 0;
let totalFps = 0;
const infoFontSize = 14;
function bytesToMb(bytes) {
  return (bytes / 1024 / 1024).toFixed(2) + " Mb";
}
const calcFps = (fps2) => {
  if (!fps2) return;
  setFps(fps2);
  setMinFps((prev) => Math.min(fps2, prev));
  setMaxFps((prev) => Math.max(fps2, prev));
  totalFps += fps2;
  count++;
  setAvgFps(Math.round(totalFps / count));
};
function updateMemoryInfo(stage) {
  const memInfo = stage.txMemManager.getMemoryInfo();
  setCriticalThresholdSignal(bytesToMb(memInfo.criticalThreshold));
  setTargetThresholdSignal(bytesToMb(memInfo.targetThreshold));
  setRenderableMemUsedSignal(bytesToMb(memInfo.renderableMemUsed));
  setMemUsedSignal(bytesToMb(memInfo.memUsed));
  setRenderableTexturesLoadedSignal(memInfo.renderableTexturesLoaded);
  setLoadedTexturesSignal(memInfo.loadedTextures);
}
let frameCount = 0;
function setupFPS(root) {
  root.renderer.on("fpsUpdate", (target, fpsData) => {
    const fps2 = typeof fpsData === "number" ? fpsData : fpsData.fps;
    if (fps2 > 5) {
      calcFps(fps2);
      if (frameCount % 10 === 0) {
        updateMemoryInfo(target.stage);
        frameCount = 0;
      }
      frameCount++;
    }
  });
}
const FPSCounter = (props) => {
  return createComponent(View, mergeProps(props, {
    style: fpsStyle,
    get children() {
      return [createComponent(View, {
        y: 6,
        get children() {
          return [createComponent(Text$4, {
            style: fpsLabel,
            children: "FPS:"
          }), createComponent(Text$4, {
            style: fpsValue,
            x: 90,
            get children() {
              return fps().toString();
            }
          })];
        }
      }), createComponent(View, {
        y: 6,
        x: 160,
        get children() {
          return [createComponent(Text$4, {
            style: fpsLabel,
            children: "AVG:"
          }), createComponent(Text$4, {
            style: fpsValue,
            x: 100,
            get children() {
              return avgFps().toString();
            }
          })];
        }
      }), createComponent(View, {
        x: 0,
        y: 26,
        get children() {
          return [createComponent(Text$4, {
            style: fpsLabel,
            children: "MIN:"
          }), createComponent(Text$4, {
            style: fpsValue,
            x: 90,
            get children() {
              return minFps().toString();
            }
          })];
        }
      }), createComponent(View, {
        x: 160,
        y: 26,
        get children() {
          return [createComponent(Text$4, {
            style: fpsLabel,
            children: "MAX:"
          }), createComponent(Text$4, {
            style: fpsValue,
            x: 100,
            get children() {
              return maxFps().toString();
            }
          })];
        }
      }), createComponent(View, {
        display: "flex",
        flexDirection: "column",
        y: 58,
        gap: 4,
        get children() {
          return [createComponent(View, {
            height: infoFontSize,
            get children() {
              return [createComponent(Text$4, {
                fontSize: infoFontSize,
                style: fpsLabel,
                children: "criticalThreshold:"
              }), createComponent(Text$4, {
                fontSize: infoFontSize,
                style: fpsLabel,
                x: 230,
                get children() {
                  return criticalThresholdSignal();
                }
              })];
            }
          }), createComponent(View, {
            height: infoFontSize,
            get children() {
              return [createComponent(Text$4, {
                fontSize: infoFontSize,
                style: fpsLabel,
                children: "targetThreshold:"
              }), createComponent(Text$4, {
                fontSize: infoFontSize,
                style: fpsLabel,
                x: 230,
                get children() {
                  return targetThresholdSignal();
                }
              })];
            }
          }), createComponent(View, {
            height: infoFontSize,
            get children() {
              return [createComponent(Text$4, {
                fontSize: infoFontSize,
                style: fpsLabel,
                children: "renderableMemUsed:"
              }), createComponent(Text$4, {
                fontSize: infoFontSize,
                style: fpsLabel,
                x: 230,
                get children() {
                  return renderableMemUsedSignal();
                }
              })];
            }
          }), createComponent(View, {
            height: infoFontSize,
            get children() {
              return [createComponent(Text$4, {
                fontSize: infoFontSize,
                style: fpsLabel,
                children: "memUsed:"
              }), createComponent(Text$4, {
                fontSize: infoFontSize,
                style: fpsLabel,
                x: 230,
                get children() {
                  return memUsedSignal();
                }
              })];
            }
          }), createComponent(View, {
            height: infoFontSize,
            get children() {
              return [createComponent(Text$4, {
                fontSize: infoFontSize,
                style: fpsLabel,
                children: "renderableTexturesLoaded:"
              }), createComponent(Text$4, {
                fontSize: infoFontSize,
                style: fpsLabel,
                x: 230,
                get children() {
                  return renderableTexturesLoadedSignal().toString();
                }
              })];
            }
          }), createComponent(View, {
            height: infoFontSize,
            get children() {
              return [createComponent(Text$4, {
                fontSize: infoFontSize,
                style: fpsLabel,
                children: "loadedTextures:"
              }), createComponent(Text$4, {
                fontSize: infoFontSize,
                style: fpsLabel,
                x: 230,
                get children() {
                  return loadedTexturesSignal().toString();
                }
              })];
            }
          })];
        }
      })];
    }
  }));
};
const App = (props) => {
  useFocusManager({
    Announcer: ["a"],
    Menu: ["m"],
    Escape: ["Escape", 27],
    Backspace: ["Backspace", 8],
    Left: ["ArrowLeft", 37],
    Right: ["ArrowRight", 39],
    Up: ["ArrowUp", 38],
    Down: ["ArrowDown", 40],
    Enter: ["Enter", 13]
  }, {
    userKeyHoldMap: {
      EnterHold: ["Enter", 13],
      BackHold: ["b", 66]
    },
    holdThreshold: 1e3
  });
  const announcer = useAnnouncer();
  announcer.enabled = false;
  const navigate = useNavigate();
  let navDrawer, lastFocused;
  setupFPS({
    renderer: renderer$2
  });
  function focusNavDrawer() {
    if (navDrawer.states.has("focus")) {
      return false;
    }
    lastFocused = activeElement();
    return navDrawer.setFocus();
  }
  const [showWidgets, setShowWidgets] = createSignal(true);
  const location = useLocation();
  const showOnPaths = ["/browse", "/entity"];
  createEffect(() => {
    const currentPath = location.pathname;
    let matchesPartial = showOnPaths.some((path) => currentPath.startsWith(path));
    if (currentPath === "/") {
      matchesPartial = true;
    }
    setShowWidgets(matchesPartial);
  });
  const [lastKey, setLastKey] = createSignal();
  const [lastError, setLastError] = createSignal();
  const keyPressHandler = (e) => {
    setLastKey("Last key: ".concat(e.key, ", Code: ").concat(e.keyCode));
  };
  document.addEventListener("keydown", keyPressHandler);
  const displayError = (e) => {
    setLastError((p) => (p || "") + "\n" + e.message);
  };
  document.addEventListener("onerror", displayError);
  onCleanup(() => {
    document.removeEventListener("onerror", displayError);
    document.removeEventListener("keydown", keyPressHandler);
  });
  let pageContainer;
  return createComponent(View, {
    ref(r$) {
      var _ref$ = window.APP;
      typeof _ref$ === "function" ? _ref$(r$) : window.APP = r$;
    },
    onAnnouncer: () => announcer.enabled = !announcer.enabled,
    onLast: () => history.back(),
    onMenu: () => navigate("/"),
    style: {
      width: 1920,
      height: 1080
    },
    onBackspace: focusNavDrawer,
    onLeft: focusNavDrawer,
    onRight: () => navDrawer.states.has("focus") && (lastFocused || pageContainer).setFocus(),
    get children() {
      return [createComponent(Background, {}), createComponent(FPSCounter, {
        mountX: 1,
        x: 1910,
        y: 10,
        get alpha() {
          return showWidgets() ? 1 : 0.01;
        }
      }), createComponent(View, {
        mountX: 1,
        width: 330,
        height: 28,
        x: 1910,
        y: 190,
        color: 255,
        get hidden() {
          return !showWidgets();
        },
        get children() {
          return createComponent(Text$4, {
            fontSize: 20,
            y: 4,
            x: 4,
            get children() {
              return lastKey();
            }
          });
        }
      }), createComponent(Text$4, {
        x: 270,
        y: 20,
        fontSize: 24,
        contain: "width",
        width: 800,
        get children() {
          return lastError();
        }
      }), createComponent(View, {
        ref(r$) {
          var _ref$2 = pageContainer;
          typeof _ref$2 === "function" ? _ref$2(r$) : pageContainer = r$;
        },
        forwardFocus: 0,
        get children() {
          return props.children;
        }
      }), createComponent(NavDrawer, {
        ref(r$) {
          var _ref$3 = navDrawer;
          typeof _ref$3 === "function" ? _ref$3(r$) : navDrawer = r$;
        },
        focusPage: () => lastFocused.setFocus(),
        get showWidgets() {
          return showWidgets();
        }
      })];
    }
  });
};
const params = new URLSearchParams(window.location.search);
const roundPoster = params.get("roundPoster") !== "false";
const styles = {
  Page: {
    width: 1920,
    height: 1080
  },
  headlineText: {
    width: 1200,
    height: 240,
    x: 360,
    // lineHeight: 170, // TODO: Add back when lineHeight is supported
    y: 455,
    contain: "both",
    fontSize: 66,
    textAlign: "center"
  },
  headlineSubText: {
    width: 960,
    height: 170,
    // lineHeight: 170, // TODO: Add back when lineHeight is supported
    x: 530,
    y: 655,
    contain: "both",
    fontSize: 48,
    textAlign: "center"
  },
  itemsContainer: {
    width: theme.layout.screenW,
    height: 800,
    y: 560,
    x: 0,
    zIndex: 2
  },
  Thumbnail: {
    borderRadius: roundPoster ? 16 : 0,
    width: 185,
    height: 278,
    scale: 1,
    zIndex: 2,
    transition: { scale: { duration: 250, easing: "ease-in-out" } },
    border: { width: 0, color: 0 },
    $focus: { scale: 1.1, border: { color: 743406824, width: 8 } }
  },
  FocusRing: {
    borderRadius: 16,
    width: 194,
    height: 286,
    y: -5,
    x: -5,
    zIndex: -1
  },
  FPS: {
    color: 255,
    height: 42,
    width: 140,
    x: 20,
    y: 20,
    zIndex: 100
  },
  FPSLabel: {
    x: 10,
    y: 0,
    fontSize: 36,
    textColor: 4294967295
  },
  FPSValue: {
    x: 90,
    y: 0,
    fontSize: 36,
    textColor: 4294967295
  },
  showHeadline: { x: 70, y: 20 },
  headlineBlur: {
    width: 1920,
    height: 150,
    x: 0,
    y: 0,
    zIndex: 14,
    alpha: 0.9,
    color: 255
  },
  RowTitle: {
    height: 60,
    width: 300,
    marginBottom: -40,
    fontSize: 36,
    color: 4042322175,
    zIndex: 2
  },
  Row: {
    display: "flex",
    justifyContent: "spaceBetween",
    height: 300
  },
  Column: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flexStart",
    flexBoundary: "contain",
    gap: 64,
    width: theme.layout.screenW - 2 * theme.layout.marginX,
    x: theme.layout.marginX + theme.layout.gutterX,
    y: 48,
    transition: { y: { duration: 250, easing: "ease-in-out" } },
    zIndex: 2
  },
  Rect: {
    width: 250,
    height: 100,
    y: 10,
    x: 300,
    color: 65535
  },
  peopleBio: {
    ...theme.typography.body1,
    fontFamily: "Roboto",
    fontWeight: "normal",
    contain: "both",
    width: 780,
    height: 340
  }
};
const Button$1 = {
  width: 300,
  height: 90,
  color: 842150604,
  $focus: {
    color: 4294967295
  }
};
const TopBar = {
  color: 10918399,
  height: 8,
  y: 2,
  x: -4,
  width: Button$1.width + 8
};
const ButtonText = {
  fontSize: 26,
  lineHeight: Button$1.height,
  contain: "width",
  textAlign: "center",
  height: Button$1.height,
  width: Button$1.width,
  color: 4294967295,
  $focus: {
    color: 255
  }
};
const buttonStyles = {
  container: Button$1,
  topBar: TopBar,
  text: ButtonText
};
const MaterialButton = {
  width: 386,
  height: 136,
  color: 1901898751,
  $focus: {
    color: 1513726719
  },
  $disabled: {
    color: 689783807
  }
};
const MaterialButtonText = {
  fontSize: 32,
  contain: "width",
  textAlign: "center",
  mountY: -0.35,
  color: 4294967295,
  height: MaterialButton.height,
  width: MaterialButton.width,
  // lineHeight: MaterialButton.height, // TODO: Add back when lineHeight is supported
  $focus: {
    fontSize: 40
  },
  $disabled: {
    color: 2425393407
  }
};
function Thumbnail(props) {
  return createComponent(View, mergeProps(props, {
    get style() {
      return styles.Thumbnail;
    }
  }));
}
function TileRow(props) {
  return createComponent(Row, mergeProps(props, {
    get style() {
      return styles.Row;
    },
    get children() {
      return createComponent(Index, {
        get each() {
          return props.items;
        },
        children: (item) => createComponent(Thumbnail, item)
      });
    }
  }));
}
function Button(props) {
  return createComponent(View, mergeProps(props, {
    forwardStates: true,
    get style() {
      return buttonStyles.container;
    },
    get children() {
      return createComponent(Text$4, {
        get style() {
          return buttonStyles.text;
        },
        get children() {
          return props.children;
        }
      });
    }
  }));
}
const heroTransition = {
  duration: 300,
  easing: "cubic-bezier(0.20, 1.00, 0.80, 1.00)"
};
const titleRowStyles = {
  fontFamily: "Raleway",
  fontSize: 24,
  height: 32,
  lineHeight: 32
};
function TitleRow(props) {
  return createComponent(View, {
    get height() {
      return props.height;
    },
    forwardFocus: 1,
    marginTop: 30,
    get children() {
      return [createComponent(Text$4, {
        skipFocus: true,
        style: titleRowStyles,
        get children() {
          return props.title;
        }
      }), createComponent(LazyRow, {
        gap: 20,
        upCount: 11,
        get each() {
          return props.items;
        },
        y: 50,
        children: (item) => createComponent(Dynamic, {
          get component() {
            return typeToComponent[props.row.type];
          },
          get item() {
            return item();
          }
        })
      })];
    }
  });
}
const posterStyles = {
  width: 185,
  height: 278,
  scale: 1,
  zIndex: 2,
  color: 2964369663,
  //borderRadius: 8,
  transition: {
    scale: {
      duration: 200,
      easing: "linear"
    }
  },
  $focus: {
    scale: 1.1,
    color: 4294967295
  }
};
function Poster(props) {
  return createComponent(View, mergeProps({
    get src() {
      var _a2;
      return (_a2 = props.item) == null ? void 0 : _a2.src;
    }
  }, props, {
    onFail: (node) => node.src = "failback.png",
    style: posterStyles
  }));
}
const posterTitleStyles = {
  fontFamily: "Raleway",
  fontSize: 22,
  lineHeight: 22,
  height: 22,
  x: 10,
  y: 278,
  contain: "width",
  width: 185,
  maxLines: 2,
  alpha: 0,
  $focus: {
    alpha: 1,
    y: 288
  },
  transition: {
    y: heroTransition,
    alpha: heroTransition
  }
};
function PosterTitle(props) {
  return createComponent(View, mergeProps(props, () => props.item || {}, {
    onFail: (node) => node.src = "failback.png",
    style: posterStyles,
    forwardStates: true,
    get children() {
      return createComponent(Text$4, {
        style: posterTitleStyles,
        get children() {
          return props.title;
        }
      });
    }
  }));
}
const heroStyles = {
  width: 1280,
  height: 720,
  scale: 1,
  zIndex: 2,
  colorTop: 4294967295,
  colorBottom: 255,
  //borderRadius: 8,
  transition: {
    scale: heroTransition
  },
  $focus: {
    scale: 1.05
  }
};
const heroTextStyles = {
  fontFamily: "Raleway",
  contain: "width"
};
function Hero(props) {
  const [hasFocus, setHasFocus] = createSignal(false);
  return createComponent(View, mergeProps(props, {
    get src() {
      return props.item.backdrop;
    },
    style: heroStyles,
    onFocusChanged: setHasFocus,
    forwardStates: true,
    get children() {
      return createComponent(View, {
        transition: {
          alpha: heroTransition
        },
        get alpha() {
          return hasFocus() ? 1 : 0;
        },
        get children() {
          return [createComponent(View, {
            width: 185,
            height: 278,
            x: 54,
            y: 220,
            get src() {
              return props.item.src;
            }
          }), createComponent(Text$4, {
            y: 520,
            x: 54,
            fontSize: 64,
            width: 1e3,
            maxLines: 1,
            style: heroTextStyles,
            get children() {
              return props.item.title;
            }
          }), createComponent(Text$4, {
            y: 620,
            x: 60,
            fontSize: 21,
            width: 1e3,
            maxLines: 2,
            lineHeight: 36,
            color: 3435973887,
            style: heroTextStyles,
            get children() {
              return props.item.overview;
            }
          })];
        }
      });
    }
  }));
}
const typeToComponent = {
  Poster,
  Hero,
  PosterTitle
};
const BlockStyle = {
  alpha: 0.85,
  border: {
    width: 0,
    color: 255
  },
  $focus: {
    border: {
      width: 4,
      color: 4294967295
    },
    alpha: 1
  }
};
function Block(props) {
  return createComponent(View, mergeProps(props, {
    width: 100,
    height: 100,
    style: BlockStyle,
    get color() {
      return props.color || 3772834047;
    }
  }));
}
function createInfiniteScroll(fetcher) {
  const [pages, setPages] = createSignal([]);
  const [page, setPage] = createSignal(1);
  const [end, setEnd] = createSignal(false);
  const [contents] = createResource(page, fetcher);
  createComputed(() => {
    const content2 = contents();
    if (!content2) return;
    batch(() => {
      if (content2.length === 0) setEnd(true);
      setPages((p) => [...p, ...content2]);
    });
  });
  return {
    pages,
    page,
    setPage,
    setPages,
    end,
    setEnd
  };
}
const blockWidth = 900;
const ContentBlockStyle = {
  display: "flex",
  flexDirection: "column",
  flexBoundary: "fixed",
  width: blockWidth,
  height: 220,
  gap: 16
};
const HeadlineStyles = {
  ...theme.typography.display2,
  fontFamily: "Roboto",
  fontWeight: 700,
  maxLines: 1,
  width: blockWidth,
  contain: "width"
};
const Headline = (props) => createComponent(Text$4, mergeProps(props, {
  style: HeadlineStyles
}));
const DescriptionStyles = {
  ...theme.typography.body1,
  fontFamily: "Roboto",
  fontWeight: 400,
  lineHeight: 32,
  width: blockWidth,
  maxLines: 3,
  contain: "width"
};
const BadgeStyle = {
  fontSize: 16,
  lineHeight: 20,
  marginLeft: 13,
  marginRight: 13
};
const Description = (props) => createComponent(Text$4, mergeProps(props, {
  style: DescriptionStyles,
  get children() {
    return props.children;
  }
}));
const Badge = (props) => {
  return createComponent(View, mergeProps(props, {
    style: {
      color: "0x00000099",
      borderRadius: 8,
      border: {
        width: 2,
        color: "0xffffffff"
      },
      display: "flex",
      height: 36
    },
    get children() {
      return createComponent(Text$4, {
        lineHeight: 36,
        style: BadgeStyle,
        get children() {
          return props.children;
        }
      });
    }
  }));
};
const MetaTextStyle = {
  ...theme.typography.body2,
  fontFamily: "Roboto",
  fontWeight: 400
};
const Metadata = (props) => createComponent(View, {
  style: {
    display: "flex",
    flexDirection: "row",
    gap: 18,
    width: blockWidth,
    height: 48
  },
  get children() {
    return [createComponent(View, {
      y: -4,
      src: "./assets/stars.png",
      width: 188,
      height: 31
    }), createComponent(View, {
      y: -4,
      flexItem: false,
      clipping: true,
      get width() {
        return 188 * props.voteAverage / 10;
      },
      height: 31,
      get children() {
        return createComponent(View, {
          src: "./assets/stars-full.png",
          width: 188,
          height: 31
        });
      }
    }), createComponent(Text$4, {
      style: MetaTextStyle,
      get children() {
        return [memo(() => props.voteCount), " reviews"];
      }
    }), createComponent(Text$4, {
      style: MetaTextStyle,
      get children() {
        return props.metaText;
      }
    }), createComponent(For, {
      get each() {
        return props.badges;
      },
      children: (item) => createComponent(Badge, {
        y: -5,
        children: item
      })
    })];
  }
});
const ContentBlock = (props) => createComponent(View, mergeProps({
  id: "contentBlock",
  style: ContentBlockStyle
}, props, {
  get children() {
    return [createComponent(Headline, {
      get children() {
        return props.content.title;
      }
    }), createComponent(Description, {
      get children() {
        return props.content.description;
      }
    }), createComponent(Show, {
      get when() {
        return props.content.voteCount;
      },
      get children() {
        return createComponent(Metadata, {
          get metaText() {
            return props.content.metaText;
          },
          get badges() {
            return props.content.badges;
          },
          get voteCount() {
            return props.content.voteCount;
          },
          get voteAverage() {
            return props.content.voteAverage;
          }
        });
      }
    })];
  }
}));
const Browse = (props) => {
  const [columnY, setcolumnY] = createSignal(0);
  const preload2 = usePreloadRoute();
  const [heroContent, setHeroContent] = createSignal({});
  const navigate = useNavigate();
  let firstRun = true;
  const provider = createMemo(() => {
    return createInfiniteScroll(props.data());
  });
  const delayedBackgrounds = debounce((img) => setGlobalBackground(img), 800);
  const delayedHero = debounce((content2) => setHeroContent(content2 || {}), 600);
  createEffect(on(activeElement, (elm) => {
    if (!elm) return;
    if (firstRun) {
      if (elm.backdrop) {
        setGlobalBackground(elm.backdrop);
      }
      if (elm.heroContent) {
        setHeroContent(elm.heroContent);
      }
      preload2("/browse/tv", {
        preloadData: true
      });
      preload2("/browse/movie", {
        preloadData: true
      });
      firstRun = false;
      return;
    }
    if (elm.href) {
      preload2(elm.href, {
        preloadData: true
      });
    }
    if (elm.backdrop) {
      delayedBackgrounds(elm.backdrop);
    }
    if (elm.heroContent) {
      delayedHero(elm.heroContent);
    }
  }, {
    defer: true
  }));
  function onRowFocus() {
    this.children[this.selected || 0].setFocus();
    setcolumnY((this.y || 0) * -1 + 24);
    let numPages = provider().pages().length;
    this.parent.selected = this.parent.children.indexOf(this);
    if (numPages === 0 || this.parent.selected && this.parent.selected >= numPages - 2) {
      provider().setPage((p) => p + 1);
    }
  }
  function onEnter() {
    this.display = "flex";
    let entity = this.children.find((c) => c.states.has("focus"));
    assertTruthy(entity && entity.href);
    navigate(entity.href);
    return true;
  }
  return createComponent(Show, {
    get when() {
      return provider().pages().length;
    },
    get children() {
      return [createComponent(ContentBlock, {
        y: 360,
        x: 162,
        get content() {
          return heroContent();
        }
      }), createComponent(View, {
        clipping: true,
        get style() {
          return styles.itemsContainer;
        },
        get children() {
          return createComponent(Column, {
            id: "BrowseColumn",
            plinko: true,
            announce: "All Trending - Week",
            get y() {
              return columnY();
            },
            scroll: "none",
            autofocus: true,
            get style() {
              return styles.Column;
            },
            get children() {
              return createComponent(For, {
                get each() {
                  return provider().pages();
                },
                children: (items) => createComponent(TileRow, {
                  items,
                  width: 1620,
                  onFocus: onRowFocus,
                  onEnter
                })
              });
            }
          });
        }
      })];
    }
  });
};
const TMDB = (props) => {
  const [heroContent, setHeroContent] = createSignal({});
  let contentBlock, solidLogo, firstRun = true;
  const delayedBackgrounds = debounce(setGlobalBackground, 800);
  const delayedHero = debounce((content2) => setHeroContent(content2 || {}), 600);
  createEffect(on(activeElement, (elm) => {
    if (!elm) return;
    if (firstRun) {
      elm.backdrop && setGlobalBackground(elm.backdrop);
      elm.heroContent && setHeroContent(elm.heroContent);
      firstRun = false;
    } else {
      elm.backdrop && delayedBackgrounds(elm.backdrop);
      elm.heroContent && delayedHero(elm.heroContent);
    }
  }, {
    defer: true
  }));
  function onSelectedChanged(selectedIndex, column, row) {
    const values = selectedIndex === 0 ? {
      y: 300,
      alpha: 1
    } : {
      y: 200,
      alpha: 0
    };
    contentBlock.animate(values, {
      duration: 300,
      easing: "ease-in-out"
    }).start();
    const values2 = selectedIndex === 0 ? {
      y: 80,
      alpha: 1
    } : {
      y: 0,
      alpha: 0
    };
    solidLogo.animate(values2, {
      duration: 300,
      easing: "ease-in-out"
    }).start();
  }
  return [createComponent(View, {
    ref(r$) {
      var _ref$ = solidLogo;
      typeof _ref$ === "function" ? _ref$(r$) : solidLogo = r$;
    },
    width: 300,
    height: 150,
    x: 162,
    y: 80,
    zIndex: 105,
    get children() {
      return [createComponent(Text$4, {
        x: 80,
        fontSize: 28,
        color: 4143380121,
        children: "Built With:"
      }), createComponent(View, {
        y: 32,
        src: "./assets/solidWord.png",
        width: 280,
        height: 52
      }), createComponent(View, {
        x: 0,
        y: 110,
        src: "./assets/tmdb.png",
        width: 80,
        height: 41
      }), createComponent(Text$4, {
        x: 90,
        y: 110,
        contain: "width",
        width: 160,
        fontSize: 12,
        color: 4143380121,
        children: "This product uses the TMDB API but is not endorsed or certified by TMDB."
      })];
    }
  }), createComponent(ContentBlock, {
    ref(r$) {
      var _ref$2 = contentBlock;
      typeof _ref$2 === "function" ? _ref$2(r$) : contentBlock = r$;
    },
    y: 300,
    x: 162,
    get content() {
      return heroContent();
    }
  }), createComponent(LazyColumn, {
    y: 500,
    upCount: 3,
    get each() {
      return props.data.rows;
    },
    id: "BrowseColumn",
    onSelectedChanged,
    get autofocus() {
      return props.data.rows[0].items();
    },
    gap: 40,
    transition: {
      y: {
        duration: 300,
        easing: "ease-in-out"
      }
    },
    get style() {
      return styles.Column;
    },
    children: (row) => row().type === "Hero" ? createComponent(LazyRow, {
      gap: 80,
      upCount: 3,
      scroll: "center",
      centerScroll: true,
      get each() {
        return row().items();
      },
      y: 50,
      get height() {
        return row().height;
      },
      children: (item) => createComponent(Hero, {
        get item() {
          return item();
        }
      })
    }) : createComponent(TitleRow, {
      get row() {
        return row();
      },
      get title() {
        return row().title;
      },
      get height() {
        return row().height;
      },
      get items() {
        return row().items();
      }
    })
  })];
};
const Destroy = (props) => {
  const [heroContent, setHeroContent] = createSignal();
  const [heroIndex, setHeroIndex] = createSignal(0);
  onMount(() => setGlobalBackground(858993663));
  createEffect(on([props.data.heroRow.items, heroIndex], ([heros, index]) => {
    if (heros) setHeroContent(heros[index]);
    if (heros && index < heros.length - 1) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = heros[index + 1].backdrop;
    }
  }));
  function onDown2() {
    if (heroIndex() >= 19) return false;
    setHeroIndex((p) => p + 1);
  }
  function onUp2() {
    if (heroIndex() === 0) return false;
    setHeroIndex((p) => p - 1);
    return true;
  }
  function animateOut(node) {
    return node.animate({
      y: 200,
      alpha: 0
    }, {
      duration: 500,
      easing: "ease-in-out"
    }).start().waitUntilStopped();
  }
  function animateIn(node) {
    node.alpha = 0;
    node.y = -100;
    return node.animate({
      y: 0,
      alpha: 1
    }, {
      duration: 500,
      easing: "ease-in-out"
    }).start().waitUntilStopped();
  }
  return createComponent(View, {
    x: 300,
    y: 200,
    onDown: onDown2,
    onUp: onUp2,
    get children() {
      return [createComponent(View, {
        src: "assets/up.svg",
        width: 350,
        height: 200,
        x: 450,
        y: -200,
        get rotation() {
          return Math.PI;
        }
      }), createComponent(Show, {
        get when() {
          return heroContent();
        },
        keyed: true,
        get children() {
          return createComponent(Hero, {
            id: "Hero",
            autofocus: true,
            onDestroy: animateOut,
            onCreate: animateIn,
            get src() {
              return heroContent().src;
            },
            get backdrop() {
              return heroContent().backdrop;
            },
            get title() {
              return heroContent().title;
            },
            get overview() {
              return heroContent().overview;
            }
          });
        }
      })];
    }
  });
};
const API_KEY_V4 = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZDE4YjEwMTA0YjdiZTlkNjFiMWYwYjVlMGEwNzM2OCIsInN1YiI6IjYwZTVjMTdlNGNhNjc2MDA3NTA4Njc3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D_nqH9kd-bhhWzeVsTDPYhHnsUaNAuyAa6YATmKHqsA";
const API_BASE = "https://api.themoviedb.org/3";
let tmdbConfig;
let baseImageUrl;
const basePosterSize = "w185";
const defaultFetchParams = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + API_KEY_V4
  }
};
function getImageUrl(path, posterSize = basePosterSize) {
  return baseImageUrl + posterSize + path;
}
function get(path, params2 = {}) {
  if (tmdbConfig) {
    return _get(path, params2);
  } else {
    return loadConfig().then(() => _get(path, params2));
  }
}
function _get(path, params2 = {}) {
  return fetch(API_BASE + path, {
    ...defaultFetchParams,
    ...params2
  }).then((r) => r.json());
}
function loadConfig() {
  return _get("/configuration").then((data) => {
    var _a2;
    tmdbConfig = data;
    baseImageUrl = (_a2 = data.images) == null ? void 0 : _a2.secure_base_url;
    return data;
  });
}
const api = {
  get,
  loadConfig
};
function truncateString(str, maxLength) {
  if (str.length > maxLength) {
    return str.substring(0, maxLength - 3) + "...";
  }
  return str;
}
function chunkArray(array, size = 7) {
  let result = [];
  for (let i = 0, j = array.length; i < j; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}
function convertItemsToTiles(items = []) {
  return items.map((item) => ({
    src: getImageUrl(item.poster_path || item.profile_path),
    tileSrc: getImageUrl(item.backdrop_path || item.profile_path, "w300"),
    backdrop: getImageUrl(item.backdrop_path, "w1280"),
    href: "/entity/".concat(item.media_type || "people", "/").concat(item.id),
    shortTitle: truncateString(item.title || item.name, 30),
    title: item.title || item.name,
    overview: item.overview,
    item,
    entityInfo: {
      type: item.media_type || "people",
      id: item.id
    },
    heroContent: {
      title: item.title || item.name,
      description: item.overview
    }
  }));
}
const handleResults = (response) => {
  return response.then(({ results }) => {
    let filteredItems = results.filter((r) => !r.adult);
    return convertItemsToTiles(filteredItems);
  });
};
const fetchPopular = (type) => {
  return handleResults(api.get("/".concat(type, "/popular")));
};
let genreListCache;
const fetchGenreMovies = (genres) => {
  const genreList = genreListCache || (genreListCache = api.get("/genre/movie/list"));
  const targetGenre = Array.isArray(genres) ? genres : [genres];
  return genreList.then(({ genres: genres2 }) => {
    let targetGenreIds = [];
    genres2.forEach((item) => {
      if (targetGenre.includes(item.name)) targetGenreIds.push(item.id);
    });
    return handleResults(
      api.get("/discover/movie?with_genres=".concat(targetGenreIds.join()))
    );
  });
};
function destroyData() {
  const heroRow = {
    title: "Best Adventure and Action movies",
    items: createResource(() => fetchGenreMovies(["adventure", "action"]))[0],
    type: "Hero",
    height: 800
  };
  return {
    heroRow
  };
}
function tmdbData() {
  const rows = [];
  const popularMovies = createResource(() => fetchPopular("movie"));
  rows.push({
    title: "Popular Movies",
    items: popularMovies[0],
    setItems: popularMovies[1].mutate,
    type: "Poster",
    height: 328
  });
  rows.push({
    title: "Best Western movies",
    items: createResource(() => fetchGenreMovies(["Western"]))[0],
    type: "Hero",
    height: 720
  });
  rows.push({
    title: "Best Comedy movies",
    items: createResource(() => fetchGenreMovies(["Comedy"]))[0],
    type: "PosterTitle",
    height: 400
  });
  rows.push({
    title: "Popular TV shows",
    items: createResource(() => fetchPopular("tv"))[0],
    type: "PosterTitle",
    height: 400
  });
  const heroRow = {
    title: "Best Adventure and Action movies",
    items: createResource(() => fetchGenreMovies(["adventure", "action"]))[0],
    type: "Hero",
    height: 720
  };
  rows.push(heroRow);
  rows.push({
    title: "Best Documentaries",
    items: createResource(() => fetchGenreMovies("Documentary"))[0],
    type: "PosterTitle",
    height: 400
  });
  rows.push({
    title: "Best Western movies 2",
    items: createResource(() => fetchGenreMovies("Western"))[0],
    type: "PosterTitle",
    height: 400
  });
  return {
    rows
  };
}
const NotFound = () => {
  return (() => {
    var _el$ = createElement("node");
    setProp(_el$, "style", {
      width: 1920,
      height: 1080,
      color: 868483072
    });
    return _el$;
  })();
};
const basePath = "/solid-demo-app/";
const fonts = [
  {
    type: "msdf",
    fontFamily: "Roboto",
    descriptors: {
      weight: 700
    },
    atlasDataUrl: basePath + "fonts/Roboto-Bold.msdf.json",
    atlasUrl: basePath + "fonts/Roboto-Bold.msdf.png"
  },
  {
    type: "msdf",
    fontFamily: "Roboto",
    descriptors: {
      weight: 400
    },
    atlasDataUrl: basePath + "fonts/Roboto-Regular.msdf.json",
    atlasUrl: basePath + "fonts/Roboto-Regular.msdf.png"
  },
  {
    type: "msdf",
    fontFamily: "Arial",
    descriptors: {
      weight: 500
    },
    atlasDataUrl: basePath + "fonts/Roboto-Regular.msdf.json",
    atlasUrl: basePath + "fonts/Roboto-Regular.msdf.png"
  },
  {
    type: "msdf",
    fontFamily: "Raleway",
    descriptors: {
      weight: 800
    },
    atlasDataUrl: basePath + "fonts/Raleway-ExtraBold.msdf.json",
    atlasUrl: basePath + "fonts/Raleway-ExtraBold.msdf.png"
  },
  {
    fontFamily: "Roboto",
    fontUrl: basePath + "fonts/Roboto-Regular.ttf"
  }
];
let cache = /* @__PURE__ */ new Map();
const leftoverTiles = /* @__PURE__ */ new Map();
function browseProvider(filter) {
  return (pageIndex) => {
    const url = "/trending/".concat(filter, "/week?page=").concat(pageIndex);
    if (cache.has(url)) {
      return cache.get(url);
    }
    let result = api.get(url).then((trending) => {
      let results = trending.results.filter((r) => !r.adult);
      let tiles = (leftoverTiles.has(filter) ? leftoverTiles.get(filter) : []).concat(convertItemsToTiles(results));
      let chunks = chunkArray(tiles);
      if (chunks[chunks.length - 1].length < 7) {
        leftoverTiles.set(filter, chunks.pop());
      } else {
        leftoverTiles.delete(filter);
      }
      return chunks;
    });
    cache.set(url, result);
    return result;
  };
}
function browsePreload({ params: params2 }) {
  return createMemo(() => {
    const provider = browseProvider(params2.filter || "all");
    provider(1);
    return provider;
  });
}
function minutesToHMM(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return hours + "h " + (remainingMinutes < 10 ? "0" : "") + remainingMinutes + "min";
}
function formatDate(dateString) {
  const parts = dateString.split("-");
  return parts[1] + "/" + parts[2] + "/" + parts[0];
}
function justYear(dateString) {
  const parts = dateString.split("-");
  return parts[0];
}
function ensureItems(items, minCount) {
  const remainingCount = minCount - items.length;
  if (remainingCount > 0) {
    return items.concat(Array(remainingCount).fill({}));
  }
  return items;
}
function getRecommendations({ type, id }) {
  return api.get("/".concat(type, "/").concat(id, "/recommendations")).then(({ results }) => {
    if (results.length) {
      return ensureItems(convertItemsToTiles(results.slice(0, 7)), 7);
    }
    return api.get("/trending/".concat(type, "/week?page=1")).then(
      ({ results: results2 }) => ensureItems(convertItemsToTiles(results2.slice(0, 7)), 7)
    );
  });
}
function getCredits({ type, id }) {
  return api.get("/".concat(type, "/").concat(id, "/credits")).then(({ cast }) => ensureItems(convertItemsToTiles(cast.slice(0, 7)), 7));
}
function getInfo({ type, id }) {
  let rt = type === "movie" ? {
    rtCrit: 86,
    rtFan: 92
  } : {};
  return api.get("/".concat(type, "/").concat(id)).then((data) => ({
    backgroundImage: getImageUrl(data.backdrop_path, "w1280"),
    heroContent: {
      title: data.title || data.name,
      description: data.overview,
      badges: ["HD", "CC"],
      voteAverage: data.vote_average,
      voteCount: data.vote_count,
      metaText: type === "movie" ? minutesToHMM(data.runtime) + "   " + formatDate(data.release_date) : "".concat(justYear(data.first_air_date), " - ").concat(justYear(data.last_air_date)),
      reviews: rt
    },
    ...data
  }));
}
function entityPreload({ params: params2, intent: intent2 }) {
  const [entity] = createResource(() => ({ ...params2 }), getInfo);
  if (intent2 === "preload") {
    return;
  }
  const [credits] = createResource(
    () => ({ ...params2 }),
    getCredits
  );
  const [recommendations] = createResource(
    () => ({ ...params2 }),
    getRecommendations
  );
  return { entity, credits, recommendations };
}
const Grid = lazy(() => __vitePreload(() => import("./Grid-NReNjm24.js"), true ? [] : void 0));
const Loops = lazy(() => __vitePreload(() => import("./Loops-37A4Aufd.js"), true ? __vite__mapDeps([0,1]) : void 0));
const Infinite = lazy(() => __vitePreload(() => import("./Infinite-BA4GGGtO.js"), true ? __vite__mapDeps([2,1]) : void 0));
const TMDBGrid = lazy(() => __vitePreload(() => import("./TMDBGrid-BktODjW3.js"), true ? [] : void 0));
const Portal = lazy(() => __vitePreload(() => import("./Portal-DdL3IARK.js"), true ? [] : void 0));
const TextPage = lazy(() => __vitePreload(() => import("./Text-DawfY7Vg.js"), true ? [] : void 0));
const TextPosterPage = lazy(() => __vitePreload(() => import("./TextPoster-kNAEvpMq.js"), true ? [] : void 0));
const CreatePage = lazy(() => __vitePreload(() => import("./Create-U3JJXDtC.js"), true ? [] : void 0));
const ViewportPage = lazy(() => __vitePreload(() => import("./Viewport-DsLqs1Jr.js"), true ? [] : void 0));
const PositioningPage = lazy(() => __vitePreload(() => import("./Positioning-3CTQWzWU.js"), true ? [] : void 0));
const LayoutPage = lazy(() => __vitePreload(() => import("./Layout-Bo_LkrQX.js"), true ? [] : void 0));
const FocusBasicsPage = lazy(() => __vitePreload(() => import("./FocusBasics-CF8eTbvL.js"), true ? [] : void 0));
const KeyHandlingPage = lazy(() => __vitePreload(() => import("./KeyHandling-B0pcZ0S8.js"), true ? [] : void 0));
const TransitionsPage = lazy(() => __vitePreload(() => import("./Transitions-BrxV9IRx.js"), true ? [] : void 0));
const ComponentsPage = lazy(() => __vitePreload(() => import("./Components-C26B4buY.js"), true ? __vite__mapDeps([3,4]) : void 0));
const FocusHandlingPage = lazy(() => __vitePreload(() => import("./FocusHandling-P_1T__Rv.js"), true ? [] : void 0));
const GradientsPage = lazy(() => __vitePreload(() => import("./Gradients-CVk40F6T.js"), true ? [] : void 0));
const FlexPage = lazy(() => __vitePreload(() => import("./Flex-BD6EcjXF.js"), true ? [] : void 0));
const FlexGrowPage = lazy(() => __vitePreload(() => import("./FlexGrow-Dc3YrsCx.js"), true ? [] : void 0));
const FlexSizePage = lazy(() => __vitePreload(() => import("./FlexSize-Yoqrnl1d.js"), true ? [] : void 0));
const FlexColumnSizePage = lazy(() => __vitePreload(() => import("./FlexColumnSize-C7K9b6us.js"), true ? [] : void 0));
const FlexColumnPage = lazy(() => __vitePreload(() => import("./FlexColumn-CbsiF3jY.js"), true ? [] : void 0));
const ButtonsMaterialPage = lazy(() => __vitePreload(() => import("./ButtonsMaterial--RAX0DJD.js"), true ? [] : void 0));
const SuperFlexPage = lazy(() => __vitePreload(() => import("./SuperFlex-C5vL_FPz.js"), true ? [] : void 0));
const Entity = lazy(() => __vitePreload(() => import("./Entity-Qzc2chzI.js"), true ? [] : void 0));
const People = lazy(() => __vitePreload(() => import("./People-DTbm2Qyr.js"), true ? [] : void 0));
const LoginPage = lazy(() => __vitePreload(() => import("./Login-CLADL0mr.js"), true ? __vite__mapDeps([5,4]) : void 0));
const FireboltPage = lazy(() => __vitePreload(() => import("./Firebolt-DPj-oR-0.js"), true ? [] : void 0));
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
  default: window.innerHeight / 1080
}[screenSize];
Config.debug = false;
Config.animationsEnabled = true;
Config.fontSettings.fontFamily = "Roboto";
Config.fontSettings.color = 4143380223;
Config.fontSettings.fontSize = 32;
Config.rendererOptions = {
  fpsUpdateInterval: 1e3,
  inspector: void 0,
  // textureMemory: {
  //   criticalThreshold: 80e6,
  // },
  numImageWorkers,
  // temp fix for renderer bug
  // Set the resolution based on window height
  // 720p = 0.666667, 1080p = 1, 1440p = 1.5, 2160p = 2
  deviceLogicalPixelRatio,
  devicePhysicalPixelRatio: 1,
  createImageBitmapSupport: "auto"
};
if (rendererMode === "canvas") {
  Config.rendererOptions.fontEngines = [CanvasTextRenderer];
  Config.rendererOptions.renderEngine = CanvasCoreRenderer;
} else {
  Config.rendererOptions.fontEngines = [SdfTextRenderer];
  Config.rendererOptions.renderEngine = WebGlCoreRenderer;
}
const {
  renderer,
  render
} = createRenderer();
loadFonts(fonts);
render(() => createComponent(HashRouter, {
  root: (props) => createComponent(App, props),
  get children() {
    return [createComponent(Route, {
      path: "",
      component: Browse,
      preload: browsePreload
    }), createComponent(Route, {
      path: "examples",
      component: Portal
    }), createComponent(Route, {
      path: "browse/:filter",
      component: Browse,
      preload: browsePreload
    }), createComponent(Route, {
      path: "tmdb",
      component: TMDB,
      preload: tmdbData
    }), createComponent(Route, {
      path: "loops",
      component: Loops,
      preload: tmdbData
    }), createComponent(Route, {
      path: "infinite",
      component: Infinite,
      preload: tmdbData
    }), createComponent(Route, {
      path: "tmdbgrid",
      component: TMDBGrid,
      preload: tmdbData
    }), createComponent(Route, {
      path: "destroy",
      component: Destroy,
      preload: destroyData
    }), createComponent(Route, {
      path: "grid",
      component: Grid
    }), createComponent(Route, {
      path: "text",
      component: TextPage
    }), createComponent(Route, {
      path: "firebolt",
      component: FireboltPage
    }), createComponent(Route, {
      path: "textposter",
      component: TextPosterPage
    }), createComponent(Route, {
      path: "login",
      component: LoginPage
    }), createComponent(Route, {
      path: "positioning",
      component: PositioningPage
    }), createComponent(Route, {
      path: "layout",
      component: LayoutPage
    }), createComponent(Route, {
      path: "focusbasics",
      component: FocusBasicsPage
    }), createComponent(Route, {
      path: "transitions",
      component: TransitionsPage
    }), createComponent(Route, {
      path: "components",
      component: ComponentsPage
    }), createComponent(Route, {
      path: "focushandling",
      component: FocusHandlingPage
    }), createComponent(Route, {
      path: "keyhandling",
      component: KeyHandlingPage
    }), createComponent(Route, {
      path: "gradients",
      component: GradientsPage
    }), createComponent(Route, {
      path: "flex",
      component: FlexPage
    }), createComponent(Route, {
      path: "create",
      component: CreatePage
    }), createComponent(Route, {
      path: "viewport",
      component: ViewportPage
    }), createComponent(Route, {
      path: "flexsize",
      component: FlexSizePage
    }), createComponent(Route, {
      path: "flexcolumnsize",
      component: FlexColumnSizePage
    }), createComponent(Route, {
      path: "flexcolumn",
      component: FlexColumnPage
    }), createComponent(Route, {
      path: "flexgrow",
      component: FlexGrowPage
    }), createComponent(Route, {
      path: "superflex",
      component: SuperFlexPage
    }), createComponent(Route, {
      path: "buttonsmaterial",
      component: ButtonsMaterialPage
    }), createComponent(Route, {
      path: "entity/people/:id",
      component: People
    }), createComponent(Route, {
      path: "entity/:type/:id",
      component: Entity,
      preload: entityPreload
    }), createComponent(Route, {
      path: "*all",
      component: NotFound
    })];
  }
}));
export {
  $TRACK as $,
  children as A,
  Block as B,
  Column as C,
  Dynamic as D,
  ElementNode as E,
  For as F,
  styles as G,
  Button as H,
  Index as I,
  TileRow as J,
  api as K,
  convertItemsToTiles as L,
  MaterialButtonText as M,
  getImageUrl as N,
  useParams as O,
  Poster as P,
  styles$5 as Q,
  Row as R,
  Show as S,
  Text$4 as T,
  styles$4 as U,
  View as V,
  styles$3 as W,
  styles$2 as X,
  styles$1 as Y,
  styles$6 as Z,
  __vite_legacy_guard,
  createResource as a,
  createComputed as b,
  createSignal as c,
  batch as d,
  createSelector as e,
  createEffect as f,
  onMount as g,
  createComponent as h,
  splitProps as i,
  createMemo as j,
  onCleanup as k,
  createRoot as l,
  mergeProps as m,
  isFunction as n,
  on as o,
  debounce as p,
  activeElement as q,
  ContentBlock as r,
  setGlobalBackground as s,
  theme as t,
  untrack as u,
  useNavigate as v,
  assertTruthy as w,
  hexColor as x,
  memo as y,
  combineStyles as z
};
