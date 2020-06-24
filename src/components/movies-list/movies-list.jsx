import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import SmallMovieCard from "../small-movie-card/small-movie-card.jsx";

class MoviesList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeMovieCard: null
    };

    this.handleSmallMovieCardHover = this.handleSmallMovieCardHover.bind(this);
    this.handleSmallMovieCardLeave = this.handleSmallMovieCardLeave.bind(this);
  }

  handleSmallMovieCardHover(movie) {
    this.setState({activeMovieCard: movie});
  }
  handleSmallMovieCardLeave() {
    this.setState({activeMovieCard: null});
  }

  render() {
    const {
      moviesList,
      onSmallMovieCardClick
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
                onSmallMovieCardClick = {onSmallMovieCardClick}
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
  })).isRequired,
  onSmallMovieCardClick: PropTypes.func.isRequired,
};

export default MoviesList;
