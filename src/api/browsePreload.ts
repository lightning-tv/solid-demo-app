import * as s from "solid-js";
import browseProvider from "./providers/browse";

export function browsePreload(props) {
  let lastFilter = null;
  return s.createMemo((p) => {
    const params = props.params;
    if (p && (!params.filter || lastFilter === params.filter)) {
      return p;
    }
    const provider = browseProvider(params.filter || "all");
    provider(1);
    lastFilter = params.filter || lastFilter;

    return provider;
  });
}
