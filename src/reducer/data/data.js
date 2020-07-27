import {
  extend,
  normalizeMovieData,
  normalizeMoviesData,
  // normalizeMovieComments,
  // normalizeMovieCommentsData,
  getGenresList,
} from "../../utils/utils.js";

import {
  GENRE_ALL,
  SHOWED_ITEMS_IN_MOVIES_LIST_DEFAULT,
} from "../../utils/const.js";

import movieComments from "../../mocks/comments.js"; // временно, ToDo - заменить на получение комментариев с сервера

const initialMovie = {
  id: 0,
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

  genresList: [GENRE_ALL],
  currentGenre: GENRE_ALL,
  showedItemsInMoviesList: SHOWED_ITEMS_IN_MOVIES_LIST_DEFAULT,
  currentMovie: null,
  currentMovieComments: null,
};

const ActionType = {
  LOAD_PROMO_MOVIE_CARD: `LOAD_PROMO_MOVIE_CARD`,
  LOAD_MOVIES_LIST: `LOAD_MOVIES_LIST`,

  // LOAD_CURRENT_MOVIE_COMMENTS: `LOAD_CURRENT_MOVIE_COMMENTS`, // ToDo - сделать ActionCreator, tests

  CHANGE_GENRE: `CHANGE_GENRE`,
  CHANGE_CURRENT_MOVIE: `CHANGE_CURRENT_MOVIE`,
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

  // loadCurrentMovieComments: (comments) => ({
  //   type: ActionType.LOAD_CURRENT_MOVIE_COMMENTS,
  //   payload: comments,
  // }),

  changeGenre: (genre) => ({
    type: ActionType.CHANGE_GENRE,
    payload: genre,
  }),
  changeCurrentMovie: (movie) => ({
    type: ActionType.CHANGE_CURRENT_MOVIE,
    payload: movie,
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

  // loadCurrentMovieComments: (movieId) => (dispatch, getState, api) => {
  //   return api.get(`/comments/:` + movieId)
  //   .then((response) => {
  //     dispatch(ActionCreator.loadMoviesList(normalizeMovieComments(response.data)));
  //   });
  // },

  sendComment: (reviewData, movieId, handleResponse) => (dispatch, getState, api) => {
    return api.post(`/comments/` + movieId, reviewData)
      .then(() => handleResponse.onSuccess())
      .catch((err) => {
        handleResponse.onError();
        throw err;
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
        moviesList: action.payload,
        genresList: getGenresList(action.payload),
      });

    case ActionType.CHANGE_GENRE:
      return extend(state, {
        currentGenre: action.payload
      });
    case ActionType.CHANGE_CURRENT_MOVIE:
      return extend(state, {
        currentMovie: action.payload,
        currentMovieComments: movieComments, // временное решение
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
