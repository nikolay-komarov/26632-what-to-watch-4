import {createSelector} from "reselect";

import NameSpace from "../name-space.js";
import {GENRE_ALL} from "../../utils/const.js";

export const getPromoMovieCard = (state) => {
  return state[NameSpace.DATA].promoMovieCard;
};

export const getMoviesList = (state) => {
  return state[NameSpace.DATA].moviesList;
};

export const getFavoriteMoviesList = (state) => {
  return state[NameSpace.DATA].favoriteMoviesList;
};

export const getGenresList = (state) => {
  return state[NameSpace.DATA].genresList;
};

export const getCurrentGenre = (state) => {
  return state[NameSpace.DATA].currentGenre;
};

export const getShowedItemsInMoviesList = (state) => {
  return state[NameSpace.DATA].showedItemsInMoviesList;
};

export const getCurrentMovieComments = (state) => {
  return state[NameSpace.DATA].currentMovieComments;
};

export const getCurrentMovie = createSelector(
    getMoviesList,
    (state, movieId) => parseInt(movieId, 10),
    (movies, movieId) => movies.find((movie) => movie.id === movieId)
);

export const getMoviesByGenre = createSelector(
    getMoviesList,
    getCurrentGenre,
    (movies, genre) => {
      return (genre === GENRE_ALL)
        ? movies
        : movies.filter((movie) => movie.genre === genre);
    }
);

export const getIsMoviesListLoaded = (state) => {
  return state[NameSpace.DATA].isMoviesListLoaded;
};

export const getIsPromoMovieLoaded = (state) => {
  return state[NameSpace.DATA].isPromoMovieLoaded;
};

export const getIsCurrentMovieCommentsLoaded = (state) => {
  return state[NameSpace.DATA].isCurrentMovieCommentsLoaded;
};

export const getIsFavoriteMoviesListLoaded = (state) => {
  return state[NameSpace.DATA].isFavoriteMoviesListLoaded;
};
