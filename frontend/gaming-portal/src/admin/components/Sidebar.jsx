import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  const location = useLocation();

  // Check if current path matches link
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>
          <span className="material-icons">admin_panel_settings</span>
          Admin Dashboard
        </h2>
      </div>
      <ul className="sidebar-links">
        <li>
          <Link 
            to="/admin/dashboard" 
            className={isActive('/admin/dashboard') ? 'active' : ''}
          >
            <span className="material-icons">dashboard</span>
            Dashboard
          </Link>
        </li>
        <li>
          <Link 
            to="/admin/users" 
            className={isActive('/admin/users') ? 'active' : ''}
          >
            <span className="material-icons">people</span>
            User Management
          </Link>
        </li>
        <li>
          <Link 
            to="/admin/tournaments" 
            className={isActive('/admin/tournaments') ? 'active' : ''}
          >
            <span className="material-icons">emoji_events</span>
            Tournament Management
          </Link>
        </li>
        <li>
          <Link 
            to="/admin/teams" 
            className={isActive('/admin/teams') ? 'active' : ''}
          >
            <span className="material-icons">groups</span>
            Team Management
          </Link>
        </li>
        <li>
          <Link 
            to="/login" 
            className={isActive('/login') ? 'active' : ''}
          >
            <span className="material-icons">logout</span>
            logout
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;