import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`E2E Main tests`, () => {
  it(`Should smallMovieCardTitle be click`, () => {
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
    const onSmallMovieCardTitleClick = jest.fn();

    const main = shallow(
        <Main
          movieCard = {movieCard}
          movieList = {movieList}
          onSmallMovieCardTitleClick = {onSmallMovieCardTitleClick}
        />
    );

    const smallMovieCardTitles = main.find(`.small-movie-card__link`);

    smallMovieCardTitles.forEach((title) => {
      title.simulate(`click`);
    });

    expect(onSmallMovieCardTitleClick).toHaveBeenCalledTimes(movieList.length);
  });
});
