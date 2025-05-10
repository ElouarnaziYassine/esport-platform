import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TournamentCard.css';

const TournamentCard = ({ tournament }) => {
  const [message, setMessage] = useState('');
  const [teamId, setTeamId] = useState(null);
  const remainingSlots = tournament.maxTeams - tournament.registeredTeams;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:8080/api/coach/teams', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(response => {
          if (response.data && response.data.length > 0) {
            setTeamId(response.data[0].id);
          } else {
            setMessage('No team found for this coach.');
          }
        })
        .catch(error => {
          setMessage('Error fetching team information.');
          console.error(error);
        });
    }
  }, []);

  const handleJoinTournament = () => {
    if (remainingSlots > 0 && tournament.status === 'UPCOMING' && teamId) {
      axios.post(`http://localhost:8080/api/coach/tournaments/${tournament.id}/register`, null, {
        params: { teamId: teamId },
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      })
        .then(response => {
          setMessage('Team successfully registered!');
        })
        .catch(error => {
          setMessage('Failed to join the tournament. Try again later.');
          console.error(error);
        });
    } else if (!teamId) {
      setMessage('No team found for this coach.');
    } else if (remainingSlots === 0) {
      setMessage('No available slots for this tournament.');
    } else {
      setMessage('The tournament is not open for registration.');
    }
  };

  const onGenerateBracket = (tournamentId) => {
    axios.post(`http://localhost:8080/api/admin/tournaments/${tournamentId}/generate-bracket`, null, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
      .then((response) => {
        setMessage('Bracket generated successfully!');
      })
      .catch((error) => {
        setMessage('Failed to generate bracket. Try again later.');
        console.error(error);
      });
  };

  return (
    <div className="card">
      <img
        src={tournament.logo}
        alt={`${tournament.game} logo`}
        className="logo"
      />
      <div className="content">
        <div>
          <h2 className="title">{tournament.name}</h2>
          <p className="dates">
            {new Date(tournament.startDate).toLocaleDateString()} -<br />
            {new Date(tournament.endDate).toLocaleDateString()}
          </p>
          <p>{remainingSlots > 0 ? `Slots available: ${remainingSlots}` : "8 / 8 Teams"}</p>
        </div>
        <div className="status-row">
          <span className={`status ${tournament.status.toLowerCase()}`}>
            {tournament.status}
          </span>
          {tournament.status === 'COMPLETED' && (
            <button onClick={() => onGenerateBracket(tournament.id)}>
              Generate Bracket
            </button>
          )}
          <button
            className="join-btn"
            onClick={handleJoinTournament}
            disabled={remainingSlots === 0 || tournament.status !== 'UPCOMING' || !teamId}
          >
            {tournament.status === 'UPCOMING' && remainingSlots > 0 ? 'Join' : 'Closed'}
          </button>
        </div>
      </div>

      {/* Pop-up message */}
      {message && <div className="popup-message show">{message}</div>}
    </div>
  );
};

export default TournamentCard;
