const API_BASE = "https://api.themoviedb.org/3";

const API_KEY_V4 = import.meta.env.VITE_API_KEY_V4 ?? "FAKE_API_KEY";

let tmdbConfig;
let baseImageUrl;
const urlParams = new URLSearchParams(window.location.search);
const basePosterSize = urlParams.get("posterSize") || "w185";

const defaultFetchParams = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + API_KEY_V4
  }
};

export function getImageUrl(path: string | null | undefined, posterSize: string = basePosterSize) {
  if (!path) {
    return "./assets/fallback.png";
  }
  return baseImageUrl + posterSize + path;
}

function get(path: string, params: RequestInit = {}) {
  if (tmdbConfig) {
    return _get(path, params);
  } else {
    return loadConfig().then(() => _get(path, params));
  }
}

function _get(path: string, params: RequestInit = {}) {
  return fetch(API_BASE + path, {
    ...defaultFetchParams,
    ...params
  }).then((r) => r.json());
}

function loadConfig() {
  return _get("/configuration").then((data) => {
    tmdbConfig = data;
    baseImageUrl = data.images?.secure_base_url;
    return data;
  });
}

export default {
  get,
  loadConfig
};
