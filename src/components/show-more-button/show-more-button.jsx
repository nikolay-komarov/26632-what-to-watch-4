import React from "react";
import PropTypes from "prop-types";

const ShowMoreButton = (props) => {
  const {
    moviesListLength,
    showedItemInMoviesList,
    onShowMoreButtonClick,
  } = props;

  return showedItemInMoviesList < moviesListLength
    ? (
      <div className="catalog__more">
        <button
          className="catalog__button"
          type="button"
          onClick={onShowMoreButtonClick}
        >
          Show more
        </button>
      </div>)
    : null;
};

ShowMoreButton.propTypes = {
  moviesListLength: PropTypes.number.isRequired,
  showedItemInMoviesList: PropTypes.number.isRequired,
  onShowMoreButtonClick: PropTypes.func.isRequired,
};

export default ShowMoreButton;
