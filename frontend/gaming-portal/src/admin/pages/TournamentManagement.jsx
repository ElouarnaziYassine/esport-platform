import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TournamentManagement.css';

function TournamentManagement() {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    game: '',
    startDate: '',
    endDate: '',
    status: 'UPCOMING'
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [tournamentToDelete, setTournamentToDelete] = useState(null);

  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/api/admin/tournaments', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTournaments(response.data);
    } catch (err) {
      setError('Failed to load tournaments. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      game: '',
      startDate: '',
      endDate: '',
      status: 'UPCOMING'
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (editingId) {
        const response = await axios.put(
          `http://localhost:8080/api/admin/tournaments/${editingId}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTournaments(tournaments.map(t => t.id === editingId ? response.data : t));
      } else {
        const response = await axios.post(
          'http://localhost:8080/api/admin/tournaments',
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
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
      status: tournament.status
    });
    setEditingId(tournament.id);
    setShowForm(true);
  };

  const confirmDelete = (tournament) => {
    setTournamentToDelete(tournament);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(
        `http://localhost:8080/api/admin/tournaments/${tournamentToDelete.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTournaments(tournaments.filter(t => t.id !== tournamentToDelete.id));
      setShowDeleteModal(false);
    } catch (err) {
      setError('Failed to delete tournament');
      console.error(err);
    }
  };

  const filteredTournaments = tournaments.filter(tournament =>
    tournament.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tournament.game.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="tournament-management">
      <div className="loading">Loading tournaments...</div>
    </div>
  );

  if (error) return (
    <div className="tournament-management">
      <p className="error">{error}</p>
    </div>
  );

  return (
    <div className="tournament-management">
      <h2>Tournament Management</h2>
      
      <div className="controls">
        <input
          type="text"
          placeholder="Search tournaments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button 
          className="btn-create"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
        >
          Create Tournament
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>{editingId ? 'Edit Tournament' : 'Create Tournament'}</h3>
              <button onClick={() => {
                setShowForm(false);
                resetForm();
              }} className="close-btn">&times;</button>
            </div>
            
            <form onSubmit={handleSubmit} className="form-container">
              <div className="form-group">
                <label>Tournament Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Game</label>
                <input
                  type="text"
                  name="game"
                  value={formData.game}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Start Date</label>
                <input
                  type="datetime-local"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>End Date</label>
                <input
                  type="datetime-local"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="UPCOMING">Upcoming</option>
                  <option value="ONGOING">Ongoing</option>
                  <option value="COMPLETED">Completed</option>
                </select>
              </div>
              
              <div className="modal-actions">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    resetForm();
                  }}
                  className="btn btn-cancel"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-save"
                >
                  {editingId ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Game</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTournaments.map(tournament => (
            <tr key={tournament.id}>
              <td>{tournament.name}</td>
              <td>{tournament.game}</td>
              <td>{new Date(tournament.startDate).toLocaleString()}</td>
              <td>{new Date(tournament.endDate).toLocaleString()}</td>
              <td>
                <span className={`status-badge status-${tournament.status}`}>
                  {tournament.status}
                </span>
              </td>
              <td className="actions">
                <button 
                  onClick={() => handleEdit(tournament)} 
                  className="btn btn-edit"
                >
                  Edit
                </button>
                <button 
                  onClick={() => confirmDelete(tournament)} 
                  className="btn btn-delete"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Confirm Delete</h3>
              <button onClick={() => setShowDeleteModal(false)} className="close-btn">&times;</button>
            </div>
            <div className="form-container">
              <p>Are you sure you want to delete "{tournamentToDelete?.name}" tournament?</p>
              <div className="modal-actions">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="btn btn-cancel"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="btn btn-delete"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TournamentManagement;