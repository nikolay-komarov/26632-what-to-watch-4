import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

import {connect} from "react-redux";

import Tabs from "../tabs/tabs";
import MoviesList from "../movies-list/movies-list";
import withActiveItem from "../../hocs/with-active-item/with-active-item";

import {Operation as DataOperation} from "../../reducer/data/data";
import {
  getMoviesList,
  getCurrentMovie,
  getCurrentMovieComments,
} from "../../reducer/data/selectors";
import {
  getAuthorizationStatus,
  getUserAuthData
} from "../../reducer/user/selector";
import {
  TabName,
  AuthorizationStatus,
  AppRoute,
} from "../../utils/const";
import {getFourSimilarMovies} from "../../utils/utils";
import history from "../../history";

const TabsWrapped = withActiveItem(Tabs, TabName.OVERVIEW);
const MoviesListWrapped = withActiveItem(MoviesList, null);

class MoviePage extends PureComponent {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const {
      movieId,
      loadCurrentMovieComments,
    } = this.props;

    loadCurrentMovieComments(parseInt(movieId, 10));
  }

  componentDidUpdate(nextProps) {
    const {
      movieId,
      loadCurrentMovieComments,
    } = this.props;

    if (nextProps.movieId !== movieId) {
      loadCurrentMovieComments(parseInt(movieId, 10));
    }
  }

  render() {
    const {
      authorizationStatus,
      userAuthData,
      movieDetails,
      movieComments,
      moviesList,
      onSendIsFavoriteMovie,
    } = this.props;
    const {
      name,
      posterImage,
      backgroundImage,
      genre,
      released,
      isFavorite,
    } = movieDetails;

    const fourSimilarMovies = getFourSimilarMovies(movieDetails, moviesList);
    const isUserLogin = authorizationStatus === AuthorizationStatus.AUTH;

    return (
      <>
        <section className="movie-card movie-card--full">
          <div className="movie-card__hero">
            <div className="movie-card__bg">
              <img src={backgroundImage} alt={name} />
            </div>

            <h1 className="visually-hidden">WTW</h1>

            <header className="page-header movie-card__head">
              <div className="logo">
                <Link
                  className="logo__link"
                  to={AppRoute.ROOT}
                >
                  <span className="logo__letter logo__letter--1">W</span>
                  <span className="logo__letter logo__letter--2">T</span>
                  <span className="logo__letter logo__letter--3">W</span>
                </Link>
              </div>

              <div className="user-block">
                {
                  !isUserLogin && (
                    <Link
                      className="user-block__link"
                      to={AppRoute.LOGIN}
                    >
                      Sign In
                    </Link>
                  )
                }
                {
                  isUserLogin && (
                    <div className="user-block__avatar">
                      <Link to={AppRoute.MY_LIST}>
                        <img src={userAuthData.avatarUrl} alt="User avatar" width="63" height="63" />
                      </Link>
                    </div>
                  )
                }
              </div>
            </header>

            <div className="movie-card__wrap">
              <div className="movie-card__desc">
                <h2 className="movie-card__title">{name}</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">{genre}</span>
                  <span className="movie-card__year">{released}</span>
                </p>

                <div className="movie-card__buttons">
                  <Link
                    className="btn btn--play movie-card__button"
                    type="button"
                    to={`${AppRoute.FILM}/${movieDetails.id}${AppRoute.PLAYER}`}
                  >
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s"></use>
                    </svg>
                    <span>Play</span>
                  </Link>

                  <button className="btn btn--list movie-card__button" type="button"
                    onClick = {() => isUserLogin ? onSendIsFavoriteMovie(movieDetails.id, !isFavorite) : history.push(`${AppRoute.LOGIN}`)}
                  >
                    {
                      (isFavorite)
                        ?
                        <>
                          <svg viewBox="0 0 18 14" width="18" height="14">
                            <use xlinkHref="#in-list"></use>
                          </svg>
                        </>
                        :
                        <>
                          <svg viewBox="0 0 19 20" width="19" height="20">
                            <use xlinkHref="#add"></use>
                          </svg>
                        </>
                    }
                    <span>My list</span>
                  </button>

                  {
                    isUserLogin && (
                      <Link
                        to={`${AppRoute.FILM}/${movieDetails.id}${AppRoute.ADD_REVIEW}`}
                        className="btn movie-card__button"
                      >
                        Add review
                      </Link>
                    )
                  }
                </div>
              </div>
            </div>
          </div>

          <div className="movie-card__wrap movie-card__translate-top">
            <div className="movie-card__info">
              <div className="movie-card__poster movie-card__poster--big">
                <img src={posterImage} alt={name + ` poster`} width="218" height="327" />
              </div>

              <TabsWrapped
                movieDetails = {movieDetails}
                movieComments = {movieComments}
              />

            </div>
          </div>
        </section>

        <div className="page-content">
          {
            fourSimilarMovies !== 0 && (
              <section className="catalog catalog--like-this">
                <h2 className="catalog__title">More like this</h2>

                <MoviesListWrapped
                  moviesList = {fourSimilarMovies}
                />
              </section>
            )
          }

          <footer className="page-footer">
            <div className="logo">
              <Link
                className="logo__link logo__link--light"
                to={AppRoute.ROOT}
              >
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>

            <div className="copyright">
              <p>© 2019 What to watch Ltd.</p>
            </div>
          </footer>
        </div>
      </>
    );
  }
}

MoviePage.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  userAuthData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
  }),
  movieDetails: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    posterImage: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    scoreCount: PropTypes.number.isRequired,
    director: PropTypes.string.isRequired,
    staring: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    runTime: PropTypes.number.isRequired,
    genre: PropTypes.string.isRequired,
    released: PropTypes.number.isRequired,
    isFavorite: PropTypes.bool.isRequired,
  }),
  movieComments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    userName: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired
  })),
  moviesList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    previewVideoLink: PropTypes.string.isRequired,
  })).isRequired,
  movieId: PropTypes.number.isRequired,
  loadCurrentMovieComments: PropTypes.func.isRequired,
  onSendIsFavoriteMovie: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
  authorizationStatus: getAuthorizationStatus(state),
  moviesList: getMoviesList(state),
  movieDetails: getCurrentMovie(state, props.movieId),
  movieComments: getCurrentMovieComments(state),
  userAuthData: getUserAuthData(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadCurrentMovieComments(movieId) {
    dispatch(DataOperation.loadCurrentMovieComments(movieId));
  },
  onSendIsFavoriteMovie(movieId, isFavorite) {
    dispatch(DataOperation.sendIsFavoriteMovie(movieId, isFavorite));
    dispatch(DataOperation.loadMoviesList());
  }
});

export {MoviePage};
export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
