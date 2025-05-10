import React from 'react';
import Sidebar from '../components/Sidebar'; // Assuming Sidebar is in the admin folder
import { Outlet } from 'react-router-dom'; // This will render the child routes for admin pages

function AdminLayout() {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ marginLeft: '250px', width: '100%' }}>
        <Outlet /> {/* This renders the respective page */}
      </div>
    </div>
  );
}

export default AdminLayout;
