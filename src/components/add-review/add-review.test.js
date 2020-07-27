import React from "react";
import renderer from "react-test-renderer";
// import Enzyme, {mount, shallow} from "enzyme";
// import Adapter from "enzyme-adapter-react-16";

import AddReview from "./add-review.jsx";

// Enzyme.configure({
//   adapter: new Adapter(),
// });

describe(`Render AddReview`, () => {
  const movie = {
    id: 1,
    name: `The Grand Budapest Hotel`,
    posterImage: `img/the-grand-budapest-hotel-poster.jpg`,
    backgroundImage: `img/bg-the-grand-budapest-hotel.jpg`,
  };

  it(`Should AddReview render correctly`, () => {
    const tree = renderer
      .create(
          <AddReview
            movie = {movie}
            onReviewSend = {() => {}}
          />,
          {
            createNodeMock: (element) => element
            // createNodeMock: () => {
            //   return {};
            // }
          }
      )
      .toJSON();

    // const tree = shallow(
    //     <AddReview
    //       movie = {movie}
    //       onReviewSend = {() => {}}
    //     />
    // );

    expect(tree).toMatchSnapshot();
  });
});
