import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <a href="/" className="crudapp">
        Crud App
      </a>
      <ul className="nav-links">
        <li>
          <a href="/login">Login</a>
        </li>
        <li>
          <a href="/create-account">Create Account</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
