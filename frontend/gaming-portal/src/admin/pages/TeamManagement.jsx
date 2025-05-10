import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TeamManagement.css';

const API_URL = 'http://localhost:8080/api/admin/teams'; // Replace with your actual backend endpoint

function TeamManagement() {
  const [teams, setTeams] = useState([]);
  const [message, setMessage] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [teamToDelete, setTeamToDelete] = useState(null);

  // Fetch all teams on component mount
  useEffect(() => {
    axios.get(API_URL, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
      .then(response => {
        setTeams(response.data);
      })
      .catch(error => {
        console.error('Error fetching teams:', error);
        setMessage('Failed to load teams.');
      });
  }, []);

  // Handle delete confirmation
  const confirmDelete = (team) => {
    setTeamToDelete(team);
    setShowDeleteModal(true);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setTeamToDelete(null);
  };

  const handleDeleteTeam = async () => {
    try {
      await axios.delete(`${API_URL}/${teamToDelete.id}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });

      setTeams(teams.filter((team) => team.id !== teamToDelete.id)); // Remove the team from the state
      setMessage('Team deleted successfully!');
      setShowDeleteModal(false);
      setTeamToDelete(null);
    } catch (error) {
      console.error('Error deleting team:', error);
      setMessage('Failed to delete team.');
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="team-management">
      <h2>Team Management</h2>

      {message && <p>{message}</p>}

      <table className="team-table">
        <thead>
          <tr>
            <th>Logo</th>
            <th>Team Name</th>
            <th>Region</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team.id}>
              <td>
                {/* Display the logo image */}
                <img 
                    src={team.logo || '/assets/default-logo.png'} 
                    alt={`${team.name} logo`} 
                    className="team-logoo" 
                    onError={(e) => {
                        e.target.onerror = null; // prevents infinite loop if default image fails
                        e.target.src = '/assets/default-logo.png';
                    }}
                    />
              </td>
              <td>{team.name}</td>
              <td>{team.region}</td>
              <td>
                <button className="btn-delete" onClick={() => confirmDelete(team)}>
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
            <p>Are you sure you want to delete the "{teamToDelete?.name}" team?</p>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={cancelDelete}>
                Cancel
              </button>
              <button className="btn-confirm-delete" onClick={handleDeleteTeam}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeamManagement;
