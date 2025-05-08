import React from 'react';
import './HowToDominate.css';

function HowToDominate() {
  return (
    <section className="dominate-section">
      <div className="dominate-container">
        <div className="dominate-left">
          <h2>HOW TO DOMINATE</h2>
          <p>
            Take control of your e-sports journey with our all-in-one tournament management platform.
            Register teams, track live matches, and dominate tournaments with real-time updates and AI-powered predictions.
          </p>
          <p>
            Whether you're a player, team manager, or organizer, our system helps you analyze, strategize, and win.
            Join now and rise to the top!
          </p>
          <button className="dominate-button">SIGN UP & CONNECT</button>
        </div>

        <div className="dominate-right">
          {['blue', 'purple', 'green'].map((color, index) => (
            <div className={`user-card ${color}`} key={index}>
              <div className="avatar" />
              <div className="user-info">
                <span className="username">GamingUser</span>
                <div className="status-dots">
                  <span className="dot online" />
                  <span className="dot playing" />
                </div>
              </div>
              <div className="headset">🎧</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowToDominate;
