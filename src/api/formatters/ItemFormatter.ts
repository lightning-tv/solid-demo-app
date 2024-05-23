import { getImageUrl } from "../index";

function truncateString(str: string, maxLength: number): string {
  if (str.length > maxLength) {
    return str.substring(0, maxLength - 3) + "...";
  }
  return str;
}

export function chunkArray(array: string[], size = 7) {
  let result: string[][] = [];
  for (let i = 0, j = array.length; i < j; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

export interface Tile {
  src: string;
  tileSrc: string;
  backdrop: string;
  href: string;
  shortTitle: string;
  title: string;
  data: unknown;
  entityInfo: {
    type: string;
    id: string;
  };
  heroContent: {
    title: string;
    description: string;
  };
}

// TODO: Remove `any` type
export function convertItemsToTiles(items: any[] = []): Tile[] {
  return items.map((item) => ({
    src: getImageUrl(item.poster_path || item.profile_path),
    tileSrc: getImageUrl(item.backdrop_path || item.profile_path, "w300"),
    backdrop: getImageUrl(item.backdrop_path, "w1280"),
    href: `/entity/${item.media_type || "people"}/${item.id}`,
    shortTitle: truncateString(item.title || item.name, 30),
    title: item.title || item.name,
    data: item,
    entityInfo: {
      type: item.media_type || "people",
      id: item.id,
    },
    heroContent: {
      title: item.title || item.name,
      description: item.overview,
    },
  }));
}
