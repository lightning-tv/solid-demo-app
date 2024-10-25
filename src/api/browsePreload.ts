import { createMemo } from "solid-js";
import browseProvider from "./providers/browse";


export function browsePreload({params}) {
    return createMemo(() => {
        return browseProvider(params.filter || "all")    
    });
}
  