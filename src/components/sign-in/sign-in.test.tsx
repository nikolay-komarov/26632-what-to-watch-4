import * as React from "react";
import {Router} from "react-router-dom";
import * as renderer from "react-test-renderer";
import SignIn from "./sign-in";

import history from "../../history";
import {noop} from "../../utils/utils";

describe(`Render SignIn`, () => {
  it(`SignIn is rendered correctly`, () => {
    const tree = renderer
      .create(
          <Router history = {history}>
            <SignIn
              authorizationError = {false}
              onSubmit = {noop}
            />
          </Router>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
