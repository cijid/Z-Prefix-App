import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = ({ currentUser, setCurrentUser }) => {
  return (
    <nav className="navbar">
      <Link to="/" className="crudapp">
        Crud App
      </Link>
      <ul className="nav-links">
        {currentUser ? (
          <>
            <li>Logged in as {currentUser.First_Name}</li>
            <li>
              {" "}
              <button onClick={() => setCurrentUser(null)}>Logout</button>
            </li>
            <Link to="/additem" className="add-item-link">
              Add Item
            </Link>
          </>
        ) : (
          <li>
            <Link to="/account">Create Account or Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
