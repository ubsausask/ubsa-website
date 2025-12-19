import React from 'react';
import TigerHero from '../components/TigerHero';
import Gallery from './Gallery';
import Events from './Events'; 

export default function Home() {
  return (
    <>
      <TigerHero />

      {/* Main Content */}
      <div style={{ position: 'relative', zIndex: 10, background: '#001d1d' }}>
        
        {/* Pass isHome={true} to fix the layout! */}
        <Events isHome={true} />

        <Gallery />
        
      </div>
    </>
  );
}