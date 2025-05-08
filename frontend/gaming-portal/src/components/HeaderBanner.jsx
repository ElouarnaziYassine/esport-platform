import React from 'react';
import './HeaderBanner.css';

function HeaderBanner({ title, subtitle, backgroundImage }) {
  return (
    <div className="header-banner" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="banner-overlay">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </div>
  );
}

export default HeaderBanner;
