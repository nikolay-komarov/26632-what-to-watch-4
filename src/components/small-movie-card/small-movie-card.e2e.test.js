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
    previewVideoLink: `previewVideoLink`,
  };
  const children = <div className="children-mock-component" />;

  it(`Should SmallMovieCard be hovered & leaved`, () => {
    const movieCard = mock;
    const onActiveItemChange = jest.fn();
    const onSmallMovieCardLeave = jest.fn();
    const onSmallMovieCardHover = jest.fn();

    const smallMovieCardComponent = shallow(
        <SmallMovieCard
          movieCard = {movieCard}
          onActiveItemChange = {onActiveItemChange}
          onSmallMovieCardHover = {onSmallMovieCardHover}
          onSmallMovieCardLeave = {onSmallMovieCardLeave}
          onSmallMovieCardClick = {() => {}}
          isPlaying = {false}
        >
          {children}
        </SmallMovieCard>
    );

    const smallMovieCardArticle = smallMovieCardComponent.find(`.small-movie-card`);

    smallMovieCardArticle.simulate(`mouseover`, movieCard);
    expect(onActiveItemChange).toHaveBeenCalledTimes(1);
    expect(onActiveItemChange.mock.calls[0][0]).toMatchObject(movieCard);
    expect(onSmallMovieCardHover).toHaveBeenCalledTimes(1);

    smallMovieCardArticle.simulate(`mouseleave`, null);
    expect(onActiveItemChange).toHaveBeenCalledTimes(2);
    expect(onActiveItemChange.mock.calls[1][0]).toEqual(null);
    expect(onSmallMovieCardLeave).toHaveBeenCalledTimes(1);
  });

  it(`Should SmallMovieCard be clicked`, () => {
    const movieCard = mock;
    const onSmallMovieCardClick = jest.fn();

    const smallMovieCardComponent = shallow(
        <SmallMovieCard
          movieCard = {movieCard}
          onActiveItemChange = {() => {}}
          onSmallMovieCardHover = {() => {}}
          onSmallMovieCardLeave = {() => {}}
          onSmallMovieCardClick = {onSmallMovieCardClick}
          isPlaying = {true}
        >
          {children}
        </SmallMovieCard>
    );

    const smallMovieCardArticle = smallMovieCardComponent.find(`.small-movie-card`);

    smallMovieCardArticle.simulate(`click`, movieCard);
    expect(onSmallMovieCardClick).toHaveBeenCalledTimes(1);
    expect(onSmallMovieCardClick.mock.calls[0][0]).toMatchObject(movieCard);
  });
});
