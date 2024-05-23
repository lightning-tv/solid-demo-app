import api, { getImageUrl } from "..";
import { convertItemsToTiles } from "../formatters/ItemFormatter";

export function minutesToHMM(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return (
    hours + "h " + (remainingMinutes < 10 ? "0" : "") + remainingMinutes + "m"
  );
}

function justYear(dateString) {
  const parts = dateString.split("-");
  return parts[0];
}

export function getCredits({ id }) {
  return api
    .get(`/person/${id}/combined_credits`)
    .then(({ cast }) => convertItemsToTiles(cast.slice(0, 7)));
}

export function getInfo({ id }) {
  return api.get(`/person/${id}`).then((data) => ({
    backgroundImage: getImageUrl(data.profile_path, "original"),
    heroContent: {
      title: data.title || data.name,
      description: data.biography,
    },
    ...data,
  }));
}
