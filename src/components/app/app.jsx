import React from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";

import {ActionCreator as DataActionCreator} from "../../reducer/data/data.js";
import {ActionCreator as StateActionCreator} from "../../reducer/state/state.js";
import {Operation as UserOperation} from "../../reducer/user/user.js";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import SignIn from "../sign-in/sign-in.jsx";
import BigVideoPlayer from "../big-video-player/big-video-player.jsx";
import withVideoPlayer from "../../hocs/with-video-player/with-video-player.jsx";

import {
  VideoPlayerMode,
  AppPage,
} from "../../utils/const.js";

import {
  getCurrentAppPage,
} from "../../reducer/state/selectors.js";
import {
  getPromoMovieCard,
  getMoviesList,
  getGenresList,
  getCurrentGenre,
  getShowedItemsInMoviesList,
  getCurrentMovie,
  getCurrentMovieComments,
  getMoviesByGenre,
} from "../../reducer/data/selectors.js";
import {
  getAuthorizationError,
  getAuthorizationStatus
} from "../../reducer/user/selector.js";

const BigVideoPlayerWrapped = withVideoPlayer(BigVideoPlayer, VideoPlayerMode.BIG_MOVIE_PLAYER);

const App = (props) => {
  const {
    authorizationStatus,
    authorizationError,
    currentAppPage,
    promoMovieCard,
    currentGenre,
    moviesList,
    moviesByGenreList,
    genresList,
    showedItemsInMoviesList,
    currentMovie,
    currentMovieComments,
    onSmallMovieCardClick,
    onGenreItemClick,
    onShowMoreButtonClick,
    onPlayButtonClick,
    onBigPlayerExitButtonClick,
    onSignInClick,
    login,
  } = props;

  const renderApp = () => {
    let appPageElement;
    switch (currentAppPage) {
      case AppPage.MAIN_PAGE:
        appPageElement = (
          <Main
            authorizationStatus = {authorizationStatus}
            onSignInClick = {onSignInClick}
            movieCard = {promoMovieCard}
            genresList = {genresList}
            currentGenre = {currentGenre}
            moviesByGenreList = {moviesByGenreList}
            showedItemsInMoviesList = {showedItemsInMoviesList}
            onSmallMovieCardClick = {onSmallMovieCardClick}
            onGenreItemClick = {onGenreItemClick}
            onShowMoreButtonClick = {onShowMoreButtonClick}
            onPlayButtonClick = {onPlayButtonClick}
          />
        );
        break;
      case AppPage.MOVIE_PAGE:
        appPageElement = (
          <MoviePage
            movieDetails = {currentMovie}
            movieComments = {currentMovieComments}
            moviesList = {moviesList} // ToDo - передать только 4 похожих?
            onSmallMovieCardClick = {onSmallMovieCardClick}
            onPlayButtonClick = {onPlayButtonClick}
          />
        );
        break;
      case AppPage.BIG_MOVIE_PLAYER:
        appPageElement = (
          <BigVideoPlayerWrapped
            movieCard = {currentMovie ? currentMovie : promoMovieCard}
            isPlaying = {false}
            onExitButtonClick = {onBigPlayerExitButtonClick}
          />
        );
        break;
      case AppPage.SIGN_IN:
        appPageElement = (
          <SignIn
            authorizationError = {authorizationError}
            onSubmit = {login}
          />
        );
    }

    return appPageElement;
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {renderApp()}
        </Route>
        <Route exact path="/dev-film">
          <MoviePage
            movieDetails = {currentMovie}
            movieComments = {currentMovieComments}
            moviesList = {moviesList} // ToDo - передать только 4 похожих?
            onSmallMovieCardClick = {onSmallMovieCardClick}
          />
        </Route>
        <Route exact path="/dev-big-player">
          <BigVideoPlayerWrapped
            movieCard = {moviesList[0]}
            isPlaying = {false}
            onExitButtonClick = {onBigPlayerExitButtonClick}
          />
        </Route>
        <Route exact path="/dev-sign-in">
          <SignIn
            authorizationError = {authorizationError}
            onSubmit = {login}
          />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  authorizationError: PropTypes.bool.isRequired,
  currentAppPage: PropTypes.string.isRequired,
  promoMovieCard: PropTypes.shape({
    name: PropTypes.string.isRequired,
    posterImage: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
    previewVideoLink: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    scoreCount: PropTypes.number.isRequired,
    director: PropTypes.string.isRequired,
    staring: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    runTime: PropTypes.number.isRequired,
    genre: PropTypes.string.isRequired,
    released: PropTypes.number.isRequired,
  }).isRequired,
  genresList: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  currentGenre: PropTypes.string.isRequired,
  moviesList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    previewVideoLink: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
  })).isRequired,
  moviesByGenreList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    previewVideoLink: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
  })).isRequired,
  showedItemsInMoviesList: PropTypes.number.isRequired,
  currentMovie: PropTypes.shape({
    name: PropTypes.string.isRequired,
    posterImage: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
    previewVideoLink: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    scoreCount: PropTypes.number.isRequired,
    director: PropTypes.string.isRequired,
    staring: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    runTime: PropTypes.number.isRequired,
    genre: PropTypes.string.isRequired,
    released: PropTypes.number.isRequired,
  }),
  currentMovieComments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    userName: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired
  })),
  onSmallMovieCardClick: PropTypes.func.isRequired,
  onGenreItemClick: PropTypes.func.isRequired,
  onShowMoreButtonClick: PropTypes.func.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  onBigPlayerExitButtonClick: PropTypes.func.isRequired,
  onSignInClick: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  authorizationError: getAuthorizationError(state),
  currentAppPage: getCurrentAppPage(state),
  promoMovieCard: getPromoMovieCard(state),
  genresList: getGenresList(state),
  currentGenre: getCurrentGenre(state),
  moviesList: getMoviesList(state),
  moviesByGenreList: getMoviesByGenre(state),
  showedItemsInMoviesList: getShowedItemsInMoviesList(state),
  currentMovie: getCurrentMovie(state),
  currentMovieComments: getCurrentMovieComments(state),
});

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(UserOperation.login(authData));
  },
  onSmallMovieCardClick(movie) {
    dispatch(DataActionCreator.changeCurrentMovie(movie));
    dispatch(StateActionCreator.changeAppPage(AppPage.MOVIE_PAGE));
  },
  onGenreItemClick(genre) {
    dispatch(DataActionCreator.changeGenre(genre));
    dispatch(DataActionCreator.resetShowedItemsInMoviesList());
  },
  onShowMoreButtonClick() {
    dispatch(DataActionCreator.showMoreItemsInMoviesList());
  },
  onPlayButtonClick(movie) {
    dispatch(DataActionCreator.changeCurrentMovie(movie));
    dispatch(StateActionCreator.changeAppPage(AppPage.BIG_MOVIE_PLAYER));
  },
  onBigPlayerExitButtonClick() {
    dispatch(StateActionCreator.changeAppPage(AppPage.MOVIE_PAGE));
  },
  onSignInClick() {
    dispatch(StateActionCreator.changeAppPage(AppPage.SIGN_IN));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
