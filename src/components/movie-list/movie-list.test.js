import React from "react";
import renderer from "react-test-renderer";
import MoviesList from "./movie-list.jsx";

describe(`Render MoviesList`, () => {
  it(`Should MoviesList render correctly`, () => {
    const moviesList = [
      {
        name: `Fantastic Beasts: The Crimes of Grindelwald`,
        posterImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
      },
      {
        name: `Bohemian Rhapsody`,
        posterImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
      },
      {
        name: `Macbeth`,
        posterImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
      },
      {
        name: `Aviator`,
        posterImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
      },
      {
        name: `We need to talk about Kevin`,
        posterImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
      },
      {
        name: `What We Do in the Shadows`,
        posterImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
      },
      {
        name: `Revenant`,
        posterImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
      },
      {
        name: `Johnny English`,
        posterImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
      },
    ];

    const tree = renderer
    .create(
        <MoviesList
          moviesList = {moviesList}
        />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
