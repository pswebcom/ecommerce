import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import Header from "./components/nav/Header";
import RegisterComplete from "./pages/auth/RegisterComplete";
import ResetPassword from "./pages/auth/ResetPassword";

import { auth } from "./firebase";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  //to check firebase auth state wether user is logged in

  //What useEffect does is execute the function provided on the first render and every other render
  //when a variable in the second argument changes.Since we provided an an empty array,
  //it will only ever execute once - when the component initially renders
  useEffect(() => {
    // onAuthStateChanged Adds an observer for changes to the user's sign-in state.
    const unSubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // User is signed in.
        const idTokenResult = await user.getIdTokenResult();

        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: user.email,
            token: idTokenResult.token,
          },
        });
      }
    });

    //cleanup
    return () => unSubscribe();
  });

  return (
    <>
      <Header />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/reset-password" component={ResetPassword} />
      </Switch>
    </>
  );
};

export default App;
