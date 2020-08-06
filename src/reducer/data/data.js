import {
  extend,
  normalizeMovieData,
  normalizeMoviesData,
  normalizeMovieCommentsData,
  getGenresList,
} from "../../utils/utils.js";

import {
  GENRE_ALL,
  SHOWED_ITEMS_IN_MOVIES_LIST_DEFAULT,
} from "../../utils/const.js";

const initialMovie = {
  id: -1,
  name: ``,
  posterImage: ``,
  previewImage: ``,
  backgroundImage: ``,
  backgroundColor: ``,
  videoLink: ``,
  previewVideoLink: ``,
  description: ``,
  rating: 0,
  scoreCount: 0,
  director: ``,
  staring: [``],
  runTime: 0,
  genre: ``,
  released: 0,
  isFavorite: false,
};

const initialState = {
  promoMovieCard: initialMovie,
  moviesList: [initialMovie],
  isPromoMovieLoaded: false,
  isMoviesListLoaded: false,
  genresList: [GENRE_ALL],
  currentGenre: GENRE_ALL,
  showedItemsInMoviesList: SHOWED_ITEMS_IN_MOVIES_LIST_DEFAULT,
  currentMovieComments: [],
  isCurrentMovieLoaded: false,
  favoriteMoviesList: [],
  isFavoriteMoviesListLoaded: false,
};

const ActionType = {
  LOAD_PROMO_MOVIE_CARD: `LOAD_PROMO_MOVIE_CARD`,
  LOAD_MOVIES_LIST: `LOAD_MOVIES_LIST`,
  LOAD_CURRENT_MOVIE_COMMENTS: `LOAD_CURRENT_MOVIE_COMMENTS`,
  LOAD_FAVORITE_MOVIES_LIST: `LOAD_FAVORITE_MOVIES_LIST`,
  CHANGE_GENRE: `CHANGE_GENRE`,
  SHOW_MORE_ITEMS_IN_MOVIES_LIST: `SHOW_MORE_ITEMS_IN_MOVIES_LIST`,
  RESET_SHOWED_ITEMS_IN_MOVIES_LIST: `RESET_SHOWED_ITEMS_IN_MOVIES_LIST`,
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
  loadCurrentMovieComments: (comments) => ({
    type: ActionType.LOAD_CURRENT_MOVIE_COMMENTS,
    payload: comments,
  }),
  loadFavoriteMoviesList: (list) => ({
    type: ActionType.LOAD_FAVORITE_MOVIES_LIST,
    payload: list,
  }),

  changeGenre: (genre) => ({
    type: ActionType.CHANGE_GENRE,
    payload: genre,
  }),
  showMoreItemsInMoviesList: () => ({
    type: ActionType.SHOW_MORE_ITEMS_IN_MOVIES_LIST
  }),
  resetShowedItemsInMoviesList: () => ({
    type: ActionType.RESET_SHOWED_ITEMS_IN_MOVIES_LIST
  }),
};

const Operation = {
  loadPromoMovieCard: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
      .then((response) => {
        dispatch(ActionCreator.loadPromoMovieCard(normalizeMovieData(response.data)));
      });
  },
  loadMoviesList: () => (dispatch, getState, api) => {
    return api.get(`/films`)
     .then((response) => {
       dispatch(ActionCreator.loadMoviesList(normalizeMoviesData(response.data)));
     });
  },
  loadFavoriteMoviesList: () => (dispatch, getState, api) => {
    return api.get(`/favorite`)
     .then((response) => {
       dispatch(ActionCreator.loadFavoriteMoviesList(normalizeMoviesData(response.data)));
     });
  },

  loadCurrentMovieComments: (movieId) => (dispatch, getState, api) => {
    return api.get(`/comments/` + movieId)
    .then((response) => {
      dispatch(ActionCreator.loadCurrentMovieComments(normalizeMovieCommentsData(response.data)));
    });
  },

  sendComment: (reviewData, movieId, handleResponse) => (dispatch, getState, api) => {
    return api.post(`/comments/` + movieId, reviewData)
      .then(() => handleResponse.onSuccess())
      .catch((err) => {
        handleResponse.onError();
        throw err;
      });
  },

  sendIsFavoriteMovie: (movieId, isFavorite) => (dispatch, getState, api) => {
    const status = isFavorite ? 1 : 0;

    return api.post(`/favorite/${movieId}/${status}`)
      .then(() => {});
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_PROMO_MOVIE_CARD:
      return extend(state, {
        promoMovieCard: action.payload,
        isPromoMovieLoaded: true,
      });
    case ActionType.LOAD_MOVIES_LIST:
      return extend(state, {
        moviesList: action.payload,
        genresList: getGenresList(action.payload),
        isMoviesListLoaded: true,
      });
    case ActionType.LOAD_CURRENT_MOVIE_COMMENTS:
      return extend(state, {
        currentMovieComments: action.payload,
        isCurrentMovieCommentsLoaded: true,
      });
    case ActionType.LOAD_FAVORITE_MOVIES_LIST:
      return extend(state, {
        favoriteMoviesList: action.payload,
        isMoviesListLoaded: true,
      });

    case ActionType.CHANGE_GENRE:
      return extend(state, {
        currentGenre: action.payload
      });
    case ActionType.SHOW_MORE_ITEMS_IN_MOVIES_LIST:
      return extend(state, {
        showedItemsInMoviesList: state.showedItemsInMoviesList + SHOWED_ITEMS_IN_MOVIES_LIST_DEFAULT
      });
    case ActionType.RESET_SHOWED_ITEMS_IN_MOVIES_LIST:
      return extend(state, {
        showedItemsInMoviesList: SHOWED_ITEMS_IN_MOVIES_LIST_DEFAULT
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator, Operation};
