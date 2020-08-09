import * as React from "react";
import * as renderer from "react-test-renderer";
import GenresList from "./genres-list";

import {GENRE_ALL} from "../../utils/const";

describe(`Render GenresList`, () => {
  it(`Should GenresList render correctly`, () => {
    const genresList = [
      `Comedies`,
      `Crime`,
      `Documentary`,
      `Drama`,
      `Horror`,
      `Kids & Family`,
      `Romance`,
      `Sci-Fi`,
      `Thrillers`,
      `Drama`,
    ];

    const tree = renderer
      .create(
          <GenresList
            genresList = {genresList}
            currentGenre = {GENRE_ALL}
            onGenreItemClick = {() => {}}
          />)
        .toJSON();

    expect(tree).toMatchSnapshot();
  });
});