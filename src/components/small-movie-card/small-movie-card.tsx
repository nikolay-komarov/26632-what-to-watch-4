import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

import {AppRoute} from "../../utils/const";

const SmallMovieCard = (props) => {
  const {
    movieCard,
    onActiveItemChange,
    onSmallMovieCardLeave,
    onSmallMovieCardHover,
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
    >
      <div className="small-movie-card__image">

        {children}

      </div>
      <h3 className="small-movie-card__title">
        <Link
          className="small-movie-card__link"
          to={`${AppRoute.FILM}/${movieCard.id}`}
        >
          {movieCard.name}
        </Link>
      </h3>
    </article>
  );
};

SmallMovieCard.propTypes = {
  movieCard: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
  }),
  onActiveItemChange: PropTypes.func.isRequired,
  onSmallMovieCardLeave: PropTypes.func.isRequired,
  onSmallMovieCardHover: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default SmallMovieCard;
