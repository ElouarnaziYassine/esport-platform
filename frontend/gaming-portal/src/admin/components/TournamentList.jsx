import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './TournamentList.css';

function TournamentList() {
  const [tournaments, setTournaments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/admin/tournaments', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setTournaments(response.data);
      } catch (err) {
        setError('Failed to load tournaments');
        console.error(err);
      }
    };
    
    fetchTournaments();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/admin/tournaments/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setTournaments(tournaments.filter(tournament => tournament.id !== id));
    } catch (err) {
      setError('Failed to delete tournament');
      console.error(err);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`http://localhost:8080/api/admin/tournaments/${id}/status`, null, {
        params: { status },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setTournaments(tournaments.map(t => t.id === id ? { ...t, status } : t));
    } catch (err) {
      setError('Failed to change status');
      console.error(err);
    }
  };
  

  return (
    <div className="tournament-list">
      <h2>Tournaments</h2>
      {error && <p className="error">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Game</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tournaments.map(t => (
            <tr key={t.id}>
              <td>{t.name}</td>
              <td>{t.game}</td>
              <td>{t.status}</td>
              <td>
                <Link to={`/admin/tournaments/${t.id}`}>View</Link> | 
                <Link to={`/admin/tournaments/${t.id}/edit`}>Edit</Link> | 
                <button onClick={() => handleDelete(t.id)}>Delete</button>
              </td>
              <td>
                <button onClick={() => handleStatusChange(t.id, 'ONGOING')}>Start Tournament</button>
                <button onClick={() => handleStatusChange(t.id, 'COMPLETED')}>Complete Tournament</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/admin/tournaments/new" className="btn-create">Create New Tournament</Link>
    </div>
  );
}

export default TournamentList;
