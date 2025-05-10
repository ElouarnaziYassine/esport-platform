import React from 'react';
import './AdminDashboard.css';

function AdminDashboard() {
  const stats = [
    {
      title: "Total Users",
      value: "1,243",
      change: "+12%",
      trend: "up",
      icon: "people"
    },
    {
      title: "Active Tournaments",
      value: "28",
      change: "+3",
      trend: "up",
      icon: "emoji_events"
    },
    {
      title: "Matches Played",
      value: "156",
      change: "-5%",
      trend: "down",
      icon: "sports_esports"
    },
    {
      title: "Registered Teams",
      value: "89",
      change: "+8",
      trend: "up",
      icon: "groups"
    }
  ];

  return (
    <div className="admin-dashboard">
            <h2>Dashboard</h2>

      <div className="dashboard-overview">
        {stats.map((stat, index) => (
          <div className="overview-card" key={index}>
            <div className="card-header">
              <span className="card-title">{stat.title}</span>
              <div className="card-icon">
                <span className="material-icons">{stat.icon}</span>
              </div>
            </div>
            <div className="card-value">{stat.value}</div>
            <div className={`card-change ${stat.trend === 'up' ? 'positive' : 'negative'}`}>
              <span className="material-icons">
                {stat.trend === 'up' ? 'trending_up' : 'trending_down'}
              </span>
              {stat.change} {stat.trend === 'up' ? 'this month' : 'this week'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;