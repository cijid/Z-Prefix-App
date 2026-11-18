import { useState } from "react";

const LoginAccount = () => {
  const [userLogin, setUserLogin] = useState("Login Please");

  return (
    <div className="login-container">
      <div className="login-header">
        <div className="login-message">Login Here</div>
      </div>
      <div className="login-inputs">
        <div className="username">
          <input
            type="text"
            className="login-username"
            placeholder="Username"
          />
        </div>
        <div className="password">
          <input
            type="password"
            className="login-password"
            placeholder="Password"
          />
        </div>
      </div>
      <div className="submit-container">
        <div className={userLogin === "Login" ? "submit gray" : "submit"}>
          Login
        </div>
        <div className={userLogin === "Cancel" ? "submit gray" : "submit"}>
          Cancel
        </div>
      </div>
    </div>
  );
};

export default LoginAccount;
