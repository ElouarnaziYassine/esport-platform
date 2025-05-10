import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TournamentManagement.css';

function TournamentManagement() {
  const [tournaments, setTournaments] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    game: '',
    startDate: '',
    endDate: '',
    status: 'UPCOMING',
  });
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [tournamentToDelete, setTournamentToDelete] = useState(null);

  // Fetch tournaments on component mount
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      game: '',
      startDate: '',
      endDate: '',
      status: 'UPCOMING',
    });
    setEditingId(null);
  };

  const handleSubmit = async () => {
    try {
      if (editingId) {
        // Update existing tournament
        const response = await axios.put(
          `http://localhost:8080/api/admin/tournaments/${editingId}`,
          formData,
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
        setTournaments(tournaments.map(t => t.id === editingId ? response.data : t));
      } else {
        // Create new tournament
        const response = await axios.post(
          'http://localhost:8080/api/admin/tournaments',
          formData,
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setTournaments([...tournaments, response.data]);
      }
      setShowForm(false);
      resetForm();
    } catch (err) {
      setError(editingId ? 'Failed to update tournament' : 'Failed to create tournament');
      console.error(err);
    }
  };

  const handleEdit = (tournament) => {
    setFormData({
      name: tournament.name,
      game: tournament.game,
      startDate: tournament.startDate,
      endDate: tournament.endDate,
      status: tournament.status,
    });
    setEditingId(tournament.id);
    setShowForm(true);
  };

  const confirmDelete = (tournament) => {
    setTournamentToDelete(tournament);
    setShowDeleteModal(true);
  };

  const handleDeleteTournament = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/api/admin/tournaments/${tournamentToDelete.id}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
      setTournaments(tournaments.filter(t => t.id !== tournamentToDelete.id));
      setShowDeleteModal(false);
      setTournamentToDelete(null);
    } catch (err) {
      setError('Failed to delete tournament');
      console.error(err);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setTournamentToDelete(null);
  };

  return (
    <div className="tournament-management">
      <h2>Tournament Management</h2>
      <button 
        className="btn-create" 
        onClick={() => {
          resetForm();
          setShowForm(!showForm);
        }}
      >
        {showForm ? 'Cancel' : 'Create New Tournament'}
      </button>

      {showForm && (
        <div className="form-container">
          <h3>{editingId ? 'Edit Tournament' : 'Create Tournament'}</h3>
          <input
            type="text"
            name="name"
            placeholder="Tournament Name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
            required
          />
          <input
            type="text"
            name="game"
            placeholder="Game (e.g., Rocket League)"
            value={formData.game}
            onChange={handleChange}
            className="form-input"
            required
          />
          <input
            type="datetime-local"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="form-input"
            required
          />
          <input
            type="datetime-local"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="form-input"
            required
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="form-input"
          >
            <option value="UPCOMING">Upcoming</option>
            <option value="ONGOING">Ongoing</option>
            <option value="COMPLETED">Completed</option>
          </select>
          <button className="btn-save" onClick={handleSubmit}>
            {editingId ? 'Update Tournament' : 'Save Tournament'}
          </button>
        </div>
      )}

      {error && <p className="error">{error}</p>}

      <table className="tournament-table">
        <thead>
          <tr>
            <th>Tournament Name</th>
            <th>Game</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tournaments.map((tournament) => (
            <tr key={tournament.id}>
              <td>{tournament.name}</td>
              <td>{tournament.game}</td>
              <td>{new Date(tournament.startDate).toLocaleString()}</td>
              <td>{new Date(tournament.endDate).toLocaleString()}</td>
              <td>{tournament.status}</td>
              <td>
                <button 
                  className="btn-edit"
                  onClick={() => handleEdit(tournament)}
                >
                  Edit
                </button>
                <button 
                  className="btn-delete"
                  onClick={() => confirmDelete(tournament)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete "{tournamentToDelete.name}" tournament?</p>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={cancelDelete}>
                Cancel
              </button>
              <button className="btn-confirm-delete" onClick={handleDeleteTournament}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TournamentManagement;