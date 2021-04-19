import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  let history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);

    count === 0 && history.push("/");

    return () => clearInterval(interval);
  }, [count, history]);

  return (
    <div className="container p-5 text-center bold">
      <p>Redirecting you in {count} seconds.</p>
      <p>Please Login to your Account</p>
    </div>
  );
};

export default LoadingToRedirect;
