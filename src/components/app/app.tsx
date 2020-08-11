import * as React from "react";
import {Switch, Route, Router, Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";

import {ActionCreator as DataActionCreator} from "../../reducer/data/data";
import {Operation as DataOperation} from "../../reducer/data/data";
import {Operation as UserOperation} from "../../reducer/user/user";
import Loader from "../loader/loader";
import Main from "../main/main";
import MoviePage from "../movie-page/movie-page";
import AddReview from "../add-review/add-review";
import SignIn from "../sign-in/sign-in";
import BigVideoPlayer from "../big-video-player/big-video-player";
import MyList from "../my-list/my-list";
import PrivateRoute from "../private-route/private-route";
import withVideoPlayer from "../../hocs/with-video-player/with-video-player";

import {
  VideoPlayerMode,
  AppRoute,
  AuthorizationStatus,
} from "../../utils/const";
import {getMovieById} from "../../utils/utils";
import history from "../../history";

import {
  getPromoMovieCard,
  getMoviesList,
  getGenresList,
  getCurrentGenre,
  getShowedItemsInMoviesList,
  getMoviesByGenre,
  getIsMoviesListLoaded,
  getIsPromoMovieLoaded
} from "../../reducer/data/selectors";
import {
  getUserAuthData,
  getAuthorizationError,
  getAuthorizationStatus
} from "../../reducer/user/selector";

import {
  MovieType,
  MoviesListType,
  UserAuthDataType,
} from "../../types";

interface Props {
  authorizationStatus: string;
  authorizationError: boolean;
  promoMovieCard: MovieType;
  genresList: string[];
  currentGenre: string;
  moviesList: MoviesListType;
  moviesByGenreList: MoviesListType;
  showedItemsInMoviesList: number;
  onGenreItemClick: () => void;
  onShowMoreButtonClick: () => void;
  login: () => void;
  onReviewSend: () => void;
  isMoviesListLoaded: boolean;
  IsPromoMovieLoaded: boolean;
  onSendIsFavoriteMovie: () => void;
  userAuthData: UserAuthDataType;
}

const BigVideoPlayerWrapped = withVideoPlayer(BigVideoPlayer, VideoPlayerMode.BIG_MOVIE_PLAYER);

const App: React.FC<Props> = (props: Props) => {
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
