import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

import {App} from "./app.jsx";
import {
  GENRE_ALL,
  SHOWED_ITEMS_IN_MOVIES_LIST_DEFAULT,
  AppPage
} from "../../const.js";

const mockStore = configureStore([]);

const movieCard = {
  name: `The Grand Budapest Hotel`,
  posterImage: `img/the-grand-budapest-hotel-poster.jpg`,
  backgroundImage: `img/bg-the-grand-budapest-hotel.jpg`,
  previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
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
const movieComments = [
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
const moviesList = [
  {
    name: `Fantastic Beasts: The Crimes of Grindelwald`,
    previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    previewVideoLink: `https://www.kinomania.ru/load/n?file=//fs.kinomania.ru/media/video/a/e1/ae1ea61fe9c315fbd913c38d6ddc7c0d.480.mp4`,
    genre: `Drama`,
  },
  {
    name: `Bohemian Rhapsody`,
    previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    previewVideoLink: `https://www.kinomania.ru/load/n?file=//fs.kinomania.ru/media/video/a/e1/ae1ea61fe9c315fbd913c38d6ddc7c0d.480.mp4`,
    genre: `Drama`,
  },
  {
    name: `Macbeth`,
    previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    previewVideoLink: `https://www.kinomania.ru/load/n?file=//fs.kinomania.ru/media/video/a/e1/ae1ea61fe9c315fbd913c38d6ddc7c0d.480.mp4`,
    genre: `Drama`,
  },
  {
    name: `Aviator`,
    previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    previewVideoLink: `https://www.kinomania.ru/load/n?file=//fs.kinomania.ru/media/video/a/e1/ae1ea61fe9c315fbd913c38d6ddc7c0d.480.mp4`,
    genre: `Drama`,
  },
  {
    name: `We need to talk about Kevin`,
    previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    previewVideoLink: `https://www.kinomania.ru/load/n?file=//fs.kinomania.ru/media/video/a/e1/ae1ea61fe9c315fbd913c38d6ddc7c0d.480.mp4`,
    genre: `Drama`,
  },
  {
    name: `What We Do in the Shadows`,
    previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    previewVideoLink: `https://www.kinomania.ru/load/n?file=//fs.kinomania.ru/media/video/a/e1/ae1ea61fe9c315fbd913c38d6ddc7c0d.480.mp4`,
    genre: `Drama`,
  },
  {
    name: `Revenant`,
    previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    previewVideoLink: `https://www.kinomania.ru/load/n?file=//fs.kinomania.ru/media/video/a/e1/ae1ea61fe9c315fbd913c38d6ddc7c0d.480.mp4`,
    genre: `Drama`,
  },
  {
    name: `Johnny English`,
    previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    previewVideoLink: `https://www.kinomania.ru/load/n?file=//fs.kinomania.ru/media/video/a/e1/ae1ea61fe9c315fbd913c38d6ddc7c0d.480.mp4`,
    genre: `Drama`,
  },
];
const showedItemsInMoviesList = SHOWED_ITEMS_IN_MOVIES_LIST_DEFAULT;

describe(`Render App`, () => {
  it(`Should App render correctly with MAIN_PAGE`, () => {
    const store = mockStore({});

    const tree = renderer
      .create(
          <Provider store = {store}>
            <App
              currentAppPage = {AppPage.MAIN_PAGE}
              promoMovieCard = {movieCard}
              currentGenre = {GENRE_ALL}
              moviesList = {moviesList}
              showedItemsInMoviesList = {showedItemsInMoviesList}
              onSmallMovieCardClick = {() => {}}
              onGenreItemClick = {() => {}}
              onShowMoreButtonClick = {() => {}}
              onPlayButtonClick = {() => {}}
              onBigPlayerExitButtonClick = {() => {}}
            />
          </Provider>, {
            createNodeMock: () => {
              return {};
            }
          })
        .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Should App render correctly with MOVIE_PAGE`, () => {
    const store = mockStore({});

    const tree = renderer
      .create(
          <Provider store = {store}>
            <App
              currentAppPage = {AppPage.MOVIE_PAGE}
              promoMovieCard = {movieCard}
              currentGenre = {GENRE_ALL}
              moviesList = {moviesList}
              showedItemsInMoviesList = {showedItemsInMoviesList}
              currentMovie = {movieCard}
              currentMovieComments = {movieComments}
              onSmallMovieCardClick = {() => {}}
              onGenreItemClick = {() => {}}
              onShowMoreButtonClick = {() => {}}
              onPlayButtonClick = {() => {}}
              onBigPlayerExitButtonClick = {() => {}}
            />
          </Provider>, {
            createNodeMock: () => {
              return {};
            }
          })
        .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Should App render correctly with BIG_MOVIE_PAGE`, () => {
    const store = mockStore({});

    const tree = renderer
      .create(
          <Provider store = {store}>
            <App
              currentAppPage = {AppPage.BIG_MOVIE_PLAYER}
              promoMovieCard = {movieCard}
              currentGenre = {GENRE_ALL}
              moviesList = {moviesList}
              showedItemsInMoviesList = {showedItemsInMoviesList}
              onSmallMovieCardClick = {() => {}}
              onGenreItemClick = {() => {}}
              onShowMoreButtonClick = {() => {}}
              onPlayButtonClick = {() => {}}
              onBigPlayerExitButtonClick = {() => {}}
            />
          </Provider>, {
            createNodeMock: () => {
              return {};
            }
          })
        .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
