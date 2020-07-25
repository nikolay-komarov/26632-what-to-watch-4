import React from "react";
import renderer from "react-test-renderer";
import PropTypes from "prop-types";

import withVideoPlayer from "./with-video-player.jsx";
import {VideoPlayerMode} from "../../utils/const.js";

describe(`Render withVideoPlayer`, () => {
  const MockComponent = (props) => {
    const {children} = props;

    return (
      <div>
        {children}
      </div>
    );
  };

  MockComponent.propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ])
  };

  const MockComponentWrapped = withVideoPlayer(MockComponent, VideoPlayerMode.SMALL_MOVIE_CARD);
  const movieCard = {
    name: `Fantastic Beasts: The Crimes of Grindelwald`,
    previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    previewVideoLink: `https://www.kinomania.ru/load/n?file=//fs.kinomania.ru/media/video/a/e1/ae1ea61fe9c315fbd913c38d6ddc7c0d.480.mp4`,
  };

  it(`withVideoPlayer is rendered correctly`, () => {
    const tree = renderer.create((
      <MockComponentWrapped
        movieCard = {movieCard}
        isPlaying = {false}
        onExitButtonClick = {() => {}}
      />), {
      createNodeMock() {
        return {};
      }
    }).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
