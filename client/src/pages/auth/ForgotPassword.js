import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { Button, Input } from "antd";
import Loading from "../../components/loading/loading";
import "./auth.css";
import { useSelector } from "react-redux";

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [flag, setFlag] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
      handleCodeInApp: true, //register from same device only
    };

    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail("");
        setLoading(false);
        toast.success(`Check your email for password Reset Link`);
        setFlag(true);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error(err.message);
      });
  };

  const loginForm = () => (
    <div className="form">
      {!flag && <h4>Forgot Password </h4>}

      {flag && <h2>Please Check Your Email for Reset Pasword Link</h2>}

      {!flag && (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <Input
              type="email"
              size="large"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Email"
              autoFocus
            />
          </div>
          <Button
            onClick={handleSubmit}
            type="primary"
            block
            // icon={<MailOutlined />}
            size="large"
            className="mb-2"
            disabled={!email}
          >
            Submit Email
          </Button>
        </form>
      )}
    </div>
  );

  return (
    <div className="container  p-5">
      <div className="row">
        {/* put in center for that we use offset */}
        <div className="col-md-6 offset-md-3">
          {loading ? <Loading /> : loginForm()}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
