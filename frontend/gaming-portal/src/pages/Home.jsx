import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Partners from '../components/Partners';
import HowToDominate from '../components/HowToDominate';
import GameList from '../components/GameList';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Partners />
      <HowToDominate />
      <GameList />
      <CallToAction />
      <Footer />
    </>
  );
}

export default Home;
