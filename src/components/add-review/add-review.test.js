import React from "react";
import renderer from "react-test-renderer";

import AddReview from "./add-review.jsx";

describe(`Render AddReview`, () => {
  const movie = {
    name: `The Grand Budapest Hotel`,
    posterImage: `img/the-grand-budapest-hotel-poster.jpg`,
    backgroundImage: `img/bg-the-grand-budapest-hotel.jpg`,
  };

  it(`Should AddReview render correctly`, () => {
    const tree = renderer
      .create(
          <AddReview
            movie = {movie}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
