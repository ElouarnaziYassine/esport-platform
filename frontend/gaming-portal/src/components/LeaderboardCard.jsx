import React from 'react';
import './LeaderboardCard.css';

function LeaderboardCard({ rank, logo, name, region, points }) {
  return (
    <div className="leaderboard-card">
      <span className="rank">{rank}</span>
      <img src={logo} alt={`${name} logo`} className="team-logo" />
      <div className="team-info">
        <h3>{name}</h3>
        <p>{region}</p>
      </div>
      <span className="points">{points}</span>
    </div>
  );
}

export default LeaderboardCard;
