import {
  extend,
  normalizeUserAuthData,
} from "../../utils/utils";
import {
  AuthorizationStatus,
} from "../../utils/const";

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  authorizationStatusLoaded: false,
  authorizationError: false,
  userAuthInfo: {
    id: 0,
    email: ``,
    name: ``,
    avatarUrl: ``,
  }
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  CHANGE_AUTHORIZATION_ERROR: `CHANGE_AUTHORIZATION_ERROR`,
  CHANGE_USER_DATE: `CHANGE_USER_DATE`,
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
  changeUserData: (userAuthInfo) => {
    return {
      type: ActionType.CHANGE_USER_DATE,
      payload: userAuthInfo,
    };
  }
};

const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then((response) => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
        dispatch(ActionCreator.changeUserData(normalizeUserAuthData(response.data)));
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
      .then((response) => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
        dispatch(ActionCreator.changeAuthorizaitionError(false));
        dispatch(ActionCreator.changeUserData(normalizeUserAuthData(response.data)));
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
        authorizationStatus: action.payload,
        authorizationStatusLoaded: true,
      });
    case ActionType.CHANGE_AUTHORIZATION_ERROR:
      return extend(state, {
        authorizationError: action.payload,
        authorizationStatusLoaded: true,
      });
    case ActionType.CHANGE_USER_DATE:
      return extend(state, {
        userAuthInfo: action.payload,
        authorizationStatusLoaded: true,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator, Operation};
