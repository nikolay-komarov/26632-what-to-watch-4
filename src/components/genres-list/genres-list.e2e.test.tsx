import * as React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import GenresList from "./genres-list";
import {GENRE_ALL} from "../../utils/const";

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`E2E GenresList tests`, () => {
  const mock = [
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

  it(`Should GenresList Item be clicked`, () => {
    const mockGenresList = mock;
    const onGenreItemClick = jest.fn();

    const genresListComponent = shallow(
        <GenresList
          genresList = {mockGenresList}
          currentGenre = {GENRE_ALL}
          onGenreItemClick = {onGenreItemClick}
        />
    );

    const genresListItems = genresListComponent.find(`.catalog__genres-link`);

    genresListItems.forEach((genreItem, index) => {
      genreItem.simulate(`click`, genreItem.textContent);
      expect(onGenreItemClick).toHaveBeenCalledTimes(index + 1);
      expect(onGenreItemClick.mock.calls[index][0]).toEqual(mockGenresList[index]);
    });
  });
});
