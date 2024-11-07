import api from ".";
import { convertItemsToTiles } from "./formatters/ItemFormatter";
import { createResource, createSignal } from "solid-js";

const handleResults = (response) => {
  return response.then(({ results }) => {
    let filteredItems = results.filter((r) => !r.adult);
    return convertItemsToTiles(filteredItems);
  });
};


const fetchPopular = (type) => {
  return handleResults(api.get(`/${type}/popular`));
};

let genreListCache;
const fetchGenreMovies = (genres) => {
  const genreList =
    genreListCache || (genreListCache = api.get(`/genre/movie/list`));
  const targetGenre = Array.isArray(genres) ? genres : [genres];
  return genreList.then(({ genres }) => {
    let targetGenreIds: number[] = [];
    genres.forEach((item) => {
      if (targetGenre.includes(item.name)) targetGenreIds.push(item.id);
    });
    return handleResults(
      api.get(`/discover/movie?with_genres=${targetGenreIds.join()}`)
    );
  });
};

type RowItem = {
    title: string;
    items: any;
    type: "Poster" | "Hero" | "PosterTitle";
    height: number;
};

export function destroyData() {
  const heroRow = {
    title: "Best Adventure and Action movies",
    items: createResource(() => fetchGenreMovies(["adventure", "action"]))[0],
    type: "Hero",
    height: 800,
  } as const;

  return {
    heroRow,
  };
}
export function tmdbData() {
  const rows: RowItem[] = [];

  rows.push({
    title: "Popular Movies",
    items: createResource(() => fetchPopular("movie"))[0],
    type: "Poster",
    height: 328,
  });

  rows.push({
    title: "Best Western movies",
    items: createResource(() => fetchGenreMovies(["Western"]))[0],
    type: "Hero",
    height: 720,
  });

  rows.push({
    title: "Best Comedy movies",
    items: createResource(() => fetchGenreMovies(["Comedy"]))[0],
    type: "PosterTitle",
    height: 400,
  });

  rows.push({
    title: "Popular TV shows",
    items: createResource(() => fetchPopular("tv"))[0],
    type: "PosterTitle",
    height: 400,
  });

  const heroRow = {
    title: "Best Adventure and Action movies",
    items: createResource(() => fetchGenreMovies(["adventure", "action"]))[0],
    type: "Hero",
    height: 720,
  } as const;
  rows.push(heroRow);

  rows.push({
    title: "Best Documentaries",
    items: createResource(() => fetchGenreMovies("Documentary"))[0],
    type: "PosterTitle",
    height: 400,
  });

  rows.push({
    title: "Best Western movies 2",
    items: createResource(() => fetchGenreMovies("Western"))[0],
    type: "PosterTitle",
    height: 400,
  });

  return {
    rows
  };
}
