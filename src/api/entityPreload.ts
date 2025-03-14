import { createResource } from "solid-js";
import * as provider from "./providers/entity";
import type { Tile } from "./formatters/ItemFormatter";

export function entityPreload({ params, intent }) {
  const [entity] = createResource(() => ({ ...params }), provider.getInfo);

  if (intent === "preload") {
    return;
  }

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
