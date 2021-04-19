import React, { useState, useEffect } from "react";
import UserNav from "../../components/nav/UserNav";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { Button, Input } from "antd";
import Loading from "../../components/loading/loading";
const UpdatePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await auth.currentUser
      .updatePassword(password)
      .then((resp) => {
        setLoading(false);
        toast.success("Password Updated.");
        setPassword("");
        setConfirmPassword("");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err);
      });
  };

  const passwordUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <Input
        type="password"
        size="large"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your Password"
      />
      <br />
      <br />
      <Input
        type="password"
        size="large"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm Your Password"
        disabled={loading}
      />
      <br />
      <br />
      <Button
        onClick={handleSubmit}
        type="primary"
        block
        size="large"
        className="mb-2"
        disabled={
          !confirmPassword ||
          confirmPassword.length < 6 ||
          password !== confirmPassword ||
          loading
        }
      >
        Update Password
      </Button>
    </form>
  );

  return (
    <div className="container-fluid pt-5">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div className="col-md-5 m-auto">
            <h4>Password Update Form</h4>
            {passwordUpdateForm()}
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdatePassword;
