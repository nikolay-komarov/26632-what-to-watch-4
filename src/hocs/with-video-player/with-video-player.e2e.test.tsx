import React from "react";
import PropTypes from "prop-types";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import withVideoPlayer from "./with-video-player";
import {VideoPlayerMode} from "../../utils/const";

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`E2E withVideoPlayer from SmallMovieCard tests`, () => {
  const SmallMovieCard = (props) => {
    const {
      onSmallMovieCardHover,
      onSmallMovieCardLeave,
      children,
    } = props;

    return (
      <article
        onMouseOver = {onSmallMovieCardHover}
        onMouseLeave = {onSmallMovieCardLeave}
      >
        {children}
      </article>
    );
  };

  SmallMovieCard.propTypes = {
    onSmallMovieCardHover: PropTypes.func.isRequired,
    onSmallMovieCardLeave: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]).isRequired,
  };

  const movie = {
    name: `Fantastic Beasts: The Crimes of Grindelwald`,
    previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    previewVideoLink: `https://www.kinomania.ru/load/n?file=//fs.kinomania.ru/media/video/a/e1/ae1ea61fe9c315fbd913c38d6ddc7c0d.480.mp4`,
  };

  it(`Checks that HOC's callback turn on video (play)`, () => {
    const SmallMovieCardWrapped = withVideoPlayer(SmallMovieCard, VideoPlayerMode.SMALL_MOVIE_CARD);
    const wrapper = mount(<SmallMovieCardWrapped
      isPlaying={false}
      movieCard = {movie}
    />);

    window.HTMLMediaElement.prototype.play = () => {};

    const {_videoRef} = wrapper.instance();

    jest.spyOn(_videoRef.current, `play`);

    wrapper.instance().componentDidMount();

    wrapper.find(`article`).simulate(`mouseover`);

    expect(_videoRef.current.play).toHaveBeenCalledTimes(1);
  });

  it(`Checks that HOC's callback turn off video (load)`, () => {
    const SmallMovieCardWrapped = withVideoPlayer(SmallMovieCard, VideoPlayerMode.SMALL_MOVIE_CARD);
    const wrapper = mount(<SmallMovieCardWrapped
      isPlaying={false}
      movieCard = {movie}
    />);

    window.HTMLMediaElement.prototype.load = () => {};

    const {_videoRef} = wrapper.instance();

    jest.spyOn(_videoRef.current, `load`);

    wrapper.instance().componentDidMount();

    wrapper.find(`article`).simulate(`mouseover`);
    wrapper.find(`article`).simulate(`mouseleave`);

    expect(_videoRef.current.load).toHaveBeenCalledTimes(1);
  });
});

describe(`E2E withVideoPlayer for BigVideoPlayer tests`, () => {
  const BigVideoPlayer = (props) => {
    const {
      onPlayButtonClick,
      onFullScreenButtonClick,
      children,
    } = props;

    return (
      <>
        <button
          className = "player__play"
          onClick = {onPlayButtonClick}
        />
        <button
          className = "player__full-screen"
          onClick = {onFullScreenButtonClick}
        />
        {children}
      </>
    );
  };

  BigVideoPlayer.propTypes = {
    onPlayButtonClick: PropTypes.func.isRequired,
    onFullScreenButtonClick: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]).isRequired,
  };

  const movie = {
    name: `Fantastic Beasts: The Crimes of Grindelwald`,
    previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    previewVideoLink: `https://www.kinomania.ru/load/n?file=//fs.kinomania.ru/media/video/a/e1/ae1ea61fe9c315fbd913c38d6ddc7c0d.480.mp4`,
  };

  it(`Checks that HOC's callback turn on video (play)`, () => {
    const BigVideoPlayerWrapped = withVideoPlayer(BigVideoPlayer, VideoPlayerMode.BIG_MOVIE_PLAYER);
    const wrapper = mount(<BigVideoPlayerWrapped
      isPlaying={false}
      movieCard = {movie}
    />);

    window.HTMLMediaElement.prototype.play = () => {};

    const {_videoRef} = wrapper.instance();

    jest.spyOn(_videoRef.current, `play`);

    wrapper.instance().componentDidMount();

    wrapper.find(`button.player__play`).simulate(`click`);

    expect(_videoRef.current.play).toHaveBeenCalledTimes(1);
  });

  it(`Checks that HOC's callback turn off video (pause)`, () => {
    const BigVideoPlayerWrapped = withVideoPlayer(BigVideoPlayer, VideoPlayerMode.BIG_MOVIE_PLAYER);
    const wrapper = mount(<BigVideoPlayerWrapped
      isPlaying={true}
      movieCard = {movie}
    />);

    window.HTMLMediaElement.prototype.pause = () => {};

    const {_videoRef} = wrapper.instance();

    jest.spyOn(_videoRef.current, `pause`);

    wrapper.instance().componentDidMount();

    wrapper.find(`button.player__play`).simulate(`click`);

    expect(_videoRef.current.pause).toHaveBeenCalledTimes(1);
  });

  it(`Checks that HOC's callback fullscreen`, () => {
    const BigVideoPlayerWrapped = withVideoPlayer(BigVideoPlayer, VideoPlayerMode.BIG_MOVIE_PLAYER);
    const wrapper = mount(<BigVideoPlayerWrapped
      isPlaying={false}
      movieCard = {movie}
    />);

    window.HTMLMediaElement.prototype.requestFullscreen = () => {};

    const {_videoRef} = wrapper.instance();

    jest.spyOn(_videoRef.current, `requestFullscreen`);

    wrapper.instance().componentDidMount();

    wrapper.find(`button.player__full-screen`).simulate(`click`);

    expect(_videoRef.current.requestFullscreen).toHaveBeenCalledTimes(1);
  });
});
