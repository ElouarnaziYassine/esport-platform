import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LeaderboardHeader from '../components/LeaderboardHeader';
import FilterBar from '../components/FilterBar';
import LeaderboardList from '../components/LeaderboardList';

function Leaderboard() {
  return (
    <>
      <Navbar />
      <LeaderboardHeader />
      <FilterBar />
      <LeaderboardList />
      <Footer />
    </>
  );
}

export default Leaderboard;
