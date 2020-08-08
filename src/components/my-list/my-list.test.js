import React from "react";
import {Router} from "react-router-dom";
import {Provider} from "react-redux";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import {MyList} from "./my-list.jsx";

import history from "../../history.js";

const mockStore = configureStore([]);
const moviesList = [
  {
    id: 1,
    name: `Fantastic Beasts: The Crimes of Grindelwald`,
    previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    previewVideoLink: `https://www.kinomania.ru/load/n?file=//fs.kinomania.ru/media/video/a/e1/ae1ea61fe9c315fbd913c38d6ddc7c0d.480.mp4`,
  },
  {
    id: 2,
    name: `Bohemian Rhapsody`,
    previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    previewVideoLink: `https://www.kinomania.ru/load/n?file=//fs.kinomania.ru/media/video/a/e1/ae1ea61fe9c315fbd913c38d6ddc7c0d.480.mp4`,
  },
];
const userAuthData = {
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
                loadFavoriteMoviesList = {() => {}}
              />
            </Router>
          </Provider>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
