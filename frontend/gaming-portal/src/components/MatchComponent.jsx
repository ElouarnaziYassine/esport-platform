import React from "react";

const MatchComponent = ({ teamA, teamB, scoreA, scoreB, status }) => {
    return (
        <div className="match">
            <div className="match-teams">
                <div className="team">{teamA}</div>
                <div className="team">{teamB}</div>
            </div>
            <div className="match-score">
                {scoreA} - {scoreB}
            </div>
            <div className="match-status">
                Status: {status}
            </div>
        </div>
    );
};

export default MatchComponent;
