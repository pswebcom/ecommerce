import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "./firebase";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import Header from "./components/nav/Header";
import RegisterComplete from "./pages/auth/RegisterComplete";
import ForgotPassword from "./pages/auth/ForgotPassword";
import History from "./pages/user/History";
import UpdatePassword from "./pages/user/UpdatePassword";
import Wishlist from "./pages/user/Wishlist";
import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";

import { currentUser } from "./functions/auth";

const App = () => {
  const dispatch = useDispatch();

  //to check firebase auth state wether user is logged in

  //What useEffect does is execute the function provided on the first render and every other render
  //when a variable in the second argument changes.Since we provided an an empty array,
  //it will only ever execute once - when the component initially renders
  useEffect(() => {
    // onAuthStateChanged Adds an observer for changes to the user's sign-in state.
    const unSubscribe = auth.onAuthStateChanged(
      async (user) => {
        if (user) {
          // User is signed in.
          const idTokenResult = await user.getIdTokenResult();

          currentUser(idTokenResult.token)
            .then((res) => {
              dispatch({
                type: "LOGGED_IN_USER",
                payload: {
                  name: res.data.name,
                  email: res.data.email,
                  role: res.data.role,
                  _id: res.data._id,
                  token: idTokenResult.token,
                },
              });
            })
            .catch((err) => console.log("error______", err));
        }
      },
      [dispatch]
    );

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
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <UserRoute exact path="/user/password" component={UpdatePassword} />
        <UserRoute exact path="/user/wishlist" component={Wishlist} />
        <UserRoute exact path="/user/history" component={History} />
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
      </Switch>
    </>
  );
};

export default App;
