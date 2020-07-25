import {reducer, ActionType, ActionCreator, Operation} from "./user.js";
import {ActionType as StateActionType} from "../state/state.js";

import {
  AuthorizationStatus,
  AppPage,
} from "../../utils/const.js";

import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api.js";

const api = createAPI(() => {});

describe(`User Reducer tests`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      authorizationError: false,
    });
  });

  it(`Reducer should required autorization`, () => {
    expect(reducer({
      authorizationStatus: AuthorizationStatus.NO_AUTH,
    }, {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH,
    })).toEqual({
      authorizationStatus: AuthorizationStatus.AUTH,
    });
  });

  it(`Reducer change authorization error`, () => {
    expect(reducer({
      authorizationError: false,
    }, {
      type: ActionType.CHANGE_AUTHORIZATION_ERROR,
      payload: true,
    })).toEqual({
      authorizationError: true,
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
});

describe(`User Operation tests`, () => {
  it(`Operation make a coorect API call to /login for checkAuth`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const checkAuth = Operation.checkAuth();

    apiMock
      .onGet(`/login`)
      .reply(200);

    return checkAuth(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: AuthorizationStatus.AUTH,
        });
      });
  });

  it(`Operation make a coorect API call to /login for login`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const login = Operation.login({
      email: `1@1.ru`,
      password: `1`,
    });

    apiMock
      .onPost(`/login`)
      .reply(200);

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
          type: StateActionType.CHANGE_CURRENT_APP_PAGE,
          payload: AppPage.MAIN_PAGE,
        });
      });
  });
});
