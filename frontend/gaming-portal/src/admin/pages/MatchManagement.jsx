import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MatchManagement.css';

const API_URL = 'http://localhost:8080/api/admin/matches'; // Replace with your actual backend endpoint

function MatchManagement({ tournamentId }) {
  const [matches, setMatches] = useState([]);
  const [teams, setTeams] = useState([]);
  const [newMatch, setNewMatch] = useState({
    teamAId: '',
    teamBId: '',
    scheduledAt: '',
  });
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch teams for the tournament and existing matches
  useEffect(() => {
    axios.get(`http://localhost:8080/api/admin/matches/tournament/${tournamentId}`)
      .then(response => {
        setMatches(response.data);  // Fetch all matches of the tournament
      })
      .catch(error => {
        console.error('Error fetching matches:', error);
      });

    axios.get(`http://localhost:8080/api/teams/tournament/${tournamentId}`)
      .then(response => {
        setTeams(response.data);  // Fetch all teams of the tournament
      })
      .catch(error => {
        console.error('Error fetching teams:', error);
      });
  }, [tournamentId]);

  // Handle input changes in the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMatch({ ...newMatch, [name]: value });
  };

  // Handle form submission to create a new match
  const handleAddMatch = async (e) => {
    e.preventDefault();
    if (!newMatch.teamAId || !newMatch.teamBId || !newMatch.scheduledAt) {
      setMessage('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post(API_URL, newMatch, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      setMatches([...matches, response.data]);  // Add the new match to the list
      setMessage('Match created successfully!');
      setShowForm(false);
      setNewMatch({ teamAId: '', teamBId: '', scheduledAt: '' }); // Reset form
    } catch (error) {
      setMessage('Failed to create match.');
      console.error('Error creating match:', error);
    }
  };

  // Handle delete match
  const handleDeleteMatch = async (matchId) => {
    try {
      await axios.delete(`${API_URL}/${matchId}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      setMatches(matches.filter(match => match.id !== matchId)); // Remove the deleted match from the list
      setMessage('Match deleted successfully!');
    } catch (error) {
      setMessage('Failed to delete match.');
      console.error('Error deleting match:', error);
    }
  };

  return (
    <div className="match-management">
      <h2>Match Management</h2>
      {message && <p>{message}</p>}

      <button className="btn-create" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : 'Create New Match'}
      </button>

      {showForm && (
        <div className="form-container">
          <select
            name="teamAId"
            value={newMatch.teamAId}
            onChange={handleChange}
            className="form-input"
          >
            <option value="">Select Team A</option>
            {teams.map(team => (
              <option key={team.id} value={team.id}>{team.name}</option>
            ))}
          </select>

          <select
            name="teamBId"
            value={newMatch.teamBId}
            onChange={handleChange}
            className="form-input"
          >
            <option value="">Select Team B</option>
            {teams.map(team => (
              <option key={team.id} value={team.id}>{team.name}</option>
            ))}
          </select>

          <input
            type="datetime-local"
            name="scheduledAt"
            value={newMatch.scheduledAt}
            onChange={handleChange}
            className="form-input"
          />

          <button className="btn-save" onClick={handleAddMatch}>Save Match</button>
        </div>
      )}

      <table className="match-table">
        <thead>
          <tr>
            <th>Match ID</th>
            <th>Team A</th>
            <th>Team B</th>
            <th>Scheduled At</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match) => (
            <tr key={match.id}>
              <td>{match.id}</td>
              <td>{match.teamA.name}</td>
              <td>{match.teamB.name}</td>
              <td>{new Date(match.scheduledAt).toLocaleString()}</td>
              <td>{match.status}</td>
              <td>
                <button className="btn-delete" onClick={() => handleDeleteMatch(match.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MatchManagement;
