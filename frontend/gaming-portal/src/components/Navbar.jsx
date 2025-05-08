import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';


function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">GAMING<span className="green-dot">•</span></div>
      <ul className="navbar-links">
        <li><Link to="/home">HOME</Link></li>
        <li><Link to="/tournaments">TOURNAMENTS</Link></li>
        <li><Link to="/leaderboard">LEADERBOARD</Link></li>
        <li><Link to="/watch">WATCH</Link></li>
        <li><Link to="/support">SUPPORT</Link></li>
      </ul>
      <div className="navbar-auth">
        <button className="signup"><Link to="/register">SIGN UP</Link></button>
        <button className="signin"><Link to="/login">SIGN IN</Link></button>
      </div>
    </nav>
  );
}

export default Navbar;
