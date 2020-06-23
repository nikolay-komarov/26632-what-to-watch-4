import React from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";

import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentMovie: null,
    };
  }

  _renderApp() {
    const {
      movieCard,
      moviesList
    } = this.props;
    const {currentMovie} = this.state;

    if (currentMovie) {
      return (
        <MoviePage
          movieDetails = {currentMovie}
        />
      );
    }

    return (
      <Main
        movieCard = {movieCard}
        moviesList = {moviesList}
        onSmallMovieCardClick = {(movie) => {
          this.setState({currentMovie: movie});
        }}
      />
    );
  }

  render() {
    const {movieCard} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-film">
            <MoviePage
              movieDetails = {movieCard}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  movieCard: PropTypes.shape({
    name: PropTypes.string.isRequired,
    posterImage: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    scoreCount: PropTypes.number.isRequired,
    director: PropTypes.string.isRequired,
    staring: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    genre: PropTypes.string.isRequired,
    released: PropTypes.number.isRequired,
  }).isRequired,
  moviesList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
  })).isRequired,
};

export default App;
