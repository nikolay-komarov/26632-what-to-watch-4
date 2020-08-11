import * as React from "react";
import {Route, Redirect, RouteProps} from "react-router-dom";
import {connect} from "react-redux";
import {AppRoute} from "../../utils/const";
import {AuthorizationStatus} from "../../utils/const";
import {
  getAuthorizationStatus,
  getAuthorizationStatusLoaded,
} from "../../reducer/user/selector";
import Loader from "../loader/loader";

type Props = RouteProps & {
  authorizationStatus: string;
  authorizationStatusLoaded: boolean;
  render: () => React.ReactNode;
}

const PrivateRoute: React.FunctionComponent<Props> = (props: Props) => {
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

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  authorizationStatusLoaded: getAuthorizationStatusLoaded(state),
});

export {PrivateRoute};
export default connect(mapStateToProps)(PrivateRoute);
