import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Leaderboard from './pages/Leaderboard';
import Watch from './pages/Watch';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/watch" element={<Watch />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
