import * as React from "react";
import {Router} from "react-router-dom";
import {Provider} from "react-redux";
import * as renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import {MyList} from "./my-list";

import history from "../../history";

import {noop} from "../../utils/utils";

import {
  UserAuthDataType,
  MoviesListType
} from "../../types";

const mockStore = configureStore([]);
const moviesList: MoviesListType = [
  {
    id: 1,
    name: `Fantastic Beasts: The Crimes of Grindelwald`,
    posterImage: `img/the-grand-budapest-hotel-poster.jpg`,
    backgroundColor: `#ccc`,
    backgroundImage: `img/bg-the-grand-budapest-hotel.jpg`,
    videoLink: `videoLink`,
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
  },
  {
    id: 2,
    name: `Bohemian Rhapsody`,
    posterImage: `img/the-grand-budapest-hotel-poster.jpg`,
    backgroundColor: `#ccc`,
    backgroundImage: `img/bg-the-grand-budapest-hotel.jpg`,
    videoLink: `videoLink`,
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
  },
  {
    id: 3,
    name: `Macbeth`,
    posterImage: `img/the-grand-budapest-hotel-poster.jpg`,
    backgroundColor: `#ccc`,
    backgroundImage: `img/bg-the-grand-budapest-hotel.jpg`,
    videoLink: `videoLink`,
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
  },
  {
    id: 4,
    name: `Aviator`,
    posterImage: `img/the-grand-budapest-hotel-poster.jpg`,
    backgroundColor: `#ccc`,
    backgroundImage: `img/bg-the-grand-budapest-hotel.jpg`,
    videoLink: `videoLink`,
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
  },
];
const userAuthData: UserAuthDataType = {
  id: 1,
  email: `1@1.ru`,
  name: `Name`,
  avatarUrl: `avatar_url`,
};

describe(`Render MyList`, () => {
  const store = mockStore({
    favoriteMoviesList: moviesList,
  });

  it(`Should MyList render correctly`, () => {
    const tree = renderer
      .create(
          <Provider store = {store}>
            <Router history = {history} >
              <MyList
                userAuthData = {userAuthData}
                favoriteMoviesList = {moviesList}
                loadFavoriteMoviesList = {noop}
              />
            </Router>
          </Provider>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
