import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LeaderboardCard from './LeaderboardCard';
import './LeaderboardList.css';

const API_BASE_URL = 'http://localhost:8080'; // Your backend URL

function LeaderboardList() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch leaderboard data from the backend
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/teams/leaderboard`); // API to fetch leaderboard data
        setTeams(response.data);  // Set the teams data
      } catch (err) {
        setError('Error fetching leaderboard data');
        console.error(err);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchLeaderboard();
  }, []); // Empty array ensures this runs only once when the component mounts

  // If loading, show loading message
  if (loading) {
    return <div className="loading-message">Loading leaderboard...</div>;
  }

  // If there's an error, show the error message
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="leaderboard-list">
      {teams.map((team, index) => (
        <LeaderboardCard 
          key={team.id} // Use team.id as the key
          rank={index + 1} 
          logo={team.logo ? `${team.logo}` : '/assets/default-logo.png'}  // Ensure logo path is correct
          name={team.name}
          region={team.region}
          points={team.rating} // Display team rating as points
        />
      ))}
    </div>
  );
}

export default LeaderboardList;