import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import BigVideoPlayer from "./big-video-player";

import {noop} from "../../utils/utils";

import {
  MovieType,
} from "../../types";

configure({
  adapter: new Adapter(),
});

describe(`E2E BigVideoPlayer tests`, () => {
  const mock: MovieType = {
    id: 1,
    name: `Firefly`,
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

  it(`Should BigVideoPlayer be clicked to play/pause`, () => {
    const movieCard = mock;
    const onPlayButtonClick = jest.fn();

    const bigVideoPlayerComponent = shallow(
        <BigVideoPlayer
          movieCard = {movieCard}
          isPlaying = {false}
          onPlayButtonClick = {onPlayButtonClick}
          onFullScreenButtonClick = {noop}
          getPlaybackProgress = {() => null}
          getTimeLeft = {() => null}
        >
          {children}
        </BigVideoPlayer>
    );

    const playerPlayButton = bigVideoPlayerComponent.find(`.player__play`);

    playerPlayButton.simulate(`click`);
    expect(onPlayButtonClick).toHaveBeenCalledTimes(1);

    playerPlayButton.simulate(`click`);
    expect(onPlayButtonClick).toHaveBeenCalledTimes(2);
  });

  it(`Should BigVideoPlayer be clicked to FullScreenButton`, () => {
    const movieCard = mock;
    const onFullScreenButtonClick = jest.fn();

    const bigVideoPlayerComponent = shallow(
        <BigVideoPlayer
          movieCard = {movieCard}
          isPlaying = {false}
          onPlayButtonClick = {noop}
          onFullScreenButtonClick = {onFullScreenButtonClick}
          getPlaybackProgress = {() => null}
          getTimeLeft = {() => null}
        >
          {children}
        </BigVideoPlayer>
    );

    const playerFullScreen = bigVideoPlayerComponent.find(`.player__full-screen`);

    playerFullScreen.simulate(`click`);
    expect(onFullScreenButtonClick).toHaveBeenCalledTimes(1);
  });
});
