// MatchResults.js (React Component)

import React, { useState } from 'react';
import axios from 'axios';

const MatchResults = ({ matchId, tournamentId }) => {
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    axios.put(`http://localhost:8080/api/admin/matches/${matchId}/result`, {
      scoreA,
      scoreB
    })
    .then((response) => {
      setMessage('Match result updated successfully');
    })
    .catch((error) => {
      setMessage('Error updating match result');
    });
  };

  return (
    <div>
      <h2>Match Results</h2>
      <div>
        <input 
          type="number" 
          value={scoreA} 
          onChange={(e) => setScoreA(e.target.value)} 
          placeholder="Score Team A" 
        />
        <input 
          type="number" 
          value={scoreB} 
          onChange={(e) => setScoreB(e.target.value)} 
          placeholder="Score Team B" 
        />
      </div>
      <button onClick={handleSubmit}>Submit Result</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default MatchResults;
