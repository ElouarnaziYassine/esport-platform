import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import FilterBar from '../components/FilterBar';
import LeaderboardList from '../components/LeaderboardList';

function Leaderboard() {
  return (
    <>
      <Navbar />
      <Hero/>
      <FilterBar />
      <LeaderboardList />
      <Footer />
    </>
  );
}

export default Leaderboard;
