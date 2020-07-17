import React from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";

import {ActionCreator} from "../../reducer.js";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import BigVideoPlayer from "../big-video-player/big-video-player.jsx";
import withVideoPlayer from "../../hocs/with-video-player/with-video-player.jsx";

import {VideoPlayerMode} from "../../const.js";

const BigVideoPlayerWrapped = withVideoPlayer(BigVideoPlayer, VideoPlayerMode.BIG_MOVIE_PLAYER);

const App = (props) => {
  const {
    promoMovieCard,
    currentGenre,
    moviesList,
    showedItemsInMoviesList,
    currentMovie,
    currentMovieComments,
    onSmallMovieCardClick,
    onGenreItemClick,
    onShowMoreButtonClick,
  } = props;

  const renderApp = () => {
    if (currentMovie) {
      return (
        <MoviePage
          movieDetails = {currentMovie}
          movieComments = {currentMovieComments}
          moviesList = {moviesList}
          onSmallMovieCardClick = {onSmallMovieCardClick}
        />
      );
    }

    return (
      <Main
        movieCard = {promoMovieCard}
        currentGenre = {currentGenre}
        moviesList = {moviesList}
        showedItemsInMoviesList = {showedItemsInMoviesList}
        onSmallMovieCardClick = {onSmallMovieCardClick}
        onGenreItemClick = {onGenreItemClick}
        onShowMoreButtonClick = {onShowMoreButtonClick}
      />
    );
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
            moviesList = {moviesList}
            onSmallMovieCardClick = {onSmallMovieCardClick}
          />
        </Route>
        <Route exact path="/dev-big-player">
          <BigVideoPlayerWrapped
            movieCard = {moviesList[0]}
            isPlaying = {false}
            onPlayButtonClick = {() => {}}
            onFullScreenButtonClick = {() => {}}
            getPlaybackProgress = {() => {}}
            getTimeLeft = {() => {}}
            onExitButtonClick = {() => {}}
          />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
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
  currentGenre: PropTypes.string.isRequired,
  moviesList: PropTypes.arrayOf(PropTypes.shape({
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
};

const mapStateToProps = (state) => ({
  promoMovieCard: state.promoMovieCard,
  currentGenre: state.currentGenre,
  moviesList: state.moviesList,
  showedItemsInMoviesList: state.showedItemsInMoviesList,
  currentMovie: state.currentMovie,
  currentMovieComments: state.currentMovieComments,
});

const mapDispatchToProps = (dispatch) => ({
  onSmallMovieCardClick(movie) {
    dispatch(ActionCreator.changeCurrentMovie(movie));
  },
  onGenreItemClick(genre) {
    dispatch(ActionCreator.changeGenre(genre));
    dispatch(ActionCreator.resetShowedItemsInMoviesList());
  },
  onShowMoreButtonClick() {
    dispatch(ActionCreator.showMoreItemsInMoviesList());
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
