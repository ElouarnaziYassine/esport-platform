import React, { useState } from 'react';
import axios from 'axios';
import './EditUserModal.css';

function EditUserModal({ user, onClose, onSave }) {
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    role: user.role
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:8080/api/admin/users/${user.id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onSave(user.id, formData);
      onClose();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to update user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>Edit User</h3>
          <button onClick={onClose} className="close-btn">&times;</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="COACH">Coach</option>
             <option value="PLAYER">Player</option>

            </select>
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <div className="modal-actions">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-cancel"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-save"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUserModal;