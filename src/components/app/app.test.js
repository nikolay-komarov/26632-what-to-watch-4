import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

describe(`Render App`, () => {
  it(`Should App render correctly`, () => {
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

    const tree = renderer
      .create(
          <App
            movieCard = {movieCard}
            movieList = {movieList}
          />)
        .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
