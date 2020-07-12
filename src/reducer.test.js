import {reducer, ActionType, ActionCreator} from "./reducer.js";
import {
  GENRE_ALL,
  SHOWED_ITEMS_IN_MOVIES_LIST_DEFAULT,
} from "./const.js";

import films from "./mocks/films.js";
import film from "./mocks/film.js";
import comments from "./mocks/comments.js";

describe(`Reducer tests`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      promoMovieCard: film,
      currentGenre: GENRE_ALL,
      moviesList: films,
      showedItemsInMoviesList: SHOWED_ITEMS_IN_MOVIES_LIST_DEFAULT,
      currentMovie: null,
      currentMovieComments: null,
    });
  });

  it(`Reducer should change currentGenre to Drama`, () => {
    expect(reducer({
      currentGenre: GENRE_ALL,
    }, {
      type: ActionType.CHANGE_GENRE,
      payload: `Drama`,
    })).toEqual({
      currentGenre: `Drama`,
    });
  });

  it(`Reducer should change currentMovie`, () => {
    expect(reducer({
      currentMovie: null,
      currentMovieComments: null,
    }, {
      type: ActionType.CHANGE_CURRENT_MOVIE,
      payload: film,
    })).toEqual({
      currentMovie: film,
      currentMovieComments: comments,
    });
  });

  it(`Reducer should increase showedItemsInMoviesList`, () => {
    expect(reducer({
      showedItemsInMoviesList: SHOWED_ITEMS_IN_MOVIES_LIST_DEFAULT,
    }, {
      type: ActionType.SHOW_MORE_ITEMS_IN_MOVIES_LIST,
    })).toEqual({
      showedItemsInMoviesList: SHOWED_ITEMS_IN_MOVIES_LIST_DEFAULT + SHOWED_ITEMS_IN_MOVIES_LIST_DEFAULT,
    });
  });

  it(`Reducer should reset showedItemInMoviesList to default`, () => {
    expect(reducer({
      showedItemsInMoviesList: SHOWED_ITEMS_IN_MOVIES_LIST_DEFAULT + SHOWED_ITEMS_IN_MOVIES_LIST_DEFAULT,
    }, {
      type: ActionType.RESET_SHOWED_ITEMS_IN_MOVIES_LIST,
    })).toEqual({
      showedItemsInMoviesList: SHOWED_ITEMS_IN_MOVIES_LIST_DEFAULT,
    });
  });

});

describe(`ActionCreator tests`, () => {
  it(`ActionCreator for changeGenre return correct action`, () => {
    expect(ActionCreator.changeGenre(`Drama`)).toEqual({
      type: ActionType.CHANGE_GENRE,
      payload: `Drama`,
    });
  });

  it(`ActionCreator for changeCurrentMovie return correct action`, () => {
    expect(ActionCreator.changeCurrentMovie(film)).toEqual({
      type: ActionType.CHANGE_CURRENT_MOVIE,
      payload: film,
    });
  });

  it(`ActionCreator for increase showedItemInMoviesList return correct action`, () => {
    expect(ActionCreator.showMoreItemsInMoviesList()).toEqual({
      type: ActionType.SHOW_MORE_ITEMS_IN_MOVIES_LIST,
    });
  });

  it(`ActionCreator for return defautl value showedItemInMoviesList return correct action`, () => {
    expect(ActionCreator.resetShowedItemsInMoviesList()).toEqual({
      type: ActionType.RESET_SHOWED_ITEMS_IN_MOVIES_LIST,
    });
  });
});
