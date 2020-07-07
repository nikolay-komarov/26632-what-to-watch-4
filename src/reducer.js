import {extend, getMoviesByGenre} from "./utils.js";
import {GENRE_ALL} from "./const.js";

import promoMovieCard from "./mocks/film.js";
import moviesList from "./mocks/films.js";

import movieComments from "./mocks/comments.js"; // временное решение

const initialState = {
  promoMovieCard,
  currentGenre: GENRE_ALL,
  moviesList,
  filteredMoviesList: moviesList, // пока пусть будет
  currentMovie: null,
  currentMovieComments: null,
};

const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  GET_MOVIES_BY_GENRE: `GET_MOVIES_BY_GENRE`,
  CHANGE_CURRENT_MOVIE: `CHANGE_CURRENT_MOVIE`,
};

const ActionCreator = {
  changeGenre: (genre) => ({
    type: ActionType.CHANGE_GENRE,
    payload: genre,
  }),
  changeCurrentMovie: (movie) => ({
    type: ActionType.CHANGE_CURRENT_MOVIE,
    payload: movie,
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return extend(state, {
        currentGenre: action.payload
      });

    case ActionType.GET_MOVIES_BY_GENRE:
      return extend(state, {
        filteredMoviesList: getMoviesByGenre(state.moviesList, action.payload),
      });

    case ActionType.CHANGE_CURRENT_MOVIE:
      return extend(state, {
        currentMovie: action.payload,
        currentMovieComments: movieComments, // временное решение
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
