import * as React from "react";
import {Router} from "react-router-dom";
import {configure, shallow, mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import SmallMovieCard from "./small-movie-card";

import {AppRoute} from "../../utils/const";
import history from "../../history";

import {noop} from "../../utils/utils";

import {
  MovieType,
} from "../../types";

configure({
  adapter: new Adapter(),
});

describe(`E2E SmallMovieCard tests`, () => {
  const mock: MovieType = {
    id: 0,
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
  const children: React.ReactNode = <div className="children-mock-component" />;

  it(`Should SmallMovieCard be hovered & leaved`, () => {
    const movieCard: MovieType = mock;
    const onActiveItemChange = jest.fn();
    const onSmallMovieCardLeave = jest.fn();
    const onSmallMovieCardHover = jest.fn();

    const smallMovieCardComponent = shallow(
        <SmallMovieCard
          movieCard = {movieCard}
          onActiveItemChange = {onActiveItemChange}
          onSmallMovieCardHover = {onSmallMovieCardHover}
          onSmallMovieCardLeave = {onSmallMovieCardLeave}
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
    const movieCard: MovieType = mock;

    const smallMovieCardComponent = mount(
        <Router history = {history} >
          <SmallMovieCard
            movieCard = {movieCard}
            onActiveItemChange = {noop}
            onSmallMovieCardHover = {noop}
            onSmallMovieCardLeave = {noop}
          >
            {children}
          </SmallMovieCard>
        </Router>
    );

    const smallMovieCardTitleLink = smallMovieCardComponent.find(`.small-movie-card__title`).find(`a`).prop(`href`);

    expect(smallMovieCardTitleLink).toEqual(`${AppRoute.FILM}/${movieCard.id}`);
  });
});
