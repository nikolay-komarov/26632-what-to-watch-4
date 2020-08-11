import * as React from "react";

import {
  getMovieRatingLevel,
  getTimeFromMins,
  getDateToReview,
} from "../../utils/utils";
import {TabName} from "../../utils/const";

import {
  MovieType,
  CommentsType,
} from "../../types";

interface Props {
  movieDetails: MovieType;
  movieComments: CommentsType;
  activeItem: string;
  onActiveItemChange: (activeItem: string | MovieType) => void;
}

const Tabs: React.FC<Props> = (props: Props) => {
  const {
    movieDetails,
    movieComments,
    activeItem,
    onActiveItemChange,
  } = props;
  const {
    description,
    rating,
    scoreCount,
    director,
    staring,
    runTime,
    genre,
    released,
  } = movieDetails;

  const getActiveNavItemClassName = (tabName) => {
    return (activeItem === tabName ? `movie-nav__item--active` : ``);
  };

  const ratingLevel = getMovieRatingLevel(rating);
  const runTimeString = getTimeFromMins(runTime);

  return (
    <>
      <div className="movie-card__desc">
        <nav className="movie-nav movie-card__nav">
          <ul className="movie-nav__list">
            <li className={`movie-nav__item ${getActiveNavItemClassName(TabName.OVERVIEW)}`}>
              <a
                className="movie-nav__link"
                onClick={() => onActiveItemChange(TabName.OVERVIEW)}
              >
                Overview
              </a>
            </li>
            <li className={`movie-nav__item ${getActiveNavItemClassName(TabName.DETAILS)}`}>
              <a
                className="movie-nav__link"
                onClick={() => onActiveItemChange(TabName.DETAILS)}
              >
                Details
              </a>
            </li>
            <li className={`movie-nav__item ${getActiveNavItemClassName(TabName.REVIEWS)}`}>
              <a
                className="movie-nav__link"
                onClick={() => onActiveItemChange(TabName.REVIEWS)}
              >
                Reviews
              </a>
            </li>
          </ul>
        </nav>
        {
          activeItem === TabName.OVERVIEW && (
            <>
              <div className="movie-rating">
                <div className="movie-rating__score">{rating}</div>
                <p className="movie-rating__meta">
                  <span className="movie-rating__level">{ratingLevel}</span>
                  <span className="movie-rating__count">{scoreCount} ratings</span>
                </p>
              </div>
              <div className="movie-card__text">
                <p>{description}</p>
                <p className="movie-card__director"><strong>Director: {director}</strong></p>
                <p className="movie-card__starring"><strong>Starring: {staring.join(`, `)} and other</strong></p>
              </div>
            </>
          )
        }
        {
          activeItem === TabName.DETAILS && (
            <>
                <div className="movie-card__text movie-card__row">
                  <div className="movie-card__text-col">
                    <p className="movie-card__details-item">
                      <strong className="movie-card__details-name">Director</strong>
                      <span className="movie-card__details-value">{director}</span>
                    </p>
                    <p className="movie-card__details-item">
                      <strong className="movie-card__details-name">Starring</strong>
                      <span className="movie-card__details-value">
                        {
                          staring.map((actor, index) => (
                            <React.Fragment key={`${index}-${actor}`}>
                              {actor} <br />
                            </React.Fragment>
                          ))
                        }
                      </span>
                    </p>
                  </div>
                  <div className="movie-card__text-col">
                    <p className="movie-card__details-item">
                      <strong className="movie-card__details-name">Run Time</strong>
                      <span className="movie-card__details-value">{runTimeString}</span>
                    </p>
                    <p className="movie-card__details-item">
                      <strong className="movie-card__details-name">Genre</strong>
                      <span className="movie-card__details-value">{genre}</span>
                    </p>
                    <p className="movie-card__details-item">
                      <strong className="movie-card__details-name">Released</strong>
                      <span className="movie-card__details-value">{released}</span>
                    </p>
                  </div>
                </div>
              </>
          )
        }
        {
          activeItem === TabName.REVIEWS && (
            <>
              <div className="movie-card__reviews movie-card__row">
                <div className="movie-card__reviews-col">
                  {movieComments.map((review) => (
                    <div className="review" key={review.id}>
                      <blockquote className="review__quote">
                        <p className="review__text">{review.comment}</p>
                        <footer className="review__details">
                          <cite className="review__author">{review.userName}</cite>
                          <time className="review__date" dateTime={review.date}>{getDateToReview(review.date)}</time>
                        </footer>
                      </blockquote>
                      <div className="review__rating">{review.rating}</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )
        }
      </div>
    </>
  );
};

export default Tabs;
