import "../styles/navbar.css";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const location = useLocation();
  return (
    <div className="navbar">
      <ul className="navbar-list">
        <li className="nav-left"><a href="/home">Summarizer and Analyzer</a></li>
        {(location.pathname === "/home" || location.pathname === "/") && (
          <div className="nav-right">
            <li>
              <a href="/signup">Register</a>
            </li>
            <li>
              <a href="/login">Login</a>
            </li>
          </div>
        )}
        {(location.pathname === "/profile" ||
          location.pathname === "/project") && (
          <div className="nav-right">
            <li>
              <a href="/profile"><FontAwesomeIcon icon={faUser} style={{ fontSize: '24px' }} /></a>
            </li>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
