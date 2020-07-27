import {reducer, ActionType, ActionCreator, Operation} from "./data.js";
import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api.js";

const api = createAPI(() => {});
import {
  normalizeMovieData,
  normalizeMoviesData,
  getGenresList
} from "../../utils/utils.js";
import {
  GENRE_ALL,
  SHOWED_ITEMS_IN_MOVIES_LIST_DEFAULT
} from "../../utils/const.js";

const film = {
  name: `The Grand Budapest Hotel`,
  posterImage: `img/the-grand-budapest-hotel-poster.jpg`,
  previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  backgroundImage: `img/bg-the-grand-budapest-hotel.jpg`,
  previewVideoLink: `https://www.kinomania.ru/load/n?file=//fs.kinomania.ru/media/video/a/e1/ae1ea61fe9c315fbd913c38d6ddc7c0d.480.mp4`,
  description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave&aposs friend and protege.`,
  rating: 8.9,
  scoreCount: 240,
  director: `Wes Andreson`,
  staring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
  runTime: 99,
  genre: `Drama`,
  released: 2014,
};
const comments = [
  {
    id: 1,
    userId: 4,
    userName: `Kate Muir`,
    rating: 8.9,
    comment: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
    date: `2016-12-24`,
  },
  {
    id: 2,
    userId: 4,
    userName: `Kate Muir`,
    rating: 8.9,
    comment: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
    date: `2016-12-24`,
  },
  {
    id: 3,
    userId: 4,
    userName: `Kate Muir`,
    rating: 8.9,
    comment: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
    date: `2016-12-24`,
  },
  {
    id: 4,
    userId: 4,
    userName: `Kate Muir`,
    rating: 8.9,
    comment: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
    date: `2016-12-24`,
  },
  {
    id: 5,
    userId: 4,
    userName: `Kate Muir`,
    rating: 8.9,
    comment: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
    date: `2016-12-24`,
  },
];
const films = [
  {
    name: `Fantastic Beasts: The Crimes of Grindelwald`,
    posterImage: `img/the-grand-budapest-hotel-poster.jpg`,
    previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    backgroundImage: `img/bg-the-grand-budapest-hotel.jpg`,
    previewVideoLink: `https://www.kinomania.ru/load/n?file=//fs.kinomania.ru/media/video/a/e1/ae1ea61fe9c315fbd913c38d6ddc7c0d.480.mp4`,
    description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave&aposs friend and protege.`,
    rating: 8.9,
    scoreCount: 240,
    director: `Wes Andreson`,
    staring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
    runTime: 99,
    genre: `Drama`,
    released: 2014,
  },
  {
    name: `Bohemian Rhapsody`,
    posterImage: `img/the-grand-budapest-hotel-poster.jpg`,
    previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    backgroundImage: `img/bg-the-grand-budapest-hotel.jpg`,
    previewVideoLink: `https://www.kinomania.ru/load/n?file=//fs.kinomania.ru/media/video/a/e1/ae1ea61fe9c315fbd913c38d6ddc7c0d.480.mp4`,
    description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave&aposs friend and protege.`,
    rating: 8.9,
    scoreCount: 240,
    director: `Wes Andreson`,
    staring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
    runTime: 99,
    genre: `Drama`,
    released: 2014,
  },
  {
    name: `Macbeth`,
    posterImage: `img/the-grand-budapest-hotel-poster.jpg`,
    previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    backgroundImage: `img/bg-the-grand-budapest-hotel.jpg`,
    previewVideoLink: `https://www.kinomania.ru/load/n?file=//fs.kinomania.ru/media/video/a/e1/ae1ea61fe9c315fbd913c38d6ddc7c0d.480.mp4`,
    description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave&aposs friend and protege.`,
    rating: 8.9,
    scoreCount: 240,
    director: `Wes Andreson`,
    staring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
    runTime: 99,
    genre: `Drama`,
    released: 2014,
  },
  {
    name: `Aviator`,
    posterImage: `img/the-grand-budapest-hotel-poster.jpg`,
    previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    backgroundImage: `img/bg-the-grand-budapest-hotel.jpg`,
    previewVideoLink: `https://www.kinomania.ru/load/n?file=//fs.kinomania.ru/media/video/a/e1/ae1ea61fe9c315fbd913c38d6ddc7c0d.480.mp4`,
    description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave&aposs friend and protege.`,
    rating: 8.9,
    scoreCount: 240,
    director: `Wes Andreson`,
    staring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
    runTime: 99,
    genre: `Drama`,
    released: 2014,
  },
  {
    name: `We need to talk about Kevin`,
    posterImage: `img/the-grand-budapest-hotel-poster.jpg`,
    previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    backgroundImage: `img/bg-the-grand-budapest-hotel.jpg`,
    previewVideoLink: `https://www.kinomania.ru/load/n?file=//fs.kinomania.ru/media/video/a/e1/ae1ea61fe9c315fbd913c38d6ddc7c0d.480.mp4`,
    description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave&aposs friend and protege.`,
    rating: 8.9,
    scoreCount: 240,
    director: `Wes Andreson`,
    staring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
    runTime: 99,
    genre: `Drama`,
    released: 2014,
  },
  {
    name: `What We Do in the Shadows`,
    posterImage: `img/the-grand-budapest-hotel-poster.jpg`,
    previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    backgroundImage: `img/bg-the-grand-budapest-hotel.jpg`,
    previewVideoLink: `https://www.kinomania.ru/load/n?file=//fs.kinomania.ru/media/video/a/e1/ae1ea61fe9c315fbd913c38d6ddc7c0d.480.mp4`,
    description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave&aposs friend and protege.`,
    rating: 8.9,
    scoreCount: 240,
    director: `Wes Andreson`,
    staring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
    runTime: 99,
    genre: `Drama`,
    released: 2014,
  },
  {
    name: `Revenant`,
    posterImage: `img/the-grand-budapest-hotel-poster.jpg`,
    previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    backgroundImage: `img/bg-the-grand-budapest-hotel.jpg`,
    previewVideoLink: `https://www.kinomania.ru/load/n?file=//fs.kinomania.ru/media/video/a/e1/ae1ea61fe9c315fbd913c38d6ddc7c0d.480.mp4`,
    description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave&aposs friend and protege.`,
    rating: 8.9,
    scoreCount: 240,
    director: `Wes Andreson`,
    staring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
    runTime: 99,
    genre: `Drama`,
    released: 2014,
  },
  {
    name: `Johnny English`,
    posterImage: `img/the-grand-budapest-hotel-poster.jpg`,
    previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    backgroundImage: `img/bg-the-grand-budapest-hotel.jpg`,
    previewVideoLink: `https://www.kinomania.ru/load/n?file=//fs.kinomania.ru/media/video/a/e1/ae1ea61fe9c315fbd913c38d6ddc7c0d.480.mp4`,
    description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave&aposs friend and protege.`,
    rating: 8.9,
    scoreCount: 240,
    director: `Wes Andreson`,
    staring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
    runTime: 99,
    genre: `Drama`,
    released: 2014,
  },
  {
    name: `FireFly`,
    posterImage: `img/the-grand-budapest-hotel-poster.jpg`,
    previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    backgroundImage: `img/bg-the-grand-budapest-hotel.jpg`,
    previewVideoLink: `https://www.kinomania.ru/load/n?file=//fs.kinomania.ru/media/video/a/e1/ae1ea61fe9c315fbd913c38d6ddc7c0d.480.mp4`,
    description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave&aposs friend and protege.`,
    rating: 8.9,
    scoreCount: 240,
    director: `Wes Andreson`,
    staring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
    runTime: 99,
    genre: `Sci-Fi`,
    released: 2014,
  },
  {
    name: `StarTrek`,
    posterImage: `img/the-grand-budapest-hotel-poster.jpg`,
    previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    backgroundImage: `img/bg-the-grand-budapest-hotel.jpg`,
    previewVideoLink: `https://www.kinomania.ru/load/n?file=//fs.kinomania.ru/media/video/a/e1/ae1ea61fe9c315fbd913c38d6ddc7c0d.480.mp4`,
    description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave&aposs friend and protege.`,
    rating: 8.9,
    scoreCount: 240,
    director: `Wes Andreson`,
    staring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
    runTime: 99,
    genre: `Sci-Fi`,
    released: 2014,
  },
];
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

describe(`Data Reducer tests`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      promoMovieCard: initialMovie,
      moviesList: [initialMovie],

      genresList: [GENRE_ALL],
      currentGenre: GENRE_ALL,
      showedItemsInMoviesList: SHOWED_ITEMS_IN_MOVIES_LIST_DEFAULT,
      currentMovie: null,
      currentMovieComments: null,
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
      genresList: getGenresList(films),
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
