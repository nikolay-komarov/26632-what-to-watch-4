import * as React from "react";
import * as renderer from "react-test-renderer";
import ShowMoreButton from "./show-more-button";

describe(`Render ShowMoreButton`, () => {
  it(`ShowMoreButton is rendered`, () => {
    const moviesListLength = 16;
    const showedItemsInMoviesList = 8;

    const tree = renderer.create(
        <ShowMoreButton
          moviesListLength = {moviesListLength}
          showedItemsInMoviesList = {showedItemsInMoviesList}
          onShowMoreButtonClick = {() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`ShowMoreButton is not rendered`, () => {
    const moviesListLength = 16;
    const showedItemsInMoviesList = 16;

    const tree = renderer.create(
        <ShowMoreButton
          moviesListLength = {moviesListLength}
          showedItemsInMoviesList = {showedItemsInMoviesList}
          onShowMoreButtonClick = {() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
