import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/LoginCreateAccount.css";

const LoginCreateAccount = ({ setCurrentUser }) => {
  const [userSelection, setUserSelection] = useState("Create Account");
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (submission) => {
    submission.preventDefault();
    if (userSelection === "Create Account") {
      const response = await fetch("http://localhost:8080/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          First_Name: firstName,
          Last_Name: lastName,
          Username: username,
          Password: password,
        }),
      });

      const createdUser = await response.json();
      setCurrentUser(createdUser);
      navigate("/");
    } else {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Username: username,
          Password: password,
        }),
      });

      if (response.ok) {
        const matchedUser = await response.json();

        setCurrentUser(matchedUser);
        navigate("/");
      }
    }
  };

  return (
    <form className="account-container" onSubmit={handleSubmit}>
      <div className="account-header">
        <div className="account-message">{userSelection}</div>
        <div className="linebreak"></div>
      </div>

      <div className="submit-container">
        <div
          className={
            userSelection === "Create Account" ? "submit" : "submit gray"
          }
          onClick={() => setUserSelection("Create Account")}
        >
          Create Account
        </div>
        <div
          className={userSelection === "Login" ? "submit" : "submit gray"}
          onClick={() => setUserSelection("Login")}
        >
          Login
        </div>
      </div>

      <div className="account-inputs">
        {userSelection === "Create Account" && (
          <div>
            <div className="userFirstName">
              <input
                type="text"
                className="account-userFirstName"
                placeholder="First Name"
                value={firstName}
                onChange={(submission) => setFirstName(submission.target.value)}
                required
              />
            </div>
            <div className="userLastName">
              <input
                type="text"
                className="account-userLastName"
                placeholder="Last Name"
                value={lastName}
                onChange={(submission) => setLastName(submission.target.value)}
                required
              />
            </div>
          </div>
        )}

        <div className="username">
          <input
            type="text"
            className="account-username"
            placeholder="Username"
            value={username}
            onChange={(submission) => setUsername(submission.target.value)}
            required
          />
        </div>
        <div className="password">
          <input
            type="password"
            className="account-password"
            placeholder="Password"
            value={password}
            onChange={(submission) => setPassword(submission.target.value)}
            required
          />
        </div>
      </div>

      <div className="submit-container">
        <button type="submit" className="submit">
          Submit
        </button>
        <button
          type="button"
          className="submit gray"
          onClick={() => navigate("/")}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
export default LoginCreateAccount;
