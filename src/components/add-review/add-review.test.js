import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";

import AddReview from "./add-review.jsx";

import history from "../../history.js";
import {AuthorizationStatus} from "../../utils/const.js";

describe(`Render AddReview`, () => {
  const movie = {
    id: 1,
    name: `The Grand Budapest Hotel`,
    posterImage: `img/the-grand-budapest-hotel-poster.jpg`,
    backgroundImage: `img/bg-the-grand-budapest-hotel.jpg`,
  };
  const userAuthData = {
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
              onReviewSend = {() => {}}
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
