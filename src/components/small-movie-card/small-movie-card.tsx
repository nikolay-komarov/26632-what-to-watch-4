import * as React from "react";
import {Link} from "react-router-dom";

import {AppRoute} from "../../utils/const";

import {
  MovieType,
} from "../../types";

interface Props {
  movieCard: MovieType;
  onActiveItemChange: (movieCard: MovieType | null) => void;
  onSmallMovieCardLeave: () => void;
  onSmallMovieCardHover: () => void;
  children: React.ReactNode;
}

const SmallMovieCard: React.FC<Props> = (props: Props) => {
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

export default SmallMovieCard;
