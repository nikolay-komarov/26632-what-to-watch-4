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

export const getShowedMovies = (movies, showedMovies) => {
  return movies.slice(0, showedMovies);
};

export const formatTime = (time) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);
  return [
    hours.toString().padStart(2, `0`),
    minutes.toString().padStart(2, `0`),
    seconds.toString().padStart(2, `0`)
  ].join(`:`);
};

export const normalizeMovieData = (movie) =>
  Object.keys(movie).length
    ? {
      // : movie.id,
      name: movie.name,
      posterImage: movie.poster_image,
      previewImage: movie.preview_image,
      backgroundImage: movie.background_image,
      // : movie.background_color,
      // : movie.video_link,
      previewVideoLink: movie.preview_video_link,
      description: movie.description,
      rating: movie.rating,
      scoreCount: movie.scores_count,
      director: movie.director,
      staring: movie.starring,
      runTime: movie.run_time,
      genre: movie.genre,
      released: movie.released,
      // : movie.is_favorite,
    }
    : {};

export const normalizeMoviesData = (movies) => movies.map(normalizeMovieData);

export const normalizeCommentData = (comment) =>
  Object.keys(comment).length
    ? {
      id: comment.id,
      userId: comment.user.id,
      userName: comment.user.name,
      rating: comment.rating,
      comment: comment.comment,
      date: comment.date
    }
    : {};
