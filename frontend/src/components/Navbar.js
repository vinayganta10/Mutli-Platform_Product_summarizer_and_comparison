import "../styles/navbar.css";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Button from "@mui/material/Button";

const Navbar = () => {
  const location = useLocation();
  let token = localStorage.getItem("token");
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    window.location.reload();
  };
  return (
    <div className="navbar">
      <ul className="navbar-list">
        <li className="nav-left">
          <a href="/home">Summarizer and Analyzer</a>
        </li>
        {!token &&
          (location.pathname === "/home" || location.pathname === "/") && (
            <div className="nav-right">
              <li>
                <a href="/signup">Register</a>
              </li>
              <li>
                <a href="/login">Login</a>
              </li>
            </div>
          )}
        {token &&
          (location.pathname === "/home" ||
            location.pathname === "/profile" ||
            location.pathname === "/project") && (
            <div className="nav-right">
              <li style={{ display: "flex", alignItems: "center" }}>
                <a href="/profile" style={{ marginRight: "10px" }}>
                  <FontAwesomeIcon icon={faUser} style={{ fontSize: "24px" }} />
                </a>
                <Button variant="contained" color="secondary" onClick={logout}>
                  Logout
                </Button>
              </li>
            </div>
          )}
      </ul>
    </div>
  );
};

export default Navbar;
