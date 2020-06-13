import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";

describe(`Render Main`, () => {
  it(`Should Main render correctly`, () => {
    const movieCard = {
      title: `Star Wars`,
      genre: `fantastic`,
      year: `1977`
    };
    const movieList = [
      `The Witcher`,
      `The Expance`,
      `Stranger Things`,
      `Firefly`
    ];
    const smallMovieCardTitleHandler = () => {};

    const tree = renderer
      .create(
          <Main
            movieCard = {movieCard}
            movieList = {movieList}
            onSmallMovieCardTitleClick = {smallMovieCardTitleHandler}
          />)
        .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
