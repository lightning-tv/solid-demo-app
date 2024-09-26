import { createResource } from "solid-js";
import { useParams } from "@solidjs/router";
import * as provider from "./providers/entity";
import type { Tile } from "./formatters/ItemFormatter";


export function entityPreload() {
    const params = useParams();
    const [entity] = createResource(() => ({ ...params }), provider.getInfo);
    const [credits] = createResource<any, Tile[]>(
        () => ({ ...params }),
        provider.getCredits
    );
    const [recommendations] = createResource<any, Tile[]>(
        () => ({ ...params }),
        provider.getRecommendations
    );

    return { entity, credits, recommendations };
}
  