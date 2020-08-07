import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

import {connect} from "react-redux";

import MoviesList from "../movies-list/movies-list.jsx";
import withActiveItem from "../../hocs/with-active-item/with-active-item.jsx";

import {Operation as DataOperation} from "../../reducer/data/data.js";
import {getFavoriteMoviesList} from "../../reducer/data/selectors.js";
import {AppRoute} from "../../utils/const.js";

const MoviesListWrapped = withActiveItem(MoviesList, null);

class MyList extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {loadFavoriteMoviesList} = this.props;

    loadFavoriteMoviesList();
  }

  render() {
    const {favoriteMoviesList} = this.props;

    return (
      <div className="user-page">
        <header className="page-header user-page__head">
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

          <h1 className="page-title user-page__title">My list</h1>

          <div className="user-block">
            <div className="user-block__avatar">
              <img src="/img/avatar.jpg" alt="User avatar" width="63" height="63" />
            </div>
          </div>
        </header>

        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <MoviesListWrapped
            moviesList = {favoriteMoviesList}
          />

        </section>

        <footer className="page-footer">
          <div className="logo">
            <Link
              className="logo__link logo__link--light"
              to={AppRoute.ROOT}
            >
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    );
  }
}

MyList.propTypes = {
  favoriteMoviesList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    previewVideoLink: PropTypes.string.isRequired,
  })),
  loadFavoriteMoviesList: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  favoriteMoviesList: getFavoriteMoviesList(state)
});

const mapDispatchToProps = (dispatch) => ({
  loadFavoriteMoviesList() {
    dispatch(DataOperation.loadFavoriteMoviesList());
  },
});

export {MyList};
export default connect(mapStateToProps, mapDispatchToProps)(MyList);
