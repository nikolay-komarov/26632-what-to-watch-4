import React from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";

import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";

const App = (props) => {
  const {
    movieCard,
    moviesList
  } = props;

  const handleSmallMovieCardClick = () => {};

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Main
            movieCard = {movieCard}
            moviesList = {moviesList}
            onSmallMovieCardClick = {handleSmallMovieCardClick}
          />
        </Route>
        <Route exact path="/dev-film">
          <MoviePage />
        </Route>
      </Switch>
    </BrowserRouter>

  );
};

App.propTypes = {
  movieCard: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
  }).isRequired,
  moviesList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    posterImage: PropTypes.string.isRequired,
  })).isRequired,
};

export default App;
