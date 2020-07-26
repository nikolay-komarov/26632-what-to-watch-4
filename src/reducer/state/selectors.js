import NameSpace from "../name-space.js";

export const getCurrentAppPage = (state) => {
  return state[NameSpace.STATE].currentAppPage;
};

export const getCurrentGenre = (state) => {
  return state[NameSpace.STATE].currentGenre;
};

export const getShowedItemsInMoviesList = (state) => {
  return state[NameSpace.STATE].showedItemsInMoviesList;
};

export const getCurrentMovie = (state) => {
  return state[NameSpace.STATE].currentMovie;
};

export const getCurrentMovieComments = (state) => {
  return state[NameSpace.STATE].currentMovieComments;
};
