import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { Input, Button } from "antd";
import { useSelector } from "react-redux";
import Loading from "../../components/loading/loading";

const Register = ({ history }) => {
  const [email, setEmail] = useState("");
  const [flag, setFlag] = useState(false);
<<<<<<< HEAD
  const [loading, setLoading] = useState(true);

  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    setLoading(true);
    if (user && user.token) {
      history.push("/");
    }
    setLoading(false);
  }, [user, history]);
=======

  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user]);
>>>>>>> 229820b0c031893b8f44ffb866a618a853e90c64

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true, //register from same device only
    };

    await auth.sendSignInLinkToEmail(email, config);
    toast.success(
      `Email is send to ${email}.Click the link to complete your registeration`
    );

    //save user email in his browser's local storage
    window.localStorage.setItem("emailForRegisteration", email);

    //clear state
    setEmail("");
    setFlag(true);
  };

  const registerForm = () => (
    <>
      <h4>Register</h4>
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          size="large"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your Email"
          autoFocus
        />
        <Button
          type="primary"
          size="large"
          block
          className="btn btn-raised mt-4"
          disabled={!email}
          onClick={handleSubmit}
        >
          Register
        </Button>
      </form>
    </>
  );

  const showMessage = () => <h3>Please Check Your Email for confirmation.</h3>;

  return (
    <div className="container p-5">
      <div className="row">
        {loading ? (
          <Loading />
        ) : (
          <div className="col-md-6 offset-md-3">
            {!flag ? registerForm() : showMessage()}
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
// _______________________________________
