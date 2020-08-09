import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Tabs from "./tabs";
import {TabName} from "../../utils/const";

Enzyme.configure({
  adapter: new Adapter()
});

describe(`E2E Tabs tests`, () => {
  const movieDetails = {
    description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave&aposs friend and protege.`,
    rating: 8.9,
    scoreCount: 240,
    director: `Wes Andreson`,
    staring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
    runTime: 99,
    genre: `Drama`,
    released: 2014,
  };
  const movieComments = [
    {
      id: 1,
      userId: 4,
      userName: `Kate Muir`,
      rating: 8.9,
      comment: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
      date: `2016-12-24`,
    },
    {
      id: 2,
      userId: 4,
      userName: `Kate Muir`,
      rating: 8.9,
      comment: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
      date: `2016-12-24`,
    },
    {
      id: 3,
      userId: 4,
      userName: `Kate Muir`,
      rating: 8.9,
      comment: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
      date: `2016-12-24`,
    },
    {
      id: 4,
      userId: 4,
      userName: `Kate Muir`,
      rating: 8.9,
      comment: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
      date: `2016-12-24`,
    },
    {
      id: 5,
      userId: 4,
      userName: `Kate Muir`,
      rating: 8.9,
      comment: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
      date: `2016-12-24`,
    },
  ];

  it(`On Tab click change state`, () => {
    const onActiveItemChange = jest.fn();

    const tabs = shallow(
        <Tabs
          movieDetails = {movieDetails}
          movieComments = {movieComments}
          activeItem = {TabName.OVERVIEW}
          onActiveItemChange = {onActiveItemChange}
        />);

    const movieNavItems = tabs.find(`.movie-nav__item`);

    const tabLinkOverview = movieNavItems.at(0).find(`a`);
    tabLinkOverview.simulate(`click`, TabName.OVERVIEW);
    expect(onActiveItemChange.mock.calls.length).toBe(1);
    expect(onActiveItemChange.mock.calls[0][0]).toEqual(TabName.OVERVIEW);

    const tabLinkDetails = movieNavItems.at(1).find(`a`);
    tabLinkDetails.simulate(`click`, TabName.DETAILS);
    expect(onActiveItemChange.mock.calls.length).toBe(2);
    expect(onActiveItemChange.mock.calls[1][0]).toEqual(TabName.DETAILS);

    const tabLinkReviews = movieNavItems.at(2).find(`a`);
    tabLinkReviews.simulate(`click`, TabName.REVIEWS);
    expect(onActiveItemChange.mock.calls.length).toBe(3);
    expect(onActiveItemChange.mock.calls[2][0]).toEqual(TabName.REVIEWS);
  });
});
