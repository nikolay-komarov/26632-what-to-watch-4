import React from "react";
import {Router} from "react-router-dom";
import {Provider} from "react-redux";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import {PrivateRoute} from "./private-route";

import {AuthorizationStatus} from "../../utils/const";
import history from "../../history";

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
                authorizationStatusLoaded = {true}
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

  it(`PrivateRoute render with AuthorizationStatus.NO_AUTH`, () => {
    const tree = renderer
      .create(
          <Provider store = {store}>
            <Router history = {history} >
              <PrivateRoute
                path = {`/`}
                exact = {true}
                authorizationStatus = {AuthorizationStatus.NO_AUTH}
                authorizationStatusLoaded = {true}
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

