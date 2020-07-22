import {reducer, ActionType, ActionCreator, Operation} from "./data.js";
import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api.js";

const api = createAPI(() => {});
import {
  normalizeMovieData,
  normalizeMoviesData
} from "../../utils/utils.js";

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

describe(`Data ActionCreator tests`, () => {
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

describe(`Date Operation tests`, () => {
  it(`Operation make a coorect API call to /films/promo`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const filmLoader = Operation.loadPromoMovieCard();

    apiMock
      .onGet(`/films/promo`)
      .reply(200, {fake: `promoMovieCard`});

    return filmLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
          type: ActionType.LOAD_PROMO_MOVIE_CARD,
          payload: normalizeMovieData({fake: `promoMovieCard`})
        });
      });
  });

  it(`Operation make a coorect API call to /films`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const flimsLoader = Operation.loadMoviesList();

    apiMock
      .onGet(`/films`)
      .reply(200, [{fake: `movieCard`}]);

    return flimsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
          type: ActionType.LOAD_MOVIES_LIST,
          payload: normalizeMoviesData([{fake: `movieCard`}])
        });
      });
  });
});
