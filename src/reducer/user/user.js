import {extend} from "../../utils/utils.js";
import {
  AuthorizationStatus,
  AppPage,
} from "../../utils/const.js";
import {ActionCreator as StateActionCreator} from "../state/state.js";

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  authorizationError: false,
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  CHANGE_AUTHORIZATION_ERROR: `CHANGE_AUTHORIZATION_ERROR`,
};

const ActionCreator = {
  requireAuthorization: (status) => {
    return {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: status,
    };
  },
  changeAuthorizaitionError: (status) => {
    return {
      type: ActionType.CHANGE_AUTHORIZATION_ERROR,
      payload: status,
    };
  },
};

const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then(() => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
      })
      .catch((err) => {
        throw err;
      });
  },

  login: (authData) => (dispatch, getState, api) => {
    return api.post(`/login`, {
      email: authData.email,
      password: authData.password,
    })
      .then(() => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
        dispatch(ActionCreator.changeAuthorizaitionError(false));
        dispatch(StateActionCreator.changeAppPage(AppPage.MAIN_PAGE));
      })
      .catch((err) => {
        dispatch(ActionCreator.changeAuthorizaitionError(true));
        throw err;
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return extend(state, {
        authorizationStatus: action.payload
      });
    case ActionType.CHANGE_AUTHORIZATION_ERROR:
      return extend(state, {
        authorizationError: action.payload
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator, Operation};
