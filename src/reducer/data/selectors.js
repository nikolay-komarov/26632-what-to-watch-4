import NameSpace from "../name-space.js";

export const getPromoMovieCard = (state) => {
  return state[NameSpace.DATA].promoMovieCard;
};

export const getMoviesList = (state) => {
  return state[NameSpace.DATA].moviesList;
};
