import * as React from "react";
import PropTypes from "prop-types";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AppRoute} from "../../utils/const";
import {AuthorizationStatus} from "../../utils/const";
import {
  getAuthorizationStatus,
  getAuthorizationStatusLoaded,
} from "../../reducer/user/selector";
import Loader from "../loader/loader";

const PrivateRoute = (props) => {
  const {
    render,
    path,
    exact,
    authorizationStatus,
    authorizationStatusLoaded,
  } = props;

  return (
    <Route
      path={path}
      exact={exact}
      render={(routeProps) => {
        if (authorizationStatusLoaded) {
          return (
            authorizationStatus === AuthorizationStatus.AUTH
              ? render(routeProps)
              : <Redirect to={AppRoute.LOGIN} />
          );
        }

        return <Loader />;
      }}
    />
  );
};

PrivateRoute.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  authorizationStatusLoaded: PropTypes.bool.isRequired,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  authorizationStatusLoaded: getAuthorizationStatusLoaded(state),
});

export {PrivateRoute};
export default connect(mapStateToProps)(PrivateRoute);
