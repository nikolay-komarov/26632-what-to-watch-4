import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

describe(`Render App`, () => {
  it(`Should App render correctly`, () => {
    const movieCard = {
      name: `The Grand Budapest Hotel`,
      posterImage: `img/the-grand-budapest-hotel-poster.jpg`,
      backgroundImage: `img/bg-the-grand-budapest-hotel.jpg`,
      description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave&aposs friend and protege.`,
      rating: 8.9,
      scoreCount: 240,
      director: `Wes Andreson`,
      staring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
      genre: `Drama`,
      released: 2014,
    };
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
          <App
            movieCard = {movieCard}
            moviesList = {moviesList}
          />)
        .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
