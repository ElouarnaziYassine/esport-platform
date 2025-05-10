import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LiveMatches.css';
import './PredictionPopup.css';

function LiveMatches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [predictions, setPredictions] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [currentPrediction, setCurrentPrediction] = useState(null);
  
  const tournamentId = 5;

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/matches/bracket/${tournamentId}`)
      .then((response) => {
        setMatches(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching tournament bracket:', error);
        setError('Failed to load bracket data');
        setLoading(false);
      });
  }, [tournamentId]);

  const predictWinner = async (team1, team2) => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/predict', {
        team1,
        team2
      });
      
      setPredictions(prev => ({
        ...prev,
        [team1 + ' vs ' + team2]: response.data
      }));
      
      setCurrentPrediction({
        team1,
        team2,
        winner: response.data.predicted_winner,
        probability: response.data.win_probability
      });
      
      setShowPopup(true);
    } catch (error) {
      console.error('Prediction error:', error);
      setError('Prediction failed. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading bracket...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="live-matches">
      <h2>Tournament Bracket</h2>
      <p>Ready for the challenge?</p>

      {/* Detailed Prediction Popup */}
      {showPopup && currentPrediction && (
        <div className="prediction-overlay">
          <div className="prediction-popup">
            <button className="close-btn" onClick={() => setShowPopup(false)}>×</button>
            <h3 className="prediction-title">Match Prediction</h3>
            <div className="teams-container">
              <span className="team-name">{currentPrediction.team1}</span>
              <span className="vs-text">vs</span>
              <span className="team-name">{currentPrediction.team2}</span>
            </div>
            <div className="prediction-result">
              <div className="winner-badge">{currentPrediction.winner}</div>
              <div className="probability-meter">
                <div 
                  className="probability-fill" 
                  style={{ width: `${currentPrediction.probability * 100}%` }}
                ></div>
                <span className="probability-text">{currentPrediction.probability.toFixed(2)}</span>
              </div>
            </div>
            <div className="confidence-text">
              {currentPrediction.probability > 0.7 ? 'High' : 'Medium'} confidence prediction
            </div>
          </div>
        </div>
      )}

      <div className="matches-list">
        {matches.map((match, index) => (
          <div className="match-container" key={index}>
            <div className="time">
              {new Date(match.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="teams">
              <div className="team">
                <img
                  src={match.teamALogo || 'https://flagcdn.com/us.svg'}
                  alt={`${match.teamA} logo`}
                  className="flag"
                />
                <span>{match.teamA}</span>
                <span>{match.scoreA !== null ? match.scoreA : '0'}</span>
              </div>
              <div className="team">
                <img
                  src={match.teamBLogo || 'https://flagcdn.com/us.svg'}
                  alt={`${match.teamB} logo`}
                  className="flag"
                />
                <span>{match.teamB}</span>
                <span>{match.scoreB !== null ? match.scoreB : '0'}</span>
              </div>
            </div>
            
            <button className={`live-button ${match.status.toLowerCase() === 'live' ? 'live' : ''}`}>
              <span className={`live-dot ${match.status.toLowerCase() === 'live' ? 'pulse' : ''}`}></span>
              {match.status.toUpperCase()}
            </button>

            <div className="predict-button-container">
              <button
                className="predict-button"
                onClick={() => predictWinner(match.teamA, match.teamB)}
                disabled={loading}
              >
                {loading ? 'Predicting...' : 'Predict'}
              </button>
            </div>

            {/* Simple Prediction Display (shows after prediction) */}
            {predictions[match.teamA + ' vs ' + match.teamB] && (
              <div className="simple-prediction">
                <div className="winner-display">
                  {predictions[match.teamA + ' vs ' + match.teamB].predicted_winner}
                  <div className="probability-tag">
                    {(predictions[match.teamA + ' vs ' + match.teamB].win_probability * 100).toFixed(0)}%
                  </div>
                </div>
                <div className="probability-bar">
                  <div 
                    className="probability-indicator"
                    style={{ width: `${predictions[match.teamA + ' vs ' + match.teamB].win_probability * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LiveMatches;