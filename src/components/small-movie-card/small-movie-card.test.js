import React from "react";
import renderer from "react-test-renderer";
import SmallMovieCard from "./small-movie-card.jsx";

describe(`Render SmallMovieCard`, () => {
  it(`Should SmallMovieCard render correctly`, () => {
    const smallMovieCard = {
      name: `Fantastic Beasts: The Crimes of Grindelwald`,
      previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    };

    const tree = renderer
      .create(
          <SmallMovieCard
            movieCard = {smallMovieCard}
            onSmallMovieCardHover = {() => {}}
            onSmallMovieCardLeave = {() => {}}
            onSmallMovieCardClick = {() => {}}
          />)
        .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
