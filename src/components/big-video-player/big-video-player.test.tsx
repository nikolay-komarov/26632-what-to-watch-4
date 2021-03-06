import * as React from "react";
import * as renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import BigVideoPlayer from "./big-video-player";

import history from "../../history";

import {noop} from "../../utils/utils";

import {
  MovieType,
} from "../../types";

describe(`Render BigVideoPlayer`, () => {
  it(`Should BigVideoPlayer render correctly`, () => {
    const movieCard: MovieType = {
      id: 0,
      name: `The Grand Budapest Hotel`,
      posterImage: `img/the-grand-budapest-hotel-poster.jpg`,
      backgroundColor: `#ccc`,
      backgroundImage: `img/bg-the-grand-budapest-hotel.jpg`,
      videoLink: `videoLink`,
      previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
      previewVideoLink: `https://www.kinomania.ru/load/n?file=//fs.kinomania.ru/media/video/a/e1/ae1ea61fe9c315fbd913c38d6ddc7c0d.480.mp4`,
      description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave&aposs friend and protege.`,
      rating: 8.9,
      scoreCount: 240,
      director: `Wes Andreson`,
      staring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
      runTime: 99,
      genre: `Drama`,
      released: 2014,
      isFavorite: true,
    };
    const children: React.ReactNode = <div className="children-mock-component" />;

    const tree = renderer
      .create(
          <Router history = {history}>
            <BigVideoPlayer
              movieCard = {movieCard}
              isPlaying = {false}
              onPlayButtonClick = {noop}
              onFullScreenButtonClick = {noop}
              getPlaybackProgress = {noop}
              getTimeLeft = {noop}
            >
              {children}
            </BigVideoPlayer>
          </Router>, {
            createNodeMock: () => {
              return {};
            }
          })
        .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
