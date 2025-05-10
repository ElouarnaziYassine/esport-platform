import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Changed to named import

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  // Check if the user is logged in and decode the JWT token to extract username and role
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
      try {
        // Decode the JWT token
        const decodedToken = jwtDecode(token);

        // Log the entire decoded token to see its structure
        console.log("Decoded token:", decodedToken);

        // Check if username and role are in the decoded token
        setUsername(decodedToken.username || decodedToken.sub || decodedToken.email || "Unknown User");
        console.log("Decoded username:", decodedToken.username);

        // Set the role from decoded token
        setRole(decodedToken.role || "USER");  // Assuming "role" is a property in the token
        console.log("Decoded role:", decodedToken.role);
      } catch (error) {
        console.error("Invalid token", error);
        setIsLoggedIn(false);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear JWT token from localStorage
    setIsLoggedIn(false);  // Mark user as logged out
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        GAMING<span className="green-dot">•</span>
      </div>
      <ul className="navbar-links">
        <li><Link to="/home">HOME</Link></li>
        <li><Link to="/tournament">TOURNAMENTS</Link></li>
        <li><Link to="/leaderboard">LEADERBOARD</Link></li>
        <li><Link to="/watch">WATCH</Link></li>
        <li><Link to="/support">SUPPORT</Link></li>
      </ul>
      <div className="navbar-auth">
        {!isLoggedIn ? (
          <>
            <button className="signup"><Link to="/register">SIGN UP</Link></button>
            <button className="signin"><Link to="/login">SIGN IN</Link></button>
          </>
        ) : (
          <div className="dropdown">
            <button className="dropbtn">
              {username} <span className="caret">▼</span>
            </button>
            <div className="dropdown-content">
              <Link to="/profile">Profile</Link>
              <Link to="/settings">Settings</Link>
              {role === 'COACH' && <Link to="/coach/team">Manage Teams</Link>} {/* Only show for coaches */}
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
