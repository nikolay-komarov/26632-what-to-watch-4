import React from "react";
import PropTypes from "prop-types";

import Main from "../main/main.jsx";

const App = (props) => {
  const {
    movieCard,
    movieList
  } = props;

  return (
    <Main
      movieCard = {movieCard}
      movieList = {movieList}
    />
  );
};

App.propTypes = {
  movieCard: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
  }).isRequired,
  movieList: PropTypes.arrayOf(
      PropTypes.string.isRequired
  ).isRequired,
};

export default App;
