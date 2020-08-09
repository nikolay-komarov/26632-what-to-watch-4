import * as React from "react";
import PropTypes from "prop-types";

const GenresList = (props) => {
  const {
    genresList,
    currentGenre,
    onGenreItemClick
  } = props;

  return (
    <ul className="catalog__genres-list">
      {
        genresList.map((genre, index) => (
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
  genresList: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  currentGenre: PropTypes.string.isRequired,
  onGenreItemClick: PropTypes.func.isRequired,
};

export default GenresList;
