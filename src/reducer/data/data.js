import {extend} from "../../utils/utils.js";

import promoMovieCard from "../../mocks/film.js";
import moviesList from "../../mocks/films.js";

const initialState = {
  promoMovieCard,
  moviesList,
};

const ActionType = {
  LOAD_PROMO_MOVIE_CARD: `LOAD_PROMO_MOVIE_CARD`,
  LOAD_MOVIES_LIST: `LOAD_MOVIES_LIST`,
};

const ActionCreator = {
  loadPromoMovieCard: (movie) => ({
    type: ActionType.LOAD_PROMO_MOVIE_CARD,
    payload: movie,
  }),
  loadMoviesList: (list) => ({
    type: ActionType.LOAD_MOVIES_LIST,
    payload: list,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_PROMO_MOVIE_CARD:
      return extend(state, {
        promoMovieCard: action.payload
      });
    case ActionType.LOAD_MOVIES_LIST:
      return extend(state, {
        moviesList: action.payload
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
