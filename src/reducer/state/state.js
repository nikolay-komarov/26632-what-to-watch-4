import {extend} from "../../utils/utils.js";
import {
  GENRE_ALL,
  SHOWED_ITEMS_IN_MOVIES_LIST_DEFAULT,
  AppPage,
} from "../../utils/const.js";

import movieComments from "../../mocks/comments.js";

const initialState = {
  currentAppPage: AppPage.MAIN_PAGE,
  currentGenre: GENRE_ALL,
  showedItemsInMoviesList: SHOWED_ITEMS_IN_MOVIES_LIST_DEFAULT,
  currentMovie: null,
  currentMovieComments: null,
};

const ActionType = {
  CHANGE_CURRENT_APP_PAGE: `CHANGE_CURRENT_APP_PAGE`,
  CHANGE_GENRE: `CHANGE_GENRE`,
  CHANGE_CURRENT_MOVIE: `CHANGE_CURRENT_MOVIE`,
  SHOW_MORE_ITEMS_IN_MOVIES_LIST: `SHOW_MORE_ITEMS_IN_MOVIES_LIST`,
  RESET_SHOWED_ITEMS_IN_MOVIES_LIST: `RESET_SHOWED_ITEMS_IN_MOVIES_LIST`,
};

const ActionCreator = {
  changeAppPage: (appPage) => ({
    type: ActionType.CHANGE_CURRENT_APP_PAGE,
    payload: appPage,
  }),
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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CURRENT_APP_PAGE:
      return extend(state, {
        currentAppPage: action.payload
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

export {reducer, ActionType, ActionCreator};
