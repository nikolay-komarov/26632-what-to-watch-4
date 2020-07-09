import {reducer, ActionType, ActionCreator} from "./reducer.js";
import {GENRE_ALL} from "./const.js";

import films from "./mocks/films.js";
import film from "./mocks/film.js";
import comments from "./mocks/comments.js";

describe(`Reducer tests`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      promoMovieCard: film,
      currentGenre: GENRE_ALL,
      moviesList: films,
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
});
