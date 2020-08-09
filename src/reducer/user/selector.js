import NameSpace from "../name-space";

export const getAuthorizationStatus = (state) => {
  return state[NameSpace.USER].authorizationStatus;
};

export const getAuthorizationError = (state) => {
  return state[NameSpace.USER].authorizationError;
};

export const getUserAuthData = (state) => {
  return state[NameSpace.USER].userAuthInfo;
};

export const getAuthorizationStatusLoaded = (state) => {
  return state[NameSpace.USER].authorizationStatusLoaded;
};
