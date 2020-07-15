import React from "react";
import PropTypes from "prop-types";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import withVideoPlayer from "./with-video-player.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

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

describe(`E2E withVideoPlayer tests`, () => {
  const movie = {
    name: `Fantastic Beasts: The Crimes of Grindelwald`,
    previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    previewVideoLink: `https://www.kinomania.ru/load/n?file=//fs.kinomania.ru/media/video/a/e1/ae1ea61fe9c315fbd913c38d6ddc7c0d.480.mp4`,
  };

  it(`Checks that HOC's callback turn on video (play)`, () => {
    const SmallMovieCardWrapped = withVideoPlayer(SmallMovieCard);
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
    const SmallMovieCardWrapped = withVideoPlayer(SmallMovieCard);
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
