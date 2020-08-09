import * as React from "react";
import PropTypes from "prop-types";

import SmallMovieCard from "../small-movie-card/small-movie-card";
import withVideoPlayer from "../../hocs/with-video-player/with-video-player";

import {VideoPlayerMode} from "../../utils/const";

const SmallMovieCardWraped = withVideoPlayer(SmallMovieCard, VideoPlayerMode.SMALL_MOVIE_CARD);

const MoviesList = (props) => {
  const {
    moviesList,
    activeItem,
    onActiveItemChange,
  } = props;
  return (
    <div className="catalog__movies-list">
      {
        moviesList.map((movie, index) => {
          return (
            <SmallMovieCardWraped
              key = {`${index}-${movie.name}`}
              movieCard = {movie}
              onActiveItemChange = {onActiveItemChange}
              isPlaying = {(activeItem === movie) ? true : false}
            />
          );
        })
      }
    </div>
  );
};

MoviesList.propTypes = {
  moviesList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    previewVideoLink: PropTypes.string.isRequired,
  })).isRequired,
  activeItem: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    previewVideoLink: PropTypes.string.isRequired,
  }),
  onActiveItemChange: PropTypes.func.isRequired,
};

export default MoviesList;
