import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Import Axios for making API requests
import './LiveMatches.css';  // Using the same stylesheet

function LiveMatches() {
  const [matches, setMatches] = useState([]);  // State to store fetched match data
  const [loading, setLoading] = useState(true);  // Loading state while fetching data
  const [error, setError] = useState(null);  // Error state if something goes wrong

  // Replace this with the actual tournamentId (this can be passed as a prop or extracted from URL)
  const tournamentId = 5;

  // Fetch the bracket data on component mount
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/matches/bracket/${tournamentId}`)
      .then((response) => {
        setMatches(response.data);  // Set the match data to state
        setLoading(false);  // Set loading to false once the data is fetched
      })
      .catch((error) => {
        console.error('Error fetching tournament bracket:', error);
        setError('Failed to load bracket data');  // Show error if the API call fails
        setLoading(false);
      });
  }, [tournamentId]);  // Re-run when tournamentId changes

  // If the data is still loading, show a loading message
  if (loading) return <div>Loading bracket...</div>;

  // If there was an error fetching the data, show an error message
  if (error) return <div>{error}</div>;

  // Render the tournament bracket
  return (
    <div className="live-matches">
      <h2>Tournament Bracket</h2>
      <p>Ready for the challenge?</p>

      <div className="matches-list">
        {matches.map((match, index) => (
          <div className="match" key={index}>
            <div className="match-teams">
              <span>{match.teamA}</span> <span className="vs">VS</span> <span>{match.teamB}</span>
            </div>
            <div className="match-scheduled">
              Scheduled At: {new Date(match.scheduledAt).toLocaleString()}
            </div>
            <div className={`match-status ${match.status.toLowerCase()}`}>
              {match.status}
            </div>
            <div className="match-score">
              {match.scoreA !== null && match.scoreB !== null
                ? `${match.scoreA} - ${match.scoreB}`
                : 'Scores not available'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LiveMatches;
