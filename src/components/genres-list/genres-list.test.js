import React from "react";
import renderer from "react-test-renderer";
import GenresList from "./genres-list.jsx";

import {GENRE_ALL} from "../../utils/const.js";

describe(`Render GenresList`, () => {
  it(`Should GenresList render correctly`, () => {
    const moviesList = [
      {
        genre: `Comedies`,
      },
      {
        genre: `Crime`,
      },
      {
        genre: `Documentary`,
      },
      {
        genre: `Drama`,
      },
      {
        genre: `Horror`,
      },
      {
        genre: `Kids & Family`,
      },
      {
        genre: `Romance`,
      },
      {
        genre: `Sci-Fi`,
      },
      {
        genre: `Thrillers`,
      },
      {
        genre: `Drama`,
      }
    ];

    const tree = renderer
      .create(
          <GenresList
            moviesList = {moviesList}
            currentGenre = {GENRE_ALL}
            onGenreItemClick = {() => {}}
          />)
        .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
