import React from 'react';
import './CallToAction.css';
import gamer1 from '../assets/gamer1.png';
import gamer2 from '../assets/gamer2.png';

function CallToAction() {
  return (
    <section className="cta-section">
      <div className="cta-wrapper">
        <div className="cta-left">
          <div className="cta-heading">
            <span className="gradient-bg" />
            <h2>
              START <span className="green-text">AND WIN</span><br />
              THE <span className="green-text">GAME</span>
            </h2>
          </div>
          <p>Are you ready to enter into an unusual competition with its unique matchmaking system.</p>
          <p>Feel the competition and win prizes</p>
        </div>

        <div className="cta-right">
          <img src={gamer1} alt="Gamer 1" className="img-back" />
          <img src={gamer2} alt="Gamer 2" className="img-front" />
        </div>
      </div>
    </section>
  );
}

export default CallToAction;
