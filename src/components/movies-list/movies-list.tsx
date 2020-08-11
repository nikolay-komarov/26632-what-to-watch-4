import * as React from "react";

import SmallMovieCard from "../small-movie-card/small-movie-card";
import withVideoPlayer from "../../hocs/with-video-player/with-video-player";

import {VideoPlayerMode} from "../../utils/const";

import {
  MovieType,
  MoviesListType,
} from "../../types";

interface Props {
  moviesList: MoviesListType;
  activeItem: MovieType;
  onActiveItemChange: () => void; // ToDo
}

const SmallMovieCardWraped = withVideoPlayer(SmallMovieCard, VideoPlayerMode.SMALL_MOVIE_CARD);

const MoviesList: React.FC<Props> = (props: Props) => {
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

export default MoviesList;
