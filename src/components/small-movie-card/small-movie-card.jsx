import React from "react";
import PropTypes from "prop-types";

const SmallMovieCard = (props) => {
  const {
    smallMovieCard,
  } = props;

  return (
    <article className="small-movie-card catalog__movies-card">
      <div className="small-movie-card__image">
        <img src={smallMovieCard.posterImage} alt={smallMovieCard.name} width="280" height="175" />
      </div>
      <h3 className="small-movie-card__title">
        <a
          className="small-movie-card__link"
          href="movie-page.html"
        >
          {smallMovieCard.name}
        </a>
      </h3>
    </article>
  );
};

SmallMovieCard.propTypes = {
  smallMovieCard: PropTypes.shape({
    name: PropTypes.string.isRequired,
    posterImage: PropTypes.string.isRequired,
  }),
};

export default SmallMovieCard;
