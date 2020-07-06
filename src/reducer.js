import {extend, getMoviesByGenre} from "./utils.js";
import {GENRE_ALL} from "./const.js";

import moviesList from "./mocks/films.js";
import currentMovie from "./mocks/film.js";

const initialState = {
  genre: GENRE_ALL,
  moviesList,
  filteredMoviesList: moviesList,
  currentMovie,
};

const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  GET_MOVIES_BY_GENRE: `GET_MOVIES_BY_GENRE`,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return extend(state, {
        genre: action.payload
      });

    case ActionType.GET_MOVIES_BY_GENRE:
      return extend(state, {
        filteredMovieList: getMoviesByGenre(state.moviesList, action.payload),
      });
  }

  return state;
};

export {reducer, ActionType};
