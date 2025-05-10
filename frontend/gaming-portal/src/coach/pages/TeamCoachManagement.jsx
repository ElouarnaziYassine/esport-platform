import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TeamCoachManagement.css';
import Navbar from '../../components/Navbar';
import { FaEdit, FaTrash, FaUserCog, FaUsers, FaArrowDown, FaArrowUp, FaSave, FaTimesCircle } from 'react-icons/fa';

const API_URL = 'http://localhost:8080/api/coach/teams';

function TeamManagement() {
  const [teams, setTeams] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newTeam, setNewTeam] = useState({
    name: '',
    game: '',
    region: '',
    logoUrl: ''
  });
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [playersList, setPlayersList] = useState([]);
  const [message, setMessage] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [teamToDelete, setTeamToDelete] = useState(null);
  const [expandedTeam, setExpandedTeam] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editingTeam, setEditingTeam] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    region: '',
    logoUrl: ''
  });

  // Fetch teams for the coach
  useEffect(() => {
    setIsLoading(true);
    axios.get(API_URL, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
      .then(response => {
        setTeams(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        setMessage('Error fetching teams.');
        console.error(error);
        setIsLoading(false);
      });

    // Fetch available players for the coach to select
    axios.get('http://localhost:8080/api/players/all', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
      .then(response => {
        setPlayersList(response.data);
      })
      .catch(error => {
        setMessage('Error fetching players.');
        console.error(error);
      });
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTeam({ ...newTeam, [name]: value });
  };

  // Handle player selection for the team
  const handlePlayerSelection = (playerId) => {
    if (selectedPlayers.includes(playerId)) {
      setSelectedPlayers(selectedPlayers.filter(id => id !== playerId));
    } else if (selectedPlayers.length < 5) {
      setSelectedPlayers([...selectedPlayers, playerId]);
    } else {
      setMessage('A team must have exactly 5 players.');
    }
  };

  // Create a new team
  const handleCreateTeam = async (e) => {
    e.preventDefault();

    if (selectedPlayers.length !== 5) {
      setMessage('Please select exactly 5 players.');
      return;
    }

    const teamData = {
      name: newTeam.name,
      game: newTeam.game,
      region: newTeam.region,
      logoUrl: newTeam.logoUrl,
      playerIds: selectedPlayers
    };

    try {
      setIsLoading(true);
      const response = await axios.post(API_URL, teamData, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      setTeams([...teams, response.data]);
      setMessage('Team created successfully!');
      setShowForm(false);
      setNewTeam({ name: '', game: '', region: '', logoUrl: '' });
      setSelectedPlayers([]);
      setIsLoading(false);
    } catch (error) {
      setMessage('Failed to create team.');
      console.error(error);
      setIsLoading(false);
    }
  };

  // Handle team deletion
  const handleDeleteTeam = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`${API_URL}/${teamToDelete.id}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      setTeams(teams.filter(team => team.id !== teamToDelete.id));
      setMessage('Team deleted successfully!');
      setShowDeleteModal(false);
      setTeamToDelete(null);
      setIsLoading(false);
    } catch (error) {
      setMessage('Failed to delete team.');
      console.error(error);
      setIsLoading(false);
    }
  };

  // Handle cancel delete
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setTeamToDelete(null);
  };

  // Toggle team details expansion
  const toggleTeamDetails = (teamId) => {
    if (expandedTeam === teamId) {
      setExpandedTeam(null);
    } else {
      setExpandedTeam(teamId);
    }
  };

  // Handle edit button click
  const handleEditClick = (e, team) => {
    e.stopPropagation();
    setEditingTeam(team.id);
    setEditFormData({
      name: team.name,
      region: team.region,
      logoUrl: team.logo || ''
    });
    setExpandedTeam(team.id); // Expand the card when editing
  };

  // Handle edit form input changes
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  // Cancel editing
  const cancelEdit = (e) => {
    e.stopPropagation();
    setEditingTeam(null);
  };

  // Save edited team
  const saveEditedTeam = async (e, teamId) => {
    e.stopPropagation();
    try {
      setIsLoading(true);
      const response = await axios.put(`${API_URL}/${teamId}`, editFormData, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      
      // Update the teams array with edited team
      setTeams(teams.map(team => 
        team.id === teamId ? { ...team, name: editFormData.name, region: editFormData.region, logo: editFormData.logoUrl } : team
      ));
      
      setMessage('Team updated successfully!');
      setEditingTeam(null);
      setIsLoading(false);
    } catch (error) {
      setMessage('Failed to update team.');
      console.error(error);
      setIsLoading(false);
    }
  };

  // Display loading spinner
  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="team-management">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="team-management-container">
        <div className="team-management-header">
          <h2>Team Management</h2>
          <button className="btn-create" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'Create New Team'}
          </button>
        </div>

        {message && <div className="message-alert">{message}</div>}

        {showForm && (
          <div className="form-container">
            <h3>Create New Team</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">Team Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newTeam.name}
                  onChange={handleInputChange}
                  required />
              </div>
              <div className="form-group">
                <label htmlFor="game">Game</label>
                <input
                  type="text"
                  id="game"
                  name="game"
                  value={newTeam.game}
                  onChange={handleInputChange}
                  required />
              </div>
              <div className="form-group">
                <label htmlFor="region">Region</label>
                <input
                  type="text"
                  id="region"
                  name="region"
                  value={newTeam.region}
                  onChange={handleInputChange}
                  required />
              </div>
              <div className="form-group">
                <label htmlFor="logoUrl">Logo URL</label>
                <input
                  type="text"
                  id="logoUrl"
                  name="logoUrl"
                  value={newTeam.logoUrl}
                  onChange={handleInputChange} />
              </div>
            </div>

            <div className="player-selection-container">
              <h3>Select Players (5 required)</h3>
              <div className="player-grid">
                {playersList.map(player => (
                  <div key={player.id} className={`player-card ${selectedPlayers.includes(player.id) ? 'selected' : ''}`}>
                    <input
                      type="checkbox"
                      id={`player-${player.id}`}
                      onChange={() => handlePlayerSelection(player.id)}
                      checked={selectedPlayers.includes(player.id)} />
                    <label htmlFor={`player-${player.id}`}>
                      <div className="player-avatar">
                        {player.image ? (
                          <img src={player.image} alt={player.username} />
                        ) : (
                          <div className="player-initials">{player.username.charAt(0).toUpperCase()}</div>
                        )}
                      </div>
                      <div className="player-info">
                        <span className="player-name">{player.username}</span>
                        {player.gamertag && <span className="player-gamertag">@{player.gamertag}</span>}
                      </div>
                    </label>
                  </div>
                ))}
              </div>
              <div className="form-actions">
                <button className="btn-save" onClick={handleCreateTeam}>Save Team</button>
              </div>
            </div>
          </div>
        )}

        <div className="teams-container">
          {teams.length === 0 ? (
            <div className="no-teams">
              <p>No teams found. Create a new team to get started.</p>
            </div>
          ) : (
            teams.map((team) => (
              <div key={team.id} className="team-card">
                <div className="team-card-header" onClick={() => toggleTeamDetails(team.id)}>
                  <div className="team-logo-container">
                    <img src={team.logo || '/assets/default-logo.png'} alt={team.name} className="team-logo" />
                  </div>
                  <div className="team-basic-info">
                    {editingTeam === team.id ? (
                      <div className="team-edit-form" onClick={(e) => e.stopPropagation()}>
                        <div className="edit-form-group">
                          <label htmlFor="edit-name">Team Name</label>
                          <input
                            id="edit-name"
                            type="text"
                            name="name"
                            value={editFormData.name}
                            onChange={handleEditInputChange}
                          />
                        </div>
                        <div className="edit-form-group">
                          <label htmlFor="edit-region">Region</label>
                          <input
                            id="edit-region"
                            type="text"
                            name="region"
                            value={editFormData.region}
                            onChange={handleEditInputChange}
                          />
                        </div>
                        <div className="edit-form-group">
                          <label htmlFor="edit-logo">Logo URL</label>
                          <input
                            id="edit-logo"
                            type="text"
                            name="logoUrl"
                            value={editFormData.logoUrl}
                            onChange={handleEditInputChange}
                          />
                        </div>
                        <div className="edit-actions">
                          <button 
                            className="btn-save-edit" 
                            onClick={(e) => saveEditedTeam(e, team.id)}
                            title="Save changes"
                          >
                            <FaSave /> Save
                          </button>
                          <button 
                            className="btn-cancel-edit" 
                            onClick={cancelEdit}
                            title="Cancel editing"
                          >
                            <FaTimesCircle /> Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <h3>{team.name}</h3>
                        <div className="team-meta">
                          <span className="team-region">{team.region}</span>
                          {team.status && <span className="team-status">{team.status}</span>}
                        </div>
                      </>
                    )}
                  </div>
                  <div className="team-actions">
                    {editingTeam !== team.id && (
                      <>
                        <button 
                          className="btn-edit" 
                          title="Edit Team"
                          onClick={(e) => handleEditClick(e, team)}
                        >
                          <FaEdit />
                        </button>
                        <button 
                          className="btn-delete" 
                          title="Delete Team"
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            setShowDeleteModal(true); 
                            setTeamToDelete(team); 
                          }}
                        >
                          <FaTrash />
                        </button>
                        <button className="btn-expand" title="View Details">
                          {expandedTeam === team.id ? <FaArrowUp /> : <FaArrowDown />}
                        </button>
                      </>
                    )}
                  </div>
                </div>
                
                {expandedTeam === team.id && !editingTeam && (
                  <div className="team-details">
                    <div className="team-section">
                      <h4><FaUserCog /> Coach</h4>
                      {team.coach ? (
                        <div className="team-coach">
                          <div className="coach-avatar">
                            {team.coach.image ? (
                              <img src={team.coach.image} alt={team.coach.username} />
                            ) : (
                              <div className="coach-initials">{team.coach.username.charAt(0).toUpperCase()}</div>
                            )}
                          </div>
                          <div className="coach-info">
                            <span className="coach-name">{team.coach.username}</span>
                            <span className="coach-email">{team.coach.email}</span>
                          </div>
                        </div>
                      ) : (
                        <p>No coach assigned</p>
                      )}
                    </div>
                    
                    <div className="team-section">
                      <h4><FaUsers /> Players</h4>
                      <div className="team-players">
                        {team.players && team.players.length > 0 ? (
                          team.players.map(player => (
                            <div key={player.id} className="player-item">
                              <div className="player-avatar">
                                {player.image ? (
                                  <img src={player.image} alt={player.username} />
                                ) : (
                                  <div className="player-initials">{player.username.charAt(0).toUpperCase()}</div>
                                )}
                              </div>
                              <div className="player-info">
                                <span className="player-name">{player.username}</span>
                                {player.gamertag && <span className="player-gamertag">@{player.gamertag}</span>}
                                {player.gameId && <span className="player-gameId">ID: {player.gameId}</span>}
                                {player.rating !== undefined && <span className="player-rating">Rating: {player.rating}</span>}
                              </div>
                            </div>
                          ))
                        ) : (
                          <p>No players assigned to this team</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Confirm Delete</h3>
              <p>Are you sure you want to delete the team "{teamToDelete?.name}"?</p>
              <div className="modal-actions">
                <button className="btn-cancel" onClick={cancelDelete}>Cancel</button>
                <button className="btn-confirm-delete" onClick={handleDeleteTeam}>Delete</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default TeamManagement;