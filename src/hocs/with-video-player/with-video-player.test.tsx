import * as React from "react";
import * as renderer from "react-test-renderer";

import withVideoPlayer from "./with-video-player";
import {VideoPlayerMode} from "../../utils/const";

import {noop} from "../../utils/utils";

import {
  MovieType,
} from "../../types";

describe(`Render withVideoPlayer`, () => {
  interface MockComponentProps {
    children: React.ReactNode;
  }

  const MockComponent = (props: MockComponentProps) => {
    const {children} = props;

    return (
      <div>
        {children}
      </div>
    );
  };

  const MockComponentWrapped = withVideoPlayer(MockComponent, VideoPlayerMode.SMALL_MOVIE_CARD);
  const movieCard: MovieType = {
    id: 1,
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

  it(`withVideoPlayer is rendered correctly`, () => {
    const tree = renderer.create((
      <MockComponentWrapped
        movieCard = {movieCard}
        isPlaying = {false}
        onExitButtonClick = {noop}
      />), {
      createNodeMock() {
        return {};
      }
    }).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
