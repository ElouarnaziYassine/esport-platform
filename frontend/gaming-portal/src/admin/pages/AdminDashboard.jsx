import React from 'react';
import UserManagement from './UserManagement';
import TournamentManagement from './TournamentManagement';
import MatchManagement from './MatchManagement';
import './AdminDashboard.css';

function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <div className="admin-content">
        {/* You can toggle or switch components here based on navigation */}
        <UserManagement />
        {/* <TournamentManagement /> */}
        {/* <MatchManagement /> */}
      </div>
    </div>
  );
}

export default AdminDashboard;
