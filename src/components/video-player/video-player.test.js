import React from "react";
import renderer from "react-test-renderer";
import VideoPlayer from "./video-player.jsx";

describe(`Render VideoPlayer`, () => {
  const mock = {
    previewImage: `image`,
    previewVideoLink: `videoLink`
  };

  it(`VideoPlayer is rendered correctly with play`, () => {
    const tree = renderer.create(
        <VideoPlayer
          isPlaying = {true}
          movieCard = {mock}
        />, {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`VideoPlayer is rendered correctly with pause`, () => {
    const tree = renderer.create(
        <VideoPlayer
          isPlaying = {false}
          movieCard = {mock}
        />, {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
