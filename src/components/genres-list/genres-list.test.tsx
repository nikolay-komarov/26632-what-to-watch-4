import * as React from "react";
import * as renderer from "react-test-renderer";
import GenresList from "./genres-list";

import {GENRE_ALL} from "../../utils/const";
import {noop} from "../../utils/utils";

describe(`Render GenresList`, () => {
  it(`Should GenresList render correctly`, () => {
    const genresList: string[] = [
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
            onGenreItemClick = {noop}
          />)
        .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
