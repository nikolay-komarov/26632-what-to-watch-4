import React from "react";
import PropTypes from "prop-types";

import Main from "../main/main.jsx";

const App = (props) => {
  const {
    movieCard,
    moviesList
  } = props;

  const handleSmallMovieCardClick = () => {};

  return (
    <Main
      movieCard = {movieCard}
      moviesList = {moviesList}
      onSmallMovieCardClick = {handleSmallMovieCardClick}
    />
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
