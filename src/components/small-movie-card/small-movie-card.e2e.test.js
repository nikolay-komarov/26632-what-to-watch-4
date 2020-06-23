import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SmallMovieCard from "./small-movie-card.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`E2E SmallMovieCard tests`, () => {
  it(`Should smallMovieCardTitle be click`, () => {
    const smallMovieCard = {
      name: `Firefly`,
      posterImage: `posterImage`
    };
    const onSmallMovieCardHover = jest.fn();

    const smallMovieCardComponent = shallow(
        <SmallMovieCard
          smallMovieCard = {smallMovieCard}
          onSmallMovieCardHover = {onSmallMovieCardHover}
        />
    );

    const smallMovieCardArticle = smallMovieCardComponent.find(`.small-movie-card`);

    smallMovieCardArticle.simulate(`mouseover`);

    expect(onSmallMovieCardHover).toHaveBeenCalledTimes(1);
    expect(onSmallMovieCardHover.mock.calls[0][0]).toMatchObject(smallMovieCard);
  });
});
