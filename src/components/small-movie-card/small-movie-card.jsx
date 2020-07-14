import React from "react";
import PropTypes from "prop-types";

const SmallMovieCard = (props) => {
  const {
    movieCard,
    onActiveItemChange,
    onSmallMovieCardLeave,
    onSmallMovieCardHover,
    onSmallMovieCardClick,
    children,
  } = props;

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseOver = {() => {
        onActiveItemChange(movieCard);
        onSmallMovieCardHover();
      }}
      onMouseLeave = {() => {
        onActiveItemChange(null);
        onSmallMovieCardLeave();
      }}
      onClick={() => onSmallMovieCardClick(movieCard)}
    >
      <div className="small-movie-card__image">

        {children}

      </div>
      <h3 className="small-movie-card__title">
        <a
          className="small-movie-card__link"
          href="movie-page.html"
        >
          {movieCard.name}
        </a>
      </h3>
    </article>
  );
};

SmallMovieCard.propTypes = {
  movieCard: PropTypes.shape({
    name: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
  }),
  onActiveItemChange: PropTypes.func.isRequired,
  onSmallMovieCardLeave: PropTypes.func.isRequired,
  onSmallMovieCardHover: PropTypes.func.isRequired,
  onSmallMovieCardClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default SmallMovieCard;
