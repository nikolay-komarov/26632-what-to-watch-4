import {MovieScore, MovieLevel} from "./const.js";

export const getMovieRatingLevel = (movieScore) => {
  if (movieScore < 0) {
    return `Rating can't be negative`;
  }
  if (movieScore < MovieScore.BAD) {
    return MovieLevel.BAD;
  }
  if (movieScore < MovieScore.NORMAL) {
    return MovieLevel.NORMAL;
  }
  if (movieScore < MovieScore.GOOD) {
    return MovieLevel.GOOD;
  }
  if (movieScore < MovieScore.VERRY_GOOD) {
    return MovieLevel.VERRY_GOOD;
  }

  return MovieLevel.AWESOME;
};
