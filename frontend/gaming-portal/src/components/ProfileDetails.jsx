import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import './ProfileDetails.css';

function ProfileDetails() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState({
    id: null,
    username: '',
    image: '',
    gamertag: '',
    gameId: '',
    rating: 0.0,
  });

  // Initialize editing state with current profile data
  const [editData, setEditData] = useState({ ...profile });

  // Fetch player profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('http://localhost:8080/api/profile/me', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setProfile(response.data);
        setEditData(response.data); // Initialize edit data
        setIsLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load profile data');
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Handle input changes for editing
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseFloat(value) || 0 : value,
    }));
  };

  // Start editing mode
  const handleEdit = () => {
    setEditData({ ...profile });
    setIsEditing(true);
  };

  // Cancel editing
  const handleCancel = () => {
    setIsEditing(false);
    setError(null);
  };

  // Save updated profile
  const handleSave = async () => {
    try {
      setIsLoading(true);
      const response = await axios.put(
        'http://localhost:8080/api/profile/me',
        {
          username: editData.username,
          gamertag: editData.gamertag,
          gameId: editData.gameId,
          rating: editData.rating,
        },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Update profile with new data
      setProfile(editData);
      setIsEditing(false);
      setError(null);

      // If username changed, update token if needed
      if (editData.username !== profile.username) {
        // You may need to handle token refresh here
        console.log('Username changed - consider updating auth token');
      }
    } catch (err) {
      setError(err.response?.data || 'Failed to update profile');
      console.error('Update error:', err.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  // Loading state
  if (isLoading) {
    return <div className="profile-details loading">Loading profile...</div>;
  }

  // Error state
  if (error) {
    return (
      <div className="profile-details error">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="profile-details">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-pic-container">
            <img
              src={profile.image || '../assets/profile-pic.png'}
              alt="Profile"
              className="profile-pic"
              onError={(e) => {
                e.target.src = '../assets/profile-pic.png';
              }}
            />
          </div>
          <div className="profile-info">
            {isEditing ? (
              <>
                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    name="username"
                    value={editData.username}
                    onChange={handleInputChange}
                    className="profile-input"
                    disabled // Username should typically not be editable
                  />
                  <small className="input-hint">
                    (Username cannot be changed - contact support if needed)
                  </small>
                </div>
                <div className="form-group">
                  <label>Gamertag</label>
                  <input
                    type="text"
                    name="gamertag"
                    value={editData.gamertag}
                    onChange={handleInputChange}
                    className="profile-input"
                  />
                </div>
                <div className="form-group">
                  <label>Game ID</label>
                  <input
                    type="text"
                    name="gameId"
                    value={editData.gameId}
                    onChange={handleInputChange}
                    className="profile-input"
                  />
                </div>
                <div className="form-group">
                  <label>Rating</label>
                  <input
                    type="number"
                    step="0.1"
                    name="rating"
                    value={editData.rating}
                    onChange={handleInputChange}
                    className="profile-input"
                    min="0"
                    max="10"
                  />
                </div>
              </>
            ) : (
              <>
                <h2 className="profile-username">{profile.username}</h2>
                <p className="profile-field">
                  <span className="field-label">Gamertag:</span>
                  <span className="field-value">{profile.gamertag || 'Not set'}</span>
                </p>
                <p className="profile-field">
                  <span className="field-label">Game ID:</span>
                  <span className="field-value">{profile.gameId || 'Not set'}</span>
                </p>
                <p className="profile-field">
                  <span className="field-label">Rating:</span>
                  <span className="field-value">{profile.rating || '0'}</span>
                </p>
              </>
            )}
          </div>
        </div>
        <div className="profile-footer">
          {isEditing ? (
            <div className="edit-buttons">
              <button 
                className="btn-save" 
                onClick={handleSave}
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
              <button 
                className="btn-cancel" 
                onClick={handleCancel}
                disabled={isLoading}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button className="btn-edit" onClick={handleEdit}>
              Edit Profile
            </button>
          )}
        </div>
        {error && isEditing && (
          <div className="error-message">
            {typeof error === 'object' ? JSON.stringify(error) : error}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileDetails;