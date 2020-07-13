import React from "react";
import PropTypes from "prop-types";
import SmallMovieCard from "../small-movie-card/small-movie-card.jsx";

const MoviesList = (props) => {
  const {
    moviesList,
    onSmallMovieCardHover,
    onSmallMovieCardLeave,
    onSmallMovieCardClick,
    activeMovieCard,
  } = props;
  return (
    <div className="catalog__movies-list">
      {
        moviesList.map((movie, index) => {
          return (
            <SmallMovieCard
              key = {`${index}-${movie.name}`}
              movieCard = {movie}
              onSmallMovieCardHover = {onSmallMovieCardHover}
              onSmallMovieCardLeave = {onSmallMovieCardLeave}
              onSmallMovieCardClick = {onSmallMovieCardClick}
              isPlaying = {(activeMovieCard === movie) ? true : false}
            />
          );
        })
      }
    </div>
  );
};

MoviesList.propTypes = {
  moviesList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    previewVideoLink: PropTypes.string.isRequired,
  })).isRequired,
  onSmallMovieCardHover: PropTypes.func.isRequired,
  onSmallMovieCardLeave: PropTypes.func.isRequired,
  onSmallMovieCardClick: PropTypes.func.isRequired,
  activeMovieCard: PropTypes.shape({
    name: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    previewVideoLink: PropTypes.string.isRequired,
  }),
};

export default MoviesList;
