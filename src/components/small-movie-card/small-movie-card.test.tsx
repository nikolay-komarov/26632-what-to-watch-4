import * as React from "react";
import * as renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import SmallMovieCard from "./small-movie-card";

import history from "../../history";

describe(`Render SmallMovieCard`, () => {
  it(`Should SmallMovieCard render correctly`, () => {
    const smallMovieCard = {
      id: 1,
      name: `Fantastic Beasts: The Crimes of Grindelwald`,
      previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    };
    const children = <div className="children-mock-component" />;

    const tree = renderer
      .create(
          <Router history = {history}>
            <SmallMovieCard
              movieCard = {smallMovieCard}
              onActiveItemChange = {() => {}}
              onSmallMovieCardHover = {() => {}}
              onSmallMovieCardLeave = {() => {}}
              isPlaying = {false}
            >
              {children}
            </SmallMovieCard>
          </Router>, {
            createNodeMock: () => {
              return {};
            }
          })
        .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
