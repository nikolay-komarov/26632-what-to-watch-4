import React from "react";
import PropTypes from "prop-types";
import {Switch, Route, Router, Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";

import {ActionCreator as DataActionCreator} from "../../reducer/data/data.js";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import {Operation as UserOperation} from "../../reducer/user/user.js";
import Loader from "../loader/loader.jsx";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import AddReview from "../add-review/add-review.jsx";
import SignIn from "../sign-in/sign-in.jsx";
import BigVideoPlayer from "../big-video-player/big-video-player.jsx";
import MyList from "../my-list/my-list.jsx";
import PrivateRoute from "../private-route/private-route.jsx";
import withVideoPlayer from "../../hocs/with-video-player/with-video-player.jsx";

import {
  VideoPlayerMode,
  AppRoute,
  AuthorizationStatus,
} from "../../utils/const.js";
import {getMovieById} from "../../utils/utils.js";
import history from "../../history.js";

import {
  getPromoMovieCard,
  getMoviesList,
  getGenresList,
  getCurrentGenre,
  getShowedItemsInMoviesList,
  getMoviesByGenre,
  getIsMoviesListLoaded,
  getIsPromoMovieLoaded
} from "../../reducer/data/selectors.js";
import {
  getUserAuthData,
  getAuthorizationError,
  getAuthorizationStatus
} from "../../reducer/user/selector.js";

const BigVideoPlayerWrapped = withVideoPlayer(BigVideoPlayer, VideoPlayerMode.BIG_MOVIE_PLAYER);

const App = (props) => {
  const {
    authorizationStatus,
    authorizationError,
    userAuthData,
    promoMovieCard,
    currentGenre,
    moviesList,
    moviesByGenreList,
    genresList,
    showedItemsInMoviesList,
    onGenreItemClick,
    onShowMoreButtonClick,
    login,
    onReviewSend,
    isMoviesListLoaded,
    IsPromoMovieLoaded,
    onSendIsFavoriteMovie,
  } = props;

  return (
    <Router
      history = {history}
    >
      <Switch>
        <Route
          exact path={AppRoute.ROOT}
          render = {() => {
            return (
              (isMoviesListLoaded && IsPromoMovieLoaded)
                ?
                <Main
                  authorizationStatus = {authorizationStatus}
                  userAuthData = {userAuthData}
                  movieCard = {promoMovieCard}
                  genresList = {genresList}
                  currentGenre = {currentGenre}
                  moviesByGenreList = {moviesByGenreList}
                  showedItemsInMoviesList = {showedItemsInMoviesList}
                  onGenreItemClick = {onGenreItemClick}
                  onShowMoreButtonClick = {onShowMoreButtonClick}
                  onSendIsFavoriteMovie = {onSendIsFavoriteMovie}
                />
                : <Loader />
            );
          }}>
        </Route>

        <Route
          exact path={AppRoute.LOGIN}
          render = {() => {
            return (
            // <SignIn
            //   authorizationError = {authorizationError}
            //   onSubmit = {login}
            // />

              (authorizationStatus === AuthorizationStatus.NO_AUTH)
                ?
                <SignIn
                  authorizationError = {authorizationError}
                  onSubmit = {login}
                />
                :
                <Redirect to={AppRoute.ROOT} />
            );
          }}>

        </Route>

        <Route
          exact path={`${AppRoute.FILM}/:id`} // -> /fillms/:id
          render = {(routeProps) => {
            const movieIdNumber = parseInt(routeProps.match.params.id, 10);

            return (
              (isMoviesListLoaded)
                ?
                <MoviePage
                  movieId = {movieIdNumber}
                />
                : <Loader />
            );
          }}>
        </Route>

        <Route
          exact
          path={`${AppRoute.FILM}/:id${AppRoute.PLAYER}`} // -> /films/:id/player
          render = {(routeProps) => {
            return (
              (isMoviesListLoaded)
                ?
                <BigVideoPlayerWrapped
                  movieCard = {getMovieById(parseInt(routeProps.match.params.id, 10), moviesList)}
                  isPlaying = {false}
                />
                :
                <Loader />
            );
          }}>
        </Route>

        <PrivateRoute
          exact
          path={`${AppRoute.FILM}/:id${AppRoute.ADD_REVIEW}`} // ADD_REVIEW: `/review`, -> /films/:id/review
          render = {(routeProps) => {
            return (
              (isMoviesListLoaded)
                ?
                <AddReview
                  authorizationStatus = {authorizationStatus}
                  userAuthData = {userAuthData}
                  movie = {getMovieById(parseInt(routeProps.match.params.id, 10), moviesList)}
                  onReviewSend = {onReviewSend}
                />
                :
                <Loader />
            );
          }}>
        </PrivateRoute>

        <PrivateRoute
          exact
          path={AppRoute.MY_LIST}
          render = {() => {
            return (
              <MyList />
            );
          }}>
        </PrivateRoute>

        <Route
          render = {() => (
            <>
              <h1>
                404.
                <br />
                <small>Page not found</small>
              </h1>
              <Link to={AppRoute.ROOT}>Go to main page</Link>
            </>
          )}
        />
      </Switch>
    </Router>
  );
};

App.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  authorizationError: PropTypes.bool.isRequired,
  promoMovieCard: PropTypes.shape({
    id: PropTypes.number.isRequired,
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
  onGenreItemClick: PropTypes.func.isRequired,
  onShowMoreButtonClick: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  onReviewSend: PropTypes.func.isRequired,
  isMoviesListLoaded: PropTypes.bool.isRequired,
  IsPromoMovieLoaded: PropTypes.bool.isRequired,
  onSendIsFavoriteMovie: PropTypes.func.isRequired,
  userAuthData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
  }),
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  authorizationError: getAuthorizationError(state),
  promoMovieCard: getPromoMovieCard(state),
  genresList: getGenresList(state),
  currentGenre: getCurrentGenre(state),
  moviesList: getMoviesList(state),
  moviesByGenreList: getMoviesByGenre(state),
  showedItemsInMoviesList: getShowedItemsInMoviesList(state),
  isMoviesListLoaded: getIsMoviesListLoaded(state),
  IsPromoMovieLoaded: getIsPromoMovieLoaded(state),
  userAuthData: getUserAuthData(state),
});

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(UserOperation.login(authData));
  },
  onGenreItemClick(genre) {
    dispatch(DataActionCreator.changeGenre(genre));
    dispatch(DataActionCreator.resetShowedItemsInMoviesList());
  },
  onShowMoreButtonClick() {
    dispatch(DataActionCreator.showMoreItemsInMoviesList());
  },
  onReviewSend(review, id, handleResponse) {
    dispatch(DataOperation.sendComment(review, id, handleResponse));
  },
  onSendIsFavoriteMovie(movieId, isFavorite) {
    dispatch(DataOperation.sendIsFavoriteMovie(movieId, isFavorite));
    dispatch(DataOperation.loadMoviesList());
    dispatch(DataOperation.loadPromoMovieCard());
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
