import React from "react";
import renderer from "react-test-renderer";
import MoviePage from "./movie-page.jsx";

describe(`Render MoviePage`, () => {
  it(`Should MoviePage render correctly`, () => {
    const movie = {
      name: `The Grand Budapest Hotel`,
      posterImage: `img/the-grand-budapest-hotel-poster.jpg`,
      backgroundImage: `img/bg-the-grand-budapest-hotel.jpg`,
      previewVideoLink: `https://www.kinomania.ru/load/n?file=//fs.kinomania.ru/media/video/a/e1/ae1ea61fe9c315fbd913c38d6ddc7c0d.480.mp4`,
      description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave&aposs friend and protege.`,
      rating: 8.9,
      scoreCount: 240,
      director: `Wes Andreson`,
      staring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
      genre: `Drama`,
      released: 2014,
    };

    const tree = renderer
      .create(
          <MoviePage
            movieDetails = {movie}
          />)
        .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
