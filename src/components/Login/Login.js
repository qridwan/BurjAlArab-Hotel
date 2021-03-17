import firebase from "firebase";
import { useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { UserContext } from "../../App";
import { firebaseConfig } from "./Firebase.config";
import "./Login.css";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Login = () => {
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  const [loggedIn, setLoggedIn] = useContext(UserContext);
  const provider = new firebase.auth.GoogleAuthProvider();
  const GoogleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        const { displayName, email } = user;
        const isSignedIn = {
          name: displayName,
          email: email
        };
        setLoggedIn(isSignedIn);
        history.replace(from);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        console.log(errorCode, errorMessage, email);
      });
  };

  return (
    <div className="login">
      <button onClick={GoogleSignIn}> Google Sign in </button>
    </div>
  );
};

export default Login;
