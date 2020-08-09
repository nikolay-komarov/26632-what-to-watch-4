import * as React from "react";
import {Router} from "react-router-dom";
import Enzyme, {shallow, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SmallMovieCard from "./small-movie-card";

import {AppRoute} from "../../utils/const";
import history from "../../history";

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`E2E SmallMovieCard tests`, () => {
  const mock = {
    id: 1,
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

  it(`Should SmallMovieCard title contains correct link`, () => {
    const movieCard = mock;

    const smallMovieCardComponent = mount(
        <Router history = {history} >
          <SmallMovieCard
            movieCard = {movieCard}
            onActiveItemChange = {() => {}}
            onSmallMovieCardHover = {() => {}}
            onSmallMovieCardLeave = {() => {}}
            isPlaying = {true}
          >
            {children}
          </SmallMovieCard>
        </Router>
    );

    const smallMovieCardTitleLink = smallMovieCardComponent.find(`.small-movie-card__title`).find(`a`).prop(`href`);

    expect(smallMovieCardTitleLink).toEqual(`${AppRoute.FILM}/${movieCard.id}`);
  });
});
