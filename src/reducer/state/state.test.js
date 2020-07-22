import {reducer, ActionType, ActionCreator} from "./state.js";
import {
  GENRE_ALL,
  SHOWED_ITEMS_IN_MOVIES_LIST_DEFAULT,
  AppPage,
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

describe(`State Reducer tests`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      currentAppPage: AppPage.MAIN_PAGE,
      currentGenre: GENRE_ALL,
      showedItemsInMoviesList: SHOWED_ITEMS_IN_MOVIES_LIST_DEFAULT,
      currentMovie: null,
      currentMovieComments: null,
    });
  });

  it(`Reducer should change currentAppPage to MoviPage`, () => {
    expect(reducer({
      currentAppPage: AppPage.MAIN_PAGE,
    }, {
      type: ActionType.CHANGE_CURRENT_APP_PAGE,
      payload: AppPage.MOVIE_PAGE,
    })).toEqual({
      currentAppPage: AppPage.MOVIE_PAGE,
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

describe(`State ActionCreator tests`, () => {
  it(`ActionCreator for changeAppPage return correct action`, () => {
    expect(ActionCreator.changeAppPage(AppPage.MOVIE_PAGE)).toEqual({
      type: ActionType.CHANGE_CURRENT_APP_PAGE,
      payload: AppPage.MOVIE_PAGE,
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
