import React from "react";
import renderer from "react-test-renderer";
import Tabs from "./tabs.jsx";

describe(`Render Tabs`, () => {
  it(`Should Tabs render correctly`, () => {
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
    const comments = [
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

    const tree = renderer
      .create(
          <Tabs
            movieDetails = {movieDetails}
            comments = {comments}
          />)
        .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
