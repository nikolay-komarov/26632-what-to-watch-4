import {reducer, ActionType} from "./reducer.js";
import {GENRE_ALL} from "./const.js";
import {getMoviesByGenre} from "./utils.js";

import films from "./mocks/films.js";
import film from "./mocks/film.js";

describe(`Reducer tests`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      genre: GENRE_ALL,
      moviesList: films,
      filteredMoviesList: films,
      currentMovie: film,
    });
  });

  it(`Reducer should change genre to Drama`, () => {
    expect(reducer({
      genre: GENRE_ALL,
    }, {
      type: ActionType.CHANGE_GENRE,
      payload: `Drama`,
    })).toEqual({
      genre: `Drama`,
    });
  });

  it(`Reducer should change filteredMoviesList for Drama`, () => {
    const filteredMoviesListDrama = getMoviesByGenre(films, `Drama`);

    expect(reducer({
      moviesList: films,
      filteredMoviesList: films,
    }, {
      type: ActionType.GET_MOVIE_BY_GENRE,
      payload: `Drama`,
    })).toEqual({
      moviesList: films,
      filteredMoviesList: filteredMoviesListDrama,
    });
  });
});
