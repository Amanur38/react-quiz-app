import React from "react";
import { Redirect, Route } from "react-router-dom";
import AuthService from "../Lib/AuthService";

const PrivateRoute = ({ component: Component, ...rest }) => {
  let isLoggedIn = AuthService.isLoggedIn();

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/login" }} />
        )
      }
    />
  );
};

const RedirectLoggedIn = ({ component: Component, ...rest }) => {
  let isLoggedIn = AuthService.isLoggedIn();

  return (
    <Route
      {...rest}
      render={(props) =>
        !isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/" }} />
        )
      }
    />
  );
};

export { PrivateRoute, RedirectLoggedIn };
