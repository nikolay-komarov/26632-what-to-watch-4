import {reducer, ActionType, ActionCreator} from "./data.js";

import film from "../../mocks/film.js";
import films from "../../mocks/films";

describe(`Data Reducer tests`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      promoMovieCard: film,
      moviesList: films,
    });
  });

  it(`Reducer should load promoMovieCard`, () => {
    expect(reducer({
      promoMovieCard: null,
    }, {
      type: ActionType.LOAD_PROMO_MOVIE_CARD,
      payload: film,
    })).toEqual({
      promoMovieCard: film,
    });
  });

  it(`Reducer should load movieList`, () => {
    expect(reducer({
      moviesList: null,
    }, {
      type: ActionType.LOAD_MOVIES_LIST,
      payload: films,
    })).toEqual({
      moviesList: films,
    });
  });
});

describe(`State ActionCreator tests`, () => {
  it(`ActionCreator for loadPromoMovieCard return correct action`, () => {
    expect(ActionCreator.loadPromoMovieCard(film)).toEqual({
      type: ActionType.LOAD_PROMO_MOVIE_CARD,
      payload: film,
    });
  });

  it(`ActionCreator for loadMoviesList return correct action`, () => {
    expect(ActionCreator.loadMoviesList(films)).toEqual({
      type: ActionType.LOAD_MOVIES_LIST,
      payload: films,
    });
  });
});
