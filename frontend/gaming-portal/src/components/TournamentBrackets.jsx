// TournamentBrackets.js (React Component)

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TournamentBrackets = ({ tournamentId }) => {
  const [bracket, setBracket] = useState([]);
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    // Fetch initial bracket if any (after the first round)
    axios.get(`http://localhost:8080/api/admin/bracket/${tournamentId}`)
      .then((response) => {
        setBracket(response.data);
      })
      .catch((error) => {
        setMessage('Error fetching bracket');
      });
  }, [tournamentId]);

  const generateBracket = () => {
    axios.post(`http://localhost:8080/api/admin/bracket/generate/${tournamentId}`)
      .then((response) => {
        setMessage('Bracket generated successfully');
        setBracket(response.data);
      })
      .catch((error) => {
        setMessage('Error generating bracket');
      });
  };

  return (
    <div>
      <h1>Tournament Bracket</h1>
      <button onClick={generateBracket}>Generate Bracket</button>
      
      {message && <p>{message}</p>}
      
      <div>
        {/* Display the bracket in a visually appealing way */}
        {bracket.map((match, index) => (
          <div key={index}>
            <p>Match {index + 1}: {match.teamA.name} vs {match.teamB.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TournamentBrackets;
