import React from 'react';
import './LiveMatches.css';

function LiveMatches() {
  const matches = [
    { time: '9:00 PM', team1: 'SENTINELS', team2: 'NRG ESPORTS', status: 'LIVE' },
    { time: '10:00 PM', team1: 'SENTINELS', team2: 'NRG ESPORTS', status: 'LIVE' },
    { time: '11:00 PM', team1: 'SENTINELS', team2: 'NRG ESPORTS', status: 'UPCOMING' },
    { time: '12:00 PM', team1: 'SENTINELS', team2: 'NRG ESPORTS', status: 'UPCOMING' },
    { time: '9:00 PM', team1: 'SENTINELS', team2: 'NRG ESPORTS', status: 'UPCOMING' },
    { time: '9:00 PM', team1: 'SENTINELS', team2: 'NRG ESPORTS', status: 'UPCOMING' },
    { time: '9:00 PM', team1: 'SENTINELS', team2: 'NRG ESPORTS', status: 'UPCOMING' },
    { time: '9:00 PM', team1: 'SENTINELS', team2: 'NRG ESPORTS', status: 'UPCOMING' },
  ];

  return (
    <div className="live-matches">
      <h2>LIVE MATCHES</h2>
      <p>READY TO ENTER THE ARENA?</p>

      <div className="matches-list">
        {matches.map((match, index) => (
          <div className="match" key={index}>
            <div className="match-time">{match.time}</div>
            <div className="match-teams">
              <span>{match.team1}</span> <span className="vs">VS</span> <span>{match.team2}</span>
            </div>
            <div className={`match-status ${match.status.toLowerCase()}`}>{match.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LiveMatches;
