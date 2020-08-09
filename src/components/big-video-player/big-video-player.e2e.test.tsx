import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import BigVideoPlayer from "./big-video-player";

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`E2E BigVideoPlayer tests`, () => {
  const mock = {
    id: 1,
    name: `Firefly`,
    previewImage: `previewImage`,
    previewVideoLink: `previewVideoLink`,
  };
  const children = <div className="children-mock-component" />;

  it(`Should BigVideoPlayer be clicked to play/pause`, () => {
    const movieCard = mock;
    const onPlayButtonClick = jest.fn();

    const bigVideoPlayerComponent = shallow(
        <BigVideoPlayer
          movieCard = {movieCard}
          isPlaying = {false}
          onPlayButtonClick = {onPlayButtonClick}
          onFullScreenButtonClick = {() => {}}
          getPlaybackProgress = {() => {}}
          getTimeLeft = {() => {}}
          onExitButtonClick = {() => {}}
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
          onPlayButtonClick = {() => {}}
          onFullScreenButtonClick = {onFullScreenButtonClick}
          getPlaybackProgress = {() => {}}
          getTimeLeft = {() => {}}
          onExitButtonClick = {() => {}}
        >
          {children}
        </BigVideoPlayer>
    );

    const playerFullScreen = bigVideoPlayerComponent.find(`.player__full-screen`);

    playerFullScreen.simulate(`click`);
    expect(onFullScreenButtonClick).toHaveBeenCalledTimes(1);
  });
});
