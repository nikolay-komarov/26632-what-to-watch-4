import React from "react";
import renderer from "react-test-renderer";
import MoviesList from "./movies-list.jsx";

describe(`Render MoviesList`, () => {
  it(`Should MoviesList render correctly`, () => {
    const moviesList = [
      {
        name: `Fantastic Beasts: The Crimes of Grindelwald`,
        previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
      },
      {
        name: `Bohemian Rhapsody`,
        previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
      },
      {
        name: `Macbeth`,
        previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
      },
      {
        name: `Aviator`,
        previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
      },
      {
        name: `We need to talk about Kevin`,
        previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
      },
      {
        name: `What We Do in the Shadows`,
        previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
      },
      {
        name: `Revenant`,
        previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
      },
      {
        name: `Johnny English`,
        previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
      },
    ];

    const tree = renderer
    .create(
        <MoviesList
          moviesList = {moviesList}
          onSmallMovieCardClick = {() => {}}
        />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
