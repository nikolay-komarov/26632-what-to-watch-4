import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

describe(`Render App`, () => {
  it(`Should App render correctly`, () => {
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
          <App
            movieCard = {movieCard}
            moviesList = {moviesList}
          />)
        .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
