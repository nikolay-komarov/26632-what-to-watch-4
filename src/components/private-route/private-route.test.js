import React from "react";
import {Router} from "react-router-dom";
import {Provider} from "react-redux";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import {PrivateRoute} from "./private-route.jsx";

import {AuthorizationStatus} from "../../utils/const.js";
import history from "../../history.js";

const mockStore = configureStore([]);
const MockComponent = () => <div />;

describe(`Render PrivateRoute`, () => {
  const store = mockStore({});

  it(`PrivateRoute render with AuthorizationStatus.AUTH`, () => {
    const tree = renderer
      .create(
          <Provider store = {store}>
            <Router history = {history} >
              <PrivateRoute
                path = {`/`}
                exact = {true}
                authorizationStatus = {AuthorizationStatus.AUTH}
                render = {() => {
                  return (
                    <MockComponent />
                  );
                }}
              />
            </Router>
          </Provider>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`PrivateRoute render with AuthorizationStatus.AUTH`, () => {
    const tree = renderer
      .create(
          <Provider store = {store}>
            <Router history = {history} >
              <PrivateRoute
                path = {`/`}
                exact = {true}
                authorizationStatus = {AuthorizationStatus.AUTH}
                render = {() => {
                  return (
                    <MockComponent />
                  );
                }}
              />
            </Router>
          </Provider>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

