import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import BigVideoPlayer from "./big-video-player.jsx";

import history from "../../history.js";

describe(`Render BigVideoPlayer`, () => {
  it(`Should BigVideoPlayer render correctly`, () => {
    const movieCard = {
      id: 1,
      name: `Fantastic Beasts: The Crimes of Grindelwald`,
      previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    };
    const children = <div className="children-mock-component" />;

    const tree = renderer
      .create(
          <Router history = {history}>
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
