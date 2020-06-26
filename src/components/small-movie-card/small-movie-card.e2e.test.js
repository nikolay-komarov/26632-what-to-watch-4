import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SmallMovieCard from "./small-movie-card.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`E2E SmallMovieCard tests`, () => {
  const mock = {
    name: `Firefly`,
    previewImage: `previewImage`,
    previewVideoLink: `https://www.kinomania.ru/load/n?file=//fs.kinomania.ru/media/video/a/e1/ae1ea61fe9c315fbd913c38d6ddc7c0d.480.mp4`,
  };

  it(`Should SmallMovieCard be hover`, () => {
    const movieCard = mock;
    const onSmallMovieCardHover = jest.fn();

    const smallMovieCardComponent = shallow(
        <SmallMovieCard
          movieCard = {movieCard}
          onSmallMovieCardHover = {onSmallMovieCardHover}
          onSmallMovieCardLeave = {() => {}}
          onSmallMovieCardClick = {() => {}}
          isPlaying = {false}
        />
    );

    const smallMovieCardArticle = smallMovieCardComponent.find(`.small-movie-card`);

    smallMovieCardArticle.simulate(`mouseover`, movieCard);
    expect(onSmallMovieCardHover).toHaveBeenCalledTimes(1);
    expect(onSmallMovieCardHover.mock.calls[0][0]).toMatchObject(movieCard);
  });

  it(`Should SmallMovieCard be leaved`, () => {
    const movieCard = mock;
    const onSmallMovieCardLeave = jest.fn();

    const smallMovieCardComponent = shallow(
        <SmallMovieCard
          movieCard = {movieCard}
          onSmallMovieCardHover = {() => {}}
          onSmallMovieCardLeave = {onSmallMovieCardLeave}
          onSmallMovieCardClick = {() => {}}
          isPlaying = {true}
        />
    );

    const smallMovieCardArticle = smallMovieCardComponent.find(`.small-movie-card`);

    smallMovieCardArticle.simulate(`mouseleave`);
    expect(onSmallMovieCardLeave).toHaveBeenCalledTimes(1);
  });

  it(`Should SmallMovieCard be clicked`, () => {
    const movieCard = mock;
    const onSmallMovieCardClick = jest.fn();

    const smallMovieCardComponent = shallow(
        <SmallMovieCard
          movieCard = {movieCard}
          onSmallMovieCardHover = {() => {}}
          onSmallMovieCardLeave = {() => {}}
          onSmallMovieCardClick = {onSmallMovieCardClick}
          isPlaying = {true}
        />
    );

    const smallMovieCardArticle = smallMovieCardComponent.find(`.small-movie-card`);

    smallMovieCardArticle.simulate(`click`, movieCard);
    expect(onSmallMovieCardClick).toHaveBeenCalledTimes(1);
    expect(onSmallMovieCardClick.mock.calls[0][0]).toMatchObject(movieCard);
  });
});
