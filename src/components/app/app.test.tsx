import * as React from "react";
import * as renderer from "react-test-renderer";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";
import configureStore from "redux-mock-store";

import {App} from "./app";
import {
  GENRE_ALL,
  SHOWED_ITEMS_IN_MOVIES_LIST_DEFAULT,
  AuthorizationStatus,
} from "../../utils/const";
import {getGenresList} from "../../utils/utils";
import history from "../../history";

const mockStore = configureStore([]);

const movieCard = {
  id: 0,
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
  isFavorite: true,
};
const moviesList = [
  {
    id: 1,
    name: `Fantastic Beasts: The Crimes of Grindelwald`,
    previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    previewVideoLink: `https://www.kinomania.ru/load/n?file=//fs.kinomania.ru/media/video/a/e1/ae1ea61fe9c315fbd913c38d6ddc7c0d.480.mp4`,
    genre: `Drama`,
  },
  {
    id: 2,
    name: `Bohemian Rhapsody`,
    previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    previewVideoLink: `https://www.kinomania.ru/load/n?file=//fs.kinomania.ru/media/video/a/e1/ae1ea61fe9c315fbd913c38d6ddc7c0d.480.mp4`,
    genre: `Drama`,
  },
  {
    id: 3,
    name: `Macbeth`,
    previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    previewVideoLink: `https://www.kinomania.ru/load/n?file=//fs.kinomania.ru/media/video/a/e1/ae1ea61fe9c315fbd913c38d6ddc7c0d.480.mp4`,
    genre: `Drama`,
  },
  {
    id: 4,
    name: `Aviator`,
    previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    previewVideoLink: `https://www.kinomania.ru/load/n?file=//fs.kinomania.ru/media/video/a/e1/ae1ea61fe9c315fbd913c38d6ddc7c0d.480.mp4`,
    genre: `Drama`,
  },
  {
    id: 5,
    name: `We need to talk about Kevin`,
    previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    previewVideoLink: `https://www.kinomania.ru/load/n?file=//fs.kinomania.ru/media/video/a/e1/ae1ea61fe9c315fbd913c38d6ddc7c0d.480.mp4`,
    genre: `Drama`,
  },
  {
    id: 6,
    name: `What We Do in the Shadows`,
    previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    previewVideoLink: `https://www.kinomania.ru/load/n?file=//fs.kinomania.ru/media/video/a/e1/ae1ea61fe9c315fbd913c38d6ddc7c0d.480.mp4`,
    genre: `Drama`,
  },
  {
    id: 7,
    name: `Revenant`,
    previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    previewVideoLink: `https://www.kinomania.ru/load/n?file=//fs.kinomania.ru/media/video/a/e1/ae1ea61fe9c315fbd913c38d6ddc7c0d.480.mp4`,
    genre: `Drama`,
  },
  {
    id: 8,
    name: `Johnny English`,
    previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    previewVideoLink: `https://www.kinomania.ru/load/n?file=//fs.kinomania.ru/media/video/a/e1/ae1ea61fe9c315fbd913c38d6ddc7c0d.480.mp4`,
    genre: `Drama`,
  },
];
const userAuthData = {
  id: 1,
  email: `1@1.ru`,
  name: `Name`,
  avatarUrl: `avatar_url`,
};

const genresList = getGenresList(moviesList);
const showedItemsInMoviesList = SHOWED_ITEMS_IN_MOVIES_LIST_DEFAULT;

describe(`Render App`, () => {
  it(`Should App render correctly`, () => {
    const store = mockStore({});

    const tree = renderer
      .create(
          <Provider store = {store}>
            <Router history = {history} >
              <App
                authorizationStatus = {AuthorizationStatus.NO_AUTH}
                authorizationError = {false}
                userAuthData = {userAuthData}
                promoMovieCard = {movieCard}
                genresList = {genresList}
                currentGenre = {GENRE_ALL}
                moviesList = {moviesList}
                moviesByGenreList = {moviesList}
                showedItemsInMoviesList = {showedItemsInMoviesList}
                onGenreItemClick = {() => {}}
                onShowMoreButtonClick = {() => {}}
                login = {() => {}}
                isMoviesListLoaded = {true}
                IsPromoMovieLoaded = {true}
                onReviewSend = {() => {}}
                onSendIsFavoriteMovie = {() => {}}
              />
            </Router>
          </Provider>, {
            createNodeMock: () => {
              return {};
            }
          })
        .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
