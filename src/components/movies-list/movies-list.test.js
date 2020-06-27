import React from "react";
import renderer from "react-test-renderer";
import MoviesList from "./movies-list.jsx";

describe(`Render MoviesList`, () => {
  it(`Should MoviesList render correctly`, () => {
    const moviesList = [
      {
        name: `Fantastic Beasts: The Crimes of Grindelwald`,
        previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
        previewVideoLink: `https://www.kinomania.ru/load/n?file=//fs.kinomania.ru/media/video/a/e1/ae1ea61fe9c315fbd913c38d6ddc7c0d.480.mp4`,
      },
      {
        name: `Bohemian Rhapsody`,
        previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
        previewVideoLink: `https://www.kinomania.ru/load/n?file=//fs.kinomania.ru/media/video/a/e1/ae1ea61fe9c315fbd913c38d6ddc7c0d.480.mp4`,
      },
      {
        name: `Macbeth`,
        previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
        previewVideoLink: `https://www.kinomania.ru/load/n?file=//fs.kinomania.ru/media/video/a/e1/ae1ea61fe9c315fbd913c38d6ddc7c0d.480.mp4`,
      },
      {
        name: `Aviator`,
        previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
        previewVideoLink: `https://www.kinomania.ru/load/n?file=//fs.kinomania.ru/media/video/a/e1/ae1ea61fe9c315fbd913c38d6ddc7c0d.480.mp4`,
      },
      {
        name: `We need to talk about Kevin`,
        previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
        previewVideoLink: `https://www.kinomania.ru/load/n?file=//fs.kinomania.ru/media/video/a/e1/ae1ea61fe9c315fbd913c38d6ddc7c0d.480.mp4`,
      },
      {
        name: `What We Do in the Shadows`,
        previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
        previewVideoLink: `https://www.kinomania.ru/load/n?file=//fs.kinomania.ru/media/video/a/e1/ae1ea61fe9c315fbd913c38d6ddc7c0d.480.mp4`,
      },
      {
        name: `Revenant`,
        previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
        previewVideoLink: `https://www.kinomania.ru/load/n?file=//fs.kinomania.ru/media/video/a/e1/ae1ea61fe9c315fbd913c38d6ddc7c0d.480.mp4`,
      },
      {
        name: `Johnny English`,
        previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
        previewVideoLink: `https://www.kinomania.ru/load/n?file=//fs.kinomania.ru/media/video/a/e1/ae1ea61fe9c315fbd913c38d6ddc7c0d.480.mp4`,
      },
    ];

    const tree = renderer
    .create(
        <MoviesList
          moviesList = {moviesList}
          onSmallMovieCardClick = {() => {}}
        />, {
          createNodeMock: () => {
            return {};
          }
        })
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
