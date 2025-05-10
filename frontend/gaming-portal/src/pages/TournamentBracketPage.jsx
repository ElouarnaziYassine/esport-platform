import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './TournamentBracketPage.css';

const TournamentBracketPage = () => {
  const { tournamentId } = useParams();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rounds, setRounds] = useState([]);

  useEffect(() => {
    if (!tournamentId) {
      console.error("Tournament ID is undefined");
      return;
    }

    const token = localStorage.getItem('token');

    axios
      .get(`http://localhost:8080/api/matches/bracket/${tournamentId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((response) => {
        setMatches(response.data);
        organizeMatchesIntoRounds(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching tournament bracket:', error);
        setLoading(false);
      });
  }, [tournamentId]);

  // Organize matches into rounds for better bracket visualization
  const organizeMatchesIntoRounds = (matches) => {
    const roundsMap = {};
    
    matches.forEach(match => {
      if (!roundsMap[match.round]) {
        roundsMap[match.round] = [];
      }
      roundsMap[match.round].push(match);
    });
    
    const roundsArray = Object.keys(roundsMap).map(roundName => ({
      name: getRoundDisplayName(roundName),
      matches: roundsMap[roundName]
    }));
    
    setRounds(roundsArray);
  };

  // Convert round names to display-friendly format
  const getRoundDisplayName = (round) => {
    const roundNames = {
      'ROUND_1': 'Quarterfinals',
      'ROUND_2': 'Semifinals',
      'ROUND_3': 'Finals',
      'ROUND_OF_16': 'Round of 16',
      'ROUND_OF_32': 'Round of 32'
    };
    
    return roundNames[round] || round.replace(/_/g, ' ');
  };

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading tournament bracket...</p>
    </div>
  );

  return (
    <div className="esports-bracket-container">
      <header className="bracket-header">
        <h1 className="tournament-title">TOURNAMENT BRACKET</h1>
      </header>

      <div className="bracket-grid">
        {rounds.map((round, roundIndex) => (
          <div key={roundIndex} className={`round round-${roundIndex + 1}`}>
            <div className="round-header">
              <h2>{round.name}</h2>
            </div>
            <div className="matches-container">
              {round.matches.map((match, matchIndex) => (
                <div key={match.matchId} className="match-card">
                  <div className="match-time">
                    {new Date(match.scheduledAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                  <div className="teams-container">
                    <div className={`team ${match.scoreA > match.scoreB ? 'winner' : ''}`}>
                      <span className="team-name">{match.teamA || 'TBD'}</span>
                      <span className="team-score">{match.scoreA !== null ? match.scoreA : '-'}</span>
                    </div>
                    <div className={`team ${match.scoreB > match.scoreA ? 'winner' : ''}`}>
                      <span className="team-name">{match.teamB || 'TBD'}</span>
                      <span className="team-score">{match.scoreB !== null ? match.scoreB : '-'}</span>
                    </div>
                  </div>
                  <div className={`match-status ${match.status.toLowerCase()}`}>
                    {match.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TournamentBracketPage;