import * as React from "react";
import * as renderer from "react-test-renderer";
import {Router} from "react-router-dom";

import AddReview from "./add-review";

import history from "../../history";
import {AuthorizationStatus} from "../../utils/const";

import {noop} from "../../utils/utils";

import {
  MovieType,
  UserAuthDataType
} from "../../types";

describe(`Render AddReview`, () => {
  const movie: MovieType = {
    id: 0,
    name: `The Grand Budapest Hotel`,
    posterImage: `img/the-grand-budapest-hotel-poster.jpg`,
    backgroundColor: `#ccc`,
    backgroundImage: `img/bg-the-grand-budapest-hotel.jpg`,
    previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    videoLink: `videoLink`,
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
  const userAuthData: UserAuthDataType = {
    id: 1,
    email: `1@1.ru`,
    name: `Name`,
    avatarUrl: `avatar_url`,
  };

  it(`Should AddReview render correctly`, () => {
    const tree = renderer
      .create(
          <Router history = {history} >
            <AddReview
              authorizationStatus = {AuthorizationStatus.AUTH}
              userAuthData = {userAuthData}
              movie = {movie}
              onReviewSend = {noop}
            />
          </Router>,
          {
            createNodeMock: (element) => element
          }
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
