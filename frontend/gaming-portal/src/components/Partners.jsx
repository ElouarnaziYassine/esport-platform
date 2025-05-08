import React from 'react';
import './Partners.css';
import riotLogo from '../assets/riot.png.png';
import corsairLogo from '../assets/corsair.png';
import logitechlogo from '../assets/logitech.png';
import razerlogo from '../assets/razer.png';

function Partners() {
  return (
    <section className="partners">
      <div className="partner-logos">
        <img src={riotLogo} alt="Riot Games" />
        <img src={corsairLogo} alt="Corsair" />
        <img src={logitechlogo} alt="Red Bull" />
        <img src={razerlogo} alt="Twitch" />
      </div>
    </section>
  );
}

export default Partners;
