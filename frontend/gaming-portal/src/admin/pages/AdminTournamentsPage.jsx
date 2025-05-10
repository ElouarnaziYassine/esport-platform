import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminTournamentsPage.css';

const AdminTournamentsPage = () => {
  const [tournaments, setTournaments] = useState([]); // Initialize as empty array
  const [message, setMessage] = useState('');
  
  // Fetch tournaments data from backend
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/admin/tournaments', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      })
      .then((response) => {
        console.log("Fetched tournaments:", response.data); // Log response to verify the structure
        if (Array.isArray(response.data)) {
          setTournaments(response.data); // Ensure the data is an array
        } else {
          setMessage('Invalid data format received');
        }
      })
      .catch((error) => {
        setMessage('Error fetching tournaments.');
        console.error(error);
      });
  }, []);

  // Generate bracket for a specific tournament
  const handleGenerateBracket = (tournamentId) => {
    axios
      .post(`http://localhost:8080/api/admin/bracket/generate/${tournamentId}`, null, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      })
      .then((response) => {
        setMessage('Bracket generated successfully!');
      })
      .catch((error) => {
        console.error('Error generating bracket:', error);
        setMessage('Error generating bracket.');
      });
  };

  return (
    <div className="admin-tournaments-page">
      <h2>Admin Tournament List</h2>
      {message && <p>{message}</p>}
      <div className="tournament-list">
        {tournaments.length > 0 ? (
          tournaments.map((tournament) => (
            <div className="tournament-card" key={tournament.id}>
              <h3>{tournament.name}</h3>
              <p>Game: {tournament.game}</p>
              <p>Region: {tournament.region}</p>
              <p>Status: {tournament.status}</p>
              <h4>Teams:</h4>
              <ul>
                {/* Ensure that teams data exists */}
                {tournament.teams && tournament.teams.length > 0 ? (
                  tournament.teams.map((team) => (
                    <li key={team.id}>{team.name}</li>
                  ))
                ) : (
                  <li>No teams registered yet.</li>
                )}
              </ul>
              <button onClick={() => handleGenerateBracket(tournament.id)}>
                Generate Bracket
              </button>
            </div>
          ))
        ) : (
          <p>No tournaments available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminTournamentsPage;
