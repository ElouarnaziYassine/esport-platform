// src/components/UserManagement.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserManagement.css';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:8080/api/admin/users', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      setUsers(res.data);
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      setError('Failed to load users');
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading users…</p>;
  if (error)   return <p className="error">{error}</p>;

  return (
    <div className="user-management">
      <h2>User Management</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Username</th><th>Email</th><th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserManagement;
