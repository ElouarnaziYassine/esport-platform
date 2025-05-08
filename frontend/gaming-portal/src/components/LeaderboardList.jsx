import React from 'react';
import LeaderboardCard from './LeaderboardCard';
import teams from '../data/teams.json';

function LeaderboardList() {
  return (
    <div className="leaderboard-list">
      {teams.map((team, index) => (
        <LeaderboardCard 
          key={index} 
          rank={index + 1} 
          logo={`/assets/${team.logo}`} 
          {...team} 
        />
      ))}
    </div>
  );
}

export default LeaderboardList;
