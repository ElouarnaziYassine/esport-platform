import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Admin Dashboard</h2>
      </div>
      <ul className="sidebar-links">
        <li><Link to="/admin/dashboard">Dashboard</Link></li>
        <li><Link to="/admin/users">User Management</Link></li>
        <li><Link to="/admin/tournaments">Tournament Management</Link></li>
        <li><Link to="/admin/matches">Matches</Link></li>
        <li><Link to="/admin/leaderboards">Leaderboards</Link></li>
        <li><Link to="/admin/settings">System Settings</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
