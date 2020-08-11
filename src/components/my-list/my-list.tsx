import * as React from "react";
import {Link} from "react-router-dom";

import {connect} from "react-redux";

import MoviesList from "../movies-list/movies-list";
import withActiveItem from "../../hocs/with-active-item/with-active-item";

import {Operation as DataOperation} from "../../reducer/data/data";
import {getFavoriteMoviesList} from "../../reducer/data/selectors";
import {AppRoute} from "../../utils/const";
import {getUserAuthData} from "../../reducer/user/selector";

import {
  MoviesListType,
  UserAuthDataType,
} from "../../types";

interface Props {
  userAuthData: UserAuthDataType;
  favoriteMoviesList: MoviesListType;
  loadFavoriteMoviesList: () => void; // ToDo
}

const MoviesListWrapped = withActiveItem(MoviesList, null);

class MyList extends React.PureComponent<Props, {}> {
  props: Props;

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {loadFavoriteMoviesList} = this.props;

    loadFavoriteMoviesList();
  }

  render() {
    const {
      userAuthData,
      favoriteMoviesList
    } = this.props;

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
              <img src={userAuthData.avatarUrl} alt="User avatar" width="63" height="63" />
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

const mapStateToProps = (state) => ({
  favoriteMoviesList: getFavoriteMoviesList(state),
  userAuthData: getUserAuthData(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadFavoriteMoviesList() {
    dispatch(DataOperation.loadFavoriteMoviesList());
  },
});

export {MyList};
export default connect(mapStateToProps, mapDispatchToProps)(MyList);
