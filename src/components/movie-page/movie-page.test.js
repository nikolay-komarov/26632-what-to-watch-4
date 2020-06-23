import React from "react";
import renderer from "react-test-renderer";
import MoviePage from "./movie-page.jsx";

describe(`Render MoviePage`, () => {
  it(`Should MoviePage render correctly`, () => {
    const tree = renderer
      .create(
          <MoviePage />)
        .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
