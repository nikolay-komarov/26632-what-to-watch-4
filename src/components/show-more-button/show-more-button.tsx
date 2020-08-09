import React from "react";
import PropTypes from "prop-types";

const ShowMoreButton = (props) => {
  const {
    moviesListLength,
    showedItemsInMoviesList,
    onShowMoreButtonClick,
  } = props;

  return showedItemsInMoviesList < moviesListLength
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
  showedItemsInMoviesList: PropTypes.number.isRequired,
  onShowMoreButtonClick: PropTypes.func.isRequired,
};

export default ShowMoreButton;
