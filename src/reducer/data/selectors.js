import {createSelector} from "reselect";

import NameSpace from "../name-space.js";
import {GENRE_ALL} from "../../utils/const.js";

export const getPromoMovieCard = (state) => {
  return state[NameSpace.DATA].promoMovieCard;
};

export const getMoviesList = (state) => {
  return state[NameSpace.DATA].moviesList;
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

export const getCurrentMovie = (state) => {
  return state[NameSpace.DATA].currentMovie;
};

export const getCurrentMovieComments = (state) => {
  return state[NameSpace.DATA].currentMovieComments;
};

export const getMoviesByGenre = createSelector(
    getMoviesList,
    getCurrentGenre,
    (movies, genre) => {
      return (genre === GENRE_ALL)
        ? movies
        : movies.filter((movie) => movie.genre === genre);
    }
);
