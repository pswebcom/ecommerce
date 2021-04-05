import React, { useState, useEffect } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import { Button, Input } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/loading/loading";
import { Link } from "react-router-dom";

const Login = ({ history }) => {
  const [email, setEmail] = useState("pswebco@gmail.com");
  const [password, setPassword] = useState("aaaaaa");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user]);

  let dispatch = useDispatch();
  // dispatch({
  //   type: "ON_LOGIN_PAGE",
  //   payload: {
  //     on_login_page: true,
  //   },
  // });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult;

      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          email: user.email,
          token: idTokenResult.token,
        },
      });
      history.push("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const googleLogin = () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: user.email,
            token: idTokenResult.token,
          },
        });
        history.push("/");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const loginForm = () => (
    <>
      <h4>Login</h4>
      <br />
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
        <Input
          type="password"
          size="large"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your Password"
        />
        <br />
        <br />
        <Button
          onClick={handleSubmit}
          type="primary"
          block
          icon={<MailOutlined />}
          size="large"
          className="mb-2"
          disabled={!email || password.length < 6}
        >
          Login with Email/Password
        </Button>
        <Button
          onClick={googleLogin}
          type="danger"
          block
          icon={<GoogleOutlined />}
          size="large"
          disabled={!email || password.length < 6}
        >
          Login with Google
        </Button>
        <Link
          to="/reset-password"
          className="font-weight-bold text-danger d-block pt-2"
        >
          Forgot Password
        </Link>
      </form>
    </>
  );

  return (
    <div className="container p-5">
      <div className="row">
        {/* put in center for that we use offset */}
        <div className="col-md-6 offset-md-3">
          {loading ? <Loading /> : loginForm()}
        </div>
      </div>
    </div>
  );
};

export default Login;
