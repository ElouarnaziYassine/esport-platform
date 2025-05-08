import React from 'react';
import './Hero.css';

function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay">
        <div className="hero-content">
          <h1>Join the Battle. Win the Glory.</h1>
          <p>Compete in tournaments, climb the leaderboard, and become a legend.</p>
          <div className="hero-buttons">
            <button className="btn-primary">Get Started</button>
            <button className="btn-secondary">Watch Trailer</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
