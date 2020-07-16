import React from "react";
import renderer from "react-test-renderer";
import BigVideoPlayer from "./big-video-player.jsx";

describe(`Render BigVideoPlayer`, () => {
  it(`Should BigVideoPlayer render correctly`, () => {
    const movieCard = {
      name: `Fantastic Beasts: The Crimes of Grindelwald`,
      previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    };
    const children = <div className="children-mock-component" />;

    const tree = renderer
      .create(
          <BigVideoPlayer
            movieCard = {movieCard}
            isPlaying = {false}
            onPlayButtonClick = {() => {}}
            onFullScreenButtonClick = {() => {}}
            getPlaybackProgress = {() => {}}
            getTimeLeft = {() => {}}
            onExitButtonClick = {() => {}}
          >
            {children}
          </BigVideoPlayer>, {
            createNodeMock: () => {
              return {};
            }
          })
        .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
