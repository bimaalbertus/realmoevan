import { Route, Routes, Navigate } from "react-router-dom";

export default function PrivateRoute({ authUser, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        authUser ? (
          children
        ) : (
          <Navigate
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
