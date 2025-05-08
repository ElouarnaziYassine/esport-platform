import React from 'react';
import './Footer.css';
import { FaYoutube, FaTwitter, FaDiscord, FaInstagram, FaTwitch } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand">
        GAMING<span className="green-dot">•</span>
      </div>

      <div className="footer-icons">
        <FaYoutube />
        <FaTwitter />
        <FaDiscord />
        <FaTwitch />
        <FaInstagram />
      </div>

      <div className="footer-links">
        <a href="#">ABOUT</a>
        <a href="#">TOURNAMENTS</a>
        <a href="#">MMAKING</a>
      </div>

      <div className="footer-bottom">
        <p>
          Terms of Use · Privacy Policy <br />
          © 2023 Alivo <span style={{ color: '#ff4d9b' }}>❤️</span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
