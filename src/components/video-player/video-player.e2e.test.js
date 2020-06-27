import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import VideoPlayer from "./video-player.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`E2E VideoPlayer tests`, () => {
  const mock = {
    previewImage: `previewImage`,
    previewVideoLink: `previewVideoLink`,
  };

  it(`Test state - play`, () => {
    const initialState = {
      progress: 0,
      isLoading: true,
      isPlaying: true,
    };

    const audioPlayer = mount(
        <VideoPlayer
          isPlaying = {initialState.isPlaying}
          movieCard = {mock}
        />
    );

    expect(audioPlayer.state().isPlaying).toEqual(initialState.isPlaying);
  });

  it(`Test state - pause`, () => {
    const initialState = {
      progress: 0,
      isLoading: true,
      isPlaying: false,
    };

    const audioPlayer = mount(
        <VideoPlayer
          isPlaying = {initialState.isPlaying}
          movieCard = {mock}
        />
    );

    expect(audioPlayer.state().isPlaying).toEqual(initialState.isPlaying);
  });
});
