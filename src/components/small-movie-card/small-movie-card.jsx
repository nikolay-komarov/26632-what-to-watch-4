import React from "react";
import PropTypes from "prop-types";

const SmallMovieCard = (props) => {
  const {
    movieCard,
    onSmallMovieCardHover,
    onSmallMovieCardLeave,
    onSmallMovieCardClick,
  } = props;

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseOver={() => onSmallMovieCardHover(movieCard)}
      onMouseLeave={() => onSmallMovieCardLeave()}
      onClick={() => onSmallMovieCardClick(movieCard)}
    >
      <div className="small-movie-card__image">
        <img src={movieCard.posterImage} alt={movieCard.name} width="280" height="175" />
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
    posterImage: PropTypes.string.isRequired,
  }),
  onSmallMovieCardHover: PropTypes.func.isRequired,
  onSmallMovieCardLeave: PropTypes.func.isRequired,
  onSmallMovieCardClick: PropTypes.func.isRequired,
};

export default SmallMovieCard;
