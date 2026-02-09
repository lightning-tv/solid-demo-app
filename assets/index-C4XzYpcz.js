var __defProp = Object.defineProperty;

var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {
    enumerable: true,
    configurable: true,
    writable: true,
    value: value
}) : obj[key] = value;

var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

function __vite_legacy_guard() {
    import.meta.url;
    import("_").catch(() => 1);
    (async function*() {})().next();
}

(function polyfill() {
    const relList = document.createElement("link").relList;
    if (relList && relList.supports && relList.supports("modulepreload")) return;
    for (const link of document.querySelectorAll('link[rel="modulepreload"]')) processPreload(link);
    new MutationObserver(mutations => {
        for (const mutation of mutations) {
            if (mutation.type !== "childList") continue;
            for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
        }
    }).observe(document, {
        childList: true,
        subtree: true
    });
    function getFetchOpts(link) {
        const fetchOpts = {};
        if (link.integrity) fetchOpts.integrity = link.integrity;
        if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
        if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include"; else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit"; else fetchOpts.credentials = "same-origin";
        return fetchOpts;
    }
    function processPreload(link) {
        if (link.ep) return;
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
        let allSettled = function(promises$2) {
            return Promise.all(promises$2.map(p => Promise.resolve(p).then(value$1 => ({
                status: "fulfilled",
                value: value$1
            }), reason => ({
                status: "rejected",
                reason: reason
            }))));
        };
        document.getElementsByTagName("link");
        const cspNonceMeta = document.querySelector("meta[property=csp-nonce]");
        const cspNonce = (cspNonceMeta == null ? void 0 : cspNonceMeta.nonce) || (cspNonceMeta == null ? void 0 : cspNonceMeta.getAttribute("nonce"));
        promise = allSettled(deps.map(dep => {
            dep = assetsURL(dep);
            if (dep in seen) return;
            seen[dep] = true;
            const isCss = dep.endsWith(".css");
            const cssSelector = isCss ? '[rel="stylesheet"]' : "";
            if (document.querySelector('link[href="'.concat(dep, '"]').concat(cssSelector))) return;
            const link = document.createElement("link");
            link.rel = isCss ? "stylesheet" : scriptRel;
            if (!isCss) link.as = "script";
            link.crossOrigin = "";
            link.href = dep;
            if (cspNonce) link.setAttribute("nonce", cspNonce);
            document.head.appendChild(link);
            if (isCss) return new Promise((res, rej) => {
                link.addEventListener("load", res);
                link.addEventListener("error", () => rej(new Error("Unable to preload CSS for ".concat(dep))));
            });
        }));
    }
    function handlePreloadError(err$2) {
        const e$1 = new Event("vite:preloadError", {
            cancelable: true
        });
        e$1.payload = err$2;
        window.dispatchEvent(e$1);
        if (!e$1.defaultPrevented) throw err$2;
    }
    return promise.then(res => {
        for (const item of res || []) {
            if (item.status !== "rejected") continue;
            handlePreloadError(item.reason);
        }
        return baseModule().catch(handlePreloadError);
    });
};

function createWebGLContext(canvas2, forceWebGL2 = false, contextSpy) {
    const config = {
        alpha: true,
        antialias: false,
        depth: false,
        stencil: true,
        desynchronized: false,
        powerPreference: "high-performance",
        premultipliedAlpha: true,
        preserveDrawingBuffer: false
    };
    const gl = canvas2.getContext(forceWebGL2 ? "webgl2" : "webgl", config) || canvas2.getContext("experimental-webgl", config);
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

const isProductionEnvironment = true;

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

let nextId = 1;

function getNewId() {
    return nextId++;
}

function deepClone(obj) {
    if (typeof obj !== "object") {
        return obj;
    }
    if (Array.isArray(obj)) {
        return obj.map(item => deepClone(item));
    }
    const copy = {};
    for (const key in obj) {
        copy[key] = deepClone(obj[key]);
    }
    return copy;
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
        [ ...listeners ].forEach(listener => {
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

const _Texture = class _Texture extends EventEmitter {
    constructor(txManager) {
        super();
        __publicField(this, "txManager");
        __publicField(this, "_dimensions", null);
        __publicField(this, "_error", null);
        __publicField(this, "state", "initial");
        __publicField(this, "renderableOwners", []);
        __publicField(this, "renderable", false);
        __publicField(this, "type", TextureType.generic);
        __publicField(this, "preventCleanup", false);
        __publicField(this, "ctxTexture");
        __publicField(this, "textureData", null);
        __publicField(this, "memUsed", 0);
        __publicField(this, "retryCount", 0);
        __publicField(this, "maxRetryCount");
        __publicField(this, "createdAt", Date.now());
        __publicField(this, "gracePeriodExpired", false);
        __publicField(this, "freeTextureDataTask", () => {
            this.textureData = null;
        });
        __publicField(this, "releaseTask", () => {
            this.release();
        });
        this.txManager = txManager;
        this.maxRetryCount = this.txManager.maxRetryCount;
    }
    get dimensions() {
        return this._dimensions;
    }
    get error() {
        return this._error;
    }
    isWithinStartupGracePeriod() {
        if (this.gracePeriodExpired === true) {
            return false;
        }
        const hasExpired = Date.now() - this.createdAt >= _Texture.STARTUP_GRACE_PERIOD;
        if (hasExpired) {
            this.gracePeriodExpired = true;
            return false;
        }
        return true;
    }
    canBeCleanedUp() {
        if (this.preventCleanup) {
            return false;
        }
        if (this.isWithinStartupGracePeriod()) {
            return false;
        }
        if (this.renderable === true) {
            return false;
        }
        if (this.renderableOwners.length > 0) {
            return false;
        }
        return true;
    }
    setRenderableOwner(owner, renderable) {
        var _a, _b;
        const oldSize = this.renderableOwners.length;
        const hasOwnerIndex = this.renderableOwners.indexOf(owner);
        if (renderable === true) {
            if (hasOwnerIndex === -1) {
                this.renderableOwners.push(owner);
            }
            const newSize = this.renderableOwners.length;
            if (oldSize !== newSize && newSize === 1) {
                this.renderable = true;
                (_a = this.onChangeIsRenderable) == null ? void 0 : _a.call(this, true);
                this.load();
            }
        } else {
            if (hasOwnerIndex !== -1) {
                this.renderableOwners.splice(hasOwnerIndex, 1);
            }
            const newSize = this.renderableOwners.length;
            if (oldSize !== newSize && newSize === 0) {
                this.renderable = false;
                (_b = this.onChangeIsRenderable) == null ? void 0 : _b.call(this, false);
            }
        }
    }
    load() {
        if (this.retryCount > this.maxRetryCount) {
            return;
        }
        this.txManager.loadTexture(this);
    }
    loadCtxTexture() {
        if (this.ctxTexture === void 0) {
            this.ctxTexture = this.txManager.renderer.createCtxTexture(this);
        }
        return this.ctxTexture;
    }
    free() {
        var _a;
        (_a = this.ctxTexture) == null ? void 0 : _a.free();
    }
    release() {
        var _a;
        (_a = this.ctxTexture) == null ? void 0 : _a.release();
        this.ctxTexture = void 0;
        this.freeTextureData();
    }
    destroy() {
        if (this.state === "loaded") {
            this.free();
        }
        this.freeTextureData();
    }
    freeTextureData() {
        queueMicrotask(this.freeTextureDataTask);
    }
    setState(state, errorOrDimensions) {
        if (this.state === state) {
            return;
        }
        let payload = null;
        if (state === "loaded") {
            if (errorOrDimensions !== void 0 && "w" in errorOrDimensions === true && "h" in errorOrDimensions === true && errorOrDimensions.w !== void 0 && errorOrDimensions.h !== void 0) {
                this._dimensions = errorOrDimensions;
            }
            payload = this._dimensions;
        } else if (state === "failed") {
            this._error = errorOrDimensions;
            payload = this._error;
            this.retryCount += 1;
            queueMicrotask(this.releaseTask);
        } else if (state === "loading") {
            this._error = null;
            this._dimensions = null;
        } else {
            this._error = null;
        }
        this.state = state;
        this.emit(state, payload);
    }
    async getTextureData() {
        if (this.textureData === null) {
            this.textureData = await this.getTextureSource();
        }
        return this.textureData;
    }
    static makeCacheKey(props2) {
        return false;
    }
    static resolveDefaults(props2) {
        return {};
    }
};

__publicField(_Texture, "STARTUP_GRACE_PERIOD", 2e3);

let Texture = _Texture;

const PROTOCOL_REGEX = /^(data|ftps?|https?):/;

const getNormalizedRgbaComponents = rgba => {
    const r = rgba >>> 24;
    const g = rgba >>> 16 & 255;
    const b = rgba >>> 8 & 255;
    const a = rgba & 255;
    return [ r / 255, g / 255, b / 255, a / 255 ];
};

function createBound(x1, y1, x2, y2, out) {
    if (out) {
        out.x1 = x1;
        out.y1 = y1;
        out.x2 = x2;
        out.y2 = y2;
        return out;
    }
    return {
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2
    };
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
            x: x,
            y: y,
            width: width,
            height: height
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

function pointInBound(x, y, bound) {
    return !(x < bound.x1 || x > bound.x2 || y < bound.y1 || y > bound.y2);
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

function calcFactoredRadiusArray$1(radius, width, height) {
    const result = [ radius[0], radius[1], radius[2], radius[3] ];
    const factor = Math.min(Math.min(Math.min(width / Math.max(width, radius[0] + radius[1]), width / Math.max(width, radius[2] + radius[3])), Math.min(height / Math.max(height, radius[0] + radius[3]), height / Math.max(height, radius[1] + radius[2]))), 1);
    result[0] *= factor;
    result[1] *= factor;
    result[2] *= factor;
    result[3] *= factor;
    return result;
}

function dataURIToBlob(dataURI) {
    var _a, _b;
    dataURI = dataURI.replace(/^data:/, "");
    const type2 = ((_a = dataURI.match(/image\/[^;]+/)) == null ? void 0 : _a[0]) || "";
    const base64 = dataURI.replace(/^[^,]+,/, "");
    const sliceSize = 1024;
    const byteCharacters = atob(base64);
    const bytesLength = byteCharacters.length;
    const slicesCount = Math.ceil(bytesLength / sliceSize);
    const byteArrays = new Array(slicesCount);
    for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
        const begin = sliceIndex * sliceSize;
        const end = Math.min(begin + sliceSize, bytesLength);
        const bytes = new Array(end - begin);
        for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
            bytes[i] = (_b = byteCharacters[offset]) == null ? void 0 : _b.charCodeAt(0);
        }
        byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, {
        type: type2
    });
}

function fetchJson(url, responseType = "") {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest;
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

class Matrix3d {
    constructor() {
        __publicField(this, "ta");
        __publicField(this, "tb");
        __publicField(this, "tx");
        __publicField(this, "tc");
        __publicField(this, "td");
        __publicField(this, "ty");
        __publicField(this, "_floatArr", null);
        __publicField(this, "mutation");
        this.ta = 0;
        this.tb = 0;
        this.tx = 0;
        this.tc = 0;
        this.td = 0;
        this.ty = 0;
        this.mutation = true;
    }
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
            out = new Matrix3d;
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
            out = new Matrix3d;
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
            out = new Matrix3d;
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
            out = new Matrix3d;
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
            out = new Matrix3d;
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
            dst = new Matrix3d;
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

const tempMatrix = new Matrix3d;

class RenderCoords {
    constructor(x1, y1, x2, y2, x3, y3, x4, y4) {
        __publicField(this, "x1");
        __publicField(this, "y1");
        __publicField(this, "x2");
        __publicField(this, "y2");
        __publicField(this, "x3");
        __publicField(this, "y3");
        __publicField(this, "x4");
        __publicField(this, "y4");
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.x3 = x3;
        this.y3 = y3;
        this.x4 = x4;
        this.y4 = y4;
    }
    static translate(x1, y1, x2, y2, x3, y3, x4, y4, out) {
        if (out === void 0) {
            return new RenderCoords(x1, y1, x2, y2, x3, y3, x4, y4);
        }
        out.x1 = x1;
        out.y1 = y1;
        out.x2 = x2;
        out.y2 = y2;
        out.x3 = x3;
        out.y3 = y3;
        out.x4 = x4;
        out.y4 = y4;
        return out;
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
        let t = .5, cbx, cbxd, dx;
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
            t = .5 * (minT + maxT);
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
        return time;
    };
};

const timingMapping = {};

const timingLookup = {
    ease: [ .25, .1, .25, 1 ],
    "ease-in": [ .42, 0, 1, 1 ],
    "ease-out": [ 0, 0, .58, 1 ],
    "ease-in-out": [ .42, 0, .58, 1 ],
    "ease-in-sine": [ .12, 0, .39, 0 ],
    "ease-out-sine": [ .12, 0, .39, 0 ],
    "ease-in-out-sine": [ .37, 0, .63, 1 ],
    "ease-in-cubic": [ .32, 0, .67, 0 ],
    "ease-out-cubic": [ .33, 1, .68, 1 ],
    "ease-in-out-cubic": [ .65, 0, .35, 1 ],
    "ease-in-circ": [ .55, 0, 1, .45 ],
    "ease-out-circ": [ 0, .55, .45, 1 ],
    "ease-in-out-circ": [ .85, 0, .15, 1 ],
    "ease-in-back": [ .36, 0, .66, -.56 ],
    "ease-out-back": [ .34, 1.56, .64, 1 ],
    "ease-in-out-back": [ .68, -.6, .32, 1.6 ]
};

const defaultTiming = t => t;

const parseCubicBezier = str => {
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

const getTimingFunction = str => {
    if (str === "linear") {
        return defaultTiming;
    }
    if (timingMapping[str] !== void 0) {
        return timingMapping[str] || defaultTiming;
    }
    if (str === "step-start") {
        return () => 1;
    }
    if (str === "step-end") {
        return time => time === 1 ? 1 : 0;
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
    constructor(node, props2, settings) {
        var _a, _b, _c, _d, _e;
        super();
        __publicField(this, "node");
        __publicField(this, "props");
        __publicField(this, "settings");
        __publicField(this, "progress", 0);
        __publicField(this, "delayFor", 0);
        __publicField(this, "delay", 0);
        __publicField(this, "timingFunction");
        __publicField(this, "propValuesMap", {});
        this.node = node;
        this.props = props2;
        for (const key in props2) {
            if (key !== "shaderProps") {
                if (this.propValuesMap["props"] === void 0) {
                    this.propValuesMap["props"] = {};
                }
                this.propValuesMap["props"][key] = {
                    start: node[key] || 0,
                    target: props2[key]
                };
            } else if (key === "shaderProps" && node.shader !== null) {
                this.propValuesMap["shaderProps"] = {};
                for (const key2 in props2.shaderProps) {
                    let start = node.shader.props[key2];
                    if (Array.isArray(start) === true) {
                        start = start[0];
                    }
                    this.propValuesMap["shaderProps"][key2] = {
                        start: start,
                        target: props2.shaderProps[key2]
                    };
                }
            }
        }
        const easing = settings.easing || "linear";
        const delay2 = (_a = settings.delay) != null ? _a : 0;
        this.settings = {
            duration: (_b = settings.duration) != null ? _b : 0,
            delay: delay2,
            easing: easing,
            loop: (_c = settings.loop) != null ? _c : false,
            repeat: (_d = settings.repeat) != null ? _d : 0,
            stopMethod: (_e = settings.stopMethod) != null ? _e : false
        };
        this.timingFunction = typeof easing === "string" ? getTimingFunction(easing) : easing;
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
            const [key, value] = entries[i];
            target[key] = value.start;
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
    }
    reverseValues(valueMap) {
        const entries = Object.entries(valueMap);
        const eLength = entries.length;
        for (let i = 0; i < eLength; i++) {
            const [key, value] = entries[i];
            valueMap[key] = {
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
        if (!this.settings.loop) {
            this.settings.stopMethod = false;
        }
    }
    applyEasing(p, s, e) {
        return this.timingFunction(p) * (e - s) + s;
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
            const [key, value] = entries[i];
            target[key] = this.updateValue(key, value.target, value.start, easing);
        }
    }
    update(dt) {
        const {duration: duration, loop: loop, easing: easing, stopMethod: stopMethod} = this.settings;
        const {delayFor: delayFor} = this;
        if (this.node.destroyed) {
            this.emit("destroyed", {});
            return;
        }
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
        if (this.progress < 1) {
            this.emit("tick", {
                progress: this.progress
            });
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
        __publicField(this, "stoppedResolve", null);
        __publicField(this, "state");
        this.manager = manager;
        this.animation = animation;
        this.state = "stopped";
        this.stoppedPromise = Promise.resolve();
        this.onAnimating = this.onAnimating.bind(this);
        this.onFinished = this.onFinished.bind(this);
        this.onTick = this.onTick.bind(this);
        this.onDestroy = this.onDestroy.bind(this);
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
        this.animation.on("destroyed", this.onDestroy);
        this.manager.registerAnimation(this.animation);
    }
    unregisterAnimation() {
        this.manager.unregisterAnimation(this.animation);
        this.animation.off("finished", this.onFinished);
        this.animation.off("animating", this.onAnimating);
        this.animation.off("tick", this.onTick);
        this.animation.off("destroy", this.onDestroy);
    }
    makeStoppedPromise() {
        if (this.stoppedResolve === null) {
            this.stoppedPromise = new Promise(resolve => {
                this.stoppedResolve = resolve;
            });
        }
    }
    onDestroy() {
        this.unregisterAnimation();
        this.state = "stopped";
    }
    onFinished() {
        const {loop: loop, stopMethod: stopMethod} = this.animation.settings;
        if (stopMethod === "reverse") {
            this.animation.once("finished", this.onFinished);
            this.animation.reverse();
            return;
        }
        if (loop) {
            return;
        }
        this.unregisterAnimation();
        if (this.stoppedResolve !== null) {
            this.stoppedResolve();
            this.stoppedResolve = null;
        }
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

const bucketSortByZIndex = (nodes, min) => {
    const buckets = [];
    const bucketIndices = [];
    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const index = node.props.zIndex - min;
        if (buckets[index] === void 0) {
            buckets[index] = [];
            bucketIndices.push(index);
        }
        buckets[index].push(node);
    }
    for (let i = 1; i < bucketIndices.length; i++) {
        const key = bucketIndices[i];
        let j = i - 1;
        while (j >= 0 && bucketIndices[j] > key) {
            bucketIndices[j + 1] = bucketIndices[j];
            j--;
        }
        bucketIndices[j + 1] = key;
    }
    let idx = 0;
    for (let i = 0; i < bucketIndices.length; i++) {
        const bucket = buckets[bucketIndices[i]];
        for (let j = 0; j < bucket.length; j++) {
            nodes[idx++] = bucket[j];
        }
    }
    buckets.length = 0;
    bucketIndices.length = 0;
};

const incrementalRepositionByZIndex = (changedNodes, nodes) => {
    for (let i = 0; i < changedNodes.length; i++) {
        const node = changedNodes[i];
        const currentIndex = findChildIndexById(node, nodes);
        if (currentIndex === -1) continue;
        const targetZIndex = node.props.zIndex;
        let left = 0;
        let right = nodes.length;
        while (left < right) {
            const mid = left + right >>> 1;
            if (nodes[mid].props.zIndex <= targetZIndex) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        const targetIndex = left > currentIndex ? left - 1 : left;
        if (targetIndex !== currentIndex) {
            nodes.splice(currentIndex, 1);
            nodes.splice(targetIndex, 0, node);
        }
    }
};

const findChildIndexById = (node, children2) => {
    for (let i = 0; i < children2.length; i++) {
        const child = children2[i];
        if (child._id === node._id) {
            return i;
        }
    }
    return -1;
};

const removeChild = (node, children2) => {
    const index = findChildIndexById(node, children2);
    if (index !== -1) {
        children2.splice(index, 1);
    }
};

var CoreNodeRenderState;

(function(CoreNodeRenderState2) {
    CoreNodeRenderState2[CoreNodeRenderState2["Init"] = 0] = "Init";
    CoreNodeRenderState2[CoreNodeRenderState2["OutOfBounds"] = 2] = "OutOfBounds";
    CoreNodeRenderState2[CoreNodeRenderState2["InBounds"] = 4] = "InBounds";
    CoreNodeRenderState2[CoreNodeRenderState2["InViewport"] = 8] = "InViewport";
})(CoreNodeRenderState || (CoreNodeRenderState = {}));

const NO_CLIPPING_RECT = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    valid: false
};

const CoreNodeRenderStateMap = new Map;

CoreNodeRenderStateMap.set(CoreNodeRenderState.Init, "init");

CoreNodeRenderStateMap.set(CoreNodeRenderState.OutOfBounds, "outOfBounds");

CoreNodeRenderStateMap.set(CoreNodeRenderState.InBounds, "inBounds");

CoreNodeRenderStateMap.set(CoreNodeRenderState.InViewport, "inViewport");

var UpdateType;

(function(UpdateType2) {
    UpdateType2[UpdateType2["Children"] = 1] = "Children";
    UpdateType2[UpdateType2["Local"] = 2] = "Local";
    UpdateType2[UpdateType2["Global"] = 4] = "Global";
    UpdateType2[UpdateType2["Clipping"] = 8] = "Clipping";
    UpdateType2[UpdateType2["SortZIndexChildren"] = 16] = "SortZIndexChildren";
    UpdateType2[UpdateType2["PremultipliedColors"] = 32] = "PremultipliedColors";
    UpdateType2[UpdateType2["WorldAlpha"] = 64] = "WorldAlpha";
    UpdateType2[UpdateType2["RenderState"] = 128] = "RenderState";
    UpdateType2[UpdateType2["IsRenderable"] = 256] = "IsRenderable";
    UpdateType2[UpdateType2["RenderTexture"] = 512] = "RenderTexture";
    UpdateType2[UpdateType2["ParentRenderTexture"] = 1024] = "ParentRenderTexture";
    UpdateType2[UpdateType2["RenderBounds"] = 2048] = "RenderBounds";
    UpdateType2[UpdateType2["RecalcUniforms"] = 4096] = "RecalcUniforms";
    UpdateType2[UpdateType2["None"] = 0] = "None";
    UpdateType2[UpdateType2["All"] = 7167] = "All";
})(UpdateType || (UpdateType = {}));

class CoreNode extends EventEmitter {
    constructor(stage, props2) {
        super();
        __publicField(this, "stage");
        __publicField(this, "children", []);
        __publicField(this, "_id", getNewId());
        __publicField(this, "props");
        __publicField(this, "hasShaderUpdater", false);
        __publicField(this, "hasShaderTimeFn", false);
        __publicField(this, "hasColorProps", false);
        __publicField(this, "zIndexMin", 0);
        __publicField(this, "zIndexMax", 0);
        __publicField(this, "previousZIndex", -1);
        __publicField(this, "zIndexSortList", []);
        __publicField(this, "updateType", UpdateType.All);
        __publicField(this, "childUpdateType", UpdateType.None);
        __publicField(this, "globalTransform");
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
        __publicField(this, "textureCoords");
        __publicField(this, "updateShaderUniforms", false);
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
        __publicField(this, "framebufferDimensions", null);
        __publicField(this, "destroyed", false);
        __publicField(this, "loadTextureTask", () => {
            var _a, _b;
            const texture = this.texture;
            if (this.textureOptions.preload === true) {
                this.stage.txManager.loadTexture(texture);
            }
            texture.preventCleanup = (_b = (_a = this.props.textureOptions) == null ? void 0 : _a.preventCleanup) != null ? _b : false;
            texture.on("loaded", this.onTextureLoaded);
            texture.on("failed", this.onTextureFailed);
            texture.on("freed", this.onTextureFreed);
            if (this.parentHasRenderTexture) {
                this.notifyParentRTTOfUpdate();
                return;
            }
            if (texture.state === "loaded") {
                this.onTextureLoaded(texture, texture.dimensions);
            } else if (texture.state === "failed") {
                this.onTextureFailed(texture, texture.error);
            } else if (texture.state === "freed") {
                this.onTextureFreed(texture);
            }
        });
        __publicField(this, "onTextureLoaded", (_, dimensions) => {
            var _a, _b;
            if (this.autosize === true) {
                this.w = dimensions.w;
                this.h = dimensions.h;
            }
            this.setUpdateType(UpdateType.IsRenderable);
            this.stage.requestRender();
            if (this.parentHasRenderTexture) {
                this.notifyParentRTTOfUpdate();
            }
            if (dimensions.w > 1 && dimensions.h > 1) {
                this.emit("loaded", {
                    type: "texture",
                    dimensions: dimensions
                });
            }
            if (this.stage.calculateTextureCoord === true && this.props.textureOptions !== null) {
                this.textureCoords = this.stage.renderer.getTextureCoords(this);
            }
            if (((_b = (_a = this.props.textureOptions) == null ? void 0 : _a.resizeMode) == null ? void 0 : _b.type) === "contain") {
                this.setUpdateType(UpdateType.Local);
            }
        });
        __publicField(this, "onTextureFailed", (_, error) => {
            this.isRenderable = false;
            this.updateTextureOwnership(false);
            this.setUpdateType(UpdateType.IsRenderable);
            if (this.parentHasRenderTexture) {
                this.notifyParentRTTOfUpdate();
            }
            if (this.texture !== null && this.texture.retryCount > this.texture.maxRetryCount) {
                this.emit("failed", {
                    type: "texture",
                    error: error
                });
            }
        });
        __publicField(this, "onTextureFreed", () => {
            this.isRenderable = false;
            this.updateTextureOwnership(false);
            this.setUpdateType(UpdateType.IsRenderable);
            if (this.parentHasRenderTexture) {
                this.notifyParentRTTOfUpdate();
            }
            this.emit("freed", {
                type: "texture"
            });
        });
        this.stage = stage;
        const p = this.props = {};
        let initialUpdateType = UpdateType.Local | UpdateType.RenderBounds | UpdateType.RenderState;
        p.x = props2.x;
        p.y = props2.y;
        p.w = props2.w;
        p.h = props2.h;
        p.alpha = props2.alpha;
        p.autosize = props2.autosize;
        p.clipping = props2.clipping;
        p.color = props2.color;
        p.colorTop = props2.colorTop;
        p.colorBottom = props2.colorBottom;
        p.colorLeft = props2.colorLeft;
        p.colorRight = props2.colorRight;
        p.colorTl = props2.colorTl;
        p.colorTr = props2.colorTr;
        p.colorBl = props2.colorBl;
        p.colorBr = props2.colorBr;
        if (props2.color > 0 || props2.colorTop > 0 || props2.colorBottom > 0 || props2.colorLeft > 0 || props2.colorRight > 0 || props2.colorTl > 0 || props2.colorTr > 0 || props2.colorBl > 0 || props2.colorBr > 0) {
            this.hasColorProps = true;
            initialUpdateType |= UpdateType.PremultipliedColors;
        }
        p.scaleX = props2.scaleX;
        p.scaleY = props2.scaleY;
        p.rotation = props2.rotation;
        p.pivotX = props2.pivotX;
        p.pivotY = props2.pivotY;
        p.mountX = props2.mountX;
        p.mountY = props2.mountY;
        p.mount = props2.mount;
        p.pivot = props2.pivot;
        p.zIndex = props2.zIndex;
        p.textureOptions = props2.textureOptions;
        p.data = props2.data;
        p.imageType = props2.imageType;
        p.srcX = props2.srcX;
        p.srcY = props2.srcY;
        p.srcWidth = props2.srcWidth;
        p.srcHeight = props2.srcHeight;
        p.parent = props2.parent;
        p.texture = null;
        p.shader = null;
        p.src = null;
        p.rtt = false;
        p.boundsMargin = null;
        if (props2.zIndex !== 0) {
            this.zIndex = props2.zIndex;
        }
        if (props2.parent !== null) {
            props2.parent.addChild(this);
        }
        this.texture = props2.texture;
        this.shader = props2.shader;
        this.src = props2.src;
        this.rtt = props2.rtt;
        this.boundsMargin = props2.boundsMargin;
        this.interactive = props2.interactive;
        this.setUpdateType(initialUpdateType);
        const dt = this.stage.defaultTexture;
        if (dt !== null && dt.state !== "loaded") {
            dt.once("loaded", () => this.setUpdateType(UpdateType.IsRenderable));
        }
    }
    loadTexture() {
        if (this.props.texture === null) {
            return;
        }
        queueMicrotask(this.loadTextureTask);
    }
    unloadTexture() {
        if (this.texture === null) {
            return;
        }
        const texture = this.texture;
        texture.off("loaded", this.onTextureLoaded);
        texture.off("failed", this.onTextureFailed);
        texture.off("freed", this.onTextureFreed);
        texture.setRenderableOwner(this._id, false);
    }
    setUpdateType(type2) {
        this.updateType |= type2;
        const parent = this.props.parent;
        if (!parent) return;
        parent.setUpdateType(UpdateType.Children);
    }
    updateLocalTransform() {
        var _a;
        const p = this.props;
        const {x: x, y: y, w: w, h: h} = p;
        const mountTranslateX = p.mountX * w;
        const mountTranslateY = p.mountY * h;
        if (p.rotation !== 0 || p.scaleX !== 1 || p.scaleY !== 1) {
            const scaleRotate = Matrix3d.rotate(p.rotation).scale(p.scaleX, p.scaleY);
            const pivotTranslateX = p.pivotX * w;
            const pivotTranslateY = p.pivotY * h;
            this.localTransform = Matrix3d.translate(x - mountTranslateX + pivotTranslateX, y - mountTranslateY + pivotTranslateY, this.localTransform).multiply(scaleRotate).translate(-pivotTranslateX, -pivotTranslateY);
        } else {
            this.localTransform = Matrix3d.translate(x - mountTranslateX, y - mountTranslateY, this.localTransform);
        }
        const texture = p.texture;
        if (texture && texture.dimensions && ((_a = p.textureOptions.resizeMode) == null ? void 0 : _a.type) === "contain") {
            let resizeModeScaleX = 1;
            let resizeModeScaleY = 1;
            let extraX = 0;
            let extraY = 0;
            const {w: tw, h: th} = texture.dimensions;
            const txAspectRatio = tw / th;
            const nodeAspectRatio = w / h;
            if (txAspectRatio > nodeAspectRatio) {
                const scaleX = w / tw;
                const scaledTxHeight = th * scaleX;
                extraY = (h - scaledTxHeight) / 2;
                resizeModeScaleY = scaledTxHeight / h;
            } else {
                const scaleY = h / th;
                const scaledTxWidth = tw * scaleY;
                extraX = (w - scaledTxWidth) / 2;
                resizeModeScaleX = scaledTxWidth / w;
            }
            this.localTransform.translate(extraX, extraY).scale(resizeModeScaleX, resizeModeScaleY);
        }
    }
    update(delta, parentClippingRect) {
        var _a;
        const props2 = this.props;
        const parent = props2.parent;
        const parentHasRenderTexture = this.parentHasRenderTexture;
        const hasParent = props2.parent !== null;
        let newRenderState = null;
        let updateType = this.updateType;
        let childUpdateType = this.childUpdateType;
        let updateParent = false;
        this.updateType = 0;
        this.childUpdateType = 0;
        if (updateType & UpdateType.Local) {
            this.updateLocalTransform();
            updateType |= UpdateType.Global;
            updateParent = hasParent;
        }
        if (updateType & UpdateType.RenderTexture && this.rtt === true) {
            this.hasRTTupdates = true;
        }
        if (updateType & UpdateType.Global) {
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
            updateType |= UpdateType.RenderState | UpdateType.Children | UpdateType.RecalcUniforms;
            updateParent = hasParent;
            childUpdateType |= UpdateType.Global;
            if (this.clipping === true) {
                updateType |= UpdateType.Clipping | UpdateType.RenderBounds;
                updateParent = hasParent;
                childUpdateType |= UpdateType.RenderBounds;
            }
        }
        if (updateType & UpdateType.RenderBounds) {
            this.createRenderBounds();
            updateType |= UpdateType.RenderState | UpdateType.Children;
            updateParent = hasParent;
            childUpdateType |= UpdateType.RenderBounds;
        }
        if (updateType & UpdateType.RenderState) {
            newRenderState = this.checkRenderBounds();
            updateType |= UpdateType.IsRenderable;
            updateParent = hasParent;
            if (newRenderState !== CoreNodeRenderState.OutOfBounds) {
                this.updateRenderState(newRenderState);
            }
        }
        if (updateType & UpdateType.WorldAlpha) {
            this.worldAlpha = ((_a = parent == null ? void 0 : parent.worldAlpha) != null ? _a : 1) * this.props.alpha;
            updateType |= UpdateType.PremultipliedColors | UpdateType.Children | UpdateType.IsRenderable;
            updateParent = hasParent;
            childUpdateType |= UpdateType.WorldAlpha;
        }
        if (updateType & UpdateType.IsRenderable) {
            this.updateIsRenderable();
        }
        if (updateType & UpdateType.Clipping) {
            this.calculateClippingRect(parentClippingRect);
            updateType |= UpdateType.Children;
            updateParent = hasParent;
            childUpdateType |= UpdateType.Clipping | UpdateType.RenderBounds;
        }
        if (updateType & UpdateType.PremultipliedColors) {
            const alpha = this.worldAlpha;
            const tl = props2.colorTl;
            const tr = props2.colorTr;
            const bl = props2.colorBl;
            const br = props2.colorBr;
            const same = tl === tr && tl === bl && tl === br;
            const merged = mergeColorAlphaPremultiplied(tl, alpha, true);
            this.premultipliedColorTl = merged;
            if (same === true) {
                this.premultipliedColorTr = this.premultipliedColorBl = this.premultipliedColorBr = merged;
            } else {
                this.premultipliedColorTr = mergeColorAlphaPremultiplied(tr, alpha, true);
                this.premultipliedColorBl = mergeColorAlphaPremultiplied(bl, alpha, true);
                this.premultipliedColorBr = mergeColorAlphaPremultiplied(br, alpha, true);
            }
        }
        if (this.renderState === CoreNodeRenderState.OutOfBounds) {
            this.updateType = updateType;
            this.childUpdateType = childUpdateType;
            return;
        }
        if (updateParent === true) {
            parent.setUpdateType(UpdateType.Children);
        }
        if (updateType & UpdateType.RecalcUniforms && this.hasShaderUpdater === true) {
            this.updateShaderUniforms = true;
        }
        if (this.isRenderable === true && this.updateShaderUniforms === true) {
            this.updateShaderUniforms = false;
            this.shader.update();
        }
        if (updateType & UpdateType.Children && this.children.length > 0) {
            let childClippingRect = this.clippingRect;
            if (this.rtt === true) {
                childClippingRect = NO_CLIPPING_RECT;
            }
            for (let i = 0, length = this.children.length; i < length; i++) {
                const child = this.children[i];
                if (childUpdateType !== 0) {
                    child.setUpdateType(childUpdateType);
                }
                if (child.updateType === 0) {
                    continue;
                }
                child.update(delta, childClippingRect);
            }
        }
        if (parentHasRenderTexture === true) {
            this.notifyParentRTTOfUpdate();
        }
        if (updateType & UpdateType.SortZIndexChildren) {
            this.sortChildren();
        }
        if (newRenderState === CoreNodeRenderState.OutOfBounds) {
            this.updateRenderState(newRenderState);
            this.updateIsRenderable();
            if (this.rtt === true && newRenderState === CoreNodeRenderState.OutOfBounds) {
                this.notifyChildrenRTTOfUpdate(newRenderState);
            }
        }
    }
    findParentRTTNode() {
        let rttNode = this.parent;
        while (rttNode && !rttNode.rtt) {
            rttNode = rttNode.parent;
        }
        return rttNode;
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
        if (boundInsideBound(this.renderBound, this.strictBound)) {
            return CoreNodeRenderState.InViewport;
        }
        if (boundInsideBound(this.renderBound, this.preloadBound)) {
            return CoreNodeRenderState.InBounds;
        }
        if (boundLargeThanBound(this.renderBound, this.strictBound)) {
            return CoreNodeRenderState.InViewport;
        }
        if (this.parent !== null && (this.props.w === 0 || this.props.h === 0)) {
            return this.parent.renderState;
        }
        return CoreNodeRenderState.OutOfBounds;
    }
    updateBoundingRect() {
        const transform = this.sceneGlobalTransform || this.globalTransform;
        const renderCoords = this.sceneRenderCoords || this.renderCoords;
        if (transform.tb === 0 || transform.tc === 0) {
            this.renderBound = createBound(renderCoords.x1, renderCoords.y1, renderCoords.x3, renderCoords.y3, this.renderBound);
        } else {
            const {x1: x1, y1: y1, x2: x2, y2: y2, x3: x3, y3: y3, x4: x4, y4: y4} = renderCoords;
            this.renderBound = createBound(Math.min(x1, x2, x3, x4), Math.min(y1, y2, y3, y4), Math.max(x1, x2, x3, x4), Math.max(y1, y2, y3, y4), this.renderBound);
        }
    }
    createRenderBounds() {
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
        const {x: x, y: y, w: w, h: h} = this.props;
        const {tx: tx, ty: ty} = this.sceneGlobalTransform || this.globalTransform || {};
        const _x = tx != null ? tx : x;
        const _y = ty != null ? ty : y;
        this.strictBound = createBound(_x, _y, _x + w, _y + h, this.strictBound);
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
            previous: previous,
            current: renderState
        });
    }
    checkBasicRenderability() {
        if (this.worldAlpha === 0 || this.isOutOfBounds() === true) {
            return false;
        } else {
            return true;
        }
    }
    updateIsRenderable() {
        let newIsRenderable = false;
        let needsTextureOwnership = false;
        if (this.checkBasicRenderability() === false) {
            this.updateTextureOwnership(false);
            this.setRenderable(false);
            return;
        }
        if (this.texture !== null) {
            if (this.texture.retryCount > this.texture.maxRetryCount) {
                this.updateTextureOwnership(false);
                this.setRenderable(false);
                return;
            }
            needsTextureOwnership = true;
            newIsRenderable = this.texture.state === "loaded";
        } else if ((this.props.shader !== null || this.hasColorProps === true) && this.hasDimensions() === true) {
            if (this.stage.defaultTexture && this.stage.defaultTexture.state === "loaded") {
                newIsRenderable = true;
            }
        }
        this.updateTextureOwnership(needsTextureOwnership);
        this.setRenderable(newIsRenderable);
    }
    setRenderable(isRenderable) {
        const previousIsRenderable = this.isRenderable;
        this.isRenderable = isRenderable;
        if (previousIsRenderable !== isRenderable) {
            this.emit("renderable", {
                type: "renderable",
                isRenderable: isRenderable
            });
        }
    }
    updateTextureOwnership(isRenderable) {
        var _a;
        (_a = this.texture) == null ? void 0 : _a.setRenderableOwner(this._id, isRenderable);
    }
    isOutOfBounds() {
        return this.renderState <= CoreNodeRenderState.OutOfBounds;
    }
    hasDimensions() {
        return this.props.w !== 0 && this.props.h !== 0;
    }
    calculateRenderCoords() {
        const {w: w, h: h} = this.props;
        const g = this.globalTransform;
        const tx = g.tx, ty = g.ty, ta = g.ta, tb = g.tb, tc = g.tc, td = g.td;
        if (tb === 0 && tc === 0) {
            const minX = tx;
            const maxX = tx + w * ta;
            const minY = ty;
            const maxY = ty + h * td;
            this.renderCoords = RenderCoords.translate(minX, minY, maxX, minY, maxX, maxY, minX, maxY, this.renderCoords);
        } else {
            this.renderCoords = RenderCoords.translate(tx, ty, tx + w * ta, ty + w * tc, tx + w * ta + h * tb, ty + w * tc + h * td, tx + h * tb, ty + h * td, this.renderCoords);
        }
        if (this.sceneGlobalTransform === void 0) {
            return;
        }
        const {tx: stx, ty: sty, ta: sta, tb: stb, tc: stc, td: std} = this.sceneGlobalTransform;
        if (stb === 0 && stc === 0) {
            const minX = stx;
            const maxX = stx + w * sta;
            const minY = sty;
            const maxY = sty + h * std;
            this.sceneRenderCoords = RenderCoords.translate(minX, minY, maxX, minY, maxX, maxY, minX, maxY, this.sceneRenderCoords);
        } else {
            this.sceneRenderCoords = RenderCoords.translate(stx, sty, stx + w * sta, sty + w * stc, stx + w * sta + h * stb, sty + w * stc + h * std, stx + h * stb, sty + h * std, this.sceneRenderCoords);
        }
    }
    calculateClippingRect(parentClippingRect) {
        const {clippingRect: clippingRect, props: props2, globalTransform: gt} = this;
        const {clipping: clipping} = props2;
        const isRotated = gt.tb !== 0 || gt.tc !== 0;
        if (clipping === true && isRotated === false) {
            clippingRect.x = gt.tx;
            clippingRect.y = gt.ty;
            clippingRect.width = this.props.w * gt.ta;
            clippingRect.height = this.props.h * gt.td;
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
    destroy() {
        if (this.destroyed === true) {
            return;
        }
        this.removeAllListeners();
        this.destroyed = true;
        this.unloadTexture();
        this.isRenderable = false;
        if (this.hasShaderTimeFn === true) {
            this.stage.untrackTimedNode(this);
        }
        while (this.children.length > 0) {
            this.children[0].destroy();
        }
        const parent = this.parent;
        if (parent !== null) {
            parent.removeChild(this);
        }
        this.props.parent = null;
        this.props.texture = null;
        if (this.rtt === true) {
            this.stage.renderer.removeRTTNode(this);
        }
        this.stage.requestRender();
    }
    renderQuads(renderer2) {
        if (this.parentHasRenderTexture === true) {
            const rtt = renderer2.renderToTextureActive;
            if (rtt === false || this.parentRenderTexture !== renderer2.activeRttNode) return;
        }
        const p = this.props;
        const t = this.globalTransform;
        const coords = this.renderCoords;
        const texture = p.texture || this.stage.defaultTexture;
        const textureCoords = this.textureCoords || this.stage.renderer.defaultTextureCoords;
        if (texture && texture.state !== "loaded") {
            return;
        }
        renderer2.addQuad({
            width: p.w,
            height: p.h,
            colorTl: this.premultipliedColorTl,
            colorTr: this.premultipliedColorTr,
            colorBl: this.premultipliedColorBl,
            colorBr: this.premultipliedColorBr,
            texture: texture,
            textureOptions: p.textureOptions,
            textureCoords: textureCoords,
            shader: p.shader,
            alpha: this.worldAlpha,
            clippingRect: this.clippingRect,
            tx: t.tx,
            ty: t.ty,
            ta: t.ta,
            tb: t.tb,
            tc: t.tc,
            td: t.td,
            renderCoords: coords,
            rtt: p.rtt,
            zIndex: this.calcZIndex,
            parentHasRenderTexture: this.parentHasRenderTexture,
            framebufferDimensions: this.parentHasRenderTexture ? this.parentFramebufferDimensions : null,
            time: this.hasShaderTimeFn === true ? this.getTimerValue() : null
        });
    }
    getTimerValue() {
        if (typeof this.shader.time === "function") {
            return this.shader.time(this.stage);
        }
        return this.stage.elapsedTime;
    }
    sortChildren() {
        const changedCount = this.zIndexSortList.length;
        if (changedCount === 0) {
            return;
        }
        const children2 = this.children;
        let min = Infinity;
        let max = -Infinity;
        for (let i = 0; i < children2.length; i++) {
            const zIndex = children2[i].props.zIndex;
            if (zIndex < min) {
                min = zIndex;
            }
            if (zIndex > max) {
                max = zIndex;
            }
        }
        this.zIndexMin = min;
        this.zIndexMax = max;
        if (min === max) {
            return;
        }
        const n = children2.length;
        const useIncremental = changedCount <= 2 || changedCount < n * .05;
        if (useIncremental === true) {
            incrementalRepositionByZIndex(this.zIndexSortList, children2);
        } else {
            bucketSortByZIndex(children2, min);
        }
        this.zIndexSortList.length = 0;
        this.zIndexSortList = [];
    }
    removeChild(node, targetParent = null) {
        if (targetParent === null && this.props.rtt === true && this.parentHasRenderTexture === true) {
            node.clearRTTInheritance();
        }
        removeChild(node, this.children);
    }
    addChild(node, previousParent = null) {
        const inRttCluster = this.props.rtt === true || this.parentHasRenderTexture === true;
        const children2 = this.children;
        const min = this.zIndexMin;
        const max = this.zIndexMax;
        const zIndex = node.zIndex;
        node.parentHasRenderTexture = inRttCluster;
        if (previousParent !== null) {
            const previousParentInRttCluster = previousParent.props.rtt === true || previousParent.parentHasRenderTexture === true;
            if (inRttCluster === false && previousParentInRttCluster === true) {
                node.clearRTTInheritance();
            }
        }
        if (inRttCluster === true) {
            node.markChildrenWithRTT(this);
        }
        children2.push(node);
        if (min !== max || zIndex !== min && zIndex !== max) {
            this.zIndexSortList.push(node);
            this.setUpdateType(UpdateType.SortZIndexChildren);
        }
        this.setUpdateType(UpdateType.Children);
    }
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
        var _a, _b, _c;
        return this.props.x + -this.props.w * this.props.mountX + (((_a = this.props.parent) == null ? void 0 : _a.absX) || ((_c = (_b = this.props.parent) == null ? void 0 : _b.globalTransform) == null ? void 0 : _c.tx) || 0);
    }
    get absY() {
        var _a, _b;
        return this.props.y + -this.props.h * this.props.mountY + ((_b = (_a = this.props.parent) == null ? void 0 : _a.absY) != null ? _b : 0);
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
    get w() {
        return this.props.w;
    }
    set w(value) {
        if (this.props.w !== value) {
            this.props.w = value;
            this.setUpdateType(UpdateType.Local);
            if (this.props.rtt === true) {
                this.framebufferDimensions.w = value;
                this.texture = this.stage.txManager.createTexture("RenderTexture", this.framebufferDimensions);
                this.setUpdateType(UpdateType.RenderTexture);
            }
        }
    }
    get h() {
        return this.props.h;
    }
    set h(value) {
        if (this.props.h !== value) {
            this.props.h = value;
            this.setUpdateType(UpdateType.Local);
            if (this.props.rtt === true) {
                this.framebufferDimensions.h = value;
                this.texture = this.stage.txManager.createTexture("RenderTexture", this.framebufferDimensions);
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
            this.setUpdateType(UpdateType.Local);
        }
    }
    get scaleY() {
        return this.props.scaleY;
    }
    set scaleY(value) {
        if (this.props.scaleY !== value) {
            this.props.scaleY = value;
            this.setUpdateType(UpdateType.Local);
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
            this.setUpdateType(UpdateType.Local);
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
        const props2 = this.props;
        if (props2.boundsMargin !== null) {
            return props2.boundsMargin;
        }
        const parent = this.parent;
        if (parent !== null) {
            const margin = parent.boundsMargin;
            if (margin !== void 0) {
                return margin;
            }
        }
        return this.stage.boundsMargin;
    }
    set boundsMargin(value) {
        if (value === this.props.boundsMargin) {
            return;
        }
        if (value === null) {
            this.props.boundsMargin = value;
        } else {
            const bm = Array.isArray(value) ? value : [ value, value, value, value ];
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
        const p = this.props;
        if (p.color === value) return;
        p.color = value;
        const has = value > 0;
        this.hasColorProps = has;
        if (p.colorTop !== value) this.colorTop = value;
        if (p.colorBottom !== value) this.colorBottom = value;
        if (p.colorLeft !== value) this.colorLeft = value;
        if (p.colorRight !== value) this.colorRight = value;
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
        this.hasColorProps = value > 0;
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
        this.hasColorProps = value > 0;
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
        this.hasColorProps = value > 0;
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
        this.hasColorProps = value > 0;
        this.setUpdateType(UpdateType.PremultipliedColors);
    }
    get colorTl() {
        return this.props.colorTl;
    }
    set colorTl(value) {
        this.props.colorTl = value;
        this.hasColorProps = value > 0;
        this.setUpdateType(UpdateType.PremultipliedColors);
    }
    get colorTr() {
        return this.props.colorTr;
    }
    set colorTr(value) {
        this.props.colorTr = value;
        this.hasColorProps = value > 0;
        this.setUpdateType(UpdateType.PremultipliedColors);
    }
    get colorBl() {
        return this.props.colorBl;
    }
    set colorBl(value) {
        this.props.colorBl = value;
        this.hasColorProps = value > 0;
        this.setUpdateType(UpdateType.PremultipliedColors);
    }
    get colorBr() {
        return this.props.colorBr;
    }
    set colorBr(value) {
        this.props.colorBr = value;
        this.hasColorProps = value > 0;
        this.setUpdateType(UpdateType.PremultipliedColors);
    }
    get zIndex() {
        return this.props.zIndex;
    }
    set zIndex(value) {
        let sanitizedValue = value;
        if (isNaN(sanitizedValue) || Number.isFinite(sanitizedValue) === false) {
            console.warn("zIndex was set to an invalid value: ".concat(value, ", defaulting to 0"));
            sanitizedValue = 0;
        }
        if (sanitizedValue > Number.MAX_SAFE_INTEGER) {
            sanitizedValue = 1e3;
        } else if (sanitizedValue < Number.MIN_SAFE_INTEGER) {
            sanitizedValue = -1e3;
        }
        if (this.props.zIndex === sanitizedValue) {
            return;
        }
        this.previousZIndex = this.props.zIndex;
        this.props.zIndex = sanitizedValue;
        const parent = this.parent;
        if (parent !== null) {
            const min = parent.zIndexMin;
            const max = parent.zIndexMax;
            if (min !== max || sanitizedValue < min || sanitizedValue > max) {
                parent.zIndexSortList.push(this);
                parent.setUpdateType(UpdateType.SortZIndexChildren);
            }
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
            oldParent.removeChild(this, newParent);
        }
        if (newParent !== null) {
            newParent.addChild(this, oldParent);
        }
        this.setUpdateType(UpdateType.Global | UpdateType.RenderBounds);
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
        this.framebufferDimensions = {
            w: this.props.w,
            h: this.props.h
        };
        this.texture = this.stage.txManager.createTexture("RenderTexture", this.framebufferDimensions);
        this.stage.renderer.renderToTexture(this);
    }
    cleanupRenderTexture() {
        this.unloadTexture();
        this.clearRTTInheritance();
        this.hasRTTupdates = false;
        this.texture = null;
        this.framebufferDimensions = null;
    }
    markChildrenWithRTT(node = null) {
        const parent = node || this;
        for (const child of parent.children) {
            child.setUpdateType(UpdateType.All);
            child.parentHasRenderTexture = true;
            child.markChildrenWithRTT();
        }
    }
    applyRTTInheritance(parent) {
        if (parent.rtt) {
            parent.setUpdateType(UpdateType.RenderTexture);
        }
        this.markChildrenWithRTT(parent);
    }
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
    set shader(shader) {
        if (this.props.shader === shader) {
            return;
        }
        if (shader === null) {
            this.hasShaderUpdater = false;
            this.props.shader = this.stage.defShaderNode;
            this.setUpdateType(UpdateType.IsRenderable);
            return;
        }
        if (shader.shaderKey !== "default") {
            this.hasShaderUpdater = shader.update !== void 0;
            this.hasShaderTimeFn = shader.time !== void 0;
            shader.attachNode(this);
        }
        if (this.hasShaderTimeFn === true) {
            this.stage.trackTimedNode(this);
        } else {
            this.stage.untrackTimedNode(this);
        }
        this.props.shader = shader;
        this.setUpdateType(UpdateType.IsRenderable | UpdateType.RecalcUniforms);
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
            w: this.props.w,
            h: this.props.h,
            type: this.props.imageType,
            sx: this.props.srcX,
            sy: this.props.srcY,
            sw: this.props.srcWidth,
            sh: this.props.srcHeight
        });
    }
    set imageType(type2) {
        if (this.props.imageType === type2) {
            return;
        }
        this.props.imageType = type2;
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
    get parentFramebufferDimensions() {
        if (this.rttParent !== null) {
            return this.rttParent.framebufferDimensions;
        }
        this.rttParent = this.findParentRTTNode();
        return this.rttParent.framebufferDimensions;
    }
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
            this.unloadTexture();
        }
        this.textureCoords = void 0;
        this.props.texture = value;
        if (value !== null) {
            value.setRenderableOwner(this._id, this.isRenderable);
            this.loadTexture();
        }
        this.setUpdateType(UpdateType.IsRenderable);
    }
    set textureOptions(value) {
        this.props.textureOptions = value;
        if (this.stage.calculateTextureCoord === true && value !== null) {
            this.textureCoords = this.stage.renderer.getTextureCoords(this);
        }
    }
    get textureOptions() {
        return this.props.textureOptions;
    }
    set interactive(value) {
        this.props.interactive = value;
        if (value === true) {
            this.stage.interactiveNodes.add(this);
        }
    }
    get interactive() {
        return this.props.interactive;
    }
    setRTTUpdates(type2) {
        var _a;
        this.hasRTTupdates = true;
        (_a = this.parent) == null ? void 0 : _a.setRTTUpdates(type2);
    }
    animate(props2, settings) {
        const animation = new CoreAnimation(this, props2, settings);
        const controller = new CoreAnimationController(this.stage.animationManager, animation);
        return controller;
    }
    flush() {}
}

class AnimationManager {
    constructor() {
        __publicField(this, "activeAnimations", new Set);
    }
    registerAnimation(animation) {
        this.activeAnimations.add(animation);
    }
    unregisterAnimation(animation) {
        this.activeAnimations.delete(animation);
    }
    update(dt) {
        this.activeAnimations.forEach(animation => {
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
            var xhr = new XMLHttpRequest;
            xhr.open("GET", src, true);
            xhr.responseType = "blob";
            xhr.onload = function() {
                if (xhr.status !== 200 && xhr.status !== 0) {
                    return reject(new Error("Image loading failed. HTTP status code: ".concat(xhr.status || "N/A", ". URL: ").concat(src)));
                }
                var blob = xhr.response;
                premultiplyAlpha !== void 0 ? premultiplyAlpha : hasAlphaChannel(blob.type);
                {
                    createImageBitmap(blob).then(function(data) {
                        resolve({
                            data: data,
                            premultiplyAlpha: premultiplyAlpha
                        });
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
    self.onmessage = event => {
        var src = event.data.src;
        var id = event.data.id;
        var premultiplyAlpha = event.data.premultiplyAlpha;
        event.data.sx;
        event.data.sy;
        event.data.sw;
        event.data.sh;
        getImage(src, premultiplyAlpha).then(function(data) {
            self.postMessage({
                id: id,
                src: src,
                data: data
            }, [ data.data ]);
        }).catch(function(error) {
            self.postMessage({
                id: id,
                src: src,
                error: error.message
            });
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
        this.workers.forEach(worker => {
            worker.onmessage = this.handleMessage.bind(this);
        });
    }
    handleMessage(event) {
        const {id: id, data: data, error: error} = event.data;
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
        const blob = new Blob([ workerCode ], {
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
                    this.messageManager[id] = [ resolve, reject ];
                    const nextWorker = this.getNextWorker();
                    if (nextWorker) {
                        nextWorker.postMessage({
                            id: id,
                            src: src,
                            premultiplyAlpha: premultiplyAlpha,
                            sx: sx,
                            sy: sy,
                            sw: sw,
                            sh: sh
                        });
                    }
                }
            } catch (error) {
                reject(error);
            }
        });
    }
}

class ColorTexture extends Texture {
    constructor(txManager, props2) {
        super(txManager);
        __publicField(this, "type", TextureType.color);
        __publicField(this, "props");
        this.props = props2;
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
        this.setState("fetched", {
            w: 1,
            h: 1
        });
        return {
            data: pixelData,
            premultiplyAlpha: true
        };
    }
    static makeCacheKey(props2) {
        return "ColorTexture,".concat(props2.color);
    }
    static resolveDefaults(props2) {
        return {
            color: props2.color || 4294967295
        };
    }
}

__publicField(ColorTexture, "z$__type__Props");

function isCompressedTextureContainer(src) {
    return /\.(ktx|pvr)$/.test(src);
}

const PVR_MAGIC = 55727696;

const PVR_TO_GL_INTERNAL_FORMAT = {
    0: 35841,
    1: 35843,
    2: 35840,
    3: 35842,
    6: 36196,
    7: 33776,
    8: 33778,
    9: 33778,
    10: 33779,
    11: 33779
};

const ASTC_MAGIC = 1554098963;

const ASTC_TO_GL_INTERNAL_FORMAT = {
    "4x4": 37808,
    "5x5": 37809,
    "6x6": 37810,
    "8x8": 37811,
    "10x10": 37812,
    "12x12": 37813
};

const KTX_IDENTIFIER = [ 171, 75, 84, 88, 32, 49, 49, 187, 13, 10, 26, 10 ];

const loadCompressedTexture = async url => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch compressed texture: ".concat(response.status, " ").concat(response.statusText));
        }
        const arrayBuffer = await response.arrayBuffer();
        if (arrayBuffer.byteLength < 16) {
            throw new Error("File too small to be a valid compressed texture (".concat(arrayBuffer.byteLength, " bytes). Expected at least 16 bytes for header inspection."));
        }
        const view = new DataView(arrayBuffer);
        const magic = view.getUint32(0, true);
        if (magic === PVR_MAGIC) {
            return loadPVR(view);
        }
        if (magic === ASTC_MAGIC) {
            return loadASTC(view);
        }
        let isKTX = true;
        for (let i = 0; i < KTX_IDENTIFIER.length; i++) {
            if (view.getUint8(i) !== KTX_IDENTIFIER[i]) {
                isKTX = false;
                break;
            }
        }
        if (isKTX === true) {
            return loadKTX(view);
        } else {
            throw new Error("Unrecognized compressed texture format");
        }
    } catch (error) {
        throw new Error("Failed to load compressed texture from ".concat(url, ": ").concat(error));
    }
};

function readUint24(view, offset) {
    return view.getUint8(offset) + (view.getUint8(offset + 1) << 8) + (view.getUint8(offset + 2) << 16);
}

const loadASTC = async function(view) {
    const blockX = view.getUint8(4);
    const blockY = view.getUint8(5);
    const sizeX = readUint24(view, 7);
    const sizeY = readUint24(view, 10);
    if (sizeX === 0 || sizeY === 0) {
        throw new Error("Invalid ASTC texture dimensions: ".concat(sizeX, "x").concat(sizeY));
    }
    const expected = Math.ceil(sizeX / blockX) * Math.ceil(sizeY / blockY) * 16;
    const dataSize = view.byteLength - 16;
    if (expected !== dataSize) {
        throw new Error("Invalid ASTC texture data size: expected ".concat(expected, ", got ").concat(dataSize));
    }
    const internalFormat = ASTC_TO_GL_INTERNAL_FORMAT["".concat(blockX, "x").concat(blockY)];
    if (internalFormat === void 0) {
        throw new Error("Unsupported ASTC block size: ".concat(blockX, "x").concat(blockY));
    }
    const buffer = view.buffer;
    const mipmaps = [];
    mipmaps.push(buffer.slice(16));
    return {
        data: {
            blockInfo: blockInfoMap[internalFormat],
            glInternalFormat: internalFormat,
            mipmaps: mipmaps,
            w: sizeX,
            h: sizeY,
            type: "astc"
        },
        premultiplyAlpha: false
    };
};

const uploadASTC = function(glw, texture, data) {
    if (glw.getExtension("WEBGL_compressed_texture_astc") === null) {
        throw new Error("ASTC compressed textures not supported by this device");
    }
    glw.bindTexture(texture);
    const {glInternalFormat: glInternalFormat, mipmaps: mipmaps, w: w, h: h} = data;
    if (mipmaps === void 0) {
        return;
    }
    const view = new Uint8Array(mipmaps[0]);
    glw.compressedTexImage2D(0, glInternalFormat, w, h, 0, view);
    glw.texParameteri(glw.TEXTURE_WRAP_S, glw.CLAMP_TO_EDGE);
    glw.texParameteri(glw.TEXTURE_WRAP_T, glw.CLAMP_TO_EDGE);
    glw.texParameteri(glw.TEXTURE_MAG_FILTER, glw.LINEAR);
    glw.texParameteri(glw.TEXTURE_MIN_FILTER, glw.LINEAR);
};

const loadKTX = async function(view) {
    const endianness = view.getUint32(12, true);
    const littleEndian = endianness === 67305985;
    if (littleEndian === false && endianness !== 16909060) {
        throw new Error("Invalid KTX endianness value");
    }
    const glType = view.getUint32(16, littleEndian);
    const glFormat = view.getUint32(24, littleEndian);
    if (glType !== 0 || glFormat !== 0) {
        throw new Error("KTX texture is not compressed (glType: ".concat(glType, ", glFormat: ").concat(glFormat, ")"));
    }
    const glInternalFormat = view.getUint32(28, littleEndian);
    if (blockInfoMap[glInternalFormat] === void 0) {
        throw new Error("Unsupported KTX compressed texture format: 0x".concat(glInternalFormat.toString(16)));
    }
    const width = view.getUint32(36, littleEndian);
    const height = view.getUint32(40, littleEndian);
    if (width === 0 || height === 0) {
        throw new Error("Invalid KTX texture dimensions: ".concat(width, "x").concat(height));
    }
    const mipmapLevels = view.getUint32(56, littleEndian);
    if (mipmapLevels === 0) {
        throw new Error("KTX texture has no mipmap levels");
    }
    const bytesOfKeyValueData = view.getUint32(60, littleEndian);
    const mipmaps = [];
    const buffer = view.buffer;
    let offset = 64 + bytesOfKeyValueData;
    if (offset > view.byteLength) {
        throw new Error("Invalid KTX file: key/value data exceeds file size");
    }
    for (let i = 0; i < mipmapLevels; i++) {
        const imageSize = view.getUint32(offset, littleEndian);
        offset += 4;
        const end = offset + imageSize;
        mipmaps.push(buffer.slice(offset, end));
        offset = end;
        if (offset % 4 !== 0) {
            offset += 4 - offset % 4;
        }
    }
    return {
        data: {
            blockInfo: blockInfoMap[glInternalFormat],
            glInternalFormat: glInternalFormat,
            mipmaps: mipmaps,
            w: width,
            h: height,
            type: "ktx"
        },
        premultiplyAlpha: false
    };
};

const uploadKTX = function(glw, texture, data) {
    const {glInternalFormat: glInternalFormat, mipmaps: mipmaps, w: width, h: height, blockInfo: blockInfo} = data;
    if (mipmaps === void 0) {
        return;
    }
    glw.bindTexture(texture);
    const blockWidth2 = blockInfo.width;
    const blockHeight = blockInfo.height;
    let w = width;
    let h = height;
    for (let i = 0; i < mipmaps.length; i++) {
        let view = new Uint8Array(mipmaps[i]);
        const uploadW = Math.ceil(w / blockWidth2) * blockWidth2;
        const uploadH = Math.ceil(h / blockHeight) * blockHeight;
        const expectedBytes = Math.ceil(w / blockWidth2) * Math.ceil(h / blockHeight) * blockInfo.bytes;
        if (view.byteLength < expectedBytes) {
            const padded = new Uint8Array(expectedBytes);
            padded.set(view);
            view = padded;
        }
        glw.compressedTexImage2D(i, glInternalFormat, uploadW, uploadH, 0, view);
        w = Math.max(1, w >> 1);
        h = Math.max(1, h >> 1);
    }
    glw.texParameteri(glw.TEXTURE_WRAP_S, glw.CLAMP_TO_EDGE);
    glw.texParameteri(glw.TEXTURE_WRAP_T, glw.CLAMP_TO_EDGE);
    glw.texParameteri(glw.TEXTURE_MAG_FILTER, glw.LINEAR);
    glw.texParameteri(glw.TEXTURE_MIN_FILTER, mipmaps.length > 1 ? glw.LINEAR_MIPMAP_LINEAR : glw.LINEAR);
};

function pvrtcMipSize(width, height, bpp) {
    const minW = bpp === 2 ? 16 : 8;
    const minH = 8;
    const w = Math.max(width, minW);
    const h = Math.max(height, minH);
    return w * h * bpp / 8;
}

const loadPVR = async function(view) {
    const pixelFormatLow = view.getUint32(8, true);
    const internalFormat = PVR_TO_GL_INTERNAL_FORMAT[pixelFormatLow];
    if (internalFormat === void 0) {
        throw new Error("Unsupported PVR pixel format: 0x".concat(pixelFormatLow.toString(16)));
    }
    const height = view.getInt32(24, true);
    const width = view.getInt32(28, true);
    if (width === 0 || height === 0) {
        throw new Error("Invalid PVR texture dimensions: ".concat(width, "x").concat(height));
    }
    const mipmapLevels = view.getInt32(44, true);
    const metadataSize = view.getUint32(48, true);
    const buffer = view.buffer;
    let offset = 52 + metadataSize;
    if (offset > buffer.byteLength) {
        throw new Error("Invalid PVR file: metadata exceeds file size");
    }
    const mipmaps = [];
    const block = blockInfoMap[internalFormat];
    for (let i = 0; i < mipmapLevels; i++) {
        const declaredSize = view.getUint32(offset, true);
        const max = buffer.byteLength - (offset + 4);
        if (declaredSize > 0 && declaredSize <= max) {
            offset += 4;
            const start = offset;
            const end = offset + declaredSize;
            mipmaps.push(buffer.slice(start, end));
            offset = end;
            offset = offset + 3 & -4;
            continue;
        }
        if (pixelFormatLow === 0 || pixelFormatLow === 1 || pixelFormatLow === 2 || pixelFormatLow === 3) {
            const bpp = pixelFormatLow === 0 || pixelFormatLow === 1 ? 2 : 4;
            const computed = pvrtcMipSize(width >> i, height >> i, bpp);
            mipmaps.push(buffer.slice(offset, offset + computed));
            offset += computed;
            offset = offset + 3 & -4;
            continue;
        }
        if (block !== void 0) {
            const blockW = Math.ceil((width >> i) / block.width);
            const blockH = Math.ceil((height >> i) / block.height);
            const computed = blockW * blockH * block.bytes;
            mipmaps.push(buffer.slice(offset, offset + computed));
            offset += computed;
            offset = offset + 3 & -4;
        }
    }
    return {
        data: {
            blockInfo: blockInfoMap[internalFormat],
            glInternalFormat: internalFormat,
            mipmaps: mipmaps,
            w: width,
            h: height,
            type: "pvr"
        },
        premultiplyAlpha: false
    };
};

const uploadPVR = function(glw, texture, data) {
    const {glInternalFormat: glInternalFormat, mipmaps: mipmaps, w: width, h: height} = data;
    if (mipmaps === void 0) {
        return;
    }
    glw.bindTexture(texture);
    let w = width;
    let h = height;
    for (let i = 0; i < mipmaps.length; i++) {
        glw.compressedTexImage2D(i, glInternalFormat, w, h, 0, new Uint8Array(mipmaps[i]));
        w = Math.max(1, w >> 1);
        h = Math.max(1, h >> 1);
    }
    glw.texParameteri(glw.TEXTURE_WRAP_S, glw.CLAMP_TO_EDGE);
    glw.texParameteri(glw.TEXTURE_WRAP_T, glw.CLAMP_TO_EDGE);
    glw.texParameteri(glw.TEXTURE_MAG_FILTER, glw.LINEAR);
    glw.texParameteri(glw.TEXTURE_MIN_FILTER, mipmaps.length > 1 ? glw.LINEAR_MIPMAP_LINEAR : glw.LINEAR);
};

const BLOCK_4x4x8 = {
    width: 4,
    height: 4,
    bytes: 8
};

const BLOCK_4x4x16 = {
    width: 4,
    height: 4,
    bytes: 16
};

const BLOCK_5x5x16 = {
    width: 5,
    height: 5,
    bytes: 16
};

const BLOCK_6x6x16 = {
    width: 6,
    height: 6,
    bytes: 16
};

const BLOCK_8x4x8 = {
    width: 8,
    height: 4,
    bytes: 8
};

const BLOCK_8x8x16 = {
    width: 8,
    height: 8,
    bytes: 16
};

const BLOCK_10x10x16 = {
    width: 10,
    height: 10,
    bytes: 16
};

const BLOCK_12x12x16 = {
    width: 12,
    height: 12,
    bytes: 16
};

const blockInfoMap = {
    33776: BLOCK_4x4x8,
    33777: BLOCK_4x4x8,
    33778: BLOCK_4x4x16,
    33779: BLOCK_4x4x16,
    36196: BLOCK_4x4x8,
    37492: BLOCK_4x4x8,
    37493: BLOCK_4x4x8,
    37496: BLOCK_4x4x16,
    37497: BLOCK_4x4x16,
    35840: BLOCK_4x4x8,
    35842: BLOCK_4x4x8,
    35841: BLOCK_8x4x8,
    35843: BLOCK_8x4x8,
    37808: BLOCK_4x4x16,
    37840: BLOCK_4x4x16,
    37809: BLOCK_5x5x16,
    37841: BLOCK_5x5x16,
    37810: BLOCK_6x6x16,
    37842: BLOCK_6x6x16,
    37811: BLOCK_8x8x16,
    37843: BLOCK_8x8x16,
    37812: BLOCK_10x10x16,
    37844: BLOCK_10x10x16,
    37813: BLOCK_12x12x16,
    37845: BLOCK_12x12x16
};

const uploadCompressedTexture = {
    ktx: uploadKTX,
    pvr: uploadPVR,
    astc: uploadASTC
};

function isSvgImage(url) {
    return /\.(svg)(\?.*)?$/.test(url);
}

const loadSvg = (url, width, height, sx, sy, sw, sh) => new Promise((resolve, reject) => {
    const canvas2 = document.createElement("canvas");
    const ctx = canvas2.getContext("2d");
    ctx.imageSmoothingEnabled = true;
    const img = new Image;
    img.onload = () => {
        const x = sx != null ? sx : 0;
        const y = sy != null ? sy : 0;
        const w = width || img.width;
        const h = height || img.height;
        canvas2.width = w;
        canvas2.height = h;
        ctx.drawImage(img, 0, 0, w, h);
        resolve({
            data: ctx.getImageData(x, y, sw != null ? sw : w, sh != null ? sh : h),
            premultiplyAlpha: false
        });
    };
    img.onerror = err => {
        reject(err);
    };
    img.src = url;
});

class ImageTexture extends Texture {
    constructor(txManager, props2) {
        super(txManager);
        __publicField(this, "platform");
        __publicField(this, "props");
        __publicField(this, "type", TextureType.image);
        this.platform = txManager.platform;
        this.props = props2;
        this.maxRetryCount = props2.maxRetryCount;
    }
    hasAlphaChannel(mimeType) {
        return mimeType.indexOf("image/png") !== -1;
    }
    async loadImageFallback(src, hasAlpha) {
        const img = new Image;
        if (typeof src === "string" && isBase64Image(src) === false) {
            img.crossOrigin = "anonymous";
        }
        return new Promise((resolve, reject) => {
            img.onload = () => {
                resolve({
                    data: img,
                    premultiplyAlpha: hasAlpha
                });
            };
            img.onerror = err => {
                const errorMessage = err instanceof Error ? err.message : err instanceof Event ? "Image loading failed for ".concat(img.src) : "Unknown image loading error";
                reject(new Error("Image loading failed: ".concat(errorMessage)));
            };
            if (src instanceof Blob) {
                img.src = URL.createObjectURL(src);
            } else {
                img.src = src;
            }
        });
    }
    async createImageBitmap(blob, premultiplyAlpha, sx, sy, sw, sh) {
        const hasAlphaChannel = premultiplyAlpha != null ? premultiplyAlpha : blob.type.includes("image/png");
        const imageBitmapSupported = this.txManager.imageBitmapSupported;
        if (imageBitmapSupported.full === true && sw !== null && sh !== null) {
            const bitmap2 = await this.platform.createImageBitmap(blob, sx || 0, sy || 0, sw, sh, {
                premultiplyAlpha: hasAlphaChannel ? "premultiply" : "none",
                colorSpaceConversion: "none",
                imageOrientation: "none"
            });
            return {
                data: bitmap2,
                premultiplyAlpha: hasAlphaChannel
            };
        } else if (imageBitmapSupported.basic === true) {
            return {
                data: await this.platform.createImageBitmap(blob),
                premultiplyAlpha: hasAlphaChannel
            };
        }
        const bitmap = await this.platform.createImageBitmap(blob, {
            premultiplyAlpha: hasAlphaChannel ? "premultiply" : "none",
            colorSpaceConversion: "none",
            imageOrientation: "none"
        });
        return {
            data: bitmap,
            premultiplyAlpha: hasAlphaChannel
        };
    }
    async loadImage(src) {
        const {premultiplyAlpha: premultiplyAlpha, sx: sx, sy: sy, sw: sw, sh: sh} = this.props;
        if (this.txManager.hasCreateImageBitmap === true) {
            if (isBase64Image(src) === false && this.txManager.hasWorker === true && this.txManager.imageWorkerManager !== null) {
                return this.txManager.imageWorkerManager.getImage(src, premultiplyAlpha, sx, sy, sw, sh);
            }
            let blob;
            if (isBase64Image(src) === true) {
                blob = dataURIToBlob(src);
            } else {
                blob = await fetchJson(src, "blob").then(response => response);
            }
            return this.createImageBitmap(blob, premultiplyAlpha, sx, sy, sw, sh);
        }
        return this.loadImageFallback(src, premultiplyAlpha != null ? premultiplyAlpha : true);
    }
    async getTextureSource() {
        var _a;
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
        return {
            data: resp.data,
            premultiplyAlpha: (_a = this.props.premultiplyAlpha) != null ? _a : true
        };
    }
    determineImageTypeAndLoadImage() {
        const {src: src, premultiplyAlpha: premultiplyAlpha, type: type2} = this.props;
        if (src === null) {
            return {
                data: null
            };
        }
        if (typeof src !== "string") {
            if (src instanceof Blob) {
                if (this.txManager.hasCreateImageBitmap === true) {
                    const {sx: sx, sy: sy, sw: sw, sh: sh} = this.props;
                    return this.createImageBitmap(src, premultiplyAlpha, sx, sy, sw, sh);
                } else {
                    return this.loadImageFallback(src, premultiplyAlpha != null ? premultiplyAlpha : true);
                }
            }
            if (src instanceof ImageData) {
                return {
                    data: src,
                    premultiplyAlpha: premultiplyAlpha
                };
            }
            return {
                data: src(),
                premultiplyAlpha: premultiplyAlpha
            };
        }
        const absoluteSrc = convertUrlToAbsolute(src);
        if (type2 === "regular") {
            return this.loadImage(absoluteSrc);
        }
        if (type2 === "svg") {
            return loadSvg(absoluteSrc, this.props.w, this.props.h, this.props.sx, this.props.sy, this.props.sw, this.props.sh);
        }
        if (isSvgImage(src) === true) {
            return loadSvg(absoluteSrc, this.props.w, this.props.h, this.props.sx, this.props.sy, this.props.sw, this.props.sh);
        }
        if (type2 === "compressed") {
            return loadCompressedTexture(absoluteSrc);
        }
        if (isCompressedTextureContainer(src) === true) {
            return loadCompressedTexture(absoluteSrc);
        }
        return this.loadImage(absoluteSrc);
    }
    static makeCacheKey(props2) {
        var _a, _b, _c;
        const key = props2.key || props2.src;
        if (typeof key !== "string") {
            return false;
        }
        let cacheKey = "ImageTexture,".concat(key, ",").concat((_a = props2.premultiplyAlpha) != null ? _a : "true", ",").concat(props2.maxRetryCount);
        if (props2.sh !== null && props2.sw !== null) {
            cacheKey += ",";
            cacheKey += (_b = props2.sx) != null ? _b : "";
            cacheKey += (_c = props2.sy) != null ? _c : "";
            cacheKey += props2.sw || "";
            cacheKey += props2.sh || "";
        }
        return cacheKey;
    }
    static resolveDefaults(props2) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
        return {
            src: (_a = props2.src) != null ? _a : "",
            premultiplyAlpha: (_b = props2.premultiplyAlpha) != null ? _b : true,
            key: (_c = props2.key) != null ? _c : null,
            type: (_d = props2.type) != null ? _d : null,
            w: (_e = props2.w) != null ? _e : null,
            h: (_f = props2.h) != null ? _f : null,
            sx: (_g = props2.sx) != null ? _g : null,
            sy: (_h = props2.sy) != null ? _h : null,
            sw: (_i = props2.sw) != null ? _i : null,
            sh: (_j = props2.sh) != null ? _j : null,
            maxRetryCount: (_k = props2.maxRetryCount) != null ? _k : 5
        };
    }
}

__publicField(ImageTexture, "z$__type__Props");

const _NoiseTexture = class _NoiseTexture extends Texture {
    constructor(txManager, props2) {
        super(txManager);
        __publicField(this, "props");
        __publicField(this, "type", TextureType.noise);
        this.props = props2;
    }
    async getTextureSource() {
        const {w: w, h: h} = this.props;
        const size = w * h * 4;
        const pixelData8 = new Uint8ClampedArray(size);
        for (let i = 0; i < size; i += 4) {
            const v = Math.floor(Math.random() * 256);
            pixelData8[i] = v;
            pixelData8[i + 1] = v;
            pixelData8[i + 2] = v;
            pixelData8[i + 3] = 255;
        }
        return {
            data: new ImageData(pixelData8, w, h)
        };
    }
    static makeCacheKey(props2) {
        if (props2.cacheId === void 0) {
            return false;
        }
        const resolvedProps = _NoiseTexture.resolveDefaults(props2);
        return "NoiseTexture,".concat(resolvedProps.w, ",").concat(resolvedProps.h, ",").concat(resolvedProps.cacheId);
    }
    static resolveDefaults(props2) {
        var _a, _b, _c;
        return {
            w: (_a = props2.w) != null ? _a : 128,
            h: (_b = props2.h) != null ? _b : 128,
            cacheId: (_c = props2.cacheId) != null ? _c : 0
        };
    }
};

__publicField(_NoiseTexture, "z$__type__Props");

let NoiseTexture = _NoiseTexture;

let subTextureId = 0;

class SubTexture extends Texture {
    constructor(txManager, props2) {
        super(txManager);
        __publicField(this, "props");
        __publicField(this, "parentTexture");
        __publicField(this, "type", TextureType.subTexture);
        __publicField(this, "subtextureId", "subtexture-".concat(subTextureId++));
        __publicField(this, "onParentTxLoaded", () => {
            this.setState("loaded", {
                w: this.props.w,
                h: this.props.h
            });
        });
        __publicField(this, "onParentTxFailed", (target, error) => {
            this.retryCount = this.parentTexture.retryCount - 1;
            this.setState("failed", error);
        });
        __publicField(this, "onParentTxLoading", () => {
            this.setState("loading");
        });
        __publicField(this, "onParentTxFreed", () => {
            this.setState("freed");
        });
        this.props = props2;
        assertTruthy(this.props.texture);
        assertTruthy(this.props.texture instanceof ImageTexture);
        this.parentTexture = txManager.resolveParentTexture(this.props.texture);
        if (this.renderableOwners.length > 0) {
            this.parentTexture.setRenderableOwner(this.subtextureId, true);
        }
        queueMicrotask(() => {
            const parentTx = this.parentTexture;
            if (parentTx.state === "loaded" && parentTx.dimensions !== null) {
                this.onParentTxLoaded(parentTx, parentTx.dimensions);
            } else if (parentTx.state === "loading") {
                this.onParentTxLoading();
            } else if (parentTx.state === "failed" && parentTx.error !== null) {
                this.onParentTxFailed(parentTx, parentTx.error);
            } else if (parentTx.state === "freed") {
                this.onParentTxFreed();
            }
            parentTx.on("loading", this.onParentTxLoading);
            parentTx.on("loaded", this.onParentTxLoaded);
            parentTx.on("failed", this.onParentTxFailed);
            parentTx.on("freed", this.onParentTxFreed);
        });
    }
    onChangeIsRenderable(isRenderable) {
        this.parentTexture.setRenderableOwner(this.subtextureId, isRenderable);
    }
    async getTextureSource() {
        return new Promise((resolve, reject) => {
            resolve({
                data: this.props
            });
        });
    }
    static makeCacheKey(props2) {
        return false;
    }
    static resolveDefaults(props2) {
        return {
            texture: props2.texture,
            x: props2.x || 0,
            y: props2.y || 0,
            w: props2.w || 0,
            h: props2.h || 0
        };
    }
}

__publicField(SubTexture, "z$__type__Props");

class RenderTexture extends Texture {
    constructor(txManager, props2) {
        super(txManager);
        __publicField(this, "props");
        __publicField(this, "type", TextureType.renderToTexture);
        this.props = props2;
    }
    get w() {
        return this.props.w;
    }
    set w(value) {
        this.props.w = value;
    }
    get h() {
        return this.props.h;
    }
    set h(value) {
        this.props.h = value;
    }
    async getTextureSource() {
        return {
            data: null,
            premultiplyAlpha: null
        };
    }
    static resolveDefaults(props2) {
        return {
            w: props2.w || 256,
            h: props2.h || 256
        };
    }
}

__publicField(RenderTexture, "z$__type__Props");

async function validateCreateImageBitmap(platform) {
    var _a, _b, _c;
    const pngBinaryData = new Uint8Array([ 137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 1, 0, 0, 0, 1, 1, 3, 0, 0, 0, 37, 219, 86, 202, 0, 0, 0, 3, 80, 76, 84, 69, 0, 0, 0, 167, 122, 61, 218, 0, 0, 0, 1, 116, 82, 78, 83, 0, 64, 230, 216, 102, 0, 0, 0, 10, 73, 68, 65, 84, 8, 215, 99, 96, 0, 0, 0, 2, 0, 1, 226, 33, 188, 51, 0, 0, 0, 0, 73, 69, 78, 68, 174, 66, 96, 130 ]);
    const support = {
        basic: false,
        options: false,
        full: false
    };
    const blob = new Blob([ pngBinaryData ], {
        type: "image/png"
    });
    const bitmap = await platform.createImageBitmap(blob);
    (_a = bitmap.close) == null ? void 0 : _a.call(bitmap);
    support.basic = true;
    try {
        const options = {
            premultiplyAlpha: "none"
        };
        const bitmapWithOptions = await platform.createImageBitmap(blob, options);
        (_b = bitmapWithOptions.close) == null ? void 0 : _b.call(bitmapWithOptions);
        support.options = true;
    } catch (e) {}
    try {
        const bitmapWithFullOptions = await platform.createImageBitmap(blob, 0, 0, 1, 1, {
            premultiplyAlpha: "none"
        });
        (_c = bitmapWithFullOptions.close) == null ? void 0 : _c.call(bitmapWithFullOptions);
        support.full = true;
    } catch (e) {}
    return support;
}

var TextureErrorCode;

(function(TextureErrorCode2) {
    TextureErrorCode2["MEMORY_THRESHOLD_EXCEEDED"] = "MEMORY_THRESHOLD_EXCEEDED";
    TextureErrorCode2["TEXTURE_DATA_NULL"] = "TEXTURE_DATA_NULL";
    TextureErrorCode2["TEXTURE_TYPE_NOT_REGISTERED"] = "TEXTURE_TYPE_NOT_REGISTERED";
})(TextureErrorCode || (TextureErrorCode = {}));

const defaultMessages = {
    [TextureErrorCode.MEMORY_THRESHOLD_EXCEEDED]: "Memory threshold exceeded",
    [TextureErrorCode.TEXTURE_DATA_NULL]: "Texture data is null",
    [TextureErrorCode.TEXTURE_TYPE_NOT_REGISTERED]: "Texture type is not registered"
};

class TextureError extends Error {
    constructor(codeOrMessage, maybeMessage) {
        const isCode = Object.values(TextureErrorCode).includes(codeOrMessage);
        const code = isCode ? codeOrMessage : void 0;
        let message;
        if (isCode && code) {
            message = maybeMessage != null ? maybeMessage : defaultMessages[code];
        } else {
            message = String(codeOrMessage);
        }
        super(message);
        __publicField(this, "code");
        this.name = new.target.name;
        if (code) this.code = code;
    }
}

class CoreTextureManager extends EventEmitter {
    constructor(stage, settings) {
        super();
        __publicField(this, "keyCache", new Map);
        __publicField(this, "inverseKeyCache", new WeakMap);
        __publicField(this, "txConstructors", {});
        __publicField(this, "maxRetryCount");
        __publicField(this, "priorityQueue", []);
        __publicField(this, "uploadTextureQueue", []);
        __publicField(this, "initialized", false);
        __publicField(this, "stage");
        __publicField(this, "numImageWorkers");
        __publicField(this, "platform");
        __publicField(this, "imageWorkerManager", null);
        __publicField(this, "hasCreateImageBitmap", false);
        __publicField(this, "imageBitmapSupported", {
            basic: false,
            options: false,
            full: false
        });
        __publicField(this, "hasWorker", !!self.Worker);
        __publicField(this, "renderer");
        __publicField(this, "frameTime", 0);
        const {numImageWorkers: numImageWorkers2, createImageBitmapSupport: createImageBitmapSupport, maxRetryCount: maxRetryCount} = settings;
        this.stage = stage;
        this.platform = stage.platform;
        this.numImageWorkers = numImageWorkers2;
        this.maxRetryCount = maxRetryCount;
        if (createImageBitmapSupport === "auto") {
            validateCreateImageBitmap(this.platform).then(result => {
                this.initialize(result);
            }).catch(() => {
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
        if (this.hasCreateImageBitmap === false) {
            console.warn("[Lightning] createImageBitmap is not supported on this browser. ImageTexture will be slower.");
        }
        if (this.hasCreateImageBitmap === true && this.hasWorker === true && this.numImageWorkers > 0) {
            this.imageWorkerManager = new ImageWorkerManager(this.numImageWorkers, support);
        } else {
            console.warn("[Lightning] Imageworker is 0 or not supported on this browser. Image loading will be slower.");
        }
        this.initialized = true;
        this.emit("initialized");
    }
    enqueueUploadTexture(texture) {
        if (this.uploadTextureQueue.includes(texture) === false) {
            this.uploadTextureQueue.push(texture);
        }
    }
    createTexture(textureType, props2) {
        let texture;
        const TextureClass = this.txConstructors[textureType];
        if (!TextureClass) {
            throw new Error('Texture type "'.concat(textureType, '" is not registered'));
        }
        const resolvedProps = TextureClass.resolveDefaults(props2);
        const cacheKey = TextureClass.makeCacheKey(resolvedProps);
        if (cacheKey && this.keyCache.has(cacheKey)) {
            texture = this.keyCache.get(cacheKey);
        } else {
            texture = new TextureClass(this, resolvedProps);
            if (cacheKey) {
                this.initTextureToCache(texture, cacheKey);
            }
        }
        return texture;
    }
    async loadTexture(texture, priority) {
        this.stage.txMemManager.removeFromOrphanedTextures(texture);
        if (texture.type === TextureType.subTexture) {
            return;
        }
        if (texture.state === "loaded") {
            return;
        }
        if (this.initialized === false) {
            this.priorityQueue.push(texture);
            return;
        }
        texture.setState("loading");
        const textureDataResult = await texture.getTextureData().catch(err => {
            console.error(err);
            texture.setState("failed");
            return null;
        });
        if (textureDataResult === null || texture.state === "failed") {
            return;
        }
        const shouldUploadImmediately = texture.type !== TextureType.image || priority === true;
        if (shouldUploadImmediately === true) {
            await this.uploadTexture(texture).catch(err => {
                console.error("Failed to upload texture:", err);
                texture.setState("failed");
            });
            return;
        }
        this.enqueueUploadTexture(texture);
    }
    async uploadTexture(texture) {
        if (this.stage.txMemManager.doNotExceedCriticalThreshold === true && this.stage.txMemManager.criticalCleanupRequested === true) {
            texture.setState("failed");
            return;
        }
        if (texture.state === "failed" || texture.state === "freed") {
            return;
        }
        if (texture.state === "loaded") {
            return;
        }
        if (texture.textureData === null) {
            texture.setState("failed", new TextureError(TextureErrorCode.TEXTURE_DATA_NULL, "Texture data is null, cannot upload texture"));
            return;
        }
        const coreContext = texture.loadCtxTexture();
        if (coreContext !== null && coreContext.state === "loaded") {
            texture.setState("loaded");
            return;
        }
        await coreContext.load();
    }
    isProcessingTexture(texture) {
        return this.uploadTextureQueue.includes(texture) === true;
    }
    async processSome(maxProcessingTime) {
        if (this.initialized === false) {
            return;
        }
        const platform = this.platform;
        const startTime = platform.getTimeStamp();
        while (this.priorityQueue.length > 0 && platform.getTimeStamp() - startTime < maxProcessingTime) {
            const texture = this.priorityQueue.pop();
            try {
                await texture.getTextureData();
                await this.uploadTexture(texture);
            } catch (error) {
                console.error("Failed to process priority texture:", error);
            }
        }
        while (this.uploadTextureQueue.length > 0 && platform.getTimeStamp() - startTime < maxProcessingTime) {
            const texture = this.uploadTextureQueue.shift();
            try {
                await this.uploadTexture(texture);
            } catch (error) {
                console.error("Failed to upload texture:", error);
            }
        }
    }
    hasUpdates() {
        return this.uploadTextureQueue.length > 0;
    }
    initTextureToCache(texture, cacheKey) {
        const {keyCache: keyCache, inverseKeyCache: inverseKeyCache} = this;
        keyCache.set(cacheKey, texture);
        inverseKeyCache.set(texture, cacheKey);
    }
    getTextureFromCache(cacheKey) {
        return this.keyCache.get(cacheKey);
    }
    removeTextureFromCache(texture) {
        const {inverseKeyCache: inverseKeyCache, keyCache: keyCache} = this;
        const cacheKey = inverseKeyCache.get(texture);
        if (cacheKey) {
            keyCache.delete(cacheKey);
        }
    }
    removeTextureFromQueue(texture) {
        const uploadIndex = this.uploadTextureQueue.indexOf(texture);
        if (uploadIndex !== -1) {
            this.uploadTextureQueue.splice(uploadIndex, 1);
        }
    }
    resolveParentTexture(texture) {
        if (!(texture == null ? void 0 : texture.props)) {
            return texture;
        }
        const cacheKey = ImageTexture.makeCacheKey(texture.props);
        const cachedTexture = cacheKey ? this.getTextureFromCache(cacheKey) : void 0;
        return cachedTexture != null ? cachedTexture : texture;
    }
}

function isAdvancedShaderProp(obj) {
    return obj !== null && typeof obj === "object" && obj.default !== void 0;
}

function resolveShaderProps(props2, propsConfig) {
    for (const key in propsConfig) {
        if (!isAdvancedShaderProp(propsConfig[key]) && props2[key] === void 0) {
            props2[key] = propsConfig[key];
            continue;
        }
        const pConfig = propsConfig[key];
        const hasValue = props2[key] !== void 0;
        if (pConfig.resolve !== void 0) {
            props2[key] = pConfig.resolve(props2[key], props2);
            continue;
        }
        if (hasValue && pConfig.set !== void 0) {
            pConfig.set(props2[key], props2);
            continue;
        }
        if (hasValue) {
            continue;
        }
        if (props2[key] === void 0 && pConfig.get === void 0) {
            props2[key] = deepClone(pConfig.default);
            continue;
        }
        props2[key] = pConfig.get(props2);
    }
}

class CoreShaderNode {
    constructor(shaderKey, type2, stage, props2) {
        __publicField(this, "shaderKey");
        __publicField(this, "stage");
        __publicField(this, "shaderType");
        __publicField(this, "propsConfig");
        __publicField(this, "resolvedProps");
        __publicField(this, "definedProps");
        __publicField(this, "node", null);
        __publicField(this, "time");
        __publicField(this, "update");
        this.shaderKey = shaderKey;
        this.stage = stage;
        this.shaderType = type2;
        this.time = type2.time;
        if (props2 !== void 0) {
            this.resolvedProps = props2;
            this.defineProps(props2);
        }
    }
    defineProps(props2) {
        const definedProps = {};
        for (const key in props2) {
            const propConfig = this.shaderType.props[key];
            const isAdvancedProp = isAdvancedShaderProp(propConfig);
            Object.defineProperty(definedProps, key, {
                get: () => this.resolvedProps[key],
                set: value => {
                    if (isAdvancedProp === true && propConfig.resolve !== void 0) {
                        this.resolvedProps[key] = propConfig.resolve(value, this.resolvedProps);
                    } else if (isAdvancedProp === true && propConfig.set !== void 0) {
                        propConfig.set(value, this.resolvedProps);
                    } else {
                        this.resolvedProps[key] = value;
                    }
                    if (this.update !== void 0 && this.node !== null) {
                        this.node.setUpdateType(UpdateType.RecalcUniforms);
                    } else {
                        this.stage.requestRender();
                    }
                }
            });
        }
        this.definedProps = definedProps;
    }
    attachNode(node) {
        this.node = node;
    }
    createValueKey() {
        let valueKey = "";
        for (const key in this.resolvedProps) {
            valueKey += "".concat(key, ":").concat(this.resolvedProps[key], ";");
        }
        valueKey += "node-width:".concat(this.node.w);
        valueKey += "node-height:".concat(this.node.h);
        return valueKey;
    }
    get props() {
        return this.definedProps;
    }
    set props(props2) {
        if (props2 === void 0) {
            return;
        }
        for (const key in props2) {
            this.props[key] = props2[key];
        }
    }
}

class CoreShaderManager {
    constructor(stage) {
        __publicField(this, "stage");
        __publicField(this, "shTypes", {});
        __publicField(this, "shCache", new Map);
        __publicField(this, "valuesCache", new Map);
        __publicField(this, "valuesCacheUsage", new Map);
        __publicField(this, "attachedShader", null);
        this.stage = stage;
    }
    registerShaderType(name, shType) {
        if (this.shTypes[name] !== void 0) {
            console.warn("ShaderType already exists with the name: ".concat(name, ". Breaking off registration."));
            return;
        }
        if (this.stage.renderer.supportsShaderType(shType) === false) {
            console.warn("The renderer being used does not support this shader type. Breaking off registration.");
            return;
        }
        this.shTypes[name] = deepClone(shType);
    }
    createShader(name, props2) {
        const shType = this.shTypes[name];
        if (shType === void 0) {
            console.warn("ShaderType not found falling back on renderer default shader");
            return this.stage.defShaderNode;
        }
        let shaderKey = name;
        if (shType.props !== void 0) {
            props2 = props2 || {};
            resolveShaderProps(props2, shType.props);
            if (shType.getCacheMarkers !== void 0) {
                shaderKey += "-".concat(shType.getCacheMarkers(props2));
            }
        }
        if (this.stage.renderer.mode === "canvas") {
            return this.stage.renderer.createShaderNode(shaderKey, shType, props2);
        }
        let shProgram = this.shCache.get(shaderKey);
        if (shProgram === void 0) {
            shProgram = this.stage.renderer.createShaderProgram(shType, props2);
            this.shCache.set(shaderKey, shProgram);
        }
        return this.stage.renderer.createShaderNode(shaderKey, shType, props2, shProgram);
    }
    mutateShaderValueUsage(key, mutation) {
        let usage = this.valuesCacheUsage.get(key) || 0;
        this.valuesCacheUsage.set(key, usage + mutation);
    }
    getShaderValues(key) {
        const values = this.valuesCache.get(key);
        if (values === void 0) {
            return void 0;
        }
        this.mutateShaderValueUsage(key, 1);
        return values;
    }
    setShaderValues(key, values) {
        this.valuesCache.set(key, values);
        this.mutateShaderValueUsage(key, 1);
    }
    cleanup() {
        const values = [ ...this.valuesCacheUsage.entries() ].sort((entryA, entryB) => {
            if (entryA[1] < entryB[1]) {
                return -1;
            } else if (entryA[1] > entryB[1]) {
                return 1;
            }
            return 0;
        });
        for (let i = 0; i < values.length; i++) {
            if (values[i][1] > 0) {
                break;
            }
            this.valuesCacheUsage.delete(values[i][0]);
            this.valuesCache.delete(values[i][0]);
        }
    }
    useShader(shader) {
        if (this.attachedShader === shader) {
            return;
        }
        if (this.attachedShader && this.attachedShader.detach) {
            this.attachedShader.detach();
        }
        if (shader.attach) {
            shader.attach();
        }
        this.attachedShader = shader;
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
        return {
            ...this.data
        };
    }
}

class TextureMemoryManager {
    constructor(stage, settings) {
        __publicField(this, "stage");
        __publicField(this, "memUsed", 0);
        __publicField(this, "loadedTextures", []);
        __publicField(this, "orphanedTextures", []);
        __publicField(this, "criticalThreshold", 124e6);
        __publicField(this, "targetThreshold", .5);
        __publicField(this, "cleanupInterval", 5e3);
        __publicField(this, "debugLogging", false);
        __publicField(this, "loggingID", 0);
        __publicField(this, "lastCleanupTime", 0);
        __publicField(this, "baselineMemoryAllocation", 26e6);
        __publicField(this, "hasWarnedAboveCritical", false);
        __publicField(this, "criticalCleanupRequested", false);
        __publicField(this, "doNotExceedCriticalThreshold", false);
        __publicField(this, "frameTime", 0);
        this.stage = stage;
        this.updateSettings(settings);
    }
    addToOrphanedTextures(texture) {
        if (this.orphanedTextures.includes(texture)) {
            this.removeFromOrphanedTextures(texture);
        }
        if (texture.preventCleanup === false) {
            this.orphanedTextures.push(texture);
        }
    }
    removeFromOrphanedTextures(texture) {
        const index = this.orphanedTextures.indexOf(texture);
        if (index !== -1) {
            this.orphanedTextures.splice(index, 1);
        }
    }
    setTextureMemUse(texture, byteSize) {
        this.memUsed -= texture.memUsed;
        if (byteSize === 0) {
            const index = this.loadedTextures.indexOf(texture);
            if (index !== -1) {
                this.loadedTextures[index] = null;
            }
            texture.memUsed = 0;
            return;
        } else {
            texture.memUsed = byteSize;
            this.memUsed += byteSize;
            if (this.loadedTextures.indexOf(texture) === -1) {
                const emptyIndex = this.loadedTextures.indexOf(null);
                if (emptyIndex !== -1) {
                    this.loadedTextures[emptyIndex] = texture;
                } else {
                    this.loadedTextures.push(texture);
                }
            }
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
    destroyTexture(texture) {
        if (this.debugLogging === true) {
            console.log("[TextureMemoryManager] Destroying texture. State: ".concat(texture.state));
        }
        const index = this.loadedTextures.indexOf(texture);
        if (index !== -1) {
            this.loadedTextures[index] = null;
        }
        const txManager = this.stage.txManager;
        txManager.removeTextureFromCache(texture);
        texture.destroy();
        this.memUsed -= texture.memUsed;
        texture.memUsed = 0;
    }
    cleanup() {
        const critical = this.criticalCleanupRequested;
        this.lastCleanupTime = this.frameTime;
        if (critical === true) {
            this.stage.queueFrameEvent("criticalCleanup", {
                memUsed: this.memUsed,
                criticalThreshold: this.criticalThreshold
            });
        }
        if (this.debugLogging === true) {
            console.log("[TextureMemoryManager] Cleaning up textures. Critical: ".concat(critical, "."));
        }
        const memTarget = critical ? this.criticalThreshold : this.targetThreshold;
        let currentMemUsed = this.memUsed;
        for (let i = 0; i < this.loadedTextures.length; i++) {
            if (currentMemUsed < memTarget) {
                break;
            }
            const texture = this.loadedTextures[i];
            if (!texture) continue;
            const isCleanableType = texture.type === TextureType.image || texture.type === TextureType.noise || texture.type === TextureType.renderToTexture;
            if (isCleanableType && texture.canBeCleanedUp() === true) {
                const textureMemory = texture.memUsed;
                this.destroyTexture(texture);
                currentMemUsed -= textureMemory;
            }
        }
        if (this.memUsed >= this.criticalThreshold) {
            this.stage.queueFrameEvent("criticalCleanupFailed", {
                memUsed: this.memUsed,
                criticalThreshold: this.criticalThreshold
            });
            if (!this.hasWarnedAboveCritical && (this.debugLogging === true || isProductionEnvironment === false)) {
                console.warn("[TextureMemoryManager] Memory usage above critical threshold after cleanup: ".concat(this.memUsed));
                this.hasWarnedAboveCritical = true;
            }
        } else {
            this.criticalCleanupRequested = false;
            this.hasWarnedAboveCritical = false;
        }
    }
    getMemoryInfo() {
        let renderableTexturesLoaded = 0;
        let renderableMemUsed = this.baselineMemoryAllocation;
        for (const texture of this.loadedTextures) {
            if (texture && texture.renderable) {
                renderableTexturesLoaded += 1;
                renderableMemUsed += texture.memUsed;
            }
        }
        const actualLoadedTextures = this.loadedTextures.filter(t => t !== null).length;
        return {
            criticalThreshold: this.criticalThreshold,
            targetThreshold: this.targetThreshold,
            renderableMemUsed: renderableMemUsed,
            memUsed: this.memUsed,
            renderableTexturesLoaded: renderableTexturesLoaded,
            loadedTextures: actualLoadedTextures,
            baselineMemoryAllocation: this.baselineMemoryAllocation
        };
    }
    updateSettings(settings) {
        const {criticalThreshold: criticalThreshold, doNotExceedCriticalThreshold: doNotExceedCriticalThreshold} = settings;
        this.doNotExceedCriticalThreshold = doNotExceedCriticalThreshold || false;
        this.criticalThreshold = Math.round(criticalThreshold);
        if (this.memUsed === 0) {
            this.memUsed = Math.round(settings.baselineMemoryAllocation);
        } else {
            const memUsedExBaseline = this.memUsed - this.baselineMemoryAllocation;
            this.memUsed = Math.round(settings.baselineMemoryAllocation + memUsedExBaseline);
        }
        this.baselineMemoryAllocation = Math.round(settings.baselineMemoryAllocation);
        const targetFraction = Math.max(0, Math.min(1, settings.targetThresholdLevel));
        this.targetThreshold = Math.max(Math.round(criticalThreshold * targetFraction), this.baselineMemoryAllocation);
        this.cleanupInterval = settings.cleanupInterval;
        this.debugLogging = settings.debugLogging;
        if (this.loggingID && !settings.debugLogging) {
            clearInterval(this.loggingID);
            this.loggingID = 0;
        }
        if (settings.debugLogging && !this.loggingID) {
            let lastMemUse = 0;
            this.loggingID = setInterval(() => {
                if (lastMemUse !== this.memUsed) {
                    lastMemUse = this.memUsed;
                    console.log("[TextureMemoryManager] Memory used: ".concat(bytesToMb$1(this.memUsed), " mb / ").concat(bytesToMb$1(this.criticalThreshold), " mb (").concat((this.memUsed / this.criticalThreshold * 100).toFixed(1), "%)"));
                }
            }, 1e3);
        }
        if (criticalThreshold === 0) {
            this.setTextureMemUse = () => {};
        }
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
        __publicField(this, "defaultTextureCoords");
        __publicField(this, "stage");
        __publicField(this, "rttNodes", []);
        this.options = options;
        this.stage = options.stage;
    }
}

var TextConstraint;

(function(TextConstraint2) {
    TextConstraint2[TextConstraint2["none"] = 0] = "none";
    TextConstraint2[TextConstraint2["width"] = 1] = "width";
    TextConstraint2[TextConstraint2["height"] = 2] = "height";
    TextConstraint2[TextConstraint2["both"] = 4] = "both";
})(TextConstraint || (TextConstraint = {}));

class CoreTextNode extends CoreNode {
    constructor(stage, props2, textRenderer) {
        super(stage, props2);
        __publicField(this, "textRenderer");
        __publicField(this, "fontHandler");
        __publicField(this, "_layoutGenerated", false);
        __publicField(this, "_waitingForFont", false);
        __publicField(this, "_containType", TextConstraint.none);
        __publicField(this, "_cachedLayout", null);
        __publicField(this, "_lastVertexBuffer", null);
        __publicField(this, "textProps");
        __publicField(this, "_renderInfo", {
            width: 0,
            height: 0
        });
        __publicField(this, "_type", "sdf");
        __publicField(this, "onTextureLoaded", (_, dimensions) => {
            if (this.parentHasRenderTexture) {
                this.notifyParentRTTOfUpdate();
            }
            if (dimensions.w > 1 && dimensions.h > 1) {
                this.emit("loaded", {
                    type: "texture",
                    dimensions: dimensions
                });
            }
            this.setUpdateType(UpdateType.IsRenderable);
        });
        __publicField(this, "emitTextLoadedEvent", () => {
            this.emit("loaded", {
                type: "text",
                dimensions: {
                    w: this._renderInfo.width,
                    h: this._renderInfo.height
                }
            });
        });
        this.textRenderer = textRenderer;
        this.fontHandler = textRenderer.font;
        this._type = textRenderer.type;
        this.textProps = props2;
        this._containType = TextConstraint[props2.contain];
        this.setUpdateType(UpdateType.All);
    }
    allowTextGeneration() {
        const p = this.props.parent;
        if (p === null) {
            return false;
        }
        if (p.worldAlpha > 0 && p.renderState > CoreNodeRenderState.OutOfBounds) {
            return true;
        }
        return false;
    }
    updateLocalTransform() {
        const p = this.props;
        let {x: x, y: y, w: w, h: h} = p;
        const mountX = p.mountX;
        const mountY = p.mountY;
        let mountTranslateX = p.mountX * w;
        let mountTranslateY = p.mountY * h;
        let localTextTransform = null;
        const tProps = this.textProps;
        const {textAlign: textAlign, verticalAlign: verticalAlign, maxWidth: maxWidth, maxHeight: maxHeight} = tProps;
        const contain = this._containType;
        const hasMaxWidth = maxWidth > 0;
        const hasMaxHeight = maxHeight > 0;
        if (contain > 0 && (hasMaxWidth || hasMaxHeight)) {
            let containX = 0;
            let containY = 0;
            if (contain & TextConstraint.width && hasMaxWidth === true) {
                if (textAlign === "right") {
                    containX = maxWidth - w;
                } else if (textAlign === "center") {
                    containX = (maxWidth - w) * .5;
                }
                mountTranslateX = mountX * maxWidth;
            }
            if (contain & TextConstraint.height && maxHeight > 0) {
                if (verticalAlign === "bottom") {
                    containY = maxHeight - h;
                } else if (verticalAlign === "middle") {
                    containY = (maxHeight - h) * .5;
                }
                mountTranslateY = mountY * maxHeight;
            }
            localTextTransform = Matrix3d.translate(containX, containY);
        }
        if (p.rotation !== 0 || p.scaleX !== 1 || p.scaleY !== 1) {
            const scaleRotate = Matrix3d.rotate(p.rotation).scale(p.scaleX, p.scaleY);
            const pivotW = contain & TextConstraint.width && maxWidth > 0 ? maxWidth : w;
            const pivotH = contain & TextConstraint.height && maxHeight > 0 ? maxHeight : h;
            const pivotTranslateX = p.pivotX * pivotW;
            const pivotTranslateY = p.pivotY * pivotH;
            this.localTransform = Matrix3d.translate(x - mountTranslateX + pivotTranslateX, y - mountTranslateY + pivotTranslateY, this.localTransform).multiply(scaleRotate).translate(-pivotTranslateX, -pivotTranslateY);
        } else {
            this.localTransform = Matrix3d.translate(x - mountTranslateX, y - mountTranslateY, this.localTransform);
        }
        if (localTextTransform !== null) {
            this.localTransform = this.localTransform.multiply(localTextTransform);
        }
    }
    update(delta, parentClippingRect) {
        if ((this.textProps.forceLoad === true || this.allowTextGeneration() === true) && this._layoutGenerated === false) {
            if (this.fontHandler.isFontLoaded(this.textProps.fontFamily) === true) {
                this._waitingForFont = false;
                this._cachedLayout = null;
                this._lastVertexBuffer = null;
                const resp = this.textRenderer.renderText(this.textProps);
                this.handleRenderResult(resp);
                this._layoutGenerated = true;
            } else if (this._waitingForFont === false) {
                this.fontHandler.waitingForFont(this.textProps.fontFamily, this);
                this._waitingForFont = true;
            }
        }
        super.update(delta, parentClippingRect);
    }
    updateIsRenderable() {
        if (this._type === "canvas") {
            super.updateIsRenderable();
            return;
        }
        this.setRenderable(this._cachedLayout !== null);
    }
    handleRenderResult(result) {
        const textRendererType = this._type;
        let width = result.width;
        let height = result.height;
        if (textRendererType === "canvas") {
            if (result.imageData === void 0) {
                this.emit("failed", {
                    type: "text",
                    error: new Error("Canvas text rendering failed, no image data returned")
                });
                return;
            }
            this.texture = this.stage.txManager.createTexture("ImageTexture", {
                premultiplyAlpha: true,
                src: result.imageData
            });
            this.setRenderable(false);
            if (this.renderState > CoreNodeRenderState.OutOfBounds) {
                this.texture.setRenderableOwner(this._id, true);
            }
        }
        this._cachedLayout = result.layout || null;
        this.props.w = width;
        this.props.h = height;
        if (textRendererType === "sdf") {
            this.setRenderable(true);
            this.setUpdateType(UpdateType.Local);
        }
        this._renderInfo = result;
        queueMicrotask(this.emitTextLoadedEvent);
    }
    renderQuads(renderer2) {
        if (this.parentHasRenderTexture === true) {
            const rtt = renderer2.renderToTextureActive;
            if (rtt === false || this.parentRenderTexture !== renderer2.activeRttNode) return;
        }
        if (this._type === "canvas") {
            super.renderQuads(renderer2);
            return;
        }
        if (!this._cachedLayout) {
            return;
        }
        if (this._lastVertexBuffer === null) {
            this._lastVertexBuffer = this.textRenderer.addQuads(this._cachedLayout);
        }
        const props2 = this.textProps;
        this.textRenderer.renderQuads(renderer2, this._cachedLayout, this._lastVertexBuffer, {
            fontFamily: this.textProps.fontFamily,
            fontSize: props2.fontSize,
            color: this.props.color || 4294967295,
            offsetY: props2.offsetY,
            worldAlpha: this.worldAlpha,
            globalTransform: this.globalTransform.getFloatArr(),
            clippingRect: this.clippingRect,
            width: this.props.w,
            height: this.props.h,
            parentHasRenderTexture: this.parentHasRenderTexture,
            framebufferDimensions: this.parentHasRenderTexture === true ? this.parentFramebufferDimensions : null,
            stage: this.stage
        });
    }
    destroy() {
        if (this._waitingForFont === true && this.fontHandler) {
            this.fontHandler.stopWaitingForFont(this.textProps.fontFamily, this);
        }
        this._cachedLayout = null;
        this._lastVertexBuffer = null;
        this.fontHandler = null;
        this.textRenderer = null;
        super.destroy();
    }
    set w(value) {
        console.warn("Cannot directly set w on CoreTextNode");
    }
    get w() {
        return this.props.w;
    }
    set h(value) {
        console.warn("Cannot directly set h on CoreTextNode");
    }
    get h() {
        return this.props.h;
    }
    get maxWidth() {
        return this.textProps.maxWidth;
    }
    set maxWidth(value) {
        if (this.textProps.maxWidth !== value) {
            this.textProps.maxWidth = value;
            this._layoutGenerated = false;
            this.setUpdateType(UpdateType.Local);
        }
    }
    get maxHeight() {
        return this.textProps.maxHeight;
    }
    set maxHeight(value) {
        if (this.textProps.maxHeight !== value) {
            this.textProps.maxHeight = value;
            this._layoutGenerated = false;
            this.setUpdateType(UpdateType.Local);
        }
    }
    get contain() {
        return this.textProps.contain;
    }
    set contain(value) {
        if (this.textProps.contain !== value) {
            this.textProps.contain = value;
            this._containType = TextConstraint[value];
            this.setUpdateType(UpdateType.Local);
        }
    }
    get text() {
        return this.textProps.text;
    }
    set text(value) {
        if (this.textProps.text !== value) {
            this.textProps.text = value;
            this._layoutGenerated = false;
            this.setUpdateType(UpdateType.Local);
        }
    }
    get fontSize() {
        return this.textProps.fontSize;
    }
    set fontSize(value) {
        if (this.textProps.fontSize !== value) {
            this.textProps.fontSize = value;
            this._layoutGenerated = false;
            this.setUpdateType(UpdateType.Local);
        }
    }
    get fontFamily() {
        return this.textProps.fontFamily;
    }
    set fontFamily(value) {
        if (this.textProps.fontFamily !== value) {
            if (this._waitingForFont === true) {
                this.fontHandler.stopWaitingForFont(this.textProps.fontFamily, this);
            }
            this.textProps.fontFamily = value;
            this._layoutGenerated = false;
            this.setUpdateType(UpdateType.Local);
        }
    }
    get fontStyle() {
        return this.textProps.fontStyle;
    }
    set fontStyle(value) {
        if (this.textProps.fontStyle !== value) {
            this.textProps.fontStyle = value;
            this._layoutGenerated = false;
            this.setUpdateType(UpdateType.Local);
        }
    }
    get textAlign() {
        return this.textProps.textAlign;
    }
    set textAlign(value) {
        if (this.textProps.textAlign !== value) {
            this.textProps.textAlign = value;
            this._layoutGenerated = false;
            this.setUpdateType(UpdateType.Local);
        }
    }
    get letterSpacing() {
        return this.textProps.letterSpacing;
    }
    set letterSpacing(value) {
        if (this.textProps.letterSpacing !== value) {
            this.textProps.letterSpacing = value;
            this._layoutGenerated = false;
            this.setUpdateType(UpdateType.Local);
        }
    }
    get lineHeight() {
        return this.textProps.lineHeight;
    }
    set lineHeight(value) {
        if (this.textProps.lineHeight !== value) {
            this.textProps.lineHeight = value;
            this._layoutGenerated = false;
            this.setUpdateType(UpdateType.Local);
        }
    }
    get maxLines() {
        return this.textProps.maxLines;
    }
    set maxLines(value) {
        if (this.textProps.maxLines !== value) {
            this.textProps.maxLines = value;
            this._layoutGenerated = false;
            this.setUpdateType(UpdateType.Local);
        }
    }
    get verticalAlign() {
        return this.textProps.verticalAlign;
    }
    set verticalAlign(value) {
        if (this.textProps.verticalAlign !== value) {
            this.textProps.verticalAlign = value;
            this._layoutGenerated = false;
            this.setUpdateType(UpdateType.Local);
        }
    }
    get overflowSuffix() {
        return this.textProps.overflowSuffix;
    }
    set overflowSuffix(value) {
        if (this.textProps.overflowSuffix !== value) {
            this.textProps.overflowSuffix = value;
            this._layoutGenerated = false;
            this.setUpdateType(UpdateType.Local);
        }
    }
    get wordBreak() {
        return this.textProps.wordBreak;
    }
    set wordBreak(value) {
        if (this.textProps.wordBreak !== value) {
            this.textProps.wordBreak = value;
            this._layoutGenerated = false;
            this.setUpdateType(UpdateType.Local);
        }
    }
    get offsetY() {
        return this.textProps.offsetY;
    }
    set offsetY(value) {
        if (this.textProps.offsetY !== value) {
            this.textProps.offsetY = value;
            this._layoutGenerated = false;
            this.setUpdateType(UpdateType.Local);
        }
    }
    get forceLoad() {
        return this.textProps.forceLoad;
    }
    set forceLoad(value) {
        if (this.textProps.forceLoad !== value) {
            this.textProps.forceLoad = value;
            this.setUpdateType(UpdateType.Local);
        }
    }
    get renderInfo() {
        return this._renderInfo;
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
        const key = keys[i];
        if (!key) {
            continue;
        }
        const value = d[key];
        const valueType = typeof value;
        if (valueType === "string" && value.length > 2048) {
            console.warn("Custom Data value for ".concat(key, " is too long, it will be truncated to 2048 characters"));
            d[key] = value.substring(0, 2048);
        }
        if (!validTypes[valueType]) {
            console.warn("Custom Data value for ".concat(key, " is not a boolean, string, or number, it will be ignored"));
            delete d[key];
        }
    }
    return d;
}

class Stage {
    constructor(options) {
        __publicField(this, "options");
        __publicField(this, "animationManager");
        __publicField(this, "txManager");
        __publicField(this, "txMemManager");
        __publicField(this, "textRenderers", {});
        __publicField(this, "fontHandlers", {});
        __publicField(this, "shManager");
        __publicField(this, "renderer");
        __publicField(this, "root");
        __publicField(this, "interactiveNodes", new Set);
        __publicField(this, "boundsMargin");
        __publicField(this, "defShaderNode", null);
        __publicField(this, "strictBound");
        __publicField(this, "preloadBound");
        __publicField(this, "defaultTexture", null);
        __publicField(this, "pixelRatio");
        __publicField(this, "bufferMemory", 2e6);
        __publicField(this, "platform");
        __publicField(this, "calculateTextureCoord");
        __publicField(this, "targetFrameTime", 0);
        __publicField(this, "eventBus");
        __publicField(this, "startTime", 0);
        __publicField(this, "deltaTime", 0);
        __publicField(this, "lastFrameTime", 0);
        __publicField(this, "currentFrameTime", 0);
        __publicField(this, "elapsedTime", 0);
        __publicField(this, "timedNodes", []);
        __publicField(this, "clrColor", 0);
        __publicField(this, "fpsNumFrames", 0);
        __publicField(this, "fpsElapsedTime", 0);
        __publicField(this, "numQuadsRendered", 0);
        __publicField(this, "renderRequested", false);
        __publicField(this, "frameEventQueue", []);
        __publicField(this, "hasOnlyOneFontEngine");
        __publicField(this, "hasOnlyCanvasFontEngine");
        __publicField(this, "hasCanvasEngine");
        __publicField(this, "singleFontEngine", null);
        __publicField(this, "singleFontHandler", null);
        __publicField(this, "contextSpy", null);
        var _a;
        this.options = options;
        const {canvas: canvas2, clearColor: clearColor, appWidth: appWidth, appHeight: appHeight, boundsMargin: boundsMargin, enableContextSpy: enableContextSpy, forceWebGL2: forceWebGL2, numImageWorkers: numImageWorkers2, textureMemory: textureMemory, renderEngine: renderEngine, fontEngines: fontEngines, createImageBitmapSupport: createImageBitmapSupport, platform: platform, maxRetryCount: maxRetryCount} = options;
        this.platform = platform;
        this.startTime = platform.getTimeStamp();
        this.eventBus = options.eventBus;
        this.targetFrameTime = options.targetFPS > 0 ? 1e3 / options.targetFPS : 0;
        this.txManager = new CoreTextureManager(this, {
            numImageWorkers: numImageWorkers2,
            createImageBitmapSupport: createImageBitmapSupport,
            maxRetryCount: maxRetryCount
        });
        this.txManager.on("initialized", () => {
            this.requestRender();
        });
        this.txMemManager = new TextureMemoryManager(this, textureMemory);
        this.animationManager = new AnimationManager;
        this.contextSpy = enableContextSpy ? new ContextSpy : null;
        let bm = [ 0, 0, 0, 0 ];
        if (boundsMargin) {
            bm = Array.isArray(boundsMargin) ? boundsMargin : [ boundsMargin, boundsMargin, boundsMargin, boundsMargin ];
        }
        this.boundsMargin = bm;
        this.strictBound = createBound(0, 0, appWidth, appHeight);
        this.preloadBound = createPreloadBounds(this.strictBound, bm);
        this.clrColor = clearColor;
        this.pixelRatio = options.devicePhysicalPixelRatio * options.deviceLogicalPixelRatio;
        this.renderer = new renderEngine({
            stage: this,
            canvas: canvas2,
            contextSpy: this.contextSpy,
            forceWebGL2: forceWebGL2
        });
        this.shManager = new CoreShaderManager(this);
        this.defShaderNode = this.renderer.getDefaultShaderNode();
        this.calculateTextureCoord = this.renderer.getTextureCoords !== void 0;
        const renderMode = this.renderer.mode || "webgl";
        this.createDefaultTexture();
        setPremultiplyMode(renderMode);
        this.txManager.renderer = this.renderer;
        this.hasOnlyOneFontEngine = fontEngines.length === 1;
        this.hasOnlyCanvasFontEngine = fontEngines.length === 1 && fontEngines[0].type === "canvas";
        this.hasCanvasEngine = false;
        this.singleFontEngine = this.hasOnlyOneFontEngine ? fontEngines[0] : null;
        this.singleFontHandler = this.hasOnlyOneFontEngine ? (_a = fontEngines[0]) == null ? void 0 : _a.font : null;
        if (this.singleFontEngine === null) {
            const compatibleEngines = fontEngines.filter(fontEngine => {
                const type2 = fontEngine.type;
                if (type2 === "sdf" && renderMode === "canvas") {
                    console.warn("MsdfTextRenderer is not compatible with Canvas renderer. Skipping...");
                    return false;
                }
                if (type2 === "canvas") {
                    this.hasCanvasEngine = true;
                }
                return true;
            });
            const sortedEngines = compatibleEngines.sort((a, b) => {
                if (a.type === "sdf") return -1;
                if (b.type === "sdf") return 1;
                if (a.type === "canvas") return 1;
                if (b.type === "canvas") return -1;
                return 0;
            });
            sortedEngines.forEach(fontEngine => {
                const type2 = fontEngine.type;
                this.textRenderers[type2] = fontEngine;
                this.textRenderers[type2].init(this);
                this.fontHandlers[type2] = fontEngine.font;
            });
        } else {
            const fontEngine = this.singleFontEngine;
            const type2 = fontEngine.type;
            if (type2 === "sdf" && renderMode === "canvas") {
                console.warn("MsdfTextRenderer is not compatible with Canvas renderer. Skipping...");
            } else {
                if (type2 === "canvas") {
                    this.hasCanvasEngine = true;
                }
                this.textRenderers[type2] = fontEngine;
                this.fontHandlers[type2] = fontEngine.font;
                this.textRenderers[type2].init(this);
            }
        }
        if (Object.keys(this.textRenderers).length === 0) {
            console.warn("No text renderers available. Your text will not render.");
        }
        const rootNode2 = new CoreNode(this, {
            x: 0,
            y: 0,
            w: appWidth,
            h: appHeight,
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
            scaleX: 1,
            scaleY: 1,
            mountX: 0,
            mountY: 0,
            mount: 0,
            pivot: .5,
            pivotX: .5,
            pivotY: .5,
            rotation: 0,
            parent: null,
            texture: null,
            textureOptions: {},
            shader: this.defShaderNode,
            rtt: false,
            src: null,
            scale: 1
        });
        this.root = rootNode2;
        {
            this.platform.startLoop(this);
        }
    }
    setClearColor(color) {
        this.clearColor = color;
        this.renderer.updateClearColor(color);
        this.renderRequested = true;
    }
    updateTargetFrameTime() {
        this.targetFrameTime = this.options.targetFPS > 0 ? 1e3 / this.options.targetFPS : 0;
    }
    updateFrameTime() {
        const newFrameTime = this.platform.getTimeStamp();
        this.lastFrameTime = this.currentFrameTime;
        this.currentFrameTime = newFrameTime;
        this.elapsedTime = newFrameTime - this.startTime;
        this.deltaTime = !this.lastFrameTime ? 100 / 6 : newFrameTime - this.lastFrameTime;
        this.txManager.frameTime = newFrameTime;
        this.txMemManager.frameTime = newFrameTime;
        this.eventBus.emit("frameTick", {
            time: this.currentFrameTime,
            delta: this.deltaTime
        });
    }
    createDefaultTexture() {
        this.defaultTexture = this.txManager.createTexture("ColorTexture", {
            color: 4294967295
        });
        assertTruthy(this.defaultTexture instanceof ColorTexture);
        this.txManager.loadTexture(this.defaultTexture, true);
        this.defaultTexture.setRenderableOwner("stage", true);
        this.defaultTexture.once("loaded", () => {
            this.requestRender();
        });
    }
    updateAnimations() {
        const {animationManager: animationManager} = this;
        if (!this.root) {
            return;
        }
        animationManager.update(this.deltaTime);
    }
    hasSceneUpdates() {
        return !!this.root.updateType || this.renderRequested || this.txManager.hasUpdates();
    }
    drawFrame() {
        const {renderer: renderer2, renderRequested: renderRequested, root: root} = this;
        this.txMemManager;
        if (root.updateType !== 0) {
            root.update(this.deltaTime, root.clippingRect);
        }
        this.txManager.processSome(this.options.textureProcessingTimeLimit).catch(err => {
            console.error("Error processing textures:", err);
        });
        renderer2.reset();
        if (renderer2.rttNodes.length > 0) {
            renderer2.renderRTTNodes();
        }
        this.addQuads(this.root);
        renderer2.render();
        this.calculateFps();
        this.calculateQuads();
        if (renderRequested === true) {
            this.renderRequested = false;
        }
        if (this.timedNodes.length > 0) {
            for (let key in this.timedNodes) {
                if (this.timedNodes[key].isRenderable === true) {
                    this.requestRender();
                    break;
                }
            }
        }
        if (this.txMemManager.criticalCleanupRequested === true) {
            this.txMemManager.cleanup();
        }
    }
    queueFrameEvent(name, data) {
        this.frameEventQueue.push([ name, data ]);
    }
    flushFrameEvents() {
        for (const [name, data] of this.frameEventQueue) {
            this.eventBus.emit(name, data);
        }
        this.frameEventQueue = [];
    }
    calculateFps() {
        var _a, _b, _c;
        const {fpsUpdateInterval: fpsUpdateInterval} = this.options;
        if (fpsUpdateInterval) {
            this.fpsNumFrames++;
            this.fpsElapsedTime += this.deltaTime;
            if (this.fpsElapsedTime >= fpsUpdateInterval) {
                const fps2 = Math.round(this.fpsNumFrames * 1e3 / this.fpsElapsedTime);
                this.fpsNumFrames = 0;
                this.fpsElapsedTime = 0;
                this.queueFrameEvent("fpsUpdate", {
                    fps: fps2,
                    contextSpyData: (_b = (_a = this.contextSpy) == null ? void 0 : _a.getData()) != null ? _b : null
                });
                (_c = this.contextSpy) == null ? void 0 : _c.reset();
            }
        }
    }
    calculateQuads() {
        const quads2 = this.renderer.getQuadCount();
        if (quads2 && quads2 !== this.numQuadsRendered) {
            this.numQuadsRendered = quads2;
            this.queueFrameEvent("quadsUpdate", {
                quads: quads2
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
            if (child.worldAlpha === 0 || child.renderState === CoreNodeRenderState.OutOfBounds) {
                continue;
            }
            this.addQuads(child);
        }
    }
    requestRender() {
        this.renderRequested = true;
    }
    resolveTextRenderer(trProps, textRendererOverride = null) {
        var _a, _b;
        if (textRendererOverride !== null) {
            const overrideKey = String(textRendererOverride);
            if (this.textRenderers[overrideKey] === void 0) {
                console.warn("Text renderer override '".concat(overrideKey, "' not found."));
                return null;
            }
            return this.textRenderers[overrideKey];
        }
        if (this.singleFontEngine !== null) {
            if (this.hasOnlyCanvasFontEngine === true) {
                return this.singleFontEngine;
            }
            if (((_a = this.singleFontHandler) == null ? void 0 : _a.canRenderFont(trProps)) === true) {
                return this.singleFontEngine;
            }
            console.warn("Text renderer cannot render font", trProps);
            return null;
        }
        if (((_b = this.fontHandlers["sdf"]) == null ? void 0 : _b.canRenderFont(trProps)) === true) {
            return this.textRenderers.sdf || null;
        }
        if (this.hasCanvasEngine === true) {
            return this.textRenderers.canvas || null;
        }
        console.warn("No text renderers available. Your text will not render.");
        return null;
    }
    createNode(props2) {
        const resolvedProps = this.resolveNodeDefaults(props2);
        return new CoreNode(this, resolvedProps);
    }
    createTextNode(props2) {
        const fontSize = props2.fontSize || 16;
        const resolvedProps = Object.assign(this.resolveNodeDefaults(props2), {
            text: props2.text || "",
            textRendererOverride: props2.textRendererOverride || null,
            fontSize: fontSize,
            fontFamily: props2.fontFamily || "sans-serif",
            fontStyle: props2.fontStyle || "normal",
            textAlign: props2.textAlign || "left",
            offsetY: props2.offsetY || 0,
            letterSpacing: props2.letterSpacing || 0,
            lineHeight: props2.lineHeight || 1.2,
            maxLines: props2.maxLines || 0,
            verticalAlign: props2.verticalAlign || "top",
            overflowSuffix: props2.overflowSuffix || "...",
            wordBreak: props2.wordBreak || "break-word",
            contain: props2.contain || "none",
            maxWidth: props2.maxWidth || 0,
            maxHeight: props2.maxHeight || 0,
            forceLoad: props2.forceLoad || false
        });
        const resolvedTextRenderer = this.resolveTextRenderer(resolvedProps, resolvedProps.textRendererOverride);
        if (!resolvedTextRenderer) {
            throw new Error("No compatible text renderer found for ".concat(resolvedProps.fontFamily));
        }
        return new CoreTextNode(this, resolvedProps, resolvedTextRenderer);
    }
    setBoundsMargin(value) {
        this.boundsMargin = Array.isArray(value) ? value : [ value, value, value, value ];
        this.root.setUpdateType(UpdateType.RenderBounds);
    }
    updateViewportBounds() {
        const {appWidth: appWidth, appHeight: appHeight} = this.options;
        this.strictBound = createBound(0, 0, appWidth, appHeight);
        this.preloadBound = createPreloadBounds(this.strictBound, this.boundsMargin);
        this.root.setUpdateType(UpdateType.RenderBounds | UpdateType.Children);
        this.root.childUpdateType |= UpdateType.RenderBounds;
    }
    findNodesAtPoint(data) {
        const x = data.x / this.options.deviceLogicalPixelRatio;
        const y = data.y / this.options.deviceLogicalPixelRatio;
        const nodes = [];
        for (const node of this.interactiveNodes) {
            if (node.isRenderable === false) {
                continue;
            }
            if (pointInBound(x, y, node.renderBound) === true) {
                nodes.push(node);
            }
        }
        return nodes;
    }
    getNodeFromPosition(data) {
        const nodes = this.findNodesAtPoint(data);
        if (nodes.length === 0) {
            return null;
        }
        let topNode = nodes[nodes.length - 1];
        for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].zIndex > topNode.zIndex) {
                topNode = nodes[i];
            }
        }
        return topNode || null;
    }
    trackTimedNode(node) {
        if (this.timedNodes[node.id] !== void 0) {
            return;
        }
        this.timedNodes[node.id] = node;
    }
    untrackTimedNode(node) {
        if (this.timedNodes[node.id] === void 0) {
            return;
        }
        delete this.timedNodes[node.id];
    }
    resolveNodeDefaults(props2) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P;
        const {colorTop: top, colorBottom: bottom, colorLeft: left, colorRight: right} = props2;
        const color = (_a = props2.color) != null ? _a : 4294967295;
        const colorTop = top != null ? top : color;
        const colorBottom = bottom != null ? bottom : color;
        const colorLeft = left != null ? left : color;
        const colorRight = right != null ? right : color;
        const colorTl = (_d = (_c = (_b = props2.colorTl) != null ? _b : top) != null ? _c : left) != null ? _d : color;
        const colorTr = (_g = (_f = (_e = props2.colorTr) != null ? _e : top) != null ? _f : right) != null ? _g : color;
        const colorBl = (_j = (_i = (_h = props2.colorBl) != null ? _h : bottom) != null ? _i : left) != null ? _j : color;
        const colorBr = (_m = (_l = (_k = props2.colorBr) != null ? _k : bottom) != null ? _l : right) != null ? _m : color;
        const scale = (_n = props2.scale) != null ? _n : null;
        const mount = (_o = props2.mount) != null ? _o : 0;
        const pivot = (_p = props2.pivot) != null ? _p : .5;
        const data = this.options.inspector ? santizeCustomDataMap((_q = props2.data) != null ? _q : {}) : {};
        return {
            x: (_r = props2.x) != null ? _r : 0,
            y: (_s = props2.y) != null ? _s : 0,
            w: (_t = props2.w) != null ? _t : 0,
            h: (_u = props2.h) != null ? _u : 0,
            alpha: (_v = props2.alpha) != null ? _v : 1,
            autosize: (_w = props2.autosize) != null ? _w : false,
            boundsMargin: (_x = props2.boundsMargin) != null ? _x : null,
            clipping: (_y = props2.clipping) != null ? _y : false,
            color: color,
            colorTop: colorTop,
            colorBottom: colorBottom,
            colorLeft: colorLeft,
            colorRight: colorRight,
            colorTl: colorTl,
            colorTr: colorTr,
            colorBl: colorBl,
            colorBr: colorBr,
            zIndex: (_z = props2.zIndex) != null ? _z : 0,
            parent: (_A = props2.parent) != null ? _A : null,
            texture: (_B = props2.texture) != null ? _B : null,
            textureOptions: (_C = props2.textureOptions) != null ? _C : {},
            shader: (_D = props2.shader) != null ? _D : this.defShaderNode,
            src: (_E = props2.src) != null ? _E : null,
            srcHeight: props2.srcHeight,
            srcWidth: props2.srcWidth,
            srcX: props2.srcX,
            srcY: props2.srcY,
            scale: scale,
            scaleX: (_G = (_F = props2.scaleX) != null ? _F : scale) != null ? _G : 1,
            scaleY: (_I = (_H = props2.scaleY) != null ? _H : scale) != null ? _I : 1,
            mount: mount,
            mountX: (_J = props2.mountX) != null ? _J : mount,
            mountY: (_K = props2.mountY) != null ? _K : mount,
            pivot: pivot,
            pivotX: (_L = props2.pivotX) != null ? _L : pivot,
            pivotY: (_M = props2.pivotY) != null ? _M : pivot,
            rotation: (_N = props2.rotation) != null ? _N : 0,
            rtt: (_O = props2.rtt) != null ? _O : false,
            data: data,
            imageType: props2.imageType,
            interactive: (_P = props2.interactive) != null ? _P : false
        };
    }
    cleanup() {
        this.txMemManager.cleanup();
    }
    set clearColor(value) {
        this.renderer.updateClearColor(value);
        this.renderRequested = true;
        this.clrColor = value;
    }
    get clearColor() {
        return this.clrColor;
    }
    async loadFont(rendererType, options) {
        const rendererTypeKey = String(rendererType);
        const fontHandler = this.fontHandlers[rendererTypeKey];
        if (!fontHandler) {
            throw new Error("Font handler for renderer type '".concat(rendererTypeKey, "' not found. Available types: ").concat(Object.keys(this.fontHandlers).join(", ")));
        }
        return fontHandler.loadFont(this, options);
    }
}

class Platform {}

class WebPlatform extends Platform {
    createCanvas() {
        const canvas2 = document.createElement("canvas");
        return canvas2;
    }
    getElementById(id) {
        return document.getElementById(id);
    }
    startLoop(stage) {
        let isIdle = false;
        let lastFrameTime = 0;
        const runLoop = (currentTime = 0) => {
            const targetFrameTime = stage.targetFrameTime;
            if (targetFrameTime > 0 && currentTime - lastFrameTime < targetFrameTime) {
                const delay2 = targetFrameTime - (currentTime - lastFrameTime);
                setTimeout(() => requestAnimationFrame(runLoop), delay2);
                return;
            }
            stage.updateFrameTime();
            stage.updateAnimations();
            if (!stage.hasSceneUpdates()) {
                stage.calculateFps();
                if (targetFrameTime > 0) {
                    setTimeout(() => requestAnimationFrame(runLoop), Math.max(targetFrameTime, 16.666666666666668));
                } else {
                    setTimeout(() => requestAnimationFrame(runLoop), 16.666666666666668);
                }
                if (isIdle === false) {
                    stage.shManager.cleanup();
                    stage.eventBus.emit("idle");
                    isIdle = true;
                }
                if (stage.txMemManager.checkCleanup() === true) {
                    stage.txMemManager.cleanup();
                }
                stage.flushFrameEvents();
                return;
            }
            isIdle = false;
            stage.drawFrame();
            stage.flushFrameEvents();
            if (targetFrameTime > 0) {
                const nextFrameDelay = Math.max(0, targetFrameTime - (performance.now() - currentTime));
                setTimeout(() => requestAnimationFrame(runLoop), nextFrameDelay);
            } else {
                requestAnimationFrame(runLoop);
            }
        };
        requestAnimationFrame(runLoop);
    }
    createImageBitmap(blob, sxOrOptions, sy, sw, sh, options) {
        if (typeof sxOrOptions === "number") {
            return createImageBitmap(blob, sxOrOptions, sy != null ? sy : 0, sw != null ? sw : 0, sh != null ? sh : 0, options);
        } else {
            return createImageBitmap(blob, sxOrOptions);
        }
    }
    getTimeStamp() {
        return performance ? performance.now() : Date.now();
    }
    addFont(font2) {
        document.fonts.add(font2);
    }
}

class RendererMain extends EventEmitter {
    constructor(settings, target) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _i;
        super();
        __publicField(this, "root");
        __publicField(this, "canvas");
        __publicField(this, "stage");
        __publicField(this, "inspector", null);
        const resolvedTxSettings = this.resolveTxSettings(settings.textureMemory || {});
        settings = {
            appWidth: settings.appWidth || 1920,
            appHeight: settings.appHeight || 1080,
            textureMemory: resolvedTxSettings,
            boundsMargin: settings.boundsMargin || 0,
            deviceLogicalPixelRatio: settings.deviceLogicalPixelRatio || 1,
            devicePhysicalPixelRatio: settings.devicePhysicalPixelRatio || window.devicePixelRatio || 1,
            clearColor: (_a = settings.clearColor) != null ? _a : 0,
            fpsUpdateInterval: settings.fpsUpdateInterval || 0,
            targetFPS: settings.targetFPS || 0,
            numImageWorkers: settings.numImageWorkers !== void 0 ? settings.numImageWorkers : 2,
            enableContextSpy: (_b = settings.enableContextSpy) != null ? _b : false,
            forceWebGL2: (_c = settings.forceWebGL2) != null ? _c : false,
            inspector: (_d = settings.inspector) != null ? _d : false,
            inspectorOptions: (_e = settings.inspectorOptions) != null ? _e : {},
            renderEngine: settings.renderEngine,
            quadBufferSize: (_f = settings.quadBufferSize) != null ? _f : 4 * 1024 * 1024,
            fontEngines: (_g = settings.fontEngines) != null ? _g : [],
            textureProcessingTimeLimit: settings.textureProcessingTimeLimit || 42,
            canvas: settings.canvas,
            createImageBitmapSupport: settings.createImageBitmapSupport || "full",
            platform: settings.platform || null,
            maxRetryCount: (_h = settings.maxRetryCount) != null ? _h : 5
        };
        const {appWidth: appWidth, appHeight: appHeight, deviceLogicalPixelRatio: deviceLogicalPixelRatio2, devicePhysicalPixelRatio: devicePhysicalPixelRatio, inspector: inspector} = settings;
        let platform;
        if (settings.platform !== void 0 && settings.platform !== null && settings.platform.prototype instanceof Platform === true) {
            platform = new settings.platform;
        } else {
            platform = new WebPlatform;
        }
        const canvas2 = settings.canvas || platform.createCanvas();
        const deviceLogicalWidth = appWidth * deviceLogicalPixelRatio2;
        const deviceLogicalHeight = appHeight * deviceLogicalPixelRatio2;
        this.canvas = canvas2;
        canvas2.width = deviceLogicalWidth * devicePhysicalPixelRatio;
        canvas2.height = deviceLogicalHeight * devicePhysicalPixelRatio;
        canvas2.style.width = "".concat(deviceLogicalWidth, "px");
        canvas2.style.height = "".concat(deviceLogicalHeight, "px");
        this.stage = new Stage({
            appWidth: appWidth,
            appHeight: appHeight,
            boundsMargin: settings.boundsMargin,
            clearColor: settings.clearColor,
            canvas: this.canvas,
            deviceLogicalPixelRatio: deviceLogicalPixelRatio2,
            devicePhysicalPixelRatio: devicePhysicalPixelRatio,
            enableContextSpy: settings.enableContextSpy,
            forceWebGL2: settings.forceWebGL2,
            fpsUpdateInterval: settings.fpsUpdateInterval,
            numImageWorkers: settings.numImageWorkers,
            renderEngine: settings.renderEngine,
            textureMemory: resolvedTxSettings,
            eventBus: this,
            quadBufferSize: settings.quadBufferSize,
            fontEngines: settings.fontEngines,
            inspector: settings.inspector !== null,
            targetFPS: settings.targetFPS,
            textureProcessingTimeLimit: settings.textureProcessingTimeLimit,
            createImageBitmapSupport: settings.createImageBitmapSupport,
            platform: platform,
            maxRetryCount: (_i = settings.maxRetryCount) != null ? _i : 5
        });
        this.root = this.stage.root;
        if (target) {
            let targetEl;
            if (typeof target === "string") {
                targetEl = document.getElementById(target);
            } else {
                targetEl = target;
            }
            if (!targetEl) {
                throw new Error("Could not find target element");
            }
            targetEl.appendChild(canvas2);
        } else if (settings.canvas !== canvas2) {
            throw new Error("New canvas element could not be appended to undefined target");
        }
    }
    resolveTxSettings(textureMemory) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
        const currentTxSettings = this.stage && this.stage.options.textureMemory || {};
        return {
            criticalThreshold: (_b = (_a = textureMemory == null ? void 0 : textureMemory.criticalThreshold) != null ? _a : currentTxSettings == null ? void 0 : currentTxSettings.criticalThreshold) != null ? _b : 124e6,
            targetThresholdLevel: (_d = (_c = textureMemory == null ? void 0 : textureMemory.targetThresholdLevel) != null ? _c : currentTxSettings == null ? void 0 : currentTxSettings.targetThresholdLevel) != null ? _d : .5,
            cleanupInterval: (_f = (_e = textureMemory == null ? void 0 : textureMemory.cleanupInterval) != null ? _e : currentTxSettings == null ? void 0 : currentTxSettings.cleanupInterval) != null ? _f : 5e3,
            debugLogging: (_h = (_g = textureMemory == null ? void 0 : textureMemory.debugLogging) != null ? _g : currentTxSettings == null ? void 0 : currentTxSettings.debugLogging) != null ? _h : false,
            baselineMemoryAllocation: (_j = (_i = textureMemory == null ? void 0 : textureMemory.baselineMemoryAllocation) != null ? _i : currentTxSettings == null ? void 0 : currentTxSettings.baselineMemoryAllocation) != null ? _j : 26e6,
            doNotExceedCriticalThreshold: (_l = (_k = textureMemory == null ? void 0 : textureMemory.doNotExceedCriticalThreshold) != null ? _k : currentTxSettings == null ? void 0 : currentTxSettings.doNotExceedCriticalThreshold) != null ? _l : false
        };
    }
    createNode(props2) {
        const node = this.stage.createNode(props2);
        if (this.inspector) {
            return this.inspector.createNode(node);
        }
        return node;
    }
    createTextNode(props2) {
        const textNode = this.stage.createTextNode(props2);
        if (this.inspector) {
            return this.inspector.createTextNode(textNode);
        }
        return textNode;
    }
    destroyNode(node) {
        if (this.inspector) {
            this.inspector.destroyNode(node.id);
        }
        return node.destroy();
    }
    createTexture(textureType, props2) {
        return this.stage.txManager.createTexture(textureType, props2);
    }
    createShader(shType, props2) {
        return this.stage.shManager.createShader(shType, props2);
    }
    getNodeById(id) {
        var _a;
        const root = (_a = this.stage) == null ? void 0 : _a.root;
        if (!root) {
            return null;
        }
        const findNode = node => {
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
    rerender() {
        this.stage.requestRender();
    }
    cleanup() {
        this.stage.cleanup();
    }
    setClearColor(color) {
        this.stage.setClearColor(color);
    }
    setOptions(options) {
        var _a, _b;
        const stage = this.stage;
        if (options.textureMemory !== void 0) {
            const textureMemory = options.textureMemory = this.resolveTxSettings(options.textureMemory);
            stage.txMemManager.updateSettings(textureMemory);
            stage.txMemManager.cleanup();
        }
        if (options.boundsMargin !== void 0) {
            let bm = options.boundsMargin;
            options.boundsMargin = Array.isArray(bm) ? bm : [ bm, bm, bm, bm ];
        }
        const stageOptions = stage.options;
        for (let key in options) {
            stageOptions[key] = options[key];
        }
        if (options.inspector !== void 0 && !isProductionEnvironment) ;
        let needDimensionsUpdate = false;
        if (options.deviceLogicalPixelRatio || options.devicePhysicalPixelRatio !== void 0) {
            this.stage.pixelRatio = stageOptions.devicePhysicalPixelRatio * stageOptions.deviceLogicalPixelRatio;
            (_a = this.inspector) == null ? void 0 : _a.updateViewport(stageOptions.appWidth, stageOptions.appHeight, stageOptions.deviceLogicalPixelRatio);
            needDimensionsUpdate = true;
        }
        if (options.appWidth !== void 0 || options.appHeight !== void 0) {
            (_b = this.inspector) == null ? void 0 : _b.updateViewport(stageOptions.appWidth, stageOptions.appHeight, stageOptions.deviceLogicalPixelRatio);
            needDimensionsUpdate = true;
        }
        if (options.boundsMargin !== void 0) {
            this.stage.setBoundsMargin(options.boundsMargin);
        }
        if (options.clearColor !== void 0) {
            this.stage.setClearColor(options.clearColor);
        }
        if (needDimensionsUpdate) {
            this.updateAppDimensions();
        }
    }
    updateAppDimensions() {
        const {appWidth: appWidth, appHeight: appHeight, deviceLogicalPixelRatio: deviceLogicalPixelRatio2, devicePhysicalPixelRatio: devicePhysicalPixelRatio} = this.stage.options;
        const deviceLogicalWidth = appWidth * deviceLogicalPixelRatio2;
        const deviceLogicalHeight = appHeight * deviceLogicalPixelRatio2;
        this.canvas.width = deviceLogicalWidth * devicePhysicalPixelRatio;
        this.canvas.height = deviceLogicalHeight * devicePhysicalPixelRatio;
        this.canvas.style.width = "".concat(deviceLogicalWidth, "px");
        this.canvas.style.height = "".concat(deviceLogicalHeight, "px");
        this.stage.renderer.updateViewport();
        this.root.w = appWidth;
        this.root.h = appHeight;
        this.stage.updateViewportBounds();
    }
    get settings() {
        return this.stage.options;
    }
    get targetFPS() {
        return this.stage.options.targetFPS || 0;
    }
    set targetFPS(fps2) {
        this.stage.options.targetFPS = fps2 > 0 ? fps2 : 0;
        this.stage.updateTargetFrameTime();
    }
}

const validateArrayLength4 = value => {
    if (!Array.isArray(value)) {
        return [ value, value, value, value ];
    }
    if (value.length === 4) {
        return value;
    }
    if (value.length === 3) {
        value[3] = value[0];
        return value;
    }
    if (value.length === 2) {
        value[2] = value[0];
        value[3] = value[1];
        return value;
    }
    value[0] = value[0] || 0;
    value[1] = value[0];
    value[2] = value[0];
    value[3] = value[0];
    return value;
};

function getBorderProps(prefix) {
    const pf = prefix && prefix.length > 0 ? "".concat(prefix, "-") : "";
    const w = pf + "w";
    return {
        [w]: {
            default: [ 0, 0, 0, 0 ],
            resolve(value) {
                if (value !== void 0) {
                    return validateArrayLength4(value);
                }
                return [].concat(this.default);
            }
        },
        [pf + "color"]: 4294967295,
        [pf + "top"]: {
            default: 0,
            set(value, props2) {
                props2[w][0] = value;
            },
            get(props2) {
                return props2[w][0];
            }
        },
        [pf + "right"]: {
            default: 0,
            set(value, props2) {
                props2[w][1] = value;
            },
            get(props2) {
                return props2[w][1];
            }
        },
        [pf + "bottom"]: {
            default: 0,
            set(value, props2) {
                props2[w][2] = value;
            },
            get(props2) {
                return props2[w][2];
            }
        },
        [pf + "left"]: {
            default: 0,
            set(value, props2) {
                props2[w][3] = value;
            },
            get(props2) {
                return props2[w][3];
            }
        }
    };
}

({
    props: getBorderProps()
});

const HolePunchTemplate = {
    props: {
        x: 0,
        y: 0,
        w: 50,
        h: 50,
        radius: {
            default: [ 0, 0, 0, 0 ],
            resolve(value) {
                if (value !== void 0) {
                    return validateArrayLength4(value);
                }
                return [].concat(this.default);
            }
        }
    }
};

const RoundedTemplate = {
    props: {
        radius: {
            default: [ 0, 0, 0, 0 ],
            resolve(value) {
                if (value !== void 0) {
                    return validateArrayLength4(value);
                }
                return [].concat(this.default);
            }
        },
        "top-left": {
            default: 0,
            set(value, props2) {
                props2.radius[0] = value;
            },
            get(props2) {
                return props2.radius[0];
            }
        },
        "top-right": {
            default: 0,
            set(value, props2) {
                props2.radius[1] = value;
            },
            get(props2) {
                return props2.radius[1];
            }
        },
        "bottom-right": {
            default: 0,
            set(value, props2) {
                props2.radius[2] = value;
            },
            get(props2) {
                return props2.radius[2];
            }
        },
        "bottom-left": {
            default: 0,
            set(value, props2) {
                props2.radius[3] = value;
            },
            get(props2) {
                return props2.radius[3];
            }
        }
    }
};

function getShadowProps(prefix) {
    const pf = prefix && prefix.length > 0 ? "".concat(prefix, "-") : "";
    const projection = pf + "projection";
    return {
        [pf + "color"]: 255,
        [projection]: {
            default: [ 0, 0, 5, 5 ]
        },
        [pf + "x"]: {
            default: 0,
            set(value, props2) {
                props2[projection][0] = value;
            },
            get(props2) {
                return props2[projection][0];
            }
        },
        [pf + "y"]: {
            default: 0,
            set(value, props2) {
                props2[projection][1] = value;
            },
            get(props2) {
                return props2[projection][1];
            }
        },
        [pf + "blur"]: {
            default: 10,
            set(value, props2) {
                props2[projection][2] = value;
            },
            get(props2) {
                return props2[projection][2];
            }
        },
        [pf + "spread"]: {
            default: 10,
            set(value, props2) {
                props2[projection][3] = value;
            },
            get(props2) {
                return props2[projection][3];
            }
        }
    };
}

({
    props: getShadowProps()
});

const LinearGradientTemplate = {
    props: {
        colors: {
            default: [ 255, 4294967295 ],
            resolve(value) {
                if (value !== void 0 && value.length > 0) {
                    return value;
                }
                return [].concat(this.default);
            }
        },
        stops: {
            default: [ 0, 1 ],
            resolve(value, props2) {
                if (value !== void 0 && value.length === props2.colors.length) {
                    return value;
                }
                if (value === void 0) {
                    value = [];
                }
                const len = props2.colors.length;
                for (let i = 0; i < len; i++) {
                    value[i] = i * (1 / (len - 1));
                }
                return value;
            }
        },
        angle: 0
    }
};

const RadialGradientTemplate = {
    props: {
        colors: {
            default: [ 255, 4294967295 ],
            resolve(value) {
                if (value !== void 0 && value.length > 0) {
                    return value;
                }
                return [].concat(this.default);
            }
        },
        stops: {
            default: [ 0, 1 ],
            resolve(value, props2) {
                if (value !== void 0 && value.length === props2.colors.length) {
                    return value;
                }
                if (value === void 0) {
                    value = [];
                }
                const len = props2.colors.length;
                for (let i = 0; i < len; i++) {
                    value[i] = i * (1 / (len - 1));
                }
                return value;
            }
        },
        w: 50,
        h: 50,
        pivot: [ .5, .5 ]
    }
};

const Default = {
    vertex: "\n    # ifdef GL_FRAGMENT_PRECISION_HIGH\n    precision highp float;\n    # else\n    precision mediump float;\n    # endif\n\n    attribute vec2 a_position;\n    attribute vec2 a_textureCoords;\n    attribute vec4 a_color;\n    attribute vec2 a_nodeCoords;\n\n    uniform vec2 u_resolution;\n    uniform float u_pixelRatio;\n\n    varying vec4 v_color;\n    varying vec2 v_textureCoords;\n    varying vec2 v_nodeCoords;\n\n    void main() {\n      vec2 normalized = a_position * u_pixelRatio / u_resolution;\n      vec2 zero_two = normalized * 2.0;\n      vec2 clip_space = zero_two - 1.0;\n\n      v_color = a_color;\n      v_textureCoords = a_textureCoords;\n      v_nodeCoords = a_nodeCoords;\n\n      gl_Position = vec4(clip_space * vec2(1.0, -1.0), 0, 1);\n    }\n  ",
    fragment: "\n    # ifdef GL_FRAGMENT_PRECISION_HIGH\n    precision highp float;\n    # else\n    precision mediump float;\n    # endif\n\n    uniform vec2 u_resolution;\n    uniform sampler2D u_texture;\n\n    varying vec4 v_color;\n    varying vec2 v_textureCoords;\n\n    void main() {\n      gl_FragColor = v_color * texture2D(u_texture, v_textureCoords);\n    }\n  "
};

function createShader(glw, type2, source) {
    const shader = glw.createShader(type2);
    if (!shader) {
        const glError = glw.getError();
        throw new Error("Unable to create the shader: ".concat(type2 === glw.VERTEX_SHADER ? "VERTEX_SHADER" : "FRAGMENT_SHADER", ".").concat(glError ? " WebGlContext Error: ".concat(glError) : ""));
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

class WebGlShaderProgram {
    constructor(renderer2, config, resolvedProps) {
        __publicField(this, "program");
        __publicField(this, "vao");
        __publicField(this, "renderer");
        __publicField(this, "glw");
        __publicField(this, "attributeLocations");
        __publicField(this, "uniformLocations");
        __publicField(this, "lifecycle");
        __publicField(this, "useSystemAlpha", false);
        __publicField(this, "useSystemDimensions", false);
        __publicField(this, "useTimeValue", false);
        __publicField(this, "isDestroyed", false);
        __publicField(this, "supportsIndexedTextures", false);
        this.renderer = renderer2;
        const glw = this.glw = renderer2.glw;
        const webGl2 = glw.isWebGl2();
        let requiredExtensions = [];
        this.supportsIndexedTextures = config.supportsIndexedTextures || this.supportsIndexedTextures;
        requiredExtensions = webGl2 && config.webgl2Extensions || !webGl2 && config.webgl1Extensions || [];
        const glVersion = webGl2 ? "2.0" : "1.0";
        requiredExtensions.forEach(extensionName => {
            if (!glw.getExtension(extensionName)) {
                throw new Error('Shader "'.concat(this.constructor.name, '" requires extension "').concat(extensionName, '" for WebGL ').concat(glVersion, " but wasn't found"));
            }
        });
        let vertexSource = config.vertex instanceof Function ? config.vertex(renderer2, resolvedProps) : config.vertex;
        if (vertexSource === void 0) {
            vertexSource = Default.vertex;
        }
        const fragmentSource = config.fragment instanceof Function ? config.fragment(renderer2, resolvedProps) : config.fragment;
        const vertexShader = createShader(glw, glw.VERTEX_SHADER, vertexSource);
        if (!vertexShader) {
            throw new Error("Vertex shader creation failed");
        }
        const fragmentShader = createShader(glw, glw.FRAGMENT_SHADER, fragmentSource);
        if (!fragmentShader) {
            throw new Error("fragment shader creation failed");
        }
        const program = createProgram(glw, vertexShader, fragmentShader);
        if (!program) {
            throw new Error;
        }
        this.program = program;
        this.attributeLocations = glw.getAttributeLocations(program);
        const uniLocs = this.uniformLocations = glw.getUniformLocations(program);
        this.useSystemAlpha = uniLocs["u_alpha"] !== void 0;
        this.useSystemDimensions = uniLocs["u_dimensions"] !== void 0;
        this.useTimeValue = this.glw.getUniformLocation(program, "u_dimensions") !== null && config.time !== void 0;
        this.lifecycle = {
            update: config.update,
            canBatch: config.canBatch
        };
    }
    disableAttribute(location) {
        this.glw.disableVertexAttribArray(location);
    }
    disableAttributes() {
        const glw = this.glw;
        const attribLen = this.attributeLocations.length;
        for (let i = 0; i < attribLen; i++) {
            glw.disableVertexAttribArray(i);
        }
    }
    reuseRenderOp(incomingQuad, currentRenderOp) {
        if (this.lifecycle.canBatch !== void 0) {
            return this.lifecycle.canBatch(incomingQuad, currentRenderOp);
        }
        if (this.useTimeValue === true) {
            if (incomingQuad.time !== currentRenderOp.time) {
                return false;
            }
        }
        if (this.useSystemAlpha === true) {
            if (incomingQuad.alpha !== currentRenderOp.alpha) {
                return false;
            }
        }
        if (this.useSystemDimensions === true) {
            if (incomingQuad.width !== currentRenderOp.width || incomingQuad.height !== currentRenderOp.height) {
                return false;
            }
        }
        let shaderPropsA = void 0;
        let shaderPropsB = void 0;
        if (incomingQuad.shader !== null) {
            shaderPropsA = incomingQuad.shader.resolvedProps;
        }
        if (currentRenderOp.shader !== null) {
            shaderPropsB = currentRenderOp.shader.resolvedProps;
        }
        if (shaderPropsA === void 0 && shaderPropsB !== void 0 || shaderPropsA !== void 0 && shaderPropsB === void 0) {
            return false;
        }
        if (shaderPropsA !== void 0 && shaderPropsB !== void 0) {
            for (const key in shaderPropsA) {
                if (shaderPropsA[key] !== shaderPropsB[key]) {
                    return false;
                }
            }
        }
        return true;
    }
    bindRenderOp(renderOp) {
        var _a;
        this.bindBufferCollection(renderOp.buffers);
        this.bindTextures(renderOp.textures);
        const {parentHasRenderTexture: parentHasRenderTexture} = renderOp;
        if (renderOp.rtt === true && parentHasRenderTexture === true) {
            return;
        }
        if (parentHasRenderTexture === true) {
            const {w: w, h: h} = renderOp.framebufferDimensions;
            this.glw.uniform1f("u_pixelRatio", 1);
            this.glw.uniform2f("u_resolution", w, h);
        } else {
            this.glw.uniform1f("u_pixelRatio", renderOp.renderer.stage.pixelRatio);
            this.glw.uniform2f("u_resolution", this.glw.canvas.width, this.glw.canvas.height);
        }
        if (this.useTimeValue === true) {
            this.glw.uniform1f("u_time", renderOp.time);
        }
        if (this.useSystemAlpha === true) {
            this.glw.uniform1f("u_alpha", renderOp.alpha);
        }
        if (this.useSystemDimensions === true) {
            this.glw.uniform2f("u_dimensions", renderOp.width, renderOp.height);
        }
        if (renderOp.sdfShaderProps !== void 0) {
            (_a = renderOp.shader.shaderType.onSdfBind) == null ? void 0 : _a.call(this.glw, renderOp.sdfShaderProps);
            return;
        }
        if (renderOp.shader.props !== void 0) {
            for (const key in renderOp.shader.uniforms.single) {
                const {method: method, value: value} = renderOp.shader.uniforms.single[key];
                this.glw[method](key, value);
            }
            for (const key in renderOp.shader.uniforms.vec2) {
                const {method: method, value: value} = renderOp.shader.uniforms.vec2[key];
                this.glw[method](key, value[0], value[1]);
            }
            for (const key in renderOp.shader.uniforms.vec3) {
                const {method: method, value: value} = renderOp.shader.uniforms.vec3[key];
                this.glw[method](key, value[0], value[1], value[2]);
            }
            for (const key in renderOp.shader.uniforms.vec4) {
                const {method: method, value: value} = renderOp.shader.uniforms.vec4[key];
                this.glw[method](key, value[0], value[1], value[2], value[3]);
            }
        }
    }
    bindBufferCollection(buffer) {
        const {glw: glw} = this;
        const attribs = this.attributeLocations;
        const attribLen = attribs.length;
        for (let i = 0; i < attribLen; i++) {
            const name = attribs[i];
            const resolvedBuffer = buffer.getBuffer(name);
            const resolvedInfo = buffer.getAttributeInfo(name);
            if (resolvedBuffer === void 0 || resolvedInfo === void 0) {
                continue;
            }
            glw.enableVertexAttribArray(i);
            glw.vertexAttribPointer(resolvedBuffer, i, resolvedInfo.size, resolvedInfo.type, resolvedInfo.normalized, resolvedInfo.stride, resolvedInfo.offset);
        }
    }
    bindTextures(textures) {
        this.glw.activeTexture(0);
        this.glw.bindTexture(textures[0].ctxTexture);
    }
    attach() {
        if (this.isDestroyed === true) {
            return;
        }
        this.glw.useProgram(this.program, this.uniformLocations);
        if (this.glw.isWebGl2() && this.vao) {
            this.glw.bindVertexArray(this.vao);
        }
    }
    detach() {
        this.disableAttributes();
    }
    destroy() {
        if (this.isDestroyed === true) {
            return;
        }
        const glw = this.glw;
        this.detach();
        glw.deleteProgram(this.program);
        this.program = null;
        this.uniformLocations = null;
        const attribs = this.attributeLocations;
        const attribLen = this.attributeLocations.length;
        for (let i = 0; i < attribLen; i++) {
            this.glw.deleteBuffer(attribs[i]);
        }
    }
}

({
    LEGACY: false
});

const DOM_RENDERING = typeof LIGHTNING_DOM_RENDERING === "boolean" && LIGHTNING_DOM_RENDERING;

const SHADERS_ENABLED = !(typeof LIGHTNING_DISABLE_SHADERS === "boolean" && LIGHTNING_DISABLE_SHADERS);

const Config = {
    debug: false,
    domRendererEnabled: false,
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
    fontWeightAlias: {
        thin: 100,
        light: 300,
        regular: "",
        400: "",
        medium: 500,
        bold: 700,
        black: 900
    },
    setActiveElement: () => {},
    focusStateKey: "$focus",
    lockStyles: true
};

const NodeType = {
    Element: "element",
    TextNode: "textNode",
    Text: "text"
};

function log(msg, node, ...args) {}

const isFunc = obj => obj instanceof Function;

const isFunction = obj => typeof obj === "function";

function isArray(item) {
    return Array.isArray(item);
}

function isString(item) {
    return typeof item === "string";
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
    for (const key of keys) {
        if (key in obj) {
            return true;
        }
    }
    return false;
}

function spliceItem(arr, item, deleteCount, ...insert2) {
    const index = arr.indexOf(item);
    if (index > -1) {
        arr.splice(index, deleteCount, ...insert2);
    }
    return index;
}

function isFocused(el) {
    var _a;
    return (_a = el == null ? void 0 : el.states) == null ? void 0 : _a.has(Config.focusStateKey);
}

const hasFocus = isFocused;

const colorToRgba = c => "rgba(".concat(c >> 24 & 255, ",").concat(c >> 16 & 255, ",").concat(c >> 8 & 255, ",").concat((c & 255) / 255, ")");

function applyEasing(easing, progress) {
    if (isFunc(easing)) {
        return easing(progress);
    }
    switch (easing) {
      case "linear":
      default:
        return progress;

      case "ease-in":
        return progress * progress;

      case "ease-out":
        return progress * (2 - progress);

      case "ease-in-out":
        return progress < .5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
    }
}

function interpolate(start, end, t) {
    return start + (end - start) * t;
}

function interpolateColor(start, end, t) {
    return interpolate(start >> 24 & 255, end >> 24 & 255, t) << 24 | interpolate(start >> 16 & 255, end >> 16 & 255, t) << 16 | interpolate(start >> 8 & 255, end >> 8 & 255, t) << 8 | interpolate(start & 255, end & 255, t);
}

function interpolateProp(name, start, end, t) {
    return name.startsWith("color") ? interpolateColor(start, end, t) : interpolate(start, end, t);
}

let animationTasks = [];

let animationFrameRequested = false;

function requestAnimationUpdate() {
    if (!animationFrameRequested && animationTasks.length > 0) {
        animationFrameRequested = true;
        requestAnimationFrame(updateAnimations);
    }
}

function updateAnimations(time) {
    animationFrameRequested = false;
    for (let i = 0; i < animationTasks.length; i++) {
        let task = animationTasks[i];
        if (task.pausedTime != null) continue;
        let elapsed = time - task.timeStart;
        if (elapsed < task.settings.delay) {
            requestAnimationUpdate();
            continue;
        }
        let activeTime = elapsed - task.settings.delay;
        if (activeTime >= task.settings.duration) {
            if (task.settings.loop || task.iteration < task.settings.repeat - 1) {
                task.iteration++;
                task.timeStart = time - task.settings.delay;
                requestAnimationUpdate();
            } else {
                Object.assign(task.node.props, task.propsEnd);
                updateNodeStyles(task.node);
                task.stop();
                i--;
            }
            continue;
        }
        let t = activeTime / task.settings.duration;
        t = applyEasing(task.settings.easing, t);
        for (let prop in task.propsEnd) {
            let start = task.propsStart[prop];
            let end = task.propsEnd[prop];
            task.node.props[prop] = interpolateProp(prop, start, end, t);
        }
        updateNodeStyles(task.node);
    }
    requestAnimationUpdate();
}

class AnimationController {
    constructor(node, props2, rawSettings) {
        var _a, _b, _c, _d, _e;
        this.node = node;
        this.state = "paused";
        this.stopPromise = null;
        this.stopResolve = null;
        this.propsStart = {};
        this.propsEnd = {};
        this.timeStart = performance.now();
        this.iteration = 0;
        this.pausedTime = null;
        this.settings = {
            duration: (_a = rawSettings.duration) != null ? _a : 300,
            delay: (_b = rawSettings.delay) != null ? _b : 0,
            easing: (_c = rawSettings.easing) != null ? _c : "linear",
            loop: (_d = rawSettings.loop) != null ? _d : false,
            repeat: (_e = rawSettings.repeat) != null ? _e : 1,
            stopMethod: false
        };
        this.timeEnd = this.timeStart + this.settings.delay + this.settings.duration;
        for (let [prop, value] of Object.entries(props2)) {
            if (value != null && typeof value === "number") {
                this.propsStart[prop] = node.props[prop];
                this.propsEnd[prop] = value;
            }
        }
        animationTasks.push(this);
    }
    start() {
        if (this.pausedTime != null) {
            this.timeStart += performance.now() - this.pausedTime;
            this.pausedTime = null;
        } else {
            this.timeStart = performance.now();
        }
        this.state = "running";
        requestAnimationUpdate();
        return this;
    }
    pause() {
        this.pausedTime = performance.now();
        this.state = "paused";
        return this;
    }
    stop() {
        let index = animationTasks.indexOf(this);
        if (index !== -1) {
            animationTasks.splice(index, 1);
        }
        this.state = "stopped";
        if (this.stopResolve) {
            this.stopResolve();
            this.stopResolve = null;
            this.stopPromise = null;
        }
        return this;
    }
    restore() {
        return this;
    }
    waitUntilStopped() {
        var _a;
        (_a = this.stopPromise) != null ? _a : this.stopPromise = new Promise(resolve => {
            this.stopResolve = resolve;
        });
        return this.stopPromise;
    }
    on() {
        return this;
    }
    once() {
        return this;
    }
    off() {
        return this;
    }
    emit() {
        return this;
    }
}

function animate(props2, settings) {
    return new AnimationController(this, props2, settings);
}

let elMap = new WeakMap;

function updateNodeParent(node) {
    if (node.parent != null) {
        elMap.get(node.parent).appendChild(node.div);
    }
}

function getNodeLineHeight(props2) {
    var _a, _b;
    return (_b = (_a = props2.lineHeight) != null ? _a : Config.fontSettings.lineHeight) != null ? _b : 1.2 * props2.fontSize;
}

function updateNodeStyles(node) {
    var _a, _b, _c, _d, _e, _f;
    let {props: props2} = node;
    let style = "position: absolute; z-index: ".concat(props2.zIndex, ";");
    if (props2.alpha !== 1) style += "opacity: ".concat(props2.alpha, ";");
    if (props2.clipping) {
        style += "overflow: hidden;";
    }
    {
        let transform = "";
        let {x: x, y: y} = props2;
        if (props2.mountX != null) {
            x -= ((_a = props2.w) != null ? _a : 0) * props2.mountX;
        }
        if (props2.mountY != null) {
            y -= ((_b = props2.h) != null ? _b : 0) * props2.mountY;
        }
        if (x !== 0) transform += "translateX(".concat(x, "px)");
        if (y !== 0) transform += "translateY(".concat(y, "px)");
        if (props2.rotation !== 0) transform += "rotate(".concat(props2.rotation, "rad)");
        if (props2.scale !== 1 && props2.scale != null) {
            transform += "scale(".concat(props2.scale, ")");
        } else {
            if (props2.scaleX !== 1) transform += "scaleX(".concat(props2.scaleX, ")");
            if (props2.scaleY !== 1) transform += "scaleY(".concat(props2.scaleY, ")");
        }
        if (transform.length > 0) {
            style += "transform: ".concat(transform, ";");
        }
    }
    if (node instanceof DOMText) {
        let textProps = node.props;
        if (textProps.color != null && textProps.color !== 0) {
            style += "color: ".concat(colorToRgba(textProps.color), ";");
        }
        if (textProps.fontFamily) {
            style += "font-family: ".concat(textProps.fontFamily, ";");
        }
        if (textProps.fontSize) {
            style += "font-size: ".concat(textProps.fontSize, "px;");
        }
        if (textProps.fontStyle !== "normal") {
            style += "font-style: ".concat(textProps.fontStyle, ";");
        }
        if (textProps.fontWeight !== "normal") {
            style += "font-weight: ".concat(textProps.fontWeight, ";");
        }
        if (textProps.lineHeight != null) {
            style += "line-height: ".concat(textProps.lineHeight, "px;");
        }
        if (textProps.letterSpacing) {
            style += "letter-spacing: ".concat(textProps.letterSpacing, "px;");
        }
        if (textProps.textAlign !== "left") {
            style += "text-align: ".concat(textProps.textAlign, ";");
        }
        let maxLines = textProps.maxLines || Infinity;
        switch (textProps.contain) {
          case "width":
            style += "width: ".concat(props2.w, "px; overflow: hidden;");
            break;

          case "both":
            {
                let lineHeight = getNodeLineHeight(textProps);
                maxLines = Math.min(maxLines, Math.floor(props2.h / lineHeight));
                maxLines = Math.max(1, maxLines);
                let height = maxLines * lineHeight;
                style += "width: ".concat(props2.w, "px; height: ").concat(height, "px; overflow: hidden;");
                break;
            }

          case "none":
            style += "width: max-content;";
            break;
        }
        if (maxLines !== Infinity) {
            style += "display: -webkit-box;\n        overflow: hidden;\n        -webkit-line-clamp: ".concat(maxLines, ";\n        line-clamp: ").concat(maxLines, ";\n        -webkit-box-orient: vertical;");
        }
        scheduleUpdateDOMTextMeasurement(node);
    } else {
        if (props2.w !== 0) style += "width: ".concat(props2.w, "px;");
        if (props2.h !== 0) style += "height: ".concat(props2.h, "px;");
        let vGradient = props2.colorBottom !== props2.colorTop ? "linear-gradient(to bottom, ".concat(colorToRgba(props2.colorTop), ", ").concat(colorToRgba(props2.colorBottom), ")") : null;
        let hGradient = props2.colorLeft !== props2.colorRight ? "linear-gradient(to right, ".concat(colorToRgba(props2.colorLeft), ", ").concat(colorToRgba(props2.colorRight), ")") : null;
        let gradient = vGradient && hGradient ? "".concat(vGradient, ", ").concat(hGradient) : vGradient || hGradient;
        let srcImg = null;
        let srcPos = null;
        if (props2.texture != null && props2.texture.type === TextureType.subTexture) {
            srcPos = props2.texture.props;
            srcImg = "url(".concat(props2.texture.props.texture.props.src, ")");
        } else if (props2.src) {
            srcImg = "url(".concat(props2.src, ")");
        }
        let bgStyle = "";
        let borderStyle = "";
        let radiusStyle = "";
        let maskStyle = "";
        if (srcImg) {
            if (props2.color !== 4294967295 && props2.color !== 0) {
                bgStyle += "background-color: ".concat(colorToRgba(props2.color), "; background-blend-mode: multiply;");
                maskStyle += "mask-image: ".concat(srcImg, ";");
                if (srcPos !== null) {
                    maskStyle += "mask-position: -".concat(srcPos.x, "px -").concat(srcPos.y, "px;");
                } else {
                    maskStyle += "mask-size: 100% 100%;";
                }
            } else if (gradient) {
                maskStyle += "mask-image: ".concat(gradient, ";");
            }
            bgStyle += "background-image: ".concat(srcImg, ";");
            bgStyle += "background-repeat: no-repeat;";
            if ((_c = props2.textureOptions.resizeMode) == null ? void 0 : _c.type) {
                bgStyle += "background-size: ".concat(props2.textureOptions.resizeMode.type, "; background-position: center;");
            } else if (srcPos !== null) {
                bgStyle += "background-position: -".concat(srcPos.x, "px -").concat(srcPos.y, "px;");
            } else {
                bgStyle += "background-size: 100% 100%;";
            }
            if (maskStyle !== "") {
                bgStyle += maskStyle;
            }
            if (maskStyle !== "" && node.divBg == null) {
                node.div.appendChild(node.divBg = document.createElement("div"));
                node.div.appendChild(node.divBorder = document.createElement("div"));
            }
        } else if (gradient) {
            bgStyle += "background-image: ".concat(gradient, ";");
            bgStyle += "background-repeat: no-repeat;";
            bgStyle += "background-size: 100% 100%;";
        } else if (props2.color !== 0) {
            bgStyle += "background-color: ".concat(colorToRgba(props2.color), ";");
        }
        if (((_d = props2.shader) == null ? void 0 : _d.props) != null) {
            let shader = props2.shader.props;
            let borderWidth = shader["border-w"];
            let borderColor = shader["border-color"];
            let borderGap = (_e = shader["border-gap"]) != null ? _e : 0;
            let borderInset = (_f = shader["border-inset"]) != null ? _f : true;
            let radius = shader["radius"];
            if (typeof borderWidth === "number" && borderWidth !== 0 && typeof borderColor === "number" && borderColor !== 0) {
                let gap = borderInset ? -(borderWidth + borderGap) : borderGap;
                borderStyle += "outline: ".concat(borderWidth, "px solid ").concat(colorToRgba(borderColor), ";");
                borderStyle += "outline-offset: ".concat(gap, "px;");
            }
            if (typeof radius === "number" && radius > 0) {
                radiusStyle += "border-radius: ".concat(radius, "px;");
            } else if (Array.isArray(radius) && radius.length === 4) {
                radiusStyle += "border-radius: ".concat(radius[0], "px ").concat(radius[1], "px ").concat(radius[2], "px ").concat(radius[3], "px;");
            }
        }
        style += radiusStyle;
        bgStyle += radiusStyle;
        borderStyle += radiusStyle;
        if (node.divBg == null) {
            style += bgStyle;
        } else {
            bgStyle += "position: absolute; inset: 0; z-index: -1;";
            node.divBg.setAttribute("style", bgStyle);
        }
        if (node.divBorder == null) {
            style += borderStyle;
        } else {
            borderStyle += "position: absolute; inset: 0; z-index: -1;";
            node.divBorder.setAttribute("style", borderStyle);
        }
    }
    node.div.setAttribute("style", style);
}

const fontFamiliesToLoad = new Set;

const textNodesToMeasure = new Set;

function getElSize(node) {
    var _a, _b;
    let rect = node.div.getBoundingClientRect();
    let dpr = (_b = (_a = Config.rendererOptions) == null ? void 0 : _a.deviceLogicalPixelRatio) != null ? _b : 1;
    rect.height /= dpr;
    rect.width /= dpr;
    for (;;) {
        if (node.props.scale != null && node.props.scale !== 1) {
            rect.height /= node.props.scale;
            rect.width /= node.props.scale;
        } else {
            rect.height /= node.props.scaleY;
            rect.width /= node.props.scaleX;
        }
        if (node.parent instanceof DOMNode) {
            node = node.parent;
        } else {
            break;
        }
    }
    return rect;
}

function updateDOMTextSize(node) {
    let size;
    switch (node.contain) {
      case "width":
        size = getElSize(node);
        if (node.props.h !== size.height) {
            node.props.h = size.height;
            updateNodeStyles(node);
            node.emit("loaded");
        }
        break;

      case "none":
        size = getElSize(node);
        if (node.props.h !== size.height || node.props.w !== size.width) {
            node.props.w = size.width;
            node.props.h = size.height;
            updateNodeStyles(node);
            node.emit("loaded");
        }
        break;
    }
}

function updateDOMTextMeasurements() {
    textNodesToMeasure.forEach(updateDOMTextSize);
    textNodesToMeasure.clear();
}

function scheduleUpdateDOMTextMeasurement(node) {
    if (node.fontFamily && !fontFamiliesToLoad.has(node.fontFamily)) {
        fontFamiliesToLoad.add(node.fontFamily);
        document.fonts.load("16px ".concat(node.fontFamily));
    }
    if (textNodesToMeasure.size === 0) {
        if (document.fonts.status === "loaded") {
            setTimeout(updateDOMTextMeasurements);
        } else {
            document.fonts.ready.then(updateDOMTextMeasurements);
        }
    }
    textNodesToMeasure.add(node);
}

function updateNodeData(node) {
    for (let key in node.data) {
        let keyValue = node.data[key];
        if (keyValue === void 0) {
            node.div.removeAttribute("data-" + key);
        } else {
            node.div.setAttribute("data-" + key, String(keyValue));
        }
    }
}

function resolveNodeDefaults(props2) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V;
    const color = (_a = props2.color) != null ? _a : 4294967295;
    return {
        x: (_b = props2.x) != null ? _b : 0,
        y: (_c = props2.y) != null ? _c : 0,
        w: (_d = props2.w) != null ? _d : 0,
        h: (_e = props2.h) != null ? _e : 0,
        alpha: (_f = props2.alpha) != null ? _f : 1,
        autosize: (_g = props2.autosize) != null ? _g : false,
        boundsMargin: (_h = props2.boundsMargin) != null ? _h : null,
        clipping: (_i = props2.clipping) != null ? _i : false,
        color: color,
        colorTop: (_j = props2.colorTop) != null ? _j : color,
        colorBottom: (_k = props2.colorBottom) != null ? _k : color,
        colorLeft: (_l = props2.colorLeft) != null ? _l : color,
        colorRight: (_m = props2.colorRight) != null ? _m : color,
        colorBl: (_p = (_o = (_n = props2.colorBl) != null ? _n : props2.colorBottom) != null ? _o : props2.colorLeft) != null ? _p : color,
        colorBr: (_s = (_r = (_q = props2.colorBr) != null ? _q : props2.colorBottom) != null ? _r : props2.colorRight) != null ? _s : color,
        colorTl: (_v = (_u = (_t = props2.colorTl) != null ? _t : props2.colorTop) != null ? _u : props2.colorLeft) != null ? _v : color,
        colorTr: (_y = (_x = (_w = props2.colorTr) != null ? _w : props2.colorTop) != null ? _x : props2.colorRight) != null ? _y : color,
        zIndex: (_z = props2.zIndex) != null ? _z : 0,
        parent: (_A = props2.parent) != null ? _A : null,
        texture: (_B = props2.texture) != null ? _B : null,
        textureOptions: (_C = props2.textureOptions) != null ? _C : {},
        shader: (_D = props2.shader) != null ? _D : defaultShader,
        src: (_E = props2.src) != null ? _E : null,
        srcHeight: props2.srcHeight,
        srcWidth: props2.srcWidth,
        srcX: props2.srcX,
        srcY: props2.srcY,
        scale: (_F = props2.scale) != null ? _F : null,
        scaleX: (_H = (_G = props2.scaleX) != null ? _G : props2.scale) != null ? _H : 1,
        scaleY: (_J = (_I = props2.scaleY) != null ? _I : props2.scale) != null ? _J : 1,
        mount: (_K = props2.mount) != null ? _K : 0,
        mountX: (_M = (_L = props2.mountX) != null ? _L : props2.mount) != null ? _M : 0,
        mountY: (_O = (_N = props2.mountY) != null ? _N : props2.mount) != null ? _O : 0,
        pivot: (_P = props2.pivot) != null ? _P : .5,
        pivotX: (_R = (_Q = props2.pivotX) != null ? _Q : props2.pivot) != null ? _R : .5,
        pivotY: (_T = (_S = props2.pivotY) != null ? _S : props2.pivot) != null ? _T : .5,
        rotation: (_U = props2.rotation) != null ? _U : 0,
        rtt: (_V = props2.rtt) != null ? _V : false,
        data: {},
        imageType: props2.imageType
    };
}

function resolveTextNodeDefaults(props2) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r;
    return {
        ...resolveNodeDefaults(props2),
        text: (_a = props2.text) != null ? _a : "",
        textRendererOverride: (_b = props2.textRendererOverride) != null ? _b : null,
        fontSize: (_c = props2.fontSize) != null ? _c : 16,
        fontFamily: (_d = props2.fontFamily) != null ? _d : "sans-serif",
        fontStyle: (_e = props2.fontStyle) != null ? _e : "normal",
        fontWeight: (_f = props2.fontWeight) != null ? _f : "normal",
        forceLoad: (_g = props2.forceLoad) != null ? _g : false,
        textAlign: (_h = props2.textAlign) != null ? _h : "left",
        contain: (_i = props2.contain) != null ? _i : "none",
        offsetY: (_j = props2.offsetY) != null ? _j : 0,
        letterSpacing: (_k = props2.letterSpacing) != null ? _k : 0,
        lineHeight: (_l = props2.lineHeight) != null ? _l : 0,
        maxLines: (_m = props2.maxLines) != null ? _m : 0,
        maxWidth: (_n = props2.maxWidth) != null ? _n : 0,
        maxHeight: (_o = props2.maxHeight) != null ? _o : 0,
        verticalAlign: (_p = props2.verticalAlign) != null ? _p : "middle",
        overflowSuffix: (_q = props2.overflowSuffix) != null ? _q : "...",
        wordBreak: (_r = props2.wordBreak) != null ? _r : "overflow"
    };
}

const defaultShader = {
    shaderType: "",
    props: void 0
};

let lastNodeId = 0;

class DOMNode extends EventEmitter {
    constructor(stage, props2) {
        super();
        this.stage = stage;
        this.props = props2;
        this.div = document.createElement("div");
        this.id = ++lastNodeId;
        this.renderState = 0;
        this.animate = animate;
        this.div._node = this;
        this.div.setAttribute("data-id", String(this.id));
        elMap.set(this, this.div);
        updateNodeParent(this);
        updateNodeStyles(this);
        updateNodeData(this);
    }
    destroy() {
        elMap.delete(this);
        this.div.parentNode.removeChild(this.div);
    }
    get parent() {
        return this.props.parent;
    }
    set parent(value) {
        this.props.parent = value;
        updateNodeParent(this);
    }
    get x() {
        return this.props.x;
    }
    set x(v) {
        this.props.x = v;
        updateNodeStyles(this);
    }
    get y() {
        return this.props.y;
    }
    set y(v) {
        this.props.y = v;
        updateNodeStyles(this);
    }
    get w() {
        return this.props.w;
    }
    set w(v) {
        this.props.w = v;
        updateNodeStyles(this);
    }
    get h() {
        return this.props.h;
    }
    set h(v) {
        this.props.h = v;
        updateNodeStyles(this);
    }
    get width() {
        return this.props.w;
    }
    set width(v) {
        this.props.w = v;
        updateNodeStyles(this);
    }
    get height() {
        return this.props.h;
    }
    set height(v) {
        this.props.h = v;
        updateNodeStyles(this);
    }
    get alpha() {
        return this.props.alpha;
    }
    set alpha(v) {
        this.props.alpha = v;
        updateNodeStyles(this);
    }
    get autosize() {
        return this.props.autosize;
    }
    set autosize(v) {
        this.props.autosize = v;
        updateNodeStyles(this);
    }
    get clipping() {
        return this.props.clipping;
    }
    set clipping(v) {
        this.props.clipping = v;
        updateNodeStyles(this);
    }
    get color() {
        return this.props.color;
    }
    set color(v) {
        this.props.color = v;
        updateNodeStyles(this);
    }
    get colorTop() {
        return this.props.colorTop;
    }
    set colorTop(v) {
        this.props.colorTop = v;
        updateNodeStyles(this);
    }
    get colorBottom() {
        return this.props.colorBottom;
    }
    set colorBottom(v) {
        this.props.colorBottom = v;
        updateNodeStyles(this);
    }
    get colorLeft() {
        return this.props.colorLeft;
    }
    set colorLeft(v) {
        this.props.colorLeft = v;
        updateNodeStyles(this);
    }
    get colorRight() {
        return this.props.colorRight;
    }
    set colorRight(v) {
        this.props.colorRight = v;
        updateNodeStyles(this);
    }
    get colorTl() {
        return this.props.colorTl;
    }
    set colorTl(v) {
        this.props.colorTl = v;
        updateNodeStyles(this);
    }
    get colorTr() {
        return this.props.colorTr;
    }
    set colorTr(v) {
        this.props.colorTr = v;
        updateNodeStyles(this);
    }
    get colorBr() {
        return this.props.colorBr;
    }
    set colorBr(v) {
        this.props.colorBr = v;
        updateNodeStyles(this);
    }
    get colorBl() {
        return this.props.colorBl;
    }
    set colorBl(v) {
        this.props.colorBl = v;
        updateNodeStyles(this);
    }
    get zIndex() {
        return this.props.zIndex;
    }
    set zIndex(v) {
        this.props.zIndex = v;
        updateNodeStyles(this);
    }
    get texture() {
        return this.props.texture;
    }
    set texture(v) {
        this.props.texture = v;
        updateNodeStyles(this);
    }
    get textureOptions() {
        return this.props.textureOptions;
    }
    set textureOptions(v) {
        this.props.textureOptions = v;
        updateNodeStyles(this);
    }
    get src() {
        return this.props.src;
    }
    set src(v) {
        this.props.src = v;
        updateNodeStyles(this);
    }
    get scale() {
        var _a;
        return (_a = this.props.scale) != null ? _a : 1;
    }
    set scale(v) {
        this.props.scale = v;
        updateNodeStyles(this);
    }
    get scaleX() {
        return this.props.scaleX;
    }
    set scaleX(v) {
        this.props.scaleX = v;
        updateNodeStyles(this);
    }
    get scaleY() {
        return this.props.scaleY;
    }
    set scaleY(v) {
        this.props.scaleY = v;
        updateNodeStyles(this);
    }
    get mount() {
        return this.props.mount;
    }
    set mount(v) {
        this.props.mount = v;
        updateNodeStyles(this);
    }
    get mountX() {
        return this.props.mountX;
    }
    set mountX(v) {
        this.props.mountX = v;
        updateNodeStyles(this);
    }
    get mountY() {
        return this.props.mountY;
    }
    set mountY(v) {
        this.props.mountY = v;
        updateNodeStyles(this);
    }
    get pivot() {
        return this.props.pivot;
    }
    set pivot(v) {
        this.props.pivot = v;
        updateNodeStyles(this);
    }
    get pivotX() {
        return this.props.pivotX;
    }
    set pivotX(v) {
        this.props.pivotX = v;
        updateNodeStyles(this);
    }
    get pivotY() {
        return this.props.pivotY;
    }
    set pivotY(v) {
        this.props.pivotY = v;
        updateNodeStyles(this);
    }
    get rotation() {
        return this.props.rotation;
    }
    set rotation(v) {
        this.props.rotation = v;
        updateNodeStyles(this);
    }
    get rtt() {
        return this.props.rtt;
    }
    set rtt(v) {
        this.props.rtt = v;
        updateNodeStyles(this);
    }
    get shader() {
        return this.props.shader;
    }
    set shader(v) {
        this.props.shader = v;
        updateNodeStyles(this);
    }
    get data() {
        return this.props.data;
    }
    set data(v) {
        this.props.data = v;
        updateNodeData(this);
    }
    get imageType() {
        return this.props.imageType;
    }
    set imageType(v) {
        this.props.imageType = v;
    }
    get srcWidth() {
        return this.props.srcWidth;
    }
    set srcWidth(v) {
        this.props.srcWidth = v;
    }
    get srcHeight() {
        return this.props.srcHeight;
    }
    set srcHeight(v) {
        this.props.srcHeight = v;
    }
    get srcX() {
        return this.props.srcX;
    }
    set srcX(v) {
        this.props.srcX = v;
    }
    get srcY() {
        return this.props.srcY;
    }
    set srcY(v) {
        this.props.srcY = v;
    }
    get boundsMargin() {
        return this.props.boundsMargin;
    }
    set boundsMargin(value) {
        this.props.boundsMargin = value;
    }
    get absX() {
        var _a, _b;
        return this.x + -this.width * this.mountX + ((_b = (_a = this.parent) == null ? void 0 : _a.absX) != null ? _b : 0);
    }
    get absY() {
        var _a, _b;
        return this.y + -this.height * this.mountY + ((_b = (_a = this.parent) == null ? void 0 : _a.absY) != null ? _b : 0);
    }
}

class DOMText extends DOMNode {
    constructor(stage, props2) {
        super(stage, props2);
        this.props = props2;
        this.div.innerText = props2.text;
    }
    get text() {
        return this.props.text;
    }
    set text(v) {
        this.props.text = v;
        this.div.innerText = v;
        scheduleUpdateDOMTextMeasurement(this);
    }
    get fontFamily() {
        return this.props.fontFamily;
    }
    set fontFamily(v) {
        this.props.fontFamily = v;
        updateNodeStyles(this);
    }
    get fontSize() {
        return this.props.fontSize;
    }
    set fontSize(v) {
        this.props.fontSize = v;
        updateNodeStyles(this);
    }
    get fontStyle() {
        return this.props.fontStyle;
    }
    set fontStyle(v) {
        this.props.fontStyle = v;
        updateNodeStyles(this);
    }
    get fontWeight() {
        return this.props.fontWeight;
    }
    set fontWeight(v) {
        this.props.fontWeight = v;
        updateNodeStyles(this);
    }
    get forceLoad() {
        return this.props.forceLoad;
    }
    set forceLoad(v) {
        this.props.forceLoad = v;
    }
    get lineHeight() {
        return this.props.lineHeight;
    }
    set lineHeight(v) {
        this.props.lineHeight = v;
        updateNodeStyles(this);
    }
    get maxWidth() {
        return this.props.maxWidth;
    }
    set maxWidth(v) {
        this.props.maxWidth = v;
        updateNodeStyles(this);
    }
    get maxHeight() {
        return this.props.maxHeight;
    }
    set maxHeight(v) {
        this.props.maxHeight = v;
        updateNodeStyles(this);
    }
    get letterSpacing() {
        return this.props.letterSpacing;
    }
    set letterSpacing(v) {
        this.props.letterSpacing = v;
        updateNodeStyles(this);
    }
    get textAlign() {
        return this.props.textAlign;
    }
    set textAlign(v) {
        this.props.textAlign = v;
        updateNodeStyles(this);
    }
    get overflowSuffix() {
        return this.props.overflowSuffix;
    }
    set overflowSuffix(v) {
        this.props.overflowSuffix = v;
        updateNodeStyles(this);
    }
    get maxLines() {
        return this.props.maxLines;
    }
    set maxLines(v) {
        this.props.maxLines = v;
        updateNodeStyles(this);
    }
    get contain() {
        return this.props.contain;
    }
    set contain(v) {
        this.props.contain = v;
        updateNodeStyles(this);
    }
    get verticalAlign() {
        return this.props.verticalAlign;
    }
    set verticalAlign(v) {
        this.props.verticalAlign = v;
        updateNodeStyles(this);
    }
    get textRendererOverride() {
        return this.props.textRendererOverride;
    }
    set textRendererOverride(v) {
        this.props.textRendererOverride = v;
        updateNodeStyles(this);
    }
    get offsetY() {
        return this.props.offsetY;
    }
    set offsetY(v) {
        this.props.offsetY = v;
        updateNodeStyles(this);
    }
    get wordBreak() {
        return this.props.wordBreak;
    }
    set wordBreak(v) {
        this.props.wordBreak = v;
        updateNodeStyles(this);
    }
}

function updateRootPosition() {
    var _a, _b, _c;
    let {canvas: canvas2, settings: settings} = this;
    let rect = canvas2.getBoundingClientRect();
    let top = document.documentElement.scrollTop + rect.top;
    let left = document.documentElement.scrollLeft + rect.left;
    let dpr = (_a = settings.deviceLogicalPixelRatio) != null ? _a : 1;
    let height = Math.ceil((_b = settings.appHeight) != null ? _b : 1080 / dpr);
    let width = Math.ceil((_c = settings.appWidth) != null ? _c : 1920 / dpr);
    this.root.div.style.left = "".concat(left, "px");
    this.root.div.style.top = "".concat(top, "px");
    this.root.div.style.width = "".concat(width, "px");
    this.root.div.style.height = "".concat(height, "px");
    this.root.div.style.position = "absolute";
    this.root.div.style.transformOrigin = "0 0 0";
    this.root.div.style.transform = "scale(".concat(dpr, ", ").concat(dpr, ")");
    this.root.div.style.overflow = "hidden";
}

class DOMRendererMain {
    constructor(settings, rawTarget) {
        var _a, _b;
        this.settings = settings;
        let target;
        if (typeof rawTarget === "string") {
            let result = document.getElementById(rawTarget);
            if (result instanceof HTMLElement) {
                target = result;
            } else {
                throw new Error("Target #".concat(rawTarget, " not found"));
            }
        } else {
            target = rawTarget;
        }
        let canvas2 = document.body.appendChild(document.createElement("canvas"));
        canvas2.style.position = "absolute";
        canvas2.style.top = "0";
        canvas2.style.left = "0";
        canvas2.style.width = "100vw";
        canvas2.style.height = "100vh";
        this.canvas = canvas2;
        this.stage = {
            root: null,
            renderer: {
                mode: "canvas"
            },
            loadFont: async () => {},
            shManager: {
                registerShaderType() {}
            },
            animationManager: {
                registerAnimation() {},
                unregisterAnimation() {}
            }
        };
        this.root = new DOMNode(this.stage, resolveNodeDefaults({
            w: (_a = settings.appWidth) != null ? _a : 1920,
            h: (_b = settings.appHeight) != null ? _b : 1080,
            shader: defaultShader,
            zIndex: 65534
        }));
        this.stage.root = this.root;
        target.appendChild(this.root.div);
        if (Config.fontSettings.fontFamily) {
            this.root.div.style.fontFamily = Config.fontSettings.fontFamily;
        }
        if (Config.fontSettings.fontSize) {
            this.root.div.style.fontSize = Config.fontSettings.fontSize + "px";
        }
        if (Config.fontSettings.lineHeight) {
            this.root.div.style.lineHeight = Config.fontSettings.lineHeight + "px";
        } else {
            this.root.div.style.lineHeight = "1.2";
        }
        if (Config.fontSettings.fontWeight) {
            if (typeof Config.fontSettings.fontWeight === "number") {
                this.root.div.style.fontWeight = Config.fontSettings.fontWeight + "px";
            } else {
                this.root.div.style.fontWeight = Config.fontSettings.fontWeight;
            }
        }
        updateRootPosition.call(this);
        new MutationObserver(updateRootPosition.bind(this)).observe(this.canvas, {
            attributes: true
        });
        new ResizeObserver(updateRootPosition.bind(this)).observe(this.canvas);
        window.addEventListener("resize", updateRootPosition.bind(this));
    }
    createNode(props2) {
        return new DOMNode(this.stage, resolveNodeDefaults(props2));
    }
    createTextNode(props2) {
        return new DOMText(this.stage, resolveTextNodeDefaults(props2));
    }
    createShader(shaderType, props2) {
        return {
            shaderType: shaderType,
            props: props2,
            program: {}
        };
    }
    createTexture(textureType, props2) {
        let type2 = TextureType.generic;
        switch (textureType) {
          case "SubTexture":
            type2 = TextureType.subTexture;
            break;

          case "ImageTexture":
            type2 = TextureType.image;
            break;

          case "ColorTexture":
            type2 = TextureType.color;
            break;

          case "NoiseTexture":
            type2 = TextureType.noise;
            break;

          case "RenderTexture":
            type2 = TextureType.renderToTexture;
            break;
        }
        return {
            type: type2,
            props: props2
        };
    }
    on(name, callback) {
        console.log("on", name, callback);
    }
}

let renderer$2;

function startLightningRenderer(options, rootId = "app") {
    renderer$2 = DOM_RENDERING ? new DOMRendererMain(options, rootId) : new RendererMain(options, rootId);
    return renderer$2;
}

function loadFonts(fonts2) {
    for (const font2 of fonts2) {
        if (renderer$2.stage.renderer.mode === "webgl" && "type" in font2 && (font2.type === "msdf" || font2.type === "ssdf")) {
            renderer$2.stage.loadFont("sdf", font2);
        } else if ("fontUrl" in font2 && renderer$2.stage.renderer.mode !== "webgl") {
            renderer$2.stage.loadFont("canvas", font2);
        }
    }
}

class States extends Array {
    constructor(callback, initialState = {}) {
        if (isArray(initialState)) {
            super(...initialState);
        } else if (isString(initialState)) {
            super(initialState);
        } else {
            super(...Object.entries(initialState).filter(([_key, value]) => value).map(([key]) => key));
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
    var _a, _b, _c;
    const direction = node.flexDirection || "row";
    const isRow = direction === "row";
    const dimension = isRow ? "width" : "height";
    const crossDimension = isRow ? "height" : "width";
    const marginOne = isRow ? "marginLeft" : "marginTop";
    const crossMarginOne = isRow ? "marginTop" : "marginLeft";
    const marginTwo = isRow ? "marginRight" : "marginBottom";
    const crossMarginTwo = isRow ? "marginBottom" : "marginRight";
    const processedChildren = [];
    let hasOrder = false;
    let totalFlexGrow = 0;
    for (let i = 0; i < node.children.length; i++) {
        const c = node.children[i];
        if (isElementText(c) && c.text && !(c.width || c.height)) {
            return false;
        }
        if (isTextNode(c) || c.flexItem === false) {
            continue;
        }
        const flexOrder = c.flexOrder;
        if (flexOrder !== void 0) {
            hasOrder = true;
        }
        const flexGrow = c.flexGrow;
        const isGrowItem = flexGrow !== void 0 && flexGrow >= 0;
        if (isGrowItem) {
            totalFlexGrow += flexGrow;
        }
        const mainSize = c[dimension] || 0;
        const currentMarginStart = c[marginOne] || 0;
        const currentMarginEnd = c[marginTwo] || 0;
        processedChildren.push({
            node: c,
            mainSize: mainSize,
            marginStart: currentMarginStart,
            marginEnd: currentMarginEnd,
            totalMainSizeOnAxis: mainSize + currentMarginStart + currentMarginEnd,
            isGrowItem: isGrowItem,
            flexGrowValue: isGrowItem ? flexGrow : 0,
            flexOrder: flexOrder || 0,
            crossSize: c[crossDimension] || 0,
            crossMarginStart: c[crossMarginOne] || 0,
            crossMarginEnd: c[crossMarginTwo] || 0
        });
    }
    if (hasOrder) {
        processedChildren.sort((a, b) => a.flexOrder - b.flexOrder);
    } else if (node.direction === "rtl") {
        processedChildren.reverse();
    }
    const numProcessedChildren = processedChildren.length;
    if (numProcessedChildren === 0) {
        return false;
    }
    const prop = isRow ? "x" : "y";
    const crossProp = isRow ? "y" : "x";
    const containerSize = Math.max(node[dimension] || 0, 0);
    let containerCrossSize = Math.max(node[crossDimension] || 0, 0);
    const gap = node.gap || 0;
    const justify = node.justifyContent || "flexStart";
    let containerUpdated = false;
    if (totalFlexGrow > 0 && numProcessedChildren > 1) {
        node.flexBoundary = node.flexBoundary || "fixed";
        let sumOfFlexBaseSizesWithMargins = 0;
        for (const pc of processedChildren) {
            sumOfFlexBaseSizesWithMargins += pc.mainSize + pc.marginStart + pc.marginEnd;
        }
        const totalGapSpace = numProcessedChildren > 0 ? gap * (numProcessedChildren - 1) : 0;
        const availableSpace = containerSize - sumOfFlexBaseSizesWithMargins - totalGapSpace;
        if (availableSpace > 0) {
            for (const pc of processedChildren) {
                if (pc.isGrowItem && pc.flexGrowValue > 0) {
                    const shareOfSpace = pc.flexGrowValue / totalFlexGrow * availableSpace;
                    const newMainSize = pc.mainSize + shareOfSpace;
                    pc.node[dimension] = newMainSize;
                    pc.mainSize = newMainSize;
                    pc.totalMainSizeOnAxis = newMainSize + pc.marginStart + pc.marginEnd;
                }
            }
            node._containsFlexGrow = node._containsFlexGrow ? null : true;
        } else if (node._containsFlexGrow) {
            node._containsFlexGrow = null;
        } else {
            console.warn("No available space for flex-grow items to expand, or items overflow.");
        }
    }
    let totalItemSize = 0;
    if (justify === "center" || justify === "spaceBetween" || justify === "spaceEvenly" || justify === "spaceAround") {
        for (const pc of processedChildren) {
            totalItemSize += pc.totalMainSizeOnAxis;
        }
    }
    const align = node.alignItems || (node.flexWrap ? "flexStart" : void 0);
    const doCrossAlign = containerCrossSize ? (pc, crossCurrentPos = 0) => {
        const alignSelf = pc.node.alignSelf || align;
        if (!alignSelf) {
            return;
        }
        if (alignSelf === "flexStart") {
            pc.node[crossProp] = crossCurrentPos + pc.crossMarginStart;
        } else if (alignSelf === "center") {
            pc.node[crossProp] = crossCurrentPos + (containerCrossSize - pc.crossSize) / 2 + pc.crossMarginStart;
        } else if (alignSelf === "flexEnd") {
            pc.node[crossProp] = crossCurrentPos + containerCrossSize - pc.crossSize - pc.crossMarginEnd;
        }
    } : (_pc, _crossCurrentPos = 0) => {};
    if (isRow && node._calcHeight && !node.flexCrossBoundary) {
        const maxHeight = processedChildren.reduce((max, pc) => Math.max(max, pc.crossSize), 0);
        const newHeight = maxHeight || node.height;
        if (newHeight !== node.height) {
            containerUpdated = true;
            node.height = containerCrossSize = newHeight;
        }
    }
    let currentPos = node.padding || 0;
    if (justify === "flexStart") {
        if (node.flexWrap === "wrap") {
            let crossCurrentPos = 0;
            const childCrossSize = ((_a = processedChildren[0]) == null ? void 0 : _a.crossSize) || containerCrossSize;
            const crossGap = isRow ? (_b = node.columnGap) != null ? _b : gap : (_c = node.rowGap) != null ? _c : gap;
            for (const pc of processedChildren) {
                if (currentPos + pc.totalMainSizeOnAxis > containerSize && currentPos > (node.padding || 0)) {
                    currentPos = node.padding || 0;
                    crossCurrentPos += childCrossSize + crossGap;
                }
                pc.node[prop] = currentPos + pc.marginStart;
                currentPos += pc.totalMainSizeOnAxis + gap;
                doCrossAlign(pc, crossCurrentPos);
            }
            const finalCrossSize = crossCurrentPos + childCrossSize;
            if (node[crossDimension] !== finalCrossSize) {
                node["preFlex".concat(crossDimension)] = node[crossDimension];
                node[crossDimension] = finalCrossSize;
                containerUpdated = true;
            }
        } else {
            for (const pc of processedChildren) {
                pc.node[prop] = currentPos + pc.marginStart;
                currentPos += pc.totalMainSizeOnAxis + gap;
                doCrossAlign(pc);
            }
        }
        if (node.flexBoundary !== "fixed" && node.flexWrap !== "wrap") {
            const calculatedSize = currentPos - gap + (node.padding || 0);
            if (calculatedSize !== containerSize) {
                node["preFlex".concat(dimension)] = containerSize;
                node[dimension] = calculatedSize;
                return true;
            }
        }
    } else if (justify === "flexEnd") {
        currentPos = containerSize - (node.padding || 0);
        for (let i = numProcessedChildren - 1; i >= 0; i--) {
            const pc = processedChildren[i];
            pc.node[prop] = currentPos - pc.mainSize - pc.marginEnd;
            currentPos -= pc.totalMainSizeOnAxis + gap;
            doCrossAlign(pc);
        }
    } else if (justify === "center") {
        currentPos = (containerSize - (totalItemSize + gap * (numProcessedChildren - 1))) / 2 + (node.padding || 0);
        for (const pc of processedChildren) {
            pc.node[prop] = currentPos + pc.marginStart;
            currentPos += pc.totalMainSizeOnAxis + gap;
            doCrossAlign(pc);
        }
    } else if (justify === "spaceBetween") {
        const spaceBetween = numProcessedChildren > 1 ? (containerSize - totalItemSize - (node.padding || 0) * 2) / (numProcessedChildren - 1) : 0;
        currentPos = node.padding || 0;
        for (const pc of processedChildren) {
            pc.node[prop] = currentPos + pc.marginStart;
            currentPos += pc.totalMainSizeOnAxis + spaceBetween;
            doCrossAlign(pc);
        }
    } else if (justify === "spaceAround") {
        const spaceAround = numProcessedChildren > 0 ? (containerSize - totalItemSize - (node.padding || 0) * 2) / numProcessedChildren : 0;
        currentPos = (node.padding || 0) + spaceAround / 2;
        for (const pc of processedChildren) {
            pc.node[prop] = currentPos + pc.marginStart;
            currentPos += pc.totalMainSizeOnAxis + spaceAround;
            doCrossAlign(pc);
        }
    } else if (justify === "spaceEvenly") {
        const spaceEvenly = (containerSize - totalItemSize - (node.padding || 0) * 2) / (numProcessedChildren + 1);
        currentPos = spaceEvenly + (node.padding || 0);
        for (const pc of processedChildren) {
            pc.node[prop] = currentPos + pc.marginStart;
            currentPos += pc.totalMainSizeOnAxis + spaceEvenly;
            doCrossAlign(pc);
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

const keyHoldMapEntries = {};

const flattenKeyMap = (keyMap, targetMap) => {
    for (const [key, value] of Object.entries(keyMap)) {
        if (Array.isArray(value)) {
            value.forEach(v => {
                targetMap[v] = key;
            });
        } else if (value === null) {
            delete targetMap[key];
        } else {
            targetMap[value] = key;
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
    prevFocusPath2.forEach(elm => {
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

const setActiveElement$1 = elm => {
    updateFocusPath(elm, activeElement$1);
    activeElement$1 = elm;
    Config.setActiveElement(elm);
};

let focusPath$1 = [];

const updateFocusPath = (currentFocusedElm, prevFocusedElm) => {
    var _a, _b;
    let current = currentFocusedElm;
    const fp = [];
    while (current) {
        if (!current.states.has(Config.focusStateKey) || current === currentFocusedElm) {
            current.states.add(Config.focusStateKey);
            (_a = current.onFocus) == null ? void 0 : _a.call(current, currentFocusedElm, prevFocusedElm, current);
            (_b = current.onFocusChanged) == null ? void 0 : _b.call(current, true, currentFocusedElm, prevFocusedElm, current);
        }
        fp.push(current);
        current = current.parent;
    }
    focusPath$1.forEach(elm => {
        var _a2, _b2;
        if (!fp.includes(elm)) {
            elm.states.remove(Config.focusStateKey);
            (_a2 = elm.onBlur) == null ? void 0 : _a2.call(elm, currentFocusedElm, prevFocusedElm, elm);
            (_b2 = elm.onFocusChanged) == null ? void 0 : _b2.call(elm, false, currentFocusedElm, prevFocusedElm, elm);
        }
    });
    if (Config.focusDebug) {
        addFocusDebug(focusPath$1, fp);
    }
    focusPath$1 = fp;
    return fp;
};

let lastGlobalKeyPressTime = 0;

let lastInputKey;

const propagateKeyPress = (e, mappedEvent, isHold = false, isUp = false) => {
    const currentTime = performance.now();
    const key = e.key || e.keyCode;
    const sameKey = lastInputKey === key;
    lastInputKey = key;
    if (!isUp && Config.throttleInput) {
        if (sameKey && currentTime - lastGlobalKeyPressTime < Config.throttleInput) {
            return false;
        }
        lastGlobalKeyPressTime = currentTime;
    }
    let finalFocusElm;
    const numItems = focusPath$1.length;
    const captureEvent = "onCapture".concat(mappedEvent || e.key) + isUp ? "Release" : "";
    const captureKey = isUp ? "onCaptureKeyRelease" : "onCaptureKey";
    for (let i = numItems - 1; i >= 0; i--) {
        const elm = focusPath$1[i];
        if (elm.throttleInput) {
            if (sameKey && elm._lastAnyKeyPressTime !== void 0 && currentTime - elm._lastAnyKeyPressTime < elm.throttleInput) {
                return true;
            }
        }
        const captureHandler = elm[captureEvent] || elm[captureKey];
        if (isFunction(captureHandler) && captureHandler.call(elm, e, elm, finalFocusElm, mappedEvent) === true) {
            elm._lastAnyKeyPressTime = currentTime;
            return true;
        }
    }
    let eventHandlerKey;
    let releaseEventHandlerKey;
    let fallbackHandlerKey;
    if (mappedEvent) {
        eventHandlerKey = "on".concat(mappedEvent);
        releaseEventHandlerKey = "on".concat(mappedEvent, "Release");
    }
    if (!isUp) {
        fallbackHandlerKey = isHold ? "onKeyHold" : "onKeyPress";
    }
    for (let i = 0; i < numItems; i++) {
        const elm = focusPath$1[i];
        if (!finalFocusElm) {
            finalFocusElm = elm;
        }
        if (elm.throttleInput) {
            if (sameKey && elm._lastAnyKeyPressTime !== void 0 && currentTime - elm._lastAnyKeyPressTime < elm.throttleInput) {
                return true;
            }
        }
        let handled = false;
        if (isUp && releaseEventHandlerKey) {
            const eventHandler = elm[releaseEventHandlerKey];
            if (isFunction(eventHandler)) {
                if (eventHandler.call(elm, e, elm, finalFocusElm) === true) handled = true;
            }
        } else if (!isUp && eventHandlerKey) {
            const eventHandler = elm[eventHandlerKey];
            if (isFunction(eventHandler)) {
                if (eventHandler.call(elm, e, elm, finalFocusElm) === true) handled = true;
            }
        }
        if (!handled && fallbackHandlerKey) {
            const fallbackHandler = elm[fallbackHandlerKey];
            if (isFunction(fallbackHandler)) {
                if (fallbackHandler.call(elm, e, mappedEvent, elm, finalFocusElm) === true) handled = true;
            }
        }
        if (handled) {
            elm._lastAnyKeyPressTime = currentTime;
            return true;
        }
    }
    return false;
};

const DEFAULT_KEY_HOLD_THRESHOLD = 500;

const keyHoldTimeouts = {};

const handleKeyEvents = (delay2, keydown, keyup) => {
    if (keydown) {
        const key = keydown.key || keydown.keyCode;
        const mappedKeyHoldEvent = keyHoldMapEntries[keydown.key] || keyHoldMapEntries[keydown.keyCode];
        const mappedKeyEvent = keyMapEntries[keydown.key] || keyMapEntries[keydown.keyCode];
        if (mappedKeyHoldEvent) {
            if (!keyHoldTimeouts[key]) {
                keyHoldTimeouts[key] = window.setTimeout(() => {
                    keyHoldTimeouts[key] = true;
                    propagateKeyPress(keydown, mappedKeyHoldEvent, true);
                }, delay2);
            }
            return;
        }
        propagateKeyPress(keydown, mappedKeyEvent, false);
    } else if (keyup) {
        const key = keyup.key || keyup.keyCode;
        const mappedKeyEvent = keyMapEntries[keyup.key] || keyMapEntries[keyup.keyCode];
        if (keyHoldTimeouts[key] === true) {
            delete keyHoldTimeouts[key];
        } else if (keyHoldTimeouts[key]) {
            clearTimeout(keyHoldTimeouts[key]);
            delete keyHoldTimeouts[key];
            propagateKeyPress(keyup, mappedKeyEvent, false);
        }
        propagateKeyPress(keyup, mappedKeyEvent, false, true);
    }
};

const useFocusManager$1 = ({userKeyMap: userKeyMap, keyHoldOptions: keyHoldOptions, ownerContext: ownerContext = cb => {
    cb();
}} = {}) => {
    if (userKeyMap) {
        flattenKeyMap(userKeyMap, keyMapEntries);
    }
    if (keyHoldOptions == null ? void 0 : keyHoldOptions.userKeyHoldMap) {
        flattenKeyMap(keyHoldOptions.userKeyHoldMap, keyHoldMapEntries);
    }
    const delay2 = (keyHoldOptions == null ? void 0 : keyHoldOptions.holdThreshold) || DEFAULT_KEY_HOLD_THRESHOLD;
    const runKeyEvent = handleKeyEvents.bind(null, delay2);
    const keyPressHandler = event => ownerContext(() => {
        runKeyEvent(event, void 0);
    });
    const keyUpHandler = event => ownerContext(() => {
        runKeyEvent(void 0, event);
    });
    document.addEventListener("keyup", keyUpHandler);
    document.addEventListener("keydown", keyPressHandler);
    return {
        cleanup: () => {
            document.removeEventListener("keydown", keyPressHandler);
            document.removeEventListener("keyup", keyUpHandler);
            for (const [_, timeout] of Object.entries(keyHoldTimeouts)) {
                if (timeout && timeout !== true) clearTimeout(timeout);
            }
        },
        focusPath: () => focusPath$1
    };
};

class SimpleAnimation {
    constructor() {
        this.nodeConfigs = [];
        this.isRegistered = false;
    }
    register(stage) {
        if (this.isRegistered) {
            return;
        }
        this.isRegistered = true;
        this.stage = stage;
        stage.animationManager.registerAnimation(this);
    }
    add(node, key, value, settings) {
        var _a, _b;
        const existingConfig = this.nodeConfigs.find(config => config.node === node && config.propName === key);
        const duration = (_a = settings.duration) != null ? _a : 0;
        const delay2 = (_b = settings.delay) != null ? _b : 0;
        const easing = settings.easing || "linear";
        const timingFunction = isFunc(easing) ? easing : getTimingFunction(easing);
        const targetValue = value;
        const startValue = node[key];
        if (existingConfig) {
            existingConfig.duration = duration;
            existingConfig.delay = delay2;
            existingConfig.easing = easing;
            existingConfig.timingFunction = timingFunction;
            existingConfig.targetValue = targetValue;
            existingConfig.startValue = startValue;
            existingConfig.progress = 0;
            existingConfig.delayFor = delay2;
        } else {
            this.nodeConfigs.push({
                node: node,
                duration: duration,
                delay: delay2,
                easing: easing,
                progress: 0,
                delayFor: delay2,
                timingFunction: timingFunction,
                propName: key,
                startValue: startValue,
                targetValue: targetValue
            });
        }
    }
    update(dt) {
        var _a;
        for (let i = this.nodeConfigs.length - 1; i >= 0; i--) {
            const nodeConfig = this.nodeConfigs[i];
            const {node: node, duration: duration, timingFunction: timingFunction, propName: propName, startValue: startValue, targetValue: targetValue} = nodeConfig;
            let remainingDt = dt;
            if (nodeConfig.delayFor > 0) {
                nodeConfig.delayFor -= remainingDt;
                if (nodeConfig.delayFor >= 0) {
                    continue;
                } else {
                    remainingDt = -nodeConfig.delayFor;
                    nodeConfig.delayFor = 0;
                }
            }
            if (duration > 0) {
                nodeConfig.progress += remainingDt / duration;
                nodeConfig.progress = Math.max(0, Math.min(1, nodeConfig.progress));
            } else if (duration === 0 && nodeConfig.delayFor <= 0) {
                nodeConfig.progress = 1;
            }
            const easedProgress = timingFunction(nodeConfig.progress) || nodeConfig.progress;
            let interpolatedValue;
            if (nodeConfig.progress === 1) {
                interpolatedValue = targetValue;
            } else {
                if (propName.includes("color")) {
                    interpolatedValue = mergeColorProgress(startValue, targetValue, easedProgress);
                } else {
                    interpolatedValue = startValue + (targetValue - startValue) * easedProgress;
                }
            }
            node.lng[propName] = interpolatedValue;
            if (nodeConfig.progress === 1) {
                this.nodeConfigs.splice(i, 1);
            }
            if (this.nodeConfigs.length === 0) {
                (_a = this.stage) == null ? void 0 : _a.animationManager.unregisterAnimation(this);
                this.isRegistered = false;
            }
        }
    }
}

const simpleAnimation = new SimpleAnimation;

let layoutRunQueued = false;

const layoutQueue = new Set;

function addToLayoutQueue(node) {
    layoutQueue.add(node);
    if (!layoutRunQueued) {
        layoutRunQueued = true;
        queueMicrotask(runLayout);
    }
}

function runLayout() {
    while (layoutQueue.size > 0) {
        const queue = [ ...layoutQueue ];
        layoutQueue.clear();
        for (let i = queue.length - 1; i >= 0; i--) {
            const node = queue[i];
            node.updateLayout();
        }
    }
    layoutRunQueued = false;
}

const parseAndAssignShaderProps = (prefix, obj, props2 = {}) => {
    if (!obj) return;
    props2[prefix] = obj;
    Object.entries(obj).forEach(([key, value]) => {
        let transformedKey = key === "width" ? "w" : key;
        props2["".concat(prefix, "-").concat(transformedKey)] = value;
    });
};

function convertToShader(_node, v) {
    let type2 = "rounded";
    if (v.border) type2 += "WithBorder";
    if (v.shadow) type2 += "WithShadow";
    return renderer$2.createShader(type2, v);
}

function getPropertyAlias(name) {
    if (name === "w") return "width";
    if (name === "h") return "height";
    return name;
}

const LightningRendererNumberProps = [ "alpha", "color", "colorTop", "colorRight", "colorLeft", "colorBottom", "colorTl", "colorTr", "colorBl", "colorBr", "h", "fontSize", "lineHeight", "mount", "mountX", "mountY", "pivot", "pivotX", "pivotY", "rotation", "scale", "scaleX", "scaleY", "w", "worldX", "worldY", "x", "y", "zIndex", "zIndexLocked" ];

const LightningRendererNonAnimatingProps = [ "absX", "absY", "autosize", "clipping", "contain", "data", "destroyed", "fontStretch", "fontStyle", "imageType", "letterSpacing", "maxHeight", "maxLines", "maxWidth", "offsetY", "overflowSuffix", "preventCleanup", "rtt", "scrollable", "scrollY", "srcHeight", "srcWidth", "srcX", "srcY", "strictBounds", "text", "textAlign", "textBaseline", "textOverflow", "texture", "textureOptions", "verticalAlign", "wordWrap" ];

class ElementNode extends Object {
    constructor(name) {
        super();
        this._type = name === "text" ? NodeType.TextNode : NodeType.Element;
        this.rendered = false;
        this.lng = {};
        this.children = [];
    }
    get effects() {
        return this.lng.shader;
    }
    set effects(v) {
        var _a;
        if (!SHADERS_ENABLED) return;
        let target = this.lng.shader || {};
        if ((_a = this.lng.shader) == null ? void 0 : _a.program) {
            target = this.lng.shader.props;
        }
        if (v.rounded) target.radius = v.rounded.radius;
        if (v.borderRadius) target.radius = v.borderRadius;
        if (v.border) parseAndAssignShaderProps("border", v.border, target);
        if (v.shadow) parseAndAssignShaderProps("shadow", v.shadow, target);
        if (this.rendered) {
            if (!this.lng.shader) {
                this.lng.shader = convertToShader(this, target);
            } else if (DOM_RENDERING) {
                this.lng.shader = this.lng.shader;
            }
        } else {
            this.lng.shader = target;
        }
    }
    set id(id) {
        var _a;
        this._id = id;
        if ((_a = Config.rendererOptions) == null ? void 0 : _a.inspector) {
            this.data = {
                ...this.data,
                testId: id
            };
        }
    }
    get id() {
        return this._id;
    }
    get parent() {
        return this._parent;
    }
    set parent(p) {
        var _a;
        this._parent = p;
        if (this.rendered && (p == null ? void 0 : p.rendered)) {
            this.lng.parent = (_a = p.lng) != null ? _a : null;
        }
    }
    get height() {
        return this.maxHeight || this.h;
    }
    set height(h) {
        this.h = h;
    }
    get width() {
        return this.maxWidth || this.w;
    }
    set width(w) {
        this.w = w;
    }
    set fontWeight(v) {
        var _a;
        if (this._fontWeight === v) {
            return;
        }
        this._fontWeight = v;
        const weight = (_a = Config.fontWeightAlias && Config.fontWeightAlias[v]) != null ? _a : v;
        this.lng.fontFamily = "".concat(this.fontFamily).concat(weight);
    }
    get fontWeight() {
        return this._fontWeight;
    }
    set fontFamily(v) {
        this._fontFamily = v;
        this.lng.fontFamily = v;
    }
    get fontFamily() {
        var _a;
        return this._fontFamily || ((_a = Config.fontSettings) == null ? void 0 : _a.fontFamily);
    }
    insertChild(node, beforeNode) {
        if (node.parent) {
            node.parent.removeChild(node);
            if (!this.rendered) {
                this._hasRenderedChildren = true;
            }
        }
        node.parent = this;
        if (beforeNode) {
            spliceItem(this.children, node, 1);
            if (spliceItem(this.children, beforeNode, 0, node) > -1) {
                return;
            }
        }
        this.children.push(node);
    }
    removeChild(node) {
        var _a;
        if (spliceItem(this.children, node, 1) > -1) {
            (_a = node.onRemove) == null ? void 0 : _a.call(node, node);
            if (this.requiresLayout()) {
                addToLayoutQueue(this);
            }
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
        this.lng.shader = isArray(shaderProps) ? renderer$2.createShader(...shaderProps) : shaderProps;
    }
    _sendToLightningAnimatable(name, value) {
        if (this.transition && this.rendered && Config.animationsEnabled && (this.transition === true || this.transition[name] || this.transition[getPropertyAlias(name)])) {
            const animationSettings = this.transition === true || this.transition[name] === true ? void 0 : this.transition[name];
            if (Config.simpleAnimationsEnabled) {
                simpleAnimation.add(this, name, value, animationSettings || this.animationSettings);
                simpleAnimation.register(renderer$2.stage);
                return;
            } else {
                const animationController = this.animate({
                    [name]: value
                }, animationSettings);
                if (this.onAnimation) {
                    const animationEvents = Object.keys(this.onAnimation);
                    for (const event of animationEvents) {
                        const handler = this.onAnimation[event];
                        animationController.on(event, (controller, props2) => {
                            handler.call(this, controller, name, value, props2);
                        });
                    }
                }
                return animationController.start();
            }
        }
        this.lng[name] = value;
    }
    animate(props2, animationSettings) {
        return this.lng.animate(props2, animationSettings || this.animationSettings || {});
    }
    chain(props2, animationSettings) {
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
        this._animationQueue.push({
            props: props2,
            animationSettings: animationSettings
        });
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
        if (isINode(this.lng)) {
            this.lng.destroy();
        }
    }
    set style(style) {
        if (Config.lockStyles && this._style) {
            return;
        }
        if (!style) {
            return;
        }
        this._style = style;
        for (const key in this._style) {
            if (this[key] === void 0) {
                this[key] = this._style[key];
            }
        }
    }
    get style() {
        return this._style || {};
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
        return this.children.find(c => c.id === id);
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
        if (this.hasChildren) {
            if (this.display === "flex" && this.flexGrow && this.width === 0) {
                return;
            }
            const flexChanged = this.display === "flex" && calculateFlex(this);
            layoutQueue.delete(this);
            const onLayoutChanged = isFunc(this.onLayout) && this.onLayout.call(this, this);
            if ((flexChanged || onLayoutChanged) && this.parent) {
                addToLayoutQueue(this.parent);
            }
            if (this._containsFlexGrow === true) {
                this.children.forEach(c => {
                    if (c.display === "flex" && isElementNode(c)) {
                        calculateFlex(c);
                        isFunc(c.onLayout) && c.onLayout.call(c, c);
                        addToLayoutQueue(this);
                    }
                });
            }
        }
    }
    _stateChanged() {
        if (this.forwardStates) {
            const states2 = this.states.slice();
            this.children.forEach(c => {
                c.states = states2;
            });
        }
        const states = this.states;
        if (this._undoStyles || keyExists(this, states)) {
            let stylesToUndo;
            if (this._undoStyles && this._undoStyles.length) {
                stylesToUndo = {};
                this._undoStyles.forEach(styleKey => {
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
                newStyles = stylesToUndo ? {
                    ...stylesToUndo,
                    ...newStyles
                } : newStyles;
            } else {
                newStyles = states.reduce((acc, state) => {
                    const styles2 = this[state];
                    return styles2 ? {
                        ...acc,
                        ...styles2
                    } : acc;
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
        var _a, _b, _c, _d, _e, _f, _g, _h;
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
            (_a = this.onRender) == null ? void 0 : _a.call(this, this);
            return;
        }
        if (this._states) {
            this._stateChanged();
        }
        const props2 = node.lng;
        const parentWidth = parent.w || 0;
        const parentHeight = parent.h || 0;
        props2.x = props2.x || 0;
        props2.y = props2.y || 0;
        props2.parent = parent.lng;
        if (this.right || this.right === 0) {
            props2.x = parentWidth - this.right;
            props2.mountX = 1;
        }
        if (this.bottom || this.bottom === 0) {
            props2.y = parentHeight - this.bottom;
            props2.mountY = 1;
        }
        if (this.center) {
            this.centerX = this.centerY = true;
        }
        if (this.centerX) {
            props2.x += parentWidth / 2;
            props2.mountX = .5;
        }
        if (this.centerY) {
            props2.y += parentHeight / 2;
            props2.mountY = .5;
        }
        if (isElementText(node)) {
            const textProps = props2;
            if (Config.fontSettings) {
                for (const key in Config.fontSettings) {
                    if (textProps[key] === void 0) {
                        textProps[key] = Config.fontSettings[key];
                    }
                }
            }
            textProps.text = textProps.text || node.getText();
            if (textProps.textAlign && !textProps.contain) {
                console.warn("Text align requires contain: ", node.getText());
            }
            if (textProps.contain) {
                if (textProps.contain === "both") {
                    textProps.maxWidth = (_b = textProps.maxWidth) != null ? _b : textProps.w;
                    textProps.maxHeight = (_c = textProps.maxHeight) != null ? _c : textProps.h;
                } else if (textProps.contain === "width") {
                    textProps.maxWidth = (_d = textProps.maxWidth) != null ? _d : textProps.w;
                }
                if (!textProps.h && !textProps.maxHeight) {
                    textProps.maxLines = (_e = textProps.maxLines) != null ? _e : 99;
                }
                if (!textProps.maxWidth) {
                    textProps.maxWidth = parentWidth - textProps.x - (textProps.marginRight || 0);
                }
                if (textProps.contain === "both" && !textProps.maxHeight) {
                    textProps.maxHeight = parentHeight - textProps.y - (textProps.marginBottom || 0);
                } else if (textProps.maxLines === 1) {
                    textProps.maxHeight = textProps.maxHeight || textProps.lineHeight || textProps.fontSize;
                }
                textProps.w = textProps.h = void 0;
            }
            if (SHADERS_ENABLED && props2.shader && !props2.shader.program) {
                props2.shader = convertToShader(node, props2.shader);
            }
            node.lng = renderer$2.createTextNode(props2);
            if (parent.requiresLayout()) {
                if (!textProps.maxWidth || !textProps.maxHeight) {
                    node._layoutOnLoad();
                }
            }
        } else {
            if (!props2.texture) {
                if (isNaN(props2.w)) {
                    props2.w = node.flexGrow ? 0 : parentWidth - props2.x;
                    node._calcWidth = true;
                }
                if (isNaN(props2.h)) {
                    props2.h = parentHeight - props2.y;
                    node._calcHeight = true;
                }
                if (props2.rtt && !props2.color) {
                    props2.color = 4294967295;
                }
                if (!props2.color && !props2.src) {
                    props2.color = 0;
                }
            }
            if (SHADERS_ENABLED && props2.shader && !props2.shader.program) {
                props2.shader = convertToShader(node, props2.shader);
            }
            node.lng = renderer$2.createNode(props2);
            if (node._hasRenderedChildren) {
                node._hasRenderedChildren = false;
                for (const child of node.children) {
                    if (isElementNode(child) && isINode(child.lng)) {
                        child.lng.parent = node.lng;
                    }
                }
            }
        }
        node.rendered = true;
        if (node.autosize && parent.requiresLayout()) {
            node._layoutOnLoad();
        }
        (_f = this.onCreate) == null ? void 0 : _f.call(this, this);
        (_g = this.onRender) == null ? void 0 : _g.call(this, this);
        if (node.onEvent) {
            for (const [name, handler] of Object.entries(node.onEvent)) {
                node.lng.on(name, (_inode, data) => handler.call(node, node, data));
            }
        }
        if ((_h = node.lng) == null ? void 0 : _h.div) {
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
        if (topNode && !layoutRunQueued) {
            layoutRunQueued = true;
            queueMicrotask(runLayout);
        }
        node._autofocus && node.setFocus();
    }
}

for (const key of LightningRendererNumberProps) {
    Object.defineProperty(ElementNode.prototype, key, {
        get() {
            return this.lng[key];
        },
        set(v) {
            this._sendToLightningAnimatable(key, v);
        }
    });
}

for (const key of LightningRendererNonAnimatingProps) {
    Object.defineProperty(ElementNode.prototype, key, {
        get() {
            return this.lng[key];
        },
        set(v) {
            this.lng[key] = v;
        }
    });
}

function createRawShaderAccessor(key) {
    return {
        set(value) {
            this.shader = [ key, value ];
        },
        get() {
            return this.shader;
        }
    };
}

function shaderAccessor(key) {
    return {
        set(value) {
            var _a;
            let target = this.lng.shader || {};
            let animationSettings;
            if ((_a = this.lng.shader) == null ? void 0 : _a.program) {
                target = this.lng.shader.props;
                const transitionKey = key === "rounded" ? "borderRadius" : key;
                if (this.transition && (this.transition === true || this.transition[transitionKey])) {
                    target = {};
                    animationSettings = this.transition === true || this.transition[transitionKey] === true ? void 0 : this.transition[transitionKey];
                }
            }
            if (key === "rounded" || typeof value === "number") {
                target.radius = value;
            } else {
                parseAndAssignShaderProps(key, value, target);
            }
            if (this.rendered) {
                if (!this.lng.shader) {
                    this.lng.shader = convertToShader(this, target);
                }
            } else {
                this.lng.shader = target;
            }
            if (animationSettings) {
                this.animate({
                    shaderProps: target
                }, animationSettings).start();
            }
        },
        get() {
            var _a;
            return (_a = this.effects) == null ? void 0 : _a[key];
        }
    };
}

Object.defineProperties(ElementNode.prototype, {
    border: shaderAccessor("border"),
    shadow: shaderAccessor("shadow"),
    rounded: shaderAccessor("rounded"),
    borderRadius: shaderAccessor("rounded"),
    linearGradient: createRawShaderAccessor("linearGradient"),
    radialGradient: createRawShaderAccessor("radialGradient")
});

class WebGlShaderNode extends CoreShaderNode {
    constructor(shaderKey, config, program, stage, props2) {
        super(shaderKey, config, stage, props2);
        __publicField(this, "program");
        __publicField(this, "updater");
        __publicField(this, "valueKey", "");
        __publicField(this, "uniforms", {
            single: {},
            vec2: {},
            vec3: {},
            vec4: {}
        });
        this.program = program;
        if (config.update !== void 0) {
            this.updater = config.update;
            this.update = () => {
                if (this.props === void 0) {
                    this.updater(this.node, this.props);
                    return;
                }
                const prevKey = this.valueKey;
                this.valueKey = this.createValueKey();
                if (prevKey === this.valueKey) {
                    return;
                }
                if (prevKey.length > 0) {
                    this.stage.shManager.mutateShaderValueUsage(prevKey, -1);
                }
                const values = this.stage.shManager.getShaderValues(this.valueKey);
                if (values !== void 0) {
                    this.uniforms = values;
                    return;
                }
                this.uniforms = {
                    single: {},
                    vec2: {},
                    vec3: {},
                    vec4: {}
                };
                this.updater(this.node);
                this.stage.shManager.setShaderValues(this.valueKey, this.uniforms);
            };
        }
    }
    uniformRGBA(location, value) {
        this.uniform4fv(location, new Float32Array(getNormalizedRgbaComponents(value)));
    }
    uniform1f(location, value) {
        this.uniforms.single[location] = {
            method: "uniform1f",
            value: value
        };
    }
    uniform1fv(location, value) {
        this.uniforms.single[location] = {
            method: "uniform1fv",
            value: value
        };
    }
    uniform1i(location, value) {
        this.uniforms.single[location] = {
            method: "uniform1i",
            value: value
        };
    }
    uniform1iv(location, value) {
        this.uniforms.single[location] = {
            method: "uniform1iv",
            value: value
        };
    }
    uniform2f(location, v0, v1) {
        this.uniforms.vec2[location] = {
            method: "uniform2f",
            value: [ v0, v1 ]
        };
    }
    uniform2fv(location, value) {
        this.uniforms.single[location] = {
            method: "uniform2fv",
            value: value
        };
    }
    uniform2fa(location, value) {
        this.uniforms.vec2[location] = {
            method: "uniform2f",
            value: value
        };
    }
    uniform2i(location, v0, v1) {
        this.uniforms.vec2[location] = {
            method: "uniform2i",
            value: [ v0, v1 ]
        };
    }
    uniform2iv(location, value) {
        this.uniforms.single[location] = {
            method: "uniform2iv",
            value: value
        };
    }
    uniform3f(location, v0, v1, v2) {
        this.uniforms.vec3[location] = {
            method: "uniform3f",
            value: [ v0, v1, v2 ]
        };
    }
    uniform3fa(location, value) {
        this.uniforms.vec3[location] = {
            method: "uniform3f",
            value: value
        };
    }
    uniform3fv(location, value) {
        this.uniforms.single[location] = {
            method: "uniform3fv",
            value: value
        };
    }
    uniform3i(location, v0, v1, v2) {
        this.uniforms.vec3[location] = {
            method: "uniform3i",
            value: [ v0, v1, v2 ]
        };
    }
    uniform3iv(location, value) {
        this.uniforms.single[location] = {
            method: "uniform3iv",
            value: value
        };
    }
    uniform4f(location, v0, v1, v2, v3) {
        this.uniforms.vec4[location] = {
            method: "uniform4f",
            value: [ v0, v1, v2, v3 ]
        };
    }
    uniform4fa(location, value) {
        this.uniforms.vec4[location] = {
            method: "uniform4f",
            value: value
        };
    }
    uniform4fv(location, value) {
        this.uniforms.single[location] = {
            method: "uniform4fv",
            value: value
        };
    }
    uniform4i(location, v0, v1, v2, v3) {
        this.uniforms.vec4[location] = {
            method: "uniform4i",
            value: [ v0, v1, v2, v3 ]
        };
    }
    uniform4iv(location, value) {
        this.uniforms.single[location] = {
            method: "uniform4iv",
            value: value
        };
    }
    uniformMatrix2fv(location, value) {
        this.uniforms.single[location] = {
            method: "uniformMatrix2fv",
            value: value
        };
    }
    uniformMatrix3fv(location, value) {
        this.uniforms.single[location] = {
            method: "uniformMatrix3fv",
            value: value
        };
    }
    uniformMatrix4fv(location, value) {
        this.uniforms.single[location] = {
            method: "uniformMatrix4fv",
            value: value
        };
    }
}

const Rounded = {
    props: RoundedTemplate.props,
    update(node) {
        this.uniform4fa("u_radius", calcFactoredRadiusArray$1(this.props.radius, node.w, node.h));
    },
    vertex: "\n  # ifdef GL_FRAGMENT_PRECISION_HIGH\n  precision highp float;\n  # else\n  precision mediump float;\n  # endif\n\n  attribute vec2 a_position;\n  attribute vec2 a_textureCoords;\n  attribute vec4 a_color;\n  attribute vec2 a_nodeCoords;\n\n  uniform vec2 u_resolution;\n  uniform float u_pixelRatio;\n  uniform vec2 u_dimensions;\n\n  varying vec4 v_color;\n  varying vec2 v_textureCoords;\n  varying vec2 v_nodeCoords;\n\n  void main() {\n    vec2 normalized = a_position * u_pixelRatio;\n    vec2 screenSpace = vec2(2.0 / u_resolution.x, -2.0 / u_resolution.y);\n\n    v_color = a_color;\n    v_nodeCoords = a_nodeCoords;\n    v_textureCoords = a_textureCoords;\n\n    gl_Position = vec4(normalized.x * screenSpace.x - 1.0, normalized.y * -abs(screenSpace.y) + 1.0, 0.0, 1.0);\n    gl_Position.y = -sign(screenSpace.y) * gl_Position.y;\n  }\n",
    fragment: "\n    # ifdef GL_FRAGMENT_PRECISION_HIGH\n    precision highp float;\n    # else\n    precision mediump float;\n    # endif\n\n    //renderer applies these uniforms automatically\n    uniform vec2 u_resolution;\n    uniform vec2 u_dimensions;\n    uniform float u_alpha;\n    uniform float u_pixelRatio;\n    uniform sampler2D u_texture;\n\n    //custom uniforms\n    uniform vec4 u_radius;\n\n    varying vec4 v_color;\n    varying vec2 v_textureCoords;\n    varying vec2 v_nodeCoords;\n\n    float roundedBox(vec2 p, vec2 s, vec4 r) {\n      r.xy = (p.x > 0.0) ? r.yz : r.xw;\n      r.x = (p.y > 0.0) ? r.y : r.x;\n      vec2 q = abs(p) - s + r.x;\n      return (min(max(q.x, q.y), 0.0) + length(max(q, 0.0))) - r.x;\n    }\n\n    void main() {\n      vec4 color = texture2D(u_texture, v_textureCoords) * v_color;\n      vec2 halfDimensions = (u_dimensions * 0.5);\n\n      vec2 boxUv = v_nodeCoords.xy * u_dimensions - halfDimensions;\n      float boxDist = roundedBox(boxUv, halfDimensions, u_radius);\n\n      float edgeWidth = 1.0 / u_pixelRatio;\n      float roundedAlpha = 1.0 - smoothstep(-0.5 * edgeWidth, 0.5 * edgeWidth, boxDist);\n\n      vec4 resColor = vec4(0.0);\n      resColor = mix(resColor, color, roundedAlpha);\n      gl_FragColor = resColor * u_alpha;\n    }\n  "
};

const props$1 = Object.assign({}, RoundedTemplate.props, getBorderProps("border"), getShadowProps("shadow"));

const RoundedWithBorderAndShadowTemplate = {
    props: props$1
};

const RoundedWithBorderAndShadow = {
    props: RoundedWithBorderAndShadowTemplate.props,
    update(node) {
        const props2 = this.props;
        this.uniformRGBA("u_borderColor", props2["border-color"]);
        this.uniform4fa("u_borderWidth", props2["border-w"]);
        this.uniformRGBA("u_shadowColor", props2["shadow-color"]);
        this.uniform4fa("u_shadow", props2["shadow-projection"]);
        this.uniform4fa("u_radius", calcFactoredRadiusArray$1(props2.radius, node.w, node.h));
    },
    vertex: "\n    # ifdef GL_FRAGMENT_PRECISION_HIGH\n    precision highp float;\n    # else\n    precision mediump float;\n    # endif\n\n    attribute vec2 a_position;\n    attribute vec2 a_textureCoords;\n    attribute vec4 a_color;\n    attribute vec2 a_nodeCoords;\n\n    uniform vec2 u_resolution;\n    uniform float u_pixelRatio;\n    uniform float u_rtt;\n    uniform vec2 u_dimensions;\n\n    uniform vec4 u_shadow;\n    uniform vec4 u_radius;\n    uniform vec4 u_borderWidth;\n\n    varying vec4 v_color;\n    varying vec2 v_textureCoords;\n    varying vec2 v_nodeCoords;\n\n    varying vec4 v_innerRadius;\n    varying vec2 v_innerSize;\n    varying vec2 v_halfDimensions;\n    varying float v_borderZero;\n\n    void main() {\n      vec2 screenSpace = vec2(2.0 / u_resolution.x,  -2.0 / u_resolution.y);\n      vec2 outerEdge = clamp(a_nodeCoords * 2.0 - vec2(1.0), -1.0, 1.0);\n\n      vec2 shadowEdge = outerEdge * ((u_shadow.w * 2.0)+ u_shadow.z) + u_shadow.xy;\n      vec2 normVertexPos = a_position * u_pixelRatio;\n\n      vec2 vertexPos = (a_position + outerEdge + shadowEdge) * u_pixelRatio;\n      gl_Position = vec4(vertexPos.x * screenSpace.x - 1.0, -sign(screenSpace.y) * (vertexPos.y * -abs(screenSpace.y)) + 1.0, 0.0, 1.0);\n\n      v_halfDimensions = u_dimensions * 0.5;\n\n      v_color = a_color;\n      v_nodeCoords = a_nodeCoords + (screenSpace + shadowEdge) / (u_dimensions);\n      v_textureCoords = a_textureCoords + (screenSpace + shadowEdge) / (u_dimensions);\n\n      v_borderZero = u_borderWidth == vec4(0.0) ? 1.0 : 0.0;\n\n\n      if(v_borderZero == 0.0) {\n        v_innerRadius = vec4(\n          max(0.0, u_radius.x - max(u_borderWidth.x, u_borderWidth.w) - 0.5),\n          max(0.0, u_radius.y - max(u_borderWidth.x, u_borderWidth.y) - 0.5),\n          max(0.0, u_radius.z - max(u_borderWidth.z, u_borderWidth.y) - 0.5),\n          max(0.0, u_radius.w - max(u_borderWidth.z, u_borderWidth.w) - 0.5)\n        );\n\n        v_innerSize = (vec2(u_dimensions.x - (u_borderWidth[3] + u_borderWidth[1]) - 1.0, u_dimensions.y - (u_borderWidth[0] + u_borderWidth[2])) - 2.0) * 0.5;\n      }\n    }\n  ",
    fragment: "\n    # ifdef GL_FRAGMENT_PRECISION_HIGH\n    precision highp float;\n    # else\n    precision mediump float;\n    # endif\n\n    uniform vec2 u_resolution;\n    uniform float u_pixelRatio;\n    uniform float u_alpha;\n    uniform vec2 u_dimensions;\n    uniform sampler2D u_texture;\n    uniform float u_rtt;\n\n    uniform vec4 u_radius;\n    uniform vec4 u_borderWidth;\n    uniform vec4 u_borderColor;\n    uniform vec4 u_shadowColor;\n    uniform vec4 u_shadow;\n\n    varying vec4 v_color;\n    varying vec2 v_textureCoords;\n    varying vec2 v_nodeCoords;\n\n    varying vec2 v_halfDimensions;\n    varying vec4 v_innerRadius;\n    varying vec2 v_innerSize;\n    varying float v_borderZero;\n\n    float roundedBox(vec2 p, vec2 s, vec4 r) {\n      r.xy = (p.x > 0.0) ? r.yz : r.xw;\n      r.x = (p.y > 0.0) ? r.y : r.x;\n      vec2 q = abs(p) - s + r.x;\n      return (min(max(q.x, q.y), 0.0) + length(max(q, 0.0))) - r.x;\n    }\n\n    float shadowBox(vec2 p, vec2 s, vec4 r) {\n      r.xy = (p.x > 0.0) ? r.yz : r.xw;\n      r.x = (p.y > 0.0) ? r.y : r.x;\n      vec2 q = abs(p) - s + r.x;\n      float dist = min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r.x;\n      return 1.0 - smoothstep(-u_shadow.w, u_shadow.w + u_shadow.z, dist);\n    }\n\n    void main() {\n      vec4 color = texture2D(u_texture, v_textureCoords) * v_color;\n\n      vec2 boxUv = v_nodeCoords.xy * u_dimensions - v_halfDimensions;\n      float outerDist = roundedBox(boxUv, v_halfDimensions - 1.0, u_radius);\n\n      float edgeWidth = 1.0 / u_pixelRatio;\n      float outerAlpha = 1.0 - smoothstep(-0.5 * edgeWidth, 0.5 * edgeWidth, outerDist);\n\n      float shadowAlpha = shadowBox(boxUv - u_shadow.xy, v_halfDimensions + u_shadow.w, u_radius + u_shadow.z);\n      vec4 shadow = mix(vec4(0.0), u_shadowColor, shadowAlpha);\n\n      if(v_borderZero == 1.0) {\n        gl_FragColor = mix(shadow, color, outerAlpha) * u_alpha;\n        return;\n      }\n\n      boxUv.x += u_borderWidth.y > u_borderWidth.w ? (u_borderWidth.y - u_borderWidth.w) * 0.5 : -(u_borderWidth.w - u_borderWidth.y) * 0.5;\n      boxUv.y += u_borderWidth.z > u_borderWidth.x ? ((u_borderWidth.z - u_borderWidth.x) * 0.5 + 0.5) : -(u_borderWidth.x - u_borderWidth.z) * 0.5;\n\n      float innerDist = roundedBox(boxUv, v_innerSize, v_innerRadius);\n      float innerAlpha = 1.0 - smoothstep(-0.5 * edgeWidth, 0.5 * edgeWidth, innerDist);\n\n      vec4 resColor = mix(u_borderColor, color, innerAlpha);\n      resColor = mix(shadow, resColor, outerAlpha);\n      gl_FragColor = resColor * u_alpha;\n    }\n  "
};

const props = Object.assign({}, RoundedTemplate.props, getShadowProps("shadow"));

const RoundedWithShadowTemplate = {
    props: props
};

const Shadow = {
    vertex: "\n    # ifdef GL_FRAGMENT_PRECISION_HIGH\n    precision highp float;\n    # else\n    precision mediump float;\n    # endif\n\n    attribute vec2 a_position;\n    attribute vec2 a_textureCoords;\n    attribute vec4 a_color;\n    attribute vec2 a_nodeCoords;\n\n    uniform vec2 u_resolution;\n    uniform float u_pixelRatio;\n    uniform float u_rtt;\n    uniform vec2 u_dimensions;\n\n    uniform vec4 u_shadow;\n\n    varying vec4 v_color;\n    varying vec2 v_textureCoords;\n    varying vec2 v_nodeCoords;\n\n    void main() {\n      vec2 screenSpace = vec2(2.0 / u_resolution.x,  -2.0 / u_resolution.y);\n      vec2 outerEdge = clamp(a_nodeCoords * 2.0 - vec2(1.0), -1.0, 1.0);\n\n      vec2 shadowEdge = outerEdge * ((u_shadow.w * 2.0)+ u_shadow.z) + u_shadow.xy;\n      vec2 normVertexPos = a_position * u_pixelRatio;\n\n      vec2 vertexPos = (a_position + outerEdge + shadowEdge) * u_pixelRatio;\n      gl_Position = vec4(vertexPos.x * screenSpace.x - 1.0, -sign(screenSpace.y) * (vertexPos.y * -abs(screenSpace.y)) + 1.0, 0.0, 1.0);\n\n      v_color = a_color;\n      v_nodeCoords = a_nodeCoords + (screenSpace + shadowEdge) / (u_dimensions);\n      v_textureCoords = a_textureCoords + (screenSpace + shadowEdge) / (u_dimensions);\n    }\n  "
};

const RoundedWithShadow = {
    props: RoundedWithShadowTemplate.props,
    update(node) {
        this.uniformRGBA("u_shadow_color", this.props["shadow-color"]);
        this.uniform4fa("u_shadow", this.props["shadow-projection"]);
        this.uniform4fa("u_radius", calcFactoredRadiusArray$1(this.props.radius, node.w, node.h));
    },
    vertex: Shadow.vertex,
    fragment: "\n    # ifdef GL_FRAGMENT_PRECISION_HIGH\n    precision highp float;\n    # else\n    precision mediump float;\n    # endif\n\n    uniform vec2 u_resolution;\n    uniform float u_pixelRatio;\n    uniform float u_alpha;\n    uniform vec2 u_dimensions;\n    uniform sampler2D u_texture;\n\n    uniform vec4 u_shadow_color;\n    uniform vec4 u_shadow;\n    uniform vec4 u_radius;\n\n    uniform int u_asymWidth;\n\n    varying vec4 v_color;\n    varying vec2 v_textureCoords;\n    varying vec2 v_nodeCoords;\n\n    float roundedBox(vec2 p, vec2 s, vec4 r) {\n      r.xy = (p.x > 0.0) ? r.yz : r.xw;\n      r.x = (p.y > 0.0) ? r.y : r.x;\n      vec2 q = abs(p) - s + r.x;\n      return (min(max(q.x, q.y), 0.0) + length(max(q, 0.0))) - r.x;\n    }\n\n    float shadowBox(vec2 p, vec2 s, vec4 r) {\n      r.xy = (p.x > 0.0) ? r.yz : r.xw;\n      r.x = (p.y > 0.0) ? r.y : r.x;\n      vec2 q = abs(p) - s + r.x;\n      float dist = min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r.x;\n      return 1.0 - smoothstep(-(u_shadow.w), (u_shadow.w + u_shadow.z), dist);\n    }\n\n    void main() {\n      vec4 color = texture2D(u_texture, v_textureCoords) * v_color;\n      vec2 halfDimensions = (u_dimensions * 0.5);\n\n      vec2 boxUv = v_nodeCoords.xy * u_dimensions - halfDimensions;\n      float boxDist = roundedBox(boxUv, halfDimensions, u_radius);\n\n      float edgeWidth = 1.0 / u_pixelRatio;\n      float roundedAlpha = 1.0 - smoothstep(-0.5 * edgeWidth, 0.5 * edgeWidth, boxDist);\n\n      float shadowAlpha = shadowBox(boxUv - u_shadow.xy, halfDimensions + u_shadow.w, u_radius + u_shadow.z);\n\n      vec4 resColor = vec4(0.0);\n      resColor = mix(resColor, u_shadow_color, shadowAlpha);\n      resColor = mix(resColor, color, min(color.a, roundedAlpha));\n      gl_FragColor = resColor * u_alpha;\n    }\n  "
};

const HolePunch = {
    props: HolePunchTemplate.props,
    update() {
        const props2 = this.props;
        this.uniform2f("u_pos", props2.x, props2.y);
        this.uniform2f("u_size", props2.w * .5, props2.h * .5);
        this.uniform4fa("u_radius", calcFactoredRadiusArray$1(props2.radius, props2.w, props2.h));
    },
    getCacheMarkers(props2) {
        return "radiusArray:".concat(Array.isArray(props2.radius));
    },
    fragment: "\n    # ifdef GL_FRAGMENT_PRECISION_HIGH\n    precision highp float;\n    # else\n    precision mediump float;\n    # endif\n\n    uniform float u_alpha;\n    uniform float u_pixelRatio;\n    uniform vec2 u_dimensions;\n    uniform sampler2D u_texture;\n\n    uniform vec2 u_size;\n    uniform vec2 u_pos;\n\n    uniform vec4 u_radius;\n\n    uniform vec4 u_color;\n    varying vec4 v_color;\n    varying vec2 v_textureCoords;\n\n    void main() {\n      vec4 color = texture2D(u_texture, v_textureCoords) * v_color;\n      vec2 p = (v_textureCoords.xy * u_dimensions.xy - u_pos) - u_size;\n      vec4 r = u_radius;\n      r.xy = (p.x > 0.0) ? r.yz : r.xw;\n      r.x = (p.y > 0.0) ? r.y : r.x;\n      p = abs(p) - u_size + r.x;\n      float dist = min(max(p.x, p.y), 0.0) + length(max(p, 0.0)) - r.x + 2.0;\n      float roundedAlpha = 1.0 - smoothstep(0.0, u_pixelRatio, dist);\n      gl_FragColor = mix(color, vec4(0.0), min(color.a, roundedAlpha));\n    }\n  "
};

const LinearGradient = {
    props: LinearGradientTemplate.props,
    update() {
        const props2 = this.props;
        this.uniform1f("u_angle", props2.angle - Math.PI / 180 * 90);
        this.uniform1fv("u_stops", new Float32Array(props2.stops));
        const colors = [];
        for (let i = 0; i < props2.colors.length; i++) {
            const norm = getNormalizedRgbaComponents(props2.colors[i]);
            colors.push(norm[0], norm[1], norm[2], norm[3]);
        }
        this.uniform4fv("u_colors", new Float32Array(colors));
    },
    getCacheMarkers(props2) {
        return "colors:".concat(props2.colors.length);
    },
    fragment(renderer2, props2) {
        return "\n    # ifdef GL_FRAGMENT_PRECISION_HIGH\n    precision highp float;\n    # else\n    precision mediump float;\n    # endif\n\n    #define PI 3.14159265359\n    #define MAX_STOPS ".concat(props2.colors.length, "\n    #define LAST_STOP ").concat(props2.colors.length - 1, "\n\n    uniform float u_alpha;\n    uniform vec2 u_dimensions;\n\n    uniform sampler2D u_texture;\n\n    uniform float u_angle;\n    uniform float u_stops[MAX_STOPS];\n    uniform vec4 u_colors[MAX_STOPS];\n\n    varying vec4 v_color;\n    varying vec2 v_textureCoords;\n\n    vec2 calcPoint(float d, float angle) {\n      return d * vec2(cos(angle), sin(angle)) + (u_dimensions * 0.5);\n    }\n\n    vec4 getGradientColor(float dist) {\n      dist = clamp(dist, 0.0, 1.0);\n\n      if(dist <= u_stops[0]) {\n        return u_colors[0];\n      }\n\n      if(dist >= u_stops[LAST_STOP]) {\n        return u_colors[LAST_STOP];\n      }\n\n      for(int i = 0; i < LAST_STOP; i++) {\n        float left = u_stops[i];\n        float right = u_stops[i + 1];\n        if(dist >= left && dist <= right) {\n          float lDist = smoothstep(left, right, dist);\n          return mix(u_colors[i], u_colors[i + 1], lDist);\n        }\n      }\n    }\n\n    void main() {\n      vec4 color = texture2D(u_texture, v_textureCoords) * v_color;\n      float a = u_angle;\n      float lineDist = abs(u_dimensions.x * cos(a)) + abs(u_dimensions.y * sin(a));\n      vec2 f = calcPoint(lineDist * 0.5, a);\n      vec2 t = calcPoint(lineDist * 0.5, a + PI);\n      vec2 gradVec = t - f;\n      float dist = dot(v_textureCoords.xy * u_dimensions - f, gradVec) / dot(gradVec, gradVec);\n      vec4 colorOut = getGradientColor(dist);\n      vec3 blendedRGB = mix(color.rgb, colorOut.rgb, clamp(colorOut.a, 0.0, 1.0));\n      gl_FragColor = vec4(blendedRGB, color.a);\n    }\n  ");
    }
};

const RadialGradient = {
    props: RadialGradientTemplate.props,
    update(node) {
        const props2 = this.props;
        this.uniform2f("u_projection", props2.pivot[0] * node.w, props2.pivot[1] * node.h);
        this.uniform2f("u_size", props2.w, props2.h);
        this.uniform1fv("u_stops", new Float32Array(props2.stops));
        const colors = [];
        for (let i = 0; i < props2.colors.length; i++) {
            const norm = getNormalizedRgbaComponents(props2.colors[i]);
            colors.push(norm[0], norm[1], norm[2], norm[3]);
        }
        this.uniform4fv("u_colors", new Float32Array(colors));
    },
    getCacheMarkers(props2) {
        return "colors:".concat(props2.colors.length);
    },
    fragment(renderer2, props2) {
        return "\n      # ifdef GL_FRAGMENT_PRECISION_HIGH\n      precision highp float;\n      # else\n      precision mediump float;\n      # endif\n\n      #define MAX_STOPS ".concat(props2.colors.length, "\n      #define LAST_STOP ").concat(props2.colors.length - 1, "\n\n      uniform float u_alpha;\n      uniform vec2 u_dimensions;\n\n      uniform sampler2D u_texture;\n\n      uniform vec2 u_projection;\n      uniform vec2 u_size;\n\n      uniform float u_stops[MAX_STOPS];\n      uniform vec4 u_colors[MAX_STOPS];\n\n      varying vec4 v_color;\n      varying vec2 v_textureCoords;\n      varying vec2 v_nodeCoords;\n\n      vec4 getGradientColor(float dist) {\n        dist = clamp(dist, 0.0, 1.0);\n\n        if(dist <= u_stops[0]) {\n          return u_colors[0];\n        }\n\n        if(dist >= u_stops[LAST_STOP]) {\n          return u_colors[LAST_STOP];\n        }\n\n        for(int i = 0; i < LAST_STOP; i++) {\n          float left = u_stops[i];\n          float right = u_stops[i + 1];\n          if(dist >= left && dist <= right) {\n            float lDist = smoothstep(left, right, dist);\n            return mix(u_colors[i], u_colors[i + 1], lDist);\n          }\n        }\n\n        return u_colors[LAST_STOP];\n      }\n\n      void main() {\n        vec4 color = texture2D(u_texture, v_textureCoords) * v_color;\n        vec2 point = v_nodeCoords.xy * u_dimensions;\n        float dist = length((point - u_projection) / u_size);\n\n        vec4 colorOut = getGradientColor(dist);\n        vec3 blendedRGB = mix(color.rgb, colorOut.rgb, clamp(colorOut.a, 0.0, 1.0));\n        gl_FragColor = vec4(blendedRGB, color.a);\n      }\n    ");
    }
};

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

function setHydrateContext(context2) {
    sharedConfig.context = context2;
}

const IS_DEV = false;

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
    const listener = Listener, owner = Owner, unowned = fn.length === 0, current = detachedOwner === void 0 ? owner : detachedOwner, root = unowned ? UNOWNED : {
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
        value: value,
        observers: null,
        observerSlots: null,
        comparator: options.equals || void 0
    };
    const setter = value2 => {
        if (typeof value2 === "function") {
            if (Transition && Transition.running && Transition.sources.has(s)) value2 = value2(s.tValue); else value2 = value2(s.value);
        }
        return writeSignal(s, value2);
    };
    return [ readSignal.bind(s), setter ];
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
    const c = createComputation(fn, value, false, STALE), s = SuspenseContext && useContext(SuspenseContext);
    if (s) c.suspense = s;
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
    let pr = null, initP = NO_INIT, id = null, loadedUnderTransition = false, scheduled = false, resolved = "initialValue" in options, dynamic = typeof source === "function" && createMemo(source);
    const contexts = new Set, [value, setValue] = (options.storage || createSignal)(options.initialValue), [error, setError] = createSignal(void 0), [track, trigger] = createSignal(void 0, {
        equals: false
    }), [state, setState] = createSignal(resolved ? "ready" : "unresolved");
    if (sharedConfig.context) {
        id = sharedConfig.getNextContextId();
        if (options.ssrLoadFrom === "initial") initP = options.initialValue; else if (sharedConfig.load && sharedConfig.has(id)) initP = sharedConfig.load(id);
    }
    function loadEnd(p, v, error2, key) {
        if (pr === p) {
            pr = null;
            key !== void 0 && (resolved = true);
            if ((p === initP || v === initP) && options.onHydrated) queueMicrotask(() => options.onHydrated(key, {
                value: v
            }));
            initP = NO_INIT;
            if (Transition && p && loadedUnderTransition) {
                Transition.promises.delete(p);
                loadedUnderTransition = false;
                runUpdates(() => {
                    Transition.running = true;
                    completeLoad(v, error2);
                }, false);
            } else completeLoad(v, error2);
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
        const c = SuspenseContext && useContext(SuspenseContext), v = value(), err = error();
        if (err !== void 0 && !pr) throw err;
        if (Listener && !Listener.user && c) {
            createComputed(() => {
                track();
                if (pr) {
                    if (c.resolved && Transition && loadedUnderTransition) Transition.promises.add(pr); else if (!contexts.has(c)) {
                        c.increment();
                        contexts.add(c);
                    }
                }
            });
        }
        return v;
    }
    function load(refetching = true) {
        if (refetching !== false && scheduled) return;
        scheduled = false;
        const lookup = dynamic ? dynamic() : source;
        loadedUnderTransition = Transition && Transition.running;
        if (lookup == null || lookup === false) {
            loadEnd(pr, untrack(value));
            return;
        }
        if (Transition && pr) Transition.promises.delete(pr);
        let error2;
        const p = initP !== NO_INIT ? initP : untrack(() => {
            try {
                return fetcher(lookup, {
                    value: value(),
                    refetching: refetching
                });
            } catch (fetcherError) {
                error2 = fetcherError;
            }
        });
        if (error2 !== void 0) {
            loadEnd(pr, void 0, castError(error2), lookup);
            return;
        } else if (!isPromise(p)) {
            loadEnd(pr, p, void 0, lookup);
            return p;
        }
        pr = p;
        if ("v" in p) {
            if (p.s === 1) loadEnd(pr, p.v, void 0, lookup); else loadEnd(pr, void 0, castError(p.v), lookup);
            return p;
        }
        scheduled = true;
        queueMicrotask(() => scheduled = false);
        runUpdates(() => {
            setState(resolved ? "refreshing" : "pending");
            trigger();
        }, false);
        return p.then(v => loadEnd(p, v, void 0, lookup), e => loadEnd(p, void 0, castError(e), lookup));
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
    let owner = Owner;
    if (dynamic) createComputed(() => (owner = Owner, load(false))); else load(false);
    return [ read, {
        refetch: info => runWithOwner(owner, () => load(info)),
        mutate: setValue
    } ];
}

function createSelector(source, fn = equalFn, options) {
    const subs = new Map;
    const node = createComputation(p => {
        const v = source();
        for (const [key, val] of subs.entries()) if (fn(key, v) !== fn(key, p)) {
            for (const c of val.values()) {
                c.state = STALE;
                if (c.pure) Updates.push(c); else Effects.push(c);
            }
        }
        return v;
    }, void 0, true, STALE);
    updateComputation(node);
    return key => {
        const listener = Listener;
        if (listener) {
            let l;
            if (l = subs.get(key)) l.add(listener); else subs.set(key, l = new Set([ listener ]));
            onCleanup(() => {
                l.delete(listener);
                !l.size && subs.delete(key);
            });
        }
        return fn(key, Transition && Transition.running && Transition.sources.has(node) ? node.tValue : node.value);
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
    return prevValue => {
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
    if (Owner === null) ; else if (Owner.cleanups === null) Owner.cleanups = [ fn ]; else Owner.cleanups.push(fn);
    return fn;
}

function getListener() {
    return Listener;
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
    if (Transition && Transition.running) {
        fn();
        return Transition.done;
    }
    const l = Listener;
    const o = Owner;
    return Promise.resolve().then(() => {
        Listener = l;
        Owner = o;
        let t;
        if (SuspenseContext) {
            t = Transition || (Transition = {
                sources: new Set,
                effects: [],
                promises: new Set,
                disposed: new Set,
                queue: new Set,
                running: true
            });
            t.done || (t.done = new Promise(res => t.resolve = res));
            t.running = true;
        }
        runUpdates(fn, false);
        Listener = Owner = null;
        return t ? t.done : void 0;
    });
}

const [transPending, setTransPending] = createSignal(false);

function resumeEffects(e) {
    Effects.push.apply(Effects, e);
    e.length = 0;
}

function createContext(defaultValue, options) {
    const id = Symbol("context");
    return {
        id: id,
        Provider: createProvider(id),
        defaultValue: defaultValue
    };
}

function useContext(context2) {
    let value;
    return Owner && Owner.context && (value = Owner.context[context2.id]) !== void 0 ? value : context2.defaultValue;
}

function children(fn) {
    const children2 = createMemo(fn);
    const memo2 = createMemo(() => resolveChildren(children2()));
    memo2.toArray = () => {
        const c = memo2();
        return Array.isArray(c) ? c : c != null ? [ c ] : [];
    };
    return memo2;
}

let SuspenseContext;

function getSuspenseContext() {
    return SuspenseContext || (SuspenseContext = createContext());
}

function readSignal() {
    const runningTransition = Transition && Transition.running;
    if (this.sources && (runningTransition ? this.tState : this.state)) {
        if ((runningTransition ? this.tState : this.state) === STALE) updateComputation(this); else {
            const updates = Updates;
            Updates = null;
            runUpdates(() => lookUpstream(this), false);
            Updates = updates;
        }
    }
    if (Listener) {
        const sSlot = this.observers ? this.observers.length : 0;
        if (!Listener.sources) {
            Listener.sources = [ this ];
            Listener.sourceSlots = [ sSlot ];
        } else {
            Listener.sources.push(this);
            Listener.sourceSlots.push(sSlot);
        }
        if (!this.observers) {
            this.observers = [ Listener ];
            this.observerSlots = [ Listener.sources.length - 1 ];
        } else {
            this.observers.push(Listener);
            this.observerSlots.push(Listener.sources.length - 1);
        }
    }
    if (runningTransition && Transition.sources.has(this)) return this.tValue;
    return this.value;
}

function writeSignal(node, value, isComp) {
    let current = Transition && Transition.running && Transition.sources.has(node) ? node.tValue : node.value;
    if (!node.comparator || !node.comparator(current, value)) {
        if (Transition) {
            const TransitionRunning = Transition.running;
            if (TransitionRunning || !isComp && Transition.sources.has(node)) {
                Transition.sources.add(node);
                node.tValue = value;
            }
            if (!TransitionRunning) node.value = value;
        } else node.value = value;
        if (node.observers && node.observers.length) {
            runUpdates(() => {
                for (let i = 0; i < node.observers.length; i += 1) {
                    const o = node.observers[i];
                    const TransitionRunning = Transition && Transition.running;
                    if (TransitionRunning && Transition.disposed.has(o)) continue;
                    if (TransitionRunning ? !o.tState : !o.state) {
                        if (o.pure) Updates.push(o); else Effects.push(o);
                        if (o.observers) markDownstream(o);
                    }
                    if (!TransitionRunning) o.state = STALE; else o.tState = STALE;
                }
                if (Updates.length > 1e6) {
                    Updates = [];
                    if (IS_DEV) ;
                    throw new Error;
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
    runComputation(node, Transition && Transition.running && Transition.sources.has(node) ? node.tValue : node.value, time);
    if (Transition && !Transition.running && Transition.sources.has(node)) {
        queueMicrotask(() => {
            runUpdates(() => {
                Transition && (Transition.running = true);
                Listener = Owner = node;
                runComputation(node, node.tValue, time);
                Listener = Owner = null;
            }, false);
        });
    }
}

function runComputation(node, value, time) {
    let nextValue;
    const owner = Owner, listener = Listener;
    Listener = Owner = node;
    try {
        nextValue = node.fn(value);
    } catch (err) {
        if (node.pure) {
            if (Transition && Transition.running) {
                node.tState = STALE;
                node.tOwned && node.tOwned.forEach(cleanNode);
                node.tOwned = void 0;
            } else {
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
            writeSignal(node, nextValue, true);
        } else if (Transition && Transition.running && node.pure) {
            Transition.sources.add(node);
            node.tValue = nextValue;
        } else node.value = nextValue;
        node.updatedAt = time;
    }
}

function createComputation(fn, init2, pure, state = STALE, options) {
    const c = {
        fn: fn,
        state: state,
        updatedAt: null,
        owned: null,
        sources: null,
        sourceSlots: null,
        cleanups: null,
        value: init2,
        owner: Owner,
        context: Owner ? Owner.context : null,
        pure: pure
    };
    if (Transition && Transition.running) {
        c.state = 0;
        c.tState = state;
    }
    if (Owner === null) ; else if (Owner !== UNOWNED) {
        if (Transition && Transition.running && Owner.pure) {
            if (!Owner.tOwned) Owner.tOwned = [ c ]; else Owner.tOwned.push(c);
        } else {
            if (!Owner.owned) Owner.owned = [ c ]; else Owner.owned.push(c);
        }
    }
    return c;
}

function runTop(node) {
    const runningTransition = Transition && Transition.running;
    if ((runningTransition ? node.tState : node.state) === 0) return;
    if ((runningTransition ? node.tState : node.state) === PENDING) return lookUpstream(node);
    if (node.suspense && untrack(node.suspense.inFallback)) return node.suspense.effects.push(node);
    const ancestors = [ node ];
    while ((node = node.owner) && (!node.updatedAt || node.updatedAt < ExecCount)) {
        if (runningTransition && Transition.disposed.has(node)) return;
        if (runningTransition ? node.tState : node.state) ancestors.push(node);
    }
    for (let i = ancestors.length - 1; i >= 0; i--) {
        node = ancestors[i];
        if (runningTransition) {
            let top = node, prev = ancestors[i + 1];
            while ((top = top.owner) && top !== prev) {
                if (Transition.disposed.has(top)) return;
            }
        }
        if ((runningTransition ? node.tState : node.state) === STALE) {
            updateComputation(node);
        } else if ((runningTransition ? node.tState : node.state) === PENDING) {
            const updates = Updates;
            Updates = null;
            runUpdates(() => lookUpstream(node, ancestors[0]), false);
            Updates = updates;
        }
    }
}

function runUpdates(fn, init2) {
    if (Updates) return fn();
    let wait = false;
    if (!init2) Updates = [];
    if (Effects) wait = true; else Effects = [];
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
    let res;
    if (Transition) {
        if (!Transition.promises.size && !Transition.queue.size) {
            const sources = Transition.sources;
            const disposed = Transition.disposed;
            Effects.push.apply(Effects, Transition.effects);
            res = Transition.resolve;
            for (const e2 of Effects) {
                "tState" in e2 && (e2.state = e2.tState);
                delete e2.tState;
            }
            Transition = null;
            runUpdates(() => {
                for (const d of disposed) cleanNode(d);
                for (const v of sources) {
                    v.value = v.tValue;
                    if (v.owned) {
                        for (let i = 0, len = v.owned.length; i < len; i++) cleanNode(v.owned[i]);
                    }
                    if (v.tOwned) v.owned = v.tOwned;
                    delete v.tValue;
                    delete v.tOwned;
                    v.tState = 0;
                }
                setTransPending(false);
            }, false);
        } else if (Transition.running) {
            Transition.running = false;
            Transition.effects.push.apply(Transition.effects, Effects);
            Effects = null;
            setTransPending(true);
            return;
        }
    }
    const e = Effects;
    Effects = null;
    if (e.length) runUpdates(() => runEffects(e), false);
    if (res) res();
}

function runQueue(queue) {
    for (let i = 0; i < queue.length; i++) runTop(queue[i]);
}

function runUserEffects(queue) {
    let i, userLength = 0;
    for (i = 0; i < queue.length; i++) {
        const e = queue[i];
        if (!e.user) runTop(e); else queue[userLength++] = e;
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
        queue = [ ...sharedConfig.effects, ...queue ];
        userLength += sharedConfig.effects.length;
        delete sharedConfig.effects;
    }
    for (i = 0; i < userLength; i++) runTop(queue[i]);
}

function lookUpstream(node, ignore) {
    const runningTransition = Transition && Transition.running;
    if (runningTransition) node.tState = 0; else node.state = 0;
    for (let i = 0; i < node.sources.length; i += 1) {
        const source = node.sources[i];
        if (source.sources) {
            const state = runningTransition ? source.tState : source.state;
            if (state === STALE) {
                if (source !== ignore && (!source.updatedAt || source.updatedAt < ExecCount)) runTop(source);
            } else if (state === PENDING) lookUpstream(source, ignore);
        }
    }
}

function markDownstream(node) {
    const runningTransition = Transition && Transition.running;
    for (let i = 0; i < node.observers.length; i += 1) {
        const o = node.observers[i];
        if (runningTransition ? !o.tState : !o.state) {
            if (runningTransition) o.tState = PENDING; else o.state = PENDING;
            if (o.pure) Updates.push(o); else Effects.push(o);
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
    if (Transition && Transition.running && node.pure) {
        reset(node, true);
    } else if (node.owned) {
        for (i = node.owned.length - 1; i >= 0; i--) cleanNode(node.owned[i]);
        node.owned = null;
    }
    if (node.cleanups) {
        for (i = node.cleanups.length - 1; i >= 0; i--) node.cleanups[i]();
        node.cleanups = null;
    }
    if (Transition && Transition.running) node.tState = 0; else node.state = 0;
}

function reset(node, top) {
    if (!top) {
        node.tState = 0;
        Transition.disposed.add(node);
    }
    if (node.owned) {
        for (let i = 0; i < node.owned.length; i++) reset(node.owned[i]);
    }
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
    return function provider(props2) {
        let res;
        createRenderEffect(() => res = untrack(() => {
            Owner.context = {
                ...Owner.context,
                [id]: props2.value
            };
            return children(() => props2.children);
        }), void 0);
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
                    items = [ FALLBACK ];
                    mapped[0] = createRoot(disposer => {
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
                for (end = len - 1, newEnd = newLen - 1; end >= start && newEnd >= start && items[end] === newItems[newEnd]; end--, 
                newEnd--) {
                    temp[newEnd] = mapped[end];
                    tempdisposers[newEnd] = disposers[end];
                    indexes && (tempIndexes[newEnd] = indexes[end]);
                }
                newIndices = new Map;
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
                    items = [ FALLBACK ];
                    mapped[0] = createRoot(disposer => {
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
            for (;i < items.length; i++) {
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

function createComponent$1(Comp, props2) {
    return untrack(() => Comp(props2 || {}));
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
        return new Proxy({
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
                for (let i = 0; i < sources.length; i++) keys.push(...Object.keys(resolveSource(sources[i])));
                return [ ...new Set(keys) ];
            }
        }, propTraps);
    }
    const sourcesMap = {};
    const defined = Object.create(null);
    for (let i = sources.length - 1; i >= 0; i--) {
        const source = sources[i];
        if (!source) continue;
        const sourceKeys = Object.getOwnPropertyNames(source);
        for (let i2 = sourceKeys.length - 1; i2 >= 0; i2--) {
            const key = sourceKeys[i2];
            if (key === "__proto__" || key === "constructor") continue;
            const desc = Object.getOwnPropertyDescriptor(source, key);
            if (!defined[key]) {
                defined[key] = desc.get ? {
                    enumerable: true,
                    configurable: true,
                    get: resolveSources.bind(sourcesMap[key] = [ desc.get.bind(source) ])
                } : desc.value !== void 0 ? desc : void 0;
            } else {
                const sources2 = sourcesMap[key];
                if (sources2) {
                    if (desc.get) sources2.push(desc.get.bind(source)); else if (desc.value !== void 0) sources2.push(() => desc.value);
                }
            }
        }
    }
    const target = {};
    const definedKeys = Object.keys(defined);
    for (let i = definedKeys.length - 1; i >= 0; i--) {
        const key = definedKeys[i], desc = defined[key];
        if (desc && desc.get) Object.defineProperty(target, key, desc); else target[key] = desc ? desc.value : void 0;
    }
    return target;
}

function splitProps(props2, ...keys) {
    if (SUPPORTS_PROXY$1 && $PROXY in props2) {
        const blocked = new Set(keys.length > 1 ? keys.flat() : keys[0]);
        const res = keys.map(k => new Proxy({
            get(property) {
                return k.includes(property) ? props2[property] : void 0;
            },
            has(property) {
                return k.includes(property) && property in props2;
            },
            keys() {
                return k.filter(property => property in props2);
            }
        }, propTraps));
        res.push(new Proxy({
            get(property) {
                return blocked.has(property) ? void 0 : props2[property];
            },
            has(property) {
                return blocked.has(property) ? false : property in props2;
            },
            keys() {
                return Object.keys(props2).filter(k => !blocked.has(k));
            }
        }, propTraps));
        return res;
    }
    const otherObject = {};
    const objects = keys.map(() => ({}));
    for (const propName of Object.getOwnPropertyNames(props2)) {
        const desc = Object.getOwnPropertyDescriptor(props2, propName);
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
    return [ ...objects, otherObject ];
}

const narrowedError = name => "Stale read from <".concat(name, ">.");

function For(props2) {
    const fallback = "fallback" in props2 && {
        fallback: () => props2.fallback
    };
    return createMemo(mapArray(() => props2.each, props2.children, fallback || void 0));
}

function Index(props2) {
    const fallback = "fallback" in props2 && {
        fallback: () => props2.fallback
    };
    return createMemo(indexArray(() => props2.each, props2.children, fallback || void 0));
}

function Show(props2) {
    const keyed = props2.keyed;
    const conditionValue = createMemo(() => props2.when, void 0, void 0);
    const condition = keyed ? conditionValue : createMemo(conditionValue, void 0, {
        equals: (a, b) => !a === !b
    });
    return createMemo(() => {
        const c = condition();
        if (c) {
            const child = props2.children;
            const fn = typeof child === "function" && child.length > 0;
            return fn ? untrack(() => child(keyed ? c : () => {
                if (!untrack(condition)) throw narrowedError("Show");
                return conditionValue();
            })) : child;
        }
        return props2.fallback;
    }, void 0, void 0);
}

function Switch(props2) {
    const chs = children(() => props2.children);
    const switchFunc = createMemo(() => {
        const ch = chs();
        const mps = Array.isArray(ch) ? ch : [ ch ];
        let func = () => void 0;
        for (let i = 0; i < mps.length; i++) {
            const index = i;
            const mp = mps[i];
            const prevFunc = func;
            const conditionValue = createMemo(() => prevFunc() ? void 0 : mp.when, void 0, void 0);
            const condition = mp.keyed ? conditionValue : createMemo(conditionValue, void 0, {
                equals: (a, b) => !a === !b
            });
            func = () => prevFunc() || (condition() ? [ index, conditionValue, mp ] : void 0);
        }
        return func;
    });
    return createMemo(() => {
        const sel = switchFunc()();
        if (!sel) return props2.fallback;
        const [index, conditionValue, mp] = sel;
        const child = mp.children;
        const fn = typeof child === "function" && child.length > 0;
        return fn ? untrack(() => child(mp.keyed ? conditionValue() : () => {
            var _a;
            if (((_a = untrack(switchFunc)()) == null ? void 0 : _a[0]) !== index) throw narrowedError("Match");
            return conditionValue();
        })) : child;
    }, void 0, void 0);
}

function Match(props2) {
    return props2;
}

const SuspenseListContext = createContext();

function Suspense(props2) {
    let counter = 0, show, ctx, p, flicker, error;
    const [inFallback, setFallback] = createSignal(false), SuspenseContext2 = getSuspenseContext(), store = {
        increment: () => {
            if (++counter === 1) setFallback(true);
        },
        decrement: () => {
            if (--counter === 0) setFallback(false);
        },
        inFallback: inFallback,
        effects: [],
        resolved: false
    }, owner = getOwner();
    if (sharedConfig.context && sharedConfig.load) {
        const key = sharedConfig.getContextId();
        let ref = sharedConfig.load(key);
        if (ref) {
            if (typeof ref !== "object" || ref.s !== 1) p = ref; else sharedConfig.gather(key);
        }
        if (p && p !== "$$f") {
            const [s, set] = createSignal(void 0, {
                equals: false
            });
            flicker = s;
            p.then(() => {
                if (sharedConfig.done) return set();
                sharedConfig.gather(key);
                setHydrateContext(ctx);
                set();
                setHydrateContext();
            }, err => {
                error = err;
                set();
            });
        }
    }
    const listContext = useContext(SuspenseListContext);
    if (listContext) show = listContext.register(store.inFallback);
    let dispose2;
    onCleanup(() => dispose2 && dispose2());
    return createComponent$1(SuspenseContext2.Provider, {
        value: store,
        get children() {
            return createMemo(() => {
                if (error) throw error;
                ctx = sharedConfig.context;
                if (flicker) {
                    flicker();
                    return flicker = void 0;
                }
                if (ctx && p === "$$f") setHydrateContext();
                const rendered = createMemo(() => props2.children);
                return createMemo(prev => {
                    const inFallback2 = store.inFallback(), {showContent: showContent = true, showFallback: showFallback = true} = show ? show() : {};
                    if ((!inFallback2 || p && p !== "$$f") && showContent) {
                        store.resolved = true;
                        dispose2 && dispose2();
                        dispose2 = ctx = p = void 0;
                        resumeEffects(store.effects);
                        return rendered();
                    }
                    if (!showFallback) return;
                    if (dispose2) return prev;
                    return createRoot(disposer => {
                        dispose2 = disposer;
                        if (ctx) {
                            setHydrateContext({
                                id: ctx.id + "F",
                                count: 0
                            });
                            ctx = void 0;
                        }
                        return props2.fallback;
                    }, owner);
                });
            });
        }
    });
}

const [activeElement, setActiveElement] = createSignal(void 0);

function hexColor(color = "") {
    if (isInteger(color)) {
        return color;
    }
    if (typeof color === "string") {
        if (color.startsWith("#")) {
            return Number(color.replace("#", "0x") + (color.length === 7 ? "ff" : ""));
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

const clamp = (value, min, max) => min < max ? Math.min(Math.max(value, min), max) : Math.min(Math.max(value, max), min);

function mod(n, m) {
    if (m === 0) return 0;
    return (n % m + m) % m;
}

const memo$1 = fn => createMemo(() => fn());

function createRenderer$1({createElement: createElement2, createTextNode: createTextNode2, isTextNode: isTextNode2, replaceText: replaceText, insertNode: insertNode2, removeNode: removeNode, setProperty: setProperty, getParentNode: getParentNode, getFirstChild: getFirstChild, getNextSibling: getNextSibling}) {
    function insert2(parent, accessor, marker, initial) {
        if (marker !== void 0 && !initial) initial = [];
        if (typeof accessor !== "function") return insertExpression(parent, accessor, initial, marker);
        createRenderEffect(current => insertExpression(parent, accessor(), current, marker), initial);
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
                createRenderEffect(() => current = insertExpression(parent, array, current, marker, true));
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
                    reconcileArrays(parent, multi && current || [ getFirstChild(parent) ], array);
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
            if (item == null || item === true || item === false) ; else if (Array.isArray(item)) {
                dynamic = normalizeIncomingArray(normalized, item) || dynamic;
            } else if ((t = typeof item) === "string" || t === "number") {
                normalized.push(createTextNode2(item));
            } else if (t === "function") {
                if (unwrap) {
                    while (typeof item === "function") item = item();
                    dynamic = normalizeIncomingArray(normalized, Array.isArray(item) ? item : [ item ]) || dynamic;
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
                    map = new Map;
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
                    if (!inserted && !i) isParent ? replaceNode(parent, node, el) : insertNode2(parent, node, marker); else isParent && removeNode(parent, el);
                } else inserted = true;
            }
        } else insertNode2(parent, node, marker);
        return [ node ];
    }
    function appendNodes(parent, array, marker) {
        for (let i = 0, len = array.length; i < len; i++) insertNode2(parent, array[i], marker);
    }
    function replaceNode(parent, newNode, oldNode) {
        insertNode2(parent, newNode, oldNode);
        removeNode(parent, oldNode);
    }
    function spreadExpression(node, props2, prevProps = {}, skipChildren) {
        props2 || (props2 = {});
        if (!skipChildren) {
            createRenderEffect(() => prevProps.children = insertExpression(node, props2.children, prevProps.children));
        }
        createRenderEffect(() => props2.ref && props2.ref(node));
        createRenderEffect(() => {
            for (const prop in props2) {
                if (prop === "children" || prop === "ref") continue;
                const value = props2[prop];
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
            createRoot(dispose2 => {
                disposer = dispose2;
                insert2(element, code());
            });
            return disposer;
        },
        insert: insert2,
        spread(node, accessor, skipChildren) {
            if (typeof accessor === "function") {
                createRenderEffect(current => spreadExpression(node, accessor(), current, skipChildren));
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
        memo: memo$1,
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

Object.defineProperty(ElementNode.prototype, "preserve", {
    get() {
        return this._queueDelete === 0;
    },
    set(v) {
        this._queueDelete = v ? 0 : void 0;
    }
});

let elementDeleteQueue = [];

function flushDeleteQueue() {
    for (let el of elementDeleteQueue) {
        if (Number(el._queueDelete) < 0) {
            el.destroy();
        }
        el._queueDelete = void 0;
    }
    elementDeleteQueue.length = 0;
}

function pushDeleteQueue(node, n) {
    if (node._queueDelete === void 0) {
        node._queueDelete = n;
        if (elementDeleteQueue.push(node) === 1) {
            queueMicrotask(flushDeleteQueue);
        }
    } else {
        node._queueDelete += n;
    }
}

const nodeOpts = {
    createElement(name) {
        return new ElementNode(name);
    },
    createTextNode(text) {
        return {
            _type: NodeType.Text,
            text: text
        };
    },
    replaceText(node, value) {
        log("Replace Text: ", node, value);
        node.text = value;
        const parent = node.parent;
        parent.text = parent.getText();
    },
    setProperty(node, name, value = true) {
        node[name] = value;
    },
    insertNode(parent, node, anchor) {
        log("INSERT: ", parent, node, anchor);
        let prevParent = node.parent;
        parent.insertChild(node, anchor);
        if (node instanceof ElementNode) {
            node.parent.rendered && node.render(true);
            if (prevParent !== void 0) {
                pushDeleteQueue(node, 1);
            }
        } else if (isElementText(parent)) {
            parent.text = parent.getText();
        }
    },
    isTextNode(node) {
        return isElementText(node);
    },
    removeNode(parent, node) {
        log("REMOVE: ", parent, node);
        parent.removeChild(node);
        if (node instanceof ElementNode) {
            pushDeleteQueue(node, -1);
        } else if (isElementText(parent)) {
            parent.text = parent.getText();
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
        rootNode: rootNode,
        render: render$1
    };
}

const {effect: effect, memo: memo, createComponent: createComponent, createElement: createElement, createTextNode: createTextNode, insertNode: insertNode, insert: insert, spread: spread, setProp: setProp, mergeProps: mergeProps, use: use} = solidRenderer;

const taskQueue = [];

let tasksEnabled = false;

createRoot(() => {
    createRenderEffect(() => {
        activeElement();
        tasksEnabled = false;
    });
});

function scheduleTask(callback, priority = "low") {
    if (priority === "high") {
        taskQueue.unshift(callback);
    } else {
        taskQueue.push(callback);
    }
    processTasks();
}

function processTasks() {
    if (tasksEnabled && taskQueue.length) {
        setTimeout(() => {
            const task = taskQueue.shift();
            if (task) {
                task();
                processTasks();
            }
        }, Config.taskDelay || 50);
    }
}

function Dynamic(props2) {
    const [p, others] = splitProps(props2, [ "component" ]);
    const cached = createMemo(() => p.component);
    return createMemo(() => {
        const component = cached();
        switch (typeof component) {
          case "function":
            return untrack(() => component(others));

          case "string":
            {
                const el = createElement(component);
                spread(el, others);
                return el;
            }
        }
    });
}

const View = props2 => {
    const el = createElement("node");
    spread(el, props2, false);
    return el;
};

const Text = props2 => {
    const el = createElement("text");
    spread(el, props2, false);
    return el;
};

const invisibleChars = /[\u200B\u200C\u200D\uFEFF\u00AD\u2060]/g;

function hasZeroWidthSpace(space) {
    return invisibleChars.test(space) === true;
}

const spaceRegex = /[ \u200B]+/g;

const defaultFontMetrics = {
    ascender: 800,
    descender: -200,
    lineGap: 200,
    unitsPerEm: 1e3
};

const normalizeFontMetrics = (metrics, fontSize) => {
    const scale = fontSize / metrics.unitsPerEm;
    return {
        ascender: metrics.ascender * scale,
        descender: metrics.descender * scale,
        lineGap: metrics.lineGap * scale
    };
};

const mapTextLayout = (measureText2, metrics, text, textAlign, fontFamily, lineHeight, overflowSuffix, wordBreak, letterSpacing, maxLines, maxWidth, maxHeight) => {
    const ascPx = metrics.ascender;
    const descPx = metrics.descender;
    const bareLineHeight = ascPx - descPx;
    const lineHeightPx = lineHeight <= 3 ? lineHeight * bareLineHeight : lineHeight;
    const lineHeightDelta = lineHeightPx - bareLineHeight;
    const halfDelta = lineHeightDelta * .5;
    let effectiveMaxLines = maxLines;
    if (maxHeight > 0) {
        let maxFromHeight = Math.floor(maxHeight / lineHeightPx);
        if (maxFromHeight < 1) {
            maxFromHeight = 1;
        }
        if (effectiveMaxLines === 0 || maxFromHeight < effectiveMaxLines) {
            effectiveMaxLines = maxFromHeight;
        }
    }
    const wrappedText = maxWidth > 0;
    const [lines, remainingLines, remainingText] = wrappedText === true ? wrapText(measureText2, text, fontFamily, maxWidth, letterSpacing, overflowSuffix, wordBreak, effectiveMaxLines) : measureLines(measureText2, text.split("\n"), fontFamily, letterSpacing, effectiveMaxLines);
    let effectiveLineAmount = lines.length;
    let effectiveMaxWidth = 0;
    if (effectiveLineAmount > 0) {
        effectiveMaxWidth = lines[0][1];
        if (effectiveLineAmount > 1) {
            for (let i = 1; i < effectiveLineAmount; i++) {
                effectiveMaxWidth = Math.max(effectiveMaxWidth, lines[i][1]);
            }
        }
    }
    if (textAlign !== "left") {
        for (let i = 0; i < effectiveLineAmount; i++) {
            const line = lines[i];
            const w = line[1];
            line[3] = textAlign === "right" ? effectiveMaxWidth - w : (effectiveMaxWidth - w) / 2;
        }
    }
    const effectiveMaxHeight = effectiveLineAmount * lineHeightPx;
    let firstBaseLine = halfDelta;
    const startY = firstBaseLine;
    for (let i = 0; i < effectiveLineAmount; i++) {
        const line = lines[i];
        line[4] = startY + lineHeightPx * i;
    }
    return [ lines, remainingLines, remainingText, bareLineHeight, lineHeightPx, effectiveMaxWidth, effectiveMaxHeight ];
};

const measureLines = (measureText2, lines, fontFamily, letterSpacing, maxLines) => {
    const measuredLines = [];
    let remainingLines = maxLines > 0 ? maxLines : lines.length;
    let i = 0;
    while (remainingLines > 0) {
        const line = lines[i];
        i++;
        remainingLines--;
        if (line === void 0) {
            continue;
        }
        const width = measureText2(line, fontFamily, letterSpacing);
        measuredLines.push([ line, width, false, 0, 0 ]);
    }
    return [ measuredLines, remainingLines, maxLines > 0 ? lines.length - measuredLines.length > 0 : false ];
};

const wrapText = (measureText2, text, fontFamily, maxWidth, letterSpacing, overflowSuffix, wordBreak, maxLines) => {
    const lines = text.split("\n");
    const wrappedLines = [];
    const spaceWidth = measureText2(" ", fontFamily, letterSpacing);
    const overflowWidth = measureText2(overflowSuffix, fontFamily, letterSpacing);
    let wrappedLine = [];
    let remainingLines = maxLines > 0 ? maxLines : 1e3;
    let hasRemainingText = true;
    let hasMaxLines = maxLines > 0;
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line === void 0) {
            continue;
        }
        [wrappedLine, remainingLines, hasRemainingText] = line.length > 0 ? wrapLine(measureText2, line, fontFamily, maxWidth, letterSpacing, spaceWidth, overflowSuffix, overflowWidth, wordBreak, remainingLines) : [ [ [ "", 0, false, 0, 0 ] ], remainingLines, i < lines.length - 1 ];
        remainingLines--;
        wrappedLines.push(...wrappedLine);
        if (hasMaxLines === true && remainingLines <= 0) {
            const lastLine = wrappedLines[wrappedLines.length - 1];
            if (i < lines.length - 1) {
                if (lastLine[2] === false) {
                    let remainingText = "";
                    const [line2, lineWidth] = truncateLineEnd(measureText2, fontFamily, letterSpacing, lastLine[0], lastLine[1], remainingText, maxWidth, overflowSuffix, overflowWidth);
                    lastLine[0] = line2;
                    lastLine[1] = lineWidth;
                    lastLine[2] = true;
                }
            }
            break;
        }
    }
    return [ wrappedLines, remainingLines, hasRemainingText ];
};

const wrapLine = (measureText2, line, fontFamily, maxWidth, letterSpacing, spaceWidth, overflowSuffix, overflowWidth, wordBreak, remainingLines) => {
    const words = line.split(spaceRegex);
    const spaces = line.match(spaceRegex) || [];
    const wrappedLines = [];
    let currentLine = "";
    let currentLineWidth = 0;
    let hasRemainingText = true;
    const wrapFn = getWrapStrategy(wordBreak);
    while (words.length > 0 && remainingLines > 0) {
        let word = words.shift();
        let wordWidth = measureText2(word, fontFamily, letterSpacing);
        let remainingWord = "";
        if (currentLineWidth === 0) {
            if (wordWidth > maxWidth) {
                remainingLines--;
                [word, remainingWord, wordWidth] = remainingLines === 0 ? truncateWord(measureText2, word, wordWidth, maxWidth, fontFamily, letterSpacing, overflowSuffix, overflowWidth) : splitWord(measureText2, word, wordWidth, maxWidth, fontFamily, letterSpacing);
                if (remainingWord.length > 0) {
                    words.unshift(remainingWord);
                }
                wrappedLines.push([ word, wordWidth, false, 0, 0 ]);
            } else if (wordWidth + spaceWidth >= maxWidth) {
                remainingLines--;
                wrappedLines.push([ word, wordWidth, false, 0, 0 ]);
            } else {
                currentLine = word;
                currentLineWidth = wordWidth;
            }
            continue;
        }
        const space = spaces.shift() || "";
        const effectiveSpaceWidth = space === "​" ? 0 : spaceWidth;
        const totalWidth = currentLineWidth + effectiveSpaceWidth + wordWidth;
        if (totalWidth < maxWidth) {
            currentLine += effectiveSpaceWidth > 0 ? space + word : word;
            currentLineWidth = totalWidth;
            continue;
        }
        remainingLines--;
        if (totalWidth === maxWidth) {
            currentLine += effectiveSpaceWidth > 0 ? space + word : word;
            currentLineWidth = totalWidth;
            wrappedLines.push([ currentLine, currentLineWidth, false, 0, 0 ]);
            currentLine = "";
            currentLineWidth = 0;
            continue;
        }
        [currentLine, currentLineWidth, remainingWord] = wrapFn(measureText2, word, wordWidth, fontFamily, letterSpacing, wrappedLines, currentLine, currentLineWidth, remainingLines, remainingWord, maxWidth, space, spaceWidth, overflowSuffix, overflowWidth);
        if (remainingWord.length > 0) {
            words.unshift(remainingWord);
        }
    }
    if (currentLineWidth > 0 && remainingLines > 0) {
        wrappedLines.push([ currentLine, currentLineWidth, false, 0, 0 ]);
    }
    return [ wrappedLines, remainingLines, hasRemainingText ];
};

const getWrapStrategy = wordBreak => {
    if (wordBreak === "break-word") {
        return breakWord;
    }
    if (wordBreak === "break-all") {
        return breakAll;
    }
    if (wordBreak === "overflow") {
        return overflow;
    }
    return breakWord;
};

const overflow = (measureText2, word, wordWidth, fontFamily, letterSpacing, wrappedLines, currentLine, currentLineWidth, remainingLines, remainingWord, maxWidth, space, spaceWidth, overflowSuffix, overflowWidth) => {
    currentLine += space + word;
    currentLineWidth += spaceWidth + wordWidth;
    if (remainingLines === 0) {
        currentLine += overflowSuffix;
        currentLineWidth += overflowWidth;
    }
    wrappedLines.push([ currentLine, currentLineWidth, true, 0, 0 ]);
    return [ "", 0, "" ];
};

const breakWord = (measureText2, word, wordWidth, fontFamily, letterSpacing, wrappedLines, currentLine, currentLineWidth, remainingLines, remainingWord, maxWidth, space, spaceWidth, overflowSuffix, overflowWidth) => {
    remainingWord = word;
    if (remainingLines === 0) {
        [currentLine, currentLineWidth, remainingWord] = truncateLineEnd(measureText2, fontFamily, letterSpacing, currentLine, currentLineWidth, remainingWord, maxWidth, overflowSuffix, overflowWidth);
        wrappedLines.push([ currentLine, currentLineWidth, true, 0, 0 ]);
    } else {
        wrappedLines.push([ currentLine, currentLineWidth, false, 0, 0 ]);
        currentLine = "";
        currentLineWidth = 0;
    }
    return [ currentLine, currentLineWidth, remainingWord ];
};

const breakAll = (measureText2, word, wordWidth, fontFamily, letterSpacing, wrappedLines, currentLine, currentLineWidth, remainingLines, remainingWord, maxWidth, space, spaceWidth, overflowSuffix, overflowWidth) => {
    let remainingSpace = maxWidth - currentLineWidth;
    if (currentLineWidth > 0) {
        remainingSpace -= spaceWidth;
    }
    const truncate = remainingLines === 0;
    [word, remainingWord, wordWidth] = truncate ? truncateWord(measureText2, word, wordWidth, remainingSpace, fontFamily, letterSpacing, overflowSuffix, overflowWidth) : splitWord(measureText2, word, wordWidth, remainingSpace, fontFamily, letterSpacing);
    currentLine += space + word;
    currentLineWidth += spaceWidth + wordWidth;
    wrappedLines.push([ currentLine, currentLineWidth, truncate, 0, 0 ]);
    currentLine = "";
    currentLineWidth = 0;
    return [ currentLine, currentLineWidth, remainingWord ];
};

const truncateLineEnd = (measureText2, fontFamily, letterSpacing, currentLine, currentLineWidth, remainingWord, maxWidth, overflowSuffix, overflowWidth) => {
    if (currentLineWidth + overflowWidth <= maxWidth) {
        currentLine += overflowSuffix;
        currentLineWidth += overflowWidth;
        remainingWord = "";
        return [ currentLine, currentLineWidth, remainingWord ];
    }
    let truncated = false;
    for (let i = currentLine.length - 1; i > 0; i--) {
        const char = currentLine.charAt(i);
        const charWidth = measureText2(char, fontFamily, letterSpacing);
        currentLineWidth -= charWidth;
        if (currentLineWidth + overflowWidth <= maxWidth) {
            currentLine = currentLine.substring(0, i) + overflowSuffix;
            currentLineWidth += overflowWidth;
            remainingWord = currentLine.substring(i) + " " + remainingWord;
            truncated = true;
            break;
        }
    }
    if (truncated === false) {
        currentLine = overflowSuffix;
        currentLineWidth = overflowWidth;
        remainingWord = currentLine;
    }
    return [ currentLine, currentLineWidth, remainingWord ];
};

const truncateWord = (measureText2, word, wordWidth, maxWidth, fontFamily, letterSpacing, overflowSuffix, overflowWidth) => {
    const targetWidth = maxWidth - overflowWidth;
    if (targetWidth <= 0) {
        return [ "", word, 0 ];
    }
    const excessWidth = wordWidth - targetWidth;
    const shouldStartFromBack = excessWidth < wordWidth / 2;
    if (shouldStartFromBack === false) {
        let currentWidth2 = wordWidth;
        for (let i = word.length - 1; i > 0; i--) {
            const char = word.charAt(i);
            const charWidth = measureText2(char, fontFamily, letterSpacing);
            currentWidth2 -= charWidth;
            if (currentWidth2 <= targetWidth) {
                const remainingWord = word.substring(i);
                return [ word.substring(0, i) + overflowSuffix, remainingWord, currentWidth2 + overflowWidth ];
            }
        }
        return [ overflowSuffix, word, overflowWidth ];
    }
    let currentWidth = 0;
    for (let i = 0; i < word.length; i++) {
        const char = word.charAt(i);
        const charWidth = measureText2(char, fontFamily, letterSpacing);
        if (currentWidth + charWidth > targetWidth) {
            const remainingWord = word.substring(i);
            return [ word.substring(0, i) + overflowSuffix, remainingWord, currentWidth + overflowWidth ];
        }
        currentWidth += charWidth;
    }
    return [ word + overflowSuffix, "", wordWidth + overflowWidth ];
};

const splitWord = (measureText2, word, wordWidth, maxWidth, fontFamily, letterSpacing) => {
    if (maxWidth <= 0) {
        return [ "", word, 0 ];
    }
    const excessWidth = wordWidth - maxWidth;
    const shouldStartFromBack = excessWidth < wordWidth / 2;
    if (shouldStartFromBack === false) {
        let currentWidth2 = wordWidth;
        for (let i = word.length - 1; i > 0; i--) {
            const char = word.charAt(i);
            const charWidth = measureText2(char, fontFamily, letterSpacing);
            currentWidth2 -= charWidth;
            if (currentWidth2 <= maxWidth) {
                const remainingWord = word.substring(i);
                return [ word.substring(0, i), remainingWord, currentWidth2 ];
            }
        }
        return [ "", word, 0 ];
    }
    let currentWidth = 0;
    for (let i = 0; i < word.length; i++) {
        const char = word.charAt(i);
        const charWidth = measureText2(char, fontFamily, letterSpacing);
        if (currentWidth + charWidth > maxWidth) {
            const remainingWord = word.substring(i);
            return [ word.substring(0, i), remainingWord, currentWidth ];
        }
        currentWidth += charWidth;
    }
    return [ word, "", wordWidth ];
};

const fontCache$1 = new Map;

const fontLoadPromises$1 = new Map;

const normalizedMetrics$1 = new Map;

const nodesWaitingForFont$1 = Object.create(null);

let initialized$1 = false;

const buildKerningTable = kernings => {
    const kerningTable = {};
    let i = 0;
    const length = kernings.length;
    while (i < length) {
        const kerning = kernings[i];
        i++;
        if (kerning === void 0) {
            continue;
        }
        const second = kerning.second;
        let firsts = kerningTable[second];
        if (firsts === void 0) {
            firsts = {};
            kerningTable[second] = firsts;
        }
        firsts[kerning.first] = kerning.amount;
    }
    return kerningTable;
};

const buildGlyphMap = chars => {
    const glyphMap = new Map;
    let i = 0;
    const length = chars.length;
    while (i < length) {
        const glyph = chars[i];
        i++;
        if (glyph === void 0) {
            continue;
        }
        glyphMap.set(glyph.id, glyph);
        glyph.yoffset + glyph.height;
    }
    return glyphMap;
};

const processFontData$1 = (fontFamily, fontData, atlasTexture, metrics) => {
    const glyphMap = buildGlyphMap(fontData.chars);
    const kernings = buildKerningTable(fontData.kernings);
    let maxCharHeight = 0;
    let i = 0;
    const length = fontData.chars.length;
    while (i < length) {
        const glyph = fontData.chars[i];
        if (glyph !== void 0) {
            const charHeight = glyph.yoffset + glyph.height;
            if (charHeight > maxCharHeight) {
                maxCharHeight = charHeight;
            }
        }
        i++;
    }
    if (metrics === void 0 && fontData.lightningMetrics === void 0) {
        console.warn("Font metrics not found for SDF font ".concat(fontFamily, ". ") + "Make sure you are using the latest version of the Lightning 3 msdf-generator tool to generate your SDF fonts. Using default metrics.");
    }
    metrics = metrics || fontData.lightningMetrics || {
        ascender: 800,
        descender: -200,
        lineGap: 200,
        unitsPerEm: 1e3
    };
    fontCache$1.set(fontFamily, {
        data: fontData,
        glyphMap: glyphMap,
        kernings: kernings,
        atlasTexture: atlasTexture,
        metrics: metrics,
        maxCharHeight: maxCharHeight
    });
};

const canRenderFont$1 = trProps => isFontLoaded$1(trProps.fontFamily) || fontLoadPromises$1.has(trProps.fontFamily);

const loadFont$1 = async (stage, options) => {
    const {fontFamily: fontFamily, atlasUrl: atlasUrl, atlasDataUrl: atlasDataUrl, metrics: metrics} = options;
    if (fontCache$1.get(fontFamily) !== void 0) {
        return;
    }
    const existingPromise = fontLoadPromises$1.get(fontFamily);
    if (existingPromise !== void 0) {
        return existingPromise;
    }
    if (atlasDataUrl === void 0) {
        throw new Error("Atlas data URL must be provided for SDF font: ".concat(fontFamily));
    }
    const nwff = nodesWaitingForFont$1[fontFamily] = [];
    const loadPromise = (async () => {
        const response = await fetch(atlasDataUrl);
        if (!response.ok) {
            throw new Error("Failed to load font data: ".concat(response.statusText));
        }
        const fontData = await response.json();
        if (!fontData || !fontData.chars) {
            throw new Error("Invalid SDF font data format");
        }
        if (!atlasUrl) {
            throw new Error("Atlas texture must be provided for SDF fonts");
        }
        return new Promise((resolve, reject) => {
            const atlasTexture = stage.txManager.createTexture("ImageTexture", {
                src: atlasUrl,
                premultiplyAlpha: false
            });
            atlasTexture.setRenderableOwner(fontFamily, true);
            atlasTexture.preventCleanup = true;
            if (atlasTexture.state === "loaded") {
                processFontData$1(fontFamily, fontData, atlasTexture, metrics);
                fontLoadPromises$1.delete(fontFamily);
                for (let key in nwff) {
                    nwff[key].setUpdateType(UpdateType.Local);
                }
                delete nodesWaitingForFont$1[fontFamily];
                return resolve();
            }
            atlasTexture.on("loaded", () => {
                processFontData$1(fontFamily, fontData, atlasTexture, metrics);
                fontLoadPromises$1.delete(fontFamily);
                for (let key in nwff) {
                    nwff[key].setUpdateType(UpdateType.Local);
                }
                delete nodesWaitingForFont$1[fontFamily];
                resolve();
            });
            atlasTexture.on("failed", error => {
                fontLoadPromises$1.delete(fontFamily);
                if (fontCache$1[fontFamily]) {
                    delete fontCache$1[fontFamily];
                }
                console.error("Failed to load SDF font: ".concat(fontFamily), error);
                reject(error);
            });
        });
    })();
    fontLoadPromises$1.set(fontFamily, loadPromise);
    return loadPromise;
};

const waitingForFont$1 = (fontFamily, node) => {
    if (nodesWaitingForFont$1[fontFamily] === void 0) {
        return;
    }
    nodesWaitingForFont$1[fontFamily][node.id] = node;
};

const stopWaitingForFont$1 = (fontFamily, node) => {
    if (nodesWaitingForFont$1[fontFamily] === void 0) {
        return;
    }
    delete nodesWaitingForFont$1[fontFamily][node.id];
};

const getFontFamilies$1 = () => {
    const families = {};
    return families;
};

const init$3 = c => {
    if (initialized$1 === true) {
        return;
    }
    initialized$1 = true;
};

const type$3 = "sdf";

const isFontLoaded$1 = fontFamily => fontCache$1.has(fontFamily);

const getFontMetrics$1 = (fontFamily, fontSize) => {
    const out = normalizedMetrics$1.get(fontFamily);
    if (out !== void 0) {
        return out;
    }
    let metrics = fontCache$1.get(fontFamily).metrics;
    return processFontMetrics$1(fontFamily, fontSize, metrics);
};

const processFontMetrics$1 = (fontFamily, fontSize, metrics) => {
    const label = fontFamily + fontSize;
    const normalized = normalizeFontMetrics(metrics, fontSize);
    normalizedMetrics$1.set(label, normalized);
    return normalized;
};

const getGlyph = (fontFamily, codepoint) => {
    const cache2 = fontCache$1.get(fontFamily);
    if (cache2 === void 0) return null;
    return cache2.glyphMap.get(codepoint) || cache2.glyphMap.get(63) || null;
};

const getKerning = (fontFamily, firstGlyph, secondGlyph) => {
    const cache2 = fontCache$1.get(fontFamily);
    if (cache2 === void 0) return 0;
    const seconds = cache2.kernings[secondGlyph];
    return seconds ? seconds[firstGlyph] || 0 : 0;
};

const getAtlas = fontFamily => {
    const cache2 = fontCache$1.get(fontFamily);
    return cache2 !== void 0 ? cache2.atlasTexture : null;
};

const getFontData = fontFamily => fontCache$1.get(fontFamily);

const getMaxCharHeight = fontFamily => {
    const cache2 = fontCache$1.get(fontFamily);
    return cache2 !== void 0 ? cache2.maxCharHeight : 0;
};

const getLoadedFonts = () => Array.from(fontCache$1.keys());

const unloadFont = fontFamily => {
    const cache2 = fontCache$1.get(fontFamily);
    if (cache2 !== void 0) {
        if (typeof cache2.atlasTexture.free === "function") {
            cache2.atlasTexture.free();
        }
        fontCache$1.delete(fontFamily);
    }
};

const measureText$1 = (text, fontFamily, letterSpacing) => {
    if (text.length === 1) {
        const char = text.charAt(0);
        const codepoint = text.codePointAt(0);
        if (codepoint === void 0) return 0;
        if (hasZeroWidthSpace(char) === true) return 0;
        const glyph = getGlyph(fontFamily, codepoint);
        if (glyph === null) return 0;
        return glyph.xadvance + letterSpacing;
    }
    let width = 0;
    let prevCodepoint = 0;
    for (let i = 0; i < text.length; i++) {
        const char = text.charAt(i);
        const codepoint = text.codePointAt(i);
        if (codepoint === void 0) continue;
        if (hasZeroWidthSpace(char)) {
            continue;
        }
        const glyph = getGlyph(fontFamily, codepoint);
        if (glyph === null) continue;
        let advance = glyph.xadvance;
        if (prevCodepoint !== 0) {
            const kerning = getKerning(fontFamily, prevCodepoint, codepoint);
            advance += kerning;
        }
        width += advance + letterSpacing;
        prevCodepoint = codepoint;
    }
    return width;
};

const SdfFontHandler = Object.freeze(Object.defineProperty({
    __proto__: null,
    canRenderFont: canRenderFont$1,
    getAtlas: getAtlas,
    getFontData: getFontData,
    getFontFamilies: getFontFamilies$1,
    getFontMetrics: getFontMetrics$1,
    getGlyph: getGlyph,
    getKerning: getKerning,
    getLoadedFonts: getLoadedFonts,
    getMaxCharHeight: getMaxCharHeight,
    init: init$3,
    isFontLoaded: isFontLoaded$1,
    loadFont: loadFont$1,
    measureText: measureText$1,
    processFontMetrics: processFontMetrics$1,
    stopWaitingForFont: stopWaitingForFont$1,
    type: type$3,
    unloadFont: unloadFont,
    waitingForFont: waitingForFont$1
}, Symbol.toStringTag, {
    value: "Module"
}));

class CoreRenderOp {}

class WebGlRenderOp extends CoreRenderOp {
    constructor(renderer2, quad, bufferIdx) {
        super();
        __publicField(this, "renderer");
        __publicField(this, "bufferIdx");
        __publicField(this, "numQuads", 0);
        __publicField(this, "textures", []);
        __publicField(this, "sdfShaderProps");
        __publicField(this, "sdfNode");
        __publicField(this, "maxTextures");
        __publicField(this, "buffers");
        __publicField(this, "shader");
        __publicField(this, "width");
        __publicField(this, "height");
        __publicField(this, "clippingRect");
        __publicField(this, "rtt");
        __publicField(this, "parentHasRenderTexture");
        __publicField(this, "framebufferDimensions");
        __publicField(this, "alpha");
        __publicField(this, "pixelRatio");
        __publicField(this, "time");
        this.renderer = renderer2;
        this.bufferIdx = bufferIdx;
        this.buffers = quad.sdfBuffers || renderer2.quadBufferCollection;
        this.shader = quad.shader;
        this.width = quad.width;
        this.height = quad.height;
        this.clippingRect = quad.clippingRect;
        this.parentHasRenderTexture = quad.parentHasRenderTexture;
        this.framebufferDimensions = quad.framebufferDimensions || null;
        this.rtt = quad.rtt;
        this.alpha = quad.alpha;
        this.pixelRatio = this.parentHasRenderTexture === true ? 1 : renderer2.stage.pixelRatio;
        this.time = quad.time;
        this.sdfShaderProps = quad.sdfShaderProps;
        this.maxTextures = this.shader.program.supportsIndexedTextures ? renderer2.glw.getParameter(renderer2.glw.MAX_VERTEX_TEXTURE_IMAGE_UNITS) : 1;
    }
    addTexture(texture) {
        const {textures: textures, maxTextures: maxTextures} = this;
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
        const {glw: glw, options: options, stage: stage} = this.renderer;
        stage.shManager.useShader(this.shader.program);
        this.shader.program.bindRenderOp(this);
        if (this.clippingRect.valid === true) {
            const clipX = Math.round(this.clippingRect.x * this.pixelRatio);
            const clipWidth = Math.round(this.clippingRect.width * this.pixelRatio);
            const clipHeight = Math.round(this.clippingRect.height * this.pixelRatio);
            let clipY = Math.round(options.canvas.height - clipHeight - this.clippingRect.y * this.pixelRatio);
            if (this.parentHasRenderTexture) {
                clipY = this.framebufferDimensions ? this.framebufferDimensions.h - this.height : 0;
            }
            glw.setScissorTest(true);
            glw.scissor(clipX, clipY, clipWidth, clipHeight);
        } else {
            glw.setScissorTest(false);
        }
        if (this.sdfShaderProps !== void 0) {
            glw.drawArrays(glw.TRIANGLES, 0, 6 * this.numQuads);
        } else {
            const quadIdx = this.bufferIdx / 32 * 6 * 2;
            glw.drawElements(glw.TRIANGLES, 6 * this.numQuads, glw.UNSIGNED_SHORT, quadIdx);
        }
    }
}

function getWebGlParameters(glw) {
    const params2 = {
        MAX_RENDERBUFFER_SIZE: 0,
        MAX_TEXTURE_SIZE: 0,
        MAX_VIEWPORT_DIMS: 0,
        MAX_VERTEX_TEXTURE_IMAGE_UNITS: 0,
        MAX_TEXTURE_IMAGE_UNITS: 0,
        MAX_COMBINED_TEXTURE_IMAGE_UNITS: 0,
        MAX_VERTEX_ATTRIBS: 0,
        MAX_VARYING_VECTORS: 0,
        MAX_VERTEX_UNIFORM_VECTORS: 0,
        MAX_FRAGMENT_UNIFORM_VECTORS: 0
    };
    const keys = Object.keys(params2);
    keys.forEach(key => {
        params2[key] = glw.getParameter(glw[key]);
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
    keys.forEach(key => {
        extensions[key] = glw.getExtension(key);
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

const TRANSPARENT_TEXTURE_DATA = new Uint8Array([ 0, 0, 0, 0 ]);

class WebGlCtxTexture extends CoreContextTexture {
    constructor(glw, memManager, textureSource) {
        super(memManager, textureSource);
        __publicField(this, "glw");
        __publicField(this, "_nativeCtxTexture", null);
        __publicField(this, "_w", 0);
        __publicField(this, "_h", 0);
        __publicField(this, "txCoords", {
            x1: 0,
            y1: 0,
            x2: 1,
            y2: 1
        });
        this.glw = glw;
    }
    checkGLError() {
        if (this.state === "failed") {
            return true;
        }
        const error = this.glw.getError();
        if (error !== 0) {
            this.state = "failed";
            this.textureSource.setState("failed", new Error("WebGL Error: ".concat(error)));
            return true;
        }
        return false;
    }
    get ctxTexture() {
        if (this.state === "freed") {
            this.load();
            return null;
        }
        return this._nativeCtxTexture;
    }
    get w() {
        return this._w;
    }
    get h() {
        return this._h;
    }
    async load() {
        if (this.state === "loading" || this.state === "loaded") {
            return Promise.resolve();
        }
        this.state = "loading";
        this.textureSource.setState("loading");
        this._nativeCtxTexture = this.createNativeCtxTexture();
        if (this._nativeCtxTexture === null) {
            this.state = "failed";
            const error = new Error("Could not create WebGL Texture");
            this.textureSource.setState("failed", error);
            console.error("Could not create WebGL Texture");
            throw error;
        }
        try {
            const {w: w, h: h} = await this.onLoadRequest();
            if (this.state === "freed") {
                return;
            }
            this.state = "loaded";
            this._w = w;
            this._h = h;
            this.textureSource.setState("loaded", {
                w: w,
                h: h
            });
            this.textureSource.freeTextureData();
        } catch (err) {
            if (this.state === "freed") {
                return;
            }
            this.state = "failed";
            const error = err instanceof Error ? err : new Error(String(err));
            this.textureSource.setState("failed", error);
            this.textureSource.freeTextureData();
            console.error(err);
            throw error;
        }
    }
    async onLoadRequest() {
        var _a, _b;
        const {glw: glw} = this;
        const textureData = this.textureSource.textureData;
        if (textureData === null || this._nativeCtxTexture === null) {
            throw new Error("Texture data or native texture is null " + this.textureSource.type);
        }
        glw.texImage2D(0, glw.RGBA, 1, 1, 0, glw.RGBA, glw.UNSIGNED_BYTE, null);
        this.setTextureMemUse(TRANSPARENT_TEXTURE_DATA.byteLength);
        let w = 0;
        let h = 0;
        glw.activeTexture(0);
        const tdata = textureData.data;
        const format = glw.RGBA;
        const formatBytes = 4;
        const memoryPadding = 1.1;
        if (typeof ImageBitmap !== "undefined" && tdata instanceof ImageBitmap || tdata instanceof ImageData || isHTMLImageElement(tdata) === true) {
            w = tdata.width;
            h = tdata.height;
            glw.bindTexture(this._nativeCtxTexture);
            glw.pixelStorei(glw.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !!textureData.premultiplyAlpha);
            glw.texImage2D(0, format, format, glw.UNSIGNED_BYTE, tdata);
            if (this.checkGLError() === true) {
                return {
                    w: 0,
                    h: 0
                };
            }
            this.setTextureMemUse(h * w * formatBytes * memoryPadding);
        } else if (tdata === null) {
            w = 0;
            h = 0;
            glw.bindTexture(this._nativeCtxTexture);
            glw.texImage2D(0, format, 1, 1, 0, format, glw.UNSIGNED_BYTE, TRANSPARENT_TEXTURE_DATA);
            this.setTextureMemUse(TRANSPARENT_TEXTURE_DATA.byteLength);
        } else if ("mipmaps" in tdata && tdata.mipmaps) {
            const {mipmaps: mipmaps, type: type2, blockInfo: blockInfo} = tdata;
            uploadCompressedTexture[type2](glw, this._nativeCtxTexture, tdata);
            if (this.checkGLError() === true) {
                return {
                    w: 0,
                    h: 0
                };
            }
            w = tdata.w;
            h = tdata.h;
            this.txCoords.x2 = w / (Math.ceil(w / blockInfo.width) * blockInfo.width);
            this.txCoords.y2 = h / (Math.ceil(h / blockInfo.height) * blockInfo.height);
            this.setTextureMemUse((_b = (_a = mipmaps[0]) == null ? void 0 : _a.byteLength) != null ? _b : 0);
        } else if (tdata && tdata instanceof Uint8Array) {
            w = 1;
            h = 1;
            glw.bindTexture(this._nativeCtxTexture);
            glw.pixelStorei(glw.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !!textureData.premultiplyAlpha);
            glw.texImage2D(0, format, w, h, 0, format, glw.UNSIGNED_BYTE, tdata);
            if (this.checkGLError() === true) {
                return {
                    w: 0,
                    h: 0
                };
            }
            this.setTextureMemUse(w * h * formatBytes);
        } else {
            console.error("WebGlCoreCtxTexture.onLoadRequest: Unexpected textureData returned", textureData);
        }
        return {
            w: w,
            h: h
        };
    }
    free() {
        if (this.state === "freed") {
            return;
        }
        this.state = "freed";
        this.textureSource.setState("freed");
        this.release();
    }
    release() {
        this._w = 0;
        this._h = 0;
        if (this._nativeCtxTexture !== null) {
            this.glw.deleteTexture(this._nativeCtxTexture);
            this.setTextureMemUse(0);
            this._nativeCtxTexture = null;
        }
        this.textureSource.freeTextureData();
    }
    createNativeCtxTexture() {
        const {glw: glw} = this;
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

class WebGlCtxSubTexture extends WebGlCtxTexture {
    constructor(glw, memManager, textureSource) {
        super(glw, memManager, textureSource);
    }
    async onLoadRequest() {
        const props2 = this.textureSource.textureData;
        if (props2.data instanceof Uint8Array) {
            return {
                w: 1,
                h: 1
            };
        }
        return this.extractDimensions(props2.data);
    }
    extractDimensions(data) {
        if (data === null) {
            return {
                w: 0,
                h: 0
            };
        }
        if (this.hasWidthHeight(data) === true) {
            return {
                w: data.width,
                h: data.height
            };
        }
        if (this.hasWH(data) === true) {
            return {
                w: data.w,
                h: data.h
            };
        }
        return {
            w: 0,
            h: 0
        };
    }
    hasWidthHeight(data) {
        return typeof data.width === "number" && typeof data.height === "number";
    }
    hasWH(data) {
        return typeof data.w === "number" && typeof data.h === "number";
    }
}

class BufferCollection {
    constructor(config) {
        __publicField(this, "config");
        this.config = config;
    }
    getBuffer(attributeName) {
        var _a;
        return (_a = this.config.find(item => item.attributes[attributeName])) == null ? void 0 : _a.buffer;
    }
    getAttributeInfo(attributeName) {
        var _a;
        return (_a = this.config.find(item => item.attributes[attributeName])) == null ? void 0 : _a.attributes[attributeName];
    }
}

function isWebGl2(gl) {
    return self.WebGL2RenderingContext && gl instanceof self.WebGL2RenderingContext;
}

class WebGlContextWrapper {
    constructor(gl) {
        __publicField(this, "gl");
        __publicField(this, "activeTextureUnit", 0);
        __publicField(this, "texture2dUnits");
        __publicField(this, "texture2dParams", new WeakMap);
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
        __publicField(this, "curUniformLocations", {});
        __publicField(this, "canvas");
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
        __publicField(this, "LINEAR_MIPMAP_LINEAR");
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
        this.LINEAR_MIPMAP_LINEAR = gl.LINEAR_MIPMAP_LINEAR;
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
    isWebGl2() {
        return isWebGl2(this.gl);
    }
    activeTexture(textureUnit) {
        if (this.activeTextureUnit !== textureUnit) {
            this.gl.activeTexture(textureUnit + this.gl.TEXTURE0);
            this.activeTextureUnit = textureUnit;
        }
    }
    bindTexture(texture) {
        if (this.texture2dUnits[this.activeTextureUnit] === texture) {
            return;
        }
        this.texture2dUnits[this.activeTextureUnit] = texture;
        this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
    }
    _getActiveTexture() {
        return this.texture2dUnits[this.activeTextureUnit];
    }
    texParameteri(pname, param) {
        const activeTexture = this._getActiveTexture();
        if (!activeTexture) {
            throw new Error("No active texture");
        }
        let textureParams = this.texture2dParams.get(activeTexture);
        if (!textureParams) {
            textureParams = {};
            this.texture2dParams.set(activeTexture, textureParams);
        }
        if (textureParams[pname] === param) {
            return;
        }
        textureParams[pname] = param;
        this.gl.texParameteri(this.gl.TEXTURE_2D, pname, param);
    }
    texImage2D(level, internalFormat, widthOrFormat, heightOrType, borderOrSource, format, type2, pixels) {
        if (format) {
            this.gl.texImage2D(this.gl.TEXTURE_2D, level, internalFormat, widthOrFormat, heightOrType, borderOrSource, format, type2, pixels);
        } else {
            this.gl.texImage2D(this.gl.TEXTURE_2D, level, internalFormat, widthOrFormat, heightOrType, borderOrSource);
        }
    }
    compressedTexImage2D(level, internalformat, width, height, border, data) {
        this.gl.compressedTexImage2D(this.gl.TEXTURE_2D, level, internalformat, width, height, border, data);
    }
    pixelStorei(pname, param) {
        this.gl.pixelStorei(pname, param);
    }
    generateMipmap() {
        this.gl.generateMipmap(this.gl.TEXTURE_2D);
    }
    createTexture() {
        return this.gl.createTexture();
    }
    deleteTexture(texture) {
        if (texture) {
            this.texture2dParams.delete(texture);
        }
        this.gl.deleteTexture(texture);
    }
    deleteFramebuffer(framebuffer) {
        this.gl.deleteFramebuffer(framebuffer);
    }
    viewport(x, y, width, height) {
        this.gl.viewport(x, y, width, height);
    }
    clearColor(red, green, blue, alpha) {
        this.gl.clearColor(red, green, blue, alpha);
    }
    setScissorTest(enable) {
        if (enable === this.scissorEnabled) {
            return;
        }
        if (enable) {
            this.gl.enable(this.gl.SCISSOR_TEST);
        } else {
            this.gl.disable(this.gl.SCISSOR_TEST);
        }
        this.scissorEnabled = enable;
    }
    scissor(x, y, width, height) {
        if (x !== this.scissorX || y !== this.scissorY || width !== this.scissorWidth || height !== this.scissorHeight) {
            this.gl.scissor(x, y, width, height);
            this.scissorX = x;
            this.scissorY = y;
            this.scissorWidth = width;
            this.scissorHeight = height;
        }
    }
    setBlend(blend) {
        if (blend === this.blendEnabled) {
            return;
        }
        if (blend) {
            this.gl.enable(this.gl.BLEND);
        } else {
            this.gl.disable(this.gl.BLEND);
        }
        this.blendEnabled = blend;
    }
    blendFunc(src, dst) {
        if (src !== this.blendSrcRgb || dst !== this.blendDstRgb || src !== this.blendSrcAlpha || dst !== this.blendDstAlpha) {
            this.gl.blendFunc(src, dst);
            this.blendSrcRgb = src;
            this.blendDstRgb = dst;
            this.blendSrcAlpha = src;
            this.blendDstAlpha = dst;
        }
    }
    createBuffer() {
        return this.gl.createBuffer();
    }
    createFramebuffer() {
        return this.gl.createFramebuffer();
    }
    bindFramebuffer(framebuffer) {
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, framebuffer);
    }
    framebufferTexture2D(attachment, texture, level) {
        const gl = this.gl;
        gl.framebufferTexture2D(gl.FRAMEBUFFER, attachment, gl.TEXTURE_2D, texture, level);
    }
    clear() {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }
    arrayBufferData(buffer, data, usage) {
        if (this.boundArrayBuffer !== buffer) {
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
            this.boundArrayBuffer = buffer;
        }
        this.gl.bufferData(this.gl.ARRAY_BUFFER, data, usage);
    }
    elementArrayBufferData(buffer, data, usage) {
        if (this.boundElementArrayBuffer !== buffer) {
            this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, buffer);
            this.boundElementArrayBuffer = buffer;
        }
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, data, usage);
    }
    vertexAttribPointer(buffer, index, size, type2, normalized, stride, offset) {
        if (this.boundArrayBuffer !== buffer) {
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
            this.boundArrayBuffer = buffer;
        }
        this.gl.vertexAttribPointer(index, size, type2, normalized, stride, offset);
    }
    getUniformLocations(program) {
        const gl = this.gl;
        const length = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
        const result = {};
        for (let i = 0; i < length; i++) {
            const info = gl.getActiveUniform(program, i);
            let name = info.name.replace(/\[.*?\]/g, "");
            result[name] = gl.getUniformLocation(program, name);
        }
        return result;
    }
    getAttributeLocations(program) {
        const gl = this.gl;
        const length = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
        const result = [];
        for (let i = 0; i < length; i++) {
            const {name: name} = gl.getActiveAttrib(program, i);
            result[gl.getAttribLocation(program, name)] = name;
        }
        return result;
    }
    useProgram(program, uniformLocations) {
        if (this.curProgram === program) {
            return;
        }
        this.gl.useProgram(program);
        this.curProgram = program;
        this.curUniformLocations = uniformLocations;
    }
    uniform1f(location, v0) {
        this.gl.uniform1f(this.curUniformLocations[location] || null, v0);
    }
    uniform1fv(location, value) {
        this.gl.uniform1fv(this.curUniformLocations[location] || null, value);
    }
    uniform1i(location, v0) {
        this.gl.uniform1i(this.curUniformLocations[location] || null, v0);
    }
    uniform1iv(location, value) {
        this.gl.uniform1iv(this.curUniformLocations[location] || null, value);
    }
    uniform2f(location, v0, v1) {
        this.gl.uniform2f(this.curUniformLocations[location] || null, v0, v1);
    }
    uniform2fa(location, value) {
        this.gl.uniform2f(this.curUniformLocations[location] || null, value[0], value[1]);
    }
    uniform2fv(location, value) {
        this.gl.uniform2fv(this.curUniformLocations[location] || null, value);
    }
    uniform2i(location, v0, v1) {
        this.gl.uniform2i(this.curUniformLocations[location] || null, v0, v1);
    }
    uniform2iv(location, value) {
        this.gl.uniform2iv(this.curUniformLocations[location] || null, value);
    }
    uniform3f(location, v0, v1, v2) {
        this.gl.uniform3f(this.curUniformLocations[location] || null, v0, v1, v2);
    }
    uniform3fa(location, value) {
        this.gl.uniform3f(this.curUniformLocations[location] || null, value[0], value[1], value[2]);
    }
    uniform3fv(location, value) {
        this.gl.uniform3fv(this.curUniformLocations[location] || null, value);
    }
    uniform3i(location, v0, v1, v2) {
        this.gl.uniform3i(this.curUniformLocations[location] || null, v0, v1, v2);
    }
    uniform3iv(location, value) {
        this.gl.uniform3iv(this.curUniformLocations[location] || null, value);
    }
    uniform4f(location, v0, v1, v2, v3) {
        this.gl.uniform4f(this.curUniformLocations[location] || null, v0, v1, v2, v3);
    }
    uniform4fa(location, value) {
        this.gl.uniform4f(this.curUniformLocations[location] || null, value[0], value[1], value[2], value[3]);
    }
    uniform4fv(location, value) {
        this.gl.uniform4fv(this.curUniformLocations[location] || null, value);
    }
    uniform4i(location, v0, v1, v2, v3) {
        this.gl.uniform4i(this.curUniformLocations[location] || null, v0, v1, v2, v3);
    }
    uniform4iv(location, value) {
        this.gl.uniform4iv(this.curUniformLocations[location] || null, value);
    }
    uniformMatrix2fv(location, value) {
        this.gl.uniformMatrix2fv(this.curUniformLocations[location] || null, false, value);
    }
    uniformMatrix3fv(location, value) {
        this.gl.uniformMatrix3fv(this.curUniformLocations[location] || null, false, value);
    }
    uniformMatrix4fv(location, value) {
        this.gl.uniformMatrix4fv(this.curUniformLocations[location] || null, false, value);
    }
    getParameter(pname) {
        return this.gl.getParameter(pname);
    }
    drawElements(mode, count2, type2, offset) {
        this.gl.drawElements(mode, count2, type2, offset);
    }
    drawArrays(mode, first, count2) {
        this.gl.drawArrays(mode, first, count2);
    }
    getExtension(name) {
        return this.gl.getExtension(name);
    }
    getError() {
        return this.gl.getError();
    }
    createVertexArray() {
        if (this.gl instanceof WebGL2RenderingContext) {
            return this.gl.createVertexArray();
        }
        return void 0;
    }
    bindVertexArray(vertexArray) {
        if (this.gl instanceof WebGL2RenderingContext) {
            this.gl.bindVertexArray(vertexArray);
        }
    }
    getAttribLocation(program, name) {
        return this.gl.getAttribLocation(program, name);
    }
    getUniformLocation(program, name) {
        return this.gl.getUniformLocation(program, name);
    }
    enableVertexAttribArray(index) {
        this.gl.enableVertexAttribArray(index);
    }
    disableVertexAttribArray(index) {
        this.gl.disableVertexAttribArray(index);
    }
    createShader(type2) {
        return this.gl.createShader(type2);
    }
    compileShader(shader) {
        this.gl.compileShader(shader);
    }
    attachShader(program, shader) {
        this.gl.attachShader(program, shader);
    }
    linkProgram(program) {
        this.gl.linkProgram(program);
    }
    deleteProgram(shader) {
        this.gl.deleteProgram(shader);
    }
    getShaderParameter(shader, pname) {
        return this.gl.getShaderParameter(shader, pname);
    }
    getShaderInfoLog(shader) {
        return this.gl.getShaderInfoLog(shader);
    }
    createProgram() {
        return this.gl.createProgram();
    }
    getProgramParameter(program, pname) {
        return this.gl.getProgramParameter(program, pname);
    }
    getProgramInfoLog(program) {
        return this.gl.getProgramInfoLog(program);
    }
    shaderSource(shader, source) {
        this.gl.shaderSource(shader, source);
    }
    deleteShader(shader) {
        this.gl.deleteShader(shader);
    }
    deleteBuffer(buffer) {
        const {gl: gl} = this;
        gl.deleteBuffer(buffer);
        if (this.boundArrayBuffer === buffer) {
            this.boundArrayBuffer = null;
        }
    }
    deleteVertexArray(vertexArray) {
        if (this.isWebGl2()) {
            this.gl.deleteVertexArray(vertexArray);
        }
    }
    checkError(operation) {
        const error = this.getError();
        if (error !== 0) {
            let errorName = "UNKNOWN_ERROR";
            switch (error) {
              case this.INVALID_ENUM:
                errorName = "INVALID_ENUM";
                break;

              case 1281:
                errorName = "INVALID_VALUE";
                break;

              case this.INVALID_OPERATION:
                errorName = "INVALID_OPERATION";
                break;

              case 1285:
                errorName = "OUT_OF_MEMORY";
                break;

              case 37442:
                errorName = "CONTEXT_LOST_WEBGL";
                break;
            }
            const message = "WebGL ".concat(errorName, " (0x").concat(error.toString(16), ") during ").concat(operation);
            return {
                error: error,
                errorName: errorName,
                message: message
            };
        }
        return null;
    }
}

class WebGlCtxRenderTexture extends WebGlCtxTexture {
    constructor(glw, memManager, textureSource) {
        super(glw, memManager, textureSource);
        __publicField(this, "framebuffer", null);
        __publicField(this, "txCoords", {
            x1: 0,
            y1: 1,
            x2: 1,
            y2: 0
        });
    }
    async onLoadRequest() {
        const {glw: glw} = this;
        const nativeTexture = this._nativeCtxTexture = this.createNativeCtxTexture();
        if (!nativeTexture) {
            throw new Error("Failed to create native texture for RenderTexture");
        }
        const {w: w, h: h} = this.textureSource;
        this.framebuffer = glw.createFramebuffer();
        glw.texImage2D(0, glw.RGBA, w, h, 0, glw.RGBA, glw.UNSIGNED_BYTE, null);
        this.setTextureMemUse(w * h * 4);
        glw.bindFramebuffer(this.framebuffer);
        glw.framebufferTexture2D(glw.COLOR_ATTACHMENT0, nativeTexture, 0);
        glw.bindFramebuffer(null);
        return {
            w: w,
            h: h
        };
    }
    free() {
        super.free();
        this.glw.deleteFramebuffer(this.framebuffer);
        this.framebuffer = null;
    }
}

class WebGlRenderer extends CoreRenderer {
    constructor(options) {
        super(options);
        __publicField(this, "glw");
        __publicField(this, "system");
        __publicField(this, "quadBuffer");
        __publicField(this, "fQuadBuffer");
        __publicField(this, "uiQuadBuffer");
        __publicField(this, "renderOps", []);
        __publicField(this, "curBufferIdx", 0);
        __publicField(this, "curRenderOp", null);
        __publicField(this, "rttNodes", []);
        __publicField(this, "activeRttNode", null);
        __publicField(this, "defaultTextureCoords", {
            x1: 0,
            y1: 0,
            x2: 1,
            y2: 1
        });
        __publicField(this, "defaultShaderNode", null);
        __publicField(this, "quadBufferCollection");
        __publicField(this, "clearColor", {
            raw: 0,
            normalized: [ 0, 0, 0, 0 ]
        });
        __publicField(this, "quadBufferUsage", 0);
        __publicField(this, "numQuadsRendered", 0);
        __publicField(this, "renderToTextureActive", false);
        this.quadBuffer = new ArrayBuffer(this.stage.options.quadBufferSize);
        this.fQuadBuffer = new Float32Array(this.quadBuffer);
        this.uiQuadBuffer = new Uint32Array(this.quadBuffer);
        this.mode = "webgl";
        const gl = createWebGLContext(options.canvas, options.forceWebGL2, options.contextSpy);
        const glw = this.glw = new WebGlContextWrapper(gl);
        glw.viewport(0, 0, options.canvas.width, options.canvas.height);
        this.updateClearColor(this.stage.clearColor);
        glw.setBlend(true);
        glw.blendFunc(glw.ONE, glw.ONE_MINUS_SRC_ALPHA);
        createIndexBuffer(glw, this.stage.bufferMemory);
        this.system = {
            parameters: getWebGlParameters(this.glw),
            extensions: getWebGlExtensions(this.glw)
        };
        const quadBuffer = glw.createBuffer();
        const stride = 8 * Float32Array.BYTES_PER_ELEMENT;
        this.quadBufferCollection = new BufferCollection([ {
            buffer: quadBuffer,
            attributes: {
                a_position: {
                    name: "a_position",
                    size: 2,
                    type: glw.FLOAT,
                    normalized: false,
                    stride: stride,
                    offset: 0
                },
                a_textureCoords: {
                    name: "a_textureCoords",
                    size: 2,
                    type: glw.FLOAT,
                    normalized: false,
                    stride: stride,
                    offset: 2 * Float32Array.BYTES_PER_ELEMENT
                },
                a_color: {
                    name: "a_color",
                    size: 4,
                    type: glw.UNSIGNED_BYTE,
                    normalized: true,
                    stride: stride,
                    offset: 4 * Float32Array.BYTES_PER_ELEMENT
                },
                a_textureIndex: {
                    name: "a_textureIndex",
                    size: 1,
                    type: glw.FLOAT,
                    normalized: false,
                    stride: stride,
                    offset: 5 * Float32Array.BYTES_PER_ELEMENT
                },
                a_nodeCoords: {
                    name: "a_nodeCoords",
                    size: 2,
                    type: glw.FLOAT,
                    normalized: false,
                    stride: stride,
                    offset: 6 * Float32Array.BYTES_PER_ELEMENT
                }
            }
        } ]);
    }
    reset() {
        const {glw: glw} = this;
        this.curBufferIdx = 0;
        this.curRenderOp = null;
        this.renderOps.length = 0;
        glw.setScissorTest(false);
        glw.clear();
    }
    createShaderProgram(shaderType, props2) {
        return new WebGlShaderProgram(this, shaderType, props2);
    }
    createShaderNode(shaderKey, shaderType, props2, program) {
        return new WebGlShaderNode(shaderKey, shaderType, program, this.stage, props2);
    }
    supportsShaderType(shaderType) {
        return shaderType.fragment !== void 0;
    }
    createCtxTexture(textureSource) {
        if (textureSource instanceof SubTexture) {
            return new WebGlCtxSubTexture(this.glw, this.stage.txMemManager, textureSource);
        } else if (textureSource instanceof RenderTexture) {
            return new WebGlCtxRenderTexture(this.glw, this.stage.txMemManager, textureSource);
        }
        return new WebGlCtxTexture(this.glw, this.stage.txMemManager, textureSource);
    }
    addQuad(params2) {
        const f = this.fQuadBuffer;
        const u = this.uiQuadBuffer;
        let i = this.curBufferIdx;
        const reuse = this.reuseRenderOp(params2);
        if (reuse === false) {
            this.newRenderOp(params2, i);
        }
        let tx = params2.texture;
        if (tx.type === TextureType.subTexture) {
            tx = tx.parentTexture;
        }
        const tidx = this.addTexture(tx.ctxTexture, i);
        const rc = params2.renderCoords;
        const tc = params2.textureCoords;
        const cTl = params2.colorTl;
        const cTr = params2.colorTr;
        const cBl = params2.colorBl;
        const cBr = params2.colorBr;
        f[i] = rc.x1;
        f[i + 1] = rc.y1;
        f[i + 2] = tc.x1;
        f[i + 3] = tc.y1;
        u[i + 4] = cTl;
        f[i + 5] = tidx;
        f[i + 6] = 0;
        f[i + 7] = 0;
        f[i + 8] = rc.x2;
        f[i + 9] = rc.y2;
        f[i + 10] = tc.x2;
        f[i + 11] = tc.y1;
        u[i + 12] = cTr;
        f[i + 13] = tidx;
        f[i + 14] = 1;
        f[i + 15] = 0;
        f[i + 16] = rc.x4;
        f[i + 17] = rc.y4;
        f[i + 18] = tc.x1;
        f[i + 19] = tc.y2;
        u[i + 20] = cBl;
        f[i + 21] = tidx;
        f[i + 22] = 0;
        f[i + 23] = 1;
        f[i + 24] = rc.x3;
        f[i + 25] = rc.y3;
        f[i + 26] = tc.x2;
        f[i + 27] = tc.y2;
        u[i + 28] = cBr;
        f[i + 29] = tidx;
        f[i + 30] = 1;
        f[i + 31] = 1;
        this.curRenderOp.numQuads++;
        this.curBufferIdx = i + 32;
    }
    newRenderOp(quad, bufferIdx) {
        const curRenderOp = new WebGlRenderOp(this, quad, bufferIdx);
        this.curRenderOp = curRenderOp;
        this.renderOps.push(curRenderOp);
    }
    addTexture(texture, bufferIdx, recursive) {
        const textureIdx = this.curRenderOp.addTexture(texture);
        if (textureIdx === 4294967295) {
            if (recursive) {
                throw new Error("Unable to add texture to render op");
            }
            this.newRenderOp(this.curRenderOp, bufferIdx);
            return this.addTexture(texture, bufferIdx, true);
        }
        return textureIdx;
    }
    reuseRenderOp(params2) {
        var _a, _b;
        if (((_a = this.curRenderOp) == null ? void 0 : _a.shader.shaderKey) !== params2.shader.shaderKey) {
            return false;
        }
        if (compareRect(this.curRenderOp.clippingRect, params2.clippingRect) === false) {
            return false;
        }
        if (this.curRenderOp.parentHasRenderTexture !== params2.parentHasRenderTexture || this.curRenderOp.rtt !== params2.rtt) {
            return false;
        }
        if (params2.parentHasRenderTexture === true && this.curRenderOp.framebufferDimensions !== null && params2.framebufferDimensions !== null) {
            if (this.curRenderOp.framebufferDimensions.w !== params2.framebufferDimensions.w || this.curRenderOp.framebufferDimensions.h !== params2.framebufferDimensions.h) {
                return false;
            }
        }
        if (this.curRenderOp.shader.shaderKey === "default" && ((_b = params2.shader) == null ? void 0 : _b.shaderKey) === "default") {
            return true;
        }
        if (this.curRenderOp.shader.program.reuseRenderOp(params2, this.curRenderOp) === false) {
            return false;
        }
        return true;
    }
    addRenderOp(renderable) {
        this.renderOps.push(renderable);
        this.curRenderOp = null;
    }
    render(surface = "screen") {
        const {glw: glw, quadBuffer: quadBuffer} = this;
        const arr = new Float32Array(quadBuffer, 0, this.curBufferIdx);
        const buffer = this.quadBufferCollection.getBuffer("a_position") || null;
        glw.arrayBufferData(buffer, arr, glw.STATIC_DRAW);
        for (let i = 0, length = this.renderOps.length; i < length; i++) {
            this.renderOps[i].draw();
        }
        this.quadBufferUsage = this.curBufferIdx * arr.BYTES_PER_ELEMENT;
        const QUAD_SIZE_IN_BYTES = 4 * (8 * arr.BYTES_PER_ELEMENT);
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
    findMaxChildRTTIndex(node) {
        let maxIndex = -1;
        const traverseChildren = currentNode => {
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
        const {glw: glw} = this;
        for (let i = 0; i < this.rttNodes.length; i++) {
            const node = this.rttNodes[i];
            if (node === void 0 || node.hasRTTupdates === false) {
                continue;
            }
            if (node.worldAlpha === 0 || node.renderState === CoreNodeRenderState.OutOfBounds) {
                continue;
            }
            if (node.texture === null || node.texture.state !== "loaded") {
                continue;
            }
            this.activeRttNode = node;
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
    updateViewport() {
        this.glw.viewport(0, 0, this.glw.canvas.width, this.glw.canvas.height);
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
    getDefaultShaderNode() {
        if (this.defaultShaderNode !== null) {
            return this.defaultShaderNode;
        }
        this.stage.shManager.registerShaderType("default", Default);
        this.defaultShaderNode = this.stage.shManager.createShader("default");
        return this.defaultShaderNode;
    }
    getTextureCoords(node) {
        var _a, _b;
        const texture = node.texture;
        if (texture === null) {
            return void 0;
        }
        const ctxTexture = texture.parentTexture !== void 0 ? texture.parentTexture.ctxTexture : texture.ctxTexture;
        if (ctxTexture === void 0) {
            return void 0;
        }
        const textureOptions = node.props.textureOptions;
        if (texture.type !== TextureType.subTexture && textureOptions === void 0) {
            return ctxTexture.txCoords;
        }
        let {x1: x1, x2: x2, y1: y1, y2: y2} = ctxTexture.txCoords;
        if (texture.type === TextureType.subTexture) {
            const {w: parentW, h: parentH} = texture.parentTexture.dimensions;
            const {x: x, y: y, w: w, h: h} = texture.props;
            x1 = x / parentW;
            y1 = y / parentH;
            x2 = x1 + w / parentW;
            y2 = y1 + h / parentH;
        }
        const resizeMode = textureOptions.resizeMode;
        if (resizeMode !== void 0 && resizeMode.type === "cover" && texture.dimensions !== null) {
            const dimensions = texture.dimensions;
            const w = node.props.w;
            const h = node.props.h;
            const scaleX = w / dimensions.w;
            const scaleY = h / dimensions.h;
            const scale = Math.max(scaleX, scaleY);
            const precision = 1 / scale;
            if (scaleX < scale) {
                const desiredSize = precision * node.props.w;
                x1 = (1 - desiredSize / dimensions.w) * ((_a = resizeMode.clipX) != null ? _a : .5);
                x2 = x1 + desiredSize / dimensions.w;
            }
            if (scaleY < scale) {
                const desiredSize = precision * node.props.h;
                y1 = (1 - desiredSize / dimensions.h) * ((_b = resizeMode.clipY) != null ? _b : .5);
                y2 = y1 + desiredSize / dimensions.h;
            }
        }
        if (textureOptions.flipX === true) {
            [x1, x2] = [ x2, x1 ];
        }
        if (textureOptions.flipY === true) {
            [y1, y2] = [ y2, y1 ];
        }
        return {
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2
        };
    }
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
    }
}

const IDENTITY_MATRIX_3x3 = new Float32Array([ 1, 0, 0, 0, 1, 0, 0, 0, 1 ]);

const Sdf = {
    props: {
        transform: IDENTITY_MATRIX_3x3,
        color: 4294967295,
        size: 16,
        distanceRange: 1
    },
    onSdfBind(props2) {
        this.uniformMatrix3fv("u_transform", props2.transform);
        this.uniform4fa("u_color", getNormalizedRgbaComponents(props2.color));
        this.uniform1f("u_size", props2.size);
        this.uniform1f("u_distanceRange", props2.distanceRange);
    },
    vertex: "\n    # ifdef GL_FRAGMENT_PRECISION_HIGH\n    precision highp float;\n    # else\n    precision mediump float;\n    # endif\n    // an attribute is an input (in) to a vertex shader.\n    // It will receive data from a buffer\n    attribute vec2 a_position;\n    attribute vec2 a_textureCoords;\n\n    uniform vec2 u_resolution;\n    uniform mat3 u_transform;\n    uniform float u_pixelRatio;\n    uniform float u_size;\n    uniform float u_distanceRange;\n\n    varying vec2 v_texcoord;\n    varying float v_scaledDistRange;\n\n    void main() {\n      vec2 scrolledPosition = a_position * u_size;\n      vec2 transformedPosition = (u_transform * vec3(scrolledPosition, 1)).xy;\n\n      // Calculate screen space with pixel ratio\n      vec2 screenSpace = (transformedPosition * u_pixelRatio / u_resolution * 2.0 - 1.0) * vec2(1, -1);\n\n      gl_Position = vec4(screenSpace, 0.0, 1.0);\n      v_texcoord = a_textureCoords;\n      v_scaledDistRange = u_distanceRange * u_pixelRatio;\n    }\n  ",
    fragment: "\n    # ifdef GL_FRAGMENT_PRECISION_HIGH\n    precision highp float;\n    # else\n    precision mediump float;\n    # endif\n    uniform vec4 u_color;\n    uniform sampler2D u_texture;\n\n    varying vec2 v_texcoord;\n    varying float v_scaledDistRange;\n\n    float median(float r, float g, float b) {\n        return clamp(b, min(r, g), max(r, g));\n    }\n\n    void main() {\n        vec3 sample = texture2D(u_texture, v_texcoord).rgb;\n        float sigDist = v_scaledDistRange * (median(sample.r, sample.g, sample.b) - 0.5);\n        float opacity = clamp(sigDist + 0.5, 0.0, 1.0) * u_color.a;\n\n        // Build the final color.\n        // IMPORTANT: We must premultiply the color by the alpha value before returning it.\n        gl_FragColor = vec4(u_color.r * opacity, u_color.g * opacity, u_color.b * opacity, opacity);\n    }\n  "
};

const FLOATS_PER_VERTEX = 4;

const VERTICES_PER_GLYPH = 6;

const type$2 = "sdf";

let sdfShader = null;

const init$2 = stage => {
    init$3();
    stage.shManager.registerShaderType("Sdf", Sdf);
    sdfShader = stage.shManager.createShader("Sdf");
};

const font = SdfFontHandler;

const renderText$1 = props2 => {
    if (props2.text.length === 0) {
        return {
            width: 0,
            height: 0
        };
    }
    const fontData = getFontData(props2.fontFamily);
    if (fontData === void 0) {
        return {
            width: 0,
            height: 0
        };
    }
    const layout = generateTextLayout(props2, fontData);
    return {
        remainingLines: 0,
        hasRemainingText: false,
        width: layout.width,
        height: layout.height,
        layout: layout
    };
};

const addQuads$1 = layout => {
    if (layout === void 0) {
        return null;
    }
    const glyphs = layout.glyphs;
    const glyphsLength = glyphs.length;
    if (glyphsLength === 0) {
        return null;
    }
    const vertexBuffer = new Float32Array(glyphsLength * VERTICES_PER_GLYPH * FLOATS_PER_VERTEX);
    let bufferIndex = 0;
    let glyphIndex = 0;
    while (glyphIndex < glyphsLength) {
        const glyph = glyphs[glyphIndex];
        glyphIndex++;
        if (glyph === void 0) {
            continue;
        }
        const x1 = glyph.x;
        const y1 = glyph.y;
        const x2 = x1 + glyph.width;
        const y2 = y1 + glyph.height;
        const u1 = glyph.atlasX;
        const v1 = glyph.atlasY;
        const u2 = u1 + glyph.atlasWidth;
        const v2 = v1 + glyph.atlasHeight;
        vertexBuffer[bufferIndex++] = x1;
        vertexBuffer[bufferIndex++] = y1;
        vertexBuffer[bufferIndex++] = u1;
        vertexBuffer[bufferIndex++] = v1;
        vertexBuffer[bufferIndex++] = x2;
        vertexBuffer[bufferIndex++] = y1;
        vertexBuffer[bufferIndex++] = u2;
        vertexBuffer[bufferIndex++] = v1;
        vertexBuffer[bufferIndex++] = x1;
        vertexBuffer[bufferIndex++] = y2;
        vertexBuffer[bufferIndex++] = u1;
        vertexBuffer[bufferIndex++] = v2;
        vertexBuffer[bufferIndex++] = x2;
        vertexBuffer[bufferIndex++] = y1;
        vertexBuffer[bufferIndex++] = u2;
        vertexBuffer[bufferIndex++] = v1;
        vertexBuffer[bufferIndex++] = x2;
        vertexBuffer[bufferIndex++] = y2;
        vertexBuffer[bufferIndex++] = u2;
        vertexBuffer[bufferIndex++] = v2;
        vertexBuffer[bufferIndex++] = x1;
        vertexBuffer[bufferIndex++] = y2;
        vertexBuffer[bufferIndex++] = u1;
        vertexBuffer[bufferIndex++] = v2;
    }
    return vertexBuffer;
};

const renderQuads$1 = (renderer2, layout, vertexBuffer, renderProps) => {
    const fontFamily = renderProps.fontFamily;
    const color = renderProps.color;
    const worldAlpha = renderProps.worldAlpha;
    const globalTransform = renderProps.globalTransform;
    const atlasTexture = getAtlas(fontFamily);
    if (atlasTexture === null) {
        console.warn("SDF atlas texture not found for font: ".concat(fontFamily));
        return;
    }
    const glw = renderer2.glw;
    const stride = 4 * Float32Array.BYTES_PER_ELEMENT;
    const webGlBuffer = glw.createBuffer();
    if (!webGlBuffer) {
        console.warn("Failed to create WebGL buffer for SDF text");
        return;
    }
    const webGlBuffers = new BufferCollection([ {
        buffer: webGlBuffer,
        attributes: {
            a_position: {
                name: "a_position",
                size: 2,
                type: glw.FLOAT,
                normalized: false,
                stride: stride,
                offset: 0
            },
            a_textureCoords: {
                name: "a_textureCoords",
                size: 2,
                type: glw.FLOAT,
                normalized: false,
                stride: stride,
                offset: 2 * Float32Array.BYTES_PER_ELEMENT
            }
        }
    } ]);
    const buffer = webGlBuffers.getBuffer("a_position");
    if (buffer !== void 0) {
        glw.arrayBufferData(buffer, vertexBuffer, glw.STATIC_DRAW);
    }
    const renderOp = new WebGlRenderOp(renderer2, {
        sdfShaderProps: {
            transform: globalTransform,
            color: mergeColorAlpha(color, worldAlpha),
            size: layout.fontScale,
            distanceRange: layout.distanceRange
        },
        sdfBuffers: webGlBuffers,
        shader: sdfShader,
        alpha: worldAlpha,
        clippingRect: renderProps.clippingRect,
        height: layout.height,
        width: layout.width,
        rtt: false,
        parentHasRenderTexture: renderProps.parentHasRenderTexture,
        framebufferDimensions: renderProps.framebufferDimensions
    }, 0);
    renderOp.addTexture(atlasTexture.ctxTexture);
    renderOp.numQuads = layout.glyphs.length;
    renderer2.addRenderOp(renderOp);
};

const generateTextLayout = (props2, fontCache2) => {
    const fontSize = props2.fontSize;
    const fontFamily = props2.fontFamily;
    const lineHeight = props2.lineHeight;
    const metrics = getFontMetrics$1(fontFamily, fontSize);
    props2.verticalAlign;
    const fontData = fontCache2.data;
    const commonFontData = fontData.common;
    const designFontSize = fontData.info.size;
    const atlasWidth = commonFontData.scaleW;
    const atlasHeight = commonFontData.scaleH;
    const fontScale = fontSize / designFontSize;
    const letterSpacing = props2.letterSpacing / fontScale;
    const maxWidth = props2.maxWidth / fontScale;
    const maxHeight = props2.maxHeight;
    const [lines, remainingLines, hasRemainingText, bareLineHeight, lineHeightPx, effectiveWidth, effectiveHeight] = mapTextLayout(measureText$1, metrics, props2.text, props2.textAlign, fontFamily, lineHeight, props2.overflowSuffix, props2.wordBreak, letterSpacing, props2.maxLines, maxWidth, maxHeight);
    const lineAmount = lines.length;
    const glyphs = [];
    let currentX = 0;
    let currentY = 0;
    for (let i = 0; i < lineAmount; i++) {
        const line = lines[i];
        const textLine = line[0];
        const textLineLength = textLine.length;
        let prevCodepoint = 0;
        currentX = line[3];
        currentY = line[4] / fontScale;
        for (let j = 0; j < textLineLength; j++) {
            const char = textLine.charAt(j);
            if (hasZeroWidthSpace(char) === true) {
                continue;
            }
            const codepoint = char.codePointAt(0);
            if (codepoint === void 0) {
                continue;
            }
            const glyph = getGlyph(fontFamily, codepoint);
            if (glyph === null) {
                continue;
            }
            let advance = glyph.xadvance;
            if (prevCodepoint !== 0) {
                const kerning = getKerning(fontFamily, prevCodepoint, codepoint);
                advance += kerning;
            }
            const glyphLayout = {
                codepoint: codepoint,
                glyphId: glyph.id,
                x: currentX + glyph.xoffset,
                y: currentY + glyph.yoffset,
                width: glyph.width,
                height: glyph.height,
                xOffset: glyph.xoffset,
                yOffset: glyph.yoffset,
                atlasX: glyph.x / atlasWidth,
                atlasY: glyph.y / atlasHeight,
                atlasWidth: glyph.width / atlasWidth,
                atlasHeight: glyph.height / atlasHeight
            };
            glyphs.push(glyphLayout);
            currentX += advance + letterSpacing;
            prevCodepoint = codepoint;
        }
        currentY += lineHeightPx;
    }
    return {
        glyphs: glyphs,
        distanceRange: fontScale * fontData.distanceField.distanceRange,
        width: effectiveWidth * fontScale,
        height: effectiveHeight,
        fontScale: fontScale,
        lineHeight: lineHeightPx,
        fontFamily: fontFamily
    };
};

const SdfTextRenderer = {
    type: type$2,
    font: font,
    renderText: renderText$1,
    addQuads: addQuads$1,
    renderQuads: renderQuads$1,
    init: init$2
};

const fontFamilies = {};

const fontLoadPromises = new Map;

const normalizedMetrics = new Map;

const nodesWaitingForFont = Object.create(null);

const fontCache = new Map;

let initialized = false;

let measureContext$1;

const canRenderFont = () => true;

const processFontData = (fontFamily, fontFace, metrics) => {
    metrics = metrics || defaultFontMetrics;
    fontCache.set(fontFamily, {
        fontFamily: fontFamily,
        fontFace: fontFace,
        metrics: metrics
    });
};

const loadFont = async (stage, options) => {
    const {fontFamily: fontFamily, fontUrl: fontUrl, metrics: metrics} = options;
    if (fontCache.has(fontFamily) === true) {
        return;
    }
    const existingPromise = fontLoadPromises.get(fontFamily);
    if (existingPromise !== void 0) {
        return existingPromise;
    }
    const nwff = nodesWaitingForFont[fontFamily] = [];
    const loadPromise = new FontFace(fontFamily, "url(".concat(fontUrl, ")")).load().then(loadedFont => {
        stage.platform.addFont(loadedFont);
        processFontData(fontFamily, loadedFont, metrics);
        fontLoadPromises.delete(fontFamily);
        for (let key in nwff) {
            nwff[key].setUpdateType(UpdateType.Local);
        }
        delete nodesWaitingForFont[fontFamily];
    }).catch(error => {
        fontLoadPromises.delete(fontFamily);
        console.error("Failed to load font: ".concat(fontFamily), error);
        throw error;
    });
    fontLoadPromises.set(fontFamily, loadPromise);
    return loadPromise;
};

const getFontFamilies = () => fontFamilies;

const init$1 = (c, mc) => {
    if (initialized === true) {
        return;
    }
    if (c === void 0) {
        throw new Error("Canvas context is not provided for font handler initialization");
    }
    measureContext$1 = mc;
    const defaultMetrics = {
        ascender: 800,
        descender: -200,
        lineGap: 200,
        unitsPerEm: 1e3
    };
    processFontData("sans-serif", void 0, defaultMetrics);
    initialized = true;
};

const type$1 = "canvas";

const isFontLoaded = fontFamily => fontCache.has(fontFamily);

const waitingForFont = (fontFamily, node) => {
    if (nodesWaitingForFont[fontFamily] === void 0) {
        return;
    }
    nodesWaitingForFont[fontFamily][node.id] = node;
};

const stopWaitingForFont = (fontFamily, node) => {
    if (nodesWaitingForFont[fontFamily] === void 0) {
        return;
    }
    delete nodesWaitingForFont[fontFamily][node.id];
};

const getFontMetrics = (fontFamily, fontSize) => {
    const out = normalizedMetrics.get(fontFamily + fontSize);
    if (out !== void 0) {
        return out;
    }
    let metrics = fontCache.get(fontFamily).metrics;
    if (metrics === void 0) {
        metrics = calculateFontMetrics(fontFamily);
    }
    return processFontMetrics(fontFamily, fontSize, metrics);
};

const processFontMetrics = (fontFamily, fontSize, metrics) => {
    const label = fontFamily + fontSize;
    const normalized = normalizeFontMetrics(metrics, fontSize);
    normalizedMetrics.set(label, normalized);
    return normalized;
};

const measureText = (text, fontFamily, letterSpacing) => {
    if (letterSpacing === 0) {
        return measureContext$1.measureText(text).width;
    }
    if (hasZeroWidthSpace(text) === false) {
        return measureContext$1.measureText(text).width + letterSpacing * text.length;
    }
    return text.split("").reduce((acc, char) => {
        if (hasZeroWidthSpace(char) === true) {
            return acc;
        }
        return acc + measureContext$1.measureText(char).width + letterSpacing;
    }, 0);
};

function calculateFontMetrics(fontFamily, fontSize) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const metrics = measureContext$1.measureText("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz");
    console.warn("Font metrics not provided for Canvas Web font ".concat(fontFamily, ". ") + "Using fallback values. It is HIGHLY recommended you use the latest version of the Lightning 3 `msdf-generator` tool to extract the default metrics for the font and provide them in the Canvas Web font definition.");
    const ascender = (_b = (_a = metrics.fontBoundingBoxAscent) != null ? _a : metrics.actualBoundingBoxAscent) != null ? _b : 0;
    const descender = (_d = (_c = metrics.fontBoundingBoxDescent) != null ? _c : metrics.actualBoundingBoxDescent) != null ? _d : 0;
    return {
        ascender: ascender,
        descender: -descender,
        lineGap: ((_e = metrics.emHeightAscent) != null ? _e : 0) + ((_f = metrics.emHeightDescent) != null ? _f : 0) - (ascender + descender),
        unitsPerEm: ((_g = metrics.emHeightAscent) != null ? _g : 0) + ((_h = metrics.emHeightDescent) != null ? _h : 0)
    };
}

const CanvasFontHandler = Object.freeze(Object.defineProperty({
    __proto__: null,
    calculateFontMetrics: calculateFontMetrics,
    canRenderFont: canRenderFont,
    getFontFamilies: getFontFamilies,
    getFontMetrics: getFontMetrics,
    init: init$1,
    isFontLoaded: isFontLoaded,
    loadFont: loadFont,
    measureText: measureText,
    processFontMetrics: processFontMetrics,
    stopWaitingForFont: stopWaitingForFont,
    type: type$1,
    waitingForFont: waitingForFont
}, Symbol.toStringTag, {
    value: "Module"
}));

const type = "canvas";

let canvas = null;

let context = null;

let measureCanvas = null;

let measureContext = null;

const layoutCache = new Map;

const init = stage => {
    const dpr = stage.options.devicePhysicalPixelRatio;
    canvas = stage.platform.createCanvas();
    context = canvas.getContext("2d", {
        willReadFrequently: true
    });
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.textRendering = "optimizeSpeed";
    measureCanvas = stage.platform.createCanvas();
    measureContext = measureCanvas.getContext("2d");
    measureContext.setTransform(dpr, 0, 0, dpr, 0, 0);
    measureContext.textRendering = "optimizeSpeed";
    measureCanvas.width = 1;
    measureCanvas.height = 1;
    init$1(context, measureContext);
};

const renderText = props2 => {
    const {text: text, fontFamily: fontFamily, fontStyle: fontStyle, fontSize: fontSize, textAlign: textAlign, maxLines: maxLines, lineHeight: lineHeight, verticalAlign: verticalAlign, overflowSuffix: overflowSuffix, maxWidth: maxWidth, maxHeight: maxHeight, wordBreak: wordBreak} = props2;
    const font2 = "".concat(fontStyle, " ").concat(fontSize, "px Unknown, ").concat(fontFamily);
    measureContext.font = font2;
    measureContext.textBaseline = "hanging";
    const metrics = getFontMetrics(fontFamily, fontSize);
    const letterSpacing = props2.letterSpacing;
    const [lines, remainingLines, hasRemainingText, bareLineHeight, lineHeightPx, effectiveWidth, effectiveHeight] = mapTextLayout(measureText, metrics, text, textAlign, fontFamily, lineHeight, overflowSuffix, wordBreak, letterSpacing, maxLines, maxWidth, maxHeight);
    const lineAmount = lines.length;
    const canvasW = Math.ceil(effectiveWidth);
    const canvasH = Math.ceil(effectiveHeight);
    canvas.width = canvasW;
    canvas.height = canvasH;
    context.fillStyle = "white";
    context.font = font2;
    context.textBaseline = "hanging";
    if (fontSize >= 128) {
        context.globalAlpha = .01;
        context.fillRect(0, 0, .01, .01);
        context.globalAlpha = 1;
    }
    for (let i = 0; i < lineAmount; i++) {
        const line = lines[i];
        const textLine = line[0];
        let currentX = Math.ceil(line[3]);
        const currentY = Math.ceil(line[4]);
        if (letterSpacing === 0) {
            context.fillText(textLine, currentX, currentY);
        } else {
            const textLineLength = textLine.length;
            for (let j = 0; j < textLineLength; j++) {
                const char = textLine.charAt(j);
                if (hasZeroWidthSpace(char) === true) {
                    continue;
                }
                context.fillText(char, currentX, currentY);
                currentX += measureText(char, fontFamily, letterSpacing);
            }
        }
    }
    let imageData = null;
    if (canvas.width > 0 && canvas.height > 0) {
        imageData = context.getImageData(0, 0, canvasW, canvasH);
    }
    return {
        imageData: imageData,
        width: effectiveWidth,
        height: effectiveHeight,
        remainingLines: remainingLines,
        hasRemainingText: hasRemainingText
    };
};

const clearLayoutCache = () => {
    layoutCache.clear();
};

const addQuads = () => null;

const renderQuads = () => {};

const CanvasTextRenderer = {
    type: type,
    font: CanvasFontHandler,
    renderText: renderText,
    addQuads: addQuads,
    renderQuads: renderQuads,
    init: init,
    clearLayoutCache: clearLayoutCache
};

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
    return {
        isWhite: false,
        a: a,
        r: r,
        g: g,
        b: b
    };
}

function parseToAbgrString(abgr) {
    const a = (abgr >>> 24 & 255) / 255;
    const b = abgr >>> 16 & 255 & 255;
    const g = abgr >>> 8 & 255 & 255;
    const r = abgr & 255 & 255;
    return "rgba(".concat(r, ",").concat(g, ",").concat(b, ",").concat(a, ")");
}

function parseToRgbaString(rgba) {
    const r = rgba >>> 24 & 255;
    const g = rgba >>> 16 & 255 & 255;
    const b = rgba >>> 8 & 255 & 255;
    const a = (rgba & 255 & 255) / 255;
    return "rgba(".concat(r, ",").concat(g, ",").concat(b, ",").concat(a, ")");
}

function formatRgba({a: a, r: r, g: g, b: b}) {
    return "rgba(".concat(r, ",").concat(g, ",").concat(b, ",").concat(a, ")");
}

class CanvasTexture extends CoreContextTexture {
    constructor() {
        super(...arguments);
        __publicField(this, "image");
        __publicField(this, "tintCache");
    }
    async load() {
        this.textureSource.setState("loading");
        try {
            const size = await this.onLoadRequest();
            this.textureSource.setState("loaded", size);
            this.textureSource.freeTextureData();
            this.updateMemSize();
        } catch (err) {
            this.textureSource.setState("failed", err);
            this.textureSource.freeTextureData();
            throw err;
        }
    }
    release() {
        this.image = void 0;
        this.tintCache = void 0;
    }
    free() {
        this.release();
        this.textureSource.setState("freed");
        this.setTextureMemUse(0);
        this.textureSource.freeTextureData();
    }
    updateMemSize() {
        const mult = this.tintCache ? 8 : 4;
        if (this.textureSource.dimensions) {
            this.setTextureMemUse(this.textureSource.dimensions.w * this.textureSource.dimensions.h * mult);
        }
    }
    hasImage() {
        return this.image !== void 0;
    }
    getImage(color) {
        var _a;
        const image = this.image;
        if (color.isWhite) {
            if (this.tintCache) {
                this.tintCache = void 0;
                this.updateMemSize();
            }
            return image;
        }
        const key = formatRgba(color);
        if (((_a = this.tintCache) == null ? void 0 : _a.key) === key) {
            return this.tintCache.image;
        }
        const tintedImage = this.tintTexture(image, key);
        this.tintCache = {
            key: key,
            image: tintedImage
        };
        this.updateMemSize();
        return tintedImage;
    }
    tintTexture(source, color) {
        const {width: width, height: height} = source;
        const canvas2 = document.createElement("canvas");
        canvas2.width = width;
        canvas2.height = height;
        const ctx = canvas2.getContext("2d");
        if (ctx) {
            ctx.fillStyle = color;
            ctx.globalCompositeOperation = "copy";
            ctx.fillRect(0, 0, width, height);
            ctx.globalCompositeOperation = "multiply";
            ctx.drawImage(source, 0, 0, width, height, 0, 0, width, height);
            ctx.globalCompositeOperation = "destination-in";
            ctx.drawImage(source, 0, 0, width, height, 0, 0, width, height);
        }
        return canvas2;
    }
    async onLoadRequest() {
        var _a, _b;
        assertTruthy((_b = (_a = this.textureSource) == null ? void 0 : _a.textureData) == null ? void 0 : _b.data);
        const {data: data} = this.textureSource.textureData;
        if (data instanceof ImageData) {
            const canvas2 = document.createElement("canvas");
            canvas2.width = data.width;
            canvas2.height = data.height;
            const ctx = canvas2.getContext("2d");
            if (ctx) ctx.putImageData(data, 0, 0);
            this.image = canvas2;
            return {
                w: data.width,
                h: data.height
            };
        } else if (typeof ImageBitmap !== "undefined" && data instanceof ImageBitmap || data instanceof HTMLImageElement) {
            this.image = data;
            return {
                w: data.width,
                h: data.height
            };
        }
        return {
            w: 0,
            h: 0
        };
    }
}

const parsedArgbColors = new Map;

const parsedRgbaColors = new Map;

function normalizeCanvasColor(color, isRGBA = false) {
    let targetCache = isRGBA === true ? parsedRgbaColors : parsedArgbColors;
    let out = targetCache.get(color);
    if (out !== void 0) {
        return out;
    }
    if (isRGBA === true) {
        out = parseToRgbaString(color);
    } else {
        out = parseToAbgrString(color);
    }
    targetCache.set(color, out);
    return out;
}

class CanvasShaderNode extends CoreShaderNode {
    constructor(shaderKey, config, stage, props2) {
        super(shaderKey, config, stage, props2);
        __publicField(this, "updater");
        __publicField(this, "valueKey", "");
        __publicField(this, "computed", {});
        __publicField(this, "applySNR");
        __publicField(this, "render");
        this.applySNR = config.saveAndRestore || false;
        this.render = config.render;
        if (config.update !== void 0) {
            this.updater = config.update;
            if (this.props === void 0) {
                this.updater(this.node, this.props);
                return;
            }
            this.update = () => {
                const prevKey = this.valueKey;
                this.valueKey = this.createValueKey();
                if (prevKey === this.valueKey) {
                    return;
                }
                if (prevKey.length > 0) {
                    this.stage.shManager.mutateShaderValueUsage(prevKey, -1);
                }
                const computed = this.stage.shManager.getShaderValues(this.valueKey);
                if (computed !== void 0) {
                    this.computed = computed;
                }
                this.computed = {};
                this.updater(this.node);
                this.stage.shManager.setShaderValues(this.valueKey, this.computed);
            };
        }
    }
    toColorString(rgba) {
        return normalizeCanvasColor(rgba, true);
    }
}

class CanvasRenderer extends CoreRenderer {
    constructor(options) {
        super(options);
        __publicField(this, "context");
        __publicField(this, "canvas");
        __publicField(this, "pixelRatio");
        __publicField(this, "clearColor");
        __publicField(this, "renderToTextureActive", false);
        __publicField(this, "activeRttNode", null);
        this.mode = "canvas";
        const {canvas: canvas2} = options;
        this.canvas = canvas2;
        this.context = canvas2.getContext("2d");
        this.pixelRatio = this.stage.pixelRatio;
        this.clearColor = normalizeCanvasColor(this.stage.clearColor);
    }
    reset() {
        this.canvas.width = this.canvas.width;
        const ctx = this.context;
        if (this.clearColor) {
            ctx.fillStyle = this.clearColor;
            ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
        ctx.scale(this.pixelRatio, this.pixelRatio);
    }
    render() {}
    addQuad(quad) {
        const ctx = this.context;
        const {tx: tx, ty: ty, ta: ta, tb: tb, tc: tc, td: td, clippingRect: clippingRect} = quad;
        let texture = quad.texture;
        if (texture !== null) {
            const textureType = texture.type;
            if (textureType !== TextureType.image && textureType !== TextureType.subTexture && textureType !== TextureType.color && textureType !== TextureType.noise) {
                return;
            }
        }
        const hasTransform = ta !== 1;
        const hasClipping = clippingRect.width !== 0 && clippingRect.height !== 0;
        const hasShader = quad.shader !== null;
        let saveAndRestore = hasTransform === true || hasClipping === true;
        if (hasShader === true) {
            saveAndRestore = saveAndRestore || quad.shader.applySNR;
        }
        if (saveAndRestore) {
            ctx.save();
        }
        if (hasClipping === true) {
            const path = new Path2D;
            const {x: x, y: y, width: width, height: height} = clippingRect;
            path.rect(x, y, width, height);
            ctx.clip(path);
        }
        if (hasTransform === true) {
            const scale = this.pixelRatio;
            ctx.setTransform(ta, tc, tb, td, tx * scale, ty * scale);
            ctx.scale(scale, scale);
            ctx.translate(-tx, -ty);
        }
        if (hasShader === true) {
            let renderContext = () => {
                this.renderContext(quad);
            };
            quad.shader.render(ctx, quad, renderContext);
            renderContext = null;
        } else {
            this.renderContext(quad);
        }
        if (saveAndRestore) {
            ctx.restore();
        }
    }
    renderContext(quad) {
        var _a, _b;
        const color = quad.colorTl;
        const texture = quad.texture;
        const textureType = texture.type;
        if (textureType !== TextureType.color) {
            const tintColor = parseColor(color);
            if (textureType !== TextureType.subTexture) {
                const image2 = texture.ctxTexture.getImage(tintColor);
                this.context.globalAlpha = (_a = tintColor.a) != null ? _a : quad.alpha;
                this.context.drawImage(image2, quad.tx, quad.ty, quad.width, quad.height);
                this.context.globalAlpha = 1;
                return;
            }
            const image = texture.parentTexture.ctxTexture.getImage(tintColor);
            const props2 = texture.props;
            this.context.globalAlpha = (_b = tintColor.a) != null ? _b : quad.alpha;
            this.context.drawImage(image, props2.x, props2.y, props2.w, props2.h, quad.tx, quad.ty, quad.width, quad.height);
            this.context.globalAlpha = 1;
            return;
        }
        const hasGradient = quad.colorTl !== quad.colorTr || quad.colorTl !== quad.colorBr;
        if (hasGradient === true) {
            let endX = quad.tx;
            let endY = quad.ty;
            let endColor;
            if (quad.colorTl === quad.colorTr) {
                endX = quad.tx;
                endY = quad.ty + quad.height;
                endColor = quad.colorBr;
            } else {
                endX = quad.tx + quad.width;
                endY = quad.ty;
                endColor = quad.colorTr;
            }
            const gradient = this.context.createLinearGradient(quad.tx, quad.ty, endX, endY);
            gradient.addColorStop(0, normalizeCanvasColor(color));
            gradient.addColorStop(1, normalizeCanvasColor(endColor));
            this.context.fillStyle = gradient;
            this.context.fillRect(quad.tx, quad.ty, quad.width, quad.height);
        } else {
            this.context.fillStyle = normalizeCanvasColor(color);
            this.context.fillRect(quad.tx, quad.ty, quad.width, quad.height);
        }
    }
    createShaderNode(shaderKey, shaderType, props2) {
        return new CanvasShaderNode(shaderKey, shaderType, this.stage, props2);
    }
    createShaderProgram(shaderConfig) {
        return null;
    }
    supportsShaderType(shaderType) {
        return shaderType.render !== void 0;
    }
    createCtxTexture(textureSource) {
        return new CanvasTexture(this.stage.txMemManager, textureSource);
    }
    renderRTTNodes() {}
    removeRTTNode(node) {}
    renderToTexture(node) {}
    getBufferInfo() {
        return null;
    }
    getQuadCount() {
        return null;
    }
    updateClearColor(color) {
        this.clearColor = normalizeCanvasColor(color);
    }
    updateViewport() {}
    getDefaultShaderNode() {
        return null;
    }
}

const [focusPath, setFocusPath] = createSignal([]);

const useFocusManager = (userKeyMap, keyHoldOptions) => {
    const owner = getOwner();
    const ownerContext = runWithOwner.bind(void 0, owner);
    Config.setActiveElement = activeElm => ownerContext(() => setActiveElement(activeElm));
    const {cleanup: cleanup, focusPath: focusPathCore} = useFocusManager$1({
        userKeyMap: userKeyMap,
        keyHoldOptions: keyHoldOptions,
        ownerContext: ownerContext
    });
    createEffect(on(activeElement, () => {
        setFocusPath([ ...focusPathCore() ]);
    }, {
        defer: true
    }));
    onCleanup(cleanup);
};

const ARIA_PARENT_ID = "aria-parent";

let ariaLabelPhrases = [];

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
    return [ flattenedSeries.join(",\b ") ].concat(series.slice(i));
}

function delay(pause) {
    return new Promise(resolve => {
        setTimeout(resolve, pause);
    });
}

function addChildrenToAriaDiv(phrase) {
    var _a;
    if (((_a = phrase == null ? void 0 : phrase.text) == null ? void 0 : _a.trim().length) === 0) return;
    ariaLabelPhrases.push(phrase);
}

function focusElementForAria() {
    const element = createAriaElement();
    if (!element) {
        console.error("ARIA div not found: ".concat(ARIA_PARENT_ID));
        return;
    }
    for (const object of ariaLabelPhrases) {
        const span = document.createElement("span");
        span.setAttribute("lang", object.lang);
        span.setAttribute("aria-label", object.text);
        element.appendChild(span);
    }
    setTimeout(() => {
        ariaLabelPhrases = [];
        cleanAriaLabelParent();
        focusCanvas();
    }, 100);
}

function cleanAriaLabelParent() {
    const parentTag = document.getElementById(ARIA_PARENT_ID);
    if (parentTag) {
        while (parentTag.firstChild) {
            parentTag.removeChild(parentTag.firstChild);
        }
    }
}

function focusCanvas() {
    var _a;
    const canvas2 = (_a = document.getElementById("app")) == null ? void 0 : _a.firstChild;
    canvas2 == null ? void 0 : canvas2.focus();
}

function createAriaElement() {
    const aria_container = document.getElementById(ARIA_PARENT_ID);
    if (!aria_container) {
        const element = document.createElement("div");
        element.setAttribute("id", ARIA_PARENT_ID);
        element.setAttribute("aria-live", "assertive");
        element.setAttribute("tabindex", "0");
        document.body.appendChild(element);
        return element;
    }
    return aria_container;
}

function speak(phrase, utterances, lang = "en-US", voiceName) {
    const synth = window.speechSynthesis;
    return new Promise((resolve, reject) => {
        let selectedVoice;
        if (voiceName) {
            const availableVoices = synth.getVoices();
            selectedVoice = availableVoices.find(v => v.name === voiceName) || availableVoices[0];
        }
        const utterance = new SpeechSynthesisUtterance(phrase);
        utterance.lang = lang;
        if (selectedVoice) {
            utterance.voice = selectedVoice;
        }
        utterance.onend = () => {
            resolve();
        };
        utterance.onerror = e => {
            reject(e);
        };
        utterances.push(utterance);
        synth.speak(utterance);
    });
}

function speakSeries(series, aria, lang, voice, root = true) {
    const synth = window.speechSynthesis;
    const remainingPhrases = flattenStrings(Array.isArray(series) ? series : [ series ]);
    const nestedSeriesResults = [];
    const utterances = [];
    let active = true;
    const seriesChain = (async () => {
        try {
            while (active && remainingPhrases.length) {
                const phrase = await Promise.resolve(remainingPhrases.shift());
                if (!active) {
                    break;
                }
                if (typeof phrase === "string" && phrase.includes("PAUSE-")) {
                    const pause = Number(phrase.split("PAUSE-")[1]) * 1e3;
                    if (!isNaN(pause)) {
                        await delay(pause);
                    }
                } else if (typeof phrase === "string") {
                    if (!phrase) {
                        continue;
                    }
                    const totalRetries = 3;
                    let retriesLeft = totalRetries;
                    while (active && retriesLeft > 0) {
                        try {
                            if (aria) addChildrenToAriaDiv({
                                text: phrase,
                                lang: lang
                            }); else await speak(phrase, utterances, lang, voice);
                            retriesLeft = 0;
                        } catch (e) {
                            if (e instanceof SpeechSynthesisErrorEvent) {
                                if (e.error === "network") {
                                    retriesLeft--;
                                    console.warn("Speech synthesis network error. Retries left: ".concat(retriesLeft));
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
                } else if (phrase instanceof SpeechSynthesisUtterance) {
                    const totalRetries = 3;
                    let retriesLeft = totalRetries;
                    const text = phrase.text;
                    const objectLang = phrase == null ? void 0 : phrase.lang;
                    const objectVoice = phrase == null ? void 0 : phrase.voice;
                    while (active && retriesLeft > 0) {
                        try {
                            if (text) {
                                if (aria) addChildrenToAriaDiv({
                                    text: text,
                                    lang: objectLang
                                }); else await speak(text, utterances, objectLang, objectVoice == null ? void 0 : objectVoice.name);
                                retriesLeft = 0;
                            }
                        } catch (e) {
                            if (e instanceof SpeechSynthesisErrorEvent) {
                                if (e.error === "network") {
                                    retriesLeft--;
                                    console.warn("Speech synthesis network error. Retries left: ".concat(retriesLeft));
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
                    const seriesResult = speakSeries(phrase(), aria, lang, voice, false);
                    nestedSeriesResults.push(seriesResult);
                    await seriesResult.series;
                } else if (Array.isArray(phrase)) {
                    const seriesResult = speakSeries(phrase, aria, lang, voice, false);
                    nestedSeriesResults.push(seriesResult);
                    await seriesResult.series;
                }
            }
        } finally {
            active = false;
            if (root && aria) {
                focusElementForAria();
            }
        }
    })();
    return {
        series: seriesChain,
        get active() {
            return active;
        },
        append: toSpeak => {
            remainingPhrases.push(toSpeak);
        },
        cancel: () => {
            if (!active) {
                return;
            }
            if (root) {
                if (aria) {
                    const element = createAriaElement();
                    if (element) {
                        ariaLabelPhrases = [];
                        cleanAriaLabelParent();
                        element.focus();
                        focusCanvas();
                    }
                    return;
                }
                synth.cancel();
            }
            nestedSeriesResults.forEach(nestedSeriesResult => {
                nestedSeriesResult.cancel();
            });
            active = false;
        }
    };
}

let currentSeries;

function SpeechEngine(toSpeak, aria, lang = "en-US", voice) {
    currentSeries && currentSeries.cancel();
    currentSeries = speakSeries(toSpeak, aria, lang, voice);
    return currentSeries;
}

const voidFn = () => void 0;

const isServer = false;

const debounce = (callback, wait) => {
    let timeoutId;
    const clear = () => clearTimeout(timeoutId);
    if (getOwner()) onCleanup(clear);
    const debounced = (...args) => {
        if (timeoutId !== void 0) clear();
        timeoutId = setTimeout(() => callback(...args), wait);
    };
    return Object.assign(debounced, {
        clear: clear
    });
};

const throttle = (callback, wait) => {
    let isThrottled = false, timeoutId, lastArgs;
    const throttled = (...args) => {
        lastArgs = args;
        if (isThrottled) return;
        isThrottled = true;
        timeoutId = setTimeout(() => {
            callback(...lastArgs);
            isThrottled = false;
        }, wait);
    };
    const clear = () => {
        clearTimeout(timeoutId);
        isThrottled = false;
    };
    if (getOwner()) onCleanup(clear);
    return Object.assign(throttled, {
        clear: clear
    });
};

function createScheduled(schedule) {
    let listeners = 0;
    let isDirty = false;
    const [track, dirty] = createSignal(void 0, {
        equals: false
    });
    const call = schedule(() => {
        isDirty = true;
        dirty();
    });
    return () => {
        if (!isDirty) call(), track();
        if (isDirty) {
            isDirty = !!listeners;
            return true;
        }
        if (getListener()) {
            listeners++;
            onCleanup(() => listeners--);
        }
        return false;
    };
}

let resetFocusPathTimer;

let prevFocusPath = [];

let currentlySpeaking;

let voiceOutDisabled = false;

const fiveMinutes = 3e5;

function debounceWithFlush(callback, time) {
    const trigger = debounce(callback, time);
    let scopedValue;
    const debounced = newValue => {
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
    const loaded = focusPath2.every(elm => !elm.loading);
    const focusDiff = focusPath2.filter(elm => !prevFocusPath.includes(elm));
    resetFocusPathTimer();
    if (!loaded && Announcer.onFocusChange) {
        Announcer.onFocusChange([]);
        return;
    }
    prevFocusPath = focusPath2.slice(0);
    const toAnnounceText = [];
    const toAnnounce = focusDiff.reverse().reduce((acc, elm) => {
        if (elm.announce) {
            acc.push([ getElmName(elm), "Announce", elm.announce ]);
            toAnnounceText.push(elm.announce);
        } else if (elm.title) {
            acc.push([ getElmName(elm), "Title", elm.title ]);
            toAnnounceText.push(elm.title);
        } else {
            acc.push([ getElmName(elm), "No Announce", "" ]);
        }
        return acc;
    }, []);
    focusDiff.reverse().reduce((acc, elm) => {
        if (elm.announceContext) {
            acc.push([ getElmName(elm), "Context", elm.announceContext ]);
            toAnnounceText.push(elm.announceContext);
        } else {
            acc.push([ getElmName(elm), "No Context", "" ]);
        }
        return acc;
    }, toAnnounce);
    if (Announcer.debug) {
        console.table(toAnnounce);
    }
    if (toAnnounceText.length) {
        return Announcer.speak(toAnnounceText.reduce((acc, val) => acc.concat(val), []));
    }
}

function textToSpeech(toSpeak, aria, lang, voice) {
    if (voiceOutDisabled) {
        return;
    }
    return currentlySpeaking = SpeechEngine(toSpeak, aria, lang, voice);
}

const Announcer = {
    debug: false,
    enabled: true,
    lang: "en-US",
    aria: false,
    cancel: function() {
        currentlySpeaking && currentlySpeaking.cancel();
    },
    clearPrevFocus: function(depth2 = 0) {
        prevFocusPath = prevFocusPath.slice(0, depth2);
        resetFocusPathTimer();
    },
    speak: function(text, {append: append = false, notification: notification = false} = {}) {
        if (Announcer.onFocusChange && Announcer.enabled) {
            if (append && currentlySpeaking && currentlySpeaking.active) {
                currentlySpeaking.append(text);
            } else {
                Announcer.cancel();
                textToSpeech(text, Announcer.aria, Announcer.lang, Announcer.voice);
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
    setupTimers: function({focusDebounce: focusDebounce = 400, focusChangeTimeout: focusChangeTimeout = fiveMinutes} = {}) {
        Announcer.onFocusChange = debounceWithFlush(onFocusChangeCore, focusDebounce);
        resetFocusPathTimer = debounceWithFlush(() => {
            prevFocusPath = [];
        }, focusChangeTimeout);
    }
};

let doOnce = false;

const useAnnouncer = options => {
    if (doOnce) {
        return Announcer;
    }
    doOnce = true;
    Announcer.setupTimers(options);
    createEffect(on(focusPath, Announcer.onFocusChange, {
        defer: true
    }));
    return Announcer;
};

function isObject(value) {
    return value !== null && (typeof value === "object" || typeof value === "function");
}

function accessWith(valueOrFn, ...args) {
    return typeof valueOrFn === "function" ? valueOrFn(...args) : valueOrFn;
}

const tryOnCleanup = onCleanup;

const createCallbackStack = () => {
    let stack = [];
    const clear = () => stack = [];
    return {
        push: (...callbacks) => stack.push(...callbacks),
        execute(arg0, arg1, arg2, arg3) {
            stack.forEach(cb => cb(arg0, arg1, arg2, arg3));
            clear();
        },
        clear: clear
    };
};

function makeEventListener(target, type2, handler, options) {
    target.addEventListener(type2, handler, options);
    return tryOnCleanup(target.removeEventListener.bind(target, type2, handler, options));
}

function makeEventListenerStack(target, options) {
    const {push: push, execute: execute} = createCallbackStack();
    return [ (type2, handler, overwriteOptions) => {
        const clear = makeEventListener(target, type2, handler, overwriteOptions != null ? overwriteOptions : options);
        push(clear);
        return clear;
    }, onCleanup(execute) ];
}

const PASSIVE = {
    passive: true
};

const DEFAULT_MOUSE_POSITION = {
    x: 0,
    y: 0,
    isInside: false,
    sourceType: null
};

function makeMousePositionListener(target = window, callback, options = {}) {
    const {touch: touch = true, followTouch: followTouch = true} = options;
    const [listen, clear] = makeEventListenerStack(target, PASSIVE);
    const handleMouse = e => callback({
        x: e.pageX,
        y: e.pageY,
        sourceType: "mouse"
    });
    listen("mousemove", handleMouse);
    listen("dragover", handleMouse);
    if (touch) {
        const handleTouch = e => {
            if (e.touches.length) callback({
                x: e.touches[0].clientX,
                y: e.touches[0].clientY,
                sourceType: "touch"
            });
        };
        listen("touchstart", handleTouch);
        if (followTouch) listen("touchmove", handleTouch);
    }
    return clear;
}

function makeMouseInsideListener(target = window, callback, options = {}) {
    const {touch: touch = true} = options;
    const [listen, clear] = makeEventListenerStack(target, PASSIVE);
    let mouseIn = false;
    let touchIn = !touch;
    function handleChange(isInside) {
        this === "mouse" ? mouseIn = isInside : touchIn = isInside;
        callback(mouseIn || touchIn);
    }
    listen("mouseover", handleChange.bind("mouse", true));
    listen("mouseout", handleChange.bind("mouse", false));
    listen("mousemove", handleChange.bind("mouse", true), {
        passive: true,
        once: true
    });
    if (touch) {
        listen("touchstart", handleChange.bind("touch", true));
        listen("touchend", handleChange.bind("touch", false));
    }
    return clear;
}

function createSingletonRoot(factory, detachedOwner = getOwner()) {
    let listeners = 0, value, disposeRoot;
    return () => {
        listeners++;
        onCleanup(() => {
            listeners--;
            queueMicrotask(() => {
                if (!listeners && disposeRoot) {
                    disposeRoot();
                    disposeRoot = value = void 0;
                }
            });
        });
        if (!disposeRoot) {
            createRoot(dispose2 => value = factory(disposeRoot = dispose2), detachedOwner);
        }
        return value;
    };
}

function createHydratableSingletonRoot(factory) {
    const owner = getOwner();
    const singleton = createSingletonRoot(factory, owner);
    return () => sharedConfig.context ? createRoot(factory, owner) : singleton();
}

function createStaticStore(init2) {
    const copy = {
        ...init2
    }, store = {
        ...init2
    }, cache2 = {};
    const getValue = key => {
        let signal = cache2[key];
        if (!signal) {
            if (!getListener()) return copy[key];
            cache2[key] = signal = createSignal(copy[key], {
                internal: true
            });
            delete copy[key];
        }
        return signal[0]();
    };
    for (const key in init2) {
        Object.defineProperty(store, key, {
            get: () => getValue(key),
            enumerable: true
        });
    }
    const setValue = (key, value) => {
        const signal = cache2[key];
        if (signal) return signal[1](value);
        if (key in copy) copy[key] = accessWith(value, copy[key]);
    };
    return [ store, (a, b) => {
        if (isObject(a)) {
            const entries = untrack(() => Object.entries(accessWith(a, store)));
            batch(() => {
                for (const [key, value] of entries) setValue(key, () => value);
            });
        } else setValue(a, b);
        return store;
    } ];
}

function createMousePosition(target, options = {}) {
    const fallback = {
        ...DEFAULT_MOUSE_POSITION,
        ...options.initialValue
    };
    const [state, setState] = createStaticStore(fallback);
    const attachListeners = el => {
        makeMousePositionListener(el, setState, options);
        makeMouseInsideListener(el, setState.bind(void 0, "isInside"), options);
    };
    if (typeof target !== "function") attachListeners(target); else createEffect(() => attachListeners(target()));
    return state;
}

const useMousePosition = createHydratableSingletonRoot(createMousePosition.bind(void 0, void 0, void 0));

function addCustomStateToElement(element, state) {
    var _a;
    (_a = element.states) == null ? void 0 : _a.add(state);
}

function removeCustomStateFromElement(element, state) {
    var _a;
    (_a = element == null ? void 0 : element.states) == null ? void 0 : _a.remove(state);
}

function hasCustomState(element, state) {
    var _a;
    return (_a = element.states) == null ? void 0 : _a.has(state);
}

function createKeyboardEvent(key, keyCode, eventName = "keydown") {
    return new KeyboardEvent(eventName, {
        key: key,
        keyCode: keyCode,
        which: keyCode,
        ctrlKey: false,
        altKey: false,
        shiftKey: false,
        metaKey: false,
        bubbles: true
    });
}

let scrollTimeout;

const handleScroll = throttle(e => {
    const deltaY = e.deltaY;
    if (deltaY < 0) {
        document.body.dispatchEvent(createKeyboardEvent("ArrowUp", 38));
    } else if (deltaY > 0) {
        document.body.dispatchEvent(createKeyboardEvent("ArrowDown", 40));
    }
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        document.body.dispatchEvent(createKeyboardEvent("ArrowUp", 38, "keyup"));
        document.body.dispatchEvent(createKeyboardEvent("ArrowDown", 40, "keyup"));
    }, 250);
}, 250);

function findElementWithCustomState(myApp, x, y, customState) {
    const result = getChildrenByPosition(myApp, x, y).filter(el => hasCustomState(el, customState));
    if (result.length === 0) {
        return void 0;
    }
    let element = result[result.length - 1];
    while (element) {
        const elmParent = element.parent;
        if ((elmParent == null ? void 0 : elmParent.forwardStates) && hasCustomState(elmParent, customState)) {
            element = elmParent;
        } else {
            break;
        }
    }
    return element;
}

function findElementByActiveElement(e) {
    var _a;
    const active = activeElement();
    const precision = ((_a = Config.rendererOptions) == null ? void 0 : _a.deviceLogicalPixelRatio) || 1;
    if (active instanceof ElementNode && testCollision(e.clientX, e.clientY, (active.lng.absX || 0) * precision, (active.lng.absY || 0) * precision, (active.width || 0) * precision, (active.height || 0) * precision)) {
        return active;
    }
    let parent = active == null ? void 0 : active.parent;
    while (parent) {
        if (isFunc(parent.onMouseClick) && active && testCollision(e.clientX, e.clientY, (parent.lng.absX || 0) * precision, (parent.lng.absY || 0) * precision, (parent.width || 0) * precision, (parent.height || 0) * precision)) {
            return parent;
        }
        parent = parent.parent;
    }
    return null;
}

function applyPressedState(element, pressedState) {
    addCustomStateToElement(element, pressedState);
}

function handleElementClick(clickedElement, e, customStates, pressedElementRef) {
    if ((customStates == null ? void 0 : customStates.pressedState) && (pressedElementRef == null ? void 0 : pressedElementRef.current)) {
        removeCustomStateFromElement(pressedElementRef.current, customStates.pressedState);
        pressedElementRef.current = null;
    }
    if (isFunc(clickedElement.onMouseClick)) {
        clickedElement.onMouseClick(e, clickedElement);
        return;
    } else if (isFunc(clickedElement.onEnter)) {
        clickedElement.onEnter();
        return;
    }
    clickedElement.setFocus();
    setTimeout(() => {
        document.dispatchEvent(createKeyboardEvent("Enter", 13));
        setTimeout(() => document.body.dispatchEvent(createKeyboardEvent("Enter", 13, "keyup")), 1);
    }, 1);
}

function createHandleClick(myApp, customStates, pressedElementRef) {
    return e => {
        const clickedElement = customStates ? findElementWithCustomState(myApp, e.clientX, e.clientY, customStates.hoverState) : findElementByActiveElement(e);
        if (!clickedElement) {
            return;
        }
        handleElementClick(clickedElement, e, customStates, pressedElementRef);
    };
}

function createHandleMouseDown(myApp, customStates, pressedElementRef) {
    return e => {
        if (!customStates) {
            return;
        }
        const pressedElement = findElementWithCustomState(myApp, e.clientX, e.clientY, customStates.hoverState);
        if (!pressedElement) {
            return;
        }
        applyPressedState(pressedElement, customStates.pressedState);
        if (pressedElementRef) {
            pressedElementRef.current = pressedElement;
        }
    };
}

function testCollision(px, py, cx, cy, cw = 0, ch = 0) {
    return px >= cx && px <= cx + cw && py >= cy && py <= cy + ch;
}

function isNodeAtPosition(node, x, y, precision) {
    if (!isElementNode(node)) {
        return false;
    }
    return node.alpha !== 0 && !node.skipFocus && testCollision(x, y, (node.lng.absX || 0) * precision, (node.lng.absY || 0) * precision, (node.width || 0) * precision, (node.height || 0) * precision);
}

function findHighestZIndexNode(nodes) {
    var _a;
    if (nodes.length === 0) {
        return void 0;
    }
    if (nodes.length === 1) {
        return nodes[0];
    }
    let maxZIndex = -1;
    let highestNode = void 0;
    for (const node of nodes) {
        const zIndex = (_a = node.zIndex) != null ? _a : -1;
        if (zIndex >= maxZIndex) {
            maxZIndex = zIndex;
            highestNode = node;
        }
    }
    return highestNode;
}

function getChildrenByPosition(node, x, y) {
    var _a;
    const result = [];
    const precision = ((_a = Config.rendererOptions) == null ? void 0 : _a.deviceLogicalPixelRatio) || 1;
    let queue = [ node ];
    while (queue.length > 0) {
        const currentLevelNodes = queue.filter(currentNode => isNodeAtPosition(currentNode, x, y, precision));
        if (currentLevelNodes.length === 0) {
            break;
        }
        const highestZIndexNode = findHighestZIndexNode(currentLevelNodes);
        if (!highestZIndexNode || isTextNode(highestZIndexNode)) {
            break;
        }
        result.push(highestZIndexNode);
        queue = highestZIndexNode.children;
    }
    return result;
}

function useMouse(myApp = rootNode, throttleBy = 100, options) {
    const pos = useMousePosition();
    const scheduled = createScheduled(fn => throttle(fn, throttleBy));
    let previousElement = null;
    const pressedElementRef = {
        current: null
    };
    const customStates = options == null ? void 0 : options.customStates;
    const hoverState = customStates == null ? void 0 : customStates.hoverState;
    const handleClick = createHandleClick(myApp, customStates, pressedElementRef);
    const handleMouseDown = createHandleMouseDown(myApp, customStates, pressedElementRef);
    const owner = getOwner();
    const handleClickContext = e => {
        runWithOwner(owner, () => handleClick(e));
    };
    const handleMouseDownContext = e => {
        runWithOwner(owner, () => handleMouseDown(e));
    };
    makeEventListener(window, "wheel", handleScroll);
    makeEventListener(window, "click", handleClickContext);
    makeEventListener(window, "mousedown", handleMouseDownContext);
    createEffect(() => {
        if (scheduled()) {
            const result = getChildrenByPosition(myApp, pos.x, pos.y).filter(el => !!(el.onEnter || el.onMouseClick || el.onFocus || el[Config.focusStateKey] || el[hoverState]));
            if (result.length) {
                let activeElm = result[result.length - 1];
                while (activeElm) {
                    const elmParent = activeElm.parent;
                    if (elmParent == null ? void 0 : elmParent.forwardStates) {
                        activeElm = elmParent;
                    } else {
                        break;
                    }
                }
                if (!activeElm) {
                    return;
                }
                const activeElmParent = activeElm.parent;
                if ((activeElmParent == null ? void 0 : activeElmParent.selected) !== void 0) {
                    activeElmParent.selected = activeElmParent.children.indexOf(activeElm);
                }
                if (previousElement && previousElement !== activeElm && hoverState) {
                    removeCustomStateFromElement(previousElement, hoverState);
                }
                {
                    addCustomStateToElement(activeElm, hoverState);
                }
                previousElement = activeElm;
            } else if (previousElement && hoverState) {
                removeCustomStateFromElement(previousElement, hoverState);
                previousElement = null;
            }
        }
    });
}

function createLazy(component, props2, keyHandler) {
    const [offset, setOffset] = createSignal(props2.sync ? props2.upCount : 0);
    let timeoutId = null;
    let viewRef;
    let itemLength = 0;
    const buffer = createMemo(() => {
        var _a;
        if (typeof props2.buffer === "number") {
            return props2.buffer;
        }
        const scroll = props2.scroll || ((_a = props2.style) == null ? void 0 : _a.scroll);
        if (!scroll || scroll === "auto" || scroll === "always" || scroll === "bounded") return props2.upCount + 1;
        if (scroll === "center") return Math.ceil(props2.upCount / 2) + 1;
        return 2;
    });
    createRenderEffect(() => setOffset(offset2 => Math.max(offset2, (props2.selected || 0) + buffer())));
    if (!props2.sync || props2.eagerLoad) {
        createEffect(() => {
            if (props2.each) {
                const loadItems = () => {
                    let count2 = untrack(offset);
                    if (count2 < props2.upCount) {
                        setOffset(count2 + 1);
                        timeoutId = setTimeout(loadItems, 16);
                        count2++;
                    } else if (props2.eagerLoad) {
                        const maxOffset = props2.each ? props2.each.length : 0;
                        if (count2 >= maxOffset) return;
                        setOffset(prev => Math.min(prev + 1, maxOffset));
                        scheduleTask(loadItems);
                    }
                };
                loadItems();
            }
        });
    }
    const items = createMemo(() => {
        if (Array.isArray(props2.each)) {
            if (itemLength != props2.each.length) {
                itemLength = props2.each.length;
                if (viewRef && !viewRef.noRefocus && hasFocus(viewRef)) {
                    queueMicrotask(() => viewRef.setFocus());
                }
            }
            return props2.each.slice(0, offset());
        }
        itemLength = 0;
        return [];
    });
    function lazyScrollToIndex(index) {
        setOffset(Math.max(index, 0) + buffer());
        queueMicrotask(() => viewRef.scrollToIndex(index));
    }
    const updateOffset = (_event, container) => {
        var _a;
        const maxOffset = props2.each ? props2.each.length : 0;
        const selected = container.selected || 0;
        const numChildren = container.children.length;
        if (offset() >= maxOffset || selected < numChildren - buffer()) return;
        if (!props2.delay) {
            setOffset(prev => Math.min(prev + 1, maxOffset));
            return;
        }
        if (timeoutId) {
            clearTimeout(timeoutId);
            setOffset(prev => Math.min(prev + 1, maxOffset));
        }
        timeoutId = setTimeout(() => {
            setOffset(prev => Math.min(prev + 1, maxOffset));
            timeoutId = null;
        }, (_a = props2.delay) != null ? _a : 0);
    };
    const handler = keyHandler(updateOffset);
    return createComponent(Dynamic, mergeProps(props2, {
        component: component
    }, handler, {
        lazyScrollToIndex: lazyScrollToIndex,
        ref(r$) {
            var _ref$ = chainRefs(el => {
                viewRef = el;
            }, props2.ref);
            typeof _ref$ === "function" && _ref$(r$);
        },
        get children() {
            return createComponent(Index, {
                get each() {
                    return items();
                },
                get children() {
                    return props2.children;
                }
            });
        }
    }));
}

function LazyRow(props2) {
    return createLazy(Row, props2, updateOffset => ({
        onRight: updateOffset
    }));
}

function LazyColumn(props2) {
    return createLazy(Column, props2, updateOffset => ({
        onDown: updateOffset
    }));
}

function lazy(fn) {
    let comp;
    let p;
    const wrap = props2 => {
        const ctx = sharedConfig.context;
        if (ctx) {
            const [s, set] = createSignal();
            sharedConfig.count || (sharedConfig.count = 0);
            sharedConfig.count++;
            (p || (p = fn())).then(mod2 => {
                !sharedConfig.done && (sharedConfig.context = ctx);
                sharedConfig.count--;
                set(() => mod2.default);
                sharedConfig.context = void 0;
            });
            comp = s;
        } else if (!comp) {
            const [s] = createResource(() => (p || (p = fn())).then(mod2 => mod2.default));
            comp = s;
        }
        let Comp;
        return createMemo(() => (Comp = comp()) ? untrack(() => {
            if (!ctx || sharedConfig.done) return Comp(props2);
            const c = sharedConfig.context;
            sharedConfig.context = ctx;
            const r = Comp(props2);
            sharedConfig.context = c;
            return r;
        }) : null);
    };
    wrap.preload = () => p || ((p = fn()).then(mod2 => comp = () => mod2.default), p);
    return wrap;
}

const Image$1 = props2 => {
    const [texture, setTexture] = createSignal(null);
    const [src, setSrc] = createSignal(props2.placeholder || null);
    createRenderEffect(() => {
        const srcTexture = renderer$2.createTexture("ImageTexture", props2);
        if (props2.fallback) {
            srcTexture.once("failed", () => {
                if (props2.fallback === props2.placeholder) {
                    return;
                }
                setSrc(props2.fallback);
            });
        }
        srcTexture.getTextureData().then(resp => {
            if (resp.data) setTexture(srcTexture);
        });
    });
    return (() => {
        var _el$ = createElement("view");
        spread(_el$, mergeProps(props2, {
            get src() {
                return src();
            },
            get color() {
                return props2.color || 4294967295;
            },
            get texture() {
                return texture();
            }
        }), false);
        return _el$;
    })();
};

function createBeforeLeave() {
    let listeners = new Set;
    function subscribe(listener) {
        listeners.add(listener);
        return () => listeners.delete(listener);
    }
    let ignore = false;
    function confirm(to, options) {
        if (ignore) return !(ignore = false);
        const e = {
            to: to,
            options: options,
            defaultPrevented: false,
            preventDefault: () => e.defaultPrevented = true
        };
        for (const l of listeners) l.listener({
            ...e,
            from: l.location,
            retry: force => {
                force && (ignore = true);
                l.navigate(to, {
                    ...options,
                    resolve: false
                });
            }
        });
        return !e.defaultPrevented;
    }
    return {
        subscribe: subscribe,
        confirm: confirm
    };
}

let depth;

function saveCurrentDepth() {
    if (!window.history.state || window.history.state._depth == null) {
        window.history.replaceState({
            ...window.history.state,
            _depth: window.history.length - 1
        }, "");
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
    url.searchParams.forEach((value, key) => {
        if (key in params2) {
            if (Array.isArray(params2[key])) params2[key].push(value); else params2[key] = [ params2[key], value ];
        } else params2[key] = value;
    });
    return params2;
}

function createMatcher(path, partial, matchFilters) {
    const [pattern, splat] = path.split("/*", 2);
    const segments = pattern.split("/").filter(Boolean);
    const len = segments.length;
    return location => {
        const locSegments = location.split("/").filter(Boolean);
        const lenDiff = locSegments.length - len;
        if (lenDiff < 0 || lenDiff > 0 && splat === void 0 && !partial) {
            return null;
        }
        const match = {
            path: len ? "" : "/",
            params: {}
        };
        const matchFilter = s => matchFilters === void 0 ? void 0 : matchFilters[s];
        for (let i = 0; i < len; i++) {
            const segment = segments[i];
            const dynamic = segment[0] === ":";
            const locSegment = dynamic ? locSegments[i] : locSegments[i].toLowerCase();
            const key = dynamic ? segment.slice(1) : segment.toLowerCase();
            if (dynamic && matchSegment(locSegment, matchFilter(key))) {
                match.params[key] = locSegment;
            } else if (dynamic || !matchSegment(locSegment, key)) {
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
    const isEqual = s => s === input;
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
    const map = new Map;
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
    if (!match) return [ pattern ];
    let prefix = pattern.slice(0, match.index);
    let suffix = pattern.slice(match.index + match[0].length);
    const prefixes = [ prefix, prefix += match[1] ];
    while (match = /^(\/\:[^\/]+)\?/.exec(suffix)) {
        prefixes.push(prefix += match[1]);
        suffix = suffix.slice(match[0].length);
    }
    return expandOptionals(suffix).reduce((results, expansion) => [ ...results, ...prefixes.map(p => p + expansion) ], []);
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
    const matchers = createMemo(() => expandOptionals(path()).map(path2 => createMatcher(path2, void 0, matchFilters)));
    return createMemo(() => {
        for (const matcher of matchers()) {
            const match = matcher(location.pathname);
            if (match) return match;
        }
    });
};

const useParams = () => useRouter().params;

function createRoutes(routeDef, base = "") {
    const {component: component, preload: preload2, load: load, children: children2, info: info} = routeDef;
    const isLeaf = !children2 || Array.isArray(children2) && !children2.length;
    const shared = {
        key: routeDef,
        component: component,
        preload: preload2 || load,
        info: info
    };
    return asArray(routeDef.path).reduce((acc, originalPath) => {
        for (const expandedPath of expandOptionals(originalPath)) {
            const path = joinPaths(base, expandedPath);
            let pattern = isLeaf ? path : path.split("/*", 1)[0];
            pattern = pattern.split("/").map(s => s.startsWith(":") || s.startsWith("*") ? s : encodeURIComponent(s)).join("/");
            acc.push({
                ...shared,
                originalPath: originalPath,
                pattern: pattern,
                matcher: createMatcher(pattern, !isLeaf, routeDef.matchFilters)
            });
        }
        return acc;
    }, []);
}

function createBranch(routes, index = 0) {
    return {
        routes: routes,
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
                    route: route
                });
            }
            return matches;
        }
    };
}

function asArray(value) {
    return Array.isArray(value) ? value : [ value ];
}

function createBranches(routeDef, base = "", stack = [], branches = []) {
    const routeDefs = asArray(routeDef);
    for (let i = 0, len = routeDefs.length; i < len; i++) {
        const def = routeDefs[i];
        if (def && typeof def === "object") {
            if (!def.hasOwnProperty("path")) def.path = "";
            const routes = createRoutes(def, base);
            for (const route of routes) {
                stack.push(route);
                const isEmptyArray = Array.isArray(def.children) && def.children.length === 0;
                if (def.children && !isEmptyArray) {
                    createBranches(def.children, route.pattern, stack, branches);
                } else {
                    const branch = createBranch([ ...stack ], branches.length);
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
    const url = createMemo(prev => {
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
    const key = () => "";
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
            return key();
        },
        query: queryWrapper ? queryWrapper(queryFn) : createMemoObject(queryFn)
    };
}

let intent;

function getIntent() {
    return intent;
}

function setInPreloadFn(value) {}

function createRouterContext(integration, branches, getContext, options = {}) {
    const {signal: [source, setSource], utils: utils = {}} = integration;
    const parsePath = utils.parsePath || (p => p);
    const renderPath = utils.renderPath || (p => p);
    const beforeLeave = utils.beforeLeave || createBeforeLeave();
    const basePath2 = resolvePath("", options.base || "");
    if (basePath2 === void 0) {
        throw new Error("".concat(basePath2, " is not a valid base path"));
    } else if (basePath2 && !source().value) {
        setSource({
            value: basePath2,
            replace: true,
            scroll: false
        });
    }
    const [isRouting, setIsRouting] = createSignal(false);
    let lastTransitionTarget;
    const transition = (newIntent, newTarget) => {
        if (newTarget.value === reference() && newTarget.state === state()) return;
        if (lastTransitionTarget === void 0) setIsRouting(true);
        intent = newIntent;
        lastTransitionTarget = newTarget;
        startTransition(() => {
            if (lastTransitionTarget !== newTarget) return;
            setReference(lastTransitionTarget.value);
            setState(lastTransitionTarget.state);
            submissions[1](subs => subs.filter(s => s.pending));
        }).finally(() => {
            if (lastTransitionTarget !== newTarget) return;
            batch(() => {
                intent = void 0;
                if (newIntent === "navigate") navigateEnd(lastTransitionTarget);
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
    createRenderEffect(on(source, source2 => transition("native", source2), {
        defer: true
    }));
    return {
        base: baseRoute,
        location: location,
        params: params2,
        isRouting: isRouting,
        renderPath: renderPath,
        parsePath: parsePath,
        navigatorFactory: navigatorFactory,
        matches: matches,
        beforeLeave: beforeLeave,
        preloadRoute: preloadRoute,
        singleFlight: options.singleFlight === void 0 ? true : options.singleFlight,
        submissions: submissions
    };
    function navigateFromRoute(route, to, options2) {
        untrack(() => {
            if (typeof to === "number") {
                if (!to) {} else if (utils.go) {
                    utils.go(to);
                } else {
                    console.warn("Router integration does not support relative routing");
                }
                return;
            }
            const queryOnly = !to || to[0] === "?";
            const {replace: replace, resolve: resolve, scroll: scroll, state: nextState} = {
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
                if (isServer) ; else if (beforeLeave.confirm(resolvedTo, options2)) {
                    referrers.push({
                        value: current,
                        replace: replace,
                        scroll: scroll,
                        state: state()
                    });
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
            const {route: route, params: params3} = matches2[match];
            route.component && route.component.preload && route.component.preload();
            const {preload: preload2} = route;
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
    const {base: base, location: location, params: params2} = router;
    const {pattern: pattern, component: component, preload: preload2} = match().route;
    const path = createMemo(() => match().path);
    component && component.preload && component.preload();
    const data = preload2 ? preload2({
        params: params2,
        location: location,
        intent: intent || "initial"
    }) : void 0;
    const route = {
        parent: parent,
        pattern: pattern,
        path: path,
        outlet: () => component ? createComponent$1(component, {
            params: params2,
            location: location,
            data: data,
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

const createRouterComponent = router => props2 => {
    const {base: base} = props2;
    const routeDefs = children(() => props2.children);
    const branches = createMemo(() => createBranches(routeDefs(), props2.base || ""));
    let context2;
    const routerState = createRouterContext(router, branches, () => context2, {
        base: base,
        singleFlight: props2.singleFlight,
        transformUrl: props2.transformUrl
    });
    router.create && router.create(routerState);
    return createComponent(RouterContextObj.Provider, {
        value: routerState,
        get children() {
            return createComponent(Root, {
                routerState: routerState,
                get root() {
                    return props2.root;
                },
                get preload() {
                    return props2.rootPreload || props2.rootLoad;
                },
                get children() {
                    return [ memo(() => (context2 = getOwner()) && null), createComponent(Routes, {
                        routerState: routerState,
                        get branches() {
                            return branches();
                        }
                    }) ];
                }
            });
        }
    });
};

function Root(props2) {
    const location = props2.routerState.location;
    const params2 = props2.routerState.params;
    const data = createMemo(() => props2.preload && untrack(() => {
        setInPreloadFn(true);
        props2.preload({
            params: params2,
            location: location,
            intent: getIntent() || "initial"
        });
        setInPreloadFn(false);
    }));
    return createComponent(Show, {
        get when() {
            return props2.root;
        },
        keyed: true,
        get fallback() {
            return props2.children;
        },
        children: Root2 => createComponent(Root2, {
            params: params2,
            location: location,
            get data() {
                return data();
            },
            get children() {
                return props2.children;
            }
        })
    });
}

function Routes(props2) {
    const disposers = [];
    let root;
    const routeStates = createMemo(on(props2.routerState.matches, (nextMatches, prevMatches, prev) => {
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
                createRoot(dispose2 => {
                    disposers[i] = dispose2;
                    next[i] = createRouteContext(props2.routerState, next[i - 1] || props2.routerState.base, createOutlet(() => routeStates()[i + 1]), () => props2.routerState.matches()[i]);
                });
            }
        }
        disposers.splice(nextMatches.length).forEach(dispose2 => dispose2());
        if (prev && equal) {
            return prev;
        }
        root = next[0];
        return next;
    }));
    return createOutlet(() => routeStates() && root)();
}

const createOutlet = child => () => createComponent(Show, {
    get when() {
        return child();
    },
    keyed: true,
    children: child2 => createComponent(RouteContextObj.Provider, {
        value: child2,
        get children() {
            return child2.outlet();
        }
    })
});

const Route = props2 => {
    const childRoutes = children(() => props2.children);
    return mergeProps$1(props2, {
        get children() {
            return childRoutes();
        }
    });
};

function intercept([value, setValue], get2, set) {
    return [ value, set ? v => setValue(set(v)) : setValue ];
}

function createRouter(config) {
    let ignore = false;
    const wrap = value => typeof value === "string" ? {
        value: value
    } : value;
    const signal = intercept(createSignal(wrap(config.get()), {
        equals: (a, b) => a.value === b.value && a.state === b.state
    }), void 0, next => {
        !ignore && config.set(next);
        if (sharedConfig.registry && !sharedConfig.done) sharedConfig.done = true;
        return next;
    });
    config.init && onCleanup(config.init((value = config.get()) => {
        ignore = true;
        signal[1](wrap(value));
        ignore = false;
    }));
    return createRouterComponent({
        signal: signal,
        create: config.create,
        utils: config.utils
    });
}

function Navigate(props2) {
    const navigate = useNavigate();
    const location = useLocation();
    const {href: href, state: state} = props2;
    const path = typeof href === "function" ? href({
        navigate: navigate,
        location: location
    }) : href;
    navigate(path, {
        replace: true,
        state: state
    });
    return null;
}

function hashParser(str) {
    const to = str.replace(/^.*?#/, "");
    if (!to.startsWith("/")) {
        const [, path = "/"] = window.location.hash.split("#", 2);
        return "".concat(path, "#").concat(to);
    }
    return to;
}

function bindEvent(target, type2, handler) {
    target.addEventListener(type2, handler);
    return () => target.removeEventListener(type2, handler);
}

function HashRouter(props2) {
    const getSource = () => window.location.hash.slice(1);
    const beforeLeave = createBeforeLeave();
    return createRouter({
        get: getSource,
        set({value: value, replace: replace, state: state}) {
            if (replace) {
                window.history.replaceState(keepDepth(state), "", "#" + value);
            } else {
                window.history.pushState(state, "", "#" + value);
            }
            saveCurrentDepth();
        },
        init: notify => bindEvent(window, "hashchange", notifyIfNotBlocked(notify, delta => !beforeLeave.confirm(delta && delta < 0 ? delta : getSource()))),
        utils: {
            go: delta => window.history.go(delta),
            renderPath: path => "#".concat(path),
            parsePath: hashParser,
            beforeLeave: beforeLeave,
            queryWrapper: props2.forceProxy || !SUPPORTS_PROXY ? getQuery => createMemoWithoutProxy(getQuery, props2.queryParams) : void 0,
            paramsWrapper: props2.forceProxy || !SUPPORTS_PROXY ? (buildParams, branches) => createMemoWithoutProxy(buildParams, collectDynamicParams(branches())) : void 0
        }
    })(props2);
}

const SUPPORTS_PROXY = typeof Proxy === "function";

function createMemoWithoutProxy(fn, allKeys) {
    const map = new Map;
    const owner = getOwner();
    const target = {};
    const handler = property => {
        if (!map.has(property)) {
            runWithOwner(owner, () => map.set(property, createMemo(() => fn()[property])));
        }
        return map.get(property)();
    };
    const keys = allKeys ? allKeys : Object.keys(fn());
    keys.forEach(key => {
        Object.defineProperty(target, key, {
            get: () => handler(key),
            enumerable: true,
            configurable: true
        });
    });
    return target;
}

const collectDynamicParams = branches => {
    const dynamicParams = [];
    branches.forEach(branch => {
        branch.routes.forEach(route => {
            if (route.pattern) {
                const matches = route.pattern.match(/:(\w+)/g);
                if (matches) {
                    matches.forEach(param => {
                        const p = param.slice(1);
                        if (!dynamicParams.includes(p)) dynamicParams.push(p);
                    });
                }
            }
        });
    });
    return dynamicParams;
};

const defaultTransitionBack = {
    x: {
        duration: 180,
        easing: "cubic-bezier(0.4, 0, 0.2, 1)"
    }
};

const defaultTransitionForward = {
    x: {
        duration: 180,
        easing: "cubic-bezier(0.2, 0, 0, 1)"
    }
};

const defaultTransitionDown = {
    y: {
        duration: 300,
        easing: "cubic-bezier(0.2, 1, 0.8, 1)"
    }
};

const defaultTransitionUp = {
    y: {
        duration: 300,
        easing: "cubic-bezier(0.3, 0, 0.2, 1)"
    }
};

function idxInArray(idx, arr) {
    return idx >= 0 && idx < arr.length;
}

function findFirstFocusableChildIdx(el, from = 0, delta = 1) {
    var _a;
    for (let i = from; ;i += delta) {
        if (!idxInArray(i, el.children)) {
            if (el.wrap) {
                i = (i + el.children.length) % el.children.length;
            } else break;
        }
        if (!((_a = el.children[i]) == null ? void 0 : _a.skipFocus)) {
            return i;
        }
    }
    return -1;
}

function selectChild(el, index) {
    var _a;
    const child = el.children[index];
    if (child == null || child.skipFocus) {
        el.selected = -1;
        return false;
    }
    const lastSelected = el.selected;
    el.selected = index;
    if (!isFocused(child)) {
        child.setFocus();
    }
    (_a = el.onSelectedChanged) == null ? void 0 : _a.call(el, index, el, child, lastSelected);
    return true;
}

const navigableForwardFocus = function() {
    const navigable = this;
    let selected = Math.max(navigable.selected, 0);
    if (this.children.length === 0) {
        return false;
    }
    if (selected !== 0) {
        selected = clamp(selected, 0, Math.max(0, this.children.length - 1));
        while (!idxInArray(selected, this.children)) {
            selected--;
        }
    }
    selected = findFirstFocusableChildIdx(navigable, selected);
    navigable.selected = selected;
    return selectChild(navigable, selected);
};

function handleNavigation(direction) {
    return function() {
        const el = this;
        const transition = direction === "up" ? el.transitionUp : direction === "down" ? el.transitionDown : direction === "left" ? el.transitionLeft : direction === "right" ? el.transitionRight : void 0;
        if (transition) {
            const currentTransition = typeof el.transition === "object" && el.transition !== null ? el.transition : {};
            el.transition = {
                ...currentTransition,
                ...transition
            };
        }
        return moveSelection(this, direction === "up" || direction === "left" ? -1 : 1);
    };
}

const navigableHandleNavigation = function(e) {
    return moveSelection(this, e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 1);
};

function moveSelection(el, delta) {
    var _a;
    let selected = findFirstFocusableChildIdx(el, el.selected + delta, delta);
    if (selected === -1) {
        if (!idxInArray(el.selected, el.children) || ((_a = el.children[el.selected]) == null ? void 0 : _a.skipFocus) || isFocused(el.children[el.selected])) {
            return false;
        }
        selected = el.selected;
    }
    const active = el.children[selected];
    if (el.plinko) {
        const lastSelectedChild = el.children[el.selected];
        const num = lastSelectedChild.selected || 0;
        active.selected = num < active.children.length ? num : active.children.length - 1;
    }
    return selectChild(el, selected);
}

const InViewPort = 8;

const isNotShown = node => node.lng.renderState !== InViewPort;

function withScrolling(isRow) {
    const dimension = isRow ? "width" : "height";
    const axis = isRow ? "x" : "y";
    return (selected, component, selectedElement, lastSelected) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m;
        let componentRef = component;
        if (typeof selected !== "number") {
            componentRef = selected;
            selected = componentRef.selected || 0;
        }
        if (!componentRef || componentRef.scroll === "none" || selected === lastSelected || !componentRef.children.length) return;
        if (componentRef._initialPosition === void 0) {
            componentRef._initialPosition = componentRef[axis];
        }
        const lng = componentRef.lng;
        const screenSize2 = isRow ? lng.stage.root.w : lng.stage.root.h;
        const isIncrementing = lastSelected === void 0 || lastSelected - 1 !== selected;
        if (componentRef._screenOffset === void 0) {
            if (componentRef.parent.clipping) {
                const p = componentRef.parent;
                componentRef.endOffset = (_a = componentRef.endOffset) != null ? _a : screenSize2 - ((isRow ? p.absX : p.absY) || 0) - p[dimension];
            }
            componentRef._screenOffset = (_b = componentRef.offset) != null ? _b : (isRow ? lng.absX : lng.absY) - componentRef[axis];
        }
        const screenOffset = componentRef._screenOffset;
        const gap = componentRef.gap || 0;
        const scroll = componentRef.scroll || (lastSelected === void 0 ? componentRef.scrollIndex ? "center" : "always" : "auto");
        const targetPosition = (_c = componentRef._targetPosition) != null ? _c : componentRef[axis];
        const rootPosition = isIncrementing ? Math.min(targetPosition, componentRef[axis]) : Math.max(targetPosition, componentRef[axis]);
        componentRef.offset = (_d = componentRef.offset) != null ? _d : rootPosition;
        const offset = componentRef.offset;
        selectedElement = selectedElement || componentRef.children[selected];
        if (!selectedElement) {
            return;
        }
        const selectedPosition = (_e = selectedElement[axis]) != null ? _e : 0;
        const selectedSize = (_f = selectedElement[dimension]) != null ? _f : 0;
        const selectedScale = (_j = (_i = selectedElement.scale) != null ? _i : (_h = (_g = selectedElement.style) == null ? void 0 : _g.focus) == null ? void 0 : _h.scale) != null ? _j : 1;
        const selectedSizeScaled = selectedSize * selectedScale;
        const containerSize = (_k = componentRef[dimension]) != null ? _k : 0;
        const maxOffset = Math.min(screenSize2 - containerSize - screenOffset - ((_l = componentRef.endOffset) != null ? _l : 2 * gap), offset);
        const nextIndex = isIncrementing ? selected + 1 : selected - 1;
        const nextElement = componentRef.children[nextIndex] || null;
        let nextPosition = rootPosition;
        if (selectedElement.centerScroll) {
            nextPosition = -selectedPosition + (screenSize2 - selectedSizeScaled) / 2;
        } else if (scroll === "always") {
            nextPosition = -selectedPosition + offset;
        } else if (scroll === "bounded") {
            const totalItems = componentRef.children.length;
            const upCount = componentRef.upCount || 6;
            const nonScrollableZoneStart = Math.max(0, totalItems - upCount);
            const isInNonScrollableZone = selected >= nonScrollableZoneStart;
            const isFirstOfNonScrollableZone = selected === nonScrollableZoneStart;
            const isEnteringZone = isFirstOfNonScrollableZone && lastSelected !== void 0 && lastSelected < nonScrollableZoneStart;
            if (!isInNonScrollableZone) {
                nextPosition = -selectedPosition + offset;
            } else if (isIncrementing) {
                if (isEnteringZone) {
                    const firstOfZoneElement = componentRef.children[nonScrollableZoneStart];
                    const firstOfZonePosition = (_m = firstOfZoneElement == null ? void 0 : firstOfZoneElement[axis]) != null ? _m : 0;
                    nextPosition = firstOfZoneElement ? -firstOfZonePosition + offset : rootPosition;
                } else {
                    nextPosition = rootPosition;
                }
            } else if (isFirstOfNonScrollableZone) {
                nextPosition = -selectedPosition + offset;
            } else {
                nextPosition = rootPosition;
            }
        } else if (scroll === "center") {
            const centerPosition = -selectedPosition + (screenSize2 - selectedSizeScaled) / 2 - screenOffset;
            nextPosition = Math.min(Math.max(centerPosition, maxOffset), offset);
        } else if (!nextElement) {
            nextPosition = isIncrementing ? maxOffset : offset;
        } else if (scroll === "auto") {
            if (componentRef.scrollIndex && componentRef.scrollIndex > 0) {
                const totalItems = componentRef.children.length;
                const nearEndIndex = totalItems - componentRef.scrollIndex;
                if (isIncrementing && componentRef.selected >= componentRef.scrollIndex) {
                    nextPosition = rootPosition - selectedSize - gap;
                } else if (!isIncrementing && componentRef.selected < nearEndIndex) {
                    nextPosition = rootPosition + selectedSize + gap;
                }
            } else if (isIncrementing) {
                nextPosition = rootPosition - selectedSize - gap;
            } else {
                nextPosition = rootPosition + selectedSize + gap;
            }
        } else if (isIncrementing && isNotShown(nextElement)) {
            nextPosition = rootPosition - selectedSize - gap;
        } else if (isNotShown(nextElement)) {
            nextPosition = -selectedPosition + offset;
        }
        nextPosition = isIncrementing && scroll !== "always" && scroll !== "bounded" ? Math.max(nextPosition, maxOffset) : Math.min(nextPosition, offset);
        if (componentRef[axis] !== nextPosition) {
            if (componentRef.onScrolled) {
                const isInitial = nextPosition === componentRef._initialPosition;
                componentRef.onScrolled(componentRef, nextPosition, isInitial);
            }
            componentRef[axis] = nextPosition;
            componentRef._targetPosition = nextPosition;
        }
    };
}

const scrollRow = withScrolling(true);

const scrollColumn = withScrolling(false);

function chainFunctions(...fns) {
    const onlyFunctions = fns.filter(func => typeof func === "function");
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

const chainRefs = chainFunctions;

const ColumnStyles = {
    display: "flex",
    flexDirection: "column",
    gap: 30
};

function scrollToIndex$1(index) {
    var _a;
    this.selected = index;
    scrollColumn(index, this);
    (_a = this.children[index]) == null ? void 0 : _a.setFocus();
}

const onUp = handleNavigation("up");

const onDown = handleNavigation("down");

const Column = props2 => (() => {
    var _el$ = createElement("view");
    setProp(_el$, "transitionUp", defaultTransitionUp);
    setProp(_el$, "transitionDown", defaultTransitionDown);
    setProp(_el$, "transition", {});
    spread(_el$, mergeProps(props2, {
        onUp: chainFunctions(props2.onUp, onUp),
        onDown: chainFunctions(props2.onDown, onDown),
        get selected() {
            return props2.selected || 0;
        },
        scrollToIndex: scrollToIndex$1,
        forwardFocus: navigableForwardFocus,
        onLayout: props2.selected ? chainFunctions(props2.onLayout, scrollColumn) : props2.onLayout,
        onSelectedChanged: chainFunctions(props2.onSelectedChanged, props2.scroll !== "none" ? scrollColumn : void 0),
        style: combineStyles(props2.style, ColumnStyles)
    }), false);
    return _el$;
})();

const RowStyles = {
    display: "flex",
    gap: 30
};

function scrollToIndex(index) {
    var _a;
    this.selected = index;
    scrollRow(index, this);
    (_a = this.children[index]) == null ? void 0 : _a.setFocus();
}

const onLeft = handleNavigation("left");

const onRight = handleNavigation("right");

const Row = props2 => (() => {
    var _el$ = createElement("view");
    setProp(_el$, "transitionLeft", defaultTransitionBack);
    setProp(_el$, "transitionRight", defaultTransitionForward);
    setProp(_el$, "transition", {});
    spread(_el$, mergeProps(props2, {
        get selected() {
            return props2.selected || 0;
        },
        onLeft: chainFunctions(props2.onLeft, onLeft),
        onRight: chainFunctions(props2.onRight, onRight),
        forwardFocus: navigableForwardFocus,
        scrollToIndex: scrollToIndex,
        onLayout: props2.selected ? chainFunctions(props2.onLayout, scrollRow) : props2.onLayout,
        onSelectedChanged: chainFunctions(props2.onSelectedChanged, props2.scroll !== "none" ? scrollRow : void 0),
        style: combineStyles(props2.style, RowStyles)
    }), false);
    return _el$;
})();

const fpsStyle = {
    color: 255,
    height: 192,
    width: 330,
    x: 1900,
    y: 6,
    mountX: 1,
    alpha: 1,
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

const [quads, setQuads] = createSignal(0);

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

const calcFps = fps2 => {
    if (!fps2) return;
    setFps(fps2);
    setMinFps(prev => Math.min(fps2, prev));
    setMaxFps(prev => Math.max(fps2, prev));
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
    root.renderer.on("quadsUpdate", (target, quadsData) => {
        setQuads(quadsData.quads);
    });
}

const FPSCounter = props2 => (() => {
    var _el$ = createElement("view"), _el$2 = createElement("view"), _el$3 = createElement("text"), _el$5 = createElement("text"), _el$6 = createElement("view"), _el$7 = createElement("text"), _el$9 = createElement("text"), _el$0 = createElement("view"), _el$1 = createElement("text"), _el$11 = createElement("text"), _el$12 = createElement("view"), _el$13 = createElement("text"), _el$15 = createElement("text"), _el$16 = createElement("view"), _el$17 = createElement("view"), _el$18 = createElement("text"), _el$20 = createElement("text"), _el$21 = createElement("view"), _el$22 = createElement("text"), _el$24 = createElement("text"), _el$25 = createElement("view"), _el$26 = createElement("text"), _el$28 = createElement("text"), _el$29 = createElement("view"), _el$30 = createElement("text"), _el$32 = createElement("text"), _el$33 = createElement("view"), _el$34 = createElement("text"), _el$36 = createElement("text"), _el$37 = createElement("view"), _el$38 = createElement("text"), _el$40 = createElement("text"), _el$41 = createElement("view"), _el$42 = createElement("text"), _el$44 = createElement("text");
    insertNode(_el$, _el$2);
    insertNode(_el$, _el$6);
    insertNode(_el$, _el$0);
    insertNode(_el$, _el$12);
    insertNode(_el$, _el$16);
    spread(_el$, mergeProps(props2, {
        style: fpsStyle
    }), true);
    insertNode(_el$2, _el$3);
    insertNode(_el$2, _el$5);
    setProp(_el$2, "y", 6);
    insertNode(_el$3, createTextNode("FPS:"));
    setProp(_el$3, "style", fpsLabel);
    setProp(_el$5, "style", fpsValue);
    setProp(_el$5, "x", 90);
    insert(_el$5, () => fps().toString());
    insertNode(_el$6, _el$7);
    insertNode(_el$6, _el$9);
    setProp(_el$6, "y", 6);
    setProp(_el$6, "x", 160);
    insertNode(_el$7, createTextNode("AVG:"));
    setProp(_el$7, "style", fpsLabel);
    setProp(_el$9, "style", fpsValue);
    setProp(_el$9, "x", 100);
    insert(_el$9, () => avgFps().toString());
    insertNode(_el$0, _el$1);
    insertNode(_el$0, _el$11);
    setProp(_el$0, "x", 0);
    setProp(_el$0, "y", 26);
    insertNode(_el$1, createTextNode("MIN:"));
    setProp(_el$1, "style", fpsLabel);
    setProp(_el$11, "style", fpsValue);
    setProp(_el$11, "x", 90);
    insert(_el$11, () => minFps().toString());
    insertNode(_el$12, _el$13);
    insertNode(_el$12, _el$15);
    setProp(_el$12, "x", 160);
    setProp(_el$12, "y", 26);
    insertNode(_el$13, createTextNode("MAX:"));
    setProp(_el$13, "style", fpsLabel);
    setProp(_el$15, "style", fpsValue);
    setProp(_el$15, "x", 100);
    insert(_el$15, () => maxFps().toString());
    insertNode(_el$16, _el$17);
    insertNode(_el$16, _el$21);
    insertNode(_el$16, _el$25);
    insertNode(_el$16, _el$29);
    insertNode(_el$16, _el$33);
    insertNode(_el$16, _el$37);
    insertNode(_el$16, _el$41);
    setProp(_el$16, "display", "flex");
    setProp(_el$16, "flexDirection", "column");
    setProp(_el$16, "y", 58);
    setProp(_el$16, "gap", 4);
    insertNode(_el$17, _el$18);
    insertNode(_el$17, _el$20);
    setProp(_el$17, "height", infoFontSize);
    insertNode(_el$18, createTextNode("criticalThreshold:"));
    setProp(_el$18, "fontSize", infoFontSize);
    setProp(_el$18, "style", fpsLabel);
    setProp(_el$20, "fontSize", infoFontSize);
    setProp(_el$20, "style", fpsLabel);
    setProp(_el$20, "x", 230);
    insert(_el$20, criticalThresholdSignal);
    insertNode(_el$21, _el$22);
    insertNode(_el$21, _el$24);
    setProp(_el$21, "height", infoFontSize);
    insertNode(_el$22, createTextNode("targetThreshold:"));
    setProp(_el$22, "fontSize", infoFontSize);
    setProp(_el$22, "style", fpsLabel);
    setProp(_el$24, "fontSize", infoFontSize);
    setProp(_el$24, "style", fpsLabel);
    setProp(_el$24, "x", 230);
    insert(_el$24, targetThresholdSignal);
    insertNode(_el$25, _el$26);
    insertNode(_el$25, _el$28);
    setProp(_el$25, "height", infoFontSize);
    insertNode(_el$26, createTextNode("renderableMemUsed:"));
    setProp(_el$26, "fontSize", infoFontSize);
    setProp(_el$26, "style", fpsLabel);
    setProp(_el$28, "fontSize", infoFontSize);
    setProp(_el$28, "style", fpsLabel);
    setProp(_el$28, "x", 230);
    insert(_el$28, renderableMemUsedSignal);
    insertNode(_el$29, _el$30);
    insertNode(_el$29, _el$32);
    setProp(_el$29, "height", infoFontSize);
    insertNode(_el$30, createTextNode("memUsed:"));
    setProp(_el$30, "fontSize", infoFontSize);
    setProp(_el$30, "style", fpsLabel);
    setProp(_el$32, "fontSize", infoFontSize);
    setProp(_el$32, "style", fpsLabel);
    setProp(_el$32, "x", 230);
    insert(_el$32, memUsedSignal);
    insertNode(_el$33, _el$34);
    insertNode(_el$33, _el$36);
    setProp(_el$33, "height", infoFontSize);
    insertNode(_el$34, createTextNode("renderableTexturesLoaded:"));
    setProp(_el$34, "fontSize", infoFontSize);
    setProp(_el$34, "style", fpsLabel);
    setProp(_el$36, "fontSize", infoFontSize);
    setProp(_el$36, "style", fpsLabel);
    setProp(_el$36, "x", 230);
    insert(_el$36, () => renderableTexturesLoadedSignal().toString());
    insertNode(_el$37, _el$38);
    insertNode(_el$37, _el$40);
    setProp(_el$37, "height", infoFontSize);
    insertNode(_el$38, createTextNode("loadedTextures:"));
    setProp(_el$38, "fontSize", infoFontSize);
    setProp(_el$38, "style", fpsLabel);
    setProp(_el$40, "fontSize", infoFontSize);
    setProp(_el$40, "style", fpsLabel);
    setProp(_el$40, "x", 230);
    insert(_el$40, () => loadedTexturesSignal().toString());
    insertNode(_el$41, _el$42);
    insertNode(_el$41, _el$44);
    setProp(_el$41, "height", infoFontSize);
    insertNode(_el$42, createTextNode("quads:"));
    setProp(_el$42, "fontSize", infoFontSize);
    setProp(_el$42, "style", fpsLabel);
    setProp(_el$44, "fontSize", infoFontSize);
    setProp(_el$44, "style", fpsLabel);
    setProp(_el$44, "x", 230);
    insert(_el$44, () => quads().toString());
    return _el$;
})();

const SAFETY_MARGIN = 10;

function MarqueeText(props2) {
    const speed = createMemo(() => props2.speed || 200);
    const delay2 = createMemo(() => {
        var _a;
        return (_a = props2.delay) != null ? _a : 1e3;
    });
    const scrollGap = createMemo(() => {
        var _a;
        return (_a = props2.scrollGap) != null ? _a : props2.clipWidth * .5;
    });
    const [textWidth, setTextWidth] = createSignal(0);
    const isTextOverflowing = createMemo(() => textWidth() > props2.clipWidth - SAFETY_MARGIN);
    const shouldScroll = createMemo(() => props2.marquee && isTextOverflowing());
    const wasFocusedBefore = createMemo(p => p || props2.marquee, false);
    createEffect(() => {
        if (shouldScroll()) {
            let options = {
                duration: (textWidth() + scrollGap()) / speed() * 1e3,
                delay: delay2(),
                loop: true,
                easing: props2.easing
            };
            text1.lng.x = 0;
            text2.lng.x = textWidth() + scrollGap();
            let a1 = text1.lng.animate({
                x: -textWidth() - scrollGap()
            }, options).start();
            let a2 = text2.lng.animate({
                x: 0
            }, options).start();
            onCleanup(() => {
                a1.stop();
                a2.stop();
            });
        }
    });
    const events = {
        loaded(el) {
            setTextWidth(el.width);
        }
    };
    let text1;
    let text2;
    return [ memo(() => memo(() => !!wasFocusedBefore())() && [ (() => {
        var _el$2 = createElement("text");
        var _ref$ = text1;
        typeof _ref$ === "function" ? use(_ref$, _el$2) : text1 = _el$2;
        spread(_el$2, mergeProps(props2, {
            get hidden() {
                return !shouldScroll();
            },
            rtt: true,
            maxLines: 1,
            onEvent: events
        }), false);
        return _el$2;
    })(), (() => {
        var _el$3 = createElement("text");
        var _ref$2 = text2;
        typeof _ref$2 === "function" ? use(_ref$2, _el$3) : text2 = _el$3;
        spread(_el$3, mergeProps(props2, {
            get hidden() {
                return !shouldScroll();
            },
            rtt: true,
            maxLines: 1
        }), false);
        return _el$3;
    })() ]), (() => {
        var _el$ = createElement("text");
        spread(_el$, mergeProps(props2, {
            maxLines: 1,
            get hidden() {
                return shouldScroll();
            },
            contain: "width"
        }), false);
        return _el$;
    })() ];
}

function Marquee(props2) {
    const [clipWidth, setClipWidth] = createSignal(props2.width || 0);
    const clipHeight = createMemo(() => {
        var _a, _b;
        return props2.height || ((_a = props2.textProps) == null ? void 0 : _a.lineHeight) || (((_b = props2.textProps) == null ? void 0 : _b.fontSize) || 16) * 1.5;
    });
    return (() => {
        var _el$4 = createElement("view");
        spread(_el$4, mergeProps(props2, {
            get height() {
                return clipHeight();
            },
            onLayout: chainFunctions(props2.onLayout, e => setClipWidth(e.width)),
            get clipping() {
                return props2.marquee;
            }
        }), true);
        insert(_el$4, createComponent(MarqueeText, mergeProps(() => props2.textProps, {
            get marquee() {
                return props2.marquee;
            },
            get clipWidth() {
                return clipWidth();
            },
            get speed() {
                return props2.speed;
            },
            get delay() {
                return props2.delay;
            },
            get scrollGap() {
                return props2.scrollGap;
            },
            get easing() {
                return props2.easing;
            },
            get children() {
                return props2.children;
            }
        })));
        return _el$4;
    })();
}

const FocusStackContext = createContext(void 0);

function FocusStackProvider(props2) {
    const [_focusStack, setFocusStack] = createSignal([]);
    function storeFocus(element, prevElement) {
        const elm = prevElement || element;
        if (elm) {
            setFocusStack(stack => [ ...stack, elm ]);
        }
    }
    function restoreFocus() {
        let wasFocused = false;
        setFocusStack(stack => {
            const prevElement = stack.pop();
            if (prevElement && typeof prevElement.setFocus === "function") {
                prevElement.setFocus();
                wasFocused = true;
            }
            return [ ...stack ];
        });
        return wasFocused;
    }
    function clearFocusStack() {
        setFocusStack([]);
    }
    return createComponent(FocusStackContext.Provider, {
        value: {
            storeFocus: storeFocus,
            restoreFocus: restoreFocus,
            clearFocusStack: clearFocusStack
        },
        get children() {
            return props2.children;
        }
    });
}

function useFocusStack(autoClear = true) {
    const context2 = useContext(FocusStackContext);
    if (!context2) {
        throw new Error("useFocusStack must be used within a FocusStackProvider");
    }
    if (autoClear) {
        onCleanup(() => {
            setTimeout(() => context2.clearFocusStack(), 5);
        });
    }
    return context2;
}

const keepAliveElements = new Map;

const storeKeepAlive = element => {
    if (keepAliveElements.has(element.id)) {
        console.warn('[KeepAlive] Element with id "'.concat(element.id, '" already in cache. Recreating.'));
        return element;
    }
    keepAliveElements.set(element.id, element);
    return element;
};

function wrapChildren(props2) {
    const onRemove = props2.onRemove || (elm => {
        elm.alpha = 0;
    });
    const onRender = props2.onRender || (elm => {
        elm.alpha = 1;
    });
    const transition = props2.transition || {
        alpha: true
    };
    return (() => {
        var _el$ = createElement("view");
        setProp(_el$, "preserve", true);
        setProp(_el$, "onRemove", onRemove);
        setProp(_el$, "onRender", onRender);
        setProp(_el$, "forwardFocus", 0);
        setProp(_el$, "transition", transition);
        spread(_el$, props2, false);
        return _el$;
    })();
}

const KeepAlive = props2 => {
    var _a;
    let existing = keepAliveElements.get(props2.id);
    if (existing && ((_a = props2.shouldDispose) == null ? void 0 : _a.call(props2, props2.id))) {
        existing.dispose();
        keepAliveElements.delete(props2.id);
        existing = void 0;
    }
    if (!existing) {
        return createRoot(dispose2 => {
            const children2 = wrapChildren(props2);
            storeKeepAlive({
                id: props2.id,
                owner: getOwner(),
                children: children2,
                dispose: dispose2
            });
            return children2;
        });
    } else if (existing && !existing.children) {
        existing.children = runWithOwner(existing.owner, () => wrapChildren(props2));
    }
    return existing.children;
};

const KeepAliveRoute = props2 => {
    const key = props2.id || props2.path;
    const preload2 = props2.preload ? preloadProps => {
        var _a, _b;
        let existing = keepAliveElements.get(key);
        if (existing && ((_a = props2.shouldDispose) == null ? void 0 : _a.call(props2, key))) {
            existing.dispose();
            keepAliveElements.delete(key);
            existing = void 0;
        }
        if (!existing) {
            return createRoot(dispose2 => {
                storeKeepAlive({
                    id: key,
                    owner: getOwner(),
                    dispose: dispose2,
                    children: null
                });
                return props2.preload(preloadProps);
            });
        } else if (existing.children) {
            (_b = existing.children) == null ? void 0 : _b.setFocus();
        }
    } : void 0;
    return createComponent(Route, mergeProps(props2, {
        preload: preload2,
        component: childProps => createComponent(KeepAlive, {
            id: key,
            get onRemove() {
                return props2.onRemove;
            },
            get onRender() {
                return props2.onRender;
            },
            get transition() {
                return props2.transition;
            },
            get children() {
                return props2.component(childProps);
            }
        })
    }));
};

function disposeList(list) {
    var _a;
    for (let i = 0; i < list.length; i++) {
        (_a = list[i]) == null ? void 0 : _a.disposer();
    }
}

function listArray(list, mapFn, options = {}) {
    const items = [];
    let mapped = [], unusedItems, i, j, item, oldValue, oldIndex, newValue, fallback, fallbackDisposer;
    onCleanup(() => {
        fallbackDisposer == null ? void 0 : fallbackDisposer();
        fallbackDisposer = void 0;
        disposeList(items);
    });
    return () => {
        const newItems = list() || [];
        newItems[$TRACK];
        return untrack(() => {
            var _a, _b, _c, _d, _e, _f;
            if (newItems.length > 0 && fallbackDisposer) {
                fallbackDisposer();
                fallbackDisposer = void 0;
                fallback = void 0;
            }
            const temp = new Array(newItems.length);
            unusedItems = items.length;
            for (j = unusedItems - 1; j >= 0; --j) {
                item = items[j];
                oldIndex = item.index;
                if (oldIndex < newItems.length && newItems[oldIndex] === item.value) {
                    temp[oldIndex] = mapped[oldIndex];
                    if (--unusedItems !== j) {
                        items[j] = items[unusedItems];
                        items[unusedItems] = item;
                    }
                }
            }
            const matcher = new Map;
            const matchedItems = new Uint8Array(unusedItems);
            for (j = unusedItems - 1; j >= 0; --j) {
                oldValue = items[j].value;
                (_b = (_a = matcher.get(oldValue)) == null ? void 0 : _a.push(j)) != null ? _b : matcher.set(oldValue, [ j ]);
            }
            for (i = 0; i < newItems.length; ++i) {
                if (i in temp) continue;
                newValue = newItems[i];
                j = (_d = (_c = matcher.get(newValue)) == null ? void 0 : _c.pop()) != null ? _d : -1;
                if (j >= 0) {
                    item = items[j];
                    oldIndex = item.index;
                    temp[i] = mapped[oldIndex];
                    item.index = i;
                    (_e = item.indexSetter) == null ? void 0 : _e.call(item, i);
                    matchedItems[j] = 1;
                }
            }
            for (j = matchedItems.length - 1; j >= 0; --j) {
                if (matchedItems[j] && --unusedItems !== j) {
                    item = items[j];
                    items[j] = items[unusedItems];
                    items[unusedItems] = item;
                }
            }
            for (j = unusedItems - 1; j >= 0; --j) {
                item = items[j];
                oldIndex = item.index;
                if (!(oldIndex in temp) && oldIndex < newItems.length) {
                    temp[oldIndex] = mapped[oldIndex];
                    newValue = newItems[oldIndex];
                    item.value = newValue;
                    (_f = item.valueSetter) == null ? void 0 : _f.call(item, newValueGetter);
                    if (--unusedItems !== j) {
                        items[j] = items[unusedItems];
                        items[unusedItems] = item;
                    }
                }
            }
            for (i = 0; i < newItems.length; ++i) {
                if (i in temp) continue;
                newValue = newItems[i];
                if (unusedItems > 0) {
                    item = items[--unusedItems];
                    temp[i] = mapped[item.index];
                    batch(changeBoth);
                } else {
                    temp[i] = createRoot(mapper);
                }
            }
            disposeList(items.splice(0, unusedItems));
            if (newItems.length === 0 && options.fallback) {
                if (!fallbackDisposer) {
                    fallback = [ createRoot(d => {
                        fallbackDisposer = d;
                        return options.fallback();
                    }) ];
                }
                return fallback;
            }
            return mapped = temp;
        });
    };
    function newValueGetter() {
        return newValue;
    }
    function changeBoth() {
        var _a, _b;
        item.index = i;
        (_a = item.indexSetter) == null ? void 0 : _a.call(item, i);
        item.value = newValue;
        (_b = item.valueSetter) == null ? void 0 : _b.call(item, newValueGetter);
    }
    function mapper(disposer) {
        const t = {
            value: newValue,
            index: i,
            disposer: disposer
        };
        items.push(t);
        let sV = () => {
            [sV, t.valueSetter] = createSignal(t.value);
            return sV();
        }, sI = () => {
            [sI, t.indexSetter] = createSignal(t.index);
            return sI();
        };
        return mapFn(() => sV(), () => sI());
    }
}

function List(props2) {
    const fallback = "fallback" in props2 && {
        fallback: () => props2.fallback
    };
    return createMemo(listArray(() => props2.each, props2.children, fallback || void 0));
}

const columnScroll = withScrolling(false);

const rowStyles = {
    display: "flex",
    flexWrap: "wrap",
    transition: {
        y: true
    }
};

function VirtualGrid(props2) {
    var _a;
    const bufferSize = () => {
        var _a2;
        return (_a2 = props2.buffer) != null ? _a2 : 2;
    };
    const [cursor, setCursor] = createSignal((_a = props2.selected) != null ? _a : 0);
    const items = createMemo(() => props2.each || []);
    const itemCount = () => items().length;
    const itemsPerRow = () => props2.columns;
    const numberOfRows = () => {
        var _a2;
        return (_a2 = props2.rows) != null ? _a2 : 1;
    };
    const totalVisibleItems = () => itemsPerRow() * numberOfRows();
    const start = createMemo(() => {
        const perRow = itemsPerRow();
        const newRowIndex = Math.floor(cursor() / perRow);
        const rawStart = newRowIndex * perRow - bufferSize() * perRow;
        return Math.max(0, rawStart);
    });
    const end = createMemo(() => {
        const perRow = itemsPerRow();
        const newRowIndex = Math.floor(cursor() / perRow);
        const rawEnd = (newRowIndex + bufferSize()) * perRow + totalVisibleItems();
        return Math.min(items().length, rawEnd);
    });
    const [slice, setSlice] = createSignal(items().slice(start(), end()));
    let viewRef;
    function onVerticalNav(dir) {
        return function() {
            const perRow = itemsPerRow();
            const currentRowIndex = Math.floor(cursor() / perRow);
            const maxRows = Math.floor(items().length / perRow);
            if (currentRowIndex === 0 && dir === -1 || currentRowIndex === maxRows && dir === 1) return;
            const selected = this.selected || 0;
            const offset = dir * perRow;
            const newIndex = clamp(selected + offset, 0, items().length - 1);
            const lastIdx = selected;
            this.selected = newIndex;
            const active = this.children[this.selected];
            if (active instanceof ElementNode) {
                active.setFocus();
                chainedOnSelectedChanged.call(this, this.selected, this, active, lastIdx);
                return true;
            }
        };
    }
    const onUp2 = onVerticalNav(-1);
    const onDown2 = onVerticalNav(1);
    const onSelectedChanged = function(_idx, elm, active, _lastIdx) {
        var _a2;
        let idx = _idx;
        let lastIdx = _lastIdx;
        const perRow = itemsPerRow();
        const newRowIndex = Math.floor(idx / perRow);
        const prevRowIndex = Math.floor((lastIdx || 0) / perRow);
        const prevStart = start();
        setCursor(prevStart + idx);
        if (newRowIndex === prevRowIndex) return;
        setSlice(items().slice(start(), end()));
        const idxCorrection = prevStart - start();
        if (lastIdx) lastIdx += idxCorrection;
        idx += idxCorrection;
        this.selected += idxCorrection;
        if (props2.onEndReachedThreshold !== void 0 && cursor() >= items().length - props2.onEndReachedThreshold) {
            (_a2 = props2.onEndReached) == null ? void 0 : _a2.call(props2);
        }
        queueMicrotask(() => {
            const prevRowY = this.y + active.y;
            this.updateLayout();
            this.lng.y = prevRowY - active.y;
            columnScroll(idx, elm, active, lastIdx);
        });
    };
    const chainedOnSelectedChanged = chainFunctions(props2.onSelectedChanged, onSelectedChanged);
    let cachedSelected;
    const updateSelected = ([selected, _items]) => {
        var _a2;
        if (!viewRef || selected == null) return;
        if (cachedSelected !== void 0) {
            selected = cachedSelected;
            cachedSelected = void 0;
        }
        if (selected >= items().length && props2.onEndReached) {
            (_a2 = props2.onEndReached) == null ? void 0 : _a2.call(props2);
            cachedSelected = selected;
            return;
        }
        const item = items()[selected];
        let active = viewRef.children.find(x => x.item === item);
        const lastSelected = viewRef.selected;
        if (active instanceof ElementNode) {
            viewRef.selected = viewRef.children.indexOf(active);
            if (hasFocus(viewRef)) {
                active.setFocus();
            }
            chainedOnSelectedChanged.call(viewRef, viewRef.selected, viewRef, active, lastSelected);
        } else {
            setCursor(selected);
            setSlice(items().slice(start(), end()));
            queueMicrotask(() => {
                viewRef.updateLayout();
                active = viewRef.children.find(x => x.item === item);
                if (active instanceof ElementNode) {
                    viewRef.selected = viewRef.children.indexOf(active);
                    if (hasFocus(viewRef)) {
                        active.setFocus();
                    }
                    chainedOnSelectedChanged.call(viewRef, viewRef.selected, viewRef, active, lastSelected);
                }
            });
        }
    };
    const scrollToIndex2 = index => {
        untrack(() => updateSelected([ index ]));
    };
    createEffect(on([ () => props2.selected, items ], updateSelected));
    createEffect(on(items, (gridItems, _prevGridItems, prevSize) => {
        if (!viewRef) return;
        if (cachedSelected !== void 0) {
            updateSelected([ cachedSelected ]);
            return gridItems.length;
        }
        if (gridItems.length === 0) {
            setCursor(0);
            cachedSelected = void 0;
            setSlice([]);
        } else if (cursor() >= itemCount()) {
            updateSelected([ Math.max(0, itemCount() - 1) ]);
        } else if (prevSize === 0) {
            updateSelected([ 0 ]);
        } else {
            setSlice(items().slice(start(), end()));
        }
        return gridItems.length;
    }, {
        defer: true
    }));
    return (() => {
        var _el$ = createElement("view");
        var _ref$ = chainRefs(el => {
            viewRef = el;
        }, props2.ref);
        typeof _ref$ === "function" && use(_ref$, _el$);
        spread(_el$, mergeProps(props2, {
            get scroll() {
                return props2.scroll || "always";
            },
            get selected() {
                return props2.selected || 0;
            },
            get cursor() {
                return cursor();
            },
            onLeft: chainFunctions(props2.onLeft, navigableHandleNavigation),
            onRight: chainFunctions(props2.onRight, navigableHandleNavigation),
            onUp: chainFunctions(props2.onUp, onUp2),
            onDown: chainFunctions(props2.onDown, onDown2),
            forwardFocus: navigableForwardFocus,
            onCreate: props2.selected ? chainFunctions(props2.onCreate, columnScroll) : props2.onCreate,
            scrollToIndex: scrollToIndex2,
            onSelectedChanged: chainedOnSelectedChanged,
            style: combineStyles(props2.style, rowStyles)
        }), true);
        insert(_el$, createComponent(List, {
            get each() {
                return slice();
            },
            get children() {
                return props2.children;
            }
        }));
        return _el$;
    })();
}

function createVirtual(component, props2, keyHandlers) {
    var _a;
    const isRow = component === Row;
    const axis = isRow ? "x" : "y";
    const [cursor, setCursor] = createSignal((_a = props2.selected) != null ? _a : 0);
    const bufferSize = createMemo(() => props2.bufferSize || 2);
    const scrollIndex = createMemo(() => props2.scrollIndex || 0);
    const items = createMemo(() => props2.each || []);
    const itemCount = createMemo(() => items().length);
    const scrollType = createMemo(() => props2.scroll || "auto");
    const selected = () => {
        if (props2.wrap) {
            return Math.max(bufferSize(), scrollIndex());
        }
        return props2.selected || 0;
    };
    let cachedScaledSize;
    let targetPosition;
    let cachedAnimationController;
    const uniformSize = createMemo(() => props2.uniformSize !== false);
    const [slice, setSlice] = createSignal({
        start: 0,
        slice: [],
        selected: 0,
        delta: 0,
        shiftBy: 0,
        atStart: true,
        cursor: 0
    });
    function normalizeDeltaForWindow(delta, windowLen) {
        if (!windowLen) return 0;
        const half = windowLen / 2;
        if (delta > half) return delta - windowLen;
        if (delta < -half) return delta + windowLen;
        return delta;
    }
    function computeSize(selected2 = 0) {
        var _a2, _b, _c;
        if (uniformSize() && cachedScaledSize) {
            return cachedScaledSize;
        } else if (viewRef) {
            const gap = viewRef.gap || 0;
            const dimension = isRow ? "width" : "height";
            const prevSelectedChild = viewRef.children[selected2];
            if (prevSelectedChild instanceof ElementNode) {
                const itemSize = prevSelectedChild[dimension] || 0;
                const focusStyle = (_a2 = prevSelectedChild.style) == null ? void 0 : _a2.focus;
                const scale = (_c = (_b = focusStyle == null ? void 0 : focusStyle.scale) != null ? _b : prevSelectedChild.scale) != null ? _c : 1;
                const scaledSize = itemSize * (props2.factorScale ? scale : 1) + gap;
                cachedScaledSize = scaledSize;
                return scaledSize;
            }
        }
        return 0;
    }
    function computeSlice(c, delta, prev) {
        const total = itemCount();
        if (total === 0) return {
            start: 0,
            slice: [],
            selected: 0,
            delta: delta,
            shiftBy: 0,
            atStart: true,
            cursor: 0
        };
        const length = props2.displaySize + bufferSize();
        let start = prev.start;
        let selected2 = prev.selected;
        let atStart = prev.atStart;
        let shiftBy = -delta;
        switch (scrollType()) {
          case "always":
            if (props2.wrap) {
                start = mod(c - 1, total);
                selected2 = 1;
            } else {
                start = clamp(c - bufferSize(), 0, Math.max(0, total - props2.displaySize - bufferSize()));
                if (delta === 0 && c > 3) {
                    shiftBy = c < 3 ? -c : -2;
                    selected2 = 2;
                } else {
                    selected2 = c < bufferSize() ? c : c >= total - props2.displaySize ? c - (total - props2.displaySize) + bufferSize() : bufferSize();
                }
            }
            break;

          case "auto":
            if (props2.wrap) {
                if (delta === 0) {
                    selected2 = scrollIndex() || 1;
                    start = mod(c - (scrollIndex() || 1), total);
                } else {
                    start = mod(c - (prev.selected || 1), total);
                }
            } else {
                if (delta < 0) {
                    if (prev.start > 0 && prev.selected >= props2.displaySize) {
                        start = prev.start;
                        selected2 = prev.selected - 1;
                    } else if (prev.start > 0) {
                        start = prev.start - 1;
                        selected2 = prev.selected;
                    } else if (prev.start === 0 && !prev.atStart) {
                        start = 0;
                        selected2 = prev.selected - 1;
                        atStart = true;
                    } else if (selected2 >= props2.displaySize - 1) {
                        start = 0;
                        selected2 = prev.selected - 1;
                    } else {
                        start = 0;
                        selected2 = prev.selected - 1;
                        shiftBy = 0;
                    }
                } else if (delta > 0) {
                    if (prev.selected < scrollIndex()) {
                        start = prev.start;
                        selected2 = prev.selected + 1;
                        shiftBy = 0;
                    } else if (prev.selected === scrollIndex() || atStart) {
                        start = prev.start;
                        selected2 = prev.selected + 1;
                        atStart = false;
                    } else if (prev.start === 0 && prev.selected === 0) {
                        start = 0;
                        selected2 = 1;
                        atStart = false;
                    } else if (prev.start >= total - props2.displaySize) {
                        start = prev.start;
                        selected2 = c - start;
                        shiftBy = 0;
                    } else {
                        start = prev.start + 1;
                        selected2 = Math.max(prev.selected, scrollIndex() + 1);
                    }
                } else {
                    if (c > 0) {
                        start = Math.min(c - (scrollIndex() || 1), total - props2.displaySize - bufferSize());
                        selected2 = Math.max(scrollIndex() || 1, c - start);
                        shiftBy = total - c < 3 ? c - total : -1;
                        atStart = false;
                    } else {
                        if (c !== prev.cursor) {
                            start = c;
                            if (c === 0) {
                                atStart = true;
                                selected2 = 0;
                            }
                        } else {
                            start = prev.start;
                            selected2 = prev.selected;
                        }
                    }
                }
            }
            break;

          case "edge":
            const startScrolling = Math.max(1, props2.displaySize + (atStart ? -1 : 0));
            if (props2.wrap) {
                if (delta > 0) {
                    if (prev.selected < startScrolling) {
                        selected2 = prev.selected + 1;
                        shiftBy = 0;
                    } else if (prev.selected === startScrolling && atStart) {
                        selected2 = prev.selected + 1;
                        atStart = false;
                    } else {
                        start = mod(prev.start + 1, total);
                        selected2 = prev.selected;
                    }
                } else if (delta < 0) {
                    if (prev.selected > 1) {
                        selected2 = prev.selected - 1;
                        shiftBy = 0;
                    } else {
                        start = mod(prev.start - 1, total);
                        selected2 = 1;
                    }
                } else {
                    start = mod(c - 1, total);
                    selected2 = 1;
                    shiftBy = -1;
                    atStart = false;
                }
            } else {
                if (delta === 0 && c > 0) {
                    selected2 = c > startScrolling ? startScrolling : c;
                    start = Math.max(0, c - startScrolling + 1);
                    shiftBy = c > startScrolling ? -1 : 0;
                    atStart = c < startScrolling;
                } else if (delta > 0) {
                    if (prev.selected < startScrolling) {
                        selected2 = prev.selected + 1;
                        shiftBy = 0;
                    } else if (prev.selected === startScrolling && atStart) {
                        selected2 = prev.selected + 1;
                        atStart = false;
                    } else {
                        start = prev.start + 1;
                        selected2 = prev.selected;
                        atStart = false;
                    }
                } else if (delta < 0) {
                    if (prev.selected > 1) {
                        selected2 = prev.selected - 1;
                        shiftBy = 0;
                    } else if (c > 1) {
                        start = Math.max(0, c - 1);
                        selected2 = 1;
                    } else if (c === 1) {
                        start = 0;
                        selected2 = 1;
                    } else {
                        start = 0;
                        selected2 = 0;
                        shiftBy = atStart ? 0 : shiftBy;
                        atStart = true;
                    }
                }
            }
            break;

          case "none":
          default:
            start = 0;
            selected2 = c;
            shiftBy = 0;
            break;
        }
        let newSlice = prev.slice;
        if (start !== prev.start || newSlice.length === 0) {
            newSlice = props2.wrap ? Array.from({
                length: length
            }, (_, i) => items()[mod(start + i, total)]) : items().slice(start, start + length);
        }
        const state = {
            start: start,
            slice: newSlice,
            selected: selected2,
            delta: delta,
            shiftBy: shiftBy,
            atStart: atStart,
            cursor: c
        };
        if (props2.debugInfo) {
            console.log("[Virtual]", {
                cursor: c,
                delta: delta,
                start: start,
                selected: selected2,
                shiftBy: shiftBy,
                slice: state.slice
            });
        }
        return state;
    }
    let viewRef;
    function scrollToIndex2(index) {
        untrack(() => {
            if (itemCount() === 0) return;
            lastNavTime = performance.now();
            if (originalPosition !== void 0) {
                viewRef.lng[axis] = originalPosition;
                targetPosition = originalPosition;
            }
            if (!hasFocus(viewRef)) {
                viewRef.setFocus();
            }
            updateSelected([ clamp(index, 0, itemCount() - 1) ]);
        });
    }
    let lastNavTime = 0;
    function getAdaptiveDuration(duration = 250) {
        const now = performance.now();
        const delta = now - lastNavTime;
        lastNavTime = now;
        if (delta < duration) return delta;
        return duration;
    }
    let originalPosition;
    const onSelectedChanged = function(_idx, elm, _active, _lastIdx) {
        var _a2, _b, _c;
        let idx = _idx;
        let lastIdx = _lastIdx || 0;
        let active = _active;
        const noChange = idx === lastIdx;
        const total = itemCount();
        originalPosition = originalPosition != null ? originalPosition : elm[axis];
        if (props2.onSelectedChanged) {
            props2.onSelectedChanged.call(this, idx, this, active, lastIdx);
        }
        if (noChange) return;
        const rawDelta = idx - (lastIdx != null ? lastIdx : 0);
        const windowLen = (_b = (_a2 = elm == null ? void 0 : elm.children) == null ? void 0 : _a2.length) != null ? _b : props2.displaySize + bufferSize();
        const delta = props2.wrap ? normalizeDeltaForWindow(rawDelta, windowLen) : rawDelta;
        setCursor(c => {
            const next = c + delta;
            return props2.wrap ? mod(next, total) : clamp(next, 0, total - 1);
        });
        const newState = computeSlice(cursor(), delta, slice());
        setSlice(newState);
        elm.selected = newState.selected;
        if (props2.onEndReachedThreshold !== void 0 && cursor() >= itemCount() - props2.onEndReachedThreshold) {
            (_c = props2.onEndReached) == null ? void 0 : _c.call(props2);
        }
        if (newState.shiftBy === 0) return;
        const prevChildPos = (targetPosition != null ? targetPosition : this[axis]) + active[axis];
        queueMicrotask(() => {
            var _a3;
            elm.updateLayout();
            const childSize = computeSize(slice().selected);
            if (cachedAnimationController && cachedAnimationController.state === "running") {
                cachedAnimationController.stop();
            }
            if (Config.animationsEnabled) {
                this.lng[axis] = prevChildPos - active[axis];
                targetPosition = this.lng[axis] + childSize * slice().shiftBy;
                cachedAnimationController = this.animate({
                    [axis]: targetPosition
                }, {
                    ...this.animationSettings,
                    duration: getAdaptiveDuration((_a3 = this.animationSettings) == null ? void 0 : _a3.duration)
                }).start();
            } else {
                this.lng[axis] = this.lng[axis] + childSize * slice().shiftBy;
            }
        });
    };
    const updateSelected = ([sel, _items]) => {
        if (!viewRef || sel === void 0 || itemCount() === 0) return;
        const item = items()[sel];
        setCursor(sel);
        const newState = computeSlice(cursor(), 0, slice());
        setSlice(newState);
        queueMicrotask(() => {
            var _a2;
            viewRef.updateLayout();
            let activeIndex = viewRef.children.findIndex(x => x.item === item);
            if (activeIndex === -1) return;
            viewRef.selected = activeIndex;
            if (hasFocus(viewRef)) {
                (_a2 = viewRef.children[activeIndex]) == null ? void 0 : _a2.setFocus();
            }
            if (newState.shiftBy === 0) return;
            const childSize = computeSize(slice().selected);
            originalPosition = originalPosition != null ? originalPosition : viewRef.lng[axis];
            targetPosition = targetPosition != null ? targetPosition : viewRef.lng[axis];
            viewRef.lng[axis] = (viewRef.lng[axis] || 0) + childSize * -1;
        });
    };
    let doOnce2 = false;
    createEffect(on([ () => props2.wrap, items ], () => {
        if (!viewRef || itemCount() === 0 || !props2.wrap || doOnce2) return;
        doOnce2 = true;
        queueMicrotask(() => {
            const childSize = computeSize(slice().selected);
            viewRef.lng[axis] = (viewRef.lng[axis] || 0) + childSize * -1;
            originalPosition = viewRef.lng[axis];
            targetPosition = viewRef.lng[axis];
        });
    }));
    createEffect(on([ () => props2.selected, items ], updateSelected));
    createEffect(on(items, () => {
        if (!viewRef) return;
        if (cursor() >= itemCount()) {
            setCursor(Math.max(0, itemCount() - 1));
        }
        const newState = computeSlice(cursor(), 0, slice());
        setSlice(newState);
        viewRef.selected = newState.selected;
    }));
    return (() => {
        var _el$ = createElement("view");
        var _ref$ = chainRefs(el => {
            viewRef = el;
        }, props2.ref);
        typeof _ref$ === "function" && use(_ref$, _el$);
        setProp(_el$, "transition", {});
        setProp(_el$, "transitionLeft", isRow ? defaultTransitionBack : void 0);
        setProp(_el$, "transitionRight", isRow ? defaultTransitionForward : void 0);
        setProp(_el$, "transitionUp", !isRow ? defaultTransitionUp : void 0);
        setProp(_el$, "transitionDown", !isRow ? defaultTransitionDown : void 0);
        spread(_el$, mergeProps(props2, keyHandlers, {
            get selected() {
                return selected();
            },
            get cursor() {
                return cursor();
            },
            forwardFocus: navigableForwardFocus,
            scrollToIndex: scrollToIndex2,
            onSelectedChanged: onSelectedChanged,
            style: combineStyles(props2.style, component === Row ? {
                display: "flex",
                gap: 30
            } : {
                display: "flex",
                flexDirection: "column",
                gap: 30
            })
        }), true);
        insert(_el$, createComponent(List, {
            get each() {
                return slice().slice;
            },
            get children() {
                return props2.children;
            }
        }));
        return _el$;
    })();
}

function VirtualRow(props2) {
    return createVirtual(Row, props2, {
        onLeft: chainFunctions(props2.onLeft, handleNavigation("left")),
        onRight: chainFunctions(props2.onRight, handleNavigation("right"))
    });
}

function createSpriteMap(src, subTextures) {
    const spriteMapTexture = renderer$2.createTexture("ImageTexture", {
        src: src
    });
    return subTextures.reduce((acc, t) => {
        const {x: x, y: y, width: width, height: height} = t;
        acc[t.name] = renderer$2.createTexture("SubTexture", {
            texture: spriteMapTexture,
            x: x,
            y: y,
            w: width,
            h: height
        });
        return acc;
    }, {});
}

const App = props2 => {
    useFocusManager({
        Announcer: [ "a" ],
        Menu: [ "m" ],
        Escape: [ "Escape", 27 ],
        Backspace: [ "Backspace", 8 ],
        Back: [ "b" ],
        Left: [ "ArrowLeft", 37 ],
        Right: [ "ArrowRight", 39 ],
        Up: [ "ArrowUp", 38 ],
        Down: [ "ArrowDown", 40 ],
        Enter: [ "Enter", 13 ]
    }, {
        userKeyHoldMap: {
            EnterHold: [ "Enter", 13 ],
            BackHold: [ "b", 66 ]
        },
        holdThreshold: 1e3
    });
    useMouse(void 0, 100, {
        customStates: {
            hoverState: "$hover",
            pressedState: "$pressed",
            pressedStateDuration: 150
        }
    });
    return props2.children;
};

const theme = {
    primary: 743406847,
    primaryLight: 1249628415,
    textPrimary: 3874024447,
    textSecondary: 2139393535,
    layout: {
        gutterX: 20,
        marginX: 150,
        screenW: 1920
    },
    typography: {
        display2: {
            fontFamily: "Arial",
            fontSize: 50,
            lineHeight: 60,
            fontWeight: 400,
            verticalAlign: "middle",
            textBaseline: "bottom"
        },
        body1: {
            fontFamily: "Arial",
            fontSize: 25,
            fontWeight: 400,
            lineHeight: 40,
            verticalAlign: "middle",
            textBaseline: "bottom"
        },
        body2: {
            fontFamily: "Arial",
            fontSize: 22,
            fontWeight: 400,
            lineHeight: 32,
            verticalAlign: "middle",
            textBaseline: "bottom"
        }
    },
    color: {
        materialBrand: 13311
    }
};

const params = new URLSearchParams(window.location.search);

const roundPoster = params.get("roundPoster") !== "false";

const styles$1 = {
    itemsContainer: {
        width: theme.layout.screenW,
        height: 800,
        y: 560,
        x: 0,
        zIndex: 2
    },
    Thumbnail: {
        width: 185,
        height: 278,
        scale: 1,
        zIndex: 2,
        transition: {
            scale: {
                duration: 250,
                easing: "linear"
            },
            border: {
                duration: 250,
                easing: "linear"
            }
        },
        borderRadius: roundPoster ? 16 : 0,
        border: {
            width: 0,
            color: 0
        },
        $focus: {
            scale: 1.1,
            border: {
                color: theme.primaryLight,
                width: 6,
                gap: 0
            }
        },
        $hover: {
            scale: 1.07,
            border: {
                color: theme.primaryLight,
                width: 3
            }
        },
        $pressed: {
            scale: 1.05,
            border: {
                color: theme.primary,
                width: 6
            }
        }
    },
    RowTitle: {
        height: 44,
        width: 300,
        marginBottom: -54,
        fontSize: 26,
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
        transition: {
            y: {
                duration: 250,
                easing: "ease-in-out"
            }
        },
        zIndex: 2
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
    color: theme.primary,
    borderRadius: 12,
    $focus: {
        color: theme.primaryLight
    }
};

({
    width: Button$1.width + 8
});

const ButtonText = {
    fontSize: 26,
    lineHeight: Button$1.height,
    contain: "width",
    textAlign: "center",
    height: Button$1.height,
    width: Button$1.width,
    color: theme.textPrimary
};

const buttonStyles = {
    container: Button$1,
    text: ButtonText
};

const MaterialButton = {
    width: 386,
    height: 136
};

const MaterialButtonText = {
    fontSize: 32,
    contain: "width",
    textAlign: "center",
    mountY: -.35,
    color: 4294967295,
    height: MaterialButton.height,
    width: MaterialButton.width,
    $focus: {
        fontSize: 40
    },
    $disabled: {
        color: 2425393407
    }
};

function Thumbnail(props2) {
    return createComponent(Image$1, mergeProps(props2, {
        id: "thumbnail",
        get src() {
            return props2.item.src;
        },
        placeholder: "./assets/fallback.png",
        get item() {
            return props2.item;
        },
        get announce() {
            return [ props2.item.title, "PAUSE-1", props2.item.overview ];
        },
        get style() {
            return styles$1.Thumbnail;
        }
    }));
}

function TileRow(props2) {
    return createComponent(Row, mergeProps(props2, {
        get style() {
            return styles$1.Row;
        },
        get children() {
            return createComponent(Index, {
                get each() {
                    return props2.items;
                },
                children: (item, index) => createComponent(Thumbnail, {
                    get item() {
                        return item();
                    },
                    get announceContext() {
                        return "".concat(index + 1, " of ").concat(props2.items.length);
                    }
                })
            });
        }
    }));
}

function Button(props2) {
    return createComponent(View, mergeProps(props2, {
        get announce() {
            return [ props2.children, "button" ];
        },
        forwardStates: true,
        get style() {
            return buttonStyles.container;
        },
        get children() {
            return createComponent(Text, {
                get style() {
                    return buttonStyles.text;
                },
                get children() {
                    return props2.children || props2.title;
                }
            });
        }
    }));
}

function AssetPanel(props2) {
    let panelRef, actionRef;
    createEffect(() => {
        if (props2.open) {
            panelRef.animate({
                x: 1470
            }, {
                duration: 400,
                easing: "ease-in-out"
            }).start();
            actionRef.setFocus();
        } else if (panelRef.rendered) {
            panelRef.animate({
                x: 1920
            }, {
                duration: 400,
                easing: "ease-in-out"
            }).start();
        }
    });
    return createComponent(View, mergeProps(props2, {
        x: 1920,
        ref(r$) {
            var _ref$ = panelRef;
            typeof _ref$ === "function" ? _ref$(r$) : panelRef = r$;
        },
        color: 255,
        width: 450,
        height: 1080,
        zIndex: 5,
        get children() {
            return [ createComponent(Text, {
                x: 75,
                y: 50,
                fontSize: 32,
                get children() {
                    var _a;
                    return (_a = props2.item) == null ? void 0 : _a.title;
                }
            }), createComponent(Column, {
                ref(r$) {
                    var _ref$2 = actionRef;
                    typeof _ref$2 === "function" ? _ref$2(r$) : actionRef = r$;
                },
                get onLeft() {
                    return props2.close;
                },
                get onBack() {
                    return props2.close;
                },
                x: 75,
                y: 200,
                get children() {
                    return [ createComponent(Button, {
                        get onEnter() {
                            return props2.close;
                        },
                        children: "Record"
                    }), createComponent(Button, {
                        get onEnter() {
                            return props2.close;
                        },
                        children: "Watch"
                    }), createComponent(Button, {
                        get onEnter() {
                            return props2.close;
                        },
                        children: "Close"
                    }) ];
                }
            }) ];
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

function TitleRow(props2) {
    return createComponent(View, {
        get height() {
            return props2.height;
        },
        forwardFocus: 1,
        marginTop: 30,
        get children() {
            return [ createComponent(Text, {
                skipFocus: true,
                style: titleRowStyles,
                get children() {
                    return props2.title;
                }
            }), createComponent(VirtualRow, {
                gap: 20,
                displaySize: 8,
                bufferSize: 3,
                get each() {
                    return props2.items;
                },
                y: 50,
                get scroll() {
                    return props2.scroll;
                },
                get wrap() {
                    return props2.wrap;
                },
                children: (item, index) => createComponent(Dynamic, {
                    get component() {
                        return typeToComponent[props2.row.type];
                    },
                    get index() {
                        return index();
                    },
                    get item() {
                        return item();
                    }
                })
            }) ];
        }
    });
}

const posterStyles = {
    width: 185,
    height: 278,
    scale: 1,
    zIndex: 2,
    color: 2964369663,
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

function Poster(props2) {
    return createComponent(View, mergeProps({
        get src() {
            var _a;
            return (_a = props2.item) == null ? void 0 : _a.src;
        },
        get title() {
            var _a;
            return (_a = props2.item) == null ? void 0 : _a.shortTitle;
        },
        get backdrop() {
            var _a;
            return (_a = props2.item) == null ? void 0 : _a.backdrop;
        }
    }, props2, {
        onFail: node => node.src = "failback.png",
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

function PosterTitle(props2) {
    return createComponent(View, mergeProps({
        get src() {
            var _a;
            return (_a = props2.item) == null ? void 0 : _a.src;
        },
        get backdrop() {
            var _a;
            return (_a = props2.item) == null ? void 0 : _a.backdrop;
        }
    }, props2, {
        onFail: node => node.src = "failback.png",
        style: posterStyles,
        forwardStates: true,
        get children() {
            return createComponent(Text, {
                style: posterTitleStyles,
                get children() {
                    var _a;
                    return (_a = props2.item) == null ? void 0 : _a.title;
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

function Hero(props2) {
    const [hasFocus2, setHasFocus] = createSignal(false);
    return createComponent(View, mergeProps(props2, {
        get src() {
            return props2.item.backdrop;
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
                    return hasFocus2() ? 1 : 0;
                },
                get children() {
                    return [ createComponent(View, {
                        width: 185,
                        height: 278,
                        x: 54,
                        y: 220,
                        get src() {
                            return props2.item.src;
                        }
                    }), createComponent(Text, {
                        y: 520,
                        x: 54,
                        fontSize: 64,
                        width: 1e3,
                        maxLines: 1,
                        style: heroTextStyles,
                        get children() {
                            return props2.item.title;
                        }
                    }), createComponent(Text, {
                        y: 620,
                        x: 60,
                        fontSize: 21,
                        width: 1e3,
                        maxLines: 2,
                        lineHeight: 36,
                        color: 3435973887,
                        style: heroTextStyles,
                        get children() {
                            return props2.item.overview;
                        }
                    }) ];
                }
            });
        }
    }));
}

const typeToComponent = {
    Poster: Poster,
    Hero: Hero,
    PosterTitle: PosterTitle
};

const BlockStyle = {
    alpha: .85,
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

function Block(props2) {
    return createComponent(View, mergeProps(props2, {
        width: 100,
        height: 100,
        style: BlockStyle,
        get color() {
            return props2.color || 3772834047;
        }
    }));
}

const [globalBackground, setGlobalBackground] = createSignal("");

function createInfiniteScroll(fetcher) {
    const [pages, setPages] = createSignal([]);
    const [page, setPage] = createSignal(1);
    const [end, setEnd] = createSignal(false);
    const [contents] = createResource(page, fetcher);
    createComputed(() => {
        const content = contents();
        if (!content) return;
        batch(() => {
            if (content.length === 0) setEnd(true);
            setPages(p => [ ...p, ...content ]);
        });
    });
    return {
        pages: pages,
        page: page,
        setPage: setPage,
        setPages: setPages,
        end: end,
        setEnd: setEnd
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
    width: blockWidth
};

const Headline = props2 => createComponent(Marquee, mergeProps(props2, {
    textProps: HeadlineStyles
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

const Description = props2 => createComponent(Text, mergeProps(props2, {
    style: DescriptionStyles,
    get children() {
        return props2.children;
    }
}));

const Badge = props2 => createComponent(View, mergeProps(props2, {
    style: {
        color: "0x00000099",
        borderRadius: 8,
        border: {
            width: 2,
            color: "0xffffffff"
        },
        display: "flex",
        height: 36,
        width: 45
    },
    get children() {
        return createComponent(Text, {
            lineHeight: 36,
            style: BadgeStyle,
            get children() {
                return props2.children;
            }
        });
    }
}));

const MetaTextStyle = {
    ...theme.typography.body2,
    fontFamily: "Roboto",
    fontWeight: 400
};

const Metadata = props2 => createComponent(View, {
    style: {
        display: "flex",
        flexDirection: "row",
        gap: 18,
        width: blockWidth,
        height: 48
    },
    get children() {
        return [ createComponent(View, {
            y: -4,
            src: "./assets/stars.png",
            width: 188,
            height: 31
        }), createComponent(View, {
            y: -4,
            flexItem: false,
            clipping: true,
            get width() {
                return 188 * props2.voteAverage / 10;
            },
            height: 31,
            get children() {
                return createComponent(View, {
                    src: "./assets/stars-full.png",
                    width: 188,
                    height: 31
                });
            }
        }), createComponent(Text, {
            style: MetaTextStyle,
            get children() {
                return [ memo(() => props2.voteCount), " reviews" ];
            }
        }), createComponent(Text, {
            style: MetaTextStyle,
            get children() {
                return props2.metaText;
            }
        }), createComponent(For, {
            get each() {
                return props2.badges;
            },
            children: item => createComponent(Badge, {
                y: -5,
                children: item
            })
        }) ];
    }
});

const ContentBlock = props2 => createComponent(View, mergeProps({
    id: "contentBlock",
    style: ContentBlockStyle
}, props2, {
    get children() {
        return [ createComponent(Headline, {
            get marquee() {
                return props2.marquee;
            },
            get children() {
                return props2.content.title;
            }
        }), createComponent(Description, {
            get children() {
                return props2.content.description;
            }
        }), createComponent(Show, {
            get when() {
                return props2.content.voteCount;
            },
            get children() {
                return createComponent(Metadata, {
                    get metaText() {
                        return props2.content.metaText;
                    },
                    get badges() {
                        return props2.content.badges;
                    },
                    get voteCount() {
                        return props2.content.voteCount;
                    },
                    get voteAverage() {
                        return props2.content.voteAverage;
                    }
                });
            }
        }) ];
    }
}));

const Browse = props2 => {
    usePreloadRoute();
    const [heroContent, setHeroContent] = createSignal({});
    const navigate = useNavigate();
    let firstRun = true;
    let vgRef;
    onCleanup(() => {
        console.log("cleanup");
    });
    const provider = createMemo(() => createInfiniteScroll(props2.data()));
    const delayedBackgrounds = debounce(img => setGlobalBackground(img), 800);
    const delayedHero = debounce(content => setHeroContent(content || {}), 600);
    function updateContentBlock(_index, _col, elm) {
        if (!elm) return;
        const item = elm.item || {};
        if (firstRun) {
            if (item.backdrop) {
                setGlobalBackground(item.backdrop);
            }
            if (item.heroContent) {
                setHeroContent(item.heroContent);
            }
            firstRun = false;
            return;
        }
        if (item.href) ;
        if (item.backdrop) {
            delayedBackgrounds(item.backdrop);
        }
        if (item.heroContent) {
            delayedHero(item.heroContent);
        }
    }
    function onEndReached() {
        provider().setPage(p => p + 1);
    }
    function onEnter() {
        var _a;
        this.display = "flex";
        let entity = this.children.find(c => c.states.has("focus"));
        assertTruthy(entity && ((_a = entity.item) == null ? void 0 : _a.href));
        navigate(entity.item.href);
        return true;
    }
    return createComponent(Show, {
        get when() {
            return provider().pages().length;
        },
        get children() {
            return [ createComponent(ContentBlock, {
                y: 360,
                x: 162,
                get content() {
                    return heroContent();
                },
                forwardFocus: () => vgRef.setFocus()
            }), createComponent(View, {
                clipping: true,
                get style() {
                    return styles$1.itemsContainer;
                },
                get children() {
                    return createComponent(VirtualGrid, {
                        y: 24,
                        x: 160,
                        id: "BrowseGrid",
                        ref(r$) {
                            var _ref$ = vgRef;
                            typeof _ref$ === "function" ? _ref$(r$) : vgRef = r$;
                        },
                        scroll: "always",
                        get announce() {
                            return "All Trending ".concat(props2.params.filter);
                        },
                        onEnter: onEnter,
                        columns: 7,
                        gap: 50,
                        rows: 2,
                        buffer: 2,
                        onSelectedChanged: updateContentBlock,
                        onEndReached: onEndReached,
                        onEndReachedThreshold: 22,
                        width: 1620,
                        autofocus: true,
                        get each() {
                            return provider().pages();
                        },
                        children: item => createComponent(Thumbnail, {
                            get item() {
                                return item();
                            }
                        })
                    });
                }
            }) ];
        }
    });
};

const TMDB = props2 => {
    const [heroContent, setHeroContent] = createSignal({});
    const [openPanel, setOpenPanel] = createSignal(false);
    const {storeFocus: storeFocus, restoreFocus: restoreFocus} = useFocusStack();
    let contentBlock, solidLogo, firstRun = true;
    const delayedBackgrounds = debounce(setGlobalBackground, 800);
    const delayedHero = debounce(content => setHeroContent(content || {}), 600);
    createEffect(on(activeElement, elm => {
        if (!elm) return;
        const item = elm.item || {};
        if (firstRun) {
            item.backdrop && setGlobalBackground(item.backdrop);
            item.heroContent && setHeroContent(item.heroContent);
            firstRun = false;
        } else {
            item.backdrop && delayedBackgrounds(item.backdrop);
            item.heroContent && delayedHero(item.heroContent);
        }
    }, {
        defer: true
    }));
    function onRowChanged(selectedIndex, column, row, lastIndex) {
        if (selectedIndex === lastIndex) return;
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
    return createComponent(View, {
        forwardFocus: 2,
        get children() {
            return [ createComponent(View, {
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
                    return [ createComponent(Text, {
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
                    }), createComponent(Text, {
                        x: 90,
                        y: 110,
                        contain: "width",
                        width: 160,
                        fontSize: 12,
                        color: 4143380121,
                        children: "This product uses the TMDB API but is not endorsed or certified by TMDB."
                    }) ];
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
                    return props2.data.rows;
                },
                id: "BrowseColumn",
                onSelectedChanged: onRowChanged,
                onEnter: () => setOpenPanel(true),
                get autofocus() {
                    return props2.data.rows[0].items();
                },
                gap: 40,
                throttleInput: 250,
                transition: {
                    y: {
                        duration: 300,
                        easing: "ease-out"
                    }
                },
                get style() {
                    return styles$1.Column;
                },
                children: row => row().type === "Hero" ? createComponent(LazyRow, {
                    gap: 80,
                    upCount: 2,
                    bufferSize: 1,
                    scroll: "center",
                    centerScroll: true,
                    get each() {
                        return row().items();
                    },
                    y: 50,
                    get height() {
                        return row().height;
                    },
                    children: item => createComponent(Hero, {
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
            }), createComponent(AssetPanel, {
                onFocus: storeFocus,
                close: () => {
                    setOpenPanel(false);
                    restoreFocus();
                    return true;
                },
                get open() {
                    return openPanel();
                },
                get item() {
                    return heroContent();
                }
            }) ];
        }
    });
};

const Destroy = props2 => {
    const [heroContent, setHeroContent] = createSignal();
    const [heroIndex, setHeroIndex] = createSignal(0);
    onMount(() => setGlobalBackground(858993663));
    createEffect(on([ props2.data.heroRow.items, heroIndex ], ([heros, index]) => {
        if (heros) setHeroContent(heros[index]);
        if (heros && index < heros.length - 1) {
            const img = new Image;
            img.crossOrigin = "anonymous";
            img.src = heros[index + 1].backdrop;
        }
    }));
    function onDown2() {
        if (heroIndex() >= 19) return false;
        setHeroIndex(p => p + 1);
    }
    function onUp2() {
        if (heroIndex() === 0) return false;
        setHeroIndex(p => p - 1);
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
            return [ createComponent(View, {
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
                        get item() {
                            return heroContent();
                        },
                        get title() {
                            return heroContent().title;
                        }
                    });
                }
            }) ];
        }
    });
};

const API_KEY_V4 = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZDE4YjEwMTA0YjdiZTlkNjFiMWYwYjVlMGEwNzM2OCIsInN1YiI6IjYwZTVjMTdlNGNhNjc2MDA3NTA4Njc3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D_nqH9kd-bhhWzeVsTDPYhHnsUaNAuyAa6YATmKHqsA";

const API_BASE = "https://api.themoviedb.org/3";

let tmdbConfig;

let baseImageUrl;

const urlParams$1 = new URLSearchParams(window.location.search);

const basePosterSize = urlParams$1.get("posterSize") || "w185";

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
    }).then(r => r.json());
}

function loadConfig() {
    return _get("/configuration").then(data => {
        var _a;
        tmdbConfig = data;
        baseImageUrl = (_a = data.images) == null ? void 0 : _a.secure_base_url;
        return data;
    });
}

const api = {
    get: get,
    loadConfig: loadConfig
};

function truncateString(str, maxLength) {
    if (str.length > maxLength) {
        return str.substring(0, maxLength - 3) + "...";
    }
    return str;
}

function convertItemsToTiles(items = []) {
    return items.map((item, i) => ({
        src: getImageUrl(item.poster_path || item.profile_path),
        tileSrc: getImageUrl(item.backdrop_path || item.profile_path, "w300"),
        backdrop: getImageUrl(item.backdrop_path, "w1280"),
        href: "/entity/".concat(item.media_type || "people", "/").concat(item.id),
        shortTitle: truncateString(item.title || item.name, 30),
        title: item.title || item.name,
        overview: item.overview,
        absIndex: i,
        item: item,
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

const handleResults = response => response.then(({results: results}) => {
    let filteredItems = results.filter(r => !r.adult);
    return convertItemsToTiles(filteredItems);
});

const fetchPopular = type2 => handleResults(api.get("/".concat(type2, "/popular")));

let genreListCache;

const fetchGenreMovies = genres => {
    const genreList = genreListCache || (genreListCache = api.get("/genre/movie/list"));
    const targetGenre = Array.isArray(genres) ? genres : [ genres ];
    return genreList.then(({genres: genres2}) => {
        let targetGenreIds = [];
        genres2.forEach(item => {
            if (targetGenre.includes(item.name)) targetGenreIds.push(item.id);
        });
        return handleResults(api.get("/discover/movie?with_genres=".concat(targetGenreIds.join())));
    });
};

function destroyData() {
    const heroRow = {
        title: "Best Adventure and Action movies",
        items: createResource(() => fetchGenreMovies([ "adventure", "action" ]))[0],
        type: "Hero",
        height: 800
    };
    return {
        heroRow: heroRow
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
        items: createResource(() => fetchGenreMovies([ "Western" ]))[0],
        type: "Hero",
        height: 720
    });
    rows.push({
        title: "Best Comedy movies",
        items: createResource(() => fetchGenreMovies([ "Comedy" ]))[0],
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
        items: createResource(() => fetchGenreMovies([ "adventure", "action" ]))[0],
        type: "Hero",
        height: 720
    };
    rows.push(heroRow);
    rows.push({
        title: "Best Animations",
        items: createResource(() => fetchGenreMovies("Animation"))[0],
        type: "PosterTitle",
        height: 400
    });
    rows.push({
        title: "Best TV Movie Movies",
        items: createResource(() => fetchGenreMovies("TV Movie"))[0],
        type: "PosterTitle",
        height: 400
    });
    rows.push({
        title: "Best Science Fiction movies",
        items: createResource(() => fetchGenreMovies("Science Fiction"))[0],
        type: "Hero",
        height: 720
    });
    rows.push({
        title: "Best War Movies",
        items: createResource(() => fetchGenreMovies("War"))[0],
        type: "PosterTitle",
        height: 400
    });
    return {
        rows: rows
    };
}

const NotFound = () => (() => {
    var _el$ = createElement("node");
    setProp(_el$, "style", {
        width: 1920,
        height: 1080,
        color: 868483072
    });
    return _el$;
})();

const basePath$1 = "/solid-demo-app/";

const fonts = [ {
    type: "msdf",
    fontFamily: "Roboto",
    atlasDataUrl: basePath$1 + "fonts/Roboto-Regular.msdf.json",
    atlasUrl: basePath$1 + "fonts/Roboto-Regular.msdf.png"
}, {
    type: "msdf",
    fontFamily: "Roboto700",
    atlasDataUrl: basePath$1 + "fonts/Roboto-Bold.msdf.json",
    atlasUrl: basePath$1 + "fonts/Roboto-Bold.msdf.png"
}, {
    type: "msdf",
    fontFamily: "Arial",
    atlasDataUrl: basePath$1 + "fonts/Roboto-Regular.msdf.json",
    atlasUrl: basePath$1 + "fonts/Roboto-Regular.msdf.png"
}, {
    type: "msdf",
    fontFamily: "Raleway",
    atlasDataUrl: basePath$1 + "fonts/Raleway-ExtraBold.msdf.json",
    atlasUrl: basePath$1 + "fonts/Raleway-ExtraBold.msdf.png"
}, {
    fontFamily: "Roboto400",
    fontUrl: basePath$1 + "fonts/Roboto-Regular.ttf"
} ];

let cache = new Map;

function browseProvider(filter) {
    return pageIndex => {
        const url = "/trending/".concat(filter, "/week?page=").concat(pageIndex);
        if (cache.has(url)) {
            return cache.get(url);
        }
        let result = api.get(url).then(trending => {
            let results = trending.results.filter(r => !r.adult);
            let tiles = convertItemsToTiles(results);
            return tiles;
        });
        cache.set(url, result);
        return result;
    };
}

function browsePreload(props2) {
    let lastFilter = null;
    return createMemo(p => {
        const params2 = props2.params;
        if (p && (!params2.filter || lastFilter === params2.filter)) {
            return p;
        }
        const provider = browseProvider(params2.filter || "all");
        provider(1);
        lastFilter = params2.filter || lastFilter;
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
    const parts = (dateString == null ? void 0 : dateString.split("-")) || [];
    return parts[0] || "";
}

function ensureItems(items, minCount) {
    const remainingCount = minCount - items.length;
    if (remainingCount > 0) {
        return items.concat(Array(remainingCount).fill({}));
    }
    return items;
}

function getRecommendations({type: type2, id: id}) {
    return api.get("/".concat(type2, "/").concat(id, "/recommendations")).then(({results: results}) => {
        if (results.length) {
            return ensureItems(convertItemsToTiles(results.slice(0, 7)), 7);
        }
        return api.get("/trending/".concat(type2, "/week?page=1")).then(({results: results2}) => ensureItems(convertItemsToTiles(results2.slice(0, 7)), 7));
    });
}

function getCredits({type: type2, id: id}) {
    return api.get("/".concat(type2, "/").concat(id, "/credits")).then(({cast: cast}) => ensureItems(convertItemsToTiles(cast.slice(0, 7)), 7));
}

function getInfo({type: type2, id: id}) {
    let rt = type2 === "movie" ? {
        rtCrit: 86,
        rtFan: 92
    } : {};
    return api.get("/".concat(type2, "/").concat(id)).then(data => ({
        backgroundImage: getImageUrl(data.backdrop_path, "w1280"),
        heroContent: {
            title: data.title || data.name,
            description: data.overview,
            badges: [ "HD", "CC" ],
            voteAverage: data.vote_average,
            voteCount: data.vote_count,
            metaText: type2 === "movie" ? minutesToHMM(data.runtime) + "   " + formatDate(data.release_date) : "".concat(justYear(data.first_air_date), " - ").concat(justYear(data.last_air_date)),
            reviews: rt
        },
        ...data
    }));
}

function entityPreload({params: params2, intent: intent2}) {
    const [entity] = createResource(() => ({
        ...params2
    }), getInfo);
    if (intent2 === "preload") {
        return;
    }
    const [credits] = createResource(() => ({
        ...params2
    }), getCredits);
    const [recommendations] = createResource(() => ({
        ...params2
    }), getRecommendations);
    return {
        entity: entity,
        credits: credits,
        recommendations: recommendations
    };
}

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
        alpha: alpha,
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
            currentBg.alpha = .01;
            currentBg.animate({
                alpha: 1
            }, animationSettings).start();
        }
        nextBg.animate({
            alpha: .01
        }, animationSettings).start();
        active = active === 1 ? 2 : 1;
    }
    createEffect(on(globalBackground, img => {
        changeBackgrounds(img);
    }, {
        defer: true
    }));
    return createComponent(View, {
        width: 1920,
        height: 1080,
        zIndex: -5,
        get children() {
            return [ createComponent(View, {
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
                height: 1080,
                textureOptions: {
                    enableAlphaChannel: true
                }
            }) ];
        }
    });
}

const styles = {
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
        x: 24,
        $focus: {
            width: 500
        }
    },
    Gradient: {
        zIndex: 99,
        color: 255,
        src: "./assets/sidenav.png",
        alpha: 0,
        width: 200,
        height: 1080,
        textureOptions: {
            enableAlphaChannel: true
        },
        $focus: {
            alpha: 1,
            width: 1600
        },
        transition: {
            alpha: true,
            width: true
        }
    },
    NavButton: {
        zIndex: 102,
        height: 70,
        width: 100,
        borderRadius: 0,
        color: 0,
        $focus: {
            color: theme.primaryLight,
            borderRadius: 8
        },
        $active: {
            width: 328,
            height: 70
        }
    }
};

const basePath = "/solid-demo-app/";

const icons = [ {
    name: "experiment",
    width: 81,
    height: 100,
    x: 0,
    y: 0
}, {
    name: "trending",
    width: 99,
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
} ];

let sprite;

function Icon(props2) {
    sprite = sprite || createSpriteMap(basePath + "assets/icons_white.png", icons);
    return createComponent(View, mergeProps(props2, {
        get texture() {
            return sprite[props2.name];
        },
        get width() {
            return sprite[props2.name].props.w;
        },
        get height() {
            return sprite[props2.name].props.h;
        },
        get x() {
            return (100 - (sprite[props2.name].props.w || 0)) / 2;
        },
        get y() {
            return (100 - (sprite[props2.name].props.h || 0)) / 2;
        }
    }));
}

const NavButtonTextStyles = {
    fontSize: 38,
    x: 116,
    y: 18,
    height: 50,
    alpha: 0,
    color: theme.textPrimary,
    $active: {
        alpha: 1
    }
};

function NavButton(props2) {
    return createComponent(View, mergeProps(props2, {
        forwardStates: true,
        get style() {
            return styles.NavButton;
        },
        get children() {
            return [ createComponent(View, {
                y: -16,
                get children() {
                    return createComponent(Icon, {
                        get color() {
                            return props2.iconColor;
                        },
                        scale: .5,
                        get name() {
                            return props2.icon;
                        }
                    });
                }
            }), createComponent(Text, {
                style: NavButtonTextStyles,
                get children() {
                    return props2.children;
                }
            }) ];
        }
    }));
}

function NavDrawer(props2) {
    let backdrop;
    const navigate = useNavigate();
    function onFocus() {
        backdrop.states.add("$focus");
        this.children.forEach(c => c.states.add("$active"));
        this.children[this.selected || 0].setFocus();
    }
    function onBlur() {
        backdrop.states.remove("$focus");
        this.selected = 0;
        this.children.forEach(c => c.states.remove("$active"));
    }
    function handleNavigate(page) {
        const isOnPage = useMatch(() => page);
        if (isOnPage()) {
            return props2.focusPage();
        }
        navigate(page);
    }
    const selectedButton = createMemo(() => {
        if (useMatch(() => "/browse/all")()) return 366;
        if (useMatch(() => "/browse/movie")()) return 462;
        if (useMatch(() => "/browse/tv")()) return 548;
        if (useMatch(() => "/examples")()) return 638;
        return 366;
    });
    return [ createComponent(View, {
        id: "NavDrawer",
        flexItem: false,
        width: 300,
        height: 150,
        x: 30,
        y: 15,
        zIndex: 105,
        get alpha() {
            return props2.showWidgets ? 1 : 0;
        },
        get children() {
            return [ createComponent(Text, {
                y: 8,
                x: 80,
                fontSize: 28,
                get color() {
                    return theme.textSecondary;
                },
                children: "Built With:"
            }), createComponent(View, {
                y: 10,
                src: "./assets/solidWord.png",
                width: 280,
                height: 52,
                textureOptions: {
                    enableAlphaChannel: true
                }
            }), createComponent(View, {
                x: 0,
                y: 100,
                src: "./assets/tmdb.png",
                width: 80,
                height: 41,
                textureOptions: {
                    enableAlphaChannel: true
                }
            }), createComponent(Text, {
                x: 90,
                y: 104,
                contain: "width",
                width: 160,
                fontSize: 12,
                get color() {
                    return theme.textSecondary;
                },
                children: "This product uses the TMDB API but is not endorsed or certified by TMDB."
            }) ];
        }
    }), createComponent(Column, mergeProps(props2, {
        onFocus: onFocus,
        onBlur: onBlur,
        get style() {
            return styles.Column;
        },
        announce: "Main Menu",
        scroll: "none",
        get children() {
            return [ createComponent(NavButton, {
                onEnter: () => handleNavigate("/browse/all"),
                iconColor: 4294967295,
                announce: [ "Trending Browse", "button" ],
                icon: "trending",
                children: "Trending"
            }), createComponent(NavButton, {
                icon: "movie",
                iconColor: 4294967295,
                announce: [ "Movies Browse", "button" ],
                onEnter: () => handleNavigate("/browse/movie"),
                children: "Movies"
            }), createComponent(NavButton, {
                icon: "tv",
                iconColor: 4294967295,
                announce: [ "TV Browse", "button" ],
                onEnter: () => handleNavigate("/browse/tv"),
                children: "TV"
            }), createComponent(NavButton, {
                icon: "experiment",
                iconColor: 4294967295,
                announce: [ "Examples", "button" ],
                onEnter: () => handleNavigate("/examples"),
                children: "Examples"
            }) ];
        }
    })), createComponent(View, {
        skipFocus: true,
        ref(r$) {
            var _ref$ = backdrop;
            typeof _ref$ === "function" ? _ref$(r$) : backdrop = r$;
        },
        get style() {
            return styles.Gradient;
        }
    }), createComponent(View, {
        width: 4,
        height: 56,
        color: 4294967295,
        x: 22,
        get y() {
            return selectedButton();
        },
        zIndex: 100
    }) ];
}

const LeftNavWrapper = props2 => {
    const navigate = useNavigate();
    const announcer = useAnnouncer();
    announcer.debug = true;
    announcer.enabled = false;
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
    const showOnPaths = [ "/browse", "/entity" ];
    createEffect(() => {
        const currentPath = location.pathname;
        let matchesPartial = showOnPaths.some(path => currentPath.startsWith(path));
        if (currentPath === "/") {
            matchesPartial = true;
        }
        setShowWidgets(matchesPartial);
    });
    const [lastKey, setLastKey] = createSignal("Last key: undefined");
    const [lastError, setLastError] = createSignal();
    const keyPressHandler = e => {
        setLastKey("Last key: ".concat(e.key, ", Code: ").concat(e.keyCode));
    };
    document.addEventListener("keydown", keyPressHandler);
    const displayError = e => {
        setLastError(p => (p || "") + "\n" + e.message);
    };
    document.addEventListener("onerror", displayError);
    const windowSize = "".concat(window.innerWidth, "x").concat(window.innerHeight);
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
        onBack: () => navigate(-1),
        style: {
            width: 1920,
            height: 1080
        },
        onBackspace: focusNavDrawer,
        onLeft: focusNavDrawer,
        onRight: () => navDrawer.states.has("focus") && (lastFocused || pageContainer).setFocus(),
        get children() {
            return [ createComponent(Background, {}), createComponent(FPSCounter, {
                mountX: 1,
                x: 1910,
                y: 10,
                alpha: 1
            }), createComponent(View, {
                mountX: 1,
                display: "flex",
                flexDirection: "column",
                width: 330,
                height: 50,
                x: 1910,
                y: 202,
                color: 255,
                get hidden() {
                    return !showWidgets();
                },
                get children() {
                    return [ createComponent(Text, {
                        x: 8,
                        fontSize: 15,
                        get children() {
                            return [ "Window Size: ", windowSize ];
                        }
                    }), createComponent(Text, {
                        x: 8,
                        fontSize: 15,
                        get children() {
                            return lastKey();
                        }
                    }) ];
                }
            }), createComponent(Text, {
                x: 270,
                y: 20,
                fontSize: 24,
                contain: "width",
                width: 800,
                get children() {
                    return lastError();
                }
            }), createComponent(NavDrawer, {
                ref(r$) {
                    var _ref$2 = navDrawer;
                    typeof _ref$2 === "function" ? _ref$2(r$) : navDrawer = r$;
                },
                focusPage: () => lastFocused.setFocus(),
                get showWidgets() {
                    return showWidgets();
                }
            }), createComponent(View, {
                id: "pageContainer",
                ref(r$) {
                    var _ref$3 = pageContainer;
                    typeof _ref$3 === "function" ? _ref$3(r$) : pageContainer = r$;
                },
                forwardFocus: 0,
                get children() {
                    return props2.children;
                }
            }) ];
        }
    });
};

function calcFactoredRadiusArray(radius, width, height, out = [ 0, 0, 0, 0 ]) {
    [out[0], out[1], out[2], out[3]] = radius;
    const factor = Math.min(width / Math.max(width, radius[0] + radius[1]), width / Math.max(width, radius[2] + radius[3]), height / Math.max(height, radius[0] + radius[3]), height / Math.max(height, radius[1] + radius[2]), 1);
    out[0] *= factor;
    out[1] *= factor;
    out[2] *= factor;
    out[3] *= factor;
    return out;
}

function toValidVec4(value) {
    if (typeof value === "number") {
        return [ value, value, value, value ];
    }
    if (Array.isArray(value)) {
        switch (value.length) {
          default:
          case 4:
            return value;

          case 3:
            return [ value[0], value[1], value[2], value[0] ];

          case 2:
            return [ value[0], value[1], value[0], value[1] ];

          case 1:
            return [ value[0], value[0], value[0], value[0] ];

          case 0:
            break;
        }
    }
    return [ 0, 0, 0, 0 ];
}

const RoundedWithBorderTemplate = {
    props: {
        radius: {
            default: [ 0, 0, 0, 0 ],
            resolve(value) {
                return toValidVec4(value);
            }
        },
        "top-left": {
            default: 0,
            set(value, props2) {
                props2.radius[0] = value;
            },
            get(props2) {
                return props2.radius[0];
            }
        },
        "top-right": {
            default: 0,
            set(value, props2) {
                props2.radius[1] = value;
            },
            get(props2) {
                return props2.radius[1];
            }
        },
        "bottom-right": {
            default: 0,
            set(value, props2) {
                props2.radius[2] = value;
            },
            get(props2) {
                return props2.radius[2];
            }
        },
        "bottom-left": {
            default: 0,
            set(value, props2) {
                props2.radius[3] = value;
            },
            get(props2) {
                return props2.radius[3];
            }
        },
        "border-w": {
            default: [ 0, 0, 0, 0 ],
            resolve(value) {
                return toValidVec4(value);
            }
        },
        "border-color": 4294967295,
        "border-gap": 0,
        "border-gapColor": 0,
        "border-top": {
            default: 0,
            set(value, props2) {
                props2["border-w"][0] = value;
            },
            get(props2) {
                return props2["border-w"][0];
            }
        },
        "border-right": {
            default: 0,
            set(value, props2) {
                props2["border-w"][1] = value;
            },
            get(props2) {
                return props2["border-w"][1];
            }
        },
        "border-bottom": {
            default: 0,
            set(value, props2) {
                props2["border-w"][2] = value;
            },
            get(props2) {
                return props2["border-w"][2];
            }
        },
        "border-left": {
            default: 0,
            set(value, props2) {
                props2["border-w"][3] = value;
            },
            get(props2) {
                return props2["border-w"][3];
            }
        }
    }
};

const RoundedWithBorder = {
    props: RoundedWithBorderTemplate.props,
    update(node) {
        const props2 = this.props;
        const borderWidth = props2["border-w"];
        const borderGap = props2["border-gap"] || 0;
        this.uniformRGBA("u_borderColor", props2["border-color"]);
        this.uniform4fa("u_borderWidth", borderWidth);
        this.uniform1f("u_borderGap", borderGap);
        this.uniformRGBA("u_borderGapColor", props2["border-gapColor"]);
        const origWidth = node.w;
        const origHeight = node.h;
        this.uniform2f("u_dimensions_orig", origWidth, origHeight);
        const expandedWidth = origWidth + borderWidth[3] + borderWidth[1] + borderGap * 2;
        const expandedHeight = origHeight + borderWidth[0] + borderWidth[2] + borderGap * 2;
        this.uniform2f("u_dimensions", expandedWidth, expandedHeight);
        const contentRadius = calcFactoredRadiusArray(this.props.radius, origWidth, origHeight);
        const bTop = borderWidth[0], bRight = borderWidth[1], bBottom = borderWidth[2], bLeft = borderWidth[3];
        const outerRadius = [ Math.max(0, contentRadius[0] + borderGap + Math.max(bTop, bLeft)), Math.max(0, contentRadius[1] + borderGap + Math.max(bTop, bRight)), Math.max(0, contentRadius[2] + borderGap + Math.max(bBottom, bRight)), Math.max(0, contentRadius[3] + borderGap + Math.max(bBottom, bLeft)) ];
        this.uniform4fa("u_radius", calcFactoredRadiusArray(outerRadius, expandedWidth, expandedHeight));
    },
    vertex: "\n    # ifdef GL_FRAGMENT_PRECISION_HIGH\n    precision highp float;\n    # else\n    precision mediump float;\n    # endif\n\n    attribute vec2 a_position;\n    attribute vec2 a_textureCoords;\n    attribute vec4 a_color;\n    attribute vec2 a_nodeCoords;\n\n    uniform vec2 u_resolution;\n    uniform float u_pixelRatio;\n    uniform vec2 u_dimensions;\n    uniform vec2 u_dimensions_orig;\n\n    uniform vec4 u_radius;\n    uniform vec4 u_borderWidth;\n    uniform float u_borderGap;\n\n    varying vec4 v_color;\n    varying vec2 v_textureCoords;\n    varying vec2 v_nodeCoords;\n    varying vec4 v_borderEndRadius;\n    varying vec2 v_borderEndSize;\n\n    varying vec4 v_innerRadius;\n    varying vec2 v_innerSize;\n    varying vec2 v_halfDimensions;\n    varying float v_borderZero;\n\n    void main() {\n      vec2 screenSpace = vec2(2.0 / u_resolution.x, -2.0 / u_resolution.y);\n\n      v_color = a_color;\n      v_nodeCoords = a_nodeCoords;\n\n      float bTop = u_borderWidth.x;\n      float bRight = u_borderWidth.y;\n      float bBottom = u_borderWidth.z;\n      float bLeft = u_borderWidth.w;\n      float gap = u_borderGap;\n\n      // Calculate the offset to expand the quad for border and gap\n      vec2 expansionOffset = vec2(0.0);\n      if (a_nodeCoords.x == 0.0) { // Left edge vertex\n          expansionOffset.x = -(bLeft + gap);\n      } else { // Right edge vertex (a_nodeCoords.x == 1.0)\n          expansionOffset.x = (bRight + gap);\n      }\n      if (a_nodeCoords.y == 0.0) { // Top edge vertex\n          expansionOffset.y = -(bTop + gap);\n      } else { // Bottom edge vertex (a_nodeCoords.y == 1.0)\n          expansionOffset.y = (bBottom + gap);\n      }\n\n      vec2 expanded_a_position = a_position + expansionOffset;\n      vec2 normalized = expanded_a_position * u_pixelRatio;\n\n      // u_dimensions is expanded, u_dimensions_orig is original content size\n      v_textureCoords.x = (a_textureCoords.x * u_dimensions.x - (bLeft + gap)) / u_dimensions_orig.x;\n      v_textureCoords.y = (a_textureCoords.y * u_dimensions.y - (bTop + gap)) / u_dimensions_orig.y;\n\n      v_borderZero = (u_borderWidth.x == 0.0 && u_borderWidth.y == 0.0 && u_borderWidth.z == 0.0 && u_borderWidth.w == 0.0) ? 1.0 : 0.0;\n      // If there's no border, there's no gap from the border logic perspective\n      // The Rounded shader itself would handle radius if borderZero is true.\n      v_halfDimensions = u_dimensions * 0.5; // u_dimensions is now expanded_dimensions\n      if(v_borderZero == 0.0) {\n        // Calculate radius and size for the inner edge of the border (where the gap begins)\n        v_borderEndRadius = vec4(\n          max(0.0, u_radius.x - max(bTop, bLeft) - 0.5),\n          max(0.0, u_radius.y - max(bTop, bRight) - 0.5),\n          max(0.0, u_radius.z - max(bBottom, bRight) - 0.5),\n          max(0.0, u_radius.w - max(bBottom, bLeft) - 0.5)\n        );\n        v_borderEndSize = vec2(\n            (u_dimensions.x - (bLeft + bRight) - 1.0),\n            (u_dimensions.y - (bTop + bBottom) - 1.0)\n        ) * 0.5;\n\n        // Calculate radius and size for the content area (after the gap)\n        v_innerRadius = vec4(\n          max(0.0, u_radius.x - max(bTop, bLeft) - u_borderGap - 0.5),\n          max(0.0, u_radius.y - max(bTop, bRight) - u_borderGap - 0.5),\n          max(0.0, u_radius.z - max(bBottom, bRight) - u_borderGap - 0.5),\n          max(0.0, u_radius.w - max(bBottom, bLeft) - u_borderGap - 0.5)\n        );\n        v_innerSize = vec2(\n            (u_dimensions.x - (bLeft + bRight) - (u_borderGap * 2.0) - 1.0),\n            (u_dimensions.y - (bTop + bBottom) - (u_borderGap * 2.0) - 1.0)\n        ) * 0.5;\n      }\n\n      gl_Position = vec4(normalized.x * screenSpace.x - 1.0, normalized.y * -abs(screenSpace.y) + 1.0, 0.0, 1.0);\n      gl_Position.y = -sign(screenSpace.y) * gl_Position.y;\n    }\n  ",
    fragment: "\n    # ifdef GL_FRAGMENT_PRECISION_HIGH\n    precision highp float;\n    # else\n    precision mediump float;\n    # endif\n\n    uniform vec2 u_resolution;\n    uniform float u_pixelRatio;\n    uniform float u_alpha;\n    uniform vec2 u_dimensions;\n    uniform sampler2D u_texture;\n\n    uniform vec4 u_radius;\n\n    uniform vec4 u_borderWidth;\n    uniform vec4 u_borderColor;\n    uniform vec4 u_borderGapColor;\n\n    varying vec4 v_borderEndRadius;\n    varying vec2 v_borderEndSize;\n\n    varying vec4 v_color;\n    varying vec2 v_textureCoords;\n    varying vec2 v_nodeCoords;\n\n    varying vec2 v_halfDimensions;\n    varying vec4 v_innerRadius;\n    varying vec2 v_innerSize;\n    varying float v_borderZero;\n\n    float roundedBox(vec2 p, vec2 s, vec4 r) {\n      r.xy = (p.x > 0.0) ? r.yz : r.xw;\n      r.x = (p.y > 0.0) ? r.y : r.x;\n      vec2 q = abs(p) - s + r.x;\n      return (min(max(q.x, q.y), 0.0) + length(max(q, 0.0))) - r.x;\n    }\n\n    void main() {\n      vec4 contentTexColor = texture2D(u_texture, v_textureCoords) * v_color;\n\n      vec2 boxUv = v_nodeCoords.xy * u_dimensions - v_halfDimensions;\n      float outerShapeDist = roundedBox(boxUv, v_halfDimensions, u_radius);\n\n      float edgeWidth = 1.0 / u_pixelRatio;\n      float outerShapeAlpha = 1.0 - smoothstep(-0.5 * edgeWidth, 0.5 * edgeWidth, outerShapeDist);\n\n      if(v_borderZero == 1.0) { // No border, effectively no gap from border logic\n        gl_FragColor = mix(vec4(0.0), contentTexColor, outerShapeAlpha) * u_alpha;\n        return;\n      }\n\n      // Adjust boxUv for non-uniform borders\n      vec2 adjustedBoxUv = boxUv;\n      adjustedBoxUv.x += (u_borderWidth.y - u_borderWidth.w) * 0.5;\n      adjustedBoxUv.y += (u_borderWidth.z - u_borderWidth.x) * 0.5;\n\n      // Inner Border Edge (Gap starts here)\n      float borderEndDist = roundedBox(adjustedBoxUv, v_borderEndSize, v_borderEndRadius);\n      float borderEndAlpha = 1.0 - smoothstep(-0.5 * edgeWidth, 0.5 * edgeWidth, borderEndDist);\n\n      // Content Area (Gap ends here)\n      float contentDist = roundedBox(adjustedBoxUv, v_innerSize, v_innerRadius);\n      float contentAlpha = 1.0 - smoothstep(-0.5 * edgeWidth, 0.5 * edgeWidth, contentDist);\n\n      // Calculate Masks for mutually exclusive regions based on priority (Border Top, Gap Middle, Content Bottom)\n      float borderMask = clamp(outerShapeAlpha - borderEndAlpha, 0.0, 1.0);\n      float gapMask = clamp(borderEndAlpha - contentAlpha, 0.0, 1.0);\n\n      // Composite Layers\n      // 1. Content\n      vec4 composite = mix(vec4(0.0), contentTexColor, contentAlpha);\n      // 2. Gap\n      composite = mix(composite, u_borderGapColor, gapMask);\n      // 3. Border\n      composite = mix(composite, u_borderColor, borderMask);\n\n      gl_FragColor = composite * u_alpha;\n    }\n  "
};

const Player = lazy(() => __vitePreload(() => import("./Player-LKGfEHQ1.js"), true ? [] : void 0));

const Grid = lazy(() => __vitePreload(() => import("./Grid-kC411Sz4.js"), true ? [] : void 0));

const Loops = lazy(() => __vitePreload(() => import("./Loops-BqLcpm6x.js"), true ? [] : void 0));

const Infinite = lazy(() => __vitePreload(() => import("./Infinite-wRi_vW8t.js"), true ? [] : void 0));

const TMDBGrid = lazy(() => __vitePreload(() => import("./TMDBGrid-lYOvwZPW.js"), true ? [] : void 0));

const Portal = lazy(() => __vitePreload(() => import("./Portal-CjcIaDUC.js"), true ? [] : void 0));

const MatrixPage = lazy(() => __vitePreload(() => import("./Matrix-Y73RWUmv.js"), true ? [] : void 0));

const TextPage = lazy(() => __vitePreload(() => import("./Text-CBy9hLIu.js"), true ? [] : void 0));

const TextPosterPage = lazy(() => __vitePreload(() => import("./TextPoster-fPXNQ5zx.js"), true ? [] : void 0));

const CreatePage = lazy(() => __vitePreload(() => import("./Create-BY-RSRq9.js"), true ? [] : void 0));

const ViewportPage = lazy(() => __vitePreload(() => import("./Viewport-Cx5pE5_u.js"), true ? [] : void 0));

const PositioningPage = lazy(() => __vitePreload(() => import("./Positioning-DOtCUImx.js"), true ? [] : void 0));

const LayoutPage = lazy(() => __vitePreload(() => import("./Layout-CF-phxT0.js"), true ? [] : void 0));

const FocusBasicsPage = lazy(() => __vitePreload(() => import("./FocusBasics-C9zwhlSw.js"), true ? [] : void 0));

const KeyHandlingPage = lazy(() => __vitePreload(() => import("./KeyHandling-DtXBbl8C.js"), true ? [] : void 0));

const TransitionsPage = lazy(() => __vitePreload(() => import("./Transitions-Cdh3obt3.js"), true ? [] : void 0));

const ComponentsPage = lazy(() => __vitePreload(() => import("./Components-DF2QkBgt.js"), true ? [] : void 0));

const FocusHandlingPage = lazy(() => __vitePreload(() => import("./FocusHandling-C1nJVJED.js"), true ? [] : void 0));

const GradientsPage = lazy(() => __vitePreload(() => import("./Gradients-DbKu1dHU.js"), true ? [] : void 0));

const FlexPage = lazy(() => __vitePreload(() => import("./Flex-DjO6IXCe.js"), true ? [] : void 0));

const FlexGrowPage = lazy(() => __vitePreload(() => import("./FlexGrow-Bu2dSBMG.js"), true ? [] : void 0));

const FlexMenuPage = lazy(() => __vitePreload(() => import("./FlexMenu-BM14-J7m.js"), true ? [] : void 0));

const FlexSizePage = lazy(() => __vitePreload(() => import("./FlexSize-CgHHJuSH.js"), true ? [] : void 0));

const FlexColumnSizePage = lazy(() => __vitePreload(() => import("./FlexColumnSize-BrDSIgfe.js"), true ? [] : void 0));

const FlexColumnPage = lazy(() => __vitePreload(() => import("./FlexColumn-CirFZ38g.js"), true ? [] : void 0));

const ButtonsMaterialPage = lazy(() => __vitePreload(() => import("./ButtonsMaterial-CF3uhZti.js"), true ? [] : void 0));

const SuperFlexPage = lazy(() => __vitePreload(() => import("./SuperFlex-i4SQ1GLY.js"), true ? [] : void 0));

const Entity = lazy(() => __vitePreload(() => import("./Entity-DasZPQ_D.js"), true ? [] : void 0));

const People = lazy(() => __vitePreload(() => import("./People-C8q3RjlE.js"), true ? [] : void 0));

const FireboltPage = lazy(() => __vitePreload(() => import("./Firebolt-BZzG9W0p.js"), true ? [] : void 0));

const LoginPage = lazy(() => __vitePreload(() => import("./Login-TbhPOYWM.js"), true ? [] : void 0));

const VirtualPage = lazy(() => __vitePreload(() => import("./Virtual-CA9nRKeC.js"), true ? [] : void 0));

const TagsPage = lazy(() => __vitePreload(() => import("./Tags-D-bwwZt2.js"), true ? [] : void 0));

const ImagePerformance = lazy(() => __vitePreload(() => import("./ImagePerformance-DSU61pfp.js"), true ? [] : void 0));

const LargeImagePerformance = lazy(() => __vitePreload(() => import("./LargeImagePerformance-DPTI_kzR.js"), true ? [] : void 0));

const MixedImagePerformance = lazy(() => __vitePreload(() => import("./MixedImagePerformance-TixLgIZk.js"), true ? [] : void 0));

const TextureCompressionPerformance = lazy(() => __vitePreload(() => import("./TextureCompressionPerformance-D1LsgkL_.js"), true ? [] : void 0));

let numImageWorkers = 4;

const urlParams = new URLSearchParams(window.location.search);

const numWorkers = urlParams.get("numImageWorkers");

const screenSize = urlParams.get("size") || "default";

const rendererMode = urlParams.get("mode") || "webgl";

const animationsEnabled = urlParams.get("animate") || "true";

if (numWorkers) {
    numImageWorkers = parseInt(numWorkers);
}

const deviceLogicalPixelRatio = {
    720: .666667,
    medium: .8,
    1080: 1,
    "4k": 2,
    default: window.innerHeight / 1080
}[screenSize];

Config.debug = false;

Config.animationsEnabled = animationsEnabled === "true";

Config.simpleAnimationsEnabled = true;

Config.fontSettings.fontFamily = "Roboto";

Config.fontSettings.color = theme.textPrimary;

Config.fontSettings.fontSize = 32;

Config.domRendererEnabled = false;

Config.rendererOptions = {
    fpsUpdateInterval: 1e3,
    inspector: void 0,
    textureMemory: {
        criticalThreshold: 2e8,
        targetThresholdLevel: .8
    },
    numImageWorkers: numImageWorkers,
    deviceLogicalPixelRatio: deviceLogicalPixelRatio,
    devicePhysicalPixelRatio: 1,
    createImageBitmapSupport: "auto",
    boundsMargin: 100,
    targetFPS: 0,
    enableClear: false
};

if (rendererMode === "canvas") {
    Config.rendererOptions.fontEngines = [ CanvasTextRenderer ];
    Config.rendererOptions.renderEngine = CanvasRenderer;
} else {
    Config.rendererOptions.fontEngines = [ SdfTextRenderer ];
    Config.rendererOptions.renderEngine = WebGlRenderer;
}

const {renderer: renderer, render: render} = createRenderer();

loadFonts(fonts);

const shManager = renderer.stage.shManager;

shManager.registerShaderType("rounded", Rounded);

shManager.registerShaderType("roundedWithBorder", RoundedWithBorder);

shManager.registerShaderType("roundedWithShadow", RoundedWithShadow);

shManager.registerShaderType("roundedWithBorderWithShadow", RoundedWithBorderAndShadow);

shManager.registerShaderType("radialGradient", RadialGradient);

shManager.registerShaderType("linearGradient", LinearGradient);

shManager.registerShaderType("holePunch", HolePunch);

render(() => createComponent(FocusStackProvider, {
    get children() {
        return createComponent(HashRouter, {
            root: props2 => createComponent(App, props2),
            get children() {
                return [ createComponent(Route, {
                    path: "",
                    component: LeftNavWrapper,
                    get children() {
                        return [ createComponent(Route, {
                            path: "",
                            component: () => createComponent(Navigate, {
                                href: "/browse/all"
                            })
                        }), createComponent(Route, {
                            path: "examples",
                            component: Portal,
                            get children() {
                                return [ createComponent(Route, {
                                    path: "/"
                                }), createComponent(Route, {
                                    path: "tmdb",
                                    component: TMDB,
                                    preload: tmdbData
                                }) ];
                            }
                        }), createComponent(KeepAliveRoute, {
                            id: "browse",
                            path: "browse/:filter",
                            component: Browse,
                            preload: browsePreload
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
                            path: "virtual",
                            component: VirtualPage,
                            preload: tmdbData
                        }), createComponent(Route, {
                            path: "destroy",
                            component: Destroy,
                            preload: destroyData
                        }), createComponent(Route, {
                            path: "grid",
                            component: Grid
                        }), createComponent(Route, {
                            path: "matrix",
                            component: MatrixPage
                        }), createComponent(Route, {
                            path: "text",
                            component: TextPage
                        }), createComponent(Route, {
                            path: "firebolt",
                            component: FireboltPage
                        }), createComponent(Route, {
                            path: "login",
                            component: LoginPage
                        }), createComponent(Route, {
                            path: "nested",
                            get component() {
                                return lazy(() => __vitePreload(() => import("./Nested-DqxqTr1N.js"), true ? [] : void 0));
                            }
                        }), createComponent(Route, {
                            path: "textposter",
                            component: TextPosterPage
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
                            path: "flexmenu",
                            component: FlexMenuPage
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
                            path: "keepalive",
                            get component() {
                                return lazy(() => __vitePreload(() => import("./KeepAlive-BYaLLlvF.js"), true ? [] : void 0));
                            }
                        }), createComponent(Route, {
                            path: "suspense",
                            get component() {
                                return lazy(() => __vitePreload(() => import("./suspense-ZW0DTmIg.js"), true ? [] : void 0));
                            }
                        }), createComponent(Route, {
                            path: "superflex",
                            component: SuperFlexPage
                        }), createComponent(Route, {
                            path: "tags",
                            component: TagsPage
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
                            path: "image-performance",
                            component: ImagePerformance
                        }), createComponent(Route, {
                            path: "large-image-performance",
                            component: LargeImagePerformance
                        }), createComponent(Route, {
                            path: "mixed-image-performance",
                            component: MixedImagePerformance
                        }), createComponent(Route, {
                            path: "texture-compression-performance",
                            component: TextureCompressionPerformance
                        }), createComponent(Route, {
                            path: "*all",
                            component: NotFound
                        }) ];
                    }
                }), createComponent(Route, {
                    path: "player",
                    get children() {
                        return createComponent(Route, {
                            path: ":id",
                            component: Player
                        });
                    }
                }) ];
            }
        });
    }
}));

export { chainFunctions as $, Announcer as A, memo as B, Column as C, styles$1 as D, ElementNode as E, For as F, assertTruthy as G, combineStyles as H, Index as I, onCleanup as J, Block as K, LazyRow as L, untrack as M, createRoot as N, Dynamic as O, Poster as P, Button as Q, Row as R, Show as S, Text as T, MaterialButtonText as U, View as V, TileRow as W, api as X, getImageUrl as Y, convertItemsToTiles as Z, useParams as _, __vite_legacy_guard, createSignal as a, Switch as a0, Match as a1, LazyColumn as a2, TitleRow as a3, setProp as a4, rootNode as a5, effect as a6, insertNode as a7, getOwner as a8, Config as a9, Suspense as aa, createTextNode as ab, createResource as b, createComponent as c, createComputed as d, batch as e, createSelector as f, createEffect as g, hexColor as h, on as i, List as j, createMemo as k, createElement as l, mergeProps as m, chainRefs as n, onMount as o, use as p, spread as q, insert as r, setGlobalBackground as s, theme as t, useNavigate as u, debounce as v, activeElement as w, ContentBlock as x, useFocusStack as y, children as z };
