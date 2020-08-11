import * as React from "react";
import {configure, mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";

import withVideoPlayer from "./with-video-player";
import {VideoPlayerMode} from "../../utils/const";

import {
  MovieType,
} from "../../types";

configure({
  adapter: new Adapter(),
});

describe(`E2E withVideoPlayer from SmallMovieCard tests`, () => {
  interface MockComponentProps {
    onSmallMovieCardHover: () => void;
    onSmallMovieCardLeave: () => void;
    children: React.ReactNode;
  }

  const SmallMovieCard: React.FC = (props: MockComponentProps) => {
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

  it(`Checks that HOC's callback turn on video (play)`, () => {
    const SmallMovieCardWrapped = withVideoPlayer(SmallMovieCard, VideoPlayerMode.SMALL_MOVIE_CARD);
    const wrapper = mount(<SmallMovieCardWrapped
      isPlaying={false}
      movieCard = {movieCard}
    />);

    window.HTMLMediaElement.prototype.play = () => Promise.resolve();

    const {videoRef} = wrapper.instance();

    jest.spyOn(videoRef.current, `play`);

    wrapper.instance().componentDidMount();

    wrapper.find(`article`).simulate(`mouseover`);

    expect(videoRef.current.play).toHaveBeenCalledTimes(1);
  });

  it(`Checks that HOC's callback turn off video (load)`, () => {
    const SmallMovieCardWrapped = withVideoPlayer(SmallMovieCard, VideoPlayerMode.SMALL_MOVIE_CARD);
    const wrapper = mount(<SmallMovieCardWrapped
      isPlaying={false}
      movieCard = {movieCard}
    />);

    window.HTMLMediaElement.prototype.load = () => Promise.resolve();

    const {videoRef} = wrapper.instance();

    jest.spyOn(videoRef.current, `load`);

    wrapper.instance().componentDidMount();

    wrapper.find(`article`).simulate(`mouseover`);
    wrapper.find(`article`).simulate(`mouseleave`);

    expect(videoRef.current.load).toHaveBeenCalledTimes(1);
  });
});

describe(`E2E withVideoPlayer for BigVideoPlayer tests`, () => {
  interface MockComponentProps {
    onPlayButtonClick: () => void;
    onFullScreenButtonClick: () => void;
    children: React.ReactNode;
  }

  const BigVideoPlayer: React.FC = (props: MockComponentProps) => {
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

  it(`Checks that HOC's callback turn on video (play)`, () => {
    const BigVideoPlayerWrapped = withVideoPlayer(BigVideoPlayer, VideoPlayerMode.BIG_MOVIE_PLAYER);
    const wrapper = mount(<BigVideoPlayerWrapped
      isPlaying={false}
      movieCard = {movieCard}
    />);

    window.HTMLMediaElement.prototype.play = () => Promise.resolve();

    const {videoRef} = wrapper.instance();

    jest.spyOn(videoRef.current, `play`);

    wrapper.instance().componentDidMount();

    wrapper.find(`button.player__play`).simulate(`click`);

    expect(videoRef.current.play).toHaveBeenCalledTimes(1);
  });

  it(`Checks that HOC's callback turn off video (pause)`, () => {
    const BigVideoPlayerWrapped = withVideoPlayer(BigVideoPlayer, VideoPlayerMode.BIG_MOVIE_PLAYER);
    const wrapper = mount(<BigVideoPlayerWrapped
      isPlaying={true}
      movieCard = {movieCard}
    />);

    window.HTMLMediaElement.prototype.pause = () => Promise.resolve();

    const {videoRef} = wrapper.instance();

    jest.spyOn(videoRef.current, `pause`);

    wrapper.instance().componentDidMount();

    wrapper.find(`button.player__play`).simulate(`click`);

    expect(videoRef.current.pause).toHaveBeenCalledTimes(1);
  });

  it(`Checks that HOC's callback fullscreen`, () => {
    const BigVideoPlayerWrapped = withVideoPlayer(BigVideoPlayer, VideoPlayerMode.BIG_MOVIE_PLAYER);
    const wrapper = mount(<BigVideoPlayerWrapped
      isPlaying={false}
      movieCard = {movieCard}
    />);

    window.HTMLMediaElement.prototype.requestFullscreen = () => Promise.resolve();

    const {videoRef} = wrapper.instance();

    jest.spyOn(videoRef.current, `requestFullscreen`);

    wrapper.instance().componentDidMount();

    wrapper.find(`button.player__full-screen`).simulate(`click`);

    expect(videoRef.current.requestFullscreen).toHaveBeenCalledTimes(1);
  });
});
