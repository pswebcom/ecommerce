import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";

const Register = ({ history }) => {
  const [email, setEmail] = useState("");
  const [flag, setFlag] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user]);

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
        {/* put in center for that we use offset */}
        <div className="col-md-6 offset-md-3">
          {!flag ? registerForm() : showMessage()}
        </div>
      </div>
    </div>
  );
};

export default Register;
// _______________________________________
