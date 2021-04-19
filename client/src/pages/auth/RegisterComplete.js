import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createOrUpdateUser } from "../../functions/auth";

//props.history
const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //user from redux
  // const { user } = useSelector((state) => ({ ...state }));
  let dispatch = useDispatch();

  //useEffect will populate email onload
  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegisteration"));
  }, [history]);
  //argument 1 is fn argument 2 is dependency
  //whatever we use as dependency when it changes fex password
  //useState will run

  const handleSubmit = async (e) => {
    e.preventDefault();

    //validation______________________________________
    if (!email) {
      toast.error("Valid Email is required!!");
      return;
    }
    if (!password) {
      toast.error("Password is required!!");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be atleast 6 characters long.");
      return;
    }
    if (confirmPassword.length < 6) {
      toast.error("Confirm Password must be atleast 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Confirm Password does not match the Password");
      return;
    }
    // _____________________________________________________________________________________________
    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );

      if (result.user.emailVerified) {
        //step 1 Remove email from local storage...
        window.localStorage.removeItem("emailForRegisteration");
        //step 2 Get user Id Token...
        let user = auth.currentUser;
        await user.updatePassword(password); //previously it was pwd less now with pwd
        const idTokenResult = await user.getIdTokenResult();
        //step 3 redux store...

        createOrUpdateUser(idTokenResult.token)
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

        //step 4 redirect...
        history.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const completeRegisterationForm = () => (
    <form onSubmit={handleSubmit}>
      <br />
      <input type="email" className="form-control" value={email} />
      <br />
      <input
        type="password"
        className="form-control"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoFocus
        placeholder="Password"
      />

      <br />
      <input
        type="password"
        className="form-control"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        autoFocus
        placeholder="Confirm Password"
      />
      <button type="submit" className="btn btn-raised mt-4">
        Complete Registeration
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        {/* put in center for that we use offset */}
        <div className="col-md-6 offset-md-3">
          <h4>Registeration</h4>
          {completeRegisterationForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
