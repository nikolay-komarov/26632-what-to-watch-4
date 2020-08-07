import React from "react";
import {Router} from "react-router-dom";
import renderer from "react-test-renderer";
import SignIn from "./sign-in.jsx";

import history from "../../history.js";

describe(`Render SignIn`, () => {
  it(`SignIn is rendered correctly`, () => {
    const tree = renderer
      .create(
          <Router history = {history}>
            <SignIn
              authorizationError = {false}
              onSubmit = {() => {}}
            />
          </Router>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
