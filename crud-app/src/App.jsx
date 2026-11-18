import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import CrudApp from "./CrudApp.jsx";
import LoginCreateAccount from "./LoginCreateAccount.jsx";
import Navbar from "./Navbar.jsx";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  return (
    <div>
      <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Routes>
        <Route path="/" element={<CrudApp currentUser={currentUser} />} />
        <Route
          path="/account"
          element={<LoginCreateAccount setCurrentUser={setCurrentUser} />}
        />
      </Routes>
    </div>
  );
}
