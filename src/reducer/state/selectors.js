// import {createSelector} from "reselect";
import NameSpace from "../name-space.js";

// import {getMoviesList} from "../data/selectors.js";
// import {GENRE_ALL} from "../../utils/const.js";

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

// export const getMoviesByGenre = createSelector(
//     getMoviesList,
//     getCurrentGenre,
//     (movies, genre) => {
//       return (genre === GENRE_ALL)
//         ? movies
//         : movies.filter((movie) => movie.genre === genre);
//     }
// );
