import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WatchHeader from '../components/WatchHeader';
import LiveMatches from '../components/LiveMatches';

function Watch() {
  return (
    <>
      <Navbar />
      <WatchHeader />
      <LiveMatches />
      <Footer />
    </>
  );
}

export default Watch;
