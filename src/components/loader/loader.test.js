import React from "react";
import renderer, { create } from "react-test-renderer";

import Loader from "./loader.jsx";

describe(`Loader tests`, () => {
  it(`Loader render correctly`, () => {
    const tree = renderer
      .create(
          <Loader />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
