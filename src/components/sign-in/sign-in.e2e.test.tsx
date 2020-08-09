import * as React from "react";
import {Router} from "react-router-dom";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import history from "../../history";
import SignIn from "./sign-in";

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`E2E SignIn tests`, () => {
  const mock = {
    email: `email`,
    password: `password`,
  };

  it(`Should SingIn call sabmit with userEmail, userPassword`, () => {
    const userData = mock;
    const onSubmit = jest.fn();

    const signInComponent = mount(
        <Router history = {history} >
          <SignIn
            authorizationError = {false}
            onSubmit = {onSubmit}
          />
        </Router>
    );

    signInComponent.find(`#user-email`).instance().value = userData.email;
    signInComponent.find(`#user-password`).instance().value = userData.password;

    signInComponent.find(`.sign-in__form`).simulate(`submit`);

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual(userData);
  });
});
