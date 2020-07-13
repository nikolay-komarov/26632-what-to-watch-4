import React, {PureComponent} from "react";
import PropTypes from "prop-types";

const TIME_OUT = 1000;

const withActiveMovieCard = (Component) => {
  class WithActiveMovieCard extends PureComponent {
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
      return (
        <Component
          {...this.props}

          onSmallMovieCardHover = {this.handleSmallMovieCardHover}
          onSmallMovieCardLeave = {this.handleSmallMovieCardLeave}
          onSmallMovieCardClick = {this.handleSmallMovieCardClick}
          activeMovieCard = {this.state.activeMovieCard}
        />
      );
    }
  }

  WithActiveMovieCard.propTypes = {
    onSmallMovieCardClick: PropTypes.func.isRequired,
  };

  return WithActiveMovieCard;
};

export default withActiveMovieCard;
