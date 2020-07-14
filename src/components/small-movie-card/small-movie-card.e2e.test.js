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

  it(`Should SmallMovieCard be hovered & leaved`, () => {
    const movieCard = mock;
    const onActiveItemChange = jest.fn();

    const smallMovieCardComponent = shallow(
        <SmallMovieCard
          movieCard = {movieCard}
          onActiveItemChange = {onActiveItemChange}
          onSmallMovieCardClick = {() => {}}
          isPlaying = {false}
        />
    );

    const smallMovieCardArticle = smallMovieCardComponent.find(`.small-movie-card`);

    smallMovieCardArticle.simulate(`mouseover`, movieCard);
    expect(onActiveItemChange).toHaveBeenCalledTimes(1);
    expect(onActiveItemChange.mock.calls[0][0]).toMatchObject(movieCard);

    smallMovieCardArticle.simulate(`mouseleave`, null);
    expect(onActiveItemChange).toHaveBeenCalledTimes(2);
    expect(onActiveItemChange.mock.calls[1][0]).toEqual(null);
  });

  // it(`Should SmallMovieCard be leaved`, () => {
  //   const movieCard = mock;
  //   const onActiveItemChange = jest.fn();

  //   const smallMovieCardComponent = shallow(
  //       <SmallMovieCard
  //         movieCard = {movieCard}
  //         onActiveItemChange = {onActiveItemChange}
  //         onSmallMovieCardClick = {() => {}}
  //         isPlaying = {true}
  //       />
  //   );

  //   const smallMovieCardArticle = smallMovieCardComponent.find(`.small-movie-card`);

  //   smallMovieCardArticle.simulate(`mouseleave`);
  //   expect(onActiveItemChange).toHaveBeenCalledTimes(1);
  // });

  it(`Should SmallMovieCard be clicked`, () => {
    const movieCard = mock;
    const onSmallMovieCardClick = jest.fn();

    const smallMovieCardComponent = shallow(
        <SmallMovieCard
          movieCard = {movieCard}
          onActiveItemChange = {() => {}}
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
