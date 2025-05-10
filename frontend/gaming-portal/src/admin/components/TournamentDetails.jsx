import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './TournamentDetails.css';

function TournamentDetails() {
  const { id } = useParams();
  const [tournament, setTournament] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTournament = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/admin/tournaments/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setTournament(response.data);
      } catch (err) {
        setError('Failed to load tournament details');
        console.error(err);
      }
    };

    fetchTournament();
  }, [id]);

  if (error) return <p className="error">{error}</p>;

  if (!tournament) return <p>Loading...</p>;

  return (
    <div className="tournament-details">
      <h2>{tournament.name}</h2>
      <p><strong>Game:</strong> {tournament.game}</p>
      <p><strong>Status:</strong> <span className={`status ${tournament.status}`}>{tournament.status}</span></p>
      <p><strong>Start Time:</strong> {new Date(tournament.startTime).toLocaleString()}</p>
      <p><strong>End Time:</strong> {new Date(tournament.endTime).toLocaleString()}</p>
      <button onClick={() => window.location.href = '/admin/tournaments'}>Back to Tournaments</button>
    </div>
  );
}

export default TournamentDetails;
