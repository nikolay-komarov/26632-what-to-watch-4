import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import SmallMovieCard from "../small-movie-card/small-movie-card.jsx";

class MoviesList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeMovieCard: null
    };
  }

  render() {
    const {moviesList} = this.props;

    return (
      <div className="catalog__movies-list">
        {
          moviesList.map((movie, index) => {
            return (
              <SmallMovieCard
                key = {`${index}-${movie.name}`}
                smallMovieCard = {movie}
                onSmallMovieCardHover = {() => {}}
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
    posterImage: PropTypes.string.isRequired,
  })).isRequired,
};

export default MoviesList;
