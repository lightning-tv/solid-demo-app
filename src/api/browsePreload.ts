import { createMemo, onCleanup } from "solid-js";
import browseProvider from "./providers/browse";

export function browsePreload(props) {
  const params = props().params;
  return createMemo((p) => {
    if (p) {
      return p;
    }
    const provider = browseProvider(params.filter || "all");
    provider(1);
    onCleanup(() => {
      console.log('bye memo')
    });
    return provider;
  });
}
