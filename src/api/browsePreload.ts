import { createMemo } from "solid-js";
import browseProvider from "./providers/browse";


export function browsePreload({params}) {
    return createMemo(() => {
        const provider = browseProvider(params.filter || "all");
        provider(1);
        return provider;
    });
}
  