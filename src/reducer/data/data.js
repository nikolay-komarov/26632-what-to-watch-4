import {
  extend,
  normalizeMovieData,
  normalizeMoviesData,
} from "../../utils/utils.js";

const initialMovie = {
  // : ``,
  name: ``,
  posterImage: ``,
  previewImage: ``,
  backgroundImage: ``,
  // : ``,
  // : ``,
  previewVideoLink: ``,
  description: ``,
  rating: 0,
  scoreCount: 0,
  director: ``,
  staring: [``],
  runTime: 0,
  genre: ``,
  released: 0,
};

const initialState = {
  promoMovieCard: initialMovie,
  moviesList: [initialMovie],
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

const Operation = {
  loadPromoMovieCard: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
     .then((response) => {
       dispatch(ActionCreator.loadPromoMovieCard(normalizeMovieData(response.data))); // ToDo - add normalize
     });
  },
  loadMoviesList: () => (dispatch, getState, api) => {
    return api.get(`/films`)
     .then((response) => {
       dispatch(ActionCreator.loadMoviesList(normalizeMoviesData(response.data))); // ToDo - add normalize
     });
  },
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

export {reducer, ActionType, ActionCreator, Operation};
