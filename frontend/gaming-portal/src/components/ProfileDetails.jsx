import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import './ProfileDetails.css';

function ProfileDetails() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState({
    id: null,
    username: '',
    image: '../assets/profile-pic.png',  // Default image
    gamertag: '',
    rating: 0.0,
  });

  // Get player ID from token
  const getPlayerId = () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        return decoded.id || decoded.playerId || decoded.sub;
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  };

  // Fetch player profile data
  useEffect(() => {
  const fetchProfile = async () => {
    const playerId = getPlayerId();
    if (!playerId) {
      setError('Cannot identify player. Please log in again.');
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.get(`http://localhost:8080/api/players/${playerId}/profile`);
      console.log('Profile Response:', response.data); // Log the response data
      setProfile(response.data);  // Assuming the API returns username, image, gamertag, and rating
      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError('Failed to load profile data. Please try again later.');
      setIsLoading(false);
    }
  };

  fetchProfile();
}, []);


  if (isLoading) {
    return <div className="profile-details loading">Loading profile...</div>;
  }

  if (error) {
    return <div className="profile-details error">{error}</div>;
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
            />
          </div>
          <div className="profile-info">
            <h2 className="profile-username">{profile.username}</h2>
            <p className="profile-gamertag">{profile.gamertag || 'No gamertag set'}</p>
            <p className="profile-rating">
              Rating: <span>{profile.rating || 0}</span>
            </p>
          </div>
        </div>
        <div className="profile-footer">
          <button className="btn-edit">Edit Profile</button>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetails;
