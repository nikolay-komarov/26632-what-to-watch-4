import {reducer, ActionType, ActionCreator, Operation} from "./user.js";

import {
  AuthorizationStatus,
} from "../../utils/const.js";

import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api.js";
import {normalizeUserAuthData} from "../../utils/utils.js";

const api = createAPI(() => {});

const userAuthData = {
  id: 1,
  email: `1@1.ru`,
  name: `Name`,
  avatarUrl: `avatar_url`,
};

describe(`User Reducer tests`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      authorizationStatusLoaded: false,
      authorizationError: false,
      userAuthInfo: {
        id: 0,
        email: ``,
        name: ``,
        avatarUrl: ``,
      }
    });
  });

  it(`Reducer should required autorization`, () => {
    expect(reducer({
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      authorizationStatusLoaded: false,
    }, {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH,
    })).toEqual({
      authorizationStatus: AuthorizationStatus.AUTH,
      authorizationStatusLoaded: true,
    });
  });

  it(`Reducer change authorization error`, () => {
    expect(reducer({
      authorizationError: false,
      authorizationStatusLoaded: false,
    }, {
      type: ActionType.CHANGE_AUTHORIZATION_ERROR,
      payload: true,
    })).toEqual({
      authorizationError: true,
      authorizationStatusLoaded: true,
    });
  });

  it(`Reducer change user auth data`, () => {
    expect(reducer({
      userAuthInfo: {
        id: 0,
        email: ``,
        name: ``,
        avatarUrl: ``,
      },
      authorizationStatusLoaded: false,
    }, {
      type: ActionType.CHANGE_USER_DATE,
      payload: userAuthData,
    })).toEqual({
      userAuthInfo: userAuthData,
      authorizationStatusLoaded: true,
    });
  });
});

describe(`User ActionCreator tests`, () => {
  it(`ActionCreator for requireAuthorization return correct action`, () => {
    expect(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH)).toEqual({
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.NO_AUTH,
    });
  });

  it(`ActionCreator for changeAuthorizaitionError return correct action`, () => {
    expect(ActionCreator.changeAuthorizaitionError(true)).toEqual({
      type: ActionType.CHANGE_AUTHORIZATION_ERROR,
      payload: true,
    });
  });

  it(`ActionCreator for changeUserData return correct action`, () => {
    expect(ActionCreator.changeUserData(userAuthData)).toEqual({
      type: ActionType.CHANGE_USER_DATE,
      payload: userAuthData,
    });
  });
});

describe(`User Operation tests`, () => {
  it(`Operation make a coorect API call to /login for checkAuth`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const checkAuth = Operation.checkAuth();

    apiMock
      .onGet(`/login`)
      .reply(200, {fake: `userAuthData`});

    return checkAuth(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: AuthorizationStatus.AUTH,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.CHANGE_USER_DATE,
          payload: normalizeUserAuthData({fake: `userAuthData`}),
        });
      });
  });

  it(`Operation make a coorect API call to /login for login`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const login = Operation.login(userAuthData);

    apiMock
      .onPost(`/login`)
      .reply(200, {fake: userAuthData});

    return login(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: AuthorizationStatus.AUTH,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.CHANGE_AUTHORIZATION_ERROR,
          payload: false,
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.CHANGE_USER_DATE,
          payload: normalizeUserAuthData({fake: userAuthData}),
        });
      });
  });
});
