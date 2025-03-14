import api from "..";
import { convertItemsToTiles, chunkArray } from "../formatters/ItemFormatter";

let cache = new Map();
const leftoverTiles = new Map();

export default function (filter: string) {
  return (pageIndex: number): Promise<any> => {
    const url = `/trending/${filter}/week?page=${pageIndex}`;
    if (cache.has(url)) {
      return cache.get(url);
    }

    let result = api.get(url).then((trending) => {
      let results = trending.results.filter((r) => !r.adult);
      let tiles = (
        leftoverTiles.has(filter) ? leftoverTiles.get(filter) : []
      ).concat(convertItemsToTiles(results));
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
