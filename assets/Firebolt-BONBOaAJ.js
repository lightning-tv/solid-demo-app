import { c as createSignal, s as setGlobalBackground, f as createEffect, h as createComponent, V as View, T as Text, R as Row } from "./index-B9eBRlnz.js";
const win$3 = typeof window !== "undefined" ? window : {};
let listener;
const setMockListener = (func) => {
  listener = func;
};
let mock$1;
const pending = [];
const eventMap = {};
let callback;
let testHarness;
if (win$3.__firebolt && win$3.__firebolt.testHarness) {
  testHarness = win$3.__firebolt.testHarness;
}
function send(message) {
  console.debug("Sending message to transport: " + message);
  let json = JSON.parse(message);
  if (Array.isArray(json)) {
    json.forEach((j) => send(JSON.stringify(j)));
    return;
  }
  let [module, method] = json.method.split(".");
  if (testHarness && testHarness.onSend) {
    testHarness.onSend(module, method, json.params, json.id);
  }
  if (method.match(/^on[A-Z]/)) {
    if (json.params.listen) {
      eventMap[json.id] = module.toLowerCase() + "." + method[2].toLowerCase() + method.substr(3);
    } else {
      Object.keys(eventMap).forEach((key) => {
        if (eventMap[key] === module.toLowerCase() + "." + method[2].toLowerCase() + method.substr(3)) {
          delete eventMap[key];
        }
      });
    }
  }
  if (mock$1) handle(json);
  else pending.push(json);
}
function handle(json) {
  let result;
  try {
    result = getResult(json.method, json.params);
  } catch (error) {
    setTimeout(
      () => callback(
        JSON.stringify({
          jsonrpc: "2.0",
          error: {
            code: -32602,
            message: "Invalid params (this is a mock error from the mock transport layer)"
          },
          id: json.id
        })
      )
    );
  }
  setTimeout(
    () => callback(
      JSON.stringify({
        jsonrpc: "2.0",
        result,
        id: json.id
      })
    )
  );
}
function receive(_callback) {
  callback = _callback;
  if (testHarness && typeof testHarness.initialize === "function") {
    testHarness.initialize({
      emit: event,
      listen: function(...args) {
        listener(...args);
      }
    });
  }
}
function event(module, event2, value) {
  const listener2 = Object.entries(eventMap).find(
    ([k, v]) => v.toLowerCase() === module.toLowerCase() + "." + event2.toLowerCase()
  );
  if (listener2) {
    let message = JSON.stringify({
      jsonrpc: "2.0",
      id: parseInt(listener2[0]),
      result: value
    });
    callback(message);
  }
}
function dotGrab$1(obj = {}, key) {
  const keys2 = key.split(".");
  let ref = obj;
  for (let i = 0; i < keys2.length; i++) {
    ref = (Object.entries(ref).find(
      ([k, v]) => k.toLowerCase() === keys2[i].toLowerCase()
    ) || [null, {}])[1];
  }
  return ref;
}
function getResult(method, params) {
  let api = dotGrab$1(mock$1, method);
  if (method.match(/^[a-zA-Z]+\.on[A-Za-z]+$/)) {
    api = {
      event: method,
      listening: true
    };
  }
  if (typeof api === "function") {
    return params == null ? api() : api(params);
  } else return api;
}
function setMockResponses(m) {
  mock$1 = m;
  pending.forEach((json) => handle(json));
  pending.length = 0;
}
const mock$2 = {
  send,
  receive,
  event
};
function router(params, callbackOrValue, contextParameterCount) {
  const numArgs = params ? Object.values(params).length : 0;
  if (numArgs === contextParameterCount && callbackOrValue === void 0) {
    return "getter";
  } else if (numArgs === contextParameterCount && typeof callbackOrValue === "function") {
    return "subscriber";
  } else if (numArgs === 0 && typeof callbackOrValue === "function") {
    return "subscriber";
  } else if (numArgs === contextParameterCount && callbackOrValue !== void 0) {
    return "setter";
  }
  return null;
}
const mocks = {};
function mock(module, method, params, value, contextParameterCount, def) {
  const type2 = router(params, value, contextParameterCount);
  const hash = contextParameterCount ? "." + Object.keys(params).filter((key2) => key2 !== "value").map((key2) => params[key2]).join(".") : "";
  const key = "".concat(module, ".").concat(method).concat(hash);
  if (type2 === "getter") {
    const value2 = mocks.hasOwnProperty(key) ? mocks[key] : def;
    return value2;
  } else if (type2 === "subscriber") ;
  else if (type2 === "setter") {
    mocks[key] = value;
    mock$2.event(module, "".concat(method, "Changed"), { value });
    return null;
  }
}
const MockProps = {
  mock
};
const _Accessibility = {
  closedCaptions: {
    enabled: true,
    styles: {
      fontFamily: "monospaced_sanserif",
      fontSize: 1,
      fontColor: 4294967295,
      fontEdge: "none",
      fontEdgeColor: 2139062271,
      fontOpacity: 100,
      backgroundColor: 255,
      backgroundOpacity: 100,
      textAlign: "center",
      textAlignVertical: "middle",
      windowColor: "white",
      windowOpacity: 50
    },
    preferredLanguages: ["eng", "spa"]
  },
  closedCaptionsSettings: function(params) {
    return MockProps.mock(
      "Accessibility",
      "closedCaptionsSettings",
      params,
      void 0,
      0,
      {
        enabled: true,
        styles: {
          fontFamily: "monospaced_sanserif",
          fontSize: 1,
          fontColor: 4294967295,
          fontEdge: "none",
          fontEdgeColor: 2139062271,
          fontOpacity: 100,
          backgroundColor: 255,
          backgroundOpacity: 100,
          textAlign: "center",
          textAlignVertical: "middle",
          windowColor: "white",
          windowOpacity: 50
        },
        preferredLanguages: ["eng", "spa"]
      }
    );
  },
  voiceGuidance: { enabled: true, speed: 2 },
  voiceGuidanceSettings: function(params) {
    return MockProps.mock(
      "Accessibility",
      "voiceGuidanceSettings",
      params,
      void 0,
      0,
      { enabled: true, speed: 2 }
    );
  },
  audioDescriptionSettings: function(params) {
    return MockProps.mock(
      "Accessibility",
      "audioDescriptionSettings",
      params,
      void 0,
      0,
      { enabled: true }
    );
  }
};
const _Account = {
  id: function(params) {
    return MockProps.mock("Account", "id", params, void 0, 0, "123");
  },
  uid: function(params) {
    return MockProps.mock(
      "Account",
      "uid",
      params,
      void 0,
      0,
      "ee6723b8-7ab3-462c-8d93-dbf61227998e"
    );
  }
};
const _Advertising = {
  config: {
    adServerUrl: "https://demo.v.fwmrm.net/ad/p/1",
    adServerUrlTemplate: "https://demo.v.fwmrm.net/ad/p/1?flag=+sltp+exvt+slcb+emcr+amcb+aeti&prof=12345:caf_allinone_profile &nw=12345&mode=live&vdur=123&caid=a110523018&asnw=372464&csid=gmott_ios_tablet_watch_live_ESPNU&ssnw=372464&vip=198.205.92.1&resp=vmap1&metr=1031&pvrn=12345&vprn=12345&vcid=1X0Ce7L3xRWlTeNhc7br8Q%3D%3D",
    adNetworkId: "519178",
    adProfileId: "12345:caf_allinone_profile",
    adSiteSectionId: "caf_allinone_profile_section",
    adOptOut: true,
    privacyData: "ew0KICAicGR0IjogImdkcDp2MSIsDQogICJ1c19wcml2YWN5IjogIjEtTi0iLA0KICAibG10IjogIjEiIA0KfQ0K",
    ifaValue: "01234567-89AB-CDEF-GH01-23456789ABCD",
    ifa: "ewogICJ2YWx1ZSI6ICIwMTIzNDU2Ny04OUFCLUNERUYtR0gwMS0yMzQ1Njc4OUFCQ0QiLAogICJpZmFfdHlwZSI6ICJzc3BpZCIsCiAgImxtdCI6ICIwIgp9Cg==",
    appName: "FutureToday",
    appBundleId: "FutureToday.comcast",
    distributorAppId: "1001",
    deviceAdAttributes: "ewogICJib0F0dHJpYnV0ZXNGb3JSZXZTaGFyZUlkIjogIjEyMzQiCn0=",
    coppa: 0,
    authenticationEntity: "60f72475281cfba3852413bd53e957f6"
  },
  policy: function(params) {
    return MockProps.mock("Advertising", "policy", params, void 0, 0, {
      skipRestriction: "adsUnwatched",
      limitAdTracking: false
    });
  },
  advertisingId: {
    ifa: "01234567-89AB-CDEF-GH01-23456789ABCD",
    ifa_type: "sspid",
    lmt: "0"
  },
  deviceAttributes: {},
  appBundleId: "app.operator"
};
const _Authentication = {
  token: {
    value: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
    expires: "2022-04-23T18:25:43.511Z",
    type: "platform"
  },
  device: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  session: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  root: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
};
const _Capabilities = {
  supported: true,
  available: true,
  permitted: true,
  granted: true,
  info: [
    {
      capability: "xrn:firebolt:capability:device:model",
      supported: true,
      available: true,
      use: { permitted: true, granted: true },
      manage: { permitted: true, granted: true },
      provide: { permitted: true, granted: true }
    },
    {
      capability: "xrn:firebolt:capability:input:keyboard",
      supported: true,
      available: true,
      use: { permitted: true, granted: true },
      manage: { permitted: true, granted: true },
      provide: { permitted: true, granted: true }
    },
    {
      capability: "xrn:firebolt:capability:protocol:bluetoothle",
      supported: false,
      available: false,
      use: { permitted: true, granted: true },
      manage: { permitted: true, granted: true },
      provide: { permitted: true, granted: true },
      details: ["unsupported"]
    },
    {
      capability: "xrn:firebolt:capability:token:device",
      supported: true,
      available: true,
      use: { permitted: true, granted: true },
      manage: { permitted: true, granted: true },
      provide: { permitted: true, granted: true }
    },
    {
      capability: "xrn:firebolt:capability:token:platform",
      supported: true,
      available: false,
      use: { permitted: true, granted: true },
      manage: { permitted: true, granted: true },
      provide: { permitted: true, granted: true },
      details: ["unavailable"]
    },
    {
      capability: "xrn:firebolt:capability:protocol:moca",
      supported: true,
      available: false,
      use: { permitted: true, granted: true },
      manage: { permitted: true, granted: true },
      provide: { permitted: true, granted: true },
      details: ["disabled", "unavailable"]
    },
    {
      capability: "xrn:firebolt:capability:wifi:scan",
      supported: true,
      available: true,
      use: { permitted: true, granted: true },
      manage: { permitted: true, granted: true },
      provide: { permitted: true, granted: true },
      details: ["unpermitted"]
    },
    {
      capability: "xrn:firebolt:capability:localization:postal-code",
      supported: true,
      available: true,
      use: { permitted: true, granted: null },
      manage: { permitted: true, granted: true },
      provide: { permitted: true, granted: true },
      details: ["ungranted"]
    },
    {
      capability: "xrn:firebolt:capability:localization:postal-code",
      supported: true,
      available: true,
      use: { permitted: true, granted: true },
      manage: { permitted: true, granted: true },
      provide: { permitted: true, granted: true },
      details: ["ungranted"]
    },
    {
      capability: "xrn:firebolt:capability:localization:locality",
      supported: true,
      available: true,
      use: { permitted: true, granted: true },
      manage: { permitted: true, granted: true },
      provide: { permitted: true, granted: true },
      details: ["grantDenied", "ungranted"]
    }
  ],
  request: [
    {
      capability: "xrn:firebolt:capability:commerce:purchase",
      supported: true,
      available: true,
      use: { permitted: true, granted: true },
      manage: { permitted: true, granted: true },
      provide: { permitted: true, granted: true }
    }
  ]
};
const _Device = {
  id: function(params) {
    return MockProps.mock("Device", "id", params, void 0, 0, "123");
  },
  distributor: function(params) {
    return MockProps.mock(
      "Device",
      "distributor",
      params,
      void 0,
      0,
      "Company"
    );
  },
  platform: function(params) {
    return MockProps.mock("Device", "platform", params, void 0, 0, "WPE");
  },
  uid: function(params) {
    return MockProps.mock(
      "Device",
      "uid",
      params,
      void 0,
      0,
      "ee6723b8-7ab3-462c-8d93-dbf61227998e"
    );
  },
  type: function(params) {
    return MockProps.mock("Device", "type", params, void 0, 0, "STB");
  },
  model: function(params) {
    return MockProps.mock("Device", "model", params, void 0, 0, "xi6");
  },
  sku: function(params) {
    return MockProps.mock("Device", "sku", params, void 0, 0, "AX061AEI");
  },
  make: function(params) {
    return MockProps.mock("Device", "make", params, void 0, 0, "Arris");
  },
  version: function(params) {
    return MockProps.mock("Device", "version", params, void 0, 0, {
      sdk: { major: 0, minor: 8, patch: 0, readable: "Firebolt JS SDK v0.8.0" },
      api: { major: 0, minor: 8, patch: 0, readable: "Firebolt API v0.8.0" },
      firmware: {
        major: 1,
        minor: 2,
        patch: 3,
        readable: "Device Firmware v1.2.3"
      },
      os: { major: 0, minor: 1, patch: 0, readable: "Firebolt OS v0.1.0" },
      debug: "Non-parsable build info for error logging only."
    });
  },
  hdcp: function(params) {
    return MockProps.mock("Device", "hdcp", params, void 0, 0, {
      "hdcp1.4": true,
      "hdcp2.2": true
    });
  },
  hdr: function(params) {
    return MockProps.mock("Device", "hdr", params, void 0, 0, {
      hdr10: true,
      hdr10Plus: true,
      dolbyVision: true,
      hlg: true
    });
  },
  audio: function(params) {
    return MockProps.mock("Device", "audio", params, void 0, 0, {
      stereo: true,
      "dolbyDigital5.1": true,
      "dolbyDigital5.1+": true,
      dolbyAtmos: true
    });
  },
  screenResolution: function(params) {
    return MockProps.mock(
      "Device",
      "screenResolution",
      params,
      void 0,
      0,
      [1920, 1080]
    );
  },
  videoResolution: function(params) {
    return MockProps.mock(
      "Device",
      "videoResolution",
      params,
      void 0,
      0,
      [1920, 1080]
    );
  },
  name: function(params) {
    return MockProps.mock("Device", "name", params, void 0, 0, "Living Room");
  },
  network: function(params) {
    return MockProps.mock("Device", "network", params, void 0, 0, {
      state: "connected",
      type: "wifi"
    });
  }
};
const _Discovery = {
  policy: function(params) {
    return MockProps.mock("Discovery", "policy", params, void 0, 0, {
      enableRecommendations: true,
      shareWatchHistory: true,
      rememberWatchedPrograms: true
    });
  },
  entityInfo: true,
  purchasedContent: true,
  watched: true,
  watchNext: true,
  entitlements: true,
  contentAccess: null,
  clearContentAccess: null,
  launch: true,
  signIn: true,
  signOut: true,
  userInterest: null,
  userInterestResponse: null,
  userInterestError: null
};
const _Keyboard = {
  email: "user@domain.com",
  password: "abc123",
  standard: "Living Room"
};
let inactive = { state: "inactive", previous: "initializing" };
let foreground = { state: "foreground", previous: "inactive" };
let unloading = { state: "unloading", previous: "inactive" };
const emit$1 = (value) => {
  mock$2.event("Lifecycle", value.state, value);
};
const win$2 = typeof window !== "undefined" ? window : {};
const automation = win$2.__firebolt ? !!win$2.__firebolt.automation : false;
const _Lifecycle = {
  ready: function() {
    inactive.previous = "initializing";
    setTimeout(() => emit$1(inactive), automation ? 1 : 500);
    foreground.previous = "inactive";
    setTimeout(() => emit$1(foreground), automation ? 2 : 1e3);
  },
  close: function(params) {
    let reason = params.reason;
    if (reason === "remoteButton") {
      inactive.previous = "foreground";
      setTimeout(() => emit$1(inactive), automation ? 1 : 500);
    } else if (["userExit", "error"].includes(reason)) {
      inactive.previous = "foreground";
      unloading.previous = "inactive";
      setTimeout(() => emit$1(inactive), automation ? 1 : 500);
      setTimeout(() => emit$1(unloading), automation ? 2 : 1e3);
    } else {
      throw "Invalid close reason";
    }
  },
  finished: function() {
    if (win$2.location) win$2.location.href = "about:blank";
  }
};
const _Localization = {
  locality: function(params) {
    return MockProps.mock(
      "Localization",
      "locality",
      params,
      void 0,
      0,
      "Philadelphia"
    );
  },
  postalCode: function(params) {
    return MockProps.mock(
      "Localization",
      "postalCode",
      params,
      void 0,
      0,
      "19103"
    );
  },
  countryCode: function(params) {
    return MockProps.mock(
      "Localization",
      "countryCode",
      params,
      void 0,
      0,
      "US"
    );
  },
  language: function(params) {
    return MockProps.mock(
      "Localization",
      "language",
      params,
      void 0,
      0,
      "en"
    );
  },
  preferredAudioLanguages: function(params) {
    return MockProps.mock(
      "Localization",
      "preferredAudioLanguages",
      params,
      void 0,
      0,
      ["spa", "eng"]
    );
  },
  locale: function(params) {
    return MockProps.mock(
      "Localization",
      "locale",
      params,
      void 0,
      0,
      "en-US"
    );
  },
  latlon: [39.9549, 75.1699],
  additionalInfo: {}
};
const _Metrics = {
  ready: true,
  signIn: true,
  signOut: true,
  startContent: true,
  stopContent: true,
  page: true,
  action: true,
  error: true,
  mediaLoadStart: true,
  mediaPlay: true,
  mediaPlaying: true,
  mediaPause: true,
  mediaWaiting: true,
  mediaProgress: true,
  mediaSeeking: true,
  mediaSeeked: true,
  mediaRateChange: true,
  mediaRenditionChange: true,
  mediaEnded: true,
  appInfo: null
};
const _Parameters = {
  initialization: {
    lmt: 0,
    us_privacy: "1-Y-",
    discovery: {
      navigateTo: {
        action: "entity",
        data: { entityId: "abc", entityType: "program", programType: "movie" },
        context: { source: "voice" }
      }
    }
  }
};
const _Profile = {
  approveContentRating: false,
  approvePurchase: false,
  flags: { userExperience: "1000" }
};
const _SecondScreen = {
  protocols: { "dial1.7": true },
  device: "device-id",
  friendlyName: function(params) {
    return MockProps.mock(
      "SecondScreen",
      "friendlyName",
      params,
      void 0,
      0,
      "Living Room"
    );
  }
};
const _SecureStorage = {
  get: "VGhpcyBub3QgYSByZWFsIHRva2VuLgo=",
  set: null,
  remove: null,
  clear: null
};
const _Platform = {
  localization: _Localization,
  device: _Device,
  accessibility: _Accessibility
};
class Queue {
  constructor() {
    this._callback = null;
    this._queue = [];
  }
  send(json) {
    this._queue.push(json);
  }
  receive(_callback) {
    this._callback = _callback;
  }
  flush(transport) {
    transport.receive(this._callback);
    this._queue.forEach((item) => transport.send(item));
  }
}
const settings = {};
const subscribers = {};
const initSettings = (appSettings, platformSettings) => {
  settings["app"] = appSettings;
  settings["platform"] = {
    logLevel: "WARN",
    ...platformSettings
  };
  settings["user"] = {};
};
const publish = (key, value) => {
  subscribers[key] && subscribers[key].forEach((subscriber) => subscriber(value));
};
const dotGrab = (obj = {}, key) => {
  const keys2 = key.split(".");
  for (let i = 0; i < keys2.length; i++) {
    obj = obj[keys2[i]] = obj[keys2[i]] !== void 0 ? obj[keys2[i]] : {};
  }
  return typeof obj === "object" ? Object.keys(obj).length ? obj : void 0 : obj;
};
const Settings = {
  get(type2, key, fallback = void 0) {
    const val = dotGrab(settings[type2], key);
    return val !== void 0 ? val : fallback;
  },
  has(type2, key) {
    return !!this.get(type2, key);
  },
  set(key, value) {
    settings["user"][key] = value;
    publish(key, value);
  },
  subscribe(key, callback2) {
    subscribers[key] = subscribers[key] || [];
    subscribers[key].push(callback2);
  },
  unsubscribe(key, callback2) {
    if (callback2) {
      const index = subscribers[key] && subscribers[key].findIndex((cb) => cb === callback2);
      index > -1 && subscribers[key].splice(index, 1);
    } else {
      if (key in subscribers) {
        subscribers[key] = [];
      }
    }
  },
  clearSubscribers() {
    for (const key of Object.getOwnPropertyNames(subscribers)) {
      delete subscribers[key];
    }
  },
  setLogLevel(logLevel) {
    settings.platform.logLevel = logLevel;
  },
  getLogLevel() {
    return settings.platform.logLevel;
  }
};
const win$1 = typeof window !== "undefined" ? window : {};
class LegacyTransport {
  constructor(bridge) {
    this.bridge = bridge;
  }
  send(msg) {
    this.bridge.JSMessageChanged(msg, () => {
    });
  }
  receive(callback2) {
    win$1.$badger = win$1.$badger || {};
    const badgerCallback = win$1.$badger.callback ? win$1.$badger.callback.bind(win$1.$badger) : null;
    const badgerEvent = win$1.$badger.event ? win$1.$badger.event.bind(win$1.$badger) : null;
    win$1.$badger.callback = (pid, success, json) => {
      if (json.jsonrpc) {
        callback2(JSON.stringify(json));
      } else if (badgerCallback) {
        badgerCallback(pid, success, json);
      }
    };
    win$1.$badger.event = (handlerId, json) => {
      if (json.jsonrpc) {
        callback2(JSON.stringify(json));
      } else if (badgerEvent) {
        badgerEvent(handlerId, json);
      }
    };
  }
  static isLegacy(transport) {
    return LegacyTransport.isXREProxy(transport) || transport.send === void 0 && transport.JSMessageChanged;
  }
  static isXREProxy(transport) {
    return transport.proxyObjectTest !== void 0;
  }
}
const MAX_QUEUED_MESSAGES = 100;
class WebsocketTransport {
  constructor(endpoint) {
    this._endpoint = endpoint;
    this._ws = null;
    this._connected = false;
    this._queue = [];
    this._callbacks = [];
  }
  send(msg) {
    this._connect();
    if (this._connected) {
      this._ws.send(msg);
    } else {
      if (this._queue.length < MAX_QUEUED_MESSAGES) {
        this._queue.push(msg);
      }
    }
  }
  receive(callback2) {
    if (!callback2) return;
    this._connect();
    this._callbacks.push(callback2);
  }
  _notifyCallbacks(message) {
    for (let i = 0; i < this._callbacks.length; i++) {
      setTimeout(() => this._callbacks[i](message), 1);
    }
  }
  _connect() {
    if (this._ws) return;
    this._ws = new WebSocket(this._endpoint, ["jsonrpc"]);
    this._ws.addEventListener("message", (message) => {
      this._notifyCallbacks(message.data);
    });
    this._ws.addEventListener("error", (message) => {
    });
    this._ws.addEventListener("close", (message) => {
      this._ws = null;
      this._connected = false;
    });
    this._ws.addEventListener("open", (message) => {
      this._connected = true;
      for (let i = 0; i < this._queue.length; i++) {
        this._ws.send(this._queue[i]);
      }
      this._queue = [];
    });
  }
}
function transform(result, transforms) {
  if (!transforms || !transforms.methods) {
    return result;
  }
  const { methods } = transforms;
  const transformed = JSON.parse(JSON.stringify(result));
  Object.keys(methods).forEach((key) => {
    const method_info = methods[key];
    const rpc_method = method_info["x-method"];
    const [module, method] = rpc_method.split(".");
    const params = {};
    params[method_info["x-this-param"]] = transformed;
    transformed[key] = (...args) => {
      for (var i = 0; i < args.length; i++) {
        params[method_info["x-additional-params"][i]] = args[i];
      }
      return Transport.send(module.toLowerCase(), method, params);
    };
  });
  return transformed;
}
const Results = {
  transform
};
const LEGACY_TRANSPORT_SERVICE_NAME = "com.comcast.BridgeObject_1";
let moduleInstance = null;
const isEventSuccess = (x) => x && typeof x.event === "string" && typeof x.listening === "boolean";
const win = typeof window !== "undefined" ? window : {};
class Transport {
  constructor() {
    this._promises = [];
    this._transport = null;
    this._id = 1;
    this._eventEmitters = [];
    this._eventIds = [];
    this._queue = new Queue();
    this._deprecated = {};
    this.isMock = false;
  }
  static addEventEmitter(emitter) {
    Transport.get()._eventEmitters.push(emitter);
  }
  static registerDeprecatedMethod(module, method, alternative) {
    Transport.get()._deprecated[module.toLowerCase() + "." + method.toLowerCase()] = {
      alternative: alternative || ""
    };
  }
  _endpoint() {
    if (win.__firebolt && win.__firebolt.endpoint) {
      return win.__firebolt.endpoint;
    }
    return null;
  }
  constructTransportLayer() {
    let transport;
    const endpoint = this._endpoint();
    if (endpoint && (endpoint.startsWith("ws://") || endpoint.startsWith("wss://"))) {
      transport = new WebsocketTransport(endpoint);
      transport.receive(this.receiveHandler.bind(this));
    } else if (typeof win.ServiceManager !== "undefined" && win.ServiceManager && win.ServiceManager.version) {
      transport = this._queue;
      win.ServiceManager.getServiceForJavaScript(
        LEGACY_TRANSPORT_SERVICE_NAME,
        (service) => {
          if (LegacyTransport.isLegacy(service)) {
            transport = new LegacyTransport(service);
          } else {
            transport = service;
          }
          this.setTransportLayer(transport);
        }
      );
    } else {
      this.isMock = true;
      transport = mock$2;
      transport.receive(this.receiveHandler.bind(this));
    }
    return transport;
  }
  setTransportLayer(tl) {
    this._transport = tl;
    this._queue.flush(tl);
  }
  static send(module, method, params, transforms) {
    return Transport.get()._send(module, method, params, transforms);
  }
  static listen(module, method, params, transforms) {
    return Transport.get()._sendAndGetId(module, method, params, transforms);
  }
  _send(module, method, params, transforms) {
    if (Array.isArray(module) && !method && !params) {
      return this._batch(module);
    } else {
      return this._sendAndGetId(module, method, params, transforms).promise;
    }
  }
  _sendAndGetId(module, method, params, transforms) {
    const { promise, json, id: id2 } = this._processRequest(
      module,
      method,
      params,
      transforms
    );
    const msg = JSON.stringify(json);
    if (Settings.getLogLevel() === "DEBUG") {
      console.debug("Sending message to transport: " + msg);
    }
    this._transport.send(msg);
    return { id: id2, promise };
  }
  _batch(requests) {
    const results = [];
    const json = [];
    requests.forEach(({ module, method, params, transforms }) => {
      const result = this._processRequest(module, method, params, transforms);
      results.push({
        promise: result.promise,
        id: result.id
      });
      json.push(result.json);
    });
    const msg = JSON.stringify(json);
    if (Settings.getLogLevel() === "DEBUG") {
      console.debug("Sending message to transport: " + msg);
    }
    this._transport.send(msg);
    return results;
  }
  _processRequest(module, method, params, transforms) {
    const p = this._addPromiseToQueue(module, method, params, transforms);
    const json = this._createRequestJSON(module, method, params);
    const result = {
      promise: p,
      json,
      id: this._id
    };
    this._id++;
    return result;
  }
  _createRequestJSON(module, method, params) {
    return {
      jsonrpc: "2.0",
      method: module.toLowerCase() + "." + method,
      params,
      id: this._id
    };
  }
  _addPromiseToQueue(module, method, params, transforms) {
    return new Promise((resolve, reject) => {
      this._promises[this._id] = {};
      this._promises[this._id].promise = this;
      this._promises[this._id].resolve = resolve;
      this._promises[this._id].reject = reject;
      this._promises[this._id].transforms = transforms;
      const deprecated = this._deprecated[module.toLowerCase() + "." + method.toLowerCase()];
      if (deprecated) {
        console.warn(
          "WARNING: ".concat(module, ".").concat(method, "() is deprecated. ") + deprecated.alternative
        );
      }
      if (method.match(/^on[A-Z]/)) {
        if (params.listen) {
          this._eventIds.push(this._id);
        } else {
          this._eventIds = this._eventIds.filter((id2) => id2 !== this._id);
        }
      }
    });
  }
  /**
   * If we have a global transport, use that. Otherwise, use the module-scoped transport instance.
   * @returns {Transport}
   */
  static get() {
    win.__firebolt = win.__firebolt || {};
    if (win.__firebolt.transport == null && moduleInstance == null) {
      const transport = new Transport();
      transport.init();
      if (transport.isMock) {
        moduleInstance = transport;
      } else {
        win.__firebolt = win.__firebolt || {};
        win.__firebolt.transport = transport;
      }
      win.__firebolt.setTransportLayer = transport.setTransportLayer.bind(transport);
    }
    return win.__firebolt.transport ? win.__firebolt.transport : moduleInstance;
  }
  receiveHandler(message) {
    if (Settings.getLogLevel() === "DEBUG") {
      console.debug("Received message from transport: " + message);
    }
    const json = JSON.parse(message);
    const p = this._promises[json.id];
    if (p) {
      if (json.error) p.reject(json.error);
      else {
        let result = json.result;
        if (p.transforms) {
          if (Array.isArray(json.result)) {
            result = result.map((x) => Results.transform(x, p.transforms));
          } else {
            result = Results.transform(result, p.transforms);
          }
        }
        p.resolve(result);
      }
      delete this._promises[json.id];
    }
    if (this._eventIds.includes(json.id) && !isEventSuccess(json.result)) {
      this._eventEmitters.forEach((emit2) => {
        emit2(json.id, json.result);
      });
    }
  }
  init() {
    initSettings({}, { log: true });
    this._queue.receive(this.receiveHandler.bind(this));
    if (win.__firebolt) {
      if (win.__firebolt.mockTransportLayer === true) {
        this.isMock = true;
        this.setTransportLayer(mock$2);
      } else if (win.__firebolt.getTransportLayer) {
        this.setTransportLayer(win.__firebolt.getTransportLayer());
      }
    }
    if (this._transport == null) {
      this._transport = this.constructTransportLayer();
    }
  }
}
win.__firebolt = win.__firebolt || {};
win.__firebolt.setTransportLayer = (transport) => {
  Transport.get().setTransportLayer(transport);
};
let listenerId = 0;
const listeners = {
  internal: {},
  external: {},
  // Several convenience functions below for checking both internal & external lists w/ one operation
  // gets a merge list of ids for a single event key
  get: (key) => {
    return Object.assign(
      Object.assign({}, listeners.internal[key]),
      listeners.external[key]
    );
  },
  // adds a callback/id to a key on the external list only
  set: (key, id2, value) => {
    listeners.external[key] = listeners.external[key] || {};
    listeners.external[key][id2] = value;
  },
  // adds a callback/id to a key on the internal list only
  setInternal: (key, id2, value) => {
    listeners.internal[key] = listeners.internal[key] || {};
    listeners.internal[key][id2] = value;
  },
  // finds the key for an id in either list (it can only be in one)
  find: (id2) => {
    let key;
    [listeners.internal, listeners.external].find((group) => {
      key = Object.keys(group).find((key2) => group[key2][id2]);
      if (key) return true;
    });
    return key;
  },
  // removes an id from either list
  remove: (id2) => {
    [listeners.internal, listeners.external].forEach((group) => {
      Object.keys(group).forEach((key) => {
        if (group[key] && group[key][id2]) {
          delete group[key][id2];
          if (Object.values(group[key]).length === 0) {
            delete group[key];
          }
        }
      });
    });
  },
  // removes a key from both lists if _internal is true, otherwise only the external list
  removeKey: (key, _internal = false) => {
    _internal && listeners.internal[key] && delete listeners.internal[key];
    listeners.external[key] && delete listeners.external[key];
  },
  // gives a list of all keys
  keys: () => {
    return Array.from(
      new Set(
        Object.keys(listeners.internal).concat(Object.keys(listeners.external))
      )
    );
  },
  // counts how many listeners are in a key across both lists
  count: (key) => {
    return Object.values(listeners.get(key)).length;
  }
};
const keys = {};
const oncers = [];
const validEvents = {};
const validContext = {};
let transportInitialized = false;
const emit = (id2, value) => {
  callCallbacks(listeners.internal[keys[id2]], [value]);
  callCallbacks(listeners.external[keys[id2]], [value]);
};
const registerEvents = (module, events) => {
  validEvents[module.toLowerCase()] = events.concat();
};
const registerEventContext = (module, event2, context) => {
  validContext[module.toLowerCase()] = validContext[module.toLowerCase()] || {};
  validContext[module.toLowerCase()][event2] = context.concat();
};
const callCallbacks = (cbs, args) => {
  cbs && Object.keys(cbs).forEach((listenerId2) => {
    let callback2 = cbs[listenerId2];
    if (oncers.indexOf(parseInt(listenerId2)) >= 0) {
      oncers.splice(oncers.indexOf(parseInt(listenerId2)), 1);
      delete cbs[listenerId2];
    }
    callback2.apply(null, args);
  });
};
const doListen = function(module, event2, callback2, context, once2, internal = false) {
  init();
  if (typeof callback2 !== "function") {
    return Promise.reject("No valid callback function provided.");
  } else {
    if (module === "*") {
      return Promise.reject("No valid module name provided");
    }
    const wildcard = event2 === "*";
    const events = wildcard ? validEvents[module] : [event2];
    const promises = [];
    const hasContext = Object.values(context).length > 0;
    const contextKey = Object.keys(context).sort().map((key) => key + "=" + JSON.stringify(context[key])).join("&");
    listenerId++;
    if (once2) {
      oncers.push(listenerId);
    }
    events.forEach((event3) => {
      const key = module + "." + event3 + (hasContext ? ".".concat(contextKey) : "");
      if (Object.values(listeners.get(key)).length === 0) {
        const args = Object.assign({ listen: true }, context);
        const { id: id2, promise } = Transport.listen(
          module,
          "on" + event3[0].toUpperCase() + event3.substring(1),
          args
        );
        keys[id2] = key;
        promises.push(promise);
      }
      const setter = internal ? listeners.setInternal : listeners.set;
      if (wildcard) {
        setter(key, "" + listenerId, (value) => callback2(event3, value));
      } else {
        setter(key, "" + listenerId, callback2);
      }
    });
    let resolve, reject;
    let p = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    if (promises.length) {
      Promise.all(promises).then((responses) => {
        resolve(listenerId);
      }).catch((error) => {
        if (event2 === "*") {
          resolve(listenerId);
        } else {
          reject(error);
        }
      });
    } else {
      resolve(listenerId);
    }
    return p;
  }
};
const getListenArgs = function(...args) {
  const callback2 = args.pop();
  const [module, event2, context] = getClearArgs(...args);
  return [module, event2, callback2, context];
};
const getClearArgs = function(...args) {
  const module = (args.shift() || "*").toLowerCase();
  const event2 = args.shift() || "*";
  const context = {};
  for (let i = 0; args.length; i++) {
    context[validContext[module][event2][i]] = args.shift();
  }
  return [module, event2, context];
};
const once$3 = function(...args) {
  const [module, event2, callback2, context] = getListenArgs(...args);
  return doListen(module, event2, callback2, context, true);
};
const listen$3 = function(...args) {
  const [module, event2, callback2, context] = getListenArgs(...args);
  return doListen(module, event2, callback2, context, false);
};
const clear$3 = function(...args) {
  if (args && args.length && typeof args[0] === "number") {
    return doClear(args[0]);
  } else if (args && args.length && typeof args[1] === "number") {
    return doClear(args[1]);
  } else {
    const [moduleOrId, event2, context] = getClearArgs(...args);
    return doClear(moduleOrId, event2, context);
  }
};
const prioritize = function(...args) {
  const [module, event2, callback2, context] = getListenArgs(...args);
  return doListen(module, event2, callback2, context, false, true);
};
const unsubscribe = (key, context) => {
  const [module, event2] = key.split(".").slice(0, 2);
  const args = Object.assign({ listen: false }, context);
  Transport.send(module, "on" + event2[0].toUpperCase() + event2.substr(1), args);
};
const doClear = function(moduleOrId = false, event2 = false, context) {
  if (event2 === "*") {
    event2 = false;
  }
  if (typeof moduleOrId === "number") {
    const searchId = moduleOrId.toString();
    const key = listeners.find(searchId);
    if (key) {
      listeners.remove(searchId);
      if (listeners.count(key) === 0) {
        unsubscribe(key);
      }
      return true;
    }
    return false;
  } else {
    if (!moduleOrId && !event2) {
      listeners.keys().forEach((key) => {
        listeners.removeKey(key);
        unsubscribe(key);
      });
    } else if (!event2) {
      listeners.keys().forEach((key) => {
        if (key.indexOf(moduleOrId.toLowerCase()) === 0) {
          listeners.removeKey(key);
          unsubscribe(key);
        }
      });
    } else {
      const hasContext = Object.values(context).length > 0;
      const contextKey = Object.keys(context).sort().map((key2) => key2 + "=" + JSON.stringify(context[key2])).join("&");
      const key = moduleOrId + "." + event2 + (hasContext ? ".".concat(contextKey) : "");
      listeners.removeKey(key);
      unsubscribe(key, context);
    }
  }
};
const init = () => {
  if (!transportInitialized) {
    Transport.addEventEmitter(emit);
    setMockListener(listen$3);
    transportInitialized = true;
  }
};
const Events = {
  listen: listen$3,
  once: once$3,
  clear: clear$3,
  broadcast(event2, value) {
    emit(Object.entries(keys).find(([k, v]) => v === "app." + event2)[0], value);
  }
};
function prop(moduleName, key, params, callbackOrValue = void 0, immutable, readonly, contextParameterCount) {
  const numArgs = Object.values(params).length;
  const type2 = router(params, callbackOrValue, contextParameterCount);
  if (type2 === "getter") {
    return Transport.send(moduleName, key, params);
  } else if (type2 === "subscriber") {
    if (immutable) {
      throw new Error("Cannot subscribe to an immutable property");
    }
    return Events.listen(
      moduleName,
      key + "Changed",
      ...Object.values(params),
      callbackOrValue
    );
  } else if (type2 === "setter") {
    if (immutable) {
      throw new Error("Cannot set a value to an immutable property");
    }
    if (readonly) {
      throw new Error("Cannot set a value to a readonly property");
    }
    return Transport.send(
      moduleName,
      "set" + key[0].toUpperCase() + key.substring(1),
      Object.assign(
        {
          value: callbackOrValue
        },
        params
      )
    );
  } else if (numArgs < contextParameterCount) {
    throw new Error(
      "Cannot get a value without all required context parameters."
    );
  } else {
    throw new Error("Property accessed with unexpected number of parameters.");
  }
}
const Prop = {
  prop
};
registerEvents("Accessibility", [
  "audioDescriptionSettingsChanged",
  "closedCaptionsSettingsChanged",
  "voiceGuidanceSettingsChanged"
]);
Transport.registerDeprecatedMethod(
  "Accessibility",
  "closedCaptions",
  "Use Accessibility.closedCaptionsSettings() instead."
);
Transport.registerDeprecatedMethod(
  "Accessibility",
  "voiceGuidance",
  "Use Accessibility.voiceGuidanceSettings() instead."
);
function id$1() {
  let callbackOrValue = arguments[0];
  let params = {};
  if (arguments.length === 1 && typeof arguments[0] === "function") {
    callbackOrValue = arguments[0];
    params = {};
  }
  return Prop.prop("Account", "id", params, callbackOrValue, true, true, 0);
}
function uid$1() {
  let callbackOrValue = arguments[0];
  let params = {};
  if (arguments.length === 1 && typeof arguments[0] === "function") {
    callbackOrValue = arguments[0];
    params = {};
  }
  return Prop.prop("Account", "uid", params, callbackOrValue, true, true, 0);
}
const Account = {
  id: id$1,
  uid: uid$1
};
registerEvents("Advertising", ["policyChanged"]);
Transport.registerDeprecatedMethod(
  "Authentication",
  "token",
  "Use Authentication module has individual methods for each token type. instead."
);
registerEvents("Capabilities", [
  "available",
  "granted",
  "revoked",
  "unavailable"
]);
registerEventContext("Capabilities", "available", ["capability"]);
registerEventContext("Capabilities", "granted", ["role", "capability"]);
registerEventContext("Capabilities", "revoked", ["role", "capability"]);
registerEventContext("Capabilities", "unavailable", ["capability"]);
registerEvents("Device", [
  "audioChanged",
  "deviceNameChanged",
  "hdcpChanged",
  "hdrChanged",
  "nameChanged",
  "networkChanged",
  "screenResolutionChanged",
  "videoResolutionChanged"
]);
Transport.registerDeprecatedMethod(
  "Device",
  "screenResolution",
  "Use Use non-Firebolt APIs specific to your platform, e.g. W3C APIs instead."
);
Transport.registerDeprecatedMethod(
  "Device",
  "onDeviceNameChanged",
  "Use Device.name() instead."
);
Transport.registerDeprecatedMethod(
  "Device",
  "onScreenResolutionChanged",
  "Use screenResolution instead."
);
function version() {
  return new Promise((resolve, reject) => {
    Transport.send("device", "version").then((v) => {
      v = v || {};
      v.sdk = v.sdk || {};
      v.sdk.major = parseInt("1");
      v.sdk.minor = parseInt("4");
      v.sdk.patch = parseInt("1");
      v.sdk.readable = "Firebolt Core SDK 1.4.1";
      resolve(v);
    }).catch((error) => {
      reject(error);
    });
  });
}
function audio() {
  let callbackOrValue = arguments[0];
  let params = {};
  if (arguments.length === 1 && typeof arguments[0] === "function") {
    callbackOrValue = arguments[0];
    params = {};
  }
  return Prop.prop("Device", "audio", params, callbackOrValue, false, true, 0);
}
function clear$2(...args) {
  return Events.clear("Device", ...args);
}
function distributor() {
  let callbackOrValue = arguments[0];
  let params = {};
  if (arguments.length === 1 && typeof arguments[0] === "function") {
    callbackOrValue = arguments[0];
    params = {};
  }
  return Prop.prop(
    "Device",
    "distributor",
    params,
    callbackOrValue,
    true,
    true,
    0
  );
}
function hdcp() {
  let callbackOrValue = arguments[0];
  let params = {};
  if (arguments.length === 1 && typeof arguments[0] === "function") {
    callbackOrValue = arguments[0];
    params = {};
  }
  return Prop.prop("Device", "hdcp", params, callbackOrValue, false, true, 0);
}
function hdr() {
  let callbackOrValue = arguments[0];
  let params = {};
  if (arguments.length === 1 && typeof arguments[0] === "function") {
    callbackOrValue = arguments[0];
    params = {};
  }
  return Prop.prop("Device", "hdr", params, callbackOrValue, false, true, 0);
}
function id() {
  let callbackOrValue = arguments[0];
  let params = {};
  if (arguments.length === 1 && typeof arguments[0] === "function") {
    callbackOrValue = arguments[0];
    params = {};
  }
  return Prop.prop("Device", "id", params, callbackOrValue, true, true, 0);
}
function listen$2(...args) {
  return Events.listen("Device", ...args);
}
function make() {
  let callbackOrValue = arguments[0];
  let params = {};
  if (arguments.length === 1 && typeof arguments[0] === "function") {
    callbackOrValue = arguments[0];
    params = {};
  }
  return Prop.prop("Device", "make", params, callbackOrValue, true, true, 0);
}
function model() {
  let callbackOrValue = arguments[0];
  let params = {};
  if (arguments.length === 1 && typeof arguments[0] === "function") {
    callbackOrValue = arguments[0];
    params = {};
  }
  return Prop.prop("Device", "model", params, callbackOrValue, true, true, 0);
}
function name() {
  let callbackOrValue = arguments[0];
  let params = {};
  if (arguments.length === 1 && typeof arguments[0] === "function") {
    callbackOrValue = arguments[0];
    params = {};
  }
  return Prop.prop("Device", "name", params, callbackOrValue, false, true, 0);
}
function network() {
  let callbackOrValue = arguments[0];
  let params = {};
  if (arguments.length === 1 && typeof arguments[0] === "function") {
    callbackOrValue = arguments[0];
    params = {};
  }
  return Prop.prop("Device", "network", params, callbackOrValue, false, true, 0);
}
function once$2(...args) {
  return Events.once("Device", ...args);
}
function platform() {
  let callbackOrValue = arguments[0];
  let params = {};
  if (arguments.length === 1 && typeof arguments[0] === "function") {
    callbackOrValue = arguments[0];
    params = {};
  }
  return Prop.prop("Device", "platform", params, callbackOrValue, true, true, 0);
}
function screenResolution() {
  let callbackOrValue = arguments[0];
  let params = {};
  if (arguments.length === 1 && typeof arguments[0] === "function") {
    callbackOrValue = arguments[0];
    params = {};
  }
  return Prop.prop(
    "Device",
    "screenResolution",
    params,
    callbackOrValue,
    false,
    true,
    0
  );
}
function sku() {
  let callbackOrValue = arguments[0];
  let params = {};
  if (arguments.length === 1 && typeof arguments[0] === "function") {
    callbackOrValue = arguments[0];
    params = {};
  }
  return Prop.prop("Device", "sku", params, callbackOrValue, true, true, 0);
}
function type() {
  let callbackOrValue = arguments[0];
  let params = {};
  if (arguments.length === 1 && typeof arguments[0] === "function") {
    callbackOrValue = arguments[0];
    params = {};
  }
  return Prop.prop("Device", "type", params, callbackOrValue, true, true, 0);
}
function uid() {
  let callbackOrValue = arguments[0];
  let params = {};
  if (arguments.length === 1 && typeof arguments[0] === "function") {
    callbackOrValue = arguments[0];
    params = {};
  }
  return Prop.prop("Device", "uid", params, callbackOrValue, true, true, 0);
}
function videoResolution() {
  let callbackOrValue = arguments[0];
  let params = {};
  if (arguments.length === 1 && typeof arguments[0] === "function") {
    callbackOrValue = arguments[0];
    params = {};
  }
  return Prop.prop(
    "Device",
    "videoResolution",
    params,
    callbackOrValue,
    false,
    true,
    0
  );
}
const Device = {
  Events: {
    DEVICE_NAME_CHANGED: "deviceNameChanged",
    NAME_CHANGED: "nameChanged",
    HDCP_CHANGED: "hdcpChanged",
    HDR_CHANGED: "hdrChanged",
    AUDIO_CHANGED: "audioChanged",
    SCREEN_RESOLUTION_CHANGED: "screenResolutionChanged",
    VIDEO_RESOLUTION_CHANGED: "videoResolutionChanged",
    NETWORK_CHANGED: "networkChanged"
  },
  /**
   * The type of network that is currently active
   */
  NetworkState: {
    CONNECTED: "connected",
    DISCONNECTED: "disconnected"
  },
  /**
   * The type of network that is currently active
   */
  NetworkType: {
    WIFI: "wifi",
    ETHERNET: "ethernet",
    HYBRID: "hybrid"
  },
  version,
  audio,
  clear: clear$2,
  distributor,
  hdcp,
  hdr,
  id,
  listen: listen$2,
  make,
  model,
  name,
  network,
  once: once$2,
  platform,
  screenResolution,
  sku,
  type,
  uid,
  videoResolution
};
const providerInterfaces = {};
const registerProviderInterface = (capability, module, methods) => {
  if (providerInterfaces[capability]) {
    throw "Capability ".concat(capability, " has multiple provider interfaces registered.");
  }
  methods.forEach((m) => m.name = "".concat(module, ".").concat(m.name));
  providerInterfaces[capability] = methods.concat();
};
function ready$1() {
  return Transport.send("metrics", "ready", {});
}
registerEvents("Discovery", ["navigateTo", "policyChanged"]);
registerProviderInterface(
  "xrn:firebolt:capability:discovery:interest",
  "Discovery",
  [{ name: "userInterest", focus: false, response: true, parameters: true }]
);
Transport.registerDeprecatedMethod(
  "Discovery",
  "entityInfo",
  "Use null instead."
);
Transport.registerDeprecatedMethod(
  "Discovery",
  "purchasedContent",
  "Use null instead."
);
Transport.registerDeprecatedMethod(
  "Discovery",
  "entitlements",
  "Use Discovery.contentAccess() instead."
);
Transport.registerDeprecatedMethod(
  "Discovery",
  "onPullEntityInfo",
  "Use null instead."
);
Transport.registerDeprecatedMethod(
  "Discovery",
  "onPullPurchasedContent",
  "Use null instead."
);
registerEvents("Lifecycle", [
  "background",
  "foreground",
  "inactive",
  "suspended",
  "unloading"
]);
const store = {
  _current: "initializing",
  get current() {
    return this._current;
  }
};
async function ready() {
  let readyRes;
  await prioritize("Lifecycle", (event2, value) => {
    store._current = event2;
  });
  readyRes = await Transport.send("lifecycle", "ready", {});
  setTimeout((_) => {
    ready$1();
  });
  return readyRes;
}
function clear$1(...args) {
  return Events.clear("Lifecycle", ...args);
}
function close(reason) {
  const transforms = null;
  return Transport.send("Lifecycle", "close", { reason }, transforms);
}
function listen$1(...args) {
  return Events.listen("Lifecycle", ...args);
}
function once$1(...args) {
  return Events.once("Lifecycle", ...args);
}
function state() {
  return store.current;
}
function finished() {
  if (store.current === "unloading") {
    return Transport.send("lifecycle", "finished");
  } else {
    throw "Cannot call finished() except when in the unloading transition";
  }
}
const Lifecycle = {
  Events: {
    INACTIVE: "inactive",
    FOREGROUND: "foreground",
    BACKGROUND: "background",
    SUSPENDED: "suspended",
    UNLOADING: "unloading"
  },
  /**
   * The application close reason
   */
  CloseReason: {
    REMOTE_BUTTON: "remoteButton",
    USER_EXIT: "userExit",
    DONE: "done",
    ERROR: "error"
  },
  /**
   * The application lifecycle state
   */
  LifecycleState: {
    INITIALIZING: "initializing",
    INACTIVE: "inactive",
    FOREGROUND: "foreground",
    BACKGROUND: "background",
    UNLOADING: "unloading",
    SUSPENDED: "suspended"
  },
  ready,
  state,
  finished,
  clear: clear$1,
  close,
  listen: listen$1,
  once: once$1
};
registerEvents("Localization", [
  "countryCodeChanged",
  "languageChanged",
  "localeChanged",
  "localityChanged",
  "postalCodeChanged",
  "preferredAudioLanguagesChanged"
]);
Transport.registerDeprecatedMethod(
  "Localization",
  "language",
  "Use Localization.locale instead."
);
Transport.registerDeprecatedMethod(
  "Localization",
  "onLanguageChanged",
  "Use language instead."
);
function additionalInfo() {
  const transforms = null;
  return Transport.send("Localization", "additionalInfo", {}, transforms);
}
function clear(...args) {
  return Events.clear("Localization", ...args);
}
function countryCode() {
  let callbackOrValue = arguments[0];
  let params = {};
  if (arguments.length === 1 && typeof arguments[0] === "function") {
    callbackOrValue = arguments[0];
    params = {};
  }
  return Prop.prop(
    "Localization",
    "countryCode",
    params,
    callbackOrValue,
    false,
    true,
    0
  );
}
function language() {
  let callbackOrValue = arguments[0];
  let params = {};
  if (arguments.length === 1 && typeof arguments[0] === "function") {
    callbackOrValue = arguments[0];
    params = {};
  }
  return Prop.prop(
    "Localization",
    "language",
    params,
    callbackOrValue,
    false,
    true,
    0
  );
}
function latlon() {
  const transforms = null;
  return Transport.send("Localization", "latlon", {}, transforms);
}
function listen(...args) {
  return Events.listen("Localization", ...args);
}
function locale() {
  let callbackOrValue = arguments[0];
  let params = {};
  if (arguments.length === 1 && typeof arguments[0] === "function") {
    callbackOrValue = arguments[0];
    params = {};
  }
  return Prop.prop(
    "Localization",
    "locale",
    params,
    callbackOrValue,
    false,
    true,
    0
  );
}
function locality() {
  let callbackOrValue = arguments[0];
  let params = {};
  if (arguments.length === 1 && typeof arguments[0] === "function") {
    callbackOrValue = arguments[0];
    params = {};
  }
  return Prop.prop(
    "Localization",
    "locality",
    params,
    callbackOrValue,
    false,
    true,
    0
  );
}
function once(...args) {
  return Events.once("Localization", ...args);
}
function postalCode() {
  let callbackOrValue = arguments[0];
  let params = {};
  if (arguments.length === 1 && typeof arguments[0] === "function") {
    callbackOrValue = arguments[0];
    params = {};
  }
  return Prop.prop(
    "Localization",
    "postalCode",
    params,
    callbackOrValue,
    false,
    true,
    0
  );
}
function preferredAudioLanguages() {
  let callbackOrValue = arguments[0];
  let params = {};
  if (arguments.length === 1 && typeof arguments[0] === "function") {
    callbackOrValue = arguments[0];
    params = {};
  }
  return Prop.prop(
    "Localization",
    "preferredAudioLanguages",
    params,
    callbackOrValue,
    false,
    true,
    0
  );
}
const Localization = {
  Events: {
    LOCALITY_CHANGED: "localityChanged",
    POSTAL_CODE_CHANGED: "postalCodeChanged",
    COUNTRY_CODE_CHANGED: "countryCodeChanged",
    LANGUAGE_CHANGED: "languageChanged",
    PREFERRED_AUDIO_LANGUAGES_CHANGED: "preferredAudioLanguagesChanged",
    LOCALE_CHANGED: "localeChanged"
  },
  additionalInfo,
  clear,
  countryCode,
  language,
  latlon,
  listen,
  locale,
  locality,
  once,
  postalCode,
  preferredAudioLanguages
};
registerEvents("SecondScreen", [
  "closeRequest",
  "friendlyNameChanged",
  "launchRequest"
]);
setMockResponses({
  Accessibility: _Accessibility,
  Account: _Account,
  Advertising: _Advertising,
  Authentication: _Authentication,
  Capabilities: _Capabilities,
  Device: _Device,
  Discovery: _Discovery,
  Keyboard: _Keyboard,
  Lifecycle: _Lifecycle,
  Localization: _Localization,
  Metrics: _Metrics,
  Parameters: _Parameters,
  Profile: _Profile,
  SecondScreen: _SecondScreen,
  SecureStorage: _SecureStorage,
  Platform: _Platform
});
function Firebolt() {
  const fireboltApis = ["Lifecycle", "Audio", "Make", "Model", "latlong"];
  const [activeIndex, setActiveIndex] = createSignal(0);
  const [data, setData] = createSignal("");
  setGlobalBackground(255);
  createEffect(() => {
    switch (activeIndex()) {
      case 0:
        setData("LifeCycle state is " + Lifecycle.state());
        break;
      case 1:
        Device.audio().then((supportedAudioProfiles) => {
          setData("DolbyAtmos " + supportedAudioProfiles.dolbyAtmos);
        });
        break;
      case 2:
        Device.make().then((make2) => {
          setData("Device Make is " + make2);
        });
        break;
      case 3:
        Account.id().then((id2) => {
          setData("AccountId is " + id2);
        });
        break;
      case 4:
        Localization.latlon().then((val) => {
          setData("Lat value is ".concat(val[0], ", Long value is ").concat(val[1]));
        });
        break;
    }
  });
  const apiStyle = {
    color: 4294967295,
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    $focus: {
      color: 1147903743
    }
  };
  return createComponent(View, {
    get children() {
      return [createComponent(Text, {
        y: -120,
        fontSize: 24,
        center: true,
        children: "Press Right and Left to change API"
      }), createComponent(Row, {
        autofocus: true,
        center: true,
        y: -60,
        onSelectedChanged: setActiveIndex,
        get children() {
          return fireboltApis.map((api, index) => createComponent(Text, {
            style: apiStyle,
            children: api
          }));
        }
      }), createComponent(Text, {
        center: true,
        get children() {
          return data();
        }
      })];
    }
  });
}
export {
  Firebolt as default
};
