import React from "react";
import PropTypes from "prop-types";

import VideoPlayer from "../video-player/video-player.jsx";

const SmallMovieCard = (props) => {
  const {
    movieCard,
    onActiveItemChange,
    onSmallMovieCardClick,
    isPlaying,
  } = props;

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseOver = {() => onActiveItemChange(movieCard)}
      onMouseLeave = {() => onActiveItemChange(null)}
      onClick={() => onSmallMovieCardClick(movieCard)}
    >
      <div className="small-movie-card__image">
        <VideoPlayer
          isPlaying = {isPlaying}
          movieCard = {movieCard}
        />
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
  onSmallMovieCardClick: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};

export default SmallMovieCard;
