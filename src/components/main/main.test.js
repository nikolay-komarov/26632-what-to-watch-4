import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";

describe(`Render Main`, () => {
  it(`Should Main render correctly`, () => {
    const movieCard = {
      title: `Star Wars`,
      genre: `fantastic`,
      year: `1977`
    };
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
          <Main
            movieCard = {movieCard}
            moviesList = {moviesList}
            onSmallMovieCardClick = {() => {}}
          />)
        .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
