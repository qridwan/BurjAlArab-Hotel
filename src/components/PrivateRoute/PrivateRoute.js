import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { UserContext } from "../../App";

function PrivateRoute({ children, ...rest }) {
  const [loggedIn, setLoggdedIn] = useContext(UserContext);
  console.log(loggedIn);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        loggedIn.name ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
export default PrivateRoute;
