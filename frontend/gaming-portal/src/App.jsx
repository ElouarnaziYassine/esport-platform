import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Leaderboard from './pages/Leaderboard';
import Watch from './pages/Watch';
import Profile from './pages/Profile';
import Tournament from './pages/Tournaments';
import TournamentBracketPage from './pages/TournamentBracketPage';


/* Admin */
import AdminLayout from './admin/layout/AdminLayout';
import UserManagement from './admin/pages/UserManagement';
import AdminDashboard from './admin/pages/AdminDashboard';
import MatchManagement from './admin/pages/MatchManagement';
import TournamentManagement from './admin/pages/TournamentManagement';
import TournamentList from './admin/components/TournamentList';
import TournamentDetails from './admin/components/TournamentDetails';
import TournamentForm from './admin/components/TournamentForm';
import TeamManagement from './admin/pages/TeamManagement';



/* coach*/
import TeamCoachManagement from './coach/pages/TeamCoachManagement';


function App() {
  return (
    <Routes>
      {/* Non-admin routes */}
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/watch" element={<Watch />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/tournament" element={<Tournament />} />
      <Route path="/matches/bracket/:tournamentId" element={<TournamentBracketPage />}/>      
      <Route path="*" element={<NotFound />} />

      {/* Admin routes */}
      <Route path="/admin" element={<AdminLayout />}> {/* Admin Layout with Sidebar */}
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="tournaments" element={<TournamentManagement />} />
        <Route path="matches" element={<MatchManagement />} />
        <Route path="teams" element={<TeamManagement />} />
        <Route path="tournaments" element={<TournamentList />} />
        <Route path="tournaments/:id" element={<TournamentDetails />} />
        <Route path="tournaments/new" element={<TournamentForm />} />
        <Route path="tournaments/:id/edit" element={<TournamentForm />} />
      </Route>


      <Route path="/coach/team" element={<TeamCoachManagement />} />





    </Routes>
  );
}

export default App;
