import React from "react";
import renderer from "react-test-renderer";
import SmallMovieCard from "./small-movie-card.jsx";

describe(`Render SmallMovieCard`, () => {
  it(`Should SmallMovieCard render correctly`, () => {
    const smallMovieCard = {
      name: `Fantastic Beasts: The Crimes of Grindelwald`,
      previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
      previewVideoLink: `https://www.kinomania.ru/load/n?file=//fs.kinomania.ru/media/video/a/e1/ae1ea61fe9c315fbd913c38d6ddc7c0d.480.mp4`,
    };

    const tree = renderer
      .create(
          <SmallMovieCard
            movieCard = {smallMovieCard}
            onActiveItemChange = {() => {}}
            onSmallMovieCardClick = {() => {}}
            isPlaying = {false}
          />, {
            createNodeMock: () => {
              return {};
            }
          })
        .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
