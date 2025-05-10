import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './TournamentForm.css';

function TournamentForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tournament, setTournament] = useState({
    name: '',
    game: '',
    startTime: '',
    endTime: '',
    status: 'PENDING'
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      // Fetch existing tournament for editing
      axios.get(`http://localhost:8080/api/admin/tournaments/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      .then(response => setTournament(response.data))
      .catch(err => {
        setError('Failed to load tournament');
        console.error(err);
      });
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTournament(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        // Update existing tournament
        await axios.put(`http://localhost:8080/api/admin/tournaments/${id}`, tournament, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      } else {
        // Create new tournament
        await axios.post('http://localhost:8080/api/admin/tournaments', tournament, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      }
      navigate('/admin/tournaments');
    } catch (err) {
      setError('Failed to save tournament');
      console.error(err);
    }
  };

  return (
    <div className="tournament-form">
      <h2>{id ? 'Edit Tournament' : 'Create Tournament'}</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Tournament Name"
          value={tournament.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="game"
          placeholder="Game"
          value={tournament.game}
          onChange={handleInputChange}
          required
        />
        <input
          type="datetime-local"
          name="startTime"
          value={tournament.startTime}
          onChange={handleInputChange}
          required
        />
        <input
          type="datetime-local"
          name="endTime"
          value={tournament.endTime}
          onChange={handleInputChange}
          required
        />
        <select
          name="status"
          value={tournament.status}
          onChange={handleInputChange}
          required
        >
          <option value="PENDING">Pending</option>
          <option value="ONGOING">Ongoing</option>
          <option value="COMPLETED">Completed</option>
        </select>
        <button type="submit">Save Tournament</button>
      </form>
    </div>
  );
}

export default TournamentForm;
