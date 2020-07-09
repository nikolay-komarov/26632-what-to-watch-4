import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import GenresList from "./genres-list.jsx";
import {GENRE_ALL} from "../../const.js";
import {getGenresList} from "../../utils.js";

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`E2E GenresList tests`, () => {
  const mock = [
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

  it(`Should GenresList Item be clicked`, () => {
    const mockMovieList = mock;
    const mockGenresList = getGenresList(mockMovieList);
    const onGenreItemClick = jest.fn();

    const genresListComponent = shallow(
        <GenresList
          moviesList = {mockMovieList}
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
