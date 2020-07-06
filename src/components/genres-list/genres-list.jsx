import React from "react";
import PropTypes from "prop-types";

import {getGenresList} from "../../utils.js";

const GenresList = (props) => {
  const {
    moviesList,
    currentGenre,
    onGenreItemClick
  } = props;

  return (
    <ul className="catalog__genres-list">
      {
        getGenresList(moviesList).map((genre, index) => (
          <li
            className={`catalog__genres-item ${
              genre === currentGenre ? `catalog__genres-item--active` : ``
            }`}
            key={genre + `-` + index}
          >
            <a
              className="catalog__genres-link"
              onClick={() => onGenreItemClick(genre)}
            >
              {genre}
            </a>
          </li>
        ))
      }
    </ul>
  );
};

GenresList.propTypes = {
  moviesList: PropTypes.arrayOf(PropTypes.shape({
    genre: PropTypes.string.isRequired,
  })).isRequired,
  currentGenre: PropTypes.string.isRequired,
  onGenreItemClick: PropTypes.func.isRequired,
};

export default GenresList;
