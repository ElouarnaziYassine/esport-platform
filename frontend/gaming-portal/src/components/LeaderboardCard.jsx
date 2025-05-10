import React from 'react';
import './LeaderboardCard.css';

function LeaderboardCard({ rank, logo, name, region, points }) {
    console.log('Image URL:', logo); // Add this line

  return (
    <div className="leaderboard-card">
      <span className="rank">{rank}</span>
      <div className="logo-container">
        <img src={logo} alt={`${name} logo`} className="team-logo" />
      </div>
      <div className="team-info">
        <h3>{name}</h3>
        <p>{region}</p>
      </div>
      <span className="points">{points}</span>
    </div>
  );
}

export default LeaderboardCard;