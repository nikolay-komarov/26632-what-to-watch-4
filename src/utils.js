import {
  MovieScore,
  MovieLevel,
  GENRE_ALL,
} from "./const.js";

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

export const getTimeFromMins = (mins) => {
  const hours = Math.trunc(mins / 60);
  const minutes = mins % 60;

  return (
    hours + `h ` + minutes + `m`
  );
};

export const getFourSimilarMovies = (movie, movies) => {
  return movies
    .filter((similarMovie) =>
      similarMovie.genre === movie.genre && similarMovie.name !== movie.name)
    .slice(0, 4);
};

export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const getMoviesByGenre = (movies, genre) => {
  return (genre === GENRE_ALL)
    ? movies
    : movies.filter((movie) => movie.genre === genre);
};

export const getGenresList = (movies) => {
  return [GENRE_ALL, ...new Set(movies.map((movie) => movie.genre))];
};
