import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

import {
  AppRoute,
  AuthorizationStatus,
} from "../../utils/const.js";

const ReviewTextLengths = {
  MIN_LENGTH: 5,
  MAX_LENGTH: 400,
};

class AddReview extends PureComponent {
  constructor(props) {
    super(props);

    this.ratingStarsRef = createRef();
    this.reviewTextRef = createRef();
    this.postButton = createRef();
    this.errorSendCommentMessage = createRef();

    this.handleReviewTextInput = this.handleReviewTextInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.enableForm = this.enableForm.bind(this);
    this.disableForm = this.disableForm.bind(this);

    this.handleResponse = {
      onSuccess: () => {
        this.errorSendCommentMessage.current.classList.add(`visually-hidden`);
        this.enableForm();
      },
      onError: () => {
        this.errorSendCommentMessage.current.classList.remove(`visually-hidden`);
        this.enableForm();
      },
    };
  }

  enableForm() {
    const ratingInputs = this.ratingStarsRef.current.querySelectorAll(`input`);
    for (let item of ratingInputs) {
      item.disabled = false;
    }

    this.reviewTextRef.current.disabled = false;
    this.postButton.current.disabled = false;
  }

  disableForm() {
    const ratingInputs = this.ratingStarsRef.current.querySelectorAll(`input`);
    for (let item of ratingInputs) {
      item.disabled = true;
    }

    this.reviewTextRef.current.disabled = true;
    this.postButton.current.disabled = true;
  }

  componentDidMount() {
    this.postButton.current.disabled = true;
  }

  handleReviewTextInput() {
    const reviewText = this.reviewTextRef.current;
    const reviewTextLength = reviewText.value.length;

    if (reviewTextLength <= ReviewTextLengths.MIN_LENGTH || reviewTextLength >= ReviewTextLengths.MAX_LENGTH) {
      this.postButton.current.disabled = true;
    } else {
      this.postButton.current.disabled = false;
    }
  }

  handleSubmit(evt) {
    const {
      movie,
      onReviewSend,
    } = this.props;
    evt.preventDefault();

    const rating = this.ratingStarsRef.current.querySelector(`input:checked`).value;
    const reviewText = this.reviewTextRef.current.value;

    if (rating && reviewText) {
      const reviewData = {
        rating,
        comment: reviewText
      };

      this.disableForm();
      onReviewSend(reviewData, movie.id, this.handleResponse);
    }
  }

  render() {
    const {
      authorizationStatus,
      movie,
    } = this.props;
    const {
      id,
      name,
      backgroundImage,
      posterImage,
    } = movie;

    const isUserLogin = authorizationStatus === AuthorizationStatus.AUTH;

    return (
      <section className="movie-card movie-card--full">
        <div className="movie-card__header">
          <div className="movie-card__bg">
            <img src={backgroundImage} alt={name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header">
            <div className="logo">
              <Link
                className="logo__link"
                to={AppRoute.ROOT}
              >
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>

            <nav className="breadcrumbs">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link className="breadcrumbs__link"
                    to={`${AppRoute.FILM}/${id}`}
                  >
                    {name}
                  </Link>
                </li>
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link">Add review</a>
                </li>
              </ul>
            </nav>

            {/* ToDo - передать информацию о пользователе */}
            <div className="user-block">
              {
                !isUserLogin && (
                  <Link
                    className="user-block__link"
                    to={AppRoute.LOGIN}
                  >
                    Sign In
                  </Link>
                )
              }
              {
                isUserLogin && (
                  <div className="user-block__avatar">
                    <Link to={AppRoute.MY_LIST}>
                      <img src="/img/avatar.jpg" alt="User avatar" width="63" height="63" />
                    </Link>
                  </div>
                )
              }
            </div>
          </header>

          <div className="movie-card__poster movie-card__poster--small">
            <img src={posterImage} alt={name + ` poster`} width="218" height="327" />
          </div>
        </div>

        <div className="add-review">
          <form action="#" className="add-review__form"
            onSubmit = {this.handleSubmit}
          >
            <div className="rating">
              <div className="rating__stars" ref={this.ratingStarsRef}>
                <input className="rating__input" id="star-1" type="radio" name="rating" value="1"/>
                <label className="rating__label" htmlFor="star-1">Rating 1</label>

                <input className="rating__input" id="star-2" type="radio" name="rating" value="2"/>
                <label className="rating__label" htmlFor="star-2">Rating 2</label>

                <input className="rating__input" id="star-3" type="radio" name="rating" value="3" defaultChecked />
                <label className="rating__label" htmlFor="star-3">Rating 3</label>

                <input className="rating__input" id="star-4" type="radio" name="rating" value="4"/>
                <label className="rating__label" htmlFor="star-4">Rating 4</label>

                <input className="rating__input" id="star-5" type="radio" name="rating" value="5"/>
                <label className="rating__label" htmlFor="star-5">Rating 5</label>
              </div>
            </div>

            <div className="add-review__text">
              <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text"
                ref = {this.reviewTextRef}
                minLength = {ReviewTextLengths.MIN_LENGTH}
                maxLength = {ReviewTextLengths.MAX_LENGTH}
                onChange = {this.handleReviewTextInput}
              ></textarea>
              <div className="add-review__submit">
                <button ref={this.postButton} className="add-review__btn" type="submit">Post</button>
              </div>
            </div>

            <p ref={this.errorSendCommentMessage} className="visually-hidden" >sending review error, try again...</p>
          </form>
        </div>
      </section>
    );
  }
}

AddReview.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    posterImage: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
  }).isRequired,
  onReviewSend: PropTypes.func,
};

export default AddReview;
