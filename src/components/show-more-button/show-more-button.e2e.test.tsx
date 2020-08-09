import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ShowMoreButton from "./show-more-button";

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`E2E ShowMoreButton tests`, () => {
  it(`Should ShowMoreButton be clicked`, () => {
    const moviesListLength = 16;
    const showedItemsInMoviesList = 8;
    const onShowMoreButtonClick = jest.fn();

    const showMoreButtonComponent = shallow(
        <ShowMoreButton
          moviesListLength = {moviesListLength}
          showedItemsInMoviesList = {showedItemsInMoviesList}
          onShowMoreButtonClick = {onShowMoreButtonClick}
        />
    );

    const showMoreButton = showMoreButtonComponent.find(`.catalog__button`);

    showMoreButton.simulate(`click`);
    expect(onShowMoreButtonClick).toHaveBeenCalledTimes(1);
  });
});
