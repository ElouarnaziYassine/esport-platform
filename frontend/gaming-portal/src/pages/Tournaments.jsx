import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TournamentCard from '../components/TournamentCard';
import './Tournaments.css';
import Navbar from '../components/Navbar';

const Tournaments = () => {
  const [tournaments, setTournaments] = useState([]);
  const [filteredTournaments, setFilteredTournaments] = useState([]);
  const [error, setError] = useState('');
  const [gameFilter, setGameFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Fetch tournaments data when the component mounts
  useEffect(() => {
    axios.get('http://localhost:8080/api/admin/tournaments')
      .then(response => {
        setTournaments(response.data);
        setFilteredTournaments(response.data);  // Initially, display all tournaments
      })
      .catch(error => {
        console.error('Error fetching tournaments:', error);
        setError('Failed to load tournaments.');
      });
  }, []);

  // Apply filter based on selected filters
  useEffect(() => {
    let filtered = tournaments;

    if (gameFilter) {
      filtered = filtered.filter(tournament => tournament.game.toLowerCase() === gameFilter.toLowerCase());
    }

    if (statusFilter) {
      filtered = filtered.filter(tournament => tournament.status.toLowerCase() === statusFilter.toLowerCase());
    }

    setFilteredTournaments(filtered);
  }, [gameFilter, statusFilter, tournaments]); // Apply filters when gameFilter, statusFilter, or tournaments change

  // Handle filter changes
  const handleGameFilterChange = (e) => {
    setGameFilter(e.target.value);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  return (
    <>
      <Navbar />
      <div className="tournaments-container">
        <h1>Tournaments</h1>
        {error && <p className="error-message">{error}</p>} {/* Show error message if any */}

        {/* Filters */}
        <div className="filters">
          <select value={gameFilter} onChange={handleGameFilterChange}>
            <option value="">Game</option>
            <option value="Valorant">Valorant</option>
            <option value="LoL">League of Legends</option>
            <option value="R6">R6 Siege</option>
          </select>

          <select value={statusFilter} onChange={handleStatusFilterChange}>
            <option value="">Status</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="tournament-cards">
          {filteredTournaments.length > 0 ? (
            filteredTournaments.map((tournament) => (
              <TournamentCard
                key={tournament.id}
                tournament={tournament}  // Pass the whole tournament object
                imageUrl={tournament.imageUrl}
              />
            ))
          ) : (
            <p>No tournaments available at the moment.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Tournaments;
