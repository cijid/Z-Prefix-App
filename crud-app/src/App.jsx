import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import CrudApp from "./components/CrudApp.jsx";
import LoginCreateAccount from "./components/LoginCreateAccount.jsx";
import Navbar from "./components/Navbar.jsx";
import AddItem from "./components/AddItem.jsx";

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
        <Route
          path="/additem"
          element={<AddItem currentUser={currentUser} />}
        />
      </Routes>
    </div>
  );
}
