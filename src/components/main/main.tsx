import * as React from "react";
import {Link} from "react-router-dom";

import GenresList from "../genres-list/genres-list";
import MoviesList from "../movies-list/movies-list";
import withActiveItem from "../../hocs/with-active-item/with-active-item";
import ShowMoreButton from "../show-more-button/show-more-button";

import {
  getShowedMovies
} from "../../utils/utils";
import {
  AuthorizationStatus,
  AppRoute
} from "../../utils/const";
import history from "../../history";

import {
  MovieType,
  MoviesListType,
  UserAuthDataType,
} from "../../types";

interface Props {
  authorizationStatus: string;
  userAuthData: UserAuthDataType;
  movieCard: MovieType;
  genresList: string[];
  currentGenre: string;
  moviesByGenreList: MoviesListType;
  showedItemsInMoviesList: number;
  onGenreItemClick: () => void; // ToD;
  onShowMoreButtonClick: () => void; // Tod;
  onSendIsFavoriteMovie: (movieId: number, isFavorite: boolean) => void; // ToD;
}

const MoviesListWrapped = withActiveItem(MoviesList, null);

const Main: React.FC<Props> = (props: Props) => {
  const {
    authorizationStatus,
    userAuthData,
    movieCard,
    genresList,
    currentGenre,
    moviesByGenreList,
    showedItemsInMoviesList,
    onGenreItemClick,
    onShowMoreButtonClick,
    onSendIsFavoriteMovie,
  } = props;

  const isUserLogin = authorizationStatus === AuthorizationStatus.AUTH;

  return (
    <>
      <section className="movie-card">
        <div className="movie-card__bg">
          <img src={movieCard.backgroundImage} alt={movieCard.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header movie-card__head">
          <div className="logo">
            <a className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
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
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img src={movieCard.posterImage} alt={movieCard.name + ` poster`} width="218" height="327" />
            </div>

            <div className="movie-card__desc">
              <h2 className="movie-card__title">{movieCard.name}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{movieCard.genre}</span>
                <span className="movie-card__year">{movieCard.released}</span>
              </p>

              <div className="movie-card__buttons">
                <Link
                  className="btn btn--play movie-card__button"
                  type="button"
                  to={`${AppRoute.FILM}/${movieCard.id}${AppRoute.PLAYER}`}
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </Link>

                <button className="btn btn--list movie-card__button" type="button"
                  onClick = {() => isUserLogin ? onSendIsFavoriteMovie(movieCard.id, !movieCard.isFavorite) : history.push(`${AppRoute.LOGIN}`)}
                >
                  {
                    (movieCard.isFavorite)
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
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList
            genresList = {genresList}
            currentGenre = {currentGenre}
            onGenreItemClick = {onGenreItemClick}
          />

          <MoviesListWrapped
            moviesList = {getShowedMovies(moviesByGenreList, showedItemsInMoviesList)}
          />

          <ShowMoreButton
            moviesListLength = {moviesByGenreList.length}
            showedItemsInMoviesList = {showedItemsInMoviesList}
            onShowMoreButtonClick = {onShowMoreButtonClick}
          />
        </section>

        <footer className="page-footer">
          <div className="logo">
            <a className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Main;
