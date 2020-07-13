import React from "react";
import PropTypes from "prop-types";

import {
  getMovieRatingLevel,
  getTimeFromMins
} from "../../utils.js";
import {TabName} from "../../const.js";

const Tabs = (props) => {
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
                          <cite className="review__author">{review.useName}</cite>
                          <time className="review__date" dateTime={review.date}>{review.date}</time>
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

Tabs.propTypes = {
  movieDetails: PropTypes.shape({
    description: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    scoreCount: PropTypes.number.isRequired,
    director: PropTypes.string.isRequired,
    staring: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    runTime: PropTypes.number.isRequired,
    genre: PropTypes.string.isRequired,
    released: PropTypes.number.isRequired,
  }),
  movieComments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    userName: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired
  })).isRequired,
  activeItem: PropTypes.string.isRequired,
  onActiveItemChange: PropTypes.func.isRequired,
};

export default Tabs;
