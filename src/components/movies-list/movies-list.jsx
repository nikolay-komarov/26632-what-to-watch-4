import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import SmallMovieCard from "../small-movie-card/small-movie-card.jsx";

const TIME_OUT = 1000;

class MoviesList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeMovieCard: null
    };

    this.timerId = null;

    this.handleSmallMovieCardHover = this.handleSmallMovieCardHover.bind(this);
    this.handleSmallMovieCardLeave = this.handleSmallMovieCardLeave.bind(this);
    this.handleSmallMovieCardClick = this.handleSmallMovieCardClick.bind(this);
  }

  handleSmallMovieCardHover(movie) {
    this.timerId = setTimeout(() => {
      this.setState({activeMovieCard: movie});
    }, TIME_OUT);
  }
  handleSmallMovieCardLeave() {
    this.setState({activeMovieCard: null});
    clearTimeout(this.timerId);
  }
  handleSmallMovieCardClick(movie) {
    const {onSmallMovieCardClick} = this.props;

    clearTimeout(this.timerId);
    onSmallMovieCardClick(movie);
  }

  render() {
    const {
      moviesList,
    } = this.props;

    return (
      <div className="catalog__movies-list">
        {
          moviesList.map((movie, index) => {
            return (
              <SmallMovieCard
                key = {`${index}-${movie.name}`}
                movieCard = {movie}
                onSmallMovieCardHover = {this.handleSmallMovieCardHover}
                onSmallMovieCardLeave = {this.handleSmallMovieCardLeave}
                onSmallMovieCardClick = {this.handleSmallMovieCardClick}
                isPlaying = {(this.state.activeMovieCard === movie) ? true : false}
              />
            );
          })
        }
      </div>
    );
  }
}

MoviesList.propTypes = {
  moviesList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    previewVideoLink: PropTypes.string.isRequired,
  })).isRequired,
  onSmallMovieCardClick: PropTypes.func.isRequired,
};

export default MoviesList;
