import React from 'react';
import './GameList.css';

import lolImg from '../assets/lol.jpg';
import valorantImg from '../assets/valorant.png';
import r6Img from '../assets/r6s.jpg';

function GameList() {
  const games = [
    {
      name: 'LEAGUE OF LEGENDS',
      genre: '5v5 • MOBA • BATTLE',
      image: lolImg,
    },
    {
      name: 'VALORANT',
      genre: 'TACTICAL 5v5 • SHOOTER',
      image: valorantImg,
    },
    {
      name: 'RAINBOW SIX SIEGE',
      genre: 'STRATEGIC FPS • TACTICAL OPS',
      image: r6Img,
    },
  ];

  return (
    <section className="game-list">
      <h2 className="title">GAME LIST</h2>
      <p className="subtitle">COMPETE IN NEXT-LEVEL TOURNAMENTS. PREDICT. PLAY. WIN.</p>

      <div className="game-cards">
        {games.map((game, index) => (
          <div className="game-card" key={index} style={{ backgroundImage: `url(${game.image})` }}>
            <div className="game-overlay">
              <h3>{game.name}</h3>
              <p>{game.genre}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="join-btn-wrapper">
        <button className="join-button">JOIN THE ACTION</button>
      </div>
    </section>
  );
}

export default GameList;
