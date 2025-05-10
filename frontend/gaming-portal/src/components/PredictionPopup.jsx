import React from 'react';
import './PredictionPopup.css';

const PredictionPopup = ({ team1, team2, winner, probability, onClose }) => {
  return (
    <div className="prediction-overlay">
      <div className="prediction-popup">
        <button className="close-btn" onClick={onClose}>×</button>
        <h3 className="prediction-title">Match Prediction</h3>
        <div className="teams-container">
          <span className="team-name">{team1}</span>
          <span className="vs-text">vs</span>
          <span className="team-name">{team2}</span>
        </div>
        <div className="prediction-result">
          <div className="winner-badge">{winner}</div>
          <div className="probability-meter">
            <div 
              className="probability-fill" 
              style={{ width: `${probability * 100}%` }}
            ></div>
            <span className="probability-text">{probability.toFixed(2)}</span>
          </div>
        </div>
        <div className="confidence-text">
          High confidence prediction
        </div>
      </div>
    </div>
  );
};

export default PredictionPopup;